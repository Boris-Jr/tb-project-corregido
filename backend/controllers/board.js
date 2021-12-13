import board from "../models/board.js";
import fs from "fs"; //libreria que permite cargar y leer archivos
import path from "path"; //libreria que permite trabajar con directorios y direcciones de archivos
import moment from "moment";

//Guarda tarea con nombre y descripcion
const saveTask = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });
  //Crea el esquema de la tarea con los datos de req
  const boardSchema = new board({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    taskStatus: "to-do",
    imageUrl: "",
  });
  //Guarda los datos en la BD
  const result = await boardSchema.save();
  return !result
    ? res.status(400).send({ message: "Error registering task" })
    : res.status(200).send({ result });
};
//Metodo que almacena la imagen
const saveTaskImg = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });

  let imageUrl = "";
  //si en req.files viene vacio la url se guardara como vacia
  if (Object.keys(req.files).length === 0) {
    imageUrl = "";
  } else {
    //Si no, valida que sea una imagen y que tenga un tipo de imagen valido
    if (req.files.image) {
      if (req.files.image.type != null) {
        //Crea el nombre con el que se almacenara= http://localhost:3001/
        const url = req.protocol + "://" + req.get("host") + "/";
        //Crea el nombre y ubicacion donde se guardara = ./uploads/1639154450.png
        const serverImg =
          "./uploads/" + moment().unix() + path.extname(req.files.image.path);
        //Lee la imagen ubicada en la direccion local, y acto seguido hace una
        //copia y la guarda en la carpeta upload
        fs.createReadStream(req.files.image.path).pipe(
          fs.createWriteStream(serverImg)
        );
        //Finalmente crea el nombre completo con el que se almacenara en la BD
        imageUrl =
          url +
          "uploads/" +
          moment().unix() +
          path.extname(req.files.image.path);
      }
    }
  }
  //crea el esquema de la tarea con los datos de req
  const boardSchema = new board({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    taskStatus: "to-do",
    imageUrl: imageUrl,
  });

  //guarda en BD
  const result = await boardSchema.save();
  if (!result)
    return res.status(400).send({ message: "Error registering task" });
  return res.status(200).send({ result });
};

//Lista las tareas por Id del usuario, que entra como parametro
const listTask = async (req, res) => {
  const taskList = await board.find({ userId: req.user._id });
  return taskList.length === 0
    ? res.status(400).send({ message: "You have no assigned tasks" })
    : res.status(200).send({ taskList });
};

//Actualiza la tarea, pero solo puede actualizarse los estados
const updateTask = async (req, res) => {
  if (!req.body._id || !req.body.taskStatus)
    return res.status(400).send({ message: "Incomplete data" });

  const taskUpdate = await board.findByIdAndUpdate(req.body._id, {
    taskStatus: req.body.taskStatus,
  });

  return !taskUpdate
    ? res.status(400).send({ message: "Task not found" })
    : res.status(200).send({ message: "Task updated" });
};

//Elimina una tareas
const deleteTask = async (req, res) => {
  let taskImg = await board.findById({ _id: req.params["_id"] });

  taskImg = taskImg.imageUrl;
  //http://localhost:3001/uploads/1639154450.png
  //0. http:
  //1. 
  //2. localhost:3001
  //3. uploads
  //4. 1639154450.png
  taskImg = taskImg.split("/")[4];
  let serverImg = "./uploads/" + taskImg;
  //./uploads/1639154450.png

  //Busca por Id y elimina de la bd
  const taskDelete = await board.findByIdAndDelete({ _id: req.params["_id"] });
  if (!taskDelete) return res.status(400).send({ message: "Task not found" });

  try {
    //con la variable serverImg, elimina el archivo de la carpeta uploads
    //Con la funcion unlinkSync se elimina la imagen
    if (taskImg) fs.unlinkSync(serverImg);
    return res.status(200).send({ message: "Task deleted" });
  } catch (e) {
    console.log("Image no found in server");
  }
};

export default { saveTask, saveTaskImg, listTask, updateTask, deleteTask };
