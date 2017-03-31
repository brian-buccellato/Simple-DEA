// declare an instance of dea list to hold data
var simple_dea_list = new DeaList();

var simple_dea_id_manager = id_manager();

var simple_dea_state_manager = deaStateManager("main");

/*
	DeaList-
		attributes: data-holds all records potentially displayed by dea
		methods: 	addRow-adds an item to the data list of records
						sortByDate-sorts the data records by date, greatest to smallest
						findAllExpired-returns a list of all the expired licenses in the data list
*/
function DeaList(){
	this.data = [];
}

DeaList.prototype.addRow = function(row){
	this.data.push(row);
}

DeaList.prototype.sortByDate = function(){
	this.data.sort(function(a, b){return b.date - a.date});
}

DeaList.prototype.findAllExpired = function(){
	var expired = [];
	for(var i = 0; i < this.data.length; i++){
		if(this.data[i].expired){
			expired.push(this.data[i]);
		}
	}
	return expired;
}

/*
	tracks the state of the dea display.  either "main" (top 30) or
	"exp" (show all expired)
*/
function deaStateManager(state){
	var prev_state = state;
	//closure preserves prev_state variable
	return {
		getPreviousState: function(){
			return prev_state;
		},
		setPreviousState: function(curr_state){
			prev_state = curr_state;
		}
	}
}

/*
	function to track the div id of the last list record clicked
*/
function id_manager(id){
	var previous_id = id;
	//closure preserves the div id of the last record clicked
	return {
		getPreviousId: function(){
			return previous_id;
		},
		setPreviousId: function(click_id){
			previous_id = click_id;
		}
	}
}

/*
	expands or collapses the current dea list record clicked
*/
function collapseDetails(id){
	
	//get the child div of the dea list element
	var child = document.getElementById(id + 'child');
	var prev_id;
	
	//if no previous click id is available previous id is current id.  
	if(simple_dea_id_manager.getPreviousId() === undefined){
		prev_id = id;
	}
	//get the previous id. 
	else{
		prev_id = simple_dea_id_manager.getPreviousId();
	}
	
	//set the previous to be the last clicked id
	simple_dea_id_manager.setPreviousId(id);
	
	//handles the case of clicking two different list records successively
	if(id !== prev_id){
		
		//get the currently expanded record
		var prev_child = document.getElementById(prev_id + 'child');
		
		//change the expanded records height to 0
		if(prev_child.style.height !== "0px"){
			prev_child.style.transition = "height 0.3s linear 0s";
			prev_child.style.height = "0px";
		}
	}
	
	//handles the case of clicking the same record successively
	child.style.transition = "height 0.3s linear 0s";
	
	if(child.style.height == 0 || child.style.height === "0px"){
		
		//expand the collapsed record
		child.style.height = "125px";
	}
	else{
		
		//collapse the expanded record
		child.style.height = "0px";
	}
}

/*
	change the view to display only expired licenses
*/
function showExpired(){
	
	//get all of the expired licenses
	var ex_list = simple_dea_list.findAllExpired();
	
	//set the previous id to undefined
	simple_dea_id_manager.setPreviousId(undefined);
	
	//set the previous state property to "exp"
	simple_dea_state_manager.setPreviousState("exp");
	
	//re-rended the dea list with only expired licenses
	renderList(ex_list, ex_list.length);
}

/*
	reset the view to default when the reset filter button is clicked
*/
function reset(){
	
	//reset previous id property
	simple_dea_id_manager.setPreviousId(undefined);
	
	//set the previous state to main
	simple_dea_state_manager.setPreviousState("main");
	
	//re-render the dea list
	renderList(simple_dea_list.data, 30);
}

