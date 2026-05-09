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

export function findAllSpots(){

    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM spots
            ORDER BY sector_id, spot_id
        `;

        db.all(query, [], (err, rows) => {

            if(err){
                reject(err);
                return;
            }

            resolve(rows);

        });

    });

}

export function findSectorSpots(sectorId){

    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM spots
            WHERE sector_id = ?
            ORDER BY spot_id
        `;

        db.all(query, [sectorId], (err, rows) => {

            if(err){
                reject(err);
                return;
            }

            resolve(rows);

        });

    });

}

export function findFreeSpotsBySector(
    sectorId,
    limit
){

    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM spots
            WHERE
                sector_id = ?
                AND current_state = 'FREE'
            LIMIT ?
        `;

        db.all(query, [sectorId, limit], (err, rows) => {

            if(err){
                reject(err);
                return;
            }

            resolve(rows);

        });

    });

}

export function findSectorsSummary(){

    return new Promise((resolve, reject) => {

        const query = `
            SELECT

                sector_id,

                COUNT(*) as total_spots,

                SUM(
                    CASE
                        WHEN current_state = 'OCCUPIED'
                        THEN 1
                        ELSE 0
                    END
                ) as occupied_count,

                SUM(
                    CASE
                        WHEN current_state = 'FREE'
                        THEN 1
                        ELSE 0
                    END
                ) as free_count,

                MAX(last_change_ts) as last_update_ts

            FROM spots

            GROUP BY sector_id
        `;

        db.all(query, [], (err, rows) => {

            if(err){
                reject(err);
                return;
            }

            resolve(rows);

        });

    });

}

