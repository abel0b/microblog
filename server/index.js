import fastify from "fastify"
import path from "path"
import fastifyStatic from "fastify-static"
import fastifyMongo from "fastify-mongodb"
import fastifyJwt from "fastify-jwt"
import fs from "fs"
import cors from "fastify-cors"
import routes from "./routes"

let app
const pth = path.join(__dirname, "../dist/index.html")

async function boot() {
    app = fastify({
        logger: true
    })
    app.register(cors, {
        origin: (process.env.NODE_ENV === "production")? "http://microblog.adnt.fr" : "http://localhost:8080"
    })
    app.register(fastifyMongo, {
        forceClose: true,
        url: (process.env.NODE_ENV === "production") ? "mongodb://database:27017/microblog" : "mongodb://localhost:27017/microblog"
    })
    app.register(fastifyStatic, {
        prefix: "/static",
        root: path.join(__dirname, "../dist")
    })
    app.register(fastifyJwt, {
        secret: "secret"
    })
    app.decorateRequest("user", null)

    app.addHook("onRequest", async function (request, reply) {
        try {
            const payload = await request.jwtVerify()
            const users = this.mongo.db.collection("users")
            request.user = await users.findOne({ _id: this.mongo.ObjectId(payload.iss) })
        }
        catch(e) {}
    })

    for(let route of routes) {
        app.route(route)
    }

    app.log.info("Successfully connected to database")
    app.get("/*", async (request, reply) => {
        const stream = fs.createReadStream(pth)
        reply.type("text/html").send(stream)
    })
    await app.listen(8080, "0.0.0.0")
}

boot()
    .catch(e => {
        app.log.error(e)
        process.exit(1)
    })
