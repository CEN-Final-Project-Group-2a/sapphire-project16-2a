import React, {useEffect, useState} from 'react';
import NavBar from "../../../components/NavBar/NavBar";
import StudentList from "./StudentList";
import './TeacherProfile.less';
import default_profile from '../../../assets/default.png';
import { getMentor } from '../../../Utils/requests';
import ProfilePicture from './TeacherProfilePic';

export default function TeacherProfile() {
  const [profilepicture, loadProfile] = useState(default_profile);
  const [name, setName] = useState("");

useEffect(() => {
  const fetchData = async () => {
    try {
      const teacher_profile = await getMentor();
      if(teacher_profile.data.profile_picture != null){
        loadProfile(teacher_profile.data.profile_picture);
      }
      if(teacher_profile.data.first_name != null){
        setName(teacher_profile.data.first_name + " " + teacher_profile.data.last_name)
        
      }
     } catch {}
  };
  fetchData();
}, []);


  return (
    <div className="container nav-padding">
      <NavBar />
      <div id='profile-container'>
        <div id='pic-container'>
          <div className = "teacher_styling" >
            <img className="profile_picture_styling" src={profilepicture} alt="Profile" />
          </div> 
          <div id="teacher-name">{name}</div>
          <div className="update">
            <ProfilePicture />
          </div>
          
      </div> 
      <StudentList/>
      </div>
    </div>
  )
}
