import faker from 'faker'
import {ObjectId} from 'mongodb'

async function seed(db, users_data) {
    const collinfo = await db.listCollections({ name: 'posts' }).toArray()
    if (collinfo.length === 0) {
        await db.createCollection('posts')
    }
    
    const posts = db.collection('posts')
    await posts.drop()
    
    let tasks = []
    
    await users_data

    const users = await db.collection('users').aggregate([{ $sample: { size: 10 } }]).toArray()

    for (let i = 0; i < 50; i++) {
        tasks.push(posts.insertOne({
            body: faker.lorem.sentence(faker.random.number({min:10,max:35})),
            author: users[i%10]._id,
            created_at: new Date(),
            nbresponses: 0,
            parent: null
        }))
    }

    tasks = await Promise.all(tasks)

    for (let i = 0; i < 200; i++) {
        const parent = ObjectId(tasks[faker.random.number({ min: 0, max: 49 })].insertedId)
        tasks.push(posts.insertOne({
            body: faker.lorem.sentence(faker.random.number({min:10,max:35})),
            author: ObjectId(users[i % 10]._id),
            created_at: new Date(),
            nbresponses: 0,
            parent: parent
        }))
        tasks.push(
            await posts.updateOne(
                {_id: parent},
                {
                    $inc: { nbresponses: 1 }
                }
            )
        )
    }

    await Promise.all(tasks)
}

export default seed
