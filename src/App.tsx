import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams
} from "react-router-dom";
import Login from './layout/Login';
import Home from './layout/Home';
import './App.css';
import { getUserInfo } from './type/UserSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './app/store';
import Admin from './layout/Admin';

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const userInfo = JSON.parse(localStorage.getItem('userInformation') || '{}');
  useEffect(() => {
    if(userInfo){
      dispatch(getUserInfo(userInfo[0]?.id!))
    }
  },[userInfo])
  return (
      <div className="App" style={{fontFamily: 'Roboto, sans-serif'}}>
        <Routes>
          <Route 
            path="/"
            element={
              <Home />
            }
          />
          <Route 
            path="/login" 
            element={
              <Login />
            }
          />
          <Route 
            path="/soolee" 
            element={
              <Admin />
            }
          /> 
          {/* <Route 
            path="/profileId/:userIdParams" 
            element={
              <Profile />
            }
          /> */}
          {/* <Route 
            path="/chatId/:fromid/:toid"
            element={
              <ChatBoxDetail />
            }
          />
          <Route 
            path="/test" 
            element={<Test />}
          /> */}
        </Routes>
      </div>
  );
}

export default App;
