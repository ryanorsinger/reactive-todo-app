Tasks = new Mongo.Collection("tasks");
Tools = new Mongo.Collection("tools");


if (Meteor.isClient) {
  // Helper functions
  Template.body.helpers({
    tasks: function() {
      return Tasks.find({});
    },
    items: function() {
      return Tools.find({});
    }
  });
  // Event handling
  Template.body.events({
    "submit .new-task": function(event) {
      // Prevent default browser form submit.
      event.preventDefault();

      // Get the value from the form element.
      var text = event.target.text.value;

      // Insert the task into the collection
      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });

      // Clear the form
      event.target.text.value = '';
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    console.log('I\'m running on the server, yay!');
  });
}

console.log('This code runs both on server and client');
