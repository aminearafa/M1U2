import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../styles/components/layout/Nav.css';


const Nav = (props) => {
    return (
      <nav>
        <div className="holder">
          <ul>
            <li><NavLink activeClassName='activo' exact to="/">Home</NavLink></li>
            <li><NavLink activeClassName='activo' exact to="/nosotros">Nosotros</NavLink></li>
            <li><NavLink activeClassName='activo' exact to="novedades">Novedades</NavLink></li>
            <li><NavLink activeClassName='activo' exact to="/contacto">Contacto</NavLink></li>
          </ul>
        </div>
      </nav>
    );
}

export default Nav;