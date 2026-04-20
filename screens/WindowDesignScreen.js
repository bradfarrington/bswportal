import React, { useState, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Alert, 
  Dimensions, 
  PanResponder, 
  ActivityIndicator,
  Animated,
  useWindowDimensions,
  ScrollView,
  Platform
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

import { supabase } from '../config/supabaseClient';
import { createPerspectiveMatrix } from '../utils/PerspectiveMath';

const DraggableWindow = ({ windowKey, selectedColor, onRemove, isActive, onActivate, windowAssets }) => {
  const W = 150;
  const H = 200;

  const [cornersState, setCornersState] = useState({
    tl: { x: 50, y: 50 },
    tr: { x: 50 + W, y: 50 },
    bl: { x: 50, y: 50 + H },
    br: { x: 50 + W, y: 50 + H },
  });
  const cornersRef = useRef(cornersState);
  const initialCorners = useRef(null);

  const updateCorners = (newCorners) => {
    cornersRef.current = newCorners;
    setCornersState(newCorners);
  };

  const initPan = () => {
    onActivate();
    initialCorners.current = {
      tl: { ...cornersRef.current.tl },
      tr: { ...cornersRef.current.tr },
      bl: { ...cornersRef.current.bl },
      br: { ...cornersRef.current.br },
    };
  };

  // Get the most appropriate image asset
  const colorAssets = windowAssets[windowKey];
  const exactAsset = colorAssets ? colorAssets[selectedColor?.id] : null;
  const fallbackAsset = colorAssets ? colorAssets["White"] : null;
  const imageUrl = exactAsset || fallbackAsset;
  const imageSource = imageUrl ? { uri: imageUrl } : null;
  const tintColor = !exactAsset && selectedColor ? selectedColor.hex : undefined;

  // Move entire object
  const panResponderMove = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: initPan,
      onPanResponderMove: (e, gestureState) => {
        const dx = gestureState.dx;
        const dy = gestureState.dy;
        updateCorners({
          tl: { x: initialCorners.current.tl.x + dx, y: initialCorners.current.tl.y + dy },
          tr: { x: initialCorners.current.tr.x + dx, y: initialCorners.current.tr.y + dy },
          bl: { x: initialCorners.current.bl.x + dx, y: initialCorners.current.bl.y + dy },
          br: { x: initialCorners.current.br.x + dx, y: initialCorners.current.br.y + dy },
        });
      },
    })
  ).current;

  // Generic generator for corner adjustment PanResponders
  const createCornerPan = (cornerKey) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: initPan,
      onPanResponderMove: (e, gestureState) => {
        const next = {
          tl: { ...initialCorners.current.tl },
          tr: { ...initialCorners.current.tr },
          bl: { ...initialCorners.current.bl },
          br: { ...initialCorners.current.br },
        };
        next[cornerKey].x += gestureState.dx;
        next[cornerKey].y += gestureState.dy;
        updateCorners(next);
      },
    });
  };

  const panTL = useRef(createCornerPan('tl')).current;
  const panTR = useRef(createCornerPan('tr')).current;
  const panBL = useRef(createCornerPan('bl')).current;
  const panBR = useRef(createCornerPan('br')).current;

  const matrix = createPerspectiveMatrix(W, H, cornersState.tl, cornersState.tr, cornersState.bl, cornersState.br);

  return (
    <View style={[StyleSheet.absoluteFillObject]} pointerEvents="box-none">
      <View
        {...panResponderMove.panHandlers}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: W,
          height: H,
          transform: [{ matrix }],
          borderColor: isActive ? '#E5040A' : 'transparent',
          borderWidth: isActive ? 2 : 0,
        }}
      >
        {imageSource && (
          <Image 
            source={imageSource} 
            style={[styles.windowImageStretched, tintColor && { tintColor }]} 
            resizeMode="stretch" 
          />
        )}
      </View>

      {isActive && (
        <TouchableOpacity 
          style={[styles.deleteBtn, { left: cornersState.tr.x + 10, top: cornersState.tr.y - 30 }]} 
          onPress={onRemove}
        >
          <Ionicons name="close" size={16} color="#fff" />
        </TouchableOpacity>
      )}

      {isActive && (
        <>
          <View style={[styles.cornerHandle, { left: cornersState.tl.x - 10, top: cornersState.tl.y - 10 }]} {...panTL.panHandlers} />
          <View style={[styles.cornerHandle, { left: cornersState.tr.x - 10, top: cornersState.tr.y - 10 }]} {...panTR.panHandlers} />
          <View style={[styles.cornerHandle, { left: cornersState.bl.x - 10, top: cornersState.bl.y - 10 }]} {...panBL.panHandlers} />
          <View style={[styles.cornerHandle, { left: cornersState.br.x - 10, top: cornersState.br.y - 10 }]} {...panBR.panHandlers} />
        </>
      )}
    </View>
  );
};

