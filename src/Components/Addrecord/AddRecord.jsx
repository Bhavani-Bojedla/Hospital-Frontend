import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Ensure react-toastify is imported
import "./AddRecord.css";

const AddRecord = () => {
  const [inputs, setInputs] = useState({
    Date: "",         
    temparature: "",  
    pressure: "",     
    rate: ""           
  });
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(false); 
  
  const id = localStorage.getItem("id"); // Retrieve user id from local storage
  // console.log(id);

  const change = (e) => {
    const { name, value } = e.target;
    // Handle date and numeric fields appropriately
    setInputs({ ...inputs, [name]:value });
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();

    // Ensure all fields have valid entries before submitting
    if (inputs.Date === "" || isNaN(Number(inputs.temparature)) || isNaN(Number(inputs.pressure)) || isNaN(Number(inputs.rate))) {
      toast.error("All inputs must be filled with valid numbers!");
      return;
    }

    if (id) {
      setLoading(true);
      try {
        const response = await axios.post("https://hospital-backend-4rvm.onrender.com/record/createrecord", {
          Date: inputs.Date,
          temparature: Number(inputs.temparature),  // Ensure it's sent as a number
          pressure: Number(inputs.pressure),  
          rate: Number(inputs.rate),  
          id: id,  // Send the user id as part of the request
        });
        setRecord([response.data.list, ...record]);
        toast.success("Your record has been added successfully!");
      } catch (error) {
        toast.error("Failed to add the record. Please try again.");
      } finally {
        setLoading(false);
        setInputs({ Date: "", temparature: "", pressure: "", rate: "" });
      }
    } else {
      toast.error("Please sign in to add records.");
      
    }
  };

  return (
    <div className="bg-gray-100 h-900">
      <ToastContainer />
      <div className='flex justify-evenly'>
        <div className='flex items-center justify-center w-1/2 '>
      <div className='bg-cover bg-addrecord h-90 w-100'></div>
      </div>
      <div className='w-1/2 py-14 '>
        <div className="w-2/3 p-8 bg-pink-200 rounded-lg shadow-lg ">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Add Health Record</h2>
          <form onSubmit={handleAddRecord}>
            {/* Date Input */}
            <div className="mb-4">
              <label className="add">Date</label>
              <input
                type="date"
                className="input"
                name="Date" // Name must match the state and schema
                value={inputs.Date}
                onChange={change}
                required
              />
            </div>
            {/* Temperature Input */}
            <div className="mb-4">
              <label className="add">Body Temperature (°C/°F)</label>
              <input
                type="number"
                className="input"
                name="temparature" // Matches backend schema
                value={inputs.temparature}
                onChange={change}
                placeholder="e.g., 36.5"
                required
              />
            </div>
            {/* Blood Pressure Input */}
            <div className="mb-4">
              <label className="add">Blood Pressure (systolic/diastolic)</label>
              <input
                type="number"
                className="input"
                name="pressure" // Matches backend schema
                value={inputs.pressure}
                onChange={change}
                placeholder="e.g., 120/80"
                required
              />
            </div>
            {/* Heart Rate Input */}
            <div className="mb-4">
              <label className="add">Heart Rate (bpm)</label>
              <input
                type="number"
                className="input"
                name="rate" // Matches backend schema
                value={inputs.rate}
                onChange={change}
                placeholder="e.g., 75"
                required
              />
            </div>
            {/* Submit Button */}
            <div className='flex items-center justify-center w-full'>
              <button
                type="submit"
                disabled={loading}
                className="w-1/3 p-2 font-medium text-white bg-black rounded hover:bg-blue-600"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AddRecord;
