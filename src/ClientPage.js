import React, { Component } from 'react'

// Import other components that this needs
import DisplayZone from './DisplayZone'
import Nav from './Nav'

// // When we set this up:
// <MyComponent
// 	className='anything'
// 	name='Jeff'
// 	width={400}
// 	data={myObject}
// />
// // ... then WITHIN MyComponent:
// this.props.className === 'anything'
// this.props.name === 'Jeff'
// this.props.width === 400
// ...


class ClientPage extends Component {
	render () {
		// console.log(this.props.orderedClientList)
		// console.log('this.props is:')
		// console.log(this.props)
		// console.log(this.props.clients)
		// console.log(this.props.clients.skully.assets)

    const clientNameInUrl = this.props.match.params.name
    // the user loaded up http://jeffmunar.com/client/skully
    // ReactRouter defines the last bit of the URL as this.props.match.params.name, so...
    // clientNameInUrl === 'skully'

    const selectedClientData = this.props.clients[clientNameInUrl]
    // this.props.clients[clientNameInUrl] means "look in this.props.clients for an item
    // called whatever clientNameInUrl stands for right now", so...
    // this.props.clients['skully']
    // and what we get is that particular client, so...
    // selectedClientData === skully: {
		// 	name: 'Skully Brand',
		// 	description: 'A description of the Skully client',
		// 	assets: [
		// 		'skully.poster.jpg',
		// 		'skully.casestudy.mp4',
		//		etc.
		// 	],
		// },

		if (!selectedClientData) {
			return (
				<div>
					There’s no client in <strong>clients</strong> called <strong>{clientNameInUrl}</strong>
				</div>
			)
		}

    return (
      <div className='clientpage'>
 				<DisplayZone
      		assets={selectedClientData.assets}
      	/>
	      <Nav
	      	description={selectedClientData.description}
	      	name={selectedClientData.name}
	      	currentlyAt={clientNameInUrl}
	      	clients={this.props.clients}
	      	orderedClientList={this.props.orderedClientList}
	      />
	    </div>
    )
  }
}

export default ClientPage
