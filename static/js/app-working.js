// Convert an Array to a Table

// import the data from data.js
    // this automatically picks up that the data.js file 

const tableData = data;


// Reference the HTML table using d3
    // D3 is a JavaScript library that produces sophisticated and highly dynamic graphics in an HTML webpage. 
    // It is often used by data professionals to create dashboards, or a collection of visual data (such as graphs and maps), for presentation.
var tbody = d3.select("tbody");


// Build a function that will accept the data from the data.js
function buildTable(data) {
    // First, clear out any existing data
        // tbody.html references the table in the HTML page we're going to build and we put ("") to clear the table
    tbody.html("");
  
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
        // data - is the object that references the data to be imported
        // .forEach() - is the keyword to create a for loop specific for iterating through arrays in JavaScript
        //  dataRow - the parameter name that will be used as a value when the function is called
    data.forEach((dataRow) => {
      
      // Append a row to the table body
      let row = tbody.append("tr");
        // This code tells JS to find the <tbody> tag within the html, and add a table row 'tr'
        // We use 'let' here since this variable will just be limited to this block of code

      // Loop through each field in the dataRow and add
      // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        // By starting our line of code with Object.values, we're telling JavaScript to reference one object from the array
        // By adding (dataRow) as the argument, we are saying that we want the values to go into the dataRow
        // added forEach((val) to specify that we want one object per row
        // The val argument represents each item in the object, such as the location, shape, or duration
        // 'cell' will be the variable that appends data into a table data tag <td>, and the '.text(val)' chained to the variable will only extract the text
        }
      );
    });
  }

function handleClick() {
  // Grab the datetime value from the filter
  // The .select() function is a very common one used in D3. It will select the very first element that matches our selector string: "#datetime".
  // The datetime value will be an 'id' so we can select it using '#datetime' with a #
  // By chaining .property("value"); to the d3.select function, we're telling D3 not only to look for where our date values are stored on the webpage, but to actually grab that information and hold it in the "date" variable
  let date = d3.select("#datetime").property("value");

  // Set a default filter and save it to a new variable - this is our original data imported from 'data.js' file
  // this is done since this function will be run each time the button is clicked, and if there is no date entered to be filtered we want all of the data
  let filteredData = tableData;

  // Check to see if a date was entered and filter the data using that date.
  if (date) {
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    filteredData = filteredData.filter(row => row.datetime === date);
  }

  // Rebuild the table using the filtered data
  // @NOTE: If no date was entered, then filteredData will just be the original tableData.
  buildTable(filteredData);
}

// Attach an event to listen for the form button
// '#filter-btn' is our selector string which contains the id for another HTML tag - this way we are linking our code directly to the filter button
// '.on("click", handleClick);', we're telling D3 to execute our handleClick() function when the button with an id of filter-btn is clicked
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);