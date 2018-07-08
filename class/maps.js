// https://developers.google.com/maps/documentation/javascript/combining-data#loading-the-state-boundary-polygons

var map;

// Initialise map settings
function initMap() {
    // Map settings
    var mapStyle = [{
        'stylers': [{
            'visibility': 'off'
            }]
        }, {
        'featureType': 'landscape',
        'elementType': 'geometry',
        'stylers': [{
            'visibility': 'on'
            }, {
            'color': '#fcfcfc'
            }]
        }, {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [{
            'visibility': 'on'
            }, {
            'color': '#bfd4ff'
            }]
        }];

    // Map Views
    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(34.131004, 17.796028),
        zoom: 2.5,
        mapTypeId: 'roadmap',
        disableDoubleClickZoom: true,
        disableDefaultUI: true,
        styles: mapStyle,
    });

    //Loads country polygons
    loadShapes();


    //Loads map styling and mouse event functions
    map.data.setStyle(styleFeature);
    map.data.addListener('mouseover', mouseInToRegion);
    map.data.addListener('mouseout', mouseOutOfRegion);
    map.data.addListener('click', mouseClickOnRegion);

    // Update and display the legend min and max
    document.getElementById('legendMin').textContent =
        currentData.minVal().toLocaleString();
    document.getElementById('legendMax').textContent =
        currentData.maxVal().toLocaleString();
}

// Function to load the country outlines
function loadShapes() {
    map.data.loadGeoJson("./Data/Coordinates/newWorldMap_withAFR.json", {
        idPropertyName: 'COUNTRY'
    });
}

// Function to style the country according to value
function styleFeature(feature) {
    // Name of the country
    var name = feature.getProperty('name_long');

    // Country data
    var object = currentData.objectVersion();

    // Color of smallest datum
    var low = [5, 69, 54]; 
    
    // Color of largest datum
    var high = [151, 83, 34]; 

    // Minimum value of current data set
    minVal = currentData.minVal();
    
    // Maximum value of current data set
    maxVal = currentData.maxVal();

    // Loop to get the selected value of country
    for (var i = 0; i < object.length; i++) {
        if (name == object[i].country) {
            feature.value = object[i].value
        }
    }

    // Delta represents where the value sits between the min and max
    var delta = (feature.value - minVal) / (maxVal - minVal);

    var color = [];
    // Loop to generate the color of the country
    for (var i = 0; i < 3; i++) {
        // Calculate an integer color based on the delta
        color[i] = (high[i] - low[i]) * delta + low[i];
    }

    // Determine whether to show this country or not
    var showRow = true;
    if (feature.value == null ||
        isNaN(feature.value)|| feature.value == 0){
        showRow = false;
    }

    // Outline of country and mouse event
    var outlineWeight = 0.5,
        zIndex = 1;
    if (feature.getProperty('state') === 'hover') {
        outlineWeight = zIndex = 2;
    }

    return {
        strokeWeight: outlineWeight,
        strokeColor: '#fff',
        zIndex: zIndex,
        fillColor: 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)',
        fillOpacity: 0.75,
        visible: showRow
    };
}

// Function when mouse is over country
function mouseInToRegion(e) {
    // set the hover state so the setStyle function can change the border
    e.feature.setProperty('state', 'hover');

    // Calculate the percentile the data is according to that year
    var percent = (e.feature.value - minVal) /
        (maxVal - minVal) * 100;

    // update labels on the map
    document.getElementById('data-label').textContent =
        e.feature.getProperty('name_long');
    document.getElementById('data-value').textContent =
        e.feature.value.toLocaleString();
    document.getElementById('data-box').style.display = 'block';
    document.getElementById('data-caret').style.display = 'block';
    document.getElementById('data-caret').style.paddingLeft = percent + '%';
    
}

// Function when mouse is not over country
function mouseOutOfRegion(e) {
    // Reset the hover state, returning the border to normal
    e.feature.setProperty('state', 'normal');
}

// Function when mouse is clicked on country
function mouseClickOnRegion(e) {
    // Clicked country
    var selectedCountry = e.feature.getProperty("name_long")
    
    // Store clicked country in local storage
    localStorage.setItem("selectedCountry", selectedCountry);
    
    // Open the country profile on same window
    window.open("clicked.html", "_self")
    
}
    