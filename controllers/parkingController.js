import {
    findAllSpots
} from "../database/repositories/spotsRepository.js";

export async function getParkingMap(req, res){

    try{

        const spots =
        await findAllSpots();

        return res.json(spots);

    }catch(err){

        return res.status(500).json({
            error: "Erro ao buscar mapa"
        });

    }

}