import User from '#models/user';
export default class SessionController {
    async store({ request, response, auth }) {
        const { email, password } = request.only(['email', 'password']);
        try {
            const user = await User.verifyCredentials(email, password);
            if (!user) {
                return response.unauthorized({ message: 'Invalid credentials' });
            }
            const token = await User.accessTokens.create(user);
            return response.ok({
                message: 'Login successful',
                token: token,
                user: {
                    id: user.id,
                    email: user.email,
                },
            });
        }
        catch (error) {
            return response.internalServerError({ message: 'An error occurred', error: error.message });
        }
    }
}
//# sourceMappingURL=session_controller.js.map