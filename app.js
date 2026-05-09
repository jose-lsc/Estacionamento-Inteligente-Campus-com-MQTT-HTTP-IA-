import { createSensor } from "./sensores/sensor.js";
import {
    sectors, //Setores A, B e C
    spotsPerSector // Vagas para cada setor, são 30
} from "./config/parkingConfig.js";

import { runMigrations } from "./database/migrations.js"; // Aqui esta importando a função de rodar o banco de dados
import "./mqtt/subscriber.js"; //Aqui está iniciando o subscriber

runMigrations();
for(const sector of sectors){

    for(let i = 1; i <= spotsPerSector; i++){

        const spotId =
        `${sector}-${String(i).padStart(2, "0")}`;

        createSensor(sector, spotId);

    }

}