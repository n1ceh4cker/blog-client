import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Button, TabContent, TabPane, Nav, NavLink, NavItem } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser, selectIsAuthenticated, selectIsLoading, signupUser } from '../redux/authSlice';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { authValidator, initialAuth } from '../utils/forms';

const Auth = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const isLoading = useSelector(selectIsLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const dispatch = useDispatch();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleAuth = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleLogin = (values, setSubmitting) => {
    toggleModal();
    dispatch(loginUser(values));
    setSubmitting(false);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const handleSignUp = (values, setSubmitting) => {
    toggleModal();
    dispatch(signupUser(values));
    setSubmitting(false);
  };

  const loader = isLoading && <span className="fa fa-spinner fa-pulse fa-fw text-primary"></span>;

  return (
    <>
      {!isAuthenticated ? (
        <Button className="bg-primary ml-3" onClick={toggleModal}>
          Login{loader}
        </Button>
      ) : (
        <Button className="bg-primary ml-3" onClick={handleLogout}>
          Logout{loader}
        </Button>
      )}
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Login/SignUp</ModalHeader>
        <ModalBody>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTab === '1' ? 'active' : ''}
                onClick={() => {
                  toggleAuth('1');
                }}>
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === '2' ? 'active' : ''}
                onClick={() => {
                  toggleAuth('2');
                }}>
                SignUp
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Formik
                initialValues={initialAuth}
                validationSchema={authValidator}
                onSubmit={(values, { setSubmitting }) => handleLogin(values, setSubmitting)}>
                <Form>
                  <FormGroup className="mb-2">
                    <Label htmlFor="email">Email</Label>
                    <Field type="email" name="email" className="form-control" />
                    <ErrorMessage name="email" className="text-danger" />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <Label htmlFor="password">Password</Label>
                    <Field type="password" name="password" className="form-control" />
                    <ErrorMessage name="password" className="text-danger" />
                  </FormGroup>
                  <Button type="submit" color="primary">
                    Login
                  </Button>
                </Form>
              </Formik>
            </TabPane>
            <TabPane tabId="2">
              <Formik
                initialValues={initialAuth}
                validationSchema={authValidator}
                onSubmit={(values, { setSubmitting }) => handleSignUp(values, setSubmitting)}>
                <Form>
                  <FormGroup className="mb-2">
                    <Label htmlFor="email">Email</Label>
                    <Field type="email" name="email" className="form-control" />
                    <ErrorMessage name="email" className="text-danger" />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <Label htmlFor="password">Password</Label>
                    <Field type="password" name="password" className="form-control" />
                    <ErrorMessage name="password" className="text-danger" />
                  </FormGroup>
                  <Button type="submit" color="primary">
                    Register
                  </Button>
                </Form>
              </Formik>
            </TabPane>
          </TabContent>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Auth;
