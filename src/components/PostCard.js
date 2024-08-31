import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 5
    }
  }
};
function PostCard({ post }) {
  return (
    <motion.div variants={containerVariants} className="postcard mx-auto " style={{ backgroundImage: `url(${post.imageUrl})` }}>
      <div className="card-content">
        <h5 className="card-title">{post.title}</h5>
        <p>
          {post.content.substr(0, 35) + ' ... '}
          <br />
          <Link to={'/post/' + post.id}>Read more</Link>
        </p>
      </div>
    </motion.div>
  );
}

export default PostCard;
