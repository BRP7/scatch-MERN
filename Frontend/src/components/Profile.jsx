import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
  });
  const [orders, setOrders] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            withCredentials: true,
          }
        );

        if (!userResponse.data) {
          throw new Error("User data not found");
        }

        setUser(userResponse.data);
        setFormData({
          name: userResponse.data.name,
          phoneNumber: userResponse.data.phoneNumber,
          email: userResponse.data.email,
          address: userResponse.data.address || {},
        });

        const ordersResponse = await axios.get(
          "http://localhost:5000/api/orders",
          {
            withCredentials: true,
          }
        );

        setOrders(ordersResponse.data);
      } catch (error) {
        console.error("Error fetching user data or orders:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/profile",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUser(response.data);
        setEditMode(false);
        console.log("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Logout failed. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-dark-gradient relative">
        <div className="absolute inset-0 sparkle-dust"></div>
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gold"></div>
        <div className="ml-4 text-gold text-2xl font-semibold">Loading..</div>
      </div>
    );
  }

  const addressLine = user.address
    ? `${user.address.street || ""}, ${user.address.city || ""}, ${
        user.address.state || ""
      }, ${user.address.country || ""} ${user.address.zipCode || ""}`
    : "";

  const displayAddress = addressLine.trim() || "Not provided";

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-gradient relative">
      <div className="absolute inset-0 sparkle-dust"></div>
      <div className="profile-container mx-auto px-4 py-8 bg-black text-gold rounded-lg shadow-md border border-gold max-w-4xl mt-16 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="rounded-full h-16 w-16 bg-gold flex items-center justify-center">
              <span className="text-xl font-semibold text-black">
                {user.name.charAt(0)}
              </span>
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gold">{user.name}</h2>
              <p className="text-gold">{user.email}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-black rounded-lg shadow-md p-6 mb-8 border border-gold">
          <h3 className="text-xl font-bold">Your Details</h3>
          {editMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gold mb-2 block">
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-b border-gold px-3 py-2 rounded-md w-full mt-1 bg-black text-gold focus:outline-none focus:border-gold"
                  />
                </label>
                <label className="text-gold mb-2 block">
                  Phone Number:
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="border-b border-gold px-3 py-2 rounded-md w-full mt-1 bg-black text-gold focus:outline-none focus:border-gold"
                  />
                </label>
              </div>
              <div>
                <label className="text-gold mb-2 block">
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-b border-gold px-3 py-2 rounded-md w-full mt-1 bg-black text-gold focus:outline-none focus:border-gold"
                  />
                </label>
                <label className="text-gold mb-2 block">
                  Street:
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    className="border-b border-gold px-3 py-2 rounded-md w-full mt-1 bg-black text-gold focus:outline-none focus:border-gold"
                  />
                </label>
                <label className="text-gold mb-2 block">
                  City:
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    className="border-b border-gold px-3 py-2 rounded-md w-full mt-1 bg-black text-gold focus:outline-none focus:border-gold"
                  />
                </label>
                <label className="text-gold mb-2 block">
                  State:
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    className="border-b border-gold px-3 py-2 rounded-md w-full mt-1 bg-black text-gold focus:outline-none focus:border-gold"
                  />
                </label>
                <label className="text-gold mb-2 block">
                  Country:
                  <input
                    type="text"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleInputChange}
                    className="border-b border-gold px-3 py-2 rounded-md w-full mt-1 bg-black text-gold focus:outline-none focus:border-gold"
                  />
                </label>
                <label className="text-gold mb-2 block">
                  Zip Code:
                  <input
                    type="text"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleInputChange}
                    className="border-b border-gold px-3 py-2 rounded-md w-full mt-1 bg-black text-gold focus:outline-none focus:border-gold"
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gold mb-2">
                  <span className="font-semibold">Name:</span> {user.name}
                </p>
                <p className="text-gold mb-2">
                  <span className="font-semibold">Phone:</span>{" "}
                  {user.phoneNumber}
                </p>
                <p className="text-gold mb-2">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
              </div>
              <div>
                <p className="text-gold mb-2">
                  <span className="font-semibold">Address:</span>{" "}
                  {displayAddress}
                </p>
              </div>
            </div>
          )}
          <div className="mt-4 text-right">
            {editMode ? (
              <button
                onClick={handleSave}
                className="bg-gold hover:bg-gold-dark text-black px-4 py-2 rounded-lg"
              >
                Save
              </button>
            ) : (
              <button
                onClick={toggleEditMode}
                className="bg-gold hover:bg-gold-dark text-black px-4 py-2 rounded-lg"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="bg-black rounded-lg shadow-md p-6 border border-gold">
          <h3 className="text-xl font-bold mb-4">Your Orders</h3>
          {orders.length > 0 ? (
            <ul>
              {orders.map((order) => (
                <li key={order._id} className="mb-4">
                  <div className="border border-gold rounded-lg p-4 bg-black">
                    <h4 className="text-lg font-bold text-gold">
                      Order ID: {order._id}
                    </h4>
                    <p className="text-gold">
                      Date: {new Date(order.date).toLocaleDateString()}
                    </p>
                    <p className="text-gold">
                      Total: ${order.total.toFixed(2)}
                    </p>
                    <p className="text-gold">Status: {order.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gold">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
