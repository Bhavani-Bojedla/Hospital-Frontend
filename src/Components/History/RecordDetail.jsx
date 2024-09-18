// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const RecordDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [record, setRecord] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false); // State for showing the delete confirmation modal

//   useEffect(() => {
//     const fetchRecord = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`https://hospital-backend-4rvm.onrender.com/record/getrecord/${id}`);
//         if (response.data.record) {
//           setRecord(response.data.record);
//         } else {
//           setError("No record found");
//         }
//       } catch (error) {
//         console.error("Failed to fetch record:", error);
//         setError("Failed to fetch record");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecord();
//   }, [id]);

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`https://hospital-backend-4rvm.onrender.com/record/deleterecord/${id}`);
//       navigate('/history'); // Redirect to the history page after deletion
//     } catch (error) {
//       console.error("Failed to delete record:", error);
//     }
//   };

//   if (loading) {
//     return <div className="py-8 text-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="py-8 text-center text-red-500">{error}</div>;
//   }

//   if (!record) {
//     return <div className="py-8 text-center">No record found.</div>;
//   }

//   return (
//     <div className="h-screen py-5 bg-gray-100">
//       <div className="max-w-lg p-6 mx-auto bg-pink-200 rounded-md">
//         <h1 className="mb-6 text-3xl font-bold">Record Details</h1>
//         <div className="p-4 bg-white rounded-lg shadow-md">
//           <p className="text-lg"><strong>Date:</strong> {new Date(record.Date).toLocaleDateString()}</p>
//           <p className="text-lg"><strong>Body Temperature:</strong> {record.temparature} °C/°F</p>
//           <p className="text-lg"><strong>Blood Pressure:</strong> {record.pressure}</p>
//           <p className="text-lg"><strong>Heart Rate:</strong> {record.rate} bpm</p>
//           <div className="flex mt-4 space-x-4">
//             <button
//               onClick={() => navigate(`/record/update/${id}`)}
//               className="text-blue-500 hover:underline"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => setShowDeleteModal(true)} // Open delete confirmation modal
//               className="text-red-500 hover:underline"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>

//       {showDeleteModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowDeleteModal(false)}>
//           <div className="p-6 bg-white rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
//             <h2 className="mb-4 text-xl font-bold">Confirm Deletion</h2>
//             <p>Are you sure you want to delete this record?</p>
//             <div className="flex justify-end mt-4">
//               <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 mr-2 text-white bg-gray-600 rounded hover:bg-gray-700">Cancel</button>
//               <button onClick={handleDelete} className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">Delete</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecordDetail;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import RecordEdit from './RecordEdit'; // Import the RecordEdit component

const RecordDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // State to show/hide the Edit popup
  const [isRecordUpdated, setIsRecordUpdated] = useState(false); // Track if the record was updated

  useEffect(() => {
    const fetchRecord = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://hospital-backend-4rvm.onrender.com/record/getrecord/${id}`);
        if (response.data.record) {
          setRecord(response.data.record);
        } else {
          setError("No record found");
        }
      } catch (error) {
        console.error("Failed to fetch record:", error);
        setError("Failed to fetch record");
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id, isRecordUpdated]); // Re-fetch when the record is updated

  const handleDelete = async () => {
    try {
      await axios.delete(`https://hospital-backend-4rvm.onrender.com/record/deleterecord/${id}`);
      navigate('/history'); // Redirect to the history page after deletion
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
  };

  const handleRecordUpdate = () => {
    setIsRecordUpdated(true); // This will trigger the useEffect to fetch the updated record
    setShowEditModal(false); // Close the modal after updating
  };

  if (loading) {
    return <div className="py-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-8 text-center text-red-500">{error}</div>;
  }

  if (!record) {
    return <div className="py-8 text-center">No record found.</div>;
  }

  return (
    <div className="h-screen py-5 bg-gray-100">
      <div className="max-w-lg p-6 mx-auto bg-pink-200 rounded-md">
        <h1 className="mb-6 text-3xl font-bold">Record Details</h1>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <p className="text-lg"><strong>Date:</strong> {new Date(record.Date).toLocaleDateString()}</p>
          <p className="text-lg"><strong>Body Temperature:</strong> {record.temparature} °C/°F</p>
          <p className="text-lg"><strong>Blood Pressure:</strong> {record.pressure}</p>
          <p className="text-lg"><strong>Heart Rate:</strong> {record.rate} bpm</p>
          <div className="flex mt-4 space-x-4">
            <button
              onClick={() => setShowEditModal(true)} // Open the edit popup
              className="text-blue-500 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => setShowDeleteModal(true)} // Open delete confirmation modal
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowEditModal(false)}>
          <div className="p-6 bg-white rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
            <RecordEdit id={id} onRecordUpdate={handleRecordUpdate} onClose={() => setShowEditModal(false)} />
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowDeleteModal(false)}>
          <div className="p-6 bg-white rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-4 text-xl font-bold">Confirm Deletion</h2>
            <p>Are you sure you want to delete this record?</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 mr-2 text-white bg-gray-600 rounded hover:bg-gray-700">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordDetail;
