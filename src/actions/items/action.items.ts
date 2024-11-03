"use server";

import connectToDatabase from "@/libs/db/connection";
import Item, { IItem } from "@/libs/Schema/Item.model";

export async function GetItems(currentPage: number, itemsPerPage: number) {
  try {
    await connectToDatabase();
    const items = await Item.find()
      .sort({ createdAt: -1 })
      .lean()
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage);
    items.forEach((item) => {
      item._id = item._id.toString();
    });
    const totalItems = await Item.countDocuments();
    const totalTablePages = Math.ceil(totalItems / itemsPerPage);
    return {
      success: true,
      data: items,
      totalTable: totalTablePages,
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
export async function UpdateItem(id: string, data: IItem) {
  console.log("UpdateItem", id, data);
  try {
    await connectToDatabase();

    const item = await Item.findByIdAndUpdate(id, data);
    if (!item) {
      throw new Error("Item not found");
    }
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
export async function DeleteItem(id: string) {
  try {
    await connectToDatabase();

    const item = await Item.findById(id);
    if (!item) {
      throw new Error("Item not found");
    }
    await item.deleteOne();
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
export async function GetItem(id: string) {
  try {
    await connectToDatabase();

    const item = await Item.findById(id).lean();
    if (!item) {
      throw new Error("Item not found");
    }
    item._id = item._id.toString();
    return {
      success: true,
      data: item,
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
