import React, { Component } from 'react';
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
        this.autoplayAllowed = false;
        this.autoplayRequiresMute = false;
    }


    initPlayer() {
        // this.props.muted = this.autoplayRequiresMute;
        this.player = videojs(this.videoNode,this.props, () => {
            console.log('onPlayerReady', this)
            // on ready function for anything else you need to do
            // after the player is set up…

            // this.player.ima.playAdBreak();
        });
        // this.player.muted(this.props.muted);
        if(this.props.muted === false) {
            this.player.volume(1);
        }
        var imaOptions = {
            adTagUrl: 'http://a.beta.tribalfusion.com/v.vast?vpaid=1&clickTrackURL=//www.beta.tribalfusion.com/adapp/tf/campaign/click/3060944X4000375X437/500016311&mockApp=1&mediaType=24&mediaDataID=500016311&clientID=293233&env=instream&size=1x10&url=//www.beta.tribalfusion.com/adapp/tf/campaign/play/3060944X4000375X437/500016311&fileName=preroll.vpaid.xml',
            vpaidMode: 2,
            autoPlayAdBreaks: true,
            debug: true
        };
        this.player.ima(imaOptions);
        this.player.on("adsready", function() {
            console.log("adssssss are ready");
            // this.player.ima.playAdBreak();
            this.player.play();
        }.bind(this));
        this.player.ima.initializeAdDisplayContainer();
    }

    componentDidMount() {
        console.log("mounting component");
        this.initPlayer();
            
            // this.player.ima.addEventListener(google.ima.AdEvent.Type.LOADED, function() {
            //     console.log("ad break ready");
            //     // if (visibleStatus > 50) {
            //         this.player.ima.playAdBreak();
            //     // }
            //     // adReady = true;
            // }.bind(this))
            // this.player.ima.requestAds();




    }
    componentWillUpdate() {
        // debugger;

    }
    componentDidUpdate () {
        // let video = ReactDOM.findDOMNode(this);
        try {
            console.log("componentdidupdate");
            this.player.ima.changeAdTag('http://a.beta.tribalfusion.com/v.vast?vpaid=1&clickTrackURL=//www.beta.tribalfusion.com/adapp/tf/campaign/click/3060944X4000375X437/500016311&mockApp=1&mediaType=24&mediaDataID=500016311&clientID=293233&env=instream&size=1x10&url=//www.beta.tribalfusion.com/adapp/tf/campaign/play/3060944X4000375X437/500016311&fileName=preroll.vpaid.xml')
            this.player.ima.requestAds();
            // this.adsManager && this.adsManager.destroy();
            // this.player.ima.initializeAdDisplayContainer();
            // this.player.ima.changeAdTag(null);
            // this.player && this.player.ima.changeAdTag('http://a.beta.tribalfusion.com/v.vast?vpaid=1&clickTrackURL=//www.beta.tribalfusion.com/adapp/tf/campaign/click/3060944X4000375X437/500016311&mockApp=1&mediaType=24&mediaDataID=500016311&clientID=293233&env=instream&size=1x10&url=//www.beta.tribalfusion.com/adapp/tf/campaign/play/3060944X4000375X437/500016311&fileName=preroll.vpaid.xml');
        }catch(e) {
            console.log(e);
        }
        
        // this.player.on("adsready", function() {
        //     console.log("adssssss are ready");
        //     // this.player.play();
        // }.bind(this));
        
        
    }
    componentWillUnmount() {
        console.log("unmounting component");
        this.player.dispose();
       // whatever other things you need to clean up—maybe remove the DOM reference
        // this.videoPlayer = undefined;
    }

    render() {
        const vClassNames = classNames("video-js","vjs-16-9", "col-md-6");
      

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
