import mongoose, { Schema, Document, Model } from "mongoose";

// Define the types for the Item
export interface IItem extends Document {
  description: string;
  account: string;
  price: number;
  discount: number;
  valueAddedTax: number;
  type: "service" | "good";
}

// Define the schema for the Item
const ItemSchema: Schema<IItem> = new Schema<IItem>({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  account: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    required: true,
    min: 0,
    max: 100, // assuming discount is a percentage
  },
  valueAddedTax: {
    type: Number,
    required: true,
    min: 0,
    max: 100, // assuming VAT is a percentage
  },
  type: {
    type: String,
    required: true,
    enum: ["service", "good"],
  },
});

// Create the model for serverless environments
const Item: Model<IItem> =
  mongoose.models.Item || mongoose.model<IItem>("Item", ItemSchema);

export default Item;
