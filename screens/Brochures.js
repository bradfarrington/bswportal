import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import styles from "../components/style";
import { collection, getDocs, query } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firestoreDb } from "../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
const { scale } = Dimensions.get("window");
const Brochures = () => {
  const [BrochureData, setBrochureData] = useState([]);
  const [MaintenanceData, setMaintenanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const { navigate } = useNavigation();
  const getData = async () => {
    try {
      const data1 = [];
      const data2 = [];

      const lastQueryTime = await AsyncStorage.getItem("lastQueryTime");
      const currentTime = Date.now();
      setLoading(true);
      if (
        !lastQueryTime ||
        currentTime - parseInt(lastQueryTime) >= 24 * 60 * 60 * 1000
      ) {
        const q1 = query(collection(firestoreDb, "brochures"));
        const q2 = query(collection(firestoreDb, "maintenanceguides"));
        const result1 = await getDocs(q1);
        const result2 = await getDocs(q2);
        result1.forEach((x) => {
          data1.push(x.data());
        });
        result2.forEach((x) => {
          data2.push(x.data());
        });
        setBrochureData(data1);
        setMaintenanceData(data2);

        // Update the last query time in AsyncStorage
        await AsyncStorage.setItem("lastQueryTime", currentTime.toString());

        // Store the data in AsyncStorage
        await AsyncStorage.setItem("cachedBrochureData", JSON.stringify(data1));
        await AsyncStorage.setItem(
          "cachedMaintenanceData",
          JSON.stringify(data2)
        );
        console.log("from firebase");
      } else {
        // Use cached data if 24 hours haven't passed
        console.log("cached data");
        const cachedBrochureData = JSON.parse(
          await AsyncStorage.getItem("cachedBrochureData")
        );
        const cachedMaintenanceData = JSON.parse(
          await AsyncStorage.getItem("cachedMaintenanceData")
        );
        setBrochureData(cachedBrochureData);
        setMaintenanceData(cachedMaintenanceData);
      }
      setLoading(false);
    } catch (e) {
      console.log("request failed:", e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  async function downloadAndSaveFile(filename, url) {
    try {
      setProgress(filename);
      console.log(url);
      const fileUri = `${FileSystem.documentDirectory}${filename}`;
      const downloadedFile = await FileSystem.downloadAsync(url, fileUri);
      if (downloadedFile.status != 200) {
        Alert.alert("Downloading failed");
      }
      const UTI = "public.item";
      const shareResult = await Sharing.shareAsync(downloadedFile.uri, { UTI });
      console.log("PDF file downloaded and saved successfully.", url);
      Alert.alert("PDF file downloaded and saved successfully.");
      setProgress(null);
    } catch (error) {
      setProgress(null);
      console.error("Error downloading and saving the PDF file:", error);
    }
  }
  const renderItemBrochure = ({ item }) => {
    return (
      <View style={style.container}>
        <Image
          style={style.image}
          resizeMethod="scale"
          resizeMode="contain"
          source={{ uri: item.image }}
        />
        <TouchableOpacity
          // onPress={() => downloadAndSaveFile(item.filename, item.link)}
          onPress={() => {
            navigate("PDfViewer", {
              url: item.link,
            });
          }}
          style={[
            progress !== null ? styles.disbutton : styles.button,
            { alignItems: "center" },
          ]}
          disabled={progress !== null}
        >
          {item.filename !== progress ? (
            <>
              <Text style={styles.buttontext}>{item.title}</Text>

              <AntDesign name="arrowright" size={20} color="#fff" />
            </>
          ) : (
            <ActivityIndicator size={"large"} color={"#FFF"} />
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#F9F9FB" }}>
      {!loading ? (
        <FlatList
          data={BrochureData}
          renderItem={renderItemBrochure}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </View>
  );
};

export default Brochures;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 350,
    marginHorizontal: scale * 5,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    margin: scale * 6,
    alignSelf: "center",
  },
});
