import mongoose from "mongoose";
import bcrypt from "bcrypt";

// how strong the hash should be
const SALT_ROUNDS = 10;

const usersSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    maxLength: 15,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 50,
    required: true,
  },
  age: {
    type: Number,
    min: 13,
    max: 120,
  },
  channel: {
    type: String,
  },
});

//======================= INDEX ====
// creating an index to organize data to find it easier
usersSchema.index({ username: 1 });
usersSchema.index({ email: 1 });

//======================= Bcrypt =====
// creating a password hash pre save hook
usersSchema.pre("save", async function (next) {
  // if the password has not been modified
  if (!this.isModified("password")) return next();

  //if the pass has been changed
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

export default mongoose.model("User", usersSchema);
