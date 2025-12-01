import React from 'react';
import Navbar from '../components/layout/Navbar';
import HardwareModel3D from '../components/3d/HardwareModel3D';
import { Card, Row, Col, Statistic, Table, Tag, Progress } from 'antd';
import { AreaChartOutlined, UserOutlined, WarningOutlined, DatabaseOutlined, CloudServerOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { scanResults, workerStats, batchData, performanceHistory } from '../data/mockData';
import { useRoleProtection } from '../utils/roleProtection';

const AdminPage = () => {
  // Protect this page - only admins can access
  useRoleProtection('admin');
  const totalScans = scanResults.length;
  const passCount = scanResults.filter(s => s.status === 'PASS').length;
  const passRate = ((passCount / totalScans) * 100).toFixed(1);
  const avgConfidence = (scanResults.reduce((acc, curr) => acc + curr.confidence, 0) / totalScans).toFixed(1);
  const activeWorkers = workerStats.filter(w => w.currentStatus === 'Active').length;

  const failureTypes = [
    { name: 'Misalignment', value: 4 },
    { name: 'Missing Component', value: 3 },
    { name: 'Soldering Defect', value: 2 },
    { name: 'Damage', value: 1 },
  ];

  const COLORS = ['#22d3ee', '#3b82f6', '#8b5cf6', '#ec4899'];

  const batchColumns = [
    { title: 'Batch ID', dataIndex: 'batchId', key: 'batchId' },
    { title: 'Part', dataIndex: 'expectedPartNumber', key: 'expectedPartNumber' },
    { title: 'Total', dataIndex: 'totalScanned', key: 'totalScanned' },
    { title: 'Fail Rate %', dataIndex: 'failRate', key: 'failRate', render: val => `${val}%` },
    { title: 'Time/Scan (ms)', dataIndex: 'timePerScanMs', key: 'timePerScanMs' },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-sans">
      <Navbar />

      {/* 3D Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="w-full h-full opacity-40">
          <HardwareModel3D scrollProgress={0.8} />
        </div>
      </div>

      {/* Hero Background Styles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Cyan gradient background */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(22, 78, 99, 0.3) 0%, rgba(21, 94, 117, 0.35) 50%, rgba(22, 78, 99, 0.25) 100%)' }}></div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(22, 78, 99, 0.2) 0%, transparent 50%, rgba(22, 78, 99, 0.2) 100%)' }}></div>

        {/* Background effects */}
        <div className="absolute inset-0">
          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/25 via-cyan-600/12 to-transparent rounded-full blur-3xl"></div>

          {/* Scan rings */}
          <div className="absolute inset-0 w-[600px] h-[600px] m-auto border border-cyan-500/10 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-[500px] h-[500px] m-auto border border-cyan-500/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-0 w-[400px] h-[400px] m-auto border border-cyan-500/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      <div className="relative z-10 pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header with 3D effect */}
          <div className="mb-8">
            <h1 className="text-5xl font-black mb-2"
              style={{
                background: 'linear-gradient(135deg, #22d3ee 0%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 4px 8px rgba(34, 211, 238, 0.3), 0 0 20px rgba(34, 211, 238, 0.2)',
                transform: 'perspective(500px) rotateX(5deg)'
              }}>
              Admin Analytics Dashboard
            </h1>
            <p className="text-gray-400 text-lg">Comprehensive system overview and performance insights</p>
          </div>

          {/* Global Stats with 3D Cards */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Card
                className="!bg-white/5 !border-white/10 backdrop-blur-md hover:!bg-white/10 transition-all duration-300"
                style={{
                  transform: 'perspective(1000px) rotateY(-3deg)',
                  boxShadow: '0 8px 32px rgba(34, 211, 238, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <Statistic
                  title={<span className="text-gray-400">Total Scans</span>}
                  value={totalScans}
                  valueStyle={{ color: '#22d3ee', fontSize: '2rem', fontWeight: 'bold' }}
                  prefix={<AreaChartOutlined className="text-cyan-400" />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                className="!bg-white/5 !border-white/10 backdrop-blur-md hover:!bg-white/10 transition-all duration-300"
                style={{
                  transform: 'perspective(1000px) rotateY(-1deg)',
                  boxShadow: '0 8px 32px rgba(34, 211, 238, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <Statistic
                  title={<span className="text-gray-400">Pass Rate</span>}
                  value={passRate}
                  precision={1}
                  suffix="%"
                  valueStyle={{ color: '#10b981', fontSize: '2rem', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                className="!bg-white/5 !border-white/10 backdrop-blur-md hover:!bg-white/10 transition-all duration-300"
                style={{
                  transform: 'perspective(1000px) rotateY(1deg)',
                  boxShadow: '0 8px 32px rgba(34, 211, 238, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <Statistic
                  title={<span className="text-gray-400">Avg OCR Confidence</span>}
                  value={avgConfidence}
                  suffix="%"
                  valueStyle={{ color: '#3b82f6', fontSize: '2rem', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                className="!bg-white/5 !border-white/10 backdrop-blur-md hover:!bg-white/10 transition-all duration-300"
                style={{
                  transform: 'perspective(1000px) rotateY(3deg)',
                  boxShadow: '0 8px 32px rgba(34, 211, 238, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <Statistic
                  title={<span className="text-gray-400">Active Workers</span>}
                  value={activeWorkers}
                  valueStyle={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}
                  prefix={<UserOutlined className="text-green-500" />}
                />
              </Card>
            </Col>
          </Row>

          {/* Worker Activity Grid */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white mb-4">Real-Time Worker Activity</h2>
          </div>
          <Row gutter={[16, 16]}>
            {workerStats.map(worker => (
              <Col xs={24} sm={12} md={8} lg={4} key={worker.workerId}>
                <Card
                  className="!bg-white/5 !border-white/10 backdrop-blur-md hover:!border-white/20 transition-all duration-300"
                  bodyStyle={{ padding: '12px' }}
                  style={{
                    boxShadow: '0 4px 16px rgba(34, 211, 238, 0.1)',
                    transform: 'translateZ(0)'
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-white font-semibold text-sm">{worker.workerName}</span>
                    {worker.failStreak >= 3 && <WarningOutlined className="text-red-500 animate-pulse" />}
                  </div>
                  <div className="mb-2">
                    <Tag color={worker.currentStatus === 'Active' ? 'green' : worker.currentStatus === 'Idle' ? 'orange' : 'red'}>
                      {worker.currentStatus}
                    </Tag>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Scans: {worker.liveScanCount}</span>
                    <span className={worker.lastScanResult === 'PASS' ? 'text-green-500' : 'text-red-500'}>
                      {worker.lastScanResult}
                    </span>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Charts Section */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={8}>
              <Card
                title={<span className="text-white text-lg font-semibold">Failure Type Breakdown</span>}
                className="!bg-white/5 !border-white/10 backdrop-blur-md h-full"
                headStyle={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                style={{
                  boxShadow: '0 8px 32px rgba(34, 211, 238, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={failureTypes}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {failureTypes.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            style={{ filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.4))' }}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          border: '1px solid rgba(34, 211, 238, 0.3)',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={16}>
              <Card
                title={<span className="text-white text-lg font-semibold">Performance Trend (7 Days)</span>}
                className="!bg-white/5 !border-white/10 backdrop-blur-md h-full"
                headStyle={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                style={{
                  boxShadow: '0 8px 32px rgba(34, 211, 238, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
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
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="passRate"
                        stroke="#22d3ee"
                        strokeWidth={3}
                        dot={{ fill: '#22d3ee', r: 4 }}
                        name="Pass Rate %"
                        filter="drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))"
                      />
                      <Line
                        type="monotone"
                        dataKey="throughput"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        dot={{ fill: '#8b5cf6', r: 4 }}
                        name="Throughput"
                        filter="drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Batch Analytics and Worker Performance */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={14}>
              <Card
                title={<span className="text-white text-lg font-semibold">Production Line Batch Analytics</span>}
                className="!bg-white/5 !border-white/10 backdrop-blur-md"
                headStyle={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                style={{
                  boxShadow: '0 8px 32px rgba(34, 211, 238, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <Table
                  dataSource={batchData}
                  columns={batchColumns}
                  pagination={false}
                  rowKey="batchId"
                  className="ant-table-dark"
                  rowClassName="!bg-transparent text-gray-300 hover:!bg-white/5"
                />
              </Card>
            </Col>

            <Col xs={24} lg={10}>
              <Card
                title={<span className="text-white text-lg font-semibold">Worker Scan Counts</span>}
                className="!bg-white/5 !border-white/10 backdrop-blur-md"
                headStyle={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                style={{
                  boxShadow: '0 8px 32px rgba(34, 211, 238, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={workerStats} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis type="number" stroke="#9ca3af" />
                      <YAxis dataKey="workerName" type="category" stroke="#9ca3af" width={100} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          border: '1px solid rgba(34, 211, 238, 0.3)',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar
                        dataKey="liveScanCount"
                        fill="#22d3ee"
                        name="Scans"
                        radius={[0, 4, 4, 0]}
                        style={{ filter: 'drop-shadow(0 4px 12px rgba(34, 211, 238, 0.4))' }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>
          </Row>

          {/* System Health */}
          <Card
            title={<span className="text-white text-lg font-semibold">System Health & ML Monitoring</span>}
            className="!bg-white/5 !border-white/10 backdrop-blur-md"
            headStyle={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
            style={{
              boxShadow: '0 8px 32px rgba(34, 211, 238, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <Row gutter={[24, 24]}>
              <Col span={8}>
                <div className="text-gray-400 mb-2 flex items-center gap-2">
                  <CloudServerOutlined /> Backend Uptime
                </div>
                <Progress
                  percent={99.9}
                  strokeColor="#10b981"
                  format={percent => <span className="text-white">{percent}%</span>}
                />
              </Col>
              <Col span={8}>
                <div className="text-gray-400 mb-2 flex items-center gap-2">
                  <DatabaseOutlined /> Storage Usage
                </div>
                <Progress
                  percent={45}
                  strokeColor="#3b82f6"
                  format={percent => <span className="text-white">{percent}%</span>}
                />
              </Col>
              <Col span={8}>
                <div className="text-gray-400 mb-2">ML Model Accuracy</div>
                <Progress
                  percent={98.2}
                  strokeColor="#8b5cf6"
                  format={percent => <span className="text-white">{percent}%</span>}
                />
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
