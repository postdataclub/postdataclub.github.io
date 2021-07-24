$('#top10').on("change",function(e){
    $(".o-medal-table").hide();
    let table = $('#top10').val();
    $('#'+table).show();
})

$.getJSON("data/predictions-ridge.json",function(data){
    console.log(data);
    let text = "";
    for(var i=0;i<data.length;i++){
        text +="<tr>";
        text += "<td>"+(i+1)+"</td>";
        text += "<td>"+"<img style='height:15px;width:30px;;'  src='../../assets/images/flags-mini/"+data[i].domain+".png'>"+" "+data[i].name+"</td>";
        text += "<td>"+data[i].gold+"</td>";
        text += "<td>"+data[i].silver+"</td>";
        text += "<td>"+data[i].bronze+"</td>";
        text += "<td>"+data[i].total+"</td>";
        text +="</tr>";
    }
    $('#b-ridge').html(text);
    $('#t-ridge').tablesorter();
});

$.getJSON("data/predictions-lasso.json",function(data){
    let text = "";
    for(var i=0;i<data.length;i++){
        text +="<tr>";
        text += "<td>"+(i+1)+"</td>";
        text += "<td>"+"<img style='height:15px;width:30px;;'  src='../../assets/images/flags-mini/"+data[i].domain+".png'>"+" "+data[i].name+"</td>";
        text += "<td>"+data[i].gold+"</td>";
        text += "<td>"+data[i].silver+"</td>";
        text += "<td>"+data[i].bronze+"</td>";
        text += "<td>"+data[i].total+"</td>";
        text +="</tr>";
    }
    $('#b-lasso').html(text);
    $('#t-lasso').tablesorter();
});

$.getJSON("data/predictions-elasticnet.json",function(data){
    let text = "";
    for(var i=0;i<data.length;i++){
        text +="<tr>";
        text += "<td>"+(i+1)+"</td>";
        text += "<td>"+"<img style='height:15px;width:30px;;'  src='../../assets/images/flags-mini/"+data[i].domain+".png'>"+" "+data[i].name+"</td>";
        text += "<td>"+data[i].gold+"</td>";
        text += "<td>"+data[i].silver+"</td>";
        text += "<td>"+data[i].bronze+"</td>";
        text += "<td>"+data[i].total+"</td>";
        text +="</tr>";
    }
    $('#b-elasticnet').html(text);
    $('#t-elasticnet').tablesorter();
});

$('#method').on("change",function(e){
    $(".pred-table").hide();
    let table = $('#method').val();
    $('#'+table).show();
})