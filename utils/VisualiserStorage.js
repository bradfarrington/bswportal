import AsyncStorage from '@react-native-async-storage/async-storage';

const VISUALISER_USAGE_KEY = '@visualiser_daily_usage_v1';
const MAX_GENERATIONS = 5;

const getTodayDateString = () => new Date().toISOString().split('T')[0];

const getDailyData = async () => {
  try {
    const value = await AsyncStorage.getItem(VISUALISER_USAGE_KEY);
    if (value) {
      const data = JSON.parse(value);
      if (data.date === getTodayDateString()) {
        return data;
      }
    }
  } catch (error) {
    console.error("Failed to fetch daily generation data", error);
  }
  return { date: getTodayDateString(), count: 0 };
};

/**
 * Gets the current number of generations this device has performed today.
 */
export const getGenerationCount = async () => {
  const data = await getDailyData();
  return data.count;
};

/**
 * Checks if the user has reached the maximum allowed generations for today.
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
    const data = await getDailyData();
    const newCount = data.count + 1;
    await AsyncStorage.setItem(
      VISUALISER_USAGE_KEY,
      JSON.stringify({ date: getTodayDateString(), count: newCount })
    );
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
