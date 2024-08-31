import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/authSlice';
import { selectPostsByUser } from '../redux/postSlice';
import { selectCurrentProfile, selectProfileById } from '../redux/profileSlice';
import { Button } from 'reactstrap';
import { motion } from 'framer-motion';
import PostCard from './PostCard';
import EmptyState from './EmptyState';

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

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const params = useParams();

  const profileById = useSelector((state) => selectProfileById(state, params.id));
  const currentProfile = useSelector(selectCurrentProfile);
  const profileObj = profileById ?? currentProfile;

  const postObj = useSelector((state) => selectPostsByUser(state, profileObj.creator.id));

  const handleEdit = (profile) => {
    navigate('/editprofile', { replace: true });
  };

  const postsList =
    postObj.length !== 0 ? (
      postObj.map((post) => {
        return (
          <div className="col-12 col-md-6" key={post.id}>
            <PostCard post={post} />
          </div>
        );
      })
    ) : (
      <EmptyState entity="posts"></EmptyState>
    );

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
      {profileObj && (
        <div className="container mt-5">
          <div className="row">
            <div className="col-11 col-md-6 m-auto mb-5">
              <div className="row align-items-center">
                <div className="col-4 col-md-3">
                  <img className="img-fluid rounded-circle size" src={profileObj.imageUrl} alt="profile-pic" />
                </div>
                <div className="col-6 col-md-5">
                  <h3 className="mr-3">{profileObj.username}</h3>
                  <p>{profileObj.bio}</p>
                </div>
                <div className="col-4 offset-7 offset-md-0">
                  {user && profileObj.creator.id === user.id && (
                    <Button outline color="primary" onClick={() => handleEdit(profileObj)}>
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-10 col-md-7 m-auto mt-5">
              <h3>{profileObj.username + "'s posts"}</h3>
              <hr />
              <div className="row">{postsList}</div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Profile;
