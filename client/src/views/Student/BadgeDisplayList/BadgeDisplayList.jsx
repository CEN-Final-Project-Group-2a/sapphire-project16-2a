import BadgeDisplayItem from "./BadgeDisplayItem/BadgeDisplayItem"
import "./BadgeDisplayList.less"

function BadgeDisplayList() {
    // FIXME(ccastillo): Pull badges from the database rather than having a static list
    const challenges = [
        {
            title: "Title 1",
            badge_id: "Badge1"
        },
        {
            title: "Title 2",
            badge_id: "Badge2"
        },
        
        {
            title: "Title 3",
            badge_id: "Badge2"
        },
        
        {
            title: "Title 4",
            badge_id: "Badge2"
        },
        
        {
            title: "Title 5",
            badge_id: "Badge3"
        },
    ]

    const badgeDisplayItems = challenges.map((challenge) => <BadgeDisplayItem title={challenge.title} badge_id={challenge.badge_id}></BadgeDisplayItem>);
    
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