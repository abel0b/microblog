import bcrypt from 'bcrypt'

const route = {
    method: 'POST',
    url: '/auth/login',
    schema: {
        body: {
            type: 'object',
            properties: {
                username: {
                    type: 'string'
                },
                password: {
                    type: 'string'
                }
            },
            required: [
                'username',
                'password'
            ]
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    token: {
                        type: 'string'
                    },
                    user: {
                        type: 'object',
                        properties: {
                            _id: {
                                type: 'string'
                            },
                            username: {
                                type: 'string'
                            },
                            bio: {
                                type: 'string'
                            },
                            name: {
                                type: 'string'
                            },
                            email: {
                                type: 'string'
                            }
                        }
                    }
                }
            }
        }
    },
    async handler(request, reply) {
        const users = this.mongo.db.collection('users')
        const user = await users.findOne({
            username: request.body.username
        })
        if (
            !user
            || !(await bcrypt.compare(request.body.password, user.passwordHash))
        ) {
            reply.code(400)
            return {
                code: 400,
                message: "Invalid credentials"
            }
        }
        return {
            token: this.jwt.sign({ iss: user._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 }),
            user: {
                _id: user._id,
                username: user.username,
                name: user.name,
                bio: user.bio,
                email: user.email,
            }
        }
    }
}

export default route
