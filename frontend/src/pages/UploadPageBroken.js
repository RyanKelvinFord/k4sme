import React from 'react';
import Form from "@rjsf/core";
import 'bootstrap/dist/css/bootstrap.min.css';
import {datasheetSchemaObject} from '../static/datasheet.js';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

// Used to define intended save location type 0: sendToRAMP | 1: handleSaveToPC
var operation = 0;

class UploadFunctionality extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {}
        };
        this.loadFromFile = this.loadFromFile.bind(this);
        this.submitToRAMP = this.submitToRAMP.bind(this);
        this.saveToFile = this.saveToFile.bind(this);
        this.submitToRAMP = this.submitToRAMP.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.sendToRAMP = this.sendToRAMP.bind(this);
    }

    /*
     *  Two options are available to the user:
     *      First upload from local device;
     *          After uploading the user can choose one of the following options:
     *              -save to file
     *              -send to RAMP (R..., A..., M..., P...)
     */

    // Local file upload allowing file types (JPEG, PNG, SVG, JSON, ...)
    loadFromFile = (event) => { // var formData = this.state.formData;
        operation = 2;
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        // here we tell the reader what to do when it's done reading...
        var content = ""
        reader.onload = readerEvent => {
            content = readerEvent.target.result; // this is the content!
            const obj = JSON.parse(content);
            // var form = document.getElementById("ddForm");
            this.setState({formData: obj});
            // formData = obj;
        };
        // reader.onload = function(event) { onReaderLoad(event); }
    }

    // Local upload
    onFormSubmit = (event) => {
        if (operation === 0)
            this.sendToRAMP(event.formData, "datasheet");
         else if (operation === 1)
            this.handleSaveToPC(event.formData, "datasheet");
    }

    // Send to a server
    submitToRAMP = async(event) => {
        var url = process.env.REACT_APP_RAMP_HOST + ":" + process.env.REACT_APP_RAMP_PORT + process.env.REACT_APP_RAMP_ENDPOINT;
        try{
            const url = '/datasheets'
            const response = await fetch(url, {method: 'POST'})
            const response_json = await response.json()
        }catch (e) {
            console.log('e', e)
        }
        var data = JSON.stringify(this.state.formData)
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {}
        };
        xhr.send(data);
        operation = 0;
    }

    // Save to local device
    handleSaveToPC = (event, jsonData, filename) => {
        const fileData = JSON.stringify(jsonData);
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${filename}.json`;
        link.href = url;
        link.click();
    }

    // Internal method that should be called by handleSaveToPC
    saveToFile = (event) => {
        operation = 1;
    }

    // Internal method that should be called by submitToRAMP
    sendToRAMP = (event, jsonData, filename) => {}

    render() {
        return (
            <>
                <div>
                    <NavBar/>
                </div>
                <div className="col-md-offset-3 col-md-6" style={{paddingTop: "5%", paddingBottom: "5%"}}>
                    <Form id="ddForm"
                        formData={
                            this.state.formData
                        }
                        schema={datasheetSchemaObject}
                        sub={
                            this.onFormSubmit}
                    >
                        <div className="form-group">
                            <input type="file" id="myFileInput" className='btn btn-success form-control'
                                onChange={
                                    this.loadFromFile
                                }/>
                        </div>
                        <div className="form-group">
                            <button type="submit"
                                onClick={
                                    this.submitToRAMP
                                }
                                className='btn btn-success form-control'>
                                Submit to RAMP
                            </button>
                        </div>
                        <div className="form-group">
                            <button type="submit"
                                onClick={
                                    this.saveToFile
                                }
                                className="btn btn-success form-control">
                                Save to Files
                            </button>
                        </div>
                    </Form>
            </div>
          <div>
            <Footer/>
        </div>
        </>
        )
    }
}

function UploadScreen() {
    return <UploadFunctionality/>;
}

export default React.memo(UploadScreen);
