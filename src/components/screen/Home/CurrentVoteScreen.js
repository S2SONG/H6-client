import React from 'react';
import {View, Text, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import styles from "./CurrentVoteStyles";
import {TitleView} from "../../ui/TitleView";
import {bindActionCreators} from "redux";
import * as currentVote from "../../../modules/currentVote";
import {connect} from "react-redux";
import {BoxShadow} from 'react-native-shadow';
import {CurrentVoteButton} from "./ui/CurrentVoteButton";
import TimerCountdown from 'react-native-timer-countdown';
import {util} from "../../../utils/util";


class CurrentVoteScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const {CurrentVote} = this.props;
        await CurrentVote.initState();
        await this.checkVote();
    }

    navigationBack = () => {
        this.props.navigation.goBack();
    };

    handleSelectIndex = (index) => {
        const {CurrentVote} = this.props;
        CurrentVote.handleSelectIndex(index);
        CurrentVote.handleSelect(true);
    };

    checkVote = async () => {
        const {CurrentVote} = this.props;
        await CurrentVote.checkVote(this.props.voteTopic.voteTopicIndex);
        await this.props.navigation.state.params.getVote();

    };

    postVote = async () => {
        const {CurrentVote} = this.props;
        const result = await CurrentVote.postVote(this.props.voteTopic.voteTopicIndex, this.props.selectIndex);
        if (result) {
            await this.checkVote();
        } else {

        }
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
                            handle={() => this.handleSelectIndex(item.voteItemIndex)}
                            enable={this.props.enable}
                            selected={this.props.selectIndex == item.voteItemIndex ? true : false}/>
                        {i == 0 ? <View style={{width: 61, height: 111}}/> : null}
                    </View>
                )
            })
        )
    };

    renderFooter = () => {
        if (this.props.enable) {
            if (this.props.select) {
                return (
                    <TouchableOpacity onPress={this.postVote}>
                        <View style={styles.selectButton}>
                            <Text style={styles.selectButtonText}>선택 완료</Text>
                        </View>
                    </TouchableOpacity>
                )
            } else {
                return (
                    <View style={styles.selectView}>
                        <Text style={styles.selectButtonText}>선택 완료</Text>
                    </View>
                )
            }
        } else {
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
                <TitleView title={'진행중 투표'} leftIcon={'ios-arrow-back-outline'} leftIconHandler={this.navigationBack}/>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.mainContainer}>
                        <Text style={styles.topicText}>{this.props.voteTopic.topicName}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.timeText}>투표 종료까지 </Text>
                            <TimerCountdown
                                initialSecondsRemaining={this.props.seconds}
                                onTick={secondsRemaining => {}}
                                onTimeElapsed={() => console.log('complete')}
                                allowFontScaling={true}
                                style={{fontSize: 11}}
                            />
                        </View>
                        <Text style={styles.warnText}>제출된 선택은 수정이 안됩니다. 신중히 선택해주세요.</Text>
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
        voteTopic: state.home.voteTopic,
        voteItemList: state.home.voteItemList,
        percent1: state.home.percent1,
        percent2: state.home.percent2,
        seconds: state.home.seconds,
        enable: state.currentVote.enable,
        selectIndex: state.currentVote.selectIndex,
        select: state.currentVote.select,

    }),
    (dispatch) => ({
        CurrentVote: bindActionCreators(currentVote, dispatch)
    })
)
(CurrentVoteScreen);

