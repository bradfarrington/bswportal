import AsyncStorage from '@react-native-async-storage/async-storage';

const VISUALISER_USAGE_KEY = '@visualiser_generation_count';
const MAX_GENERATIONS = 99999;

/**
 * Gets the current number of generations this device has performed.
 */
export const getGenerationCount = async () => {
  try {
    const value = await AsyncStorage.getItem(VISUALISER_USAGE_KEY);
    return value ? parseInt(value, 10) : 0;
  } catch (error) {
    console.error("Failed to fetch generation count", error);
    return 0;
  }
};

/**
 * Checks if the user has reached the maximum allowed generations.
 */
export const hasReachedGenerationLimit = async () => {
  const count = await getGenerationCount();
  return count >= MAX_GENERATIONS;
};

/**
 * Increments the generation count after a successful API call.
 */
export const incrementGenerationCount = async () => {
  try {
    const currentCount = await getGenerationCount();
    const newCount = currentCount + 1;
    await AsyncStorage.setItem(VISUALISER_USAGE_KEY, newCount.toString());
    return newCount;
  } catch (error) {
    console.error("Failed to increment generation count", error);
  }
};

/**
 * Resets the generation count (mostly for debugging or administrative purposes).
 */
export const resetGenerationCount = async () => {
  try {
    await AsyncStorage.removeItem(VISUALISER_USAGE_KEY);
  } catch (error) {
    console.error("Failed to reset generation count", error);
  }
};
