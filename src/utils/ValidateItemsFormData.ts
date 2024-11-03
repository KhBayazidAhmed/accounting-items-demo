function ValidateItemsFormData(formData: FormData) {
  // Field validations
  if (!formData.get("description")) {
    throw new Error("Description is required");
  }
  if (!formData.get("account")) {
    throw new Error("Account is required");
  }
  if (!formData.get("price")) {
    throw new Error("Price is required");
  }
  if (!formData.get("discount")) {
    throw new Error("Discount is required");
  }
  if (!formData.get("valueAddedTax")) {
    throw new Error("Value Added Tax is required");
  }
  if (!formData.get("type")) {
    throw new Error("Type is required");
  }
}

export default ValidateItemsFormData;
