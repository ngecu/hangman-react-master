import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login, register } from '../actions/userActions'
import { registerWithGoogle, signInWithGoogle,  } from "../firebase";
import { USER_LOGIN_FAIL } from '../constants/userConstants'
import { useHistory } from 'react-router-dom';

const LoginScreen = ({ location }) => {
  const history = useHistory();
  const [email, setEmail] = useState('')


  const [knownLanguage, setKnownLanguage] = useState('');
  const [learningLanguage, setLearningLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleKnownLanguageChange = (e) => {
    setKnownLanguage(e.target.value);
  };

  const handleLearningLanguageChange = (e) => {
    setLearningLanguage(e.target.value);
  };

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };


  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email))
  }


  const authenticate = async (e) => {
    e.preventDefault();
    const signupgoogledetails = await registerWithGoogle();
   
    if (signupgoogledetails) {
      console.log("sadasd",signupgoogledetails);

      const x_email = signupgoogledetails.user?.email

      console.log(x_email)

      if (x_email) {
        dispatch(register({email:x_email}))
      }
    }
 
  };

  const loginWithGoogle = async ()=>{
    const details = await signInWithGoogle()
    console.log("details are ",details)
    const {email,error}= details
    if (email) {
      dispatch(login({ email}));
    }
    if(error){
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error
            ? error
            : error
      })
    }  }

    const handleStartGame = () => {
      if (!knownLanguage || !learningLanguage || !level) {
        setErrorMessage('Please fill in all the fields');
        return;
      }
    
      const gameData = {
        knownLanguage,
        learningLanguage,
        level,
      };
    
      localStorage.setItem('gameData', JSON.stringify(gameData));
      setErrorMessage('');
    history.push('/'); // Navigate to '/' route
    };
  
    // Language options
    const languageOptions = [
      { value: 'english', label: 'English' },
      { value: 'spanish', label: 'Spanish' },
      { value: 'french', label: 'French' },
      { value: 'german', label: 'German' },
      // Add more languages as needed
    ];

    

  return (
    <>
      <Row className='w-100'>
        

        <Col md={12}>
        <div style={{textAlign:"center"}} >
      <h1 >HANGMAN GAME</h1>
      {error && <Message variant='danger'>{error}</Message>}
       {loading && <Loader />}

       {errorMessage && <Message variant='danger'>{errorMessage}</Message>}


      <div>
     
      <label>
        Known Language:
        <select className='form-control w-100' value={knownLanguage} onChange={handleKnownLanguageChange}>
          <option value="">Select Known Language</option>
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Learning Language:
        <select className='form-control w-100' value={learningLanguage} onChange={handleLearningLanguageChange}>
          <option value="">Select Learning Language</option>
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Level:
        <select className='form-control w-100' value={level} onChange={handleLevelChange}>
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </label>
      <br />
      <Button onClick={handleStartGame}>Start</Button>
    </div>

      
      </div>
          
        </Col>
      </Row>
     
    </>
  )
}

export default LoginScreen
