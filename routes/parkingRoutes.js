import { Router } from "express";

import {
    getParkingMap
} from "../controllers/parkingController.js";

const router = Router();

/**
 * @swagger
 * /api/v1/map:
 *   get:
 *     summary: Retorna o mapa atual do estacionamento
 *     tags:
 *       - Parking
 *     responses:
 *       200:
 *         description: Lista de vagas
 */
router.get("/map", getParkingMap);

export default router;