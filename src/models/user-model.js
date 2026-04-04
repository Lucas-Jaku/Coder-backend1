import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const UserSchema = new Schema({
  first_name: { type: String, required: true, index: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  country: [
    {
      type: Schema.Types.ObjectId,
      ref: 'country',
      default: []
    }
  ]
});

UserSchema.pre('find', function(){
  this.populate("country");
})

UserSchema.plugin(mongoosePaginate)

export const UserModel = model("users", UserSchema);

