import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RecordEdit = ({ id, onRecordUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    Date: '',
    temparature: '',
    pressure: '',
    rate: ''
  });

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`https://hospital-backend-4rvm.onrender.com/record/getrecord/${id}`);
        if (response.data.record) {
          setFormData({
            Date: response.data.record.Date,
            temparature: response.data.record.temparature,
            pressure: response.data.record.pressure,
            rate: response.data.record.rate
          });
        }
      } catch (error) {
        console.error("Failed to fetch record:", error);
      }
    };

    fetchRecord();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData); // Log form data before submission
    setIsSaving(true);
    try {
      await axios.put(`https://hospital-backend-4rvm.onrender.com/record/updaterecord/${id}`, formData);
      console.log("Record updated successfully");
      onRecordUpdate(); // Trigger parent update
      onClose(); // Close modal
    } catch (error) {
      console.error("Failed to update record:", error);
    } finally {
      setIsSaving(false);
      console.log("isSaving reset to false");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="Date" className="block mb-2 text-lg font-medium">Date</label>
        <input
          type="date"
          id="Date"
          name="Date"
          value={formData.Date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="temparature" className="block mb-2 text-lg font-medium">Body Temperature</label>
        <input
          type="number"
          id="temparature"
          name="temparature"
          value={formData.temparature}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="pressure" className="block mb-2 text-lg font-medium">Blood Pressure</label>
        <input
          type="number"
          id="pressure"
          name="pressure"
          value={formData.pressure}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rate" className="block mb-2 text-lg font-medium">Heart Rate</label>
        <input
          type="number"
          id="rate"
          name="rate"
          value={formData.rate}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={onClose} className="px-4 py-2 mr-2 text-white bg-gray-600 rounded hover:bg-gray-700">Cancel</button>
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Save</button>
      </div>
    </form>
  );
};

export default RecordEdit;
