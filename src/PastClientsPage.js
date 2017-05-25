import React, { Component } from 'react'

import LogInBox from './LogInBox'

function AccurateInterval (duration, callback) {
  this.baseline = undefined
  
  this.run = () => {
    if (this.baseline === undefined) {
      this.baseline = new Date().getTime()
    }
    callback()

    var end = new Date().getTime()
    this.baseline += duration
 
    var nextTick = duration - (end - this.baseline)
    if (nextTick < 0) {
      nextTick = 0
    }
    ((i) => {
        i.timer = setTimeout(() => {
        i.run(end)
      }, nextTick)
    })(this)
  }

  this.stop = () => {
    clearTimeout(this.timer)
  }
}

class PastClientsPage extends Component {
  constructor (props) {
    super (props)

    this.state = {
      allTriggerAssets: this.getTriggerAssets(props.clients),
      pastWorkVisible: true,
      triggerIndex: 0,
      startTriggerOn: 'adobe',
      timerRunning: false,
      readyToRenderTrigger: false,
      width: null,
      height: null,
    }
    
    this.restartTimer = this.restartTimer.bind(this)
    this.showPastWork = this.showPastWork.bind(this)
    this.hidePastWork = this.hidePastWork.bind(this)
    this.activateTrigger = this.activateTrigger.bind(this)
    this.deactivateTrigger = this.deactivateTrigger.bind(this)
    this.getWindowSize = this.getWindowSize.bind(this)
    this.getTriggerAssets = this.getTriggerAssets.bind(this)
    this.getTriggerAssetDimensions = this.getTriggerAssetDimensions.bind(this)
    this.renderTrigger = this.renderTrigger.bind(this)
  }

  componentDidMount () {
    // HomePage component has been loaded, showing up on screen.
    // Now we can check things like how big the window is
    // console.log('componentDidMount')
    this.getWindowSize()
    this.getTriggerAssetDimensions()
    window.addEventListener('resize', this.getWindowSize.bind(this))
  }


