import fs from "fs";
import path from "path";
import SequelizeMock from "sequelize-mock";
import request from "supertest";
import app from "../index";
import Client from "../models/Profile";
import sequelize from "./../shared/connection";

// Criando uma instância do mock do Sequelize
const mockDB = new SequelizeMock();

// Mockando o modelo 'Client'
const MockClient = mockDB.define("Client", {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  profession: "Developer",
  type: "Premium",
  balance: 100.0,
});

// Sobrescrevendo o método 'create' com o mock para evitar interação real com o banco de dados
jest.spyOn(Client, "create").mockResolvedValue(
  MockClient.build({
    id: 1,
    firstName: "John",
    lastName: "Doe",
    profession: "Developer",
    type: "Premium",
    balance: 100.0,
  })
);

describe("ClientController - Upload Client File", () => {
  // Before all tests, ensure Sequelize sync is complete
  beforeAll(async () => {
    await sequelize.sync(); // Certifique-se de que o banco de dados esteja sincronizado antes dos testes
  });

  // After all tests, close the Sequelize connection properly
  afterAll(async () => {
    await sequelize.close(); // Fecha a conexão com o banco de dados após todos os testes
  });

  // Teste com arquivo CSV
  it("should successfully upload and process a CSV file", async () => {
    const filePath = path.join(__dirname, "files", "test_clients.csv");

    if (!fs.existsSync(filePath)) {
      throw new Error(`O arquivo ${filePath} não foi encontrado!`);
    }

    const response = await request(app)
      .post("/client/upload")
      .attach("file", filePath); // Simula o upload do arquivo

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Clients imported successfully");
  });

  // Teste quando não há arquivo
  it("should return 400 if no file is uploaded", async () => {
    const response = await request(app).post("/client/upload");
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("No file uploaded");
  });

  it("should successfully upload and process a XLS file", async () => {
    const filePath = path.join(__dirname, "files", "test_clients.xlsx");

    if (!fs.existsSync(filePath)) {
      throw new Error(`O arquivo ${filePath} não foi encontrado!`);
    }

    const response = await request(app)
      .post("/client/upload")
      .attach("file", filePath); // Simula o upload do arquivo

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Clients imported successfully");
  });
});
