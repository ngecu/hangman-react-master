import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'


import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

function App() {


  return (
    <Router>
       <Route path='/login' component={LoginScreen} />
      
<Route path='/' component={HomeScreen} exact />    
</Router>
  );
}

export default App;
