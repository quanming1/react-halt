/**
 * 深克隆
 * @param srouce
 */
export function deepClone<T = Record<any, any> | any[]>(srouce: T, map = new Map()): T {
  if (!(srouce instanceof Object)) return srouce;

  const res: any = Array.isArray(srouce) ? [] : {};

  if (map.get(srouce)) {
    return map.get(srouce);
  }
  map.set(srouce, res);

  for (const key in srouce) {
    res[key] = deepClone(srouce[key], map);
  }

  return res;
}
