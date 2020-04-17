import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'moment';
import './PostList.css';
import api from '../services/api';
import Header from '../Header';

export default function Login() {

  const [posts, setPosts] = useState([]);
  const history = useHistory();

  useEffect( () => {
    async function fetchData() {
      const response = await api.get('posts')
      if(response){
        let sortedPosts = response.data.sort((a,b) => { return new Date(b.date_time) - new Date(a.date_time)})
        console.log(sortedPosts[0])
        setPosts(sortedPosts)
      }
    }
    fetchData();
  },[])


  return (
    <div className="page-container">
      <Header/>
      <ul className="list-container">
        { posts.map((post)=>(
          <li className="list-item" key={post._id}>
            <div className='img-container' style={{ backgroundImage: `url(${post.image_url})`}}/>
            <div className="texts-container">
              <div className="headline" onClick={()=> history.push('/post/'+post._id)}>{post.headline}</div>
              <div className="lead">{post.lead}</div>
              <div className="message">{post.message}</div>
              <div className="timestamp">{Moment(post.date_time).format('hh:mm, D/M/YYYY - ') + Moment(post.date_time).fromNow()}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}