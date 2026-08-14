import React, { useMemo, useState } from "react";
import {
	Card,
	Input,
	Select,
	Table,
	Tag,
	Space,
	Row,
	Col,
	Button,
	DatePicker,
	ConfigProvider,
	theme,
} from "antd";
import {
	SearchOutlined,
	EyeOutlined,
	DownloadOutlined,
	FilterOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { scanResults, workerStats } from "../../data/mockData";
import dayjs from "dayjs";

const { Search } = Input;

export default function ScanHistoryPage() {
	const [query, setQuery] = useState("");
	const [workerId, setWorkerId] = useState(undefined);

	const workerOptions = workerStats.map((w) => ({
		label: w.workerName,
		value: w.workerId,
	}));

	const [dateRange, setDateRange] = useState(null);

	const filtered = useMemo(() => {
		return scanResults
			.filter((r) => {
				if (workerId && r.workerId !== workerId) return false;
				if (!query) return true;
				const q = query.toLowerCase();
				return (
					r.id.toLowerCase().includes(q) ||
					(r.batchId || "").toLowerCase().includes(q) ||
					(r.failureReason || "").toLowerCase().includes(q)
				);
			})
			.map((r) => ({
				...r,
				key: r.id,
				timeDisplay: dayjs(r.timestamp).format("MMM DD, YYYY HH:mm"),
			}));
	}, [query, workerId]);

	const columns = [
		{
			title: "Scan ID",
			dataIndex: "id",
			key: "id",
			width: 180,
			render: (id) => (
				<Link to={`#/`} className="text-cyan-300 font-medium">
					{id}
				</Link>
			),
			responsive: ["xs", "sm", "md", "lg"],
		},
		{
			title: "Batch ID",
			dataIndex: "batchId",
			key: "batchId",
			width: 140,
			responsive: ["md"],
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			width: 120,
			render: (s) => (
				<Tag
					style={{ background: "#f0fff4", color: "#065f46", fontWeight: 700 }}
				>
					{s}
				</Tag>
			),
		},
		{
			title: "Confidence",
			dataIndex: "confidence",
			key: "confidence",
			width: 120,
			render: (v) => (
				<span style={{ color: "#10b981", fontWeight: 600 }}>{`${v.toFixed(
					1
				)}%`}</span>
			),
			responsive: ["md"],
		},
		{
			title: "Timestamp",
			dataIndex: "timeDisplay",
			key: "time",
			width: 220,
			responsive: ["lg"],
		},
		{
			title: "Actions",
			key: "actions",
			width: 120,
			render: (_, record) => (
				<Button type="link" className="text-cyan-300 flex items-center gap-2">
					<EyeOutlined /> <span>View</span>
				</Button>
			),
			responsive: ["xs", "sm", "md", "lg"],
		},
	];

	// CSV export helper
	const exportCsv = () => {
		const headers = [
			"Scan ID",
			"Batch ID",
			"Status",
			"Confidence",
			"Timestamp",
			"Worker",
			"Failure Reason",
		];
		const rows = filtered.map((r) => [
			r.id,
			r.batchId,
			r.status,
			r.confidence.toFixed(1),
			r.timeDisplay,
			r.workerId,
			r.failureReason || "",
		]);
		const csv = [headers, ...rows]
			.map((row) =>
				row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")
			)
			.join("\n");
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "scan_history.csv";
		a.click();
		URL.revokeObjectURL(url);
	};

	// Theme configuration for dark mode
	const darkThemeConfig = {
		algorithm: theme.darkAlgorithm,
		token: {
			colorText: "rgba(255, 255, 255, 0.9)",
			colorTextPlaceholder: "rgba(255, 255, 255, 0.5)",
			colorBgContainer: "rgba(255, 255, 255, 0.05)",
			colorBorder: "rgba(255, 255, 255, 0.15)",
			colorPrimary: "#22d3ee",
		},
		components: {
			Input: {
				colorText: "#ffffff",
				colorTextPlaceholder: "rgba(255, 255, 255, 0.5)",
				colorBgContainer: "rgba(255, 255, 255, 0.05)",
				activeBorderColor: "#22d3ee",
				hoverBorderColor: "rgba(34, 211, 238, 0.5)",
				controlHeight: 44,
				controlHeightLG: 48,
				fontSizeLG: 16,
			},
			Button: {
				colorText: "rgba(255, 255, 255, 0.9)",
				colorTextLightSolid: "#ffffff",
			},
			DatePicker: {
				colorText: "#ffffff",
				colorTextPlaceholder: "rgba(255, 255, 255, 0.5)",
				colorBgContainer: "rgba(255, 255, 255, 0.05)",
			},
			Table: {
				colorText: "rgba(255, 255, 255, 0.9)",
				headerColor: "rgba(255, 255, 255, 0.9)",
			},
		},
	};

	return (
		<ConfigProvider theme={darkThemeConfig}>
		<div>
			<Card
				bodyStyle={{ padding: 18 }}
				className="admin-history-toolbar full-bleed !bg-white/5 !border-white/10 rounded-lg"
			>
				<div className="flex items-center gap-4 w-full">
					<div className="w-full flex flex-col md:flex-row md:items-center md:gap-4">
						<Search
							placeholder="Search by Scan ID or Batch ID"
							allowClear
							onSearch={(val) => setQuery(val)}
							onChange={(e) => setQuery(e.target.value)}
							style={{ flex: 1, minWidth: 240 }}
							value={query}
							size="large"
							className="!bg-transparent border border-white/5"
						/>

						<div className="flex items-center gap-2 mt-3 md:mt-0">
							<DatePicker.RangePicker
								onChange={(vals) => setDateRange(vals)}
								className="min-w-[220px] !bg-transparent hidden sm:inline-flex"
							/>

							<Button
								type="default"
								className="!bg-transparent border border-white/6 flex items-center gap-2"
							>
								<FilterOutlined /> More Filters
							</Button>

							<Button
								type="primary"
								onClick={exportCsv}
								className="ml-auto !bg-cyan-500 !border-cyan-500 flex items-center gap-2"
							>
								<DownloadOutlined /> Export
							</Button>
						</div>
					</div>
				</div>
			</Card>

			<Card className="mt-4 !bg-transparent admin-history-table-card rounded-lg overflow-hidden border border-white/6 full-bleed">
				<Table
					columns={columns}
					dataSource={filtered}
					pagination={{ pageSize: 10 }}
					rowKey={(r) => r.id}
					size="middle"
					className="ant-table-dark admin-history-table"
					rowClassName={() => "!bg-transparent hover:!bg-white/5"}
					style={{ width: "100%" }}
				/>
			</Card>
		</div>
		</ConfigProvider>
	);
}
