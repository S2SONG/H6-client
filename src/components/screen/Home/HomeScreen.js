import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Button} from 'react-native-elements';
import styles from "./HomeStyles";
import {TitleView} from "../../ui/TitleView";
import * as Animatable from 'react-native-animatable';


class ExampleView extends React.Component{

    render(){
        return(<View style={{width:200, height:50,backgroundColor:'red'}}>
        </View>)
    }
}

ExampleView = Animatable.createAnimatableComponent(ExampleView);
export class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TitleView title={'홈'}/>
                <ExampleView />
            </SafeAreaView>
        )
    }
}

