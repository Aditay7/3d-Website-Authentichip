import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import { Card, Table, Tag, Input, DatePicker, Button, Space, Modal } from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { scanResults } from '../../data/mockData';

const { RangePicker } = DatePicker;

const HistoryPage = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(scanResults);
  const [selectedScan, setSelectedScan] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = scanResults.filter(
      (item) =>
        item.id.toLowerCase().includes(value.toLowerCase()) ||
        item.batchId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const showDetails = (record) => {
    setSelectedScan(record);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Scan ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span className="text-cyan-400 font-mono">{text}</span>,
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: 'Batch ID',
      dataIndex: 'batchId',
      key: 'batchId',
      render: (text) => <span className="text-gray-300">{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'PASS' ? 'success' : 'error'} style={{ fontSize: '13px', padding: '4px 12px' }}>
          {status}
        </Tag>
      ),
      filters: [
        { text: 'PASS', value: 'PASS' },
        { text: 'FAIL', value: 'FAIL' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Confidence',
      dataIndex: 'confidence',
      key: 'confidence',
      render: (confidence) => (
        <span className={confidence > 90 ? 'text-green-400' : confidence > 75 ? 'text-blue-400' : 'text-yellow-400'}>
          {confidence.toFixed(1)}%
        </span>
      ),
      sorter: (a, b) => a.confidence - b.confidence,
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp) => (
        <span
          className="px-3 py-1 rounded-lg text-white font-medium"
          style={{
            background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.3) 0%, rgba(96, 165, 250, 0.3) 100%)',
            border: '1px solid rgba(34, 211, 238, 0.4)',
            fontSize: '12px',
            backdropFilter: 'blur(10px)'
          }}
        >
          {new Date(timestamp).toLocaleString()}
        </span>
      ),
      sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => showDetails(record)}
          className="text-cyan-400 hover:text-cyan-300"
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-black relative">
      <Navbar />

      {/* Enhanced gradient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-linear-to-b from-cyan-900/30 via-cyan-800/35 to-cyan-900/25 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-r from-cyan-900/20 via-transparent to-cyan-900/20 pointer-events-none" />
      </div>

      <div className="relative z-10 pt-24 px-6 pb-12 space-y-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1
            className="text-4xl font-black mb-2"
            style={{
              background: 'linear-gradient(135deg, #22d3ee 0%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Scan History
          </h1>
          <p className="text-gray-400 text-lg">View and manage all your scan records</p>
        </div>

        {/* Filters */}
        <Card className="!bg-white/5 !border-white/10 backdrop-blur-md">
          <Space size="middle" wrap>
            <Input
              placeholder="Search by Scan ID or Batch ID"
              prefix={<SearchOutlined />}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                width: 300,
                color: 'white !important',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
              size="large"
              className="!bg-white/10 !border-white/20 !text-white placeholder:!text-gray-400"
            />
            <RangePicker
              size="large"
              className="!bg-white/10 !border-white/20 !text-white placeholder:!text-gray-400"
              style={{
                color: 'white !important',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
            />
            <Button
              icon={<FilterOutlined style={{ color: 'white' }} />}
              size="large"
              style={{ color: 'white' }}
              className="!bg-white/10 !border-white/20 hover:!bg-white/20"
            >
              <span style={{ color: 'white' }}>More Filters</span>
            </Button>
            <Button
              icon={<DownloadOutlined />}
              size="large"
              type="primary"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 border-0"
            >
              Export
            </Button>
          </Space>
        </Card>

        {/* History Table */}
        <Card
          className="!bg-white/5 !border-white/10 backdrop-blur-md"
          bodyStyle={{ padding: 0 }}
        >
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => <span style={{ color: 'white' }}>{`Total ${total} scans`}</span>,
            }}
            className="worker-history-table"
            style={{
              background: 'transparent',
            }}
          />
        </Card>

        {/* Detail Modal */}
        <Modal
          title={<span className="text-white text-xl">Scan Details</span>}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={600}
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
            <div className="space-y-4">
              <Card className="!bg-white/5 !border-white/10">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Scan ID:</span>
                    <span className="text-cyan-400 font-mono font-semibold">{selectedScan.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Batch ID:</span>
                    <span className="text-cyan-400 font-semibold">{selectedScan.batchId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Status:</span>
                    <Tag color={selectedScan.status === 'PASS' ? 'success' : 'error'}>
                      {selectedScan.status}
                    </Tag>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Confidence:</span>
                    <span className="text-blue-400 font-semibold">{selectedScan.confidence.toFixed(2)}%</span>
                  </div>
                  {selectedScan.failureReason && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Failure Reason:</span>
                      <span className="text-red-400">{selectedScan.failureReason}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Timestamp:</span>
                    <span className="text-gray-300">{new Date(selectedScan.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </Modal>

        <style jsx global>{`
        .worker-history-table .ant-table {
          background: transparent !important;
        }
        .worker-history-table .ant-table-thead > tr > th {
          background: rgba(255, 255, 255, 0.05) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: rgba(255, 255, 255, 0.85) !important;
        }
        .worker-history-table .ant-table-tbody > tr {
          background: transparent !important;
        }
        .worker-history-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
          color: rgba(255, 255, 255, 0.65) !important;
          background: transparent !important;
        }
        .worker-history-table .ant-table-tbody > tr:hover > td {
          background: rgba(255, 255, 255, 0.05) !important;
        }
        .worker-history-table .ant-pagination-item {
          background: rgba(255, 255, 255, 0.05) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
        }
        .worker-history-table .ant-pagination-item a {
          color: white !important;
        }
        .worker-history-table .ant-pagination-total-text {
          color: white !important;
        }
        .worker-history-table .ant-pagination-prev .ant-pagination-item-link,
        .worker-history-table .ant-pagination-next .ant-pagination-item-link {
          color: white !important;
        }
        .worker-history-table .ant-pagination-jump-prev .ant-pagination-item-link-icon,
        .worker-history-table .ant-pagination-jump-next .ant-pagination-item-link-icon {
          color: white !important;
        }
        .worker-history-table .ant-pagination-item-active {
          background: rgba(34, 211, 238, 0.2) !important;
          border-color: #22d3ee !important;
        }
        .worker-history-table .ant-pagination-item-active a {
          color: #22d3ee !important;
        }
        .ant-input {
          color: white !important;
        }
        .ant-input::placeholder {
          color: rgba(255, 255, 255, 0.4) !important;
        }
        .ant-picker {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          color: white !important;
        }
        .ant-picker-input > input {
          color: white !important;
        }
        .ant-picker-input > input::placeholder {
          color: rgba(255, 255, 255, 0.4) !important;
        }
      `}</style>
      </div>
    </div>
  );
};

export default HistoryPage;
