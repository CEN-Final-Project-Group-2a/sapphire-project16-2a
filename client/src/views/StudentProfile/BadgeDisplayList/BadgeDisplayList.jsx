import BadgeDisplayItem from "./BadgeDisplayItem/BadgeDisplayItem"
import "./BadgeDisplayList.less"

function BadgeDisplayList({completedChallengeList}) {
    const getBadgeDisplayItems = () => {
        return (completedChallengeList.map((challenge) =>
            <BadgeDisplayItem
                name={challenge.name}
                badge_id={challenge.badge_id}>
            </BadgeDisplayItem>))
    }
    const noBadgesMessage = (
        <div id='text'>
            <p>
                Looks like you have no badges yet. Try completing a challenge to get one!
            </p>
        </div>
    );
    
    return (
        <div id="horizontal-badge-container" className="rounded">
            <h1 id="title">Your Badges</h1>
            <p></p>
            <div className="flex">
                {completedChallengeList == null ?
                    (<div></div>) :
                    (completedChallengeList.length == 0 ?
                        noBadgesMessage :
                        getBadgeDisplayItems())}
            </div>
        </div>
    )
}

export default BadgeDisplayList;