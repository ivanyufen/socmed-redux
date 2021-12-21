import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import {
  fetchAlbumDetailAsync,
  selectStatus,
  selectAlbumDetail
} from './albumSlice';
import { Container, Card, Button, Image, Modal } from 'react-bootstrap';

export function AlbumDetail() {

  const status = useSelector(selectStatus);
  const albumDetail = useSelector(selectAlbumDetail);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const albumId = searchParams.get("albumId");
  const [showPhotoDetail, setShowPhotoDetail] = useState(false);
  const [photoDetailURL, setPhotoDetailURL] = useState('');

  useEffect(() => {
    dispatch(fetchAlbumDetailAsync(albumId))
  }, []);

  useEffect(() => {
    if(photoDetailURL && typeof photoDetailURL === 'string'){
      setShowPhotoDetail(true);
    } else {
      setShowPhotoDetail(false);
    }
  }, [photoDetailURL])

  const handleViewPhoto = (url) => {
    setPhotoDetailURL(url);
  }

  const handleClosePhoto = () => {
    setPhotoDetailURL('');
  }

  return (
    <Container style={{ textAlign: 'left' }}>
      {
        status === "loading"
        ? <div>Fetching album detail photos..</div>
        : status === "idle" && albumDetail && Array.isArray(albumDetail) && albumDetail.length > 0
          ? <Container fluid>
            <h1>Album Photos</h1>
            { albumDetail.map((photo, index) => {
                return (
                  <Card key={photo.id} className='mb-1 mt-1' style={{ width: '100%', fontSize: '0.7em'}}>
                    <Card.Img onClick={() => handleViewPhoto(photo.url)} variant="top" src={photo.thumbnailUrl} />
                  <Card.Body>
                    <Card.Title>{photo.title}</Card.Title>
                  </Card.Body>
                  </Card>
                )
              })
            }
            </Container>
          : <div>No photos found</div>
      }
      
      {/* Modal to show Photo Detail */}
      <Modal show={showPhotoDetail} onHide={handleClosePhoto}>
        <Modal.Header closeButton>
          Image Detail
        </Modal.Header>
        <Modal.Body>
        <Image src={photoDetailURL} fluid  />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePhoto}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
