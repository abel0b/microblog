import auth from "../../middlewares/auth"

const route = {
    method: 'DELETE',
    url: '/posts/:id',
    preHandler: auth,
    async handler(request, reply) {
        const posts = this.mongo.db.collection('posts')
        // TODO
    }
}

export default route
