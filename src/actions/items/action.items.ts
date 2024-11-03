"use server";

import connectToDatabase from "@/libs/db/connection";
import Item, { IItem } from "@/libs/Schema/Item.model";

export async function GetItems(currentPage: number, itemsPerPage: number) {
  try {
    await connectToDatabase();
    const items = await Item.find()
      .lean()
      .skip(currentPage * itemsPerPage)
      .limit(itemsPerPage);
    items.forEach((item) => {
      item._id = item._id.toString();
    });
    return {
      success: true,
      data: items,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message);
    return {
      success: false,
      message: error.message,
      error: error,
    };
  }
}
export async function CreateItem(data: IItem) {
  if (!data.description) {
    throw new Error("Description is required");
  }
  if (!data.account) {
    throw new Error("Account is required");
  }
  if (!data.price) {
    throw new Error("Price is required");
  }
  if (!data.discount) {
    throw new Error("Discount is required");
  }
  if (!data.valueAddedTax) {
    throw new Error("Value Added Tax is required");
  }
  if (!data.type) {
    throw new Error("Type is required");
  }
  try {
    await connectToDatabase();

    const item = new Item(data);
    await item.save();

    return {
      success: true,
      data: JSON.stringify(item),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}
