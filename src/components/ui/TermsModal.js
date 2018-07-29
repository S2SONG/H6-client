import React from 'react';
import { StyleSheet, Modal, ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import HTML from 'react-native-render-html';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';

export class TermsModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }

    }

    render(){
        return(
            <Modal
                visible = { this.props.modalVisible }
                animationType = { 'slide' }
                onRequestClose = { this.props.closeModal }
            >
                <View style={{ flex: 1,justifyContent:'center', alignItems:'center', backgroundColor:'#31313187'}}>
                    <View style={{height:670,width:400,borderRadius: 200}}>
                        <View name='header' style={{flex:1, height:60, width:'100%', padding:15, alignItems:'flex-end'}}>
                            {/*<Icon name="md-close" type="ionicon" style={{alignSelf: 'flex-end'}}*/}
                            {/*onPress={this.props.closeModal}/>*/}
                            <View style={{height: 42, width: this.props.width, alignItems: 'flex-end',borderRadius:200}}>
                                <Icon name={'ios-close-circle-outline'}
                                      type='ionicon'
                                      color='#ffffff'
                                      style={{alignSelf: 'flex-end'}}
                                      size={35}
                                      underlayColor={'#7c828c00'}
                                      onPress={this.props.closeModal}/>
                            </View>
                            <View style = { styles.modalContainer } >
                                <ScrollView style = { styles.innerContainer } >
                                    <Text h3 style = { styles.headerText }>{ this.props.title }</Text>
                                    <HTML html={this.props.htmlContent}/>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

TermsModal.propTypes = {
    closeModal : PropTypes.func,
    modalVisible : PropTypes.bool,
    title : PropTypes.string,
    htmlContent: PropTypes.string
};

const styles = StyleSheet.create({
    modalContainer : {
        flex : 1,
        padding : 0,
        paddingTop : 30,
        backgroundColor : 'white',
    },
    innerContainer : {
        flex : 1,
        padding : 10,
    },
    headerText : {
        textAlign : 'center'
    },
    buttonContainer : {
        height : 60,
        paddingTop : 5,
        paddingBottom : 5,
        width : '100%'
    }
});