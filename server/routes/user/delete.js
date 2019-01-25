import auth from "../../middlewares/auth"

const route = {
    method: 'DELETE',
    url: '/users/:id',
    preHandler: auth,
    async handler(request, reply) {
        const users = this.mongo.db.collection('users')
        // TODO
    }
}

export default route
