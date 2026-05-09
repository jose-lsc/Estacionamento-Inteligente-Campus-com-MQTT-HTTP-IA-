import {
    findIncidents
} from "../database/repositories/incidentsRepository.js";

export async function getIncidents(req, res){

    try{

        const { status } = req.query;

        const data =
        await findIncidents(status);

        return res.json(data);

    }catch(err){

        return res.status(500).json({
            error: "Erro ao buscar incidentes"
        });

    }

}

export async function getIncidentsType(req, res){

    try{

        const { status } = req.query;

        const data =
        await findIncidents(status);

        return res.json(data);

    }catch(err){

        return res.status(500).json({
            error: "Erro ao buscar incidentes"
        });

    }

}