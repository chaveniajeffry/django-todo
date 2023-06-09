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
function sumByDate(tableData) {
  const sumsByDate = {};

for (let i = 0; i < tableData.length; i++) {
  const date = tableData[i];

  if (sumsByDate[date]) {
    sumsByDate[date]++;
  } else {
    sumsByDate[date] = 1;
  }
}

return sumsByDate;
}

// Example usage:
let tableData = []
all_dates = document.querySelectorAll(".local-date-format")
all_dates.forEach(element => {
  date_format = new Date(element.textContent)
  tableData.push(date_format.toLocaleDateString())
});
const result = sumByDate(tableData);

// Convert result object to array of [date, count] pairs
const data = Object.entries(result);
// This is for the calendar
document.addEventListener('DOMContentLoaded', function() {
  var calendarDiv = document.getElementById("calendar");

  // Create the year container for the calendar
  var yearContainer = document.createElement('div');
  yearContainer.id = "yearContainer"
  // Create main container for the calendar
  var calendarContainer = document.createElement('div');
  calendarContainer.className = 'calendar-container';

  // Create tables for each month
  var currentYear = new Date().getFullYear();
  var monthCount = 0;
  yearContainer.innerHTML = currentYear
  for (var row = 0; row < 4; row++) {
    for (var col = 0; col < 12; col++) {
      var table = document.createElement('table');
      table.className = 'calendar-table';

      // Create table header (month and weekdays)
      var monthName = new Date(currentYear, monthCount).toLocaleString('default', { month: 'long' });
      var headerRow = document.createElement('tr');
      var monthHeader = document.createElement('th');
      monthHeader.setAttribute('colspan', '7');
      monthHeader.classList.add('month-header');
      monthHeader.textContent = monthName;
      headerRow.appendChild(monthHeader);
      table.appendChild(headerRow);

      var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      var weekdaysRow = document.createElement('tr');
      // weekdays.classList.add('week-days')
      weekdays.forEach(function(day) {
        var th = document.createElement('th');
        th.classList.add('weekdays')
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
            let date_series = data.map(([date, count]) => [date, count]);
            date_series.forEach((item,index)=>{
              
              // ['6/20/2023', 4] item
              let new_date = new Date(item[0])
                
                if (new_date.getDate() == currentDate.getDate() && new_date.getMonth() == currentDate.getMonth() && (item[1] <=5)) {
                  cell.classList.add('task-level-one')
                  console.log("item",item[0])
                  console.log("item",item[1])
                }
                else if (new_date.getDate() == currentDate.getDate() && new_date.getMonth() == currentDate.getMonth() && (item[1] >=6 && item[1] <=10)) {
                  cell.classList.add('task-level-two')
                  console.log("item",item[0])
                  console.log("item",item[1])
                }
                else if (new_date.getDate() == currentDate.getDate() && new_date.getMonth() == currentDate.getMonth() && (item[1] >=11 && item[1] <=15)) {
                  cell.classList.add('task-level-three')
                  console.log("item",item[0])
                  console.log("item",item[1])

                }
                else if (new_date.getDate() == currentDate.getDate() && new_date.getMonth() == currentDate.getMonth() && (item[1] >15)) {
                  cell.classList.add('task-level-four')
                  console.log("item",item[0])
                  console.log("item",item[1])

                }
            })
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
  calendarDiv.appendChild(yearContainer);
  calendarDiv.appendChild(calendarContainer);
});


// Prepare the data for Highcharts series
const seriesData = data.map(([date, count]) => [Date.parse(date), count]);

// Create the Highcharts chart
Highcharts.chart('chartContainer', {
chart: {
  type: 'area'
},
title: {
  text: 'Date Counts'
},
xAxis: {
  type: 'datetime',
  title: {
    text: 'Date'
  }
},
yAxis: {
  title: {
    text: 'Count'
  }
},
series: [{
  name: 'Count',
  data: seriesData,
  pointStart: Date.parse(tableData[0].split('T')[0]), // Specify the starting date of the x-axis
  pointInterval: 24 * 3600 * 1000 // Set the interval to 1 day (24 hours)
}]
});