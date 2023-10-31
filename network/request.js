import React from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const fetchData = async (href, funkcja) => {
    try {
      const response = await axios.get(href);
      funkcja(response.data);
    } catch (error) {
      throw error; // Rzucamy błąd, aby go obsłużyć na wyższym poziomie
    }
  };

export default fetchData;
