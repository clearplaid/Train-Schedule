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

// display current time
setInterval(function() {
  $("#current-time").html(moment().format('hh:mm:ss a'))
}, 1000);

// add train using on click event listener
$("#add-train").on("click", function(event){
    event.preventDefault();

//   store user input
var trainName = $("#name-input").val().trim();
var trainDestination = $("#destination-input").val().trim();
var firstTrainTime = $("#mTime-input").val().trim();
var trainFrequency = $("#frequency-input").val().trim();

// validate
if (trainName === "" || trainDestination === "" || firstTrainTime === "" || trainFrequency === "") return;

// create local temporary object for holding train data
var newTrain = {
    name: trainName,
    destination: trainDestination,
    initialTime: firstTrainTime,
    frequency: trainFrequency,
    dataAdded: firebase.database.ServerValue.TIMESTAMP
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
console.log("Name: " + trainName);
console.log("Destination: " + trainDestination);
console.log("first train time: " + firstTrainTime);
console.log("Frequency: " + trainFrequency);

// calculations go here
var currentTime = moment().format("HH:mm a");
console.log("Current Time: " + currentTime);
var nextArrival = moment().add(firstTrainTime, trainFrequency).format("hh:mm a");
console.log("Next Arrival: " + nextArrival);
if(currentTime > nextArrival){
  nextArrival += trainFrequency;
}
var minutesAway = moment().subtract(nextArrival, currentTime).format("mm");
console.log(minutesAway);



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