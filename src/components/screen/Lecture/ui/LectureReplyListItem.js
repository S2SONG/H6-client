import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import TimeAgo from 'react-native-timeago';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export class LectureReplyListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
    }


    render() {
        return (
            <TouchableOpacity style={styles.container}>
                <View style={styles.leftContainer}>
                    <Text style={styles.lectureTitle}>{this.props.lectureReply.userNickName}</Text>
                    <Text style={styles.lectureTrack}></Text>
                    <Text style={styles.line}></Text>
                    <Text style={styles.line}></Text>
                </View>
                <View style={styles.rightContainer}>
                    <StarRating
                        disabled={true}
                        emptyStar={'ios-star'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        maxStars={5}
                        rating={Math.ceil(this.props.lectureReply.score*2)/2}
                        fullStarColor={'#f8fa00'}
                        halfStarColor={'#f8fa00'}
                        halfStarEnabled={true}
                        emptyStarColor={'#cfcfcf'}
                        starSize={20}
                    />
                    <Text style={styles.line}></Text>
                    <Text style={styles.line}></Text>
                    {/*<View style={styles.lectureUpdateTime}>*/}
                        {/*<TimeAgo time={this.props.lectureReply.updatedAt} />*/}
                    {/*</View>*/}
                </View>
            </TouchableOpacity>
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
        flexDirection: 'row',
        padding: 10,
        margin:10,
        height: 120,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    leftContainer: {
        width:'50%',
        paddingLeft:10,
        alignItems: 'flex-start'
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
    lectureTitle: {
        height:20,
        fontSize:18,
        marginTop:3,
        marginBottom:3,
    },
    lectureTrack: {
        height:20,
        marginTop:3,
        marginBottom:3,
        color:'#b9bdc3'
    },
    lectureUpdateTime: {
        height:20,
        marginTop:3,
        marginBottom:3,

    }
});