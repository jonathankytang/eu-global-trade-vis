// Global variables
var currentData;
var currentInfo;

function preload() {
    // Get selected path from local storage
    filePath = localStorage.getItem("path");
    console.log(filePath.slice(38, 43));

    // Initiailse tableData class, pass through selected file path
    currentData = new tableData(filePath);
    
    // Load tables
    currentData.preload();

    // Initiailse tableInfo class, pass through selected file path
    currentInfo = new tableInfo(filePath);
    
    // Load tables
    currentInfo.preload()
}

function setup() {
    // Years on the data set
    var list = currentData.allYears();
    var option = '';
    
    // Add all years to drop down menu
    for (var i = 0; i < list.length; i++) {
        option += '<option value="' + list[i] + '">' + list[i] + '</option>';
    }
    $('#date-select').append(option);

    // Get file type
    var fileName = currentInfo.info()[0].data;
    
    // Get trade flow
    var tradeFlow = currentInfo.info()[2].data;
    
    // Append the filename and tradeflow to divs
    $('#file-name').append(fileName);
    $('#file-name2').append(tradeFlow);

    // Updates min and max in legend every time date select gets changed
    $("#date-select").change(function () {
        document.getElementById('legendMin').textContent = currentData.minVal().toLocaleString();
        document.getElementById('legendMax').textContent = currentData.maxVal().toLocaleString();
        map.data.setStyle(styleFeature);
    });

    // Get the user selected index from drop down menu
    var selectYear = 1 + document.getElementById("date-select").selectedIndex;
    
    // Store the selected year to local storage
    localStorage.setItem("yearIndex", selectYear);

    // Styling for buttton when mouse enters div
    var homeIcon = document.getElementById('home-icon');
    var infoIcon = document.getElementById('info-icon');
    $("#home-button").mouseenter(function () {
        homeIcon.style.color = "#FDCC2F";
    });

    $("#home-button").mouseleave(function () {
        homeIcon.style.color = "#000000";
    });

    $("#info-button").mouseenter(function () {
        infoIcon.style.color = "#FDCC2F";
    });

    $("#info-button").mouseleave(function () {
        infoIcon.style.color = "#000000";
    });

    // https://www.w3schools.com/howto/howto_css_modals.asp
    // Get the modal
    var modal = document.getElementById('myModal');

    var dataBox = document.getElementById('data-box');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // Add title to modal
    $(".modal-content").append("<h1> Data Information </h1>");

    // Add all the information to the modal
    for (var i = 0; i < currentInfo.info().length; i++) {
        var infoRow = currentInfo.info();
        $(".modal-content").append("<p><b>" + infoRow[i].label + "</b></p>");
        
        // If index is 6 or 7, add a tag otherwise use p tag
        if (i == 6 || i == 7) {
            $(".modal-content").append("<a href=" + infoRow[i].data + " id=info-box-link>" + infoRow[i].data + "</a>");
        } else {
            $(".modal-content").append("<p>" + infoRow[i].data + "</p>");
        }
    }
    
    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "flex";
        dataBox.style.display = "none";
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

    // Load API after sketch
    $("body").append("<script async defer src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBexINZGdkIT7Ly-HxXXTIL1gG1EVIo7q8&callback=initMap'></script>")

}
