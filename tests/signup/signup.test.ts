import { test, expect } from '@playwright/test'

test.describe.configure({ mode: 'serial' })

test.describe('signup form tests', () => {
  test('signing up with new account works', async ({ page }) => {
    await page.goto('localhost:8080/signup')

    // Define new user details
    const newUser = {
      firstName: 'sarika',
      lastName: 'sari',
      email: 'sarika@example.com',
      password: 'test@123!'
    }

    const firstNameInput = page.locator('#firstName')
    const lastNameInput = page.locator('#lastName')
    const emailInput = page.locator('#email')
    const passwordInput = page.locator('#password')
    const signupButton = page.getByRole('button', { name: 'SUBMIT' })

    // Check if elements are visible before interaction
    await expect(firstNameInput).toBeVisible()
    await expect(lastNameInput).toBeVisible()
    await expect(emailInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(signupButton).toBeVisible()

    // Input user details
    await firstNameInput.pressSequentially(newUser.firstName)
    await lastNameInput.pressSequentially(newUser.lastName)
    await emailInput.pressSequentially(newUser.email)
    await passwordInput.pressSequentially(newUser.password)

    // Click on the signup button
    await signupButton.click()

    // Wait for 1 second until page is fully loaded
    await page.waitForTimeout(1000)
    // Wait for the Log out button to be visible, indicating successful signup
    await expect(page.getByText('Log out')).toBeVisible()

  })
})
