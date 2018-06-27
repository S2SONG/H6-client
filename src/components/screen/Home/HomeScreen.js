import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import styles from "./HomeStyles";
import config from "../../../../config";
import {TitleView} from "../../ui/TitleView";
import { TextField } from 'react-native-material-textfield';

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
                <TextField
                    label='Phone number'
                />
            </SafeAreaView>
        )
    }
}