import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';
import './App.css';
import { Root } from '@vkontakte/vkui';
import Main from './main/Main';

class App extends React.Component {
	constructor (props) {
		super(props);
	
		this.state = {
			activeView: 'main',
			fetchedUser: null,
		};
	}
	
		componentDidMount() {
			connect.subscribe((e) => {
				switch (e.detail.type) {
					case 'VKWebAppGetUserInfoResult':
						this.setState({ fetchedUser: e.detail.data });
						break;
					case 'VKWebAppGeodataResult':
						console.log(e.detail.data);
						//this.props.setGeo(e.detail.data);
						break;
					case 'VKWebAppGetPhoneNumberResult':
						console.log(e.detail.data);
						//this.props.setGeo(e.detail.data);
						break;
					default:
						console.log(e.detail.type);
				}
			});
			connect.send('VKWebAppGetUserInfo', {});
			connect.send("VKWebAppGetPhoneNumber", {});
			connect.send("VKWebAppGetGeodata", {});

		}

	render() {
		return (
				<Main id="main" $this={this}/>
		  );
	}
}

export default App;
