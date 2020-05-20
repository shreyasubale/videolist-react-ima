import React, { Component } from 'react';
import Loader from './Loader.js';
import ReactDOM from "react-dom";
import './Video.css';
import videojs from 'video.js';
import classNames from 'classnames';
import 'videojs-contrib-ads';
import 'videojs-ima';



/*
 * Video main component.
 * Display a YouTube embed video when activated.
 */
class Video extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props);
        this.player = videojs(this.videoNode, this.props, () => {
            console.log('onPlayerReady', this)
            // on ready function for anything else you need to do
            // after the player is set up…
        });

    }
    componentDidUpdate () {
        // let video = ReactDOM.findDOMNode(this);
        this.player.play();
    }
    componentWillUnmount() {
        this.player.dispose();
        // whatever other things you need to clean up—maybe remove the DOM reference
        // this.videoPlayer = undefined;
    }

    render() {
        const vClassNames = classNames("video-js","vjs-16-9 col-md-6");
        console.log("Props are");

        console.log(this.props);
        return (
            <div>
                <div data-vjs-player>
                    <video ref={ node => this.videoNode = node } className={vClassNames} src={this.props.sources[0].src}></video>
                </div>
            </div>
        )
    }

};

export default Video;
