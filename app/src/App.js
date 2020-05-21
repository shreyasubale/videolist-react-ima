import React, { Component } from 'react';
import Header from './Header.js';
import VideoList from './VideoList.js';
import Video from './Video';
import './App.css';
import canAutoplay from "can-autoplay";


/* 
 * Main component.
 * Notes:
 * The main state is kept here and passed down to other components using props.
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.autoplayAllowed = false;
    this.autoplayRequiresMute = true;
    this.state = {
      ui: {
        header: 'My Video SPA',
        headerVideoList: 'Top 10s',
      },
      key: 0,
      data: [],
      opts: {
        autoPlay: true,
        playsinline : true,
        inline: true,
        controls: true,
        muted: true,
        sources: [{
          src: "http://techslides.com/demos/sample-videos/small.mp4"
        }]
      }
    };
    this.activeVideo = this.activeVideo.bind(this);
  }

  checkUnmutedAutoplaySupport() {
    canAutoplay
      .video({
        timeout: 500,
        muted: false,
        inline: true
      })
      .then(function(response) {
        if (response.result === false) {
          // Unmuted autoplay is not allowed.
          this.checkMutedAutoplaySupport();
        } else {
          // Unmuted autoplay is allowed.
          this.autoplayAllowed = true;
          this.autoplayRequiresMute = false;
          this.fetchData();
        }
      }.bind(this))
  };
  fetchData() {
    fetch('./data.json').then(response => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ', response.status);
        return;
      }
      response.json().then(data => {
        this.setState({
          data: data.videos
        });
      });
    }).catch(error => {
      console.log('There has been a problem with your fetch operation: ', error.message);
    });
  }

  checkMutedAutoplaySupport() {
    canAutoplay
      .video({
        timeout: 500,
        muted: true,
        inline: true
      })
      .then(function(response) {
        if (response.result === false) {
          // Muted autoplay is not allowed.
          this.autoplayAllowed = false;
          this.autoplayRequiresMute = false;
        } else {
          // Muted autoplay is allowed.
          this.autoplayAllowed = true;
          this.autoplayRequiresMute = true;
        }
        this.fetchData();
      }.bind(this))
  }

  activeVideo(id) {
    // activate a video
    let data = [...this.state.data];
    // de activate current active video
    let currentActiveVideo = data.find(video => video.isActive);
    currentActiveVideo.isActive = false;
    // activate new video
    let index = data.findIndex(video => video.id === id);
    data[index].isActive = true;
    this.setState({ data });
    this.setState({key: this.state.key +1})
    this.setState(
        {
          opts: Object.assign({},this.state.opts,{muted: false})
        }
    )
    


  }
  componentDidMount() {

    this.checkUnmutedAutoplaySupport()

    // fetch data from json and populate components
  }
  render() {
    // find out active video
    let data = this.state.data;
    let activeVideo = data.find(video => video.isActive);
    console.log(activeVideo);
    const opts = this.state.opts;
    return (
      <div className="container">
        <div className='app row'>
          <div className='app__video row'>
              <div className='app__videoList col-md-6'>
                  <Video key = {this.state.key} {...this.state.opts}/>
              </div>

              <div className='app__videoList col-md-4'>
                  <VideoList
                      data={this.state.data}
                      title={this.state.ui.headerVideoList}
                      activeVideo={this.activeVideo}
                  />
              </div >
          </div>

        </div >
      </div>
    );
  }
}

export default App;
