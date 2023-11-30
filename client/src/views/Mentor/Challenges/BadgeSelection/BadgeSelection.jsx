//Import stuff
import React, { useEffect, useRef, useState, useReducer } from 'react';
import Badge0 from "../../../../Images/Badge0.jpg";
import Badge1 from "../../../../Images/Badge1.jpg";
//https://pusher.com/blog/getting-started-with-react-router-v4/#application-structure
//https://stackoverflow.com/questions/49728705/adding-new-page-to-reactjs-template

//Image carousel video = https://www.youtube.com/watch?v=SK9AlIbexOE

//http://localhost:3000/challenge-creation

//Function component to select/view badges
function BadgeSelection ({onBadgeSelect})
{
    //State variable to keep track of current badge using ID
    const [currentBadgeID, setBadgeID] = useState(0);
    //Array of badge images - will add more later as I draw them
    const badgeImages = [Badge0, Badge1];

    //Style for the badge carousel
    const sliderStyles = {
        height: "300px",
        position: "relative",
        paddingLeft: "400px",
    }

    //Style to display each badge
    const badgeStyles = {
        width: "300px",
        height: "300px",
        borderRadius: "10px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        //Set badge image based on the current badge ID
        backgroundImage: `url(${badgeImages[currentBadgeID]})`,
        zIndex: 10,

    }

    //Left arrow style to navigate from each badge
    const leftArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(-50%, -50%)",
        left: "16px",
        fontSize: '45px',
        color: "black",
        zIndex: 1000,
        cursor: "pointer",
        paddingLeft: "600px",
    }

    //Right arrow style to navigate from each badge
    const rightArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(-50%, -50%)",
        right: "32px",
        fontSize: '45px',
        color: 'black',
        zIndex: 1000,
        cursor: "pointer",
        paddingRight: "165px",
    }

    //Function to navigate to previous badge
    const goToPrevious = () => {
        const isFirstBadge = currentBadgeID === 0;
        const newIndex = isFirstBadge ? badgeImages.length - 1 : currentBadgeID - 1;
        setBadgeID(newIndex);
    }

    //Function to navigate to next badge
    const goToNext = () => {
        const isLastBadge = currentBadgeID === badgeImages.length - 1;
        const newIndex = isLastBadge ? 0 : currentBadgeID + 1;
        setBadgeID(newIndex);
    }

    //Function to select current badge, and pass to parent component, to use
    const selectBadge = () => {
        //Challenge creation form doesn't want entire image, wants just the badge ID
        //const selectedBadge = badgeImages[currentBadgeID];
        onBadgeSelect(currentBadgeID);
    }

    //Make button appear over other things
    const buttonStyle = {
        zIndex: 2000,
        //marginRight: '10px',
        //marginLeft: '10px',

    }

    //Render the badge selection on page
    //*Needed to change the way of displaying arrows, use unicode
    return (
        <div style={sliderStyles}>
            <div style={leftArrowStyles} onClick={goToPrevious}>&#9664;</div>
            <div>
                <div style={badgeStyles}></div>
            </div>
            <div style={rightArrowStyles} onClick={goToNext}>&#9654;</div>
            <div>
                <button onClick={selectBadge} style={{marginRight: "400px"}}>Select the badge</button>
            </div>
        </div>


    )

}

export default BadgeSelection;

