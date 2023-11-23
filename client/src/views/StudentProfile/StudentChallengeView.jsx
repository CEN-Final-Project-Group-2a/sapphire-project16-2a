import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import {getChallengeDetails} from "../../Utils/requests";
import {getStudentClassroom} from '../../Utils/requests';

//Tutorial for to-do list, kinda helpful - https://strapi.io/blog/how-to-build-a-to-do-list-application-with-strapi-and-react-js
//Fetching data from component? - https://stackoverflow.com/questions/67241144/fetch-data-from-strapi-cms-to-nextreact-js-frontend-doesnt-work


//Component gets the classroom prop from the profile already made
const StudentChallengeView = () => {
    const [challenges, setChallenges] = useState([]);
    const [classroom, setClassroom] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getStudentClassroom();

                console.log('Student Classroom fetchdata:', res.data.classroom);

                setClassroom(res.data.classroom);

                if (res.data.classroom && res.data.classroom.challenges) {
                    setChallenges([...res.data.classroom.challenges]);
                }

            } catch (error) {
                console.error(error);
                message.error('Error fetching data.');
            }
        };

        fetchData();
    }, []);


    console.log('Challenges array:', challenges);

    /*useEffect(() => {
        const fetchChallenges = async () => {
            if (classroom && classroom.challenges && classroom.challenges.length > 0) {
                const challengeDetails = await Promise.all(
                    classroom.challenges.map(async (challenge) => {
                        const response = await getChallengeDetails(challenge.id);
                        return response.json();
                    })
                );

                console.log('Challenge Details Array:', challengeDetails);
                setChallenges(challengeDetails);
            }
        };

        fetchChallenges();
    }, [classroom]);*/

    //List for array of challenges, use map function
    /*return (

        <div>
            {challenges.map((challenge, index) => (
                <div key={index}>
                    {console.log('returning: ', challenge.id)}
                    <p>Challenge ID: {challenge.id}</p>
                    <p>Challenge Activity: {challenge.activity}</p>
                </div>
            ))}
        </div>
    );


};



export default StudentChallengeView;*/

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