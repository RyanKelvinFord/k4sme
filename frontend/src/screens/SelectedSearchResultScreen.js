import React from "react";
import Title from "../components/Title.js"
import SearchSelectedResult from "../components/SelectedSearchResult.js"
import SingleButton from "../components/SingleButton.js";
import NavBar from "../components/NavBar.js"
import Footer from "../components/Footer.js"
import Spacer from "../components/Spacer.js";
class SelectedSearchResultFunctionality extends React.Component {
    render() {
        return (
            <>  
                <div>
                    <NavBar/>
                </div>
                <div 
                    className="border d-flex align-items-center justify-content-center"
                    style={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)', width: "50%"}}
                >
                    <Title text={"Defined search selection"}/>
                    <Spacer/>
                    <Spacer/>
                    <Spacer/>
                    <SearchSelectedResult text={"Text description goes here..."} owned={"OWNED"}/>
                    <Spacer/>
                    <SingleButton text={"Edit"}/>
                    <Spacer/>
                    <SingleButton text={"Delete"}/>   
                    <Spacer/>
                    <SingleButton text={"Print"}/>
                    <Spacer/>
                    <SingleButton text={"Bookmark"}/>   
                    <Spacer/>
                </div>
                <div>
                    <Footer/>
                </div>
            </>
        )
    }
}

function SelectedSearchResultScreen() {
    return <SelectedSearchResultFunctionality/>
}

export default React.memo(SelectedSearchResultScreen)