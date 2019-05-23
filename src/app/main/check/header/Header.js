import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import './Header.css';
import logo from '../../../img/logo/logo.png';
import { PanelHeaderContent,  PanelHeader, Epic, TabbarItem, Tabbar, Div } from '@vkontakte/vkui';

class Header extends React.Component {  
    constructor (props) {
		super(props);
    } 

    render() {
        const { left } = this.props;

		return (
                <PanelHeader
                    noShadow
                    left={left}
                >
                    <PanelHeaderContent>
                        <img className="logo" src={logo} alt="Logo"/>
                    </PanelHeaderContent>
                </PanelHeader>  
        )
    }
}

export default Header;