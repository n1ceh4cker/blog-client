import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile, saveProfile, selectCurrentProfile } from '../redux/profileSlice';
import { getDownloadUrl } from '../utils/imageUtil';
import { initialProfile, profileValidator } from '../utils/forms';
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

const CreateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentProfile = useSelector(selectCurrentProfile);
  const initialValues = currentProfile ? currentProfile : initialProfile;

  const setImageUrl = async (file, formik) => {
    if (file) {
      // upload file to firebase storage
      let downloadUrl = await getDownloadUrl(file);
      formik.setFieldValue('imageUrl', downloadUrl);
    }
  };
  const handleSubmit = async (values, setSubmitting) => {
    if (currentProfile && currentProfile.id) {
      dispatch(editProfile(values));
      setSubmitting(false);
      navigate('/profile');
    } else {
      dispatch(saveProfile(values));
      setSubmitting(false);
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="container-fluid">
      <div className="row mt-5">
        <div className="col-9 col-md-7 m-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={profileValidator}
            onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}>
            {(formik) => (
              <Form onSubmit={formik.handleSubmit} className="container">
                <Row className="form-group my-3">
                  <Label htmlFor="username" tag="h4">
                    Username
                  </Label>
                  <Field type="text" name="username" className="form-control" />
                  <ErrorMessage name="username" className="text-danger" />
                </Row>
                <Row className="form-group my-3">
                  <Label htmlFor="bio" tag="h4">
                    Bio
                  </Label>
                  <Field as="textarea" name="bio" className="form-control" />
                  <ErrorMessage name="bio" className="text-danger" />
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

export default CreateProfile;
