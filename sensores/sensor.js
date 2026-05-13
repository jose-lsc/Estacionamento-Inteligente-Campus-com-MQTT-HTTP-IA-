import { randomUUID } from "crypto";
import client from "../mqtt/client.js";

const memory = new Map();

const faults = {
    stuck: new Map(),
    flapping: new Map()
};

function isPeakHour(){
    const hour = new Date().getHours();
    return (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19);
}

function nextState(spotId) {
    const prev = memory.get(spotId) || {
        state: "FREE",
        lastChange: Date.now() - 30000 
    };

    const now = Date.now();
    const timeInState = now - prev.lastChange;
    const MIN_TIME = 1000;

    if (timeInState < MIN_TIME) {
        return prev.state;
    }

    const isPeak = isPeakHour();
    const baseProb = isPeak ? 0.85 : 0.70; 

    const r = Math.random();
    let newState = prev.state;

    if (prev.state === "FREE") {
        newState = r < baseProb ? "OCCUPIED" : "FREE";
    } else {
        newState = r < (1 - baseProb) ? "FREE" : "OCCUPIED";
    }

    // LOG DE DEBUG:
    if (newState !== prev.state) {
        console.log(`[MUDANÇA] Vaga ${spotId}: ${prev.state} -> ${newState} (r: ${r.toFixed(2)})`);
    }

    memory.set(spotId, {
        state: newState,
        lastChange: newState !== prev.state ? now : prev.lastChange
    });

    return newState;
}

export function setFault(type, spotId, value){

    if(type === "stuck"){
        faults.stuck.set(spotId, value);
        console.log("STUCK APLICADO");
    }

    if(type === "flapping"){
        faults.flapping.set(spotId, true);
        console.log("FLAPPING APLICADO");
    }

    
}

export function clearFault(type, spotId){

    if(type === "stuck"){
        faults.stuck.delete(spotId);
    }

    if(type === "flapping"){
        faults.flapping.delete(spotId);
    }
}

function publish(sectorId, spotId, state){

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

    client.publish(topic, JSON.stringify(payload));
}

export function createSensor(sectorId, spotId) {
    setInterval(() => {
        let state;

        
        if (faults.stuck.has(spotId)) {
            state = faults.stuck.get(spotId);
        } else if (faults.flapping.has(spotId)) {
            state = (Math.floor(Date.now() / 1000) % 2 === 0) ? "FREE" : "OCCUPIED";
        } 
       
        else {
            state = nextState(spotId);
        }

        publish(sectorId, spotId, state);

    }, 4000); 
}