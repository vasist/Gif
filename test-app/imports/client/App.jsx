import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Dropzone from 'react-dropzone'
import WebCam from './WebCam'


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


    //form submit
    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            files: [],
            images: [],
            interval: .2,
            showAlert: false
        });
        if (this.state.files.length < 3) {
            this.setState({
                showAlert: true
            });
            return;
        }
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

        })
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            files: [],
            images: [],
            interval: .2
        };
        this.handleIntervalChange = this.handleIntervalChange.bind(this);
        this.handleWebToGifConversion = this.handleWebToGifConversion.bind(this);
    }

    handleWebToGifConversion(data) {
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
        })
    }

    handleIntervalChange(event) {
        this.setState({ interval: event.target.value / 1000 });
    }

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
                <form onSubmit={this.handleSubmit.bind(this)}>

                    <div className="alert alert-danger" style={{ display: this.state.showAlert ? 'block' : 'none' }} role="alert">
                        <strong>Oh snap!</strong>  You need at least three images to generate the gif.
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
                    {/*<WebCam onUpdate={this.onUpdate} />*/}
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
