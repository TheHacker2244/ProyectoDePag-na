let opcion_elegida=[]

let cantidad_correctas = 0;

function respuesta(numero_pregunta, seleccionada){
    opcion_elegida[numero_pregunta] = seleccionada. value;

    const idPregunta = "p" + numero_pregunta;
    const labels = document.getElementById(idPregunta).querySelectorAll('label');

    labels.forEach(label => {
        label.style.backgroundColor = "white";
    });

    seleccionada.parentNode.style.backgroundColor = "lightblue";
}
function corregir(){
    cantidad_correctas = 0;
    console.log("RESPUESTAS_CORRECTAS:", RESPUESTAS_CORRECTAS);
    console.log("opcion_elegida:", opcion_elegida);
    for(let i = 0; i < RESPUESTAS_CORRECTAS.length; i++){
        const respuestaCorrecta = String(RESPUESTAS_CORRECTAS[i]);
        const respuestaUsuario = opcion_elegida[i] ? opcion_elegida[i].trim() : undefined;
        console.log("Comparando:", respuestaCorrecta, "con", respuestaUsuario);
        if(respuestaUsuario !== undefined && respuestaCorrecta === respuestaUsuario){
            cantidad_correctas++;
        }
    }
    document.getElementById("resultado").innerHTML = cantidad_correctas;
}

const BotonCorregir = document.getElementById('BotonCorregir');

if (BotonCorregir) {
    BotonCorregir.addEventListener('click', corregir);
} else {
    console.error('El botón con ID "BotonCorregir" no existe.');
}