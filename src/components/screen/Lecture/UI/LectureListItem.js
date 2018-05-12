import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import TimeAgo from 'react-native-timeago';

export class LectureListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Text style={styles.lectureTitle}>{this.props.lecture.lectureName}</Text>
                    <Text style={styles.lectureTrack}>{this.props.lecture.track} 트랙</Text>
                    <Text style={styles.line}>{this.props.lecture.professorName}교수님</Text>
                    <Text style={styles.line}></Text>
                </View>
                <View style={styles.rightContainer}>
                    {this.renderAverage()}
                    <Text style={styles.line}></Text>
                    <Text style={styles.line}></Text>
                    <View style={styles.lectureUpdateTime}>
                        <TimeAgo time={this.props.lecture.updatedAt} />
                    </View>
                </View>
            </View>
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
        alignItems: 'flex-start'
    },
    rightContainer: {
        width:'50%',
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