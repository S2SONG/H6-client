import React from 'react';
import {View, Text, StatusBar, SafeAreaView, FlatList} from 'react-native';
import {SearchBar, List} from 'react-native-elements';
import styles from "./LectureStyles";
import * as lecture from "../../../modules/lecture";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LectureListItem} from "./ui/LectureListItem";
import {TitleView} from "../../ui/TitleView";

class LectureScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const {Lecture} = this.props;
        Lecture.getLectureList(this.props.currentPosition);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#717882"
                           translucent={true}
                />
                <TitleView title={'강의평가'}/>
                <View style={styles.searchContainer}>
                <SearchBar
                    noIcon
                    placeholder={'Search'}
                    inputStyle={styles.searchBarInput}
                    containerStyle={styles.searchBarContainer}/>
                    <Text style={styles.searchBarLabel}>과목명, 교수명, 과목코드 중 하나를 입력하세요.</Text>
                </View>
                        <FlatList
                            style={{flexGrow:1, padding:10, backgroundColor:'#f5f5f5'}}
                            data={this.props.lectureList[0]}
                            keyExtractor={(x, i) => i}
                            // onEndReached={() => this.handleEnd()}
                            // onEndReachedThreshold={0.5}
                            // ListFooterComponent={() =>
                            //     this.state.loading ? null : <ActivityIndicator size="large" animating/>}
                            renderItem={({item}) =>
                                <LectureListItem lecture={item}/>
                            }
                        />



            </SafeAreaView>
        )
    }
}

export default connect((state) => ({
    currentPosition: state.lecture.currentPosition,
    lectureList: state.lecture.lectureList,

    }),
    (dispatch) => ({
        Lecture: bindActionCreators(lecture, dispatch)
    })
)(LectureScreen);