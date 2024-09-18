import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RecordEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    Date: '',
    temparature: '',
    pressure: '',
    rate: ''
  });

  useEffect(() => {
    const fetchRecord = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://hospital-backend-4rvm.onrender.com/record/getrecord/${id}`);
        if (response.data.record) {
          setRecord(response.data.record);
          setFormData({
            Date: response.data.record.Date,
            temparature: response.data.record.temparature,
            pressure: response.data.record.pressure,
            rate: response.data.record.rate
          });
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
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://hospital-backend-4rvm.onrender.com/record/updaterecord/${id}`, formData);
      navigate(`/record/${id}`); // Redirect to the record detail page
    } catch (error) {
      console.error("Failed to update record:", error);
    }
  };

  if (loading) {
    return <div className="py-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-lg p-6 mx-auto bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Edit Record</h1>
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
            type="text"
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
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">Update</button>
      </form>
    </div>
  );
};

export default RecordEdit;
