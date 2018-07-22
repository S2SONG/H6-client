import React from 'react';
import {View, Text, ScrollView, AsyncStorage, SafeAreaView, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import HTML from 'react-native-render-html';
import {TitleView} from "../../ui/TitleView";

export class TermScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            title:'',
            content:'<h1></h1>',
        }
    }

    componentDidMount(){
        this.setState({
            title:this.props.navigation.getParam('title', ''),
            content:this.props.navigation.getParam('content','<h1></h1>')
        });
    }

    navigationBack = () => {
        this.props.navigation.goBack();
    };
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TitleView title={this.state.title} rightIcon={'md-close'} rightIconHandler={this.navigationBack}/>
                <ScrollView style={styles.contentContainer}>
                    <HTML html={this.state.content}/>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

TermScreen.propTypes = {
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    contentContainer:{
        flexGrow:1,
        backgroundColor:'white',
        paddingLeft:22,
        paddingRight:22
    }
});
