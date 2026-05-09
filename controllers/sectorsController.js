import {
    findSectorSpots,
    findFreeSpotsBySector,
    findSectorsSummary,
    
} from "../database/repositories/spotsRepository.js";

import {
    saveRecommendation
} from "../database/repositories/recommendationsRepository.js";

export async function getSectorSpots(req, res){

    try{

        const { sectorId } = req.params;

        const data =
        await findSectorSpots(sectorId);

        return res.json(data);

    }catch(err){

        return res.status(500).json({
            error: "Erro ao buscar vagas"
        });

    }

}

export async function getFreeSpots(req, res){

    try{

        const { sectorId } = req.params;

        const limit =
        Number(req.query.limit) || 10;

        const data =
        await findFreeSpotsBySector(
            sectorId,
            limit
        );

        return res.json(data);

    }catch(err){

        return res.status(500).json({
            error: "Erro ao buscar vagas livres"
        });

    }

}

export async function getSectorsSummary(req, res){

    try{

        const data =
        await findSectorsSummary();

        const formatted = data.map(sector => ({

            sectorId: sector.sector_id,

            occupiedCount:
            sector.occupied_count,

            freeCount:
            sector.free_count,

            occupancyRate:
            (
                sector.occupied_count /
                sector.total_spots
            ) * 100,

            lastUpdateTs:
            sector.last_update_ts

        }));

        return res.json(formatted);

    }catch(err){

        return res.status(500).json({
            error: "Erro ao buscar setores"
        });

    }

}

export async function getRecommendation(req, res){

    try{

        const { fromSector } = req.query;

        const sectors =
        await findSectorsSummary();

        const currentSector =
        sectors.find(
            s => s.sector_id === fromSector
        );

        if(!currentSector){

            return res.status(404).json({
                error: "Setor não encontrado"
            });

        }

        const occupancyRate =
            currentSector.occupied_count /
            currentSector.total_spots;

        if(occupancyRate < 0.90){

            return res.json({
                message:
                "Setor ainda não está lotado"
            });

        }

        const candidates =
        sectors.filter(
            s => s.sector_id !== fromSector
        );

        candidates.sort(
            (a, b) =>
                b.free_count - a.free_count
        );

        const bestSector =
        candidates[0];

        const recommendation = {

            fromSector,

            recommendedSector:
            bestSector.sector_id,

            reason:
            `Sector ${fromSector} at ${
                Math.round(occupancyRate * 100)
            }% occupancy; Sector ${
                bestSector.sector_id
            } has ${
                bestSector.free_count
            } free spots`,

            ts: new Date().toISOString()

        };

        saveRecommendation(recommendation);

        return res.json({

            fromSector,

            recommendedSector:
            bestSector.sector_id,

            reason:
            `Sector ${fromSector} at ${
                Math.round(occupancyRate * 100)
            }% occupancy; Sector ${
                bestSector.sector_id
            } has ${
                bestSector.free_count
            } free spots`,

            ts: new Date().toISOString()

        });

    }catch(err){

        return res.status(500).json({
            error: "Erro ao gerar recomendação"
        });

    }

}