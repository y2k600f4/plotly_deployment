//Deliverable 1 (Bar Chart)
function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  // Initialize the dashboard
  init();
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
    
  }
  
  // Demographics Panel 
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
  }
     
  // 1. Create the buildCharts function.
  function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;  
    // 4. Create a variable that filters the samples array for the object with the desired sample number.
      var filteredSamples = samples.filter(i => i.id == sample);
     // var filteredSamples = samples.filter(sampleObj => sampleObj.id == sample); 
    //  5. Create a variable that holds the first sample in the array.
    var firstFilteredSample = filteredSamples[0];      
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = firstFilteredSample.otu_ids.slice(0, 10).reverse();
    var otu_labels = firstFilteredSample.otu_labels.slice(0, 10).reverse();
    var sample_values = firstFilteredSample.sample_values.slice(0, 10).reverse();
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yticks = otu_ids.map(i => "OTU " + i);
    //var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
  
    
    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: sample_values,
      y: yticks,
      type: "bar",
      orientation: "h",
      text: otu_labels
    }];
  
  
    // 9. Create the layout for the bar chart. 
    var barLayout = {title:"Top 10 bacteria cultures found"
      
      };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout)
       
    // Deliverable 2 (Bubble chart)

    //re-create variables that are not a slice of the top (used for bar chart)

    var otu_ids = firstFilteredSample.otu_ids
    var otu_labels = firstFilteredSample.otu_labels
    var sample_values = firstFilteredSample.sample_values

    
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels ,
        mode: 'markers',
        marker: {
          color: otu_ids,
          size: sample_values, 
          colorscale: 'Earth' 
        }
      }];
  
  
    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: {
        text: 'Bacteria Cultures Per Sample',
        font: {
          size: 24,
          color: "black"}},
      xaxis: {title: "OTU ID"},
      autoexpand: 'true'
    }
  
  
      // 3. Use Plotly to plot the data with the layout.
      Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
   
// Deleiverable 3 (gauge chart)

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var filteredMetaArray = data.metadata.filter(i => i.id == sample);


    // 2. Create a variable that holds the first sample in the metadata array.
    var firstFilteredMeta = filteredMetaArray[0];


    // 3. Create a variable that holds the washing frequency.
    var washFreq = parseFloat(firstFilteredMeta.wfreq);


    // 4. Create the trace for the gauge chart.
    var guageData = [{
      value: washFreq,
      type: "indicator",
      mode: "gauge+number",
      title: {
        text: "Belly Button Washing Frequency<br><sup>Scrubs per week</sup>", 
        font: {
          size: 24,
          color: "black"}},
      gauge: {
        axis: {range: [0, 10]},
        bar: {color: "black"},
        steps: [
          { range: [0, 2], color: "red" }, 
          { range: [2, 4], color: "orange" },
          { range: [4, 6], color: "yellow" },
          { range: [6, 8], color: "yellowgreen" },
          { range: [8, 10], color: "green" }
        ]}
      }];


    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
       width: 500, 
       height: 300, 
       margin: { t: 0, b: 0 }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', guageData, gaugeLayout); 
    
    });
  }
  