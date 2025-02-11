import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { data, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

function Users() {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {

    axios.get('http://127.0.0.1/Stadium-lock/public/Backend/PHP/user/getusers.php')

      .then((response) => {
        console.log(response.data.users); // Debugging
        setUsers(response.data.users);
        console.log( "users"+users)
      })
      .catch((error) => console.log("Error fetching users:", error));
  }, [refresh]);

  async function deleteUser(user_id) {
    try {
      let res = await axios.post('http://127.0.0.1/Stadium-lock/public/Backend/PHP/user/deleteUsers.php', {
        user_id:  user_id 
      });
      console.log(user_id )
      if (res.status === 200) {
        setRefresh((prev) => prev + 1);
      }
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  }

  return (
    <div className="md:w-[90%] md:mx-[19px] w-[100%] mt-[60px] mx-[9px] bg-slate-400">
      <table className="w-full border-2 border-gray-200 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-100 border-b-2 border-gray-200">
          <tr>
            <th className="py-3 px-4 text-xl font-extrabold text-amber-500">ID</th>
            <th className="py-3 px-4 text-xl font-extrabold text-amber-500">Name</th>
            <th className="py-3 px-4 text-xl font-extrabold text-amber-500">Email</th>
            <th className="py-3 px-4 text-xl font-extrabold text-amber-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.length > 0 ? users.map((e, index) => (
            <tr key={e.user_id} className="hover:bg-gray-50 transition-colors duration-200">
              <td className="py-3 px-4 text-center">{index + 1}</td>
              <td className="py-3 px-4 text-center">{e.name}</td>
              <td className="py-3 px-4 text-center">{e.email}</td>
              <td className="py-3 px-4 text-center">
                <button
                  onClick={() => deleteUser(e.user_id)}
                  className="p-2 text-red-600 hover:text-red-800 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
