import React, { Component } from 'react'

class DisplayZone extends Component {
  render () {
  	// Go through this.props.assets, in sequence,
  	// figure out what kind of asset it is,
  	// and then spit out the correct HTML for that
  	// kind of asset

  	// this.props.assets: [
  		// 'casestudy.mp4',
  		// 'site.mp4',
  		// 'app.jpg',
  		// 'display.jpg',
  		// 'onesheet.jpg',
  		// 'ditorial.jpg',
  		// 'poster.jpg',
  		// 'instagram.mp4',
  		// 'icons.jpg',
  		// 'ridermark.jpg',
  		// 'onesheetsi.jpg',
  		// 'https://player.vimeo.com/432894872309432?blablabla',
  		// 'https://player.vimeo.com/543534?blablabla',
  		// 'https://player.vimeo.com/8905823905823905890234?blablabla'
    // ]

    return (
    	<div className='displayzone'>
    		{
    			this.props.assets.map((fileName, i) => {
            // fileName === the current asset we’re looking at
            // i === a counter, starts at 0
            //
    				// If the filename has a video extension
    				// e.g. 'mp4', 'mov'
    				// return a div for a video
    				if (fileName.includes('mp4') || fileName.includes('mov')) {
    					return (
    						<div key={i} className='asset'>
				    			<video autoPlay loop>
				    				<source src={'../../assets/' + fileName} />
				    			</video>
				    		</div>
    					)
    				}
    				// if the filename has a graphic extension
    				// e.g. 'png', 'gif'
    				// return a div for a graphic
    				if (fileName.includes('png') || fileName.includes('gif') || fileName.includes('jpg')) {
    					return (
    						<div key={i} className='asset'>
    							<img src={'../../assets/' + fileName} role='presentation' />
    						</div>
    					)
    				}
    				//if the filename has vimeo
    				// e.g. 'player.vimeo.com/...'
    				// retun a div for an imbedded video
    				if (fileName.includes('vimeo')) {
    				  return ( 
    				    <div key={i} className='asset'>
                  <iframe 
        				    src={fileName} 
        				    width='640' 
        				    height='360' 
        				    frameborder='0' 
        				    webkitallowfullscreen 
        				    mozallowfullscreen 
        				    allowfullscreen>
        				  </iframe>
                </div>
	    				) 
    				}
    				// Asset isn’t a type we recognize, so return nothing
    				return (
    					<noscript key={i} />
    				)
    			})
    		}
      </div>
    )
  }
}

export default DisplayZone
