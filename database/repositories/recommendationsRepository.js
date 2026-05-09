import db from "../connection.js";

export function saveRecommendation(data){

    const query = `
        INSERT INTO recommendations_log (
            ts,
            from_sector,
            recommended_sector,
            reason,
            data_json
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(query, [

        data.ts,
        data.fromSector,
        data.recommendedSector,
        data.reason,
        JSON.stringify(data)

    ]);

}