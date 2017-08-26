import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class WebCam extends React.Component {

    toggleChecked() {
        Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
    }

    deleteThisTask() {
        Meteor.call('tasks.remove', this.props.task._id);
    }

    togglePrivate() {
        Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private);
    }

    handleWebCamSubmit(event) {
        event.preventDefault();
        this.setState({
            interval: 0.1,
            numFrames: 20,
            frameDuration: 1,
            showAlert: false
        });
        this.props.handleWebToGifConversion(this.state);
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            interval: 0.1,
            numFrames: 20,
            frameDuration: 1,
        };
        this.handleWebCamIntervalChange = this.handleWebCamIntervalChange.bind(this);
        this.handleWebCamFrameNumberChange = this.handleWebCamFrameNumberChange.bind(this);
        this.handleWebCamFrameDurationChange = this.handleWebCamFrameDurationChange.bind(this);
    }

    handleWebCamIntervalChange(event){
        this.setState({interval: event.target.value});
    }

    handleWebCamFrameNumberChange(event){
        this.setState({numFrames: event.target.value});
    }

    handleWebCamFrameDurationChange(event){
        this.setState({frameDuration: event.target.value });
    }


    render() {
        return (
            <div className="shopping-list gallery">
                <h3>
                    <i className="fa fa-video-camera " aria-hidden="true"></i> Webcam to Gif
                </h3>
                <form onSubmit={this.handleWebCamSubmit.bind(this)} className="gallery">
                    <div className="row">
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="No. of Frames(Defult:20) (range: 5 to 25)" onChange={this.handleWebCamFrameNumberChange}/>
                        </div>
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Frame Duration(Defult:1 sec; (range: 1 to 5)" onChange={this.handleWebCamFrameDurationChange} />
                        </div>
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Interval (Defult:0.1 sec)(range 0.1 to 0.5)" onChange={this.handleWebCamIntervalChange} />
                        </div>
                    </div>
                    <div className="row gallery">
                        <button className="submitButton form-control btn btn-outline-secondary btn-lg"
                            type="submit"
                            onClick={(e) => this.handleWebCamSubmit.bind(this)}>Generate Gif from WebCam
                        </button>
                    </div>

                </form>
            </div>
        );
    }
}
