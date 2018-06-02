import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as evaluation from "../../../modules/evaluation";
import {StatusBar,SafeAreaView, Text, View} from "react-native";
import styles from "./EvaluationScreenStyles";
//import Ionicon from 'react-native-vector-icons/Ionicons';
import {Icon} from 'react-native-elements';

class EvaluationScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    navigationGoBack = () => {
        this.props.navigation.goBack();
    };

    renderHeader = () => {
        return (
            <View style={styles.renderHeader}>
                <Text style={styles.renderHeaderTitle}>강의명</Text>
            </View>
        )
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#717882"
                           translucent={true}
                />
                <View style={styles.statusBar}/>
                <View style={styles.titleBar}>
                    <Icon name={'ios-arrow-back-outline'} type='ionicon' size={24} color={'black'}
                          onPress={this.navigationGoBack}/>
                    {this.props.header?<Text style={{color: 'white', fontSize: 18, alignSelf: 'center'}}></Text>:<View/>}
                    <View></View>
                </View>
                {this.renderHeader()}
            </SafeAreaView>
        )
    }

}

export default connect((state) => ({
    }),
    (dispatch) => ({
        Evaluation: bindActionCreators(evaluation, dispatch)
    })
)(EvaluationScreen);
