import { saveIncident } from "../database/repositories/incidentsRepository.js";

const stateMap = new Map();

export function analyzeEvent(event){

    const key = event.spotId;
    const now = Date.now();

    const prev = stateMap.get(key);

    if(!prev){

        stateMap.set(key, {
            state: event.state,
            start: now
        });

        return;
    }

    // mudou estado → reset timer
    if(prev.state !== event.state){

        stateMap.set(key, {
            state: event.state,
            start: now
        });

        return;
    }

    const duration = now - prev.start;

    if(duration > 15000){

        saveIncident({
            type: event.state === "OCCUPIED"
                ? "STUCK_OCCUPIED"
                : "STUCK_FREE",
            severity: "HIGH",
            sectorId: event.sectorId,
            spotId: event.spotId,
            tsOpen: new Date().toISOString(),
            status: "OPEN",
            evidenceJson: JSON.stringify(event)
        });

        // evita duplicar incidente
        stateMap.set(key, {
            state: event.state,
            start: now
        });
    }

    
}