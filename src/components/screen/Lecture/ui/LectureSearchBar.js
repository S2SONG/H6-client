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
                    placeholder={this.props.placeholder}
                />
                <Icon
                    containerStyle={styles.iconStyle}
                    name='md-search'
                    type='ionicon'
                    color='black'
                    //underlayColor={'#f6f7f9'}
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
    placeholder: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: 2,
        backgroundColor: 'transparent',
        height: 40,
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },
    inputStyle: {
        flex:1,
    },
    iconStyle: {
        width:30,
        margin:10
    }
});