import { RESTDataSource } from 'apollo-datasource-rest';
import pkg from 'lodash';
const { _ } = pkg;
import dotenv from 'dotenv'
dotenv.config({ silent: true })
// const RestDataSource = require('apollo-datasource-rest');
// import { Response } from 'apollo-server-env';

class Base extends RESTDataSource {
    path;
    constructor(baseUrl) {
        super();
        this.initialize({});
        this.baseURL = baseUrl;
    }
    // setting path for api
    _(path) {
        this.path = path;
        return this;
    }
    async getAll() {
        return await this.get(`${this.path}`);
    }
    async getOne(id) {
        return await this.get(`${this.path}/${id}`)
    }
    async getAllById(id) {
        return await this.get(`${this.path}/${id}`)
    }
    async create(data) {
        return await this.post(`${this.path}`, data);
    }
    async update(id, data) {
        return await this.put(`${this.path}/${id}`, data);
    }
    async remove(id) {
        return await this.delete(`${this.path}/${id}`);
    }
}
export default Base;