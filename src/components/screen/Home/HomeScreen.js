import React from 'react';
import {View, Text, Button, Animated, RefreshControl, Platform, StatusBar, AsyncStorage} from 'react-native';
import styles from "./HomeStyles";
import config from "../../../../config";

export class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.lectures();
    }

    lectures = async () => {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        const data = await fetch(`${config.server}/lecturesInfo?page=1&count=3`,{
            method: "GET",
            headers:{
                'x-access-token':token
            }
        });
        const jsonData = await data.json();
        console.log(jsonData);
    };

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