/*
	iterate through all of the latest response objects and
	determine if there are any new entries that need to be added
	to the innerHTML of the dea-list div
*/
function findNewDeaEntries(results){
	var nu_entries = [];
	var current_entry;
	var data = simple_dea_list.data;
	var nu_record;
	for(var i = 0; i < results.length; i++){
		current_entry = results[i];
		nu_record = true;
		for(var j = 0; j < data.length; j++){
			if(current_entry.dea_number === data[j].dea_number){
				nu_record = false;
			}
		}
		if(nu_record){
			nu_entries.push(results[i]);
		}
	}
	return nu_entries;
}
/*
	TODO	Write this function to insert new content into 
				the view
*/
function spliceNewRows(entries){
	/*
		determine where the new entry needs to go.
		re-sort the list, find the record in the list
		use string manipulation to insert the markup
		property of that item into the innerHTML
		need to be mindful of state.  If the view is
		in expired only need to insert expired items.
		otherwise insert them all.  remove the last 
		entry for every entry added
	*/
}

function fetchDeaData(){
	var cs = function(result){
		/*
			TODO 	Incorporate functionality to splice in 
						new entries in the appropriate parts
						of the innerHTML.
				
		*/
		if(simple_dea_list.data.length !== 0){
			var nu_entries = findNewDeaEntries(result);
			if(nu_entries.length > 0){
				createRows(nu_entries);
				simple_dea_list.sortByDate();
				spliceNewRows(nu_entries);
			}
		}
		else{
			//extend the objects properties and add them to the dea list
			createRows(result);
			
			//sort the newly added rows
			simple_dea_list.sortByDate();
			
			//use the list to render the innerHTML of the dea-list div
			renderList(simple_dea_list.data, 30);
		}
		window.setTimeout(function() {
          csApi.getData(cs);
        }, 3000);
	}
	csApi.getData(cs);
}

/*
	renders the innerHTML of the dea-list div
*/
function renderList(dea_list, len){
	
	//find the dea-list div
	var elem = document.getElementById('dea-list');
	
	//make sure the innerHTML is empty to avoid buildups
	elem.innerHTML = '';
	
	//for each item to be rendered, add its markup property to the innerHTML of the dea-list div 
	for(var i = 0; i < len; i++){
		elem.innerHTML += dea_list[i].markup;
	}
}

/*
	create html for each item to be displayed by the dea list app
*/
function addDeaHtml(row, index){	
	var 	expired,
			note,
			status_color
			;
	/*
		if the license is expired then the markup should have status of "Expired"
		and a status color on the red family
	*/
	if(row.expired){ 
		expired = "Expired";
		note = "Expired On: ";
		status_color = "rgba(241, 19, 19, 0.46);";
	}
	/*
		if the licence is still valid the markup should indicate its status is "Active"
		and status color is in the green family
	*/
	else{
		expired = "Active";
		note = "Valid Through: "
		status_color = "#69bd6d"
		
	}
	var markup = 		'<div id="\''+row.dea_number+'\" class="list-name" onclick="collapseDetails(this.id)"><div style="display:inline-block; width:85%;">' + row.name + '</div>' + 
								'<div class="list-name-status" style="background-color:'+ status_color+'">' + expired + '</div></div>' +
								'<div id="\''+row.dea_number+"child"+'\" class="list-details">' +
									'<div class="list-details-text">' + "DEA Number: " + row.dea_number + '</div><div class="list-details-text">' + note + row.expiration_date + '</div>' +
									'<div class="list-details-text">' + "NPI: " + row.npi + '</div><div class="list-details-text">' + "Provider ID: " + row.provider_id + '</div>' +
								'</div>';
	return markup;
}
/*
	function to extend the properties of the response
	from the cs api
*/
function createRows(result){
	var 	row,
			date_parts,
			year,
			day,
			month,
			expired,
			date
			;
			
	for(var i = 0; i < result.length; i++){
		row = result[i];
		//create a date by parsing the date string of the response object
		date_parts = row.expiration_date.split("-");
		year = parseInt(date_parts[0]);
		day = parseInt(date_parts[2]);
		month = parseInt(date_parts[1]) - 1;
		
		date = new Date(year, month, day, 0, 0, 0);
		
		//determine if the date on the response is before the current time
		expired = new Date() > date ? true : false;
		row["date"] = date;
		row["expired"] = expired;
		
		//add markup to the response object 
		row["markup"] = addDeaHtml(row, i);
		
		//add the new row to the dea list
		simple_dea_list.addRow(row);
	}
}

