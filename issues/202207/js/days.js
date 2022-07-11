$('.o-day').click(function (e) {
    let id = e.target.id;
    $(".o-day-span").removeClass("o-selected-item");
    $("#"+id+"-span").addClass("o-selected-item");
    $(".draw-block").hide();
    $("#"+id+"-content").show();
}) 

$('.o-menu').click(function (e) {
    let id = e.target.id;
    $(".o-menu-item").removeClass("o-selected-item");
    $("#span-"+id).addClass("o-selected-item");
    $(".contents-block").hide();
    $("#events-"+id).show();
}) 


$.getJSON("data/domains.json", function (domains) {
$.getJSON("data/predictions.json", function (data) {

    function getSexLabel(sex){
        if (sex=="male") {
            return "Masculino"
        } else if (sex=="female") {
            return "Femenino"
        } 
        return "Mixto"
    }

    function generateEventPrediction(even,sex){
        let text = '<div class="pred-block">';
        for(var i=1;i<=8;i++){
            let prediction = data.events[even].sex[sex].prediction[i];
            text+= '<div class="pred-item">';
            text+= '<p>';
            text+= '<span class="medal">'+i+'</span>';
            text+= '<span>'+'<img class="flag" src="images/flags-mini/'+domains[prediction.country.toLowerCase()]+'.png">'+'</span>';
            text+= '<span class="country">'+prediction.country+'</span>';
            text+= '<span class="athlete"> '+prediction.name+'</span>';
            text+= '</p>';
            text+= '</div>';
        }
        text+= '</div>';
        return text;
    }

    function generateEventResult(even,sex){
        let text = '<div class="pred-block">';
        if ("result" in data.events[even].sex[sex]) {
            for(var i=1;i<=8;i++){
                let prediction = data.events[even].sex[sex].result[i];
                text+= '<div class="pred-item">';
                text+= '<p>';
                text+= '<span class="medal">'+i+'</span>';
                text+= '<span>'+'<img class="flag" src="images/flags-mini/'+domains[prediction.country.toLowerCase()]+'.png">'+'</span>';
                text+= '<span class="country">'+prediction.country+'</span>';
                text+= '<span class="athlete"> '+prediction.name+'</span>';
                text+= '</p>';
                text+= '</div>';
            }
            text+= '</div>';
            return text;
        } 
        return '<div class="pred-block"><p class="no-result">Sin resultados aún</p></div>';
    }
    
    function generateEventBlock(even,sex){
        let title = data.events[even].name + " - " + getSexLabel(sex);
        let text = '<div id="'+even+'-'+sex+'" class="event-block">'
        text+= '<div class="event-title">'+title+"</div>";
        text+= '<div class="row">';
        text+= '<div id="event-pronostico" class="col-lg-6 col-md-6">';
        text+= '<div class="pronostico-title">Pronóstico</div>'
        text+= generateEventPrediction(even,sex);
        text+= '</div>';
        text+= '<div id="event-pronostico" class="col-lg-6 col-md-6">';
        text+= '<div class="pronostico-title">Resultado</div>'
        text+= generateEventResult(even,sex);
        text+= '</div>';
        text+= '</div>';
        text+= "</div>";
        return text;
    }

    for(let j=15;j<=24;j++){
        let did = "day-"+j;
        let content = '';
        let devents = data.schedule[did].events;
        for (var index = 0; index < devents.length; index++) {
            content+= generateEventBlock(devents[index].event,devents[index].sex);
        }
        $("#"+did+"-content>.pronosticos").html(content);
    }



    let all_content = "";
    let all_results = {};

    function setResultsForEvent(revent,rsex){
        for(var i=1;i<=8;i++){
            let rprediction = data.events[revent].sex[rsex].prediction[i];
            if (!(rprediction.country in all_results)) {
                all_results[rprediction.country] = [0,0,0,0,0,0,0,0];
                all_results[rprediction.country][i-1] = 1;
            } else {
                all_results[rprediction.country][i-1]+=1;
            }
        }
    }

    for(let j=0;j<data.ordering.length;j++){
        let a_event = data.ordering[j].event;
        let a_sex = data.ordering[j].sex;
        setResultsForEvent(a_event,a_sex);
        all_content+= generateEventBlock(a_event,a_sex);
    }

    $("#events-m-all>#all-events-block").html(all_content);
    let table_medal_content = "";
    let table_medal_points = "";

    for (const [key, value] of Object.entries(all_results)) {
        if ((value[0]!=0)||(value[1]!=0)||(value[2]!=0)) {
            table_medal_content += '<tr>';
            table_medal_content += '<td><img class="flag" src="images/flags-mini/'+domains[key.toLowerCase()]+'.png"> <span class="country">'+key+'</span></td>';
            table_medal_content += '<td>'+value[0]+'</td>';
            table_medal_content += '<td>'+value[1]+'</td>';
            table_medal_content += '<td>'+value[2]+'</td>';
            table_medal_content += '<td>'+(value[0]+value[1]+value[2])+'</td>';
            table_medal_content += '</tr>';
        }
        table_medal_points += '<tr>';
        table_medal_points += '<td><img class="flag" src="images/flags-mini/'+domains[key.toLowerCase()]+'.png"> <span class="country">'+key+'</span></td>';
        table_medal_points += '<td>'+value[0]+'</td>';
        table_medal_points += '<td>'+value[1]+'</td>';
        table_medal_points += '<td>'+value[2]+'</td>';
        table_medal_points += '<td>'+value[3]+'</td>';
        table_medal_points += '<td>'+value[4]+'</td>';
        table_medal_points += '<td>'+value[5]+'</td>';
        table_medal_points += '<td>'+value[6]+'</td>';
        table_medal_points += '<td>'+value[7]+'</td>';
        table_medal_points += '<td>'+(value[0]*8+value[1]*7+value[2]*6+value[3]*5+value[4]*4+value[5]*3+value[6]*2+value[7])+'</td>';
        table_medal_points += '</tr>';
    }

    $("#medal-table-body").html(table_medal_content);
    $("#points-table-body").html(table_medal_points);

    $('#medal-table-sorter').tablesorter({
        sortList: [[1,1], [2,1], [3,1]]
    });
    $('#points-table-sorter').tablesorter({
        sortList: [[9,1]]
    });

});
});
