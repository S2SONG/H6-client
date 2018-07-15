import React from 'react';
import {View, Text, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import styles from "./PastVoteStyles";
import {TitleView} from "../../ui/TitleView";
import {bindActionCreators} from "redux";
import * as pastVote from "../../../modules/pastVote";
import {connect} from "react-redux";
import {BoxShadow} from 'react-native-shadow';
import {CurrentVoteButton} from "./ui/CurrentVoteButton";

class PastVoteScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const {PastVote} = this.props;
        await PastVote.initPastVote();
        await PastVote.getPastVote(this.props.navigation.state.params.voteTopicIndex);
        await this.checkVote();
    }

    navigationBack = () => {
        this.props.navigation.goBack();
    };

    checkVote = async () => {
        const {PastVote} = this.props;
        await PastVote.checkVote(this.props.voteTopic.voteTopicIndex);
    };


    renderBody = () => {
        return (
            this.props.voteItemList.map((item, i) => {
                return (
                    <View style={styles.bodyContainer} key={i}>
                        <CurrentVoteButton
                            title={item.itemName}
                            itemOrder={item.itemOrder}
                            voteItemIndex={item.voteItemIndex}
                            enable={false}
                            selected={this.props.selectIndex == item.voteItemIndex ? true : false}/>
                        {i == 0 ? <View style={{width: 61, height: 111}}/> : null}
                    </View>
                )
            })
        )
    };

    renderFooter = () => {
        if(this.props.voteItemList.length != 0) {
            return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 11,
                        color: 'rgba(0,0,0,0.3)',
                        marginBottom: 6,
                        marginTop: 29
                    }}>총 {this.props.voteTopic.totalCount}명 참여</Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '50%',
                            alignItems: 'center'
                        }}>
                            <View/>
                            <View/>
                            <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                                <Text style={{marginRight: 7}}>{this.props.percent1}%</Text>
                                <View style={{
                                    width: this.props.percent1 * 1.5,
                                    height: 12,
                                    backgroundColor: this.props.selectIndex == this.props.voteItemList[0].voteItemIndex ? '#4a4a4a' : '#d8d8d8',
                                    borderBottomLeftRadius: 50,
                                    borderTopLeftRadius: 50
                                }}/>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', width: '50%', alignItems: 'center'}}>
                            <View style={{
                                width: this.props.percent2 * 1.5,
                                height: 12,
                                backgroundColor: this.props.selectIndex == this.props.voteItemList[1].voteItemIndex ? '#4a4a4a' : '#d8d8d8',
                                alignSelf: 'flex-start',
                                borderBottomRightRadius: 50,
                                borderTopRightRadius: 50
                            }}/>
                            <Text style={{alignSelf: 'flex-start', marginLeft: 7}}>{this.props.percent2}%</Text>
                        </View>
                    </View>
                </View>
            )
        }
    };

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <TitleView title={'지난 투표 결과'} leftIcon={'ios-arrow-back-outline'}
                           leftIconHandler={this.navigationBack}/>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.mainContainer}>
                        <Text style={styles.topicText}>{this.props.voteTopic.topicName}</Text>
                        <View style={styles.bodyContainer}>
                        {this.renderBody()}
                        </View>
                        {this.renderFooter()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


export default connect((state) => ({
        voteItemList: state.pastVote.voteItemList,
        voteTopic: state.pastVote.voteTopic,
        percent1: state.pastVote.percent1,
        percent2: state.pastVote.percent2,
        selectIndex: state.pastVote.selectIndex,

    }),
    (dispatch) => ({
        PastVote: bindActionCreators(pastVote, dispatch)
    })
)
(PastVoteScreen);

