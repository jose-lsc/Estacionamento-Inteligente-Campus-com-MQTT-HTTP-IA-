import db from "../connection.js";

export function findIncidents(status){

    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM incidents
            WHERE status = ?
            ORDER BY ts_open DESC
        `;

        db.all(query, [status], (err, rows) => {

            if(err){

                reject(err);
                return;

            }

            resolve(rows);

        });

    });

}

export function findIncidentsType(type){

    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM incidents
            WHERE type = ?
            ORDER BY ts_open DESC
        `;

        db.all(query, [type], (err, rows) => {

            if(err){

                reject(err);
                return;

            }

            resolve(rows);

        });

    });

}

export function saveIncident(data){

    const query = `
        INSERT INTO incidents (
            type,
            severity,
            sector_id,
            spot_id,
            ts_open,
            evidence_json,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [
        data.type,
        data.severity,
        data.sectorId,
        data.spotId,
        data.tsOpen,
        data.evidenceJson,
        data.status
    ]);
}