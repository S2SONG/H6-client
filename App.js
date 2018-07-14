import React from 'react';
import {View, StyleSheet, BackHandler, StatusBar} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {SignNavigation} from "./src/components/navigations/SignNavigation";
import reducer from "./src/modules";

const store = createStore(reducer, applyMiddleware(ReduxThunk));

export default class App extends React.Component {

    componentDidMount(){
        //안드로이드 back button handle
        BackHandler.addEventListener('hardwareBackPress', function() {
            // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
            // Typically you would use the navigator here to go to the last state.
            return true;
        });
        StatusBar.setBarStyle('light-content',true);
    }

    render() {
        return (
        //redux store 사용
        <Provider store={store}>
            <SignNavigation/>
        </Provider>
        );
    }
}

//사용안함
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    statusBar: {
        backgroundColor: '#000000',
    }
});