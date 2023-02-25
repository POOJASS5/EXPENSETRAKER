import React from 'react'
import classes from './Header.module.css'
import { NavLink } from 'react-router-dom'
// import CartContext from '../../store/cart-context'
const Header = () => {
  // const cartCtx = useContext(CartContext)

  return (
    <header className={classes.header}>
      {/* <h4>E-commerce</h4> */}
      <ul className={classes.navList}>
        <li>
          {/* <NavLink activeClassName={classes.active} to='/home'> */}
          HOME
          {/* </NavLink> */}
        </li>
        <li>
          {/* <NavLink activeClassName={classes.active} to='/store'> */}
          PRODUCTS
          {/* </NavLink> */}
        </li>
        <li>
          {/* <NavLink activeClassName={classes.active} to='/about'> */}
          ABOUT Us
          {/* </NavLink> */}
        </li>
      </ul>
    </header>
  )
}

export default Header