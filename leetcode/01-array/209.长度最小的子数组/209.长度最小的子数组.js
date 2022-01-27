
// 1、双层循环
// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
 var minSubArrayLen = function(target, nums) {
    let sum = 0, subLength = 0
    let len = nums.length
    let result = len + 1

    for (let i = 0; i < len; i++) {

        sum = 0
        for (let j = i; j < len; j++) {
            sum += nums[j]
            if (target <= sum) { // 一旦发现子序列和超过了s，更新result
                subLength = j - i + 1 // 取子序列的长度
                result = result < subLength ? result : subLength
                break // 因为我们是找符合条件最短的子序列，所以一旦符合条件就break
            }
        }
    }

    return result > len ? 0 : result
};


// 滑动窗口
var minSubArrayLen = function(target, nums) {
    let len = nums.length
    let left = right = sum = 0
    let res = len + 1

    // 滑动窗口
    while (right < len) {
        sum += nums[right++]

        while (target <= sum) {
            res = res < right - left ? res : right - left
            sum -= nums[left++]
        }
    }

    return res > len ? 0 : res
};