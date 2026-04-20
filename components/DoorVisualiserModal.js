import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  PanResponder,
  ActivityIndicator,
  Modal,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import { WebView } from "react-native-webview";

const DraggableDoor = ({ doorSvgHtml, onRemove, isActive, onActivate }) => {
  const [boxState, setBoxState] = useState({ x: 50, y: 50, w: 120, h: 240 });
  const boxRef = useRef({ x: 50, y: 50, w: 120, h: 240 });
  const initialBox = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const updateBox = (newBox) => {
    boxRef.current = newBox;
    setBoxState(newBox);
  };

  const initPan = () => {
    onActivate();
    initialBox.current = { ...boxRef.current };
  };

  // Move entire box
  const panResponderMove = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: initPan,
      onPanResponderMove: (e, gestureState) => {
        updateBox({
          ...initialBox.current,
          x: initialBox.current.x + gestureState.dx,
          y: initialBox.current.y + gestureState.dy
        });
      },
    })
  ).current;

  // Resize Top Left
  const panResponderTL = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: initPan,
      onPanResponderMove: (e, gestureState) => {
        let next = { ...initialBox.current };
        if (initialBox.current.w - gestureState.dx >= 20) {
          next.x = initialBox.current.x + gestureState.dx;
          next.w = initialBox.current.w - gestureState.dx;
        }
        if (initialBox.current.h - gestureState.dy >= 20) {
          next.y = initialBox.current.y + gestureState.dy;
          next.h = initialBox.current.h - gestureState.dy;
        }
        updateBox(next);
      },
    })
  ).current;

  // Resize Top Right
  const panResponderTR = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: initPan,
      onPanResponderMove: (e, gestureState) => {
        let next = { ...initialBox.current };
        if (initialBox.current.w + gestureState.dx >= 20) {
          next.w = initialBox.current.w + gestureState.dx;
        }
        if (initialBox.current.h - gestureState.dy >= 20) {
          next.y = initialBox.current.y + gestureState.dy;
          next.h = initialBox.current.h - gestureState.dy;
        }
        updateBox(next);
      },
    })
  ).current;

  // Resize Bottom Left
  const panResponderBL = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: initPan,
      onPanResponderMove: (e, gestureState) => {
        let next = { ...initialBox.current };
        if (initialBox.current.w - gestureState.dx >= 20) {
          next.x = initialBox.current.x + gestureState.dx;
          next.w = initialBox.current.w - gestureState.dx;
        }
        if (initialBox.current.h + gestureState.dy >= 20) {
          next.h = initialBox.current.h + gestureState.dy;
        }
        updateBox(next);
      },
    })
  ).current;

  // Resize Bottom Right
  const panResponderBR = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: initPan,
      onPanResponderMove: (e, gestureState) => {
        let next = { ...initialBox.current };
        if (initialBox.current.w + gestureState.dx >= 20) {
          next.w = initialBox.current.w + gestureState.dx;
        }
        if (initialBox.current.h + gestureState.dy >= 20) {
          next.h = initialBox.current.h + gestureState.dy;
        }
        updateBox(next);
      },
    })
  ).current;

  return (
    <View
      style={[
        styles.draggableBox,
        {
          left: boxState.x,
          top: boxState.y,
          width: boxState.w,
          height: boxState.h,
          borderColor: isActive ? '#E5040A' : 'transparent',
          borderWidth: isActive ? 2 : 0,
        }
      ]}
    >
      <View style={StyleSheet.absoluteFillObject} {...panResponderMove.panHandlers}>
        <View pointerEvents="none" style={styles.imageStretched}>
          <WebView 
            source={{ html: doorSvgHtml, baseUrl: 'https://designer.bswwindows.co.uk/' }}
            style={{ flex: 1, backgroundColor: 'transparent' }}
            opaque={false}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      {isActive && (
        <TouchableOpacity style={styles.deleteBtn} onPress={onRemove}>
          <Ionicons name="close" size={16} color="#fff" />
        </TouchableOpacity>
      )}

      {isActive && (
        <>
          <View style={[styles.cornerHandle, styles.tl]} {...panResponderTL.panHandlers} />
          <View style={[styles.cornerHandle, styles.tr]} {...panResponderTR.panHandlers} />
          <View style={[styles.cornerHandle, styles.bl]} {...panResponderBL.panHandlers} />
          <View style={[styles.cornerHandle, styles.br]} {...panResponderBR.panHandlers} />
        </>
      )}
    </View>
  );
};

