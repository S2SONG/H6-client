import React from 'react'
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import {LinkText} from "./LinkText";

export class FindPwdModal extends React.Component{

    render(){
        return(
            <Modal isVisible={this.props.visible}>
                <View style={{ flex: 1,justifyContent:'center', alignItems:'center'}}>
                    <View style={{height:300, width:250, backgroundColor:'#ffffff'}}>
                        <View name='header' style={{flex:1, flexDirection:'row', justifyContent: 'center', height:60, width:250, padding:10}}>
                            <Text>{this.props.title}</Text>
                        </View>
                        <View name='body' style={{height:180, width:250, padding:10}}>
                            <Text>{this.props.body}</Text>
                        </View>
                        <View name='footer' style={{height:60, width:250, padding:10}}>
                            <LinkText
                                value='닫기'
                                handle={this.props.handle}
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
    handle: PropTypes.func

    // closeModal : PropTypes.func,
};