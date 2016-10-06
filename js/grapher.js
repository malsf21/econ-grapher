var lines = [];
var ids = 0;

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createGraph(title, xlabel, ylabel, min, max){
  var ctx = $("#graph");
  Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
      min: parseFloat(min),
      max: parseFloat(max)
      }
  })
  var scatterChart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: lines
    },
    options: {
      responsive: true,
      title:{
        display: true,
        text: title,
        fontSize: 30
      },
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom',
          ticks: {
            beginAtZero:true
          },
          scaleLabel: {
            display: true,
            labelString: xlabel
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero:true
          },
          scaleLabel: {
            display: true,
            labelString: ylabel
          }
        }]
      }
    }
  });
}

function createLine(title,x1,y1,x2,y2){
  colour = getRandomColor();
  lines.push({
    id: ids,
    label: title,
    data : [{
      x: x1,
      y: y1
    }, {
      x : x2,
      y : y2
    }],
    fill: false,
    backgroundColor: colour,
    borderColor: colour
  });
  ids += 1;
}

function deleteLine(id){
  temp = [];
  for (i = 0; i < Object.keys(lines).length; i++){
    if (lines[i]["id"] != id){
      temp.push(lines[i]);
    }
  }
  lines = temp;
  console.log(lines);
  render();
}

function resetLines(){
  lines = [];
  render();
}

function renderMenu(){
  $("#panel-container").empty();
  if (Object.keys(lines).length > 0){
    for (i = 0; i < Object.keys(lines).length; i++){
      $("#panel-container").append("<div class=\"card card-block\"><span class\"line-name\">" + lines[i]["label"] + "</span> <button class=\"btn btn-outline-danger pull-xs-right\" onclick=\"deleteLine(" + lines[i]["id"]+ ")\">Delete Line</button></div>");
      /*
        <div class=\"card card-block\">
          <span class\"line-name\">" + lines[i]["label"] + "</span> <button class=\"btn btn-outline-danger pull-xs-right\" onclick=\"deleteLine(" + lines[i]["id"]+ ")\">Delete Line</button>
        </div>
      */
    }
  }
  else{
    $("panel-container").append("Nothing to see here. Try adding a line!")
  }
}

function render(){
  $("#graph-container").empty();
  $("#graph-container").append('<canvas class="img-fluid" id="graph"></canvas>');
  if (Object.keys(lines).length > 0){
    createGraph(
      $("#input-title").val(),
      $("#input-xaxis").val(),
      $("#input-yaxis").val(),
      $("#input-max").val(),
      $("#input-min").val()
    );
  }
  renderMenu();
}

$("#create-line-equation").click(function(){
  createLine(
    $("#input-name-equation").val(),
    parseFloat($("#input-intercept").val()),
    0,
    0,
    parseFloat($("#input-intercept").val())/parseFloat($("#input-slope").val()) * -1
  );
  render();
});
$("#create-line-coordinate").click(function(){
  createLine(
    $("#input-name-coordinate").val(),
    $("#input-x1").val(),
    $("#input-y1").val(),
    $("#input-x2").val(),
    $("#input-y2").val()
  );
  render();
});
$("#create-graph").click(function(){
  render();
});
