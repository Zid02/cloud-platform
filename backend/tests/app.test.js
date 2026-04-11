const request = require('supertest');
const app = require('../src/app');

describe('GET /api/health', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterAll(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('environment');
  });

  it('returns dev environment when NODE_ENV is not set', async () => {
    delete process.env.NODE_ENV;
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('environment', 'dev');
  });

  it('returns current NODE_ENV when set', async () => {
    process.env.NODE_ENV = 'test-ci';
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('environment', 'test-ci');
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
