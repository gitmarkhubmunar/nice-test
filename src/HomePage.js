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
    this.renderModularInset = this.renderModularInset.bind(this)
  }

  // Set a filter category in state, which will be used
  // to filter the squares
  changeFilter (category) {
    this.setState({
      filter: category
    })
  }

  renderModularInset (square) {
    return (
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
    )
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
            <div className='column'>CAMPAIGN
             <div className='menu'>
                <div>AIR JUMP</div>
                <div>PYRAMID LAKE</div>
                <div>3x3</div>
            </div>

            </div>
            <div onClick={(category) => this.changeFilter(null)} className='column logo'></div>
            <div className='column'>
            CULTURE
              <div className='menu'>
                <div>SOCIAL MEDIA</div>
                <div>EVENTS</div>
                <div>CURRENT PRESS</div>
                <div>CURRENT PROCESS</div>
                <div>PAST VIDEOS</div>
                <div>PAST LOOKBOOKS</div>
                <div>PAST EDITORIAL</div>
                <div>PAST ARTICLES</div>
                <div>ARCHIVAL PIECES</div>
                <div>PAST PROCESSES</div>
                <div>N.I.C.E. INSPIRATION</div>
            </div>
              </div>
            <div className='column'>CONTACT
              <div className='menu'>
                <div>APPOINTMENTS</div>
                <div>SHOP HOURS</div>
                <div>SF DOGPATCH</div>
            </div>

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

            if (square.media.includes('png') || square.media.includes('gif') || square.media.includes('jpg')) {
              return (
                <div
                  className={className}
                  key={i}
                  style={{backgroundImage: 'url(../assets/' + square.media + ')'}}
                  role='presentation'>
                    {this.renderModularInset(square)}
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
                  {this.renderModularInset(square)}
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
