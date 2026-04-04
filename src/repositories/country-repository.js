import { CountryModel } from "../models/country-model.js";

class CountryRepository {
    constructor(model) {
        this.model = model;
    }

    getById = async (id) => {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    }

}

export const countryRepository = new CountryRepository(CountryModel);