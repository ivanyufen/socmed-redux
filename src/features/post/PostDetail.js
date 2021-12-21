import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import {
  fetchPostDetailAsync,
  selectStatus,
  selectPostDetail
} from './postSlice';
import { Container, Card } from 'react-bootstrap';

export function PostDetail() {

  const status = useSelector(selectStatus);
  const postDetail = useSelector(selectPostDetail);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("postId");

  useEffect(() => {
    dispatch(fetchPostDetailAsync(postId))
  }, []);

  return (
    <Container style={{ textAlign: 'left' }}>
    {
      status === "loading"
      ? <div>Fetching post detail and its comments..</div>
      : status === "idle" && postDetail && typeof postDetail === 'object' && Object.keys(postDetail).length > 0
        ? <Container fluid>
          <h1>Post Detail</h1>
          <div style={{ textAlign: 'left' }}>
            <strong>Title:</strong> {postDetail.title}
            <br />
            <strong>Body:</strong> {postDetail.body}
          </div>
          { postDetail.comments &&
          <>
          <strong>Comments: </strong>
          {
            postDetail.comments && postDetail.comments.map((comment, index) => {
              return (
                <Card key={comment.id} className='mb-1 mt-1' style={{ width: '100%', fontSize: '0.7em'}}>
                  <Card.Body>
                    <Card.Text>{comment.body}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">by: {comment.email}</Card.Subtitle>
                  </Card.Body>
                </Card>
              )
            })
          }
          </>
          }
          
          </Container>
        : <div>No post found</div>
    }
    </Container>
  );
}
