export default function findByParam<T>(
  collection: Array<T>,
  id: string,
  param = "_id",
): T | null {
  const selectedItems = collection.filter(
    (item) => item[param as keyof T] === id,
  );
  if (selectedItems) {
    return selectedItems[0];
  }

  return null;
}
