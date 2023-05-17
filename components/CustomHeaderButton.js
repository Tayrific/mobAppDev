import React from "react";
import { HeaderButton, Item } from "react-navigation-header-buttons";
import colors from "../Constants/colors";
import { Ionicons } from "@expo/vector-icons";

const CustomHeaderButton = (props) => {
    return (
        <HeaderButton
        {...props}
        IconComponent={Ionicons}
        iconSize={30}
        color={props.color ?? colors.brown}
        />
    );
}

export default CustomHeaderButton;
