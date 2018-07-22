import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Modal} from 'react-native';
import PropTypes from 'prop-types';

export class MajorPickerModal extends React.Component {

    render() {
        return (
            <Modal animationType="slide"
                   transparent={false}
                   visible={this.props.visible}>
                <View style={styles.modal}>
                    <View style={styles.container}>
                    </View>
                </View>
            </Modal>
        )
    }
}

MajorPickerModal.propTypes = {
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

MajorPickerModal.defaultProps = {
  visible: true
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
        width: 200,
        height: 150
    }
});