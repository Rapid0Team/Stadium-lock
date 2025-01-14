import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Spectateur() {
    const [matches, setMatches] = useState([]);
    const [message, setMessage] = useState("Loading matches...");

    useEffect(() => {
        axios
            .get("http://localhost/projects/Stadium-lock/public/Backend/PHP/spectateur/spectateur.php")
            .then((res) => {
                if (res.data.status === "success") {
                    setMatches(res.data.matches);
                    setMessage(res.data.message);
                } else {
                    setMessage(res.data.message || "there is no matches.");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setMessage("couldnt load matches");
            });
    }, []);
    const navigate = useNavigate()
    const goToPayment = () => {
        navigate('/payment');
      };

    return (
        <div className="h-screen flex w-full flex-col  justify-center items-center bg-gray-50">
            <div className="bg-slate-100 rounded-lg shadow-lg px-6 py-4 w-full ">
                {matches.length === 0 ? (
                    <p className="text-center text-gray-600">{message}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                        {matches.map((match, index) => (
                            <div
                                key={index}
                                className="p-4 bg-white border rounded-md shadow-sm flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src={`http://localhost/projects/Stadium-lock/public/images/stades/${match.stadium_photo}`}
                                    alt={match.stadium_name || "Stadium"}
                                    className="w-full h-40 object-cover rounded-md"
                                    onError={(e) => (e.target.src = "/default-placeholder.jpg")}
                                />
                                <h2 className="font-bold text-lg text-gray-800 mt-2">
                                    Match de {match.stadium_name }
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Stadium de  {match.stadium_name}
                                </p>
                                <p className="text-sm text-gray-600">
                                </p>
                                <p className="text-md text-center text-black">
                                    le matche commencera<br/><span className="text-md font-semibold text-gray-900"> {match.start_time} </span>
                                    le <span className="text-md  font-semibold text-gray-900">{match.reservation_date}</span>
                                </p>
                                <button onClick={goToPayment} className=" font-bold text-black  hover:shadow-lg p-2 hover:bg-gray-50 hover:scale-105 hover:text-blue-600 transition-transform duration-300 my-1 rounded-md">regarder le matche</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
