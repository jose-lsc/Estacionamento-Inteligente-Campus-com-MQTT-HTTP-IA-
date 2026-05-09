import db from "../connection.js";

export function updateSpot(data){

    const query = `
        INSERT OR REPLACE INTO spots (
            spot_id,
            sector_id,
            current_state,
            last_change_ts,
            last_event_id
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(query, [
        data.spotId,
        data.sectorId,
        data.state,
        data.ts,
        data.eventId
    ]);

}