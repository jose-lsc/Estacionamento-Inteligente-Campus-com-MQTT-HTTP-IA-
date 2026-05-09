import { Router } from "express";

const router = Router();

import {
    getTurnoverReport
} from "../controllers/reportsController.js";

/**
 * @swagger
 * /api/v1/reports/turnover:
 *   get:
 *     summary: Retorna relatório de rotatividade do setor
 *     tags:
 *       - Reports
 *
 *     parameters:
 *       - in: query
 *         name: sectorId
 *         required: true
 *         schema:
 *           type: string
 *         example: A
 *
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *         example: 2026-05-01T00:00:00.000Z
 *
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *         example: 2026-05-09T23:59:59.000Z
 *
 *     responses:
 *       200:
 *         description: Relatório de turnover
 *
 *       500:
 *         description: Erro interno do servidor
 */
router.get(
    "/reports/turnover",
    getTurnoverReport
);



export default router;