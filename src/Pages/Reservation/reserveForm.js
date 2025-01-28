import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function ReserveForm() {
    // fix date
    const todayDate = new Date().toISOString().split('T')[0];
    const [minDate, setMinDate] = useState(todayDate);
    // fix Time
    const nowTime = new Date().toTimeString().slice(0, 5);
    const [minTime, setMinTime] = useState(nowTime);    

    // sport
    const [sports, setSports] = useState([]);
    const [sportId, setSportId] = useState();
    // stadium
    const [stadiums, setStadiums] = useState([]);
    const [stadiumsFilter, setStadiumsFilter] = useState([]);
    // message
    const [message, setMessage] = useState("");
    const [message2, setMessage2] = useState("");
    // stade
    const [stadeId, setStadeId] = useState();
    // image stade
    const [imageStade, setImageStade] = useState("");
    // price stade
    const [priceStade, setPriceStade] = useState();
    // reservation infos
    const [reserveInfos, setReserveInfos] = useState({});
    // formData
    const formData = new FormData();

    // Récupérer l'état de l'utilisateur connecté depuis Redux
    const userLogin = useSelector((state) => state.userFinded);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // get data
    useEffect(() => {
        axios
            .get("http://localhost/stadium-lock/public/Backend/PHP/reservation/select.php")
            .then((res) => {
                if (res.data.status === "success") {
                    setSports(res.data.sports);
                    setStadiums(res.data.stadiums);
                    setMessage(res.data.message);
                } else {
                    setMessage(res.data.message);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // filter stadiums
    useEffect(() => {
        if (sportId) {
            const filtered = stadiums.filter((stade) => stade.sport_id === sportId);
            setStadiumsFilter(filtered);
        } else {
            setStadiumsFilter([]);
            setStadeId();
            setPriceStade();
            setImageStade();
        }
    }, [sportId, stadiums]);

    // Reservation
    function Add(e) {
        e.preventDefault();

        // append Form data
        formData.append("sport_id", sportId);
        formData.append("stadium_id", stadeId);
        Object.keys(reserveInfos).forEach((info) => {
            formData.append(info, reserveInfos[info]);
        });

        // post data
        axios
    .post('http://localhost/stadium-lock/public/Backend/PHP/reservation/insert.php', formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Assurez-vous que le bon type de contenu est utilisé
        },
    })
    .then((res) => {
        if (res.data.status === "success") {
            setMessage2(res.data.message);
             // Affichez un message de succès
             
             function timeToMinutes(time) {
                const [hours, minutes] = time.split(":").map(Number);
                return hours * 60 + minutes;
            }
            function minutesToTime(totalMinutes) {
                const hours = Math.floor(totalMinutes / 60);
                const minutes = totalMinutes % 60;
                return `${hours}:${minutes.toString().padStart(2, "0")}`;
            }

            
            
            // Calculer la différence entre end_time et start_time
            const startMinutes = timeToMinutes(reserveInfos.start_time);
            const endMinutes = timeToMinutes(reserveInfos.end_time);
            const timeDifferenceMinutes = endMinutes - startMinutes;

            // Convertir la différence en format "HH:MM"
            const timeTotal = minutesToTime(timeDifferenceMinutes);

            reserveInfos.time_total = timeTotal;

            dispatch({
                type: "payment",
                payload:reserveInfos,
            });
            navigate("/payment"); // Redirigez l'utilisateur vers la page de paiement
            console.log(reserveInfos)
            
        } else {
            setMessage2(res.data.message); // Affichez un message d'erreur
        }
    })
    .catch((error) => {
        console.error("Error fetching data:", error); // Log l'erreur dans la console
        setMessage2("An error occurred while processing your request."); // Affichez un message d'erreur générique
    });
    }

    // function stade 
    const handleStadeSelection = (stadiumId) => {
        setStadeId(stadiumId);
        const selectedStadium = stadiums.find(
            (stade) => stade.stadium_id === stadiumId
        );
        setImageStade(selectedStadium?.photo || "");
        setPriceStade(selectedStadium?.price || null);
    };

    return (
        <div className="bg-white w-full flex justify-center mt-[10rem]">
            {userLogin.username ? ( // Si l'utilisateur est connecté, affichez le formulaire
                <form onSubmit={(e) => Add(e)} className="relative bg-white border-[#1E90FF] w-[80%] sm:w-auto border-solid border-[2px] p-4 rounded-lg shadow-lg flex flex-col">
                    {priceStade && <p className="absolute sm:translate-x-[20em] sm:-translate-y-5 translate-x-[12em] -translate-y-5 rounded sm:py-4 sm:px-2 p-3 bg-red-500 text-white font-bold">{priceStade}DH/h</p>}

                    <h1 className="text-center text-[60px] font-bold">Reserve</h1>

                    {imageStade && (
                        <motion.img
                            src={`/images/stades/${imageStade}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="w-[400px] mb-8 rounded h-[200px]"
                        />
                    )}

                    <select onChange={(e) => setSportId(e.target.value)} className="border-black border-2 px-4 rounded border-solid p-2 w-full sm:w-[400px] mb-4">
                        <option value="">Select a Sport</option>
                        {sports.map((sport) => (
                            <option key={sport.sport_id} value={sport.sport_id}>
                                {sport.sport_name}
                            </option>
                        ))}
                    </select>

                    {stadiumsFilter && stadiumsFilter.length > 0 && (
                        <select onChange={(e) => handleStadeSelection(e.target.value)} className="border-black border-2 px-4 rounded border-solid w-full sm:w-[400px] p-2 mb-4 ease-in-out">
                            <option value="">Select a Stade</option>
                            {stadiumsFilter.map((stade) => (
                                <option key={stade.stadium_id} value={stade.stadium_id}>
                                    {stade.stadium_name}
                                </option>
                            ))}
                        </select>
                    )}

                    {stadeId ? (
                        <div className="mb-2">
                            <div className="flex w-full justify-center mb-4">
                                <input
                                    type="date"
                                    min={minDate}
                                    className="border-black border-2 px-4 rounded border-solid w-full sm:w-[400px] h-10"
                                    onChange={(e) => setReserveInfos({ ...reserveInfos, reservation_date: e.target.value })}
                                />
                            </div>

                            <div className="flex w-full justify-between flex-col sm:flex-row">
                                <div className="flex flex-col">
                                    <input
                                        type="time"
                                        min={minTime}
                                        id="start_time"
                                        className="peer relative outline-none border-black focus:border-2 focus:border-solid focus:border-[#1E90FF] border-2 px-4 rounded border-solid h-10"
                                        onChange={(e) => setReserveInfos({ ...reserveInfos, start_time: e.target.value })}
                                    />
                                    <label
                                        className={`absolute peer-focus:-translate-y-4 peer-focus:text-[#1E90FF] px-2 translate-x-2 bg-white ${reserveInfos.start_time ? "-translate-y-4" : "translate-y-2"} select-none duration-200 ease-in-out`}
                                        htmlFor="start_time"
                                    >
                                        Start Time
                                    </label>
                                </div>

                                <div className="flex flex-col mt-4 sm:mt-0">
                                    <input
                                        type="time"
                                        min={minTime}
                                        id="end_time"
                                        className="peer relative outline-none border-black focus:border-2 focus:border-solid focus:border-[#1E90FF] border-2 px-4 rounded border-solid h-10"
                                        onChange={(e) => setReserveInfos({ ...reserveInfos, end_time: e.target.value })}
                                    />
                                    <label
                                        className={`absolute peer-focus:-translate-y-4 peer-focus:text-[#1E90FF] px-3 translate-x-2 bg-white ${reserveInfos.end_time ? "-translate-y-4" : "translate-y-2"} select-none duration-200 ease-in-out`}
                                        htmlFor="end_time"
                                    >
                                        End Time
                                    </label>
                                </div>
                            </div>

                            <div className="flex w-full justify-center mb-2">
                                <select
                                    onChange={(e) => setReserveInfos({ ...reserveInfos, status: e.target.value })}
                                    className="border-black border-2 px-4 rounded border-solid p-2 w-full sm:w-[400px] mt-4"
                                >
                                    <option value="">Select Status</option>
                                    <option value="public">Public</option>
                                    <option value="privat">Privat</option>
                                </select>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}

                    <div className="w-full flex justify-center">
                        <button type="submit" className="border-[#1E90FF] text-[#1E90FF] font-bold border-solid border-2 rounded px-4 py-2 mt-4 hover:px-5 duration-200 ease-in-out">
                            Reserve
                        </button>
                    </div>

                    {message2 && <p className="text-red-500 mt-2 text-center font-bold">{message2}</p>}
                </form>
            ) : ( // Si l'utilisateur n'est pas connecté, affichez un message
                <div className="text-center">
                    <p className="text-red-500 text-lg font-bold">
                        You must log in to make a reservation.
                    </p>
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Click here to log in.
                    </Link>
                </div>
            )}
        </div>
    );
}