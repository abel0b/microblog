const route = {
    method: 'GET',
    url: '/posts',
    schema: {
        querystring: {
            page: {
                type: 'integer',
                default: 1
            },
            parent: {
                type: 'string',
                default: null
            },
            author: {
                type: 'string',
                default: null
            },
            reverse: {
                type: 'boolean',
                default: false
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    data: {
                        type: 'array',
                        items: {
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
                                body: {
                                    type: 'string'
                                }
                            }
                        }
                    },
                    total: {
                        type: 'integer'
                    }
                }
            }
        }
    },
    async handler(request, reply) {
        const posts = this.mongo.db.collection('posts')
        const users = this.mongo.db.collection('users')
        const projection = {
            _id: 1,
            author: 1,
            created_at: 1,
            nbresponses: 1,
            body: 1
        }

        const query = { parent: null }
        if (request.query.author) {
            query.author = this.mongo.ObjectId(request.query.author)
        }

        if (request.query.parent)
            query.parent = this.mongo.ObjectId(request.query.parent)

        const cursor = await posts
            .find(query, {
                projection,
                sort: {
                    created_at: (request.query.reverse)? 1 : -1
                },
                limit: 10,
                skip: (request.query.page - 1) * 10
            })

        const posts_data = await cursor.toArray()

        let users_data = []

        for (let post of posts_data) {
            users_data.push(users.findOne({ _id: post.author }))
        }

        users_data = await Promise.all(users_data)

        for(let i=0; i<users_data.length; i++) {
            posts_data[i].author = users_data[i]
        }

        return {
            data: posts_data,
            total: Math.ceil((await cursor.count()) / 10)
        }
    }
}

export default route
