import React from 'react'
import {View, Modal, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';

export class CustomModal extends React.Component {
    renderClose = () => {
        if(this.props.close){
            return(
                <View style={{height: 42, width: this.props.width, alignItems: 'flex-end'}}>
                    <Icon name={'ios-close-circle-outline'}
                          type='ionicon'
                          color='#ffffff'
                          style={{alignSelf: 'flex-end'}}
                          size={35}
                          underlayColor={'#7c828c00'}
                          onPress={this.props.close}/>
                </View>
            )
        }else{
            return null
        }
    };

    renderTitle = () => {
        if(this.props.title){
            return(
                <View style={styles.title}>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                </View>
            )
        }else{
            return null
        }
    };

    renderBody = () => {
      if(this.props.body){
          return(
              <View style={styles.body}>
                  {this.props.body()}
              </View>
          )
      } else {
          return null
      }
    };

    renderFooter = () => {
        if(this.props.footer){
            return(
                <TouchableOpacity onPress={this.props.footerHandle}>
                    <View style={styles.footerSelect}>
                        <Text style={styles.footerSelectText}>{this.props.footerText}</Text>
                    </View>
                </TouchableOpacity>)
        } else {
            return(<View style={styles.footer}>
                <Text style={styles.footerText}>{this.props.footerText}</Text>
            </View>)
        }
    };

    render() {
        return (
            <Modal visible={this.props.visible} animationType = { 'slide' } transparent={false} onRequestClose={() => {}}>
                <View style={{flex: 1, backgroundColor:'#31313187', justifyContent: 'center', alignItems: 'center'}}>
                    {this.renderClose()}
                    <View style={{height: this.props.height, width: this.props.width, backgroundColor: this.props.background, borderRadius: 5}}>
                        {this.renderTitle()}
                        <View style={{
                            flex:1,
                            width: '100%',
                            padding: this.props.padding,
                            alignSelf: 'center',
                        }}>
                            {this.renderBody()}
                        </View>
                        {this.renderFooter()}
                    </View>
                </View>
            </Modal>
        )
    }
}

CustomModal.propTypes = {

    close: PropTypes.func,
    title: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    background: PropTypes.string,
    visible: PropTypes.bool,
    body: PropTypes.func,
    footer: PropTypes.bool,
    footerText: PropTypes.string,
    footerHandle: PropTypes.func,
    padding: PropTypes.number
};

CustomModal.defaultProps = {
    width: 280,
    height: 291,
    background: '#ffffff',
    visible: false,
    footer: false,
    padding:10,
};

const styles = StyleSheet.create({
    title: {
        width: '100%',
        paddingTop: 36,
        paddingBottom: 20,
        alignSelf: 'center'
    },
    titleText: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center'
    },
    body: {
        flex:1,
        width: '100%',
        padding: 10,
        alignSelf: 'center',
    },
    footer: {
        justifyContent:'center',
        alignItems: 'center',
        height: 61,
        width: '100%',
        backgroundColor: 'rgb(236,236,236)',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    footerSelect: {
        justifyContent:'center',
        alignItems: 'center',
        height: 61,
        width: '100%',
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
});