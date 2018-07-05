import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';


import {Icon} from 'react-native-elements';

export class SignInFindPwdModal extends React.Component {

    renderUnderLabel = () => {
        if (this.props.checkNo == 0) {
            return null;
        } else if (this.props.checkNo == 1) {
            return (<Text style={{
                width: '100%',
                marginTop: 5,
                textAlign: 'center',
                color: 'rgb(208,2,27)',
                fontSize:12,
            }}>{this.props.checkLabel}</Text>)
        } else {
            return (<Text style={{
                width: '100%',
                marginTop: 5,
                textAlign: 'center',
                color: '#4085d5',
                fontSize:12,
            }}>{this.props.checkLabel}</Text>)
        }
    };

    renderFooter = () => {
        if (this.props.checkNo == 2){
            return(
                <TouchableOpacity onPress={this.props.sendPwd}>
                    <View style={styles.footerSelect}>
                        <Text style={styles.footerSelectText}>{this.props.footerText}</Text>
                    </View>
                </TouchableOpacity>)

        } else {
            return(
                <View style={styles.footer}>
                    <Text style={styles.footerText}>{this.props.footerText}</Text>
                </View>
            )
        }
    };

    render() {
        return (
            <Modal isVisible={this.props.visible}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{height: 42, width: 280, alignItems: 'flex-end'}}>
                        <Icon name={'ios-close-circle-outline'}
                              type='ionicon'
                              color='#ffffff'
                              style={{alignSelf: 'flex-end'}}
                              size={35}
                              underlayColor={'#7c828c00'}
                              onPress={this.props.closeModal}/>
                    </View>
                    <View style={{height: 291, width: 280, backgroundColor: '#ffffff', borderRadius: 5}}>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>{this.props.title}</Text>
                        </View>
                        <View style={styles.body}>
                            <Text style={styles.bodyText}>{this.props.body}</Text>
                            <View style={styles.interval}/>
                            <View style={styles.inputLayout}>
                                <TextInput
                                    onChangeText={this.props.handle}
                                    value={this.props.value}
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    placeholder={this.props.placeholder}
                                />
                            </View>
                            {this.renderUnderLabel()}
                        </View>
                        {this.renderFooter()}
                    </View>
                </View>
            </Modal>
        )
    }
}

SignInFindPwdModal.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    body: PropTypes.string,
    closeModal: PropTypes.func,
    handle: PropTypes.func,
    checkNo: PropTypes.number,
    checkLabel: PropTypes.string,
    sendPwd: PropTypes.func,
    footerText: PropTypes.string,
};

const styles = StyleSheet.create({
    title: {
        width: 280,
        paddingTop: 36,
        paddingBottom: 20,
        alignSelf: 'center'
    },
    titleText: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    body: {
        flex:1,
        width: 250,
        padding: 10,
        alignSelf: 'center',
    },
    bodyText: {
        fontSize: 15,
        color: 'black',
        alignSelf: 'center',
        textAlign: 'center',
    },
    footer: {
        justifyContent:'center',
        alignItems: 'center',
        height: 61,
        width: 280,
        backgroundColor: 'rgb(236,236,236)',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    footerSelect: {
        justifyContent:'center',
        alignItems: 'center',
        height: 61,
        width: 280,
        backgroundColor: '#7c828c',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    footerText:{
      fontSize:16,
      color:'black'
    },
    footerSelectText:{
        fontSize:16,
        color:'white'
    },
    interval: {
        width: '100%',
        height: 30,
    },
    inputLayout: {
        flexDirection: 'row',
        height: 44,
        width: 250,
        backgroundColor: 'white',
        paddingLeft: 10,
        borderColor:'#979797',
        borderWidth:1,
        alignSelf: 'center',
    },
    input: {
        flex: 1
    },
    underLabel: {
        width: '100%',
        marginTop: 5,
        textAlign: 'center'
    }
});