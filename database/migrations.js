import db from "./connection.js";

export function runMigrations(){

    db.serialize(() => {

        db.run(`
            CREATE TABLE IF NOT EXISTS spots (

                spot_id TEXT PRIMARY KEY,

                sector_id TEXT NOT NULL,

                current_state TEXT NOT NULL,

                last_change_ts TEXT NOT NULL,

                last_event_id TEXT NOT NULL

            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS spot_events (

                event_id TEXT PRIMARY KEY,

                ts TEXT NOT NULL,

                sector_id TEXT NOT NULL,

                spot_id TEXT NOT NULL,

                state TEXT NOT NULL,

                raw_payload_json TEXT NOT NULL

            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS sector_snapshots (

                id INTEGER PRIMARY KEY AUTOINCREMENT,

                ts TEXT NOT NULL,

                sector_id TEXT NOT NULL,

                occupied_count INTEGER NOT NULL,

                free_count INTEGER NOT NULL,

                occupancy_rate REAL NOT NULL

            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS incidents (

                id INTEGER PRIMARY KEY AUTOINCREMENT,

                ts_open TEXT NOT NULL,

                ts_close TEXT,

                type TEXT NOT NULL,

                severity TEXT NOT NULL,

                sector_id TEXT,

                spot_id TEXT,

                evidence_json TEXT,

                status TEXT NOT NULL

            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS recommendations_log (

                id INTEGER PRIMARY KEY AUTOINCREMENT,

                ts TEXT NOT NULL,

                from_sector TEXT NOT NULL,

                recommended_sector TEXT NOT NULL,

                reason TEXT NOT NULL,

                data_json TEXT

            )
        `);

        console.log("Migrations executadas!");

    });

}