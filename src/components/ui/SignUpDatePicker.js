import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Dropdown} from 'react-native-material-dropdown';

export class SignUpDatePicker extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Dropdown
                    // containerStyle={{alignSelf:'center'}}
                    rippleOpacity={0}
                    // itemTextStyle={{alignItems:'center'}}
                    shadeOpacity={0}
                    baseColor={'black'}
                    value={this.props.placeholder}
                    data={this.props.year}
                    onChangeText={this.props.handle}
                    pickerStyle ={{borderRadius:20}}
                    // overlayStyle={{marginBottom:100}}
                />
            </View>
        )
    }
}

SignUpDatePicker.propTypes = {
    handle: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    year:PropTypes.array
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        width: '70%',
    },
});