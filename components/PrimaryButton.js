import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PrimaryButton({
  title,
  icon,
  rightIcon,
  onPress,
  disabled = false,
  isLoading = false,
  wrapperStyle,
}) {
  return (
    <View style={[styles.container, wrapperStyle, disabled && styles.disabledContainer]}>
      {/* Glow Effect */}
      <View style={styles.glow} />
      
      <TouchableOpacity 
        style={styles.touchable} 
        onPress={onPress}
        disabled={disabled || isLoading}
        activeOpacity={0.9}
      >
        <LinearGradient
            colors={['#1E3A8A', '#172554']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.buttonInner, disabled && styles.buttonInnerDisabled]}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" style={{ marginRight: rightIcon ? 0 : 8 }} />
          ) : icon ? (
            <View style={styles.iconWrapper}>{icon}</View>
          ) : null}
          <Text style={styles.text}>
            {title}
          </Text>
          {!isLoading && rightIcon ? (
            <View style={styles.rightIconWrapper}>{rightIcon}</View>
          ) : null}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'stretch',
  },
  touchable: {
    zIndex: 2,
    borderRadius: 20,
  },
  glow: {
    position: 'absolute',
    top: -2,
    bottom: -2,
    left: -2,
    right: -2,
    backgroundColor: 'rgba(30, 58, 138, 0.8)',
    borderRadius: 22,
    zIndex: 1,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.3)',
  },
  buttonInnerDisabled: {
    borderWidth: 0,
  },
  iconWrapper: {
    marginRight: 8,
  },
  rightIconWrapper: {
    marginLeft: 8,
  },
  text: {
    color: "#FFF",
    fontFamily: "InterBold",
    fontSize: 16,
  },
  disabledContainer: {
    opacity: 1,
  }
});
