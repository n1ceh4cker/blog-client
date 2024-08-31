import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUserPosts } from '../redux/postSlice';
import PostCard from './PostCard';
import EmptyState from './EmptyState';
import { motion } from 'framer-motion';

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
const MyPost = () => {
  const currentUserPosts = useSelector(selectCurrentUserPosts);
  const postsList =
    currentUserPosts.length !== 0 ? (
      currentUserPosts.map((post) => {
        return (
          <div className="col-10 col-md-4 m-auto" key={post.id}>
            <PostCard post={post} />
          </div>
        );
      })
    ) : (
      <EmptyState entity="posts"></EmptyState>
    );

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="container mt-5">
      <div className="row">{postsList}</div>
    </motion.div>
  );
};

export default MyPost;
