import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import PropTypes from 'prop-types';

export class SemesterPicker extends React.Component {

    render() {
        let data = [
            {
                value: '2018년 1학기',
            },
            {
                value: '2018년 2학기',
            },
            {
                value: '2017년 1학기',
            },
            {
                value: '2017년 2학기',
            },
            {
                value: '2016년 1학기',
            }, {
                value: '2016년 2학기',
            }, {
                value: '2015년 1학기',
            }, {
                value: '2015년 2학기',
            }, {
                value: '2014년 1학기',
            }, {
                value: '2014년 2학기',
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
                    />
                </View>
            </View>
        )
    }

}

SemesterPicker.propTypes = {
    handle: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string
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