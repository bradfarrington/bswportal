import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { send } from "@emailjs/react-native";
import styles from "../components/style";
const products = [
  { id: 1, name: "Windows / Doors" },
  { id: 2, name: "Composite Doors" },
  { id: 3, name: "Essentials Doors" },
  { id: 4, name: "uPVC Doors" },
  { id: 5, name: "Double Glazed Units" },
  { id: 6, name: "Repairs" },
  { id: 7, name: "Sky Rooms" },
  { id: 8, name: "Conservatories" },
];

const Quote = (props) => {
  const [filename, setFilename] = useState(props?.route?.params?.filename);
  const [uri, seturi] = useState(props?.route?.params?.uri);
  const [firstSurname, setFirstSurname] = useState("");
  const [email, setEmail] = useState("");
  const [mobtel, setMOBTEL] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [autoFill, setAutoFill] = useState(false);
  const [savedData, setsavedData] = useState();
  const saveData = {
    firstname: firstSurname,
    email: email,
    mobtel: mobtel,
  };
  const data = {
    AB_CUSTID: "6008198",
    AB_PWORD: "WOSWl7utR32r",
    FIRSTSURNAME: firstSurname,
    EMAIL: email,
    MOBTEL: mobtel,
    PRODINTEREST1: selectedProduct,
    QUOTETYPE: "Web Lead",
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("formData", jsonValue);
    } catch (e) {
      console.log("error in saving data", e);
    }
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("formData");
      const data = JSON.parse(jsonValue);
      setsavedData(data);
    } catch (e) {
      console.log("error in getting data :", e);
    }
  };
  const setData = () => {
    setFirstSurname(savedData.firstname);
    setEmail(savedData.email);
    setMOBTEL(savedData.mobtel);
  };
  useEffect(() => {
    if (autoFill) {
      setData();
    }
  }, [autoFill]);
  useEffect(() => {
    getData();
  }, []);
  const handleSubmit = async () => {
    if (email && mobtel && firstSurname && selectedProduct) {
      storeData(saveData);
      if (filename) {
        try {
          setLoading(true);
          const fn = `${filename}`;
          const result = await FileSystem.downloadAsync(
            `${uri}`,
            FileSystem.documentDirectory + filename
          );
          save(result.uri, fn, result.headers["Content-Type"]);
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          setLoading(true);
          const response = await axios.post(
            "https://webleads.abinitiosoftware.co.uk/api/LeadDetails",
            data
          );
          console.log(response.status);
          if (response.status === 200) {
            setLoading(false);
            alert(
              "Thank you for your enquiry, one of our sales executives will contact you as soon as they can!"
            );
            props.navigation.goBack();
          } else {
            setLoading(false);
            alert("Operation Not successfull");
          }
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      alert("Please fill all the fields");
    }
  };
  const save = async (uri, filename, mimetype) => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        try {
          const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const createdFileUri =
            await FileSystem.StorageAccessFramework.createFileAsync(
              permissions.directoryUri,
              filename,
              mimetype
            );
          await FileSystem.writeAsStringAsync(createdFileUri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const response = await axios.post(
            "https://webleads.abinitiosoftware.co.uk/api/LeadDetails",
            data
          );
          console.log(response.status);
          if (response.status === 200) {
            setLoading(false);
            alert(
              "Your Brochure will be downloaded! Thank you for your enquiry, one of our sales executives will contact you as soon as they can!"
            );
          } else {
            setLoading(false);
            alert("Operation Not successfull");
          }
        } catch (error) {
          console.error("Error while saving file:", error);
        }
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
      const response = await axios.post(
        "https://webleads.abinitiosoftware.co.uk/api/LeadDetails",
        data
      );
      console.log(response.status);
      if (response.status === 200) {
        setLoading(false);
        alert(
          "File has been downloaded! Thank you for your enquiry, one of our sales executives will contact you as soon as they can!"
        );
      } else {
        setLoading(false);
        alert("Operation Not successfull");
      }
    }
  };
  const sendEmail = async () => {
    try {
      const serviceID2 = "service_0qj3pjd";
      const templateID = "template_jl9xngp";
      const apiKey1 = "JhWUvXL2EdXZS3OUf";
      await send(
        serviceID2,
        templateID,
        {
          to_name: "Brad",
          from_name: "Web Lead",
          name: `${firstSurname}`,
          email: `${email}`,
          mobtel: `${mobtel}`,
          product: `${selectedProduct}`,
        },
        {
          publicKey: apiKey1,
        }
      );
      console.log("email sent ");
    } catch (error) {
      console.error(error);
      console.log("error :", error);
    }
  };
  return (
    <View style={styles.containerQoute}>
      <TextInput
        style={styles.textInput}
        placeholder="Surname"
        onChangeText={setFirstSurname}
        value={firstSurname}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Mobile Number"
        onChangeText={setMOBTEL}
        value={mobtel}
        keyboardType="numeric"
      />
      <Text style={styles.buttontext}>Select a product:{selectedProduct}</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedProduct}
        onValueChange={(itemValue, itemIndex) => setSelectedProduct(itemValue)}
      >
        <Picker.Item
          label="Please Choose A Product"
          value={null}
          style={{ fontFamily: "RB" }}
        />
        {products.map((product) => (
          <Picker.Item
            key={product.id}
            label={product.name}
            value={product.name}
            style={{ fontFamily: "RR" }}
          />
        ))}
      </Picker>
      {savedData ? (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={autoFill ? styles.checkBoxFill : styles.checkBox}
            onPress={() => {
              setAutoFill(!autoFill);
            }}
          >
            <Text style={{ color: "red", fontWeight: "bold", fontSize: 22 }}>
              {autoFill ? "✓" : ""}
            </Text>
          </TouchableOpacity>
          <Text style={{ alignSelf: "center" }}>Auto Fill</Text>
        </View>
      ) : null}
      {!loading ? (
        <TouchableOpacity
          style={styles.buttonSubmit}
          onPress={() => {
            handleSubmit();
            sendEmail();
          }}
        >
          <Text style={styles.buttontextSubmit}>Submit</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator size={"large"} />
      )}
    </View>
  );
};

export default Quote;
