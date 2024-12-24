import React, { useContext, useEffect } from 'react'
import userContext from '../store/UserContext';

function Profile() {
  const {user} = useContext(userContext)

  useEffect(()=>{
    console.log(user)
  },[user])
  
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center py-12">
      <h1 className="text-white text-4xl font-bold mb-8">Profile</h1>
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="mb-6">
          {/* Placeholder for profile picture */}
          <div className="mx-auto h-24 w-24 rounded-full bg-gray-700 flex items-center justify-center text-4xl font-bold text-gray-400">
            JD
          </div>
        </div>

        <div className="text-white">
          <h2 className="text-2xl font-bold mb-2">{user.email}</h2>
          <p className="text-gray-400 mb-4">{user.email}</p>

          <p className="text-gray-400 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
