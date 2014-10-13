// Code outside of if(Meteor.isClient) and if(Meteor.isServer) is run on both server and client.

// Create a new MongoDB collection called 'todos'
Todos = new Meteor.Collection('todos');

// Code that executes only on the client
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

    // Call the events method of the TodoItem template
    // Update the underlying data when user clicks the checkbox
    Template.TodoItem.events({
        // Events object takes the selector as the 'key' and the event handler as the 'value'.
        // We want to respond to the click event where the name is 'done'
        // function takes two parameters, the event object and template object
        'click [name=is_done]': function(e, tmpl) {
            var id = this._id;
            var isDone = tmpl.find('input').checked;
            Todos.update({_id: id}, {
                $set: {
                    is_done: isDone
                }
            });
        }
    });
}

// Code that will run only on the server
if (Meteor.isServer) {

}
