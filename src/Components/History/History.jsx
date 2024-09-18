import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const History = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const isloggedIn = useSelector((state) => state.isloggedIn); 
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteRecordId, setDeleteRecordId] = useState(null);

  const id = localStorage.getItem("id");
  useEffect(() => {
    if (!isloggedIn) {
      console.log("User is not logged in");
      toast.error("Please sign in to view your health records", {
        position: "top-center",
        autoClose: 2000, 
      });
      const timer = setTimeout(() => {
        navigate('/signin'); 
      }, 2000); 

      return () => clearTimeout(timer); 
    }
    
  }, [isloggedIn, navigate]);


  useEffect(() => {
    if (id) {
      const fetchRecords = async () => {
        setLoading(true); // Start loading
        try {
          const response = await axios.get(`https://hospital-backend-4rvm.onrender.com/record/getrecorduser/${id}`);
          setRecords(response.data.records || []); // Ensure records is set
        } catch (error) {
          toast.error("Failed to fetch records.");
          console.error("Failed to fetch records:", error);
        } finally {
          setLoading(false); // End loading
        }
      };
      fetchRecords();
    }
  }, [id]);
  

  
  if (loading) {
    return <div className="items-center text-center pt-60">Loading records...</div>;
  }


  const handleDeleteRecord = async () => {
    if (id && deleteRecordId) {
      try {
        await axios.delete(`https://hospital-backend-4rvm.onrender.com/record/deleterecord/${deleteRecordId}`, {
          data: { id: id },
        });
        setRecords(records.filter((record) => record._id !== deleteRecordId)); // Update records
        toast.success("Your Record is deleted");
        setShowDeleteModal(false);
      } catch (error) {
        toast.error("Failed to delete record.");
        console.error("Failed to delete record:", error);
      }
    } else {
      toast.error("Record ID or user ID is missing.");
    }
  };
  
  const confirmRecordDelete = (recordId) => {
    setDeleteRecordId(recordId);
    setShowDeleteModal(true);
  };  

  
  return (
    <div className="py-5 bg-gray-100 ">
      <ToastContainer className='pt-16'/>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Confirm Deletion</h2>
            <p>Are you sure you want to delete this task?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeleteModal(false)} 
                className="px-4 py-2 mr-2 text-white bg-gray-600 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteRecord} 
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
  <div className="max-w-2xl p-6 mx-auto bg-pink-200 rounded-md ">
        
       
        <h1 className="mb-6 text-3xl font-bold">Health Metrics Dashboard</h1>
        <div className="space-y-4">
          {records.length === 0 ? (
            <p>No records found.</p>
          ) : (
            records.map((record, index) => (
              <div key={record._id} className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="mb-2 text-xl font-semibold text-blue-500">Record {index + 1}</h2>
                <p className="text-lg"><span className='font-medium'>Date:</span> {new Date(record.Date).toLocaleDateString()}</p>
                <p className="text-lg"><span className='font-medium'>Body Temperature:</span> {record.temparature} °C/°F</p>
                <p className="text-lg"><span className='font-medium'>Blood Pressure:</span> {record.pressure}</p>
                <p className="text-lg"><span className='font-medium'>Heart Rate:</span> {record.rate} bpm</p>
                <div className="flex mt-4 space-x-4">
                  <Link to={`/record/${record._id}`} className="text-blue-500 hover:underline">View Details</Link>
                  <button onClick={() => confirmRecordDelete(record._id)} className="text-red-500 hover:underline">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
