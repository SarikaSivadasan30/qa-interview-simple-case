import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'

test.describe.configure({ mode: 'serial' })

test.describe('login form tests', () => {
  test('logging in works with existing account', async ({ page }) => {
    await page.goto('localhost:8080/login')

    const existingUser = existingUsers[0]

    const emailInput = page.locator('#email')
    const passwordInput = page.locator('#password')
    const loginButton = page.getByRole('button', { name: 'LOGIN' })

    // Check if elements are visible before interaction
    await expect(emailInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(loginButton).toBeVisible()

    // Input email and password
    await emailInput.pressSequentially(existingUser.email)
    await passwordInput.pressSequentially(existingUser.password)

    // Click on the login button
    await loginButton.click()

    // Wait for 1 second until page is fully loaded
    await page.waitForTimeout(1000)
    // Wait for the Log out button to be visible
    await expect(page.getByText('Log out')).toBeVisible()
  })
})
