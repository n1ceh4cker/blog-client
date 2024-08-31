import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Media } from 'reactstrap';

function ProfileCard({ profile }) {
  return (
    <Card className="profilecard">
      <Media className="d-flex">
        <Media className="mr-3 pt-2">
          <Media object src={profile.imageUrl} className="img-fluid rounded-circle size" alt="profile-pic" />
        </Media>
        <Media body>
          <Media heading>{profile.username}</Media>
          {profile.bio.substr(0, 35) + ' ... '}
          <Link to={'/profile/' + profile.id}>Read more</Link>
        </Media>
      </Media>
    </Card>
  );
}

export default ProfileCard;
