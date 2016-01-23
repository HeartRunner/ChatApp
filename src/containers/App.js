import React, {
  Component,
  Text,
  View,
  Navigator,
} from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import devTools from 'remote-redux-devtools';

import middleware from '../libs/reduxMiddleware';
import reducer from '../modules/reducers';

import List from './List';

let finalCreateStore;
if (__DEV__) {
  console.log('Remote Redux Dev Tools Enabled');
  finalCreateStore = compose(
    applyMiddleware(middleware),
    devTools(),
  )(createStore);
} else {
  finalCreateStore = applyMiddleware(middleware)(createStore);
}

const store = finalCreateStore(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>

        <Navigator
          initialRoute={{name: '胡老丝', index: 0}}
          renderScene={(route, navigator) =>
            <List
              name={route.name}
              navigator={Navigator}
              push={navigator.push}
            />
          }
          navigationBar={<View>
              <Text>lalala</Text>
            </View>}
        />

      </Provider>
    );
  }
}
