import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editPost, savePost, selectPostById } from '../redux/postSlice';
import { getDownloadUrl } from '../utils/imageUtil';
import { initialPost, postValidator } from '../utils/forms';
import { motion } from 'framer-motion';
import { Row, Label, Button, Form } from 'reactstrap';
import { ErrorMessage, Field, Formik } from 'formik';

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

const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const postObj = useSelector((state) => selectPostById(state, params.id));
  const initialValues = postObj ?? initialPost;

  const setImageUrl = async (file, formik) => {
    if (file) {
      // upload file to firebase storage
      let downloadUrl = await getDownloadUrl(file);
      formik.setFieldValue('imageUrl', downloadUrl);
    }
  };
  const handleSubmit = async (values, setSubmitting) => {
    if (params && params.id) {
      dispatch(editPost({ data: values, id: params.id }));
    } else {
      dispatch(savePost(values));
    }
    setSubmitting(false);
    navigate('/mypost');
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="container-fluid">
      <div className="row mt-5">
        <div className="col-9 col-md-7 m-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={postValidator}
            onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}>
            {(formik) => (
              <Form onSubmit={formik.handleSubmit} className="container">
                <Row className="form-group my-3">
                  <Label htmlFor="title" tag="h4">
                    Title
                  </Label>
                  <Field type="text" name="title" className="form-control" />
                  <ErrorMessage name="title" className="text-danger" />
                </Row>
                <Row className="form-group my-3">
                  <Label htmlFor="content" tag="h4">
                    Content
                  </Label>
                  <Field as="textarea" name="content" className="form-control" />
                  <ErrorMessage name="content" className="text-danger" />
                </Row>
                <Row className="form-group my-3">
                  <Label htmlFor="imageUrl">Pick an image</Label>
                  <input
                    id="imageUrl"
                    name="imageUrl"
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setImageUrl(e.currentTarget.files[0], formik)}
                  />
                </Row>
                <Row>
                  <img src={formik.values.imageUrl} style={{ height: 150, width: 'auto' }} alt="" />
                </Row>
                <Row>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </motion.div>
  );
};
export default CreatePost;
