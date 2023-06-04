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
// document.addEventListener('DOMContentLoaded', function() {
//   var calendarDiv = document.getElementById("calendar");

//   // Create table for each month
//   for (var month = 0; month < 12; month++) {
//     var table = document.createElement('table');

//     // Create table header (month and weekdays)
//     var monthName = new Date(new Date().getFullYear(), month).toLocaleString('default', { month: 'long' });
//     var headerRow = document.createElement('tr');
//     var monthHeader = document.createElement('th');
//     monthHeader.setAttribute('colspan', '7');
//     monthHeader.textContent = monthName;
//     headerRow.appendChild(monthHeader);
//     table.appendChild(headerRow);

//     var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     var weekdaysRow = document.createElement('tr');
//     weekdays.forEach(function(day) {
//       var th = document.createElement('th');
//       th.appendChild(document.createTextNode(day));
//       weekdaysRow.appendChild(th);
//     });
//     table.appendChild(weekdaysRow);

//     // Create table cells (dates)
//     var currentDate = new Date();
//     var today = currentDate
//     var currentYear = new Date().getFullYear();
//     var firstDay = new Date(currentYear, month, 1);
//     var lastDay = new Date(currentYear, month + 1, 0);

//     var startDate = new Date(firstDay);
//     startDate.setDate(firstDay.getDate() - firstDay.getDay()); // Set start date to Sunday of the first week

//     var endDate = new Date(lastDay);
//     endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay())); // Set end date to Saturday of the last week

//     var currentDate = new Date(startDate);

//     while (currentDate <= endDate) {
//       var row = document.createElement('tr');

//       for (var i = 0; i < 7; i++) {
//         var cell = document.createElement('td');

//         if (currentDate.getMonth() == month) {
//           cell.appendChild(document.createTextNode(currentDate.getDate()));
//           date_length = document.querySelectorAll(".local-date-format")
//           date_length.forEach((item, index) => {
//             let new_start_date = new Date(item.textContent)
            
//               if (new_start_date.getDate() == currentDate.getDate() && new_start_date.getMonth() == currentDate.getMonth()) {
//                 cell.id= "one"
//               }
//           })
//           if(currentDate.getDate() == today.getDate() && currentDate.getMonth() == today.getMonth()){
//             cell.id= "today"
//           }
//         }

//         row.appendChild(cell);
//         currentDate.setDate(currentDate.getDate() + 1);
//       }

//       table.appendChild(row);
//     }

//     // Append the table to the calendar div
//     calendarDiv.appendChild(table);
//   }
// });

document.addEventListener('DOMContentLoaded', function() {
  var calendarDiv = document.getElementById("calendar");

  // Create main container for the calendar
  var calendarContainer = document.createElement('div');
  calendarContainer.className = 'calendar-container';

  // Create tables for each month
  var currentYear = new Date().getFullYear();
  var monthCount = 0;

  for (var row = 0; row < 4; row++) {
    for (var col = 0; col < 12; col++) {
      var table = document.createElement('table');
      table.className = 'calendar-table';

      // Create table header (month and weekdays)
      var monthName = new Date(currentYear, monthCount).toLocaleString('default', { month: 'long' });
      var headerRow = document.createElement('tr');
      var monthHeader = document.createElement('th');
      monthHeader.setAttribute('colspan', '7');
      monthHeader.textContent = monthName;
      headerRow.appendChild(monthHeader);
      table.appendChild(headerRow);

      var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      var weekdaysRow = document.createElement('tr');
      weekdays.forEach(function(day) {
        var th = document.createElement('th');
        th.appendChild(document.createTextNode(day));
        weekdaysRow.appendChild(th);
      });
      table.appendChild(weekdaysRow);

      // Create table cells (dates)
      var currentDate = new Date();
      var today = currentDate
      var firstDay = new Date(currentYear, monthCount, 1);
      var lastDay = new Date(currentYear, monthCount + 1, 0);

      var startDate = new Date(firstDay);
      startDate.setDate(firstDay.getDate() - firstDay.getDay()); // Set start date to Sunday of the first week

      var endDate = new Date(lastDay);
      endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay())); // Set end date to Saturday of the last week

      var currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        var row = document.createElement('tr');

        for (var i = 0; i < 7; i++) {
          var cell = document.createElement('td');

          if (currentDate.getMonth() == monthCount) {
            cell.appendChild(document.createTextNode(currentDate.getDate()));
            date_length = document.querySelectorAll(".local-date-format")
            date_length.forEach((item, index) => {
              let new_start_date = new Date(item.textContent)
              
                if (new_start_date.getDate() == currentDate.getDate() && new_start_date.getMonth() == currentDate.getMonth()) {
                  cell.id= "one"
                }
            })
            if(currentDate.getDate() == today.getDate() && currentDate.getMonth() == today.getMonth()){
              cell.id= "today"
            }
          }

          row.appendChild(cell);
          currentDate.setDate(currentDate.getDate() + 1);
        }

        table.appendChild(row);
      }

      // Append the table to the calendar container
      calendarContainer.appendChild(table);

      monthCount++;
    }
  }

  // Append the calendar container to the calendar div
  calendarDiv.appendChild(calendarContainer);
});