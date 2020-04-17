import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import Header from '../Header';
import './Post.css';
import api from '../services/api';

export default function Post({match}) {

  const id = match.params.id;
  const [post, setPost] = useState({});
  const [paragraphs, setParagraphs] = useState('')

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`posts/${id}`)
      let newText = response.data.message.split('\n').map((item, i) => {
        return <p key={i}>{item}</p>;
      });
      setParagraphs(newText)
      setPost(response.data);
    }
    fetchData();

  },[id])

  return (
    <div className="page-container">
      <Header/>

      <div className='post-container'>
        <div className='post'>
          <p className='headline'>{post.headline}</p>
          <p className='lead'>{post.lead}</p>
          <div className='writer-time-container'>
            <p className='writer-name'>Por {post.name}</p>
            <p className='post-time'>{Moment(post.date_time).format(' D/M/YYYY hh:mm - ') + Moment(post.date_time).fromNow()}</p>
          </div>
          <div className="image-container">
            <div className='image' style={{ backgroundImage: `url(${post.image_url})`}}/>
          </div>
          <div className="message">
            {paragraphs}
          </div>
        </div>
      </div>
    </div>
  )
}