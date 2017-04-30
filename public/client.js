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
      $('.finished').empty();

      for(var i = 0; i< res.length; i++){
        var compButton = '<button id="complete" data-taskid="'+res[i].id+'">Complete</button>';
        var deleteButton = '<button id="delete" data-taskid="'+res[i].id+'">Delete</button>';
        if(res[i].completed){
          $('.finished').append('<p class="completed">' + res[i].task + deleteButton + '<img src="https://d30y9cdsu7xlg0.cloudfront.net/png/835-200.png"></p>');
        }else{
          $('.container').append('<p class="created-task">' + res[i].task + compButton + deleteButton + '</p>');
        }
      }
      if($('.container').text() === ''){
        $('.container').append('<p id="none">No current tasks</p>');
      }
    }
  });

}

//add a task function
function addTask(){
  //take in values from input
  var objectToSend={
    task: $('#new-task').val(),
    completed: false
  };

  //send that task to the server using ajax
  $.ajax({
    url: '/newTask',
    type: 'POST',
    data: objectToSend,
    success: function(res){
      console.log(res);
      getTasks();
      $('#new-task').val('');
    }
  });
}

// function that happens when a task is completed
function completeFunc(){
  //update ajax call
  $.ajax({
    url: '/completed',
    type: 'POST',
    data: {completed: true, id:$(this).data('taskid')},
    success: function(res){
      console.log(res);
      // $(this).parent().removeClass('created-task').addClass('completed');
      // $(this).parent().append('<img src="https://d30y9cdsu7xlg0.cloudfront.net/png/835-200.png">');
      // $('.finished').append($(this).parent());
      // $(this).hide();
      // if($('.container').text() === ''){
      //   $('.container').append('<p id="none">No current tasks</p>');
      // }
      getTasks();
    }
  });



}

//function that happens when user wants to delete a task
function deleteFunc(){
  var myId = $(this).data('taskid');

  var ans = prompt('Are you sure you want to delete this task? type "yes" or "no"');

  if(ans === "yes"){
    //delete ajax
    $.ajax({
      url: '/deleteTask',
      type: 'DELETE',
      data: {id: myId},
      success: function(res){
        console.log(res);
        getTasks();
      }
    });
  }
}
