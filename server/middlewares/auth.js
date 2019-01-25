export default async function (request, reply) {
    if (request.user == null) {
        reply.status(500).send('unauthorized')
    }
}
