import React, { Component } from 'react';
import {Routes,Route}  from "react-router-dom";
import cookie from 'react-cookies';
import axios from 'axios';

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
import SwView from './SwToolsManage/SwView';
import SwDetailView from './SwToolsManage/SwDetailView';
import Register from './User/Register';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {
    return (
      <div className="App">
        <HeaderAdmin/> 
        <Routes>
          <Route exact path='/'element = {<LoginForm/>} />
          <Route path='/login'element = {<LoginForm/>} />
          <Route exact path='/ReactProxy' element = {<ReactProxy/>} />
          <Route exact path='/APIGetJson' element = {<APIGetJson/>} />
          <Route exact path='/APIPostJson' element = {<APIPostJson/>} />
          <Route exact path='/SwList' element = {<SwList/>} />
          <Route exact path='/SwView' element = {<SwView/>} />
          <Route path='/SwDetailView/:swtcode' element = {<SwDetailView/>} />
          <Route exact path='/Register' element = {<Register/>} />
        </Routes>
        <Footer/>
      </div>
    );
  }
}

export default App;