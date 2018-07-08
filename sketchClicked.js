// Global variables
var currentCountry;
var currentCountryProfile;

function preload() {
    // Get selected path from local storage
    filePath = localStorage.getItem("path");

    // Get selected country from local storage
    selectedCountry = localStorage.getItem("selectedCountry");

    // Get selected year from local storage
    yearIndex = localStorage.getItem("yearIndex");

    // Initialise clickedView class, pass through selected file path, country and year
    currentCountry = new clickedView(filePath, selectedCountry, yearIndex);

    // Load tables
    currentCountry.preload();

    // Initialise countryProfile class, pass through selected country and year
    currentCountryProfile = new countryProfile(selectedCountry, yearIndex);

    // Load tables
    currentCountryProfile.preload();

}

function setup() {

    // Type of trade data
    var selectedTitle = currentCountry.graphTitle();

    // Respective country's value (as seen on the map)
    var selectedValue = currentCountry.countryValue().value;
    
    // Commas every hundred value to improve readability
    var parsedSelectedValue  = parseFloat(selectedValue).toLocaleString("en-US");

    // Units of the data
    var selectedUnits = currentCountry.valueUnits();

    // Flag code for selected country
    var flagCode = currentCountry.flagCode();

    // All countries available of selected data set
    var allCountries = currentCountry.allCountries();

    // All national accounts of selected country of that year
    var nationalAccounts = currentCountryProfile.yearProfile();

    // All the countries where national accounts are available for
    var nationalAccountsCountries = currentCountryProfile.countries();

    // Trade Flow of data
    var flow = currentCountry.tradeFlow();
    
    // http://flag-icon-css.lip.is/
    // Convert flagcode to lowercase
    flagCode = flagCode.toLowerCase();

    // Append the flag to the flag wrapper div
    $(".flag-wrapper").append('<div class="img-thumbnail flag flag-icon-background flag-icon-' + flagCode + '"></div>')

    // Stying of the back button when user's mouse is over it
    var backIcon = document.getElementById('back-icon');

    $("#back-button").mouseenter(function () {
        backIcon.style.color = "#FDCC2F";
    });

    $("#back-button").mouseleave(function () {
        backIcon.style.color = "#000000";
    });

    // Append the title of data set to page
    $("#graphTitle").append(selectedTitle);
    
    // Append the tradeflow of data set to page
    $("#TradeFlow").append(flow);

    // Append the selected country to page
    $("#countryName").append(selectedCountry.toUpperCase());

    // Append the country's respective value and units
    $("#countryVal").append(parsedSelectedValue + " (" + selectedUnits + ")");

    // Loop to append national accounts to div
    // Counter to keep track of how many countries have been passed
    var countryCount = 0;
    for (var i = 0; i < nationalAccountsCountries.length; i++) {
        if (selectedCountry == nationalAccountsCountries[i]) {
            for (var j = 0; j < nationalAccounts.length; j++) {
                // Appending each row of the accounts to the div
                $("#nationalAccountsTable").append("<tr><a href=" + 'insertmodalhere' + "id=natAccountLink><th>" + nationalAccounts[j].label + "</th><th>" + nationalAccounts[j].value + "</th></a></tr>");
            }
        } else {
            countryCount += 1;
        }
    }

    // If statement to check if loop counter has passed through all available accounts and countries and country has not been found, append a not available message on page
    if (countryCount == nationalAccountsCountries.length) {
        $("#nationalAccountsTable").append("<p>No national accounts available for this country</p>");
    }

    // Append buttons to refresh graph or clear selected countries to compare
    $("#checkbox-container").append('<div><input type="button" value="Refresh Graph" id="buttonParent"><input type="button" value="Clear" id="buttonClear"></div>')
    //    $("#checkbox-container").append('<div><input type="button" value="Clear" id="buttonClear"></div>')

    // Selected country checkbox pre-ticked on loading of page for 2+ worded countries
    var concatSelectedCountry = currentCountry.conCat();

    // Loop to make checkboxes and append checkbox container div
    for (var i = 0; i < allCountries.length; i++) {
        if (allCountries[i].indexOf(' ') >= 0) {
            var concatAllCountries = allCountries[i];
            
            // http://jsfiddle.net/ru6yvrce/1329/
            for (var j = 0; j < (allCountries[i].match(/ /g) || []).length; j++) {
                
                // Converts spaces in multiple worded countries to dashes for id name
                concatAllCountries = concatAllCountries.replace(" ", "-");
            }
            
            $("#checkbox-container").append("<li><input id=" + concatAllCountries + " type='checkbox' class='graphBoxes' name='box' value=" + i + ">" + allCountries[i] + "</li");
            
        } else {
            
            $("#checkbox-container").append("<li><input id=" + allCountries[i] + " type='checkbox' class='graphBoxes' name='box' value=" + i + ">" + "<p>" + allCountries[i] + "</p>" + "</li");
            
        }

    }

    // Selected country checkbox already ticked on page load
    $("#" + concatSelectedCountry).prop('checked', true);

    // Render graph
    graphRefresh();

    // Getting class name graph boxes
    var graphBoxes = document.getElementsByClassName('graphBoxes');
    var countries = [];

    $(document).ready(function () {
        // Reloading graph when button is clicked with new countries
        $("#buttonParent").click(function () {
            graphRefresh();
        });
        // Reloading graph when button is clicked with the selected country
        $("#buttonClear").click(function () {
            clearCheckboxes(allCountries, selectedCountry);
            $("#" + selectedCountry).prop('checked', true);
        });
    });
}

// http://bytutorial.com/blogs/jquery/jquery-get-selected-checkboxes
// Function to refresh the graph when checkboxes selected
function graphRefresh() {
    var checkArray = [];

    // Check which checkboxes have been tickd and push to checkArray
    $("#checkbox-container input:checked").each(function () {
        checkArray.push($(this).val());
    });

    // Join the array with commas
    var selected;
    selected = checkArray.join(',');

    // Check length of array and then pass the array through the graph render if condition met
    if (selected.length > 0) {
        render(checkArray);
    } else {
        alert("Please at least check one of the checkbox");
    }
}

// Function to clear all selected checkboxes apart from the original selected country
function clearCheckboxes(allCountries) {
    $(".graphBoxes").prop('checked', false);
    
    var country = currentCountry.conCat();
    
    $("#" + country).prop('checked', true);
    
    graphRefresh();
}

// Function to get data to pass through the graph render
function render(indexes) {
    // All the available countries of dataset
    var allCountries = currentCountry.allCountries();
    var countries = [];

    // Loop to get the selected countries from list of indexes
    for (var j = 0; j < allCountries.length; j++) {
        for (var i = 0; i < indexes.length; i++) {
            if (indexes[i] == j) {
                countries.push(allCountries[j]);
            }
        }
    };

    // Initialise data array
    var selectedData = [];
    
    // Get the data units
    var selectedUnits = currentCountry.valueUnits();

    // Loop to iterate through countries and push the data in correct format
    for (var i = 0; i < countries.length; i++) {
        var lineGraph = new graphData(currentCountry.tableData(), countries[i]);
        selectedData.push(lineGraph.allData());
    };

    // All the years available for the dataset
    var years = currentCountry.topRow();

    // Render the graph
    graph = new lineplotRender(selectedData, selectedUnits, years);

}
