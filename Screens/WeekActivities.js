import React, { useRef, useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {TimeBlock, generateTimeBlocks} from '../Views/TimeBlock'; // Asumując, że TimeBlock.js jest w tym samym folderze

const WeekActivities = () => {
    const { blocks, currentIndex } = generateTimeBlocks();
    const scrollViewRef = useRef(null);
    useEffect(() => {
        // Zakładając, że wysokość każdego TimeBlock wynosi 50 (możesz dostosować tę wartość)
        const yOffset = currentIndex * 50;
    
        scrollViewRef.current?.scrollTo({ y: yOffset, animated: false });
      }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView ref={scrollViewRef}>
        {blocks.map(time => (
          <TimeBlock key={time} time={time} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WeekActivities;