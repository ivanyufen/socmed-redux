import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from "react-router-dom";

import {
  fetchPostAsync,
  selectStatus,
  selectPosts,
  updatePost
} from './postSlice';
import { Container, Row, Card, Form, Button, Modal } from 'react-bootstrap';
import { useNavigate, createSearchParams } from 'react-router-dom';

export function Post() {
  const navigate = useNavigate();
  const status = useSelector(selectStatus);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const userName = searchParams.get("userName");

  const [showAddPostForm, setShowAddPostForm] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');

  const [showEditPostForm, setShowEditPostForm] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchPostAsync(userId))
  }, []);

  const goToPostDetail = ({ postId }) => {
    const params = { postId };
    navigate({
      pathname: '/post',
      search: `?${createSearchParams(params)}`,
    });
  }

  const handleDeletePost = ({ index }) => {
    const tempPosts = [...posts];
    tempPosts.splice(index, 1);
    dispatch(updatePost(tempPosts));
  }

  const handleAddPost = () => {
    setShowAddPostForm(true);
  }

  const handleCloseAddPost = () => {
    setShowAddPostForm(false);
  }

  const handleEditPost = ({ post }) => {
    setPostToEdit(post);
    setShowEditPostForm(true);
  }

  const handleSubmitNewPost = () => {
    if(newPostTitle.trim() === '' || newPostBody.trim() === ''){
      alert('Please fill the title and body!');
      return;
    }
    
    const newPost = {
      id: posts.length + 1,
      title: newPostTitle,
      body: newPostBody,
      userId: userId
    }
    
    const tempPosts = [...posts];
    tempPosts.unshift(newPost);
    dispatch(updatePost(tempPosts));

    setNewPostTitle('');
    setNewPostBody('');
    setShowAddPostForm(false);
    setTimeout(() => {
      alert('New Post added!')
    }, 200);
    
  }

  const handleCloseEditPost = () => {
    setPostToEdit(null);
    setShowEditPostForm(false);
  }

  const handleSubmitEditPost = () => {
    if(postToEdit.title.trim() === '' || postToEdit.body.trim() === ''){
      alert('Please fill the title and body!');
      return;
    }
    const tempPosts = [...posts];
    const indexToUpdate = posts.findIndex(post => post.id === postToEdit.id);
    if(indexToUpdate !== -1){
      tempPosts[indexToUpdate] = postToEdit;
      dispatch(updatePost(tempPosts));
      setPostToEdit(null);
      setShowEditPostForm(false);
      setTimeout(() => {
        alert('Post edited!')
      }, 200);
    }
    
  }

  return (
    <Container>
    {
      status === "loading"
      ? <div>Fetching posts..</div>
      : status === "idle" && posts && Array.isArray(posts) && posts.length > 0
        ? <Container fluid>
          {userName && <p>List of post from {userName}</p>}
          <Row>
          <Button variant="primary" onClick={handleAddPost}>
            Add New Post
          </Button>
          </Row>
          {
            posts.map((post, index) => {
              return (
                <Card key={post.id} className='mb-3 mt-3' style={{ width: '100%'}}>
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.body}</Card.Text>
                    <Card.Link onClick={() => goToPostDetail({ postId: post.id })}>View Post</Card.Link>
                    <Card.Link onClick={() => handleEditPost({ post })}>Edit Post</Card.Link>
                    <Card.Link style={{ color: 'red' }} onClick={() => handleDeletePost({ index })}>Delete Post</Card.Link>
                  </Card.Body>
                </Card>
              )
            })
          }
          </Container>
        : <div>No post found</div>
    }

    {/* Modal to add new post */}
    <Modal show={showAddPostForm} onHide={handleCloseAddPost}>
        <Modal.Header closeButton>
          Add New Post
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Body</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter body" value={newPostBody} onChange={(e) => setNewPostBody(e.target.value)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmitNewPost}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

    {/* Modal to edit post */}
    <Modal show={showEditPostForm} onHide={handleCloseEditPost}>
        <Modal.Header closeButton>
          Edit Post
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" value={postToEdit?.title} onChange={(e) => setPostToEdit({...postToEdit, title: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Body</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter body" value={postToEdit?.body} onChange={(e) => setPostToEdit({...postToEdit, body: e.target.value })}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmitEditPost}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
