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
    // simple create 
    const owner = await db.owner.create({
      name: 'Jasmin',
      age: 21
    })
    console.log(owner.name)
  } catch (error) {
    console.log(error)
  }
}

// creating()

// READ
async function reading() {
  try {
    const owners = await db.owner.findAll()
    owners.forEach(owner => {
      console.log(`${owner.name} is ${owner.age} years old`)
    })
    const william = await db.owner.findOne({
      where: {
        id: 2
      }
    })
    console.log(`found user ${william.name} with and id of ${william.id}`)
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

destroying()