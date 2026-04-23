import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CustomHeader({ 
  title, 
  showBackBtn = true, 
  onSearchPress, 
  rightComponent,
  backgroundColor = '#F9FAFB',
  textColor = '#111',
  iconColor = '#111'
}) {
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer, { backgroundColor }]}>
      <View style={styles.leftContainer}>
        {showBackBtn ? (
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color={iconColor} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 28 }} />
        )}
      </View>
      
      <Text style={[styles.headerTitleText, { color: textColor }]}>{title}</Text>
      
      <View style={styles.rightContainer}>
        {onSearchPress ? (
          <TouchableOpacity style={styles.searchBtnToggle} onPress={onSearchPress}>
            <Ionicons name="search" size={24} color={iconColor} />
          </TouchableOpacity>
        ) : rightComponent ? (
          rightComponent
        ) : (
          <View style={{ width: 28 }} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  backBtn: {
    padding: 5,
    marginLeft: -5,
  },
  headerTitleText: {
    fontFamily: 'RB',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  searchBtnToggle: {
    padding: 5,
    marginRight: -5,
  },
});
