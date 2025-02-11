import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
    // Récupérer les données de l'utilisateur connecté depuis Redux
    const userlogin = useSelector((state) => state.userFinded);
    const navigate = useNavigate()
    const [activeUpdate , setActiveUpdate]= useState(false);
    const [user, setUser]=useState({user_id:userlogin.user_id , name :userlogin.name , username:userlogin.username , email:userlogin.email ,phone_number:userlogin.phone_number , password:userlogin.password })
    const [msg , setmsg]=useState("")
    
    const Update = () => {
        axios
            .post("http://127.0.0.1/Stadium-lock/public/Backend/PHP/user/update.php", user)
            .then((res) => {
                if (res.data.status === "success") {
                   
                    setActiveUpdate(false); // Masquer le formulaire de mise à jour après succès
                    navigate("/login")
                } else {
                    setmsg(res.data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setmsg("An error occurred while updating the user.");
            });
    };

    console.log(user)
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            {userlogin.username ? ( // Vérifiez si userlogin existe
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className={`${activeUpdate? `hidden` :"" } `}>
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Profile</h1>
                
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Nom :</label>
                            <p className="text-gray-900">{userlogin.name}</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Username :</label>
                            <p className="text-gray-900">{userlogin.username}</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email :</label>
                            <p className="text-gray-900">{userlogin.email}</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number :</label>
                            <p className="text-gray-900">{userlogin.phone_number}</p>
                        </div>
                        <div className="w-full text-center ">
                        <button
                            onClick={()=>{navigate(-1)}}
                            className="bg-gray-500 text-white mr-2 px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                            Back
                        </button>
                        <button className="bg-blue-500 text-white  px-4 py-2 rounded-lg hover:bg-blue-600" onClick={()=> setActiveUpdate(!activeUpdate) } >
                            Update

                        </button>
                        </div>
                    </div>
            </div>
            <div className={`${activeUpdate ?"":"hidden" }` }>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Update Profile</h1>
           {msg && <p>{msg}</p> }
            <form >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder={userlogin.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder={userlogin.username}
                           
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder={userlogin.email}
                           
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            placeholder={userlogin.phone_number}
                           
                            onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
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
                            
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="button"
                        className="w-full bg-blue-600 text-white py-2 px-4 my-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        onClick={Update}
                    >
                        Modifier 
                    </button>
                </form>
                <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300" onClick={()=> setActiveUpdate(!activeUpdate) } >
                            Back
                </button>
            </div>
            </div>
            
            ) : (
                <div className="text-center">
                <p className="text-red-500 text-lg font-bold">
                    You must log in to make a reservation.
                </p>
                <Link to="/login" className="text-black hover:underline">
                    Click here to log in.
                </Link>
            </div>
                )}
        </div>
    );
}