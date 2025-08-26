import { Schema, Document, models, model } from 'mongoose';

export interface ICartItem extends Document {
  userEmail: string;
  plan: string;
  description: string;
  price: number;
  actualPrice: number;
  discount: number;
  quantity: number;
}

const CartItemSchema: Schema = new Schema({
  userEmail: { type: String, required: true },
  plan: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  actualPrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

export default models.CartItem || model<ICartItem>('CartItem', CartItemSchema);