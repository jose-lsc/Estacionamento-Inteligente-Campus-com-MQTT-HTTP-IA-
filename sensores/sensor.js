import { randomUUID } from "crypto";
import client from "../mqtt/client.js";

export function createSensor(sectorId, spotId){

    setInterval(() => {

        const state =
            Math.random() > 0.5
            ? "FREE"
            : "OCCUPIED";

        const payload = {

            eventId: randomUUID(),

            ts: new Date().toISOString(),

            sectorId,

            spotId,

            state,

            source: "sensor"
        };

        const topic =
        `campus/parking/sectors/${sectorId}/spots/${spotId}/events`;

        client.publish(
            topic,
            JSON.stringify(payload)
        );

        console.log(topic);
        console.log(payload);

    }, 5000);

}