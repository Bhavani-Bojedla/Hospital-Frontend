import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RecordDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://hospital-backend-4rvm.onrender.com/record/getrecord/${id}`);
        console.log('API Response:', response.data);
        if (response.data.record) {
          setRecord(response.data.record);
        } else {
          console.error("No record found");
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

  const handleDelete = async () => {
    try {
      await axios.delete(`https://hospital-backend-4rvm.onrender.com/record/deleterecord/${id}`);
      navigate('/history'); // Redirect to the history page after deletion
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
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
    <div className="max-w-lg p-6 mx-auto bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Record Details</h1>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p className="text-lg"><strong>Date:</strong> {new Date(record.Date).toLocaleDateString()}</p>
        <p className="text-lg"><strong>Body Temperature:</strong> {record.temparature} °C/°F</p>
        <p className="text-lg"><strong>Blood Pressure:</strong> {record.pressure}</p>
        <p className="text-lg"><strong>Heart Rate:</strong> {record.rate} bpm</p>
        <div className="flex mt-4 space-x-4">
          <button
            onClick={() => navigate(`/record/update/${id}`)}
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordDetail;
