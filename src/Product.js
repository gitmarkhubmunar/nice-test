import React, { Component } from 'react'

import LogInBox from './LogInBox'
import data from './data.js'



class Product extends Component {
  constructor (props) {
    super (props)

    this.state = {
      filter: null,
    }

    this.changeFilter = this.changeFilter.bind(this)
    this.renderModularInset = this.renderModularInset.bind(this)
  }

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

        <section className='productdisplay'>

       		<div className='left'>
       			<div className='columncontent'>
			        <div>SYSTEM LEATHER JACKET</div>
			        <div className='skunumber'>172278M176001</div>
			        <div className='productdiscription'>Supple Lamb skin off-black, semi-matte leather.
						Deep reach angled front welt pockets for comfort.
						Slim modern cut with full lining.
						#10 metal oxidized black YKK hardened metal zipper.
						Convertible leather hood.
						Moto styling with a slight raw industrial construction.
						Raw shoulder sleeve pocket.
						Vented for varying weather conditions.
						Moto style banded collar wearing option.
					</div>
			     </div>
        	</div>

	        <div className='middle'>
	        	Mid section
	        	<div className='productpreview'></div>
	        	<div className='productpreview'></div>
	        	<div className='productpreview'></div>
	        	<div className='productpreview'></div>
	        	<div className='productpreview'></div>
	        	<div className='productpreview'></div>
	        	<div className='productpreview'></div>
	        	<div className='productpreview'></div>
        	</div>

        	<div className='right'>
        		<div className='columncontent'>
			        <div>$2565 USD</div>
			        <div className='shippingcopy'>Free shipping on orders over $200 and free returns in the United States.

			        	<p> View Size Chart
			        	</p>
			        </div>
			        	
			        	<div className='shopsizebutton'>SELECT A SIZE</div>
			        	<div className='addtobagbutton'>ADD TO BAG</div>
			        </div>
        	</div>

        </section>


			</div>
    )
  }
}

export default Product
