import { forIn, isObject, isPlainObject, pickBy } from 'lodash'

/**
 * 将 formData 转换为 object
 * @param formData
 */
export const formDataToObject = (formData: FormData) => {
  return Object.fromEntries((formData as any).entries()) as Record<string, string>
}
/**
 * 将 object 转换为 formData
 * @param object
 */
export const objectToFormData = (object: Record<string, string | number>) => {
  const formData = new FormData()
  for (const [key, value] of Object.entries(object)) {
    formData.append(key, String(value))
  }
  return formData
}

/**
 * 过滤对象|数组中 filters 中的值
 * @param params
 * @param filters
 */
export const pickByParams = <T extends object>(params: T, filters: any[], deep = false) => {
  deep &&
    forIn(params, (value, key) => {
      if (isObject(value))
        // @ts-ignore
        params[key] = pickByParams(params[key], filters, deep)
    })
  const pickValue = pickBy(params, (value) => !filters.includes(value))
  if (Array.isArray(params)) {
    return Object.values(pickValue) as any as Partial<T>
  }
  return pickValue
}

/**
 * 对象扁平化处理
 * @param object 对象
 * @param deep 深度
 */
export const objectFlat = (object: Record<string, any>, deep = 1) => {
  const flatDeep = (object: Record<string, any>, deep = 1) => {
    let _object: Record<string, any> = {}
    for (const [key, value] of Object.entries(object)) {
      if (isPlainObject(value)) {
        _object = { ..._object, ...(deep > 0 ? flatDeep(value, deep - 1) : value) }
        continue
      }
      _object[key] = value
    }
    return _object
  }
  return flatDeep(object, deep)
}
