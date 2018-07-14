import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import PropTypes from 'prop-types';

export class SemesterPicker extends React.Component {

    render() {
        let data = [
            {
                value: '2018-1학기',
            },
            {
                value: '2018-2학기',
            },
            {
                value: '2017-1학기',
            },
            {
                value: '2017-2학기',
            },
            {
                value: '2016-1학기',
            }, {
                value: '2016-2학기',
            }, {
                value: '2015-1학기',
            }, {
                value: '2015-2학기',
            }, {
                value: '2014-1학기',
            }, {
                value: '2014-2학기',
            }
        ];
        return (
            <View style={styles.container}>
                <View  style={{
                    backgroundColor:'transparent',
                    height:49,
                    marginTop:10,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: 'rgb(216,216,216)',
                    justifyContent:'center'
                }} onPress={this.onPress}
                >
                    <Dropdown
                        value={'수강학기선택'}
                        containerStyle={{marginBottom:15, marginLeft:10}}
                        rippleOpacity={0}
                        shadeOpacity={0}
                        baseColor={'black'}
                        data={data}
                        onChangeText={this.props.handle}
                        // defaltValue={this.props.value}
                    />
                </View>
            </View>
        )
    }

}

SemesterPicker.propTypes = {
    handle: PropTypes.func,
    placeholder: PropTypes.string,
    // value: PropTypes.value
};

const styles = StyleSheet.create({
    container: {
        justifyContent:'flex-start',
        width: 200,
        height: 50,
        paddingLeft: 19,
        paddingBottom: 19,
    },
    picker:{
        width: 159,
        height: 40,
        backgroundColor:'transparent',
        paddingLeft: 19,
        paddingBottom:19,
        borderWidth:2,
        borderColor:'rgb(216,216,216)',
    }
});