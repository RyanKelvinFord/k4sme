import React, {useState, useEffect} from "react";
import axios from "axios";

import Title from "../components/Title.js"
import NavBar from "../components/NavBar.js"
import Footer from "../components/Footer";
import Spacer from "../components/Spacer";
import CircularLoaderComponent from "../components/CircularLoader";
import Paper from "@mui/material/Paper";
import CardComponent from "../components/CardComponent";
import {useLocation, useNavigate} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

const MyDatasheetsFunctionality = () => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([])

    const {keycloak} = useKeycloak();

    const handleNavigation = (clickedItemData) => {
        console.log('clickedItemData ', clickedItemData)
        navigate("/selected-search-result", {state: {'data': clickedItemData}})
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const keycloak_id = keycloak.tokenParsed.sub
                const url = 'http://localhost:5000/datasheets?keycloak_id=' + keycloak_id
                //const url = '/datasheets'
                const response = await fetch(url, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                });
                const response_json = await response.json()
                setResults(response_json['data'])
                setLoading(false)
            } catch (e) {
                console.log('e', e)
            }
        }
        fetchData();
    }, []);

    const handleClick = (clickedItemData) => {
        handleNavigation(clickedItemData)
    }

    return (
        <>
            <div>
                <NavBar/>
            </div>
            <div className="container-fluid" style={{paddingTop: "5%", paddingBottom: "5%", width: "50%"}}>
                {
                    loading ?
                        <>
                            <Title text={"Loading my datasheets"}/>
                            <Spacer/>
                            <CircularLoaderComponent/>
                        </>
                        :
                            <>
                                <Title text={"Results for my datasheets: " + Object.keys(results).length}/>
                                <Spacer/>
                                <Paper style={{maxHeight: 500, maxWidth: 1500, overflow: 'auto'}}>
                                    {
                                        Object.keys(results).map((key, index) => {
                                            return (
                                                <div key={key}>
                                                    <Spacer/>
                                                    <CardComponent
                                                        component_name={results[index]["datasheet"]["information"].component_name}
                                                        description={results[index]["datasheet"]["information"].description}
                                                        provider={results[index]["datasheet"]["information"].provider}
                                                        version={results[index]["datasheet"]["information"].version}
                                                        handleClick={() => handleClick(results[index])}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </Paper>
                            </>
                }

            </div>
            <div>
                <Footer/>
            </div>
        </>
    )
}

function MyDatasheetsPage() {
    return <MyDatasheetsFunctionality/>
}

export default React.memo(MyDatasheetsPage)