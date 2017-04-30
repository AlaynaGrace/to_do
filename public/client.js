$(document).ready(onReady);

function onReady(){
  //event listeners
  $('#add-task').on('click', addTask);
  $('.container').on('click', '#complete', completeFunc);
  $('.container').on('click', '#delete', deleteFunc);

  getTasks();

}

//get tasks from server/db
function getTasks(){
  $.ajax({
    url: '/tasks',
    type: 'GET',
    success: function(res){
      console.log(res);
      $('.container').empty();
      var compButton = '<button id="complete">Complete</button>';
      for(var i = 0; i< res.length; i++){
        var deleteButton = '<button id="delete" data-taskid="'+res[i].id+'">Delete</button></p>';
        $('.container').append('<p>' + res[i].task + compButton + deleteButton);
      }
    }
  });

}

//add a task function
function addTask(){
  //take in values from input
  var objectToSend={
    task: $('#new-task').val()
  };

  //send that task to the server using ajax
  $.ajax({
    url: '/newTask',
    type: 'POST',
    data: objectToSend,
    success: function(res){
      console.log(res);
      getTasks();
    }
  });
}

// function that happens when a task is completed
function completeFunc(){

}

//function that happens when user wants to delete a task
function deleteFunc(){

}
