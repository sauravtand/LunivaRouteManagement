import {
    NavLink
} from "react-router-dom";
import { Card } from "antd"

export const ClickCard = (props) => {
    const { insideContent, goToLink } = props
    return (
        <>
            <NavLink to={`/admin/${goToLink}`}>
                <Card
                    className="buttonRadius text-center"
                    style={{
                        width: 300,
                    }}
                >
                    <h3>{insideContent}</h3>
                </Card>
            </NavLink>
        </>
    )
}