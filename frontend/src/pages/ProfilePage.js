import React, {useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import keycloak from "../Keycloak";
import TextInput from '../components/TextInput.js'
import Spacer from "../components/Spacer";
import Title from "../components/Title";
import Stack from '@mui/material/Stack';
import {useKeycloak} from "@react-keycloak/web";

const ProfilePageFunction = () => {
    const [response, setResponse] = useState([])
    const {keycloak} = useKeycloak();


    useEffect(() => {
        setResponse(keycloak.tokenParsed)
    }, [])


    return (
        <>
            <div>
                <NavBar/>
            </div>
            <div className="border d-flex align-items-center justify-content-center"
                style={
                    {
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }
            }>
                <Title text={"My profile"}/>
                <Spacer/>
                <Spacer/>
                <div sx={{width: 500, alignContent: 'flex-end' , fontSize: '1.5rem' }}>
                <Stack spacing={2} direction="row" style={{width: "100%"}}>
                    <TextInput label={"First name"} readOnly={true} value={response["given_name"]}/>
                    <TextInput label={"Last name"} readOnly={true} value={response["family_name"]}/>
                </Stack>
                <Spacer/>
                <Spacer/>
                <Stack spacing={2} direction="column" style={{width: "100%"}}>
                    <TextInput label={"Preferred username"} readOnly={true} value={response["preferred_username"]}/>
                    <TextInput label={"Email"} readOnly={true} value={response["email"]}/>
                </Stack>
                <Spacer/>

                </div>
               
            </div>
            <div>
                <Footer/>
            </div>
        </>
    )
}

function ProfilePage() {
    return <ProfilePageFunction/>
}

export default React.memo(ProfilePage)