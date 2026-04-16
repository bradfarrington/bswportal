import React, { useRef, useState } from "react";
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, ActivityIndicator, SafeAreaView, StatusBar } from "react-native";
import Pdf from "react-native-pdf";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";

type RootStackParamList = {
  PdfViewer: { url: string };
};

type PdfViewerRouteProp = RouteProp<RootStackParamList, "PdfViewer">;

const PdfViewerScreen = () => {
  const route = useRoute<PdfViewerRouteProp>();
  const navigation = useNavigation();
  const { url } = route.params;
  
  const pdfRef = useRef<Pdf>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const source = {
    uri: url,
    cache: true,
    trusty: true,
  };

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

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        
        {/* Custom Header Overlay */}
        <View style={styles.header}>
           <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
               <AntDesign name="close" size={20} color="#fff" />
           </TouchableOpacity>
           <View style={{ flex: 1 }} />
        </View>

        <View style={styles.pdfWrapper}>
          <Pdf
            ref={pdfRef}
            source={source}
            trustAllCerts={false}
            horizontal={true}
            enablePaging={true}
            style={styles.pdf}
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
            onError={(error) => {
              console.error(error);
              alert("Something went wrong loading the PDF.");
            }}
          />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#000",
    zIndex: 10,
  },
  closeButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  pdfWrapper: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    backgroundColor: "#000",
  },
  loadingWrapper: {
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
