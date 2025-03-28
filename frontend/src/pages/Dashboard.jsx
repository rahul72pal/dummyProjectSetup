import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove JWT token
        navigate("/login"); // Redirect to login
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
            <Button onClick={handleLogout} className="mt-4">Logout</Button>
        </div>
    );
}
