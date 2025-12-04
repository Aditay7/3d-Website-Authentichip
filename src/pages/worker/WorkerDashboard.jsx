import React, { useState } from 'react';
import { Card, Row, Col, Statistic, List, Tag, Modal, Progress } from 'antd';
import {
  CheckCircleOutlined,
  WarningOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { scanResults, performanceHistory } from '../../data/mockData';

const WorkerDashboard = () => {
  const [selectedScan, setSelectedScan] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const recentScans = scanResults.slice(0, 10);
  const passCount = recentScans.filter((s) => s.status === 'PASS').length;
  const failCount = recentScans.length - passCount;
  const passRate = ((passCount / recentScans.length) * 100).toFixed(1);
  const avgConfidence = (
    recentScans.reduce((acc, curr) => acc + curr.confidence, 0) / recentScans.length
  ).toFixed(1);

  const showModal = (scan) => {
    setSelectedScan(scan);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedScan(null);
  };

  return (
    <div className="relative space-y-6">
      {/* Enhanced gradient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-linear-to-b from-cyan-900/30 via-cyan-800/35 to-cyan-900/25 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-r from-cyan-900/20 via-transparent to-cyan-900/20 pointer-events-none" />
      </div>
      <div className="relative z-10">
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
          Worker Dashboard
        </h1>
        <p className="text-gray-400 text-lg">Real-time scan analytics and performance metrics</p>
      </div>

      {/* Stats Grid */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            className="!bg-white/5 !border-white/10 backdrop-blur-md hover:!bg-white/10 transition-all duration-300"
            style={{
              boxShadow: '0 8px 32px rgba(34, 211, 238, 0.15)',
            }}
          >
            <Statistic
              title={<span className="text-gray-400">Total Scans Today</span>}
              value={recentScans.length}
              valueStyle={{ color: '#22d3ee', fontSize: '2rem', fontWeight: 'bold' }}
              prefix={<CheckCircleOutlined className="text-cyan-400" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            className="!bg-white/5 !border-white/10 backdrop-blur-md hover:!bg-white/10 transition-all duration-300"
            style={{
              boxShadow: '0 8px 32px rgba(34, 211, 238, 0.15)',
            }}
          >
            <Statistic
              title={<span className="text-gray-400">Pass Rate</span>}
              value={passRate}
              suffix="%"
              valueStyle={{ color: '#10b981', fontSize: '2rem', fontWeight: 'bold' }}
              prefix={<TrophyOutlined className="text-green-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            className="!bg-white/5 !border-white/10 backdrop-blur-md hover:!bg-white/10 transition-all duration-300"
            style={{
              boxShadow: '0 8px 32px rgba(34, 211, 238, 0.15)',
            }}
          >
            <Statistic
              title={<span className="text-gray-400">Avg Confidence</span>}
              value={avgConfidence}
              suffix="%"
              valueStyle={{ color: '#3b82f6', fontSize: '2rem', fontWeight: 'bold' }}
              prefix={<RiseOutlined className="text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            className="!bg-white/5 !border-white/10 backdrop-blur-md hover:!bg-white/10 transition-all duration-300"
            style={{
              boxShadow: '0 8px 32px rgba(34, 211, 238, 0.15)',
            }}
          >
            <Statistic
              title={<span className="text-gray-400">Failed Scans</span>}
              value={failCount}
              valueStyle={{ color: '#ef4444', fontSize: '2rem', fontWeight: 'bold' }}
              prefix={<WarningOutlined className="text-red-500" />}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            title={<span className="text-white text-lg font-semibold">Performance Trend (7 Days)</span>}
            className="!bg-white/5 !border-white/10 backdrop-blur-md"
            headStyle={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(34, 211, 238, 0.3)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="passRate"
                    stroke="#22d3ee"
                    strokeWidth={3}
                    dot={{ fill: '#22d3ee', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={<span className="text-white text-lg font-semibold">Scan Distribution</span>}
            className="!bg-white/5 !border-white/10 backdrop-blur-md"
            headStyle={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Pass', value: passCount },
                    { name: 'Fail', value: failCount },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(34, 211, 238, 0.3)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="value" fill="#22d3ee" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Scans List */}
      <Card
        title={<span className="text-white text-xl font-bold">Recent Scans</span>}
        className="!bg-white/5 !border-white/10 backdrop-blur-md"
        headStyle={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}
      >
        <List
          dataSource={recentScans}
          renderItem={(item) => (
            <List.Item
              className="border-b !border-white/10 last:border-0 hover:!bg-white/10 transition-all cursor-pointer"
              onClick={() => showModal(item)}
              style={{
                background: 'linear-gradient(90deg, rgba(34, 211, 238, 0.02) 0%, transparent 100%)',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '8px',
              }}
            >
              <div className="w-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <span className="text-cyan-300 font-mono text-lg font-semibold">{item.id}</span>
                    <Tag
                      color={item.status === 'PASS' ? 'success' : 'error'}
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        padding: '6px 14px',
                        borderRadius: '6px',
                      }}
                    >
                      {item.status}
                    </Tag>
                  </div>
                  <div className="text-gray-300 text-base">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <div className="flex items-center gap-6 text-base">
                  <span className="text-gray-200">
                    Confidence: <span className="text-blue-300 font-semibold">{item.confidence.toFixed(1)}%</span>
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-200">
                    Batch: <span className="text-cyan-400 font-semibold">{item.batchId}</span>
                  </span>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Card>

      {/* Modal for Scan Details */}
      <Modal
        title={<span className="text-white">Scan Details</span>}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        styles={{
          content: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(34, 211, 238, 0.3)',
          },
          header: {
            backgroundColor: 'transparent',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        {selectedScan && (
          <div className="space-y-4 text-gray-300">
            <div className="flex justify-between">
              <span>Scan ID:</span>
              <span className="text-cyan-400 font-mono">{selectedScan.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <Tag color={selectedScan.status === 'PASS' ? 'success' : 'error'}>{selectedScan.status}</Tag>
            </div>
            <div className="flex justify-between">
              <span>Confidence:</span>
              <span className="text-blue-400">{selectedScan.confidence.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Batch ID:</span>
              <span className="text-gray-400">{selectedScan.batchId}</span>
            </div>
            {selectedScan.failureReason && (
              <div className="flex justify-between">
                <span>Failure Reason:</span>
                <span className="text-red-400">{selectedScan.failureReason}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Timestamp:</span>
              <span className="text-gray-400">{new Date(selectedScan.timestamp).toLocaleString()}</span>
            </div>
          </div>
        )}
      </Modal>
      </div>
    </div>
  );
};

export default WorkerDashboard;
