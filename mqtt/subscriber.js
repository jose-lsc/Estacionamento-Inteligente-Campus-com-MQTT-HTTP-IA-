import client from "./client.js";

import { saveSpotEvent }
from "../database/repositories/eventsRepository.js";

import { updateSpot }
from "../database/repositories/spotsRepository.js";

import { analyzeEvent } from "./anomalyDetector.js";

client.on("connect", () => {

    console.log("Subscriber conectado!");

    client.subscribe(
        "campus/parking/sectors/+/spots/+/events"
    );

});

client.on("message", (topic, message) => {

    try{

        const data = JSON.parse(message.toString());

        console.log("Evento recebido:");
        console.log(data);

        //Salva os eventos relacionados a vaga em histórico
        saveSpotEvent(data);

        //Atualiza o estado atual das vagas
        updateSpot(data);

        //Analisa anomalia
        analyzeEvent(data);

    }catch(err){

        console.log("Erro ao processar mensagem");

    }

});