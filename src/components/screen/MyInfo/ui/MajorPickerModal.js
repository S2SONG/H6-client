import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Platform, PickerIOS} from 'react-native';
import PropTypes from 'prop-types';
import RoundCheckbox from 'rn-round-checkbox';
import PickerAndroid from 'react-native-picker-android';

let Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid;
let PickerItem = Picker.Item;

export class MajorPickerModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }

    componentDidMount() {
        console.log(this.state.value);
        this.setState({value: this.props.value});

    }

    handleChangeValue = async () => {
        if (this.state.value === null)
            await this.props.handle(this.props.value);
        else
            await this.props.handle(this.state.value);
        this.props.closeModal();
    };

    render() {
        return (
            <Modal animationType="slide"
                   transparent={false}
                   onRequestClose={() => {
                   }}
                   visible={this.props.visible}>
                <View style={styles.modal}>
                    <View style={styles.container}>
                        <View style={styles.wheelPicker}>
                            <Picker
                                style={{width: 300}}
                                selectedValue={this.state.value===null?this.props.value:this.state.value}
                                onValueChange={(value) => this.setState({value})}>
                                {this.props.data.map((item, i) => (
                                    <PickerItem
                                        key={i}
                                        value={item}
                                        label={item}
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

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: '#31313187',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        height: 294,
        width: 322,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wheelPicker: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerContainer: {
        width: '100%',
        height: 87,
        justifyContent: 'center',
        alignItems: 'center'
    }
});