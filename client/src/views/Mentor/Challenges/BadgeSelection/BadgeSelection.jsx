import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Badge0 from "../../../../Images/Badge0.jpg";
import Badge1 from "../../../../Images/Badge1.jpg";

//Function component to select/view badges
function BadgeSelection ({onBadgeSelect})
{
    //Defining propTypes
    BadgeSelection.propTypes = {
        onBadgeSelect: PropTypes.func.isRequired,
    }
    //State variable to keep track of current badge using ID
    const [currentBadgeID, setCurrentBadgeID] = useState(0);
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
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "300px",
        height: "300px",
        borderRadius: "10px",
        backgroundSize: "cover",
        //Set badge image based on the current badge ID
        backgroundImage: `url(${badgeImages[currentBadgeID]})`,

    };

    //Left arrow style to navigate from each badge
    const leftArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(-50%, -50%)",
        left: "20%",
        fontSize: '45px',
        color: "black",
        cursor: "pointer",
        //paddingLeft: "10%",

    }

    //Right arrow style to navigate from each badge
    const rightArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(-50%, -50%)",
        right: "20%",
        fontSize: '45px',
        color: 'black',
        cursor: "pointer",
        //paddingRight: "10%",
    }

    //Function to navigate to previous badge
    const goToPrevious = () => {
        const isFirstBadge = currentBadgeID === 0;
        const newIndex = isFirstBadge ? badgeImages.length - 1 : currentBadgeID - 1;
        setCurrentBadgeID(newIndex);
    }

    //Function to navigate to next badge
    const goToNext = () => {
        const isLastBadge = currentBadgeID === badgeImages.length - 1;
        const newIndex = isLastBadge ? 0 : currentBadgeID + 1;
        setCurrentBadgeID(newIndex);
    }

    //Function to select current badge, and pass to parent component, to use
    const selectBadge = () => {
        onBadgeSelect(currentBadgeID);
    }

    //Fixing sonarcloud bug
    const keyboardListener = (event) => {
        //Left and right arrows
        if (event.key === 'leftArrow')
        {
            goToPrevious();
        }
        else if (event.key === 'rightArrow')
        {
            goToNext();
        }
    }

    //Render the badge selection on page
    //Needed to change the way of displaying arrows, used unicode
    return (
        <div style={sliderStyles}>
            <div style={leftArrowStyles} onClick={goToPrevious} onKeyDown={keyboardListener}>&#9664;</div>
            <div>
                <div style={badgeStyles}></div>
            </div>
            <div style={rightArrowStyles} onClick={goToNext} onKeyDown={keyboardListener}>&#9654;</div>
            <div>
                <button onClick={selectBadge} style={{position: "absolute", top: "100%", right: "25%", transform: "translate(-50%, -50%)"}}>Select the badge</button>
            </div>
        </div>
    )
}

export default BadgeSelection;
