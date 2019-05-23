import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import './Past.css';
import { Panel,  Group, Div, Button, Gallery, FixedLayout, HeaderButton} from '@vkontakte/vkui';
import WinPanel from './pages/WinPanel';
import Header from '../header/Header';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Clock from '../../icons/16/clock';

class Raffle extends React.Component {  
    constructor (props) {
        super(props);
        
        this.state = {
            clockTooltip: false,
            activePanel: "common"
        };

        this.onClick = this.onClick.bind(this);
        this.goBack = this.goBack.bind(this);
    } 

    onClick () {
        this.setState({ activePanel: "info" })
    }

    goBack () {
        this.setState({ activePanel: "common" })
    }

    render() {
        const { id } = this.props;

		return (
            <View id={id} activePanel={this.state.activePanel}>
            <Panel id="common">
                <Header/>
                <Div className="header-title"><span>Прошедшие</span></Div>
                <Div>
                    <Group className="thumb-group">
                        <Gallery
                            className="thumb-gallery"
                            slideWidth="100%"
                            style={{ height: 150 }}
                            bullets="checkpot"
                        >
                            <div style={{ backgroundColor: 'var(--destructive)' }} />
                            <div style={{ backgroundColor: 'var(--button_commerce_background)' }} />
                            <div style={{ backgroundColor: 'var(--accent)' }} />
                        </Gallery>
                        <Div className="product-thumb">
                            
                                <span>Грильный гриль</span>
                                <h3 className="thumb-header">Оригинальный Стейк Рибай с соусом</h3>
                                <div className="thumb-past-container">
                                    <Button onClick={this.onClick}><span>Забрать приз</span></Button>
                                    <span><Icon24Clock className="thumb-past-icon"/> Окончен</span>
                                </div>
                            
                        </Div>
                    </Group>
                </Div>
            </Panel>
            <WinPanel goBack={this.goBack} id="info"/>
        </View> 
        )
    }
}

export default Raffle;