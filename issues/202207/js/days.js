$('.o-day').click(function (e) {
    let id = e.target.id;
    $(".o-day-span").removeClass("d-selected-item");
    $("#"+id+"-span").addClass("d-selected-item");
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
            clas ="";
            if ("status" in prediction) {
                if (prediction.status==-1){
                    clas = "wrong";
                } else if (prediction.status==1){
                    clas = "good"
                } else {
                    clas = "excellent"
                }
            }
            text+= '<div class="pred-item">';
            text+= '<p class="'+clas+'">';
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
        let text = '<div id="pred-item-'+even+'-'+sex+'" class="pred-block">';
        if ("result" in data.events[even].sex[sex]) {
            for(var i=1;i<=8;i++){
                let prediction = data.events[even].sex[sex].result[i];
                text+= '<div id="pos-'+i+'" class="pred-item">';
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


    function generateEventAnalysis(even,sex){
        if ("analysis" in data.events[even].sex[sex]) {
            let analysis = data.events[even].sex[sex].analysis;
            let text = "<div id='analysis-"+even+"-"+sex+"' class='previa'>";
            text+= "<div class='previa-title'>El resultado</div><hr>"
            for(var i=0;i<analysis.length;i++){
                text+="<p>"+analysis[i]+"</p>";
            }
            text+="</div>";
            return text;
        }
        return "";
    }

    function generateEventPrevia(even,sex){
        if ("previa" in data.events[even].sex[sex]) {
            let previa = data.events[even].sex[sex].previa;
            let text = "<div id='previa-"+even+"-"+sex+"' class='previa'>";
            text+= "<div class='previa-title'>La previa</div><hr>"
            for(var i=0;i<previa.length;i++){
                text+="<p>"+previa[i]+"</p>";
            }
            text+="<hr></div>";
            return text;
        }
        return "";
    }
    
    function generateEventBlock(even,sex){
        let finished = "<span class='not-finished'>[pendiente]</span>";
        if ("result" in data.events[even].sex[sex]) {
            finished = "<span class='finished'>[concluido]</span>";
        }
        let title = data.events[even].name + " - " + getSexLabel(sex) + " "+finished;
        let text = '<div id="'+even+'-'+sex+'" class="event-block">'
        text+= '<div class="event-title">'+title+"</div>";
        text+= generateEventPrevia(even,sex);
        text+= '<div id="event-pronostico-"'+even+'-'+sex+' class="row">';
        text+= '<div  class="col-lg-6 col-md-6">';
        text+= '<div class="pronostico-title">Pronóstico</div>'
        text+= generateEventPrediction(even,sex);
        text+= '</div>';
        text+= '<div id="event-pronostico" class="col-lg-6 col-md-6">';
        text+= '<div class="pronostico-title">Resultado</div>'
        text+= generateEventResult(even,sex);
        text+= '</div>';
        text+= '</div>';
        text+= "</div>";
        if ("result" in data.events[even].sex[sex]) {
            text+= '<div class="leg"><span class="excellent">Pronóstico exacto</span> &nbsp;&nbsp; <span class="good">Pronóstico en otra posición</span> &nbsp;&nbsp; <span class="wrong">Pronóstico incorrecto</span></div>';
        }
        text+= generateEventAnalysis(even,sex);
        text+= "<hr class='ending-block'>";
        return text;
    }

    function setStatsBlock(order,title){
        let totalEvents = order.length;
        let predictedEvents = 0;
        let exactPositions = 0;
        let finalists = 0;
        let medalWinners = 0;
        let exactMedalWinners = 0;
        let champs = 0;

        for(let j=0;j<order.length;j++){
            let c_event = order[j].event;
            let c_sex = order[j].sex;
            if ("result" in data.events[c_event].sex[c_sex]) {
                predictedEvents++;
                for(var i=1;i<=8;i++){
                    let prediction = data.events[c_event].sex[c_sex].prediction[i];
                    if (prediction.status>0) {
                        finalists++;
                        if ((i>=1)&&(i<=3)) {
                            if (prediction.medal){
                                medalWinners++;
                                if (prediction.status==2) {        
                                    exactMedalWinners++;
                                }
                            }
                        }
                        if (prediction.status==2) {
                            exactPositions++;
                            if (i==1) {
                                champs++;
                            }
                        }
                    }
                }
            }  
        }

        text = '<div class="stats">';
        text+= '<div class="stats-item stats-item-title">'+title+'</div>';
        if (predictedEvents!=1) {
            text+= '<div class="stats-item">'+predictedEvents+' eventos concluidos de '+totalEvents+' ('+(predictedEvents*100/totalEvents).toFixed(2)+'%)</div>';
        } else {
            text+= '<div class="stats-item">'+predictedEvents+' evento concluido de '+totalEvents+' ('+(predictedEvents*100/totalEvents).toFixed(2)+'%)</div>';
        }
        if (predictedEvents!=0) {
            if (finalists!=1){
                text+= '<div class="stats-item">'+finalists+' finalistas pronosticados de '+(predictedEvents*8)+' ('+(finalists*100/(predictedEvents*8)).toFixed(2)+'%)</div>';
            } else {
                text+= '<div class="stats-item">'+finalists+' finalista pronosticado de '+(predictedEvents*8)+' ('+(finalists*100/(predictedEvents*8)).toFixed(2)+'%)</div>';
            }
            if (exactPositions!=1) {
                text+= '<div class="stats-item">'+exactPositions+' finalistas pronosticados en su posición de '+(predictedEvents*8)+' ('+(exactPositions*100/(predictedEvents*8)).toFixed(2)+'%)</div>';
            } else {
                text+= '<div class="stats-item">'+exactPositions+' finalista pronosticado en su posición de '+(predictedEvents*8)+' ('+(exactPositions*100/(predictedEvents*8)).toFixed(2)+'%)</div>';
            }
            if (medalWinners!=1) {
                text+= '<div class="stats-item">'+medalWinners+' medallistas pronosticados de '+(predictedEvents*3)+' ('+(medalWinners*100/(predictedEvents*3)).toFixed(2)+'%)</div>';
            } else {
                text+= '<div class="stats-item">'+medalWinners+' medallista pronosticado de '+(predictedEvents*3)+' ('+(medalWinners*100/(predictedEvents*3)).toFixed(2)+'%)</div>';
            }
            if  (exactMedalWinners!=1) {
                text+= '<div class="stats-item">'+exactMedalWinners+' medallistas pronosticados  en su posición de '+(predictedEvents*3)+' ('+(exactMedalWinners*100/(predictedEvents*3)).toFixed(2)+'%)</div>';
            } else {
                text+= '<div class="stats-item">'+exactMedalWinners+' medallista pronosticado  en su posición de '+(predictedEvents*3)+' ('+(exactMedalWinners*100/(predictedEvents*3)).toFixed(2)+'%)</div>';
            }
            if (champs!=1) {
                text+= '<div class="stats-item">'+champs+' campeones pronosticados de '+(predictedEvents)+' ('+(champs*100/(predictedEvents)).toFixed(2)+'%)</div>';
            } else {
                text+= '<div class="stats-item">'+champs+' campeón pronosticado de '+(predictedEvents)+' ('+(champs*100/(predictedEvents)).toFixed(2)+'%)</div>';
            }
            text+= '<div class="stats-item note">*finalistas se refiere a los 8 primeros lugares</div>';   
        }
        text+= '</div>';
        return text;
    }

    for(let j=15;j<=24;j++){
        let did = "day-"+j;
        let content = '';
        let devents = data.schedule[did].events;
        content+= setStatsBlock(devents,"Estadísticas del Día");
        for (var index = 0; index < devents.length; index++) {
            content+= generateEventBlock(devents[index].event,devents[index].sex);
        }
        $("#"+did+"-content>.pronosticos").html(content);
    }

    let all_content = setStatsBlock(data.ordering,"Estadísticas Generales");
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

    function setExtraordinaryThings(){
        $('#pred-item-atl_per-female>#pos-7>p>.medal').html(6);
        $('#pred-item-atl_110v-male>#pos-6>p>.medal').html("&nbsp;&nbsp;");
        $('#pred-item-atl_110v-male>#pos-7>p>.medal').html("&nbsp;&nbsp;");
        $('#pred-item-atl_110v-male>#pos-8>p>.medal').html("&nbsp;&nbsp;");
    }

    setExtraordinaryThings();

});
});
