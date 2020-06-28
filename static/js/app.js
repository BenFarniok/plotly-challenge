
function init(){
 d3.json('samples.json').then((data) => {
    // console.log(data)
    data.names.forEach((sample)=>{
      // console.log(sample)
      var dropdown = d3.select('#selDataset')
      dropdown.append("option").text(sample).property("value", sample)
    })
  
    id =  data.samples[0].id
    drawChart(id)
  })
  
}




function drawChart(id){
d3.json('samples.json').then((data) => {
 console.log(data)
    // Grab values from the response json object to build the plots
    var filter_list =data.samples.filter(d => d.id == id)
    console.log(filter_list)
    var values = filter_list[0].sample_values
    var labels = filter_list[0].otu_ids;
    var hovers = filter_list[0].otu_labels;
    // console.log(values)
    // console.log(labels)
    // console.log(hovers)
    // console.log(id)
    var trace1 ={
      type: "bar",
      x: values.slice(0,10),
      y: labels.slice(0,10).map(t =>`OTU ${t}`),
      orientation : "h",
      text: hovers.slice(0,10)
    }
    // console.log(trace1)
    var plotter = [trace1]
    layout = []

    Plotly.newPlot("bar", plotter)

    var trace2= { x: labels,
      y: values,
      mode: "markers",
      marker: {
        size: values,
        color: values
      },
      text: hovers,
      height: 200,
      width: 800
    }

    bubplotter= [trace2]
    Plotly.newPlot("bubble", bubplotter)

    // demo_table = d3.select('#sample-metadata')

    filter_meta = data.metadata.filter(d => d.id == id)
    id = filter_meta[0].id
    ethnic = filter_meta[0].ethnicity
    age = filter_meta[0].age
    gender = filter_meta[0].gender
    // location = filter_meta[0].location
    bbtype = filter_meta[0].bbtype
    wfreq = filter_meta[0].wfreq
    
    key_list = Object.keys(filter_meta[0])
    value_list = Object.values(filter_meta[0])
   
    
      
d3.select('#sample-metadata').append("p")
            .text(`${key_list[0]}: ${value_list[0]}`)
            .append("p")
            .text(`${key_list[1]}: ${value_list[1]}`)
            .append("p")
            .text(`${key_list[2]}: ${value_list[2]}`)
            .append("p")
            .text(`${key_list[3]}: ${value_list[3]}`)
            .append("p")
            .text(`${key_list[4]}: ${value_list[4]}`)
            .append("p")
            .text(`${key_list[5]}: ${value_list[5]}`)
            .append("p")
            .text(`${key_list[6]}: ${value_list[6]}`)
    
    
    // console.log(id)
    // console.log(location)
    // console.log(age)
      // d3.select("")
      // .text(` ${id}`)
      // .text(`Ethnicity: ${ethnic}`)
      // .append('p')
      // .text('')
      // .text("world")
      // .append("p")
      
      
      
    // console.log(demo_table)
  });
  }

  
function optionChanged(sample_id){
  console.log(sample_id)
 drawChart(sample_id)
}


  
init()
 
  // Promise Pending
//   const json = d3.json(data_file);
//   console.log("Data Promise: ", json);