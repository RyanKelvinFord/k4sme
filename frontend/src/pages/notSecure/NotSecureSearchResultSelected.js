import React, {memo, useEffect, useState} from "react";
import applyRules from 'rjsf-conditionals';
import Engine from 'json-rules-engine-simplified';
import Form from '@rjsf/core';
import schemaReadOnly from '.././form/schemaReadOnly.json';
import uiSchemaReadOnly from '.././form/uiSchemaReadOnly.json';
import rules from '.././form/rules.json';
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import keycloak from "../../Keycloak";
import {useLocation, useNavigate} from "react-router-dom";
import Spacer from "../../components/Spacer";
import Stack from "@mui/material/Stack";
import SingleButton from "../../components/SingleButton";
import {useKeycloak} from "@react-keycloak/web";
import Title from "../../components/Title";


const extraActions = {
    log: (params, schema, uiSchema, formData) => {
        //console.log(params, schema, uiSchema, formData);
        //console.log(formData['information']);
    },
}

const FormWithConditionals = applyRules(
    schemaReadOnly,
    uiSchemaReadOnly,
    rules,
    Engine,
    extraActions,
)(Form);

const UploadFunctionality = () => {
    const location = useLocation();
    const [data, setData] = useState(location?.state?.data ? location.state.data : null)

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

    return (
        <>
            <div>
                <NavBar secure={false}/>
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
                            </>
                        </Stack>
                        <Spacer/>
                        <FormWithConditionals showErrorList={true} formData={data['datasheet']}>
                            <button type={"submit"} hidden={true}/>
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
