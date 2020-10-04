$(document).ready(function(){
  
  
    
  	const localStorageName = "schedule";
  	const hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

 
    init();
    function init(){
      
      	let time = moment(); 
      	$("#currentDay").text(time.format("dddd, MMMM Do, YYYY"));
       
      	let schedule = getData(localStorageName); 
      	buildSchedule(time, schedule);
       
      	$(".saveBtn").on("click", handleClick);
    }
  	function buildSchedule(time, schedule){
    	
      	let currentHour = time.format("ha").toUpperCase(); 
      	let currentTime = "past";
      
      	let container = $(".container");
      	let rowsHtml = "";
      
      	for (let hour of hours){
            
          	if (hour === currentHour) currentTime = "present";
          	else if (currentTime === "present") currentTime = "future";
            
          	let appointment = "";
          	if (schedule[hour]) appointment = schedule[hour]; 
          	rowsHtml += `
				<div class="row">
					<p class="hour col-1">${hour}</p>
					<textarea class="${currentTime} col-10">${appointment}</textarea>
					<button class="saveBtn col-1"><i class="fa fa-lock"></i></button>
				</div>
			`;
        }
   
      	container.html(rowsHtml);
    }

    
    function handleClick(e){
		
      	let button = $(e.target);
      	
          let row = button.parents(".row")[0];
          console.log(row)
    
      	let hour = $(row).find(".hour").text();
      	
      	let appointment = $(row).find("textarea").val();
      	
      	let schedule = getData(localStorageName);
      
      	schedule[hour] = appointment;
      
      	setData(localStorageName, schedule);
    }
  

  	function getData(name){
    	let dataString = localStorage.getItem(name) || "{}"; 
      	return JSON.parse(dataString);
    }
  	function setData(name, data){
    	let dataString = JSON.stringify(data);
      	localStorage.setItem(name, dataString);
    }
  
  
});