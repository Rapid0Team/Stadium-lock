import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Login() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Pour déclencher des actions Redux

    const handleLogin = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        try {
            const response = await axios.post(
                "http://127.0.0.1/Stadium-lock/public/Backend/PHP/user/login.php",
                credentials
            );
            if (response.data.status === "success") {
                setMsg(response.data.message); // Affiche un message de succès
                navigate("/reserver"); // Redirige vers la page de réservation

                // Dispatch l'action "login" avec les données de l'utilisateur
                dispatch({
                    type: "login",
                    payload: response.data.user, // Utilisez response.data.user directement
                });
            } else {
                // Si la connexion échoue, affiche un message d'erreur
                setMsg(response.data.message);
            }
        } catch (error) {
            // En cas d'erreur réseau ou autre, affiche un message d'erreur
            setMsg("An error occurred: " + error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center h-screen justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
                {msg && <p className="mt-4 text-center text-red-500">{msg}</p>}
            </div>
        </div>
    );
}