import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RecordDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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
        setError("Failed to fetch record. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://hospital-backend-4rvm.onrender.com/record/deleterecord/${id}`);
      toast.success("Record deleted successfully!");
      navigate("/history");
    } catch (error) {
      console.error("Failed to delete record:", error);
      toast.error("Failed to delete the record. Please try again.");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`https://hospital-backend-4rvm.onrender.com/record/updaterecord/${id}`, record);
      setShowEditModal(false);
      toast.success("Record updated successfully!");
    } catch (error) {
      console.error("Error saving record:", error);
      setError("Failed to save record. Please try again later.");
      toast.error("Error while saving the record!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
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
          <p className="text-lg"><strong>Date:</strong> {new Date(record.date).toLocaleDateString()}</p>
          <p className="text-lg"><strong>Body Temperature:</strong> {record.temperature} °C/°F</p>
          <p className="text-lg"><strong>Blood Pressure:</strong> {record.pressure}</p>
          <p className="text-lg"><strong>Heart Rate:</strong> {record.rate} bpm</p>
          <div className="flex mt-4 space-x-4">
            <button onClick={() => setShowEditModal(true)} className="text-blue-500 hover:underline">Edit</button>
            <button onClick={() => setShowDeleteModal(true)} className="text-red-500 hover:underline">Delete</button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="absolute inset-0" onClick={() => setShowEditModal(false)}></div>
          <div className="relative z-10 p-6 bg-white rounded-md shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Edit Record</h2>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input type="date" name="date" value={record.date} onChange={handleChange} className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Body Temperature (°C/°F)</label>
                <input type="number" name="temperature" value={record.temperature} onChange={handleChange} className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Blood Pressure</label>
                <input type="number" name="pressure" value={record.pressure} onChange={handleChange} className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Heart Rate (bpm)</label>
                <input type="number" name="rate" value={record.rate} onChange={handleChange} className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm" required />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 mr-2 text-white bg-gray-600 rounded hover:bg-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
