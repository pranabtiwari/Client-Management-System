import express from "express";
 

import * as clientController from "../controllers/clientControllers.js";


const router = express.Router();

router.get("/clients", clientController.getClients);
router.post("/clients", clientController.createClients);
router.put("/clients/:id", clientController.updateClients);
router.delete("/clients/:id", clientController.deleteClients);
router.get("/clients/search", clientController.searchClientsByName);



export default router; 