export default function hasOwnProperty<K extends string | number | symbol>(
  obj: Record<K, unknown>,
  key: string | number | symbol
): key is K {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
