const route = {
    method: 'GET',
    url: '/users/:username',
    schema: {
        params: {
            username: {
                type: 'string'
            }
        },
        response: {
            200: {
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
                    }
                }
            }
        }
    },
    async handler(request, reply) {
        const users = this.mongo.db.collection('users')
        const user = await users.findOne({username: request.params.username})
        return {
            _id: user._id,
            username: user.username,
            bio: user.bio,
            name: user.name,
        }
    }
}

export default route
