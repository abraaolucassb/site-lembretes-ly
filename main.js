//Function para verificar de há texto...
function textoValido(texto) {
    if (texto == null || texto == "" || texto.length < 1) {
        return false;
    } else {
        return true;
    }
}

//Function para mostrar error...
function mostrarError() {
    var html = "";
    html += '<div class="alert alert-danger" role="alert">';
    html += 'Por favor insira alguma coisa!';
    html += '</div>';

    document.getElementById('error').innerHTML = html;
}

//Function for clear this error
function limparError() {
    document.getElementById("error").innerHTML = "";
}

//funtion for create o lembrete
function createRecordatorio() {
    var conteudoTextArea = document.getElementById("texto").value;
    if (!textoValido(conteudoTextArea)) {
        mostrarError();
        return;
    }
    limparError();

    //create as variaveis para tempo...
    var referencia = new Date();
    var id = referencia.getTime();
    var data = referencia.toLocaleDateString();
    var texto = conteudoTextArea;

    //JSON
    var recordatorio = { "id": id, "data": data, "texto": texto };

    //function para comprovar se existe lembrete
    comprovarRecordatorio(recordatorio);

}

//function para validar recordatorio
function recordatorioValido(recordatoriosExistentes) {
    if (recordatoriosExistentes == null || recordatoriosExistentes == "" || typeof recordatoriosExistentes == "undefined" || recordatoriosExistentes == "undefined") {
        return false;
    } else {
        return true;
    }
}

// function para comprova recordatorio
function comprovarRecordatorio(recordatorio) {
    var recordatoriosExistentes = localStorage.getItem("recordatorios");
    if (!recordatorioValido(recordatoriosExistentes)) {
        var recordatorios = [];
        recordatorios.push(recordatorio);

        //save
        saveRecordatorio(recordatorios);

    } else {
        var recordatoriosRecuperados = JSON.parse(recordatoriosExistentes);
        //save
        recordatoriosRecuperados.push(recordatorio);
        saveRecordatorio(recordatoriosRecuperados);
    }
    //gravar os dados
    mostrarRecordatorio();
}

function saveRecordatorio(recordatorios) {
    var recordatoriosJSON = JSON.stringify(recordatorios);
    localStorage.setItem("recordatorios", recordatoriosJSON);
}

//função para exibir
function mostrarRecordatorio() {
    var html = "";

    var recordatoriosExistentes = localStorage.getItem("recordatorios");
    if (!recordatorioValido(recordatoriosExistentes)) {
        html = "Não existe nenhum lembrete!";
        document.getElementById("recordatorios").innerHTML = html;


    } else {
        var recordatoriosRecuperados = JSON.parse(recordatoriosExistentes);
        for (var i = 0; i < recordatoriosRecuperados.length; i++) {
            html += formatarRecordatorio(recordatoriosRecuperados[i]);
        }
        document.getElementById("recordatorios").innerHTML = html;
    }

}

//function para exibir os lembretes
function formatarRecordatorio(recordatorio) {
    var html = "";
    html += '<div class="recordatorio" id="' + recordatorio.id + '">';
    html += '<div class="row">';
    html += '<div class="col-6 text-left">';
    html += '<small><i class="fa fa-calendar-alt" aria-hidden"true"></i>' + recordatorio.data + '</small>';
    html += '</div>';
    html += '<div class="col-6 text-right">';
    html += '<small><i class="fa fa-window-close" aria-hidden"true"></i></small>';
    html += '</div>';
    html += '</div>';
    html += '<br>';
    html += '<div class="row">';
    html += '<div class="col-12">';
    html += recordatorio.texto;
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<br>';

    return html;
}

document.addEventListener('DOMContentLoaded', function () {
    console.log("this work");

    //mostrarError();

    document.getElementById("buttonSave").onclick = createRecordatorio;

    mostrarRecordatorio()

});
