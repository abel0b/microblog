const route = {
    method: 'GET',
    url: '/posts/:id',
    async handler(request, reply) {
        const posts = this.mongo.db.collection('posts')
        const post = await posts.findOne({_id: this.mongo.ObjectId(request.params.id)})
        if (!post.published && !request.user) {
            reply.status(500).send('UNAUTHORIZED')
        }
        return post
    }
}

export default route
