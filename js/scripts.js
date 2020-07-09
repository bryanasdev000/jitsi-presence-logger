function getData(input, url) {
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.send();
    console.log("Fui chamado por " + input + " !" + " e fiz a requisicao em " + url + " !")
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(Http.responseText)
        }
    }
}

window.addEventListener('load', function () {
    const baseURL = "http://localhost:8080"
    var curso = document.getElementById("cursoInput");
    var turma = document.getElementById("turmaInput");
    var aluno = document.getElementById("alunoInput");
    var aula = document.getElementById("aulaInput");
    // Main page
    getData(null, baseURL + "/v1/logs?last=20")
    // Search
    curso.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            const url = baseURL + "/v1/logs?courseid=" + curso.value;
            event.preventDefault();
            getData(curso, url);
        }
    });
    turma.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            const url = baseURL + "/v1/logs?classid=" + turma.value;
            event.preventDefault();
            getData(turma, url);
        }
    });
    aluno.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            const url = baseURL + "/v1/logs?studentEmail=" + aluno.value;
            event.preventDefault();
            getData(aluno, url);
        }
    });
    aula.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            const url = baseURL + "/v1/logs?roomid=" + aula.value;
            event.preventDefault();
            getData(aluno, url);
        }
    });
});

