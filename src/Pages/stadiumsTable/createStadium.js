import axios from "axios";
import { useEffect, useState } from "react";

export default function CreateStadium() {
    const [sports, setSports] = useState([]);
    const [data, setData] = useState({
        stadium_name: "",
        price: "",
        photo: null,
        sport_id: "",
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Fetch sports data from backend
        axios
            .get("http://127.0.0.1/projects/Stadium-lock/public/Backend/PHP/stadiumsAdmin/selectSport.php")
            .then((res) => {
                if (res.data.status === "success") {
                    setSports(res.data.sports);
                } else {
                    console.error("Error loading sports:", res.data.message);
                }
            })
            .catch((error) => {
                console.error("Error fetching sports:", error);
            });
    }, []);

    const addStadium = async (e) => {
        e.preventDefault();

        if (!data.stadium_name || !data.price || !data.photo || !data.sport_id) {
            setMessage("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("stadium_name", data.stadium_name);
        formData.append("price", data.price);
        formData.append("photo", data.photo);
        formData.append("sport_id", data.sport_id);

        console.log("Submitting FormData:");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }

        try {
            const res = await axios.post(
                "http://127.0.0.1/projects/Stadium-lock/public/Backend/PHP/stadiumsAdmin/createStadiums.php",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Server response:", res.data);

            if (res.data.status === "success") {
                setMessage(res.data.message);
                alert(res.data.message);
                setData({ stadium_name: "", price: "", photo: null, sport_id: "" });
            } else {
                setMessage(res.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred: " + error.message);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto bg-white p-6 mt-36 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">Create Stadium</h2>
            {message && <p className="text-center text-red-500">{message}</p>}
            <form method="POST" onSubmit={addStadium} encType="multipart/form-data">
                <div className="mb-4">
                    <label htmlFor="stadium_name" className="block text-sm font-medium text-gray-700">
                        Stadium Name
                    </label>
                    <input
                        type="text"
                        id="stadium_name"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                        required
                        value={data.stadium_name}
                        onChange={(e) => setData({ ...data, stadium_name: e.target.value })}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                        required
                        value={data.price}
                        onChange={(e) => setData({ ...data, price: e.target.value })}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                        Photo
                    </label>
                    <input
                        type="file"
                        id="photo"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                        required
                        onChange={(e) => setData({ ...data, photo: e.target.files[0] })}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="sport" className="block text-sm font-medium text-gray-700">
                        Sport
                    </label>
                    <select
                        id="sport"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                        required
                        value={data.sport_id}
                        onChange={(e) => setData({ ...data, sport_id: e.target.value })}
                    >
                        <option value="">Select a sport</option>
                        {sports.map((sport) => (
                            <option key={sport.sport_id} value={sport.sport_id}>
                                {sport.sport_name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                    Create Stadium
                </button>
            </form>
        </div>
    );
}
