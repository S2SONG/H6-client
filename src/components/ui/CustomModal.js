import React from 'react'
import {View, Modal, Text, StyleSheet, TouchableOpacity,StatusBar} from 'react-native';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

export class CustomModal extends React.Component {

    componentDidMount(){
        // StatusBar.setHidden(true);
    }

    renderClose = () => {
        if(this.props.close){
            return(
                <View style={{height: 42, width: this.props.ratio, alignItems: 'flex-end'}}>
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
        if(this.props.renderFooter) {
            if (this.props.footer) {
                return (
                    <TouchableOpacity onPress={this.props.footerHandle}>
                        <View style={styles.footerSelect}>
                            <Text style={styles.footerSelectText}>{this.props.footerText}</Text>
                        </View>
                    </TouchableOpacity>)
            } else {
                return (<View style={styles.footer}>
                    <Text style={styles.footerText}>{this.props.footerText}</Text>
                </View>)
            }
        } else {
            return null;
        }
    };

    render() {
        return (
            <Modal visible={this.props.visible} transparent={true} onRequestClose={() => {}}>
                <View style={{flex: 1, backgroundColor:'#313131DE', justifyContent: 'center', alignItems: 'center'}}>
                    {this.renderClose()}
                    <View style={{width: this.props.ratio, aspectRatio: this.props.width/this.props.height, backgroundColor: this.props.background, borderRadius: 5}}>
                        {this.renderTitle()}
                        <View style={{
                            flex:1,
                            width: '100%',
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
    padding: PropTypes.number,
    ratio: PropTypes.string,
    renderFooter: PropTypes.bool,
};

CustomModal.defaultProps = {
    width: 280,
    height: 291,
    background: '#ffffff',
    visible: false,
    footer: false,
    padding:10,
    ratio: '90%',
    renderFooter: true
};

const styles = EStyleSheet.create({
    title: {
        width: '100%',
        paddingTop: '2.57rem',
        paddingBottom: '2.57rem',
        alignSelf: 'center',
    },
    titleText: {
        fontSize: '1.15rem',
        color: 'black',
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center'
    },
    body: {
        flex:1,
        width: '100%',
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
        backgroundColor: '#4a4a4a99',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    footerText:{
        fontSize:'1.15rem',
        color:'black'
    },
    footerSelectText:{
        fontSize:'1.15rem',
        color:'white'
    },
});