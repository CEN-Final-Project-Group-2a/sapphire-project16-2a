import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import {getChallengeDetails} from "../../Utils/requests";

//Tutorial for to-do list, kinda helpful - https://strapi.io/blog/how-to-build-a-to-do-list-application-with-strapi-and-react-js
//Fetching data from component? - https://stackoverflow.com/questions/67241144/fetch-data-from-strapi-cms-to-nextreact-js-frontend-doesnt-work


//Component gets the classroom prop from the profile already made
const StudentChallengeView = ({ classroom }) => {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        const fetchChallenges = async () => {
            //Checking if the classroom has challenges
            if (classroom && classroom.challenges && classroom.challenges.length > 0)
            {
                //Getting each challenge's details
                const challengeDetails = await Promise.all(
                    classroom.challenges.map(async (challenge) =>
                    {
                        const response = await getChallengeDetails(challenge.id);
                        return response.json();
                    })
                );

                //Set the challenge details in the state
                setChallenges(challengeDetails);
            }
        };

        // Fetch challenges
        fetchChallenges();
    }, [classroom]);

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