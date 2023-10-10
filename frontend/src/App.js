import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
 import Start from './components/Start';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import {BrowserRouter} from 'react-router-dom';
import {Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import User from './components/User';

// USUARIOS
import SeeUsers from './users/SeeUsers';
import AddUsers from './users/AddUsers';
import UpdateUser from './users/UpdateUser';

// ADMINS
import SeeAdmins from './admins/SeeAdmins';
import AddAdmins from './admins/AddAdmins';

// CATEOGRIAS 
import CreateCategory from './sidebar-options/CreateCategory';
import CreateWord from './sidebar-options/CreateWord';
import EditCategory from './sidebar-options/EditCategory';
import EditWord from './sidebar-options/EditWord';

// STATS 
import Stats from './components/Stats';

function App(){
  return (
    <React.Fragment>
      <BrowserRouter>
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<User/>} />
          <Route path="/create-category" element={<CreateCategory/>} />
          <Route path="/create-word" element={<CreateWord/>} />
          <Route path="/edit-category" element={<EditCategory/>} />
          <Route path="/edit-word" element={<EditWord/>} />
          <Route path="/see-users" element={<SeeUsers/>} />
          <Route path="/add-users" element={<AddUsers/>} />
          <Route path="/update/:id" element={<UpdateUser/>} />
          <Route path="/see-admins" element={<SeeAdmins/>} />
          <Route path="/add-admins" element={<AddAdmins/>} />
          <Route path="/stats" element={<Stats/>} />
|
 
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;

