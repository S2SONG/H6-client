import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScoreIndicator} from "./ScoreIndicator";

export class LectureReplyListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', paddingTop:5}}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.replyNickName}>{this.props.lectureReply.userNickName}</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <ScoreIndicator
                            rating={Math.ceil(this.props.lectureReply.score * 2) / 2}/>
                        {/*<StarRating*/}
                            {/*disabled={true}*/}
                            {/*emptyStar={'ios-star'}*/}
                            {/*fullStar={'ios-star'}*/}
                            {/*halfStar={'ios-star-half'}*/}
                            {/*iconSet={'Ionicons'}*/}
                            {/*maxStars={5}*/}
                            {/*rating={this.props.lectureReply.score}*/}
                            {/*//rating={Math.ceil(this.props.lectureReply.score*2)/2}*/}
                            {/*fullStarColor={'rgb(255,166,0)'}*/}
                            {/*halfStarColor={'rgb(255,166,0)'}*/}
                            {/*halfStarEnabled={true}*/}
                            {/*emptyStarColor={'#cfcfcf'}*/}
                            {/*starSize={20}*/}
                        {/*/>*/}
                    </View>
                </View>
                <View style={{flexDirection: 'row',paddingLeft:15, paddingTop:12}}>
                    <View style ={{width:'20%',paddingTop:5}}>
                        <Text style={styles.replyIndex}>수강학기</Text>
                        <Text style={styles.replyIndex}>과제 </Text>
                        <Text style={styles.replyIndex}>과제타입 </Text>
                        <Text style={styles.replyIndex}>시험횟수 </Text>
                        <Text style={styles.replyIndex}>학점 </Text>
                     </View>

                    <View style={{width:'80%', paddingTop:5, paddingLeft:-10}}>
                        <Text style={styles.replyContents}>{this.props.lectureReply.semester}</Text>
                        <Text style={styles.replyContents}>{this.props.lectureReply.homework}</Text>
                        <Text style={styles.replyContents}>{this.props.lectureReply.homeworkType}</Text>
                        <Text style={styles.replyContents}>{this.props.lectureReply.testCount}</Text>
                        <Text style={styles.replyContents}>{this.props.lectureReply.receivedGrade}</Text>
                    </View>
                </View>
                <View style={{paddingLeft:15, paddingTop:20}}>
                    <Text style={styles.review}>{this.props.lectureReply.review}</Text>
                </View>

            </View>
        )
    }
}
// "homework": "보통",
//     "homeworkType": 1,
//     "lectureInfoIndex": 1,
//     "lectureReplyIndex": 251,
//     "preview": "노광현 교수님 휴강이 많지만 좋아요",
//     "receivedGrade": 2,
//     "review": "노광현 교수님 휴강이 많지만 좋아요",
//     "score": 4,
//     "semester": "17년도 2학기",
//     "testCount": 2,
//     "userId": "tae",
//     "userIndex": 9,
//     "userNickName": "godgod",

LectureReplyListItem.propTypes = {
    lectureReply: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width:'100%',
        marginBottom:10,
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        height: 275,
        backgroundColor: 'rgb(245,245,245)',
    },
    leftContainer: {
        width:'50%',
        paddingLeft:10,
        alignItems: 'flex-start',
    },
    rightContainer: {
        width:'50%',
        paddingRight:10,
        alignItems: 'flex-end'
    },
    line: {
        height:20,
        marginTop:3,
        marginBottom:3
    },
    replyNickName: {
        height:20,
        fontSize:12,
        marginTop:3,
        marginBottom:3,
    },
    replyIndex: {
        fontSize:12,
        height:20,
        color:'#b9bdc3',
        textAlign:'left',
        margin:-3
    },
    replyContents:{
        fontSize:12,
        height:20,
        //margin:-3,
        color:'black',
        textAlign:'left',
        margin:-3
    },
    review:{
        fontSize:12,
        height:230,
        //margin:-3,
        color:'black',
        textAlign:'left',
        margin:-3
    }
});