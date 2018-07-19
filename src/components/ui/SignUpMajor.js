import React from 'react';
import {StyleSheet, View, TouchableHighlight,Text, AsyncStorage} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import PropTypes from 'prop-types';
import config from "../../../config";
const ROOT_URL = config.server;

export class SignUpMajor extends React.Component {

    constructor(props){
        super(props);

    }

    render() {
        // console.log(this.props.visible);

        return (

            <View style={styles.container}>

                <Dropdown
                    containerStyle={{ marginLeft:10}}
                    rippleOpacity={0}
                    shadeOpacity={0}
                    baseColor={'black'}
                    value={this.props.placeholder}
                    data={this.props.track}
                    onChangeText={this.props.handle}

                    // isFocused={this.props.focus}
                    // onChangeText={this.props.check}
                />
            </View>



        )
    }
}
SignUpMajor.propTypes = {
    handle: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    track:PropTypes.array,
    focus:PropTypes.func,
    check:PropTypes.func,
    click:PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        width: '70%'
    },

});