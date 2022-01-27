// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var sortedSquares = function(nums) {
    return nums.map(item => Math.pow(item, 2)).sort((a, b) => a - b)
};



// 双指针，减少双层循环
var sortedSquares1 = function(nums) {
    let result =[]
    let k = nums.length - 1

    for (let i = 0, j = k; i <= j;) {
        if (nums[i]**2 <= nums[j]**2) {
            result[k--] = nums[j]**2
            j--
        } else {
            result[k--] = nums[i]**2
            i++
        }
    }

    return result
};