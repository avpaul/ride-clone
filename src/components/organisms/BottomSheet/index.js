import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import RNBottomSheet from "react-native-raw-bottom-sheet";
import BottomSheetHeader from "../../atoms/BottomSheetHeader";
import BottomSheetContent from "../../molecules/BottomSheetContent";
import { useSelector, useDispatch } from "react-redux";
import { hideBottomSheet } from "../../../redux/actions/navigation";

const BottomSheet = ({ navigation, busStop, buses }) => {
  const [ref, setRef] = useState();
  const bottomSheet = useSelector(
    ({ navigation: { bottomSheet } }) => bottomSheet
  );

  useEffect(() => {
    if (ref && ref.open && bottomSheet) {
      ref.open();
    }
    if (ref && ref.open && !bottomSheet) {
      ref.close();
    }
  }, [ref, bottomSheet]);

  const dispatch = useDispatch();

  const handleClose = () => {
    hideBottomSheet()(dispatch);
  };

  return (
    <RNBottomSheet
      ref={(r) => setRef(r)}
      customStyles={style}
      onClose={handleClose}
      minClosingHeight={100}
      height={340}
      closeOnDragDown
    >
      <BottomSheetHeader />
      <BottomSheetContent
        navigation={navigation}
        busStop={busStop}
        buses={buses}
      />
    </RNBottomSheet>
  );
};

const style = {
  wrapper: {
    height: 0,
    backgroundColor: "rgba(0, 0, 0, .05)",
  },
  container: {
    width: "100%",
  },
};

export default BottomSheet;
