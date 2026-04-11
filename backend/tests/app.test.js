const request = require('supertest');
const app = require('../src/app');

describe('GET /api/health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('environment');
  });
});

describe('GET /api/hello', () => {
  it('returns 200 with expected message', async () => {
    const res = await request(app).get('/api/hello');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Hello from cloud-platform backend');
  });
});

describe('unknown route', () => {
  it('returns 404', async () => {
    const res = await request(app).get('/api/doesnotexist');
    expect(res.status).toBe(404);
  });
});
