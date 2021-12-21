import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from "react-router-dom";

import {
  fetchAlbumAsync,
  selectStatus,
  selectAlbums
} from './albumSlice';
import { Container, Card } from 'react-bootstrap';
import { useNavigate, createSearchParams } from 'react-router-dom';

export function Album() {
  const navigate = useNavigate();
  const status = useSelector(selectStatus);
  const albums = useSelector(selectAlbums);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const userName = searchParams.get("userName");

  useEffect(() => {
    dispatch(fetchAlbumAsync(userId))
  }, []);

  const goToAlbumDetail = ({ albumId }) => {
    const params = { albumId };
    navigate({
      pathname: '/album',
      search: `?${createSearchParams(params)}`,
    });
  }

  return (
    <Container>
    {
      status === "loading"
      ? <div>Fetching albums..</div>
      : status === "idle" && albums && Array.isArray(albums) && albums.length > 0
        ? <Container fluid>
          {userName && <p>List of album from {userName}</p>}
          {
            albums.map(album => {
              return (
                <Card key={album.id} className='mb-3 mt-3' style={{ width: '100%'}}>
                  <Card.Body>
                    <Card.Title>{album.title}</Card.Title>
                    <Card.Text>{album.body}</Card.Text>
                    <Card.Link onClick={() => goToAlbumDetail({ albumId: album.id })}>View Album Photos</Card.Link>
                  </Card.Body>
                </Card>
              )
            })
          }
          </Container>
        : <div>No album found</div>
    }
    </Container>
  );
}
