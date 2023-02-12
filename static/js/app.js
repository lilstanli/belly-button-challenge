let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

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
    let trace = {
      pass
      }
    }
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


// demographic info panel
const demographicINFO2 = () => {
  console.log(metaDATA)
  let selectDIV = d3.select("#sample-metadata").text("")
  Object.entries(metaDATA).forEach(([key, value]) => {
    selectDIV.append("p").text(`${key}: ${value}`)
    });
  }
  demographicINFO2()

  })
}

let optionChanged = selectedID => {
  doPLOTSandDEMOinfoANIMATED(selectedID)
}

