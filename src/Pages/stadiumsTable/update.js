import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UpdateStad() {
    const { stadium_id } = useParams();
    const [sports, setSports] = useState([]);
    const [data, setData] = useState({
        stadium_name: "",
        price: "",
        photo: null,
        existing_photo: "",
        sport_id: "",
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Fetch stadium data
        const fetchStadium = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1/projects/Stadium-lock/public/Backend/PHP/stadiumsAdmin/updateStad.php/${stadium_id}`);
                if (res.data.status === "success") {
                    setData(res.data.data);
                } else {
                    setMessage(res.data.message);
                }
            } catch (error) {
                console.error("Error fetching stadium:", error);
                setMessage("Error loading stadium data.");
            }
        };

        // Fetch sports data
        const fetchSports = async () => {
            try {
                const res = await axios.get("http://127.0.0.1/projects/Stadium-lock/public/Backend/PHP/stadiumsAdmin/selectSport.php");
                if (res.data.status === "success") {
                    setSports(res.data.sports);
                } else {
                    console.error("Error loading sports:", res.data.message);
                }
            } catch (error) {
                console.error("Error fetching sports:", error);
            }
        };

        fetchStadium();
        fetchSports();
    }, [stadium_id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!data.stadium_name || !data.price || !data.sport_id) {
            setMessage("All fields except photo are required!");
            return;
        }

        const formData = new FormData();
        formData.append("stadium_id", stadium_id);
        formData.append("stadium_name", data.stadium_name);
        formData.append("price", data.price);
        formData.append("sport_id", data.sport_id);
        if (data.photo) {
            formData.append("photo", data.photo);
        } else {
            formData.append("existing_photo", data.existing_photo);
        }

        try {
            const res = await axios.post(
                `http://127.0.0.1/projects/Stadium-lock/public/Backend/PHP/stadiumsAdmin/updateStad.php`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (res.data.status === "success") {
                alert(res.data.message);
                setMessage(res.data.message);
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
            <h2 className="text-2xl font-semibold text-center mb-4">Update Stadium</h2>
            {message && <p className="text-center text-red-500">{message}</p>}
            <form onSubmit={handleUpdate} encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Stadium Name</label>
                    <input
                        type="text"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                        value={data.stadium_name}
                        onChange={(e) => setData({ ...data, stadium_name: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                        value={data.price}
                        onChange={(e) => setData({ ...data, price: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                    <input
                        type="file"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                        onChange={(e) => setData({ ...data, photo: e.target.files[0] })}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Sport</label>
                    <select
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                        value={data.sport_id}
                        onChange={(e) => setData({ ...data, sport_id: e.target.value })}
                        required
                    >
                        <option value="">Select a sport</option>
                        {sports.map((sport) => (
                            <option key={sport.sport_id} value={sport.sport_id}>{sport.sport_name}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                    Update Stadium
                </button>
            </form>
        </div>
    );
}
