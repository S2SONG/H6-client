import React from 'react';
import { StyleSheet,  View, Text } from 'react-native';
import PropTypes from 'prop-types';
import RoundCheckbox from 'rn-round-checkbox';
import {LinkText} from "./LinkText";

export class TermsListItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <View style={{alignItems:'center'}}>
                <View style={{flexDirection:'row', justifyContent:'flex-start', height:40, width:300, marginBottom:10, padding:10,paddingLeft:20}}>
                    <RoundCheckbox
                        size={24}
                        checked={this.props.checked}
                        backgroundColor="#989898"
                        onValueChange={this.props.onValueChange}
                    />
                    <Text style={{width:180, marginLeft:10}}>
                        {this.props.title}
                    </Text>
                    <LinkText
                        value={this.props.modalText}
                        handle={this.props.modalHandle}
                        link_style={{color:'grey'}}
                    />
                </View>
            </View>
        )
    }
}

TermsListItem.propTypes = {
    title: PropTypes.string,
    checked: PropTypes.bool,
    onValueChange: PropTypes.func,
    modalHandle: PropTypes.func,
    modalText: PropTypes.string,

};

const styles = StyleSheet.create({

});