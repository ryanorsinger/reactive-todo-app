// Code outside of if(Meteor.isClient) and if(Meteor.isServer) is run on both server and client.

// Create a new MongoDB collection called 'todos'
Todos = new Meteor.Collection('todos');

// Code that executes only on the client
if (Meteor.isClient) {
    // Subscribe the client to the 'todos' publication.
    Meteor.subscribe('todos');

    // Define a helper on the TodosPanel template
    Template.TodosPanel.helpers({
        //
        items: function() {
            return Todos.find({}, {
                sort: {
                    created_at: -1
                }
            });
        },

        isDoneClass: function() {
            return this.is_done ? 'done' : '';
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

    //Create an event handler for the submit event of our CreateTodoItem
    Template.CreateTodoItem.events({
        //We're listening for the submit form event
        'submit form': function(e, tmpl) {
            // Prevent default since we're not posting the form to a server and we don't want that to happen.
            e.preventDefault();
            // Subject variable gets the subject from the input.
            var subject = tmpl.find('input').value;

            Todos.insert({
                subject: subject,
                created_at: new Date,
                is_done: false
            });

            // Clear the form iteself after the submit event fires
            var form = tmpl.find('form');
            form.reset();
        }
    });

    // Add completed and total count helpers to TodosCount template.
    Template.TodosCount.helpers({
        completedCount: function() {
            return Todos.find({is_done: true}).count();
        },

        totalCount: function() {
            return Todos.find({}).count();
        }
    });

}

// Code that will execute only on the server
if (Meteor.isServer) {
    // Declare the publication on 'todos' collection.
    Meteor.publish('todos', function() {
        // This function will get called any time a client/browser subscribes to this publication.
        return Todos.find()
    });
}
