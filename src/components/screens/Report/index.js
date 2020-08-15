import React, { useState, useEffect } from "react";
import ModalSelector from "react-native-modal-selector";
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import _ from "lodash";

import { whiteColor, darkColor } from "../../../styles/colors";
import LeftArrowIcon from "../../../assets/icons/left-arrow.svg";
import incidentTypes from "../../../constants/incidentTypes";
import firebaseService from "../../../services/firebase-service";

const ItemComponent = ({ text }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const Report = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState();

  const [incident, setIncident] = useState();
  const [bus, setBus] = useState();
  const [description, setDescription] = useState();

  const handleSubmit = () => {
    if (incident && bus && description) {
      setLoading(true);
      firebaseService
        .addDocument({ type: incident, bus, description }, "incidents")
        .then(() => {
          setLoading(false);
          setIncident();
          setBus();
          setDescription();
          navigation.navigate("Home");
          Alert.alert("Success", "Incident reported successfully");
        })
        .catch(() => setLoading(false));
    }
  };

  useEffect(() => {
    setLoading(true);
    firebaseService
      .getCollection("vehicles")
      .then((result) => {
        setVehicles(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  return (
    <>
      <View>
        <View style={styles.wrapper}>
          <View
            style={{
              marginTop: 16,
              ...styles.toolbarHeaderWrapper,
            }}
          >
            <View style={styles.toolbarHeaderWrapper}>
              <TouchableHighlight
                onPress={() => navigation.navigate("Home")}
                style={styles.backButton}
              >
                <LeftArrowIcon height={24} width={24} fill={whiteColor} />
              </TouchableHighlight>
              <Text style={styles.toolbarTitle}>Report an incident</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={styles.container}>
            {loading && !bus && (
              <ActivityIndicator style={{ marginVertical: 20 }} />
            )}

            <Text style={styles.title}>Which type of incident occurred?</Text>
            <ModalSelector
              selectStyle={styles.modalStyle}
              initValueTextStyle={styles.text}
              cancelStyle={{ backgroundColor: whiteColor }}
              optionContainerStyle={styles.optionContainer}
              data={incidentTypes.map((value) => ({
                key: value,
                label: value,
                component: <ItemComponent text={value} />,
                value,
              }))}
              initValue={incident || "Select a type"}
              onChange={(option) => {
                setIncident(option.value);
              }}
            />

            <Text style={styles.title}>Select the bus number</Text>
            <ModalSelector
              selectStyle={styles.modalStyle}
              initValueTextStyle={[styles.text]}
              cancelStyle={{ backgroundColor: whiteColor }}
              optionContainerStyle={styles.optionContainer}
              data={_.uniqBy(vehicles, "id").map(({ id: value, name }) => ({
                key: value,
                label: value,
                component: <ItemComponent text={value} />,
                value,
              }))}
              initValue={bus || "Select a bus"}
              onChange={(option) => setBus(option.value)}
            />

            <Text style={styles.title}>Describe the incident</Text>
            <TextInput
              style={[styles.modalStyle, { height: 150 }]}
              placeholder="Description"
              placeholderStyle={{ padding: 20 }}
              multiline={true}
              numberOfLines={4}
              returnKeyType="done"
              onChangeText={(text) => setDescription(text)}
            />

            <TouchableOpacity
              style={styles.submitContainer}
              onPress={handleSubmit}
            >
              {!loading && <Text style={styles.submit}>SUBMIT</Text>}
              {loading && bus && <ActivityIndicator color={whiteColor} />}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  optionContainer: {
    backgroundColor: whiteColor,
    padding: 0,
  },
  submitContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000",
    marginBottom: 20,
    borderRadius: 10,
  },
  submit: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  modalStyle: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#888",
    marginBottom: 30,
  },
  itemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: whiteColor,
    borderRadius: 5,
    margin: 0,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
  title: {
    color: "#333",
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 15,
    marginBottom: 5,
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: 64,
    padding: 16,
    backgroundColor: darkColor,
  },
  toolbarHeaderWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toolBarHeader: {
    display: "flex",
    flexDirection: "row",
  },
  toolbarTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: whiteColor,
  },
  backButton: {
    marginRight: 12,
  },
});

export default Report;
