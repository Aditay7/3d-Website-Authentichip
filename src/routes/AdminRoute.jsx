import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function AdminRoute({ children }) {
	const { isLoggedIn, userRole } = useContext(AuthContext);

	if (!isLoggedIn || userRole !== "admin") {
		return <Navigate to="/login" replace />;
	}

	return children;
}
