import React from 'react';

import { PostsCreate, PostsList } from './components';

import './Posts.css';

const Posts = () =>
  <main className="content-main">
    <PostsCreate />
    <PostsList />
  </main>;

export default Posts;
