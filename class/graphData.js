// Constructor function to generate the data for the graph in the correct format

function graphData(data, country) {
    
    // Imported selected data from data set
    this.array = data;

    // Method to organise data in correct format for graph
    this.allData = function () {
        var tableArray = this.array;
        var countryArray = [];
        
        // For loop to iterate through all of the selected data
        for (var i = 0; i < tableArray.length; i++) {
            
            // Find when the data is the same as the country
            if (tableArray[i][0] == country) {
                for (var j = 0; j < tableArray[i].length; j++) {
                    
                    // All values not in the first column
                    if (j != 0) {
                        
                        // If data value is a colon (no data available), push nothing
                        if (tableArray[i][j] == ":") {
                            countryArray.push()
                        } else {
                            
                            // Convert string to float
                            floatVal = parseFloat(tableArray[i][j]);
                            
                            // Push to array
                            countryArray.push(floatVal);
                        }

                    } else {
                        
                        // Country name of current index
                        countryArray.push(tableArray[i][j])
                        
                    }
                }
            }
        }  

        return countryArray
    };

}
