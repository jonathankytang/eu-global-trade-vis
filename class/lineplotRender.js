// Function to render the graph using d3.js and c3.js
// http://c3js.org/samples/simple_xy.html

// Pass through the data, units and all available years
function lineplotRender(info, unit, years) {
    var chart = c3.generate({
        data: {
            // data values as an array
            columns: info
        },
        axis: {
            x: {
                type: 'category',
                // Each label of the x-axis from the available years
                categories: years,
                label: {
                    text: "Years",
                    position: "center-middle"
                }
            },
            y: {
                label: {
                    // Units for y-axis of data set
                    text: unit,
                    position: "outer-middle"
                }
            }
        }
    });
    
    return chart
}