import React from 'react'
import {Routes,Route,BrowserRouter as Router} from 'react-router-dom'
import Loggedpage from './Loggedpage'
import Login from './Login'
export default function Layout() {
  return (
    <div>
        <Router>
            <Routes>
                <Route path="/logged/:id" element={<Loggedpage/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Router>
    </div>
  )
}
