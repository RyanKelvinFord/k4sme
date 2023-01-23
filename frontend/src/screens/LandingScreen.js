import React from "react";

class LandingFunctionality extends React.Component {
    render () {
        return (
            <div>
                <p>Landing page</p>
            </div>
        )
    }
}

function LandingScreen() {
    return <LandingFunctionality/>
}

export default React.memo(LandingScreen)