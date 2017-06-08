import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomePage from './HomePage'
import ClientPage from './ClientPage'
import Product from './Product'

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

const renderProduct = (props) => {
  return (
    <Product
      {...props}
    />
  )
}

const Routes = (props) => {
	return (
	  <Router {...props}>
	  	<div>
	  		<Route exact path='/' render={renderHomePage} />
		    <Route path='/client/:name' render={renderProduct} />
        <Route path='/product' render={renderProduct} />
		    {/*<Route path='*' component={NotFound} />*/}
		  </div>
	  </Router>
	)
}

export default Routes