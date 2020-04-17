import React from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const history = useHistory();

  function handleLogout() {
    localStorage.removeItem('writer_id');
    history.push('/login');
  }

  return (
      <header>
        <span onClick={()=>history.push('/home')}>Home</span>
        <span onClick={()=>history.push('/new')}>Post</span>
        <span onClick={handleLogout}>Logout</span>
      </header>
  )
}