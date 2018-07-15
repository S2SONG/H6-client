import React from 'react';
import {View, Text, SafeAreaView, ScrollView, Dimensions, FlatList} from 'react-native';
import {Button} from 'react-native-elements';
import styles from "./HomeStyles";
import {TitleView} from "../../ui/TitleView";
import {bindActionCreators} from "redux";
import * as home from "../../../modules/home";
import {connect} from "react-redux";
import {HomeVote} from "./ui/HomeVote";
import {LinkText} from "../../ui/LinkText";
import {VoteListItem} from "./ui/VoteListItem";


class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount(){
        const {Home} = this.props;
        await Home.initState();
        this.getVote();
        this.getPastVote(this.props.pastVote.length/3+1, 3);
    }

    getVote = () => {
        const {Home} = this.props;
        Home.getVote();
    };

    getPastVote = (page, count) => {
        const {Home} = this.props;
        Home.getPastVote(page, count);
    };

    navigationCurrentVote = () => {
        this.props.navigation.navigate('currentVote', {getVote:this.getVote});
    };

    navigationPastVoteList = () => {
        this.props.navigation.navigate('pastVoteList');
    };

    navigationPastVote = (index) => {
        this.props.navigation.navigate('pastVote', {voteTopicIndex:index});
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
                    <View style={{height:47}}/>
                    <View style={{width:330, flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{alignSelf:'flex-start'}}>지난 투표</Text>
                        <LinkText value={'더 보기'} link_style={{alignSelf:'flex-end'}} handle={this.navigationPastVoteList}/>
                    </View>
                    <View style={{width:330}}>
                        <FlatList
                            style={{flexGrow: 1, backgroundColor: 'white'}}
                            data={this.props.pastVote}
                            keyExtractor={(x, i) => i}
                            renderItem={({item}) => <View><View style={{height:12}}/><VoteListItem topic={item.topicName} handle={()=>this.navigationPastVote(item.voteTopicIndex)}/></View>}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


export default connect((state) => ({
    voteItemList: state.home.voteItemList,
    voteTopic: state.home.voteTopic,
    pastVote: state.home.pastVote,
    }),
    (dispatch) => ({
        Home: bindActionCreators(home, dispatch)
    })
)(HomeScreen);

