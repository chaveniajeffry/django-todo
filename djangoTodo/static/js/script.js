//local date and time format
date_length = document.querySelectorAll(".local-date-format")
date_length.forEach((item, index) => {
    let formatted_date = new Date((item.textContent * 1000))
    let date = formatted_date.toLocaleDateString()
    let time = formatted_date.toLocaleTimeString()
    let new_start_date = new Date(date)
    var new_day = ""
    var new_month = ""
    //day
    if (new_start_date.getDate().toString().length == 1) {
        new_day = "0" + new_start_date.getDate()
    } else {
        new_day = new_start_date.getDate()
    }
    //month
    if (new_start_date.getMonth() < 9) {
        new_month = "0" + (parseInt(new_start_date.getMonth()) + 1)
    } else {
        new_month = parseInt(new_start_date.getMonth()) + 1
    }
    formatted_search_query_start_date = new_month + "/" + new_day + "/" + new_start_date.getFullYear()
    item.textContent = formatted_search_query_start_date + " " + time
});
document.addEventListener('DOMContentLoaded', function() {
    var calendarDiv = document.getElementById("calendar");
  
    // Create table element
    var table = document.createElement('table');
  
    // Create table header (weekdays)
    var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var headerRow = document.createElement('tr');
    weekdays.forEach(function(day) {
      var th = document.createElement('th');
      th.appendChild(document.createTextNode(day));
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
  
    // Create table cells (dates)
    var currentDate = new Date();
    var today = currentDate
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
  
    var firstDay = new Date(currentYear, currentMonth, 1);
    var lastDay = new Date(currentYear, currentMonth + 1, 0);
  
    var startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay()); // Set start date to Sunday of the first week
  
    var endDate = new Date(lastDay);
    endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay())); // Set end date to Saturday of the last week
    var currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      var row = document.createElement('tr');
  
      for (var i = 0; i < 7; i++) {
        var cell = document.createElement('td');
  
        if (currentDate.getMonth() == currentMonth) {
          cell.appendChild(document.createTextNode(currentDate.getDate()));
          if(currentDate.getDate() == today.getDate()){
            cell.id= "today"
          }
        }
  
        row.appendChild(cell);
        currentDate.setDate(currentDate.getDate() + 1);
      }
  
      table.appendChild(row);
    }
  
    // Append the table to the calendar div
    calendarDiv.appendChild(table);
  });