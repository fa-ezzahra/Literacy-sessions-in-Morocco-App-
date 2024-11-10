$(document).ready(function() {
  // Fetch and display the list of centres
$.ajax({
    url: '/centres',
    method: 'GET',
    success: function(data) {
      const centreList = $('#centreList');
      data.forEach(centre => {
        const listItem = $('<li>').text(centre.nom_centre);
        listItem.click(function() {
          fetchGroupsAndStudents(centre.nom_centre);
          fetchTimetable(centre.nom_centre);
        });
        centreList.append(listItem);
      });
    },
    error: function(err) {
      console.error('Error fetching centres:', err);
    }
  });
});
 // Function to fetch and display timetable for a selected centre
 /*function fetchTimetable(centreName) {
  $.ajax({
    url: `/timetable/${centreName}`,
    method: 'GET',
    success: function(data) {
      const timetableDiv = $('#timetable');
      timetableDiv.empty(); // Clear previous timetable
      data.forEach(entry => {
        const groupDiv = $('<div class="cart-emplois">');
        const classDiv = $('<div class="class">');
        const enteteDiv = $('<div class="entete2">').append($('<span>').text(entry.group));
        const tableClassDiv = $('<div class="table-class">');

        const subjectClass = entry.subject.toLowerCase() === 'math' ? 'colonne_math' : 'colonne_arabe';
        const colDiv = $(`<div class="${subjectClass}">`);
        colDiv.append($('<h2>').text(entry.subject.toUpperCase()));
        const tdcContainer = $('<div class="tdc_container">');
        tdcContainer.append($('<span>').text(entry.time)).append('<br>');
        tdcContainer.append($('<span>').text(entry.day.charAt(0).toUpperCase() + entry.day.slice(1))).append('<br>');
        tdcContainer.append($('<span>').text(`salle ${entry.classroom}`));
        colDiv.append(tdcContainer);
        tableClassDiv.append(colDiv);
        tableClassDiv.append($('<div class="line"></div>'));

        classDiv.append(enteteDiv).append(tableClassDiv);
        groupDiv.append(classDiv);
        timetableDiv.append(groupDiv);
      });
    },
    error: function(err) {
      console.error('Error fetching timetable:', err);
    }
  });
}*/




/*$(document).ready(function() {
  // Fetch and display the list of centres
  $.ajax({
    url: '/centres',
    method: 'GET',
    success: function(data) {
      const centreList = $('#centreList');
      data.forEach(centre => {
        const listItem = $('<li>').text(centre.nom_centre);
        listItem.click(function() {
          fetchTimetable(centre.nom_centre);
        });
        centreList.append(listItem);
      });
    },
    error: function(err) {
      console.error('Error fetching centres:', err);
    }
  });
});*/








function fetchGroupsAndStudents(centre) {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>lets go");
  $.ajax({
    url: `/groups/${centre}`,
    method: 'GET',
    success: function(data) {
      const groupTable = $('#groupTable');
      groupTable.empty();
      data.forEach(row => {
        const groupRow = $('<tr>');
        groupRow.append($('<td>').text(row.num_groupe));
        groupRow.append($('<td>').text(`${row.nom_eleve} ${row.prenom_eleve}`));
        groupTable.append(groupRow);
      });
    },
    error: function(err) {
      console.error('Error fetching groups and students:', err);
    }
  });
}


























const selecteur2 = document.querySelector(".selecteur2");
var dropdown2 = document.querySelector(".dropdown-menu2");
  
selecteur2.addEventListener("click", () => {
dropdown2.style.display = dropdown2.style.display === "block" ? "none" : "block";
    });
  
var connection = document.querySelector(".connection");
var dec1 = document.querySelector(".connection-deco1");
var dec2 = document.querySelector(".connection-deco2");
var butt = document.querySelector(".login button");
  
butt.addEventListener("click", () => {
      connection.classList.add("open");
      dec1.classList.add("open");
      dec2.classList.add("open");
    });
  
var body = document.querySelector(".all");
  
body.addEventListener("click", (event) => {
      if (!event.target.closest(".connection") && !event.target.closest(".login button")) {
        connection.classList.remove("open");
        dec1.classList.remove("open");
        dec2.classList.remove("open");
      }
    });
 
 