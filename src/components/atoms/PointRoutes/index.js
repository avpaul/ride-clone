import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import BusIcon from "../../../../assets/icons/bus";
import { whiteColor, lightGrey, lightDark } from "../../../styles/colors";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { box_shadow } from "../../../styles";
import { setSelectedPointRoute } from "../../../redux/actions/routes";

const PointRoutes = ({ style }) => {
  const dispatch = useDispatch();
  const { data: routes } = useSelector(
    ({ routes: { pointRoutes } }) => pointRoutes
  );

  const handleOnPress = route => {
    setSelectedPointRoute(route)(dispatch);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={style}>
        {routes.map(route => (
          <View style={{ ...box_shadow }} key={route.name}>
            <TouchableOpacity
              onPress={() => handleOnPress(route)}
              style={_style.container}
            >
              <Text style={_style.name}>{route.name}</Text>
              <BusIcon width={18} height={18} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const _style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: whiteColor,
    width: "100%",
    borderRadius: 5,
    marginBottom: 5
  },
  name: {
    fontSize: 16
  }
});

export default PointRoutes;
