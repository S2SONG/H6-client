import React from 'react';
import {View, Text, StatusBar, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import {SearchBar, Button} from 'react-native-elements';
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

    componentDidMount() {
        const {Lecture} = this.props;
        Lecture.getLectureList(this.props.currentPage, this.props.lectureListLength);
    }

    renderListFooter = () => {
        const {Lecture} = this.props;
        return (
            <View style={{marginBottom:20}}>
                {this.props.loading ? <ActivityIndicator size="large" animating/> :
                    (this.props.lectureListLength<this.props.total ?
                        <Button title='더보기' onPress={() => Lecture.getLectureList(this.props.currentPage, this.props.lectureListLength)}/>
                        : null)}
            </View>
        )
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#717882"
                           translucent={true}
                />
                <TitleView title={'강의평가'}/>
                <View style={styles.searchContainer}>
                    <SearchBar
                        clearIcon={{ color: '#86939e', name: 'search', style:{width:30, height:30}}}
                        noIcon
                        placeholder={'Search'}
                        inputStyle={styles.searchBarInput}
                        containerStyle={styles.searchBarContainer}/>
                    <Text style={styles.searchBarLabel}>과목명, 교수명, 과목코드 중 하나를 입력하세요.</Text>
                </View>
                <View style={{flex: 1}}>
                    <FlatList
                        style={{flexGrow: 1, padding: 10, backgroundColor: '#f5f5f5'}}
                        data={this.props.lectureList}
                        keyExtractor={(x, i) => i}
                        // onEndReached={() => this.handleEnd()}
                        // onEndReachedThreshold={0.5}
                        // ListFooterComponent={() =>
                        //     this.props.loading ? <ActivityIndicator size="large" animating/> : null}
                        ListFooterComponent={this.renderListFooter}
                        renderItem={({item}) =><LectureListItem lecture={item}/>}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

export default connect((state) => ({
        currentPage: state.lecture.currentPage,
        lectureList: state.lecture.lectureList,
        loading: state.lecture.loading,
        total: state.lecture.total,
        lectureListLength: state.lecture.lectureListLength,
    }),
    (dispatch) => ({
        Lecture: bindActionCreators(lecture, dispatch)
    })
)(LectureScreen);