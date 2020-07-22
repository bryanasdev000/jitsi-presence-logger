// Request
function getData(input, url) {
    console.log("Fui chamado por " + input + " !" + " e fiz a requisicao em " + url + " !")
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var table = document.getElementById("tableRegistros");
            var parentDiv = table.parentNode;
            if (request.response == null) {
                alert("Carga de dados vazia")
            }
            else {
                parentDiv.replaceChild(buildHtmlTable(request.response), table);
            }
        } else if (this.readyState == 4) {
            alert("Nenhum registro encontrado (Erro ou vazio)");
        }
    }
}

// JSON to table
// Thanks to: https://stackoverflow.com/a/21065846
// Builds the HTML Table out of myList json data from Ivy restful service.
function buildHtmlTable(arr) {
    var table = _table_.cloneNode(false),
        columns = addAllColumnHeaders(arr, table);
    for (var i = 0, maxi = arr.length; i < maxi; ++i) {
        var tr = _tr_.cloneNode(false);
        for (var j = 0, maxj = columns.length; j < maxj; ++j) {
            var td = _td_.cloneNode(false);
            cellValue = arr[i][columns[j]];
            td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    table.setAttribute("id", "tableRegistros");
    return table;
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records
function addAllColumnHeaders(arr, table) {
    var columnSet = [],
        tr = _tr_.cloneNode(false);
    for (var i = 0, l = arr.length; i < l; i++) {
        for (var key in arr[i]) {
            if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
                columnSet.push(key);
                var th = _th_.cloneNode(false);
                th.appendChild(document.createTextNode(key));
                tr.appendChild(th);
            }
        }
    }
    table.appendChild(tr);
    return columnSet;
}

// Vars
var _divOut_ = document.createElement('div');
var _divIn_ = document.createElement('div');
var _table_ = document.createElement('table'),
    _tr_ = document.createElement('tr'),
    _th_ = document.createElement('th'),
    _td_ = document.createElement('td');
_table_.className = "table table-bordered table-hover";
const baseURL = "http://localhost:8080"
var skipParam = "&skip=";
var skip = 0;
var sizeParam = "&size=";
var size = 20;
var endpoint =  "/v1/logs/last?";
var url = baseURL + endpoint + sizeParam + size + skipParam + skip;

// Window
window.addEventListener('load', function () {
    var curso = document.getElementById("cursoInput");
    var turma = document.getElementById("turmaInput");
    var email = document.getElementById("emailInput");
    var sala = document.getElementById("salaInput");
    var anterior = document.getElementById("anterior");
    var proximo = document.getElementById("proximo");
    // Main page
    getData("init", url);
    // Buttons
    anterior.addEventListener("click", function (event) {
        if (skip < 20) {
            skip = 0;
            alert("Pagina 1")
            url = baseURL + endpoint + sizeParam + size + skipParam + skip;
            getData(null, url);
        } else {
            skip -= 20;
            url = baseURL + endpoint + sizeParam + size + skipParam + skip;
            getData(null, url);
        }
    });
    proximo.addEventListener("click", function (event) {
        skip += 20;
        url = baseURL + endpoint + sizeParam + size + skipParam + skip;
        getData(null, url);
    });
    // Search
    curso.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            endpoint = "/v1/logs/course?id=" + curso.value;
            skip = 0;
            url = baseURL + endpoint + sizeParam + size + skipParam + skip;
            event.preventDefault();
            document.getElementById("headRegistros").innerHTML = "Registros encontrados";
            getData("curso", url);
        }
    });
    turma.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            endpoint = "/v1/logs/class?id=" + turma.value;
            skip = 0;
            url = baseURL + endpoint + sizeParam + size + skipParam + skip;
            event.preventDefault();
            document.getElementById("headRegistros").innerHTML = "Registros encontrados";
            getData("turma", url);
        }
    });
    email.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            endpoint = "/v1/logs/student?email=" + email.value;
            skip = 0;
            url = baseURL + endpoint + sizeParam + size + skipParam + skip;
            event.preventDefault();
            document.getElementById("headRegistros").innerHTML = "Registros encontrados";
            getData("email", url);
        }
    });
    sala.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            endpoint = "/v1/logs/room?id=" + sala.value;
            skip = 0;
            url = baseURL + endpoint + sizeParam + size + skipParam + skip;
            event.preventDefault();
            document.getElementById("headRegistros").innerHTML = "Registros encontrados";
            getData("sala", url);
        }
    });
});