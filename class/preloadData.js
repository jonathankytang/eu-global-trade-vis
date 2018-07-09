// Constructor Function to generate path name to pass into maps

function preloadData() {

    this.loaded = false;

    // Loading overview of all data file
    this.preload = function () {
        var self = this;
        this.data = loadTable(
            './Data/data-overview.csv', 'csv',
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

    // Method to return list of trade data file names
    this.fileType = function () {
        var tableArray = this.data.getArray();
        var listOfData = ["Select a dataset to visualise"];

        for (var i = 0; i < tableArray.length; i++) {
            // Find if data or info
            var fileType = tableArray[i][3];

            // Find the data set type
            var directoryType = tableArray[i][0];

            if (directoryType == "A") {
                if (fileType == "i") {
                    listOfData.push(tableArray[i][4] + " - " + tableArray[i][5]);
                }
            }
        }

        return listOfData
    };

    // Method to return list of end paths for data file names
    this.fileName = function () {
        var tableArray = this.data.getArray();
        var listOfFileNames = [""];
        var fileName = "";

        for (var i = 0; i < tableArray.length; i++) {

            // Find the data set type
            var directoryType = tableArray[i][0];

            // Find if data or info
            var fileType = tableArray[i][3];

            // Find trade flow for data set
            var fileUnit = tableArray[i][5];

            if (directoryType == "A") {
                if (fileType == "i") {
                    if (fileUnit == "Trade Balance") {

                        var start = tableArray[i][0] + tableArray[i][1] + tableArray[i][2] + tableArray[i][3];
                        var end = "Trade-balance";
                        listOfFileNames.push(start + "-" + end + ".csv");

                    } else {

                        var start = tableArray[i][0] + tableArray[i][1] + tableArray[i][2] + tableArray[i][3];
                        var end = tableArray[i][5];
                        listOfFileNames.push(start + "-" + end + ".csv");

                    }
                }
            }
        }


        return listOfFileNames
    };

    // Method to combine selected file name to path
    this.inputFile = function () {
        // Find user selected file and get index
        var selectFile = document.getElementById("file-select").selectedIndex;
        var fileNames = this.fileName();

        // Create path directory
        var path = "./Data/A-International-Trade-in-Goods/" + fileNames[selectFile];

        return path

    };
}
