import { message, Spin, Row, Col, Alert, Menu, Dropdown } from 'antd';
import React, {useEffect, useState} from 'react';
import{useNavigate} from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import {getStudentClassroom} from '../../Utils/requests';
import { getStudent } from '../../Utils/requests';
import './StudentProfile.less';
import {Link} from 'react-router-dom';
import BadgeDisplayList from './BadgeDisplayList/BadgeDisplayList'

function StudentProfile(){

    const navigate = useNavigate();
    const studentName = localStorage.getItem('studentName');
    const [classroom, setClassroom] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await getStudentClassroom();
            setClassroom(res.data.classroom.name);
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
          <div id='sp-header'>
            <Row>
              <Col span={12}>
                <img id="profilepic" src = "/images/PFP.png" alt="pfp"/>
              </Col>
              <Col span={12}>
                <div id="badgeDisplayWidget">
                  <BadgeDisplayList/>
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
