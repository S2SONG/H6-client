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

class EvaluationScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            starCount: 0,
            lectureInfoIndex: 0,
            userIndex: 0,
            semester: '',
            homework: '',
            homeworkType: 0,
            testCount: 0,
            receivedGrade: 0,
            review: '',
            score: 0,
        };
    }

    componentDidMount() {
        this.evaluationInit();
    }

    evaluationInit = async () =>{
        const {Evaluation} = this.props;
        const evaluate = this.props.navigation.getParam('evaluate', {});

    }

    navigationGoBack = () => {
        this.props.navigation.goBack();
    };

    handleSemester = (semester) => {
        const {Evaluation} = this.props;
    };

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    save = (reply)=>{
        const {Evaluation} = this.props;
        this.setState({

        });
    }; //작성하기

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#717882"
                           translucent={true}/>
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
                        {this.props.lectureInfo.lectureName} </Text>
                    <Text style={{fontSize: 12, color:'rgb(124,130,140)', paddingLeft: 15, paddingBottom: 10 }}>
                        {this.props.lectureInfo.track} / {this.props.lectureInfo.professorName}</Text>

                    <Text style={styles.item}>수강학기</Text>
                    <SemesterPicker handle={this.handleSemester}
                                    value={this.props.semester}
                                    placeholder={"수강학기 선택"}/>

                    <Text style={styles.item}>과제</Text>
                    <EvaluateButton buttonData={['없음','적음','보통','많음']}/>

                    <Text style={styles.item}>과제타입</Text>
                    <EvaluateButton buttonData={['팀 프로젝트','개인 프로젝트','레포트']}/>

                    <Text style={styles.item}>시험횟수</Text>
                    <EvaluateButton buttonData={['없음','1회', '2회','3회','4회이상']}/>

                    <Text style={styles.item}>학점</Text>
                    <EvaluateButton buttonData={['P/N','F','C~','B','A']}/>

                    <Text style={styles.item}>댓글</Text>
                    <View style={{width:'100%', justifyContent:'flex-start', paddingLeft: 19}}>
                        <TextInput
                            style={styles.textBox}
                            underlineColorAndroid = "transparent"
                            placeholder = {'이곳에 강의평가를 해주세요'}
                            multiline = {true}
                            // onChangeText = {}
                        />
                    </View>

                    <View style={{justifyContent:'flex-start', flexDirection:'row', alignItems:'center', width: '50%', paddingLeft: 13, paddingTop:19}}>
                        <Text style={{fontSize:13,}}>총평    </Text>
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
                            starSize={20}
                            rating={this.state.starCount}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                        />
                    </View>
                    <View style ={{paddingTop:38,}}>
                        <Button buttonStyle={{
                            backgroundColor: '#8f96a0',
                            borderRadius: 30,
                            width: 224,
                            height:58,
                            alignSelf: 'center'
                        }} onPress={this.save} title="작성하기"/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

}

export default connect((state) => ({

        semester: state.evaluation.semester,
        lectureInfo:state.lectureInfo.lecture
    }),
    (dispatch) => ({
        Evaluation: bindActionCreators(evaluation, dispatch)
    })
)(EvaluationScreen)
