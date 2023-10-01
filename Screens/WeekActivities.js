import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView ,StyleSheet,  Animated, PanResponder, View} from 'react-native';
import {TimeBlock, generateTimeBlocks} from '../Views/TimeBlock'; 
import { useNavigation} from '@react-navigation/native';
import { getDay, format  } from 'date-fns';
import { pl } from 'date-fns/locale';
import { subDays } from 'date-fns';

const handleSwipeLeft = () => {
    const newDate = subDays(currentDate, 1);
    console.log("Test");
    setCurrentDate(newDate);
};

const handleSwipeRight = () => {
    const newDate = subDays(currentDate, -1);
    setCurrentDate(newDate);
};


const WeekActivities = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          const dx = Math.abs(gestureState.dx);
          const dy = Math.abs(gestureState.dy);

          const angle = Math.atan(dy/dx) * 180 / Math.PI;
          
          if (dx >= 15 && angle <  45) { // Dodatkowy warunek, aby uniknąć fałszywego wyzwalania
            setIsDragging(true);
            const newDate = subDays(currentDate, 1 * gestureState.dx / dx);
            setCurrentDate(newDate);
            return true;
          } else if(dx < 15 && angle <  45 ) setIsDragging(true);
          else if (angle < 60 ) {
            setIsDragging(true);
            return true;
          }
          else if(angle > 60) {
            return true;
          }
          return false;
        },
        onPanResponderRelease: () => {
            setTimeout(() => {
                setIsDragging(false);
              }, 200);
          
        },
        onPanResponderTerminate: () => {
          setIsDragging(false);
        },
      });
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    const day = format(currentDate, 'EEEE', { locale: pl });;
    const { blocks, currentIndex } = generateTimeBlocks();
    const scrollViewRef = useRef(null);
    const navigation = useNavigation();
    useEffect(() => {

        navigation.setOptions({
            title: formattedDate + " " + day,
          });

        const yOffset = currentIndex * 50;
    
        scrollViewRef.current?.scrollTo({ y: yOffset, animated: false });
      }, [currentDate]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView ref={scrollViewRef} scrollEnabled={!isDragging}  {...panResponder.panHandlers} horizontal={false}>
        {blocks.map(time => (
          <TimeBlock key={time} time={time} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    box: {
      width: 100,
      height: 100,
      backgroundColor: 'red',
    },
  });

export default WeekActivities;