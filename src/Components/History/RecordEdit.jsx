// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const RecordEdit = ({ id, onClose }) => {
//   const [date,setdate]=useState('');
//   const [temparature, setTemparature] = useState('');
//   const [pressure, setPressure] = useState('');
//   const [rate, setRate] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch record details

//     const fetchRecord = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`https://hospital-backend-4rvm.onrender.com/record/getrecord/${id}`);
//         const {date, temparature, pressure, rate } = response.data.record;
//         setdate(date);
//         setTemparature(temparature);
//         setPressure(pressure);
//         setRate(rate);
//       } catch (error) {
//         setError('Failed to fetch record. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecord();

//   // Save updated record details
//   const handleSave = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.put(`https://hospital-backend-4rvm.onrender.com/record/updaterecord/${id}`, {
//         date,
//         temparature,
//         pressure,
//         rate
//       });
//       setLoading(false);
//       onClose();
//     } catch (error) {
//       setError('Failed to save record. Please try again later.');
//       setLoading(false); // Ensure loading is turned off if there's an error
//     }
//   };

//   if (loading) {
//     return <div className="py-8 text-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="py-8 text-center text-red-500">{error}</div>;
//   }

//   return (
//     <div className="p-6 bg-white rounded-md shadow-lg">
//       <h2 className="mb-4 text-2xl font-bold">Edit Record</h2>
//       <form >
//       <div className="mb-4">
//           {/* <label className="block text-sm font-medium text-gray-700">Body Temperature (°C/°F)</label> */}
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setdate(e.target.value)}
//             className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Body Temperature (°C/°F)</label>
//           <input
//             type="number"
//             value={temparature}
//             onChange={(e) => setTemparature(e.target.value)}
//             className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Blood Pressure</label>
//           <input
//             type="text"
//             value={pressure}
//             onChange={(e) => setPressure(e.target.value)}
//             className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Heart Rate (bpm)</label>
//           <input
//             type="number"
//             value={rate}
//             onChange={(e) => setRate(e.target.value)}
//             className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>
//         <div className="flex justify-end">
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-4 py-2 mr-2 text-white bg-gray-600 rounded hover:bg-gray-700"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             onClick={handleSave}
//             disabled={loading}
//             className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
//           >
//             {loading ? 'Saving...' : 'Save'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RecordEdit;

import React, { useState, useEffect } from "react";
import axios from "axios";

const RecordEdit = ({ id, onClose }) => {
  const [record, setRecord] = useState({
    date: "",
    temparature: "",
    pressure: "",
    rate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://hospital-backend-4rvm.onrender.com/record/getrecord/${id}`
        );
        setRecord(response.data.record);
      } catch (error) {
        setError("Failed to fetch record. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecord();
  }, [id]);

  const handleSave = async (e) => {
    console.log("yes");
    e.preventDefault();
    // setLoading(true);
    try {
      await axios.put(
        `https://hospital-backend-4rvm.onrender.com/record/updaterecord/${id}`,
        record
      );
      onClose();
    } catch (error) {
      setError("Failed to save record. Please try again later.");
      // setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-8 text-center">Loading...</div>;
  }
  if (error) {
    return <div className="py-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-md shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Edit Record</h2>
      <form>
        <div className="mb-4">
          <input
            type="date"
            value={record.date}
            onChange={(e) => setRecord({ ...record, date: e.target.value })}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Body Temperature (°C/°F)
          </label>
          <input
            type="number"
            value={record.temparature}
            onChange={(e) =>
              setRecord({ ...record, temparature: e.target.value })
            }
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Blood Pressure
          </label>
          <input
            type="text"
            value={record.pressure}
            onChange={(e) => setRecord({ ...record, pressure: e.target.value })}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Heart Rate (bpm)
          </label>
          <input
            type="number"
            value={record.rate}
            onChange={(e) => setRecord({ ...record, rate: e.target.value })}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 mr-2 text-white bg-gray-600 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => {
              console.log("yes");
            }}
            // disabled={loading}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            {/* {loading ? "Saving..." : "Save"} */} save
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecordEdit;
