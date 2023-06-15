import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux';
// rafce
const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>

      <h1>Hangman</h1>
      <p>Find the hidden word - Enter a letter</p>

    
    </>
  )
}

export default Header
