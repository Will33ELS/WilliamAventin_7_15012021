const express = require("express");
const router = express.Router();

const multerMiddleware = require("../middleware/multer-config");
const authMiddleware = require("../middleware/auth");

const profileController = require("../controller/profile");

router.get("/", authMiddleware.logged, profileController.myProfile); //Route pour récupérer les informations du comptes
router.get("/:id", authMiddleware.logged, profileController.getProfile); // Route pour récupérer les informations d'un profil à partir d'un ID
router.post("/avatar", authMiddleware.logged, multerMiddleware, profileController.changeAvatar); //Route pour changer d'avatar

module.exports = router;
