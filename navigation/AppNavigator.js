import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Brochures from "../screens/Brochures";
import Designer from "../screens/Designer";
import Portal from "../screens/Portal";
import Quote from "../screens/Quote";
import SaleCategoriesScreen from "../screens/SaleCategoriesScreen";
import Orders from "../screens/Portal";
import Home from "../screens/Home";
import Dashboard from "../screens/Dashboard";
import GalleryScreen from "../screens/GalleryScreen";
import GalleryAlbumScreen from "../screens/GalleryAlbumScreen";
import {
  FontAwesome5,
  Foundation,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SaleProductsScreen from "../screens/SaleProductsScreen";
import SaleProductDetailScreen from "../screens/SaleProductDetailScreen";
import { Entypo } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaintenanceGuides from "../screens/maintenanceGuides";
import CatalogCategoriesScreen from "../screens/CatalogCategoriesScreen";
import CatalogSubCategoriesScreen from "../screens/CatalogSubCategoriesScreen";
import CatalogProductDetailsScreen from "../screens/CatalogProductDetailsScreen";
import PdfViewerScreen from "../screens/PdfViewer";
import VisualiserScreen from "../screens/VisualiserScreen";
import VisualiserResultScreen from "../screens/VisualiserResultScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TopTabs = createMaterialTopTabNavigator();
import { View, Platform, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const TAB_CONFIG = [
  { name: 'Dashboard', label: 'Home', isCustomIcon: true, iconSource: require('../assets/tabicon.png'), iconSize: 24 },
  { name: 'Orders', label: 'Orders', iconFamily: 'FontAwesome5', iconName: 'shopping-cart', iconSize: 20 },
  { name: 'Gallery', label: 'Gallery', iconFamily: 'MaterialIcons', iconName: 'photo-library', iconSize: 22 },
  { name: 'Products', label: 'Products', iconFamily: 'FontAwesome5', iconName: 'box-open', iconSize: 20 },
  { name: 'Sale', label: 'Sale', iconFamily: 'Foundation', iconName: 'burst-sale', iconSize: 26 },
];

const renderTabIcon = (tab, focused) => {
  const color = focused ? '#fff' : '#888';
  if (tab.isCustomIcon) {
    return (
      <Image
        source={tab.iconSource}
        style={{ width: tab.iconSize, height: tab.iconSize, tintColor: color, resizeMode: 'contain' }}
      />
    );
  }
  switch (tab.iconFamily) {
    case 'Foundation':
      return <Foundation name={tab.iconName} size={tab.iconSize} color={color} />;
    case 'FontAwesome5':
      return <FontAwesome5 name={tab.iconName} size={tab.iconSize} color={color} />;
    case 'MaterialIcons':
      return <MaterialIcons name={tab.iconName} size={tab.iconSize} color={color} />;
    default:
      return null;
  }
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={tabBarStyles.container}>
      <View style={tabBarStyles.pill}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const tab = TAB_CONFIG[index];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.8}
              onPress={onPress}
              style={[
                tabBarStyles.tabItem,
                isFocused ? tabBarStyles.tabItemFocused : tabBarStyles.tabItemInactive,
              ]}
            >
              {renderTabIcon(tab, isFocused)}
              {isFocused && (
                <Text numberOfLines={1} style={tabBarStyles.label}>
                  {tab.label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const tabBarStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    right: 15,
  },
  pill: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    borderRadius: 35,
    height: 70,
    alignItems: 'center',
    paddingHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    flex: 1,
  },
  tabItemFocused: {
    flexDirection: 'row',
    backgroundColor: 'red',
    paddingHorizontal: 14,
    flex: 2,
  },
  tabItemInactive: {
    backgroundColor: 'transparent',
  },
  label: {
    color: '#fff',
    fontFamily: 'RM',
    marginLeft: 6,
    fontSize: 13,
  },
});

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Gallery" component={GalleryScreen} />
      <Tab.Screen name="Products" component={CatalogCategoriesScreen} />
      <Tab.Screen name="Sale" component={SaleCategoriesScreen} />
    </Tab.Navigator>
  );
};



const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor: '#111',
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Designer"
        component={Designer}
        options={{ headerShown: true, title: "Door Designer", headerTitleStyle: { fontFamily: "RB" } }}
      />
      <Stack.Screen
        name="PDfViewer"
        component={PdfViewerScreen}
        options={{ headerShown: false, contentStyle: { backgroundColor: "#000" } }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Brochures"
        component={Brochures}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SaleProducts"
        component={SaleProductsScreen}
        options={{
          headerTitleStyle: {
            fontFamily: "RB",
          },
        }}
      />
      <Stack.Screen
        name="GalleryAlbum"
        component={GalleryAlbumScreen}
        options={({ route }) => ({
          title: route.params?.title || 'Album',
          headerBackTitle: ' ',
          headerTintColor: '#111',
          headerTitleStyle: {
            fontFamily: 'RB',
            fontSize: 17,
          },
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="SaleProductDetail"
        component={SaleProductDetailScreen}
        options={{
          headerTitleStyle: {
            fontFamily: "RB",
          },
        }}
      />
      <Stack.Screen
        name="CatalogCategories"
        component={CatalogCategoriesScreen}
        options={{
          title: "Our Products",
          headerTitleStyle: { fontFamily: "RB" },
        }}
      />
      <Stack.Screen
        name="CatalogSubCategories"
        component={CatalogSubCategoriesScreen}
        options={({ route }) => ({
          title: route.params?.category?.title || "Products",
          headerBackTitle: " ",
          headerTintColor: "#111",
          headerTitleStyle: {
            fontFamily: "RB",
            fontSize: 17,
          },
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="CatalogProductDetails"
        component={CatalogProductDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VisualiserScreen"
        component={VisualiserScreen}
        options={{
          title: "AI Visualiser",
          headerTitleStyle: { fontFamily: "RB" },
        }}
      />
      <Stack.Screen
        name="VisualiserResult"
        component={VisualiserResultScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
