import mongoose from 'mongoose';
import { MongoDBUrl } from '../config.js';
console.log(MongoDBUrl)
class ConnectMongoDB{
    static #instance
    constructor(){
        mongoose.connect(MongoDBUrl)
    };
    static getInstance(){
        if(this.#instance){
            return this.#instance
        }else{
            this.#instance = new ConnectMongoDB()
            return this.#instance
        };
    };
};

ConnectMongoDB.getInstance();