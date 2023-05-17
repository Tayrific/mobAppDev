import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import colors from "../Constants/colors";
import { Entypo } from "@expo/vector-icons";

const CustomHeaderButton = (props) => {
    return (
        <HeaderButton
        {...props}
        IconComponent={Entypo}
        iconSize={30}
        color={props.color ?? colors.brown}
        />
    );
}

export default CustomHeaderButton;
