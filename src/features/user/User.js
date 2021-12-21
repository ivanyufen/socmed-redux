import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserAsync,
  selectStatus,
  selectUsers
} from './userSlice';
import { Container, Card } from 'react-bootstrap';
import { useNavigate, createSearchParams } from 'react-router-dom';

export function User() {
  const navigate = useNavigate();
  const status = useSelector(selectStatus);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserAsync())
  }, []);

  const goToPosts = ({ userId, userName }) =>{
    const params = { userId, userName };
    navigate({
      pathname: '/posts',
      search: `?${createSearchParams(params)}`,
    });
  }

  const goToAlbums = ({ userId, userName }) =>{
    const params = { userId, userName };
    navigate({
      pathname: '/albums',
      search: `?${createSearchParams(params)}`,
    });
  }
   

  return (
    <Container>
    {
      status === "loading"
      ? <div>Fetching users..</div>
      : status === "idle" && users && Array.isArray(users) && users.length > 0
        ? <Container fluid>
          List of users
          {
            users.map(user => {
              return (
                <Card key={user.id} className='mb-3 mt-3' style={{ width: '100%'}}>
                  <Card.Body>
                    <Card.Title>{user.id}. {user.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                    <Card.Link onClick={() => goToPosts({ userId: user.id, userName: user.name })}>View Posts</Card.Link>
                    <Card.Link onClick={() => goToAlbums({ userId: user.id, userName: user.name })}>View Albums</Card.Link>
                  </Card.Body>
                </Card>
                
              )
            })
          }
          </Container>
        : <div>No users found</div>
    }
    </Container>
  );
}
