let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// let global metaDATA = ""

const createOPTIONS = () => {
  d3.json(url).then(dat => {
    let nameIDS = dat.names
    d3.select("#selDataset")
      .selectAll('option')
      .data(nameIDS).enter()
      .append('option')
        .text(d => d)
  })
}
createOPTIONS()


// default plots and demo info
let doPLOTSandDEMOinfo = (filterVALUE) => {
  console.log(`--current id being used is--> ${filterVALUE}`)

  d3.json(url).then(dat => {
    let getCURRID = currID => currID.id == filterVALUE
    console.log(`getCURRID -->`, getCURRID)
    // samples data 
    let sampleVALUES = dat.samples.filter(getCURRID)[0].sample_values
    let otuIDS = dat.samples.filter(getCURRID)[0].otu_ids
    let otuLABELS = dat.samples.filter(getCURRID)[0].otu_labels
    console.log(`ID: ${filterVALUE} sample values -->`, sampleVALUES)
    
    // metadata data
    let metaDATA =  dat.metadata.filter(getCURRID)[0]
    console.log(`ID: ${filterVALUE} metadata values -->`, metaDATA)
    
  // horizontal bar chart
  let hBARplot = () => {
    let trace = {
      x: sampleVALUES.slice(0,10).reverse(),
      y: otuIDS.slice(0,10).map(labelIDS => "OTU - "+labelIDS).reverse(),
      type: "bar",
      text: otuLABELS.slice(0,10).reverse(),
      orientation: "h"
    }
    let data = [trace];
    let layout = {
      xaxis: {otuLABELS, autorange: true},
      height: 600,
      width: 600,
    };
    Plotly.newPlot("bar", data, layout);
  }
  hBARplot()

// bubble chart
  let bubbleCHART = () => {
    let trace = {
      x: otuIDS,
      y: sampleVALUES,
      mode: 'markers',
      text: otuLABELS,
      type: 'scatter',
      marker :{
        color: otuIDS,
        size: sampleVALUES,
        symbol: 'circle',
        sizeref: 1.3
      }
    }
    let data = [trace];
    let layout = {
      showlegend: false,
      xaxis: {title: "OTU ID"},
      
    };
    Plotly.newPlot("bubble", data, layout);
  }
  bubbleCHART()

  // demographic info panel
  const demographicINFO = () => {
    console.log(metaDATA)
    let selectDIV = d3.select("#sample-metadata").text("")
    Object.entries(metaDATA).forEach(([key, value]) => {
      selectDIV.append("p").text(`${key}: ${value}`)
      });
    }
  demographicINFO()

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
        console.log(`ID: ${filterVALUE} degree values -->`, level)
        
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
doPLOTSandDEMOinfo("940")



// animate plots and demo info
let doPLOTSandDEMOinfoANIMATED = (filterVALUE) => {
  console.log(`--current id being used is--> ${filterVALUE}`)

  d3.json(url).then(dat => {
    let getCURRID = currID => currID.id == filterVALUE
    console.log(`getCURRID -->`, getCURRID)
    // samples data
    let sampleVALUES = dat.samples.filter(getCURRID)[0].sample_values
    let otuIDS = dat.samples.filter(getCURRID)[0].otu_ids
    let otuLABELS = dat.samples.filter(getCURRID)[0].otu_labels
    console.log(`ID: ${filterVALUE} sample values -->`, sampleVALUES)
    
    // metadata data
    let metaDATA =  dat.metadata.filter(getCURRID)[0]
    console.log(`ID: ${filterVALUE} metadata values -->`, metaDATA)
    

    // horizontal bar chart
  let hBARplot2 = () => {
    let trace = {
      x: sampleVALUES.slice(0,10).reverse(),
      y: otuIDS.slice(0,10).map(labelIDS => "OTU - "+labelIDS).reverse(),
      type: "bar",
      text: otuLABELS.slice(0,10).reverse(),
      orientation: "h"
    }
    
    let data = [trace];

    let layout = {
      // xaxis: otuLABELS,
      height: 600,
    };

    Plotly.animate("bar", {
      data,
      layout:{
        "xaxis": {
        "autorange": true
      }},
      traces: []
      },
    {
      transition: {
        duration: 500,
        easing: 'cubic-in-out'
      },
      frame: {
        duration: 500
      }
    });

  }
  hBARplot2()


  // bubble chart
  let bubbleCHART2 = () => {
    let trace = {
      x: otuIDS,
      y: sampleVALUES,
      mode: 'markers',
      text: otuLABELS,
      type: 'scatter',
      marker :{
        color: otuIDS,
        size: sampleVALUES,
        symbol: 'circle',
        sizeref: 1.3

      }
    }

    let data = [trace];

    let layout = {
      showlegend: false,
      xaxis: {title: "OTU ID"},
      
    };
    Plotly.animate("bubble", {data}, 
    {
      transition: {
        duration: 500,
        easing: 'cubic-in-out'
      },
      frame: {
        duration: 500
      }
    }
    );
  }
  bubbleCHART2()


  // Guage Chart
  const guageCHART2 = () => {
        
    // Enter a speed between 0 and 9
       let level = metaDATA.wfreq;
       console.log(`ID: ${filterVALUE} metadata values -->`, level)
       // Trig to calc meter point
       let degrees = 9 - level, radius = .5;
       let radians = degrees * Math.PI / 9;
       let x = radius * Math.cos(radians);
       let y = radius * Math.sin(radians);
       console.log(`ID: ${filterVALUE} degree values -->`, level)
       
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
       guageCHART2()

  })
}

let optionChanged = selectedID => {
  doPLOTSandDEMOinfoANIMATED(selectedID)
}
