/**
 * a space for your code along notes 👾
 */
const banana = require('./models')
/*
owners:
sequelize model:generate --name=owner --attributes name:text,age:integer
properties:
sequelize model:generate --name=property --attributes ownerId:integer,name:text,units:integer
*/

// CREATE

async function creating() {
  try {
    // simple create 
    // const owner = await db.owner.create({
    //   name: 'Jasmin',
    //   age: 21
    // })

    // search options
    const options = {
      where: { name: 'Jane' }, 
      defualts: { age: 35 }
    }

    // array destructuring syntax
    const [owner, created] = await db.owner.findOrCreate(options)
    if(created === true) console.log(`${owner.name} was created!`)

    const propertyOptions = {
      where: {  name: 'Mesa Verde' },
      defaults: { units: 1000 }
    }
    // array destructuring is variables
    const [property, whatever] = await db.property.findOrCreate(propertyOptions)
    if(whatever === true) console.log(`${property.name} was created!`)

    await owner.addProperty(property)

    const foundProperties = await owner.getProperties()
    // console.log(foundProperties)

    // new owner to create
    const newOwner = {
      name: 'Jack',
      age: 70,
    }

    // create out owner
    const createdOwner = await db.owner.create(newOwner)

    // use the created owner's own method to add a property
    await createdOwner.createProperty({
      name: 'New Apartments',
      units: 45
    })

  // create with associations and eager loading
  const newOwner = {
    name: 'The Hulk',
    age: '70',
    properties: [{
      name: 'Some Apartments',
      units: 45
    }]
  }
  
  // bug: create() needs to know about the property model from the include
  // like when you read an owner and all thier properties
  const createdOwner = await db.owner.create(newOwner, { include: [db.property] })
  
  // check to see if the property was added when the new owner was created:
  const propCheck = await createdOwner.getProperties()
  propCheck.forEach(property => {
    console.log(`owner ${createdOwner.name} owns property ${property.name}!`)
  })


  } catch (error) {
    console.log(error)
  }
}

// creating()

// READ
async function reading() {
  try {
    // const owners = await db.owner.findAll()
    // owners.forEach(owner => {
    //   console.log(`${owner.name} is ${owner.age} years old`)
    // })
    // const william = await db.owner.findOne({
    //   where: {
    //     id: 2
    //   }
    // })
    // console.log(`found user ${william.name} with and id of ${william.id}`)
    const owners = await db.owner.findAll({ include: db.property })
    owners.forEach(owner => {
      owner.properties.forEach(property => {
        console.log(property)
        // console.log(`${owner.name} owns ${property.name}`)
      })
    })
    // console.log(owners)
  } catch(error) {
    console.log(error)
  }
}

// reading()
// UPDATE
async function updating() {
  try {
    const numRowsUpdated = await db.owner.update({
      name: "William"
    }, {
      where: {
        name: "Bill"
      }
    })

    console.log(numRowsUpdated)
  } catch (error) {
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
  } catch (error) {
    console.log(error)
  }
}

// destroying()