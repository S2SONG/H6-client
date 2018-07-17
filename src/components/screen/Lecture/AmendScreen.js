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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {CustomModal} from "../../ui/CustomModal";
import {EvaluateScore} from "./ui/EvaluateScore";

class AmendScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            semester:this.props.reply.semester,
            homework:this.props.reply.homework,
            homeworkType:this.props.reply.homeworkType,
            testCount:this.props.reply.testCount,
            receivedGrade:this.props.reply.receivedGrade,
            review:this.props.reply.review,
            score:this.props.reply.score
        };
        console.log(this.props.reply.semester);
        const {Evaluation} = this.props;
        Evaluation.getReplyIndex(this.props.lecture.lectureInfoIndex);
        this.testCountChangeType(this.state.testCount);
    };

    componentDidMount() {
        this.evaluationInit();
        if(this.props.review==="") this.handleReview(this.state.review);
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
            score: rating
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
        Evaluation.handleHomework(homework);
        console.log(homework);
    }; //과제
    handleHomeworkType=(homeworkType)=>{
        const {Evaluation} = this.props;
        Evaluation.handleHomeworkType(homeworkType);
        console.log(homeworkType);
    }; //과제타입
    handleTestCount=(testCount)=>{
        const {Evaluation} = this.props;
        Evaluation.handleTestCount(testCount);
        console.log(testCount);
    }; //시험횟수
    handleReceivedGrade=(receivedGrade)=>{
        const {Evaluation} = this.props;
        Evaluation.handleReceivedGrade(receivedGrade);
        console.log(receivedGrade);
    }; //학점
    handleReview=(review)=>{
        const {Evaluation} = this.props;
        if(review!="")Evaluation.handleReview(review);
        else Evaluation.handleReview(this.state.review);
    }; //댓글

    saveReply = async () => {
        const {Evaluation} = this.props;
        let lectureInfoIndex = this.props.lecture.lectureInfoIndex;
        const {semester, homework, homeworkType, testCount, receivedGrade, review, score} = this.props;
        const lectureReplyIndex = this.props.reply.lectureReplyIndex;
        let updateCheck = await Evaluation.updateLectureReply(semester, homework, homeworkType, testCount, receivedGrade, review, score,lectureInfoIndex,lectureReplyIndex);
        // console.log('update>>',this.props.updateReply);
        if (updateCheck) {
            console.log('수정완료');
            this.replyModalOpen();
        } else {
        }
    };

    replyModalOpen=()=>{
        const {Evaluation} = this.props;
        Evaluation.saveModal(true);
    };
    replyModalClose=()=>{
        const {Evaluation} = this.props;
        Evaluation.saveModal(false);
        // this.props.navigation.navigate('LectureInfo',{lecture: this.props.lecture});
        console.log('update>>',this.props.updateReply);
        this.props.navigation.navigate('lecture',{lecture:this.props.lecture, lectureReplyList: this.props.lectureReplyList,});
        this.props.navigation.goBack();
        this.props.navigation.navigate('lectureInfo',{lecture:this.props.lecture, lectureReplyList: this.props.lectureReplyList, reply: this.props.updateReply});
        // this.props.navigation.navigate('LectureInfo',{lecture: this.props.lecture, lectureReplyList: this.props.lectureReplyList, reply: this.props.updateReply});
    };

    testCountChangeType = (testCount) => {
        if(testCount===0) this.state.testCount = "없음";
        if(testCount===1) this.state.testCount = "1회";
        if(testCount===2) this.state.testCount = "2회";
        if(testCount===3) this.state.testCount = "3회";
        if(testCount===4) this.state.testCount = "4회이상";
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <CustomModal
                    visible={this.props.visible} footerHandle={this.replyModalClose} height={156} width={280}
                    title={'강의평이 수정되었습니다.'} footerText={'확인'} footer={true}/>
                <StatusBar backgroundColor="#717882"
                           translucent={true}/>
                <View style={styles.statusBar}/>
                <View>
                    <View style ={styles.arrow}>
                        <Icon name={"md-close"} type="ionicon" size={32} color={'black'}
                              onPress={this.navigationGoBack}/>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>내 강의평</Text>
                    </View>
                </View>

                <KeyboardAwareScrollView>
                    <ScrollView style={styles.container}>
                        <View style = {styles.lecture}>
                            <Text style={{fontSize: 17, fontWeight: 'bold', paddingLeft : 20,color:'black', paddingTop:20}}>
                                {this.props.lecture.lectureName} </Text>
                            <Text style={{fontSize: 12, color:'black',opacity:0.4, paddingLeft: 20, paddingBottom: 10,paddingTop:10}}>
                                {this.props.lecture.track} / {this.props.lecture.professorName}</Text>
                        </View>
                        <View style = {{paddingLeft:10}}>
                            <Text style={styles.item}>수강학기</Text>
                            <SemesterPicker handle={this.handleSemester}
                                            value={this.props.semester}
                                            placeholder={"수강학기 선택"}
                                            defaultValue={this.state.semester}/>

                            <Text style={styles.item}>과제</Text>
                            <EvaluateButton buttonData={['없음','적음','보통','많음']}
                                            handleGetScore = {this.handleHomework}
                                            pressStatus={this.state.homework}
                                            />
                            <Text style={styles.item}>과제타입</Text>
                            <EvaluateButton buttonData={['팀 프로젝트','개인 프로젝트','레포트']}
                                            handleGetScore = {this.handleHomeworkType}
                                            pressStatus={this.state.homeworkType}
                                            />

                            <Text style={styles.item}>시험횟수</Text>
                            <EvaluateButton buttonData={['없음','1회', '2회','3회','4회이상']}
                                            handleGetScore = {this.handleTestCount}
                                            pressStatus={this.state.testCount}
                                            />
                            <Text style={styles.item}>학점</Text>
                            <EvaluateButton buttonData={['P/N','F','C~','B','A']}
                                            handleGetScore = {this.handleReceivedGrade}
                                            pressStatus={this.state.receivedGrade}
                                            />

                            <Text style={styles.item}>댓글</Text>
                            <View style={{width:334, height:148, justifyContent:'flex-start',backgroundColor:'white', alignSelf:'center',
                                borderColor:'rgb(216,216,216)',borderRadius:3, borderWidth: 1,}}>
                                <TextInput
                                    style={styles.textBox}
                                    underlineColorAndroid = "transparent"
                                    placeholderStyle = {{ textAlign:'center'}}
                                    multiline = {true}
                                    defaultValue = {this.state.review}
                                    onChangeText = {this.handleReview}
                                    // maxLength={200}
                                />
                            </View>
                        </View>
                        <View style={{justifyContent:'flex-start', flexDirection:'row', alignItems:'center', width: '50%', paddingLeft: 13, paddingTop:19}}>
                            <Text style={{fontSize:13,paddingRight:10}}>총평</Text>
                            <View style={{ width:100}}>
                                <EvaluateScore
                                    rating = {this.state.score}
                                    handleGetScore={(rating)=>this.onStarRatingPress(rating)}
                                />
                                {/*<StarRating*/}
                                    {/*disabled={false}*/}
                                    {/*emptyStar={'ios-star'}*/}
                                    {/*fullStar={'ios-star'}*/}
                                    {/*halfStar={'ios-star-half'}*/}
                                    {/*iconSet={'Ionicons'}*/}
                                    {/*maxStars={5}*/}
                                    {/*fullStarColor={'#f8fa00'}*/}
                                    {/*halfStarColor={'#f8fa00'}*/}
                                    {/*halfStarEnabled={true}*/}
                                    {/*emptyStarColor={'#cfcfcf'}*/}
                                    {/*starSize={30}*/}
                                    {/*starStyle={{margin:5}}*/}
                                    {/*rating={this.state.score}*/}
                                    {/*selectedStar={(rating) => this.onStarRatingPress(rating)}*/}
                                {/*/>*/}
                            </View>
                        </View>
                        <View style ={{paddingTop:38,}}>
                            <Button buttonStyle={{
                                backgroundColor: '#4a4a4a',
                                borderRadius: 30,
                                width: 224,
                                height:58,
                                alignSelf: 'center'
                            }} onPress={this.saveReply} title="수정하기"/>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </SafeAreaView>
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
        modal:state.evaluation.saveModal,
        visible:state.evaluation.visible,
        currentReply:state.evaluation.currentReply,
        reply:state.evaluation.reply,
        updateReply:state.evaluation.updateReply
    }),
    (dispatch) => ({
        Evaluation: bindActionCreators(evaluation, dispatch)
    })
)(AmendScreen)
