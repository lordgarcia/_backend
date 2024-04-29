const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // Defina as roles conforme necessário
  region: {type: String, required: true},
  name: {type: String},
  lastName: {type: String},
  phoneNumber: {type: String},
  profileImage: { type: String } 
});

// Antes de salvar, faça o hash da senha usando bcrypt
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
