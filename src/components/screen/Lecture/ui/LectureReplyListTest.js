import React from 'react';
import {util} from "../../../../utils/util";
import {StyleSheet} from "react-native";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class LectureReplyListTest extends React.Component(){
    constructor(props){
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

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.navigationLectureInfo}>
                <View style={styles.leftContainer}>
                    <Text style={styles.nickName}>{this.props.lectureReply.nickName}</Text>
                    <Text style={styles.line}></Text>
                    <Text style={styles.ReplyContent}>{this.props.lectureReply.reply}</Text>
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
                        rating={Math.ceil(this.props.lecture.average * 2) / 2}
                        fullStarColor={'#f8fa00'}
                        halfStarColor={'#f8fa00'}
                        halfStarEnabled={true}
                        starSize={20}
                    />
                    <Text style={styles.line}></Text>
                    <Text style={styles.line}></Text>
                    <View style={styles.ReplyUpdateTime}>
                        <Text style={styles.ReplyUpdateTimeText}>{util.timeSince(this.props.lectureReply.updatedAt)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

LectureReplyListTest.propTypes = {
    lectureReply:Props.object,

};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        height: 120,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    leftContainer: {
        width: '50%',
        paddingLeft: 10,
        alignItems: 'flex-start'
    },
    rightContainer: {
        width: '50%',
        paddingRight: 10,
        alignItems: 'flex-end'
    },
    line: {
        height: 20,
        marginTop: 3,
        marginBottom: 3
    },
    nickName: {
        height: 20,
        fontSize: 15,
        marginTop: 3,
        marginBottom: 3,
    },
    ReplyContent: {
        height: 20,
        marginTop: 3,
        marginBottom: 3,
        color: 'black'
    },
    ReplyUpdateTime: {
        height: 20,
        marginTop: 3,
        marginBottom: 3,
    },
    ReplyUpdateTimeText:{
        color: '#b9bdc3',
    }
});