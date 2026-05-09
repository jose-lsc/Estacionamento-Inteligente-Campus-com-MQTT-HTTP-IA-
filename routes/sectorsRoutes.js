import { Router } from "express";

import {
    getSectorsSummary,
    getSectorSpots,
    getFreeSpots,
    getRecommendation
} from "../controllers/sectorsController.js";

const router = Router();

/**
 * @swagger
 * /api/v1/sectors:
 *   get:
 *     summary: Retorna resumo dos setores
 *     tags:
 *       - Sectors
 *     responses:
 *       200:
 *         description: Resumo dos setores
 */
router.get("/sectors", getSectorsSummary);

/**
 * @swagger
 * /api/v1/sectors/{sectorId}/spots:
 *   get:
 *     summary: Retorna vagas do setor
 *     tags:
 *       - Sectors
 *     parameters:
 *       - in: path
 *         name: sectorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de vagas
 */
router.get(
    "/sectors/:sectorId/spots",
    getSectorSpots
);

/**
 * @swagger
 * /api/v1/sectors/{sectorId}/free-spots:
 *   get:
 *     summary: Retorna vagas livres de um setor
 *     tags:
 *       - Sectors
 *     parameters:
 *       - in: path
 *         name: sectorId
 *         required: true
 *         schema:
 *           type: string
 *         example: A
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         example: 10
 *
 *     responses:
 *       200:
 *         description: Lista de vagas livres
 *
 *       500:
 *         description: Erro interno do servidor
 */
router.get(
    "/sectors/:sectorId/free-spots",
    getFreeSpots
);

/**
 * @swagger
 * /api/v1/recommendation:
 *   get:
 *     summary: Gera recomendação de setor alternativo
 *     tags:
 *       - Recommendation
 *
 *     parameters:
 *       - in: query
 *         name: fromSector
 *         required: true
 *         schema:
 *           type: string
 *         example: A
 *
 *     responses:
 *       200:
 *         description: Recomendação gerada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fromSector:
 *                   type: string
 *                   example: A
 *
 *                 recommendedSector:
 *                   type: string
 *                   example: B
 *
 *                 reason:
 *                   type: string
 *                   example: Sector A at 93% occupancy; Sector B has 12 free spots
 *
 *                 ts:
 *                   type: string
 *                   example: 2026-04-29T10:20:00.000Z
 *
 *       404:
 *         description: Setor não encontrado
 *
 *       500:
 *         description: Erro interno do servidor
 */
router.get(
    "/recommendation",
    getRecommendation
);

export default router;