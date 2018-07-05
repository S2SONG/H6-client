import React from 'react';
import {Text, View, SafeAreaView, StyleSheet, StatusBar, ActivityIndicator, FlatList, ScrollView} from 'react-native';
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
        this.props.navigation.goBack();
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
                    <View style={{margin:5,width:'40%'}}>
                        <ScoreIndicator
                            rating={Math.ceil(this.props.lecture.average * 2) / 2}/>
                        {/*<StarRating*/}
                            {/*disabled={true}*/}
                            {/*emptyStar={'ios-star'}*/}
                            {/*fullStar={'ios-star'}*/}
                            {/*halfStar={'ios-star-half'}*/}
                            {/*iconSet={'Ionicons'}*/}
                            {/*maxStars={5}*/}
                            {/*rating={Math.ceil(this.props.lecture.average * 2) / 2}*/}
                            {/*fullStarColor={'#f5a623'}*/}
                            {/*halfStarColor={'#f5a623'}*/}
                            {/*halfStarEnabled={true}*/}
                            {/*starSize={20}*/}
                        {/*/>*/}
                    </View>
                    <Text style={{fontSize:11, opacity:40, paddingTop:15,color:'rgb(176,176,176)',paddingLeft:8}}>
                            {this.props.lecture.track} / {this.props.lecture.professorName} 교수님</Text>
                </View>
                {this.renderWrite()}
            </View>
        )
    };
    renderWrite = () => {
        return(
            <View style={{width:'50%',alignSelf:'flex-end',paddingRight:15, paddingBottom:30}}>
                <Button
                    icon={{name: 'create', size:25}}
                    buttonStyle={styles.button}
                    onPress={()=>this.navigationGoEval()}
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