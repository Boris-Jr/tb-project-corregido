//Verifica que el archivo subido sea de tipo imagen (png, jpg, jpeg, gif)
const upload = async (req, res, next) => {
  if (Object.keys(req.files).length === 0) {
    next();
  } else {
    //Existia una comparacion redundante
    // if (!req.files.image.name || !req.files.image.name) {
    if (!req.files.image.name) {
      next();
    } else {
      if (req.files.image.type) {
        //Valida que el tipo del archivo subido sea png, jpg, jpeg o gif
        const type = req.files.image.type;
        if (
          type !== "image/png" &&
          type !== "image/jpg" &&
          type !== "image/jpeg" &&
          type !== "image/gif"
        ) {
          return res.status(400).send({
            //si es diferente manda este mensaje
            message: "Invalid image format: only .png .jpg. jpeg .gif",
          });
        } else {
          next();
        }
      }
    }
  }
};

export default upload;
