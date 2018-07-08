// Constructor Function to generate national accounts for selected country

function countryProfile(country, index) {

    this.loaded = false;

    // Load all national accounts data
    this.preload = function () {
        var self = this;

        this.b1aData = loadTable(
            "./Data/B-National-Accounts/B1ai-Current-prices.csv", "csv",
            // Callback function to set the value
            // this.loaded to true.
            function (table) {
                self.loaded = true;
                console.log("table loaded");
            });

        this.b1bData = loadTable(
            "./Data/B-National-Accounts/B1bi-euro-per-capita.csv", "csv",
            // Callback function to set the value
            // this.loaded to true.
            function (table) {
                self.loaded = true;
                console.log("table loaded");
            });

        this.b2aData = loadTable(
            "./Data/B-National-Accounts/B2ai-percentage-of-gdp.csv", "csv",
            // Callback function to set the value
            // this.loaded to true.
            function (table) {
                self.loaded = true;
                console.log("table loaded");
            });

        this.b2bData = loadTable(
            "./Data/B-National-Accounts/B2bi-million-euro.csv", "csv",
            // Callback function to set the value
            // this.loaded to true.
            function (table) {
                self.loaded = true;
                console.log("table loaded");
            });

        this.b3aData = loadTable(
            "./Data/B-National-Accounts/B3ai-Imports.csv", "csv",
            // Callback function to set the value
            // this.loaded to true.
            function (table) {
                self.loaded = true;
                console.log("table loaded");
            });

        this.b3bData = loadTable(
            "./Data/B-National-Accounts/B3bi-Exports.csv", "csv",
            // Callback function to set the value
            // this.loaded to true.
            function (table) {
                self.loaded = true;
                console.log("table loaded");
            });

        this.b5aData = loadTable(
            "./Data/B-National-Accounts/B5ai-Percentage-change.csv", "csv",
            // Callback function to set the value
            // this.loaded to true.
            function (table) {
                self.loaded = true;
                console.log("table loaded");
            });

        this.b6aData = loadTable(
            "./Data/B-National-Accounts/B6ai-Exports.csv", "csv",
            // Callback function to set the value
            // this.loaded to true.
            function (table) {
                self.loaded = true;
                console.log("table loaded");
            });

        this.b7aData = loadTable(
            "./Data/B-National-Accounts/B7ai-Imports.csv", "csv",
            // Callback function to set the value
            // this.loaded to true.
            function (table) {
                self.loaded = true;
                console.log("table loaded");
            });

        this.b8aData = loadTable(
            "./Data/B-National-Accounts/B8ai-Export-ratio.csv", "csv",
            // Callback function to set the value
            // this.loaded to true.
            function (table) {
                self.loaded = true;
                console.log("table loaded");
            });

        this.b9aData = loadTable(
            "./Data/B-National-Accounts/B9ai-percentage-change.csv", "csv",
            // Callback function to set the value
            // this.loaded to true.
            function (table) {
                self.loaded = true;
                console.log("table loaded");
            });

        this.b10aData = loadTable(
            "./Data/B-National-Accounts/B10ai-Index.csv", "csv",
            // Callback function to set the value
            // this.loaded to true.
            function (table) {
                self.loaded = true;
                console.log("table loaded");
            });
    }

    this.setup = function () {
        if (!this.loaded) {
            console.log('Data not yet loaded');
            return;
        }
    };

    this.destroy = function () {
        removeElements();
    };

    // Method to return all available countries in all national accounts data
    this.countries = function () {
        var tableArray = this.b1aData.getArray();
        var allCountries = [];

        for (var i = 1; i < tableArray.length; i++) {
            allCountries.push(tableArray[i][0])
        }

        return allCountries
    }

    // Method to return the selected country and year's repsective data for data set ref b1a
    this.b1a = function () {
        var valueAvailable = false;
        var tableArray = this.b1aData.getArray();
        
        for (var i = 0; i < tableArray.length; i++) {
            // Find country and check if data is available for country and year
            if (tableArray[i][0] == country && tableArray[i][index] != ":") {
                valueAvailable = true;
                var b1aValue = {
                    label: "GDP Market Price - Million Euro, Current Price",
                    value: parseFloat(tableArray[i][index]).toLocaleString("en-US")
                }
            }

        }
        
        // When no available value for country and year, show N/A
        if (!valueAvailable) {
            var b1aValue = {
                label: "GDP Market Price - Million Euro, Current Price",
                value: "N/A"
            }
        }

        return b1aValue
    };

    // Method to return the selected country and all year's data for data set ref b1a
    this.b1aAll = function () {
        var tableArray = this.b1aData.getArray();
        var selectedRow = [];
        
        for (var i = 1; i < tableArray.length; i++) {
            if (tableArray[i][0] == country) {
                for (var j = 1; j < tableArray[j].length; j++) {
                    if (tableArray[i][j] != ":") {
                        selectedRow.push({
                            id: country,
                            year: tableArray[0][j],
                            value: tableArray[i][j]
                        })
                    }
                }
            }
        }

        return selectedRow
    };

    // Method to return the selected country and year's repsective data for data set ref b1b
    this.b1b = function () {
        var valueAvailable = false;
        var tableArray = this.b1bData.getArray();
        
        for (var i = 0; i < tableArray.length; i++) {
            if (tableArray[i][0] == country && tableArray[i][index] != ":") {
                valueAvailable = true;
                var b1bValue = {
                    label: "GDP Market Price - Euro Per Capita",
                    value: parseFloat(tableArray[i][index]).toLocaleString("en-US")
                }
            }
        }

        if (!valueAvailable) {
            var b1bValue = {
                label: "GDP Market Price - Euro Per Capita",
                value: "N/A"
            }
        }
        return b1bValue
    };

    // Method to return the selected country and all year's data for data set ref b1b
    this.b1bAll = function () {
        var tableArray = this.b1bData.getArray();
        var selectedRow = [];
        
        for (var i = 1; i < tableArray.length; i++) {
            if (tableArray[i][0] == country) {
                for (var j = 1; j < tableArray[j].length; j++) {
                    if (tableArray[i][j] != ":") {
                        selectedRow.push({
                            id: country,
                            year: tableArray[0][j],
                            value: tableArray[i][j]
                        })
                    }
                }
            }
        }

        return selectedRow
    };

    // Method to return the selected country and year's repsective data for data set ref b2a
    this.b2a = function () {
        var valueAvailable = false;
        var tableArray = this.b2aData.getArray();
        
        for (var i = 0; i < tableArray.length; i++) {
            if (tableArray[i][0] == country && tableArray[i][index] != ":") {
                valueAvailable = true;
                var b2aValue = {
                    label: "Tax On Import Less Subsidies - % of GDP",
                    value: tableArray[i][index] + "%"
                }
            }
        }

        if (!valueAvailable) {
            var b2aValue = {
                label: "Tax On Import Less Subsidies - % of GDP",
                value: "N/A"
            }
        }

        return b2aValue
    };

    // Method to return the selected country and all year's data for data set ref b2a
    this.b2aAll = function () {
        var tableArray = this.b2aData.getArray();
        var selectedRow = [];
        
        for (var i = 1; i < tableArray.length; i++) {
            if (tableArray[i][0] == country) {
                for (var j = 1; j < tableArray[j].length; j++) {
                    if (tableArray[i][j] != ":") {
                        selectedRow.push({
                            id: country,
                            year: tableArray[0][j],
                            value: tableArray[i][j]
                        })
                    }
                }
            }
        }

        return selectedRow
    };

    // Method to return the selected country and year's repsective data for data set ref b2b
    this.b2b = function () {
        var valueAvailable = false;
        var tableArray = this.b2bData.getArray();
        
        for (var i = 0; i < tableArray.length; i++) {
            if (tableArray[i][0] == country && tableArray[i][index] != ":") {
                valueAvailable = true;
                var b2bValue = {
                    label: "Tax On Import Less Subsidies - Million Euro",
                    value: parseFloat(tableArray[i][index]).toLocaleString("en-US")
                }
            }
        }

        if (!valueAvailable) {
            var b2bValue = {
                label: "Tax On Import Less Subsidies - Million Euro",
                value: "N/A"
            }
        }

        return b2bValue
    };

    // Method to return the selected country and all year's data for data set ref b2b
    this.b2bAll = function () {
        var tableArray = this.b2bData.getArray();
        var selectedRow = [];
        
        for (var i = 1; i < tableArray.length; i++) {
            if (tableArray[i][0] == country) {
                for (var j = 1; j < tableArray[j].length; j++) {
                    if (tableArray[i][j] != ":") {
                        selectedRow.push({
                            id: country,
                            year: tableArray[0][j],
                            value: tableArray[i][j]
                        })
                    }
                }
            }
        }

        return selectedRow
    };

    // Method to return the selected country and year's repsective data for data set ref b3a
    this.b3a = function () {
        var valueAvailable = false;
        var tableArray = this.b3aData.getArray();
        
        for (var i = 0; i < tableArray.length; i++) {
            if (tableArray[i][0] == country && tableArray[i][index] != ":") {
                valueAvailable = true;
                var b3aValue = {
                    label: "Good Services Imports - Million Euro",
                    value: parseFloat(tableArray[i][index]).toLocaleString("en-US")
                }
            }
        }

        if (!valueAvailable) {
            var b3aValue = {
                label: "Good Services Imports - Million Euro",
                value: "N/A"
            }
        }
        return b3aValue
    };

    // Method to return the selected country and all year's data for data set ref b3a
    this.b3aAll = function () {
        var tableArray = this.b3aData.getArray();
        var selectedRow = [];
        
        for (var i = 1; i < tableArray.length; i++) {
            if (tableArray[i][0] == country) {
                for (var j = 1; j < tableArray[j].length; j++) {
                    if (tableArray[i][j] != ":") {
                        selectedRow.push({
                            id: country,
                            year: tableArray[0][j],
                            value: tableArray[i][j]
                        })
                    }
                }
            }
        }

        return selectedRow
    };

    // Method to return the selected country and year's repsective data for data set ref b3b
    this.b3b = function () {
        var valueAvailable = false;
        var tableArray = this.b3bData.getArray();

        for (var i = 0; i < tableArray.length; i++) {
            if (tableArray[i][0] == country && tableArray[i][index] != ":") {
                valueAvailable = true;
                var b3bValue = {
                    label: "Good Services Exports - Million Euro",
                    value: parseFloat(tableArray[i][index]).toLocaleString("en-US")
                }
            }
        }

        if (!valueAvailable) {
            var b3bValue = {
                label: "Good Services Exports - Million Euro",
                value: "N/A"
            }
        }
        return b3bValue
    };

    // Method to return the selected country and all year's data for data set ref b3b
    this.b3bAll = function () {
        var tableArray = this.b3bData.getArray();
        var selectedRow = [];
        
        for (var i = 1; i < tableArray.length; i++) {
            if (tableArray[i][0] == country) {
                for (var j = 1; j < tableArray[j].length; j++) {
                    if (tableArray[i][j] != ":") {
                        selectedRow.push({
                            id: country,
                            year: tableArray[0][j],
                            value: tableArray[i][j]
                        })
                    }
                }
            }
        }

        return selectedRow
    };

    // Method to return the selected country and year's repsective data for data set ref b5a
    this.b5a = function () {
        var valueAvailable = false;
        var tableArray = this.b5aData.getArray();
        
        for (var i = 0; i < tableArray.length; i++) {
            if (tableArray[i][0] == country && tableArray[i][index] != ":") {
                valueAvailable = true;
                var b5aValue = {
                    label: "Real GDP per Volume - % change",
                    value: tableArray[i][index] + "%"
                }
            }
        }

        if (!valueAvailable) {
            var b5aValue = {
                label: "Real GDP per Volume - % change",
                value: "N/A"
            }
        }
        return b5aValue
    }

    // Method to return the selected country and all year's data for data set ref b5a
    this.b5aAll = function () {
        var tableArray = this.b5aData.getArray();
        var selectedRow = [];
        
        for (var i = 1; i < tableArray.length; i++) {
            if (tableArray[i][0] == country) {
                for (var j = 1; j < tableArray[j].length; j++) {
                    if (tableArray[i][j] != ":") {
                        selectedRow.push({
                            id: country,
                            year: tableArray[0][j],
                            value: tableArray[i][j]
                        })
                    }
                }
            }
        }

        return selectedRow
    };

    // Method to return the selected country and year's repsective data for data set ref b6a
    this.b6a = function () {
        var valueAvailable = false;
        var tableArray = this.b6aData.getArray();
        
        for (var i = 0; i < tableArray.length; i++) {
            if (tableArray[i][0] == country && tableArray[i][index] != ":") {
                valueAvailable = true;
                var b6aValue = {
                    label: "Export of Goods Services - % GDP",
                    value: tableArray[i][index] + "%"
                }
            }
        }

        if (!valueAvailable) {
            var b6aValue = {
                label: "Export of Goods Services - % GDP",
                value: "N/A"
            }
        }

        return b6aValue
    };

    // Method to return the selected country and all year's data for data set ref b6a
    this.b6aAll = function () {
        var tableArray = this.b6aData.getArray();
        var selectedRow = [];
        
        for (var i = 1; i < tableArray.length; i++) {
            if (tableArray[i][0] == country) {
                for (var j = 1; j < tableArray[j].length; j++) {
                    if (tableArray[i][j] != ":") {
                        selectedRow.push({
                            id: country,
                            year: tableArray[0][j],
                            value: tableArray[i][j]
                        })
                    }
                }
            }
        }

        return selectedRow
    };

    // Method to return the selected country and year's repsective data for data set ref b7a
    this.b7a = function () {
        var valueAvailable = false;
        var tableArray = this.b7aData.getArray();
        
        for (var i = 0; i < tableArray.length; i++) {
            if (tableArray[i][0] == country && tableArray[i][index] != ":") {
                valueAvailable = true;
                var b7aValue = {
                    label: "Import of Goods Services - % GDP",
                    value: tableArray[i][index] + "%"
                }
            }
        }

        if (!valueAvailable) {
            var b7aValue = {
                label: "Import of Goods Services - % GDP",
                value: "N/A"
            }
        }

        return b7aValue
    };

    // Method to return the selected country and all year's data for data set ref b7a
    this.b7aAll = function () {
        var tableArray = this.b7aData.getArray();
        var selectedRow = [];
        
        for (var i = 1; i < tableArray.length; i++) {
            if (tableArray[i][0] == country) {
                for (var j = 1; j < tableArray[j].length; j++) {
                    if (tableArray[i][j] != ":") {
                        selectedRow.push({
                            id: country,
                            year: tableArray[0][j],
                            value: tableArray[i][j]
                        })
                    }
                }
            }
        }

        return selectedRow
    };

    // Method to return the selected country and year's repsective data for data set ref b8a
    this.b8a = function () {
        var valueAvailable = false;
        var tableArray = this.b8aData.getArray();
        
        for (var i = 0; i < tableArray.length; i++) {
            if (tableArray[i][0] == country && tableArray[i][index] != ":") {
                valueAvailable = true;
                var b8aValue = {
                    label: "Export to Import Ratio",
                    value: "1 to " + tableArray[i][index]
                }
            }
        }

        if (!valueAvailable) {
            var b8aValue = {
                label: "Export to Import Ratio",
                value: "N/A"
            }
        }

        return b8aValue
    };

    // Method to return the selected country and all year's data for data set ref b8a
    this.b8aAll = function () {
        var tableArray = this.b8aData.getArray();
        var selectedRow = [];
        
        for (var i = 1; i < tableArray.length; i++) {
            if (tableArray[i][0] == country) {
                for (var j = 1; j < tableArray[j].length; j++) {
                    if (tableArray[i][j] != ":") {
                        selectedRow.push({
                            id: country,
                            year: tableArray[0][j],
                            value: tableArray[i][j]
                        })
                    }
                }
            }
        }

        return selectedRow
    };

    // Method to return the selected country and year's repsective data for data set ref b9a
    this.b9a = function () {
        var valueAvailable = false;
        var tableArray = this.b9aData.getArray();
        
        for (var i = 0; i < tableArray.length; i++) {
            if (tableArray[i][0] == country && tableArray[i][index] != ":") {
                valueAvailable = true;
                var b9aValue = {
                    label: "Real GDP per Capita - % Change",
                    value: tableArray[i][index] + "%"
                }
            }
        }

        if (!valueAvailable) {
            var b9aValue = {
                label: "Real GDP per Capita - % Change",
                value: "N/A"
            }
        }

        return b9aValue
    };

    // Method to return the selected country and all year's data for data set ref b9a
    this.b9aAll = function () {
        var tableArray = this.b9aData.getArray();
        var selectedRow = [];
        
        for (var i = 1; i < tableArray.length; i++) {
            if (tableArray[i][0] == country) {
                for (var j = 1; j < tableArray[j].length; j++) {
                    if (tableArray[i][j] != ":") {
                        selectedRow.push({
                            id: country,
                            year: tableArray[0][j],
                            value: tableArray[i][j]
                        })
                    }
                }
            }
        }

        return selectedRow
    };

    // Method to return the selected country and year's repsective data for data set ref b10a
    this.b10a = function () {
        var valueAvailable = false;
        var tableArray = this.b10aData.getArray();
        
        for (var i = 0; i < tableArray.length; i++) {
            if (tableArray[i][0] == country && tableArray[i][index] != ":") {
                valueAvailable = true;
                var b10aValue = {
                    label: "Nominal Labour Productivity - Index",
                    value: tableArray[i][index]
                }
            }
        }

        if (!valueAvailable) {
            var b10aValue = {
                label: "GDP Market Price - Million Euro, Current Price",
                value: "N/A"
            }
        }

        return b10aValue
    };

    // Method to return the selected country and all year's data for data set ref b10a
    this.b10aAll = function () {
        var tableArray = this.b10aData.getArray();
        var selectedRow = [];
        
        for (var i = 1; i < tableArray.length; i++) {
            if (tableArray[i][0] == country) {
                for (var j = 1; j < tableArray[j].length; j++) {
                    if (tableArray[i][j] != ":") {
                        selectedRow.push({
                            id: country,
                            year: tableArray[0][j],
                            value: tableArray[i][j]
                        })
                    }
                }
            }
        }

        return selectedRow
    };

    // Collate all of the country's national accounts for the selected year and return as a list
    this.yearProfile = function () {
        var profile = [this.b1a(), this.b1b(), this.b2a(), this.b2b(), this.b3a(), this.b3b(), this.b5a(), this.b7a(), this.b6a(), this.b8a(), this.b9a(), this.b10a()];

        return profile
    }

}
