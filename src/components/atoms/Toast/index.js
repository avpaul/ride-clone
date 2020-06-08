import React from "react";
import PropTypes from "prop-types";
import { TouchableHighlight } from "react-native-gesture-handler";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { box_shadow } from "../../../styles";
import { hideToast } from "../../../redux/actions/toast";

const Toast = () => {
  const dispatch = useDispatch();
  const { show, message } = useSelector(({ toast }) => toast);

  const handlePress = () => {
    hideToast()(dispatch);
  };
  return (
    <>
      {show && (
        <View style={style.container}>
          <TouchableHighlight underlayColor="#f0f0f0" onPress={handlePress}>
            <View>{message}</View>
          </TouchableHighlight>
        </View>
      )}
    </>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    top: '15%',
    width: "95%",
    marginRight: "2.5%",
    marginLeft: "2.5%",
    padding: 15,
    backgroundColor: "#fff",
    ...box_shadow,
  },
});

export default Toast;
