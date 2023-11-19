import BadgeDisplayItem from "./BadgeDisplayItem/BadgeDisplayItem"
import "./BadgeDisplayList.less"

function BadgeDisplayList() {
    // FIXME(ccastillo): Pull badges from the database rather than having a static list
    const challenges = [
        {
            name: "Title 1",
            badge_id: "Badge1"
        },
        {
            name: "Title 2",
            badge_id: "Badge2"
        },
        
        {
            name: "Title 3",
            badge_id: "Badge2"
        },
        
        {
            name: "Title 4",
            badge_id: "Badge2"
        },
        
        {
            name: "Title 5",
            badge_id: "Badge3"
        },
    ]

    const badgeDisplayItems = challenges.map((challenge) => <BadgeDisplayItem name={challenge.name} badge_id={challenge.badge_id}></BadgeDisplayItem>);
    
    return (
        <div id="horizontal-badge-container" className="rounded">
            <h1 id="title">Your Badges</h1>
            <p></p>
            <div className="flex">
                {badgeDisplayItems}
            </div>
        </div>
    )
}

export default BadgeDisplayList;