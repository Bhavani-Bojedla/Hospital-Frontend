import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Signin from './Components/SignIn/Signin'
import Signup from './Components/SignIn/Signup'
import Home from './Components/Home/Home'
import AddRecord from './Components/Addrecord/AddRecord'
import Profile from './Components/Profile/Profile'
import History from './Components/History/History'
import RecordDetail from './Components/History/RecordDetail'
import RecordEdit from './Components/History/RecordEdit'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <div>
        <Navbar /> 
        <div className="">
         <Routes>
         <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home/>} />
            <Route path="/add-record" element={<AddRecord />} />
            <Route path="/history" element={<History/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/record/update/:id' element={<RecordEdit/>}/>
            <Route path='/record/:id' element={<RecordDetail/>}/>
         </Routes>
         </div>
         </div>
      </BrowserRouter>
    </>
  )
}

export default App
