// TODO Return error on table if getData == error
// TODO Table replace instead of table append
// TODO Table inside div formatted
function getData(input, url) {
    console.log("Fui chamado por " + input + " !" + " e fiz a requisicao em " + url + " !")
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.send();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.body.appendChild(buildHtmlTable(request.response));
        }
        // else return table head with "ERROR"
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
_divOut_.className = "container"
_divIn_.className = "d-flex justify-content-center table-hover"
_divIn_ = _divOut_.appendChild(_divIn_);
_table_ = _divIn_.appendChild(_table_);

window.addEventListener('load', function() {
    const baseURL = "http://localhost:8080"
    var curso = document.getElementById("cursoInput");
    var turma = document.getElementById("turmaInput");
    var aluno = document.getElementById("alunoInput");
    var aula = document.getElementById("aulaInput");
    document.body.insertBefore(_divIn_, document.getElementById("logreg")); 
    // Main page
    getData(null, baseURL + "/v1/logs?last=20")
    // Search
    curso.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            const url = baseURL + "/v1/logs?courseid=" + curso.value;
            event.preventDefault();
            getData(curso, url);
        }
    });
    turma.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            const url = baseURL + "/v1/logs?classid=" + turma.value;
            event.preventDefault();
            getData(turma, url);
        }
    });
    aluno.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            const url = baseURL + "/v1/logs?studentEmail=" + aluno.value;
            event.preventDefault();
            getData(aluno, url);
        }
    });
    aula.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            const url = baseURL + "/v1/logs?roomid=" + aula.value;
            event.preventDefault();
            getData(aluno, url);
        }
    });
});