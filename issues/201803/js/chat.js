var sampleConversation = [
    "Hola",
    "Mi nombre es Pepito",
    "¿Cuál es el significado de la vida?",
    "Adios"
];
$.getJSON("data/diputados.json",function(data){

function dict_criteria(a,b){
        return b['probabilidades']['ce']-a['probabilidades']['ce'];        
}

function dict_bcriteria(a,b){
        return b['probabilidades']['jce']-a['probabilidades']['jce'];        
}


var hName = undefined;

function getHumanName(){
    if (hName!=undefined) {
        return ' <span style="font-weight:bold">'+hName+'</span>';
    }
    return '';
}

function getDipDetail(c){
    var orgtext = '<span class="report-text bd">Organizaciones: </span>';
        for(var o in c['organizaciones']){
            orgtext = orgtext + c['organizaciones'][o].toUpperCase()+ ' ';
        }
    orgtext = orgtext + '</span>';
    var bio = '<br><div id="bio"><div id="bio-block" class="row"><div id="bio-photo" class="col-lg-3 col-md-3 col-xs-3 col-sm-3"><img  id="bio-image" src="images/'+c['list_id']+'.jpg"></div><div id="bio-data" class="col-lg-9 col-md-9 col-xs-9 col-sm-9"><div id="bio-name"><span class="bd viz-text">'+c['nombre']+'</span></div><div id="bio-age"><span class="report-text bd">Edad: </span>'+c['edad']+' años</div><div id="bio-class"><span class="report-text bd">Nivel escolar: </span>'+c['nivel']+'</div><div id="bio-job"><span class="report-text bd">Trabajo: </span>'+c['trabajo']+'</div><div id="bio-region"><span class="report-text bd">Elegido por: </span>'+c['municipio']+', '+c['provincia']+'</div><div id="bio-orgs">'+orgtext+'</div></div></div><hr id="bio-hr"><div id="bio-info"><span class="report-text bd">Biografía: </span>'+c['bio']+'</div></div>';
    return bio;
}

var dips = data['diputados'];
var dipsarray = [];
var dipsdict = {};
for(var i in dips){
    dipsarray.push(dips[i]);
    dipsdict[dips[i]['id']]=dips[i];
}
dipsarray.sort(dict_criteria);

function getCEPrediction(){
    var j = 0;
    var ce = [];
    for(var i=0;j<31;i++){
        var e = dipsarray[i];
        ce.push(e);
        if ((e['edad']<80)&&(e['id']!=48)){
            j++;
            //console.log(j+' '+e['nombre']); 
        }
    }
    return ce;
}

var cepred = getCEPrediction();


function getCEsex(value){
    var items = [];
    for(var i in cepred){
        var e = cepred[i]
        if ((e['sexo']==value)&&(e['edad']<80)&&(e['id']!=48)){
            items.push(e);
        }
    }
    var prob = 0;
    var total = 0;
    for(var i in dipsarray){
        if (dipsarray[i]['sexo']==value){
            total+=1;
            prob = prob + dipsarray[i]['probabilidades']['ce'];
        }
    }
    return {'items':items,'total':total,'prob':Math.round(prob/total*100)/100}
}

function getCEYoung(){
    var items = [];
    for(var i in cepred){
        var e = cepred[i]
        if ((e['edad']<36)&&(e['id']!=48)){
            items.push(e);
        }
    }
    var prob = 0;
    var total = 0;
    for(var i in dipsarray){
        if (dipsarray[i]['edad']<36){
            total+=1;
            prob = prob + dipsarray[i]['probabilidades']['ce'];
        }
    }
    return {'items':items,'total':total,'prob':Math.round(prob/total*100)/100}
}

function getCEMinister(){
    var items = [];
    for(var i in cepred){
        var e = cepred[i]
        if ((e['cm'].indexOf('ministro')!=-1)&&(e['edad']<80)&&(e['id']!=48)){
            items.push(e);
        }
    }
    var prob = 0;
    var total = 0;
    for(var i in dipsarray){
        if (dipsarray[i]['cm'].indexOf('ministro')!=-1){
            total+=1;
            prob = prob + dipsarray[i]['probabilidades']['ce'];
        }
    }
    return {'items':items,'total':total,'prob':Math.round(prob/total*100)/100}
}

function getCEGeneral(){
    var items = [];
    for(var i in cepred){
        var e = cepred[i]
        if ((e['otros'].indexOf('general')!=-1)&&(e['edad']<80)&&(e['id']!=48)){
            items.push(e);
        }
    }
    var prob = 0;
    var total = 0;
    for(var i in dipsarray){
        if (dipsarray[i]['otros'].indexOf('general')!=-1){
            total+=1;
            prob = prob + dipsarray[i]['probabilidades']['ce'];
        }
    }
    return {'items':items,'total':total,'prob':Math.round(prob/total*100)/100}
}

function getCEPCC(){
    var items = [];
    for(var i in cepred){
        var e = cepred[i]
        if ((e['organizaciones'].indexOf('pcc')!=-1)&&(e['edad']<80)&&(e['id']!=48)){
            items.push(e);
        }
    }
    var prob = 0;
    var total = 0;
    for(var i in dipsarray){
        if (dipsarray[i]['organizaciones'].indexOf('pcc')!=-1){
            total+=1;
            prob = prob + dipsarray[i]['probabilidades']['ce'];
        }
    }
    return {'items':items,'total':total,'prob':Math.round(prob/total*100)/100}
}

function getCENoPCC(){
    var items = [];
    for(var i in cepred){
        var e = cepred[i]
        if ((e['organizaciones'].indexOf('pcc')==-1)&&(e['edad']<80)&&(e['id']!=48)){
            items.push(e);
        }
    }
    var prob = 0;
    var total = 0;
    for(var i in dipsarray){
        if (dipsarray[i]['organizaciones'].indexOf('pcc')==-1){
            total+=1;
            prob = prob + dipsarray[i]['probabilidades']['ce'];
        }
    }
    return {'items':items,'total':total,'prob':Math.round(prob/total*100)/100}
}

function getCEPCCDir(value){
    var items = [];
    for(var i in cepred){
        var e = cepred[i]
        if ((e['pcc'].indexOf(value)!=-1)&&(e['edad']<80)&&(e['id']!=48)){
            items.push(e);
        }
    }
    var prob = 0;
    var total = 0;
    for(var i in dipsarray){
        if (dipsarray[i]['pcc'].indexOf(value)!=-1){
            total+=1;
            prob = prob + dipsarray[i]['probabilidades']['ce'];
        }
    }
    return {'items':items,'total':total,'prob':Math.round(prob/total*100)/100}
}

function getCERepeaters(){
    var items = [];
    for(var i in cepred){
        var e = cepred[i]
        if ((e['anpp'].indexOf('ce')!=-1)&&(e['edad']<80)&&(e['id']!=48)){
            items.push(e);
        }
    }
    var prob = 0;
    var total = 0;
    for(var i in dipsarray){
        if (dipsarray[i]['anpp'].indexOf('ce')!=-1){
            total+=1;
            prob = prob + dipsarray[i]['probabilidades']['ce'];
        }
    }
    return {'items':items,'total':total,'prob':Math.round(prob/total*100)/100}
}

//console.log(getCEPCCDir('bp'));

var fuse = new Fuse(dips, { keys: ["nombre-corto","nombre","nombre-alternativo"], include: ["score"] });


//console.log(fuse.search('raúl modesto castro ruz'));


var config = {
    botName: 'Amanda',
    inputs: '#humanInput',
    inputCapabilityListing: true,
    //engines: [ChatBot.Engines.duckduckgo()],
    engines: [],
    addChatEntryCallback: function(entryDiv, text, origin) {
        $('#chatBotCommandDescription').slideUp();
        entryDiv.delay(100).slideDown();
    }
};
ChatBot.init(config);
ChatBot.setBotName("Amanda");

ChatBot.addPattern("^hola$", "response", undefined, function (matches) {
    var texts = ['Hola, me llamo <span style="font-weight:bold">Amanda</span> y soy un chatbot. Para que aprendas cómo comunicarnos ahora mismo te pregunto <span class="viz-text">¿Cómo te llamas?</span> y tu respondes <span class="viz-text">"Me llamo"</span> y adicionas tu nombre.',
    'Buenas, mi nombre es <span style="font-weight:bold">Amanda</span> y soy una adivinadora virtual. Entender como conversar conmigo es sencillo. En este instante te hago la pregunta  <span class="viz-text">¿Cuál es tu nombre?</span> y tu respondes <span class="viz-text">"Mi nombre es"</span> y adicionas tu nombre.',
    'Qué tal, yo soy <span style="font-weight:bold">Amanda</span> y soy un chatbot muy simple. Conversar conmigo es simple. Ahora te pregunto  <span class="viz-text">¿Quién eres?</span> y tu respondes <span class="viz-text">"Yo soy"</span> y añades tu nombre.' 
    ]
    var index = Math.trunc(Math.random()*3);
    ChatBot.addChatEntry(texts[index],'bot');        
}, "Escribe 'Hola' para que te saluden de vuelta.");

ChatBot.addPattern("^adios$", "response", undefined, function (matches) {
    var texts = ['Hasta pronto. Fue un placer conversar contigo'+getHumanName()+'.',
    'Me encantó conversar contigo. Espero que hablemos pronto'+getHumanName()+'.',
    'Fue bueno que chatearamos. Hasta luego'+getHumanName()+'.' 
    ]
    var index = Math.trunc(Math.random()*3);
    
    ChatBot.addChatEntry(texts[index],'bot');        
}, "Escribe 'Adios' para finalizar la conversación.");

ChatBot.addPattern("(?:mi nombre es|yo soy|me llamo) (.*)", "response", undefined, function (matches) {
    ChatBot.setHumanName(matches[1]);
    hName = matches[1];
    var texts = ['Hola <span style="font-weight:bold">'+matches[1]+ '</span>, un placer conocerte. Puedes preguntarme sobre cuál creo que será el próximo Consejo de Estado. Si quieres saber que preguntas entiendo presiona el botón <span class="main-text">¿Qué puedo preguntar?</span>',
    '<span style="font-weight:bold">'+matches[1]+'</span> es un lindo nombre. Yo trato de adivinar a quienes integrarán el Consejo de Estado que se elegirá a partir del 18 de abril. En el botón <span class="main-text">¿Qué puedo preguntar?</span> puedes ver ejemplos de preguntas que comprendo.',
    'Un placer <span style="font-weight:bold">'+matches[1]+'</span>. Yo soy un chatbot que intenta predecir el próximo Consejo de Estado. Yo no comprendo todas las preguntas posibles, en el botón <span class="main-text">¿Qué puedo preguntar?</span> puedes ver algunas que si entiendo.' 
    ]
    var index = Math.trunc(Math.random()*3);
    ChatBot.addChatEntry(texts[index],'bot');
},"Escribe 'Mi nombre es [nombre]' o 'Yo soy [nombre]' y Amanda te llamará por tu nombre");

ChatBot.addPattern("(?:[\¿]?\s*)(?:cu[áa]l[ ]+es[ ]+el[ ]+significado[ ]+de[ ]+la[ ]+vida[ ]*)(?:[\?]?)", "response", "42", undefined, undefined);

ChatBot.addPattern("(?:[\¿]?[ ]*)(?:qui[ée]n[ ]+es[ ]+|qu[ée][ ]+sabes[ ]+de[ ]+)([ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñN\.\-]+)(?:[ ]*)(?:[\?]?)", "response", undefined, function (matches) {
    var result = fuse.search(matches[1]);
    console.log(matches[1]);
    var dname = undefined;
    var dip = undefined;
    if (result.length>0){
        dname = result[0]['item']['nombre'];
        dip = result[0]['item'];
    }
    if (dname==undefined){
        var texts = ['No pude encontrar ningún diputado con un nombre que se pareciese. Por favor, repite la pregunta <span class="viz-text">"Quién es"</span> y adiciona más detalles al nombre del diputado sobre el cuál quieres averiguar.',
        'No entendí bien el nombre. Por favor, escribe de nuevo la pregunta <span class="viz-text">"Quién es"</span> y pon más detalles en el nombre del diputado sobre el cuál quieres conocer.',
        'Busqué en los 605 diputados y no hallé ninguno con un nombre similar. Si puedes, repite de nuevo la pregunta <span class="viz-text">"Quién es"</span> y agrega más detalles en el nombre del diputado que buscas.' ]
        var index = Math.trunc(Math.random()*3);
        ChatBot.addChatEntry(texts[index],'bot');
    }
    else {
        var texts = ['Creo que hablas de <span style="font-weight:bold">'+dname+'</span>. Si no es este entonces repite la pregunta y se más específico en el nombre. De cualquier manera te muestro la información del diputado por el que creo preguntaste: <br>'+getDipDetail(dip),
        'Me parece que hablas de <span style="font-weight:bold">'+dname+'</span>. Pero me puedo equivocar, si lo hice has de nuevo la pregunta y agrega más detalles al nombre. Igual, estos son los datos del diputado que me parece que es: <br>'+getDipDetail(dip),
        'El diputado con el nombre más parecido que encuentro es <span style="font-weight:bold">'+dname+'</span>. Pero a lo mejor metí la pata y no preguntabas por ese, si es así pon más datos en el nombre y escribe de nuevo la misma pregunta. No obstante, ya que lo busqué, esta es la ficha del diputado que pienso que es: <br>'+getDipDetail(dip) ]
        var index = Math.trunc(Math.random()*3);
        ChatBot.addChatEntry(texts[index],'bot');
    }
},"Escribe 'Quién es [nombre]' y Amanda buscará sus datos");

ChatBot.addPattern("(?:[\¿]?[ ]*)(?:cu[áa]ntos[ ]+j[oó]venes[ ]*|qu[ée][ ]+j[oó]venes[ ]*|cu[áa]les[ ]+j[oó]venes[ ]*)(?:[ ]+(integrar[áa]n[]+el[ ]+|formar[áa]n[ ]+parte[ ]+del[ ]+)[ ]+(consejo[ ]+de[ ]+estado|ce|consejo)[ ]*)?(?:[\?]?)", "response", undefined, function (matches) {
    var e = getCEYoung();
    var p = e['items'];
    var ytext = 'jovenes';
    var nbeg = "Sus nombres son: <br>";
    if (p.length==1){ ytext = 'joven'; nbeg="Su nombre es: <br>"}
    var names = '';
    for(var i in p){
        names = names +'<span class="name-bot-item viz-text">'+ p[i]['nombre']+'</span><br>';
    }
    var total = e['total'];
    var prob = e['prob'];
    var cep = Math.round(p.length/31*100);
    var anp = Math.round(total/605*100);
    var texts = ["Pienso que lo más probable es que pertenezca al Consejo de Estado "+p.length+' '+ytext+'. '+nbeg+names+'Los jóvenes, en mi modelo de predicción, tienen una probabilidad de ser electos de ' +prob+'.' ,
    "Los jóvenes no tienen muchas probabilidades de integrar el Consejo de Estado. En esta elección pienso que tiene mayor posibilidad de integrarlo "+p.length+' '+ytext+'. '+nbeg+names+' Si se cumple esto, los jóvenes serían el '+cep+'% del Consejo mientras son el '+anp+'% del parlamento.'  ,
    "Creo que será electo al CE "+p.length+' '+ytext+'. '+nbeg+names]
    var index = Math.trunc(Math.random()*3);
    ChatBot.addChatEntry(texts[index],"bot");
},"Escribe 'Cuántos hombres (o mujeres o jóvenes o generales o ministros o miembros del PCC o miembros del CC del PCC o miembros del BP del PCC)' y Amanda te dirá cuantos de ellos piensa que integrarán el CE");

ChatBot.addPattern("(?:[\¿]?[ ]*)(?:cu[áa]ntas[ ]+(mujeres|f[ée]minas)[ ]*|qu[ée][ ]+(mujeres|f[ée]minas)[ ]*|cu[áa]les[ ]+(mujeres|f[ée]minas)[ ]*)(?:[ ]+(integrar[áa]n[]+el[ ]+|formar[áa]n[ ]+parte[ ]+del[ ]+)[ ]+(consejo[ ]+de[ ]+estado|ce|consejo)[ ]*)?(?:[\?]?)", "response", undefined, function (matches) {
    var e = getCEsex('f');
    var p = e['items'];
    var ytext = 'mujeres';
    var nbeg = "Sus nombres son: <br>";
    if (p.length==1){ ytext = 'mujer'; nbeg="Su nombre es: <br>"}
    var names = '';
    for(var i in p){
        names = names +'<span class="name-bot-item viz-text">'+ p[i]['nombre']+'</span><br>';
    }
    var total = e['total'];
    var prob = e['prob'];
    var totalm = getCEsex('m')['total'];
    var cep = Math.round(p.length/31*100);
    var anp = Math.round(total/605*100);
    var texts = ["Según el modelo de predicción que he desarrollado, "+p.length+' '+ytext+' integrarán el Consejo de Estado. '+nbeg+names+' Sin embargo, en el parlamento son '+total+' diputadas mientras que los diputados son '+totalm+'.',
    "Los datos que manejo me hacen creer que "+p.length+' '+ytext+' formarán parte del Consejo. '+nbeg+names+'Si esto se cumple entonces '+cep+'% del CE serán mujeres.',
    "Seguro me equivoco, pero creo que "+p.length+' '+ytext+' serán elegidas para formar parte del CE. '+nbeg+names+'Estimé que la probabilidad de que una mujer sea parte del Consejo es '+prob+'.']
    var index = Math.trunc(Math.random()*3);
    ChatBot.addChatEntry(texts[index],"bot");
},undefined);

ChatBot.addPattern("(?:[\¿]?[ ]*)(?:cu[áa]ntos[ ]+(hombres|varones)[ ]*|qu[ée][ ]+(hombres|varones)[ ]*|cu[áa]les[ ]+(hombres|varones)[ ]*)(?:[ ]+(integrar[áa]n[]+el[ ]+|formar[áa]n[ ]+parte[ ]+del[ ]+)[ ]+(consejo[ ]+de[ ]+estado|ce|consejo)[ ]*)?(?:[\?]?)", "response", undefined, function (matches) {
    var e = getCEsex('m');
    var p = e['items'];
    var ytext = 'hombres';
    var nbeg = "Sus nombres son: <br>";
    if (p.length==1){ ytext = 'hombre'; nbeg="Su nombre es: <br>"}
    var names = '';
    for(var i in p){
        names = names +'<span class="name-bot-item viz-text">'+ p[i]['nombre']+'</span><br>';
    }
    var total = e['total'];
    var prob = e['prob'];
    var probf = getCEsex('f')['prob'];
    var cep = Math.round(p.length/31*100);
    var anp = Math.round(total/605*100);
    var texts = ["Creo que "+p.length+' '+ytext+' integrarán el Consejo de Estado. En mi modelo, los diputados tienen una probabilidad media de pertenecer al CE de '+prob+' por '+probf+' las diputadas.',
    "Mirando la historia, y creyendo que la Generación Histórica confiará en su relevo, creo que "+p.length+' '+ytext+' formará parte del Consejo. Si esto se cumple entonces '+cep+'% del CE serán hombres.',
    "El patrón histórico es que los hombres sean mayoría en el CE y pienso que se mantendrá el mismo. Acorde al modelo que he construido, "+p.length+' '+ytext+' serán electos para formar parte del CE. Estimo que la probabilidad media de que un diputado sea parte del Consejo es '+prob+'.']
    var index = Math.trunc(Math.random()*3);
    ChatBot.addChatEntry(texts[index],"bot");
},undefined);

ChatBot.addPattern("(?:[\¿]?[ ]*)(?:cu[áa]ntos[ ]+(miembros[ ]+|militantes[ ]+)?del[ ]+(pcc|partido|partido|partido[ ]+comunista|partido[ ]+comunista[ ]+de[ ]+cuba)[ ]*|qu[ée][ ]+(miembros[ ]+|militantes[ ]+)del[ ]+(pcc|partido|partido|partido[ ]+comunista|partido[ ]+comunista[ ]+de[ ]+cuba)[ ]*|cu[áa]les[ ]+(miembros[ ]+|militantes[ ]+)?del[ ]+(pcc|partido|partido|partido[ ]+comunista|partido[ ]+comunista[ ]+de[ ]+cuba)[ ]*)(?:[ ]+(integrar[áa]n[]+el[ ]+|formar[áa]n[ ]+parte[ ]+del[ ]+)[ ]+(consejo[ ]+de[ ]+estado|ce|consejo)[ ]*)?(?:[\?]?)", "response", undefined, function (matches) {
    var e = getCEPCC();
    var p = e['items'];
    var ytext = 'miembros del PCC';
    var nbeg = "Sus nombres son: <br>";
    if (p.length==1){ ytext = 'miembro del PCC'; nbeg="Su nombre es: <br>"}
    var names = '';
    for(var i in p){
        names = names +'<span class="name-bot-item viz-text">'+ p[i]['nombre']+'</span><br>';
    }
    var total = e['total'];
    var prob = e['prob'];
    var probno = getCENoPCC()['prob'];
    var totalno = getCENoPCC()['total'];
    var cep = Math.round(p.length/31*100);
    var anp = Math.round(total/605*100);
    var texts = ["A nadie extrañará que "+p.length+' '+ytext+' integren el Consejo de Estado. O sea, todos los miembros. Ese fue el resultado del modelo de predicción que construí.',
    "La historia nos dice que los miembros del PCC también ejercen, luego de ser electos, su liderazgo en Consejo de Estado. Por eso creo que "+p.length+' '+ytext+' formarán parte del Consejo. Eso sería un pleno absoluto que no extrañaría pues '+anp+'% de los diputados militan en el PCC.',
    "Acorde al modelo por el que he calculado las probabilidades de pertenencia, "+p.length+' '+ytext+' serán electos para formar parte del Consejo de Estado. Es decir, todos los miembros. Sin embargo, un diputado que es miembro del PCC tiene una probabilidad media de pertenecer al CE de '+prob+' por '+probno+' de un diputado que no milita en el PCC.']
    var index = Math.trunc(Math.random()*3);
    ChatBot.addChatEntry(texts[index],"bot");
},undefined);

ChatBot.addPattern("(?:[\¿]?[ ]*)(?:cu[áa]ntos[ ]+(miembros[ ]+)?del[ ]+(cc|comit[ée][ ]+central)([ ]+(del)[ ]+(pcc|partido|partido|partido[ ]+comunista|partido[ ]+comunista[ ]+de[ ]+cuba))?[ ]*|qu[ée][ ]+(miembros[ ]+)del[ ]+(cc|comit[ée][ ]+central)([ ]+(del)[ ]+(pcc|partido|partido|partido[ ]+comunista|partido[ ]+comunista[ ]+de[ ]+cuba))?[ ]*|cu[áa]les[ ]+(miembros[ ]+)?del[ ]+(cc|comit[ée][ ]+central)([ ]+(del)[ ]+(pcc|partido|partido|partido[ ]+comunista|partido[ ]+comunista[ ]+de[ ]+cuba))?[ ]*)(?:[\?]?)", "response", undefined, function (matches) {
//(?:[\¿]?[ ]*)(?:cu[áa]ntos[ ]+(miembros[ ]+)?del[ ]+(cc|comit[ée][ ]+central)([ ]+(del)[ ]+(pcc|partido|partido|partido[ ]+comunista|partido[ ]+comunista[ ]+de[ ]+cuba))?[ ]*|qu[ée][ ]+(miembros[ ]+)del[ ]+(cc|comit[ée][ ]+central)([ ]+(del)[ ]+(pcc|partido|partido|partido[ ]+comunista|partido[ ]+comunista[ ]+de[ ]+cuba))?[ ]*|cu[áa]les[ ]+(miembros[ ]+)?del[ ]+(cc|comit[ée][ ]+central)([ ]+(del)[ ]+(pcc|partido|partido|partido[ ]+comunista|partido[ ]+comunista[ ]+de[ ]+cuba))?[ ]*)?(?:[\?]?)
    var e = getCEPCCDir('cc');
    var p = e['items'];
    var ytext = 'miembros del CC del PCC';
    var nbeg = "Sus nombres son: <br>";
    if (p.length==1){ ytext = 'miembro del CC del PCC'; nbeg="Su nombre es: <br>"}
    var names = '';
    for(var i in p){
        names = names +'<span class="name-bot-item viz-text">'+ p[i]['nombre']+'</span><br>';
    }
    var total = e['total'];
    var prob = e['prob'];
    var probno = getCEPCCDir('bp')['prob'];
    var totalno = getCEPCCDir('bp')['total'];
    var cep = Math.round(p.length/31*100);
    var anp = Math.round(total/605*100);
    var texts = ["Históricamente, más del 60% de los integrantes del CE han sido miembros del Comité Central del PCC. Creo que esa tendencia se mantendrá pues, según las probabilidades que he calculado, creo que "+p.length+' '+ytext+' integrarán el Consejo de Estado. Es un valor muy alto que no responde a lo que ha pasado últimamente, así que aquí mi modelo seguro tendrá muchos fallos.',
    "Creo que "+p.length+' '+ytext+' formarán parte del Consejo de Estado. Eso sería el '+cep+'% del CE mientras que solo el '+anp+'% de los diputados forman parte del Comité Central del PCC. No me sorprendería nada que mi modelo se equivoque con esta predicción.',
    "Mi modelo de predicción me dice que, "+p.length+' '+ytext+' serán electos para formar parte del Consejo de Estado.  De manera general, creo que un miembro del Comité Central del PCC tiene una probabilidad media de pertenecer al CE de '+prob+', sin embargo los miembros del Buró Político, con '+probno+', tienen una mayor probabilidad de pertenencia. El modelo es seguro que está equivocadp en estas cifras.']
    var index = Math.trunc(Math.random()*3);
    ChatBot.addChatEntry(texts[index],"bot");
},undefined);

ChatBot.addPattern("(?:[\¿]?[ ]*)(?:cu[áa]ntos[ ]+(miembros[ ]+)?del[ ]+(bp|bur[óo][ ]+pol[íi]tico[ ])([ ]+(del)[ ]+(cc|comit[ée][ ]+central))?([ ]+(del)[ ]+(pcc|partido|partido|partido[ ]+comunista|partido[ ]+comunista[ ]+de[ ]+cuba))?[ ]*|qu[ée][ ]+(miembros[ ]+)del[ ]+(bp|bur[óo][ ]+pol[íi]tico[ ])([ ]+(del)[ ]+(cc|comit[ée][ ]+central))?([ ]+(del)[ ]+(pcc|partido|partido|partido[ ]+comunista|partido[ ]+comunista[ ]+de[ ]+cuba))?[ ]*|cu[áa]les[ ]+(miembros[ ]+)?del[ ]+(bp|bur[óo][ ]+pol[íi]tico[ ])([ ]+(del)[ ]+(cc|comit[ée][ ]+central))?([ ]+(del)[ ]+(pcc|partido|partido|partido[ ]+comunista|partido[ ]+comunista[ ]+de[ ]+cuba))?[ ]*)(?:[\?]?)", "response", undefined, function (matches) {
    var e = getCEPCCDir('bp');
    var p = e['items'];
    var ytext = 'miembros del BP del PCC';
    var nbeg = "Sus nombres son: <br>";
    if (p.length==1){ ytext = 'miembro del BP del PCC'; nbeg="Su nombre es: <br>"}
    var names = '';
    for(var i in p){
        names = names +'<span class="name-bot-item viz-text">'+ p[i]['nombre']+'</span><br>';
    }
    var total = e['total'];
    var prob = e['prob'];
    var cep = Math.round(p.length/31*100);
    var anp = Math.round(total/605*100);
    var texts = ["Pienso que "+p.length+' '+ytext+' integrarán el Consejo de Estado. '+nbeg+names+'Esto sería el '+cep+'% del Consejo de Estado. ',
    "Los calculos que he hecho, basados en la historia y en los datos que disponía, me dicen que "+p.length+' '+ytext+' formarán parte del Consejo de Estado. '+nbeg+names+'La probabilidad media, '+prob+', de que un miembro del Buró Político pertenezca al Consejo de Estado es alta.',
    "Mi predicción es que "+p.length+' '+ytext+' serán electos para formar parte del Consejo de Estado. '+nbeg+names+'Con esta predicción '+p.length+' de los 17 miembros del Buró Político, que son todos diputados, formarían parte del Consejo de Estado.']
    var index = Math.trunc(Math.random()*3);
    ChatBot.addChatEntry(texts[index],"bot");
},undefined);

ChatBot.addPattern("(?:[\¿]?[ ]*)(?:cu[áa]ntos[ ]+(generales)[ ]*|qu[ée][ ]+(generales)[ ]*|cu[áa]les[ ]+(generales)[ ]*)(?:[ ]+(integrar[áa]n[]+el[ ]+|formar[áa]n[ ]+parte[ ]+del[ ]+)[ ]+(consejo[ ]+de[ ]+estado|ce|consejo)[ ]*)?(?:[\?]?)", "response", undefined, function (matches) {
    var e = getCEGeneral();
    var p = e['items'];
    var ytext = 'Generales';
    var nbeg = "Sus nombres son: <br>";
    if (p.length==1){ ytext = 'General'; nbeg="Su nombre es: <br>"}
    var names = '';
    for(var i in p){
        names = names +'<span class="name-bot-item viz-text">'+ p[i]['nombre']+'</span><br>';
    }
    var total = e['total'];
    var prob = e['prob'];
    var cep = Math.round(p.length/31*100);
    var anp = Math.round(total/605*100);
    var texts = ["Según mis cálculos, "+p.length+' '+ytext+' integrarán el Consejo de Estado. '+nbeg+names+'Esto sería el '+cep+'% del Consejo de Estado. ',
    "Acorde al modelo probabilista que desarrollé, creo que "+p.length+' '+ytext+' formarán parte del Consejo de Estado. '+nbeg+names+'La probabilidad media, en mi modelo, de que un General forme parte del Consejo es '+prob,
    "Pienso que "+p.length+' '+ytext+' serán electos para formar parte del Consejo de Estado. '+nbeg+names+'Con esta predicción, '+p.length+' de los '+total+' Generales que son diputados formarían parte del Consejo de Estado.']
    var index = Math.trunc(Math.random()*3);
    ChatBot.addChatEntry(texts[index],"bot");
},undefined);

ChatBot.addPattern("(?:[\¿]?[ ]*)(?:cu[áa]ntos[ ]+(ministro[s]?)[ ]*|qu[ée][ ]+(ministro[s]?)[ ]*|cu[áa]les[ ]+(ministro[s]?)[ ]*)(?:[ ]+(integrar[áa]n[]+el[ ]+|formar[áa]n[ ]+parte[ ]+del[ ]+)[ ]+(consejo[ ]+de[ ]+estado|ce|consejo)[ ]*)?(?:[\?]?)", "response", undefined, function (matches) {
    var e = getCEMinister();
    var p = e['items'];
    var ytext = 'ministros';
    var nbeg = "Sus nombres son: <br>";
    if (p.length==1){ ytext = 'ministro'; nbeg="Su nombre es: <br>"}
    var names = '';
    for(var i in p){
        names = names +'<span class="name-bot-item viz-text">'+ p[i]['nombre']+'</span><br>';
    }
    var total = e['total'];
    var prob = e['prob'];
    var cep = Math.round(p.length/31*100);
    var anp = Math.round(total/605*100);
    var texts = ["No creo que muchos ministros formen parte del Consejo de Estado. La cifra que da mi modelo es que "+p.length+' '+ytext+' serán parte  del Consejo. '+nbeg+names+'Entonces el '+cep+'% del Consejo de Estado serían ministros.',
    p.length+' '+ytext+', según el algoritmo que desarrollé, formarán parte del Consejo de Estado. '+nbeg+names+'La probabilidad media que le asigna el algoritmo a un ministro para formar parte del Consejo es '+prob,
    "En mi ejercicio de adivinación, "+p.length+' '+ytext+' serían elegidos para integrar el Consejo de Estado. '+nbeg+names+'Acorde a esta predicción, '+p.length+' de los '+total+' ministros, que todos son diputados, formarían parte del Consejo de Estado.']
    var index = Math.trunc(Math.random()*3);
    ChatBot.addChatEntry(texts[index],"bot");
},undefined);

ChatBot.addPattern("(?:[\¿]?[ ]*)(?:(?:cu[áa]l(?:es)?)[ ]+(?:es|son)[ ]+(?:la(?:s)?)[ ]+(?:probabilidad(?:es)?)[ ]+(?:que[ ]+tiene[ ]+|de[ ]+)|qu[ée][ ]+(?:probabilidad(?:es)?)[ ]+tiene[ ]+)([ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñN\.\-]+)(?:[ ]*)(?:[\?]?)", "response", undefined, function (matches) {
    var result = fuse.search(matches[1]);
    var dname = undefined;
    var dip = undefined;
    var dpc = undefined;
    var dpj = undefined;
    if (result.length>0){
        dname = result[0]['item']['nombre'];
        dip = result[0]['item'];
        var dpc = Math.round(dip['probabilidades']['ce']*100)/100;
        var dpj = Math.round(dip['probabilidades']['jce']*100)/100;
    }
    var tadd='';
    if (dip['id']==48){
        tadd = '<span style="font-weight:bold">Lazo</span> no creo que sea electo al CE pues tradicionalmente los Presidentes de la ANPP anterior son candidatos a continuar en su cargo y a no integrar el Consejo de Estado. Aun así calculé sus probabilidades.'
    } else {
        if (dip['edad']>=80){
            tadd = 'Creo que <span style="font-weight:bold">'+dname+'</span> seguirá el mismo ejemplo de <span style="font-weight:bold">Raúl Castro</span>, quien no aceptará ser Presidente del CE y seguro tampoco formará parte del mismo. Aún así calculé sus probabilidades.';
        }
        else {
            if (dip['id']==2){
                tadd = '<span style="font-weight:bold">Raúl</span> afirmó que no aceptará el cargo del Presidente del Consejo de Estado aunque no dijo nada sobre su pertenencia a este Consejo, lo que creo que tampoco aceptará. No obstante, también calculé sus probabilidades.';
            }
        }
    }
    if (dname==undefined){
        var texts = ['No encontré ningún diputado con un nombre que se pareciese. Repite la pregunta <span class="viz-text">"Cuál es la probabilidad de"</span> y adiciona más detalles al nombre del diputado sobre el cuál quieres averiguar.',
        'No pude comprender bien el nombre. Si puedes, escribe de nuevo la pregunta <span class="viz-text">"Cuál es la probabilidad de"</span> y agrega otros detalles en el nombre del diputado sobre el cuál quieres saber.',
        'Busqué en todos los diputados y no me pareció que ninguno tuviera un nombre similar. Si puedes, reescribe la pregunta <span class="viz-text">"Cuál es la probabilidad de"</span> y agrega más información en el nombre del diputado que te interesa.' ]
        var index = Math.trunc(Math.random()*3);
        ChatBot.addChatEntry(texts[index],'bot');
    }
    else {
        var texts = ['Seguro hablas de <span style="font-weight:bold">'+dname+'</span>. Si no es este, entonces repite la pregunta y agrega más detalles en el nombre.<br>'+tadd+' <span style="font-weight:bold">'+dname+'</span> tiene una probabilidad de integrar el CE de '+dpc+' y, si fuera electo, su probabilidad de integrar la dirección del consejo sería '+dpj+'. Por supuesto, todo esto según mi predicción que lo más seguro es que esté errada.',
        'Me parece que quieres saber de <span style="font-weight:bold">'+dname+'</span>. Me pude equivocar de nombre, si lo hice reescribe la pregunta y pon más información en el nombre.<br>'+tadd+'  Pienso, según mi modelo, que <span style="font-weight:bold">'+dname+'</span> será electo al Consejo con una probabilidad de '+dpc+' mientras que, si lo eligen, estará en la dirección del Consejo con una probabilidad de '+dpj,
        'El diputado con el nombre que más se me parece es <span style="font-weight:bold">'+dname+'</span>. Tal vez me equivoqué y no preguntabas por ese, si es así escribe de nuevo la misma pregunta pero da mayor especificidad en el nombre.<br>'+tadd+' Esta es mi predicción sobre <span style="font-weight:bold">'+dname+'</span>: sería electo al Consejo de Estado con una probabilidad de '+dpc+' y si lo eligen su probabilidad de ser parte de la jefatura del Consejo es '+dpj+'. Claro, estos valores son resultado de mi adivinación, que es solo eso, una adivinación.' ]
        var index = Math.trunc(Math.random()*3);
        ChatBot.addChatEntry(texts[index],'bot');
    }
},"Escribe 'Qué probabilidad tiene [nombre]' y Amanda te dirá su probabilidad, según ella cree, de pertenecer al CE");

ChatBot.addPattern("(?:[\¿]?[ ]*)(?:Ra[uú]l[ ]+ser[áa][ ]+presidente|Ra[úu]l[ ]+ser[áa][ ]+miembro[ ]+del[ ]+(?:ce|consejo[ ]+de[ ]+estado|consejo))(?:[ ]*)(?:[\?]?)", "response", undefined, function (matches) {
    var texts = ['<span style="font-weight:bold">Raúl Castro</span> no será Presidente del Consejo de Estado. Lo anunció hace algún tiempo y lo reafirmó recientemente. Podría pertenecer al Consejo, pero no lo creo. Si decidiera pertenecer, es casi seguro que sería electo.',
    'No. No son mis palabras, son las que <span style="font-weight:bold">Raúl Castro</span> ha dicho varias veces. Lo que nunca ha dicho es que no pertenecerá al Consejo, pero tampoco creo que asuma eso como lo hizo en su ocasión <span style="font-weight:bold">Fidel</span>. Este elemento lo he tenido en cuenta en mi predicción.',
    'Cuando <span style="font-weight:bold">Fidel</span> anunció que no aceptaría el cargo de Presidente tampoco fue electo al Consejo de Estado. <span style="font-weight:bold">Raúl Castro</span>, quien ya dijo que no aceptará ser Presidente, creo que hará lo mismo. Esto está considerado a la hora de discriminar los datos que da como resultado mi modelo de predición.']
    var index = Math.trunc(Math.random()*3);
    ChatBot.addChatEntry(texts[index],"bot");
},"Escribe 'Raúl será miembro del CE' y Amanda te comentará lo que sabe");

ChatBot.addPattern("(?:[\¿]?[ ]*)(?:puedo[ ]+(pertenecer|ser[ ]+(electo|elegido))[ ]+al[ ]+(ce|consejo[ ]+de[ ]+estado|consejo))(?:[ ]*)(?:[\?]?)", "response", undefined, function (matches) {
    var texts = ['Si eres diputado si, sino no. Si eres diputado pregunta "Cuál es la probabilidad de" y agregas tu nombre, así te podré dar las probabilidades que creo que tienes de salir electo. Aunque, como sabes, esos números no son más que una adivinación.',
    'Solo los diputados pueden ser electos al Consejo de Estado. Si eres diputado y la Comisión de Candidaturas Nacional te propone es bastante seguro que la ANPP te elija. Para saber las probabilidades que yo creo que tienes, si eres diputado, escribe "Cuál es la probabilidad de" y adiciona tu nombre completo.',
    'Solo si eres diputado. Si lo fueses puedes averiguar cual es la probabilidad que te asigno de ser electo. Para eso escribe "Cuál es la probabilidad de" y luego pon tu nombre completo.']
    var index = Math.trunc(Math.random()*3);
    ChatBot.addChatEntry(texts[index],"bot");
},"Escribe 'Puedo pertenecer al CE' y Amanda responderá lo que piensa");

ChatBot.addPattern("(?:[\¿]?[ ]*)(?:qui[ée]nes[ ]+(integran[ ]+el|conforman[ ]+el|forman[ ]+(parte[ ]+del|el))[ ]+(ce|consejo[ ]+de[ ]+estado|consejo))(?:[ ]*)(?:[\?]?)", "response", undefined, function (matches) {
    var texts = ["El Consejo de Estado está integrado por el Presidente del CE, el primer Vicepresidente, cinco vicepresidentes, un secretario y otros 23 miembros. En total 31.",
    "Según la Constitución vigente, está integrado por el Presidente del CE, el primer Vicepresidente, cinco vicepresidentes, un secretario y otros 23 miembros. Lo que suma 31.",
    "Se integra por 31 diputados quienes son electos por la Asamblea Nacional en su sesión constituyente. Estos 31 serían el Presidente del CE, el primer Vicepresidente, cinco vicepresidentes, un secretario y 23 miembros."]
    var index = Math.trunc(Math.random()*3);
    ChatBot.addChatEntry(texts[index],"bot");
},"Escribe 'Quiénes integran el CE' y Amanda te dirá su predicción");

ChatBot.addPattern("(?:[\¿]?[ ]*)(?:(c[óo]mo[ ]+se[ ]+elige[ ]+el|qui[ée][ ]+elige[ ]+el|c[óo]mo[ ]+se[ ]+(con)?forma[ ]+el)[ ]+(ce|consejo[ ]+de[ ]+estado|consejo))(?:[ ]*)(?:[\?]?)", "response", undefined, function (matches) {
    var texts = ["La comisión de candidaturas nacional, luego de consultar con los diputados, lleva un proyecto de candidatura único que se aprueba por los diputados y que luego será elegido por estos. Esto es acorde a la <a href='http://www.acn.cu/images/2017/septiembre/LEY%20ELECTORAL.pdf'>Ley Electoral</a>.",
    "La comisión de candidaturas nacional, luego de consultar con los diputados, presenta un proyecto de candidatura único para que lo aprueben los diputados. Estos pueden modificar el proyecto y una vez que sea aprobado se procede a la elección. El proceso está regulado por la <a href='http://www.acn.cu/images/2017/septiembre/LEY%20ELECTORAL.pdf'>Ley Electoral</a>.",
    "Los diputados votan por un proyecto de candidatura único que es presentado por la Comisión de Candidaturas Nacional. Antes de la votación, los diputados pueden modificar el proyecto de candidatura. Todo ello está normado por la actual <a href='http://www.acn.cu/images/2017/septiembre/LEY%20ELECTORAL.pdf'>Ley Electoral</a>, vigente desde 1992."]
    var index = Math.trunc(Math.random()*3);
    ChatBot.addChatEntry(texts[index],"bot");
},"Escribe 'Cómo se elige el CE' y Amanda te comentará cómo");

ChatBot.addPattern("(?:[\¿]?[ ]*)(?:qui[ée]nes[ ]+|cu[aá]les)(son[ ]+los[ ]+candidato[s]?)(?:[ ]*)(?:[\?]?)", "response", undefined, function (matches) {
    var texts = ['Los candidatos al Consejo de Estado son todos los diputados. El proyecto de candidatura, que es único, lo define la Comisión de Candidaturas Nacional y luego puede ser modificado por la Asamblea Nacional. Para conocer a todos los diputados, o sea, a todos los posibles candidatos revisa la aplicación de datos <a href="explora-la-candidatura.html">Explora la candidatura al parlamento</a> que desarrollamos aquí en <a href="http://www.postdata.club">Postdata.club</a>',
    'Son todos los diputados. La Comisión de Candidaturas Nacional ha escuchado los criterios de todos los diputados y presentará un proyecto de candidatura único que luego la Asamblea Nacional podrá modificar. Si quieres conocer de todos los diputados revisa la aplicación de datos <a href="explora-la-candidatura.html">Explora la candidatura al parlamento</a>.',
    'Nadie más que los diputados pueden ser elegidos como miembros del Consejo de Estado. Cualquiera de los 605 diputados puede formar parte de este órgano, para ello debe proponerlo la Comisión de Candidaturas Nacional y luego aprobarlo y elegirlo la Asamblea Nacional. Para conocer a todos los diputados visita la aplicación de datos <a href="explora-la-candidatura.html">Explora la candidatura al parlamento</a>.']
    var index = Math.trunc(Math.random()*3);
    ChatBot.addChatEntry(texts[index],"bot");
},"Escribe 'Quiénes son los candidatos' y Amanda te dirá quienes son");

ChatBot.addPattern("(?:[\¿]?[ ]*)(?:(qui[ée]n|cu[áa]l)[ ]+ser[áa](([ ]+el)?)(([ ]+pr[óo]ximo)?)[ ]+presidente)(?:[ ]*)(?:[\?]?)", "response", undefined, function (matches) {
    var texts = ['Eso no pude descifrarlo a partir de los datos que tenía. Sin embargo, casi todos creen será <span style="font-weight:bold">Miguel Díaz-Canel</span>, que las probabilidades dicen que será miembro del CE y formará parte de la dirección de este.',
    'En la historia, bajo la actual constitución, Cuba solo ha tenido dos presidentes del Consejo de Estado, esto hace muy díficil calcular una probabilidad y por ello no lo hicimos. Las apuestas de todos se enfocan en <span style="font-weight:bold">Miguel Díaz-Canel</span> el cual, segun nuestro modelo, tiene una elevada posibilidad de pertenecer al Consejo y, además, de integrar la dirección del mismo.',
    'Desde 1976, cuando comenzó el actual modelo electoral, que luego fue modificado en parte, Cuba ha tenido solo dos Presidentes del Consejo de Estado. Esto no es suficiente para aprender de los datos históricos. En este caso es más sencillo seguir la idea de muchos, que el actual Vicepresidente Primero del Consejo de Estado, <span style="font-weight:bold">Miguel Díaz-Canel</span>, será electo como Presidente del CE. <span style="font-weight:bold">Díaz-Canel</span>, en nuestro modelo, tiene elevadas probabilidades de pertenecer al Consejo y también de integrar su dirección.']
    var index = Math.trunc(Math.random()*3);
    ChatBot.addChatEntry(texts[index],"bot");
},"Escribe 'Quién será el presidente' y Amanda te dirá lo que cree");

ChatBot.addPattern("(?:[\¿]?[ ]*)(?:cu[áa]l[ ]+ser[áa][ ]+el|predice[ ]+el|adivina[ ]+el)(([ ]+pr[óo]ximo)?)([ ]+(ce|consejo[ ]+de[ ]+estado[ ]+|consejo)[ ]*)(?:[\?]?)", "response", undefined, function (matches) {
    var text='Para predecir el próximo Consejo de Estado construí un modelo basado en la historia de los Consejos que le asignó una probabilidad de pertenencia al CE a cada diputado. Sin embargo, algunos diputados que tuvieron una alta probabilidad de pertenecer al CE no los consideré en mi predicción por distintas razones. Puedes preguntar por su probabilidad y allí te lo comento. Los diputados que no consideré son:<br>';
    var names = '';
    for(var i in cepred){
        var n = cepred[i]['nombre'];
        var e= cepred[i];
        if ((e['edad']>=80)||(e['id']==48)){
            names = names +'<span class="name-bot-item comment-text">'+ n+'</span><br>';
        }
    }
    text = text+names;
    text = text + 'Luego de ello, esta es mi predicción de Consejo de Estado. Yo solo pude calcular, acorde a mi modelo, las probabilidades de pertenencia al CE y también la de pertenecer a la dirección de este órgano. Esta es mi predicción:<br>';
    text = text +'Presidente:<br>';
    text = text + '<span class="name-bot-item viz-text">'+dipsdict[98]['nombre']+'</span><br>';
    text = text +'Primera Vicepresidente:<br>';
    text = text + '<span class="name-bot-item viz-text">'+dipsdict[100]['nombre']+'</span><br>';
    text = text +'Vicepresidentes:<br>';
    cepred.sort(dict_bcriteria);
    var vnames = '';
    var v=0;
    var vids=[];
    for(var i in cepred){
        var n = cepred[i]['nombre'];
        var e= cepred[i];
        if ((e['edad']<80)&&(e['id']!=48)&&(e['id']!=98)&&(e['id']!=100)&&(e['id']!=101)&&(v<5)){
            var dpc = Math.round(e['probabilidades']['ce']*100)/100;
            var dpj = Math.round(e['probabilidades']['jce']*100)/100;
            vnames = vnames +'<span class="name-bot-item viz-text">'+n+'</span><br>';
            v++;
            vids.push(e['id'])
        }
    }
    text = text+vnames;
    text = text +'Secretario:<br>';
    text = text + '<span class="name-bot-item viz-text">'+dipsdict[101]['nombre']+'</span><br>';
    var cnames = '';
    for(var i in cepred){
        var n = cepred[i]['nombre'];
        var e= cepred[i];
        if ((e['edad']<80)&&(e['id']!=48)&&(e['id']!=98)&&(e['id']!=100)&&(e['id']!=101)&&(vids.indexOf(e['id'])==-1)){
            var dpc = Math.round(e['probabilidades']['ce']*100)/100;
            var dpj = Math.round(e['probabilidades']['jce']*100)/100;
            cnames = cnames +'<span class="name-bot-item viz-text">'+n+'</span><br>';
        }
    }
    text = text +'Miembros:<br>';
    text = text+cnames;
    ChatBot.addChatEntry(text,"bot");
},"Escribe 'Cuál será el próximo CE' y Amanda te dirá su predicción");

ChatBot.addPattern("(?:[\¿]?[ ]*)(?:((?:por[ ]*qu[ée][ ]+te[ ]+llamas[ ]+)(?:Amanda|as[íi]))|(?:de[ ]+donde[ ]+sale[ ]+tu[ ]+nombre|cu[áa]l[ ]+es[ ]+el[ ]+origen[ ]+de[ ]+tu[ ]+nombre))(?:[ ]*)(?:[\?]?)", "response", undefined, function (matches) {
    var texts = ['Mi nombre es una alegoría al Cine Cubano. Mis padres me bautizaron <span style="font-weight:bold">Amanda</span> por el personaje de la película "Las Profecías de Amanda" el cuál protagonizó Daysi Granados y se basaba en la vida real de una clarividente nombrada Martha Estévez.',
    'Por la película "Las Profecías de Amanda" pues como el personaje principal desde que nací tengo el don de las profecías. Aunque no estoy segura que se me den muy bien.',
    'Cuando mis creadores pensaban un nombre no podían decidirse. Uno  de mis padres pensó llamarme, recordando a los clásicos griegos, Delfos o Cassandra, pero al final primó <span style="font-weight:bold">Amanda</span> por ser el nombre de un personaje, ya clásico, del cine cubano. Así también mi nombre es un reconocimiento al cine nacional.']
    var index = Math.trunc(Math.random()*3);
    ChatBot.addChatEntry(texts[index],"bot");
},undefined);

ChatBot.addPattern("(?:[\¿]?[ ]*)(?:qui[ée]nes[ ]+son[ ]+tus[ ]+(padres|papis|progenitores)|qui[ée]n[ ]+te[ ]+cre[óo])(?:[ ]*)(?:[\?]?)", "response", undefined, function (matches) {
    var texts = ['Es una cosa bien rara. Tengo tres padres: Yudivián Almeida, Saimi Reyes y Ernesto Guerra. La gente dice que me parezco a los tres.',
    'Soy el resultado de la modernidad. Tengo una mamá y dos papás que fueron quienes me crearon. Mi madre es Saimi Reyes y mis padres son Yudivián Almeida y Ernesto Guerra.',
    'Mis creadores son Yudivián Almeida, Saimi Reyes y Ernesto Guerra. No sé a cual de los tres me parezco más']
    var index = Math.trunc(Math.random()*3);
    ChatBot.addChatEntry(texts[index],"bot");
},undefined);


ChatBot.addPattern("(?:[\¿]?[ ]*)(?:qui[ée]n((es)?)[ ]+se[ ]+mantendr[áa]((n)?)|(cu[áa]les|qui[ée]n(es)?)[ ]+ser[áa](n)?[ ]+(reelecto(s)?|reelegido(s)+))(?:[ ]*)(?:[\?]?)", "response", undefined, function (matches) {
    var e = getCERepeaters();
    var p = e['items'];
    var ytext = 'miembros del anterior CE';
    var nbeg = "Sus nombres son: <br>";
    if (p.length==1){ ytext = 'miembro del anterior CE'; nbeg="Su nombre es: <br>"}
    var names = '';
    for(var i in p){
        names = names +'<span class="name-bot-item viz-text">'+ p[i]['nombre']+'</span><br>';
    }
    var total = e['total'];
    var prob = e['prob'];
    var cep = Math.round(p.length/31*100);
    var anp = Math.round(total/605*100);
    var texts = ["Creo que serán electos "+p.length+' '+ytext+'. '+nbeg+names+'Entonces, el '+cep+'% del Consejo de Estado serían diputados que pertenecieron al anterior Consejo.',
    p.length+' '+ytext+', según el algoritmo que desarrollé, volverán a integrar el Consejo. '+nbeg+names+'La probabilidad media que le asigna el modelo a que un miembro del anterior Consejo sea reelecto es '+prob,
    "Por mi modelo, "+p.length+' '+ytext+' serían reelegidos. '+nbeg+names+'Por esta predicción, '+p.length+' de los '+total+' miembros anteriores, que todos fueron electos como diputados, volverían a ser parte del Consejo.'];
    var index = Math.trunc(Math.random()*3);
    ChatBot.addChatEntry(texts[index],"bot");
},"Escribe 'Quién se mantendrá' y Amanda te dirá que miembros del CE anterior cree que serán reelectos");

ChatBot.addPattern("(.*)", "response",undefined, function (matches) {
    var texts = ['Disculpa, no entendí bien lo que quisiste expresar. Mi vocabulario es muy limitado. Si presionas el botón <span class="main-text">¿Qué puedo preguntar?</span> puedes ver algunas preguntas que si comprendo.',
    'Lo lamento, yo no comprendo todas las preguntas posibles. Mi vocabulario es muy pequeño. Presionando el botón <span class="main-text">¿Qué puedo preguntar?</span> encontrarás algunas preguntas que si entiendo.',
    'Recuerda que soy un chatbot muy simple y entiendo muy poco. Cuando presionas el botón <span class="main-text">¿Qué puedo preguntar?</span> puedes leer, y tomar de guía, algunas preguntas que si puedo entender.'];
    var index = Math.trunc(Math.random()*texts.length);
    ChatBot.addChatEntry(texts[index],"bot");
}, undefined); 



}); 
