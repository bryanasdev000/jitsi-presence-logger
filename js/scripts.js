// TODO Return error on table if getData == error
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
            parentDiv.replaceChild(buildHtmlTable(request.response), table);
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

var _divOut_ = document.createElement('div');
var _divIn_ = document.createElement('div');
var _table_ = document.createElement('table'),
    _tr_ = document.createElement('tr'),
    _th_ = document.createElement('th'),
    _td_ = document.createElement('td');
_table_.className = "table table-bordered table-hover";
const baseURL = "http://localhost:8080"
var skip = 0;
var size = 20;
var endpoint = baseURL + "/v1/logs?last=1&size=" + size + "&skip=" + skip;

window.addEventListener('load', function () {
    // TODO input sanitizer
    var curso = document.getElementById("cursoInput");
    var turma = document.getElementById("turmaInput");
    var aluno = document.getElementById("alunoInput");
    var aula = document.getElementById("aulaInput");
    var anterior = document.getElementById("anterior");
    var proximo = document.getElementById("proximo");
    // Main page
    getData("init", endpoint);
    // Buttons
    anterior.addEventListener("click", function (event) {
        if (skip < 0) {
            skip = 0;
            getData(null, endpoint);
            console.log(endpoint);
        } else {
            skip -= 20;
            getData(null, endpoint);
            console.log(endpoint);
        }
    });
    proximo.addEventListener("click", function (event) {
        skip += 20;
        getData(null, endpoint);
        console.log(skip);
    });
    // Search
    // TODO Return last logs if input equals ""
    // TODO Format datetime
    // TODO Stop when arr null
    curso.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            endpoint = baseURL + "/v1/logs?courseid=" + curso.value + "&size=" + size + "&skip=" + skip;
            console.log(endpoint);
            event.preventDefault();
            document.getElementById("headRegistros").innerHTML = "Registros encontrados";
            getData("curso", endpoint);
        }
    });
    turma.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            endpoint = baseURL + "/v1/logs?classid=" + turma.value + "&size=" + size + "&skip=" + skip;
            event.preventDefault();
            document.getElementById("headRegistros").innerHTML = "Registros encontrados";
            getData("turma", endpoint);
        }
    });
    aluno.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            endpoint = baseURL + "/v1/logs?studentEmail=" + aluno.value + "&size=" + size + "&skip=" + skip;
            event.preventDefault();
            document.getElementById("headRegistros").innerHTML = "Registros encontrados";
            getData("aluno", endpoint);
        }
    });
    aula.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            endpoint = baseURL + "/v1/logs?roomid=" + aula.value + "&size=" + size + "&skip=" + skip;
            event.preventDefault();
            document.getElementById("headRegistros").innerHTML = "Registros encontrados";
            getData("aluno", endpoint);
        }
    });
});