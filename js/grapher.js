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

/*
function inputIsEmpty(input){
  if($.trim($("#"+input).val()).length === 0) {
    return true;
  }
  else{
    return false;
  }
}
*/

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
            max: max,
            min: min
          },
          scaleLabel: {
            display: true,
            labelString: xlabel,
            fontSize: 24
          }
        }],
        yAxes: [{
          ticks: {
            max: max,
            min: min
          },
          scaleLabel: {
            display: true,
            labelString: ylabel,
            fontSize: 30
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

function renderAlert(type){
  $("#alert-container").html("")
  if (type == "success"){
    $("#alert-container").append("<div class=\"alert alert-success alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>It worked!</strong> Your information has been plotted correctly.</div>");
    /*
    <div class=\"alert alert-success alert-dismissible fade in\" role=\"alert\">
      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">
        <span aria-hidden=\"true\">&times;</span>
      </button>
      <strong>It worked!</strong> Your information has been plotted correctly.
    </div>
    */
  }
  else if (failed == "zero"){
    $("#alert-container").append("<div class=\"alert alert-warning alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>Just letting you know,</strong> you have zero lines on your graph.</div>");
  }
  else if (failed == "input"){
    $("#alert-container").append("<div class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>Uh oh!</strong> One of your inputs is either unfilled, or broken!</div>");
  }
  else{
    $("#alert-container").append("<div class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>Uh oh!</strong> Something broke, but we don't know why. Contact the creators for help!</div>");
  }
}

function render(){
  failed = false;
  $("#graph-container").empty();
  $("#graph-container").append('<canvas class="img-fluid" id="graph"></canvas>');
  //if (inputIsEmpty("input-title") || inputIsEmpty("input-xaxis") || inputIsEmpty("input-yaxis") || inputIsEmpty("input-max") || inputIsEmpty("input-min")){
    if (Object.keys(lines).length > 0){
      createGraph(
        $("#input-title").val(),
        $("#input-xaxis").val(),
        $("#input-yaxis").val(),
        $("#input-max").val(),
        $("#input-min").val()
      );
    }
    else{
      failed = "zero";
    }
    /*
  }
  else{
    failed = "input"
  }
  */
  renderMenu();
  if (failed === false){
    renderAlert("success");
  }
  else{
    renderAlert(failed);
  }
}

$("#create-line-equation").click(function(){
  if (parseFloat($("#input-slope").val()) >= 0){
    createLine(
      $("#input-name-equation").val(),
      parseFloat($("#input-intercept").val()),
      $("#input-min").val(),
      $("#input-max").val(),
      $("#input-max").val()
    );
  }
  else{
    createLine(
      $("#input-name-equation").val(),
      $("#input-min").val(),
      $("#input-max").val(),
      parseFloat($("#input-intercept").val()),
      $("#input-min").val()
    );
  }
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

$("#options-line-toggle").click(function(){
  $("#options-line-container").toggle();
});

$("#options-graph-toggle").click(function(){
  $("#options-graph-container").toggle();
});
