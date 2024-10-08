import request from 'supertest';
import app from '../index';

describe('Testes model Client', () => { //conjunto de testes


 it('Deve retornar a lista de todos os clientes', async () => {
  const res = await request(app).get('/clients');
  
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBeGreaterThanOrEqual(0); // Confirma se retorna um array
});

 it('Deve criar um novo cliente', async () => {
  const newClient = {
    firstName: 'John',
    lastName: 'Doe',
    profession: 'Engineer',
    type: 'Premium',
    balance: 100.50,
  };

  const res = await request(app)
    .post('/client')
    .send(newClient);
  
  expect(res.status).toBe(201); // Sucesso na criação
  expect(res.body).toHaveProperty('id'); // Deve conter um ID gerado
  expect(res.body.firstName).toBe(newClient.firstName);
  expect(res.body.lastName).toBe(newClient.lastName);
 });

 it('Deve retornar um cliente pelo ID', async () => {
  const clientId = 1; // Assumindo que o ID 1 existe no banco de dados

  const res = await request(app).get(`/client/${clientId}`);

  expect(res.status).toBe(200); // Sucesso na consulta
  expect(res.body).toHaveProperty('id', clientId); // Deve retornar o cliente com o ID correto
  expect(res.body).toHaveProperty('firstName'); // Verifica se contém o campo firstName
 });

 it('Deve retornar 404 se o cliente não for encontrado', async () => {
   const nonExistingClientId = 9999;

   const res = await request(app).get(`/client/${nonExistingClientId}`);

   expect(res.status).toBe(404); // Cliente não encontrado
   expect(res.body).toHaveProperty('message', 'Client not found');
 });

});