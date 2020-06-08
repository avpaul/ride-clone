import { Alert, Platform } from "react-native";

export default class AlertService {
  static alert({
    title,
    message,
    onOkPress = () => null,
    onCancelPress = () => null,
    cancelText = "",
    okText = "Ok"
  }) {

    if(Platform.OS === 'web'){
      const res = window.confirm(message);
      if(res){
        onOkPress();
      }
      return;
    }

    Alert.alert(
      title,
      message,
      [
        {
          text: cancelText,
          onPress: () => onCancelPress(),
          style: "cancel",
        },
        { text: okText, onPress: () => onOkPress() },
      ],
      { cancelable: true }
    );
  }
}
