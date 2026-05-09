import {Router} from "express";

import {
    getIncidents,
    getIncidentsType
} from "../controllers/incidentsController.js";

const router = Router();

/**
 * @swagger
 * /api/v1/incidents:
 *   get:
 *     summary: Retorna incidentes detectados
 *     tags:
 *       - Incidents
 *
 *     parameters:
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *         example: OPEN
 *
 *     responses:
 *       200:
 *         description: Lista de incidentes
 *
 *       500:
 *         description: Erro interno do servidor
 */
router.get(
    "/incidents",
    getIncidents
);

/**
 * @swagger
 * /api/v1/incidents/type:
 *   get:
 *     summary: Retorna incidentes detectados pelo tipo
 *     tags:
 *       - Incidents
 *
 *     parameters:
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *         example: FLAPPING
 *
 *     responses:
 *       200:
 *         description: Lista de incidentes
 *
 *       500:
 *         description: Erro interno do servidor
 */
router.get(
    "/incidents/type",
    getIncidentsType
);


export default router;