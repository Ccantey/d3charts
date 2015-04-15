//Function to create configurable HTML table with data binding
function table(dataset, config){
    //hard code: CSV columns
    var columns = config.columns;
  
    var table = d3.select(config.htmlId).append("table"),
        thead = table.append("thead"),
        tbody = table.append("tbody");
    
    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
        .text(function(column) { return column; });

    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(dataset)
        .enter()
        .append("tr");

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
            return columns.map(function(column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append("td")
            .text(function(d) { return d.value; });

    d3.selectAll("tbody tr").style("background-color", function(d, i) {
        return i % 2 ? "#fff" : "#eee";
    });
}

d3.csv("data.csv", function(error, data) { 
  var config ={
     htmlId: "#domId",
     columns: ["Location", "Building Size (cubic feet)", "2009 Usage (therms)", "2013 Usage (therms)", "2009 Energy Intensity (therms/ft3)", "2013 Energy Intensity (therms/ft3)", "Percent Change"]
  };  
  
  //Create the HTML table with data bindings
  table(data, config);
  }
