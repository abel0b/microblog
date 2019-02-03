import bcrypt from 'bcrypt'
import auth from '../../middlewares/auth'

const route = {
    method: 'PATCH',
    url: '/users/:id',
    schema: {
        body: {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 16
                },
                bio: {
                    type: 'string',
                    maxLength: 256
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
        if (request.user._id != request.params.id) {
            reply.code(500).send('Unauthorized')
        }
        const users = this.mongo.db.collection('users')
        const user = await users.updateOne(
            { _id: request.params._id },
            {
                $set: {
                    username: request.body.username,
                    name: request.body.username,
                    email: request.body.email,
                    bio: request.body.bio
                }
            }
        )
        return user
    }
}

export default route
