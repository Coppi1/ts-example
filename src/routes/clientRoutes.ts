import { Router } from "express";
import { ClientController } from "../controllers/clientController";
import multer from "multer";
import path from 'path';

// Configuração de armazenamento para o multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Pasta onde o arquivo será armazenado
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único para o arquivo
  }
});

// Inicialização do multer com o storage configurado
const upload = multer({ storage: storage });

const router = Router();
const clientController = new ClientController();

router.post("/client", (req, res) => clientController.createClient(req, res));
router.get("/clients", (req, res) => clientController.getAllClients(req, res));
router.get("/client/:id", (req, res) =>
  clientController.getClientById(req, res)
);
router.put("/client/:id", (req, res) =>
  clientController.updateClient(req, res)
);
router.delete("/client/:id", (req, res) =>
  clientController.deleteClient(req, res)
);

router.get("/clients/:id/balance", (req, res) =>
  clientController.getClientBalance(req, res)
);

// Corrigido para aplicar o upload de arquivos
router.post("/client/upload", upload.single("file"), (req, res) =>
  clientController.uploadClientFile(req, res)
);


export default router;
