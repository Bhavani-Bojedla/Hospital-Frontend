// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify'; // Import for notifications
// import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // For edit and delete icons
// import 'react-toastify/dist/ReactToastify.css';

// const History = () => {
//   const [record, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch records from backend
//   useEffect(() => {
//     const fetchRecords = async () => {
//       try {
//         const response = await axios.get("https://hospital-backend-4rvm.onrender.com/record/getrecord");
//         setRecords(response.data.record);
//       } catch (error) {
//         toast.error("Failed to fetch records.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecords();
//   }, []);

//   // Handle record deletion
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this record?")) {
//       try {
//         await axios.delete(`https://hospital-backend-4rvm.onrender.com/record/deleterecord/${id}`);
//         setRecords(records.filter(record => record._id !== id));
//         toast.success("Record deleted successfully.");
//       } catch (error) {
//         toast.error("Failed to delete the record.");
//       }
//     }
//   };

//   // Handle record editing
//   const handleEdit = (id) => {
//     // Redirect or open modal for editing (not implemented here)
//     console.log(`Edit record with id: ${id}`);
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gray-100">
//       <div className="container p-6 mx-auto bg-white rounded-lg shadow-lg">
//         <h2 className="mb-6 text-2xl font-bold">Health Metrics Dashboard</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <table className="w-full overflow-hidden bg-white border border-gray-200 rounded-lg">
//             <thead className="bg-gray-300">
//               <tr>
//                 <th className="p-3 text-left">Date</th>
//                 <th className="p-3 text-left">Temperature (°C/°F)</th>
//                 <th className="p-3 text-left">Blood Pressure</th>
//                 <th className="p-3 text-left">Heart Rate (bpm)</th>
//                 <th className="p-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {record.map(record => (
//                 <tr key={record._id} className="border-b border-gray-200">
//                   <td className="p-3">{new Date(record.Date).toLocaleDateString()}</td>
//                   <td className="p-3">{record.temparature}</td>
//                   <td className="p-3">{record.pressure}</td>
//                   <td className="p-3">{record.rate}</td>
//                   <td className="flex p-3 space-x-2">
//                     <button
//                       onClick={() => handleEdit(record._id)}
//                       className="text-blue-600 hover:text-blue-800"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(record._id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <FaTrashAlt />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// // export default History;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const History = () => {
//   const [records, setRecords] = useState([]);

//   useEffect(() => {
//     const fetchRecords = async () => {
//       try {
//         const response = await axios.get('https://hospital-backend-4rvm.onrender.com/record/getrecord');
//         setRecords(response.data.record);
//       } catch (error) {
//         console.error("Failed to fetch records:", error);
//       }
//     };

//     fetchRecords();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`https://hospital-backend-4rvm.onrender.com/record/deleterecord/${id}`);
//       setRecords(records.filter(record => record._id !== id));
//       alert("Record deleted successfully");
//     } catch (error) {
//       console.error("Failed to delete record:", error);
//       alert("Failed to delete record. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-4xl p-6 mx-auto bg-gray-100">
//       <h1 className="mb-6 text-3xl font-bold">Health Records</h1>
//       <div className="space-y-4">
//         {records.map(record => (
//           <div key={record._id} className="p-4 bg-white rounded-lg shadow-md">
//             <p className="text-lg"><strong>Date:</strong> {new Date(record.Date).toLocaleDateString()}</p>
//             <p className="text-lg"><strong>Body Temperature:</strong> {record.temparature} °C/°F</p>
//             <p className="text-lg"><strong>Blood Pressure:</strong> {record.pressure}</p>
//             <p className="text-lg"><strong>Heart Rate:</strong> {record.rate} bpm</p>
//             <div className="mt-2">
//               <Link
//                 to={`/record/${record._id}`}
//                 className="inline-block mr-4 text-blue-500 hover:underline"
//               >
//                 View Details
//               </Link>
//               <Link
//                 to={`/record/edit/${record._id}`}
//                 className="inline-block mr-4 text-green-500 hover:underline"
//               >
//                 Edit
//               </Link>
//               <button
//                 onClick={() => handleDelete(record._id)}
//                 className="inline-block text-red-500 hover:underline"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };



// export default History;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const History = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('https://hospital-backend-4rvm.onrender.com/record/getrecord');
        setRecords(response.data.record);
      } catch (error) {
        console.error("Failed to fetch records:", error);
      }
    };

    fetchRecords();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://hospital-backend-4rvm.onrender.com/record/deleterecord/${id}`);
      setRecords(records.filter(record => record._id !== id));
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Health Metrics Dashboard</h1>
      <div className="space-y-4">
        {records.map(record => (
          <div key={record._id} className="p-4 bg-white rounded-lg shadow-md">
            <p className="text-lg"><strong>Date:</strong> {new Date(record.Date).toLocaleDateString()}</p>
            <p className="text-lg"><strong>Body Temperature:</strong> {record.temparature} °C/°F</p>
            <p className="text-lg"><strong>Blood Pressure:</strong> {record.pressure}</p>
            <p className="text-lg"><strong>Heart Rate:</strong> {record.rate} bpm</p>
            <div className="flex mt-4 space-x-4">
              <Link
                to={`/record/${record._id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
              <button
                onClick={() => handleDelete(record._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
