import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        async function authCheck() {
            try {
                const res = await axios.get("/api/v1/auth/admin-auth");
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch {
                // 處理錯誤，例如記錄錯誤或採取其他必要的操作
                /* console.error("An error occurred:", error); */
                setOk(false);
            }
        }

        const checkAuth = async () => {
            if (auth?.token) {
                await authCheck(); //等待 authCheck 完成
            }
        };

        checkAuth();
    })


    return ok ? <Outlet /> : <Spinner path="" />;
}