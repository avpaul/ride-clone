import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import RNBottomSheet from "react-native-raw-bottom-sheet";
import BottomSheetHeader from "../../atoms/BottomSheetHeader";
import BottomSheetContent from "../../molecules/BottomSheetContent";
import { useSelector, useDispatch } from "react-redux";
import { hideBottomSheet } from "../../../redux/actions/navigation";

const BottomSheet = ({ navigation }) => {
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
      height={400}
      openDuration={250}
      onClose={handleClose}
      closeOnDragDown
    >
      <BottomSheetHeader />
      <BottomSheetContent navigation={navigation} />
    </RNBottomSheet>
  );
};

const style = {
  wrapper: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  container: {
    width: "100%",
    paddingRight: 20,
  },
};

export default BottomSheet;
