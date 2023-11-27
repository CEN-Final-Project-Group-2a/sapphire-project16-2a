import Badge0 from "../../../../Images/Badge0.jpg"
import Badge1 from "../../../../Images/Badge1.jpg"
import "./BadgeDisplayItem.less"

function BadgeDisplayItem({name, badge_id}) {
    const badge_address = badgeIdToAddress(badge_id);

    return (
        <div id="logos">
            <img src={badge_address} alt="Badge Icon"></img>
            <p>{name}</p>
        </div>
    )
}

// FIXME(ccastillo): Do we want a default image for badge whose picture we can't find?
const badgeIdToAddress = (badge_id) => {
    if (badge_id === "Badge0") {
        return Badge0;
    }
    else if (badge_id === "Badge1") {
        return Badge1;
    }
}

export default BadgeDisplayItem;