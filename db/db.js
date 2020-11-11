import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('days.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS days (id INTEGER PRIMARY KEY NOT NULL, date STRING NOT NULL UNIQUE, startHour TEXT NOT NULL, endHour TEXT NOT NULL);', 
      [],
      () => {
        resolve();
      },
      (_, err) => {
        reject(err);
      } 
      );
    });
  });
  return promise;
}