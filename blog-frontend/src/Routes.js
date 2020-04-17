import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import PostList from './PostList';
import NewPost from './NewPost';
import Post from './Post';

export default function Routes() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={PostList} />
        <Route path="/new" component={NewPost} />
        <Route path="/post/:id" component={Post} />
      </Switch>
    </BrowserRouter>
  )

}


