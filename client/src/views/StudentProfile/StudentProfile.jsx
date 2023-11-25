import {message} from 'antd';
import React, {useEffect, useState} from 'react';
import{useNavigate} from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import {getStudentClassroom} from '../../Utils/requests';
import { getStudent } from '../../Utils/requests';
import './StudentProfile.less';
import {Link} from 'react-router-dom';
import StudentChallengeView from "./StudentChallengeView";

function StudentProfile(){

    const navigate = useNavigate();
    const studentName = localStorage.getItem('studentName');
    const [classroom, setClassroom] = useState(null);
    //To get scrolling list of student challenges
    //const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await getStudentClassroom();
            setClassroom(res.data.classroom.name);
            //console.log(res.data.classroom.name);
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
       
       <div id='sp-header'>
       <img id="profilepic" src = "/images/PFP.png" alt="pfp"/>
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

               <StudentChallengeView studentName={studentName}/>

       </div>
       </div>
       
       </body>
        </html>
    );
}

export default StudentProfile;
