import React from 'react';
import UpdateProfile from '../UpdateProfile/UpdateProfile';

  const ProfilePic = () => {


  return (
    <div>
      <input type="file" id="imageInput" title=" " accept="image/*" />
      <UpdateProfile isTeacher={0}/>
    </div>
  );
  };


export default ProfilePic;
