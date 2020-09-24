const request = require('supertest');
const server = require('../../api/app.js');
const bridgeModel = require('../../api/bridge/bridgeModel');

describe('GET /bridges', () => {
  it('should retrieve bridges and respond 200', async () => {
    const mockBridgeData = ['bridge1', 'bridge2', 'bridge3'];
    const mockGetAllBridges = jest
      .spyOn(bridgeModel, 'findAll')
      .mockImplementation(() => Promise.resolve(mockBridgeData));
    const res = await request(server).get('/bridges');
    expect(mockGetAllBridges).toHaveBeenCalled();
    expect(res.body).toEqual(expect.objectContaining(mockBridgeData));
    expect(res.status).toBe(200);
  });
  it('should retrieve bridges and respond 200', async () => {
    const mockGetAllBridges = jest
      .spyOn(bridgeModel, 'findAll')
      .mockImplementation(() => Promise.reject([]));
    const res = await request(server).get('/bridges');
    expect(mockGetAllBridges).toHaveBeenCalled();
    expect(res.status).toBe(500);
  });
});

describe('GET /bridges/:id', () => {
  it('should retrieve a bridge id', async () => {
    const mockGetById = jest
      .spyOn(bridgeModel, 'getBridgeById')
      .mockImplementation(() => Promise.resolve([6]));
    const res = await request(server).get('/bridges/6');
    expect(mockGetById).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });
  it('should retrieve a 404 for invalid bridge ids', async () => {
    const mockGetById = jest
      .spyOn(bridgeModel, 'getBridgeById')
      .mockImplementation(() => Promise.resolve([]));
    const res = await request(server).get('/bridges/6');
    expect(mockGetById).toHaveBeenCalled();
    expect(res.status).toBe(404);
  });
});
