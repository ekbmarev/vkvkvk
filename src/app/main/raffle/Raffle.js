import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import './Raffle.css';
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
            prizesTooltip: false,
            participantsTooltip: false,
            placeTooltip: false,
            events: []
        };
    } 

    render() {
        const { id, openEvent, events } = this.props;
        if(events) {
            
            if(this.state.events.length == 0)
            { 
                events.map(event => {    
                    event.prize = event.prizes[0];  
                    event.galleryChange = function(e) {
                        event.prize = event.prizes[e];
                    }              
                    this.state.events.push(event);
                })
            }
        }       
        
        const listItems = this.state.events.map((event) => 
            <Group className="thumb-group">
            <Gallery
                className="thumb-gallery"
                onClick={() => openEvent(event)}
                onChange={event.galleryChange}
                slideWidth="100%"
                style={{ height: 150 }}
                bullets="checkpot"
            >
                {
                    event.prizes.map((prize) => 
                        <div style={{ backgroundImage: 'url(' + prize.photo + ')', 
                            backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
                    )
                }
            </Gallery>
            <Div className="product-thumb">
                
                    <span>{event.placeName}</span>
                    <h3 className="thumb-header" key={event.prize.uuid}>{event.prize.name}</h3>
                    <div className="thumb-icon-container">
                        <Tooltip    isShown={this.state.clockTooltip} 
                                    onClose={() => this.setState({ clockTooltip: false })}
                                    text="Время до окончания розыгрыша">

                            <div onClick={()=>this.setState({ clockTooltip: true })} className="thumb-icon-cell">
                                    <span><Icon24Clock className="thumb-icon"/>{event.end}</span>
                            </div>
                        </Tooltip>
                        <Tooltip    isShown={this.state.prizesTooltip} 
                                    onClose={() => this.setState({ prizesTooltip: false })}
                                    text="Количество призов">
                            <div onClick={()=>this.setState({ prizesTooltip: true })} className="thumb-icon-cell">
                                <span><Icon24Gift className="thumb-icon"/>{event.prizesCount}</span>
                            </div>
                        </Tooltip>
                        <Tooltip    isShown={this.state.participantsTooltip} 
                                    onClose={() => this.setState({ participantsTooltip: false })}
                                    text="Количество участников">
                            <div onClick={()=>this.setState({ participantsTooltip: true })} className="thumb-icon-cell">
                                <span><Icon24Smile className="thumb-icon"/>{event.membersCount}</span>
                            </div>
                        </Tooltip>
                        <Tooltip    isShown={this.state.placeTooltip} 
                                    onClose={() => this.setState({ placeTooltip: false })}
                                    text="Приз за 3 место">
                            <div onClick={()=>this.setState({ placeTooltip: true })} className="thumb-icon-cell">
                                <span><Icon24Trophy className="thumb-icon"/>3 место</span>
                            </div>
                        </Tooltip>
                    </div>
                
            </Div>
        </Group> 
        );

		return (
            <View id={id} activePanel={id}>
            <Panel id={id}>
                <Header/>
                <Div className="header-title"><span>Все розыгрыши</span></Div>
                <Div>
                    {listItems}
                </Div>
            </Panel>
        </View> 
        )
    }
}

export default Raffle;