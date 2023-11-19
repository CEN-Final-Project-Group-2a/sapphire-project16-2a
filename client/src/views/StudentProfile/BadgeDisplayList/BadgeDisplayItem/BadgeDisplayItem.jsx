import UF from "../../../../assets/uf_logo.png"
import Badge1 from "../../../../Images/Badge1.jpg"
import Badge2 from "../../../../Images/Badge2.jpg"
import "./BadgeDisplayItem.less"

function BadgeDisplayItem({name, badge_id}) {
    const badge_address = badgeIdToAddress(badge_id);

    return (
        <div id="logos">
            <img src={badge_address} alt={badge_id}></img>
            <p>{name}</p>
        </div>
    )
}

// FIXME(ccastillo): Do we want a default image for badge whose picture we can't find?
const badgeIdToAddress = (badge_id) => {
    if (badge_id === "Badge1") {
        return Badge1;
    }
    else if (badge_id === "Badge2") {
        return Badge2;
    }
}

export default BadgeDisplayItem;