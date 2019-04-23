// Make sure that your app suits this basic spec:

// When adding trains, administrators should be able to submit the following:

// Train Name

// Destination

// First Train Time -- in military time

// Frequency -- in minutes

// Code this app to calculate when the next train will arrive; this should be relative to the current time.

// Users from many different machines must be able to view same train times.

// Styling and theme are completely up to you. Get Creative!



// Initialize Firebase
var config = {
    apiKey: "AIzaSyCSN0T1OZXGddcwXypgR08PcXaQnWbqxGs",
    authDomain: "train-schedule-de123.firebaseapp.com",
    databaseURL: "https://train-schedule-de123.firebaseio.com",
    projectId: "train-schedule-de123",
    storageBucket: "train-schedule-de123.appspot.com",
    messagingSenderId: "1030432754862"
  };
  firebase.initializeApp(config);

