import React from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import {LinkText} from "./LinkText";
import {SignTextInput} from "./SignTextInput";
import {Icon} from 'react-native-elements';

export class FindPwdModal extends React.Component{

    render(){
        return(
            <Modal isVisible={this.props.visible}>
                <View style={{ flex: 1,justifyContent:'center', alignItems:'center'}}>
                    <View style={{height:280, width:300, backgroundColor:'rgb(246,246,246)',borderRadius: 20}}>
                        <View name='header' style={{flex:1, height:60, width:'100%', padding:15, alignItems:'flex-end'}}>
                            <Icon name="md-close" type="ionicon" style={{alignSelf: 'flex-end'}}
                                  onPress={this.props.closeModal}/>
                        </View>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>
                                {this.props.title}</Text>
                        </View>
                        <View style={styles.body}>
                            <Text style={styles.bodyText}>
                                {this.props.body}</Text>
                            <View style={styles.interval}/>
                            <View style = { styles.inputLayout }>
                                {/**<View style = { styles.inputIcon }>
                                 <Icon type = "font-awesome" name = { this.props.icon }/>
                                 </View>**/}
                                <TextInput
                                    onBlur = {this.props.blur}
                                    onChangeText = { this.props.handle }
                                    value = { this.props.value }
                                    secureTextEntry = { this.props.secureText }
                                    style = { styles.input }
                                    underlineColorAndroid = "transparent"
                                    placeholder = { this.props.placeholder }
                                />
                                {/*<SignTextInput*/}
                                {/*handle={this.handleStateUserNickName}*/}
                                {/*value={this.props.userNickName}*/}
                                {/*placeholder={'email'}*/}
                                {/*icon={'user'}*/}
                                {/*label={'Nickname'}*/}
                                {/*checkNo={this.props.checkNickNameNo}*/}
                                {/*checkLabel={this.props.checkNickNameLabel}*/}
                                {/*blur={this.handleCheckUserNickName}*/}
                                {/*/>*/}
                            </View>
                        </View>
                        <View style={styles.footer}>
                            <LinkText
                                value='이메일 전송'
                                handle={this.props.handle}
                                // link_style={link_style.link_style}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

FindPwdModal.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    body: PropTypes.string,
    closeModal: PropTypes.func,
    handle:PropTypes.func,
};

const styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        color:'#8f96a0',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    bodyText: {
        fontSize: 15,
        color:'#8f96a0',
        alignSelf:'center',
        textAlign: 'center',
    },
    title:{
        height:'15%',
        width:250,
        paddingBottom:20,
        alignSelf:'center'
    },
    body:{
        height:'50%',
        width:250,
        padding:10,
        alignSelf:'center',
    },
    footer:{
        alignItems: 'center',
        height:'20%',
        width:'100%',
        padding:20,
        backgroundColor: 'rgb(236,236,236)',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20
    },
    interval:{
        width:'100%',
        height:30,
    },
    inputLayout: {
        flexDirection: 'row',
        height: 30,
        width: '80%',
        backgroundColor: 'white',
        paddingLeft: 10,
        borderRadius:3,
        alignSelf:'center',
    }
});
//
// const link_style = StyleSheet.create({
//     ink_style:{
//         fontSize: 20,
//         fontWeight: 'bold'
//     }
// });