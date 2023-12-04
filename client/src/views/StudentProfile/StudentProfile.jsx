import { message, Row, Col } from 'antd';
import React, {useEffect, useState} from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { getStudentClassroom, getCurrentStudent, getStudentCompletedChallenges } from '../../Utils/requests';
import './StudentProfile.less';
import {Link} from 'react-router-dom';
import StudentChallengeView from "./StudentChallengeView";
import BadgeDisplayList from './BadgeDisplayList/BadgeDisplayList'
import ProfilePicture from './StudentProfilePic';
import default_profile from '../../assets/default.png';

function StudentProfile(){
    const [studentName, setStudentName] = useState(localStorage.getItem("studentName"));
    const [completedChallengeList, setCompletedChallengeList] = useState(null);
    const [classroom, setClassroom] = useState(null);
    const [profilepicture, loadProfile] = useState(default_profile);


    useEffect(() => {
        const fetchCompletedChallengeList = async (studentId) => {
            const completedChallengesRes = await getStudentCompletedChallenges(studentId);
            if (completedChallengesRes.data) {
                setCompletedChallengeList(completedChallengesRes.data);
            } else {
                message.error(completedChallengesRes.err)
            }
        }

        const fetchCurrentStudentData = async () => {
            const currentStudentRes = await getCurrentStudent();
            if (currentStudentRes.data) {
                // Note: There could be multiple students logged in, so for now the code just gets one of them.
                // In future, it could be helpful to have a menu to select which student's profile the logged-in students want to view.
                setStudentName(currentStudentRes.data.students[0].name);
                if(currentStudentRes.data.students[0].profile_picture != null){
                  loadProfile(currentStudentRes.data.students[0].profile_picture);
                }
                console.log(currentStudentRes.data.students[0].id);
                fetchCompletedChallengeList(studentId);
            } else {
                message.error(currentStudentRes.err);
            }
        }

        const fetchStudentClassroomData = async () => {
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

        fetchCurrentStudentData();
        fetchStudentClassroomData();
    }, []);


    return(
        <html>
        <body id='pbody'>
        <div profile='profile'>
            <NavBar />
            <div id='sp-header'>
                <Row>
                    <Col span={12}>
                        <div className = "profilepicture">
                            <img className="profile_picture_styling" src={profilepicture}  alt="Profile"/>
                            <ProfilePicture />
                        </div>
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
                            <StudentChallengeView/>
                        </div>
                    </Col>
                    <Col flex='auto'>
                        <div id= 'classroomShower' style={{paddingLeft: '50px'}}>
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
