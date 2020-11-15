import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('days.db');

const createOperation = (query, data = []) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query, 
        data,
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  });
}

export const init = () => createOperation(
  'CREATE TABLE IF NOT EXISTS days (id INTEGER PRIMARY KEY NOT NULL, date STRING NOT NULL UNIQUE, startHour TEXT NOT NULL, endHour TEXT NOT NULL);'
);

export const insertDay = ({ dateString, startHour, endHour }) => {
  return createOperation(
    'INSERT INTO days (date, startHour, endHour) VALUES (?, ? , ?);', 
    [dateString, startHour, endHour],
  );
}

export const updateDay = ({ id, startHour, endHour }) => {
  return createOperation(
    'UPDATE days SET startHour = ?, endHour = ? WHERE id = ?', 
    [startHour, endHour, id],
  );
}

export const updateDayByDate = ({ startHour, endHour, dateString }) => {
  return createOperation(
    'UPDATE days SET startHour = ?, endHour = ? WHERE date = ?',
    [startHour, endHour, dateString],
  );
}

export const getAllResults = () => {
  return createOperation(
    'SELECT * FROM days;',  
  );
}

export const getSpecificDays = ({ startDate, endDate }) => {
  return createOperation(
    'SELECT * FROM days WHERE date BETWEEN ? and ?',
    [startDate, endDate],
  );
}