  restartTimer () {
    // Start a timer that we'll eventually tap into to render the trigger images
    // If there is no timer running yet, set a variable to indicate that it is NOW running

    // Timer that updates the triggerIndex (position in allTriggerAssets)
    // This starts at [0] and increases by 1 every XXX milliseconds,
    // % means "modulo" (look it up)
    // (this.state.triggerIndex + 1) % allTriggerAssets.length
    // means that we always get a triggerIndex that we can use to find an image
    
    const timerSpeed = 200

    // Restart timer
    // New style timer
    if (this.timer) {
      this.timer.stop()
    }

    // Old style timer
    // clearInterval(this.timer)

    
    // Hook up & run timer
    // New style timer
    var index = 0
    this.timer = new AccurateInterval(timerSpeed, () => {
      index++
      this.setState({
        triggerIndex: index % this.state.allTriggerAssets.length
      })
    })
    this.timer.run()

    this.setState({
      triggerIndex: 0,
    })
    
    // // Old style timer
    // this.timer = setInterval(() => {
    //   index++
    //   this.setState({
    //     triggerIndex: index % this.state.allTriggerAssets.length
    //   })
    // }, timerSpeed)
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
    this.setState({
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
    this.timer.stop()

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
    }, this.getTriggerAssetDimensions())
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
        const currentClientTriggerAssets = clients[clientName].trigger
        currentClientTriggerAssets.forEach(asset => {
          allTriggerAssets.push(asset)
        })
      }
    })

    return allTriggerAssets
  }

  getTriggerAssetDimensions () {
    // Loop through all the assets,
    // load them,
    // and record their height and width
    //
    // Ths uses the asset list to build an object which looks roughly like this:
    // assetDimensions = {
    //   'trig.1.crisis3.jpg': {
    //     width: 1977,
    //     height: 1310,
    //   },
    //   'trig.1.bp1.jpg' : {
    //     width: 1811,
    //     height: 1100,
    //   }
    // }

    const assetDimensions = {}
    this.state.allTriggerAssets.forEach(assetName => {
      assetDimensions[assetName] = {}
      var asset
      if (assetName.includes('png') || assetName.includes('gif') || assetName.includes('jpg')) {
        asset = new Image()
      }
      if (assetName.includes('mp4') || assetName.includes('mov')) {
        asset = document.createElement('video')
      }
      asset.src = '../assets/' + assetName
      asset.onload = () => {
        const size = this.setImageSize(asset.naturalWidth, asset.naturalHeight)
        assetDimensions[assetName] = {
          width: size.width,
          height: size.height,
        }
      }
    })

    this.setState({
      assetDimensions: assetDimensions,
      readyToRenderTrigger: true
    })
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
        currentClientTriggerAssets.forEach(assetName => {
          allTriggerAssets.push(assetName)
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
        {allTriggerAssets.map((assetName, i) => {
          const width = this.state.assetDimensions[assetName].width
          const height = this.state.assetDimensions[assetName].height
          
          // Normally, we style the asset as hidden
          let assetStyle = {
            visibility: 'hidden',
          }
          // If it's the "current" one in the triggerIndex, it’s briefly made visible
          if (this.state.triggerVisible && i === this.state.triggerIndex) {
            assetStyle = {
              visibility: 'visible',
            }
          }

          if (assetName.includes('png') || assetName.includes('gif') || assetName.includes('jpg')) {
            return (
              <img
                key={assetName}
                style={assetStyle}
                src={'../assets/' + assetName}
                width={width}
                height={height}
                role='presentation'
              />
            )
          }
          if (assetName.includes('mp4') || assetName.includes('mov')) {
            return (
              <div
                key={assetName}
                style={assetStyle}>
                <video autoPlay muted loop preload='auto' width={width} height={height}>
                  <source src={'../../assets/' + assetName} />
                </video>
              </div>
            )
          }
          else {
            return null
          }
        })}
        <div className='trigger-mobile'></div>
        <div className='trigger-overlay'></div>
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
    var homeClassName = 'home'
    var gridClassName = 'grid'
    var gridLogoClassName = 'gridlogo'
    // var welcomeGreeting = 'Hello!'
    
    if (this.state.triggerVisible === true) {
      homeClassName = 'home trigger-visible'
      gridClassName = 'grid trigger-visible'
      gridLogoClassName = 'gridlogo trigger-visible'
    }

    return (
      <div className={homeClassName}>
        <section className='home-header'> 
          <div className='column1'>
            <h1><a href="/">J</a></h1>
          </div> 
          
          <div className='column2'>
            <div className='contact-items'>
              <div className='contact-item'>
                <div>email:</div>
                <div>jeff@thevisual.work</div>
              </div>      
              <div className='contact-item'>
                <div>linkedin:</div>
                <div>linkedin.com/jeffmunar</div>
              </div>
            </div>
          </div>
        </section>

        {this.state.logInPrompt === true && <LogInBox onHidePastWork={this.hidePastWork} />}

        {
          this.state.pastWorkVisible === true &&
            <div className='center-vertical'>
              <section className={gridClassName}>
                <div className='gridcontainer'>
                  {
                    Object.keys(this.props.clients).map((clientName, i) => {
                      const currentClient = this.props.clients[clientName]

                      const max = 1500
                      const min = 820
                      const randomDelay = Math.floor(Math.random() * (max - min)) + min
                      const randomFadeStyle = {
                        transitionDelay: (this.state.triggerVisible === true ? randomDelay.toString() : '0') + 'ms'
                      }
                      
                      if (currentClient.recent === false) {
                        return (
                          <a
                            className={gridLogoClassName + ' ' + clientName}
                            key={i}
                            onClick={() => this.showLogInPrompt(clientName)}> 
                            <div>
                              <img
                                style={clientName !== this.state.startTriggerOn ? randomFadeStyle : null}
                                onMouseEnter={() => this.activateTrigger(clientName)}
                                onMouseLeave={() => this.deactivateTrigger()}
                                src={'../assets/' + currentClient.logo}
                                role='presentation'
                              />
                            </div>
                          </a>
                        )
                      }
                      // If it’s not recent, we still need to return something (.map requires that)
                      // so we return <noscript /> which is a special way of saying,
                      // return NOTHING
                      return null
                    })
                  }
                </div>
              </section>
            </div>
          }

          {this.state.readyToRenderTrigger && this.renderTrigger()}
      </div>
    )
  }
}

export default PastClientsPage
