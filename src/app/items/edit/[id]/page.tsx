import EditForm from "@/components/items/edit/EditForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id as string;
  return (
    <div>
      <EditForm id={id} />
    </div>
  );
}
