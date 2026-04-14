import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Pdf from "react-native-pdf";
import CircularProgress from "react-native-circular-progress-indicator";
import { RouteProp, useRoute } from "@react-navigation/native";
type RootStackParamList = {
  PdfViewer: { url: string };
};

type PdfViewerRouteProp = RouteProp<RootStackParamList, "PdfViewer">;

const PdfViewerScreen = () => {
  const route = useRoute<PdfViewerRouteProp>();
  const { url } = route.params;
  console.log("URL :", url);

  const source = {
    uri: url,
    cache: true,
    trusty: true,
  };

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        trustAllCerts={false}
        style={styles.pdf}
        renderActivityIndicator={(progress) => (
          <CircularProgress
            value={10}
            radius={50}
            activeStrokeColor={'red'}
            progressValueColor={"#000"}
            maxValue={100}
            title={"%"}
            titleColor={"#000"}
            titleStyle={{ fontWeight: "bold" }}
          />
        )}
        onLoadComplete={(pages) => {
          console.log(`PDF loaded with ${pages} pages`);
        }}
        onError={(error) => {
          console.error(error);
          alert("Something went wrong!");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
});

export default PdfViewerScreen;