export default function WindowDesignScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  
  // Data fetched from Supabase
  const [allColors, setAllColors] = useState([]);
  const [windowKeys, setWindowKeys] = useState([]);
  const [windowAssets, setWindowAssets] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState(null); 
  const [addedWindows, setAddedWindows] = useState([]); 
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const containerRef = useRef(null);

  React.useEffect(() => {
    async function loadData() {
      try {
        const [colorsRes, stylesRes, assetsRes] = await Promise.all([
          supabase.from('visualiser_colors').select('*').order('sort_order', { ascending: true }),
          supabase.from('visualiser_window_styles').select('*').order('sort_order', { ascending: true }),
          supabase.from('visualiser_assets').select('*')
        ]);

        if (colorsRes.data) {
          setAllColors(colorsRes.data);
          if (colorsRes.data.length > 0) {
            setSelectedColor(colorsRes.data[0]);
          }
        }
        
        if (stylesRes.data) {
          setWindowKeys(stylesRes.data.map(s => s.id));
        }

        if (assetsRes.data) {
           const assetsMap = {};
           assetsRes.data.forEach(asset => {
             if (!assetsMap[asset.window_style_id]) {
               assetsMap[asset.window_style_id] = {};
             }
             assetsMap[asset.window_style_id][asset.color_id] = asset.image_url;
           });
           setWindowAssets(assetsMap);
        }
      } catch (err) {
        console.warn('Failed to load visualiser data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleDownload = async () => {
    try {
      if (!imageUri || addedWindows.length === 0) {
        Alert.alert("Missing Items", "Please upload a photo and add at least one window.");
        return;
      }

      setIsSaving(true);
      // Wait a tiny bit (for React to flush any state or handle rendering before capturing)
      await new Promise(r => setTimeout(r, 100));

      console.log("[Design] Capturing design...");
      const localUri = await captureRef(containerRef, {
        format: "png",
        quality: 1,
      });

      try {
        await MediaLibrary.saveToLibraryAsync(localUri);
        Alert.alert("Saved!", "Your design has been saved to your camera roll.");
        return;
      } catch (mlError) {
        console.warn("[Save] MediaLibrary failed:", mlError);
      }

      await Sharing.shareAsync(localUri, { UTI: "public.image", mimeType: "image/png" });
    } catch (error) {
      console.error("[Save] Error:", error);
      Alert.alert("Error", "Failed to save the image.");
    } finally {
      setIsSaving(false);
    }
  };

  const addWindow = (windowKey) => {
    const id = Date.now().toString();
    setAddedWindows([...addedWindows, { id, windowKey }]);
    setActiveWindowId(id);
  };

  const removeWindow = (id) => {
    setAddedWindows(addedWindows.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#E5040A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
              <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>Design Your Own</Text>
          <TouchableOpacity onPress={handleDownload} disabled={isSaving}>
            <Ionicons name="download-outline" size={24} color={isSaving ? "#666" : "#fff"} />
          </TouchableOpacity>
      </View>

      <View style={styles.editorContainer} ref={containerRef} collapsable={false}>
        {imageUri ? (
          <>
            <TouchableOpacity activeOpacity={1} onPress={() => setActiveWindowId(null)} style={StyleSheet.absoluteFillObject}>
              <Image source={{ uri: imageUri }} style={StyleSheet.absoluteFillObject} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.repickBtn} onPress={pickImage}>
              <Ionicons name="crop" size={20} color="#fff" />
              <Text style={styles.repickBtnText}>Re-upload / Crop</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.placeholderContainer} onPress={pickImage}>
            <Ionicons name="image-outline" size={64} color="#9CA3AF" />
            <Text style={styles.placeholderText}>Tap to upload your home</Text>
          </TouchableOpacity>
        )}

        {/* Render all added windows on top of the image */}
        {imageUri && addedWindows.map((win) => (
          <DraggableWindow 
            key={win.id} 
            windowKey={win.windowKey} 
            selectedColor={selectedColor} 
            isActive={win.id === activeWindowId}
            onActivate={() => setActiveWindowId(win.id)}
            onRemove={() => removeWindow(win.id)}
            windowAssets={windowAssets}
          />
        ))}

        {imageUri && (
          <View style={styles.watermarkOverlay} pointerEvents="none">
            <Image 
              source={require('../assets/doors/composite-doors/background-1-no-bg.png')} 
              style={styles.watermarkImageFull} 
              resizeMode="cover" 
            />
          </View>
        )}
      </View>

      {imageUri && (
        <View style={styles.controlPanel}>
          <Text style={styles.label}>1. Select Window Style</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 16, paddingRight: 16 }} style={styles.windowList}>
            {windowKeys.map((key) => (
              <TouchableOpacity 
                key={key} 
                style={styles.windowThumbnailBtn} 
                onPress={() => addWindow(key)}
                activeOpacity={0.7}
              >
                <View style={styles.windowThumbnailWrapper}>
                  {windowAssets[key]?.["White"] && (
                    <Image 
                      source={{ uri: windowAssets[key]["White"] }} 
                      style={styles.windowThumbnailImg} 
                      resizeMode="contain" 
                    />
                  )}
                  <View style={styles.addOverlay}><Ionicons name="add-circle" size={24} color="#E5040A" /></View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={[styles.label, { marginTop: 16 }]}>2. Frame Colour</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.colorList}>
            {allColors.map(c => (
              <TouchableOpacity 
                key={c.id} 
                style={[
                  styles.colorCircle, 
                  { backgroundColor: c.hex },
                  selectedColor?.id === c.id && styles.colorCircleActive
                ]}
                onPress={() => setSelectedColor(c)}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topBar: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20, 
    paddingHorizontal: 16, 
    paddingBottom: 10, 
    backgroundColor: '#000', 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between'
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
  windowImageStretched: {
    width: '100%',
    height: '100%',
  },
  controlPanel: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 50 : 30,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  label: {
    fontFamily: 'InterSemiBold',
    fontSize: 15,
    color: '#111',
    marginBottom: 6,
    marginTop: 0,
  },
  windowList: {
    flexDirection: 'row',
  },
  windowThumbnailBtn: {
    marginRight: 16,
  },
  windowThumbnailWrapper: {
    width: 80,
    height: 100,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  windowThumbnailImg: {
    width: '100%',
    height: '100%',
  },
  addOverlay: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  colorList: {
    flexDirection: 'row',
  },
  colorCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    marginRight: 12,
  },
  colorCircleActive: {
    borderWidth: 3,
    borderColor: '#E5040A',
  },
});
