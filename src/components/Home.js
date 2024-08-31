import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllPosts, selectIsLoading as selectPostLoading } from '../redux/postSlice';
import { selectAllProfiles, selectIsLoading as selectProfileLoading } from '../redux/profileSlice';
import { motion } from 'framer-motion';
import ProfileCard from './ProfileCard';
import PostCard from './PostCard';
import EmptyState from './EmptyState';

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      when: 'beforeChildren',
      staggerChildren: 1
    }
  },
  exit: {
    x: '100vw',
    transition: { ease: 'easeInOut' }
  }
};
const topVariant = {
  hidden: { y: '-100vh' },
  visible: { y: 0, transition: { type: 'spring' } }
};
const postVariant = {
  hidden: { x: '100vw' },
  visible: { x: 0, transition: { type: 'spring' } }
};
const profileVariant = {
  hidden: { x: '-100vw' },
  visible: { x: 0, transition: { type: 'spring' } }
};

const Home = () => {
  const posts = useSelector(selectAllPosts);
  const profiles = useSelector(selectAllProfiles);
  const postLoading = useSelector(selectPostLoading);
  const profileLoading = useSelector(selectProfileLoading);
  const postsList = posts ? (
    posts.map((post) => {
      return (
        <div className="col-12 col-md-6" key={post.id}>
          <PostCard post={post} />
        </div>
      );
    })
  ) : (
    <EmptyState entity="posts"></EmptyState>
  );
  const profilesList = profiles ? (
    profiles.map((profile) => {
      return (
        <div className="col-12" key={profile.id}>
          <ProfileCard profile={profile} />
        </div>
      );
    })
  ) : (
    <EmptyState entity="profiles"></EmptyState>
  );
  const Loader = () => (
    <div className="d-flex justify-content-center align-items-center p-10">
      <span className="fa fa-3x fa-spinner fa-pulse fa-fw text-primary"></span>
    </div>
  );

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
      <motion.div variants={topVariant} className="container-fluid">
        <div className="row mb-5" style={{ height: '40vh', background: `url('/images/banner.jpeg') right top/cover no-repeat` }}>
          <div className="col-12 my-auto text-background">
            <h1 className="heading text-center">Tell Your Story to the World</h1>
            <h4 className="heading text-center">Join with us. Register and start writing</h4>
          </div>
        </div>
      </motion.div>
      <div className="container">
        <div className="row">
          <motion.div variants={postVariant} className="col-11 col-md-7 mx-auto">
            <div className="row">
              <h2>Recent Posts</h2>

              <hr />
              {postLoading ? <Loader /> : postsList}
            </div>
          </motion.div>
          <motion.div variants={profileVariant} className="col-11 col-md-4 mx-auto">
            <div className="row">
              <h2>Popular Writers</h2>
              <hr />
              {profileLoading ? <Loader /> : profilesList}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
