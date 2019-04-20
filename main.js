var ta = [];


var d = new Date();

day = d.getDate();
month = d.getMonth();
year = d.getFullYear();

$("#date").text(day+" "+month+" "+year);

 $("#task_add").click(function(){

$("#task_add").hide();
$("#add_task_form").show();
$("#task-input").focus()
});

 $("#cancel").click(function(){

$("#task_add").show();
$("#add_task_form").hide();
$("#task-input").val("");
});





// task Array


// save Here 



$("#save").click( function(){

var task_input = $("#task-input").val();
var task_sub = task_input.substring(1, 4);
var rand = Math.floor(Math.random() * 20) + 1;
var rand2 = Math.floor(Math.random() * 20) + 1;
task_id_demo = rand2+task_sub + rand;
var task_id = task_id_demo.replace(/\s/g,'');
add_task(task_input,task_id);

});




function add_task(task,id){
ta.push({ id, task });
update_local();
$("#add_task_form").hide();
$("#task_add").show();
$("#task-input").val("");
display();
}




function update_task(newcontent,id){

 for (x in ta) {

if (ta[x].id == id) {
    ta[x].task = newcontent;
   }
}

console.log(id);

}



function display(){
read_local();
var  output = "";	
for (x in ta) {

output += "<div id='aa"+ta[x].id+"'><div class='task' id='tt"+ta[x].id+"'>  <i class='material-icons inline-icon'>timelapse</i> <i class='task-text' >"+ ta[x].task+"</i> <i class='delete material-icons inline-icon right' id='"+ta[x].id+"'>delete</i> </div> <br><div class='divider'></div></div><div class='hidden' id='zz"+ta[x].id+"'> <form class='application__form'><input class='' id='in"+ta[x].id+"' value='"+ ta[x].task+"' autocomplete='off' autofocus>  <div class=''><button class='waves-effect waves-teal btn-small green save_update' id='ss"+ta[x].id+"' >Update</button><a class='waves-effect waves-teal btn-flat cancel_update ' id='cc"+ta[x].id+"' >Cancel</a></div></form><br></div>";

  console.log(ta[x].id);
}

$("#task").html(output);


$(".save_update").click( function(){


var id = $(this).attr("id");
var id = id.slice(2);
var task_update = $("#in"+id).val();

update_task(task_update,id);
update_local();
display();
});


$(".task").click(function(){
var id = $(this).attr("id");

var id = id.slice(2);

$("#aa"+id).hide();
$("#zz"+id).show();
console.log(id);

});

 $(".cancel_update").click(function(){
var id = $(this).attr("id");
var id = id.slice(2);
$("#aa"+id).show();
hide_cancel(id);
});


$(".delete").click(function(){
console.log("delete");
var id = $(this).attr("id");
console.log(id);
delete_task(id);

});

}

function hide_cancel(id){
$("#zz"+id).hide();
console.log(id);
}

function update_local(){
if(ta === null){
localStorage.setItem('tasks',"[]");
}else{

localStorage.setItem('tasks', JSON.stringify(ta));
}
}

function read_local(){

var storage = JSON.parse(localStorage.getItem('tasks'));
console.log(storage);
ta = storage;
}

function delete_task(id){


 for (x in ta) {
console.log("Ta "+ta[x].id);
console.log("pass "+id);
if (ta[x].id == id) {
     ta.splice(x,1); 
console.log("got"+x);
   }
}
update_local()
display();
}



read_local();
update_local();
display();

