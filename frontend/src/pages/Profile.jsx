import React, { useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    institution: "Tech University",
    role: "Student",
  });

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center py-12 px-6 font-sans">
      <div className="bg-gray-950 rounded-2xl shadow-xl p-10 w-full max-w-2xl animate-fade-in">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://i.pravatar.cc/150"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-yellow-500 mb-4 shadow-lg"
          />
          <h2 className="text-3xl font-extrabold text-yellow-500">{profile.name}</h2>
          <p className="text-gray-400">{profile.role}</p>
        </div>

        {/* Info Section */}
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <p className="text-gray-400">Email</p>
            <p className="font-bold">{profile.email}</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <p className="text-gray-400">Institution</p>
            <p className="font-bold">{profile.institution}</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <p className="text-gray-400">Role</p>
            <p className="font-bold">{profile.role}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-8">
          <button className="bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-600 transition transform hover:scale-105">
            Edit Profile
          </button>
          <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-red-600 transition transform hover:scale-105">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
