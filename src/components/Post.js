import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { commentPost, selectPostById, toggleLikePost } from '../redux/postSlice';
import { selectProfileByCreator } from '../redux/profileSlice';
import { selectUser } from '../redux/authSlice';
import { Button, Row, Label, CardTitle, CardText, Card, Form } from 'reactstrap';
import { motion } from 'framer-motion';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';

const containerVariants = {
  hidden: {
    opacity: 0,
    x: '-100vw'
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      delay: 0.5
    }
  },
  exit: {
    x: '100vw',
    transition: { ease: 'easeInOut' }
  }
};
const options = {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};

const Post = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const params = useParams();
  const id = params.id;
  let commentList;
  const postObj = useSelector((state) => selectPostById(state, id));
  const profileObj = useSelector((state) => selectProfileByCreator(state, postObj?.author?.id));
  if (postObj) {
    commentList =
      postObj.comments.length !== 0 &&
      postObj.comments.map((e) => (
        <Card className="box-shadow container" key={e.comment}>
          <div className="row justify-content-center">
            <div className="col-md-7 mb-1">
              <CardTitle tag="h5">{e.author.username}</CardTitle>
              <CardText>{e.comment}</CardText>
            </div>
            <div className="col-md-4">
              <CardText>{new Intl.DateTimeFormat('en-us', options).format(new Date(Date.parse(e.createdAt)))}</CardText>
            </div>
          </div>
        </Card>
      ));
  }

  const handleEdit = (post) => {
    navigate('/createpost/' + post.id);
  };
  const handleSubmit = (values, setSubmitting) => {
    dispatch(commentPost({ data: values, id: postObj.id }));
    setSubmitting(false);
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
      {postObj && profileObj && (
        <div className="container">
          <div className="row">
            <div className="col-10 col-md-7 m-auto">
              <h3 className="my-3 text-capitalize">{postObj.title}</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-10 col-md-7 m-auto">
              <div className="row align-items-center">
                <div className="col-3 col-md-2">
                  <img src={profileObj.imageUrl} className="img-fluid rounded-circle size" alt="profile-pic" />
                </div>
                <div className="col">
                  <h5>{profileObj.username}</h5>
                  Posted on:
                  {new Intl.DateTimeFormat('en-us', options).format(new Date(Date.parse(postObj.createdAt)))}
                </div>
              </div>
              <div className="d-flex justify-content-end  mb-3">
                {user && profileObj.creator.id === user.id && (
                  <Button outline color="primary" onClick={() => handleEdit(postObj)}>
                    Edit Post
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-9 col-md-7 m-auto">
              <img className="d-flex mb-5" src={postObj.imageUrl} alt="post_image" style={{ height: 300 }} />
              {user ? (
                <>
                  <Button close onClick={() => dispatch(toggleLikePost(postObj.id))}>
                    {postObj.likes.filter((e) => e.author.id === user.id).length ? (
                      <span className="fa fa-heart" style={{ color: 'red' }}></span>
                    ) : (
                      <span className="fa fa-heart-o" style={{ color: 'red' }}></span>
                    )}
                  </Button>
                  <p>{postObj.content}</p>
                  <Formik
                    initialValues={{ comment: '' }}
                    validationSchema={Yup.object({ comment: Yup.string().required() })}
                    onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}>
                    {(formik) => (
                      <Form onSubmit={formik.handleSubmit} className="mb-5">
                        <Row className="form-group my-3">
                          <Label htmlFor="comment" tag="h5">
                            Leave your comment here
                          </Label>
                          <Field as="textarea" name="comment" className="form-control" />
                        </Row>
                        <Button type="submit" color="primary">
                          Submit
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </>
              ) : (
                <p>{postObj.content}</p>
              )}
              {commentList}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Post;
