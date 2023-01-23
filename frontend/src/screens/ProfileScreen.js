import React from "react";
import Title from "../components/Title.js"
import NavBar from "../components/NavBar.js"
import Footer from "../components/Footer";
import TextInput from '../components/TextInput.js'
import SingleButton from '../components/SingleButton.js'
import Spacer from "../components/Spacer";

class ProfileFunction extends React.Component {
    render() { 
        return (
            <>
                <div  
                    className="border d-flex align-items-center justify-content-center"
                    style={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)', width: "50%"}}>
                        <Title text={"Your profile!"}/>
                        <Spacer/>
                        <Spacer/>
                        <Spacer/>
                        <TextInput text={"Username"}/>
                        <Spacer/>
                        <TextInput text={"Email"}/>
                        <Spacer/>
                        <TextInput text={"Password"}/>
                        <Spacer/>
                        <SingleButton text={"Update information"}/>
                        <Spacer/>
                        <SingleButton text={"Import datasheet"}/>
                        <Spacer/>
                        <SingleButton text={"Create datasheet"}/>
                        <Spacer/>
                        <SingleButton text={"Remove account"}/>
                </div>
                <NavBar/>
               
                <Footer/>
            </>
        )
    }
}

function ProfileScreen() {
    return <ProfileFunction/>
}

export default React.memo(ProfileScreen);