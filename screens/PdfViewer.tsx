import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, StatusBar, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Pdf from "react-native-pdf";
import * as FileSystem from "expo-file-system";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";

type RootStackParamList = {
  PdfViewer: { url: string };
};

type PdfViewerRouteProp = RouteProp<RootStackParamList, "PdfViewer">;

const hashUrl = (s: string) => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (((h << 5) + h) ^ s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(16);
};

const PdfViewerScreen = () => {
  const route = useRoute<PdfViewerRouteProp>();
  const navigation = useNavigation();
  const { url } = route.params;
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const pdfRef = useRef<Pdf>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pdfLayout, setPdfLayout] = useState<{ width: number; height: number } | null>(null);
  const [scale, setScale] = useState(1);
  const [localUri, setLocalUri] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState(0);
  const hasRetriedCorruptCache = useRef(false);

  const localPath = `${FileSystem.cacheDirectory}bsw_pdf_${hashUrl(url)}.pdf`;

  useEffect(() => {
    let cancelled = false;
    const ensureLocal = async () => {
      setDownloadError(null);
      setLocalUri(null);
      try {
        const info = await FileSystem.getInfoAsync(localPath);
        if (info.exists && (info as any).size > 0) {
          if (!cancelled) setLocalUri(info.uri);
          return;
        }
        const result = await FileSystem.downloadAsync(url, localPath);
        if (result.status !== 200) {
          await FileSystem.deleteAsync(localPath, { idempotent: true });
          throw new Error(`Server returned ${result.status}`);
        }
        if (!cancelled) setLocalUri(result.uri);
      } catch (e: any) {
        console.log("PDF download error:", e);
        if (!cancelled) setDownloadError(e?.message || "Couldn't download brochure");
      }
    };
    ensureLocal();
    return () => {
      cancelled = true;
    };
  }, [url, retryToken]);

  const handlePdfError = useCallback(
    async (error: any) => {
      console.log("PDF load error:", error);
      if (hasRetriedCorruptCache.current) {
        setDownloadError("This brochure couldn't be opened.");
        return;
      }
      hasRetriedCorruptCache.current = true;
      try {
        await FileSystem.deleteAsync(localPath, { idempotent: true });
      } catch {}
      setRetryToken((t) => t + 1);
    },
    [localPath]
  );

  const handleManualRetry = () => {
    hasRetriedCorruptCache.current = false;
    setRetryToken((t) => t + 1);
  };

  const source = localUri ? { uri: localUri } : null;

  const handleNextPage = () => {
    if (currentPage < totalPages && pdfRef.current) {
      pdfRef.current.setPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1 && pdfRef.current) {
      pdfRef.current.setPage(currentPage - 1);
    }
  };

  const handlePdfWrapperLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setPdfLayout({ width, height });
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3.0));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 1.0));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="light-content" />
        
        {/* Minimal header: back button + zoom controls, no title */}
        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>

          <View style={styles.zoomControls}>
            <TouchableOpacity 
              style={[styles.zoomBtn, scale <= 1 && { opacity: 0.3 }]} 
              onPress={handleZoomOut}
              disabled={scale <= 1}
            >
              <Feather name="zoom-out" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.zoomText}>{Math.round(scale * 100)}%</Text>
            <TouchableOpacity 
              style={[styles.zoomBtn, scale >= 3 && { opacity: 0.3 }]} 
              onPress={handleZoomIn}
              disabled={scale >= 3}
            >
              <Feather name="zoom-in" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.pdfWrapper} onLayout={handlePdfWrapperLayout}>
          {downloadError ? (
            <View style={styles.loadingWrapper}>
              <Text style={styles.errorText}>{downloadError}</Text>
              <TouchableOpacity style={styles.retryBtn} onPress={handleManualRetry}>
                <Text style={styles.retryBtnText}>Try again</Text>
              </TouchableOpacity>
            </View>
          ) : !source ? (
            <View style={styles.loadingWrapper}>
              <ActivityIndicator size="large" color="#E5040A" />
              <Text style={styles.loadingText}>Opening Booklet...</Text>
            </View>
          ) : pdfLayout && (
            <Pdf
              key={`${pdfLayout.width}-${pdfLayout.height}-${retryToken}`}
              ref={pdfRef}
              source={source}
              trustAllCerts={true}
              horizontal={true}
              enablePaging={scale === 1}
              fitPolicy={2}
              scale={scale}
              minScale={1.0}
              maxScale={3.0}
              onScaleChanged={(newScale) => setScale(newScale)}
              style={{
                width: pdfLayout.width,
                height: pdfLayout.height,
                backgroundColor: "#000",
              }}
              onPageChanged={(page, numberOfPages) => {
                setCurrentPage(page);
                setTotalPages(numberOfPages);
              }}
              renderActivityIndicator={() => (
                 <View style={styles.loadingWrapper}>
                     <ActivityIndicator size="large" color="#E5040A" />
                     <Text style={styles.loadingText}>Opening Booklet...</Text>
                 </View>
              )}
              onLoadComplete={(pages) => {
                setTotalPages(pages);
              }}
              onError={handlePdfError}
            />
          )}
        </View>

        {/* Bottom Navigation Controls */}
        {totalPages > 0 && (
            <View style={styles.bottomControls}>
               <TouchableOpacity 
                  style={[styles.arrowBtn, currentPage === 1 && { opacity: 0.2 }]} 
                  onPress={handlePrevPage}
                  disabled={currentPage === 1}
               >
                  <Feather name="chevron-left" size={28} color="#fff" />
               </TouchableOpacity>
               
               <Text style={styles.pageCounterText}>
                  {currentPage} of {totalPages}
               </Text>

               <TouchableOpacity 
                  style={[styles.arrowBtn, currentPage === totalPages && { opacity: 0.2 }]} 
                  onPress={handleNextPage}
                  disabled={currentPage === totalPages}
               >
                  <Feather name="chevron-right" size={28} color="#fff" />
               </TouchableOpacity>
            </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", 
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#000",
  },
  backBtn: {
    padding: 5,
  },
  zoomControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  zoomBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
  },
  zoomText: {
    fontFamily: "RB",
    fontSize: 14,
    color: "#fff",
    minWidth: 45,
    textAlign: "center",
  },
  pdfWrapper: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    marginTop: 20,
    fontFamily: "RM",
    fontSize: 14,
    color: "#888",
  },
  errorText: {
    fontFamily: "RM",
    fontSize: 14,
    color: "#ddd",
    textAlign: "center",
    paddingHorizontal: 30,
  },
  retryBtn: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 20,
    backgroundColor: "#E5040A",
  },
  retryBtnText: {
    fontFamily: "RB",
    fontSize: 14,
    color: "#fff",
  },
  bottomControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#000",
  },
  pageCounterText: {
    fontFamily: "RB",
    fontSize: 16,
    color: "#fff",
    letterSpacing: 1,
  },
  arrowBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PdfViewerScreen;
