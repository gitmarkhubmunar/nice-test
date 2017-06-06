import React, { Component } from 'react'
import Typist from 'react-typist'

import LogInBox from './LogInBox'
import data from './data.js'

class HomePage extends Component {
  constructor (props) {
    super (props)

    this.state = {}

    this.showPastWork = this.showPastWork.bind(this)
    this.hidePastWork = this.hidePastWork.bind(this)
    this.activateTrigger = this.activateTrigger.bind(this)
    this.deactivateTrigger = this.deactivateTrigger.bind(this)
    this.getWindowSize = this.getWindowSize.bind(this)
    this.getTriggerAssets = this.getTriggerAssets.bind(this)
    this.renderTrigger = this.renderTrigger.bind(this)
  }

  componentDidMount () {
    // HomePage component has been loaded, showing up on screen.
    // Now we can check things like how big the window is
    // console.log('componentDidMount')
    this.getWindowSize()
    window.addEventListener('resize', this.getWindowSize.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getWindowSize.bind(this))
  }

  showPastWork () {
    //showPastWork changes pastWorkVisible to be true.
    this.setState({
      pastWorkVisible: true
    })
  }

  hidePastWork () {
    //homepageBackButton brings you back to the homepage.
    this.setState({
      pastWorkVisible: false,
      logInPrompt: false,
    })
  }

  activateTrigger (clientName) {
    this.setState({
      triggerVisible: true,
      startTriggerOn: clientName,
    })
    this.restartTimer()
  }

  deactivateTrigger () {
    this.setState({
      triggerVisible: false,
      startTriggerOn: 'adobe',
      triggerIndex: 0,
    })
  }

  showLogInPrompt(clientName) {
    this.setState({
      logInPrompt: true,
      accessPastClientPage: clientName,
    })
  }

