const request = require('supertest');
const express = require("express");
// Full app so we can test the 404
const server = require("../../api/app.js");

describe('index router endpoints', () =>{
  beforeAll(() => {
    
  });

  describe('GET /', () =>{
    it('should return json with api:up', async () =>{
      const res = await request(server).get("/");

      expect(res.status).toBe(200);
      expect(res.body.api).toBe("up");
    })

    it('should return 404 for /ping', async () =>{
      const res = await request(server).get("/ping");

      expect(res.status).toBe(404);
      expect(res.body.error).toMatch(/Route '\/ping' Not Found\./);
    })
  });
});