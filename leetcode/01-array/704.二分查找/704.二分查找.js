
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// 方法一 indexOf
var search = function(nums, target) {
  return nums.indexOf(target)
};

// 方法二：遍历
var search1 = function(nums, target) {
  let index = -1
  let len = nums.length

  for (let i = 0; i < len; i++) {
      if (nums[i] === target) {
          index = i
          break
      }
  }
  return index
};

// 方法三：二分查找，左闭右闭

var search2 = function(nums, target) {
  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    let mid = Math.floor(left + (right-left)/2)

    if (nums[mid] < target) {
      left = mid +1
      } else if (nums[mid] > target) {
      right = mid - 1
    } else {
      return mid
    }
  }
  return -1
};

// 方法四：二分查找
var search4 = function(nums, target) {
  let left = 0
  let right = nums.length

  while (left < right) {
    let mid = Math.floor(left + (right-left)/2)

    if (nums[mid] > target) {
      right = mid 
      } else if (nums[mid] < target) {
      left = mid +1
    } else {
      return mid
    }
  }
  return -1
};