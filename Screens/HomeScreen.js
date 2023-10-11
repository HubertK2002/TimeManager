import React from 'react';
import { View, Text, Button } from 'react-native';
import { useUsosAuth  } from '../OAuth/usosAuth';

function HomeScreen({ navigation }) {
  const { initiateAuthorization } = useUsosAuth();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Dodaj aktywność"
        onPress={() => navigation.navigate('Details')}
      />
       <Button
        title="Pokaż aktywności"
        onPress={() => navigation.navigate('WeekActivities')}
      />
        <Button
        title="Rozpocznij Autoryzację w USOS"
        onPress={initiateAuthorization} // Tutaj używamy naszej funkcji
      />
    </View>
  );
}

export default HomeScreen;
