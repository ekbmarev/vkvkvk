import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import './Participate.css';
import { Panel,  Group, Div, Tooltip, Gallery } from '@vkontakte/vkui';
import Header from '../header/Header';
import Icon24Clock from '../../icons/16/clock';
import Icon24Gift from '../../icons/16/gift';
import Icon24Smile from '../../icons/16/smile';
import Icon24Trophy from '../../icons/16/trophy';

class Raffle extends React.Component {  
    constructor (props) {
        super(props);
        
        this.state = {
            clockTooltip: false,
        };

        this.clockClick = this.clockClick.bind(this);
    } 

    clockClick () {
        this.setState({ clockTooltip: true })
    }

    render() {
        const { id, openSheet } = this.props;

		return (
            <View id={id} activePanel={id}>
            <Panel id={id}>
                <Header/>
                <Div className="header-title"><span>Участвую</span></Div>
                <Div>
                    <Group className="thumb-group">
                        <Gallery
                            className="thumb-gallery"
                            onClick={openSheet}
                            slideWidth="100%"
                            style={{ height: 150 }}
                            bullets="checkpot"
                        >
                            <div style={{ backgroundColor: 'var(--accent)' }} />
                            <div style={{ backgroundColor: 'var(--button_commerce_background)' }} />
                            <div style={{ backgroundColor: 'var(--destructive)' }} />
                        </Gallery>
                        <Div className="product-thumb">
                            
                                <span>Грильный гриль</span>
                                <h3 className="thumb-header">Оригинальный Стейк Рибай с соусом</h3>
                                <div className="thumb-icon-container">
                                    <Tooltip    isShown={this.state.clockTooltip} 
                                                onClose={() => this.setState({ clockTooltip: false })}
                                                text="Время до окончания розыгрыша">

                                        <div onClick={this.clockClick} className="thumb-icon-cell">
                                                <span><Icon24Clock className="thumb-icon"/>01:34</span>
                                        </div>
                                    </Tooltip>
                                    <div className="thumb-icon-cell"><span><Icon24Gift className="thumb-icon"/>3</span></div>
                                    <div className="thumb-icon-cell"><span><Icon24Smile className="thumb-icon"/>13</span></div>
                                    <div className="thumb-icon-cell"><span><Icon24Trophy className="thumb-icon"/>3 место</span></div>
                                </div>
                            
                        </Div>
                    </Group>
                </Div>
            </Panel>
        </View> 
        )
    }
}

export default Raffle;