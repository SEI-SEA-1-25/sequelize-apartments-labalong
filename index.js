/**
 * a space for your code along notes 👾
 */
const db = require('./models')
/*
owners:
sequelize model:generate --name=owner --attributes name:text,age:integer
properties:
sequelize model:generate --name=property --attributes ownerId:integer,name:text,units:integer
*/

// CREATE
async function creating() {
    try {
    //simple create
    // const owner = await db.owner.create({
    //     name: 'Jasmin',
    //     age: 21
    // })
    // console.log(owner)

    //findOrCreate 

    //search option
    const options = {
        where: { name: 'Jane' }, 
        defualts: { age: 35 }
    }

    // array destructuring syntax
    const [owner, created] = await db.owner.findOrCreate(options)
    if(created === true) console.log(`${owner.name} was created!`)

    const propertyOptions = {
        where: { name: 'Mesa Verde' },
        defaults: { units: 1000 } 
    }

    // array destructuring is variables
    const[property, propertyCreated] = await db.property.findOrCreate(propertyOptions)
    if(propertyCreated === true) console.log(`${property.name} was created!`)

    await owner.addProperty(property)

    const foundProperties = await owner.getProperties()

    const newOwner = {
        name: 'The Hulk',
        age: '70',
        properties: [{
          name: 'Some Apartments',
          units: 45
        }]
      }

    const createdOwner = await db.owner.create(newOwner, { include: [db.property] })
    
    console.log(createdOwner.name)

    const createdOwnerProps = await owner.getProperties()


    } catch (error) {
      console.log(error);
    }
}
// creating()


// READ
async function reading() {
    try {
    // const owners = await db.owner.findAll()
    // owners.forEach(owner => {
    //     console.log(`${owner.name} is ${owner.age} years old`)
    // })
    // const William = await db.owner.findOne({
    //     where: {
    //         name: 'William'
    //     }
    // })
    // console.log(`found user ${William.name} with and id of ${William.id}`)

    const owners = await db.owner.findAll({ include: db.property})
    owners.forEach(owner => {
        owner.properties.forEach(property => {
            // console.log(`${owner.name} owns ${property.name}`)
        })
    })
    } catch(error) {
        console.log(error)
    }
}
reading()


// UPDATE
async function updating() {
    try {
    const numRowsUpdated = await db.owner.update({
        name: 'Bill'
    }, {
        where: {
            name: 'William'
        }
    })
    console.log(numRowsUpdated)
    } catch(error) {
        console.log(error)
    }
}

// updating()

// DESTROY
async function destroying() {
    try {
    const numOwnersDestroyed = await db.owner.destroy({
        where: {
            id: 2
        }
    }) 
    console.log(numOwnersDestroyed)
    } catch(error) {
        console.log(error)
    }
}

// destroying()

