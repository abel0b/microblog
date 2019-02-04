import users from "./users"
import posts from "./posts"
import {MongoClient} from "mongodb"

async function seed() {
    const client = new MongoClient((process.env.NODE_ENV === "production") ? "mongodb://database:27017/microblog" : "mongodb://localhost:27017/microblog", { useNewUrlParser: true })
    await client.connect()
    const db = client.db("microblog")

    const users_data = users(db)
    const posts_data = posts(db, users_data) 

    await Promise.all([
        users_data,
        posts_data
    ])

    await client.close()
}

seed().catch(e => { console.log("error: ",e) })
