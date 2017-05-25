import React, { Component } from 'react'

class LogInBox extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
    	password: '',
    	closeButtonShouldBeX: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.hidePastWork = this.hidePastWork.bind(this)
  }

  handleChange (event) {
    this.setState({
    	password: event.target.value
    })
  }

  handleSubmit (event) {
    console.log('A password was submitted: ' + this.state.password)
    event.preventDefault()

    var correctPassword = 'jeff123'
    var attempt = this.state.password
    if (attempt === correctPassword) {
      this.setState({
        correctPassword: true
      })
    }
    else {
      this.setState({
        correctPassword: false
      })
    }
  }


  hidePastWork () {
  	this.props.onHidePastWork()
  }
  
  componentDidMount () {
  	setTimeout(() => {
  		this.setState({
	  		closeButtonShouldBeX: true
	  	})
  	}, 200)
  }

  render () {
  	var closeButtonClassName = 'loginClose'
  	if (this.state.closeButtonShouldBeX === true) {
  		closeButtonClassName = 'loginClose active'
  	}

		return (
    	<div className='nav open'>
	      <form onSubmit={this.handleSubmit}>
	        <label>
	          <input className='loginBox' type='password' placeholder='Password Required' value={this.state.password} onChange={this.handleChange} />
	        </label>
	        <input className='loginButton' type='submit' value='See past work' />
          <span className='message'>
            {this.state.correctPassword === true && 'Yup.'}
            {this.state.correctPassword === false && 'Nope.'}
          </span>
	      </form>
	      <div className={closeButtonClassName} onClick={() => this.hidePastWork()}>
	      	<div className='patty'></div>
	      	<div className='patty'></div>
	      </div>
	    </div>
    )
  }
}


export default LogInBox