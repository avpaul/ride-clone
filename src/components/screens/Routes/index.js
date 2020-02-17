import React, { useState } from "react";
import { Text } from "react-native";
import RoutesTemplate from '../../templates/Routes';

const Routes = () => {
    return (
        <RoutesTemplate toolBar={<Text> All Routes</Text>}/>
    );
};

export default Routes;