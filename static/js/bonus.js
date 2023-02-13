// let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

let plotGUAGE = (filterVALUE) => {
  
    d3.json(url).then(dat => {
      let getCURRID = currID => currID.id == filterVALUE
      console.log(`getCURRID -->`, getCURRID)
      // metadata data
      let metaDATA =  dat.metadata.filter(getCURRID)[0]
      console.log(`ID: ${filterVALUE} metadata values -->`, metaDATA)

    // Guage Chart
    const guageCHART = () => {
        
     // Enter a speed between 0 and 180
        let level = metaDATA.wfreq;
        console.log(`ID: ${filterVALUE} metadata values -->`, level)
        // Trig to calc meter point
        let degrees = 9 - level, radius = .5;
        let radians = degrees * Math.PI / 9;
        let x = radius * Math.cos(radians);
        let y = radius * Math.sin(radians);
        console.log(`ID: ${filterVALUE} degree values -->`, degree)
        
        let mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        let path = mainPath.concat(pathX,space,pathY,pathEnd);

        let data = [{ type: 'scatter',
        x: [0], y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'speed',
            text: level,
            hoverinfo: 'text+name'},
        { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
        rotation: 90,
        text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1'],
        textinfo: 'text',
        textposition:'inside',	  
        marker: {colors:['rgba(7, 64, 0, 0.59)', 'rgba(14, 110, 2, 0.59)', 'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)', 'rgba(144, 181, 70, 0.50)', 'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)', 'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)', 'rgba(255, 255, 255, 0)']},
        labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
        }];

        let layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
            }],
        title: '<b>Belly Button Washing Frequency</b> <br>Scrubs per Week',
        height: 500,
        width: 500,
        xaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]}
        };

        Plotly.newPlot("gauge", data, layout, {showSendToCloud:true});
        }
        guageCHART()
    })
  }
  plotGUAGE("940")

