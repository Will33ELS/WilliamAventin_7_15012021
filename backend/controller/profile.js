const jwt = require("jsonwebtoken");

const User = require("../models/user");
const userUtil = require("../utils/userUtils");

//Récupération des données du compte
exports.myProfile = (req, res, next) => {
    //Récupération du userID dans le token d'authentification
    const userId = userUtil.getUserID(req);

    User.findOne({
        id: userId
    }).then(user => {
        if(!user)
            res.status(404).send("Compte introuvable");
        else{
            //Retour des informations du profile
            res.status(200).json({
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                avatarURL: user.avatarURL,
                isAdmin: user.isAdmin
            });
        }
    }).catch(error => res.status(500).json({ error }));
}

//Changement de l'avatar
exports.changeAvatar = (req, res, next) => {
    const userId = userUtil.getUserID(req);
    User.findOne({
        id: userId
    }).then(user => {
        if(!user)
            res.status(404).send("Compte introuvable");
        else{
            if(!req.file)
                res.status(404).send("Aucun fichier renseigné.");
            user.avatarURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; //ROUTE DE L'IMAGE
            user.save().then(() => res.status(200).json({
                avatarURL: user.avatarURL,
                message: "Avatar modifié avec succès !"
            }))
                .catch(error => res.status(500).json({ error }));
        }
    }).catch(error => res.status(500).json({ error }));
}

// Récupération des informations de base d'un profil à partir d'un ID
exports.getProfile = (req, res, next) => {
    User.findOne({ where:{
            id: req.params.id
        }
    }).then(user => {
        if(!user){
            res.status(404).json({ error: "Cet utilisateur n'existe pas." })
        }else {
            res.status(200).json({
                nom: user.nom,
                prenom: user.prenom,
                avatarURL: user.avatarURL
            })
        }
    }).catch(error => res.status(500).json({ error }));
}
