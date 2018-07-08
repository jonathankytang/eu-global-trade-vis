// Constructor function to generate data for map, min & max values of selected data

function tableData(path) {

    this.loaded = false;
    
    // Load dataset
    this.preload = function () {
        var self = this;
        this.data = loadTable(
            path, 'csv',
            // Callback function to set the value
            // this.loaded to true.
            function (table) {
                self.loaded = true;
                console.log("table loaded");
            });
    };

    this.setup = function () {
        if (!this.loaded) {
            console.log('Data not yet loaded');
            return;
        }
    };

    // Method to return the years of dataset
    this.allYears = function () {
        var tableArray = this.data.getArray();
        var firstRow = tableArray[0];
        
        firstRow.shift();
        
        return firstRow
    };

    // Method to return all countries of dataset
    this.countries = function () {
        var tableArray = this.data.getArray();
        var sortedCountries = [];
        
        for (var i = 0; i < tableArray.length; i++) {
            var currentCountry = tableArray[i][0]
            sortedCountries.push(currentCountry)
        }
        
        return sortedCountries
    };

    // Method to return selected dataset
    this.currentYear = function () {

        var tableArray = this.data.getArray();
        var tradeData = [];
        var tempYear = [];
        
        // Append rows of countries to tradeData list
        for (var i = 0; i < tableArray.length; i++) {
            currentCountry = tableArray[i][0]
            tradeData.push(tableArray[i])
        };

        // Gets index of element in dropdown
        var selectYear = 1 + document.getElementById("date-select").selectedIndex;
        
        // Stores the selected year index
        localStorage.setItem("yearIndex", selectYear);
        
        // Loop to store the data to be shown
        for (var i = 0; i < tradeData.length; i++) {
            var currentValue = tradeData[i][selectYear];
            
            // Removes colons from dataset
            if (currentValue != ":") {
                
                // Converts each value to float and pushes to tempYear array
                floatValue = parseFloat(currentValue);
                tempYear.push(floatValue);
                
            } else {
                
                tempYear.push(0);
                
            }
        };

        return tempYear
    };

    // Method to return data as an object
    this.objectVersion = function () {
        var allData = [];
        
        for (var i = 0; i < this.countries().length; i++) {
            var country = this.countries();
            var value = this.currentYear();

            var values = {
                country: country[i],
                value: value[i]
            };

            allData.push(values);
        }
        return allData
    };

    // Method to return minimum value of selected data set
    this.minVal = function () {

        var oldList = this.currentYear();
        var newList = [];

        for (var i = 1; i < oldList.length; i++) {
            var currentElement = oldList[i]
            if (currentElement != 0) {
                newList.push(currentElement);
            }
        }

        if (newList.length == 0) {
            var val = 0;

        } else {
            var val = Math.min.apply(null, newList);
        }

        return val
    };

    // Method to return maximum value of selected data set
    this.maxVal = function () {
        var oldList = this.currentYear();
        var newList = [];

        for (var i = 1; i < oldList.length; i++) {
            var currentElement = oldList[i]
            if (currentElement != 0) {
                newList.push(currentElement);
            }
        }

        if (newList.length == 0) {
            var val = 0;

        } else {
            var val = Math.max.apply(null, newList);
        }

        return val
    };
}
