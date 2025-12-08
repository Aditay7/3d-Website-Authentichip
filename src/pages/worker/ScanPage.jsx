import { useState, useEffect, useRef } from 'react';
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
  UploadOutlined,
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

  // Backend scan workflow states
  const [scanId, setScanId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalImagePath, setOriginalImagePath] = useState(null);
  const [croppedImagePath, setCroppedImagePath] = useState(null);
  const [workflowStep, setWorkflowStep] = useState('initial'); // 'initial', 'capturing', 'captured', 'processing', 'complete'
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // API endpoints
  const BACKEND_API_URL = 'http://localhost:8000/api/v1';
  const UPLOADS_URL = 'http://localhost:8000/uploads';
  const STREAM_URL = 'http://172.17.18.197:5500/video_feed';
  const SNAPSHOT_URL = 'http://172.17.18.197:5500/snapshot';

  // Backend API: Capture and Process workflow
  const captureAndProcessImage = async () => {
    setIsCapturing(true);
    setWorkflowStep('capturing');

    try {
      // Step 1: Capture image from backend
      message.info('📸 Capturing image from camera...');

      const captureResponse = await fetch(`${BACKEND_API_URL}/scan/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!captureResponse.ok) {
        const errorData = await captureResponse.json();
        throw new Error(errorData.detail || 'Capture failed');
      }

      const captureData = await captureResponse.json();
      const newScanId = captureData.scan_id;
      const originalPath = captureData.image_path;

      setScanId(newScanId);
      setOriginalImagePath(originalPath);
      setWorkflowStep('captured');

      message.success('✅ Image captured successfully!');

      // Step 2: Process/crop the image
      setIsProcessing(true);
      setWorkflowStep('processing');
      message.info('🔄 Processing image - detecting IC, rotating, and cropping...');

      const processResponse = await fetch(`${BACKEND_API_URL}/scan/${newScanId}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!processResponse.ok) {
        const errorData = await processResponse.json();
        throw new Error(errorData.detail || 'Processing failed');
      }

      const processData = await processResponse.json();
      setCroppedImagePath(processData.cropped_image_path);
      setWorkflowStep('complete');

      message.success('✅ Image processed successfully!', 5);

      // Simulate scan result for now
      setScanResult({
        status: Math.random() > 0.3 ? 'PASS' : 'FAIL',
        confidence: (85 + Math.random() * 15).toFixed(1),
        timestamp: new Date().toISOString(),
        scanId: newScanId,
      });

    } catch (error) {
      console.error('Scan workflow error:', error);
      setWorkflowStep('initial');

      // Specific error messages based on error type
      if (error.message.includes('Cannot reach')) {
        message.error('❌ Cannot reach camera. Please check if Raspberry Pi is online.', 5);
      } else if (error.message.includes('timeout')) {
        message.error('❌ Camera timeout. Please try again.', 5);
      } else if (error.message.includes('No IC chip detected')) {
        message.error('❌ No IC chip detected in image. Please reposition and try again.', 5);
      } else {
        message.error(`❌ Scan failed: ${error.message}`, 5);
      }
    } finally {
      setIsCapturing(false);
      setIsProcessing(false);
    }
  };

  // Upload and Process Image workflow
  const uploadAndProcessImage = async (file) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      message.error('❌ Please upload a valid image file (JPG, JPEG, or PNG)');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      message.error('❌ File size must be less than 10MB');
      return;
    }

    setIsUploading(true);
    setWorkflowStep('capturing');

    try {
      // Step 1: Upload image to backend
      message.info('📤 Uploading image...');

      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch(`${BACKEND_API_URL}/scan/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.detail || 'Upload failed');
      }

      const uploadData = await uploadResponse.json();
      const newScanId = uploadData.scan_id;
      const originalPath = uploadData.image_path;

      setScanId(newScanId);
      setOriginalImagePath(originalPath);
      setWorkflowStep('captured');

      message.success('✅ Image uploaded successfully!');

      // Step 2: Process/crop the image
      setIsProcessing(true);
      setWorkflowStep('processing');
      message.info('🔄 Processing image - detecting IC, rotating, and cropping...');

      const processResponse = await fetch(`${BACKEND_API_URL}/scan/${newScanId}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!processResponse.ok) {
        const errorData = await processResponse.json();
        throw new Error(errorData.detail || 'Processing failed');
      }

      const processData = await processResponse.json();
      setCroppedImagePath(processData.cropped_image_path);
      setWorkflowStep('complete');

      message.success('✅ Image processed successfully!', 5);

      // Simulate scan result
      setScanResult({
        status: Math.random() > 0.3 ? 'PASS' : 'FAIL',
        confidence: (85 + Math.random() * 15).toFixed(1),
        timestamp: new Date().toISOString(),
        scanId: newScanId,
      });

    } catch (error) {
      console.error('Upload workflow error:', error);
      setWorkflowStep('initial');

      // Specific error messages
      if (error.message.includes('No IC chip detected')) {
        message.error('❌ No IC chip detected in uploaded image. Please upload a different image.', 5);
      } else {
        message.error(`❌ Upload failed: ${error.message}`, 5);
      }
    } finally {
      setIsUploading(false);
      setIsProcessing(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadAndProcessImage(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
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
    setScanId(null);
    setOriginalImagePath(null);
    setCroppedImagePath(null);
    setWorkflowStep('initial');
    message.info('Scan cleared. Ready for new capture.');
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

        {/* Hidden file input for image upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Feed Section */}
          <div className="lg:col-span-2">
            <Card
              className="!bg-white/5 !border-white/10 backdrop-blur-md"
              bodyStyle={{ padding: 0 }}
            >
              {/* Video Container */}
              <div
                id="video-container"
                className="relative bg-black overflow-hidden"
                style={{ minHeight: '500px', height: '600px' }}
              >
                {streamingActive ? (
                  <>
                    {/* Live Stream via iframe */}
                    <img
                      key={streamKey}
                      src={STREAM_URL}
                      alt="Live Camera Stream"
                      className="absolute inset-0 w-full h-full object-contain"
                      style={{ display: 'block' }}
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
                        onClick={captureAndProcessImage}
                        loading={isCapturing || isProcessing}
                        size="large"
                        type="primary"
                        className="!bg-gradient-to-r !from-green-500 !to-green-600 !border-0"
                      >
                        {isCapturing ? 'Capturing...' : isProcessing ? 'Processing...' : 'Capture & Process'}
                      </Button>

                      <Button
                        icon={<UploadOutlined />}
                        onClick={triggerFileUpload}
                        loading={isUploading || isProcessing}
                        size="large"
                        type="primary"
                        className="!bg-gradient-to-r !from-blue-500 !to-blue-600 !border-0"
                      >
                        {isUploading ? 'Uploading...' : isProcessing ? 'Processing...' : 'Upload Image'}
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

            {/* Scan Workflow Results */}
            {(workflowStep !== 'initial' || originalImagePath || croppedImagePath) && (
              <Card
                title={<span className="text-white font-semibold">Scan Workflow</span>}
                className="!bg-white/5 !border-white/10 backdrop-blur-md"
                headStyle={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="space-y-4">
                  {/* Workflow Status */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      {workflowStep === 'capturing' && (
                        <>
                          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-cyan-400 font-medium">📸 Capturing image...</span>
                        </>
                      )}
                      {workflowStep === 'captured' && (
                        <>
                          <CheckCircleOutlined className="text-green-400 text-xl" />
                          <span className="text-green-400 font-medium">✅ Image captured!</span>
                        </>
                      )}
                      {workflowStep === 'processing' && (
                        <>
                          <div className="w-5 h-5 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-orange-400 font-medium">🔄 Processing image...</span>
                        </>
                      )}
                      {workflowStep === 'complete' && (
                        <>
                          <CheckCircleOutlined className="text-green-400 text-xl" />
                          <span className="text-green-400 font-medium">✅ Complete!</span>
                        </>
                      )}
                    </div>

                    {scanId && (
                      <div className="text-xs text-gray-400">
                        Scan ID: <code className="text-cyan-400 bg-white/5 px-2 py-1 rounded">{scanId}</code>
                      </div>
                    )}
                  </div>


                  {/* Show loading state for processing */}
                  {workflowStep === 'processing' && (
                    <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
                      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                      <p className="text-blue-400 font-medium mb-1">Processing image...</p>
                      <p className="text-gray-400 text-sm">Detecting IC chip, rotating, and cropping...</p>
                    </div>
                  )}

                  {/* Show original image only when captured but not yet processed */}
                  {workflowStep === 'captured' && originalImagePath && !croppedImagePath && (
                    <div className="space-y-3">
                      <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                        <p className="text-cyan-400 text-sm">
                          Image captured! Processing will start automatically...
                        </p>
                      </div>
                      <img
                        src={`${UPLOADS_URL}/${originalImagePath}`}
                        alt="Captured IC"
                        className="w-full rounded-lg border-2 border-cyan-400/30"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
                          e.target.alt = 'Image not found';
                        }}
                      />
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
