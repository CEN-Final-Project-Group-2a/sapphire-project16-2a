import { message, Row, Col } from 'antd';
import React, {useEffect, useState} from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { getStudentClassroom, getCurrentStudent, getStudentCompletedChallenges } from '../../Utils/requests';
import './StudentProfile.less';
import {Link} from 'react-router-dom';
import BadgeDisplayList from './BadgeDisplayList/BadgeDisplayList'

function StudentProfile(){
  const studentName = localStorage.getItem('studentName');
  const [completedChallengeList, setCompletedChallengeList] = useState([]);
  const [classroom, setClassroom] = useState(null);

  useEffect(() => {
    getCurrentStudent().then((res) => {
      if (res.data) {
        // Note: There could be multiple students logged in, so for now the code just gets one of them.
        // In future, it could be helpful to have a menu to select which student's profile the logged-in students want to view.
        const studentId = res.data.students[0].id;
        getStudentCompletedChallenges(studentId).then((res) => {
          if (res.data) {
            setCompletedChallengeList(res.data);
          } else {
            message.error(res.err)
          }
        })
      } else {
        message.error(res.err);
      }
    })

    const fetchData = async () => {
      try {
        const res = await getStudentClassroom();
        setClassroom(res.data.classroom.name);
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
            <Row>
              <Col span={12}>
                <img id="profilepic" src = "/images/PFP.png" alt="pfp"/>
              </Col>
              <Col span={12}>
                <div id="badgeDisplayWidget">
                  <BadgeDisplayList completedChallengeList={completedChallengeList}/>
                </div>
              </Col>
            </Row>
            <Row>
              <div id= 'studentprofile-name'>{studentName}'s Profile</div>
            </Row>
            <Row>
              <Col flex='auto'>
                <div id= 'assignedChallengeHeader'>
                  Assigned Challenges:
                  {'\n'}
                  Challenge0
                  {'\n'}
                  Challenge1
                  {'\n'}
                  Challenge2
                </div>
              </Col>
              <Col flex='auto'>
                <div id= 'classroomShower'>
                  Current Course:
                  <Link to="/Student">
                    <div id = 'classroom'>
                      {classroom}
                    </div>
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </body>
    </html>
  );
}

export default StudentProfile;
