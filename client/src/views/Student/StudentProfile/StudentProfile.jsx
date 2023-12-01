import {message} from 'antd';
import React, {useEffect, useState} from 'react';
import NavBar from "../../../components/NavBar/NavBar";
import './StudentProfile.less';
import {getStudentClassroom, getCurrentStudent} from '../../../Utils/requests';
import {Link} from 'react-router-dom';
import Profile from './StudentProfilePic';
import default_profile from '../../../assets/default.png';

function StudentProfile(){

    const studentName = localStorage.getItem('studentName');
    const [classroom, setClassroom] = useState(null);
    const [profilepicture, loadProfile] = useState(default_profile);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await getStudentClassroom();
            const currentStudent = await getCurrentStudent();
            setClassroom(res.data.classroom.name);
            loadProfile(currentStudent.data.students[0].profile_picture);
            console.log(res.data.classroom.name);
            if (res.data) {
              if (res.data.name) {
                setLessonModule(res.data.lesson_module);
              }
            } else {
              message.error(res.err);
            }
          } catch {}
        };
        fetchData();
      }, []);

    return(
        <html>
        <body id='pbody'>

       
       <div profile='profile'>
        <NavBar />  
        
        <div className = "student_styling">
        <img className="profile_picture_styling" src={profilepicture}  alt="Profile"/>
        <div className="update">
        <Profile />

        </div>

        
      </div>
       
       <div id='sp-header'>
       <div id= 'studentprofile-name'>{studentName}'s Profile</div>


       <div id= 'classroomShower'>
        Current Course:
       </div>

       
       <Link to="/Student">
        <div id = 'classroom'>
        {classroom}
        </div>
        </Link>

        <div id= 'badgeHeader'>
        Achievements:
        {'\n'}
        Badge0
        {'\n'}
        Badge1
        {'\n'}
        Badge2
        
        </div>

        

       </div>
       </div>
       
       </body>
        </html>
    );
}

export default StudentProfile;