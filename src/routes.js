import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomePage from './HomePage'
import ClientPage from './ClientPage'
import PastClientsPage from './PastClientsPage'

// Import client data and make shortcuts to each bit of data
import clientData from './clientData'

// Render our custom home page component
const renderHomePage = (props) => {
	return (
		<HomePage
			clients={clientData.clients}
			triggerAssets={clientData.triggerAssets}
			{...props}
		/>
	)
}

// Render our custom client page component
const renderClientPage = (props) => {
	return (
		<ClientPage
			clients={clientData.clients}
			orderedClientList={clientData.orderedClientList}
			{...props}
		/>
	)
}

const renderPastClientsPage = (props) => {
  return (
    <PastClientsPage
      clients={clientData.clients}
      triggerAssets={clientData.triggerAssets}
      {...props}
    />
  )
}

const Routes = (props) => {
	return (
	  <Router {...props}>
	  	<div>
	  		<Route exact path='/' render={renderHomePage} />
		    <Route path='/client/:name' render={renderClientPage} />
        <Route path='/pastclients' render={renderPastClientsPage} />
		    {/*<Route path='*' component={NotFound} />*/}
		  </div>
	  </Router>
	)
}

export default Routes