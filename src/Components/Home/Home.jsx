// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div className='flex items-center bg-gray-100 h-110'>
//     <div className="flex flex-col items-center justify-center w-1/2 p-10 py-24">
     
//       <h1 className="mb-4 text-4xl font-bold text-gray-800">Welcome to Health Tracker</h1>
//       <p className="mb-6 text-lg text-gray-600">
//         Track your health metrics effortlessly with our easy-to-use platform. 
//         Stay informed about your body temperature, blood pressure, and heart rate with real-time updates.
//       </p>
//       <Link
//         to="/get-started"
//         className="px-6 py-3 text-white transition duration-300 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
//       >
//         Get Started
//       </Link>
//     </div>
//     <div className='w-1/2 pl-10'>
//     <div className='bg-cover w-100 h-90 bg-login'></div></div>
//     </div>
//   );
// };

// export default Home;



import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the custom CSS file for animations

const Home = () => {
  return (
    <div className='flex items-center bg-gray-100 h-110'>
      <div className="flex flex-col items-center justify-center w-1/2 px-10 animate-fadeIn">
        <h1 className="mb-10 text-4xl font-bold text-blue-500 animate-slideIn">
          Welcome to Health Tracker
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Track your health metrics effortlessly with our easy-to-use platform. 
          Stay informed about your body temperature, blood pressure, and heart rate with real-time updates.
        </p>
        <Link
          to="/add-record"
          className="px-6 py-3 text-white transition duration-300 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-700"
        >
          Get Started
        </Link>
      </div>
      <div className='w-1/2 pl-10'>
        <div className='bg-cover h-90 w-98 bg-home animate-fadeInImage'></div>
      </div>
    </div>
  );
};

export default Home;
