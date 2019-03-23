const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    min: [4, 'Too short, max is 4 characaters'],
    max: [32, 'Too long, max is 32 characaters']
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  token: String,
  rentals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rental'
  }]
}, {
  timestamps: true,
  toObject: {
    // remove `hashedPassword` field when we call `.toObject`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
})

module.exports = mongoose.model('User', userSchema)
