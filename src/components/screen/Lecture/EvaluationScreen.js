import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as evaluation from "../../../modules/evaluation";
import {StatusBar,SafeAreaView, Text, View, ScrollView,TextInput} from "react-native";
import styles from "./EvaluationScreenStyles";
import {Icon, Button} from 'react-native-elements';
import {SemesterPicker} from "../../ui/SemesterPicker";
import {EvaluateButton} from "./ui/EvaluateButton";
import StarRating from 'react-native-star-rating';
import Toast, {DURATION} from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class EvaluationScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            starCount: 0,
            review: '',
        };
    };

    componentDidMount() {
        this.evaluationInit();
    };
    evaluationInit = async () =>{
        const {Evaluation} = this.props;
        await Evaluation.initReplyState();
    };

    navigationGoBack = () => {
        this.props.navigation.goBack();
    };

    handleSemester = (semester) => {
        const {Evaluation} = this.props;
        Evaluation.handleSemester(semester);
        console.log(semester);
    }; //수강학기

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
        this.handleScore(rating);
    }; //별점
    handleScore=(score)=>{
        const {Evaluation} = this.props;
        Evaluation.handleScore(score);
        console.log(score);
    };

    handleHomework=(homework)=> {
        const {Evaluation} = this.props;
        // if(homework==="없음") homework = '0';
        // if(homework==="적음") homework = '1';
        // if(homework==="보통") homework = '2';
        // if(homework==="많음") homework = '3';
        Evaluation.handleHomework(homework);
        console.log(homework);
    }; //과제

    handleHomeworkType=(homeworkType)=>{
        const {Evaluation} = this.props;
        // if(homeworkType==="팀 프로젝트") homeworkType = 1;
        // if(homeworkType==="개인 프로젝트") homeworkType = 2;
        // if(homeworkType==="레포트") homeworkType = 3;
        Evaluation.handleHomeworkType(homeworkType);
        console.log(homeworkType);
    }; //과제타입

    handleTestCount=(testCount)=>{
        const {Evaluation} = this.props;
        // if(testCount==="없음") testCount = 0;
        // if(testCount==="1회") testCount = 1;
        // if(testCount==="2회") testCount = 2;
        // if(testCount==="3회") testCount = 3;
        // if(testCount==="4회 이상") testCount = 4;
        Evaluation.handleTestCount(testCount);
        console.log(testCount);
    }; //시험횟수

    handleReceivedGrade=(receivedGrade)=>{
        const {Evaluation} = this.props;
        // if(receivedGrade==="P/N") receivedGrade = 0;
        // if(receivedGrade==="F") receivedGrade = 1;
        // if(receivedGrade==="C~") receivedGrade = 2;
        // if(receivedGrade==="B") receivedGrade = 3;
        // if(receivedGrade==="A") receivedGrade = 4;
        Evaluation.handleReceivedGrade(receivedGrade);
        console.log(receivedGrade);
    }; //학점

    handleReview=(review)=>{
        const {Evaluation} = this.props;
        Evaluation.handleReview(review);
        //console.log(review);
    }; //댓글

    saveReply = async () => {
        console.log("save");
        const {Evaluation} = this.props;
        let lectureInfoIndex = this.props.lecture.lectureInfoIndex;
        const {semester, homework, homeworkType, testCount, receivedGrade, review, score} = this.props;

        let saveCheck = await Evaluation.postReply(semester, homework, homeworkType, testCount, receivedGrade, review, score,lectureInfoIndex);
        if (saveCheck) {
            this.refs.toast.show('작성되었습니다.');
            this.props.navigation.navigate('LectureInfo',{lecture: this.props.lecture});
        } else {
        }
    };

    render() {
        return (
            <KeyboardAwareScrollView>
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#717882"
                           translucent={true}/>
                <Toast ref="toast"/>
                <View style={styles.statusBar}/>
                <View style={styles.renderHeader}>
                    <View style ={styles.titleBar}>
                        <View style ={styles.arrow}>
                            <Icon name={'ios-arrow-back-outline'} type='ionicon' size={30} color={'white'}
                                onPress={this.navigationGoBack}/>
                        </View>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>강의평 쓰기</Text>
                        </View>
                    </View>
                </View>

                <ScrollView style={styles.container}>
                    <Text style={{fontSize: 17, fontWeight: '700', paddingLeft : 15, paddingTop:30 }}>
                        {this.props.lecture.lectureName} </Text>
                    <Text style={{fontSize: 12, color:'rgb(124,130,140)', paddingLeft: 15, paddingBottom: 10 }}>
                        {this.props.lecture.track} / {this.props.lecture.professorName}</Text>

                    <Text style={styles.item}>수강학기</Text>
                    <SemesterPicker handle={this.handleSemester}
                                    value={this.props.semester}
                                    placeholder={"수강학기 선택"}/>

                    <Text style={styles.item}>과제</Text>
                    <EvaluateButton buttonData={['없음','적음','보통','많음']}
                                    handleGetScore = {this.handleHomework}
                                    pressStatus={true}/>

                    <Text style={styles.item}>과제타입</Text>
                    <EvaluateButton buttonData={['팀 프로젝트','개인 프로젝트','레포트']}
                                    handleGetScore = {this.handleHomeworkType}/>

                    <Text style={styles.item}>시험횟수</Text>
                    <EvaluateButton buttonData={['없음','1회', '2회','3회','4회이상']}
                                    handleGetScore = {this.handleTestCount}/>

                    <Text style={styles.item}>학점</Text>
                    <EvaluateButton buttonData={['P/N','F','C~','B','A']}
                                    handleGetScore = {this.handleReceivedGrade}/>

                    <Text style={styles.item}>댓글</Text>
                    <View style={{width:'100%', justifyContent:'flex-start', paddingLeft: 19}}>
                        <TextInput
                            style={styles.textBox}
                            underlineColorAndroid = "transparent"
                            placeholder = {'이곳에 강의평가를 해주세요'}
                            multiline = {true}
                            onChangeText = { this.handleReview}
                        />
                    </View>

                    <View style={{justifyContent:'flex-start', flexDirection:'row', alignItems:'center', width: '50%', paddingLeft: 13, paddingTop:19}}>
                        <Text style={{fontSize:13,paddingRight:10}}>총평</Text>
                        <View style={{ width:100}}>
                            <StarRating
                                disabled={false}
                                emptyStar={'ios-star'}
                                fullStar={'ios-star'}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                maxStars={5}
                                fullStarColor={'#f8fa00'}
                                halfStarColor={'#f8fa00'}
                                halfStarEnabled={true}
                                emptyStarColor={'#cfcfcf'}
                                starSize={30}
                                starStyle={{margin:5}}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                            />
                        </View>
                    </View>
                    <View style ={{paddingTop:38,}}>
                        <Button buttonStyle={{
                            backgroundColor: '#8f96a0',
                            borderRadius: 30,
                            width: 224,
                            height:58,
                            alignSelf: 'center'
                        }} onPress={this.saveReply} title="작성하기"/>
                    </View>
                </ScrollView>
            </SafeAreaView>
            </KeyboardAwareScrollView>
        )
    }

}

export default connect((state) => ({
    lecture: state.lectureInfo.lecture,
    semester: state.evaluation.semester,
    homework: state.evaluation.homework,           //과제
    homeworkType: state.evaluation.homeworkType,  //과제 타입
    testCount:state.evaluation.testCount,         //시험횟수
    receivedGrade:state.evaluation.receivedGrade,  //학점
    review:state.evaluation.review,              //댓글
    score:state.evaluation.score,              //총점
    }),
    (dispatch) => ({
        Evaluation: bindActionCreators(evaluation, dispatch)
    })
)(EvaluationScreen)
