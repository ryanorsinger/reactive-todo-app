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

    Template.TodoItem.helpers({
        // Define the isDoneChecked helper.
        isDoneChecked: function() {
            // Returns string 'checked' if input checkbox is checked.
            return this.is_done ? 'checked' : '';
        }
    });
}

if (Meteor.isServer) {

}
