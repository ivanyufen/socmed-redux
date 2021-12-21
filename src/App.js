import React from 'react';
import { Routes, Route } from "react-router-dom";
import { User } from './features/user/User';
import { Post } from './features/post/Post';
import { PostDetail } from './features/post/PostDetail';
import { Album } from './features/album/Album';
import { AlbumDetail} from './features/album/AlbumDetail';
import './App.css';

const NotExist = () => <div>Sorry, the page you're looking for doesn't exist.</div>;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="users" element={<User />} />
        <Route path="posts" element={<Post />} />
        <Route path="post" element={<PostDetail />} />
        <Route path="albums" element={<Album />} />
        <Route path="album" element={<AlbumDetail />} />
        <Route path="*" element={<NotExist />} />
      </Routes>
    </div>
  );
}

export default App;
