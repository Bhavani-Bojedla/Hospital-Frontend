// src/pages/Profile.jsx
import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-md p-8 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">User Profile</h2>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john@example.com</p>
        <p><strong>Total Records:</strong> 5</p>
        <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
