// TimeBlock.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const TimeBlock = ({ time }) => {
  return (
    <View style={styles.blockContainer}>
      <Text>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  blockContainer: {
    width: Dimensions.get('window').width,
    height: 50, // lub inna dowolna wartość
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const generateTimeBlocks = () => {
    const blocks = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    let currentIndex = null;
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        if ( hour == currentHour && minute <= currentMinute) 
            currentIndex = blocks.length;
        const hourStr = hour.toString().padStart(2, '0');
        const minuteStr = minute.toString().padStart(2, '0');
        blocks.push(`${hourStr}:${minuteStr}`);
      }
    }
    return {blocks, currentIndex};
  };

export { TimeBlock, generateTimeBlocks };