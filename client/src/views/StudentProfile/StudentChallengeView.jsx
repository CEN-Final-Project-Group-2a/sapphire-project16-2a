import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import {getChallengeDetails} from "../../Utils/requests";
import {getStudentClassroom} from '../../Utils/requests';
import {getStudent} from '../../Utils/requests';

//Tutorial for to-do list, kinda helpful - https://strapi.io/blog/how-to-build-a-to-do-list-application-with-strapi-and-react-js
//Fetching data from component? - https://stackoverflow.com/questions/67241144/fetch-data-from-strapi-cms-to-nextreact-js-frontend-doesnt-work


//Component gets the classroom prop from the profile already made
const StudentChallengeView = ({studentName}) => {
    const [challenges, setChallenges] = useState([]);
    const [classroom, setClassroom] = useState(null);
    const [completed, setCompleted] = useState([]);
    //Get student id?
    //const studentId = localStorage.getItem('studentID');

    //Get array of challenges based on classroom, all challenges for student
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getStudentClassroom();

                //Get list of all challenges for student's classroom
                console.log('Student Classroom fetchdata:', res.data.classroom);
                setClassroom(res.data.classroom);

                if (res.data.classroom && res.data.classroom.challenges) {
                    setChallenges([...res.data.classroom.challenges]);
                }

                //Get array of completed challenges based on student id
                const studentId = localStorage.getItem('studentID');
                const studentObject = await getStudent(studentId);

                console.log('ID: ', studentId)

                console.log('Student fetchData:', studentObject.data.student);
                if (studentObject.data.student && studentObject.data.student.challenges) {
                    setCompleted([...studentObject.data.student.challenges]);
                }

            } catch (error) {
                console.error(error);
                message.error('Error fetching data.');
            }
        };

        fetchData();
    }, []);

    /*//Get array of challenges based on student, only challenges student has completed
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getStudentName(studentName);

                console.log('Student fetchdata:', response.data.student);
                setClassroom(response.data.student);

                if (response.data.student && response.data.student.challenges) {
                    setCompleted([...response.data.student.challenges]);
                }

            } catch (error) {
                console.error(error);
                message.error('Error fetching data.');
            }
        };

        fetchData();
    }, []);*/


    console.log('Challenges array:', challenges);
    console.log('Completed Challenges array', completed)


//Scrolling list for array of challenges, use map function
    //If list not showing up, make sure that there are challenges published with the student's classroom in strapi
    return (
        <div>
            <p style={{ color: 'white', fontSize: '20px', paddingLeft: '35px', fontWeight: 'bold'}}></p>
            <p style={{ color: 'white', fontSize: '20px', paddingLeft: '35px', fontWeight: 'bold'}}></p>
            <p style={{ color: 'white', fontSize: '20px', paddingLeft: '35px', fontWeight: 'bold'}}>List of Challenges</p>
            <div style={{overflow: 'auto', maxHeight: '75px'}}>

                {challenges && challenges.map((challenge, index) => (
                    <div key={index} style={{ color: 'white', fontSize: '16px' }}>
                        <p style={{ color: 'white', fontSize: '18px', paddingLeft: '35px'}}>{index + 1}. Name: {challenge.name}</p>
                        <p style={{ color: 'white', fontSize: '18px', paddingLeft: '53px'}}>Description: {challenge.description}</p>
                    </div>

                ))
                }

            </div>

        </div>

    )
}

export default StudentChallengeView;