import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import styles from "./HomeStyles";
import {TitleView} from "../../ui/TitleView";
import {bindActionCreators} from "redux";
import * as home from "../../../modules/home";
import {connect} from "react-redux";
import {HomeVote} from "./ui/HomeVote";


class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.getVote();
    }

    getVote = () => {
        const {Home} = this.props;
        Home.getVote();
    };

    navigationCurrentVote = () => {
        this.props.navigation.navigate('currentVote', {getVote:this.getVote});
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TitleView title={'투표'}/>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <HomeVote
                        topic={this.props.voteTopic.topicName}
                        start_date={this.props.voteTopic.createdAt}
                        end_date={this.props.voteTopic.dueDate}
                        handle={this.navigationCurrentVote}/>


                </ScrollView>
            </SafeAreaView>
        )
    }
}


export default connect((state) => ({
    voteItemList: state.home.voteItemList,
    voteTopic: state.home.voteTopic,
    }),
    (dispatch) => ({
        Home: bindActionCreators(home, dispatch)
    })
)(HomeScreen);

