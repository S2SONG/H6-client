import React from 'react';
import {View, Text, StatusBar, SafeAreaView, FlatList, ActivityIndicator,ScrollView} from 'react-native';
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
        console.log('total:'+this.props.total);
        console.log('lectureListLength'+this.props.lectureListLength);
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

    navigationLectureInfo = () => {
        this.props.navigation.navigate('lectureInfo');
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
        } else if(this.props.searchText == '') {
            return (
                <View style={styles.listContainer}>
                    <View style={{width:'100%', paddingBottom:5 ,paddingLeft:15, paddingTop:20}}>
                        <Text style={styles.updateText}>최신 업데이트</Text>
                    </View>
                    <FlatList
                        style={{flexGrow: 1, backgroundColor: 'white'}}
                        data={this.props.lectureList}
                        keyExtractor={(x, i) => i}
                        ListFooterComponent={this.renderListFooter}
                        renderItem={({item}) => <LectureListItem lecture={item} navigation={this.props.navigation}/>}
                    />
                </View>
            )
        }else {
            return (
                <View style={styles.listContainer}>
                    <FlatList
                        style={{flexGrow: 1, backgroundColor: 'white'}}
                        data={this.props.lectureList}
                        keyExtractor={(x, i) => i}
                        ListFooterComponent={this.renderListFooter}
                        renderItem={({item}) => <LectureListItem lecture={item} navigation={this.props.navigation}/>}
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
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>강의평가</Text>
                </View>
                <ScrollView>
                    <View style={{padding:10,paddingBottom:10}}>
                        <View style={styles.searchContainer}>
                            <LectureSearchBar
                                value={this.props.textValue}
                                onChangeText={this.onChangeTextValue}
                                searchHandler={this.searchHandler}
                                placeholder={'과목명, 교수명, 과목코드, 트랙 중 하나를 입력하세요.'}
                            />
                        </View>
                    </View>
                    {this.renderList()}
                </ScrollView>
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