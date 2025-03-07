import User from '#models/user';
export default class AuthController {
    async register({ request, response }) {
        const { fullName, email, password } = request.only(['fullName', 'email', 'password']);
        const user = await User.create({ fullName, email, password });
        const token = await User.accessTokens.create(user);
        return response.ok({
            message: 'User registered successfully',
            token: token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    }
}
//# sourceMappingURL=auth_controller.js.map