// Firebase configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Function to write data to the real-time database
const writeData = (path, data) => {
  firebase.database().ref(path).set(data)
  .then(() => {
    console.log('Data written successfully');
  })
  .catch((error) => {
    console.error('Error writing data:', error);
  });
};

// Function to read data from the real-time database
const readData = (path) => {
  firebase.database().ref(path).once('value')
  .then((snapshot) => {
    const data = snapshot.val();
    console.log('Data read successfully:', data);
    return data;
  })
  .catch((error) => {
    console.error('Error reading data:', error);
  });
};

// Export functions to use in other files
export { writeData, readData };