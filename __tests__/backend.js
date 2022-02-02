const request = require('supertest');
const server = 'http://localhost:3000';
const fs = require('fs');
const path = require('path');
const { doesNotMatch } = require('assert');
const req = require('express/lib/request');
const { assert } = require('console');

describe('Route integration', () => {
    describe('/home', () => {
      describe('GET', () => {
        
        it('responds with 200 status and application/json content type', () => {
          return request(server)
            .get('/home')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200);
        });
      });

    });
})

describe('Route integration', () => {
    describe('/chatroom', () => {
      describe('GET', () => {
        
        it('responds with 200 status and application/json content type', () => {
          return request(server)
            .get('/chatroom')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200);
        });
      });

    });
})