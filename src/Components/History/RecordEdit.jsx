import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecordEdit = ({ id, onClose }) => {
  const [temparature, setTemparature] = useState('');
  const [pressure, setPressure] = useState('');
  const [rate, setRate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch record details
  useEffect(() => {
    const fetchRecord = async () => {
      setLoading(true);
      try {
        console.log(`Fetching record with ID: ${id}`);
        const response = await axios.get(`https://hospital-backend-4rvm.onrender.com/record/getrecord/${id}`);
        console.log('Fetched record:', response.data.record); // Log fetched data
        const { temparature, pressure, rate } = response.data.record;
        setTemparature(temparature);
        setPressure(pressure);
        setRate(rate);
      } catch (error) {
        console.error('Error fetching record:', error.response ? error.response.data : error.message);
        setError('Failed to fetch record. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  // Save updated record details
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Saving record...');

    try {
      const response = await axios.put(`https://hospital-backend-4rvm.onrender.com/record/updaterecord/${id}`, {
        temparature,
        pressure,
        rate
      });
      console.log('Save successful:', response.data);
      setLoading(false);
      onClose(); // Close the modal after save
    } catch (error) {
      console.error('Error saving record:', error.response ? error.response.data : error.message);
      setError('Failed to save record. Please try again later.');
      setLoading(false); // Ensure loading is turned off if there's an error
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
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Body Temperature (°C/°F)</label>
          <input
            type="number"
            value={temparature}
            onChange={(e) => setTemparature(e.target.value)}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Blood Pressure</label>
          <input
            type="text"
            value={pressure}
            onChange={(e) => setPressure(e.target.value)}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Heart Rate (bpm)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
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
            disabled={loading}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecordEdit;
