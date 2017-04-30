$(document).ready(onReady);

function onReady(){
  //event listeners
  $('#add-task').on('click', addTask);
  $('.container').on('click', '#complete', completeFunc);
  $(document).on('click', '#delete', deleteFunc);
  $(document).on('click', '#incomplete', reAddFunc);

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
        var compButton = '<button id="complete" data-taskid="'+res[i].id+'"><img src="http://www.clker.com/cliparts/2/k/n/l/C/Q/transparent-green-checkmark-md.png"></button>';
        var uncomp = '<button id="incomplete" data-taskid="'+res[i].id+'"><img src="http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/blue-jelly-icons-arrows/007361-blue-jelly-icon-arrows-arrow-undo.png"></button>';
        var deleteButton = '<button id="delete" data-taskid="'+res[i].id+'"><img src="https://lh3.googleusercontent.com/G2jzG8a6-GAA4yhxx3XMJfPXsm6_pluyeEWKr9I5swUGF62d2xo_Qg3Kdnu00HAmDQ=w300"></button>';
        if(res[i].completed){
          $('.finished').append('<p class="completed">'+ res[i].task + deleteButton + uncomp +'</p>');
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

  if($('#new-task').val() === ''){
    alert('Please enter a task');
  }
  else{
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

function reAddFunc(){
  $.ajax({
    url: '/completed',
    type: 'POST',
    data: {completed: false, id: $(this).data('taskid')},
    success: function(res){
      console.log(res);
      getTasks();
    }
  });
}
