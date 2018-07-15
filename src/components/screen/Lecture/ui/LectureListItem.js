import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {util} from "../../../../utils/util";
import {ScoreIndicator} from "./ScoreIndicator";
import TimeAgo from "react-native-timeago";

export class LectureListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    renderAverage = () => {
        const average = Math.round(this.props.lecture.average);
        const data = [1, 2, 3, 4, 5];
        return (
            <View style={{flexDirection: 'row'}}>
                {data.map((_, i) => {
                    return (
                        <Icon
                            key={i}
                            name='md-star'
                            type='ionicon'
                            color={i <= average ? '#f8fa00' : '#cfcfcf'}
                            style={styles.line}
                        />
                    )
                })}
            </View>
        )
    };

    navigationLectureInfo = () => {
        this.props.navigation.navigate('lectureInfo', {lecture: this.props.lecture});
    };

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.navigationLectureInfo}>
                <View style={styles.leftContainer}>
                    <Text style={styles.lectureTitle}>{this.props.lecture.lectureName}</Text>
                    <Text style={styles.lectureTrack}>{this.props.lecture.track} 트랙</Text>
                    <Text style={styles.professor}>{this.props.lecture.professorName} 교수님</Text>
                    {/*<Text style={styles.line}>{this.props.lecture.lectureReply.preview}</Text>*/}
                    {/*<Text style={styles.line}>리플 {this.props.lecture.replyCount}</Text>*/}
                    {/*<Text style={styles.professor}>{this.props.reply.preview}</Text>*/}
                </View>
                <View style={styles.rightContainer}>
                    <ScoreIndicator
                        rating={Math.ceil(this.props.lecture.average * 2) / 2}/>
                    {/*<StarRating*/}
                        {/*disabled={true}*/}
                        {/*emptyStar={'md-square'}*/}
                        {/*fullStar={'md-square'}*/}
                        {/*halfStar={'md-square'}*/}
                        {/*iconSet={'Ionicons'}*/}
                        {/*maxStars={5}*/}
                        {/*// rating={Math.ceil(this.props.lecture.average * 2) / 2}*/}
                        {/*rating={this.props.lecture.average}*/}
                        {/*fullStarColor={'black'}*/}
                        {/*halfStarColor={'gray'}*/}
                        {/*halfStarEnabled={true}*/}
                        {/*emptyStarColor={'#cfcfcf'}*/}
                        {/*starSize={19}*/}
                    {/*/>*/}
                    <Text style={styles.line}></Text>
                    <Text style={styles.line}></Text>
                    <View style={styles.lectureUpdateTime}>
                        {/*<TimeAgo time={this.props.lecture.updatedAt}/>*/}
                        <Text style={styles.lectureUpdateTimeText}>
                            {util.timeSince(this.props.lecture.updatedAt)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

//"average": 1,
// "lectureInfoIndex": 2,
// "lectureName": "os",
// "professorName": "신준태",
// "replyCount": 0,
// "track": "computer science",
// "updatedAt": "2018-05-07T18:33:42.000Z",

LectureListItem.propTypes = {
    lecture: PropTypes.object,
    navigation: PropTypes.object
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        height: 100,
        width:359,
        borderRadius:5,
        backgroundColor:'rgb(245,245,245)',
    },
    leftContainer: {
        width: '50%',
        paddingLeft: 20,
        alignItems: 'flex-start',
        marginTop:10
    },
    rightContainer: {
        width: '50%',
        paddingRight: 20,
        alignItems: 'flex-end',
        marginTop:10,
    },
    line: {
        height: 20,
        marginTop: 2,
        marginBottom: 2
    },
    lectureTitle: {
        height: 20,
        fontSize: 12,
        marginTop: 3,
        marginBottom: 3,
    },
    lectureTrack: {
        height: 20,
        fontSize:11,
        marginTop: 3,
        marginBottom: 3,
        color: '#b9bdc3'
    },
    professor:{
        height: 20,
        fontSize:11,
        marginTop: 3,
        marginBottom: 3,
        color: 'black'
    },
    lectureUpdateTime: {
        height: 20,
        marginTop: 3,
        marginBottom: 3,
    },
    lectureUpdateTimeText:{
        color: '#b9bdc3',
    }
});