import React, { Component } from 'react';
import {Routes,Route}  from "react-router-dom";

// css
import '../css/new.css';
// header
import HeaderAdmin from './Header/Header admin';
// footer
import Footer from './Footer/Footer';
// route
import LoginForm from './LoginForm';
import ReactProxy from './ReactProxy';
import APIGetJson from './APIGetJson';
import APIPostJson from './APIPostJson';
import SwList from './SwToolsManage/SwList';

class App extends Component {
  render () {
    return (
      <div className="App">
        <HeaderAdmin/> 
        <Routes>
          <Route exact path='/'element = {<LoginForm/>} />
          <Route exact path='/ReactProxy' element = {<ReactProxy/>} />
          <Route exact path='/APIGetJson' element = {<APIGetJson/>} />
          <Route exact path='/APIPostJson' element = {<APIPostJson/>} />
          <Route exact path='/SwList' element = {<SwList/>} />
        </Routes>
        <Footer/>
      </div>
    );
  }
}

export default App;