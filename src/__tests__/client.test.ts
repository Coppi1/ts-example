import SequelizeMock from "sequelize-mock";
import request from "supertest";
import app from "../index";
import Client from "../models/Profile";

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

// Sobrescrevendo os métodos Sequelize com mocks
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

jest.spyOn(Client, "findAll").mockResolvedValue([
  MockClient.build({
    id: 1,
    firstName: "John",
    lastName: "Doe",
    profession: "Developer",
    type: "Premium",
    balance: 100.0,
  }),
]);

jest.spyOn(Client, "findByPk").mockResolvedValue(
  MockClient.build({
    id: 1,
    firstName: "John",
    lastName: "Doe",
    profession: "Developer",
    type: "Premium",
    balance: 100.0,
  })
);

jest.spyOn(Client, "update").mockResolvedValue([1]);

jest.spyOn(Client, "destroy").mockResolvedValue(1);

jest.mock("../config/redisClient", () => {
  const RedisMock = require("ioredis-mock");
  return new RedisMock();
});

describe("Client Endpoints with Mock", () => {
  // Teste para criar um cliente
  //   it("should create a new client and cache it in Redis", async () => {
  //     const newClient = {
  //       firstName: "Jane",
  //       lastName: "Doe",
  //       profession: "Engineer",
  //       type: "Regular",
  //       balance: 200.0,
  //     };

  //     const response = await request(app).post("/clients").send(newClient);

  //     expect(response.status).toBe(201);
  //     expect(response.body.firstName).toBe("Jane");

  //     // Verifica o cache no Redis
  //     const cachedClient = await redisClient.get(
  //       `client:${newClient.firstName}:${newClient.lastName}`
  //     );

  //     expect(cachedClient).toBeTruthy(); // Verifica se não é null

  //     if (cachedClient) {
  //       const parsedClient = JSON.parse(cachedClient);
  //       expect(parsedClient.firstName).toBe("Jane");
  //     }
  //   });

  //   // Teste para buscar todos os clientes
  //   it("should get all clients", async () => {
  //     const res = await request(app).get("/clients");

  //     expect(res.status).toBe(200);
  //     expect(Array.isArray(res.body)).toBeTruthy();
  //     expect(res.body[0].firstName).toBe("John");
  //   });

  //   // Teste para buscar um cliente pelo ID
  //   it("should get a client by ID", async () => {
  //     const res = await request(app).get("/client/1");

  //     expect(res.status).toBe(200);
  //     expect(res.body).toHaveProperty("id", 1);
  //   });

  // Teste para atualizar um cliente
  it("should update a client", async () => {
    const res = await request(app).put("/client/1").send({
      firstName: "Jane",
      lastName: "Doe",
      profession: "Designer",
      type: "Individual",
      balance: 1200,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("updated", true);
  });

  // Teste para deletar um cliente
  //   it("should delete a client", async () => {
  //     const res = await request(app).delete("/client/2");

  //     expect(res.status).toBe(204);
  //   });
});
