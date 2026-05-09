import db from "../connection.js";

export function saveSpotEvent(data){

    const query = `
        INSERT INTO spot_events (
            event_id,
            ts,
            sector_id,
            spot_id,
            state,
            raw_payload_json
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [
        data.eventId,
        data.ts,
        data.sectorId,
        data.spotId,
        data.state,
        JSON.stringify(data)
    ], (err) => {

        if(err){
            console.log("Erro ao salvar evento:", err.message);
            return;
        }

        console.log("Evento salvo!");

    });

}