"use client";

import ItemsProvider from "@/context/ItemsProvider";
import ItemsAddItemButton from "./ItemsAddItemButton";
import ItemsSearchSection from "./ItemsSearchSection";
import ItemsTableData from "./ItemsTableData";

export default function WrapperItems() {
  return (
    <ItemsProvider>
      <ItemsAddItemButton />
      <ItemsSearchSection />
      <ItemsTableData />
    </ItemsProvider>
  );
}
