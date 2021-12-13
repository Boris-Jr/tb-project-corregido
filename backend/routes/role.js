import express from "express";
import role from "../controllers/role.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
import validId from "../middlewares/validId.js";
const router = express.Router();

//Requiere estar logueado y ser admin para ejecutar la siguiente linea de codigo
router.post("/registerRole", auth, admin, role.registerRole);
//Requiere estar logueado y ser admin para ejecutar la siguiente linea de codigo
router.get("/listRole", auth, admin, role.listRole);
//Requiere estar logueado y ser admin para ejecutar la siguiente linea de codigo (se valida que el objectId que llega como parametro sea valido)
router.get("/findRole/:_id", auth, validId, admin, role.findRole);
//Requiere estar logueado y ser admin para ejecutar la siguiente linea de codigo
router.put("/updateRole", auth, admin, role.updateRole);
//Requiere estar logueado y ser admin para ejecutar la siguiente linea de codigo
//(se valida que el objectId que llega como parametro sea valido)
router.delete("/deleteRole/:_id", auth, validId, admin, role.deleteRole);

export default router;
