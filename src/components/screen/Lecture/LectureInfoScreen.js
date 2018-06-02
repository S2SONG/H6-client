import React from 'react';
import {Text, View, SafeAreaView, StyleSheet, StatusBar, ActivityIndicator, FlatList} from 'react-native';
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
    };

    renderListFooter = () => {
        const {LectureInfo} = this.props;
        return (
            <View style={{marginBottom: 20}}>
                {this.props.loading ? <ActivityIndicator size="large" animating/> :
                    (this.props.lectureReplyListLength < this.props.total ?
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
        this.props.navigation.goBack();
    };

    navigationGoEval = () => {
        console.log("notes tapped!");
        this.props.navigation.navigate('Evaluation');
    };

    renderTitle = () => {
        return (
            <View style={styles.titleBar}>
                <Icon name={'ios-arrow-back-outline'} type='ionicon' size={24} color={'white'}
                      onPress={this.navigationGoBack}/>
                {this.props.header?<Text style={{color: 'white', fontSize: 18, alignSelf: 'center'}}>{this.props.lecture.lectureName}</Text>:<View/>}
                <View></View>
            </View>
        )
    };

    renderHeader = () => {
        return (
            <View style={styles.renderHeader}>
                <Text style={styles.renderHeaderTitle}>{this.props.lecture.lectureName}</Text>
                <StarRating
                    disabled={true}
                    emptyStar={'ios-star'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    iconSet={'Ionicons'}
                    maxStars={5}
                    rating={Math.ceil(this.props.lecture.average * 2) / 2}
                    fullStarColor={'#f8fa00'}
                    halfStarColor={'#f8fa00'}
                    halfStarEnabled={true}
                    starSize={20}
                />
            </View>
        )
    };

    onChangeHeaderTitle = (check) => {
        const {LectureInfo} = this.props;
        LectureInfo.onChangeHeaderTitle(check);
    };
    render() {

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#717882"
                           translucent={true}
                />
                <View style={styles.statusBar}/>
                <HeaderImageScrollView
                    style={{flex:1}}
                    maxHeight={200}
                    minHeight={50}
                    renderHeader={() => this.renderHeader()}
                    renderFixedForeground={() => this.renderTitle()}
                    ScrollViewComponent={FlatList}
                    scrollViewBackgroundColor={'#f5f5f5'}
                    data={this.props.lectureReplyList}
                    keyExtractor={(x,i)=>i}
                    ListHeaderComponent={this.renderListHeader}
                    ListFooterComponent={this.renderListFooter}
                    renderItem={({item}) => <LectureReplyListItem lectureReply={item}/>}
                >
                </HeaderImageScrollView>
                <ActionButton buttonColor="rgb(124,130,140)" title="글쓰기"
                                            onPress={()=>this.navigationGoEval()}>
                    <Ionicon name="md-create" style={styles.actionButtonIcon}/>
                    {/*<ActionButton.Item buttonColor='#9b59b6' title="글쓰기"*/}
                                       {/*onPress={() => this.navigationGoEval()}>*/}
                        {/*<Ionicon name="md-create" style={styles.actionButtonIcon}/>*/}
                    {/*</ActionButton.Item>*/}
                    {/*<ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {*/}
                    {/*}}>*/}
                        {/*<Ionicon name="md-notifications-off" style={styles.actionButtonIcon}/>*/}
                    {/*</ActionButton.Item>*/}
                    {/*<ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {*/}
                    {/*}}>*/}
                        {/*<Ionicon name="md-done-all" style={styles.actionButtonIcon}/>*/}
                    {/*</ActionButton.Item>*/}
                </ActionButton>
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
        lectureReplyListLength: state.lectureInfo.lectureReplyListLength
    }),
    (dispatch) => ({
        LectureInfo: bindActionCreators(lectureInfo, dispatch)
    })
)(LectureInfoScreen);