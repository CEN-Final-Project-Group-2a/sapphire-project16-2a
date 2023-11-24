import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import StudentList from "./StudentList";
import './TeacherProfile.less';
import { Menu, Dropdown } from 'antd';

//container for teacher profile, no functionality currently - placeholder div
export default function TeacherProfile(props) {

  return (
    <div className="container nav-padding">
      <NavBar />
      <div id='profile-container'>
        <div id='teacher-details'>Teacher Profile</div> 
        <StudentList/>
      </div>
    </div>
  )
}
