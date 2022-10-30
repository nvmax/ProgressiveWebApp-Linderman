import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// worked with logan schoerner on this
export const putDb = async (content) => {
   // connect to the database
  const jateDB = await openDB('jate', 1);
  // make a transaction to the database
  const tx = jateDB.transaction('jate', 'readwrite');
  // add the content to the database
  const store = tx.objectStore('jate');
  const request = store.put({id: 1, value: content});
  // wait for the transaction to complete
  const result = await request;
  console.log('result', result);
};

// TODO: Add logic for a method that gets all the content from the database
// worked with logan schoerner on this
export const getDb = async () => {
  console.log('Getting data from the database');
  // connect to the DB 
  const jateDB = await openDB('jate', 1);
  // make a transaction to the DB
  const tx = jateDB.transaction('jate', 'readwrite');
  // get the object store
  const objStore = tx.objectStore('jate');
  // get all the content from the object store
  const req = objStore.getAll();
  // return the content
  const result = await req;
    // thanks scott Casey for the help
  return result?.[0]?.value;
};

initdb();
