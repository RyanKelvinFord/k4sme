import React, {memo, useEffect, useState} from "react";
import applyRules from 'rjsf-conditionals';
import Engine from 'json-rules-engine-simplified';
import Form from '@rjsf/core';
import schemaReadOnly from './form/schemaReadOnly.json';
import uiSchemaReadOnly from './form/uiSchemaReadOnly.json';
import schema from './form/schema.json';
import uiSchema from './form/schema.json';
import rules from './form/rules.json';
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import keycloak from "../Keycloak";
import {useLocation, useNavigate} from "react-router-dom";
import Spacer from "../components/Spacer";
import Stack from "@mui/material/Stack";
import SingleButton from "../components/SingleButton";
import {useKeycloak} from "@react-keycloak/web";
import Title from "../components/Title";




const extraActions = {
    log: (params, schema, uiSchema, formData) => {
        //console.log(params, schema, uiSchema, formData);
        //console.log(formData['information']);
    },
}



const UploadFunctionality = () => {
    const location = useLocation();
    const [data, setData] = useState(location?.state?.data ? location.state.data : null)
    const {keycloak} = useKeycloak();
    const keycloak_id = keycloak.tokenParsed.sub
    const [digitalDatasheetOwner, setDigigtalDatasheetOwner] = useState(data?.keycloak_id ? keycloak_id == data['keycloak_id'] : false)

    const FormWithConditionals = applyRules(
        digitalDatasheetOwner ? schema: schemaReadOnly,
        digitalDatasheetOwner ? uiSchema: uiSchemaReadOnly,
        rules,
        Engine,
        extraActions,
    )(Form);

    const exportData = async () => {
        console.log(data['datasheet']['information']['component_name'])
        const element = document.createElement("a");
        const dataForFile = new Blob([JSON.stringify(data)], {type: 'text/plain'}); //pass data from localStorage API to blob
        element.href = URL.createObjectURL(dataForFile);
        const fileName = (data['datasheet']['information']['component_name']).replace(" ", "-")
        element.download = 'datasheet-' + fileName + '.json';
        document.body.appendChild(element);
        element.click();
    };

    const onSubmit = async ({formData}) => {
        try {
            const response_keycloak = await keycloak.loadUserInfo();
            formData['keycloak_id'] = response_keycloak.sub;
            formData['datasheet_id'] = data.id;
            const url = 'http://localhost:5000/datasheets'
            //const url = '/datasheets'
            const response = await fetch(url, {
                method: 'PUT', mode: 'cors', cache: 'no-cache', credentials: 'same-origin', headers: {
                    'Content-Type': 'application/json'
                }, redirect: 'follow', referrerPolicy: 'no-referrer', body: JSON.stringify(formData)
            });
            if (response.status === 200) {
                alert("Success: Datasheet was updated successfully.")
            } else {
                alert("Error: Datasheet was not updated successfully.")
            }
        } catch (err) {
            alert("Error: Unknown error has occurred!")
        }
    }

    return (
        <>
            <div>
                <NavBar/>
            </div>

            <div className="container-fluid" style={{paddingTop: "5%", paddingBottom: "5%", width: "50%"}}>
                {data ?
                    <>
                        <Stack spacing={1} direction="column">
                            <>
                                <SingleButton
                                    text={"Download datasheet"}
                                    path={""}
                                    handleClick={() => exportData()}
                                />
                                <Spacer/>
                                {
                                    digitalDatasheetOwner ? 
                                        <Title text={"You are the owner of this datasheet!"}/> : 
                                        null
                                }
                            </>
                        </Stack>
                        <Spacer/>
                        <FormWithConditionals showErrorList={true} onSubmit={onSubmit} formData={data['datasheet']}>
                                
                            </FormWithConditionals>
                       
                    </>
                    : <Title text={"Error loading datasheet."}/>
                }
            </div>
            <div>
                <Footer/>
            </div>

        </>
    );
};

function UploadPage() {
    return <UploadFunctionality/>;
}

export default React.memo(UploadPage);
