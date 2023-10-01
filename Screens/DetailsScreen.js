import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../Styles/Styles';  // zaimportuj style

function DetailsScreen() {
  const [text, setText] = useState('');
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <TextInput
      style={styles.input} 
      placeholder='Nazwa aktywności'
      value={text}
      onChangeText={setText}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <MaterialIcons 
          name={isSelected ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color="black"
          onPress={() => setSelection(!isSelected)}
        />
        <Text>Godzinowa</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <MaterialIcons 
          name={isSelected ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color="black"
          onPress={() => setSelection(!isSelected)}
        />
        <Text>Kalendarz</Text>
      </View>
    </View>
  );
}

export default DetailsScreen;
