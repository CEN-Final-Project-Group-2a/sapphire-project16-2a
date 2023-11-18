import React, { useEffect, useState } from 'react';
import {
  getClassroom,
  getClassrooms,
  getMentor,
} from '../../../Utils/requests';
import './AwardBadges.less';
import NavBar from '../../../components/NavBar/NavBar';
import ListView from './ListView';
import { Col, Row, Form, message } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function AwardBadges({ challengeId }) {
  const [studentData, setStudentData] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const navigate = useNavigate();

  const [form] = Form.useForm();

  // FIXME(ccastillo): Later retrieve the student profile picture
  // FIXME(ccastillo): Later make it so only classrooms to which the challenge is assigned are retrieved
  useEffect(() => {
    let updatedStudentData = [];
    let classroomIds = [];
    getMentor().then((res) => {
      if (res.data) {
        res.data.classrooms.forEach((classroom) => {
          classroomIds.push(classroom.id);
          getClassroom(classroom.id).then((res) => {
            if (res.data) {
              res.data.students.forEach((student) => {
                updatedStudentData.push({
                key: student.id,
                name: student.name,
                // FIXME(ccastillo): Later retrieve whether a student has previously received the badge
                // Need the student id within selected so that the toggle that sees the 'selected' attribute can update the selection status of a given student
                selected: {
                  id: student.id,
                  selected: false,
                  hasBadge: false,
                },
              });
            });
            } else {
              message.error(res.err);
            }
          });
        });
        setStudentData(updatedStudentData);
        getClassrooms(classroomIds).then((classrooms) => {
          setClassrooms(classrooms);
        });
      } else {
        message.error(res.err);
        navigate('/teacherlogin');
      }
    });
  }, []);

  const onSelectToggle = (id, toggled) => {
    const index = studentData.findIndex(function (student) {
          return student.key === id;
        });
    let updatedStudentData = [...studentData];
    updatedStudentData[index] = {...studentData[index], selected: {...studentData[index].selected, selected: toggled}};

    setStudentData(updatedStudentData);
    message.success(
      `Successfully ${toggled ? "selected" : "deselected"} ${studentData[index].name}`
    );
  }

  const viewChallengeActivityTemplate = async () => {
    message.error("Sorry, this feature is not yet implemented.");
    }

  const awardBadgeToStudents = async (studentData) => {
    message.error("Awarding the badge for a student not yet implemented!");
    studentData.forEach((student) => {
      if (student.selected.selected) {
        // FIXME(ccastillo): Later get rid of this logging statement
        console.log(`Failed to give badge to ${student.name}`)
      }
    });
    }

  // FIXME(ccastillo): This should go to the challenge view page
  const handleBack = () => {
    navigate('');
  };

  // FIXME(ccastillo): Figure out why the back button isn't showing up
  return (
    <div className='container nav-padding'>
      <NavBar isMentor={true} />
      <div>
        <button id='home-back-btn' onClick={handleBack}>
          <i className='fa fa-arrow-left' aria-hidden='true' />
        </button>
        <Row>
          <Col flex='auto'>
            <ListView
              studentData={studentData}
              onSelectToggle={onSelectToggle}
              form={form}
            />
          </Col>
          <Col flex='auto' id='button-style'>
            <Row id='challenge-details-container'>
                <p>Challenge Title: <br></br>Challenge Description:</p>
            </Row>
            <Row>
              <button onClick={viewChallengeActivityTemplate}>View Challenge Activity Template</button>
            </Row>
            <Row>
              <button onClick={() => awardBadgeToStudents(studentData)}>Award Badge to Selected Students</button>
            </Row>
              
          </Col>
        </Row>
        
      </div>
    </div>
  );
f}
