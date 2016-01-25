import React, {
  StyleSheet,
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
import Detail from './Detail';
import Nav from '../components/Nav';

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


  componentWillUnmount() {
    this._onWillFocusSubscription.remove();
    this._onDidFocusSubscription.remove();
    this.navigationListend = false;
  }

  onWillFocus(event) {
    console.log(event);
  }

  onDidFocus(event) {
    console.log(event);
  }

  listenEvents = (navigator) => {
    if (!this.navigationListend) {
      this.navigationListend = true;
      const {navigationContext} = navigator;
      this._onWillFocusSubscription = navigationContext.addListener(
        'willfocus',
        this.onWillFocus,
      );
      this._onDidFocusSubscription = navigationContext.addListener(
        'didfocus',
        this.onDidFocus,
      );
    }
  };

  renderScene = (route, navigator) => {
    this.listenEvents(navigator);
    let Elem;
    let backable = true;
    console.log('routed', route);
    switch (route.name) {
      case 'List':
        Elem = List;
        backable = false;
        break;
      case 'Detail':
        Elem = Detail;
        break;
      default:
        break;
    }
    if (Elem.fetchData) {
      Elem.fetchData(store.getState, store.dispatch, route);
    }
    return (<View style={styles.container}>
      <Nav backable={backable} title={route.title} pop={navigator.pop}/>
      { Elem ? <Elem navigator={navigator} {...route.passProps}/> : <Text>404</Text>}
    </View>);
  };

  render() {
    return (
      <Provider store={store}>

        <Navigator
          initialRoute={{name: 'List', title: '首页'}}
          renderScene={this.renderScene}
        />

      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }

});
