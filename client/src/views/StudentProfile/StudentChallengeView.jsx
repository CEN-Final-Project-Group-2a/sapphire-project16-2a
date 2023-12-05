import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import {getStudentClassroom, getStudentCompletedChallenges} from '../../Utils/requests';

//Component gets the classroom prop from the profile already made
const StudentChallengeView = () => {
    //State to store list of all challenges based on classroom
    const [challenges, setChallenges] = useState([]);
    //State to store completed challenges from student
    const [completed, setCompleted] = useState([]);


    //Get array of challenges based on classroom, all challenges for student
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getStudentClassroom();

                //Get list of all challenges for student's classroom in console
                console.log('Student Classroom fetchdata:', res.data.classroom);

                //Check if challenges exist for student, if so
                if (res.data.classroom.challenges) {
                    //Set the challenges state with all challenges for student's classroom
                    setChallenges([...res.data.classroom.challenges]);
                }
                else
                {
                    //Else, throw error no challenges
                    console.log("Error, no challenges in classroom")
                }

                //Print in console array of challenges
                console.log('Challenges array:', res.data.classroom.challenges);

                //Get the student's ID from the local storage
                const studentId = localStorage.getItem('studentID');

                //Fetch the student's completed challenges
                const completedChallengesResponse = await getStudentCompletedChallenges(studentId);
                const completedChallenges = completedChallengesResponse.data;

                //Set the completed challenges state
                setCompleted(completedChallenges);

                //Print to console the completed challenges
                console.log("Completed:", completed);

                //Filter the completed challenges out from the list of all challenges, since student only want to see uncompleted challenges
                let uncompletedChallenges = res.data.classroom.challenges.filter(o1 => !completedChallengesResponse.data.some(o2 => o1.id === o2.id));

                console.log("Non-completed:", uncompletedChallenges);

                //Set the uncompleted challenges state
                setChallenges(uncompletedChallenges);

            } catch (error) {
                //Error message
                console.error(error);
                message.error('Error fetching data.');
            }
        };

        //Call the fetchData
        fetchData();
    }, []);


    //Display scrolling list for array of challenges, use map function
    //If list not showing up, make sure that there are challenges published with the student's classroom in strapi
    return (
        <div>
            <p style={{ color: 'white', fontSize: '20px', paddingLeft: '35px', fontWeight: 'bold'}}></p>
            <p style={{ color: 'white', fontSize: '20px', paddingLeft: '35px', fontWeight: 'bold'}}></p>
            <p style={{ color: 'white', fontSize: '20px', paddingLeft: '0px', fontWeight: 'bold'}}>List of Challenges</p>
            <div style={{overflow: 'auto', maxHeight: '75px'}}>

                {challenges.map((challenge, index) => (
                    <div key={challenge.id} style={{ color: 'white', fontSize: '16px' }}>
                        <p style={{ color: 'white', fontSize: '18px', paddingLeft: '0px'}}>{index + 1}. Name: {challenge.name}</p>
                        <p style={{ color: 'white', fontSize: '18px', paddingLeft: '23px'}}>Description: {challenge.description}</p>
                    </div>

                ))
                }

            </div>

        </div>

    )
}

export default StudentChallengeView;