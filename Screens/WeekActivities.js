import React, { useRef, useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {TimeBlock, generateTimeBlocks} from '../Views/TimeBlock'; 
import { useNavigation } from '@react-navigation/native';
import { getDay, format  } from 'date-fns';
import { pl } from 'date-fns/locale';

const WeekActivities = () => {
    const now = new Date();
    const formattedDate = format(now, 'yyyy-MM-dd');
    const day = format(now, 'EEEE', { locale: pl });;
    const { blocks, currentIndex } = generateTimeBlocks();
    const scrollViewRef = useRef(null);
    const navigation = useNavigation();
    useEffect(() => {

        navigation.setOptions({
            title: formattedDate + " " + day,
          });

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