import { Router } from "express";

import parkingRoutes from "./parkingRoutes.js";
import sectorsRoutes from "./sectorsRoutes.js";
import reportRoutes from "./reportRoutes.js";
import incidentsRoutes from "./incidentsRoutes.js";

const router = Router();

router.use("/api/v1", parkingRoutes);
router.use("/api/v1", sectorsRoutes);
router.use("/api/v1", reportRoutes);
router.use("/api/v1", incidentsRoutes);

export default router;