// Code outside of if(Meteor.isClient) and if(Meteor.isServer) is run on both server and client.

// Create a new MongoDB collection called 'todos'
Todos = new Meteor.Collection('todos');

if (Meteor.isClient) {
    // Define a helper on the TodosPanel template
    Template.TodosPanel.helpers({
        //
        items: function() {
            return Todos.find();
        }
    });
}

if (Meteor.isServer) {

}
