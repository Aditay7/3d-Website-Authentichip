import React, { useState } from 'react';
import { Card, Row, Col, Avatar, Button, Form, Input, Upload, message, Progress } from 'antd';
import { UploadOutlined, UserOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';

const ProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  // Mocked profile data (replace with API data as needed)
  const initialProfile = {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    role: 'Operator',
    phone: '+91 98765 43210',
    location: 'Bengaluru, India',
    bio: 'Experienced IC authentication operator focused on process quality and throughput.'
  };

  const [profile, setProfile] = useState(initialProfile);

  const stats = {
    totalScans: 1240,
    passRate: 92,
    lastShiftScans: 48,
  };

  const startEdit = () => {
    form.setFieldsValue(profile);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    form.resetFields();
  };

  const handleSave = async (values) => {
    setSaving(true);
    // Simulate save API call
    setTimeout(() => {
      setProfile((prev) => ({ ...prev, ...values }));
      message.success('Profile updated successfully');
      setEditing(false);
      setSaving(false);
    }, 1000);
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) message.error('Only image files are allowed');
      return false; // prevent auto upload
    }
  };

  return (
    <div className="relative max-w-5xl mx-auto space-y-6">
      {/* Background layers preserved */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-linear-to-b from-cyan-900/30 via-cyan-800/35 to-cyan-900/25 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-r from-cyan-900/20 via-transparent to-cyan-900/20 pointer-events-none" />
      </div>

      <div className="relative z-10 p-6">
        <div className="mb-6">
          <h1
            className="text-4xl font-black mb-2"
            style={{
              background: 'linear-gradient(135deg, #22d3ee 0%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Worker Profile
          </h1>
          <p className="text-gray-400 text-lg">View and update your profile information</p>
        </div>

        <Row gutter={24}>
          <Col xs={24} lg={8}>
            <Card className="!bg-white/5 !border-white/10 backdrop-blur-md">
              <div className="flex flex-col items-center text-center">
                <Avatar size={120} icon={<UserOutlined />} className="mb-4 bg-cyan-700/30" />
                <h2 className="text-white text-2xl font-semibold">{profile.name}</h2>
                <div className="text-gray-300 mb-3">{profile.role}</div>

                <div className="w-full space-y-3 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">Total Scans</div>
                    <div className="text-white font-bold">{stats.totalScans}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">Pass Rate</div>
                    <div className="text-white font-bold">{stats.passRate}%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">Last Shift</div>
                    <div className="text-white font-bold">{stats.lastShiftScans} scans</div>
                  </div>

                  <div className="mt-4">
                    <Progress percent={stats.passRate} strokeColor={{ '0%': '#22d3ee', '100%': '#60a5fa' }} />
                  </div>

                  {!editing ? (
                    <div className="mt-6 space-y-2">
                      <Button icon={<EditOutlined />} block onClick={startEdit}>
                        Edit Profile
                      </Button>
                      <Button block type="default" onClick={() => message.info('Profile exported (demo)')}>
                        Export Profile
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-6 flex gap-3">
                      <Button block onClick={cancelEdit}>Cancel</Button>
                      <Button block type="primary" onClick={() => form.submit()} loading={saving} icon={<SaveOutlined />}>
                        Save
                      </Button>
                    </div>
                  )}
                </div>

                <div className="mt-6 w-full">
                  <Upload {...uploadProps} showUploadList={false}>
                    <Button icon={<UploadOutlined />} className="w-full">Upload Avatar</Button>
                  </Upload>
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={16}>
            <Card className="!bg-white/5 !border-white/10 backdrop-blur-md">
              <Form
                form={form}
                layout="vertical"
                initialValues={profile}
                onFinish={handleSave}
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item name="name" label={<span className="text-gray-300">Full Name</span>} rules={[{ required: true }]}> 
                      <Input disabled={!editing} className="!bg-white/10 !border-white/20 text-white" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item name="email" label={<span className="text-gray-300">Email</span>} rules={[{ required: true, type: 'email' }]}>
                      <Input disabled={!editing} className="!bg-white/10 !border-white/20 text-white" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item name="phone" label={<span className="text-gray-300">Phone</span>}>
                      <Input disabled={!editing} className="!bg-white/10 !border-white/20 text-white" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item name="location" label={<span className="text-gray-300">Location</span>}>
                      <Input disabled={!editing} className="!bg-white/10 !border-white/20 text-white" />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Form.Item name="bio" label={<span className="text-gray-300">Bio</span>}>
                      <Input.TextArea rows={4} disabled={!editing} className="!bg-white/10 !border-white/20 text-white" />
                    </Form.Item>
                  </Col>
                </Row>

                {!editing && (
                  <div className="text-gray-400 text-sm">Click <span className="text-white">Edit Profile</span> to update your details.</div>
                )}
              </Form>
            </Card>
          </Col>
        </Row>

        <style jsx global>{`
          .ant-input, .ant-input-affix-wrapper, .ant-select-selector, .ant-input-number {
            color: white !important;
          }
          .ant-input::placeholder { color: rgba(255,255,255,0.4) !important; }
        `}</style>
      </div>
    </div>
  );
};

export default ProfilePage;
