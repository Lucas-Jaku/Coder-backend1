import { UserModel } from "../models/user-model.js";
import { countryRepository } from "./country-repository.js";


class UserRepository {
  constructor(model) {
    this.model = model;
  }

  getById = async (id) => {
    try {
      return await this.model.findById(id).populate("country");  //propiedad a popular
      // .explain(); 
    } catch (error) {
      throw new Error(error);
    }
  };
  create = async (body) => {
    try {
      return await this.model.create(body); //insertOne
    } catch (error) {
      throw new Error(error);
    }
  };
  update = async (id, body) => {
    try {
      return await this.model.findByIdAndUpdate(id, body, { new: true }); //updateOne $set
    } catch (error) {
      throw new Error(error);
    }
  };
  delete = async (id) => {
    try {
      return await this.model.findByIdAndDelete(id); //deleteOne
    } catch (error) {
      throw new Error(error);
    }
  };

  addCountryToUser = async (userId, countryId) => {
    try {
      const country = await countryRepository.getById(countryId);
      if (!country) throw new Error("País no encontrado");
      const user = await this.getById(userId);
      if (!user) throw new Error("Usuario no encontrado");
      return await this.model.findByIdAndUpdate(
        userId,
        { $push: { country: countryId } },
        { returnDocument: true }
      )
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const userRepository = new UserRepository(UserModel);