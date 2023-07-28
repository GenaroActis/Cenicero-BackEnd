import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
    products: [
        { _id : { type: mongoose.Schema.Types.ObjectId, required:true, ref: 'products'}}
    ],
    code: {type: String, require:true, unique: true},
    purchaseDataTime: { type: Date, required: true },
    totalPrice: { type: Number, require:true },
    purchaser: 
        {
            fullName: {type: String, required:true},
            email: {type: String, required:true},
            cellPhone: {type: String, required:true}
        }
});

TicketSchema.pre('find', function(){
    this.populate('products');
});

export const TicketModel = mongoose.model(
    'tickets',
    TicketSchema 
);