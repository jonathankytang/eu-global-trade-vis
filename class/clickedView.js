// Constructor function to process all data apart from national accounts for country view

function clickedView(path, country, index) {

    // Selected country
    this.country = country;

    this.loaded = false;

    // Load data sets
    this.preload = function () {
        var self = this;

        // Generate new path by adding another i to the reference
        var newPath = [path.slice(0, 43), "i", path.slice(43)].join("");

        // Data set
        this.data = loadTable(
            path, 'csv',
            // Callback function to set the value
            // this.loaded to true.
            function (table) {
                self.loaded = true;
                console.log("table loaded");
            });

        // Information about data set
        this.dataInfo = loadTable(
            newPath, 'csv',
            // Callback function to set the value
            // this.loaded to true.
            function (table) {
                self.loaded = true;
                console.log("table loaded");
            });

        // Flag references
        this.flagData = loadTable(
            "./Data/Flags/flag-data.csv", 'csv',
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

    // Whole selected data set
    this.tableData = function () {
        var data = this.data.getArray();

        return data
    };

    // Method to get all available years from data set
    this.topRow = function () {
        var tableArray = this.tableData();
        var yearArray = [];

        for (var i = 1; i < tableArray[0].length; i++) {
            yearArray.push(tableArray[0][i]);
        }

        return yearArray

    };

    // Method to return the selected year and value as object
    this.countryValue = function () {
        var tableArray = this.data.getArray();
        
        for (var i = 0; i < tableArray.length; i++) {
            if (tableArray[i][0] == country) {
                var year = tableArray[0][index];
                var value = tableArray[i][index];

                var obj = {
                    year: year,
                    value: value
                };
            }
        }

        return obj
    };

    // Method to return the title of data set
    this.graphTitle = function () {
        var infoArray = this.dataInfo.getArray();
        var title = infoArray[0][1];

        return title
    };

    // Method to return the units of data set
    this.valueUnits = function () {
        var infoArray = this.dataInfo.getArray();
        var units = infoArray[1][1];

        return units
    };

    //Method to return trade flow of data set
    this.tradeFlow = function () {
        var infoArray = this.dataInfo.getArray();
        var flow = infoArray[2][1];

        return flow
    };

    // Method to return flag code of selected country
    this.flagCode = function () {
        var tableArray = this.flagData.getArray();
        
        for (var i = 0; i < tableArray.length; i++) {
            if (tableArray[i][0] == country) {
                var code = tableArray[i][1];
            }
        }

        return code
    };

    // Method to return all countries of data set
    this.allCountries = function () {
        var countryList = [];
        
        for (var i = 1; i < this.tableData().length; i++) {
            if (this.tableData()[i][4] != ":") {
                countryList.push(this.tableData()[i][0]);
            }
        }

        return countryList
    };
    
    
    // Method to replace spaces with dashes for 2+ worded countries
    // http://jsfiddle.net/FmV9k/
    this.conCat = function () {
        var concatCountry = country;
        if (country.indexOf(' ') >= 0) {
            for (var i = 0; i < (country.match(/ /g) || []).length; i++) {
                concatCountry = concatCountry.replace(" ", "-");
            }
        } else {
            concatCountry = country;
        }
         
        return concatCountry;
    };
}
