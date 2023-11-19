//Import stuff
import React, { useEffect, useRef, useState, useReducer } from 'react';
//import Challenges from './Challenges'
//Use getstudentclassroom function in order to get what classroom student is in
import { getStudentClassroom } from '../../Utils/requests';

//Tutorial for to-do list, kinda helpful - https://strapi.io/blog/how-to-build-a-to-do-list-application-with-strapi-and-react-js
//Fetching data from component? - https://stackoverflow.com/questions/67241144/fetch-data-from-strapi-cms-to-nextreact-js-frontend-doesnt-work


//Function component for student to view list of challenges. Get prop of array of challenges
function StudentChallengeView ({challenges})
{
    const [challenges, setChallenges] = useState([]);
    const [studentClassroom, setStudentClassroom] = useState(null);

    React.useEffect(() =>
    {
        const getChallenges = async() =>
        {

            const response = await fetch('http://localhost:1337/challenges?classroom=${studentClassroom}', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
            });

            const challengeArray = await response.json();

            setChallenges(challengeArray);

        }

        getChallenges();

    }, [studentClassroom]);

    //Getting the student's classroom using the function
    useEffect( ()=> {
        const getClassroom = async() => {

            const response = await getStudentClassroom();

            if (response.data) {

                setStudentClassroom(response.data);

            }
        };

        getClassroom();

        }, []);
    
    //Scrolling list for array of challenges, use map function
    return (
        <div style={{overflow: 'auto', maxHeight: '300px'}}>
            {challenges && challenges.map((challenge, index) => (
                <div key={index}>
                    <p>Challenge ID: {challenge.id}</p>
                    <p>Challenge Activity: {challenge.activity}</p>

                </div>

            ))
            }

        </div>
    )
}

export default StudentChallengeView;
