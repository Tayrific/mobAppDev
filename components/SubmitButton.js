import React from "react";
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from "../Constants/colors";

const SubmitButton = props => {

    const enabledBgColor = props.color || colors.primaryButton;
    const disabledBgColor = colors.evenLighterPink;
    const bgColor = props.disabled ? disabledBgColor : enabledBgColor;

    return <TouchableOpacity style={{...styles.button, ...{backgroundColor: bgColor}}}>
        <Text style = {{ color: props.disabled ? colors.lightPink : 'white'}}>
            click me
        </Text>
    </TouchableOpacity>

};

const styles = StyleSheet.create({
    button: {

        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }

});

export default SubmitButton;

