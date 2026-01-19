import React from "react";
import { Layout } from "antd";
import AdminNavbar from "./AdminNavbar";

const { Content } = Layout;

export default function AdminLayout({ children }) {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<AdminNavbar />
			<Layout>
				<Content style={{ margin: "24px 16px 0" }}>
					<div style={{ padding: 24, minHeight: 360 }}>{children}</div>
				</Content>
			</Layout>
		</Layout>
	);
}
