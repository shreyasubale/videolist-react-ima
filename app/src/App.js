import React, { Component } from 'react';
import Header from './Header.js';
import VideoList from './VideoList.js';
import Video from './Video';
import './App.css';

/* 
 * Main component.
 * Notes:
 * The main state is kept here and passed down to other components using props.
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ui: {
        header: 'My Video SPA',
        headerVideoList: 'Top 10s',
      },
      data: []
    };
    this.activeVideo = this.activeVideo.bind(this);
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
  }
  componentDidMount() {
    // fetch data from json and populate components
    fetch('./data.json').then(response => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ', response.status);
        return;
      }
      response.json().then(data => {
        this.setState({ data: data.videos });
      });
    }).catch(error => {
      console.log('There has been a problem with your fetch operation: ', error.message);
    });
  }
  render() {
    // find out active video
    let data = this.state.data;
    let activeVideo = data.find(video => video.isActive);
    console.log(activeVideo);
    const opts = {
        autoPlay: true,
        controls: true,
        muted: true,
        sources: [{
            src:(activeVideo && activeVideo.src) || "http://techslides.com/demos/sample-videos/small.mp4"
        }]
    };
    return (
      <div className="container">
        <div className='app row'>
          <div className='app__video row'>
              <div className='app__videoList col-md-6'>
                  <Video {...opts}/>
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
