// src/pages/SignIn.jsx
import React ,{useState} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const history = useNavigate();

  function handler(event) {
    event.preventDefault();
    if (Username && Email && Password) {
      setLoading(true); 
      let inputObj = { Username, Email, Password };
      console.log(inputObj);
      
      let url = "https://hospital-backend-4rvm.onrender.com/users/createuser";
      axios.post(url, inputObj)
        .then((res) => {
          if (res.status === 200) {
            toast.success("User created successfully");
            history("/signin");
          } else {
            Promise.reject();
          }
        })
        .catch((e) => {
          if (e.response && e.response.status === 400) {
            toast.error(e.response.data.message);
          } else {
            console.log(e);
          }
        })
        .finally(() => {
          setLoading(false); 
        });
    } else {
      toast.error("Please fill all the details");
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 ">
      <ToastContainer />
      <div className='flex items-center justify-center w-1/2'>
      <div className='bg-cover w-100 h-90 bg-login'></div>
      </div>
      <div className='w-1/2 py-28'>
      <div className="max-w-md p-8 mx-auto bg-white rounded-lg shadow-lg ">
        <h2 className="mb-4 text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handler}>
        <div className="mb-4">
            <label className="block mb-2 text-gray-700">Username</label>
            <input
              type="username"
              required
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your username"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Email</label>
            <input
              type="email"
              required
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Password</label>
            <input
              type="password"
              required
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading} 
            className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
             {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account? <Link to="/" className="text-blue-500">Sign In</Link>
        </p>
      </div>
      </div>
      
    </div>
  );
};

export default Signup;
