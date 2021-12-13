import express from "express";
import user from "../controllers/user.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
//Se importa el validId
import validId from "../middlewares/validId.js";
const router = express.Router();
//NO Requiere estar logueado para ejecutar la siguiente linea de codigo
router.post("/registerUser", user.registerUser);
//Requiere estar logueado y ser admin para ejecutar la siguiente linea de codigo
router.post("/registerAdminUser", auth, admin, user.registerAdminUser);
//NO Requiere estar logueado para ejecutar la siguiente linea de codigo
router.post("/login", user.login);
//Requiere estar logueado y ser admin para ejecutar la siguiente linea de codigo
router.get("/listUsers/:name?", auth, admin, user.listAllUser);
//Requiere estar logueado y ser admin para ejecutar la siguiente linea de codigo
router.get("/getRole/:email", auth, user.getUserRole);
//Requiere estar logueado y ser admin para ejecutar la siguiente linea de codigo (se valida que el objectId sea valido)
router.get("/findUser/:_id", auth, validId, admin, user.findUser);
//Requiere estar logueado y ser admin para ejecutar la siguiente linea de codigo
router.put("/updateUser", auth, admin, user.updateUser);
//Requiere estar logueado y ser admin para ejecutar la siguiente linea de codigo (se valida que el objectId sea valido)
router.delete("/deleteUser/:_id", auth, validId, admin, user.deleteUser);

export default router;
