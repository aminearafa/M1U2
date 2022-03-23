import React from 'react';
import '../../styles/components/layout/Header.css 1';

const Header = (props) =>{
    return (
        <header>
            <div className="holder">
                <div className="logo">
                    <img src="images/logo.png" width="10O" alt="Transportes X" />
                    <hl>Transportes X</hl>
                </div>
            </div>
        </header>
    );
}

export default Header;