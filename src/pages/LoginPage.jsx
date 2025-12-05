import React, { useContext } from "react";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function LoginPage() {
	const { loginAsAdmin, loginAsWorker } = useContext(AuthContext);
	const navigate = useNavigate();

	const doAdmin = () => {
		loginAsAdmin();
		navigate("/admin/dashboard");
	};

	const doWorker = () => {
		loginAsWorker();
		navigate("/");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900">
			<Card title="Login (Mock)" style={{ width: 360 }}>
				<div className="flex flex-col gap-3">
					<Button type="primary" onClick={doAdmin}>
						Login as Admin
					</Button>
					<Button onClick={doWorker}>Login as Worker</Button>
				</div>
			</Card>
		</div>
	);
}
