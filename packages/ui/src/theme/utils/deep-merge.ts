function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * 深合并两个对象，`override` 中的值优先。
 * 仅对普通对象递归合并，数组和其他类型直接覆盖。
 */
export function deepMerge<T>(base: T, override: Partial<T>): T {
  const result = { ...base } as Record<string, unknown>;
  const src = override as Record<string, unknown>;

  for (const key of Object.keys(src)) {
    const baseVal = result[key];
    const overrideVal = src[key];

    if (isPlainObject(baseVal) && isPlainObject(overrideVal)) {
      result[key] = deepMerge(baseVal, overrideVal);
    } else {
      result[key] = overrideVal;
    }
  }

  return result as T;
}
