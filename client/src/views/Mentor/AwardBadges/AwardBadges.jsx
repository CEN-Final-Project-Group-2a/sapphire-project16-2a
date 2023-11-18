import React, { useEffect, useState } from 'react';
import {
  getActivityToolbox,
  getActivityToolboxAll,
  getClassroom,
  getChallengeDetails,
  getMentor,
  updateStudentsCompletedChallenge,
} from '../../../Utils/requests';
import './AwardBadges.less';
import NavBar from '../../../components/NavBar/NavBar';
import ListView from './ListView';
import { Col, Row, Form, message } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function AwardBadges() {
  const [challengeDetails, setChallengeDetails] = useState({
    id: -1,
    name: "",
    description: "",
    activity: null,
  });
  const [studentData, setStudentData] = useState([]);
  const navigate = useNavigate();

  const [form] = Form.useForm();

  useEffect(() => {
    // FIXME(sapphire2a): currently challenge id is being hardcoded in, but in future it should be parsed from local storage, similar to BlocklyPage.jsx
    const challengeId = 36;
    let updatedStudentData = [];
    getMentor().then((mentorRes) => {
      if (mentorRes.data) {
        getChallengeDetails(challengeId).then((challengeRes) => {
          if (challengeRes.data) {
            setChallengeDetails({id: challengeId, name: challengeRes.data.name, description: challengeRes.data.description, activity: challengeRes.data.activity});
            mentorRes.data.classrooms.forEach((classroom) => {
              getClassroom(classroom.id).then((classroomRes) => {
                if (classroomRes.data) {
                  if (classroomRes.data.challenges.some((challenge) => {return challenge.id == challengeId})) {
                    classroomRes.data.students.forEach((student) => {
                      // If a student has the badge, they are in the list of students associated with the challenge
                      // Note that the teacher does not have permissions to view details of the student, so they have to check whether the challenge contains the student rather than whether the student has the challenge
                      const hasBadge = challengeRes.data.students.some((studentWhoCompletedChallenge) => {return studentWhoCompletedChallenge.id == student.id});
                      updatedStudentData.push({
                        key: student.id,
                        name: student.name,
                        // Need the student id within selected so that the toggle that sees the 'selected' attribute can update the selection status of a given student
                        selected: {
                          id: student.id,
                          selected: false,
                          hasBadge: hasBadge,
                        },
                      });
                    });
                  }
                } else {
                  message.error(classroomRes.err);
                }
              })
            });
            setStudentData(updatedStudentData);
          } else {
            message.error(challengeRes.err);
          }
        })
      } else {
        message.error(mentorRes.err);
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
  }

  const handleViewActivityTemplate = async () => {
    if (challengeDetails.activity == null) {
      message.error("This challenge does not have an associated activity!")
    } else {
      let activity = challengeDetails.activity;
      const allToolBoxRes = await getActivityToolboxAll();
      const selectedToolBoxRes = await getActivityToolbox(activity.id);
      activity.selectedToolbox = selectedToolBoxRes.data.toolbox;
      activity.toolbox = allToolBoxRes.data.toolbox;

      // 'lesson_module_name' determines what the name of the activity will be in activity view, so it is just set to the name of the challenge
      activity.lesson_module_name = challengeDetails.name;
      localStorage.setItem("my-activity", JSON.stringify(activity));
      navigate("/activity");
    }
  }

  const handleAwardBadgeToStudents = async () => {
    let updatedStudentData = []; // Update the state of the students from the perspective of React
    let updatedStudentsCompletedChallenge = (await getChallengeDetails(challengeDetails.id)).data.students; // Update the students associated with the challenge from the perspective of the database
    studentData.forEach((student) => {
      let currentStudentData = student;
      if (student.selected.selected) {
        updatedStudentsCompletedChallenge.push({id: student.selected.id})
        currentStudentData = {...student, selected: {...student.selected, selected: false, hasBadge: true}};
      }
      updatedStudentData.push(currentStudentData);
    });
    updateStudentsCompletedChallenge(challengeDetails.id, updatedStudentsCompletedChallenge).then((res) => {
      if (res.data) {
        setStudentData(updatedStudentData);
        message.success("Successfully awarded badge to selected students.")
      } else {
        message.error(res.err)
      }
    })
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
                <p>Challenge Title: {challengeDetails.name}<br></br>Challenge Description: {challengeDetails.description}</p>
            </Row>
            <Row>
              <button onClick={handleViewActivityTemplate}>View Challenge Activity Template</button>
            </Row>
            <Row>
              <button onClick={() => handleAwardBadgeToStudents(studentData)}>Award Badge to Selected Students</button>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
f}
