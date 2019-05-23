import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index'
import { View } from '@vkontakte/vkui';
import './Main.css';
import PropTypes from 'prop-types';
import { Alert,  Group, Div, Epic, TabbarItem, Tabbar, Root, Gallery } from '@vkontakte/vkui';
import Raffle from './raffle/Raffle';
import Participate from './participate/Participate';
import Past from './past/Past';
import Icon24Gift from '../icons/24/gift';
import Icon24Notebook from '../icons/24/notebook';
import Icon24Trophy from '../icons/24/trophy';
import Product from './raffle/product/Product';
import ParticipateProduct from './participate/product/Product';

class Main extends React.Component {  
    constructor (props) {
		super(props);
	
		this.state = {
            event: null,
            activeView: "main",
			activeStory: 'raffle',
			popout: null
		};

        this.openEvent = this.openEvent.bind(this);
        this.openParticipate = this.openParticipate.bind(this);
        this.goBack = this.goBack.bind(this);
        this.onStoryChange = this.onStoryChange.bind(this);
        this.openAlert = this.openAlert.bind(this);

        this.props.getRaffles();
    } 

    //#region  Methods

    
    onStoryChange (e) {
        this.setState({ activeStory: e.currentTarget.dataset.story })
    }

    goBack () {
        this.setState({ activeView: 'main'})
    }

    openEvent (event) {
        this.setState({ event: event})
        this.setState({ activeView: 'raffleProduct'})
    }

    openParticipate () {
        this.setState({ activeView: 'participateProduct'})
    }

    openPast () {
        this.setState({ activeView: 'participateProduct'})
    }

    openAlert(){
        this.setState({ popout: 
        <Alert actions={[{
            title: 'Да, подтверждаю',
            autoclose: true,
            style: 'cancel'
        }]}

            onClose={()=>this.setState({ popout: null })}>
            <Div><span className="check-alert-title">Вы достигли возраста</span></Div>
            <p>Необходимо подтвердить, что Вам действительно исполнилось 18 лет.</p>
        </Alert> })
    }

    //#endregion

    render() {

        //this.openAlert();
        
		return (
            <Root activeView={this.state.activeView}>
                <View popout={this.state.popout} id="main">
                    <Epic activeStory={this.state.activeStory} tabbar={
                        <Tabbar>
                        <TabbarItem
                            onClick={this.onStoryChange}
                            selected={this.state.activeStory === 'raffle'}
                            data-story="raffle"
                            text="Все розыгрыши"
                        ><Icon24Gift /></TabbarItem>
                        <TabbarItem
                            onClick={this.onStoryChange}
                            selected={this.state.activeStory === 'participate'}
                            data-story="participate"
                            text="Участвую"
                        ><Icon24Notebook /></TabbarItem>
                        <TabbarItem
                            onClick={this.onStoryChange}
                            selected={this.state.activeStory === 'past'}
                            data-story="past"
                            label="1"
                            text="Прошедшие"
                        ><Icon24Trophy /></TabbarItem>
                        </Tabbar>
                    }>
                        <Raffle events={this.props.events} id="raffle" openEvent={this.openEvent}/>
                        <Participate id="participate" openSheet={this.openParticipate}/>
                        <Past id="past"/>
                    </Epic>
                </View>
                <Product id="raffleProduct" event={this.state.event} goBack={this.goBack}/>
                <ParticipateProduct id="participateProduct" goBack={this.goBack}/>
            </Root>
        )
    }
}

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps, actionCreators)(Main);