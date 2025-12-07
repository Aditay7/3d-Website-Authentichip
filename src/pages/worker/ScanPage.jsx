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

  // API endpoints
  const STREAM_URL = 'http://192.168.12.106:5500';
  const SNAPSHOT_URL = 'http://192.168.12.106:5500/snapshot';

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

  const handlePartNumberChange = (value) => {
    setPartNumber(value);
    if (value.length > 3) { // Start search after a few characters
      setIsSearching(true);
      setSearchResult(null);
      setLoadingStep(0);

      // Simulate search steps
      setTimeout(() => setLoadingStep(1), 500);
      setTimeout(() => setLoadingStep(2), 1500);

      setTimeout(() => {
        const found = Math.random() > 0.5; // Simulate success/failure
        if (found) {
          setSearchResult({
            found: true,
            partNumber: value,
            description: 'High-performance Microcontroller',
            manufacturer: 'Acme Corp',
            status: 'Active',
          });
          message.success(`Part "${value}" found!`);
        } else {
          setSearchResult({
            found: false,
            partNumber: value,
          });
          message.error(`Part "${value}" not found.`);
        }
        setIsSearching(false);
        setLoadingStep(0);
      }, 3000);
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
              </div>

              {/* Control Panel */}
              <div className="p-4 border-t border-white/10">
                <Space size="middle" wrap>
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
                    {/* Checking Models Animation */}
                    <div className="flex items-center gap-3 text-cyan-400">
                      <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm font-medium">Searching database...</span>
                    </div>
                    
                    {loadingStep >= 1 && (
                      <div className="flex items-center gap-3 text-blue-400 animate-fade-in">
                        <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm font-medium">Loading 3D models...</span>
                      </div>
                    )}
                    
                    {loadingStep >= 2 && (
                      <div className="flex items-center gap-3 text-purple-400 animate-fade-in">
                        <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm font-medium">Verifying specifications...</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Search Result */}
                {searchResult && !isSearching && (
                  <div className="space-y-4 animate-fade-in">
                    {searchResult.found ? (
                      <>
                        {/* Part Found */}
                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <div className="flex items-center gap-2 text-green-400 mb-3">
                            <CheckCircleOutlined className="text-xl" />
                            <span className="font-semibold">Part Found</span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Part Number:</span>
                              <span className="text-white font-mono">{searchResult.partNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Description:</span>
                              <span className="text-white">{searchResult.description}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Manufacturer:</span>
                              <span className="text-white">{searchResult.manufacturer}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Status:</span>
                              <Tag color="success">{searchResult.status}</Tag>
                            </div>
                          </div>
                        </div>
                        <Button
                          type="primary"
                          block
                          icon={<CameraOutlined />}
                          onClick={captureImage}
                          loading={isCapturing}
                          className="bg-gradient-to-r from-green-500 to-green-600 border-0 hover:from-green-600 hover:to-green-700"
                        >
                          Capture & Verify IC
                        </Button>
                      </>
                    ) : (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="flex items-center gap-2 text-red-400 mb-2">
                          <CloseCircleOutlined className="text-xl" />
                          <span className="font-semibold">Part Not Found</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          No matching part found for "{partNumber}". Please check the part number and try again.
                        </p>
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
