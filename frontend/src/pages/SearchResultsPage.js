import React, {useState, useEffect} from "react";
import Title from "../components/Title.js"
import NavBar from "../components/NavBar.js"
import CardComponent from "../components/CardComponent.js"
import {useLocation, useNavigate} from "react-router-dom";
import Footer from "../components/Footer";
import Spacer from "../components/Spacer"
import Paper from '@mui/material/Paper';
import CircularLoaderComponent from "../components/CircularLoader";
import TextInputComponent from "../components/TextInput.js";

const SearchResultsPageFunctionality = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [results, setResults] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([])
    const [filter, setFilter] = useState("")
    
    const handleNavigation = (clickedItemData) => {
        navigate("/selected-search-result", {state: {'data': clickedItemData}})
    }

    const handleClick = (clickedItemData) => {
        handleNavigation(clickedItemData)
    }


    useEffect(() => {
        const performSearch = async () => {
            setLoading(true);
            try {
                const url = 'http://localhost:5000/datasheets'
                //const url = '/datasheets'
                const response = await fetch(url, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {'Content-Type': 'application/json',},
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                });
                const response_json = await response.json()
                setResults(response_json['data'])
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
            setLoading(false);
        }
        performSearch()
    }, [])

   useEffect(() => {
    console.log("filter" , filter)
    const searchBy = "component_name"
    const matchingRestuls = Object.keys(results).find(item => 
        results[item]["datasheet"]["information"][searchBy].includes(filter) 
    )
    console.log("matchingRestuls ", results[matchingRestuls])
   }, [filter])

    return (
        <>
            <div>
                <NavBar/>
            </div>
            <div className="container-fluid" style={{paddingTop: "5%", paddingBottom: "5%", width: "50%"}}>
                <Spacer/>
                {
                    loading ?
                        <>
                            <Title text={"Loading datasheets"}/>
                            <Spacer/>
                            <CircularLoaderComponent/>
                        </>
                        :
                        <>
                            <Title text={"Browse all datasheets: " + "(" + Object.keys(results).length + ")"}/>
                            <TextInputComponent 
                                label={"Filter search results"} 
                                handleChange={e => setFilter(e.target.value)}
                            />
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
                <Spacer/>
            </div>
            <div>
                <Footer/>
            </div>
        </>
    )
}

function SearchResultsPage() {
    return <SearchResultsPageFunctionality/>
}

export default React.memo(SearchResultsPage)