import React from 'react';
import {View, Text, Button, Animated, RefreshControl, Platform, StatusBar} from 'react-native';
import styles from "./HomeStyles";

export class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
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