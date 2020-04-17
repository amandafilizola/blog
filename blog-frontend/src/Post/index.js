import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'moment';
import Header from '../Header';
import './Post.css';
import api from '../services/api';

export default function Post({match}) {

  const id = match.params.id;
  const [post, setPost] = useState({});
  const [nextPost, setNextPost] = useState({});
  const [previousPost, setPreviousPost] = useState({});
  const [paragraphs, setParagraphs] = useState('');
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`posts/${id}`)
      let newText = response.data.message.split('\n').map((item, i) => {
        return <p key={i}>{item}</p>;
      });
      setParagraphs(newText)
      setPost(response.data);

      let previous = await api.get(`posts/${response.data.previous_post}`)
      setPreviousPost(previous.data)

      let next = await api.get(`posts/${response.data.next_post}`)
      setNextPost(next.data)
    }
    fetchData();
  },[id])

  useEffect(() => {
    async function fetchPreviews() {
      if(post.previous_post){
        let previous = await api.get(`posts/${post.previous_post}`)
        setPreviousPost(previous.data)
      } else {
        setPreviousPost({_id: undefined})
      }

      if(post.next_post) {
        let next = await api.get(`posts/${post.next_post}`)
        setNextPost(next.data)
      } else {
        setNextPost({_id: undefined})
      }
    }
    fetchPreviews();
  },[post])

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
        {/* {console.log(previousPost)} */}
          { previousPost._id !== undefined ?
            <div className="previous-container">
            <span className='preview-title'style={{textAlign: 'left'}}>Previous Post</span>
            <div className='inside-content right'>
              <div className="img-container">
                <div className='image'style={{ backgroundImage: `url(${previousPost.image_url})`}}/>
              </div>
              <div className='preview-data'>
                <span className='preview-headline' onClick={()=> history.push('/post/' + previousPost._id)}>{previousPost.headline}</span>
                <span className='time-span'>{Moment(previousPost.date_time).format(' D/M/YYYY hh:mm') }</span>
              </div>
            </div>
          </div>: null}

          <div style={{ flex: 0.3}}/>

          { nextPost._id !== undefined ?
          <div className="next-container">
            <span className='preview-title' style={{textAlign: 'right'}}>Next Post</span>
            <div className='inside-content left'>
              <div className="img-container">
                <div className='image'style={{ backgroundImage: `url(${nextPost.image_url})`}}/>
              </div>
              <div className='preview-data'>
                <span className='preview-headline' onClick={()=> history.push('/post/' + nextPost._id)}>{nextPost.headline}</span>
                <span className='time-span'>{Moment(nextPost.date_time).format(' D/M/YYYY hh:mm') }</span>
              </div>
            </div>
          </div>: null}
        </div>
      </div>
    </div>
  )
}