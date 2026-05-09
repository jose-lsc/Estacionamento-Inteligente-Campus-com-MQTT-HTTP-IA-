import { createSensor } from "./sensores/sensor.js";
import {
    sectors,
    spotsPerSector
} from "./config/parkingConfig.js";

import { runMigrations } from "./database/migrations.js";

import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

import {
    swaggerUi,
    swaggerSpec
} from "./docs/swagger.js";

import "./mqtt/subscriber.js";
import { setFault } from "./sensores/sensor.js";

runMigrations();

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.listen(3000, () => {

    // console.log("Servidor rodando na porta 3000");

    // for (const sector of sectors) {
    //     for (let i = 1; i <= spotsPerSector; i++) {
    //         const spotId = `${sector}-${String(i).padStart(2, "0")}`;
    //         createSensor(sector, spotId);
    //     }
    // }
});

// setTimeout(() => {
//     setFault("stuck", "A-01", "OCCUPIED");
//     setFault("flapping", "C-01");
// }, 5000);


/**
 * MARCAR TODOS COMO OCCUPIED
 * 
 * -> sqlite3 database/parking.db
 * 
 * UPDATE spots
SET current_state = 'OCCUPIED'
WHERE sector_id = 'A';
 */
//



export default app;