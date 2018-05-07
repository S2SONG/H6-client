import React from 'react';
import {View, Text, Button, Animated, RefreshControl, Platform, StatusBar, SafeAreaView} from 'react-native';
import styles from "./LectureStyles";

export class LectureScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{flex:1, marginTop:StatusBar.currentHeight}}>

                <View style={{height:20}}>
                    <Text style={{color:'black'}}>Hello Lecture</Text>
                </View>
                <View style={{flex:1}}>

                </View>
                </View>
            </SafeAreaView>
        )
    }
}