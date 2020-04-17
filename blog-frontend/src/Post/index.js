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

        <div className="pointers-container">
          <div className="previous-container">
            <span className='preview-title'style={{textAlign: 'left'}}>Previous Post</span>
            <div className='inside-content right'>
              <div className="img-container">
                <div className='image'style={{ backgroundImage: `url(${post.image_url})`}}/>
              </div>
              <div className='preview-data'>
                <span className='preview-headline'>Mandetta é chamado por Bolsonaro e se reúne com presidente no Planalto</span>
                <span className='time-span'>23/04/2020 14:34</span>
              </div>
            </div>
          </div>

          <div style={{flex: 0.3}}/>

          <div className="next-container">
            <span className='preview-title' style={{textAlign: 'right'}}>Next Post</span>
              <div className='inside-content left'>
                <div className="img-container">
                  <div className='image'style={{ backgroundImage: `url(${post.image_url})`}}/>
                </div>
                <div className='preview-data'>
                  <span className='preview-headline'>Mandetta é chamado por Bolsonaro e se reúne com presidente no Planalto</span>
                  <span className='time-span'>23/04/2020 14:34</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}