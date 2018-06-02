import React from 'react';
import {View, Text, Button, Animated, RefreshControl, Platform, StatusBar, AsyncStorage} from 'react-native';
import styles from "./HomeStyles";
import config from "../../../../config";

export class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Home
                </Text>
            </View>
        )
    }
}