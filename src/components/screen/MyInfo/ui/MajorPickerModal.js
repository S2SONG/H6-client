import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Modal} from 'react-native';
import PropTypes from 'prop-types';
import RoundCheckbox from 'rn-round-checkbox';

export class MajorPickerModal extends React.Component {

    render() {
        return (
            <Modal animationType="slide"
                   transparent={false}
                   visible={this.props.visible}>
                <View style={styles.modal}>
                    <View style={styles.container}>
                        <View style={styles.wheelPicker}>

                        </View>
                        <View style={styles.footerContainer}>
                            <RoundCheckbox
                                size={35}
                                checked={this.props.checked}
                                onValueChange={this.props.closeModal}
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
};

MajorPickerModal.defaultProps = {
    visible: true,
    checked: true,
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor:'#31313187',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        height: 294,
        width: 322,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        alignItems:'center',
        justifyContent:'center'
    },
    wheelPicker: {
        flex:1,
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