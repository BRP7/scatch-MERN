import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            method: "GET",
            credentials: "include", // Sends cookies with the request
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);


  useEffect(() => {
    console.log("Updated user:", user);
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
        <div className="ml-4 text-gray-900 text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="rounded-full h-16 w-16 bg-gray-300 flex items-center justify-center">
            <span className="text-xl font-semibold text-gray-600">{user.name.charAt(0)}</span>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Logout</button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Your Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Name:</span> {user.name}</p>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Phone:</span> {user.phone}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Address:</span> {user.address}</p>
          </div>
        </div>
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Edit Details</button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Order History</h3>
        <div className="space-y-4">
          <div className="border border-gray-200 p-4 rounded-lg shadow-sm">
            <p className="text-gray-800 font-semibold">Order #12345</p>
            <p className="text-gray-600">Date: July 20, 2024</p>
            <p className="text-gray-600">Total: $120.00</p>
            <p className="text-green-600 font-semibold">Status: Delivered</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
