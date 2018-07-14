import React from 'react';
import {Text, View, SafeAreaView, StyleSheet, StatusBar, ActivityIndicator, FlatList, ScrollView,ActionSheetIOS} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Ionicon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import HeaderImageScrollView, {TriggeringView} from 'react-native-image-header-scroll-view';
import {bindActionCreators} from "redux";
import * as lectureInfo from "../../../modules/lectureInfo";
import {connect} from "react-redux";
import {LectureReplyListItem} from "./ui/LectureReplyListItem";
import styles from "./LectureInfoStyles";
import {ScoreIndicator} from "./ui/ScoreIndicator";
import {CustomModal} from "../../ui/CustomModal";
import * as evaluation from "../../../modules/evaluation";

class LectureInfoScreen extends React.Component {

    //"average": 1,
// "lectureInfoIndex": 2,
// "lectureName": "os",
// "professorName": "신준태",
// "replyCount": 0,
// "track": "computer science",
// "updatedAt": "2018-05-07T18:33:42.000Z",

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.lectureReplyInit();
    }

    lectureReplyInit = async () => {
        const {LectureInfo} = this.props;
        const lecture = this.props.navigation.getParam('lecture', {});
        await LectureInfo.lectureReplyInit();
        await LectureInfo.onChangeLecture(lecture);
        await LectureInfo.getLectureReplyList(this.props.lecture.lectureInfoIndex, this.props.currentPage, this.props.lectureReplyListLength);

        const {Evaluation} = this.props;
        await Evaluation.initReplyState();
        await Evaluation.getReplyIndex(this.props.lecture.lectureInfoIndex);
        console.log('didmount'+this.props.reply.lectureReplyIndex);
    };

    renderListFooter = () => {
        const {LectureInfo} = this.props;
        return (
            <View style={{marginBottom: 20}}>
                {(this.props.lectureReplyListLength < this.props.total ?
                        <Button title='더보기'
                                onPress={() => LectureInfo.getLectureReplyList(this.props.lecture.lectureInfoIndex, this.props.currentPage, this.props.lectureReplyListLength)}/>
                        : null)}
            </View>
        )
    };

    renderListHeader = () => {
        return <TriggeringView onHide={()=>this.onChangeHeaderTitle(true)} onDisplay={()=>this.onChangeHeaderTitle(false)}/>
    };

    navigationGoBack = () => {
        this.props.navigation.navigate('lecture');
    };

    navigationGoEval = () => {
        this.props.navigation.navigate('Evaluation');
    };

    renderArrow = () => {
        return (
            <View style={styles.arrow}>
                <Icon name={'ios-arrow-back-outline'} type='ionicon' size={28} color={'black'}
                      onPress={this.navigationGoBack}/>
            </View>
        )
    };

    renderHeader = () => {
        return (
            <View style={styles.title}>
                <View style={{alignSelf:'flex-start',width:'50%'}}>
                    <Text style={styles.renderHeaderTitle}>{this.props.lecture.lectureName}</Text>
                    <Text style={{fontSize:11, opacity:40, paddingTop:10, color:'rgb(176,176,176)',paddingLeft:8}}>
                            {this.props.lecture.track} / {this.props.lecture.professorName} 교수님</Text>

                    <View style={{margin:5,width:'40%',paddingTop:10}}>
                        <ScoreIndicator
                            rating={Math.ceil(this.props.lecture.average * 2) / 2}/>
                    </View>
                </View>
                {this.renderCheck()}
            </View>
        )
    };

    getLectureReplyIndex = () => {
        const {Evaluation} = this.props;
        Evaluation.getReplyIndex(this.props.lecture.lectureInfoIndex);
    };

    renderCheck =() => {
        // const replyIndex = this.props.reply.lectureReplyIndex;
        // console.log(replyIndex);
        // this.getLectureReplyIndex();
        // if(this.props.lecture.lectureInfoIndex!=undefined)
        console.log(this.props.reply.lectureReplyIndex);
        return(
            <View style={{width:'85%', alignSelf:'flex-start', paddingRight:-20}}>
                <Icon
                    name='kebab-horizontal'
                    type='octicon'
                    color='black'
                    onPress={this.renderModalPicker}/>
            </View>
        )
        // else return(
        //     <View><Text title={'글써야대'}/></View>
        // )
    };


    renderWrite = () => {
        return(
            <View>
                <Icon name='note' type='simple-line-icon' color={'white'} />
            </View>
        )
    };

    renderModalPicker = () => {
        ActionSheetIOS.showActionSheetWithOptions({
                options: ['취소', '내 강의평 수정하기','내 강의평 삭제하기'],
                //destructiveButtonIndex: 1,
                cancelButtonIndex: 0,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) { console.log('취소') }
                if (buttonIndex === 1) { this.props.navigation.navigate('Amend')}
                if (buttonIndex === 2) { this.removeReplyModalOpen() }
            });
    };

    removeReplyModalOpen = () => {
        const {Evaluation} = this.props;
        Evaluation.removeReplyModal(true);
    };

    removeReplyModalClose = () => {
        const {Evaluation} = this.props;
        Evaluation.removeReplyModal(false);
    };

    onChangeHeaderTitle = (check) => {
        const {LectureInfo} = this.props;
        LectureInfo.onChangeHeaderTitle(check);
    };

    removeReply = () => {
        //리플 삭제
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#717882"
                           translucent={true}
                />
                    <View style={styles.statusBar}/>
                    <View style={styles.renderHeader}>
                            {this.renderArrow()}
                            {this.renderHeader()}
                            </View>
                <ScrollView backgroundColor={"white"}>
                    <FlatList
                        data={this.props.lectureReplyList}
                        keyExtractor={(x,i)=>i}
                        ListHeaderComponent={this.renderListHeader}
                        ListFooterComponent={this.renderListFooter}
                        renderItem={({item}) => <LectureReplyListItem lectureReply={item}/>}
                        />
                </ScrollView>
                <ActionButton
                    buttonColor={'#4a4a4a'}
                    renderIcon = {this.renderWrite}
                    onPress={() =>this.navigationGoEval()}>
                </ActionButton>
                <CustomModal
                    visible={this.props.removeModal} close={this.removeReplyModalClose} height={172} width={280}
                    title={'신중한 삭제를 위해 한번 더 생각해주세요.\n정말 삭제하시겠어요?'} footerText={'삭제'} footer={true} footerHandle={this.removeReply}/>
            </SafeAreaView>
        )
    }
}

export default connect((state) => ({
        header: state.lectureInfo.header,
        lecture: state.lectureInfo.lecture,
        currentPage: state.lectureInfo.currentPage,
        lectureReplyList: state.lectureInfo.lectureReplyList,
        loading: state.lectureInfo.loading,
        total: state.lectureInfo.total,
        lectureReplyListLength: state.lectureInfo.lectureReplyListLength,
        removeModal:state.evaluation.removeModal,
        reply:state.evaluation.reply
    }),
    (dispatch) => ({
        LectureInfo: bindActionCreators(lectureInfo, dispatch),
        Evaluation: bindActionCreators(evaluation, dispatch)
    })
)(LectureInfoScreen);