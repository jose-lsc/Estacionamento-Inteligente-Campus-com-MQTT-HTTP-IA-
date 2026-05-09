import {
    findTurnoverReport,
    
} from "../database/repositories/eventsRepository.js";

export async function getTurnoverReport(req, res){

    try{

        const {
            sectorId,
            from,
            to
        } = req.query;

        const data =
        await findTurnoverReport(
            sectorId,
            from,
            to
        );

        return res.json(data);

    }catch(err){

        return res.status(500).json({
            error: "Erro ao gerar relatório"
        });

    }

}