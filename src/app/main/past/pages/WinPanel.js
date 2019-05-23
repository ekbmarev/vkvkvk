import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import { Panel,  Group, Div, Button, Gallery, FixedLayout, HeaderButton} from '@vkontakte/vkui';
import Header from '../../header/Header';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';

class WinPanel extends React.Component {  
    constructor (props) {
        super(props);
        
        this.state = {
        };
    } 

    render() {
        const { id } = this.props;

		return (
            <Panel id={id} className="win-panel">
                <Header/>
                <Div className="win-header"><h2>Ура! Вы выиграли!</h2></Div>
                <Div>
                    <Group className="thumb-group">
                        <Gallery
                            className="thumb-gallery"
                            slideWidth="100%"
                            style={{ height: 150 }}
                            bullets="checkpot"
                        >
                            <div style={{ backgroundColor: 'var(--destructive)' }} />
                        </Gallery>
                        <Div className="product-thumb">
                            
                                <span>Грильный гриль</span>
                                <h3 className="thumb-header">Оригинальный Стейк Рибай с соусом</h3>
                                <div className="thumb-icon-container">
                                </div>
                            
                        </Div>
                    </Group>
                </Div>
                <FixedLayout vertical="bottom">
                        <Div>
                            <Button className="win-share-btn" size="xl">Поделиться</Button>
                        </Div>
                </FixedLayout>
            </Panel>
        )
    }
}

export default WinPanel;