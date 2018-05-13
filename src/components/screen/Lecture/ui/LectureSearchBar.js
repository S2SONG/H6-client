import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';

export class LectureSearchBar extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                    underlineColorAndroid={'transparent'}
                />
                <Icon
                    containerStyle={styles.iconStyle}
                    name='md-search'
                    type='ionicon'
                    color='#4e72fc'
                    underlayColor={'#f6f7f9'}
                    onPress={this.props.searchHandler}
                    size={30}
                />
            </View>
        )
    }
}

LectureSearchBar.propTypes = {
    onChangeText: PropTypes.func,
    searchHandler: PropTypes.func,
    value: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: 20,
        backgroundColor: '#f6f7f9',
        height: 40,
        borderRadius: 25
    },
    inputStyle: {
        flex:1,
    },
    iconStyle: {
        width:30,
        margin:10
    }
});