import client from "./client.js";

import { saveSpotEvent }
from "../database/repositories/eventsRepository.js";

import { updateSpot }
from "../database/repositories/spotsRepository.js";

client.on("connect", () => {

    console.log("Subscriber conectado!");

    client.subscribe(
        "campus/parking/sectors/+/spots/+/events"
    );

});

client.on("message", (topic, message) => {

    try{

        const data =
        JSON.parse(message.toString());

        console.log("Evento recebido:");
        console.log(data);

        saveSpotEvent(data);

        updateSpot(data);

    }catch(err){

        console.log("Erro ao processar mensagem");

    }

});