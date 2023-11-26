import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import {getChallengeDetails} from "../../Utils/requests";
import {getStudentClassroom} from '../../Utils/requests';
import {getStudentCompletedChallenges} from '../../Utils/requests';

//Tutorial for to-do list, kinda helpful - https://strapi.io/blog/how-to-build-a-to-do-list-application-with-strapi-and-react-js
//Fetching data from component? - https://stackoverflow.com/questions/67241144/fetch-data-from-strapi-cms-to-nextreact-js-frontend-doesnt-work


//Component gets the classroom prop from the profile already made
const StudentChallengeView = () => {
    const [challenges, setChallenges] = useState([]);
    const [classroom, setClassroom] = useState(null);
    const [completed, setCompleted] = useState([]);


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

                const studentId = localStorage.getItem('studentID');
                //const studentObject = await getStudent(studentId);

                console.log("step");

                //console.log(Array.isArray(challenges.students));

                const completedChallengesResponse = await getStudentCompletedChallenges(studentId);
                //console.log("1");
                const completedChallenges = completedChallengesResponse.data;
                //console.log("2");

                // Set the completed challenges state
                setCompleted(completedChallenges);
                //console.log("3");

                // Filter out completed challenges from the list of all challenges
                /*const uncompletedChallenges = challenges.filter(challenge =>
                    !completedChallenges.some(completedChallenge => completedChallenge.id === challenge.id)
                );*/

                // Set the uncompleted challenges state
                //setChallenges(uncompletedChallenges);

            } catch (error) {
                console.error(error);
                message.error('Error fetching data.');
            }
        };

        fetchData();
    }, []);


    console.log('Challenges array:', challenges);


//Scrolling list for array of challenges, use map function
    //If list not showing up, make sure that there are challenges published with the student's classroom in strapi
    return (
        <div>
            <p style={{ color: 'white', fontSize: '20px', paddingLeft: '35px', fontWeight: 'bold'}}></p>
            <p style={{ color: 'white', fontSize: '20px', paddingLeft: '35px', fontWeight: 'bold'}}></p>
            <p style={{ color: 'white', fontSize: '20px', paddingLeft: '35px', fontWeight: 'bold'}}>List of Challenges</p>
            <div style={{overflow: 'auto', maxHeight: '75px'}}>

                {challenges.map((challenge, index) => (
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