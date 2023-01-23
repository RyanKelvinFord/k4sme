import React from "react";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./Keycloak";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import PrivateRoute from "./helpers/PrivateRoute";

import SearchPage from "./pages/SearchPage";
import SearchResultsPage from "./pages/SearchResultsPage"
import SearchResultSelectedPage from "./pages/SearchResultSelected"
import MyDatasheetsPage from "./pages/MyDatasheetsPage";
import CreateDataSheet from "./pages/CreateDatasheetPage";
import MyProfile from "./pages/ProfilePage";

import NotSecureSearchPage from "./pages/notSecure/NotSecureSearchPage";
import NotSecureSearchResultPage from "./pages/notSecure/NotSecureSearchResultsPage";
import NotSecureSearchResultSelectedPage from "./pages/notSecure/NotSecureSearchResultSelected";

function App() {
    return (
        <div>
            <ReactKeycloakProvider
                initOptions={{
                  onLoad: "login-required",
                  checkLoginIframe: false,
                }}
                authClient={keycloak}>
                <React.StrictMode>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="*"
                                element={
                                    <PrivateRoute>
                                        <SearchPage/>
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/search"
                                element={
                                    <PrivateRoute>
                                        <SearchPage/>
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/search-results"
                                element={
                                    <PrivateRoute>
                                        <SearchResultsPage/>
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/my-datasheets"
                                element={
                                    <PrivateRoute>
                                        <MyDatasheetsPage/>
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/create-datasheet"
                                element={
                                    <PrivateRoute>
                                        <CreateDataSheet/>
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/my-profile"
                                element={
                                    <PrivateRoute>
                                        <MyProfile/>
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/selected-search-result"
                                element={
                                    <PrivateRoute>
                                        <SearchResultSelectedPage/>
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                </React.StrictMode>
            </ReactKeycloakProvider>
            
    
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/not-secure-search"
                        element={
                            <NotSecureSearchPage/>
                        }
                    />
                    <Route
                        path="/not-secure-search-results"
                        element={
                            <NotSecureSearchResultPage/>
                        }
                    />
                    <Route
                        path="/not-secure-selected-search-result"
                        element={
                            <NotSecureSearchResultSelectedPage/>
                        }
                    />
                </Routes> 
            </BrowserRouter>
        </div>
    );
}

export default App;