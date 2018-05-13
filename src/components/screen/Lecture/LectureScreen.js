import React from 'react';
import {View, Text, StatusBar, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import styles from "./LectureStyles";
import * as lecture from "../../../modules/lecture";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LectureListItem} from "./ui/LectureListItem";
import {TitleView} from "../../ui/TitleView";
import {LectureSearchBar} from "./ui/LectureSearchBar";

class LectureScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {Lecture} = this.props;
        Lecture.getLectureList(this.props.searchText, this.props.currentPage, this.props.lectureListLength);
    }

    renderListFooter = () => {
        const {Lecture} = this.props;
        return (
            <View style={{marginBottom: 20}}>
                {this.props.loading ? <ActivityIndicator size="large" animating/> :
                    (this.props.lectureListLength < this.props.total ?
                        <Button title='더보기'
                                onPress={() => Lecture.getLectureList(this.props.searchText, this.props.currentPage, this.props.lectureListLength)}/>
                        : null)}
            </View>
        )
    };

    renderList = () => {
        if (this.props.searchText !== '' && this.props.total == 0) {
            return (
                <View style={styles.listContainer}>
                    <Icon name='md-images' type='ionicon' size={80}/>
                    <Text>결과가 없습니다.</Text>
                    <Text>검색어를 확인해주세요.</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.listContainer}>
                    <FlatList
                        style={{flexGrow: 1, padding: 10, backgroundColor: '#f5f5f5'}}
                        data={this.props.lectureList}
                        keyExtractor={(x, i) => i}
                        // onEndReached={() => this.handleEnd()}
                        // onEndReachedThreshold={0.5}
                        // ListFooterComponent={() =>
                        //     this.props.loading ? <ActivityIndicator size="large" animating/> : null}
                        ListFooterComponent={this.renderListFooter}
                        renderItem={({item}) => <LectureListItem lecture={item}/>}
                    />
                </View>
            )
        }
    };

    onChangeTextValue = (e) => {
        const {Lecture} = this.props;
        Lecture.onChangeTextValue(e.valueOf());
    };

    searchHandler = async () => {
        const {Lecture} = this.props;
        await Lecture.initLectureList();
        await Lecture.handleSearchText(this.props.textValue);
        Lecture.getLectureList(this.props.searchText, this.props.currentPage, this.props.lectureListLength);
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#717882"
                           translucent={true}
                />
                <TitleView title={'강의평가'}/>
                <View style={styles.searchContainer}>
                    <LectureSearchBar
                        value={this.props.textValue}
                        onChangeText={this.onChangeTextValue}
                        searchHandler={this.searchHandler}
                    />
                    <Text style={styles.searchBarLabel}>과목명, 교수명, 과목코드, 트랙 중 하나를 입력하세요.</Text>
                </View>
                {this.renderList()}
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
        textValue: state.lecture.textValue,
        searchText: state.lecture.searchText
    }),
    (dispatch) => ({
        Lecture: bindActionCreators(lecture, dispatch)
    })
)(LectureScreen);