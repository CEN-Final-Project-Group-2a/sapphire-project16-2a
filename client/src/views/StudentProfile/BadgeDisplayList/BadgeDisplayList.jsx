import PropTypes from 'prop-types';
import BadgeDisplayItem from "./BadgeDisplayItem/BadgeDisplayItem"
import "./BadgeDisplayList.less"

function BadgeDisplayList({completedChallengeList}) {
    BadgeDisplayList.propTypes = {
        completedChallengeList: PropTypes.array.isRequired,
    }
    const getBadgeDisplayItems = () => {
        if (completedChallengeList.length == 0) {
            return (
                <div id='text'>
                <p>
                    Looks like you have no badges yet. Try completing a challenge to get one!
                </p>
            </div>)
        }
        return (completedChallengeList.map((challenge) =>
            <BadgeDisplayItem
                name={challenge.name}
                badge_id={challenge.badge_id}
                key={challenge.id}>
            </BadgeDisplayItem>))
    }
    
    return (
        <div id="horizontal-badge-container" className="rounded">
            <h1 id="title">Your Badges</h1>
            <p></p>
            <div className="flex">
                {completedChallengeList == null ?
                    (<div></div>) :
                    (getBadgeDisplayItems())}
            </div>
        </div>
    )
}

export default BadgeDisplayList;