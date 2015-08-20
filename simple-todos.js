Tasks = new Mongo.Collection("tasks");
Tools = new Mongo.Collection("tools");

var formHandler = {
  getFormInput: function getFormInput(thisEvent) {
    console.log(thisEvent);

    // Prevent form default
    thisEvent.preventDefault();

    // Get text from input
    var text = thisEvent.target.text.value;

    Tasks.insert({
        text: text,
        createdAt: new Date() // current time

    });

    // clear form
    return thisEvent.target.text.value = "";
  }
}


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
    "submit .new-task": function getContent(event) {
      var formInput = event;
      formHandler.getFormInput(formInput);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    console.log('I\'m running on the server, yay!');
  });
}
