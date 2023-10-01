import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DbInit from './Database_init';
import { getISOWeek, getDay } from 'date-fns';

const db = SQLite.openDatabase('TimeManager');
const DB_initialized = await AsyncStorage.getItem('DB_initialized');
if (DB_initialized === null) {
    AsyncStorage.setItem('DB_initialized', 1);
    DbInit(db);
}

function Select_week_activities(date) {
    tx.executeSql(
        'SELECT * FROM aktywnosci_tygodniowe WHERE tydzien_rok_od >= ? and tydzien_rok_od <= ? and dzien = ?', 
        [getISOWeek(date), getISOWeek(date), getDay(date) ], 
        (_, result) => { console.log("Aktywności pobrane"); return result;},
        (_, error) => { console.error("Nie można dostać aktywności", error); return true; }
      );
}



