import React, {useState, useEffect} from "react";
import NavBar from "../../components/NavBar.js"
import SingleButton from "../../components/SingleButton.js";
import Footer from "../../components/Footer";
import {useNavigate} from "react-router-dom";

const SearchFunctionality = () => {
    const navigate = useNavigate()

    const handleNavigation = (path) => {
        navigate(path)
    }

    return (
        <>
            <div>
                <NavBar secure={false}/>
            </div>
            <div
                className="border d-flex align-items-center justify-content-center"
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "50%"
                }}>
                <SingleButton
                    text={"Search datasheets"}
                    path={""}
                    handleClick={() => handleNavigation('/not-secure-search-results')}
                />
            </div>
            <div>
                <Footer/>
            </div>
        </>
    )
}

function SearchPage() {
    return <SearchFunctionality/>
}

export default React.memo(SearchPage)