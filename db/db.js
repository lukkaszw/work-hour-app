import * as SQLite from 'expo-sqlite';
import moment from 'moment';

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

export const init = () => createOperation('CREATE TABLE IF NOT EXISTS days (id INTEGER PRIMARY KEY NOT NULL, date STRING NOT NULL UNIQUE, startHour TEXT, endHour TEXT, isLeave INTEGER, month INTEGER NOT NULL, year INTEGER NOT NULL);');

export const insertDay = ({ dateString, startHour, endHour, isLeave, month, year }) => {
  return createOperation(
    'INSERT INTO days (date, startHour, endHour, isLeave, month, year) VALUES (?, ? , ?, ?, ?, ?);', 
    [dateString, startHour, endHour, isLeave, month, year],
  );
}

export const updateDay = ({ id, startHour, endHour, isLeave }) => {
  return createOperation(
    'UPDATE days SET startHour = ?, endHour = ?, isLeave = ? WHERE id = ?', 
    [startHour, endHour, isLeave, id],
  );
}

export const updateDayByDate = ({ startHour, endHour, isLeave, dateString }) => {
  return createOperation(
    'UPDATE days SET startHour = ?, endHour = ?, isLeave = ? WHERE date = ?',
    [startHour, endHour, isLeave, dateString],
  );
}

export const deleteDay = (id) => {
  return createOperation(
    'DELETE FROM days WHERE id = ?',
    [id]
  );
}

export const getAllResults = () => {
  return createOperation(
    'SELECT * FROM days;',  
  );
}

export const getYears = () => {
  return createOperation(
    'SELECT DISTINCT year FROM days',
  );
}

export const getMonths = (year) => {
  return createOperation(
    'SELECT DISTINCT month FROM days WHERE year = ?',
    [year],
  );
}

export const getSpecificDays = ({ startDate, endDate }) => {
  return createOperation(
    'SELECT * FROM days WHERE date BETWEEN ? and ?',
    [startDate, endDate],
  );
}

export const checkHolidays = () => {
  const year = moment().year();

  return createOperation(
    'SELECT COUNT(*) AS holidays FROM days WHERE date BETWEEN ? and ? AND isLeave = ?',
    [`${year}-01-01`, `${year}-12-31`, 1]
  );
}