import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import BusStop from "../../../assets/icons/bus-stop";
import RightArrow from "../../../../assets/icons/arrow_right";
import Bus from "../../../../assets/icons/bus-blue";


const colors = {
  lightGray: "rgba(237, 237, 237, 1)",
};

export default ({
  renderHeader = true,
  renderTitle = true,
  itemSubTitle,
  headerLeft,
  headerRight,
  titleStyle,
  itemTitle,
  pressHandler,
  isBus,
  noNav,
  itemBold,
  ...props
}) => {
  const { rightComponent = <RightArrow width={30} height={30} /> } = props;
  return (
    <View style={styles.container}>
      {renderHeader && (
        <View style={styles.headerWrapper}>
          <Text style={styles.headerLeft}>{headerLeft}</Text>
          <Text style={styles.headerRight}>{headerRight}</Text>
          <View />
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.item}
        onPress={pressHandler}
      >
        <View style={{flexDirection:'row', alignItems: 'center', paddingBottom: 15}}>
          <View style={styles.itemLeft}>
            {!isBus && <BusStop width={30} height={30} />}
            {isBus && <Bus width={28} height={28} />}
          </View>
          <View style={styles.itemCenter}>
            {renderTitle && (
              <Text style={[styles.itemTitle, titleStyle]}>{itemTitle}</Text>
            )}
            {itemSubTitle ? <Text style={styles.itemSubTitle}>{itemSubTitle}</Text> : null}
            {itemBold ? <Text style={styles.itemBold}>{itemBold}</Text> : null}
          </View>
        </View>

        {!noNav && rightComponent}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    justifyContent: "center",
    borderBottomColor: '#e8e8e8',
    paddingBottom: 15,
    marginBottom: 10,
    borderBottomWidth: 1
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLeft: {
    width: 50,
    backgroundColor: colors.lightGray,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  headerRight: {
    width: "78%",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  item: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  itemLeft: {
    backgroundColor: colors.lightGray,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  itemCenter: {
    height: 50,
    width: '100%',
    justifyContent: "flex-start",
    marginLeft: 10,
    marginTop:5
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
    maxWidth: '85%'
  },
  itemSubTitle: {
    fontSize: 16,
    fontWeight: '400',
    maxWidth: '70%'
  },
  itemBold:{
    fontSize: 20,
    fontWeight: '400',
  }
});
