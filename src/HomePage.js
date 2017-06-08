import React, { Component } from 'react'
import Typist from 'react-typist'

import LogInBox from './LogInBox'
import data from './data.js'

class HomePage extends Component {
  constructor (props) {
    super (props)

    this.state = {
      filter: null,
    }

    this.changeFilter = this.changeFilter.bind(this)
  }

  // Set a filter category in state, which will be used
  // to filter the squares
  changeFilter (category) {
    this.setState({
      filter: category
    })
  }

  render () {
    console.log('filter is', this.state.filter)

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
            <div className='column'>
              SHOP
              <div className='menu'>
                <div onClick={(category) => this.changeFilter('pant')}>PANTS</div>
                <div onClick={(category) => this.changeFilter('shirt')}>SHIRTS</div>
                <div onClick={(category) => this.changeFilter('knittop')}>KNIT TOPS</div>
                <div onClick={(category) => this.changeFilter('tshirt')}>TSHIRTS</div>
                <div onClick={(category) => this.changeFilter('jacket')}>JACKETS</div>
                <div onClick={(category) => this.changeFilter('sweatshirt')}>SWEATSHIRTS</div>
                <div onClick={(category) => this.changeFilter('sweater')}>SWEATERS</div>
                <div onClick={(category) => this.changeFilter('vest')}>VESTS</div>
                <div onClick={(category) => this.changeFilter('footwear')}>FOOTWEAR</div>
                <div onClick={(category) => this.changeFilter('accessory')}>ACCESSORIES</div>
              </div>
            </div>
            <div className='column'>CAMPAIGN</div>
            <div onClick={(category) => this.changeFilter(null)} className='column'style={{backgroundImage: 'url(../assets/nicecollective.logo.svg)'}}>NICE RESET</div>
            <div className='column'>CULTURE
              <div className='menu'>
                <div>COLLECTIVE</div>
                <div>PLASTIKI</div>
                <div>N.I.C.E. FUTURE</div>
            </div>
              </div>
            <div className='column'>CONTACT
              </div>
            </div>
        </section>

        <section className='modularsection'>
          {data.squares.map((square, i) => {
            // If filter is set/on, return only objects (squares) whose kind matches
            if (this.state.filter) {
              if (square.kind !== this.state.filter) {
                return
              }
            }


            
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

            // var name = 'jeff'
            // want this string: (hello jeff)

            // '(hello ' + name + ')'
            //  (hello     jeff    )

            if (square.media.includes('png') || square.media.includes('gif') || square.media.includes('jpg')) {
              return (
                <div
                  className={className}
                  key={i}
                  style={{backgroundImage: 'url(../assets/' + square.media + ')'}}
                  role='presentation'>
                    <div className='modularinset'>
                      <div className='pinbottom'>
                        <div className='insetinfo'>
                          <div className='title'>
                            <div className='titletext'>{square.title}</div>
                          </div>
                          <div className='pricesku'>
                            <div className='sku'>{square.sku}</div>
                            <div className='pricing'>
                              <div className='titletext'>{square.price}</div>
                            </div>
                          </div>
                        </div>

                        <div className='insetbuttons'>
                          <div className='sharebutton'>SHARE</div>
                          {square.product == true && <div className='buybutton'>BUY</div>}
                          {square.product == true && <div className='bagbutton'>BAG</div>}
                        </div>
                      </div>
                    </div>
                </div>
              )
            }

            if (square.media.includes('mp4') || square.media.includes('mov')) {
              return (
                <div
                  className={className}
                  key={i}>
                  <video autoPlay muted loop preload='auto'>
                    <source src={'../assets/' + square.media} />
                  </video>
                  PUT MODULAR INSET DIV HERE WHEN FINISHED_ selectors and hover states (CSS)
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
