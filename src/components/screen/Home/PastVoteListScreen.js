import React from 'react';
import {View, Text, SafeAreaView, ScrollView, Dimensions, FlatList} from 'react-native';
import {Button} from 'react-native-elements';
import styles from "./PastVoteListStyles";
import {TitleView} from "../../ui/TitleView";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {VoteListItem} from "./ui/VoteListItem";
import * as pastVote from "../../../modules/pastVote";


class PastVoteListScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount(){
        const {PastVote} = this.props;
        await PastVote.initState();
        PastVote.getPastVoteList(this.props.pastVoteList.length/3+1, 3);
    }

    navigationBack = () => {
        this.props.navigation.goBack();
    };

    navigationPastVote = (index) => {
        this.props.navigation.navigate('pastVote', {voteTopicIndex:index});
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TitleView title={'지난 투표'} leftIcon={'ios-arrow-back-outline'} leftIconHandler={this.navigationBack}/>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <FlatList
                        style={{flexGrow: 1, backgroundColor: 'white'}}
                        data={this.props.pastVoteList}
                        keyExtractor={(x, i) => i}
                        renderItem={({item}) => <View><View style={{height:12}}/><VoteListItem topic={item.topicName} handle={()=>this.navigationPastVote(item.voteTopicIndex)}/></View>}
                    />
                </ScrollView>
            </SafeAreaView>
        )
    }
}


export default connect((state) => ({
    pastVoteList: state.pastVote.pastVoteList,

    }),
    (dispatch) => ({
        PastVote: bindActionCreators(pastVote, dispatch)
    })
)(PastVoteListScreen);

