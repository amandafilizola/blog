import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './PostList.css';
import api from '../services/api';


export default function Login() {

  const history = useHistory();
  const [posts, setPosts] = useState([]);


  useEffect( () => {
    async function fetchData() {
      const response = await api.get('posts')
      if(response)
        setPosts(response.data)
    }
    fetchData();

  },[])


  function handleLogout() {
    localStorage.removeItem('writer_id');
    history.push('/login');
  }


  return (
    <div className="page-container">
      <header>
        <span onClick={handleLogout}>Logout</span>
      </header>

      <ul className="list-container">
        { posts.map((post)=>(
          <li className="list-item" key={post._id}>
            <div className='img-container' style={{ backgroundImage: `url(${post.image_url})`}}/>
            <div className="texts-container">
              <div className="headline">{post.headline}</div>
              <div className="lead">{post.lead}</div>
              <div className="message">{post.message}</div>


            </div>
          </li>
        ))}
      </ul>






    </div>
  )
}