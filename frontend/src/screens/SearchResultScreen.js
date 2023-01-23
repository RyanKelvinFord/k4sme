import React from "react";
import Title from "../components/Title.js"
import SearchResult from "../components/SearchResult.js"
import NavBar from "../components/NavBar.js"
import Footer from "../components/Footer.js"
import Spacer from "../components/Spacer";


class SearchResultFunction extends React.Component {
    render() {
        return(
            <>  
                <div>
                    <NavBar/>
                </div>
                <div 
                    className="border d-flex align-items-center justify-content-center"
                    style={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)', width: "50%"}}
                >
                    <Title text={"Search results"}/>
                    <Spacer/>
                    <Spacer/>
                    <Spacer/>
                    <SearchResult text={"Text description goes here..."} owned={"OWNED"}/>
                    <Spacer/>
                    <SearchResult text={"Text description goes here..."} owned={"OWNED"}/>
                    <Spacer/>
                    <SearchResult text={"Text description goes here..."} owned={"OWNED"}/>
                    <Spacer/>
                </div>
                <div>
                    <Footer/>
                </div>
            </>
        )
    }
}

function SearchResultScreen() {
    return <SearchResultFunction/>
}

export default React.memo(SearchResultScreen);