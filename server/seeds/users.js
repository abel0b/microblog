import faker from 'faker'
import bcrypt from 'bcrypt'

async function seed(db) {
    const collinfo = await db.listCollections({ name: 'users' }).toArray()
    if (collinfo.length === 0) {
        await db.createCollection('users')
    }

    const users = db.collection('users')
    await users.drop()
    const inserted = []
    const passwordHash = await bcrypt.hash('a', 1)

    inserted.push(users.insertOne({
        username: 'admin',
        name: faker.name.firstName(),
        email: 'admin@admin.admin',
        created_at: new Date(),
        role: 'admin',
        passwordHash
    }))

    for (let i = 0; i < 30; i++) {
        inserted.push(users.insertOne({
            username: faker.internet.userName(),
            name: faker.name.firstName(),
            email: faker.internet.email(),
            created_at: new Date(),
            role: 'user',
            passwordHash
        }))
    }
    await Promise.all(inserted)
}

export default seed
