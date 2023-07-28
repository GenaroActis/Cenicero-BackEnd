import { TicketModel } from "./models/ticketModel.js";

export default class TicketDaoMongoDB {
    async getTicketByCode(code) {
        try {
            const response = await TicketModel.findOne({ code: code }).populate('products._id');
            if (!response){
                throw new Error('the code is wrong')
            } else{
                return response;
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        };
    };
    async getTicketById(id) {
        try {
        const response = await TicketModel.findById(id);
            if (!response){
                throw new Error('the id is wrong')
            } else{
                return response;
            }
        } catch (error) {
        console.log(error);
        };
    };
    async createTicket(obj) {
        try {
            obj.purchaseDataTime = new Date()
            const response = await TicketModel.create(obj);
            return response;
        } catch (error) {
        console.log(error);
        throw new Error(error);
        };
    };
    async deleteTicket(id) {
        try {
        const response = await TicketModel.findByIdAndDelete(id);
        return response;
        } catch (error) {
        console.log(error);
        throw new Error(error);
        };
    };
}