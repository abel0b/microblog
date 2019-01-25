import auth from "../../middlewares/auth"

const route = {
    method: 'POST',
    url: '/posts',
    schema: {
        body: {
            type: 'object',
            properties: {
                body: {
                    type: 'string'
                },
                parent: {
                    type: 'string',
                    default: null
                }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string'
                    },
                    created_at: {
                        type: 'string'
                    },
                    nbresponses: {
                        type: 'integer'
                    },
                    author: {
                        type: 'object',
                        properties: {
                            _id: {
                                type: 'string'
                            },
                            name: {
                                type: 'string'
                            },
                            username: {
                                type: 'string'
                            }
                        }
                    },
                    parent: {
                        type: 'string'
                    },
                    body: {
                        type: 'string'
                    }
                }
            }
        }
    },
    preHandler: auth,
    async handler(request, reply) {
        const posts = this.mongo.db.collection('posts')
        if (request.body.parent !== "") {
            await posts.updateOne(
                {_id: this.mongo.ObjectId(request.body.parent)},
                {
                    $inc: {nbresponses: 1}
                }
            )
        }

        const post = {
            body: request.body.body,
            author: request.user._id,
            created_at: new Date(),
            parent: (request.body.parent != "") ? this.mongo.ObjectId(request.body.parent) : null
        }

        const command = await posts.insertOne(post)

        return {
            _id: command.insertedId,
            ...post,
            author: {
                _id: request.user._id,
                name: request.user.name,
                username: request.user.username,
            }
        }
    }
}

export default route
