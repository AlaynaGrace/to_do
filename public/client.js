$(document).ready(onReady);

function onReady(){
  //event listeners
  $('#add-task').on('click', addTask);
  $('.container').on('click', '#complete', completeFunc);
  $('.container').on('click', '#delete', deleteFunc);

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
    }
  });
}

// function that happens when a task is completed
function completeFunc(){

}

//function that happens when user wants to delete a task
function deleteFunc(){

}