  getWindowSize () {
    // console.log('getWindowSize()')
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  // The purpose of this function is to decide
  // whether to make an image stretch to the full height of the window
  // or the full width of the window, depending on the situation

  // WE NEED
  // A. Window width
  // B. Window height
  // C. Image width
  // D. Image height

  // TO DO
  // 1. Calculate aspect ratio of window
  // 2. Calculate aspect ratio of image

  // If the aspect ratio of the image is greater than
  // the aspect ratio of the window, it would normally be letterboxed
  // (e.g. 16:9 image on regular computer screen)
  // in that case, we want to set the height of the image
  // to be the height of the window—that way the sides get cropped off

  // In the other case, where the aspect ratio of the image
  // is less than the aspect ratio of the window, it would normally
  // have bars on the left and right
  // (e.g. portrait image on widescreen computer screen)
  // in that case, we want to set the width of the image
  // to be the width of the window—that way the top and bottom
  // get cropped off
  
  
  // When this function is called, it gets 2 arguments:
  // imageWidth, imageHeight
  // These come from the actual dimensions of the image
  // and are required for us to run this function
  // e.g. setImageSize(1600, 850)
  // so...
  //      imageWidth === 1600
  //      imageHeight === 850

  // This function now needs to return the correct style
  // for the image (e.g. width, height) based on the calculations
  //
  // In React, we can spit out a mini-CSS style that looks like this:
  // {
  //   width: 1600
  // }
  //
  // or
  //
  // {
  //   height: 850
  // }
  //
  // This is what the image "asks for" when it calls this function
  // for its "style" prop
  // e.g. <img style={this.setImageSize(1600, 850)}
  //
  // In other words, the image is asking for a style object from this
  // function, based on its size.
  //
  // When the image asks, this function returns the actual style
  // so...
  // <img style={this.setImageSize(1600, 850)}
  //   is replaced by
  // <img style={{width: 2500}} (or whatever the correct style is)

  setImageSize (imageWidth, imageHeight) {
    const windowWidth = this.state.width 
    const windowHeight = this.state.height

    const windowRatio = windowWidth / windowHeight
    const imageRatio = imageWidth / imageHeight

    // console.log('---------SIZES-----------')
    // console.log('window', windowWidth, windowHeight, windowRatio)
    // console.log('image', imageWidth, imageHeight, imageRatio)
    // console.log('-------------------------')

    if (imageRatio >= windowRatio) {
      // console.log('expand height to browser')
      return {
        height: windowHeight,
        width: windowHeight * imageRatio,
      }
    }
    if (imageRatio <= windowRatio) {
      // console.log('expand img width to edge')
      return {
        width: windowWidth,
        height: windowWidth / imageRatio,
      }
    }
  }

  getTriggerAssets (clients) {
    // Set up a list of assets which we'll eventually cycle through
    const allTriggerAssets = []

    // Put all client's assets in the list
    Object.keys(clients).forEach(clientName => {
      // If the current client is a recent client, don't bother getting its trigger assets
      if (clients[clientName].recent === true) {
        return
      }
      // Otherwise, we want the client's trigger assets
      else {
        // Go through the current client's trigger assets,
        // and add them into the allTriggerAssets list

        // Except... not. Let's leave that for the separate page.
      }
    })

    return allTriggerAssets
  }


  renderTrigger () {
    // Our timer is going to need to start on our starting client,
    // which is in this.state.startTriggerOn (e.g. this.state.startTriggerOn === 'adobe')
    // and then go through the rest of the clients in some order
    //
    // For each client, including the one we start with, we need to get  client.trigger,
    // which is itself a list of filenames
    // e.g.
    // adobe: {
    //   trigger: [
    //     'file1.jpg',
    //     'file2.jpg',
    //   ]
    // }
    // In other words, we have to loop through the clients, *AND* loop through EACH client's
    // trigger list.

    //
    // STEP 1: CORRECTLY ORDERED ASSET LIST
    //

    // Set up a list of assets which we'll eventually cycle through
    const allTriggerAssets = []

    // Get the starting client's trigger assets
    const startingClientName = this.state.startTriggerOn || this.props.clients[0][Object.keys(this.props.clients)[0]]
    const startingClientTriggerAssets = this.props.clients[startingClientName].trigger

    // Go through the starting client's trigger assets,
    // and put them into the allTriggerAssets list (at the beginning of that list)
    startingClientTriggerAssets.forEach(asset => {
      allTriggerAssets.push(asset)
    })

    // Put all the other client's assets in the list
    Object.keys(this.props.clients).forEach(clientName => {
      // If the current client (in the forEach loop) is the starting client
      // -or-
      // if the current client is a recent client, don't bother getting its trigger assets
      if (clientName === startingClientName || this.props.clients[clientName].recent === true) {
        return
      }
      // Otherwise, we want the client's trigger assets
      else {
        // Go through the current client's trigger assets,
        // and add them into the allTriggerAssets list
        const currentClientTriggerAssets = this.props.clients[clientName].trigger
        currentClientTriggerAssets.forEach(square => {
          allTriggerAssets.push(square)
        })
      }
    })

  
    //
    // STEP 2: USE THE ALREADY-RUNNING TIMER TO FIND THE RIGHT IMAGE
    //

    // Asset dimensions
    // allTriggerAssets[this.state.triggerIndex] will give us a filename
    // e.g. allTriggerAssets[0] = 'nba1.jpg'
    // Then we go into assetDimensions['nba1.jpg'] and get the width and height

    // this.state.assetDimensions = {
    //   'nba1.jpg': {
    //     width: 402,
    //     height: 482,
    //   }
    //   ...
    // }

    // Render out the image at triggerAssets[index]
    

    let triggerStyle = {
      visibility: 'hidden',
    }
    if (this.state.triggerVisible === true) {
      triggerStyle = {
        visibility: 'visible',
      }
    }

    return (
      <div key={name} style={triggerStyle} className='trigger-background'>
        




      </div>
    )
  }

  // This home page component knows about this.props.clients
  //
  // Tip from Adam:
  // Arrays (i.e. assets = ['item', 'item', 'item'] can be mapped over like we do for assets on the DisplayZone)
  // Objects (i.e. clients = {skully: {}, adobe: {}, microsoft: {}} cannot be)
  // so look on Google for questions like "how do I map over an object in JavaScript"
  render () {
    console.log(data)

    var homeClassName = 'home'
    var gridClassName = 'pastworkgrid'
    var gridLogoClassName = 'gridlogo'
    
    if (this.state.triggerVisible === true) {
      homeClassName = 'home trigger-visible'
      gridClassName = 'grid trigger-visible'
      gridLogoClassName = 'gridlogo trigger-visible'
    }

    return (
      <div className={homeClassName}>
        <section className='home-header'> 
          <div className='header-nav'>
            <div className='column'>SHOP</div>
            <div className='column'>CAMPAIGN</div>
            <div className='column'>NICE LOGO</div>
            <div className='column'>CULTURE</div>
            <div className='column'>CONTACT</div>
          </div>
        </section>

        <section className='modularsection'>
          {data.squares.map((square, i) => {
            
            // At any given moment, you are just working with ONE item
            // from data.squares
            // {
            //   kind: null,
            //   media: 'file.jpg',
            //   product: true,
            //   wide: false,
            // }

            var className = 'modularbox'
            if (square.wide == true) {
              className = 'modularbox wide'
            }

            if (square.media.includes('png') || square.media.includes('gif') || square.media.includes('jpg')) {
              return (
                <img
                  className={className}
                  key={i}
                  src={'../assets/' + square.media}
                  role='presentation'
                />
              )
            }
            if (square.media.includes('mp4') || square.media.includes('mov')) {
              return (
                <div
                  className={className}
                  key={i}>
                  <video autoPlay muted loop preload='auto'>
                    <source src={'../../assets/' + square.media} />
                  </video>
                </div>
              )
            }
            else {
              return null
            }
          })}
        </section>
      </div>
    )
  }
}
 


export default HomePage
