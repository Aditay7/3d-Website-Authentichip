import React, { useContext, useMemo, useState } from "react";
import {
	Row,
	Col,
	Card,
	Avatar,
	Tag,
	Statistic,
	Space,
	Form,
	Input,
	Select,
	Button,
	Tabs,
	Table,
	notification,
	Divider,
	ConfigProvider,
	theme,
} from "antd";
import {
	EditOutlined,
	UserOutlined,
	SafetyCertificateOutlined,
	HistoryOutlined,
	SaveOutlined,
	UndoOutlined,
	MailOutlined,
	IdcardOutlined,
	CameraOutlined,
	CheckCircleOutlined,
	LockOutlined,
} from "@ant-design/icons";
import AuthContext from "../../context/AuthContext";
import { scanResults, workerStats } from "../../data/mockData";

export default function UserProfilePage() {
	const { user, userRole } = useContext(AuthContext);
	const [editing, setEditing] = useState(false);
	const [form] = Form.useForm();

	const stats = useMemo(() => {
		const total = scanResults.length;
		const pass = scanResults.filter((s) => s.status === "PASS").length;
		const passRate = Math.round((pass / Math.max(1, total)) * 100);
		const activeWorkers = workerStats.filter(
			(w) => w.currentStatus === "Active"
		).length;
		return { total, passRate, activeWorkers };
	}, []);

	const recent = useMemo(
		() =>
			scanResults.slice(0, 8).map((r) => ({
				key: r.id,
				id: r.id,
				batch: r.batchId,
				status: r.status,
				time: new Date(r.timestamp).toLocaleString(),
			})),
		[]
	);

	const columns = [
		{
			title: "Scan ID",
			dataIndex: "id",
			key: "id",
			render: (t) => <span className="text-cyan-300 font-mono">{t}</span>,
		},
		{
			title: "Batch",
			dataIndex: "batch",
			key: "batch",
			render: (t) => <span className="text-gray-300">{t}</span>,
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (s) => (
				<Tag
					color={s === "PASS" ? "success" : "error"}
					className="font-bold border-none"
				>
					{s}
				</Tag>
			),
		},
		{
			title: "Time",
			dataIndex: "time",
			key: "time",
			render: (t) => <span className="text-gray-400 text-xs">{t}</span>,
		},
	];

	const onFinish = (vals) => {
		notification.success({
			message: "Profile saved",
			description: "Your changes have been saved locally.",
			style: {
				backgroundColor: "rgba(6, 30, 38, 0.9)",
				border: "1px solid rgba(34, 211, 238, 0.2)",
				color: "white",
			},
		});
		setEditing(false);
	};

	// Custom styles for glassmorphism cards
	const cardStyle = {
		background: "rgba(255, 255, 255, 0.03)",
		backdropFilter: "blur(10px)",
		border: "1px solid rgba(255, 255, 255, 0.08)",
		boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
	};

	// Theme overrides for Ant Design components in this dark context
	const darkThemeConfig = {
		algorithm: theme.darkAlgorithm,
		token: {
			colorText: "rgba(255, 255, 255, 0.9)",
			colorTextSecondary: "rgba(255, 255, 255, 0.7)",
			colorBgContainer: "transparent",
			colorBorder: "rgba(255, 255, 255, 0.15)",
			colorPrimary: "#22d3ee", // Cyan
		},
		components: {
			Input: {
				colorText: "#ffffff",
				colorTextPlaceholder: "rgba(255, 255, 255, 0.4)",
				colorBgContainer: "rgba(255, 255, 255, 0.05)",
				activeBorderColor: "#22d3ee",
				hoverBorderColor: "rgba(34, 211, 238, 0.5)",
			},
			Select: {
				colorText: "#ffffff",
				colorTextPlaceholder: "rgba(255, 255, 255, 0.4)",
				colorBgContainer: "rgba(255, 255, 255, 0.05)",
				colorBgElevated: "#001529", // Dropdown background
				optionSelectedBg: "rgba(34, 211, 238, 0.2)",
			},
			Tabs: {
				itemColor: "rgba(255, 255, 255, 0.6)",
				itemSelectedColor: "#22d3ee",
				itemHoverColor: "#22d3ee",
				inkBarColor: "#22d3ee",
			},
			Table: {
				colorBgContainer: "transparent",
				colorText: "rgba(255, 255, 255, 0.9)",
				headerBg: "rgba(255, 255, 255, 0.05)",
				headerColor: "rgba(255, 255, 255, 0.9)",
				rowHoverBg: "rgba(255, 255, 255, 0.08)",
			},
			Button: {
				colorPrimary: "#22d3ee",
				colorPrimaryHover: "#06b6d4",
				colorTextLightSolid: "#ffffff",
			},
			Pagination: {
				colorText: "#000000",
				colorPrimary: "#22d3ee",
			},
		},
	};

	return (
		<ConfigProvider theme={darkThemeConfig}>
			<div className="animate-fade-in">
				<Row gutter={[24, 24]}>
					{/* Left Column: Profile Card */}
					<Col xs={24} lg={8}>
						<Card
							className="rounded-2xl overflow-hidden border-0 h-full"
							style={cardStyle}
							bodyStyle={{ padding: 0 }}
						>
							{/* Banner/Header */}
							<div className="h-32 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 relative">
								<div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
									<div className="relative group">
										<Avatar
											size={100}
											icon={<UserOutlined />}
											className="border-4 border-black/50 shadow-xl bg-gradient-to-br from-cyan-500 to-blue-600"
										/>
										<div className="absolute bottom-0 right-0 bg-gray-900 rounded-full p-1.5 border border-gray-700 cursor-pointer hover:bg-cyan-600 transition-colors">
											<CameraOutlined className="text-white text-sm" />
										</div>
									</div>
								</div>
							</div>

							<div className="pt-16 pb-8 px-6 text-center">
								<h3 className="text-2xl font-bold text-white mb-1">
									{user?.email?.split("@")[0] || "Admin User"}
								</h3>
								<div className="mb-6">
									<Tag
										color="cyan"
										className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border-none bg-cyan-500/20 text-cyan-300"
									>
										{userRole || "Administrator"}
									</Tag>
								</div>

								<Divider className="border-white/10 my-6" />

								<div className="grid grid-cols-3 gap-2 mb-6">
									<div className="text-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
										<div className="text-cyan-400 text-lg font-bold">
											{stats.total}
										</div>
										<div className="text-gray-400 text-xs uppercase tracking-wide">
											Scans
										</div>
									</div>
									<div className="text-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
										<div className="text-green-400 text-lg font-bold">
											{stats.passRate}%
										</div>
										<div className="text-gray-400 text-xs uppercase tracking-wide">
											Pass Rate
										</div>
									</div>
									<div className="text-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
										<div className="text-purple-400 text-lg font-bold">
											{stats.activeWorkers}
										</div>
										<div className="text-gray-400 text-xs uppercase tracking-wide">
											Workers
										</div>
									</div>
								</div>

								<Button
									type={editing ? "default" : "primary"}
									ghost={!editing}
									block
									size="large"
									icon={editing ? <UndoOutlined /> : <EditOutlined />}
									onClick={() => setEditing((v) => !v)}
									className={
										editing
											? "border-white/20 text-white hover:text-cyan-400 hover:border-cyan-400"
											: "bg-gradient-to-r from-cyan-600 to-blue-600 border-none hover:opacity-90 shadow-lg shadow-cyan-900/20 !text-white"
									}
								>
									{editing ? "Cancel Editing" : "Edit Profile"}
								</Button>
							</div>
						</Card>
					</Col>

					{/* Right Column: Details & Settings */}
					<Col xs={24} lg={16}>
						<Card
							className="rounded-2xl border-0 h-full"
							style={cardStyle}
							bodyStyle={{ padding: "24px" }}
						>
							<Tabs
								defaultActiveKey="details"
								className="custom-tabs"
								items={[
									{
										key: "details",
										label: (
											<span className="flex items-center gap-2">
												<IdcardOutlined /> Personal Details
											</span>
										),
										children: (
											<Form
												form={form}
												layout="vertical"
												initialValues={{
													name: "Admin User",
													email: user?.email || "admin@example.com",
													role: userRole || "admin",
													bio: "Senior System Administrator overseeing production line quality control and worker performance.",
												}}
												onFinish={onFinish}
												disabled={!editing}
												className="mt-4"
											>
												<Row gutter={24}>
													<Col span={12}>
														<Form.Item
															label={
																<span className="text-gray-300">Full Name</span>
															}
															name="name"
														>
															<Input
																prefix={
																	<UserOutlined className="text-gray-400" />
																}
																className="!text-white"
																size="large"
															/>
														</Form.Item>
													</Col>
													<Col span={12}>
														<Form.Item
															label={
																<span className="text-gray-300">Email</span>
															}
															name="email"
														>
															<Input
																prefix={
																	<MailOutlined className="text-gray-400" />
																}
																className="!text-white"
																size="large"
															/>
														</Form.Item>
													</Col>
													<Col span={12}>
														<Form.Item
															label={
																<span className="text-gray-300">Role</span>
															}
															name="role"
														>
															<Select
																className="custom-select !text-white"
																size="large"
																options={[
																	{ label: "Admin", value: "admin" },
																	{ label: "Worker", value: "worker" },
																	{ label: "Supervisor", value: "supervisor" },
																]}
															/>
														</Form.Item>
													</Col>
													<Col span={24}>
														<Form.Item
															label={<span className="text-gray-300">Bio</span>}
															name="bio"
														>
															<Input.TextArea
																rows={4}
																className="!text-white"
															/>
														</Form.Item>
													</Col>
												</Row>

												{editing && (
													<div className="flex justify-end gap-3 mt-4">
														<Button
															onClick={() => {
															form.resetFields();
															setEditing(false);
														}}
															className="bg-transparent border-white/20 text-gray-300 hover:text-white hover:border-white"
														>
															Reset
														</Button>
														<Button
															type="primary"
															htmlType="submit"
															icon={<SaveOutlined />}
															className="bg-cyan-600 hover:bg-cyan-500 border-none"
														>
															Save Changes
														</Button>
													</div>
												)}
											</Form>
										),
									},
									{
										key: "security",
										label: (
											<span className="flex items-center gap-2">
												<SafetyCertificateOutlined /> Security
											</span>
										),
										children: (
											<div className="mt-4 max-w-lg">
												<Form layout="vertical">
													<Form.Item
														label={
															<span className="text-gray-300">
																Current Password
															</span>
														}
													>
														<Input.Password
															prefix={
																<LockOutlined className="text-gray-400" />
															}
															className="!text-white"
															size="large"
														/>
													</Form.Item>
													<Form.Item
														label={
															<span className="text-gray-300">New Password</span>
														}
													>
														<Input.Password
															prefix={
																<LockOutlined className="text-gray-400" />
															}
															className="!text-white"
															size="large"
														/>
													</Form.Item>
													<Form.Item
														label={
															<span className="text-gray-300">
																Confirm New Password
															</span>
														}
													>
														<Input.Password
															prefix={
																<LockOutlined className="text-gray-400" />
															}
															className="!text-white"
															size="large"
														/>
													</Form.Item>
													<Button
														type="primary"
														className="bg-red-600/80 hover:bg-red-500 border-none mt-2"
													>
														Update Password
													</Button>
												</Form>
											</div>
										),
									},
									{
										key: "activity",
										label: (
											<span className="flex items-center gap-2">
												<HistoryOutlined /> Recent Activity
											</span>
										),
										children: (
											<div className="mt-4">
												<Table
													columns={columns}
													dataSource={recent}
													pagination={{ pageSize: 5 }}
													className="admin-history-table"
													rowClassName="hover:bg-white/5 transition-colors"
												/>
											</div>
										),
									},
								]}
							/>
						</Card>
					</Col>
				</Row>
			</div>
		</ConfigProvider>
	);
}
