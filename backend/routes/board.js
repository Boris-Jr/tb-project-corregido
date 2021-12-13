import express from "express";
import board from "../controllers/board.js";
import auth from "../middlewares/auth.js";
//Se importa validId, formatFile y multiparty
import validId from "../middlewares/validId.js";
import formatFile from "../middlewares/formatFile.js";
import multiparty from "connect-multiparty";
//Multiparty sirve para crear archivos temporales en el servidor
const mult = multiparty();
const router = express.Router();

//Requiere estar logueado para ejecutar la siguiente linea de codigo
router.post("/saveTask", auth, board.saveTask);
//Requiere estar logueado, para ejecutar la siguiente linea de codigo (ademas valida el formato del archivo, y permite subir archivos)
router.post("/saveTaskImg", mult, formatFile, auth, board.saveTaskImg);
//Requiere estar logueado para ejecutar la siguiente linea de codigo
router.get("/listTask", auth, board.listTask);
//Requiere estar logueado para ejecutar la siguiente linea de codigo
router.put("/updateTask", auth, board.updateTask);
//Requiere estar logueado para ejecutar la siguiente linea de codigo (se valida que el Id que ingresa sea valido)
//se cambio put por delete, y se adiciono /:_id
//router.put("/deleteTask", auth, validId, board.deleteTask);
router.delete("/deleteTask/:_id", auth, validId, board.deleteTask);

export default router;
