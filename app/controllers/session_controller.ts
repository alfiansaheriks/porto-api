import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  public async store({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      // Verify user credentials
      const user = await User.verifyCredentials(email, password)

      if (!user) {
        return response.unauthorized({ message: 'Invalid credentials' })
      }

      // Generate token
      const token = await User.accessTokens.create(user)

      // Return token and user information
      return response.ok({
        message: 'Login successful',
        token: token,
        user: {
          id: user.id,
          email: user.email,
        },
      })
    } catch (error) {
      return response.internalServerError({ message: 'An error occurred', error: error.message })
    }
  }
  }
