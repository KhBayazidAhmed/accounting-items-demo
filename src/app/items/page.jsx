import React from "react";
import ItemsTableData from "@/components/items/ItemsTableData";
import ItemsSearchSection from "@/components/items/ItemsSearchSection";
import ItemsAddItemButton from "@/components/items/ItemsAddItemButton";
export default function page() {
  return (
    <main className="flex relative flex-col items-center justify-start pt-10 h-screen ">
      Demo Items Page
      <ItemsAddItemButton />
      <ItemsSearchSection />
      <ItemsTableData />
    </main>
  );
}
