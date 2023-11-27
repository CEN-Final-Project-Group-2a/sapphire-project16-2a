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

export default function AwardBadges({savedChallenge}) {
  const [challengeDetails, setChallengeDetails] = useState({
    id: -1,
    name: "",
    description: "",
    activity: null,
  });
  const [studentData, setStudentData] = useState([]);
  const navigate = useNavigate();

  const [form] = Form.useForm();

  /*if(savedChallenge != null){
    setChallengeDetails({
      id: savedChallenge.id,
      name: savedChallenge.name,
      description: savedChallenge.description,
      activity: savedChallenge.activity,
    });
    console.log(challengeDetails);
  }
  else{
    message.error("Challenge data was not loaded from challenge view.")
  }*/

  //You don't need to get the challenge details from the db because they're already fetched from challenge view but why not...
  useEffect(() => {
    // TODO(sapphire2a): currently challenge id is being hardcoded in, but in future it should be parsed from local storage, similar to BlocklyPage.jsx
    const challengeId = savedChallenge.id;
    let updatedStudentData = [];

    // Retrieves the currently logged-in teacher.
    // If successful, moves on to fetch the details of the challenge.
    const fetchMentor = async () => {
      const mentorRes = await getMentor();
      if (mentorRes.data) {
        await fetchChallengeDetails(mentorRes.data.classrooms).catch(console.error);
      } else {
        message.error(mentorRes.err);
        navigate('/teacherlogin');
      }
    }

    // Fetches the details of the challenge.
    // If successful, moves on to fetch the classrooms of the current teacher.
    // After visiting each classroom, saves the data of all the students visited who have been assigned the challenge.
    const fetchChallengeDetails = async (mentorClassrooms) => {
      const challengeRes = await getChallengeDetails(challengeId);
      if (challengeRes.data) {
        setChallengeDetails({id: challengeId, name: challengeRes.data.name, description: challengeRes.data.description, activity: challengeRes.data.activity});
        // Get each classroom the teacher has
        for (const classroom of mentorClassrooms) {
          await fetchClassroomDetails(classroom.id, challengeRes.data.students);
        }
        setStudentData(updatedStudentData);
      } else {
        message.error(challengeRes.err);
      }
    }

    // Fetches a given classroom.
    // If successful, updates an array of data of all the students who have been assigned the challenge.
    const fetchClassroomDetails = async (classroomId, studentsWhoCompletedChallenge) => {
      const classroomRes = await getClassroom(classroomId);
      if (classroomRes.data) {
        // Visit this classroom only if it has been assigned the challenge
        if (classroomRes.data.challenges.some((challenge) => {return challenge.id == challengeId})) {
          classroomRes.data.students.forEach((student) => {
            // If a student has the badge, they are in the list of students associated with the challenge
            // Note that the teacher does not have permissions to view details of the student,
            // so they have to check whether the challenge has the student rather than whether the student has the challenge.
            const hasBadge = studentsWhoCompletedChallenge.some((studentWhoCompletedChallenge) => {return studentWhoCompletedChallenge.id == student.id});
            updatedStudentData.push({
              key: student.id,
              name: student.name,
              // Need the student id within selected so that the toggle that sees the 'selected' attribute can update the selection status of a given student
              selected: {
                id: student.id,
                selected: hasBadge,
                hasBadge: hasBadge,
              },
            });
          });
        }
      } else {
        message.error(classroomRes.err);
      }
    }

    fetchMentor().catch(console.error);
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
      if (student.selected.selected && !student.selected.hasBadge) {
        updatedStudentsCompletedChallenge.push({id: student.selected.id})
        currentStudentData = {...student, selected: {...student.selected, hasBadge: true}};
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

  // TODO(sapphire2a): This should later go to the challenge view page, rather than just the previously viewed page
  const handleBack = () => {
    navigate("/challengeview");
  };

  return (
    <div className='container nav-padding'>
      <NavBar isMentor={true} />
      <div>
        <Row>
          <button
          onClick={handleBack}
          id='link'
          className='flex flex-column'>
            <i id='icon-btn' className='fa fa-arrow-left' />
          </button>
        </Row>
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
}
