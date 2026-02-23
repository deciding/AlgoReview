// AlgoReview Data Structure
// This file contains the algorithm problems and their mappings

const algoData = {
    // Array of problem objects
    problems: [
        {
            id: 1425,
            title: "Constrained Subsequence Sum",
            description: "Given an integer array nums and an integer k, return the maximum sum of a non-empty subsequence of that array such that for every two consecutive integers in the subsequence, nums[i] and nums[j], where i < j, the condition j - i <= k is satisfied.\n\nA subsequence of an array is obtained by deleting some number of elements (can be zero) from the array, leaving the remaining elements in their original order.",
            keywords: ["Monotonic Queue", "DP"],
            code: `from collections import deque
class Solution:
    def constrainedSubsetSum(self, nums: List[int], k: int) -> int:
        dp = []
        dpQ = deque()

        n = len(nums)
        left = 0
        right = 0
        while right < n:
            cur = nums[right]
            # get max
            m = dpQ[0] if dpQ else 0
            # non-empty: must compare all prev + cur as well as cur only, should not compare with 0
            cur = max(cur, cur + m)
            # push to monoQ
            while dpQ and dpQ[-1] < cur:
                dpQ.pop()
            dpQ.append(cur)
            dp.append(cur)
            right += 1
            # check k and pop monoQ
            while right - left > k:
                if dpQ[0] == dp[left]:
                    dpQ.popleft()
                left += 1
        # at last return max of all end in right.
        # note that to keep the condition of until right, you cannot 
        # compare cur vs. cur + m vs. m!
        return max(dp)`,
            language: "python"
        },
        {
            id: 1,
            title: "Two Sum",
            description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
            keywords: ["Hash Table", "Array"],
            code: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        num_map = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in num_map:
                return [num_map[complement], i]
            num_map[num] = i
        return []`,
            language: "python"
        },
        {
            id: 53,
            title: "Maximum Subarray",
            description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
            keywords: ["DP", "Kadane's Algorithm"],
            code: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        max_sum = nums[0]
        current_sum = nums[0]
        
        for num in nums[1:]:
            current_sum = max(num, current_sum + num)
            max_sum = max(max_sum, current_sum)
        
        return max_sum`,
            language: "python"
        },
        {
            id: 121,
            title: "Best Time to Buy and Sell Stock",
            description: "You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
            keywords: ["Array", "DP"],
            code: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        
        for price in prices:
            if price < min_price:
                min_price = price
            elif price - min_price > max_profit:
                max_profit = price - min_price
        
        return max_profit`,
            language: "python"
        },
        {
            id: 3,
            title: "Longest Substring Without Repeating Characters",
            description: "Given a string s, find the length of the longest substring without repeating characters.",
            keywords: ["Sliding Window", "Hash Table"],
            code: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_index = {}
        left = 0
        max_length = 0
        
        for right, char in enumerate(s):
            if char in char_index and char_index[char] >= left:
                left = char_index[char] + 1
            char_index[char] = right
            max_length = max(max_length, right - left + 1)
        
        return max_length`,
            language: "python"
        }
    ],
    
    // Get all unique keywords from problems
    getAllKeywords: function() {
        const keywordSet = new Set();
        this.problems.forEach(problem => {
            problem.keywords.forEach(keyword => {
                keywordSet.add(keyword.trim());
            });
        });
        return Array.from(keywordSet).sort();
    },
    
    // Get problems by keyword
    getProblemsByKeyword: function(keyword) {
        return this.problems.filter(problem => 
            problem.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
        );
    },
    
    // Get problem by ID
    getProblemById: function(id) {
        return this.problems.find(problem => problem.id === id);
    },
    
    // Add a new problem
    addProblem: function(problem) {
        // Ensure ID is unique
        if (this.getProblemById(problem.id)) {
            console.warn(`Problem with ID ${problem.id} already exists. Updating instead.`);
            this.updateProblem(problem.id, problem);
            return;
        }
        
        this.problems.push({
            id: problem.id,
            title: problem.title,
            description: problem.description,
            keywords: problem.keywords.split(',').map(k => k.trim()).filter(k => k),
            code: problem.code,
            language: problem.language || 'python'
        });
        
        // Sort problems by ID
        this.problems.sort((a, b) => a.id - b.id);
        this.saveToLocalStorage();
    },
    
    // Update existing problem
    updateProblem: function(id, updatedProblem) {
        const index = this.problems.findIndex(p => p.id === id);
        if (index !== -1) {
            this.problems[index] = {
                ...this.problems[index],
                ...updatedProblem,
                keywords: updatedProblem.keywords.split(',').map(k => k.trim()).filter(k => k),
                id: id // Ensure ID doesn't change
            };
            this.saveToLocalStorage();
        }
    },
    
    // Delete problem
    deleteProblem: function(id) {
        const index = this.problems.findIndex(p => p.id === id);
        if (index !== -1) {
            this.problems.splice(index, 1);
            this.saveToLocalStorage();
            return true;
        }
        return false;
    },
    
    // Save to localStorage
    saveToLocalStorage: function() {
        try {
            localStorage.setItem('algoReviewData', JSON.stringify(this.problems));
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
        }
    },
    
    // Load from localStorage
    loadFromLocalStorage: function() {
        try {
            const saved = localStorage.getItem('algoReviewData');
            if (saved) {
                this.problems = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load from localStorage:', e);
        }
    }
};

// Initialize: Load from localStorage on startup
algoData.loadFromLocalStorage();