import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
import App from './app/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index'
// import registerServiceWorker from './sw';

let store = createStore(reducers, applyMiddleware(thunk));

// Init VK App
connect.send('VKWebAppInit', {});
connect.send("VKWebAppGetGeodata", {});

// Если вы хотите, чтобы ваше веб-приложение работало в оффлайне и загружалось быстрее,
// расскомментируйте строку с registerServiceWorker();
// Но не забывайте, что на данный момент у технологии есть достаточно подводных камней
// Подробнее про сервис воркеры можно почитать тут — https://vk.cc/8MHpmT 
// registerServiceWorker();

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>, 
document.getElementById('root'));
