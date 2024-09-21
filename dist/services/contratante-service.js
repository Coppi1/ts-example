"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContratanteService = void 0;
const contratante_model_1 = __importDefault(require("../models/contratante-model"));
class ContratanteService {
    createContratante(nomeCompleto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contratante = yield contratante_model_1.default.create({ nomeCompleto });
                return contratante;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Unable to create contratante: ${error.message}`);
                }
                else {
                    throw new Error("An unknown error occurred.");
                }
            }
        });
    }
    getAllContratantes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield contratante_model_1.default.findAll();
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Unable to fetch contratantes  ${error.message}`);
                }
                else {
                    throw new Error("An unknown error occurred.");
                }
            }
        });
    }
    getContratanteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield contratante_model_1.default.findByPk(id);
            }
            catch (error) {
                throw new Error(`Unable to fetch contratante`);
            }
        });
    }
    updateContratante(id, nomeCompleto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contratante = yield contratante_model_1.default.findByPk(id);
                if (contratante) {
                    contratante.nomeCompleto = nomeCompleto;
                    yield contratante.save();
                    return contratante;
                }
                return null;
            }
            catch (error) {
                throw new Error(`Unable to update contratante`);
            }
        });
    }
    deleteContratante(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contratante = yield contratante_model_1.default.findByPk(id);
                if (contratante) {
                    yield contratante.destroy();
                    return true;
                }
                return false;
            }
            catch (error) {
                throw new Error(`Unable to delete contratante`);
            }
        });
    }
}
exports.ContratanteService = ContratanteService;
