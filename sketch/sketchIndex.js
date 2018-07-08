// Global Variables
var dataOverview;
var filePath;
var fileName;
var mainIndex;

function preload() {
    // Initialise preloadData class
    dataOverview = new preloadData();
    
    // preload tables in class
    dataOverview.preload();
}

function setup() {
    
    // Individual file names for trade data
    var files = dataOverview.fileType();
    
    // Initialise options for drop down
    var option = '';

    // Loop to append file names to drop down
    for (var i = 0; i < files.length; i++) {
        option += '<option value="' + files[i] + '">' + files[i] + '</option>';
    }
    $('#file-select').append(option);

    // Updates min and max in legend every time #date-select gets changed
    $("#file-select").change(function () {
        var button = document.getElementById("index-button");
        
        if (document.getElementById("file-select").selectedIndex != 0){
            button.style.display = "unset";
        }
        else{
            button.style.display = "none";
        }
        
        // Selected filepath and fileName
        filePath = dataOverview.inputFile();
        mainIndex = document.getElementById("file-select").selectedIndex;
        fileName = dataOverview.fileType()[mainIndex];
        
        // Storing the filename and filepath in the browser
        localStorage.setItem("name", fileName);
        localStorage.setItem("path", filePath);
    });

    // Button background styling when mouse over event
    var division = document.getElementById("index-button");
    var text = document.getElementById("main-button");
    
    $("#index-button").mouseenter(function () {
        division.style.background = "#063796";
        text.style.color = "#FDCC2F";
    });
    
    $("#index-button").mouseleave(function () {
        text.style.color = "#063796";
        division.style.background = "#FFFFFF";
    });
    
    // Get the modal id
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
