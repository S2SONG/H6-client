import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as evaluation from "../../../modules/evaluation";
import {StatusBar,SafeAreaView, Text, View, Button,Picker} from "react-native";
import styles from "./EvaluationScreenStyles";
import {Icon} from 'react-native-elements';
import {SemesterPicker} from "../../ui/SemesterPicker";

class EvaluationScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    navigationGoBack = () => {
        this.props.navigation.goBack();
    };

    getScore = () =>{

    }; //버튼 점수

    handleSemester = (semester) => {

    };

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

                <View style={styles.container}>
                    <Text style={{fontSize: 21, fontWeight: '700', paddingLeft : 15, paddingTop:30 }}>그래픽 디자인 </Text>
                    <Text style={{fontSize: 14, color:'rgb(124,130,140)', paddingLeft: 15, paddingBottom: 10 }}>Major & Track / professor</Text>

                    <Text style={styles.boldText}>수강학기</Text>
                    <SemesterPicker handle={this.handleSemester}
                                    value={this.props.semester}
                                    placeholder={"수강학기 선택"}
                    />

                    <Text style={styles.boldText}>과제타입</Text>
                    <View style={{flexDirection:'row',justifyContent: 'flex-start', margin:10, paddingLeft:15}}>
                        <Button buttonStyle={{backgroundColor: 'rgb(216,216,216)', borderRadius: 30, width: 30, alignSelf: 'center'}}
                            color="black" title="없음"
                            onPress={this.getScore}/>
                        <Button buttonStyle={{backgroundColor: 'rgb(216,216,216)', borderRadius: 30, width: 30, alignSelf: 'center'}}
                            color="black" title="적음"
                            onPress={this.getScore}/>
                        <Button buttonStyle={{backgroundColor: 'rgb(216,216,216)', borderRadius: 30, width: 30, alignSelf: 'center'}}
                            color="black" title="보통"
                            onPress={this.getScore}/>
                        <Button buttonStyle={{backgroundColor: 'rgb(216,216,216)', borderRadius: 30, width: 30, alignSelf: 'center'}}
                            color="black" title="많음"
                            onPress={this.getScore}/>
                    </View>

                    <Text style={styles.boldText}>시험횟수</Text>
                    <View style={{flexDirection:'row',justifyContent: 'flex-start', margin:10, paddingLeft:15}}>
                        <Button buttonStyle={{backgroundColor: 'rgb(216,216,216)', borderRadius: 30, width: 30, alignSelf: 'center'}}
                                color="black" title="팀 프로젝트"
                                onPress={this.getScore}/>
                        <Button buttonStyle={{backgroundColor: 'rgb(216,216,216)', borderRadius: 30, width: 30, alignSelf: 'center'}}
                                color="black" title="개인 프로젝트"
                                onPress={this.getScore}/>
                        <Button buttonStyle={{backgroundColor: 'rgb(216,216,216)', borderRadius: 30, width: 30, alignSelf: 'center'}}
                                color="black" title="레포트"
                                onPress={this.getScore}/>
                    </View>

                    <Text style={styles.boldText}>학점</Text>
                    <View style={{flexDirection:'row',justifyContent: 'flex-start', margin:10, paddingLeft:15}}>
                        <Button buttonStyle={{backgroundColor: 'rgb(216,216,216)', borderRadius: 30, width: 30, alignSelf: 'center'}}
                                color="black" title="없음"
                                onPress={this.getScore}/>
                        <Button buttonStyle={{backgroundColor: 'rgb(216,216,216)', borderRadius: 30, width: 30, alignSelf: 'center'}}
                                color="black" title="1회"
                                onPress={this.getScore}/>
                        <Button buttonStyle={{backgroundColor: 'rgb(216,216,216)', borderRadius: 30, width: 30, alignSelf: 'center'}}
                                color="black" title="2회"
                                onPress={this.getScore}/>
                        <Button buttonStyle={{backgroundColor: 'rgb(216,216,216)', borderRadius: 30, width: 30, alignSelf: 'center'}}
                                color="black" title="3회"
                                onPress={this.getScore}/>
                        <Button buttonStyle={{backgroundColor: 'rgb(216,216,216)', borderRadius: 30, width: 30, alignSelf: 'center'}}
                                color="black" title="4회 이상"
                                onPress={this.getScore}/>
                    </View>

                    <Text style={styles.boldText}>댓글</Text>


                </View>
            </SafeAreaView>
        )
    }

}

export default connect((state) => ({
    semester: state.evaluation.semester,
    }),
    (dispatch) => ({
        Evaluation: bindActionCreators(evaluation, dispatch)
    })
)(EvaluationScreen);
