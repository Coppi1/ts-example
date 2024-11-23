import request from 'supertest';
import app from '../index'; 
import path from 'path';

describe('ClientController - Upload Client File', () => {

  //caso válido
  it('should successfully upload and process a CSV file', async () => {
    const filePath = path.join(__dirname, 'files', 'test_clients.xls'); 

    const response = await request(app)
      .post('/client/upload')
      .attach('file', filePath);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Clients imported successfully');
  });

  //caso inválido
  it('should return 400 if no file is uploaded', async () => {
    const response = await request(app)
      .post('/client/upload');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('No file uploaded');
  });

  //caso inválido
  it('should return 400 for unsupported file format', async () => {
    const filePath = path.join(__dirname, 'files', 'test_clients.txt'); 

    const response = await request(app)
      .post('/client/upload')
      .attach('file', filePath);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Unsupported file format');
  });
});
