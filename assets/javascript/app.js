var firebaseConfig = {
  apiKey: "AIzaSyDwbb19a3OC19VEVqGCV3CmGdi1VgHNmk4",
  authDomain: "train-scheduler01.firebaseapp.com",
  databaseURL: "https://train-scheduler01.firebaseio.com",
  projectId: "train-scheduler01",
  storageBucket: "train-scheduler01.appspot.com",
  messagingSenderId: "509053142471",
  appId: "1:509053142471:web:0c3f26c5048983a1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var train_name = "";
var train_destination = "";
var train_frequency = "";
var train_arrival_time = "";
var next_train = "";
// submit button clicked
$(".add_train_btn").on("click", function () {
  // capture the user input data...
  train_name = $("#train_name").val().trim();
  train_destination = $("#train_destination").val().trim();
  train_arrival_time = $("#departure_time").val().trim();
  train_frequency = $("#departure_interval").val().trim();
  // time left
  var initial_departure = moment(train_arrival_time, "HH:mm").subtract(1, "years");
  console.log(initial_departure);
  var time_difference = moment().diff(moment(initial_departure), "minutes");
  console.log(time_difference);
  var remaining_time = time_difference % train_frequency;
  console.log(remaining_time);
  var time_until = train_frequency - remaining_time;
  console.log(time_until);
  var next_train = moment().add(time_until, "minutes");
  console.log(next_train);
  // push new train data onto the database...
  database.ref("trains").push({
    train_name: train_name,
    train_destination: train_destination,
    train_frequency: train_frequency,
    train_arrival_time: train_arrival_time,
    next_train: next_train
  });
  // reset
  $("#train_name").val("");
  $("#train_destination").val("");
  $("#departure_time").val("");
  $("#departure_interval").val("");
  // and return false to prevent the page from resetting
  return false;
})
database.ref("trains").on("child_added", function (snapshot) {
  //when u add a new train
  console.log(snapshot.val());
  $("#new_train").append("<tr><td>" + snapshot.val().train_name + "</td>" +
    "<td>" + snapshot.val().train_destination + "</td>" +
    "<td>" + snapshot.val().train_frequency + "</td>" +
    "<td>" + snapshot.val().train_arrival_time + "</td>" +
    "<td>" + snapshot.val().next_train + "</td></tr>");
  return false;
})