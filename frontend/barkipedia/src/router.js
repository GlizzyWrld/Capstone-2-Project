import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Views from "./views";
import { Navbar } from "./components";

const Router = () => {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route exact path='/' element={<Views.HomeView/>}/>
            <Route exact path='/users/facts' element={<Views.FactsView/>}/>
            <Route exact path='/fod' element={<Views.FodView/>}/>
            <Route exact path='/users/saved/:username' element={<Views.SavedFactsView/>}/>
            <Route exact path='/users/profile/:username' element={<Views.ProfileView/>}/>
            <Route exact path='/auth/login' element={<Views.LoginView/>}/>
            <Route exact path='/auth/users' element={<Views.SignupView/>}/>
              
        </Routes>
    </BrowserRouter>
  )
}

export default Router