$.getJSON("data/cc.json", function (cc) {
    var members = cc.integrantes;

    function findMember(id) {
        for (var i = 0; i < members.length; i++) {
            if (members[i].order == id) {
                return members[i];
            }
        }
        return null;
    }



    function filterBySex(key, items) {
        var nitems = [];
        if (key === "none") {
            return items.slice();
        }
        for (var i = 0; i < items.length; i++) {
            if (items[i].sexo === key) {
                nitems.push(items[i]);
            }
        }
        return nitems;
    }

    function filterBySector(key, items) {
        var nitems = [];
        if (key === "none") {
            return items.slice();
        }
        for (var i = 0; i < items.length; i++) {
            if (items[i].sector.indexOf(key) != -1) {
                nitems.push(items[i]);
            }
        }
        return nitems;
    }

    function filterByDir(key, items) {
        var nitems = [];
        if (key === "none") {
            return items.slice();
        }
        var bool = true;
        if (key === "dir-no") {
            bool = false;
        }
        for (var i = 0; i < items.length; i++) {
            if (items[i].directivo == bool) {
                nitems.push(items[i]);
            }
        }
        return nitems;
    }

    function filterByCM(key, items) {
        var nitems = [];
        if (key === "none") {
            return items.slice();
        }
        var bool = true;
        if (key === "cm-no") {
            bool = false;
        }
        for (var i = 0; i < items.length; i++) {
            if (items[i].cm == bool) {
                nitems.push(items[i]);
            }
        }
        return nitems;
    }

    function filterByANPP(key, items) {
        var nitems = [];
        if (key === "none") {
            return items.slice();
        }
        if (key === "ce") {
            for (var i = 0; i < items.length; i++) {
                if (items[i].ce) {
                    nitems.push(items[i]);
                }
            }
        } else {
            var bool = true;
            if (key === "anpp-no") {
                bool = false;
            }
            for (var i = 0; i < items.length; i++) {
                if (items[i].diputado === bool) {
                    nitems.push(items[i]);
                }
            }
        }
        return nitems;
    }

    function filterByCC(key, items) {
        var nitems = [];
        if (key === "none") {
            return items.slice();
        }
        if (key === "sec") {
            for (var i = 0; i < items.length; i++) {
                if (items[i].secretariado) {
                    nitems.push(items[i]);
                }
            }
        } else {
            if (key === 'bp') {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].bp) {
                        nitems.push(items[i]);
                    }
                }
            }
            else {
                if ((key === "bp-new") || (key == "bp-old")) {
                    if (key === "bp-new") {
                        for (var i = 0; i < items.length; i++) {
                            if ((items[i].bp) && (!items[i]['bp-previo'])) {
                                nitems.push(items[i]);
                            }
                        }
                    } else {
                        for (var i = 0; i < items.length; i++) {
                            if ((items[i].bp) && (items[i]['bp-previo'])) {
                                nitems.push(items[i]);
                            }
                        }
                    }
                } else {
                    if (key === "cc-new") {
                        for (var i = 0; i < items.length; i++) {
                            if (!items[i]['cc-previo']) {
                                nitems.push(items[i]);
                            }
                        }
                    } else {
                        for (var i = 0; i < items.length; i++) {
                            if (items[i]['cc-previo']) {
                                nitems.push(items[i]);
                            }
                        }
                    }
                }
            }
        }
        return nitems;
    }

    function filterByOtros(key, items) {
        var nitems = [];
        if (key === "none") {
            return items.slice();
        }
        if (key === "general") {
            for (var i = 0; i < items.length; i++) {
                if (items[i].general) {
                    nitems.push(items[i]);
                }
            }
        } else {
            if (key === "org") {
                for (var i = 0; i < items.length; i++) {
                    if (items[i]["dir-org-masas"]) {
                        nitems.push(items[i]);
                    }
                }
            }
        }
        return nitems;
    }

    function filter() {
        var sex = $('#sex').val();
        var persons = filterBySex(sex, members);
        var cc = $('#cc').val();
        persons = filterByCC(cc, persons);
        var anpp = $('#anpp').val();
        persons = filterByANPP(anpp, persons);
        var cm = $('#cm').val();
        persons = filterByCM(cm, persons);
        var anpp = $('#anpp').val();
        var dir = $('#dir').val();
        persons = filterByDir(dir, persons);
        var sector = $('#sector').val();
        persons = filterBySector(sector, persons);
        var otros = $('#otros').val();
        persons = filterByOtros(otros, persons);
        printItems(persons);
        printStats(persons);
    }

    $('.filter-item').on("change", function (e) {
        filter();
    });

    function printStats(persons) {
        var number = persons.length;
        var number_new = 0;
        var total = members.length;
        for (var i = 0; i < persons.length; i++) {
            if (!persons[i]["cc-previo"]) {
                number_new++;
            }
        }
        $("#pfilter").html(number);
        $("#ppercent").html((100 * number / total).toFixed(1));
        $('#ppie').html(number + '/' + total);
        $('#ppie').change();
        $("#pnfilter").html(number_new);
        $("#pnpercent").html((100 * number_new / number).toFixed(1));
        $('#pnpie').html(number_new + '/' + number);
        $('#pnpie').change();
    }

    function printItems(items) {
        var fragment = "";
        for (var i = 0; i < items.length; i++) {
            var border = "normal-border";
            if (!items[i]["cc-previo"]) {
                border = "new-border";
            }
            var text = "<span id='member-" + items[i].order + "' class='cursor member-item'><img class='circle-image " + border + "' src='images/" + items[i].pic + "' alt='" + items[i].nombre + "' title='" + items[i].nombre + "'></span>";
            fragment += text;
        }
        $('#explore-results').html(fragment);
        $('#explore-profile').fadeOut();
        $('#explore-content').slideDown();


        $('.member-item').click(function (e) {
            var id = e.currentTarget.id.substring(7);
            var item = findMember(id);
            $("#profile-image").attr("src", "images/" + item.pic);
            $("#profile-name").html(item.nombre);
            $("#profile-desc").html(item.descripcion);
            if (item.bp) {
                $('#profile-bp').show();
                if (item["bp-previo"]) {
                    $('#profile-bp').removeClass("new");
                    $('#profile-bp').addClass("normal");
                } else {
                    $('#profile-bp').removeClass("normal");
                    $('#profile-bp').addClass("new");
                }
            } else {
                $('#profile-bp').hide();
            }
            if (item.secretariado) {
                $('#profile-sec').show();
            } else {
                $('#profile-sec').hide();
            }
            if (item.diputado) {
                if (item.sexo === "f") {
                    $('#profile-dip').html("Diputada");
                } else {
                    $('#profile-dip').html("Diputado");
                }
                $('#profile-dip').show();
            } else {
                $('#profile-dip').hide();
            }
            if (item.ce) {
                $('#profile-ce').show();
            } else {
                $('#profile-ce').hide();
            }
            if (item.cm) {
                $('#profile-cm').show();
            } else {
                $('#profile-cm').hide();
            }

            $('.membership-sector').hide();
            for (var i = 0; i < item.sector.length; i++) {
                $('#' + item.sector[i]).show();
            }

            $('#explore-content').slideUp();
            $('#explore-profile').fadeIn();
        });
    }

    $("#delete-filters").click(function (e) {
        $('.filter-item').val("none");
        filter();
    });

    filter();

    function setSectorBar() {
        var names = ["Público", "PCC", "Ciencia/Educación", "Empresarial", "Militar", "Organizaciones", "Agricultura", "Salud", "Prensa/TV"];
        var name_sector = {
            "PCC": "partido",
            "Ciencia/Educación": "ciencia",
            "Público": "publico",
            "Organizaciones": "organizaciones",
            "Prensa/TV": "comunicacion",
            "Empresarial": "empresarial",
            "Militar": "militar",
            "Agricultura": "agricultura",
            "Salud": "salud"
        };
        var sectors_cc = {
            "partido": 0,
            "ciencia": 0,
            "publico": 0,
            "organizaciones": 0,
            "comunicacion": 0,
            "empresarial": 0,
            "militar": 0,
            "agricultura": 0,
            "salud": 0
        };
        var sectors_bp = {
            "partido": 0,
            "ciencia": 0,
            "publico": 0,
            "organizaciones": 0,
            "comunicacion": 0,
            "empresarial": 0,
            "militar": 0,
            "agricultura": 0,
            "salud": 0
        }
        for (var i = 0; i < members.length; i++) {
            for (var j = 0; j < members[i].sector.length; j++) {
                if (members[i].bp) {
                    sectors_bp[members[i].sector[j]] += 1;
                } else {
                    sectors_cc[members[i].sector[j]] += 1;
                }
            }
        }
        var nums_cc = [];
        var nums_bp = []
        for (var i = 0; i < names.length; i++) {
            nums_cc.push(sectors_cc[name_sector[names[i]]]);
            nums_bp.push(sectors_bp[name_sector[names[i]]]);
        }
        c3.generate({
            bindto: "#sector-bar",
            data: {
                x: "Sector",
                columns: [
                    ["Sector"].concat(names),
                    ["Miembros solo del CC"].concat(nums_cc),
                    ["Miembros del BP"].concat(nums_bp)
                ],
                type: 'bar',
                groups: [["Miembros solo del CC", "Miembros del BP"]]
            },
            axis: {
                rotated: true,
                x: {
                    label: 'Sector',
                    type: 'categorical',
                    tick: {
                        rotate: -30,
                        multiline: false
                    },
                    height: 55
                },
                y: {
                    label: 'No. de Miembros',
                    position: 'outer-middle',
                }
            }
        });
    }

    setSectorBar();

});

$('#close-profile').click(function (e) {
    $('#explore-profile').fadeOut();
    $('#explore-content').slideDown();
});

$.fn.peity.defaults.pie = {
    delimiter: null,
    height: null,
    radius: 20,
    width: null
}

$(".pie").peity("pie");

c3.generate({
    bindto: "#ce-pie",
    data: {
        columns: [
            ['Miembros del BP', 3],
            ['Miembros del CC', 8],
            ['No miembros del CC', 10]
        ],
        type: 'donut'
    },
    donut: {
        title: "21 miembros del CE",
    }
});

c3.generate({
    bindto: "#cm-pie",
    data: {
        columns: [
            ['Miembros del BP', 5],
            ['Miembros del CC', 10],
            ['No miembros del CC', 19]
        ],
        type: 'donut'
    },
    donut: {
        title: "34 miembros del CM",
    }
});