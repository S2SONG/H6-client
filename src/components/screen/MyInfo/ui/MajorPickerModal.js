import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Platform, PickerIOS} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import RoundCheckbox from 'rn-round-checkbox';
import PickerAndroid from 'react-native-picker-android';
import EStyleSheet from 'react-native-extended-stylesheet';
import config from "../../../../../config";

let Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid;
let PickerItem = Picker.Item;

export class MajorPickerModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value+''
        }
    }

    componentDidMount() {
        // this.setState({value: this.props.value});
        if(this.props.value === null && this.props.data.length > 0){
            this.setState({
                value: this.props.data[0]
            })
        }
    }

    handleChangeValue = async () => {
        if (this.state.value === null)
            await this.props.handle(this.props.value);
        else
            await this.props.handle(this.state.value);
        // this.props.closeModal();
        this.handleCloseModal();
    };

    handleCloseModal = () => {
        if(this.props.value === null){
            this.setState({
                value:null,
            })
        } else {
            this.setState({
                value: this.props.value,
            })
        }
        this.props.closeModal();
    };

    renderClose = () => {
        const dataStyle = EStyleSheet.create({
            close : {
                height: '3rem',
                width: '85.87%',
                alignItems: 'flex-end'
            }
        });
        return (
            <View style={dataStyle.close}>
                <Icon name={'ios-close-circle-outline'}
                      type='ionicon'
                      color='#ffffff'
                      style={{alignSelf: 'flex-end'}}
                      size={35}
                      underlayColor={'#7c828c00'}
                      onPress={this.handleCloseModal}/>
            </View>
        )
    };

    render() {
        return (
            <Modal animationType="slide"
                   onRequestClose={() => {
                   }}
                   visible={this.props.visible}>
                <View style={styles.modal}>
                    {this.renderClose()}
                    <View style={[styles.container, config.shadow]}>
                        <View style={styles.wheelPicker}>
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.value}
                                onValueChange={(value) => this.setState({value:value})}>
                                {this.props.data.map((item, i) => (
                                    <PickerItem
                                        key={i}
                                        value={item}
                                        label={item+''}
                                    />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.footerContainer}>
                            <RoundCheckbox
                                size={35}
                                checked={this.props.checked}
                                onValueChange={this.handleChangeValue}
                                backgroundColor={'#4a4a4a'}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

MajorPickerModal.propTypes = {
    visible: PropTypes.bool,
    closeModal: PropTypes.func,
    checked: PropTypes.bool,
    data: PropTypes.array,
    value: PropTypes.string,
    handle: PropTypes.func,
};

MajorPickerModal.defaultProps = {
    value: "",
    visible: true,
    checked: true,
    data: [],
};

const styles = EStyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: '#31313187',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: '85.87%',
        aspectRatio: 322 / 294,
        backgroundColor: '#ffffff',
        borderRadius: '0.857rem',
        alignItems: 'center',
        justifyContent: 'center'
    },
    wheelPicker: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    picker:{
        width:'23.0357rem'
    },
    footerContainer: {
        width: '100%',
        aspectRatio: 322 / 87,
        justifyContent: 'center',
        alignItems: 'center'
    }
});