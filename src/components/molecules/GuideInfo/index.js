import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import ListItem from "../../atoms/ListItem";
import placesService from "../../../services/places-service";
import distanceToFootTime from "../../../helpers/distanceToFootTime";
import formatDistance from "../../../helpers/formatDistance";

const GuideInfo = ({ navigation, busStop, buses }) => {
  const [pointAdress, setPointAdress] = useState();

  useEffect(() => {
    placesService
      .getPlaceAddress({
        latitude: busStop[0].props.latitude,
        longitude: busStop[0].props.longitude,
      })
      .then((adress) => {
        setPointAdress(adress);
      });
  }, [busStop]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={style.scrollView}>
      <View style={style.container}>
        <Text style={style.title}>Wait for your next bus at:</Text>

        <ListItem
          {...{
            itemTitle: `${pointAdress ? pointAdress : "Loading.."}`,
            itemSubTitle: busStop[0]
              ? `${distanceToFootTime(
                  formatDistance(busStop[0].props.distance)
                )} away from your location`
              : "",
            renderTitle: true,
            renderHeader: false,
            noNav: true,
            pressHandler: () => null,
          }}
        />
        <View style={style.infoWrapper}>
          <Text style={style.title}>Nearby Buses</Text>

          {buses.map((bus, index) => (
            <ListItem
              {...{
                headerRight: bus ? `${distanceToFootTime(
                  formatDistance(
                    Math.abs(bus.props.distance - busStop[0].props.distance)
                  )
                )} away` : '',
                itemTitle: bus ? bus.props.route : '',
                itemSubTitle: bus
                  ? `Reaching your nearest bus stop in ${distanceToFootTime(
                      formatDistance(
                        Math.abs(bus.props.distance - busStop[0].props.distance)
                      )
                    )}`
                  : "",
                headerLeft: bus.props.id,
                renderTitle: true,
                renderHeader: true,
                isBus: true,
                pressHandler: () => null,
              }}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    width: "100%",
  },
  container: {
    width: "100%",
    paddingTop: 0,
    paddingLeft: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
  },
  wrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  textBold: {
    fontSize: 16,
    fontWeight: "600",
    paddingBottom: 10,
  },
  text: {
    fontWeight: "300",
    fontSize: 15,
    paddingBottom: 15,
  },
  pointImage: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 100,
    marginRight: 20,
    marginBottom: 10,
  },
  loading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default GuideInfo;
