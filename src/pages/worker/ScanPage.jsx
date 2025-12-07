import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import { Card, Button, Tag, Space, message } from 'antd';
import {
  CameraOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

export default function ScanPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [streamKey, setStreamKey] = useState(Date.now());

  // Part number search states
  const [partNumber, setPartNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [loadingStep, setLoadingStep] = useState(0);

  // Streaming control states
  const [streamingEnabled, setStreamingEnabled] = useState(false);
  const [streamingActive, setStreamingActive] = useState(false);

  // Web scraping confirmation states
  const [showScrapingConfirmation, setShowScrapingConfirmation] = useState(false);
  const [pendingPartNumber, setPendingPartNumber] = useState('');
  const [isScraping, setIsScraping] = useState(false);

  // API endpoints

  const STREAM_URL = 'http://10.106.241.16:5000/';
  const SNAPSHOT_URL = 'http://10.106.241.16:5000/capture';

  const captureImage = async () => {
    setIsCapturing(true);
    try {
      const response = await fetch(SNAPSHOT_URL);
      if (!response.ok) throw new Error('Failed to capture image');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setCapturedImage(url);
      message.success('Frame captured successfully');

      // Simulate scan analysis
      setTimeout(() => {
        setScanResult({
          status: Math.random() > 0.3 ? 'PASS' : 'FAIL',
          confidence: (85 + Math.random() * 15).toFixed(1),
          timestamp: new Date().toISOString(),
        });
      }, 1500);

    } catch (error) {
      console.error('Capture error:', error);
      message.error('Error capturing image');
    } finally {
      setIsCapturing(false);
    }
  };

  const downloadImage = () => {
    if (capturedImage) {
      const a = document.createElement('a');
      a.href = capturedImage;
      a.download = `ic_scan_${Date.now()}.jpg`;
      a.click();
      message.success('Image downloaded');
    }
  };

  const toggleFullscreen = () => {
    const container = document.getElementById('video-container');
    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const resetScan = () => {
    if (capturedImage) {
      URL.revokeObjectURL(capturedImage);
    }
    setCapturedImage(null);
    setScanResult(null);
  };

  const refreshStream = () => {
    setStreamKey(Date.now());
    message.info('Stream refreshed');
  };

  const handleStartStreaming = () => {
    setStreamingActive(true);
    message.info('Stream started. Please place your IC on the jig for scanning.', 4);
  };

  const handleStopStreaming = () => {
    setStreamingActive(false);
    setStreamKey(Date.now()); // Reset stream
    setCapturedImage(null);
    setScanResult(null);
    message.info('Stream stopped');
  };

  const handlePartNumberSearch = async (value) => {
    if (!value || value.trim().length === 0) {
      setIsSearching(false);
      setSearchResult(null);
      setLoadingStep(0);
      setShowScrapingConfirmation(false);
      return;
    }

    setIsSearching(true);
    setSearchResult(null);
    setLoadingStep(0);
    setShowScrapingConfirmation(false);

    try {
      // Step 1: Searching database ONLY (no auto-scrape)
      setLoadingStep(1);

      const response = await fetch(
        `http://localhost:8000/api/v1/ic/search/${encodeURIComponent(value)}?auto_scrape=false`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const icData = await response.json();

        // Check if this was auto-scraped (new record)
        const isAutoScraped = (
          icData.overall_confidence_score === 0 &&
          icData.texture_model_confidence_score === 0 &&
          icData.dimensions_match === false &&
          icData.image_data?.original_image_path === null
        );

        // Step 2: Loading models (simulate for UX)
        setLoadingStep(2);
        await new Promise(resolve => setTimeout(resolve, 500));

        // Step 3: Verifying specifications
        setLoadingStep(3);
        await new Promise(resolve => setTimeout(resolve, 500));

        setSearchResult({
          found: true,
          id: icData.id,
          partNumber: icData.full_part_number,
          manufacturer: icData.manufacturer,
          packageType: icData.package_type,
          allowedMarkings: icData.allowed_markings,
          packageDimensions: icData.package_dimensions,
          imageData: icData.image_data,
          dimensionsMatch: icData.dimensions_match,
          textureConfidence: icData.texture_model_confidence_score,
          overallConfidence: icData.overall_confidence_score,
          isAutoScraped: isAutoScraped,
          status: 'Active',
        });

        // Enable streaming after successful search
        setStreamingEnabled(true);

        if (isAutoScraped) {
          message.success(`Part "${value}" found! (Auto-scraped from datasheet) - You can now start streaming.`, 5);
        } else {
          message.success(`Part "${value}" found in database! - You can now start streaming.`);
        }
      } else if (response.status === 404) {
        // IC not found in database - show confirmation dialog
        setPendingPartNumber(value);
        setShowScrapingConfirmation(true);
        message.warning(`Part "${value}" not found in local database.`);
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('IC Search Error:', error);
      setSearchResult({
        found: false,
        partNumber: value,
        error: error.message,
      });
      message.error(`Search failed: ${error.message}`);
    } finally {
      setIsSearching(false);
      setLoadingStep(0);
    }
  };

  const handleStartWebScraping = async () => {
    setShowScrapingConfirmation(false);
    setIsScraping(true);
    setLoadingStep(0);

    try {
      // Step 1: Searching database
      setLoadingStep(1);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 2: Scraping datasheets
      setLoadingStep(2);
      message.info('Scraping web for part number...');

      const response = await fetch(
        `http://localhost:8000/api/v1/ic/search/${encodeURIComponent(pendingPartNumber)}?auto_scrape=true`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const icData = await response.json();

        // Step 3: Extracting with AI
        setLoadingStep(3);
        await new Promise(resolve => setTimeout(resolve, 500));

        setSearchResult({
          found: true,
          id: icData.id,
          partNumber: icData.full_part_number,
          manufacturer: icData.manufacturer,
          packageType: icData.package_type,
          allowedMarkings: icData.allowed_markings,
          packageDimensions: icData.package_dimensions,
          imageData: icData.image_data,
          dimensionsMatch: icData.dimensions_match,
          textureConfidence: icData.texture_model_confidence_score,
          overallConfidence: icData.overall_confidence_score,
          isAutoScraped: true,
          status: 'Active',
        });

        // Enable streaming after successful scraping
        setStreamingEnabled(true);
        message.success(`Part "${pendingPartNumber}" scraped successfully! - You can now start streaming.`, 5);
      } else if (response.status === 404) {
        setSearchResult({
          found: false,
          partNumber: pendingPartNumber,
        });
        message.error(`Part "${pendingPartNumber}" not found in available datasheets.`);
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Web Scraping Error:', error);
      setSearchResult({
        found: false,
        partNumber: pendingPartNumber,
        error: error.message,
      });
      message.error(`Web scraping failed: ${error.message}`);
    } finally {
      setIsScraping(false);
      setLoadingStep(0);
      setPendingPartNumber('');
    }
  };

  const handleCancelScraping = () => {
    setShowScrapingConfirmation(false);
    setPendingPartNumber('');
    message.info('Web scraping cancelled');
  };

  const handlePartNumberChange = (value) => {
    setPartNumber(value);

    // Reset streaming when starting new search
    setStreamingEnabled(false);
    setStreamingActive(false);

    // Debounce search - only trigger after user stops typing
    if (value.length > 2) {
      // Clear previous timeout
      if (window.searchTimeout) {
        clearTimeout(window.searchTimeout);
      }
      // Set new timeout
      window.searchTimeout = setTimeout(() => {
        handlePartNumberSearch(value);
      }, 800); // Wait 800ms after user stops typing
    } else {
      setIsSearching(false);
      setSearchResult(null);
      setLoadingStep(0);
    }
  };

  useEffect(() => {
    // Cleanup blob URLs on unmount
    return () => {
      if (capturedImage) {
        URL.revokeObjectURL(capturedImage);
      }
    };
  }, [capturedImage]);

  return (
    <div className="min-h-screen bg-black relative">
      <Navbar />

      {/* Enhanced gradient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-linear-to-b from-cyan-900/30 via-cyan-800/35 to-cyan-900/25" />
        <div className="absolute inset-0 bg-linear-to-r from-cyan-900/20 via-transparent to-cyan-900/20" />
      </div>

      <div className="relative z-10 pt-24 px-6 pb-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1
            className="text-4xl font-black mb-2"
            style={{
              background: 'linear-gradient(135deg, #22d3ee 0%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Live IC Scanner
          </h1>
          <p className="text-gray-400 text-lg">Real-time video capture and IC authentication</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Feed Section */}
          <div className="lg:col-span-2">
            <Card
              className="!bg-white/5 !border-white/10 backdrop-blur-md"
              bodyStyle={{ padding: 0 }}
            >
              {/* Video Container */}
              <div id="video-container" className="relative bg-black aspect-video">
                {streamingActive ? (
                  <>
                    {/* Live Stream via iframe */}
                    <iframe
                      key={streamKey}
                      src={STREAM_URL}
                      className="w-full h-full"
                      style={{
                        border: 'none',
                        display: 'block',
                      }}
                      title="Live Camera Stream"
                      allow="camera"
                    />

                    {/* Overlay Status */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Tag color="success" className="!px-3 !py-1">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                          Live Stream
                        </span>
                      </Tag>
                    </div>

                    {/* User Prompt Overlay */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-cyan-600/90 backdrop-blur-sm px-6 py-3 rounded-lg border border-cyan-400/50">
                      <p className="text-white font-medium text-center">
                        📍 Place your IC on the jig for scanning
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Placeholder when stream is not active */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                      <CameraOutlined className="text-6xl text-gray-600 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-400 mb-2">
                        {streamingEnabled ? 'Ready to Stream' : 'Stream Not Available'}
                      </h3>
                      <p className="text-gray-500 text-center max-w-md px-4">
                        {streamingEnabled
                          ? 'Click "Start Streaming" below to begin live video capture'
                          : 'Search for an IC part number first to enable streaming'}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Control Panel */}
              <div className="p-4 border-t border-white/10">
                <Space size="middle" wrap className="w-full">
                  {streamingActive ? (
                    <>
                      <Button
                        icon={<ReloadOutlined />}
                        onClick={refreshStream}
                        size="large"
                        className="!bg-white/10 !border-white/20 !text-white hover:!bg-white/20"
                      >
                        Refresh Stream
                      </Button>

                      <Button
                        icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                        onClick={toggleFullscreen}
                        size="large"
                        className="!bg-white/10 !border-white/20 !text-white hover:!bg-white/20"
                      >
                        {isFullscreen ? 'Exit' : 'Fullscreen'}
                      </Button>

                      <Button
                        icon={<CameraOutlined />}
                        onClick={captureImage}
                        loading={isCapturing}
                        size="large"
                        type="primary"
                        className="!bg-gradient-to-r !from-green-500 !to-green-600 !border-0"
                      >
                        Capture & Scan
                      </Button>

                      <Button
                        danger
                        onClick={handleStopStreaming}
                        size="large"
                        className="ml-auto"
                      >
                        Stop Streaming
                      </Button>
                    </>
                  ) : (
                    <Button
                      icon={<CameraOutlined />}
                      onClick={handleStartStreaming}
                      disabled={!streamingEnabled}
                      size="large"
                      type="primary"
                      block
                      className="!bg-gradient-to-r !from-cyan-500 !to-blue-600 !border-0 disabled:!from-gray-600 disabled:!to-gray-700"
                    >
                      {streamingEnabled ? 'Start Streaming' : 'Search IC Part Number First'}
                    </Button>
                  )}
                </Space>
              </div>
            </Card>
          </div>

          {/* Part Number Search & Results Section */}
          <div className="space-y-6">
            {/* Part Number Search */}
            <Card
              title={<span className="text-white font-semibold">Find by Part Number</span>}
              className="!bg-white/5 !border-white/10 backdrop-blur-md"
              headStyle={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter part number (e.g., IC-2024-001)"
                    value={partNumber}
                    onChange={(e) => handlePartNumberChange(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                  {partNumber && (
                    <button
                      onClick={() => {
                        setPartNumber('');
                        setIsSearching(false);
                        setSearchResult(null);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      <CloseCircleOutlined />
                    </button>
                  )}
                </div>

                {/* Loading State */}
                {isSearching && (
                  <div className="space-y-3 py-4">
                    {/* Step 1: Database Search */}
                    <div className="flex items-center gap-3 text-cyan-400">
                      <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm font-medium">Searching database...</span>
                    </div>

                    {loadingStep >= 2 && (
                      <div className="flex items-center gap-3 text-orange-400 animate-fade-in">
                        <div className="w-5 h-5 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm font-medium">Scraping datasheets...</span>
                      </div>
                    )}

                    {loadingStep >= 3 && (
                      <div className="flex items-center gap-3 text-purple-400 animate-fade-in">
                        <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm font-medium">Extracting with AI...</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Web Scraping Confirmation Dialog */}
                {showScrapingConfirmation && !isScraping && (
                  <div className="space-y-4 py-4 animate-fade-in">
                    <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                      <div className="flex items-start gap-3 mb-3">
                        <CloseCircleOutlined className="text-xl text-orange-400 mt-1" />
                        <div className="flex-1">
                          <h4 className="text-orange-400 font-semibold mb-2">IC not found in local database</h4>
                          <p className="text-gray-300 text-sm mb-1">
                            Part number <span className="font-mono text-white">"{pendingPartNumber}"</span> is not available in our local database.
                          </p>
                          <p className="text-gray-400 text-sm">
                            Do you want to scrape the web for this part?
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-4">
                        <Button
                          type="primary"
                          icon={<CheckCircleOutlined />}
                          onClick={handleStartWebScraping}
                          className="!bg-gradient-to-r !from-orange-500 !to-orange-600 !border-0 flex-1"
                        >
                          Start Web Scraping
                        </Button>
                        <Button
                          onClick={handleCancelScraping}
                          className="!bg-white/10 !border-white/20 !text-white hover:!bg-white/20"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Web Scraping Progress */}
                {isScraping && (
                  <div className="space-y-4 py-4 animate-fade-in">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        <h4 className="text-blue-400 font-semibold">
                          System is scraping the part number from web...
                        </h4>
                      </div>

                      <div className="space-y-3">
                        {/* Step 1 */}
                        <div className={`flex items-center gap-3 ${loadingStep >= 1 ? 'text-cyan-400' : 'text-gray-600'}`}>
                          {loadingStep >= 1 ? (
                            <CheckCircleOutlined className="text-lg" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-gray-600"></div>
                          )}
                          <span className="text-sm">Searching database</span>
                        </div>

                        {/* Step 2 */}
                        <div className={`flex items-center gap-3 ${loadingStep >= 2 ? 'text-orange-400' : 'text-gray-600'}`}>
                          {loadingStep > 2 ? (
                            <CheckCircleOutlined className="text-lg" />
                          ) : loadingStep === 2 ? (
                            <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-gray-600"></div>
                          )}
                          <span className="text-sm">Scraping datasheets from web</span>
                        </div>

                        {/* Step 3 */}
                        <div className={`flex items-center gap-3 ${loadingStep >= 3 ? 'text-purple-400' : 'text-gray-600'}`}>
                          {loadingStep > 3 ? (
                            <CheckCircleOutlined className="text-lg" />
                          ) : loadingStep === 3 ? (
                            <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-gray-600"></div>
                          )}
                          <span className="text-sm">Extracting data with AI</span>
                        </div>
                      </div>

                      <p className="text-gray-400 text-xs mt-4">
                        This may take 10-30 seconds...
                      </p>
                    </div>
                  </div>
                )}

                {/* Search Result */}
                {searchResult && !isSearching && !isScraping && (
                  <div className="space-y-4 animate-fade-in">
                    {searchResult.found ? (
                      <>
                        {/* Simple Success Message */}
                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <div className="flex items-center gap-3 text-green-400">
                            <CheckCircleOutlined className="text-2xl" />
                            <div>
                              <h4 className="font-semibold text-lg">
                                {searchResult.isAutoScraped ? 'IC Found from Web Scraping' : 'IC Found in Local Database'}
                              </h4>
                              <p className="text-sm text-gray-300 mt-1">
                                Part number: <span className="font-mono text-white">{searchResult.partNumber}</span>
                              </p>
                            </div>
                            {searchResult.isAutoScraped && (
                              <Tag color="orange" className="ml-auto">
                                Auto-scraped
                              </Tag>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="flex items-center gap-2 text-red-400 mb-2">
                          <CloseCircleOutlined className="text-xl" />
                          <span className="font-semibold">Part Not Found</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          No matching part found for "{partNumber}". The part was not found in the database or available datasheets.
                        </p>
                        {searchResult.error && (
                          <p className="text-red-400 text-xs mt-2">
                            Error: {searchResult.error}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Help Text */}
                {!partNumber && !isSearching && !searchResult && (
                  <div className="text-center py-6 text-gray-400">
                    <CheckCircleOutlined className="text-3xl mb-2 opacity-50" />
                    <p className="text-sm">Enter a part number to search</p>
                    <p className="text-xs text-gray-500 mt-1">Format: IC-YYYY-XXX</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Captured Frame */}
            {capturedImage && (
              <Card
                title={<span className="text-white font-semibold">Captured Frame</span>}
                className="!bg-white/5 !border-white/10 backdrop-blur-md"
                headStyle={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="space-y-4">
                  <img
                    src={capturedImage}
                    alt="Captured Frame"
                    className="w-full rounded-lg border border-cyan-400/30"
                  />
                  <Space direction="vertical" className="w-full">
                    <Button
                      block
                      icon={<DownloadOutlined />}
                      onClick={downloadImage}
                      className="!bg-cyan-600 !border-cyan-600 !text-white hover:!bg-cyan-500"
                    >
                      Download Image
                    </Button>
                    <Button
                      block
                      onClick={resetScan}
                      className="!bg-white/10 !border-white/20 !text-white hover:!bg-white/20"
                    >
                      Clear & Capture New
                    </Button>
                  </Space>
                </div>
              </Card>
            )}

            {/* Scan Results */}
            {scanResult && (
              <Card
                title={<span className="text-white font-semibold">Scan Results</span>}
                className="!bg-white/5 !border-white/10 backdrop-blur-md"
                headStyle={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Status:</span>
                    <Tag
                      color={scanResult.status === 'PASS' ? 'success' : 'error'}
                      icon={scanResult.status === 'PASS' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                      className="!px-4 !py-2 !text-base"
                    >
                      {scanResult.status}
                    </Tag>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Confidence:</span>
                    <span className="text-blue-400 font-bold text-lg">{scanResult.confidence}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Timestamp:</span>
                    <span className="text-gray-300 text-sm">
                      {new Date(scanResult.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <Button
                      type="primary"
                      block
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 border-0"
                    >
                      Save Result
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
