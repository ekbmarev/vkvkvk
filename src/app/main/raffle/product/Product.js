import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import './Product.css';
import {Alert, Panel, ActionSheet, ActionSheetItem, FixedLayout, HeaderButton, Div, Button,
    HorizontalScroll, Avatar, Group, Cell } from '@vkontakte/vkui';
import Header from './header/Header';
import Check from '../../check/Check';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Qrcode from '../../../icons/24/qrcode';
import Icon24Pencil from '../../../icons/24/pencil';
import Icon24Label from '../../../icons/14/label';

class Product extends React.Component {  
    constructor (props) {
		super(props);
	
		this.state = {
            activePanel: "product",
            popout: null
        };

        connect.subscribe((e) => 
            {if (e.detail.type === 'VKWebAppOpenQRResult') {
                this.setState({ popout: <Alert actions={[{
                    title: 'Отмена',
                    autoclose: true,
                    style: 'cancel'
                }, {
                    title: 'Добавить',
                    autoclose: true,
                }]} 

                onClose={()=>this.setState({ popout: null })}><p>{e.detail.data.qr_data}</p></Alert> })
            }}
        );

        this.openSheet = this.openSheet.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
        this.qrScan = this.qrScan.bind(this);
        this.goBack = this.goBack.bind(this);
    } 

    //#region Methods

    async qrScan () {
        this.setState({ popout: null });
        connect.send("VKWebAppOpenQR");
    }

    checkEnter () {
        this.setState({ activePanel: 'check', popout: null })
    }

    goBack () {
        this.setState({ activePanel: 'product'})
    }

    openSheet () {
        this.setState({ popout:
            <ActionSheet
                onClose={() => this.setState({ popout: null })}
            >
                <ActionSheetItem onClick={this.qrScan}>
                    <Icon24Qrcode $class="button-icon"/>
                    Сканировать
                </ActionSheetItem>
                <ActionSheetItem onClick={this.checkEnter}>
                    <Icon24Pencil $class="button-icon"/>
                    Ручной ввод
                    </ActionSheetItem>
                <ActionSheetItem autoclose theme="cancel">Отменить</ActionSheetItem>
            </ActionSheet>
        });
    }

    //#endregion

    render() {
        const { event } = this.props;

        const itemStyle = {
            flexShrink: 0,
            width: 80,
            height: 94,
            display: 'flex',
            flexDirection:
            'column',
            alignItems: 'center',
            fontSize: 12
          };

		return (            
            <View popout={this.state.popout} activePanel={this.state.activePanel}>
                <Panel id="product">
                    <Header left={
                            <HeaderButton onClick={this.props.goBack}>
                                <Icon28ChevronBack/>
                            </HeaderButton>} 
                        />
                    <Group>
                        <Div>
                            <h1>{event.prize.name}</h1>
                            <HorizontalScroll>
                                <div style={{ display: 'flex' }}>
                                    {event.prizes.map((prize) => 
                                        <div style={{ ...itemStyle, paddingLeft: 4 }}>
                                            <Avatar size={64} style={{ marginBottom: 8 }} src={prize.photo}/>
                                            1 место
                                        </div>
                                    )}                                    
                                </div>
                                </HorizontalScroll>
                        </Div>
                    </Group>
                    <Group>
                        <Div className="product-stat">
                            <Cell description="Призов"><span>{event.prizesCount}</span></Cell>
                        </Div>   
                        <Div className="product-stat">
                            <Cell description="Мест"><span>200</span></Cell>
                        </Div>
                        <Div className="product-stat">
                            <Cell description="Участвует"><span>128</span></Cell>
                        </Div>
                    </Group>
                    <Group>
                        <Div>
                            <h3>Описание</h3>
                            <Cell
                                before={<Avatar size={48}><Icon24Pencil /></Avatar>}
                                >
                                Буковски гриль
                            </Cell>
                            <p>Если ты не любишь мясо-гриль, у тебя мало шансов полюбить Bukowski. Bukowski много мяса. Еште мясо вместе </p>
                            <span className="icon-span"><Icon24Label className="icon"/>ул. Белинского 18</span>
                            <h3>Чек от 1000 руб</h3>
                        </Div>   
                    </Group>
                    <Group>
                        <Div>
                            <h5 className="garant-title">Гарантированный приз</h5>
                            <Cell
                                size="l"
                                before={<Avatar size={64}><Icon24Pencil /></Avatar>}
                                description={<span>12 мест</span>}
                                >
                                <h4 className="garant-description">Экскурсия на закрытый мастер класс в гриль бар</h4>
                            </Cell>
                        </Div>   
                    </Group>
                    <Div/><Div/><Div/>
                    <FixedLayout vertical="bottom">
                        <Div>
                            <Button size="xl" onClick={this.openSheet}><Icon24Qrcode $class="button-icon"/><span>Сканировать чек</span></Button>
                        </Div>
                    </FixedLayout>
                </Panel>
                <Check id="check" parent={this} goBack={this.goBack}/>
            </View>
        )
    }
}

export default Product;