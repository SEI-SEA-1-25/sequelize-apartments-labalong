/**
 * a space for your code along notes 👾
 */
const db = require('./models')
const { Op } = require('sequelize')

// CREATE
// create()
// findOrCreate()
// addModelName()
async function creating() {
  try {
  // simple create
  //   const newOwner = await db.owner.create({
  //     name: 'William',
  //     age: 27
  // })
  // console.log(newOwner)

  // find or create
  const [owner, created] = await db.owner.findOrCreate({
    where: {
      name: 'Jane'
    }, 
    defaults: {
      age: 23
    }
  })
  if(created === true) console.log(`${owner.name} was created!`)

  // query otions:
  const options = {
    where: {
      name: 'Mesa Verde'
    }, 
    defaults: {
      units: 50
    }
  }
  // creating a property
  const [property, propCreated] = await db.property.findOrCreate(options)
  if(propCreated === true) console.log(`${property.name} was created!`)

  // adding the property to the owner:
  await owner.addProperty(property)

  // check to see if the property was added:
  const properties = await owner.getProperties()
  properties.forEach(property => {
    console.log(`owner ${owner.name} owns property ${property.name}!`)
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
  
  // need to include the properties model to create this way
  const createOptions = { include: [db.property] }

  // create an owner with propers all at once!
  const createdOwner = await db.owner.create(newOwner, createOptions)
  
  // check to see if the property was added when the new owner was created:
  const propCheck = await createdOwner.getProperties()
  propCheck.forEach(property => {
    console.log(`owner ${createdOwner.name} owns property ${property.name}!`)
  })

  } catch (error) {
    console.log(error)
  }
}

creating()

// READ
// findAll()
// findOne()
// findByPk()
async function reading() {
  try {
    // findOne
    const options = {
      where: {
        name: 'Jane' 
      }
    }

    const owner = await db.owner.findOne(options)
    console.log(owner.name)

    // findAll
    const allOwners = await db.owner.findAll()

    // findAll with options
    const queryOptions = {
      where: {
        id: {
          [Op.gt]: 4
        }
      },
      order: [
        ['age', 'DESC']
      ],
      limit: 3,
    }
    const owners = await db.owner.findAll(queryOptions)
    owners.forEach(owner => {
      console.log(owner.name, owner.age)
    })

    // eager loading
    const eagerOwner = await db.owner.findOne({
      where: {
        name: 'Jane'
      },
      include: [db.property]
    })

    // eagerOwner.properties.forEach(property => {
    //   console.log(`${eagerOwner.name} ownes ${property.name}`)
    // })

  } catch (error) {
    console.log(error)
  }
}

// reading()

// UPDATE
async function updating() {
  try {
      // Returns a value of how many rows were altered by this update
  const numRowsChanged = await db.owner.update({ name: 'Janet' }, {
    where: {
      name: 'Jane'
    }
  })
  console.log(numRowsChanged)
  } catch (error) {
    console.log(error)
  }
}

// updating()

// DESTROY

async function destroying() {
  try {
      // Returns a value of how many rows were altered by this update
  const numRowsChanged = await db.owner.destroy({
    where: {
      name: 'Jane'
    }
  })
  console.log(numRowsChanged)
  } catch (error) {
    console.log(error)
  }
}

// destroying()
