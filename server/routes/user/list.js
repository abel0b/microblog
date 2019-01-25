import auth from "../../middlewares/auth"

const route = {
    method: 'GET',
    url: '/users',
    schema: {
        querystring: {
            page: {
                type: 'integer',
                default: 1
            }
        }
    },
    preHandler: auth,
    async handler(request, reply) {
        const users = this.mongo.db.collection('users')
        const cursor = await users
            .find({})
            .sort({
                date: -1
            })
            .limit(10)
            .skip((request.query.page - 1) * 10)

        return {
            data: await cursor.toArray(),
            total: (await cursor.count()) / 10
        }
    }
}

export default route