export default function DoorVisualiserModal({ visible, onClose, doorSvgHtml, onSaveEnquiryImage }) {
  const [bgImageUri, setBgImageUri] = useState(null);
  const [doorVisible, setDoorVisible] = useState(true);
  const [isDoorActive, setIsDoorActive] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const containerRef = useRef(null);

  // Reset state when modal opens with a new door
  React.useEffect(() => {
    if (visible) {
      setDoorVisible(true);
      setIsDoorActive(true);
    }
  }, [visible, doorSvgHtml]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setBgImageUri(result.assets[0].uri);
    }
  };

  const handleDownloadAndSave = async (isForEnquiry = false) => {
    try {
      if (!bgImageUri || !doorVisible) {
        Alert.alert("Missing Items", "Please upload a photo of your home and ensure the door is visible.");
        return;
      }

      setIsSaving(true);
      
      // Deselect UI overlays before capturing
      setIsDoorActive(false);
      
      // Wait a tiny bit (for React to flush state)
      await new Promise(r => setTimeout(r, 200));

      const localUri = await captureRef(containerRef, {
        format: "png",
        quality: 1,
        result: isForEnquiry ? "base64" : "tmpfile",
      });

      if (isForEnquiry) {
        // Return base64 up to the designer to attach to the enquiry payload
        onSaveEnquiryImage(localUri);
        onClose();
        return;
      }

      // Download (Save to gallery)
      try {
        await MediaLibrary.saveToLibraryAsync(localUri);
        Alert.alert("Saved!", "Your view on home preview has been saved to your camera roll.");
      } catch (mlError) {
        console.warn("[Save] MediaLibrary failed:", mlError);
        await Sharing.shareAsync(localUri, { UTI: "public.image", mimeType: "image/png" });
      }

    } catch (error) {
      console.error("[Save] Error:", error);
      Alert.alert("Error", "Failed to save the image.");
    } finally {
      setIsSaving(false);
      setIsDoorActive(true);
    }
  };

  const handleAddDoor = () => {
    setDoorVisible(true);
    setIsDoorActive(true);
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onClose} style={styles.iconBtn}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>View on Home</Text>
          <TouchableOpacity onPress={() => handleDownloadAndSave(false)} disabled={isSaving} style={styles.iconBtn}>
            <Ionicons name="download-outline" size={24} color={isSaving ? "#666" : "#fff"} />
          </TouchableOpacity>
        </View>

        <View style={styles.editorContainer} ref={containerRef} collapsable={false}>
          {bgImageUri ? (
            <>
              <TouchableOpacity activeOpacity={1} onPress={() => setIsDoorActive(false)} style={StyleSheet.absoluteFillObject}>
                <Image source={{ uri: bgImageUri }} style={StyleSheet.absoluteFillObject} resizeMode="contain" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.repickBtn} onPress={pickImage}>
                <Ionicons name="crop" size={20} color="#fff" />
                <Text style={styles.repickBtnText}>Re-upload</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.placeholderContainer} onPress={pickImage}>
              <Ionicons name="image-outline" size={64} color="#9CA3AF" />
              <Text style={styles.placeholderText}>Tap to upload your home</Text>
            </TouchableOpacity>
          )}

          {bgImageUri && doorVisible && doorSvgHtml && (
             <DraggableDoor 
               doorSvgHtml={doorSvgHtml} 
               isActive={isDoorActive}
               onActivate={() => setIsDoorActive(true)}
               onRemove={() => { setDoorVisible(false); setIsDoorActive(false); }}
             />
          )}

          {/* Watermark Overlay shown across the entire capture if applicable */}
          {bgImageUri && (
            <View style={styles.watermarkOverlay} pointerEvents="none">
              <Image 
                source={require('../assets/doors/composite-doors/background-1-no-bg.png')} 
                style={styles.watermarkImageFull} 
                resizeMode="cover" 
              />
            </View>
          )}
        </View>

        {bgImageUri && (
          <View style={styles.controlPanel}>
            <Text style={styles.panelTitle}>Overlay Your Door</Text>
            <Text style={styles.panelDesc}>Drag and resize the door over your existing entryway.</Text>
            
            <View style={styles.panelButtons}>
              {!doorVisible && (
                <TouchableOpacity style={styles.secondaryBtn} onPress={handleAddDoor}>
                  <Ionicons name="add" size={20} color="#111" />
                  <Text style={styles.secondaryBtnText}>Add Door Back</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={[styles.primaryBtn, !doorVisible && { flex: 1, marginLeft: 12 }]} onPress={() => handleDownloadAndSave(true)}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                <Text style={styles.primaryBtnText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topBar: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20, 
    paddingHorizontal: 8, 
    paddingBottom: 10, 
    backgroundColor: '#000', 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconBtn: {
    padding: 12,
  },
  topBarTitle: {
    color: '#fff', 
    fontSize: 18, 
    fontFamily: 'InterBold',
  },
  editorContainer: {
    flex: 1,
    backgroundColor: '#000',
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  repickBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 20,
  },
  repickBtnText: {
    color: '#fff',
    fontFamily: 'InterMedium',
    fontSize: 13,
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  placeholderText: {
    marginTop: 12,
    color: '#9CA3AF',
    fontFamily: 'InterMedium',
  },
  watermarkOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.08,
    zIndex: 5,
  },
  watermarkImageFull: {
    width: '100%',
    height: '100%',
  },
  draggableBox: {
    position: 'absolute',
    zIndex: 10,
  },
  cornerHandle: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderColor: '#E5040A',
    borderWidth: 2,
    borderRadius: 10,
    zIndex: 10,
  },
  tl: { top: -10, left: -10 },
  tr: { top: -10, right: -10 },
  bl: { bottom: -10, left: -10 },
  br: { bottom: -10, right: -10 },
  deleteBtn: {
    position: 'absolute',
    top: -30,
    right: -10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  imageStretched: {
    width: '100%',
    height: '100%',
  },
  controlPanel: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  panelTitle: {
    fontFamily: 'InterBold',
    fontSize: 20,
    color: '#111',
    marginBottom: 6,
  },
  panelDesc: {
    fontFamily: 'InterMedium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  panelButtons: {
    flexDirection: 'row',
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryBtnText: {
    fontFamily: 'InterSemiBold',
    fontSize: 15,
    color: '#111',
    marginLeft: 8,
  },
  primaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#E5040A',
  },
  primaryBtnText: {
    fontFamily: 'InterSemiBold',
    fontSize: 15,
    color: '#fff',
    marginLeft: 8,
  },
});
