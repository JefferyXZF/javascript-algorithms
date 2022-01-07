/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
// 方法一：遍历 + 数组 API 
 var removeElement = function(nums, val) {
    
  for (let i = nums.length - 1; i >= 0; i--) {
      if (nums[i] === val) {
          nums.splice(i, 1)
      }
  }

  return nums.length
};

// 方法二：使用快慢指针

var removeElement1 = function(nums, val) {
  let slowIndex = 0

  for (let fastIndex = 0, len = nums.length; fastIndex < len; fastIndex++) {
      if (nums[fastIndex] !== val) {
          nums[slowIndex++] = nums[fastIndex]
      }
  }

  return slowIndex
};