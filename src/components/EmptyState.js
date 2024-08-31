import React from 'react';

const EmptyState = ({ entity }) => (
  <div className="d-flex flex-column align-items-center" style={{ fontStyle: 'italic' }}>
    <img src={process.env.PUBLIC_URL + '/images/empty-state.png'} alt="" className="img img-fluid" />
    <h5>Nothing to show</h5>
    <p>It's empty here. We don't have any {entity}</p>
  </div>
);

export default EmptyState;
