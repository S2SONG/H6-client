import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';
import Picker from 'react-native-wheel-picker'
var PickerItem = Picker.Item;

const data = ['', '컴퓨터학부', '전기전자공학부', '글로벌미디어', '퍄퍄'];

export class TrackPicker extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    renderTitle = () => {
        console.log('major : ', this.props.major);
        return this.props.major ? this.props.major : this.props.title;
    };

    render() {
        return (
            <View>
                <TouchableHighlight style={styles.container} >
                    <Text>{this.renderTitle()}</Text>
                </TouchableHighlight>
                <Picker style={{width: 150, height: 180}}
                        selectedValue={this.props.major}
                        itemStyle={{color:"black", fontSize:26}}
                        onValueChange={(index) => console.log(index)}>
                    {data.map((value, i) => (
                        <PickerItem label={value} value={value} key={i}/>
                    ))}
                </Picker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 30,
    },
    wheelPicker: {
        width: 200,
        height: 150
    }
});

TrackPicker.propTypes = {
    title: PropTypes.string,
    major: PropTypes.string,
    handle: PropTypes.func
};