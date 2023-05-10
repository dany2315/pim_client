import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const { Schema } = mongoose;
const userSchema = new Schema({
    identifiant:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    }
});

//middelware si fonftion .save()est appeler dans une instance du model User 
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  });

//la fonction de l'instance User pour comparer le mot de passe 
//recue avec le mot de passe hashe enregistrer dans la base de donner 
//ex: user.comparepassword(password)
userSchema.methods.comparePassword = async function(password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw new Error(error);
    }
  };



const User = mongoose.model('User', userSchema);

export default User