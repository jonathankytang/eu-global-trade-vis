// Constructor function to store data set information for the map view

function tableInfo(path) {

    this.loaded = false;

    // Load data set
    this.preload = function () {
        var self = this;
        
        // Generate new path by adding another i to the reference
        var newPath = [path.slice(0, 42), "i", path.slice(42)].join("");

        this.data = loadTable(
            newPath, 'csv',
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

    // Method to return all information about data set
    this.info = function () {
        var allInfo = [];
        var infoArray = this.data.getArray();
        
        for (var i = 0; i < infoArray.length; i++) {
            
            // Text in column one
            var label = infoArray[i][0];
            
            // Text in column two
            var data = infoArray[i][1];
            
            // Create object
            var infoObject = {
                label: label,
                data: data
            };
            
            // Store object in infoArray
            allInfo.push(infoObject);
            
        }

        return allInfo
    };

}
