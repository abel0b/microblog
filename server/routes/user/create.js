import bcrypt from 'bcrypt'
import auth from '../../middlewares/auth'

const route = {
    method: 'POST',
    url: '/users',
    schema: {
        body: {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 16
                },
                email: {
                    type: 'string',
                    minLength: 5,
                    maxLength: 64
                },
                password: {
                    type: 'string',
                    minLength: 8,
                    maxLength: 32
                }
            }
        }
    },
    preHandler: auth,
    async handler(request, reply) {
        const users = this.mongo.db.collection('users')
        const user = await users.insertOne({
            username: request.body.username,
            name: request.body.username,
            email: request.body.email,
            passwordHash: await bcrypt.hash(request.body.password, 10),
            created_at: new Date()
        })
        return user
    }
}

export default route
