import {
  expect,
  test,
} from '@playwright/test'

test.describe('registry', () => {
  test('should fetch the root registry', async ({ request }) => {
    const response = await request.get(`/r/registry.json`)
    expect(response.ok()).toBeTruthy()
  })

  test('should fetch a registry item', async ({ request }) => {
    const response = await request.get(`/r/preact-example-bold.json`)
    expect(response.ok()).toBeTruthy()
  })

  test('should return 404 for a non-existent registry item', async ({ request }) => {
    const response = await request.get(`/r/not-exist-registry-item.json`)
    expect(response.ok()).toBeFalsy()
    expect(response.status()).toBe(404)
  })
})
