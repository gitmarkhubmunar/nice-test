import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomePage from './HomePage'
import ClientPage from './ClientPage'
import PastClientsPage from './PastClientsPage'

// Render our custom home page component
const renderHomePage = (props) => {
	return (
		<HomePage
			{...props}
		/>
	)
}

// Render our custom client page component
const renderClientPage = (props) => {
	return (
		<ClientPage
			{...props}
		/>
	)
}

const renderPastClientsPage = (props) => {
  return (
    <PastClientsPage
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