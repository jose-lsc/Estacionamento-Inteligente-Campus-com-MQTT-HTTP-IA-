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

export function findTurnoverReport(
    sectorId,
    from,
    to
){

    return new Promise((resolve, reject) => {

        const query = `
            SELECT

                sector_id,

                COUNT(*) as turnover

            FROM spot_events

            WHERE
                sector_id = ?
                AND state = 'OCCUPIED'
                AND ts BETWEEN ? AND ?

            GROUP BY sector_id
        `;

        db.get(
            query,
            [sectorId, from, to],
            (err, row) => {

                if(err){

                    reject(err);
                    return;

                }

                resolve(row);

            }
        );

    });

}