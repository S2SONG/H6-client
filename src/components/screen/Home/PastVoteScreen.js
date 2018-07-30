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
import EStyleSheet from "react-native-extended-stylesheet";

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
                        {i == 0 ? <View style={styles.selectButtonSpace}/> : null}
                    </View>
                )
            })
        )
    };

    renderFooter = () => {

        if(this.props.voteItemList.length != 0) {
            const dataStyle = EStyleSheet.create({
                totalCount:{
                    fontSize: '0.7857rem',
                    color: 'rgba(0,0,0,0.3)',
                    marginBottom: '0.4286rem',
                    marginTop: '2.0714rem'
                },
                percent1: {
                    width: `${this.props.percent1 * 0.7}%`,
                    height: '0.857rem',
                    backgroundColor: this.props.selectIndex == this.props.voteItemList[0].voteItemIndex ? '#4a4a4a' : '#d8d8d8',
                    alignSelf: 'center',
                    borderBottomLeftRadius: '3.57rem',
                    borderTopLeftRadius: '3.57rem'
                },
                percent2: {
                    width: `${this.props.percent2 * 0.7}%`,
                    height: '0.857rem',
                    backgroundColor: this.props.selectIndex == this.props.voteItemList[1].voteItemIndex ? '#4a4a4a' : '#d8d8d8',
                    alignSelf: 'center',
                    borderBottomRightRadius: '3.57rem',
                    borderTopRightRadius: '3.57rem'
                },
                percent1Text:{
                    fontSize:'1rem',
                    marginRight: '0.5rem',
                    alignSelf:'center',
                },
                percent2Text:{
                    fontSize:'1rem',
                    marginLeft:'0.5rem',
                    alignSelf:'center',
                }
            });
            return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={dataStyle.totalCount}>총 {this.props.voteTopic.totalCount}명 참여</Text>
                    <View style={{flexDirection: 'row', width:'100%'}}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '50%',
                        }}>
                            <View/>
                            <View/>
                            <View style={{flexDirection: 'row', alignSelf: 'flex-end', justifyContent:'flex-end'}}>
                                <Text style={dataStyle.percent1Text}>{this.props.percent1}%</Text>
                                <View style={dataStyle.percent1}/>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', width: '50%'}}>
                            <View style={dataStyle.percent2}/>
                            <Text style={dataStyle.percent2Text}>{this.props.percent2}%</Text>
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

