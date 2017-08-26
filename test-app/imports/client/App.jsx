import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Dropzone from 'react-dropzone'
import WebCam from './WebCam'

var Loader = require('react-loader');


const style = {
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'dashed',
    height: 150,
    transition: 'all 0.5s'
};

const activeStyle = {
    borderStyle: 'solid',
    borderColor: '#4FC47F'
};

const rejectStyle = {
    borderStyle: 'solid',
    borderColor: '#DD3A0A'
};


class App extends Component {


    //form submit. Images to Gif
    handleSubmit(event) {
        event.preventDefault();
        var self = this;
        if (this.state.files.length < 3) {
            this.setState({
                showAlert: true
            });
            return;
        }
        this.setState({
            files: [],
            images: [],
            interval: .2,
            showAlert: false,
            isloading: true
        });
        Meteor.makeGifFromImages(this.state, function (result) {
            var $gif = document.getElementById('gif');
            var $download = document.createElement('a');
            var $gifImg = document.createElement('img');
            var newDiv = document.createElement('div');
            newDiv.className = 'col-md-4';
            $download.href = result;
            $download.className = 'row';
            $download.innerText = 'Download';
            $download.download = `gifbydinesh.gif`;
            $gifImg.src = result;
            $gifImg.className = 'row';
            newDiv.appendChild($download)
            newDiv.appendChild($gifImg)
            $gif.appendChild(newDiv);
            self.setLoadingoff();
        })
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            files: [],
            images: [],
            interval: .2,
            isloading: false
        };
        this.handleIntervalChange = this.handleIntervalChange.bind(this);
        this.handleWebToGifConversion = this.handleWebToGifConversion.bind(this);
    }


    //Webcam to gif
    handleWebToGifConversion(data) {
        this.setState({
            isloading: true
        });
        var self = this;
        Meteor.makeGifFromWebCam(data, function (result) {
            var $gif = document.getElementById('gif');
            var $download = document.createElement('a');
            var $gifImg = document.createElement('img');
            var newDiv = document.createElement('div');
            newDiv.className = 'col-md-4';
            $download.href = result;
            $download.className = 'row';
            $download.innerText = 'Download';
            $download.download = `gifbydinesh.gif`;
            $gifImg.src = result;
            $gifImg.className = 'row';
            newDiv.appendChild($download)
            newDiv.appendChild($gifImg)
            $gif.appendChild(newDiv);
            self.setLoadingoff();
        })
    }

    setLoadingoff() {
        this.setState({
            isloading: false
        });
    }


    handleIntervalChange(event) {
        this.setState({ interval: event.target.value / 1000 });
    }

    //File Drag and Drop
    onDrop(acceptedFiles) {
        this.setState({
            files: acceptedFiles
        });
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                const fileAsBinaryString = reader.result;
                this.setState({
                    images: this.state.images.concat([fileAsBinaryString])
                })
            };
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.readAsDataURL(file);
        })
    }

    // Shows the list of files with the file size 
    showFiles() {
        const { files } = this.state;
        if (!files.length) {
            return null;
        }
        return (
            <div>
                <h3>Dropped files: </h3>
                <ul>
                    {
                        files.map((file, idx) => {
                            return (
                                <li key={idx}>
                                    <div>{file.name + ' : ' + file.size + ' bytes.'}</div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }


    render() {
        return (
            <div className="container">
                <Loader loaded={!this.state.isloading}>
                </Loader>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="alert alert-danger" style={{ display: this.state.showAlert ? 'block' : 'none' }}
                        role="alert">
                        <strong>Oh snap!</strong> You need at least three images to generate the gif.
                    </div>
                    <div className="form-group row">
                        <h3>
                            <i className="fa fa-file-image-o" aria-hidden="true"></i> Images to Gif
                        </h3>
                        <Dropzone onDrop={this.onDrop.bind(this)} className="form-control"
                            accept="image/*"
                            style={style}
                            activeStyle={activeStyle}
                            rejectStyle={rejectStyle}
                        >
                            Select multiple images and drag and drop those images on the box.
                        </Dropzone>
                        {this.showFiles()}
                    </div>
                    <div className="form-group row">
                        <input className="form-control input-lg"
                            type="text"
                            ref="textInput"
                            onChange={this.handleIntervalChange}
                            placeholder="Enter time in milliseconds(defaults to 200ms)"
                        />
                    </div>
                    <button className="submitButton form-control btn btn-outline-secondary btn-lg"
                        type="submit"
                        onClick={(e) => this.handleSubmit.bind(this)}>Generate Gif from Images
                    </button>
                </form>
                <hr />
                <div>
                    <WebCam handleWebToGifConversion={this.handleWebToGifConversion} />
                </div>
                <hr />
                <div className="container img-gallery">
                    <div className="row" id="gif">
                    </div>
                </div>
            </div>
        );
    }
}


export default createContainer(
    () => {
        return {};
    },
    App
);
