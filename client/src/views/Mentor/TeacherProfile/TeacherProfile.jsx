import React from "react";
import NavBar from "../../../components/NavBar/NavBar";
import './TeacherProfile.less';

//container for teacher profile, no functionality currently - placeholder div
export default function TeacherProfile(props) {
  return (
    <div className="container nav-padding">
      <NavBar />
      <div>Teacher Profile</div> 
    </div>
  )
}
