import React, { Component } from 'react';
import Loader from './Loader.js';
import ReactDOM from "react-dom";
import './Video.css';
import videojs from 'video.js';
import classNames from 'classnames';
import 'videojs-contrib-ads';
import 'videojs-ima';
import google from './Google';



/*
 * Video main component.
 * Display a YouTube embed video when activated.
 */
class Video extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.player = videojs(this.videoNode, this.props, () => {
            console.log('onPlayerReady', this)
            // on ready function for anything else you need to do
            // after the player is set up…
            var imaOptions = {
                adTagUrl: 'http://a.beta.tribalfusion.com/v.vast?vpaid=1&clickTrackURL=//www.beta.tribalfusion.com/adapp/tf/campaign/click/3060944X4000375X437/500016311&mockApp=1&mediaType=24&mediaDataID=500016311&clientID=293233&env=instream&size=1x10&url=//www.beta.tribalfusion.com/adapp/tf/campaign/play/3060944X4000375X437/500016311&fileName=preroll.vpaid.xml',
                vpaidMode : 2,
                // autoPlayAdBreaks: false,
                debug: true
            };
            this.player.ima(imaOptions);
        });




    }
    componentWillUpdate() {
        // debugger;

    }
    componentDidUpdate () {
        // let video = ReactDOM.findDOMNode(this);
        try {
            this.player.ima.changeAdTag(null);
            this.player && this.player.ima.changeAdTag('http://a.beta.tribalfusion.com/v.vast?vpaid=1&clickTrackURL=//www.beta.tribalfusion.com/adapp/tf/campaign/click/3060944X4000375X437/500016311&mockApp=1&mediaType=24&mediaDataID=500016311&clientID=293233&env=instream&size=1x10&url=//www.beta.tribalfusion.com/adapp/tf/campaign/play/3060944X4000375X437/500016311&fileName=preroll.vpaid.xml');
        }catch(e) {
            console.log(e);
        }
        this.player.ima.requestAds();
        this.player.play();
    }
    componentWillUnmount() {
        this.player.dispose();
       // whatever other things you need to clean up—maybe remove the DOM reference
        // this.videoPlayer = undefined;
    }

    render() {
        const vClassNames = classNames("video-js","vjs-16-9", "col-md-6");
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
