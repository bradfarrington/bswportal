import React, { useState } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  ActivityIndicator
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { AntDesign } from "@expo/vector-icons";

const Gallery = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };
  const handleImagePress = (index) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const renderImages = () => {
    return props.images.map((image, index) => (
      <TouchableOpacity key={index} onPress={() => handleImagePress(index)}>
        {imageLoading && <ActivityIndicator size="large" color="red" />}
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
          onLoad={handleImageLoad}
        />
      </TouchableOpacity>
    ));
  };

  const images = props.images.map((image) => ({ url: image }));

  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {renderImages()}
      </ScrollView>

      <Modal visible={modalVisible} transparent={true}>
        <ImageViewer
          imageUrls={images}
          index={selectedImageIndex}
          enableSwipeDown={true}
          onCancel={() => setModalVisible(false)}
          onSwipeDown={() => setModalVisible(false)}
          renderHeader={() => (
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
          )}
        />
      </Modal>
    </View>
  );
};
const { width, height, scale } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: width / 1.2,
    height: height / 1.5,
    marginHorizontal: scale * 5,
    borderColor: "black",
    borderWidth: scale * 1.1,
    borderRadius: scale * 10,
    margin: scale * 6,
    alignSelf: "center",
  },
  closeButton: {
    position: "absolute",
    top: 35,
    right: 35,
    zIndex: 999,
  },
});

export default Gallery;
