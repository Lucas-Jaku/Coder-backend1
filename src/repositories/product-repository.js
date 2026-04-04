import ProductModel from "../models/product-model.js";

class ProductRepository {
    constructor() {
        this.model = ProductModel;
    }

    getAll = async (page = 1, limit = 10) => {
        try {
            
            if (this.model.paginate) {
                return await this.model.paginate({}, { page, limit });
            }
            
            return await this.model.find().skip((page - 1) * limit).limit(limit);
        } catch (error) {
            throw new Error(error.message);
        }
    };

    getById = async (id) => {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(error.message);
        }
    };

    create = async (body) => {
        try {
            return await this.model.create(body);
        } catch (error) {
            throw new Error(error.message);
        }
    };

    update = async (id, body) => {
        try {
            return await this.model.findByIdAndUpdate(id, body, { new: true });
        } catch (error) {
            throw new Error(error.message);
        }
    };

    delete = async (id) => {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error.message);
        }
    };
}

export default new ProductRepository();