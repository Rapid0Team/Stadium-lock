import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Spectateur() {
    const [matches, setMatches] = useState([]);
    const [message, setMessage] = useState("Loading matches...");

    useEffect(() => {
        axios
            .get("http://127.0.0.1/Stadium-lock/public/Backend/PHP/spectateur/spectateur.php")
            .then((res) => {
                if (res.data.status === "success") {
                    setMatches(res.data.matches);
                    setMessage(res.data.message);
                } else {
                    setMessage(res.data.message || "There are no matches.");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setMessage("Couldn't load matches.");
            });
    }, []);

    const navigate = useNavigate();
    const goToPayment = () => {
        navigate("/payment");
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 pt-24 pb-8">
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {matches.length === 0 ? (
                    <p className="text-center text-gray-600">{message}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                        {matches.map((match, index) => (
                            <div
                                key={index}
                                className="p-4 bg-white border rounded-md shadow-sm flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src={`http://127.0.0.1/Stadium-lock/public/images/stades/${match.stadium_photo}`}
                                    alt={match.stadium_name || "Stadium"}
                                    className="w-full h-40 object-cover rounded-md"
                                    onError={(e) => (e.target.src = "/default-placeholder.jpg")}
                                />
                                <h2 className="font-bold text-lg text-gray-800 mt-2">
                                    Match de {match.stadium_name}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Stadium de {match.stadium_name}
                                </p>
                                <p className="text-md text-center text-black">
                                    Le match commencera<br />
                                    <span className="text-md font-semibold text-gray-900">
                                        {match.start_time}
                                    </span>{" "}
                                    le{" "}
                                    <span className="text-md font-semibold text-gray-900">
                                        {match.reservation_date}
                                    </span>
                                </p>
                                <button
                                    onClick={goToPayment}
                                    className="mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
                                >
                                    Regarder le match
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}