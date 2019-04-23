// Make sure that your app suits this basic spec:

// When adding trains, administrators should be able to submit the following:

// Train Name

// Destination

// First Train Time -- in military time

// Frequency -- in minutes

// Code this app to calculate when the next train will arrive; this should be relative to the current time.

// Users from many different machines must be able to view same train times.



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

var database = firebase.database();

// add train using on click event listener
$("#add-train").on("click", function(event){
    event.preventDefault();

//   store user input
var trainName = $("#name-input").val().trim();
var trainDestination = $("#destination-input").val().trim();
var firstTrainTime = $("#mTime-input").val().trim();
var trainFrequency = $("#frequency-input").val().trim();

// create local temporary object for holding train data
var newTrain = {
    name: trainName,
    destination: trainDestination,
    initialTime: firstTrainTime,
    frequency: trainFrequency
};

// upload train data to the firebase database
database.ref().push(newTrain);

// clear all text boxes for future input
$("#name-input").val("");
$("#destination-input").val("");
$("#mTime-input").val("");
$("#frequency-input").val("");

});

// Create a firebase event to add train data to a row in the html when user submits entry
database.ref().on("child_added", function(childSnapshot){

    console.log(childSnapshot.val());

// Store collected data into variables
var trainName = childSnapshot.val().name;
var trainDestination = childSnapshot.val().destination;
var firstTrainTime = childSnapshot.val().initialTime;
var trainFrequency = childSnapshot.val().frequency;

// calculations go here
var nextArrival = (firstTrainTime - trainFrequency);
var minutesAway = (nextArrival - "currentTime");

// build out the new row to be added to the html
var newRow = $("<tr>").append(
    $("<td scope='col'>").text(trainName),
    $("<td scope='col'>").text(trainDestination),
    $("<td scope='col'>").text(trainFrequency),
    $("<td scope='col'>").text(nextArrival),
    $("<td scope='col'>").text(minutesAway),
  );

// Append the new row to the table in the html
$("#trainInfo").append(newRow);
});