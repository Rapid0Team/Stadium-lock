import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Stadiums() {
    const [stadiums, setStadiums] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost/projects/Stadium-lock/public/Backend/PHP/stadiumsAdmin/stadiumsAdmin.php")
            .then((res) => {
                if (res.data.status === "success") {
                    setStadiums(res.data.stadiums || []);
                    setMessage(res.data.message);
                } else {
                    setMessage("Failed to fetch stadiums.");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setMessage("Couldn't load stadiums.");
            });
    }, []);
 
    const navigate = useNavigate()
    const createStadium = () => {
        navigate("/createStadium")
    }

    const handleDelete = (stadium_id) => {
        if (!window.confirm("Are you sure you want to delete this stadium?")) {
            return;
        }

        axios.delete("http://localhost/projects/Stadium-lock/public/Backend/PHP/stadiumsAdmin/deleteStadium.php", {
            data: { stadium_id }, 
        })
        .then((res) => {
            if (res.data.status === "success") {
                setStadiums(stadiums.filter(stadium => stadium.stadium_id !== stadium_id));
            } else {
                alert("Failed to delete stadium: " + res.data.message);
            }
        })
        .catch((error) => {
            console.error("Error deleting stadium:", error);
            alert("An error occurred while deleting the stadium.");
        });
    };
    const gotoUpdate = (stadium_id) => {
        navigate(`/updateStad/${stadium_id}`)
    }

    return (
        <div className="w-full h-screen bg-gradient-to-b flex flex-col items-center from-cyan-700 via-blue-900 pt-24 to-black">
            <h2 className="text-2xl font-bold mb-4 text-center text-white drop-shadow-[2px_2px_10px black]">
                Stadiums
            </h2>

            {message && <p className="text-white mb-4">{message}</p>}

            <table className="w-2/3 border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-3 text-left">ID</th>
                        <th className="border p-3 text-left">Stadium Name</th>
                        <th className="border p-3 text-left">Price</th>
                        <th className="border p-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stadiums.length > 0 ? (
                        stadiums.map((stadium) => (
                            <tr key={stadium.stadium_id} className="border bg-gray-100">
                                <td className="border p-3">{stadium.stadium_id}</td>
                                <td className="border p-3">{stadium.stadium_name}</td>
                                <td className="border p-3">{stadium.price}</td>
                                <td className="border w-2/6 p-3 text-center space-x-6">
                                    <button className="px-3 py-1 bg-yellow-500 text-white rounded" onClick={ () => gotoUpdate(stadium.stadium_id)}>Update</button>
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                        onClick={() => handleDelete(stadium.stadium_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="border p-3 text-center text-gray-500">
                                No stadiums available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-4">
                <button onClick={createStadium} className="px-4 py-2 bg-green-500 text-white rounded">
                    Create Stadium
                </button>
            </div>
        </div>
    );
}
