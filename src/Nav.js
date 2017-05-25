import React, { Component } from 'react'

class Nav extends Component {
  constructor () {
    super ()

    this.state = {
      expanded: false
    }
  }

  collapseNav () {
    this.setState({
      expanded: false
    })
  }

  expandNav () {
    this.setState({
      expanded: true
    })
  }

  render () {
    console.log('this.state.expanded:', this.state.expanded)

  	const currentlyAt = this.props.currentlyAt // e.g. 'skully'
  	const list = this.props.orderedClientList // e.g ['skully', 'microsoft', 'nba']
  	const currentIndex = list.indexOf(currentlyAt)
  	const lastIndex = list.length - 1

  	
  	// Set up the correct previousIndex, based on where we are now
  	var previousIndex
		if (currentIndex === 0) {
			previousIndex = lastIndex	
		}
		else {
			previousIndex = currentIndex - 1
		}

		// Set up the correct nextIndex, based on where we are now
		var nextIndex 
		if (currentIndex === lastIndex) {
			nextIndex = 0
		}
		else {
			nextIndex = currentIndex + 1
		}




  	// if currentIndex is at 0
  	// then previousIndex should be 3 a.k.a. the index of the last client in the list
  	// but...
  	// we can't guarantee that it's 3... we actually don't know how long the list is
  	// because it's dynamic...
  	// so...
  	// search google to find out the index of the last item in an array
  	// so that whether there's 2 items or 2222, we can be sure to get that
  	// correct item

  	console.log('lastIndex:', lastIndex)
  	console.log('length:', list.length)
 		console.log('ordered list:', list)
  	console.log('currently at:', currentIndex)
  	console.log('next:', nextIndex)
  	console.log('previous', previousIndex)

  	// the buttons will be links that go to
  	// the /client/name url that correspond to
  	// the previous or the next client

    var navClassName = 'nav'
    if (this.state.expanded === true) {
      navClassName = 'nav open'
    }

    return (
      <section className={navClassName} onMouseEnter={() => this.expandNav()} onMouseLeave={() => this.collapseNav()}>
        <h3>{this.props.name}</h3>
        {this.state.expanded === true &&
          <p>{this.props.description}</p>
        }
        	
  			<div className='navPanel'> 
        	<a className='previousbutton' href={'/client/' + list[previousIndex]}>&lt;</a> 
        	<a className='homebutton' href={'/'}>home</a> 
  				<a className='nextbutton' href={'/client/' + list[nextIndex]}>&gt;</a>
        </div>

      </section>
    )
  }
}

export default Nav
