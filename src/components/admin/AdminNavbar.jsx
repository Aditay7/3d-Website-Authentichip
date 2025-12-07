import React, { useContext, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import {
	DashboardOutlined,
	HistoryOutlined,
	UserOutlined,
	LogoutOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const { Sider } = Layout;

export default function AdminNavbar() {
	const location = useLocation();
	const navigate = useNavigate();
	const { logout, userRole, isLoggedIn } = useContext(AuthContext);

	useEffect(() => {
		if (!isLoggedIn || userRole !== "admin") {
			// prevent rendering for non-admins — navigate away
			navigate("/login");
		}
	}, [isLoggedIn, userRole, navigate]);

	const items = [
		{
			key: "/admin/dashboard",
			icon: <DashboardOutlined />,
			label: "Dashboard",
		},
		{ key: "/admin/history", icon: <HistoryOutlined />, label: "History" },
		{ key: "/admin/profile", icon: <UserOutlined />, label: "Profile" },
	];

	const onClick = ({ key }) => {
		if (key === "logout") {
			logout();
			navigate("/login");
			return;
		}
		navigate(key);
	};

	return (
		<Sider
			width={220}
			style={{ minHeight: "100vh" }}
			className="ant-layout-sider-dark"
		>
			<div
				style={{
					height: 64,
					display: "flex",
					alignItems: "center",
					paddingLeft: 16,
					color: "white",
					fontWeight: 700,
				}}
			>
				Authentichip
			</div>
			<Menu
				theme="dark"
				mode="inline"
				selectedKeys={[location.pathname]}
				items={[
					...items,
					{ key: "logout", icon: <LogoutOutlined />, label: "Logout" },
				]}
				onClick={onClick}
			/>
		</Sider>
	);
}
