import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DbInit from './Database_init';
const db = SQLite.openDatabase('TimeManager');
const DB_initialized = await AsyncStorage.getItem('DB_initialized');
if (DB_initialized === null) {
    AsyncStorage.setItem('DB_initialized', 1);
    DbInit(db);
}



