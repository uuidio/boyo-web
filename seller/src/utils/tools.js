/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]));
};

/**
 * 过滤出特定key数组
 *
 * @param {Array} dataArr
 * @param {Array} keyArr
 * @returns {Array}
 */
export const getArrayFilterKey = (dataArr, keyArr) => {
  var newArr = [];
  dataArr.forEach(function(value) {
    if (Array.isArray(keyArr)) {
      var tmp = {};
      for (var i = 0; i < keyArr.length; i++) {
        let key = keyArr[i];
        tmp[key] = value[key];
      }
      newArr.push(tmp);
    } else {
      newArr.push(value[keyArr]);
    }
  });

  return newArr;
};
