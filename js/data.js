// AlgoReview Data Structure
// This file contains the algorithm problems and their mappings

const algoData = {
    // Array of problem objects
    problems: [
        {
            id: 1,
            title: "Two Sum",
            description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.`,
            keywords: ["nSum"],
            code: `        # Solution for LeetCode 1: Two Sum
        # Add your solution code here
        
        class Solution:
            def solve(self):
                pass`,
            language: "python"
        },
        {
            id: 2,
            title: "Add Two Numbers",
            description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list. You may assume the two numbers do not contain any leading zero, except the number 0 itself.   Example 1: Input: l1 = [2,4,3], l2 = [5,6,4] Output: [7,0,8] Explanation: 342 + 465 = 807. Example 2: Input: l1 = [0], l2 = [0] Output: [0] Example 3: Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9] Output: [8,9,9,9,0,0,0,1]   Constraints: The number of nodes in each linked list is in the range [1, 100]. 0 <= Node.val <= 9 It is guaranteed that the list represents a number that does not have leading zeros.
<a href="https://leetcode.com/problems/add-two-numbers/" target="_blank">https://leetcode.com/problems/add-two-numbers/</a>`,
            keywords: ["LinkedList", "2ptr"],
            code: `        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, val=0, next=None):
        #         self.val = val
        #         self.next = next
        
        # Notes: similar to merge listnodes, start from LSB is intuitive to implement
        class Solution:
            def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
                dummy = ListNode(-1)
                p = dummy
                p1 = l1
                p2 = l2
                carry = 0
                while p1 or p2:
                    cur = carry
                    if p1:
                        cur += p1.val
                        p1 = p1.next
                    if p2:
                        cur += p2.val
                        p2 = p2.next
        
                    if cur >=10:
                        cur -= 10
                        carry = 1
                    else:
                        carry = 0
                    p.next = ListNode(cur)
                    p = p.next
                if carry:
                    p.next = ListNode(carry)
                return dummy.next   `,
            language: "python"
        },
        {
            id: 3,
            title: "Longest Substring Without Repeating Characters",
            description: `Given a string s, find the length of the longest substring without duplicate characters.   Example 1: Input: s = "abcabcbb" Output: 3 Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers. Example 2: Input: s = "bbbbb" Output: 1 Explanation: The answer is "b", with the length of 1. Example 3: Input: s = "pwwkew" Output: 3 Explanation: The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.   Constraints: 0 <= s.length <= 5 * 104 s consists of English letters, digits, symbols and spaces.
<a href="https://leetcode.com/problems/longest-substring-without-repeating-characters/" target="_blank">https://leetcode.com/problems/longest-substring-without-repeating-characters/</a>`,
            keywords: ["SlidingWindow"],
            code: `        # decrease condition: actually only rightmost will dec cnt
        
        class Solution:
            def lengthOfLongestSubstring(self, s: str) -> int:
                # need map to record whether appearance is 1
                window = {}
        
                left = 0
                right = 0
                
                res = 0
        
                # increase
                while right < len(s):
                    cur_c = s[right]
                    cur_cnt = window.get(cur_c, 0)
        
                    window[cur_c] = cur_cnt + 1
        
                    # decrease: actually only rightmost will dec cnt
                    while window[cur_c] > 1:
                        cur_r = s[left]
                        cur_cnt = window.get(cur_r, 0)
        
                        left += 1
        
                        if cur_cnt:
                            window[cur_r] = cur_cnt - 1
                    
                    res = max(res, right - left + 1)
                    right += 1
                
                return res
        `,
            language: "python"
        },
        {
            id: 5,
            title: "Longest Palindromic Substring",
            description: `Given a string s, return the longest palindromic substring in s.   Example 1: Input: s = "babad" Output: "bab" Explanation: "aba" is also a valid answer. Example 2: Input: s = "cbbd" Output: "bb"   Constraints: 1 <= s.length <= 1000 s consist of only digits and English letters.
<a href="https://leetcode.com/problems/longest-palindromic-substring/" target="_blank">https://leetcode.com/problems/longest-palindromic-substring/</a>`,
            keywords: ["Array", "Palindrome", "2ptr"],
            code: `        # bad case: O(N^3), that is for all (left, right), check palindrome
        # good case: O(N^2), that is for all i, check palindome from small to large
        #     “from small to large” is DP already
        # unreal case: O(N), that is applicable in two-sum-ii, where the inner range is able to be filtered in 1 step.
        
        class Solution:
            # expand on both sides
            def palindrome(self, s, start, end):
                while start >= 0 and end < len(s):
                    if s[start] == s[end]:
                        start -= 1
                        end += 1
                    else:
                        break
                return s[start+1:end]
        
            def longestPalindrome(self, s: str) -> str:
                res=""
                for i in range(len(s)):
                    # odd
                    res1 = self.palindrome(s, i, i)
                    # even
                    res2 = self.palindrome(s, i, i+1)
                    if len(res1) > len(res):
                        res = res1
                    if len(res2) > len(res):
                        res = res2
                return res
                `,
            language: "python"
        },
        {
            id: 11,
            title: "Container With Most Water",
            description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store. Notice that you may not slant the container.   Example 1: Input: height = [1,8,6,2,5,4,8,3,7] Output: 49 Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49. Example 2: Input: height = [1,1] Output: 1   Constraints: n == height.length 2 <= n <= 105 0 <= height[i] <= 104
<a href="https://leetcode.com/problems/container-with-most-water/" target="_blank">https://leetcode.com/problems/container-with-most-water/</a>`,
            keywords: ["Array"],
            code: `        # bar no width, so easy to calculate the area
        # opportunity fetching: each time advance the part with smaller height
        
        class Solution:
            def maxArea(self, height: List[int]) -> int:
                left, right = 0, len(height) - 1
                res = 0
                while left < right:
                    # [left, right] 之间的矩形面积
                    cur_area = min(height[left], height[right]) * (right - left)
                    res = max(res, cur_area)
                    # 双指针技巧，移动较低的一边
                    if height[left] < height[right]:
                        left += 1
                    else:
                        right -= 1
                return res`,
            language: "python"
        },
        {
            id: 14,
            title: "Longest Common Prefix",
            description: `Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".   Example 1: Input: strs = ["flower","flow","flight"] Output: "fl" Example 2: Input: strs = ["dog","racecar","car"] Output: "" Explanation: There is no common prefix among the input strings.   Constraints: 1 <= strs.length <= 200 0 <= strs[i].length <= 200 strs[i] consists of only lowercase English letters if it is non-empty.
<a href="https://leetcode.com/problems/longest-common-prefix/" target="_blank">https://leetcode.com/problems/longest-common-prefix/</a>`,
            keywords: ["Array", "2ptr"],
            code: `        # check edge case
        
        class Solution:
            def longestCommonPrefix(self, strs: List[str]) -> str:
                m = len(strs)
                n = len(strs[0])
        
                for i in range(n):
                    for j in range(1, m):
                        if i == len(strs[j]):
                            return strs[0][:i]
                        if strs[j][i] != strs[0][i]:
                            return strs[0][:i]
                
                return strs[0]
        `,
            language: "python"
        },
        {
            id: 15,
            title: "3Sum",
            description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.   Example 1: Input: nums = [-1,0,1,2,-1,-4] Output: [[-1,-1,2],[-1,0,1]] Explanation: nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0. nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0. The distinct triplets are [-1,0,1] and [-1,-1,2]. Notice that the order of the output and the order of the triplets does not matter. Example 2: Input: nums = [0,1,1] Output: [] Explanation: The only possible triplet does not sum up to 0. Example 3: Input: nums = [0,0,0] Output: [[0,0,0]] Explanation: The only possible triplet sums up to 0.   Constraints: 3 <= nums.length <= 3000 -105 <= nums[i] <= 105
<a href="https://leetcode.com/problems/3sum/description/" target="_blank">https://leetcode.com/problems/3sum/description/</a>`,
            keywords: ["nSum"],
            code: `        class Solution:
            def threeSum(self, nums: list[int]) -> list[list[int]]:
                pass`,
            language: "python"
        },
        {
            id: 18,
            title: "4Sum",
            description: `Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that: 0 <= a, b, c, d < n a, b, c, and d are distinct. nums[a] + nums[b] + nums[c] + nums[d] == target You may return the answer in any order.   Example 1: Input: nums = [1,0,-1,0,-2,2], target = 0 Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]] Example 2: Input: nums = [2,2,2,2,2], target = 8 Output: [[2,2,2,2]]   Constraints: 1 <= nums.length <= 200 -109 <= nums[i] <= 109 -109 <= target <= 109
<a href="https://leetcode.com/problems/4sum/" target="_blank">https://leetcode.com/problems/4sum/</a> `,
            keywords: ["nSum"],
            code: `        class Solution:
            def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
                pass`,
            language: "python"
        },
        {
            id: 19,
            title: "Remove Nth Node From End of List",
            description: `Given the head of a linked list, remove the nth node from the end of the list and return its head.   Example 1: Input: head = [1,2,3,4,5], n = 2 Output: [1,2,3,5] Example 2: Input: head = [1], n = 1 Output: [] Example 3: Input: head = [1,2], n = 1 Output: [1]   Constraints: The number of nodes in the list is sz. 1 <= sz <= 30 0 <= Node.val <= 100 1 <= n <= sz   Follow up: Could you do this in one pass?
<a href="https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/" target="_blank">https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/</a> `,
            keywords: ["LinkedList", "2ptr"],
            code: `        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, val=0, next=None):
        #         self.val = val
        #         self.next = next
        # Notes: 不过注意我们又使用了虚拟头结点的技巧，也是为了防止出现空指针的情况，比如说链表总共有 5 个节点，题目就让你删除倒数第 5 个节点，也就是第一个节点，那按照算法逻辑，应该首先找到倒数第 6 个节点。但第一个节点前面已经没有节点了，这就会出错。
        class Solution:
            def findLastN(self, head, n):
                p1 = head
                p2 = head
                for i in range(n):
                    p2 = p2.next
                while p2!=None:
                    p1 = p1.next
                    p2 = p2.next
        
                return p1
        
            def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
                dummy = ListNode(-1)
                dummy.next = head
                lastNP1 = self.findLastN(dummy, n+1)
                #remove
                lastNP1.next = lastNP1.next.next
                return dummy.next`,
            language: "python"
        },
        {
            id: 20,
            title: "Valid Parentheses",
            description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order. Every close bracket has a corresponding open bracket of the same type.   Example 1: Input: s = "()" Output: true Example 2: Input: s = "()[]{}" Output: true Example 3: Input: s = "(]" Output: false Example 4: Input: s = "([])" Output: true Example 5: Input: s = "([)]" Output: false   Constraints: 1 <= s.length <= 104 s consists of parentheses only '()[]{}'.
<a href="https://leetcode.com/problems/valid-parentheses/description/" target="_blank">https://leetcode.com/problems/valid-parentheses/description/</a>`,
            keywords: ["Stack"],
            code: `        class Solution:
            def isValid(self, s: str) -> bool:
                stack = []
                for c in s:
                    if c in '({[':
                        stack.append(c)
                    elif c == ')':
                        if len(stack) == 0 or stack[-1] != '(':
                            return False
                        else:
                            stack.pop()
                    elif c == '}':
                        if len(stack) == 0 or stack[-1] != '{':
                            return False
                        else:
                            stack.pop()
                    elif c == ']':
                        if len(stack) == 0 or stack[-1] != '[':
                            return False
                        else:
                            stack.pop()
                return len(stack) == 0`,
            language: "python"
        },
        {
            id: 21,
            title: "Merge Two Sorted Lists",
            description: `You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.   Example 1: Input: list1 = [1,2,4], list2 = [1,3,4] Output: [1,1,2,3,4,4] Example 2: Input: list1 = [], list2 = [] Output: [] Example 3: Input: list1 = [], list2 = [0] Output: [0]   Constraints: The number of nodes in both lists is in the range [0, 50]. -100 <= Node.val <= 100 Both list1 and list2 are sorted in non-decreasing order.
<a href="https://leetcode.com/problems/merge-two-sorted-lists/" target="_blank">https://leetcode.com/problems/merge-two-sorted-lists/</a>`,
            keywords: ["LinkedList", "2ptr"],
            code: `        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, val=0, next=None):
        #         self.val = val
        #         self.next = next
        
        # 当你需要创造一条新链表的时候，可以使用虚拟头dummy结点简化边界情况的处理。this is easy for handle None ListNode inputs
        class Solution:
            def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
                dummy = ListNode(-1)
                p = dummy
                p1 = list1
                p2 = list2
                while p1!=None and p2!=None:
                    if p1.val <= p2.val:
                        p.next = p1
                        p1 = p1.next
                    else:
                        p.next = p2
                        p2 = p2.next
                    
                    p = p.next
        
                if p1!=None:
                    p.next = p1
                elif p2!=None:
                    p.next = p2
                
                return dummy.next
                    `,
            language: "python"
        },
        {
            id: 23,
            title: "Merge k Sorted Lists",
            description: `You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.   Example 1: Input: lists = [[1,4,5],[1,3,4],[2,6]] Output: [1,1,2,3,4,4,5,6] Explanation: The linked-lists are: [ 1->4->5, 1->3->4, 2->6 ] merging them into one sorted linked list: 1->1->2->3->4->4->5->6 Example 2: Input: lists = [] Output: [] Example 3: Input: lists = [[]] Output: []   Constraints: k == lists.length 0 <= k <= 104 0 <= lists[i].length <= 500 -104 <= lists[i][j] <= 104 lists[i] is sorted in ascending order. The sum of lists[i].length will not exceed 104.
<a href="https://leetcode.com/problems/merge-k-sorted-lists/" target="_blank">https://leetcode.com/problems/merge-k-sorted-lists/</a>`,
            keywords: ["LinkedList", "2ptr", "DC"],
            code: `        # DC vs. DFS: Early prune compared to DFS
        
        # time: O(Nlogk)
        # space: O(logk) heap
        # make the tree balance, complexity is linear to tree depth
        # 如果递归树节点的时间复杂度和树的深度无关，那么使用分治思想就没有意义，反而可能引入额外的空间复杂度。
        
        #Notes: O(Nlogk) N total nodes, k number of heads, space cost O(k)
        #heapq.heappush, heapq.heappop
        #if to keep list order, should push pair (val, i)
        #if to reuse ListNode, should push (val, i, ListNode) and rewrite ListNode.__lt__
        #if to save space in hq, should only push current nodes in pq, and keep pushing after popping
        #D&C: O(Nlogk), space cost O(logk), stack cost
        #if just mergeTwoLists for each one in the list, list0 will be traversed for k-1 times, … list k-1 will be traversed for 1 time.
        #so we merge by half
        
        
        ListNode.__lt__ = lambda self, other: self.val < other.val 
        
        import heapq
        class Solution:
            # Sol1, additional space for all nodes
            def mergeKLists1(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
                q = []
                for l in lists:
                    while l:
                        heapq.heappush(q, l)
                        l = l.next
                dummy = ListNode(-1)
                p = dummy
                while q:
                    cur = heapq.heappop(q)
                    p.next = ListNode(cur.val)
                    p = p.next
                
                return dummy.next
        
        
            def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
                dummy = ListNode(-1)
                p = dummy
                p1 = list1
                p2 = list2
                while p1!=None and p2!=None:
                    if p1.val <= p2.val:
                        p.next = p1
                        p1 = p1.next
                    else:
                        p.next = p2
                        p2 = p2.next
                    
                    p = p.next
        
                if p1!=None:
                    p.next = p1
                elif p2!=None:
                    p.next = p2
                
                return dummy.next
        
            def mergeKListsSE(self, lists, start, end):
                if start >= end:
                    return None
                if start == end - 1:
                    return lists[start]
                mid = start + (end - start) // 2
                left = self.mergeKListsSE(lists, start, mid)
                right = self.mergeKListsSE(lists, mid, end)
                res = self.mergeTwoLists(left, right)
                return res
        
            # Sol2, DC
            def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
                return self.mergeKListsSE(lists, 0, len(lists))
        
        # import heapq
        
        # class ListNode:
        #     def __init__(self, val=0, next=None):
        #         self.val = val
        #         self.next = next
        
        #     # 重载比较运算符，方便将 ListNode 加入最小堆
        #     def __lt__(self, other):
        #         return self.val < other.val
        
        # class Solution:
        #     def mergeKLists(self, lists):
        #         if not lists:
        #             return None
        #         # 虚拟头结点
        #         dummy = ListNode(-1)
        #         p = dummy
        #         # 优先级队列，最小堆
        #         pq = []
        #         # 将 k 个链表的头结点加入最小堆
        #         for i, head in enumerate(lists):
        #             if head is not None:
        #                 heapq.heappush(pq, (head.val, i, head))
        
        #         while pq:
        #             # 获取最小节点，接到结果链表中
        #             val, i, node = heapq.heappop(pq)
        #             p.next = node
        #             if node.next is not None:
        #                 heapq.heappush(pq, (node.next.val, i, node.next))
        #             # p 指针不断前进
        #             p = p.next
                    
        #         return dummy.next`,
            language: "python"
        },
        {
            id: 25,
            title: "Reverse Nodes in k-Group",
            description: `Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list. k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is. You may not alter the values in the list's nodes, only nodes themselves may be changed.   Example 1: Input: head = [1,2,3,4,5], k = 2 Output: [2,1,4,3,5] Example 2: Input: head = [1,2,3,4,5], k = 3 Output: [3,2,1,4,5]   Constraints: The number of nodes in the list is n. 1 <= k <= n <= 5000 0 <= Node.val <= 1000   Follow-up: Can you solve the problem in O(1) extra memory space?
<a href="https://leetcode.com/problems/reverse-nodes-in-k-group/" target="_blank">https://leetcode.com/problems/reverse-nodes-in-k-group/</a>`,
            keywords: ["LinkedList", "2ptr"],
            code: `        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, val=0, next=None):
        #         self.val = val
        #         self.next = next
        
        # iterative reverseN is less error-prone
        # count the case when not enough k elements
        # recursively call reverseN and relink
        
        class Solution:
            successor = None
            def reverseN(self, head, n):
                # TLE: if head == None or head.next == None
                # because it don't update self.successor if head.next == None
                if head == None:
                    return head
                if n == 1:
                    self.successor = head.next
                    return head
                last = self.reverseN(head.next, n-1)
                head.next.next = head
                head.next = self.successor
                return last
        
            def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
                if head == None or head.next == None:
                    return head
                if k == 1:
                    return head
                
                p = head
                for i in range(k):
                    if p:
                        p = p.next
                    else:
                        return head
        
                cur = self.reverseN(head, k)
                head.next = self.reverseKGroup(head.next, k)
                #head.next = self.reverseKGroup(p, k)
        
                return cur
                `,
            language: "python"
        },
        {
            id: 26,
            title: "Remove Duplicates from Sorted Array",
            description: `Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Consider the number of unique elements in nums to be k\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b. After removing duplicates, return the number of unique elements k. The first k elements of nums should contain the unique numbers in sorted order. The remaining elements beyond index k - 1 can be ignored. Custom Judge: The judge will test your solution with the following code: int[] nums = [...]; // Input array int[] expectedNums = [...]; // The expected answer with correct length int k = removeDuplicates(nums); // Calls your implementation assert k == expectedNums.length; for (int i = 0; i < k; i++) { assert nums[i] == expectedNums[i]; } If all assertions pass, then your solution will be accepted.   Example 1: Input: nums = [1,1,2] Output: 2, nums = [1,2,_] Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively. It does not matter what you leave beyond the returned k (hence they are underscores). Example 2: Input: nums = [0,0,1,1,1,2,2,3,3,4] Output: 5, nums = [0,1,2,3,4,_,_,_,_,_] Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively. It does not matter what you leave beyond the returned k (hence they are underscores).   Constraints: 1 <= nums.length <= 3 * 104 -100 <= nums[i] <= 100 nums is sorted in non-decreasing order.
<a href="https://leetcode.com/problems/remove-duplicates-from-sorted-array/" target="_blank">https://leetcode.com/problems/remove-duplicates-from-sorted-array/</a>`,
            keywords: ["Array", "2ptr"],
            code: `        # slow += 1 first
        
        class Solution:
            def removeDuplicates(self, nums: List[int]) -> int:
                slow = 0
                fast = 0
                while fast < len(nums):
                    if nums[slow] != nums[fast]:
                        slow += 1
                        nums[slow] = nums[fast]
                    fast += 1
                return slow + 1`,
            language: "python"
        },
        {
            id: 27,
            title: "Remove Element",
            description: `Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val. Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things: Change the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums. Return k. Custom Judge: The judge will test your solution with the following code: int[] nums = [...]; // Input array int val = ...; // Value to remove int[] expectedNums = [...]; // The expected answer with correct length. // It is sorted with no values equaling val. int k = removeElement(nums, val); // Calls your implementation assert k == expectedNums.length; sort(nums, 0, k); // Sort the first k elements of nums for (int i = 0; i < actualLength; i++) { assert nums[i] == expectedNums[i]; } If all assertions pass, then your solution will be accepted.   Example 1: Input: nums = [3,2,2,3], val = 3 Output: 2, nums = [2,2,_,_] Explanation: Your function should return k = 2, with the first two elements of nums being 2. It does not matter what you leave beyond the returned k (hence they are underscores). Example 2: Input: nums = [0,1,2,2,3,0,4,2], val = 2 Output: 5, nums = [0,1,4,0,3,_,_,_] Explanation: Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4. Note that the five elements can be returned in any order. It does not matter what you leave beyond the returned k (hence they are underscores).   Constraints: 0 <= nums.length <= 100 0 <= nums[i] <= 50 0 <= val <= 100
<a href="https://leetcode.com/problems/remove-element/" target="_blank">https://leetcode.com/problems/remove-element/</a>`,
            keywords: ["Array", "2ptr"],
            code: `        # Note that fast is the real checker
        
        class Solution:
            def removeElement(self, nums: List[int], val: int) -> int:
                slow = 0
                fast = 0
                while fast < len(nums):
                    if nums[fast] != val:
                        nums[slow] = nums[fast]
                        slow += 1
                    fast += 1
                return slow`,
            language: "python"
        },
        {
            id: 34,
            title: "Find First and Last Position of Element in Sorted Array",
            description: `Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. If target is not found in the array, return [-1, -1]. You must write an algorithm with O(log n) runtime complexity.   Example 1: Input: nums = [5,7,7,8,8,10], target = 8 Output: [3,4] Example 2: Input: nums = [5,7,7,8,8,10], target = 6 Output: [-1,-1] Example 3: Input: nums = [], target = 0 Output: [-1,-1]   Constraints: 0 <= nums.length <= 105 -109 <= nums[i] <= 109 nums is a non-decreasing array. -109 <= target <= 109
<a href="https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/" target="_blank">https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/</a>`,
            keywords: ["BS"],
            code: `        # left right follow lower upper
        
        class Solution:
            def searchRange(self, nums: List[int], target: int) -> List[int]:
                left = 0
                right = len(nums) - 1
                while left <= right:
                    mid = left + (right - left) // 2
                    if nums[mid] == target:
                        right = mid - 1
                    elif nums[mid] < target:
                        left = mid + 1
                    elif nums[mid] > target:
                        right = mid - 1
                if left < 0 or left > len(nums) - 1:
                    return [-1, -1]
                if nums[left] != target:
                    return [-1, -1]
                lower = left
        
                left = 0
                right = len(nums) - 1
                while left <= right:
                    mid = left + (right - left) // 2
                    if nums[mid] == target:
                        left = mid + 1
                    elif nums[mid] < target:
                        left = mid + 1
                    elif nums[mid] > target:
                        right = mid - 1
                if right < 0 or right > len(nums) - 1:
                    return [-1, -1]
                if nums[right] != target:
                    return [-1, -1]
                upper = right
        
                return [lower, upper]`,
            language: "python"
        },
        {
            id: 37,
            title: "Sudoku Solver",
            description: `Write a program to solve a Sudoku puzzle by filling the empty cells. A sudoku solution must satisfy all of the following rules: Each of the digits 1-9 must occur exactly once in each row. Each of the digits 1-9 must occur exactly once in each column. Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid. The '.' character indicates empty cells.   Example 1: Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]] Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]] Explanation: The input board is shown above and the only valid solution is shown below:   Constraints: board.length == 9 board[i].length == 9 board[i][j] is a digit or '.'. It is guaranteed that the input board has only one solution.
<a href="https://leetcode.com/problems/sudoku-solver/description/" target="_blank">https://leetcode.com/problems/sudoku-solver/description/</a>`,
            keywords: ["DFS", "Backtrack"],
            code: `        # TLE: must use cache save row/col/block contains
        
        class Solution:
            def solveSudoku(self, board: List[List[str]]) -> None:
                """
                Do not return anything, modify board in-place instead.
                """
                self.board = board
                self.found = False
                # use index to replace visited
                self.rowSets = [set() for i in range(9)]
                self.colSets = [set() for i in range(9)]
                self.blkSets = [set() for i in range(9)]
        
                for i in range(9):
                    for j in range(9):
                        if board[i][j] != '.':
                            self.rowSets[i].add(board[i][j])
                            self.colSets[j].add(board[i][j])
                            row = i // 3
                            col = j // 3
                            self.blkSets[row*3+col].add(board[i][j])
        
                self.backtrack(0)
        
            def backtrack(self, index):
                if self.found:
                    return
                if index == 81:
                    self.found = True
                    return
                i, j = index // 9, index % 9
                if self.board[i][j] == '.':
                    for n in range(1, 10):
                        if self.checkValid(i, j, n):
                            self.board[i][j] = str(n)
                            self.pushValid(i, j, n)
                            self.backtrack(index + 1)
                            if self.found:
                                return
                            self.board[i][j] = '.'
                            self.popValid(i, j, n)
                else:
                    self.backtrack(index+1)
            
            def checkValid(self, i, j, n):
                if str(n) in self.rowSets[i]:
                    return False
                if str(n) in self.colSets[j]:
                    return False
                if str(n) in self.blkSets[i//3*3+j//3]:
                    return False
                return True
        
            def pushValid(self, i, j, n):
                self.rowSets[i].add(str(n))
                self.colSets[j].add(str(n))
                self.blkSets[i//3*3+j//3].add(str(n))
        
            def popValid(self, i, j, n):
                self.rowSets[i].remove(str(n))
                self.colSets[j].remove(str(n))
                self.blkSets[i//3*3+j//3].remove(str(n))
        
        
        # class Solution:
        #     def solveSudoku(self, board):
        #         # 标记是否已经找到可行解
        #         self.found = False
        #         self.backtrack(board, 0)
        
        
        #     # 路径：board 中小于 index 的位置所填的数字
        #     # 选择列表：数字 1~9
        #     # 结束条件：整个 board 都填满数字
        #     def backtrack(self, board, index):
        #         if self.found:
        #             # 已经找到一个可行解，立即结束
        #             return
        
        #         m, n = 9, 9
        #         i, j = index // n, index % n
        #         if index == m * n:
        #             # 找到一个可行解，触发 base case
        #             self.found = True
        #             return
        
        #         if board[i][j] != '.':
        #             # 如果有预设数字，不用我们穷举
        #             self.backtrack(board, index + 1)
        #             return
        
        #         for ch in '123456789':
        #             # 剪枝：如果遇到不合法的数字，就跳过
        #             if not self.isValid(board, i, j, ch):
        #                 continue
        
        #             # 做选择
        #             board[i][j] = ch
        
        #             self.backtrack(board, index + 1)
        #             if self.found:
        #                 # 如果找到一个可行解，立即结束
        #                 # 不要撤销选择，否则 board[i][j] 会被重置为 '.'
        #                 return
        
        #             # 撤销选择
        #             board[i][j] = '.'
        
        
        #     # 判断是否可以在 (r, c) 位置放置数字 num
        #     def isValid(self, board, r, c, num):
        #         for i in range(9):
        #             # 判断行是否存在重复
        #             if board[r][i] == num:
        #                 return False
        #             # 判断列是否存在重复
        #             if board[i][c] == num:
        #                 return False
        #             # 判断 3 x 3 方框是否存在重复
        #             if board[(r // 3) * 3 + i // 3][(c // 3) * 3 + i % 3] == num:
        #                 return False
        #         return True
        
        # Hash
        # class Solution:
        #     def __init__(self):
        #         # 标记是否已经找到可行解
        #         self.found = False
        #         # 记录每行已经出现的数字
        #         # 比如 rows[0] = {1, 2, 3} 表示第 0 行已经出现了数字 1, 2, 3
        #         self.rows = [set() for _ in range(9)]
        #         # 记录每列已经出现的数字
        #         self.cols = [set() for _ in range(9)]
        #         # 记录每个九宫格已经出现的数字
        #         self.boxes = [set() for _ in range(9)]
        
        
        #     def solveSudoku(self, board):
        #         # 将预设数字加入集合
        #         for i in range(9):
        #             for j in range(9):
        #                 if board[i][j] != '.':
        #                     self.rows[i].add(board[i][j])
        #                     self.cols[j].add(board[i][j])
        #                     self.boxes[self.getBoxIndex(i, j)].add(board[i][j])
        
        #         self.backtrack(board, 0)
        
        
        #     # 路径：board 中小于 index 的位置所填的数字
        #     # 选择列表：数字 1~9
        #     # 结束条件：整个 board 都填满数字
        #     def backtrack(self, board, index):
        #         if self.found:
        #             # 已经找到一个可行解，立即结束
        #             return
        
        #         m, n = 9, 9
        #         i, j = index // n, index % n
        #         if index == m * n:
        #             # 找到一个可行解，触发 base case
        #             self.found = True
        #             return
        
        #         if board[i][j] != '.':
        #             # 如果有预设数字，不用我们穷举
        #             self.backtrack(board, index + 1)
        #             return
        
        #         for ch in '123456789':
        #             # 剪枝：如果遇到不合法的数字，就跳过
        #             if not self.isValid(board, i, j, ch):
        #                 continue
        
        #             # 做选择，把 ch 填入 board[i][j]
        #             board[i][j] = ch
        #             self.rows[i].add(ch)
        #             self.cols[j].add(ch)
        #             self.boxes[self.getBoxIndex(i, j)].add(ch)
        
        #             self.backtrack(board, index + 1)
        #             if self.found:
        #                 # 如果找到一个可行解，立即结束
        #                 # 不要撤销选择，否则 board[i][j] 会被重置为 '.'
        #                 return
        
        #             # 撤销选择，把 board[i][j] 重置为 '.'
        #             board[i][j] = '.'
        #             self.rows[i].remove(ch)
        #             self.cols[j].remove(ch)
        #             self.boxes[self.getBoxIndex(i, j)].remove(ch)
        
        
        #     # 获取 (r, c) 所在的九宫格索引
        #     def getBoxIndex(self, r, c):
        #         return (r // 3) * 3 + c // 3
        
        #     # 判断是否可以在 (r, c) 位置放置数字 num
        #     def isValid(self, board, r, c, num):
        #         # 现在只需要查询三次哈希表即可
        #         if num in self.rows[r]:
        #             return False
        #         if num in self.cols[c]:
        #             return False
        #         if num in self.boxes[self.getBoxIndex(r, c)]:
        #             return False
        #         return True`,
            language: "python"
        },
        {
            id: 39,
            title: "Combination Sum",
            description: `Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order. The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different. The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.   Example 1: Input: candidates = [2,3,6,7], target = 7 Output: [[2,2,3],[7]] Explanation: 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times. 7 is a candidate, and 7 = 7. These are the only two combinations. Example 2: Input: candidates = [2,3,5], target = 8 Output: [[2,2,2,2],[2,3,3],[3,5]] Example 3: Input: candidates = [2], target = 1 Output: []   Constraints: 1 <= candidates.length <= 30 2 <= candidates[i] <= 40 All elements of candidates are distinct. 1 <= target <= 40
<a href="https://leetcode.com/problems/combination-sum/" target="_blank">https://leetcode.com/problems/combination-sum/</a>`,
            keywords: ["DFS", "Backtrack"],
            code: `        # No repeat putback
        # Combination: backtrack(i+1) -> backtrack(i)
        # backtrack(i+1) -> backtrack(i) // still prune choose before i,
        
        class Solution:
            def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
                self.sum = 0
                self.target = target
        
                candidates.sort()
                self.nums = candidates
                self.n = len(candidates)
        
                self.res = []
                self.track = []
        
                self.backtrack(0)
        
                return self.res
        
            def backtrack(self, i):
                if i == self.n:
                    return
                if self.sum == self.target:
                    self.res.append(self.track.copy())
                
                if self.sum > self.target:
                    return
                for index in range(i, self.n):
                    if index > i and self.nums[index] == self.nums[index-1]:
                        continue
                    self.sum += self.nums[index]
                    self.track.append(self.nums[index])
        
                    self.backtrack(index)
        
                    self.track.pop()
                    self.sum -= self.nums[index]
        
        # class Solution:
        #     def __init__(self):
        #         self.res = []
        #         # 记录回溯的路径
        #         self.track = []
        #         # 记录 track 中的路径和
        #         self.trackSum = 0
        
        #     def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        #         if len(candidates) == 0:
        #             return self.res
        #         self.backtrack(candidates, 0, target)
        #         return self.res
        
        #     # 回溯算法主函数
        #     def backtrack(self, nums: List[int], start: int, target: int) -> None:
        #         # base case，找到目标和，记录结果
        #         if self.trackSum == target:
        #             self.res.append(list(self.track))
        #             return
        #         # base case，超过目标和，停止向下遍历
        #         if self.trackSum > target:
        #             return
        
        #         # 回溯算法标准框架
        #         for i in range(start, len(nums)):
        #             # 选择 nums[i]
        #             self.trackSum += nums[i]
        #             self.track.append(nums[i])
        #             # 递归遍历下一层回溯树
        #             # 同一元素可重复使用，注意参数
        #             self.backtrack(nums, i, target)
        #             # 撤销选择 nums[i]
        #             self.trackSum -= nums[i]
        #             self.track.pop() `,
            language: "python"
        },
        {
            id: 40,
            title: "Combination Sum II",
            description: `Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target. Each number in candidates may only be used once in the combination. Note: The solution set must not contain duplicate combinations.   Example 1: Input: candidates = [10,1,2,7,6,1,5], target = 8 Output: [ [1,1,6], [1,2,5], [1,7], [2,6] ] Example 2: Input: candidates = [2,5,2,1,2], target = 5 Output: [ [1,2,2], [5] ]   Constraints: 1 <= candidates.length <= 100 1 <= candidates[i] <= 50 1 <= target <= 30
<a href="https://leetcode.com/problems/combination-sum-ii/" target="_blank">https://leetcode.com/problems/combination-sum-ii/</a>`,
            keywords: ["DFS", "Backtrack"],
            code: `        # Repeat No putback
        # subset (1, 2, 2’) -> (1, 2) (1, 2’) will give repeat
        # need sort! and detect nums[i] == nums[i-1]
        
        # summation add more checks on pruning and recording
        
        
        class Solution:
            def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
                self.res = []
                self.track = []
                self.sum = 0
                self.target = target
                
                candidates.sort()
                self.nums = candidates
                self.n = len(candidates)
        
                self.backtrack(0)
        
                return self.res
        
            def backtrack(self, i):
                if self.sum == self.target:
                    self.res.append(self.track.copy())
                    return
                    
                if self.sum > self.target:
                    return
        
                if i == self.n:
                    return
                
                for index in range(i, self.n):
                    if index > i and self.nums[index] == self.nums[index-1]:
                        continue
                    self.track.append(self.nums[index])
                    self.sum += self.nums[index]
        
                    self.backtrack(index + 1)
        
                    self.track.pop()
                    self.sum -= self.nums[index]
        
        # class Solution:
        #     def __init__(self):
        #         self.res = []
        #         # 记录回溯的路径
        #         self.track = []
        #         # 记录 track 中的元素之和
        #         self.trackSum = 0
            
        #     def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        #         if not candidates:
        #             return self.res
        #         # 先排序，让相同的元素靠在一起
        #         candidates.sort()
        #         self.backtrack(candidates, 0, target)
        #         return self.res
            
        #     # 回溯算法主函数
        #     def backtrack(self, nums: List[int], start: int, target: int):
        #         # base case，达到目标和，找到符合条件的组合
        #         if self.trackSum == target:
        #             self.res.append(self.track[:])
        #             return
        #         # base case，超过目标和，直接结束
        #         if self.trackSum > target:
        #             return
                
        #         # 回溯算法标准框架
        #         for i in range(start, len(nums)):
        #             # 剪枝逻辑，值相同的树枝，只遍历第一条
        #             if i > start and nums[i] == nums[i - 1]:
        #                 continue
        #             # 做选择
        #             self.track.append(nums[i])
        #             self.trackSum += nums[i]
        #             # 递归遍历下一层回溯树
        #             self.backtrack(nums, i + 1, target)
        #             # 撤销选择
        #             self.track.pop()
        #             self.trackSum -= nums[i]`,
            language: "python"
        },
        {
            id: 42,
            title: "Trapping Rain Water",
            description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.   Example 1: Input: height = [0,1,0,2,1,0,1,3,2,1,2,1] Output: 6 Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped. Example 2: Input: height = [4,2,0,3,2,5] Output: 9   Constraints: n == height.length 1 <= n <= 2 * 104 0 <= height[i] <= 105
<a href="https://leetcode.com/problems/trapping-rain-water/" target="_blank">https://leetcode.com/problems/trapping-rain-water/</a>`,
            keywords: ["Array"],
            code: `        # just scan left->right once and right to left once
        # or use two pointers, and advance left if l_max < r_max (left is now at l_max), vv.
        
        # or just scan twice
        class Solution:
            def trap(self, height: List[int]) -> int:
                left, right = 0, len(height) - 1
                l_max, r_max = 0, 0
        
                res = 0
                while left < right:
                    l_max = max(l_max, height[left])
                    r_max = max(r_max, height[right])
        
                    # res += min(l_max, r_max) - height[i]
                    if l_max < r_max:
                        res += l_max - height[left]
                        #<extend up -250>
                        #![](/images/algo/rain-water/5.jpg)
                        left += 1
                    else:
                        res += r_max - height[right]
                        right -= 1
                return res`,
            language: "python"
        },
        {
            id: 45,
            title: "Jump Game II",
            description: `You are given a 0-indexed array of integers nums of length n. You are initially positioned at index 0. Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at index i, you can jump to any index (i + j) where: 0 <= j <= nums[i] and i + j < n Return the minimum number of jumps to reach index n - 1. The test cases are generated such that you can reach index n - 1.   Example 1: Input: nums = [2,3,1,1,4] Output: 2 Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index. Example 2: Input: nums = [2,3,0,1,4] Output: 2   Constraints: 1 <= nums.length <= 104 0 <= nums[i] <= 1000 It's guaranteed that you can reach nums[n - 1].
<a href="https://leetcode.com/problems/jump-game-ii/" target="_blank">https://leetcode.com/problems/jump-game-ii/</a>`,
            keywords: ["Greedy"],
            code: `        # memo1, memo2, step
        
        class Solution:
            def jump(self, nums: List[int]) -> int:
                memo1 = 0
                memo2 = 0
                step = 0
                n = len(nums)
        
                for i in range(n):
                    cur = nums[i]
                    if i <= memo1 and i + cur > memo2:
                        # update memo2
                        memo2 = i + cur
                    if i == memo1+1:
                        step += 1
                        memo1 = memo2
                        # init memo2
                        memo2 = i + cur
                return step
        
        # class Solution:
        #     def jump(self, nums: list[int]) -> int:
        #         if len(nums) <= 1:
        #             return 0
        #         n = len(nums)
        #         # jumps 步可以跳到索引区间 [i, end]
        #         end = 0
        #         jumps = 0
        #         # 在 [i, end] 区间内，最远可以跳到的索引是 farthest
        #         farthest = 0
        #         for i in range(n - 1):
        #             # 计算从索引 i 可以跳到的最远索引
        #             farthest = max(nums[i] + i, farthest)
        #             if i == end:
        #                 # [i, end] 区间是 jumps 步可达的索引范围
        #                 # 现在已经遍历完 [i, end]，所以需要再跳一步
        #                 jumps += 1
        #                 end = farthest
        #                 if farthest >= n - 1:
        #                     # 如果已经可以到达终点，则可以直接返回
        #                     return jumps
        #         # 如果无法到达终点，则返回 -1
        #         return -1`,
            language: "python"
        },
        {
            id: 46,
            title: "Permutations",
            description: `Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.   Example 1: Input: nums = [1,2,3] Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] Example 2: Input: nums = [0,1] Output: [[0,1],[1,0]] Example 3: Input: nums = [1] Output: [[1]]   Constraints: 1 <= nums.length <= 6 -10 <= nums[i] <= 10 All the integers of nums are unique.
<a href="https://leetcode.com/problems/permutations/" target="_blank">https://leetcode.com/problems/permutations/</a>`,
            keywords: ["DFS", "Backtrack"],
            code: `        # Backtrack: 其核心就是 for 循环里面的递归，在递归调用之前「做选择」，在递归调用之后「撤销选择」，
        
        # No repeat No putback
        
        # keep self.used, no need to track cur index, used is tracked
        
        class Solution:
            def permute(self, nums: List[int]) -> List[List[int]]:
                self.res = []
                self.track = []
                self.nums = nums
                self.n = len(nums)
                self.used = [False] * self.n
                self.backtrack()
        
                return self.res
            
            def backtrack(self):
        
                if len(self.track) == self.n:
                    self.res.append(self.track.copy())
                
                # no need to track cur index, used is tracked
                for index in range(self.n):
                    if not self.used[index]:
                        self.used[index] = True
                        self.track.append(self.nums[index])
        
                        self.backtrack()
        
                        self.used[index] = False
                        self.track.pop()
        
        # class Solution:
        #     def permute(self, nums: List[int]) -> List[List[int]]:
        #         self.res = []
        #         self.path = []
        #         self.selected = [0 for i in nums]
        #         self.nums = nums
        #         self.helper()
        #         return self.res
            
        #     def helper(self):
        #         if len(self.path) == len(self.nums):
        #             self.res.append(self.path.copy())
                
        #         for i in range(len(self.nums)):
        #             if self.selected[i]:
        #                 continue
        #             self.selected[i] = True
        #             self.path.append(self.nums[i])
        #             self.helper()
        #             self.path.pop()
        #             self.selected[i] = False
        
        # class Solution:
        #     def __init__(self):
        #         self.res = []
        
        #     # 主函数，输入一组不重复的数字，返回它们的全排列
        #     def permute(self, nums):
        #         # 记录「路径」
        #         track = []
        #         # 「路径」中的元素会被标记为 true，避免重复使用
        #         used = [False] * len(nums)
                
        #         self.backtrack(nums, track, used)
        #         return self.res
        
        #     # 路径：记录在 track 中
        #     # 选择列表：nums 中不存在于 track 的那些元素（used[i] 为 false）
        #     # 结束条件：nums 中的元素全都在 track 中出现
        #     def backtrack(self, nums, track, used):
        #         # 触发结束条件
        #         if len(track) == len(nums):
        #             self.res.append(track.copy())
        #             return
        
        #         for i in range(len(nums)):
        #             # 排除不合法的选择
        #             if used[i]:
        #                 # nums[i] 已经在 track 中，跳过
        #                 continue
        #             # 做选择
        #             track.append(nums[i])
        #             used[i] = True
        #             # 进入下一层决策树
        #             self.backtrack(nums, track, used)
        #             # 取消选择
        #             track.pop()
        #             used[i] = False
        
        # class Solution:
        #     def __init__(self):
        #         # 存储所有排列结果的列表
        #         self.res = []
        #         # 记录回溯算法的递归路径
        #         self.track = []
        #         # track 中的元素会被标记为 true
        #         self.used = []
            
        #     # 主函数，输入一组不重复的数字，返回它们的全排列
        #     def permute(self, nums: List[int]) -> List[List[int]]:
        #         self.used = [False] * len(nums)
        #         self.backtrack(nums)
        #         return self.res
            
        #     # 回溯算法核心函数
        #     def backtrack(self, nums: List[int]) -> None:
        #         # base case，到达叶子节点
        #         if len(self.track) == len(nums):
        #             # 收集叶子节点上的值
        #             self.res.append(self.track[:])
        #             return
                
        #         # 回溯算法标准框架
        #         for i in range(len(nums)):
        #             # 已经存在 track 中的元素，不能重复选择
        #             if self.used[i]:
        #                 continue
        #             # 做选择
        #             self.used[i] = True
        #             self.track.append(nums[i])
        #             # 进入下一层回溯树
        #             self.backtrack(nums)
        #             # 取消选择
        #             self.track.pop()
        #             self.used[i] = False`,
            language: "python"
        },
        {
            id: 47,
            title: "Permutations II",
            description: `Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.   Example 1: Input: nums = [1,1,2] Output: [[1,1,2], [1,2,1], [2,1,1]] Example 2: Input: nums = [1,2,3] Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]   Constraints: 1 <= nums.length <= 8 -10 <= nums[i] <= 10
<a href="https://leetcode.com/problems/permutations-ii/" target="_blank">https://leetcode.com/problems/permutations-ii/</a>`,
            keywords: ["DFS", "Backtrack"],
            code: `        # Repeat No putback
        # above + self.used[i-1] (previous one if same they must be used but not cur one)
        
        
        class Solution:
            def permuteUnique(self, nums: List[int]) -> List[List[int]]:
                self.res = []
                self.track = []
        
                nums.sort()
                self.nums = nums
                self.n = len(nums)
        
                self.used = [False] * self.n
        
                self.backtrack()
                return self.res
        
            def backtrack(self):
                if len(self.track) == self.n:
                    self.res.append(self.track.copy())
                    return
                
                for index in range(self.n):
                    # used inside loop
                    if self.used[index]:
                        continue
                    if index > 0 and self.nums[index] == self.nums[index-1] and not self.used[index-1]:
                        continue
                    self.used[index] = True
                    self.track.append(self.nums[index])
        
                    self.backtrack()
        
                    self.used[index] = False
                    self.track.pop()
        # class Solution:
        #     def __init__(self):
        #         self.res = []
        #         self.track = []
        #         self.used = []
            
        #     def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        #         # 先排序，让相同的元素靠在一起
        #         nums.sort()
        #         self.used = [False] * len(nums)
        #         self.backtrack(nums)
        #         return self.res
            
        #     def backtrack(self, nums: List[int]) -> None:
        #         if len(self.track) == len(nums):
        #             self.res.append(self.track[:])
        #             return
        
        #         for i in range(len(nums)):
        #             if self.used[i]:
        #                 continue
        #             # 新添加的剪枝逻辑，固定相同的元素在排列中的相对位置
        #             if i > 0 and nums[i] == nums[i - 1] and not self.used[i - 1]:
        #                 continue
        #             self.track.append(nums[i])
        #             self.used[i] = True
        #             self.backtrack(nums)
        #             self.track.pop()
        #             self.used[i] = False`,
            language: "python"
        },
        {
            id: 48,
            title: "Rotate Image",
            description: `You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.   Example 1: Input: matrix = [[1,2,3],[4,5,6],[7,8,9]] Output: [[7,4,1],[8,5,2],[9,6,3]] Example 2: Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]] Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]   Constraints: n == matrix.length == matrix[i].length 1 <= n <= 20 -1000 <= matrix[i][j] <= 1000
<a href="https://leetcode.com/problems/rotate-image/" target="_blank">https://leetcode.com/problems/rotate-image/</a>`,
            keywords: ["Array", "Array Traverse"],
            code: `        # rotate = transpose + row-reverse
        class Solution:
            def rotate(self, matrix: List[List[int]]) -> None:
                """
                Do not return anything, modify matrix in-place instead.
                """
                n = len(matrix)
                for i in range(n):
                    for j in range(i, n):
                        matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
                
                for i in range(len(matrix)):
                    for j in range(n//2):
                        matrix[i][j], matrix[i][n-1-j] = matrix[i][n-1-j], matrix[i][j]
                `,
            language: "python"
        },
        {
            id: 51,
            title: "N-Queens",
            description: `The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order. Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.   Example 1: Input: n = 4 Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]] Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above Example 2: Input: n = 1 Output: [["Q"]]   Constraints: 1 <= n <= 9
<a href="https://leetcode.com/problems/n-queens/" target="_blank">https://leetcode.com/problems/n-queens/</a>`,
            keywords: ["DFS", "Backtrack"],
            code: `        # each row has just one Queen, then progress by row not by cell
        
        class Solution:
            def solveNQueens(self, n: int) -> List[List[str]]:
                self.n = n
                self.res = []
                self.board = []
                self.backtrack(0)
                return self.res
            
            # because we put only 1 Queen a row, thus process by row instead of cell
            def backtrack(self, i):
                if i == self.n:
                    self.res.append([self.index2str(x) for x in self.board])
                    return
                for row in range(self.n):
                    if self.checkValid(i, row):
                        self.board.append(row)
                        self.backtrack(i+1)
                        self.board.pop()
                
        
            def index2str(self, i):
                return "." * i + "Q" + "." * (self.n-1-i)
        
            def checkValid(self, i, pos):
                for index, row in enumerate(self.board):
                    if row == pos:
                        return False
                    if abs(i - index) == abs(pos - row):
                        return False
                
                return True
                    
        
        # class Solution:
        #     def __init__(self):
        #         self.res = []
        
        #     # 输入棋盘边长 n，返回所有合法的放置
        #     def solveNQueens(self, n: int) -> List[List[str]]:
        #         # '.' 表示空，'Q' 表示皇后，初始化空棋盘。
        #         board = ["." * n for _ in range(n)]
        #         self.backtrack(board, 0)
        #         return self.res
        
        #     # 路径：board 中小于 row 的那些行都已经成功放置了皇后
        #     # 选择列表：第 row 行的所有列都是放置皇后的选择
        #     # 结束条件：row 超过 board 的最后一行
        #     def backtrack(self, board: List[str], row: int) -> None:
        #         # 触发结束条件
        #         if row == len(board):
        #             self.res.append(board[:])
        #             return
                
        #         n = len(board)
        #         for col in range(n):
        #             # 排除不合法选择
        #             if not self.isValid(board, row, col):
        #                 continue
        #             # 做选择
        #             board[row] = board[row][:col] + 'Q' + board[row][col+1:]
        #             # 进入下一行决策
        #             self.backtrack(board, row + 1)
        #             # 撤销选择
        #             board[row] = board[row][:col] + '.' + board[row][col+1:]
        
        #     # 是否可以在 board[row][col] 放置皇后？
        #     def isValid(self, board: List[str], row: int, col: int) -> bool:
        #         n = len(board)
        #         # 检查列是否有皇后互相冲突
        #         for i in range(row):
        #             if board[i][col] == 'Q':
        #                 return False
        #         # 检查右上方是否有皇后互相冲突
        #         for i, j in zip(range(row - 1, -1, -1), range(col + 1, n)):
        #             if board[i][j] == 'Q':
        #                 return False
        #         # 检查左上方是否有皇后互相冲突
        #         for i, j in zip(range(row - 1, -1, -1), range(col - 1, -1, -1)):
        #             if board[i][j] == 'Q':
        #                 return False
        #         return True`,
            language: "python"
        },
        {
            id: 52,
            title: "N-Queens II",
            description: `The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return the number of distinct solutions to the n-queens puzzle.   Example 1: Input: n = 4 Output: 2 Explanation: There are two distinct solutions to the 4-queens puzzle as shown. Example 2: Input: n = 1 Output: 1   Constraints: 1 <= n <= 9
<a href="https://leetcode.com/problems/n-queens-ii/description/" target="_blank">https://leetcode.com/problems/n-queens-ii/description/</a>`,
            keywords: ["DFS", "Backtrack"],
            code: `        class Solution:
            def totalNQueens(self, n: int) -> int:
                self.n = n
                self.res = 0
                self.board = []
                self.backtrack(0)
                return self.res
            
            # because we put only 1 Queen a row, thus process by row instead of cell
            def backtrack(self, i):
                if i == self.n:
                    self.res+=1
                    return
                    
                for row in range(self.n):
                    if self.checkValid(i, row):
                        self.board.append(row)
                        self.backtrack(i+1)
                        self.board.pop()
                
        
            def index2str(self, i):
                return "." * i + "Q" + "." * (self.n-1-i)
        
            def checkValid(self, i, pos):
                for index, row in enumerate(self.board):
                    if row == pos:
                        return False
                    if abs(i - index) == abs(pos - row):
                        return False
                
                return True`,
            language: "python"
        },
        {
            id: 53,
            title: "Maximum Subarray",
            description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.   Example 1: Input: nums = [-2,1,-3,4,-1,2,1,-5,4] Output: 6 Explanation: The subarray [4,-1,2,1] has the largest sum 6. Example 2: Input: nums = [1] Output: 1 Explanation: The subarray [1] has the largest sum 1. Example 3: Input: nums = [5,4,-1,7,8] Output: 23 Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.   Constraints: 1 <= nums.length <= 105 -104 <= nums[i] <= 104   Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.
<a href="https://leetcode.com/problems/maximum-subarray/" target="_blank">https://leetcode.com/problems/maximum-subarray/</a>`,
            keywords: ["DP"],
            code: `        # sliding window is a pruning of children. the dp thought is embedded in window increase/descrease process.
        # 以负数开头的话，把这个负数去掉，就可以得到和更大的子数组了
        # or dp, or prefix sum
        
        class Solution:
            def maxSubArray(self, nums: List[int]) -> int:
                n = len(nums)
                memo = [0] * (n + 1)
                for i in range(1, n+1):
                    memo[i] = max(memo[i-1]+nums[i-1], nums[i-1])
                return max(memo[1:])
        
        # sliding window
        # class Solution:
        #     def maxSubArray(self, nums: List[int]) -> int:
        #         left, right = 0, 0
        #         windowSum, maxSum = 0, float('-inf')
                   
        #         while right < len(nums):
        #             # 扩大窗口并更新窗口内的元素和
        #             windowSum += nums[right]
        #             right += 1
                    
        #             # 更新答案
        #             maxSum = max(windowSum, maxSum)
                    
        #             # 判断窗口是否要收缩
        #             while windowSum < 0:
        #                 # 缩小窗口并更新窗口内的元素和
        #                 windowSum -= nums[left]
        #                 left += 1
                        
        #         return maxSum
        
        # dp
        # class Solution:
        #     def maxSubArray(self, nums: List[int]) -> int:
        #         n = len(nums)
        #         if n == 0:
        #             return 0
        #         # base case
        #         # dp_i 记录以 nums[i] 为结尾的「最大子数组和」
        #         dp_i = nums[0]
        #         res = dp_i
        #         for i in range(1, n):
        #             # dp_i 相当于 dp[i-1]，计算完成后变成新的 dp[i]
        #             dp_i = max(nums[i], nums[i] + dp_i)
        #             res = max(res, dp_i)
        #         return res
        
        # prefix sum
        # 前缀和技巧解题
        # class Solution:
        #     def maxSubArray(self, nums: List[int]) -> int:
        #         n = len(nums)
        #         preSum = [0] * (n + 1)
        #         preSum[0] = 0
        #         # 构造 nums 的前缀和数组
        #         for i in range(1, n + 1):
        #             preSum[i] = preSum[i - 1] + nums[i - 1]
                
        #         res = float('-inf')
        #         minVal = float('inf')
        #         for i in range(n):
        #             # 维护 minVal 是 preSum[0..i] 的最小值
        #             minVal = min(minVal, preSum[i])
        #             # 以 nums[i] 结尾的最大子数组和就是 preSum[i+1] - min(preSum[0..i])
        #             res = max(res, preSum[i + 1] - minVal)
        #         return res`,
            language: "python"
        },
        {
            id: 54,
            title: "Spiral Matrix",
            description: `Given an m x n matrix, return all elements of the matrix in spiral order.   Example 1: Input: matrix = [[1,2,3],[4,5,6],[7,8,9]] Output: [1,2,3,6,9,8,7,4,5] Example 2: Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]] Output: [1,2,3,4,8,12,11,10,9,5,6,7]   Constraints: m == matrix.length n == matrix[i].length 1 <= m, n <= 10 -100 <= matrix[i][j] <= 100
<a href="https://leetcode.com/problems/spiral-matrix/" target="_blank">https://leetcode.com/problems/spiral-matrix/</a>`,
            keywords: ["Array", "Array Traverse"],
            code: `        # break to 4 loops, each end check exceed m*n
        
        class Solution:
            def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
                m = len(matrix)
                n = len(matrix[0])
                rl = 0
                ru = m-1
                cl = 0
                cu = n-1
        
                res = []
                cnt = 0
                while cnt < m*n:
                    for i in range(cl, cu+1):
                        res.append(matrix[rl][i])
                        cnt += 1
                    rl += 1
                    if cnt >= m*n:
                        break
                    for i in range(rl, ru+1):
                        res.append(matrix[i][cu])
                        cnt += 1
                    cu -= 1
                    if cnt >= m*n:
                        break
                    for i in range(cu, cl-1, -1):
                        res.append(matrix[ru][i])
                        cnt += 1
                    ru -= 1
                    if cnt >= m*n:
                        break
                    for i in range(ru, rl-1, -1):
                        res.append(matrix[i][cl])
                        cnt += 1
                    cl += 1
                return res`,
            language: "python"
        },
        {
            id: 55,
            title: "Jump Game",
            description: `You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.   Example 1: Input: nums = [2,3,1,1,4] Output: true Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index. Example 2: Input: nums = [3,2,1,0,4] Output: false Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.   Constraints: 1 <= nums.length <= 104 0 <= nums[i] <= 105
<a href="https://leetcode.com/problems/jump-game/" target="_blank">https://leetcode.com/problems/jump-game/</a>`,
            keywords: ["Greedy"],
            code: `        # Greedy: Compression of a tree nodes
        
        # farthest
        
        class Solution:
            def canJump(self, nums: List[int]) -> bool:
                n = len(nums)
                memo = 0
        
                for i in range(n):
                    cur = nums[i]
                    memo = max(memo, i + cur)
        
                    if memo == i and i != n-1:
                        return False
                
                return True
        
        # class Solution:
        #     def canJump(self, nums: List[int]) -> bool:
        #         n = len(nums)
        #         farthest = 0
        #         for i in range(n - 1):
        #             # 不断计算能跳到的最远距离
        #             farthest = max(farthest, i + nums[i])
        #             # 可能碰到了 0，卡住跳不动了
        #             if farthest <= i:
        #                 return False
        #         return farthest >= n - 1`,
            language: "python"
        },
        {
            id: 56,
            title: "Merge Intervals",
            description: `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.   Example 1: Input: intervals = [[1,3],[2,6],[8,10],[15,18]] Output: [[1,6],[8,10],[15,18]] Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6]. Example 2: Input: intervals = [[1,4],[4,5]] Output: [[1,5]] Explanation: Intervals [1,4] and [4,5] are considered overlapping. Example 3: Input: intervals = [[4,7],[1,4]] Output: [[1,7]] Explanation: Intervals [1,4] and [4,7] are considered overlapping.   Constraints: 1 <= intervals.length <= 104 intervals[i].length == 2 0 <= starti <= endi <= 104
<a href="https://leetcode.com/problems/merge-intervals/" target="_blank">https://leetcode.com/problems/merge-intervals/</a>`,
            keywords: ["Range"],
            code: `        # case4: merge range: sort start, greedy (disjoint or not)
        
        class Solution:
            def merge(self, intervals: List[List[int]]) -> List[List[int]]:
                res = []
                # 按区间的 start 升序排列
                intervals.sort(key=lambda x: x[0])
        
                res.append(intervals[0])
                for i in range(1, len(intervals)):
                    curr = intervals[i]
                    # res 中最后一个元素的引用
                    last = res[-1]
                    if curr[0] <= last[1]:
                        last[1] = max(last[1], curr[1])
                    else:
                        # 处理下一个待合并区间
                        res.append(curr)
                return res`,
            language: "python"
        },
        {
            id: 59,
            title: "Spiral Matrix II",
            description: `Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.   Example 1: Input: n = 3 Output: [[1,2,3],[8,9,4],[7,6,5]] Example 2: Input: n = 1 Output: [[1]]   Constraints: 1 <= n <= 20
<a href="https://leetcode.com/problems/spiral-matrix-ii/" target="_blank">https://leetcode.com/problems/spiral-matrix-ii/</a>`,
            keywords: ["Array", "Array Traverse"],
            code: `        class Solution:
            def generateMatrix(self, n: int) -> List[List[int]]:
                rl = 0
                ru = n-1
                cl = 0
                cu = n-1
        
                matrix = []
                for i in range(n):   
                    temp = []    
                    for j in range(n):
                        temp.append(0)
                    matrix.append(temp)
        
                cnt = 1
                while cnt <= n*n:
                    for i in range(cl, cu+1):
                        matrix[rl][i] = cnt
                        cnt += 1
                    rl += 1
                    if cnt > n*n:
                        break
                    for i in range(rl, ru+1):
                        matrix[i][cu] = cnt
                        cnt += 1
                    cu -= 1
                    if cnt > n*n:
                        break
                    for i in range(cu, cl-1, -1):
                        matrix[ru][i] = cnt
                        cnt += 1
                    ru -= 1
                    if cnt > n*n:
                        break
                    for i in range(ru, rl-1, -1):
                        matrix[i][cl] = cnt
                        cnt += 1
                    cl += 1
                return matrix`,
            language: "python"
        },
        {
            id: 61,
            title: "Rotate List",
            description: `Given the head of a linked list, rotate the list to the right by k places.   Example 1: Input: head = [1,2,3,4,5], k = 2 Output: [4,5,1,2,3] Example 2: Input: head = [0,1,2], k = 4 Output: [2,0,1]   Constraints: The number of nodes in the list is in the range [0, 500]. -100 <= Node.val <= 100 0 <= k <= 2 * 109
<a href="https://leetcode.com/problems/rotate-list/" target="_blank">https://leetcode.com/problems/rotate-list/</a>`,
            keywords: ["Array", "Array Traverse"],
            code: `        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, val=0, next=None):
        #         self.val = val
        #         self.next = next
        
        # total num, dummy, slow fast
        
        class Solution:
            def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
                if head is None:
                    return head
                
                num = 0
                p = head
                while p:
                    num += 1
                    p = p.next
                
                k = k % num
                
                if k == 0:
                    return head
        
                dummy = ListNode(-1)
                dummy.next = head
                slow = dummy
                fast = dummy
                while k > 0:
                    fast = fast.next
                    k -= 1
                
                while fast.next:
                    slow = slow.next
                    fast = fast.next
                
                res = slow.next
                fast.next = head
                slow.next = None
                return res
                `,
            language: "python"
        },
        {
            id: 70,
            title: "Climbing Stairs",
            description: `You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?   Example 1: Input: n = 2 Output: 2 Explanation: There are two ways to climb to the top. 1. 1 step + 1 step 2. 2 steps Example 2: Input: n = 3 Output: 3 Explanation: There are three ways to climb to the top. 1. 1 step + 1 step + 1 step 2. 1 step + 2 steps 3. 2 steps + 1 step   Constraints: 1 <= n <= 45
<a href="https://leetcode.com/problems/climbing-stairs/description/" target="_blank">https://leetcode.com/problems/climbing-stairs/description/</a>`,
            keywords: ["DP"],
            code: `        class Solution:
            def climbStairs(self, n: int) -> int:
                self.memo = [0] * (n+1)
                self.memo[1] = 1
                self.memo[0] = 1
                return self.helper(n)
            
            def helper(self, n):
                if n < 2:
                    return 1
                if self.memo[n] != 0:
                    return self.memo[n]
                self.memo[n] = self.helper(n-1) + self.helper(n-2)
                return self.memo[n]`,
            language: "python"
        },
        {
            id: 71,
            title: "Simplify Path",
            description: `You are given an absolute path for a Unix-style file system, which always begins with a slash '/'. Your task is to transform this absolute path into its simplified canonical path. The rules of a Unix-style file system are as follows: A single period '.' represents the current directory. A double period '..' represents the previous/parent directory. Multiple consecutive slashes such as '//' and '///' are treated as a single slash '/'. Any sequence of periods that does not match the rules above should be treated as a valid directory or file name. For example, '...' and '....' are valid directory or file names. The simplified canonical path should follow these rules: The path must start with a single slash '/'. Directories within the path must be separated by exactly one slash '/'. The path must not end with a slash '/', unless it is the root directory. The path must not have any single or double periods ('.' and '..') used to denote current or parent directories. Return the simplified canonical path.   Example 1: Input: path = "/home/" Output: "/home" Explanation: The trailing slash should be removed. Example 2: Input: path = "/home//foo/" Output: "/home/foo" Explanation: Multiple consecutive slashes are replaced by a single one. Example 3: Input: path = "/home/user/Documents/../Pictures" Output: "/home/user/Pictures" Explanation: A double period ".." refers to the directory up a level (the parent directory). Example 4: Input: path = "/../" Output: "/" Explanation: Going one level up from the root directory is not possible. Example 5: Input: path = "/.../a/../b/c/../d/./" Output: "/.../b/d" Explanation: "..." is a valid name for a directory in this problem.   Constraints: 1 <= path.length <= 3000 path consists of English letters, digits, period '.', slash '/' or '_'. path is a valid absolute Unix path.
<a href="https://leetcode.com/problems/simplify-path/description/" target="_blank">https://leetcode.com/problems/simplify-path/description/</a>`,
            keywords: ["Stack"],
            code: `        class Solution:
            def simplifyPath(self, path: str) -> str:
                paths = path.split('/')
                res = []
                for p in paths:
                    if p == '.':
                        continue
                    elif p == '..':
                        if res:
                            res.pop()
                    elif p:
                        res.append(p)
                
                if res:
                    return '/' + '/'.join(res)
                return '/'`,
            language: "python"
        },
        {
            id: 72,
            title: "Edit Distance",
            description: `Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have the following three operations permitted on a word: Insert a character Delete a character Replace a character   Example 1: Input: word1 = "horse", word2 = "ros" Output: 3 Explanation: horse -> rorse (replace 'h' with 'r') rorse -> rose (remove 'r') rose -> ros (remove 'e') Example 2: Input: word1 = "intention", word2 = "execution" Output: 5 Explanation: intention -> inention (remove 't') inention -> enention (replace 'i' with 'e') enention -> exention (replace 'n' with 'x') exention -> exection (replace 'n' with 'c') exection -> execution (insert 'u')   Constraints: 0 <= word1.length, word2.length <= 500 word1 and word2 consist of lowercase English letters.
<a href="https://leetcode.com/problems/edit-distance/" target="_blank">https://leetcode.com/problems/edit-distance/</a>`,
            keywords: ["DP"],
            code: `        # 我更愿意称其为subset tree。只有限定node在一个集合的子集之内，才能确保可枚举，才能做到子问题重合。之前回溯和bfs法树的节点过于分散。
        # def -> convert -> directions -> init
        
        # Extension:
        # How to record?
        # Node: dp_val, choice
        
        class Solution:
            def minDistance(self, word1: str, word2: str) -> int:
                m = len(word1)
                n = len(word2)
        
                # state: str1, str2
                memo = [[0 for j in range(n+1)]  for i in range(m+1)]
        
                # convert: str1 change to str2, 
                # can we only look at the last char? i.e. const probe
                # str1[:-1] -> str2, delete a char
                # str1 -> str2[:-1], add a char
                # str1[:-1] -> str2[:-1], change or skip
        
                # init:
                # direction from convert: 3 
                # empty -> empty, 1 -> empty, empty -> 1
        
                for i in range(1, m+1):
                    memo[i][0] = i
                for j in range(1, n+1):
                    memo[0][j] = j
                
                for i in range(1, m+1):
                    for j in range(1, n+1):
                        memo[i][j] = memo[i][j-1] + 1
                        memo[i][j] = min(memo[i][j], memo[i-1][j] + 1)
                        memo[i][j] = min(memo[i][j], memo[i-1][j-1] + (1 if word1[i-1] != word2[j-1] else 0))
                
                return memo[m][n]
        
        # class Solution:
        #     def minDistance(self, s1: str, s2: str) -> int:
        #         m, n = len(s1), len(s2)
        #         dp = [[0] * (n + 1) for _ in range(m + 1)]
        #         # base case
        #         for i in range(1, m + 1):
        #             dp[i][0] = i
        #         for j in range(1, n + 1):
        #             dp[0][j] = j
        #         # 自底向上求解
        #         for i in range(1, m + 1):
        #             for j in range(1, n + 1):
        #                 if s1[i - 1] == s2[j - 1]:
        #                     dp[i][j] = dp[i - 1][j - 1]
        #                 else:
        #                     dp[i][j] = min(
        #                         dp[i - 1][j] + 1,
        #                         dp[i][j - 1] + 1,
        #                         dp[i - 1][j - 1] + 1
        #                     )
        #         # 储存着整个 s1 和 s2 的最小编辑距离
        #         return dp[m][n]`,
            language: "python"
        },
        {
            id: 75,
            title: "Sort Colors",
            description: `Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively. You must solve this problem without using the library's sort function.   Example 1: Input: nums = [2,0,2,1,1,0] Output: [0,0,1,1,2,2] Example 2: Input: nums = [2,0,1] Output: [0,1,2]   Constraints: n == nums.length 1 <= n <= 300 nums[i] is either 0, 1, or 2.   Follow up: Could you come up with a one-pass algorithm using only constant extra space?
<a href="https://leetcode.com/problems/sort-colors/" target="_blank">https://leetcode.com/problems/sort-colors/</a>`,
            keywords: ["Array", "2ptr"],
            code: `        # left, right, cur. put cur val 0/2 to left or right
        # careful cur always >= left
        
        class Solution:
            def sortColors(self, nums: List[int]) -> None:
                """
                Do not return anything, modify nums in-place instead.
                """
                red = 0
                cur = 0
                blue = len(nums) - 1
                while cur <= blue:
                    if nums[cur] == 0:
                        tmp = nums[red]
                        nums[red] = 0
                        nums[cur] = tmp
                        red += 1
                        if red > cur:
                            cur = red
                    elif nums[cur] == 2:
                        tmp = nums[blue]
                        nums[blue] = 2
                        nums[cur] = tmp
                        blue -= 1
                    else:
                        cur += 1`,
            language: "python"
        },
        {
            id: 76,
            title: "Minimum Window Substring",
            description: `Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "". The testcases will be generated such that the answer is unique.   Example 1: Input: s = "ADOBECODEBANC", t = "ABC" Output: "BANC" Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t. Example 2: Input: s = "a", t = "a" Output: "a" Explanation: The entire string s is the minimum window. Example 3: Input: s = "a", t = "aa" Output: "" Explanation: Both 'a's from t must be included in the window. Since the largest window of s only has one 'a', return empty string.   Constraints: m == s.length n == t.length 1 <= m, n <= 105 s and t consist of uppercase and lowercase English letters.   Follow up: Could you find an algorithm that runs in O(m + n) time?
<a href="https://leetcode.com/problems/minimum-window-substring/" target="_blank">https://leetcode.com/problems/minimum-window-substring/</a>`,
            keywords: ["SlidingWindow"],
            code: `        # 1、什么时候应该移动 right 扩大窗口？窗口加入字符时，应该更新哪些数据？
        
        # 2、什么时候窗口应该暂停扩大，开始移动 left 缩小窗口？从窗口移出字符时，应该更新哪些数据？
        
        # 3、什么时候应该更新结果？
        
        
        # only update cnt when matching the count
        # only update the char_cnt when need it
        # follow increase/decrease/update pattern
        
        class Solution:
            def minWindow(self, s: str, t: str) -> str:
                needs = {}
                window = {}
                # should use map instead of set, since duplicates are considered
                for c in t:
                    needs[c] = needs.get(c, 0) + 1
                left = 0
                right = 0
        
                res = ""
                res_len = 10**5 + 1
        
                cnt = 0
                # increase
                while right < len(s):
                    cur_c = s[right]
                    cur_cnt = window.get(cur_c, 0)
                    cur_need = needs.get(cur_c, 0)
                    
                    if cur_need:
                        window[cur_c] = cur_cnt + 1
                        if cur_cnt < cur_need:
                            cnt += 1
                    
                    # decrease
                    while cnt == len(t):
                        # update
                        if right - left + 1 < res_len:
                            res = s[left:right+1]
                            res_len = len(res)
        
                        cur_c = s[left]
                        cur_cnt = window.get(cur_c, 0)
                        cur_need = needs.get(cur_c, 0)
                        left += 1
                        
                        if cur_need:
                            window[cur_c] = cur_cnt - 1
                            if  cur_cnt == cur_need:
                                cnt -= 1
        
        
                    right += 1
                return res`,
            language: "python"
        },
        {
            id: 77,
            title: "Combinations",
            description: `Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n]. You may return the answer in any order.   Example 1: Input: n = 4, k = 2 Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]] Explanation: There are 4 choose 2 = 6 total combinations. Note that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination. Example 2: Input: n = 1, k = 1 Output: [[1]] Explanation: There is 1 choose 1 = 1 total combination.   Constraints: 1 <= n <= 20 1 <= k <= n
<a href="https://leetcode.com/problems/combinations/" target="_blank">https://leetcode.com/problems/combinations/</a>`,
            keywords: ["DFS", "Backtrack"],
            code: `        # No repeat No putback
        
        class Solution:
            def combine(self, n: int, k: int) -> List[List[int]]:
                self.track = []
                self.res = []
                self.nums = list(range(1, n+1))
                self.n = n
                self.k = k
                self.backtrack(0)
                return self.res
        
            def backtrack(self, i):
                if len(self.track) == self.k:
                    self.res.append(self.track.copy())
                    return
                if i == self.n:
                    return
        
                for index in range(i, self.n):
                    self.track.append(index+1)
                    self.backtrack(index+1)
                    self.track.pop()
        
        # class Solution:
        #     def __init__(self):
        #         self.res = []
        #         # 记录回溯算法的递归路径
        #         self.track = []
        
        #     # 主函数
        #     def combine(self, n: int, k: int) -> List[List[int]]:
        #         self.backtrack(1, n, k)
        #         return self.res
        
        #     def backtrack(self, start: int, n: int, k: int) -> None:
        #         # base case
        #         if k == len(self.track):
        #             # 遍历到了第 k 层，收集当前节点的值
        #             self.res.append(self.track.copy())
        #             return
                
        #         # 回溯算法标准框架
        #         for i in range(start, n+1):
        #             # 选择
        #             self.track.append(i)
        #             # 通过 start 参数控制树枝的遍历，避免产生重复的子集
        #             self.backtrack(i + 1, n, k)
        #             # 撤销选择
        #             self.track.pop()`,
            language: "python"
        },
        {
            id: 78,
            title: "Subsets",
            description: `Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.   Example 1: Input: nums = [1,2,3] Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]] Example 2: Input: nums = [0] Output: [[],[0]]   Constraints: 1 <= nums.length <= 10 -10 <= nums[i] <= 10 All the numbers of nums are unique.
<a href="https://leetcode.com/problems/subsets/" target="_blank">https://leetcode.com/problems/subsets/</a>`,
            keywords: ["DFS", "Backtrack"],
            code: `        # 形式一、元素无重不可复选，即 nums 中的元素都是唯一的，每个元素最多只能被使用一次，这也是最基本的形式。
        # 形式二、元素可重不可复选，即 nums 中的元素可以存在重复，每个元素最多只能被使用一次。
        # 形式三、元素无重可复选，即 nums 中的元素都是唯一的，每个元素可以被使用若干次。
        # 上面用组合问题举的例子，但排列、组合、子集问题都可以有这三种基本形式，所以共有 9 种变化
        # 首先，组合问题和子集问题其实是等价的，这个后面会讲；至于之前说的三种变化形式，无非是在这两棵树上剪掉或者增加一些树枝罢了。
        
        # No repeat No putback
        
        class Solution:
            def subsets(self, nums: List[int]) -> List[List[int]]:
                self.nums = nums
                self.n = len(nums)
                self.res = []
                self.track = []
                self.backtrack(0)
                return self.res
        
            def backtrack(self, i):
                # always add
                self.res.append(self.track.copy())
        
                if self.n == i:
                    return
                # starting from i
                for index in range(i, self.n):
                    self.track.append(self.nums[index])
                    # index + 1, no repeat
                    self.backtrack(index+1)
                    self.track.pop()
        # class Solution:
            
        #     def __init__(self):
        #         self.res = []
        #         # 记录回溯算法的递归路径
        #         self.track = []
        
        #     # 主函数
        #     def subsets(self, nums: List[int]) -> List[List[int]]:
        #         self.backtrack(nums, 0)
        #         return self.res
            
        #     # 回溯算法核心函数，遍历子集问题的回溯树
        #     def backtrack(self, nums: List[int], start: int) -> None:
                
        #         # 前序位置，每个节点的值都是一个子集
        #         self.res.append(list(self.track))
                
        #         # 回溯算法标准框架
        #         for i in range(start, len(nums)):
        #             # 做选择
        #             self.track.append(nums[i])
        #             # 通过 start 参数控制树枝的遍历，避免产生重复的子集
        #             self.backtrack(nums, i + 1)
        #             # 撤销选择
        #             self.track.pop()`,
            language: "python"
        },
        {
            id: 79,
            title: "Word Search",
            description: `Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.   Example 1: Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED" Output: true Example 2: Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE" Output: true Example 3: Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB" Output: false   Constraints: m == board.length n = board[i].length 1 <= m, n <= 6 1 <= word.length <= 15 board and word consists of only lowercase and uppercase English letters.   Follow up: Could you use search pruning to make your solution faster with a larger board?
<a href="https://leetcode.com/problems/word-search/" target="_blank">https://leetcode.com/problems/word-search/</a>`,
            keywords: ["DFS", "Backtrack"],
            code: `        # DFS for used, not backtrack
        # can just flood with dummy ‘#’ and reuse board as “used”
        
        class Solution:
            def exist(self, board: List[List[str]], word: str) -> bool:
                self.found = False
        
                self.m = len(board)
                self.n = len(board[0])
                self.board = board
                self.used = [[False for j in range(self.n)] for i in range(self.m)]
                self.word = word
                self.L = len(word)
                for i in range(self.m):
                    for j in range(self.n):
                        self.backtrack(i, j, 0)
                
                return self.found
            
            def backtrack(self, i, j, l):
                if self.found:
                    return
                if self.L == l:
                    self.found = True
                    return
                
                if i < 0 or i >= self.m or j < 0 or j >= self.n:
                    return
                if self.board[i][j] != self.word[l]:
                    return
        
                if self.used[i][j]:
                    return
                
                self.used[i][j] = True
                for di, dj in ((0, 1), (0, -1), (1, 0), (-1, 0)):
                    self.backtrack(i+di, j+dj, l+1)
                self.used[i][j] = False
        
        # class Solution:
            
        #     def __init__(self):
        #         self.found = False
        
        #     def exist(self, board: List[List[str]], word: str) -> bool:
        #         m, n = len(board), len(board[0])
        #         for i in range(m):
        #             for j in range(n):
        #                 self.dfs(board, i, j, word, 0)
        #                 if self.found:
        #                     return True
        #         return False
        
        #     # 从 (i, j) 开始向四周搜索，试图匹配 word[p..]
        #     def dfs(self, board: List[List[str]], i: int, j: int, word: str, p: int):
        #         if p == len(word):
        #             # 整个 word 已经被匹配完，找到了一个答案
        #             self.found = True
        #             return
        #         if self.found:
        #             # 已经找到了一个答案，不用再搜索了
        #             return
        #         m, n = len(board), len(board[0])
        #         if i < 0 or j < 0 or i >= m or j >= n:
        #             return
        #         if board[i][j] != word[p]:
        #             return
        
        #         # 已经匹配过的字符，我们用一个特殊字符标记，避免走回头路
        #         temp = board[i][j]
        #         board[i][j] = '#'
        #         # word[p] 被 board[i][j] 匹配，开始向四周搜索 word[p+1..]
        #         self.dfs(board, i + 1, j, word, p + 1)
        #         self.dfs(board, i, j + 1, word, p + 1)
        #         self.dfs(board, i - 1, j, word, p + 1)
        #         self.dfs(board, i, j - 1, word, p + 1)
        #         board[i][j] = temp`,
            language: "python"
        },
        {
            id: 80,
            title: "Remove Duplicates from Sorted Array II",
            description: `Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same. Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements. Return k after placing the final result in the first k slots of nums. Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory. Custom Judge: The judge will test your solution with the following code: int[] nums = [...]; // Input array int[] expectedNums = [...]; // The expected answer with correct length int k = removeDuplicates(nums); // Calls your implementation assert k == expectedNums.length; for (int i = 0; i < k; i++) { assert nums[i] == expectedNums[i]; } If all assertions pass, then your solution will be accepted.   Example 1: Input: nums = [1,1,1,2,2,3] Output: 5, nums = [1,1,2,2,3,_] Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively. It does not matter what you leave beyond the returned k (hence they are underscores). Example 2: Input: nums = [0,0,1,1,1,1,2,3,3] Output: 7, nums = [0,0,1,1,2,3,3,_,_] Explanation: Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively. It does not matter what you leave beyond the returned k (hence they are underscores).   Constraints: 1 <= nums.length <= 3 * 104 -104 <= nums[i] <= 104 nums is sorted in non-decreasing order.
<a href="https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/" target="_blank">https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/</a>`,
            keywords: ["Array", "2ptr"],
            code: `        # different from i, it can keep two same elements
        # 2 ops: 1. next copy to prev, 2. advance next (remove)
        # return slow (prev) + 1
        
        class Solution:
            def removeDuplicates(self, nums: List[int]) -> int:
                slow = 0
                fast = 1
                count = 0
                while fast < len(nums):
                    if nums[slow] == nums[fast]:
                        count += 1
                    else:
                        count = 0
                    if count <= 1:
                        slow += 1
                        nums[slow] = nums[fast]
                    fast += 1
                return slow + 1`,
            language: "python"
        },
        {
            id: 82,
            title: "Remove Duplicates from Sorted List II",
            description: `Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.   Example 1: Input: head = [1,2,3,3,4,4,5] Output: [1,2,5] Example 2: Input: head = [1,1,1,2,3] Output: [2,3]   Constraints: The number of nodes in the list is in the range [0, 300]. -100 <= Node.val <= 100 The list is guaranteed to be sorted in ascending order.
<a href="https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/description/" target="_blank">https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/description/</a>`,
            keywords: ["LinkedList", "2ptr"],
            code: `        # Notes:
        # reserve first of dup vs. remove all
        # remove the tail
        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, val=0, next=None):
        #         self.val = val
        #         self.next = next
        class Solution:
            def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
                prev = 101
                p = head
                dummy = ListNode(-1)
                cur = dummy
                while p:
                    # reserve first of dup
                    # if p.val != prev:
                    # remove all
                    if p.val != prev and not (p.next and p.next.val == p.val):
                        cur.next = p
                        cur = cur.next
                    prev = p.val
                    p = p.next
                # remove the tail
                cur.next = None
                return dummy.next`,
            language: "python"
        },
        {
            id: 83,
            title: "Remove Duplicates from Sorted List",
            description: `Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.   Example 1: Input: head = [1,1,2] Output: [1,2] Example 2: Input: head = [1,1,2,3,3] Output: [1,2,3]   Constraints: The number of nodes in the list is in the range [0, 300]. -100 <= Node.val <= 100 The list is guaranteed to be sorted in ascending order.
<a href="https://leetcode.com/problems/remove-duplicates-from-sorted-list/" target="_blank">https://leetcode.com/problems/remove-duplicates-from-sorted-list/</a>`,
            keywords: ["Array", "2ptr"],
            code: `        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, val=0, next=None):
        #         self.val = val
        #         self.next = next
        
        # remember to slow.next=None
        class Solution:
            def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
                slow = head
                fast = head
                if head is None:
                    return head
                while fast:
                    if slow.val != fast.val:
                        slow = slow.next
                        slow.val = fast.val
                    fast = fast.next
                
                slow.next = None
                return head`,
            language: "python"
        },
        {
            id: 86,
            title: "Partition List",
            description: `Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x. You should preserve the original relative order of the nodes in each of the two partitions.   Example 1: Input: head = [1,4,3,2,5,2], x = 3 Output: [1,2,2,4,3,5] Example 2: Input: head = [2,1], x = 2 Output: [1,2]   Constraints: The number of nodes in the list is in the range [0, 200]. -100 <= Node.val <= 100 -200 <= x <= 200
<a href="https://leetcode.com/problems/partition-list/" target="_blank">https://leetcode.com/problems/partition-list/</a>`,
            keywords: ["LinkedList", "2ptr"],
            code: `        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, val=0, next=None):
        #         self.val = val
        #         self.next = next
        
        # dummy.next is head, p.next is tail
        # to reuse p, remember to p.next = None
        # only if more than two ListNodes are created and linked at the end, and you can just put p.next=None at the end of loop (before link them together)
        
        class Solution:
            def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:
                dummy1 = ListNode(-1)
                dummy2 = ListNode(-1)
                p = head
                p1 = dummy1
                p2 = dummy2
        
                while p!=None:
                    if p.val < x:
                        #p1.next = p # I can also create new ListNode?
                        p1.next = ListNode(p.val)
                        p1 = p1.next
                    else:
                        #p2.next = p
                        p2.next = ListNode(p.val)
                        p2 = p2.next
                    
                    #temp = p.next
                    #p.next = None
                    #p = temp
                    p = p.next
                
                p1.next = dummy2.next
                return dummy1.next`,
            language: "python"
        },
        {
            id: 88,
            title: "Merge Sorted Array",
            description: `You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively. Merge nums1 and nums2 into a single array sorted in non-decreasing order. The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.   Example 1: Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3 Output: [1,2,2,3,5,6] Explanation: The arrays we are merging are [1,2,3] and [2,5,6]. The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1. Example 2: Input: nums1 = [1], m = 1, nums2 = [], n = 0 Output: [1] Explanation: The arrays we are merging are [1] and []. The result of the merge is [1]. Example 3: Input: nums1 = [0], m = 0, nums2 = [1], n = 1 Output: [1] Explanation: The arrays we are merging are [] and [1]. The result of the merge is [1]. Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.   Constraints: nums1.length == m + n nums2.length == n 0 <= m, n <= 200 1 <= m + n <= 200 -109 <= nums1[i], nums2[j] <= 109   Follow up: Can you come up with an algorithm that runs in O(m + n) time?
<a href="https://leetcode.com/problems/merge-sorted-array/" target="_blank">https://leetcode.com/problems/merge-sorted-array/</a>`,
            keywords: ["Array", "2ptr"],
            code: `        # just do it from back to front.
        # nums2 may have left.
        
        class Solution:
            def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
                """
                Do not return anything, modify nums1 in-place instead.
                """
                cur1 = m - 1
                cur2 = n - 1
                cur = m + n - 1
                while cur1 >= 0 and cur2 >= 0:
                    if nums1[cur1] > nums2[cur2]:
                        nums1[cur] = nums1[cur1]
                        cur1 -= 1
                        cur -= 1
                    else:
                        nums1[cur] = nums2[cur2]
                        cur2 -= 1
                        cur -= 1
                while cur2 >= 0:
                    nums1[cur] = nums2[cur2]
                    cur2 -= 1
                    cur -= 1`,
            language: "python"
        },
        {
            id: 90,
            title: "Subsets II",
            description: `Given an integer array nums that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.   Example 1: Input: nums = [1,2,2] Output: [[],[1],[1,2],[1,2,2],[2],[2,2]] Example 2: Input: nums = [0] Output: [[],[0]]   Constraints: 1 <= nums.length <= 10 -10 <= nums[i] <= 10
<a href="https://leetcode.com/problems/subsets-ii/" target="_blank">https://leetcode.com/problems/subsets-ii/</a>`,
            keywords: ["DFS", "Backtrack"],
            code: `        # Repeat No putback
        # subset (1, 2, 2’) -> (1, 2) (1, 2’) will give repeat
        # need sort! and detect nums[i] == nums[i-1]
        
        
        class Solution:
            def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
                nums.sort()
                self.nums = nums
                self.n = len(nums)
                self.res = []
                self.track = []
                
                self.backtrack(0)
                return self.res
        
        
            def backtrack(self, i):
                # always add in the very start
                self.res.append(self.track.copy())
                if i == self.n:
                    return
                
                for index in range(i, self.n):
                    if index > i and self.nums[index-1] == self.nums[index]:
                        continue
                    self.track.append(self.nums[index])
                    self.backtrack(index+1)
                    self.track.pop()
        
        # class Solution:
        #     def __init__(self):
        #         self.res = []
        #         self.track = []
            
        #     def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        #         # 先排序，让相同的元素靠在一起
        #         nums.sort()
        #         self.backtrack(nums, 0)
        #         return self.res
            
        #     def backtrack(self, nums: List[int], start: int) -> None:
        #         # 前序位置，每个节点的值都是一个子集
        #         self.res.append(self.track[:])
                
        #         for i in range(start, len(nums)):
        #             # 剪枝逻辑，值相同的相邻树枝，只遍历第一条
        #             if i > start and nums[i] == nums[i - 1]:
        #                 continue
        #             self.track.append(nums[i])
        #             self.backtrack(nums, i + 1)
        #             self.track.pop()`,
            language: "python"
        },
        {
            id: 92,
            title: "Reverse Linked List II",
            description: `Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.   Example 1: Input: head = [1,2,3,4,5], left = 2, right = 4 Output: [1,4,3,2,5] Example 2: Input: head = [5], left = 1, right = 1 Output: [5]   Constraints: The number of nodes in the list is n. 1 <= n <= 500 -500 <= Node.val <= 500 1 <= left <= right <= n   Follow up: Could you do it in one pass?
<a href="https://leetcode.com/problems/reverse-linked-list-ii/" target="_blank">https://leetcode.com/problems/reverse-linked-list-ii/</a>`,
            keywords: ["LinkedList", "2ptr"],
            code: `        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, val=0, next=None):
        #         self.val = val
        #         self.next = next
        class Solution:
            # iterative
            def reverseBetween1(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
        
                if head == None or head.next == None:
                    return head
                
                dummy = ListNode(-1)
                dummy.next = head
        
                prev, cur, nxt = None, dummy, dummy.next
                for i in range(left):
                    prev = cur
                    cur = nxt
                    if nxt:
                        nxt = nxt.next
                
                very_prev = prev
                very_cur = cur
        
                for i in range(right-left+1):
                    cur.next = prev
        
                    prev = cur
                    cur = nxt
                    if nxt:
                        nxt = nxt.next
                very_cur.next = cur
                very_prev.next = prev
                return dummy.next
            
            successor = None
        
            # recursive
            def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
        
                if head == None or head.next == None:
                    return head
                if right == 1:
                    self.successor = head.next
                    return head
                if left == 1:
                    last = self.reverseBetween(head.next, 1, right-1)
                    head.next.next = head
                    head.next = self.successor
                    return last
                last = self.reverseBetween(head.next, left-1, right-1)
                head.next = last
                return head
                
                `,
            language: "python"
        },
        {
            id: 93,
            title: "Restore IP Addresses",
            description: `A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros. For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses, but "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid IP addresses. Given a string s containing only digits, return all possible valid IP addresses that can be formed by inserting dots into s. You are not allowed to reorder or remove any digits in s. You may return the valid IP addresses in any order.   Example 1: Input: s = "25525511135" Output: ["255.255.11.135","255.255.111.35"] Example 2: Input: s = "0000" Output: ["0.0.0.0"] Example 3: Input: s = "101023" Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]   Constraints: 1 <= s.length <= 20 s consists of digits only.
<a href="https://leetcode.com/problems/restore-ip-addresses/" target="_blank">https://leetcode.com/problems/restore-ip-addresses/</a>`,
            keywords: ["DFS", "Backtrack"],
            code: `        # no need loop, just step one by one, and loop by chars
        
        class Solution:
            def restoreIpAddresses(self, s: str) -> List[str]:
                self.res = []
                self.track = []
        
                self.s = s
                self.n = len(s)
        
                self.backtrack(0)
                return self.res
        
            def backtrack(self, i):
                if i == self.n:
                    if len(self.track) == 4:
                        self.res.append(".".join(self.track))
                    return
                
                for index in range(i, self.n):
                    cur = self.s[i:index+1]
                    if len(cur) > 1 and cur[0] == '0':
                        break
                    if len(cur) > 3:
                        break
                    if int(cur) > 255:
                        break
                    self.track.append(cur)
                    self.backtrack(index + 1)
                    self.track.pop()`,
            language: "python"
        },
        {
            id: 96,
            title: "Unique Binary Search Trees",
            description: `Given an integer n, return the number of structurally unique BST's (binary search trees) which has exactly n nodes of unique values from 1 to n.   Example 1: Input: n = 3 Output: 5 Example 2: Input: n = 1 Output: 1   Constraints: 1 <= n <= 19
<a href="https://leetcode.com/problems/unique-binary-search-trees/description/" target="_blank">https://leetcode.com/problems/unique-binary-search-trees/description/</a>`,
            keywords: ["BST", "DP"],
            code: `        class Solution:
            def numTrees(self, n: int) -> int:
                self.memo = [[1 for i in range(n+1)] for j in range(n+1)]
                return self.helper(1, n)
        
            def helper(self, lo, hi):
                if lo >= hi:
                    return 1 # number of cases, None is also 1 case
                if self.memo[lo][hi] != 1:
                    return self.memo[lo][hi]
                cases = 0
                for r in range(lo, hi+1):
                    lcases = self.helper(lo, r-1)
                    rcases = self.helper(r+1, hi)
                    cases += lcases * rcases
                self.memo[lo][hi] = cases
                return cases
        
        # have to use DP to pass TLE
        
        # class Solution:
        #     # 备忘录
        #     def __init__(self):
        #         self.memo = []
        
        #     def numTrees(self, n: int) -> int:
        #         # 备忘录的值初始化为 0
        #         self.memo = [[0] * (n + 1) for _ in range(n + 1)]
        #         return self.count(1, n)
        
        #     # 定义：返回 [lo, hi] 范围内构造的不同 BST 的数量
        #     def count(self, lo: int, hi: int) -> int:
        #         if lo >= hi:
        #             return 1
        #         # 查备忘录
        #         if self.memo[lo][hi] != 0:
        #             return self.memo[lo][hi]
        
        #         res = 0
        #         for mid in range(lo, hi + 1):
        #             left = self.count(lo, mid - 1)
        #             right = self.count(mid + 1, hi)
        #             res += left * right
        #         # 将结果存入备忘录
        #         self.memo[lo][hi] = res
        
        #         return res`,
            language: "python"
        },
        {
            id: 98,
            title: "Validate Binary Search Tree",
            description: `Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: The left subtree of a node contains only nodes with keys strictly less than the node's key. The right subtree of a node contains only nodes with keys strictly greater than the node's key. Both the left and right subtrees must also be binary search trees.   Example 1: Input: root = [2,1,3] Output: true Example 2: Input: root = [5,1,4,null,null,3,6] Output: false Explanation: The root node's value is 5 but its right child's value is 4.   Constraints: The number of nodes in the tree is in the range [1, 104]. -231 <= Node.val <= 231 - 1
<a href="https://leetcode.com/problems/validate-binary-search-tree/" target="_blank">https://leetcode.com/problems/validate-binary-search-tree/</a>`,
            keywords: ["BST"],
            code: `        # verify: OPTIMZE: early stop by return True/False, use min/max to control child, not to parent
        # 增长参数列表
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def isValidBST(self, root: Optional[TreeNode]) -> bool:
                self.res = True
                self.helper(root)
                return self.res
        
            def helper(self, node):
                if node is None:
                    return None, None
                l1, l2 = self.helper(node.left)
                if l1 is not None and l1 >= node.val:
                    self.res = False
                if l2 is not None and l2 >= node.val:
                    self.res = False
                r1, r2 = self.helper(node.right)
                if r1 is not None and r1 <= node.val:
                    self.res = False
                if r2 is not None and r2 <= node.val:
                    self.res = False
        
                return l1 if l1 is not None else node.val, r2 if r2 is not None else node.val
        
        # OPTIMZE: early stop by return True/False, use min/max to control child, not to parent
        # class Solution:
        #     def isValidBST(self, root: TreeNode) -> bool:
        #         return self._isValidBST(root, None, None)
        
        #     # 定义：该函数返回 root 为根的子树的所有节点是否满足 max.val > root.val > min.val
        #     def _isValidBST(self, root: TreeNode, min: TreeNode, max: TreeNode) -> bool:
        #         # base case
        #         if root is None:
        #             return True
        #         # 若 root.val 不符合 max 和 min 的限制，说明不是合法 BST
        #         if min is not None and root.val <= min.val:
        #             return False
        #         if max is not None and root.val >= max.val:
        #             return False
        #         # 根据定义，限定左子树的最大值是 root.val，右子树的最小值是 root.val
        #         return self._isValidBST(root.left, min, root) and self._isValidBST(root.right, root, max)`,
            language: "python"
        },
        {
            id: 102,
            title: "Binary Tree Level Order Traversal",
            description: `Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).   Example 1: Input: root = [3,9,20,null,null,15,7] Output: [[3],[9,20],[15,7]] Example 2: Input: root = [1] Output: [[1]] Example 3: Input: root = [] Output: []   Constraints: The number of nodes in the tree is in the range [0, 2000]. -1000 <= Node.val <= 1000
<a href="https://leetcode.com/problems/binary-tree-level-order-traversal/description/" target="_blank">https://leetcode.com/problems/binary-tree-level-order-traversal/description/</a>`,
            keywords: ["BT", "BFS"],
            code: `        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        from collections import deque
        class Solution:
            def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
                q = deque()
                res = []
                if root is None:
                    return res
        
                q.append(root)
                while q:
                    sz = len(q)
                    arr = []
                    for i in range(sz):
                        cur = q.popleft()
                        arr.append(cur.val)
                        if cur.left:
                            q.append(cur.left)
                        if cur.right:
                            q.append(cur.right)
                    res.append(arr)
                return res
        
        
        
                
        # from collections import deque
        
        # class Solution:
        #     def levelOrder(self, root: TreeNode) -> List[List[int]]:
        #         res = []
        #         if root is None:
        #             return res
        
        #         q = deque()
        #         q.append(root)
        #         # while 循环控制从上向下一层层遍历
        #         while q:
        #             sz = len(q)
        #             # 记录这一层的节点值
        #             level = []
        #             # for 循环控制每一层从左向右遍历
        #             for i in range(sz):
        #                 cur = q.popleft()
        #                 level.append(cur.val)
        #                 if cur.left is not None:
        #                     q.append(cur.left)
        #                 if cur.right is not None:
        #                     q.append(cur.right)
        #             res.append(level)
        #         return res`,
            language: "python"
        },
        {
            id: 103,
            title: "Binary Tree Zigzag Level Order Traversal",
            description: `Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).   Example 1: Input: root = [3,9,20,null,null,15,7] Output: [[3],[20,9],[15,7]] Example 2: Input: root = [1] Output: [[1]] Example 3: Input: root = [] Output: []   Constraints: The number of nodes in the tree is in the range [0, 2000]. -100 <= Node.val <= 100
<a href="https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/" target="_blank">https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/</a>`,
            keywords: ["BT", "BFS"],
            code: `        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        
        from collections import deque
        
        class Solution:
            def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
                q = deque()
                res = []
                
                if root is None:
                    return res
                
                q.append(root)
                flag = False
        
                while q:
                    sz = len(q)
                    arr = deque()
                    for i in range(sz):
                        cur = q.popleft()
                        if not flag:
                            arr.append(cur.val)
                        else:
                            arr.appendleft(cur.val)
                        if cur.left:
                            q.append(cur.left)
                        if cur.right:
                            q.append(cur.right)
                    res.append(list(arr))
                    flag = not flag
                return res
        
        # from collections import deque
        
        # class Solution:
        #     def zigzagLevelOrder(self, root: TreeNode) -> List[List[int]]:
        #         res = []
        #         if root is None:
        #             return res
        
        #         q = deque([root])
        #         # 为 true 时向右，false 时向左
        #         flag = True
        
        #         # while 循环控制从上向下一层层遍历
        #         while q:
        #             sz = len(q)
        #             # 记录这一层的节点值
        #             level = deque()
        #             # for 循环控制每一层从左向右遍历
        #             for i in range(sz):
        #                 cur = q.popleft()
        #                 # 实现 z 字形遍历
        #                 if flag:
        #                     level.append(cur.val)
        #                 else:
        #                     level.appendleft(cur.val)
        #                 if cur.left:
        #                     q.append(cur.left)
        #                 if cur.right:
        #                     q.append(cur.right)
        #             # 切换方向
        #             flag = not flag
        #             res.append(list(level))
        #         return res`,
            language: "python"
        },
        {
            id: 104,
            title: "Maximum Depth of Binary Tree",
            description: `Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.   Example 1: Input: root = [3,9,20,null,null,15,7] Output: 3 Example 2: Input: root = [1,null,2] Output: 2   Constraints: The number of nodes in the tree is in the range [0, 104]. -100 <= Node.val <= 100
<a href="https://leetcode.com/problems/maximum-depth-of-binary-tree/" target="_blank">https://leetcode.com/problems/maximum-depth-of-binary-tree/</a>`,
            keywords: ["BT"],
            code: `        # 一个视角 + 两种思维模式
        # 思维：
        # 分解问题：其实就是分治，可以进阶为DP。必须严格定义输入和返回值
        # 遍历：其实就是DFS/回溯算法。返回值为空，更新一个passed value或者全局值
        
        # 1、是否可以通过遍历一遍二叉树得到答案？如果可以，用一个 traverse 函数配合外部变量来实现，这叫「遍历」的思维模式。
        # 2、是否可以定义一个递归函数，通过子问题（子树）的答案推导出原问题的答案？如果可以，写出这个递归函数的定义，并充分利用这个函数的返回值，这叫「分解问题」的思维模式。
        # 递归皆可二叉树
        #   quicksort vs. mergesort
        #     preorder: partition -> divide
        #     postorder: divide -> merge
        # 所以，某些情况下把代码移到后序位置效率最高；有些事情，只有后序位置的代码能做。
        
        # 动归/DFS/回溯算法都可以看做二叉树问题的扩展，只是它们的关注点不同：
        #   动态规划算法属于分解问题（分治）的思路，它的关注点在整棵「子树」。
        #   回溯算法属于遍历的思路，它的关注点在节点间的「树枝」。进出子节点
        #   DFS 算法属于遍历的思路，它的关注点在单个「节点」。进出本节点
        
        
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def maxDepth(self, root: Optional[TreeNode]) -> int:
                if root is None:
                    return 0
                return max(self.maxDepth(root.left), self.maxDepth(root.right)) + 1
        
        
        # # 遍历的思路
        # class Solution:
        
        #     def __init__(self):
        #         # 记录遍历到的节点的深度
        #         self.depth = 0
        #         # 记录最大深度
        #         self.res = 0
        
        #     def maxDepth(self, root: TreeNode) -> int:
        #         self.traverse(root)
        #         return self.res
        
        #     # 遍历二叉树
        #     def traverse(self, root: TreeNode):
        #         if root is None:
        #             return
        
        #         # 前序遍历位置（进入节点）增加深度
        #         self.depth += 1
        #         # 遍历到叶子节点时记录最大深度
        #         if root.left is None and root.right is None:
        #             self.res = max(self.res, self.depth)
        #         self.traverse(root.left)
        #         self.traverse(root.right)
        
        #         # 后序遍历位置（离开节点）减少深度
        #         self.depth -= 1`,
            language: "python"
        },
        {
            id: 105,
            title: "Construct Binary Tree from Preorder and Inorder Traversal",
            description: `Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.   Example 1: Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7] Output: [3,9,20,null,null,15,7] Example 2: Input: preorder = [-1], inorder = [-1] Output: [-1]   Constraints: 1 <= preorder.length <= 3000 inorder.length == preorder.length -3000 <= preorder[i], inorder[i] <= 3000 preorder and inorder consist of unique values. Each value of inorder also appears in preorder. preorder is guaranteed to be the preorder traversal of the tree. inorder is guaranteed to be the inorder traversal of the tree.
<a href="https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/" target="_blank">https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/</a>`,
            keywords: ["BT", "Divide"],
            code: `        # build: pivotIndex, start, end (rootIndex)
        # mind the pivotIndex calculation
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        
        class Solution:
            def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
                self.p = preorder
                self.i = inorder
                return self.build(0, 0, len(inorder))
            
            # only inorder can provide correct values using leftRange and rightRange
            def build(self, pivotIndex, start, end):
                if start >=end:
                    return None
        
                val = self.p[pivotIndex]
                node = TreeNode(val)
        
                rootIndex = self.i[start:end].index(val)
                #leftRange = (start, index)
                #rightRange = (index+1, end)
                left = self.build(pivotIndex + 1, start, start + rootIndex)
                right = self.build(pivotIndex + rootIndex + 1, start + rootIndex + 1, end)
                node.left = left
                node.right = right
        
                return node
        
        
        
        # # My first attemp
        # class Solution:
        #     def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        #         self.p = preorder
        #         self.i = inorder
        #         self.visited = set()
        #         return self.build(0, 0)[0]
                
        #     def build(self, pi, ii):
        #         if pi == len(self.p) or ii == len(self.i):
        #             return None, pi, ii
        
        #         p = self.p[pi]
        #         i = self.i[ii]
        
        #         node = TreeNode(p)
        #         left, right = None, None
        
        #         self.visited.add(p)
        #         pi += 1
        
        #         if not i in self.visited: 
        #             left, pi, ii = self.build(pi, ii)
        
        #         ii += 1
        #         if ii != len(self.i):
        #             i = self.i[ii]
        #             if not i in self.visited: 
        #                 right, pi, ii = self.build(pi, ii)
                
        #         node.left = left
        #         node.right = right
        #         return node, pi, ii
        
        # class Solution:
        #     # 存储 inorder 中值到索引的映射
        #     valToIndex = dict()
        
        #     def buildTree(self, preorder, inorder):
        #         for i in range(len(inorder)):
        #             self.valToIndex[inorder[i]] = i
        #         return self.build(preorder, 0, len(preorder) - 1,
        #                           inorder, 0, len(inorder) - 1)
        
        #     # build 函数的定义：
        #     # 若前序遍历数组为 preorder[preStart..preEnd]，
        #     # 中序遍历数组为 inorder[inStart..inEnd]，
        #     # 构造二叉树，返回该二叉树的根节点
        #     def build(self, preorder, preStart, preEnd,
        #                inorder, inStart, inEnd):
        #         if preStart > preEnd:
        #             return None
        
        #         # root 节点对应的值就是前序遍历数组的第一个元素
        #         rootVal = preorder[preStart]
        #         # rootVal 在中序遍历数组中的索引
        #         index = self.valToIndex[rootVal]
        
        #         leftSize = index - inStart
        
        #         # 先构造出当前根节点
        #         root = TreeNode(rootVal)
        #         # 递归构造左右子树
        #         root.left = self.build(preorder, preStart + 1, preStart + leftSize,
        #                                inorder, inStart, index - 1)
        
        #         root.right = self.build(preorder, preStart + leftSize + 1, preEnd,
        #                                 inorder, index + 1, inEnd)
        
        #         return root`,
            language: "python"
        },
        {
            id: 106,
            title: "Construct Binary Tree from Inorder and Postorder Traversal",
            description: `Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.   Example 1: Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3] Output: [3,9,20,null,null,15,7] Example 2: Input: inorder = [-1], postorder = [-1] Output: [-1]   Constraints: 1 <= inorder.length <= 3000 postorder.length == inorder.length -3000 <= inorder[i], postorder[i] <= 3000 inorder and postorder consist of unique values. Each value of postorder also appears in inorder. inorder is guaranteed to be the inorder traversal of the tree. postorder is guaranteed to be the postorder traversal of the tree.
<a href="https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/" target="_blank">https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/</a>`,
            keywords: ["BT", "Divide"],
            code: `        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
                self.i = inorder
                self.p = postorder
                return self.build(len(inorder)-1, 0, len(inorder))
        
            def build(self, pivotIndex, start, end):
                if start >= end:
                    return None
                val = self.p[pivotIndex]
                rootIndex = self.i[start:end].index(val)
        
                node = TreeNode(val)
        
                offset = (end - start) - (rootIndex + 1) # size
                left = self.build(pivotIndex - 1 - offset, start, start + rootIndex)
                right = self.build(pivotIndex - 1, start + rootIndex + 1, end)
                node.left = left
                node.right = right
        
                return node
        
        # class Solution:
        #     # 存储 inorder 中值到索引的映射
        #     val_to_index = {}
        
        #     def buildTree(self, inorder, postorder):
        #         for i in range(len(inorder)):
        #             self.val_to_index[inorder[i]] = i
        #         return self.build(inorder, 0, len(inorder) - 1,
        #                           postorder, 0, len(postorder) - 1)
        
        #     # 定义：中序遍历数组为 inorder[inStart..inEnd]，
        #     # 后序遍历数组为 postorder[postStart..postEnd]，
        #     # build 函数构造这个二叉树并返回该二叉树的根节点
        #     def build(self, inorder, in_start, in_end,
        #               postorder, post_start, post_end):
        
        #         if in_start > in_end:
        #             return None
        #         # root 节点对应的值就是后序遍历数组的最后一个元素
        #         root_val = postorder[post_end]
        #         # rootVal 在中序遍历数组中的索引
        #         index = self.val_to_index[root_val]
        #         # 左子树的节点个数
        #         left_size = index - in_start
        #         root = TreeNode(root_val)
        #         # 递归构造左右子树
        #         root.left = self.build(inorder, in_start, index - 1,
        #                                postorder, post_start, post_start + left_size - 1)
                
        #         root.right = self.build(inorder, index + 1, in_end,
        #                                 postorder, post_start + left_size, post_end - 1)
        #         return root`,
            language: "python"
        },
        {
            id: 107,
            title: "Binary Tree Level Order Traversal II",
            description: `Given the root of a binary tree, return the bottom-up level order traversal of its nodes' values. (i.e., from left to right, level by level from leaf to root).   Example 1: Input: root = [3,9,20,null,null,15,7] Output: [[15,7],[9,20],[3]] Example 2: Input: root = [1] Output: [[1]] Example 3: Input: root = [] Output: []   Constraints: The number of nodes in the tree is in the range [0, 2000]. -1000 <= Node.val <= 1000
<a href="https://leetcode.com/problems/binary-tree-level-order-traversal-ii/" target="_blank">https://leetcode.com/problems/binary-tree-level-order-traversal-ii/</a>`,
            keywords: ["BT", "BFS"],
            code: `        # reverse order, convert deque back to list
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        
        from collections import deque
        
        class Solution:
            def levelOrderBottom(self, root: Optional[TreeNode]) -> List[List[int]]:
                q = deque()
                if root is None:
                    return []
                
                res = deque()
                q.append(root)
                while q:
                    sz = len(q)
                    arr = []
                    for i in range(sz):
                        cur = q.popleft()
                        arr.append(cur.val)
                        if cur.left:
                            q.append(cur.left)
                        if cur.right:
                            q.append(cur.right)
                    res.appendleft(arr)
                
                # convert to list
                return list(res)
        
        # from collections import deque
        # from typing import List, Optional
        
        # class Solution:
        #     def levelOrderBottom(self, root: Optional[TreeNode]) -> List[List[int]]:
        #         res = deque()
        #         if root is None:
        #             return list(res)
        
        #         q = deque([root])
        #         # while 循环控制从上向下一层层遍历
        #         while q:
        #             sz = len(q)
        #             # 记录这一层的节点值
        #             level = []
        #             # for 循环控制每一层从左向右遍历
        #             for _ in range(sz):
        #                 cur = q.popleft()
        #                 level.append(cur.val)
        #                 if cur.left:
        #                     q.append(cur.left)
        #                 if cur.right:
        #                     q.append(cur.right)
        #             # 把每一层添加到头部，就是自底向上的层序遍历。
        #             res.appendleft(level)
        #         return list(res)`,
            language: "python"
        },
        {
            id: 114,
            title: "Flatten Binary Tree to Linked List",
            description: `Given the root of a binary tree, flatten the tree into a "linked list": The "linked list" should use the same TreeNode class where the right child pointer points to the next node in the list and the left child pointer is always null. The "linked list" should be in the same order as a pre-order traversal of the binary tree.   Example 1: Input: root = [1,2,5,3,4,null,6] Output: [1,null,2,null,3,null,4,null,5,null,6] Example 2: Input: root = [] Output: [] Example 3: Input: root = [0] Output: [0]   Constraints: The number of nodes in the tree is in the range [0, 2000]. -100 <= Node.val <= 100   Follow up: Can you flatten the tree in-place (with O(1) extra space)?
<a href="https://leetcode.com/problems/flatten-binary-tree-to-linked-list/description/" target="_blank">https://leetcode.com/problems/flatten-binary-tree-to-linked-list/description/</a>`,
            keywords: ["BT"],
            code: `        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def flatten(self, root: Optional[TreeNode]) -> None:
                """
                Do not return anything, modify root in-place instead.
                """
                self.flattenRetLast(root)
        
            def flattenRetLast(self, node):
                if node is None:
                    return node
                left = node.left
                right = node.right
        
                leftLast = self.flattenRetLast(left)
                rightLast = self.flattenRetLast(right)
        
                node.left = None
                node.right = left
                if leftLast:
                    node = leftLast
                node.right = right
        
                if rightLast:
                    node = rightLast
                
                return node
        
        
        # the following method no need to return a node, but just go to the end
        # class Solution:
        #     # 定义：将以 root 为根的树拉平为链表
        #     def flatten(self, root) -> None:
        #         # base case
        #         if root is None:
        #             return
        
        #         # 利用定义，把左右子树拉平
        #         self.flatten(root.left)
        #         self.flatten(root.right)
        
        #         # 后序遍历位置
        #         # 1、左右子树已经被拉平成一条链表
        #         left = root.left
        #         right = root.right
        
        #         # 2、将左子树作为右子树
        #         root.left = None
        #         root.right = left
        
        #         # 3、将原先的右子树接到当前右子树的末端
        #         p = root
        #         while p.right is not None:
        #             p = p.right
        #         p.right = right`,
            language: "python"
        },
        {
            id: 116,
            title: "Populating Next Right Pointers in Each Node",
            description: `You are given a perfect binary tree where all leaves are on the same level, and every parent has two children. The binary tree has the following definition: struct Node { int val; Node *left; Node *right; Node *next; } Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL. Initially, all next pointers are set to NULL.   Example 1: Input: root = [1,2,3,4,5,6,7] Output: [1,#,2,3,#,4,5,6,7,#] Explanation: Given the above perfect binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level. Example 2: Input: root = [] Output: []   Constraints: The number of nodes in the tree is in the range [0, 212 - 1]. -1000 <= Node.val <= 1000   Follow-up: You may only use constant extra space. The recursive approach is fine. You may assume implicit stack space does not count as extra space for this problem.
<a href="https://leetcode.com/problems/populating-next-right-pointers-in-each-node/" target="_blank">https://leetcode.com/problems/populating-next-right-pointers-in-each-node/</a>`,
            keywords: ["BT"],
            code: `        """
        # Definition for a Node.
        class Node:
            def __init__(self, val: int = 0, left: 'Node' = None, right: 'Node' = None, next: 'Node' = None):
                self.val = val
                self.left = left
                self.right = right
                self.next = next
        """
        
        # just one additional connect
        
        
        class Solution:
            def connectTwo(self, left, right):
                if left is None:
                    return
                left.next = right
                if left.left:
                    self.connectTwo(left.left, left.right)
                    self.connectTwo(right.left, right.right)
                    # remedy
                    self.connectTwo(left.right, right.left)
        
            def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
                if root is None:
                    return root
                self.connectTwo(root.left, root.right)
                return root
        
        # class Solution:
        #     # 主函数
        #     def connect(self, root: 'Node') -> 'Node':
        #         if not root:
        #             return None
        #         # 遍历「三叉树」，连接相邻节点
        #         self.traverse(root.left, root.right)
        #         return root
        
        #     # 三叉树遍历框架
        #     def traverse(self, node1: 'Node', node2: 'Node') -> None:
        #         if not node1 or not node2:
        #             return
        #         # 前序位置 
        #         # 将传入的两个节点穿起来
        #         node1.next = node2 
                
        #         # 连接相同父节点的两个子节点
        #         self.traverse(node1.left, node1.right)
        #         self.traverse(node2.left, node2.right)
        #         # 连接跨越父节点的两个子节点
        #         self.traverse(node1.right, node2.left)`,
            language: "python"
        },
        {
            id: 117,
            title: "Populating Next Right Pointers in Each Node II",
            description: `Given a binary tree struct Node { int val; Node *left; Node *right; Node *next; } Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL. Initially, all next pointers are set to NULL.   Example 1: Input: root = [1,2,3,4,5,null,7] Output: [1,#,2,3,#,4,5,7,#] Explanation: Given the above binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level. Example 2: Input: root = [] Output: []   Constraints: The number of nodes in the tree is in the range [0, 6000]. -100 <= Node.val <= 100   Follow-up: You may only use constant extra space. The recursive approach is fine. You may assume implicit stack space does not count as extra space for this problem.
<a href="https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/" target="_blank">https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/</a>`,
            keywords: ["BT", "BFS"],
            code: `        # different from full tree in https://leetcode.com/problems/populating-next-right-pointers-in-each-node/
        
        """
        # Definition for a Node.
        class Node:
            def __init__(self, val: int = 0, left: 'Node' = None, right: 'Node' = None, next: 'Node' = None):
                self.val = val
                self.left = left
                self.right = right
                self.next = next
        """
        from collections import deque
        class Solution:
            def connect(self, root: 'Node') -> 'Node':
                q = deque()
                if root is None:
                    return root
                
                q.append(root)
                while q:
                    sz = len(q)
                    prev = None
                    for i in range(sz):
                        cur = q.popleft()
                        if prev is not None:
                            prev.next = cur
                        prev = cur
                        if cur.left:
                            q.append(cur.left)
                        if cur.right:
                            q.append(cur.right)
                    
                return root
        
        # class Node:
        #     def __init__(self, val=0, left=None, right=None, next=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        #         self.next = next
        
        # class Solution:
        #     def connect(self, root: 'Node') -> 'Node':
        #         if root is None:
        #             return None
        #         # 二叉树层序遍历框架
        #         from collections import deque
        #         q = deque([root])
        #         while q:
        #             sz = len(q)
        #             # 遍历一层
        #             pre = None
        #             for i in range(sz):
        #                 cur = q.popleft()
        #                 # 链接当前层所有节点的 next 指针
        #                 if pre is not None:
        #                     pre.next = cur
        #                 pre = cur
        #                 # 将下一层节点装入队列
        #                 if cur.left is not None:
        #                     q.append(cur.left)
        #                 if cur.right is not None:
        #                     q.append(cur.right)
        #         return root`,
            language: "python"
        },
        {
            id: 125,
            title: "Valid Palindrome",
            description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.   Example 1: Input: s = "A man, a plan, a canal: Panama" Output: true Explanation: "amanaplanacanalpanama" is a palindrome. Example 2: Input: s = "race a car" Output: false Explanation: "raceacar" is not a palindrome. Example 3: Input: s = " " Output: true Explanation: s is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.   Constraints: 1 <= s.length <= 2 * 105 s consists only of printable ASCII characters.
<a href="https://leetcode.com/problems/valid-palindrome/description/" target="_blank">https://leetcode.com/problems/valid-palindrome/description/</a>`,
            keywords: ["Array", "Palindrome", "2ptr"],
            code: `        class Solution:
            def isPalindrome(self, s: str) -> bool:
                new_s = []
                for c in s:
                    if c.isalnum():
                        new_s.append(c.lower())
                
                start = 0
                end = len(new_s) - 1
                while start < end:
                    if new_s[start] != new_s[end]:
                        return False
                    start +=1
                    end-=1
                return True`,
            language: "python"
        },
        {
            id: 127,
            title: "Word Ladder",
            description: `A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that: Every adjacent pair of words differs by a single letter. Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList. sk == endWord Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.   Example 1: Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"] Output: 5 Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long. Example 2: Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"] Output: 0 Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.   Constraints: 1 <= beginWord.length <= 10 endWord.length == beginWord.length 1 <= wordList.length <= 5000 wordList[i].length == beginWord.length beginWord, endWord, and wordList[i] consist of lowercase English letters. beginWord != endWord All the words in wordList are unique.
<a href="https://leetcode.com/problems/word-ladder/" target="_blank">https://leetcode.com/problems/word-ladder/</a>`,
            keywords: ["BFS"],
            code: `        # loop all pos, all char
        
        from collections import deque
        class Solution:
            def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
                q = deque()
                wordList = set(wordList)
                visited = set()
        
                q.append(beginWord)
        
                cnt = 1
                while q:
                    sz = len(q)
                    for _ in range(sz):
                        cur = q.popleft()
                        if cur in visited:
                            continue
                        visited.add(cur)
                        if not cur in wordList and cur != beginWord:
                            continue
                        if cur == endWord:
                            return cnt
        
                        for i in range(len(cur)):
                            for c in range(ord('a'), ord('z')+1):
                                if (ord(cur[i])) == c:
                                    continue
                                c = chr(c)
                                nxt = cur[:i] + c + cur[i+1:]
                                q.append(nxt)
                    cnt += 1
                
                return 0
        
        # class Solution:
        #     def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        #         # 将 wordList 转换为 HashSet，加速查找
        #         wordSet = set(wordList)
        #         if endWord not in wordSet:
        #             return 0
        
        #         # 直接套用 BFS 算法框架
        #         q = collections.deque([beginWord])
        #         visited = set([beginWord])
        #         step = 1
        #         while q:
        #             sz = len(q)
        #             for i in range(sz):
        #                 # 穷举 curWord 修改一个字符能得到的单词
        #                 # 即对每个字符，穷举 26 个字母
        #                 curWord = q.popleft()
        #                 chars = list(curWord)
        #                 # 开始穷举每一位字符 curWord[j]
        #                 for j in range(len(curWord)):
        #                     originChar = chars[j]
        #                     # 对每一位穷举 26 个字母
        #                     for c in 'abcdefghijklmnopqrstuvwxyz':
        #                         if c == originChar:
        #                             continue
        #                         chars[j] = c
        #                         # 如果构成的新单词在 wordSet 中，就是找到了一个可行的下一步
        #                         newWord = ''.join(chars)
        #                         if newWord in wordSet and newWord not in visited:
        #                             if newWord == endWord:
        #                                 return step + 1
        #                             q.append(newWord)
        #                             visited.add(newWord)
        #                     # 最后别忘了把 curWord[j] 恢复
        #                     chars[j] = originChar
        #             # 这里增加步数
        #             step += 1
        #         return 0`,
            language: "python"
        },
        {
            id: 129,
            title: "Sum Root to Leaf Numbers",
            description: `You are given the root of a binary tree containing digits from 0 to 9 only. Each root-to-leaf path in the tree represents a number. For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123. Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a 32-bit integer. A leaf node is a node with no children.   Example 1: Input: root = [1,2,3] Output: 25 Explanation: The root-to-leaf path 1->2 represents the number 12. The root-to-leaf path 1->3 represents the number 13. Therefore, sum = 12 + 13 = 25. Example 2: Input: root = [4,9,0,5,1] Output: 1026 Explanation: The root-to-leaf path 4->9->5 represents the number 495. The root-to-leaf path 4->9->1 represents the number 491. The root-to-leaf path 4->0 represents the number 40. Therefore, sum = 495 + 491 + 40 = 1026.   Constraints: The number of nodes in the tree is in the range [1, 1000]. 0 <= Node.val <= 9 The depth of the tree will not exceed 10.
<a href="https://leetcode.com/problems/sum-root-to-leaf-numbers/description/" target="_blank">https://leetcode.com/problems/sum-root-to-leaf-numbers/description/</a>`,
            keywords: ["BT", "BTTraverse"],
            code: `        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def sumNumbers(self, root: Optional[TreeNode]) -> int:
                self.num = 0
                self.res = 0
                self.traverse(root)
                return self.res
            
            def traverse(self, node):
                if node is None:
                    return
                
                self.num *= 10
                self.num += node.val
        
                if node.left is None and node.right is None:
                    self.res += self.num
                    self.num //= 10
                    return
        
                self.traverse(node.left)
                self.traverse(node.right)
        
                self.num //= 10
                
        # class Solution:
        #     def __init__(self):
        #         self.path = ""
        #         self.res = 0
        
        #     def sumNumbers(self, root: TreeNode) -> int:
        #         # 遍历一遍二叉树就能出结果
        #         self.traverse(root)
        #         return self.res
        
        #     # 二叉树遍历函数
        #     def traverse(self, root):
        #         if root is None:
        #             return
        #         # 前序遍历位置，记录节点值
        #         self.path += str(root.val)
        #         if root.left is None and root.right is None:
        #             # 到达叶子节点，累加路径和
        #             self.res += int(self.path)
        #         # 二叉树递归框架，遍历左右子树
        #         self.traverse(root.left)
        #         self.traverse(root.right)
        
        #         # 后续遍历位置，撤销节点值
        #         self.path = self.path[:-1]`,
            language: "python"
        },
        {
            id: 131,
            title: "Palindrome Partitioning",
            description: `Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.   Example 1: Input: s = \"aab\" Output: [[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]] Example 2: Input: s = \"a\" Output: [[\"a\"]]   Constraints: 1 <= s.length <= 16 s contains only lowercase English letters.
<a href="https://leetcode.com/problems/palindrome-partitioning/description/" target="_blank">https://leetcode.com/problems/palindrome-partitioning/description/</a>`,
            keywords: ["DFS", "Backtrack", "Palindrome"],
            code: `        class Solution:
            def partition(self, s: str) -> List[List[str]]:
                self.res = []
                self.part = []
        
                self.s = s
                self.n = len(s)
        
                self.backtrack(0)
        
                return self.res
        
            def isPalindrome(self, start, end):
                while start < end:
                    if self.s[start] != self.s[end]:
                        return False
                    start += 1
                    end -= 1
                return True
        
            def backtrack(self, i):
                if i == self.n:
                    self.res.append(self.part.copy())
                    return
                
                for index in range(i, self.n):
                    if self.isPalindrome(i, index):
                        self.part.append(self.s[i:index+1])
                        self.backtrack(index+1)
                        self.part.pop()`,
            language: "python"
        },
        {
            id: 141,
            title: "Linked List Cycle",
            description: `Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter. Return true if there is a cycle in the linked list. Otherwise, return false.   Example 1: Input: head = [3,2,0,-4], pos = 1 Output: true Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed). Example 2: Input: head = [1,2], pos = 0 Output: true Explanation: There is a cycle in the linked list, where the tail connects to the 0th node. Example 3: Input: head = [1], pos = -1 Output: false Explanation: There is no cycle in the linked list.   Constraints: The number of the nodes in the list is in the range [0, 104]. -105 <= Node.val <= 105 pos is -1 or a valid index in the linked-list.   Follow up: Can you solve it using O(1) (i.e. constant) memory?
<a href="https://leetcode.com/problems/linked-list-cycle/" target="_blank">https://leetcode.com/problems/linked-list-cycle/</a>`,
            keywords: ["LinkedList", "2ptr"],
            code: `        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, x):
        #         self.val = x
        #         self.next = None
        
        # fast 一定比 slow 多走了 k 步，这多走的 k 步其实就是 fast 指针在环里转圈圈，所以 k 的值就是环长度的「整数倍」。
        
        class Solution:
            def hasCycle(self, head: Optional[ListNode]) -> bool:
                slow = head
                fast = head
                while fast != None and fast.next !=None:
                    slow = slow.next
                    fast = fast.next.next
                    if slow == fast:
                        return True
                
                return False `,
            language: "python"
        },
        {
            id: 142,
            title: "Linked List Cycle II",
            description: `Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to (0-indexed). It is -1 if there is no cycle. Note that pos is not passed as a parameter. Do not modify the linked list.   Example 1: Input: head = [3,2,0,-4], pos = 1 Output: tail connects to node index 1 Explanation: There is a cycle in the linked list, where tail connects to the second node. Example 2: Input: head = [1,2], pos = 0 Output: tail connects to node index 0 Explanation: There is a cycle in the linked list, where tail connects to the first node. Example 3: Input: head = [1], pos = -1 Output: no cycle Explanation: There is no cycle in the linked list.   Constraints: The number of the nodes in the list is in the range [0, 104]. -105 <= Node.val <= 105 pos is -1 or a valid index in the linked-list.   Follow up: Can you solve it using O(1) (i.e. constant) memory?
<a href="https://leetcode.com/problems/linked-list-cycle-ii/" target="_blank">https://leetcode.com/problems/linked-list-cycle-ii/</a>`,
            keywords: ["LinkedList", "2ptr"],
            code: `        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, x):
        #         self.val = x
        #         self.next = None
        
        class Solution:
            def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
                slow = head
                fast = head
                while fast != None and fast.next != None:
                    slow = slow.next
                    fast = fast.next.next
                    if slow == fast:
                        break
                else:
                    return None
                detector = head
                while slow != None:
                    if detector == slow:
                        break
                    detector = detector.next
                    slow = slow.next
                    
                return detector`,
            language: "python"
        },
        {
            id: 143,
            title: "Reorder List",
            description: `You are given the head of a singly linked-list. The list can be represented as: L0 → L1 → … → Ln - 1 → Ln Reorder the list to be on the following form: L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → … You may not modify the values in the list's nodes. Only nodes themselves may be changed.   Example 1: Input: head = [1,2,3,4] Output: [1,4,2,3] Example 2: Input: head = [1,2,3,4,5] Output: [1,5,2,4,3]   Constraints: The number of nodes in the list is in the range [1, 5 * 104]. 1 <= Node.val <= 1000
<a href="https://leetcode.com/problems/reorder-list/" target="_blank">https://leetcode.com/problems/reorder-list/</a>`,
            keywords: ["Stack"],
            code: `        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, val=0, next=None):
        #         self.val = val
        #         self.next = next
        
        # careful cur == b and cur.next == b
        
        class Solution:
            def reorderList(self, head: Optional[ListNode]) -> None:
                """
                Do not return anything, modify head in-place instead.
                """
                rev = []
                p = head
                while p:
                    rev.append(p)
                    p = p.next
                p = head
                b = rev[-1]
                while p != b and p.next != b:
                    tmp = p.next
                    p.next = b
                    b.next = tmp
                    p = tmp
                    rev.pop()
                    b = rev[-1]
                if p.next == b:
                    b.next = None
                else:
                    p.next = None
        
        # class Solution:
        #     def reorderList(self, head: ListNode) -> None:
        #         stk = []
        #         # 先把所有节点装进栈里，得到倒序结果
        #         p = head
        #         while p is not None:
        #             stk.append(p)
        #             p = p.next
        
        #         p = head
        #         while p is not None:
        #             # 链表尾部的节点
        #             lastNode = stk.pop()
        #             next = p.next
        #             if lastNode == next or lastNode.next == next:
        #                 # 结束条件，链表节点数为奇数或偶数时均适用
        #                 lastNode.next = None
        #                 break
        #             p.next = lastNode
        #             lastNode.next = next
        #             p = next`,
            language: "python"
        },
        {
            id: 144,
            title: "Binary Tree Preorder Traversal",
            description: `Given the root of a binary tree, return the preorder traversal of its nodes' values.   Example 1: Input: root = [1,null,2,3] Output: [1,2,3] Explanation: Example 2: Input: root = [1,2,3,4,5,null,8,null,null,6,7,9] Output: [1,2,4,5,6,7,3,8,9] Explanation: Example 3: Input: root = [] Output: [] Example 4: Input: root = [1] Output: [1]   Constraints: The number of nodes in the tree is in the range [0, 100]. -100 <= Node.val <= 100   Follow up: Recursive solution is trivial, could you do it iteratively?
<a href="https://leetcode.com/problems/binary-tree-preorder-traversal/description/" target="_blank">https://leetcode.com/problems/binary-tree-preorder-traversal/description/</a>`,
            keywords: ["BT"],
            code: `        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def __init__(self):
                self.res = []
            def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
                if root is None:
                    return self.res
                self.res.append(root.val)
                self.preorderTraversal(root.left)
                self.preorderTraversal(root.right)
                return self.res`,
            language: "python"
        },
        {
            id: 146,
            title: "LRU Cache",
            description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class: LRUCache(int capacity) Initialize the LRU cache with positive size capacity. int get(int key) Return the value of the key if the key exists, otherwise return -1. void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key. The functions get and put must each run in O(1) average time complexity.   Example 1: Input ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"] [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]] Output [null, null, null, 1, null, -1, null, -1, 3, 4] Explanation LRUCache lRUCache = new LRUCache(2); lRUCache.put(1, 1); // cache is {1=1} lRUCache.put(2, 2); // cache is {1=1, 2=2} lRUCache.get(1); // return 1 lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3} lRUCache.get(2); // returns -1 (not found) lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3} lRUCache.get(1); // return -1 (not found) lRUCache.get(3); // return 3 lRUCache.get(4); // return 4   Constraints: 1 <= capacity <= 3000 0 <= key <= 104 0 <= value <= 105 At most 2 * 105 calls will be made to get and put.
<a href="https://leetcode.com/problems/lru-cache/" target="_blank">https://leetcode.com/problems/lru-cache/</a>`,
            keywords: ["LRU"],
            code: `        # put, get
        # O(1) put: find, [update], append, [popleft]
        #   key need to be save in linked list, so when popleft, the key can be found in hash and also removed
        #   need keep doubly linked list size for overflow check.
        # O(1) get: find, remove, append
        #   need doubly linked list for remove operation
        
        # deque don’t have the remove(node)
        
        from collections import deque # NO, deque cannot remove a node
        class Node:
            def __init__(self, key, val):
                self.key = key
                self.val = val
                self.prev = None
                self.next = None
        
        class DoublyLinkedList:
            def __init__(self):
                self.head = Node(-1, -1)
                self.tail = Node(-1, -1)
                self.head.next = self.tail
                self.tail.prev = self.head
                self.size = 0
            
            def popleft(self):
                if self.head.next == self.tail:
                    return
                removing = self.head.next
                self.head.next = removing.next
                removing.next.prev = removing.prev
                self.size -= 1
                return removing
        
            def add(self, node):
                self.tail.prev.next = node
                node.prev = self.tail.prev
                self.tail.prev = node
                node.next = self.tail
                self.size += 1
        
            def remove(self, node):
                prev = node.prev
                next = node.next
                prev.next = next
                next.prev = prev
                self.size -= 1
        
        class LRUCache:
        
            def __init__(self, capacity: int):
                self.cap = capacity
                self.q = DoublyLinkedList() # key, val
                self.map = {} # key, node
        
            def get(self, key: int) -> int:
                if key in self.map:
                    # find
                    node = self.map[key]
                    val = node.val
                    # delete
                    self.q.remove(node) # map not changed
                    # append
                    self.q.add(node)
                    return val
                return -1
        
            def put(self, key: int, value: int) -> None:
                
                # update and remove
                if key in self.map:
                    node = self.map[key]
                    node.val = value
                    self.q.remove(node)
                else:
                    node = Node(key, value)
                # add
                self.q.add(node)
                self.map[key] = node
        
                # remove
                if self.q.size > self.cap:
                    removing = self.q.popleft()
                    if removing:
                        self.map.pop(removing.key)
                
        
        
        # Your LRUCache object will be instantiated and called as such:
        # obj = LRUCache(capacity)
        # param_1 = obj.get(key)
        # obj.put(key,value)
        
        # class Node:
        #     def __init__(self, k, v):
        #         self.key = k
        #         self.val = v
        #         self.next = None
        #         self.prev = None
        
        # class DoubleList:
        #     def __init__(self):
        #         # 头尾虚节点
        #         self.head = Node(0, 0)
        #         self.tail = Node(0, 0)
        #         # 链表元素数
        #         self._size = 0
        
        #         # 初始化双向链表的数据
        #         self.head.next = self.tail
        #         self.tail.prev = self.head
        
        #     # 在链表尾部添加节点 x，时间 O(1)
        #     def addLast(self, x):
        #         x.prev = self.tail.prev
        #         x.next = self.tail
        #         self.tail.prev.next = x
        #         self.tail.prev = x
        #         self._size += 1
        
        #     # 删除链表中的 x 节点（x 一定存在）
        #     # 由于是双链表且给的是目标 Node 节点，时间 O(1)
        #     def remove(self, x):
        #         x.prev.next = x.next
        #         x.next.prev = x.prev
        #         self._size -= 1
        
        #     # 删除链表中第一个节点，并返回该节点，时间 O(1)
        #     def removeFirst(self):
        #         if self.head.next == self.tail:
        #             return None
        #         first = self.head.next
        #         self.remove(first)
        #         return first
        
        #     # 返回链表长度，时间 O(1)
        #     def size(self):
        #         return self._size
            
        
        # class LRUCache:
        #     def __init__(self, capacity: int):
        #         # key -> Node(key, val)
        #         self.map = {}
        #         # Node(k1, v1) <-> Node(k2, v2)...
        #         self.cache = DoubleList()
        #         # 最大容量
        #         self.cap = capacity
        
        #     def get(self, key: int) -> int:
        #         if key not in self.map:
        #             return -1
                
        #         # 将该数据提升为最近使用的
        #         self.makeRecently(key)
        #         return self.map[key].val
        
        #     def put(self, key: int, val: int) -> None:
        #         if key in self.map:
        #             # 删除旧的数据
        #             self.deleteKey(key)
        #             # 新插入的数据为最近使用的数据
        #             self.addRecently(key, val)
        #             return
                
        #         if self.cap == self.cache.size():
        #             # 删除最久未使用的元素
        #             self.removeLeastRecently()
        #         # 添加为最近使用的元素
        #         self.addRecently(key, val)
        
        #     def makeRecently(self, key: int):
        #         x = self.map[key]
        #         # 先从链表中删除这个节点
        #         self.cache.remove(x)
        #         # 重新插到队尾
        #         self.cache.addLast(x)
        
        #     def addRecently(self, key: int, val: int):
        #         x = Node(key, val)
        #         # 链表尾部就是最近使用的元素
        #         self.cache.addLast(x)
        #         # 别忘了在 map 中添加 key 的映射
        #         self.map[key] = x
        
        #     def deleteKey(self, key: int):
        #         x = self.map[key]
        #         # 从链表中删除
        #         self.cache.remove(x)
        #         # 从 map 中删除
        #         self.map.pop(key)
        
        #     def removeLeastRecently(self):
        #         # 链表头部的第一个元素就是最久未使用的
        #         deletedNode = self.cache.removeFirst()
        #         # 同时别忘了从 map 中删除它的 key
        #         deletedKey = deletedNode.key
        #         self.map.pop(deletedKey)`,
            language: "python"
        },
        {
            id: 150,
            title: "Evaluate Reverse Polish Notation",
            description: `You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation. Evaluate the expression. Return an integer that represents the value of the expression. Note that: The valid operators are '+', '-', '*', and '/'. Each operand may be an integer or another expression. The division between two integers always truncates toward zero. There will not be any division by zero. The input represents a valid arithmetic expression in a reverse polish notation. The answer and all the intermediate calculations can be represented in a 32-bit integer.   Example 1: Input: tokens = ["2","1","+","3","*"] Output: 9 Explanation: ((2 + 1) * 3) = 9 Example 2: Input: tokens = ["4","13","5","/","+"] Output: 6 Explanation: (4 + (13 / 5)) = 6 Example 3: Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"] Output: 22 Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5 = ((10 * (6 / (12 * -11))) + 17) + 5 = ((10 * (6 / -132)) + 17) + 5 = ((10 * 0) + 17) + 5 = (0 + 17) + 5 = 17 + 5 = 22   Constraints: 1 <= tokens.length <= 104 tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].`,
            keywords: ["Stack"],
            code: `        class Solution:
            def evalRPN(self, tokens: List[str]) -> int:
                stack = []
                for tok in tokens:
                    if tok not in "+-*/":
                        stack.append(int(tok))
                    elif tok == '+':
                        op2 = stack.pop()
                        op1 = stack.pop()
                        stack.append(op1+op2)
                    elif tok == '-':
                        op2 = stack.pop()
                        op1 = stack.pop()
                        stack.append(op1-op2)
                    elif tok == '*':
                        op2 = stack.pop()
                        op1 = stack.pop()
                        stack.append(op1*op2)
                    elif tok == '/':
                        op2 = stack.pop()
                        op1 = stack.pop()
                        stack.append(int(op1/op2))
                return int(stack[0])`,
            language: "python"
        },
        {
            id: 151,
            title: "Reverse Words in a String",
            description: `Given an input string s, reverse the order of the words. A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space. Return a string of the words in reverse order concatenated by a single space. Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.   Example 1: Input: s = "the sky is blue" Output: "blue is sky the" Example 2: Input: s = " hello world " Output: "world hello" Explanation: Your reversed string should not contain leading or trailing spaces. Example 3: Input: s = "a good example" Output: "example good a" Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.   Constraints: 1 <= s.length <= 104 s contains English letters (upper-case and lower-case), digits, and spaces ' '. There is at least one word in s.   Follow-up: If the string data type is mutable in your language, can you solve it in-place with O(1) extra space?
<a href="https://leetcode.com/problems/reverse-words-in-a-string/" target="_blank">https://leetcode.com/problems/reverse-words-in-a-string/</a>`,
            keywords: ["Array", "Array Traverse"],
            code: `        // reverse whole, then reverse word individually
        // keep another pointer i for eliminating spaces
        
        class Solution {
        public:
            string reverseWords(string s) {
                reverse(s.begin(), s.end());
                int n = s.size();
                int left = 0;
                int right = 0;
                int i = 0;
                while (i < n) {
                    while (i < n && s[i] == ' ')
                        i++;
                    if (i == n)
                        break;
                    while (i < n && s[i] != ' ') {
                        s[right++] = s[i++];
                    }
                    reverse(s.begin() + left, s.begin() + right);
                    s[right++] = ' ';
                    left = right;
                    i++;
                }
                s.resize(right - 1);
                return s;
            }
        };`,
            language: "python"
        },
        {
            id: 155,
            title: "Min Stack",
            description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Implement the MinStack class: MinStack() initializes the stack object. void push(int val) pushes the element val onto the stack. void pop() removes the element on the top of the stack. int top() gets the top element of the stack. int getMin() retrieves the minimum element in the stack. You must implement a solution with O(1) time complexity for each function.   Example 1: Input ["MinStack","push","push","push","getMin","pop","top","getMin"] [[],[-2],[0],[-3],[],[],[],[]] Output [null,null,null,null,-3,null,0,-2] Explanation MinStack minStack = new MinStack(); minStack.push(-2); minStack.push(0); minStack.push(-3); minStack.getMin(); // return -3 minStack.pop(); minStack.top(); // return 0 minStack.getMin(); // return -2   Constraints: -231 <= val <= 231 - 1 Methods pop, top and getMin operations will always be called on non-empty stacks. At most 3 * 104 calls will be made to push, pop, top, and getMin.
<a href="https://leetcode.com/problems/min-stack/" target="_blank">https://leetcode.com/problems/min-stack/</a>`,
            keywords: ["Stack"],
            code: `        # there is a better method to save for minStack
        
        class MinStack:
        
            def __init__(self):
                self.stack = []
                self.minStack = []
        
            def push(self, val: int) -> None:
                self.stack.append(val)
                # must record equal one also
                if len(self.minStack) == 0 or val <= self.minStack[-1]:
                    self.minStack.append(val)
        
            def pop(self) -> None:
                if self.stack[-1] == self.minStack[-1]:
                    self.minStack.pop()
                self.stack.pop()
                
        
            def top(self) -> int:
                return self.stack[-1]
        
            def getMin(self) -> int:
                return self.minStack[-1]
                
        
        
        # Your MinStack object will be instantiated and called as such:
        # obj = MinStack()
        # obj.push(val)
        # obj.pop()
        # param_3 = obj.top()
        # param_4 = obj.getMin()
        
        # # 原始思路
        # class MinStack1:
        #     def __init__(self):
        #         # 记录栈中的所有元素
        #         self.stk = []
        #         # 阶段性记录栈中的最小元素
        #         self.minStk = []
        
        #     def push(self, val: int) -> None:
        #         self.stk.append(val)
        #         # 维护 minStk 栈顶为全栈最小元素
        #         if not self.minStk or val <= self.minStk[-1]:
        #             # 新插入的这个元素就是全栈最小的
        #             self.minStk.append(val)
        #         else:
        #             # 插入的这个元素比较大
        #             self.minStk.append(self.minStk[-1])
        
        #     def pop(self) -> None:
        #         self.stk.pop()
        #         self.minStk.pop()
        
        #     def top(self) -> int:
        #         return self.stk[-1]
        
        #     def getMin(self) -> int:
        #         # minStk 栈顶为全栈最小元素
        #         return self.minStk[-1]
        
        # # 优化版
        # class MinStack:
        #     def __init__(self):
        #         # 记录栈中的所有元素
        #         self.stk = []
        #         # 阶段性记录栈中的最小元素
        #         self.minStk = []
        
        #     def push(self, val: int) -> None:
        #         self.stk.append(val)
        #         # 维护 minStk 栈顶为全栈最小元素
        #         if not self.minStk or val <= self.minStk[-1]:
        #             # 新插入的这个元素就是全栈最小的
        #             self.minStk.append(val)
        
        #     def pop(self) -> None:
        #         # 注意 Java 的语言特性，比较 Integer 相等要用 equals 方法
        #         if self.stk[-1] == self.minStk[-1]:
        #             # 弹出的元素是全栈最小的
        #             self.minStk.pop()
        #         self.stk.pop()
        
        #     def top(self) -> int:
        #         return self.stk[-1]
        
        #     def getMin(self) -> int:
        #         # minStk 栈顶为全栈最小元素
        #         return self.minStk[-1]`,
            language: "python"
        },
        {
            id: 160,
            title: "Intersection of Two Linked Lists",
            description: `Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null. For example, the following two linked lists begin to intersect at node c1: The test cases are generated such that there are no cycles anywhere in the entire linked structure. Note that the linked lists must retain their original structure after the function returns. Custom Judge: The inputs to the judge are given as follows (your program is not given these inputs): intersectVal - The value of the node where the intersection occurs. This is 0 if there is no intersected node. listA - The first linked list. listB - The second linked list. skipA - The number of nodes to skip ahead in listA (starting from the head) to get to the intersected node. skipB - The number of nodes to skip ahead in listB (starting from the head) to get to the intersected node. The judge will then create the linked structure based on these inputs and pass the two heads, headA and headB to your program. If you correctly return the intersected node, then your solution will be accepted.   Example 1: Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3 Output: Intersected at '8' Explanation: The intersected node's value is 8 (note that this must not be 0 if the two lists intersect). From the head of A, it reads as [4,1,8,4,5]. From the head of B, it reads as [5,6,1,8,4,5]. There are 2 nodes before the intersected node in A; There are 3 nodes before the intersected node in B. - Note that the intersected node's value is not 1 because the nodes with value 1 in A and B (2nd node in A and 3rd node in B) are different node references. In other words, they point to two different locations in memory, while the nodes with value 8 in A and B (3rd node in A and 4th node in B) point to the same location in memory. Example 2: Input: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1 Output: Intersected at '2' Explanation: The intersected node's value is 2 (note that this must not be 0 if the two lists intersect). From the head of A, it reads as [1,9,1,2,4]. From the head of B, it reads as [3,2,4]. There are 3 nodes before the intersected node in A; There are 1 node before the intersected node in B. Example 3: Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2 Output: No intersection Explanation: From the head of A, it reads as [2,6,4]. From the head of B, it reads as [1,5]. Since the two lists do not intersect, intersectVal must be 0, while skipA and skipB can be arbitrary values. Explanation: The two lists do not intersect, so return null.   Constraints: The number of nodes of listA is in the m. The number of nodes of listB is in the n. 1 <= m, n <= 3 * 104 1 <= Node.val <= 105 0 <= skipA <= m 0 <= skipB <= n intersectVal is 0 if listA and listB do not intersect. intersectVal == listA[skipA] == listB[skipB] if listA and listB intersect.   Follow up: Could you write a solution that runs in O(m + n) time and use only O(1) memory?
<a href="https://leetcode.com/problems/intersection-of-two-linked-lists/" target="_blank">https://leetcode.com/problems/intersection-of-two-linked-lists/</a>`,
            keywords: ["LinkedList", "2ptr"],
            code: `        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, x):
        #         self.val = x
        #         self.next = None
        
        # sol1: A+B vs. B+A
        # sol2: A+B -> cycle medium142
        # sol3: just get the length difference and advance
        
        class Solution:
            def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
                p1 = headA
                p2 = headB
                while p1!=p2:
                    if p1 == None:
                        p1 = headB
                    else:
                        p1 = p1.next
                    if p2 == None:
                        p2 = headA
                    else:
                        p2 = p2.next
                return p1`,
            language: "python"
        },
        {
            id: 167,
            title: "Two Sum II - Input Array Is Sorted",
            description: `Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length. Return the indices of the two numbers index1 and index2, each incremented by one, as an integer array [index1, index2] of length 2. The tests are generated such that there is exactly one solution. You may not use the same element twice. Your solution must use only constant extra space.   Example 1: Input: numbers = [2,7,11,15], target = 9 Output: [1,2] Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2]. Example 2: Input: numbers = [2,3,4], target = 6 Output: [1,3] Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3]. Example 3: Input: numbers = [-1,0], target = -1 Output: [1,2] Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].   Constraints: 2 <= numbers.length <= 3 * 104 -1000 <= numbers[i] <= 1000 numbers is sorted in non-decreasing order. -1000 <= target <= 1000 The tests are generated such that there is exactly one solution.
<a href="https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/" target="_blank">https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/</a>`,
            keywords: ["nSum"],
            code: `        # why we can use left right no DP? because the result is always in the previous range.
        class Solution:
            def twoSum(self, numbers: List[int], target: int) -> List[int]:
                left = 0
                right = len(numbers)-1
                while left < right:
                    sum = numbers[left] + numbers[right]
                    if sum == target:
                        return [left+1, right+1]
                    if sum < target:
                        left += 1
                    else:
                        right -= 1
                return [-1, -1]
        
        # def twoSumTargert(nums, target):
        #     # nums 数组必须有序
        #     nums.sort()
        #     lo, hi = 0, len(nums) - 1
        #     res = []
        #     while lo < hi:
        #         sum = nums[lo] + nums[hi]
        #         left, right = nums[lo], nums[hi]
        #         if sum < target:
        #             while lo < hi and nums[lo] == left: 
        #                 lo += 1
        #         elif sum > target:
        #             while lo < hi and nums[hi] == right: 
        #                 hi -= 1
        #         else:
        #             res.append([left, right])
        #             while lo < hi and nums[lo] == left: 
        #                 lo += 1
        #             while lo < hi and nums[hi] == right: 
        #                 hi -= 1
        #     return res
        
        
        # # 注意：调用这个函数之前一定要先给 nums 排序
        # # n 填写想求的是几数之和，start 从哪个索引开始计算（一般填 0），target 填想凑出的目标和
        # def nSumTarget(nums: List[int], n: int, start: int, target: int) -> List[List[int]]:
        #     sz = len(nums)
        #     res = []
        #     # 至少是 2Sum，且数组大小不应该小于 n
        #     if n < 2 or sz < n:
        #         return res
        #     # 2Sum 是 base case
        #     if n == 2:
        #         # 双指针那一套操作
        #         lo, hi = start, sz-1
        #         while lo < hi:
        #             sum = nums[lo] + nums[hi]
        #             left, right = nums[lo], nums[hi]
        #             if sum < target:
        #                 while lo < hi and nums[lo] == left:
        #                     lo += 1
        #             elif sum > target:
        #                 while lo < hi and nums[hi] == right:
        #                     hi -= 1
        #             else:
        #                 res.append([left, right])
        #                 while lo < hi and nums[lo] == left:
        #                     lo += 1
        #                 while lo < hi and nums[hi] == right:
        #                     hi -= 1
        #         return res
        #     else:
        #         # n > 2 时，递归计算 (n-1)Sum 的结果
        #         for i in range(start, sz):
        #             if i > start and nums[i] == nums[i - 1]:
        #                 # 跳过重复元素
        #                 continue
        #             subs = nSumTarget(nums, n-1, i+1, target-nums[i])
        #             for sub in subs:
        #                 # (n-1)Sum 加上 nums[i] 就是 nSum
        #                 sub.append(nums[i])
        #                 res.append(sub)
        #         return res`,
            language: "python"
        },
        {
            id: 199,
            title: "Binary Tree Right Side View",
            description: `Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.   Example 1: Input: root = [1,2,3,null,5,null,4] Output: [1,3,4] Explanation: Example 2: Input: root = [1,2,3,4,null,null,null,5] Output: [1,3,4,5] Explanation: Example 3: Input: root = [1,null,3] Output: [1,3] Example 4: Input: root = [] Output: []   Constraints: The number of nodes in the tree is in the range [0, 100]. -100 <= Node.val <= 100
<a href="https://leetcode.com/problems/binary-tree-right-side-view/" target="_blank">https://leetcode.com/problems/binary-tree-right-side-view/</a>`,
            keywords: ["BT", "BTTraverse"],
            code: `        # keep depths, res, compare depth with len(res)
        # right first
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
                self.depth = 0
                self.res = []
        
                self.traverse(root)
        
                return self.res
        
            def traverse(self, node):
                if node is None:
                    return
                
                self.depth += 1
                if self.depth > len(self.res):
                    self.res.append(node.val)
                
                self.traverse(node.right)
                self.traverse(node.left)
        
                self.depth -= 1
        
        # 1、用 BFS 层序遍历算法，每一层的最后一个节点就是二叉树的右侧视图。我们可以把 BFS 反过来，从右往左遍历每一行，进一步提升效率。
        
        # 2、用 DFS 递归遍历算法，同样需要反过来，先递归 root.right 再递归 root.left，同时用 res 记录每一层的最右侧节点作为右侧视图。
        
        # from collections import deque
        
        # class Solution:
        #     # BFS 层序遍历解法
        #     def rightSideView(self, root) -> list:
        #         res = []
        #         if root is None:
        #             return res
        #         # BFS 层序遍历，计算右侧视图
        #         q = deque([root])
        #         # while 循环控制从上向下一层层遍历
        #         while q:
        #             sz = len(q)
        #             # 每一层头部就是最右侧的元素
        #             last = q[0]
        #             for i in range(sz):
        #                 cur = q.popleft()
        #                 # 控制每一层从右向左遍历
        #                 if cur.right:
        #                     q.append(cur.right)
        #                 if cur.left:
        #                     q.append(cur.left)
        #             # 每一层的最后一个节点就是二叉树的右侧视图
        #             res.append(last.val)
        #         return res
        
        #     # DFS 递归遍历解法
        #     def rightSideView_DFS(self, root) -> list:
        #         self.res = []
        #         # 记录递归的层数
        #         self.depth = 0
        #         self.traverse(root)
        #         return self.res
        
        #     # 二叉树遍历函数
        #     def traverse(self, root):
        #         if root is None:
        #             return
        #         # 前序遍历位置
        #         self.depth += 1
        #         if len(self.res) < self.depth:
        #             # 这一层还没有记录值
        #             # 说明 root 就是右侧视图的第一个节点
        #             self.res.append(root.val)
        #         # 注意，这里反过来，先遍历右子树再遍历左子树
        #         # 这样首先遍历的一定是右侧节点
        #         self.traverse(root.right)
        #         self.traverse(root.left)
        #         # 后序遍历位置
        #         self.depth -= 1`,
            language: "python"
        },
        {
            id: 200,
            title: "Number of Islands",
            description: `Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.   Example 1: Input: grid = [ ["1","1","1","1","0"], ["1","1","0","1","0"], ["1","1","0","0","0"], ["0","0","0","0","0"] ] Output: 1 Example 2: Input: grid = [ ["1","1","0","0","0"], ["1","1","0","0","0"], ["0","0","1","0","0"], ["0","0","0","1","1"] ] Output: 3   Constraints: m == grid.length n == grid[i].length 1 <= m, n <= 300 grid[i][j] is '0' or '1'.
<a href="https://leetcode.com/problems/number-of-islands/" target="_blank">https://leetcode.com/problems/number-of-islands/</a>`,
            keywords: ["DFS", "Backtrack", "Islands"],
            code: `        # floodfill eliminates self.used
        # base case: boundary + is sea
        
        class Solution:
            def numIslands(self, grid: List[List[str]]) -> int:
                cnt = 0
                self.grid = grid
                self.m = len(grid)
                self.n = len(grid[0])
        
                for i in range(self.m):
                    for j in range(self.n):
                        if grid[i][j] == '1':
                            cnt += 1
                            self.dfs(i, j)
                return cnt
        
            def dfs(self, i, j):
                if i < 0 or i >= self.m or j < 0 or j >= self.n:
                    return
                if self.grid[i][j] == '0':
                    return
                self.grid[i][j] = '0'
                for di, dj in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    self.dfs(i+di, j+dj)
        
        # class Solution:
        #     # 主函数，计算岛屿数量
        #     def numIslands(self, grid: List[List[str]]) -> int:
        #         res = 0
        #         m, n = len(grid), len(grid[0])
        #         # 遍历 grid
        #         for i in range(m):
        #             for j in range(n):
        #                 if grid[i][j] == '1':
        #                     # 每发现一个岛屿，岛屿数量加一
        #                     res += 1
        #                     # 然后使用 DFS 将岛屿淹了
        #                     self.dfs(grid, i, j)
        #         return res
        
        #     # 从 (i, j) 开始，将与之相邻的陆地都变成海水
        #     def dfs(self, grid, i, j):
        #         m, n = len(grid), len(grid[0])
        #         if i < 0 or j < 0 or i >= m or j >= n:
        #             # 超出索引边界
        #             return
        #         if grid[i][j] == '0':
        #             # 已经是海水了
        #             return
        #         # 将 (i, j) 变成海水
        #         grid[i][j] = '0'
        #         # 淹没上下左右的陆地
        #         self.dfs(grid, i + 1, j)
        #         self.dfs(grid, i, j + 1)
        #         self.dfs(grid, i - 1, j)
        #         self.dfs(grid, i, j - 1)
        
        # class UF:
        #     # 连通分量个数
        #     _count: int
        #     # 存储每个节点的父节点
        #     parent: List[int]
        #     # 记录每棵树的「重量」（节点数量）
        #     _size: List[int]
        
        #     # n 为图中节点的个数
        #     def __init__(self, n: int):
        #         self._count = n
        #         self.parent = [i for i in range(n)]
        #         self._size = [1] * n
        
        #     # 将节点 p 和节点 q 连通
        #     def union(self, p: int, q: int):
        #         rootP = self.find(p)
        #         rootQ = self.find(q)
        
        #         if rootP == rootQ:
        #             return
        
        #         # 把小树接到大树下面，更平衡
        #         if self._size[rootP] > self._size[rootQ]:
        #             self.parent[rootQ] = rootP
        #             self._size[rootP] += self._size[rootQ]
        #         else:
        #             self.parent[rootP] = rootQ
        #             self._size[rootQ] += self._size[rootP]
        #         # 两个连通分量合并成一个连通分量
        #         self._count -= 1
        
        #     # 判断节点 p 和节点 q 是否连通
        #     def connected(self, p: int, q: int) -> bool:
        #         rootP = self.find(p)
        #         rootQ = self.find(q)
        #         return rootP == rootQ
        
        #     # 使用路径压缩
        #     def find(self, x: int) -> int:
        #         if self.parent[x] != x:
        #             self.parent[x] = self.find(self.parent[x])
        #         return self.parent[x]
        
        #     # 返回图中的连通分量个数
        #     def count(self) -> int:
        #         return self._count
        
        #     # 返回节点 x 所在连通分量的节点总数
        #     def size(self, x: int) -> int:
        #         root = self.find(x)
        #         return self._size[root]`,
            language: "python"
        },
        {
            id: 204,
            title: "Count Primes",
            description: `Given an integer n, return the number of prime numbers that are strictly less than n.   Example 1: Input: n = 10 Output: 4 Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7. Example 2: Input: n = 0 Output: 0 Example 3: Input: n = 1 Output: 0   Constraints: 0 <= n <= 5 * 106
<a href="https://leetcode.com/problems/count-primes/description/" target="_blank">https://leetcode.com/problems/count-primes/description/</a>`,
            keywords: ["Math"],
            code: `        # 比如 n = 25，i = 5 时算法会标记 5 × 2 = 10，5 × 3 = 15 等等数字，但是这两个数字已经被 i = 2 和 i = 3 的 2 × 5 和 3 × 5 标记了。
        
        #我们可以稍微优化一下，让 j 从 i * i 开始遍历，而不是从 2 * i 开始：
        class Solution:
            def countPrimes(self, n: int) -> int:
                isPrime = [True] * n
                for i in range(2, int(n ** 0.5) + 1): # sqrt(n) +1
                    if isPrime[i]:
                        for j in range(i * i, n, i): # 2i -> n +i, i^2 -> n +i
                            isPrime[j] = False
        
                count = 0
                for i in range(2, n):
                    if isPrime[i]: 
                        count += 1
        
                return count`,
            language: "python"
        },
        {
            id: 206,
            title: "Reverse Linked List",
            description: `Given the head of a singly linked list, reverse the list, and return the reversed list.   Example 1: Input: head = [1,2,3,4,5] Output: [5,4,3,2,1] Example 2: Input: head = [1,2] Output: [2,1] Example 3: Input: head = [] Output: []   Constraints: The number of nodes in the list is the range [0, 5000]. -5000 <= Node.val <= 5000   Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?
<a href="https://leetcode.com/problems/reverse-linked-list/" target="_blank">https://leetcode.com/problems/reverse-linked-list/</a>`,
            keywords: ["LinkedList", "2ptr"],
            code: `        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, val=0, next=None):
        #         self.val = val
        #         self.next = next
        
        # iterative
        #   prev, cur, nxt = None, head, head.next
        #   Remember last link: cur.next = prev
        # recursive
        #   base case | return the first list node
        #   head.next.next = head
        #   head.next = None
        
        # reverseN
        # iterative 
        #   see the right figure
        #   head.next = cur 
        #   return pre
        # recursive
        #   successor = head.next
        #   return head (last)
        
        class Solution:
            # iterative
            def reverseList1(self, head: Optional[ListNode]) -> Optional[ListNode]:
                if head is None or head.next is None:
                    return head
                prev, cur, nxt = None, head, head.next
                while nxt:
                    cur.next = prev
                    prev = cur
                    cur = nxt
                    nxt = nxt.next
                cur.next = prev
                return cur
            
            # recursive
            def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
                if head is None or head.next is None:
                    return head
                last = self.reverseList(head.next)
                head.next.next = head
                head.next = None
                # return the first list node
                return last
        
        def reverseN(head: ListNode, n: int):
            if head is None or head.next is None:
                return head
            pre, cur, nxt = None, head, head.next
            while n > 0:
                cur.next = pre
                pre = cur
                cur = nxt
                if nxt is not None:
                    nxt = nxt.next
                n -= 1
            # 此时的 cur 是第 n + 1 个节点，head 是反转后的尾结点
            head.next = cur 
            # 此时的 pre 是反转后的头结点
            return pre
        
        
        # 后驱节点
        successor = None
        
        # 反转以 head 为起点的 n 个节点，返回新的头结点
        def reverseN(head: ListNode, n: int):
            global successor
            if n == 1:
                # 记录第 n + 1 个节点
                successor = head.next
                return head
        
            # 以 head.next 为起点，需要反转前 n - 1 个节点
            last = reverseN(head.next, n - 1)
        
            head.next.next = head
            # 让反转之后的 head 节点和后面的节点连起来
            head.next = successor
            return last 
        `,
            language: "python"
        },
        {
            id: 207,
            title: "Course Schedule",
            description: `There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1. Return true if you can finish all courses. Otherwise, return false.   Example 1: Input: numCourses = 2, prerequisites = [[1,0]] Output: true Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible. Example 2: Input: numCourses = 2, prerequisites = [[1,0],[0,1]] Output: false Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.   Constraints: 1 <= numCourses <= 2000 0 <= prerequisites.length <= 5000 prerequisites[i].length == 2 0 <= ai, bi < numCourses All the pairs prerequisites[i] are unique.`,
            keywords: ["Graph"],
            code: `        # DFS: visited, onPath
        #   must check circle before visited1
        # BFS: q, inDegrees, count 
        # To return circle:
        #   DFS cannot use onPath directly, because additional head nodes will be added
        
        from collections import deque
        
        class Solution:
            def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        
                self.build(numCourses, prerequisites)
        
                # # Prepare DFS
                # self.onPath = [False for i in range(numCourses)] # path as stack, or onPath with length; might form a "6" which include the circle + init path
                # self.visited = set()
                # self.hasCircle = False
        
                # # dfs
                # for i in range(numCourses):
                #     self.dfs(i)
                # return not self.hasCircle
        
        
                # Prepare BFS + bfs
                return self.bfs(numCourses, prerequisites)
           
        
            def build(self, numCourses, prerequisites):
                self.graph = [[0 for i in range(numCourses)] for j in range(numCourses)]
                for i, j in prerequisites:
                    self.graph[i][j] = 1
        
            def dfs(self, node):
                if self.hasCircle:
                    return
        
                if self.onPath[node]:
                    self.hasCircle = True
                    return # early exit
                # MUST put after circle check
                if node in self.visited:
                    return
        
                self.visited.add(node)
                self.onPath[node] = True
        
                dests = self.graph[node]
                for j in range(len(dests)):
                    if dests[j] == 1:
                        self.dfs(j)
                self.onPath[node] = False
            
            def bfs(self, numCourses, prerequisites):
                q = deque()
                inDegrees = [0 for i in range(numCourses)]
        
                for i, j in prerequisites:
                    inDegrees[j] += 1
                for i in range(len(inDegrees)):
                    if inDegrees[i] == 0:
                        q.append(i)
                
                visited = 0
                while q:
                    cur = q.popleft()
                    visited += 1
                    for j in range(numCourses):
                        if self.graph[cur][j] == 1:
                            inDegrees[j] -= 1
                            if inDegrees[j] == 0:
                                q.append(j)
                return visited == numCourses
        
        
        
        
        
        # from typing import List
        
        # def buildGraph(numCourses: int, prerequisites: List[List[int]]) -> List[List[int]]:
        #     # 图中共有 numCourses 个节点
        #     graph = [[] for _ in range(numCourses)]
        #     for edge in prerequisites:
        #         from_, to_ = edge[1], edge[0]
        #         # 添加一条从 from 指向 to 的有向边
        #         # 边的方向是「被依赖」关系，即修完课程 from 才能修课程 to
        #         graph[from_].append(to_)
        #     return graph
        
        # # DFS
        
        # class Solution:
        #     def __init__(self):
        #         # 记录一次递归堆栈中的节点
        #         self.onPath = []
        #         # 记录节点是否被遍历过
        #         self.visited = []
        #         # 记录图中是否有环
        #         self.hasCycle = False
        
        #     def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        #         graph = self.buildGraph(numCourses, prerequisites)
                
        #         self.onPath = [False] * numCourses
        #         self.visited = [False] * numCourses
                
        #         for i in range(numCourses):
        #             # 遍历图中的所有节点
        #             self.traverse(graph, i)
        #         # 只要没有循环依赖可以完成所有课程
        #         return not self.hasCycle
        
        #     # 图遍历函数，遍历所有路径
        #     def traverse(self, graph: List[List[int]], s: int):
        #         if self.hasCycle:
        #             # 如果已经找到了环，也不用再遍历了
        #             return
        
        #         if self.onPath[s]:
        #             # s 已经在递归路径上，说明成环了
        #             self.hasCycle = True
        #             return
                
        #         if self.visited[s]:
        #             # 不用再重复遍历已遍历过的节点
        #             return
        
        #         # 前序代码位置
        #         self.visited[s] = True
        #         self.onPath[s] = True
        #         for t in graph[s]:
        #             self.traverse(graph, t)
        #         # 后序代码位置
        #         self.onPath[s] = False
            
        #     def buildGraph(self, numCourses: int, prerequisites: List[List[int]]) -> List[List[int]]:
        #         # 代码见前文
        #         pass
        
        # # 不过如果出题人继续提问，让你不仅要判断是否存在环，还要返回这个环具体有哪些节点，怎么办？
        
        # # 你可能说，onPath 里面为 true 的索引，不就是组成环的节点编号吗？
        
        # # 不是的，假设从节点 0 开始遍历，下图中绿色的节点是递归的路径，它们在 onPath 中的值都是 true，但显然成环的节点只是其中的一部分：
        
        # # 最简单直接的解法是，在 boolean[] onPath 数组的基础上，我们再使用一个 Stack<Integer> path 栈，把遍历过程中经过的节点顺序也保存下来。
        
        # # 比如按照上图绿色的遍历顺序，path 从栈底到栈顶的元素就是 [0,4,5,9,8,7,6]。此时又一次遇到了节点 5，那么就可以知道 [5,9,8,7,6] 这部分是环了。
        
        
        # # BFS
        
        # class Solution:
        
        #     def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        #         # 建图，有向边代表「被依赖」关系
        #         graph = self.buildGraph(numCourses, prerequisites)
        #         # 构建入度数组
        #         indegree = [0] * numCourses
        #         for edge in prerequisites:
        #             from_, to = edge[1], edge[0]
        #             # 节点 to 的入度加一
        #             indegree[to] += 1
        
        #         # 根据入度初始化队列中的节点
        #         q = collections.deque()
        #         for i in range(numCourses):
        #             if indegree[i] == 0:
        #                 # 节点 i 没有入度，即没有依赖的节点
        #                 # 可以作为拓扑排序的起点，加入队列
        #                 q.append(i)
        #         # 记录遍历的节点个数
        #         count = 0
        #         # 开始执行 BFS 循环
        #         while q:
        #             # 弹出节点 cur，并将它指向的节点的入度减一
        #             cur = q.popleft()
        #             count += 1
        #             for next_ in graph[cur]:
        #                 indegree[next_] -= 1
        #                 if indegree[next_] == 0:
        #                     # 如果入度变为 0，说明 next 依赖的节点都已被遍历
        #                     q.append(next_)
        
        #         # 如果所有节点都被遍历过，说明不成环
        #         return count == numCourses
        
        #     # 建图函数
        #     def buildGraph(self, n, edges):
        #         # 见前文
        #         pass`,
            language: "python"
        },
        {
            id: 208,
            title: "Implement Trie (Prefix Tree)",
            description: `A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker. Implement the Trie class: Trie() Initializes the trie object. void insert(String word) Inserts the string word into the trie. boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise. boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.   Example 1: Input ["Trie", "insert", "search", "search", "startsWith", "insert", "search"] [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]] Output [null, null, true, false, true, null, true] Explanation Trie trie = new Trie(); trie.insert("apple"); trie.search("apple"); // return True trie.search("app"); // return False trie.startsWith("app"); // return True trie.insert("app"); trie.search("app"); // return True   Constraints: 1 <= word.length, prefix.length <= 2000 word and prefix consist only of lowercase English letters. At most 3 * 104 calls in total will be made to insert, search, and startsWith.
<a href="https://leetcode.com/problems/implement-trie-prefix-tree/" target="_blank">https://leetcode.com/problems/implement-trie-prefix-tree/</a>`,
            keywords: ["Trie"],
            code: `        # feature
        #   方便处理前缀操作
        #   可以使用通配符
        #   可以按照字典序遍历键
        # impl
        #   self.children = [None]*256 // save TrieNode
        #   sel.val // save value
        
        # The edge means the word, thus the path lengths is word length + 1
        # when i == len(word) should we set the node.val to True
        
        
        class TrieNode:
            def __init__(self, val):
                self.val = val # is end
                self.children = [None] * 26
                
        class Trie:
            
            def __init__(self):
                self.root = TrieNode(False)
        
            def insert(self, word: str) -> None:
                self._insert(self.root, word, 0)
                
            def _insert(self, node, word, i):
                # construction
                if node is None:
                    node = TrieNode(False)
                if i == len(word):
                    node.val = True
                    return node
                
                c = ord(word[i]) - ord('a')
                node.children[c] = self._insert(node.children[c], word, i+1)
                return node
        
        
            def search(self, word: str) -> bool:
                return self._search(self.root, word, 0)
        
            def _search(self, node, word, i):
                
                if node is None:
                    return False
                if i == len(word):
                    return node.val
                
                c = ord(word[i]) - ord('a')
                child = node.children[c]
                
                return self._search(child, word, i+1)
                
        
            def startsWith(self, prefix: str) -> bool:
                return self._startsWith(self.root, prefix, 0)
        
            def _startsWith(self, node, word, i):
                if node is None:
                    return False
                if i == len(word):
                    return True
                
                c = ord(word[i]) - ord('a')
                child = node.children[c]
                
                return self._startsWith(child, word, i+1)
                
        
        
        # Your Trie object will be instantiated and called as such:
        # obj = Trie()
        # obj.insert(word)
        # param_2 = obj.search(word)
        # param_3 = obj.startsWith(prefix)
        
        # class TrieMap:
        #     # ASCII 码个数
        #     R = 256
        
        #     class TrieNode:
        #         def __init__(self):
        #             self.val = None
        #             self.children = [None] * TrieMap.R
        
        #     def __init__(self):
        #         # 当前存在 Map 中的键值对个数
        #         self._size = 0
        #         # Trie 树的根节点
        #         self.root = None
        
        #     # **** 增/改 ****
        
        #     # 在 map 中添加或修改键值对
        #     def put(self, key: str, val):
        #         if not self.containsKey(key):
        #             # 新增键值对
        #             self._size += 1
        #         # 需要一个额外的辅助函数，并接收其返回值
        #         self.root = self._put(self.root, key, val, 0)
        
        #     # 定义：向以 node 为根的 Trie 树中插入 key[i..]，返回插入完成后的根节点
        #     def _put(self, node, key: str, val, i: int):
        #         if node is None:
        #             # 如果树枝不存在，新建
        #             node = TrieMap.TrieNode()
        #         if i == len(key):
        #             # key 的路径已插入完成，将值 val 存入节点
        #             node.val = val
        #             return node
        #         c = ord(key[i])
        #         # 递归插入子节点，并接收返回值
        #         node.children[c] = self._put(node.children[c], key, val, i + 1)
        #         return node
        
        #     # **** 删 ****
        
        #     # 在 Map 中删除 key
        #     def remove(self, key: str):
        #         if not self.containsKey(key):
        #             return
        #         # 递归修改数据结构要接收函数的返回值
        #         self.root = self._remove(self.root, key, 0)
        #         self._size -= 1
        
        #     # 定义：在以 node 为根的 Trie 树中删除 key[i..]，返回删除后的根节点
        #     def _remove(self, node, key: str, i: int):
        #         if node is None:
        #             return None
        #         if i == len(key):
        #             # 找到了 key 对应的 TrieNode，删除 val
        #             node.val = None
        #         else:
        #             c = ord(key[i])
        #             # 递归去子树进行删除
        #             node.children[c] = self._remove(node.children[c], key, i + 1)
        #         # 后序位置，递归路径上的节点可能需要被清理
        #         if node.val is not None:
        #             # 如果该 TireNode 存储着 val，不需要被清理
        #             return node
        #         # 检查该 TrieNode 是否还有后缀
        #         for c in range(self.R):
        #             if node.children[c] is not None:
        #                 # 只要存在一个子节点（后缀树枝），就不需要被清理
        #                 return node
        #         # 既没有存储 val，也没有后缀树枝，则该节点需要被清理
        #         return None
        
        #     # **** 查 ****
        
        #     # 搜索 key 对应的值，不存在则返回 None
        #     def get(self, key: str):
        #         # 从 root 开始搜索 key
        #         x = self._getNode(self.root, key)
        #         if x is None or x.val is None:
        #             # x 为空或 x 的 val 字段为空都说明 key 没有对应的值
        #             return None
        #         return x.val
        
        #     # 判断 key 是否存在在 Map 中
        #     def containsKey(self, key: str) -> bool:
        #         return self.get(key) is not None
        
        #     # 判断是和否存在前缀为 prefix 的键
        #     def hasKeyWithPrefix(self, prefix: str) -> bool:
        #         # 只要能找到一个节点，就是存在前缀
        #         return self._getNode(self.root, prefix) is not None
        
        #     # 在所有键中寻找 query 的最短前缀
        #     def shortestPrefixOf(self, query: str) -> str:
        #         p = self.root
        #         # 从节点 node 开始搜索 key
        #         for i in range(len(query)):
        #             if p is None:
        #                 # 无法向下搜索
        #                 return ""
        #             if p.val is not None:
        #                 # 找到一个键是 query 的前缀
        #                 return query[:i]
        #             # 向下搜索
        #             c = ord(query[i])
        #             p = p.children[c]
        #         if p is not None and p.val is not None:
        #             # 如果 query 本身就是一个键
        #             return query
        #         return ""
        
        #     # 在所有键中寻找 query 的最长前缀
        #     def longestPrefixOf(self, query: str) -> str:
        #         p = self.root
        #         # 记录前缀的最大长度
        #         max_len = 0
        #         # 从节点 node 开始搜索 key
        #         for i in range(len(query)):
        #             if p is None:
        #                 # 无法向下搜索
        #                 break
        #             if p.val is not None:
        #                 # 找到一个键是 query 的前缀，更新前缀的最大长度
        #                 max_len = i
        #             # 向下搜索
        #             c = ord(query[i])
        #             p = p.children[c]
        #         if p is not None and p.val is not None:
        #             # 如果 query 本身就是一个键
        #             return query
        #         return query[:max_len]
        
        #     # 搜索前缀为 prefix 的所有键
        #     def keysWithPrefix(self, prefix: str) -> list:
        #         res = []
        #         # 找到匹配 prefix 在 Trie 树中的那个节点
        #         x = self._getNode(self.root, prefix)
        #         if x is None:
        #             return res
        #         # DFS 遍历以 x 为根的这棵 Trie 树
        #         self._traverse(x, list(prefix), res)
        #         return res
        
        #     # 遍历以 node 节点为根的 Trie 树，找到所有键
        #     def _traverse(self, node, path: list, res: list):
        #         if node is None:
        #             # 到达 Trie 树底部叶子结点
        #             return
        #         if node.val is not None:
        #             # 找到一个 key，添加到结果列表中
        #             res.append(''.join(path))
        #         # 回溯算法遍历框架
        #         for c in range(self.R):
        #             # 做选择
        #             path.append(chr(c))
        #             self._traverse(node.children[c], path, res)
        #             # 撤销选择
        #             path.pop()
        
        #     # 通配符 . 匹配任意字符
        #     def keysWithPattern(self, pattern: str) -> list:
        #         res = []
        #         self._traversePattern(self.root, [], pattern, 0, res)
        #         return res
        
        #     # 遍历函数，尝试在「以 node 为根的 Trie 树中」匹配 pattern[i..]
        #     def _traversePattern(self, node, path: list, pattern: str, i: int, res: list):
        #         if node is None:
        #             # 树枝不存在，即匹配失败
        #             return
        #         if i == len(pattern):
        #             # pattern 匹配完成
        #             if node.val is not None:
        #                 # 如果这个节点存储着 val，则找到一个匹配的键
        #                 res.append(''.join(path))
        #             return
        #         c = pattern[i]
        #         if c == '.':
        #             # pattern[i] 是通配符，可以变化成任意字符
        #             for j in range(self.R):
        #                 path.append(chr(j))
        #                 self._traversePattern(node.children[j], path, pattern, i + 1, res)
        #                 path.pop()
        #         else:
        #             # pattern[i] 是普通字符 c
        #             path.append(c)
        #             self._traversePattern(node.children[ord(c)], path, pattern, i + 1, res)
        #             path.pop()
        
        #     # 判断是和否存在前缀为 prefix 的键
        #     def hasKeyWithPattern(self, pattern: str) -> bool:
        #         # 从 root 节点开始匹配 pattern[0..]
        #         return self._hasKeyWithPattern(self.root, pattern, 0)
        
        #     # 函数定义：从 node 节点开始匹配 pattern[i..]，返回是否成功匹配
        #     def _hasKeyWithPattern(self, node, pattern: str, i: int) -> bool:
        #         if node is None:
        #             # 树枝不存在，即匹配失败
        #             return False
        #         if i == len(pattern):
        #             # 模式串走到头了，看看匹配到的是否是一个键
        #             return node.val is not None
        #         c = pattern[i]
        #         # 没有遇到通配符
        #         if c != '.':
        #             # 从 node.children[c] 节点开始匹配 pattern[i+1..]
        #             return self._hasKeyWithPattern(node.children[ord(c)], pattern, i + 1)
        #         # 遇到通配符
        #         for j in range(self.R):
        #             # pattern[i] 可以变化成任意字符，尝试所有可能，只要遇到一个匹配成功就返回
        #             if self._hasKeyWithPattern(node.children[j], pattern, i + 1):
        #                 return True
        #         # 都没有匹配
        #         return False
        
        #     # 从节点 node 开始搜索 key，如果存在返回对应节点，否则返回 None
        #     def _getNode(self, node, key: str):
        #         p = node
        #         # 从节点 node 开始搜索 key
        #         for i in range(len(key)):
        #             if p is None:
        #                 # 无法向下搜索
        #                 return None
        #             # 向下搜索
        #             c = ord(key[i])
        #             p = p.children[c]
        #         return p
        
        #     def size(self) -> int:
        #         return self._size`,
            language: "python"
        },
        {
            id: 209,
            title: "Minimum Size Subarray Sum",
            description: `Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.   Example 1: Input: target = 7, nums = [2,3,1,2,4,3] Output: 2 Explanation: The subarray [4,3] has the minimal length under the problem constraint. Example 2: Input: target = 4, nums = [1,4,4] Output: 1 Example 3: Input: target = 11, nums = [1,1,1,1,1,1,1,1] Output: 0   Constraints: 1 <= target <= 109 1 <= nums.length <= 105 1 <= nums[i] <= 104   Follow up: If you have figured out the O(n) solution, try coding another solution of which the time complexity is O(n log(n)).
<a href="https://leetcode.com/problems/minimum-size-subarray-sum/description/" target="_blank">https://leetcode.com/problems/minimum-size-subarray-sum/description/</a>`,
            keywords: ["SlidingWindow"],
            code: `        # because all >=0, then can use sliding window
        
        class Solution:
            def minSubArrayLen(self, target: int, nums: List[int]) -> int:
                left = 0
                right = 0
        
                total = 0
                res = 10**5+1
                while right < len(nums):
                    total += nums[right]
                    right += 1
                    while left < right and total >= target:
                        res = min(res, right - left)
                        total -= nums[left]
                        left += 1
                
                return res if res <= 10**5 else 0
                        `,
            language: "python"
        },
        {
            id: 210,
            title: "Course Schedule II",
            description: `There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1. Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.   Example 1: Input: numCourses = 2, prerequisites = [[1,0]] Output: [0,1] Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1]. Example 2: Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]] Output: [0,2,1,3] Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0. So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3]. Example 3: Input: numCourses = 1, prerequisites = [] Output: [0]   Constraints: 1 <= numCourses <= 2000 0 <= prerequisites.length <= numCourses * (numCourses - 1) prerequisites[i].length == 2 0 <= ai, bi < numCourses ai != bi All the pairs [ai, bi] are distinct.
<a href="https://leetcode.com/problems/course-schedule-ii/" target="_blank">https://leetcode.com/problems/course-schedule-ii/</a>`,
            keywords: ["Graph", "Topological"],
            code: `        # 后序遍历的这一特点很重要，之所以拓扑排序的基础是后序遍历，是因为一个任务必须等到它依赖的所有任务都完成之后才能开始开始执行。
        # order1: parent -> child: my dependants all before me, need reverse the order
        # order2: child -> parent: my prerequisites all before me
        # bfs need to reverse order: parent -> child
        
        from collections import deque
        
        class Solution:
            def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
                self.build(numCourses, prerequisites)
        
                # # DFS
                # self.onPath = [0 for i in range(numCourses)]
                # self.order = []
                # self.visited = set()
                # self.hasCircle = False
                # for i in range(numCourses):
                #     self.dfs(i)
                # return self.order if not self.hasCircle else []
        
                # BFS
                return self.bfs(numCourses, prerequisites)
        
            def build(self, numCourses, prerequisites):
                self.graph = [[0 for i in range(numCourses)] for j in range(numCourses)]
                for i, j in prerequisites:
                    # dfs: child -> parent
                    #self.graph[i][j] = 1
                    # bfs: parent -> dep
                    self.graph[j][i] = 1
            
            def dfs(self, node):
                
                if self.hasCircle:
                    return
                if self.onPath[node]:
                    self.hasCircle = True
                    return
                # MUST put after circle check
                if node in self.visited:
                    return
        
                self.visited.add(node)
                self.onPath[node] = 1
        
                for j in range(len(self.graph[node])):
                    if self.graph[node][j]:
                        self.dfs(j)
                
                self.onPath[node] = 0
                self.order.append(node)
        
                
            def bfs(self, n, p):
                q = deque()
                inDegrees = [0 for i in range(n)]
                count = 0
                order = []
        
                for i, j in p:
                    inDegrees[i] += 1
                for i in range(n):
                    if inDegrees[i] == 0:
                        q.append(i)
                
                while q:
                    cur = q.popleft()
                    count += 1
                    order.append(cur)
                    for j in range(len(self.graph[cur])):
                        if self.graph[cur][j]:
                            inDegrees[j] -= 1
                            if inDegrees[j] == 0:
                                q.append(j)
                
                return order if count == n else []
                        
        
        # # DFS
        # class Solution:
        
        #     def __init__(self):
        #         # 记录后序遍历结果
        #         self.postorder = []
        #         # 记录是否存在环
        #         self.hasCycle = False
        #         self.visited = []
        #         self.onPath = []
        
        #     def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        #         graph = self.buildGraph(numCourses, prerequisites)
        #         self.visited = [False] * numCourses
        #         self.onPath = [False] * numCourses
        #         # 遍历图
        #         for i in range(numCourses):
        #             self.traverse(graph, i)
        #         # 有环图无法进行拓扑排序
        #         if self.hasCycle:
        #             return []
        #         # 逆后序遍历结果即为拓扑排序结果
        #         self.postorder.reverse()
        #         return self.postorder
        
        #     # 图遍历函数
        #     def traverse(self, graph: List[List[int]], s: int):
        #         if self.onPath[s]:
        #             # 发现环
        #             self.hasCycle = True
        #         if self.visited[s] or self.hasCycle:
        #             return
        #         # 前序遍历位置
        #         self.onPath[s] = True
        #         self.visited[s] = True
        #         for t in graph[s]:
        #             self.traverse(graph, t)
        #         # 后序遍历位置
        #         self.postorder.append(s)
        #         self.onPath[s] = False
        
        #     # 建图函数
        #     def buildGraph(self, numCourses: int, prerequisites: List[List[int]]) -> List[List[int]]:
        #         # 代码见前文
        #         pass
        
        # # BFS
        # class Solution:
        #     def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        #         # 建图，和环检测算法相同
        #         graph = self.buildGraph(numCourses, prerequisites)
        #         # 计算入度，和环检测算法相同
        #         indegree = [0] * numCourses
        #         for edge in prerequisites:
        #             from_arc, to = edge[1], edge[0]
        #             indegree[to] += 1
        
        #         # 根据入度初始化队列中的节点，和环检测算法相同
        #         q = collections.deque()
        #         for i in range(numCourses):
        #             if indegree[i] == 0:
        #                 q.append(i)
                        
        #         # 记录拓扑排序结果
        #         res = [0] * numCourses
        #         # 记录遍历节点的顺序（索引）
        #         count = 0
        #         # 开始执行 BFS 算法
        #         while q:
        #             cur = q.popleft()
        #             # 弹出节点的顺序即为拓扑排序结果
        #             res[count] = cur
        #             count += 1
        #             for next_arc in graph[cur]:
        #                 indegree[next_arc] -= 1
        #                 if indegree[next_arc] == 0:
        #                     q.append(next_arc)
        
        #         if count != numCourses:
        #             # 存在环，拓扑排序不存在
        #             return []
                  
        #         return res
        
        #     def buildGraph(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        #         # 见前文
        #         pass`,
            language: "python"
        },
        {
            id: 216,
            title: "Combination Sum III",
            description: `Find all valid combinations of k numbers that sum up to n such that the following conditions are true: Only numbers 1 through 9 are used. Each number is used at most once. Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.   Example 1: Input: k = 3, n = 7 Output: [[1,2,4]] Explanation: 1 + 2 + 4 = 7 There are no other valid combinations. Example 2: Input: k = 3, n = 9 Output: [[1,2,6],[1,3,5],[2,3,4]] Explanation: 1 + 2 + 6 = 9 1 + 3 + 5 = 9 2 + 3 + 4 = 9 There are no other valid combinations. Example 3: Input: k = 4, n = 1 Output: [] Explanation: There are no valid combinations. Using 4 different numbers in the range [1,9], the smallest sum we can get is 1+2+3+4 = 10 and since 10 > 1, there are no valid combination.   Constraints: 2 <= k <= 9 1 <= n <= 60
<a href="https://leetcode.com/problems/combination-sum-iii/" target="_blank">https://leetcode.com/problems/combination-sum-iii/</a>`,
            keywords: ["DFS", "Backtrack"],
            code: `        # No repeat putback
        # Combination: backtrack(i+1) -> backtrack(i)
        # backtrack(i+1) -> backtrack(i) // still prune choose before i,
        
        # Permutation: remove used
        # just no used
        
        class Solution:
            def combinationSum3(self, k: int, n: int) -> List[List[int]]:
                self.res = []
                self.track = []
        
                self.sum = 0
                self.target = n
        
                self.l = k 
        
                self.backtrack(1)
        
                return self.res
        
            
            def backtrack(self, i):
                if self.sum == self.target and len(self.track) == self.l:
                    self.res.append(self.track.copy())
                    return
                if self.sum > self.target:
                    return
                if len(self.track) >= self.l:
                    return
                if i == 10:
                    return
                
                for index in range(i, 10):
                    self.sum += index
                    self.track.append(index)
                    self.backtrack(index+1)
                    self.track.pop()
                    self.sum -= index`,
            language: "python"
        },
        {
            id: 219,
            title: "Contains Duplicate II",
            description: `Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.   Example 1: Input: nums = [1,2,3,1], k = 3 Output: true Example 2: Input: nums = [1,0,1,1], k = 1 Output: true Example 3: Input: nums = [1,2,3,1,2,3], k = 2 Output: false   Constraints: 1 <= nums.length <= 105 -109 <= nums[i] <= 109 0 <= k <= 105
<a href="https://leetcode.com/problems/contains-duplicate-ii/" target="_blank">https://leetcode.com/problems/contains-duplicate-ii/</a>`,
            keywords: ["SlidingWindow"],
            code: `        # just k size map[right] > 1
        
        class Solution:
            def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
                window = {}
                left = 0
                right = 0
                while right < len(nums):
                    n = nums[right]
                    window[n] = window.get(n, 0) + 1
                    right += 1
                    while right - left > k + 1:
                        nl = nums[left]
                        if window.get(nl, 0) > 0:
                            window[nl] = window[nl] - 1
                        left += 1
                    if window.get(n, 0) > 1:
                        return True
                return False`,
            language: "python"
        },
        {
            id: 220,
            title: "Contains Duplicate III",
            description: `You are given an integer array nums and two integers indexDiff and valueDiff. Find a pair of indices (i, j) such that: i != j, abs(i - j) <= indexDiff. abs(nums[i] - nums[j]) <= valueDiff, and Return true if such pair exists or false otherwise.   Example 1: Input: nums = [1,2,3,1], indexDiff = 3, valueDiff = 0 Output: true Explanation: We can choose (i, j) = (0, 3). We satisfy the three conditions: i != j --> 0 != 3 abs(i - j) <= indexDiff --> abs(0 - 3) <= 3 abs(nums[i] - nums[j]) <= valueDiff --> abs(1 - 1) <= 0 Example 2: Input: nums = [1,5,9,1,5,9], indexDiff = 2, valueDiff = 3 Output: false Explanation: After trying all the possible pairs (i, j), we cannot satisfy the three conditions, so we return false.   Constraints: 2 <= nums.length <= 105 -109 <= nums[i] <= 109 1 <= indexDiff <= nums.length 0 <= valueDiff <= 109
<a href="https://leetcode.com/problems/contains-duplicate-iii/" target="_blank">https://leetcode.com/problems/contains-duplicate-iii/</a>`,
            keywords: ["SlidingWindow"],
            code: `        # sortedcontainers SortedList
        # Noted to avoid i == j
        
        from sortedcontainers import SortedList
        class Solution:
            def containsNearbyAlmostDuplicate(self, nums: List[int], indexDiff: int, valueDiff: int) -> bool:
                
                window = SortedList()
                left = 0
                right = 0
                while right < len(nums):
                    n = nums[right]
                    right += 1
                    
                    while right - left > indexDiff + 1:
                        nl = nums[left]
                        window.remove(nl)
                        left += 1
                        pass
                    
                    pos = window.bisect_right(n)
                    if pos < len(window) and window[pos] - n <= valueDiff:
                        return True
                    if pos > 0 and n - window[pos-1] <= valueDiff:
                        return True
                    window.add(n) # in case i == j
                return False`,
            language: "python"
        },
        {
            id: 222,
            title: "Count Complete Tree Nodes",
            description: `Given the root of a complete binary tree, return the number of the nodes in the tree. According to Wikipedia, every level, except possibly the last, is completely filled in a complete binary tree, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h. Design an algorithm that runs in less than O(n) time complexity.   Example 1: Input: root = [1,2,3,4,5,6] Output: 6 Example 2: Input: root = [] Output: 0 Example 3: Input: root = [1] Output: 1   Constraints: The number of nodes in the tree is in the range [0, 5 * 104]. 0 <= Node.val <= 5 * 104 The tree is guaranteed to be complete.
<a href="https://leetcode.com/problems/count-complete-tree-nodes/" target="_blank">https://leetcode.com/problems/count-complete-tree-nodes/</a>`,
            keywords: ["CBT"],
            code: `        # Time Complexity Analysis is interesting: 
        #   1 + self.countNodes(root.left) + self.countNodes(root.right)
        #.  only one branch is triggered
        #   O(logN×logN)
        #   not O(N×logN) 
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def countNodes(self, root: Optional[TreeNode]) -> int:
                h1 = 0
                p = root
                while p:
                    h1 += 1
                    p = p.left
        
                h2 = 0
                p = root
                while p:
                    h2 += 1
                    p = p.right
                
                if h1 == h2:
                    return pow(2, h1) - 1
                return 1 + self.countNodes(root.left) + self.countNodes(root.right)
        
        # normal bt        
        # def countNodes(root: TreeNode) -> int:
        #     if root == None:
        #         return 0
        #     return 1 + countNodes(root.left) + countNodes(root.right)
        
        # full bt
        # def countNodes(root: TreeNode) -> int:
        #     h = 0
        #     # 计算树的高度
        #     while root:
        #         root = root.left
        #         h += 1
        #     # 节点总数就是 2^h - 1
        #     return 2 ** h - 1
        
        # complete bt (this problem)
        # class Solution:
        #     def countNodes(self, root: TreeNode) -> int:
        #         l = root
        #         r = root
        #         hl = 0
        #         hr = 0
        #         # 沿最左侧和最右侧分别计算高度
        #         while l is not None:
        #             l = l.left
        #             hl += 1
        #         while r is not None:
        #             r = r.right
        #             hr += 1
        #         # 如果左右侧计算的高度相同，则是一棵满二叉树
        #         if hl == hr:
        #             return pow(2, hl) - 1
        #         # 如果左右侧的高度不同，则按照普通二叉树的逻辑计算
        #         return 1 + self.countNodes(root.left) + self.countNodes(root.right)`,
            language: "python"
        },
        {
            id: 224,
            title: "Basic Calculator",
            description: `Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation. Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().   Example 1: Input: s = "1 + 1" Output: 2 Example 2: Input: s = " 2-1 + 2 " Output: 3 Example 3: Input: s = "(1+(4+5+2)-3)+(6+8)" Output: 23   Constraints: 1 <= s.length <= 3 * 105 s consists of digits, '+', '-', '(', ')', and ' '. s represents a valid expression. '+' is not used as a unary operation (i.e., "+1" and "+(2 + 3)" is invalid). '-' could be used as a unary operation (i.e., "-1" and "-(2 + 3)" is valid). There will be no two consecutive operators in the input. Every number and running calculation will fit in a signed 32-bit integer.
<a href="https://leetcode.com/problems/basic-calculator/description/" target="_blank">https://leetcode.com/problems/basic-calculator/description/</a>`,
            keywords: ["Calculator"],
            code: `        class Solution:
            def calculate(self, s: str) -> int:
                # index beforehand
                self.brakets = {} # (: index
                st = []
                for i in range(len(s)):
                    if s[i] == "(":
                        st.append(i)
                    elif s[i] == ")":
                        index = st.pop()
                        self.brakets[index] = i
        
                return self.helper(s, 0, len(s)-1)
        
            def helper(self, s, lo, hi):
                st = []
                num = 0
                op = "+"
        
                i = lo
                while i <= hi:
                    c = s[i]
        
                    if c.isalnum():
                        num = num * 10 + int(c)
                    
                    elif c == "(":
                        # find right )
                        j = self.brakets[i]
                        # recursion
                        num = self.helper(s, i + 1, j - 1)
                        # to stride
                        # don't + 1 here for the following i == hi check
                        i = j
        
                    if c in "+-*/" or i == hi:
                        # for the following should compare op not c
                        if op == '+':
                            # put sign earlier, instead of judge during sum
                            st.append(num)
                            num = 0
                        elif op == '-':
                            # put sign earlier, instead of judge during sum
                            st.append(-num)
                            num = 0
                        elif op == '*':
                            # put sign earlier, instead of judge during sum
                            opA = st.pop()
                            st.append(opA * num)
                        elif op == '/':
                            # put sign earlier, instead of judge during sum
                            opA = st.pop()
                            st.append(int(opA / num)) # goes to 0, // not
                        num = 0
                        op = c
                    
                    i += 1
        
                return sum(st)
        
                    
        
        
        # class Solution:
        #     def calculate(self, s: str) -> int:
        #         # key 是左括号的索引，value 是对应的右括号的索引
        #         rightIndex = {}
        #         # 利用栈结构来找到对应的括号
        #         stack = []
        #         for i in range(len(s)):
        #             if s[i] == '(':
        #                 stack.append(i)
        #             elif s[i] == ')':
        #                 rightIndex[stack.pop()] = i
        #         return self._calculate(s, 0, len(s) - 1, rightIndex)
        
        #     # 定义：返回 s[start..end] 内的表达式的计算结果
        #     def _calculate(self, s, start, end, rightIndex):
        #         # 需要把字符串转成双端队列方便操作
        #         stk = []
        #         # 记录算式中的数字
        #         num = 0
        #         # 记录 num 前的符号，初始化为 +
        #         sign = '+'
        #         i = start 
        #         while i <= end:
        #             c = s[i]
        #             if c.isdigit():
        #                 num = 10 * num + int(c)
        #             if c == '(':
        #                 # 递归计算括号内的表达式
        #                 num = self._calculate(s, i + 1, rightIndex[i] - 1, rightIndex)
        #                 i = rightIndex[i]
        #             if c in '+-*/' or i == end:
        #                 if sign == '+':
        #                     stk.append(num)
        #                 elif sign == '-':
        #                     stk.append(-num)
        #                 elif sign == '*':
        #                     pre = stk.pop()
        #                     stk.append(pre * num)
        #                 elif sign == '/':
        #                     pre = stk.pop()
        #                     stk.append(int(pre / num))                   
        
        #                 # 更新符号为当前符号，数字清零
        #                 sign = c
        #                 num = 0
        #             i += 1
        #         # 将栈中所有结果求和就是答案
        #         res = 0
        #         while stk:
        #             res += stk.pop()
        #         return res`,
            language: "python"
        },
        {
            id: 225,
            title: "Implement Stack using Queues",
            description: `Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty). Implement the MyStack class: void push(int x) Pushes element x to the top of the stack. int pop() Removes the element on the top of the stack and returns it. int top() Returns the element on the top of the stack. boolean empty() Returns true if the stack is empty, false otherwise. Notes: You must use only standard operations of a queue, which means that only push to back, peek/pop from front, size and is empty operations are valid. Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue's standard operations.   Example 1: Input ["MyStack", "push", "push", "top", "pop", "empty"] [[], [1], [2], [], [], []] Output [null, null, null, 2, 2, false] Explanation MyStack myStack = new MyStack(); myStack.push(1); myStack.push(2); myStack.top(); // return 2 myStack.pop(); // return 2 myStack.empty(); // return False   Constraints: 1 <= x <= 9 At most 100 calls will be made to push, pop, top, and empty. All the calls to pop and top are valid.   Follow-up: Can you implement the stack using only one queue?
<a href="https://leetcode.com/problems/implement-stack-using-queues/" target="_blank">https://leetcode.com/problems/implement-stack-using-queues/</a>`,
            keywords: ["Stack", "Queue"],
            code: `        # circular pop and enqueue
        # update top1 in every pop
        
        from collections import deque
        class MyStack:
        
            def __init__(self):
                self.q = deque()
                self.top1 = 0
        
            def push(self, x: int) -> None:
                self.q.append(x)
                self.top1 = x
        
            def pop(self) -> int:
                n = len(self.q)
                while n > 1:
                    self.top1 = self.q.popleft()
                    self.q.append(self.top1)
                    n -= 1
                return self.q.popleft()
        
            def top(self) -> int:
                return self.top1
        
            def empty(self) -> bool:
                return len(self.q) == 0
        
        
        # Your MyStack object will be instantiated and called as such:
        # obj = MyStack()
        # obj.push(x)
        # param_2 = obj.pop()
        # param_3 = obj.top()
        # param_4 = obj.empty()`,
            language: "python"
        },
        {
            id: 226,
            title: "Invert Binary Tree",
            description: `Given the root of a binary tree, invert the tree, and return its root.   Example 1: Input: root = [4,2,7,1,3,6,9] Output: [4,7,2,9,6,3,1] Example 2: Input: root = [2,1,3] Output: [2,3,1] Example 3: Input: root = [] Output: []   Constraints: The number of nodes in the tree is in the range [0, 100]. -100 <= Node.val <= 100
<a href="https://leetcode.com/problems/invert-binary-tree/" target="_blank">https://leetcode.com/problems/invert-binary-tree/</a>`,
            keywords: ["BT"],
            code: `        # can be traverse/divide
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
                if root is None:
                    return root
                left = self.invertTree(root.left)
                right = self.invertTree(root.right)
                root.left = right
                root.right = left
                return root`,
            language: "python"
        },
        {
            id: 227,
            title: "Basic Calculator II",
            description: `Given a string s which represents an expression, evaluate this expression and return its value.  The integer division should truncate toward zero. You may assume that the given expression is always valid. All intermediate results will be in the range of [-231, 231 - 1]. Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().   Example 1: Input: s = \"3+2*2\" Output: 7 Example 2: Input: s = \" 3/2 \" Output: 1 Example 3: Input: s = \" 3+5 / 2 \" Output: 5   Constraints: 1 <= s.length <= 3 * 105 s consists of integers and operators ('+', '-', '*', '/') separated by some number of spaces. s represents a valid expression. All the integers in the expression are non-negative integers in the range [0, 231 - 1]. The answer is guaranteed to fit in a 32-bit integer.
<a href="https://leetcode.com/problems/basic-calculator-ii/description/" target="_blank">https://leetcode.com/problems/basic-calculator-ii/description/</a>`,
            keywords: ["Calculator"],
            code: `        class Solution:
            def calculate(self, s: str) -> int:
                # index beforehand
                self.brakets = {} # (: index
                st = []
                for i in range(len(s)):
                    if s[i] == "(":
                        st.append(i)
                    elif s[i] == ")":
                        index = st.pop()
                        self.brakets[index] = i
        
                return self.helper(s, 0, len(s)-1)
        
            def helper(self, s, lo, hi):
                st = []
                num = 0
                op = "+"
        
                i = lo
                while i <= hi:
                    c = s[i]
        
                    if c.isalnum():
                        num = num * 10 + int(c)
                    
                    elif c == "(":
                        # find right )
                        j = self.brakets[i]
                        # recursion
                        num = self.helper(s, i + 1, j - 1)
                        # to stride
                        # don't + 1 here for the following i == hi check
                        i = j
        
                    if c in "+-*/" or i == hi:
                        # for the following should compare op not c
                        if op == '+':
                            # put sign earlier, instead of judge during sum
                            st.append(num)
                            num = 0
                        elif op == '-':
                            # put sign earlier, instead of judge during sum
                            st.append(-num)
                            num = 0
                        elif op == '*':
                            # put sign earlier, instead of judge during sum
                            opA = st.pop()
                            st.append(opA * num)
                        elif op == '/':
                            # put sign earlier, instead of judge during sum
                            opA = st.pop()
                            st.append(int(opA / num)) # goes to 0, // not
                        num = 0
                        op = c
                    
                    i += 1
                    
                return sum(st)
        `,
            language: "python"
        },
        {
            id: 230,
            title: "Kth Smallest Element in a BST",
            description: `Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.   Example 1: Input: root = [3,1,4,null,2], k = 1 Output: 1 Example 2: Input: root = [5,3,6,2,4,null,null,1], k = 3 Output: 3   Constraints: The number of nodes in the tree is n. 1 <= k <= n <= 104 0 <= Node.val <= 104   Follow up: If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?
<a href="https://leetcode.com/problems/kth-smallest-element-in-a-bst/" target="_blank">https://leetcode.com/problems/kth-smallest-element-in-a-bst/</a>`,
            keywords: ["BST"],
            code: `        # Should keep a size field, so that know the rank easily
        # global rank
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
                self.res = -1
                self.rank = 0
                self.k = k
                self.traverse(root)
                return self.res
        
            def traverse(self, node):
                if node is None:
                    return
        
                self.traverse(node.left)
                self.rank += 1
                if self.rank == self.k:
                    self.res = node.val
                    return
                self.traverse(node.right)
        
        
        # class Solution:
        #     def __init__(self):
        #         # 记录结果
        #         self.res = 0
        #         # 记录当前元素的排名
        #         self.rank = 0
        
        #     def kthSmallest(self, root: TreeNode, k: int) -> int:
        #         # 利用 BST 的中序遍历特性
        #         self.traverse(root, k)
        #         return self.res
        
        #     def traverse(self, root, k):
        #         if not root:
        #             return
        #         self.traverse(root.left, k)
        
        #         # 中序代码位置
        #         self.rank += 1
        #         if k == self.rank:
        #             # 找到第 k 小的元素
        #             self.res = root.val
        #             return
        
        #         self.traverse(root.right, k)`,
            language: "python"
        },
        {
            id: 231,
            title: "Power of Two",
            description: `Given an integer n, return true if it is a power of two. Otherwise, return false. An integer n is a power of two, if there exists an integer x such that n == 2x.   Example 1: Input: n = 1 Output: true Explanation: 20 = 1 Example 2: Input: n = 16 Output: true Explanation: 24 = 16 Example 3: Input: n = 3 Output: false   Constraints: -231 <= n <= 231 - 1   Follow up: Could you solve it without loops/recursion?
<a href="https://leetcode.com/problems/power-of-two/description/" target="_blank">https://leetcode.com/problems/power-of-two/description/</a>`,
            keywords: ["Math"],
            code: `        # pow of 2, gcd, lcm
        
        class Solution:
            def isPowerOfTwo(self, n: int) -> bool:
        
        
        # // 计算 (a ^ b) % k
        # make it serverl 2^an
        # every time res * a is encounter 1 after serveral 0, e.g. 1000
        # but remember every bit should have a*a
        # e.g. 10001000
        # is 10000000 + 1000
        # long quickPow(long a, long b, long k) {
        #     long res = 1;
        #     // 防止 a 大于 k
        #     a %= k;
        #     while (b > 0) {
        #         // 判断奇数，等价于 b % 2 == 1
        #         if ((b & 1) == 1) {
        #             res = (res * a) % k;
        #         }
        #         a = (a * a) % k;
        #         // 右移一位，相当于除以 2
        #         b >>= 1;
        #     }
        #     return res;
        # }
        
        # GCD
        # gcd(48, 18)
        # = gcd(18, 48 % 18)
        # = gcd(18, 12)
        # = gcd(12, 18 % 12)
        # = gcd(12, 6)
        # = gcd(6, 12 % 6)
        # = gcd(6, 0)
        # = 6
        
        # LCM
        # int lcm(int a, int b) {
        #     // 先除后乘，防止溢出
        #     return (a / gcd(a, b)) * b;
        # }`,
            language: "python"
        },
        {
            id: 232,
            title: "Implement Queue using Stacks",
            description: `Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty). Implement the MyQueue class: void push(int x) Pushes element x to the back of the queue. int pop() Removes the element from the front of the queue and returns it. int peek() Returns the element at the front of the queue. boolean empty() Returns true if the queue is empty, false otherwise. Notes: You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid. Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.   Example 1: Input ["MyQueue", "push", "push", "peek", "pop", "empty"] [[], [1], [2], [], [], []] Output [null, null, null, 1, 1, false] Explanation MyQueue myQueue = new MyQueue(); myQueue.push(1); // queue is: [1] myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue) myQueue.peek(); // return 1 myQueue.pop(); // return 1, queue is [2] myQueue.empty(); // return false   Constraints: 1 <= x <= 9 At most 100 calls will be made to push, pop, peek, and empty. All the calls to pop and peek are valid.   Follow-up: Can you implement the queue such that each operation is amortized O(1) time complexity? In other words, performing n operations will take overall O(n) time even if one of those operations may take longer.
<a href="https://leetcode.com/problems/implement-queue-using-stacks/" target="_blank">https://leetcode.com/problems/implement-queue-using-stacks/</a>`,
            keywords: ["Stack", "Queue"],
            code: `        # 2 stacks
        # pop: peek then pop
        # peek: move s1 to s2 if s2 is empty
        
        class MyQueue:
        
            def __init__(self):
                self.s1 = []
                self.s2 = []
        
            def push(self, x: int) -> None:
                self.s1.append(x)
        
            def pop(self) -> int:
                self.peek()
                return self.s2.pop()
        
            def peek(self) -> int:
                if self.s2:
                    return self.s2[-1]
                while self.s1:
                    self.s2.append(self.s1.pop())
                return self.s2[-1]
        
            def empty(self) -> bool:
                return len(self.s1) == 0 and len(self.s2) == 0
                
        
        
        # Your MyQueue object will be instantiated and called as such:
        # obj = MyQueue()
        # obj.push(x)
        # param_2 = obj.pop()
        # param_3 = obj.peek()
        # param_4 = obj.empty()`,
            language: "python"
        },
        {
            id: 234,
            title: "Palindrome Linked List",
            description: `Given the head of a singly linked list, return true if it is a palindrome or false otherwise.   Example 1: Input: head = [1,2,2,1] Output: true Example 2: Input: head = [1,2] Output: false   Constraints: The number of nodes in the list is in the range [1, 105]. 0 <= Node.val <= 9   Follow up: Could you do it in O(n) time and O(1) space?
<a href="https://leetcode.com/problems/palindrome-linked-list/" target="_blank">https://leetcode.com/problems/palindrome-linked-list/</a>`,
            keywords: ["Palindrome", "LinkedList"],
            code: `        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, val=0, next=None):
        #         self.val = val
        #         self.next = next
        
        # can use recursion, but still O(N) space
        #   start from the deepest step of recursion, self.left.next. return self.res
        # O(1) space
        #   first find mid, NOTE: careful odd/even fast
        #   then reverse
        #   at last compare
        #   NOTE: restore the reversed list: 
        
        
        class Solution:
            left = None
            res = True
            def backwardIsPalindrome(self, right):
                if right is None:
                    return
                self.backwardIsPalindrome(right.next)
                if self.left.val != right.val:
                    self.res = False
                self.left = self.left.next
        
            # recursion method
            def isPalindrome1(self, head: Optional[ListNode]) -> bool:
                self.left = head
                self.backwardIsPalindrome(head)
                return self.res
            
            def reverse(self, p):
                if p is None or p.next is None:
                    return p
                
                prev, cur, nxt = None, p, p.next
                while nxt:
                    cur.next = prev
                    prev = cur
                    cur = nxt
                    if nxt:
                        nxt = nxt.next
                cur.next = prev
                return cur
        
            # find-mid-reverse method
            def isPalindrome(self, head: Optional[ListNode]) -> bool:
                fast = head
                slow = head
                while fast and fast.next:
                    fast = fast.next.next
                    slow = slow.next
        
                if fast:
                    slow = slow.next
        
                right = self.reverse(slow)
        
                left = head
                res = True
                while left and right:
                    if left.val != right.val:
                        res = False
                    left = left.next
                    right = right.next
                
                return res
        `,
            language: "python"
        },
        {
            id: 235,
            title: "Lowest Common Ancestor of a Binary Search Tree",
            description: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST. According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”   Example 1: Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8 Output: 6 Explanation: The LCA of nodes 2 and 8 is 6. Example 2: Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4 Output: 2 Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition. Example 3: Input: root = [2,1], p = 2, q = 1 Output: 2   Constraints: The number of nodes in the tree is in the range [2, 105]. -109 <= Node.val <= 109 All Node.val are unique. p != q p and q will exist in the BST.
<a href="https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" target="_blank">https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/</a>`,
            keywords: ["BST", "LCA"],
            code: `        # only navigate if out of range
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, x):
        #         self.val = x
        #         self.left = None
        #         self.right = None
        
        class Solution:
            def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
                v1 = min(p.val, q.val)
                v2 = max(p.val, q.val)
                return self.find(root, v1, v2)
        
            def find(self, node, val1, val2):
                # case 0
                if node is None:
                    return None
                
                # case 1: lca is p or q
                # if node.val == val1 or node.val == val2:
                #     return node
        
                if node.val < val1: # too small
                    return self.find(node.right, val1, val2)
                if node.val > val2: # too large
                    return self.find(node.left, val1, val2)
        
                # # case 2: lca
                # if left and right:
                #     return node
                
                # # case 3: partial result
                # if left:
                #     return left
                # if right:
                #     return right
        
                # this is the answer 
                return node
        
        # class Solution:
        #     def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        #         # 保证 val1 较小，val2 较大
        #         val1 = min(p.val, q.val)
        #         val2 = max(p.val, q.val)
        #         return self.find(root, val1, val2)
        
        #     # 在 BST 中寻找 val1 和 val2 的最近公共祖先节点
        #     def find(self, root: 'TreeNode', val1: int, val2: int) -> 'TreeNode':
        #         if root is None:
        #             return None
        #         if root.val > val2:
        #             # 当前节点太大，去左子树找
        #             return self.find(root.left, val1, val2)
        #         if root.val < val1:
        #             # 当前节点太小，去右子树找
        #             return self.find(root.right, val1, val2)
        #         # val1 <= root.val <= val2
        #         # 则当前节点就是最近公共祖先
        #         return root`,
            language: "python"
        },
        {
            id: 236,
            title: "Lowest Common Ancestor of a Binary Tree",
            description: `Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree. According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”   Example 1: Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1 Output: 3 Explanation: The LCA of nodes 5 and 1 is 3. Example 2: Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4 Output: 5 Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition. Example 3: Input: root = [1,2], p = 1, q = 2 Output: 1   Constraints: The number of nodes in the tree is in the range [2, 105]. -109 <= Node.val <= 109 All Node.val are unique. p != q p and q will exist in the tree.
<a href="https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/" target="_blank">https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/</a>`,
            keywords: ["BT", "LCA"],
            code: `        # just more checking nodes
        # 需要注意的是，这两道题的题目都明确告诉我们这些节点必定存在于二叉树中，如果没有这个前提条件，就需要修改代码了。
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, x):
        #         self.val = x
        #         self.left = None
        #         self.right = None
        
        class Solution:
            def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
                return self.find(root, p.val, q.val)
        
            def find(self, node, val1, val2):
                # case 0
                if node is None:
                    return None
                
                # case 1: lca is p or q
                if node.val == val1 or node.val == val2:
                    return node
        
                left = self.find(node.left, val1, val2)
                right = self.find(node.right, val1, val2)
        
                # case 2: lca
                if left and right:
                    return node
                
                # case 3: partial result
                if left:
                    return left
                if right:
                    return right
        
                # case 4: non found
                return None
        
        # class Solution:
        #     def __init__(self):
        #         # 用一个外部变量来记录是否已经找到 LCA 节点
        #         self.lca = None # [!code ++]
        
        #     def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        #         return self.find(root, p.val, q.val)
        
        #     def find(self, root: 'TreeNode', val1: int, val2: int) -> 'TreeNode':
        #         if root is None:
        #             return None
        #         # 如果已经找到 LCA 节点，直接返回
        #         # [!code ++:4]
        #         if self.lca is not None:
        #             return None
        
        #         if root.val == val1 or root.val == val2:
        #             return root
        #         left = self.find(root.left, val1, val2)
        #         right = self.find(root.right, val1, val2)
        #         if left is not None and right is not None:
        #             # 当前节点是 LCA 节点，记录下来
        #             self.lca = root # [!code ++]
        #             return root
                
        #         return left if left is not None else right
        
        # 1676
        # 需要注意的是，这两道题的题目都明确告诉我们这些节点必定存在于二叉树中，如果没有这个前提条件，就需要修改代码了。
        # class Solution:
        #     def lowestCommonAncestor(self, root: 'TreeNode', nodes: 'List[TreeNode]') -> 'TreeNode':
        #         # 将列表转化成哈希集合，便于判断元素是否存在
        #         values = set()
        #         for node in nodes:
        #             values.add(node.val)
                
        #         return self.find(root, values)
            
        #     def find(self, root: 'TreeNode', values: 'set') -> 'TreeNode':
        #         if root is None:
        #             return None
        #         # 前序位置
        #         if root.val in values:
        #             return root
        
        #         left = self.find(root.left, values)
        #         right = self.find(root.right, values)
        #         # 后序位置，已经知道左右子树是否存在目标值
        #         if left is not None and right is not None:
        #             # 当前节点是 LCA 节点
        #             return root
                
        #         return left if left is not None else right
        
        # 1644
        # not know whether pq exists.
        # 这样改造，对二叉树进行完全搜索，同时记录 p 和 q 是否同时存在树中，从而满足题目的要求。
        
        # class Solution:
        #     def __init__(self):
        #         # 用于记录 p 和 q 是否存在于二叉树中
        #         self.foundP = False
        #         self.foundQ = False
        
        #     def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
        #         res = self.find(root, p.val, q.val)
        #         if not self.foundP or not self.foundQ:
        #             return None
        #         # p 和 q 都存在二叉树中，才有公共祖先
        #         return res
                
        #     # 在二叉树中寻找 val1 和 val2 的最近公共祖先节点
        #     def find(self, root, val1, val2):
        #         if not root:
        #             return None
        #         left = self.find(root.left, val1, val2)
        #         right = self.find(root.right, val1, val2)
                
        #         # 后序位置，判断当前节点是不是 LCA 节点
        #         if left and right:
        #             return root
                
        #         # 后序位置，判断当前节点是不是目标值
        #         if root.val == val1 or root.val == val2:
        #             # 找到了，记录一下
        #             if root.val == val1:
        #                 self.foundP = True
        #             if root.val == val2:
        #                 self.foundQ = True
        #             return root
        
        #         return left if left else right
        
        # 1650
        # no root give, but each node has parent pointer, find lca
        # its just intercept linked list
        # class Solution:
        #     # 施展链表双指针技巧
        #     def lowestCommonAncestor(self, p: 'Node', q: 'Node') -> 'Node':
        #         a, b = p, q
        #         while a != b:
        #             # a 走一步，如果走到根节点，转到 q 节点
        #             if a is None:
        #                 a = q
        #             else:
        #                 a = a.parent
        #             # b 走一步，如果走到根节点，转到 p 节点
        #             if b is None:
        #                 b = p
        #             else:
        #                 b = b.parent
        #         return a`,
            language: "python"
        },
        {
            id: 239,
            title: "Sliding Window Maximum",
            description: `You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.   Example 1: Input: nums = [1,3,-1,-3,5,3,6,7], k = 3 Output: [3,3,5,5,6,7] Explanation: Window position Max --------------- ----- [1 3 -1] -3 5 3 6 7 3 1 [3 -1 -3] 5 3 6 7 3 1 3 [-1 -3 5] 3 6 7 5 1 3 -1 [-3 5 3] 6 7 5 1 3 -1 -3 [5 3 6] 7 6 1 3 -1 -3 5 [3 6 7] 7 Example 2: Input: nums = [1], k = 1 Output: [1]   Constraints: 1 <= nums.length <= 105 -104 <= nums[i] <= 104 1 <= k <= nums.length
<a href="https://leetcode.com/problems/sliding-window-maximum/" target="_blank">https://leetcode.com/problems/sliding-window-maximum/</a>`,
            keywords: ["MonotonicQueue", "SlidingWindow"],
            code: `        # Monotonic Queue 和heap的区别：新的队列结构，既能够维护队列元素「先进先出」的时间顺序，又能够正确维护队列中所有元素的最值，这就是「单调队列」结构。
        # 这种情况下双指针滑动窗口解决不了
        
        
        # just save maxq can solve the question
        # make the size k-1, to record all n-k results.
        # don’t keep equals
        
        from collections import deque
        class Solution:
            def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
                maxq = deque()
                n = len(nums)
                res = []
                for i in range(n):
                    if i < k - 1:
                        # append
                        while maxq and maxq[-1] < nums[i]:
                            maxq.pop()
                        maxq.append(nums[i])
                    else:
                        # append, remove equals
                        while maxq and maxq[-1] < nums[i]:
                            maxq.pop()
                        maxq.append(nums[i])
                        # max (size == k)
                        res.append(maxq[0])
                        # popleft (size == k - 1). To be easy, pop only maxq
                        if nums[i-k+1] == maxq[0]:
                            maxq.popleft()
                        
                return res
        
        # class MonotonicQueue:
        #     def __init__(self):
        #         self.maxq = []
            
        #     def push(self, n):
        #         # 将小于 n 的元素全部删除
        #         while self.maxq and self.maxq[-1] < n: # <extend up -100>![](/images/algo/monotonic-queue/3.png) #
        #             self.maxq.pop()
        #         # 然后将 n 加入尾部
        #         self.maxq.append(n)
            
        #     def max(self):
        #         return self.maxq[0]
            
        #     def pop(self, n):
        #         if n == self.maxq[0]:
        #             self.maxq.pop(0)
        
        # class Solution(object):
        #     def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        #         window = MonotonicQueue()
        #         res = []
                
        #         for i in range(len(nums)):
        #             if i < k - 1:
        #                 # 先填满窗口的前 k - 1
        #                 window.push(nums[i])
        #             else: # <extend up -100>![](/images/algo/monotonic-queue/1.png) #
        #                 # 窗口向前滑动，加入新数字
        #                 window.push(nums[i])
        #                 # 记录当前窗口的最大值
        #                 res.append(window.max())
        #                 # 移出旧数字
        #                 window.pop(nums[i - k + 1])
        #         return res
        
        
        # 单调队列的通用实现，可以高效维护最大值和最小值
        class MonotonicQueue:
            def push(self, elem: 'Comparable') -> None:
                self.maxq
                self.q
            
            # 标准队列 API，从队头弹出元素，符合先进先出的顺序
            def pop(self) -> 'Comparable':
                pass
            
            # 标准队列 API，返回队列中的元素个数
            def size(self) -> int:
                pass
            
            # 单调队列特有 API，O(1) 时间计算队列中元素的最大值
            def max(self) -> 'Comparable':
                pass
            
            # 单调队列特有 API，O(1) 时间计算队列中元素的最小值
            def min(self) -> 'Comparable':
                pass`,
            language: "python"
        },
        {
            id: 253,
            title: "会议室 II",
            description: `给你输入若干形如 [begin, end] 的区间，代表若干会议的开始时间和结束时间，请你计算至少需要申请多少间会议室。
<a href="https://leetcode.com/problems/meeting-rooms-ii/" target="_blank">https://leetcode.com/problems/meeting-rooms-ii/</a>`,
            keywords: ["Range"],
            code: `        # sol1: diff arr, first all 0s, then range + 1. 
        # but may need too large arr for large range
        # sol2: optimize diff arr, just simulate how you scan diff arr: start -> cnt +1, end -> cnt -1, record max
        
        class Solution:
            def minMeetingRooms(self, meetings: List[List[int]]) -> int:
                n = len(meetings)
                begin = [0] * n
                end = [0] * n
                for i in range(n):
                    begin[i] = meetings[i][0]
                    end[i] = meetings[i][1]
                begin.sort()
                end.sort()
        
                # 扫描过程中的计数器
                count = 0
                # 双指针技巧
                res, i, j = 0, 0, 0
                while i < n and j < n:
                    if begin[i] < end[j]:
                        # 扫描到一个红点
                        count += 1
                        i += 1
                    else:
                        # 扫描到一个绿点
                        count -= 1
                        j += 1
                    # 记录扫描过程中的最大值
                    res = max(res, count)
                
                return res`,
            language: "python"
        },
        {
            id: 257,
            title: "Binary Tree Paths",
            description: `Given the root of a binary tree, return all root-to-leaf paths in any order. A leaf is a node with no children.   Example 1: Input: root = [1,2,3,null,5] Output: ["1->2->5","1->3"] Example 2: Input: root = [1] Output: ["1"]   Constraints: The number of nodes in the tree is in the range [1, 100]. -100 <= Node.val <= 100
<a href="https://leetcode.com/problems/binary-tree-paths/" target="_blank">https://leetcode.com/problems/binary-tree-paths/</a>`,
            keywords: ["BT", "BTTraverse"],
            code: `        # Because stop at leaf node, we need a condition
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
        
            def binaryTreePaths(self, root: Optional[TreeNode]) -> List[str]:
                self.path = []
                self.paths = [] # path will convert to string
                self.traverse(root)
                return self.paths
        
            def traverse(self, node):
                if node is None:
                    return
                
                self.path.append(str(node.val))
        
                # Because stop at leaf node, we need a condition
                if node.left is None and node.right is None:
                    self.paths.append("->".join(self.path))
                    self.path.pop()
                    return
        
                self.traverse(node.left)
                self.traverse(node.right)
        
                self.path.pop()
                
        
        # class Solution:
        #     def binaryTreePaths(self, root: TreeNode) -> List[str]:
        #         # 遍历一遍二叉树就能出结果了
        #         self.traverse(root)
        #         return self.res
        
        #     def __init__(self):
        #         # 记录 traverse 函数递归时的路径
        #         self.path = []
        #         # 记录所有从根节点到叶子节点的路径
        #         self.res = []
        
        #     def traverse(self, root: TreeNode):
        #         if root is None:
        #             return
        #         # root 是叶子节点
        #         if root.left is None and root.right is None:
        #             self.path.append(str(root.val))
        #             # 将这条路径装入 res
        #             self.res.append("->".join(self.path))
        #             self.path.pop()
        #             return
        #         # 前序遍历位置
        #         self.path.append(str(root.val))
        #         # 递归遍历左右子树
        #         self.traverse(root.left)
        #         self.traverse(root.right)
        #         # 后序遍历位置
        #         self.path.pop()`,
            language: "python"
        },
        {
            id: 261,
            title: "以图判树",
            description: `给你输入编号从 0 到 n - 1 的 n 个结点，和一个无向边列表 edges（每条边用节点二元组表示），请你判断输入的这些边组成的结构是否是一棵树。

<a href="https://leetcode.com/problems/graph-valid-tree/" target="_blank">https://leetcode.com/problems/graph-valid-tree/</a>`,
            keywords: ["Graph", "MST"],
            code: `        # 对于添加的这条边，如果该边的两个节点本来就在同一连通分量里，那么添加这条边会产生环；反之，如果该边的两个节点不在同一连通分量里，则添加这条边不会产生环。
        
        from typing import List
        
        class Solution:
            # 初始化 0...n-1 共 n 个节点
            def validTree(self, n: int, edges: List[List[int]]) -> bool:
                uf = self.UF(n)
                # 遍历所有边，将组成边的两个节点进行连接
                for edge in edges:
                    u = edge[0]
                    v = edge[1]
                    # 若两个节点已经在同一连通分量中，会产生环
                    if uf.connected(u, v):
                        return False
                    # 这条边不会产生环，可以是树的一部分
                    uf.union(u, v)
                # 要保证最后只形成了一棵树，即只有一个连通分量
                return uf.get_count() == 1
        
            class UF:
                # 连通分量个数
                def __init__(self, n: int):
                    self.count = n
                    # 存储一棵树
                    self.parent = [i for i in range(n)]
                    # 记录树的「重量」
                    self.size = [1] * n
                    # n 为图中节点的个数
        
                # 将节点 p 和节点 q 连通
                def union(self, p: int, q: int):
                    rootP = self.find(p)
                    rootQ = self.find(q)
                    if rootP == rootQ:
                        return
        
                    # 小树接到大树下面，较平衡
                    if self.size[rootP] > self.size[rootQ]:
                        self.parent[rootQ] = rootP
                        self.size[rootP] += self.size[rootQ]
                    else:
                        self.parent[rootP] = rootQ
                        self.size[rootQ] += self.size[rootP]
                    # 两个连通分量合并成一个连通分量
                    self.count -= 1
        
                # 判断节点 p 和节点 q 是否连通
                def connected(self, p: int, q: int) -> bool:
                    return self.find(p) == self.find(q)
        
                # 返回节点 x 的连通分量根节点
                def find(self, x: int) -> int:
                    while self.parent[x] != x:
                        # 进行路径压缩
                        self.parent[x] = self.parent[self.parent[x]]
                        x = self.parent[x]
                    return x
        
                # 返回图中的连通分量个数
                def get_count(self) -> int:
                    return self.count`,
            language: "python"
        },
        {
            id: 263,
            title: "Ugly Number",
            description: `An ugly number is a positive integer which does not have a prime factor other than 2, 3, and 5. Given an integer n, return true if n is an ugly number.   Example 1: Input: n = 6 Output: true Explanation: 6 = 2 × 3 Example 2: Input: n = 1 Output: true Explanation: 1 has no prime factors. Example 3: Input: n = 14 Output: false Explanation: 14 is not ugly since it includes the prime factor 7.   Constraints: -231 <= n <= 231 - 1
<a href="https://leetcode.com/problems/ugly-number/" target="_blank">https://leetcode.com/problems/ugly-number/</a>`,
            keywords: ["Math", "UglyNumber"],
            code: `        class Solution:
            def isUgly(self, n: int) -> bool:
                if n <= 0:
                    return False
                # 如果 n 是丑数，分解因子应该只有 2, 3, 5
                while n % 2 == 0:
                    n //= 2
                while n % 3 == 0:
                    n //= 3
                while n % 5 == 0:
                    n //= 5
                # 如果能够成功分解，说明是丑数
                return n == 1`,
            language: "python"
        },
        {
            id: 264,
            title: "Ugly Number II",
            description: `An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5. Given an integer n, return the nth ugly number.   Example 1: Input: n = 10 Output: 12 Explanation: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers. Example 2: Input: n = 1 Output: 1 Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.   Constraints: 1 <= n <= 1690
<a href="https://leetcode.com/problems/ugly-number-ii/" target="_blank">https://leetcode.com/problems/ugly-number-ii/</a>`,
            keywords: ["Math", "UglyNumber"],
            code: `        # merge linked list
        
        class Solution:
            def nthUglyNumber(self, n: int) -> int:
                
                # ugly: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, ...
                i2, i3, i5 = 0, 0, 0 # index in ugly
                p2, p3, p5 = 1, 1, 1 # p2: 1, 2*1, 2*2, 2*3, 2*4, 2*5, 2*6, 2*8, ...
        
                index = 0
        
                ugly = [0] * n
        
                while index < n:
                    cur = min(p2, p3, p5)
                    ugly[index] = cur
                    # any kind of repeat is eliminated because we don't have elif
                    if cur == p2:
                        p2 = ugly[i2] * 2 # move to next
                        i2 += 1
                    if cur == p3:
                        p3 = ugly[i3] * 3 # move to next
                        i3 += 1
                    if cur == p5:
                        p5 = ugly[i5] * 5 # move to next
                        i5 += 1
                    index += 1
                return ugly[-1]
        # class Solution:
        #     def nthUglyNumber(self, n: int) -> int:
        #         # 可以理解为三个指向有序链表头结点的指针
        #         p2, p3, p5 = 1, 1, 1
        #         # 可以理解为三个有序链表的头节点的值
        #         product2, product3, product5 = 1, 1, 1
        #         # 可以理解为最终合并的有序链表（结果链表）
        #         ugly = [0] * (n + 1)
        #         # 可以理解为结果链表上的指针
        #         p = 1
        
        #         # 开始合并三个有序链表
        #         while p <= n:
        #             # 取三个链表的最小结点
        #             min_val = min(product2, product3, product5)
        #             # 接到结果链表上
        #             ugly[p] = min_val
        #             p += 1
        #             # 前进对应有序链表上的指针
        #             if min_val == product2:
        #                 product2 = 2 * ugly[p2]
        #                 p2 += 1
        #             if min_val == product3:
        #                 product3 = 3 * ugly[p3]
        #                 p3 += 1
        #             if min_val == product5:
        #                 product5 = 5 * ugly[p5]
        #                 p5 += 1
                
        #         # 返回第 n 个丑数
        #         return ugly[n]  `,
            language: "python"
        },
        {
            id: 283,
            title: "Move Zeroes",
            description: `Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements. Note that you must do this in-place without making a copy of the array.   Example 1: Input: nums = [0,1,0,3,12] Output: [1,3,12,0,0] Example 2: Input: nums = [0] Output: [0]   Constraints: 1 <= nums.length <= 104 -231 <= nums[i] <= 231 - 1   Follow up: Could you minimize the total number of operations done?
<a href="https://leetcode.com/problems/move-zeroes/description/" target="_blank">https://leetcode.com/problems/move-zeroes/description/</a>`,
            keywords: ["Array", "2ptr"],
            code: `        # one more loop to fill 0s
        
        class Solution:
            def moveZeroes(self, nums: List[int]) -> None:
                """
                Do not return anything, modify nums in-place instead.
                """
                slow = 0
                fast = 0
                while fast < len(nums):
                    if nums[fast] != 0:
                        nums[slow] = nums[fast]
                        slow += 1
                    fast += 1
                while slow < len(nums):
                    nums[slow] = 0
                    slow += 1`,
            language: "python"
        },
        {
            id: 284,
            title: "Peeking Iterator",
            description: `Design an iterator that supports the peek operation on an existing iterator in addition to the hasNext and the next operations. Implement the PeekingIterator class: PeekingIterator(Iterator<int> nums) Initializes the object with the given integer iterator iterator. int next() Returns the next element in the array and moves the pointer to the next element. boolean hasNext() Returns true if there are still elements in the array. int peek() Returns the next element in the array without moving the pointer. Note: Each language may have a different implementation of the constructor and Iterator, but they all support the int next() and boolean hasNext() functions.   Example 1: Input ["PeekingIterator", "next", "peek", "next", "next", "hasNext"] [[[1, 2, 3]], [], [], [], [], []] Output [null, 1, 2, 2, 3, false] Explanation PeekingIterator peekingIterator = new PeekingIterator([1, 2, 3]); // [1,2,3] peekingIterator.next(); // return 1, the pointer moves to the next element [1,2,3]. peekingIterator.peek(); // return 2, the pointer does not move [1,2,3]. peekingIterator.next(); // return 2, the pointer moves to the next element [1,2,3] peekingIterator.next(); // return 3, the pointer moves to the next element [1,2,3] peekingIterator.hasNext(); // return False   Constraints: 1 <= nums.length <= 1000 1 <= nums[i] <= 1000 All the calls to next and peek are valid. At most 1000 calls will be made to next, hasNext, and peek.   Follow up: How would you extend your design to be generic and work with all types, not just integer?
<a href="https://leetcode.com/problems/peeking-iterator/" target="_blank">https://leetcode.com/problems/peeking-iterator/</a>`,
            keywords: ["Design"],
            code: `        # save a next result in advance
        
        # Below is the interface for Iterator, which is already defined for you.
        #
        # class Iterator:
        #     def __init__(self, nums):
        #         """
        #         Initializes an iterator object to the beginning of a list.
        #         :type nums: List[int]
        #         """
        #
        #     def hasNext(self):
        #         """
        #         Returns true if the iteration has more elements.
        #         :rtype: bool
        #         """
        #
        #     def next(self):
        #         """
        #         Returns the next element in the iteration.
        #         :rtype: int
        #         """
        
        class PeekingIterator:
            def __init__(self, iterator):
                """
                Initialize your data structure here.
                :type iterator: Iterator
                """
                self.iter = iterator
                self.peekNext = iterator.next() if iterator.hasNext() else 0 # can be None
        
            def peek(self):
                """
                Returns the next element in the iteration without advancing the iterator.
                :rtype: int
                """
                return self.peekNext
        
            def next(self):
                """
                :rtype: int
                """
                val = self.peekNext
                if self.iter.hasNext():
                    self.peekNext = self.iter.next()
                else:
                    self.peekNext = 0
                return val
        
            def hasNext(self):
                """
                :rtype: bool
                """
                return self.peekNext != 0
                
        
        # Your PeekingIterator object will be instantiated and called as such:
        # iter = PeekingIterator(Iterator(nums))
        # while iter.hasNext():
        #     val = iter.peek()   # Get the next element but not advance the iterator.
        #     iter.next()         # Should return the same value as [val].
        
        # class PeekingIterator:
        #     def __init__(self, iterator):
        #         self.iter = iterator
        # 		# 把迭代器的下一个元素提前拿出来并缓存起来
        #         self.nextElem = iterator.next()
        
        #     def peek(self):
        #         return self.nextElem
        
        #     def next(self):
        #         res = self.nextElem
        # 		# 更新 nextElem
        #         if self.iter.hasNext():
        #             self.nextElem = self.iter.next()
        #         else:
        #             self.nextElem = None
        #         return res
        	
        #     def hasNext(self):
        # 	    return self.nextElem is not None`,
            language: "python"
        },
        {
            id: 292,
            title: "Nim Game",
            description: `You are playing the following Nim Game with your friend: Initially, there is a heap of stones on the table. You and your friend will alternate taking turns, and you go first. On each turn, the person whose turn it is will remove 1 to 3 stones from the heap. The one who removes the last stone is the winner. Given n, the number of stones in the heap, return true if you can win the game assuming both you and your friend play optimally, otherwise return false.   Example 1: Input: n = 4 Output: false Explanation: These are the possible outcomes: 1. You remove 1 stone. Your friend removes 3 stones, including the last stone. Your friend wins. 2. You remove 2 stones. Your friend removes 2 stones, including the last stone. Your friend wins. 3. You remove 3 stones. Your friend removes the last stone. Your friend wins. In all outcomes, your friend wins. Example 2: Input: n = 1 Output: true Example 3: Input: n = 2 Output: true   Constraints: 1 <= n <= 231 - 1`,
            keywords: ["Math"],
            code: `        class Solution:
            def canWinNim(self, n: int) -> bool:
                return n % 4 != 0`,
            language: "python"
        },
        {
            id: 297,
            title: "Serialize and Deserialize Binary Tree",
            description: `Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment. Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure. Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.   Example 1: Input: root = [1,2,3,null,null,4,5] Output: [1,2,3,null,null,4,5] Example 2: Input: root = [] Output: []   Constraints: The number of nodes in the tree is in the range [0, 104]. -1000 <= Node.val <= 1000
<a href="https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" target="_blank">https://leetcode.com/problems/serialize-and-deserialize-binary-tree/</a>`,
            keywords: ["BT", "BTSerialization"],
            code: `        # 说了这么多，总结下结论，当二叉树中节点的值不存在重复时：
        # 1. 如果你的序列化结果中不包含空指针的信息，且你只给出一种遍历顺序，那么你无法还原出唯一的一棵二叉树。
        # 2. 如果你的序列化结果中不包含空指针的信息，且你会给出两种遍历顺序，分两种情况：
        #   2.1. 如果你给出的是前序和中序，或者后序和中序，那么你可以还原出唯一的一棵二叉树。
        #   2.2. 如果你给出前序和后序，那么你无法还原出唯一的一棵二叉树。
        # 3. 如果你的序列化结果中包含空指针的信息，且你只给出一种遍历顺序，也要分两种情况：
        #   3.1. 如果你给出的是前序或者后序，那么你可以还原出唯一的一棵二叉树。
        #   3.2. 如果你给出的是中序，那么你无法还原出唯一的一棵二叉树。例子：# 1 # 1 #
        
        
        # Definition for a binary tree node.
        # class TreeNode(object):
        #     def __init__(self, x):
        #         self.val = x
        #         self.left = None
        #         self.right = None
        
        from collections import deque
        
        class Codec:
            SEP = ","
            NULL = "#"
        
            def serialize(self, root):
                """Encodes a tree to a single string.
                
                :type root: TreeNode
                :rtype: str
                """
                return self.SEP.join(self._serialize(root))
            
            def _serialize(self, node):
                q = deque()
                q.append(node)
                res = []
                while q:
                    cur = q.popleft()
                    if cur is not None:
                        res.append(str(cur.val))
                        q.append(cur.left) # checking None only after popped out
                        q.append(cur.right)
                    else:
                        res.append(self.NULL)
                return res
                    
        
                
        
            def deserialize(self, data):
                """Decodes your encoded data to tree.
                
                :type data: str
                :rtype: TreeNode
                """
                arr = data.split(self.SEP)
                return self._deserialize(arr)
        
            def _deserialize(self, data):
                if not data:
                    return None
        
                n = len(data)
        
                q = deque()
                root = TreeNode(int(data[0])) if data[0] != self.NULL else None
                q.append(root)
                index = 0
        
                while q:
                    cur = q.popleft()
                    index += 1
                    if index < n:
                        left = TreeNode(int(data[index])) if data[index] != self.NULL else None
                        cur.left = left
        
                        if left:
                            q.append(left)
                    index += 1
                    if index < n:
                        right = TreeNode(int(data[index])) if data[index] != self.NULL else None
                        cur.right = right
        
                        if right:
                            q.append(right)
        
                return root
                
        
        # Your Codec object will be instantiated and called as such:
        # ser = Codec()
        # deser = Codec()
        # ans = deser.deserialize(ser.serialize(root))
        
        # Preorder
        # class Codec:
        #     SEP = ","
        #     NULL = "#"
        
        #     # 主函数，将二叉树序列化为字符串
        #     def serialize(self, root):
        #         sb = []
        #         self._serialize(root, sb)
        #         return "".join(sb)
        
        #     # 辅助函数，将二叉树存入 StringBuilder
        #     def _serialize(self, root, sb):
        #         if root is None:
        #             sb.append(self.NULL)
        #             sb.append(self.SEP)
        #             return
        
        #         # ****** 前序位置 ********
        #         sb.append(str(root.val))
        #         sb.append(self.SEP)
        #         # ***********************
        
        #         self._serialize(root.left, sb)
        #         self._serialize(root.right, sb)
            
        #     # 主函数，将字符串反序列化为二叉树结构
        #     def deserialize(self, data: str) -> TreeNode:
        #         # 将字符串转化成列表
        #         nodes = data.split(self.SEP)
        #         return self._deserialize(nodes)
        
        #     # 辅助函数，通过 nodes 列表构造二叉树
        #     def _deserialize(self, nodes: List[str]) -> TreeNode:
        #         if not nodes: return None
        
        #         # ****** 前序位置 *******
        #         # 列表最左侧就是根节点
        #         first = nodes.pop(0)
        #         if first == self.NULL: return None
        #         root = TreeNode(int(first)) 
        #         # *********************
        
        #         root.left = self._deserialize(nodes)
        #         root.right = self._deserialize(nodes)
        
        #         return root
        
        # Postorder
        # class Codec:
        #     SEP = ","
        #     NULL = "#"
        
        #     # 主函数，将二叉树序列化为字符串
        #     def serialize(self, root):
        #         sb = []
        #         self._serialize(root, sb)
        #         return ''.join(sb)
        
        #     def _serialize(self, root, sb):
        #         if root is None:
        #             sb.append(self.NULL)
        #             sb.append(self.SEP)
        #             return
                
        #         self._serialize(root.left, sb)
        #         self._serialize(root.right, sb)
        
        #         # ****** 后序位置 ********
        #         sb.append(str(root.val))
        #         sb.append(self.SEP)
        #         # ***********************
        
        #     # 主函数，将字符串反序列化为二叉树结构
        #     def deserialize(self, data):
        #         # 将分割结果中的空字符串过滤掉
        #         nodes = [x for x in data.split(self.SEP) if x]
        #         return self._deserialize(nodes)
        
        #     # 辅助函数，通过 nodes 列表构造二叉树
        #     def _deserialize(self, nodes):
        #         if nodes == []:
        #             return None
        #         # 从后往前取出元素
        #         last = nodes.pop()
        #         if last == self.NULL or last == "":
        #             return None
        #         root = TreeNode(int(last))
        #         # 先构造右子树，后构造左子树
        #         root.right = self._deserialize(nodes)
        #         root.left = self._deserialize(nodes)
        #         return root
        
        # Inorder
        # # 辅助函数，将二叉树存入 StringBuilder
        # def serialize(root: 'TreeNode', sb: 'List[str]') -> None:
        #     if root == None:
        #         sb.append(NULL)
        #         sb.append(SEP)
        #         return
        
        #     serialize(root.left, sb)
        #     # ******* 中序位置 *******
        #     sb.append(str(root.val))
        #     sb.append(SEP)
        #     # ***********************
        #     serialize(root.right, sb)
        
        # Level-order
        # class Codec:
        #     SEP = ","
        #     NULL = "#"
        
        #     # 将二叉树序列化为字符串
        #     def serialize(self, root):
        #         if root is None:
        #             return ""
        #         # 初始化队列，将 root 加入队列
        #         queue = [root]
        #         res = []
        #         while queue:
        #             sz = len(queue)
        #             for i in range(sz):
        #                 cur = queue.pop(0)
        
        #                 # 层级遍历代码位置
        #                 if cur is None:
        #                     res.append(self.NULL)
        #                     res.append(self.SEP)
        #                     continue
        #                 res.append(str(cur.val))
        #                 res.append(self.SEP)
        #                 # ***************
        
        #                 queue.append(cur.left)
        #                 queue.append(cur.right)
        
        #         return Codec.SEP.join(res)
        
        #     # 将字符串反序列化为二叉树结构
        #     def deserialize(self, data: str):
        #         if data == "":
        #             return None
        #         # 将分割结果中的空字符串过滤掉
        #         nodes = [x for x in data.split(self.SEP) if x]
        #         # 第一个元素就是 root 的值
        #         root = TreeNode(int(nodes[0]))
        #         # 队列 q 记录父节点，将 root 加入队列
        #         q = deque([root])
        
        #         # index 变量记录正在序列化的节点在数组中的位置
        #         index = 1
        #         while q:
        #             sz = len(q)
        #             for i in range(sz):
        #                 parent = q.popleft()
        #                 # 为父节点构造左侧子节点
        #                 left = nodes[index]
        #                 index += 1
        #                 if left != self.NULL:
        #                     parent.left = TreeNode(int(left))
        #                     q.append(parent.left)
        #                 # 为父节点构造右侧子节点
        #                 right = nodes[index]
        #                 index += 1
        #                 if right != self.NULL:
        #                     parent.right = TreeNode(int(right))
        #                     q.append(parent.right)
                            
        #         return root`,
            language: "python"
        },
        {
            id: 300,
            title: "Longest Increasing Subsequence",
            description: `Given an integer array nums, return the length of the longest strictly increasing subsequence.   Example 1: Input: nums = [10,9,2,5,3,7,101,18] Output: 4 Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4. Example 2: Input: nums = [0,1,0,3,2,3] Output: 4 Example 3: Input: nums = [7,7,7,7,7,7,7] Output: 1   Constraints: 1 <= nums.length <= 2500 -104 <= nums[i] <= 104   Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?
<a href="https://leetcode.com/problems/longest-increasing-subsequence/" target="_blank">https://leetcode.com/problems/longest-increasing-subsequence/</a>`,
            keywords: ["DP", "LIS"],
            code: `        # 1、明确 dp 数组的定义。这一步对于任何动态规划问题都很重要，如果不得当或者不够清晰，会阻碍之后的步骤。
        # 2、根据 dp 数组的定义，运用数学归纳法的思想，假设 dp[0...i-1] 都已知，想办法求出 dp[i]，一旦这一步完成，整个题目基本就解决了。
        
        class Solution:
            def lengthOfLIS(self, nums: List[int]) -> int:
                n = len(nums)
                # length of LIS end here
                memo = [0] * (n+1)
        
                #base case
                memo[0] = 0
                memo[1] = 1
        
                for index in range(2, n+1):
                    # DP
                    for i in range(0, index+1):
                        if i==0 or nums[index-1] > nums[i-1]:
                            memo[index] = max(memo[i]+1, memo[index])
                
                res = max(memo)
                return res
        # class Solution:
        #     def lengthOfLIS(self, nums: List[int]) -> int:
        #         # 定义：dp[i] 表示以 nums[i] 这个数结尾的最长递增子序列的长度
        #         dp = [1]*len(nums)
        #         # base case：dp 数组全都初始化为 1
        #         for i in range(len(nums)):
        #             for j in range(i):
        #                 if nums[i] > nums[j]: 
        #                     dp[i] = max(dp[i], dp[j] + 1)
        #         res = 0
        #         for i in range(len(dp)):
        #             res = max(res, dp[i])
        #         return res
        
        # patience sort + BS
        # class Solution:
        #     def lengthOfLIS(self, nums):
        #         top = [0] * len(nums)
        #         # 牌堆数初始化为 0
        #         piles = 0
        #         for i in range(len(nums)):
        #             # 要处理的扑克牌
        #             poker = nums[i]
        
        #             # 搜索左侧边界的二分查找
        #             left, right = 0, piles
        #             while left < right:
        #                 mid = (left + right) // 2
        #                 if top[mid] > poker:
        #                     right = mid
        #                 elif top[mid] < poker:
        #                     left = mid + 1
        #                 else:
        #                     right = mid
        
        #             # 没找到合适的牌堆，新建一堆
        #             if left == piles:
        #                 piles += 1
        #             # 把这张牌放到牌堆顶
        #             top[left] = poker
        #         # 牌堆数就是 LIS 长度
        #         return piles`,
            language: "python"
        },
        {
            id: 303,
            title: "Range Sum Query - Immutable",
            description: `Given an integer array nums, handle multiple queries of the following type: Calculate the sum of the elements of nums between indices left and right inclusive where left <= right. Implement the NumArray class: NumArray(int[] nums) Initializes the object with the integer array nums. int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).   Example 1: Input ["NumArray", "sumRange", "sumRange", "sumRange"] [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]] Output [null, 1, -1, -3] Explanation NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]); numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1 numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1 numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3   Constraints: 1 <= nums.length <= 104 -105 <= nums[i] <= 105 0 <= left <= right < nums.length At most 104 calls will be made to sumRange.
<a href="https://leetcode.com/problems/range-sum-query-immutable/description/" target="_blank">https://leetcode.com/problems/range-sum-query-immutable/description/</a>`,
            keywords: ["PrefixSum", "Array"],
            code: `        # prefix sum with length+1
        
        class NumArray:
        
            def __init__(self, nums: List[int]):
                self.prefix_sum = []
                s = 0
                for i, n in enumerate(nums):
                    self.prefix_sum.append(s)
                    s += n
                self.prefix_sum.append(s)
        
            def sumRange(self, left: int, right: int) -> int:
                return self.prefix_sum[right+1] - self.prefix_sum[left]
                
        
        
        # Your NumArray object will be instantiated and called as such:
        # obj = NumArray(nums)
        # param_1 = obj.sumRange(left,right)`,
            language: "python"
        },
        {
            id: 304,
            title: "Range Sum Query 2D - Immutable",
            description: `Given a 2D matrix matrix, handle multiple queries of the following type: Calculate the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2). Implement the NumMatrix class: NumMatrix(int[][] matrix) Initializes the object with the integer matrix matrix. int sumRegion(int row1, int col1, int row2, int col2) Returns the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2). You must design an algorithm where sumRegion works on O(1) time complexity.   Example 1: Input ["NumMatrix", "sumRegion", "sumRegion", "sumRegion"] [[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]] Output [null, 8, 11, 12] Explanation NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]); numMatrix.sumRegion(2, 1, 4, 3); // return 8 (i.e sum of the red rectangle) numMatrix.sumRegion(1, 1, 2, 2); // return 11 (i.e sum of the green rectangle) numMatrix.sumRegion(1, 2, 2, 4); // return 12 (i.e sum of the blue rectangle)   Constraints: m == matrix.length n == matrix[i].length 1 <= m, n <= 200 -104 <= matrix[i][j] <= 104 0 <= row1 <= row2 < m 0 <= col1 <= col2 < n At most 104 calls will be made to sumRegion.
<a href="https://leetcode.com/problems/range-sum-query-2d-immutable/description/" target="_blank">https://leetcode.com/problems/range-sum-query-2d-immutable/description/</a>`,
            keywords: ["PrefixSum", "Array"],
            code: `        class NumMatrix:
        
            def __init__(self, matrix: List[List[int]]):
                
                m = len(matrix)
                n = len(matrix[0])
                self.pre_mat = [[0 for j in range(n+1)] for i in range(m+1)]
        
                for i in range(1, m+1):
                    for j in range(1, n+1):
                        self.pre_mat[i][j] = self.pre_mat[i-1][j] + self.pre_mat[i][j-1] - self.pre_mat[i-1][j-1] + matrix[i-1][j-1]
        
            def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
                return self.pre_mat[row2+1][col2+1] - self.pre_mat[row2+1][col1] - self.pre_mat[row1][col2+1] + self.pre_mat[row1][col1]
                
        
        
        # Your NumMatrix object will be instantiated and called as such:
        # obj = NumMatrix(matrix)
        # param_1 = obj.sumRegion(row1,col1,row2,col2)`,
            language: "python"
        },
        {
            id: 307,
            title: "Range Sum Query - Mutable",
            description: `Given an integer array nums, handle multiple queries of the following types: Update the value of an element in nums. Calculate the sum of the elements of nums between indices left and right inclusive where left <= right. Implement the NumArray class: NumArray(int[] nums) Initializes the object with the integer array nums. void update(int index, int val) Updates the value of nums[index] to be val. int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).   Example 1: Input ["NumArray", "sumRange", "update", "sumRange"] [[[1, 3, 5]], [0, 2], [1, 2], [0, 2]] Output [null, 9, null, 8] Explanation NumArray numArray = new NumArray([1, 3, 5]); numArray.sumRange(0, 2); // return 1 + 3 + 5 = 9 numArray.update(1, 2); // nums = [1, 2, 5] numArray.sumRange(0, 2); // return 1 + 2 + 5 = 8   Constraints: 1 <= nums.length <= 3 * 104 -100 <= nums[i] <= 100 0 <= index < nums.length -100 <= val <= 100 0 <= left <= right < nums.length At most 3 * 104 calls will be made to update and sumRange.
<a href="https://leetcode.com/problems/range-sum-query-mutable/description/" target="_blank">https://leetcode.com/problems/range-sum-query-mutable/description/</a>`,
            keywords: ["SegmentTree"],
            code: `        class NumArray:
        
            def __init__(self, nums: List[int]):
                
        
            def update(self, index: int, val: int) -> None:
                
        
            def sumRange(self, left: int, right: int) -> int:
                
        
        
        # Your NumArray object will be instantiated and called as such:
        # obj = NumArray(nums)
        # obj.update(index,val)
        # param_2 = obj.sumRange(left,right)
        
        
        # https://labuladong.online/zh/algo/data-structure/segment-tree-implement/
        
        # LinkedList Implementation
        from typing import Callable
        
        # 线段树节点
        class SegmentNode:
            # 该节点表示的区间范围 [l, r]
            def __init__(self, merge_val: int, l: int, r: int):
                # [l, r] 区间元素的聚合值（如区间和、区间最大值等）
                self.l = l
                self.r = r
                self.merge_val = merge_val
                self.left = None
                self.right = None
        
        class SegmentTree:
            def __init__(self, nums: list, merger: Callable[[int, int], int]):
                # 创建线段树
                # 输入数组 nums 和一个聚合函数 merger，merger 用于计算区间的聚合值
                self.merger = merger
                self.root = self.build(nums, 0, len(nums) - 1)
        
            # 定义：将 nums[l..r] 中的元素构建成线段树，返回根节点
            def build(self, nums: list, l: int, r: int) -> SegmentNode:
                # 区间内只有一个元素，直接返回
                if l == r:
                    return SegmentNode(nums[l], l, r)
                
                # 从中间切分，递归构建左右子树
                mid = l + (r - l) // 2
                left = self.build(nums, l, mid)
                right = self.build(nums, mid + 1, r)
                
                # 根据左右子树的聚合值，计算当前根节点的聚合值
                node = SegmentNode(self.merger(left.merge_val, right.merge_val), l, r)
                
                # 组装左右子树
                node.left = left
                node.right = right
                return node
        
            def update(self, index: int, value: int):
                self._update(self.root, index, value)
        
            def _update(self, node: SegmentNode, index: int, value: int):
                if node.l == node.r:
                    # 找到了目标叶子节点，更新值
                    node.merge_val = value
                    return
        
                mid = node.l + (node.r - node.l) // 2
                if index <= mid:
                    # 若 index 较小，则去左子树更新
                    self._update(node.left, index, value)
                else:
                    # 若 index 较大，则去右子树更新
                    self._update(node.right, index, value)
                
                # 后序位置，左右子树已经更新完毕，更新当前节点的聚合值
                node.merge_val = self.merger(node.left.merge_val, node.right.merge_val)
        
            def query(self, qL: int, qR: int) -> int:
                return self._query(self.root, qL, qR)
        
            def _query(self, node: SegmentNode, qL: int, qR: int) -> int:
                if qL > qR:
                    raise ValueError("Invalid query range")
                
                if node.l == qL and node.r == qR:
                    # 命中了目标区间，直接返回
                    return node.merge_val
                
                # 未直接命中区间，需要继续向下查找
                mid = node.l + (node.r - node.l) // 2
                if qR <= mid:
                    # node.l <= qL <= qR <= mid
                    # 目标区间完全在左子树中
                    return self._query(node.left, qL, qR)
                elif qL > mid:
                    # mid < qL <= qR <= node.r
                    # 目标区间完全在右子树中
                    return self._query(node.right, qL, qR)
                else:
                    # node.l <= qL <= mid < qR <= node.r
                    # 目标区间横跨左右子树
                    # 将查询区间拆分成 [qL, mid] 和 [mid + 1, qR] 两部分，分别向左右子树查询
                    # 最后将左右子树的查询结果合并
                    return self.merger(
                        self._query(node.left, qL, mid),
                        self._query(node.right, mid + 1, qR)
                    )
        
        # Example usage
        if __name__ == "__main__":
            arr = [1, 3, 5, 7, 9]
            # 示例，创建一棵求和线段树
            st = SegmentTree(arr, lambda a, b: a + b)
        
            print(st.query(1, 3)) # 3 + 5 + 7 = 15
            st.update(2, 10)
            print(st.query(1, 3)) # 3 + 10 + 7 = 20
        
        
        
        # Array Implementation
        from typing import Callable
        
        class ArraySegmentTree:
            # 用数组存储线段树结构
            def __init__(self, nums: list[int], merger: Callable[[int, int], int]):
                # 元素个数
                self.n = len(nums)
                self.merger = merger
                # 分配 4 倍数组长度的空间，存储线段树
                self.tree = [0] * (4 * self.n)
                self.build(nums, 0, self.n - 1, 0)
        
            # 定义：对 nums[l..r] 区间的元素构建线段树，rootIndex 是根节点
            def build(self, nums: list[int], l: int, r: int, rootIndex: int):
                if l == r:
                    # 区间内只有一个元素，设置为叶子节点
                    self.tree[rootIndex] = nums[l]
                    return
        
                # 从中间切分，递归构建左右子树
                mid = l + (r - l) // 2
                leftRootIndex = self.leftChild(rootIndex)
                rightRootIndex = self.rightChild(rootIndex)
                # 递归构建 nums[l..mid]，根节点为 leftRootIndex
                self.build(nums, l, mid, leftRootIndex)
                # 递归构建 nums[mid+1..r]，根节点为 rightRootIndex
                self.build(nums, mid + 1, r, rightRootIndex)
        
                # 后序位置，左右子树已经构建完毕，更新当前节点的聚合值
                self.tree[rootIndex] = self.merger(self.tree[leftRootIndex], self.tree[rightRootIndex])
        
            def update(self, index: int, value: int):
                self._update(0, self.n - 1, 0, index, value)
        
            # 当前节点为 rootIndex，对应的区间为 [l, r]
            # 去子树更新 nums[index] 为 value
            def _update(self, l: int, r: int, rootIndex: int, index: int, value: int):
                if l == r:
                    # 找到了目标叶子节点，更新值
                    self.tree[rootIndex] = value
                    return
        
                mid = l + (r - l) // 2
                if index <= mid:
                    # 若 index 较小，则去左子树更新
                    self._update(l, mid, self.leftChild(rootIndex), index, value)
                else:
                    # 若 index 较大，则去右子树更新
                    self._update(mid + 1, r, self.rightChild(rootIndex), index, value)
        
                # 后序位置，左右子树已经更新完毕，更新当前节点的聚合值
                self.tree[rootIndex] = self.merger(
                    self.tree[self.leftChild(rootIndex)],
                    self.tree[self.rightChild(rootIndex)]
                )
        
            def query(self, qL: int, qR: int) -> int:
                if qL < 0 or qR >= self.n or qL > qR:
                    raise ValueError(f"Invalid range: [{qL}, {qR}]")
                return self._query(0, self.n - 1, 0, qL, qR)
        
            def _query(self, l: int, r: int, rootIndex: int, qL: int, qR: int) -> int:
                if qL == l and r == qR:
                    # 命中了目标区间，直接返回
                    return self.tree[rootIndex]
        
                mid = l + (r - l) // 2
                leftRootIndex = self.leftChild(rootIndex)
                rightRootIndex = self.rightChild(rootIndex)
                if qR <= mid:
                    # node.l <= qL <= qR <= mid
                    # 目标区间完全在左子树中
                    return self._query(l, mid, leftRootIndex, qL, qR)
                elif qL > mid:
                    # mid < qL <= qR <= node.r
                    # 目标区间完全在右子树中
                    return self._query(mid + 1, r, rightRootIndex, qL, qR)
                else:
                    # node.l <= qL <= mid < qR <= node.r
                    # 目标区间横跨左右子树
                    # 将查询区间拆分成 [qL, mid] 和 [mid + 1, qR] 两部分，分别向左右子树查询
                    return self.merger(
                        self._query(l, mid, leftRootIndex, qL, mid),
                        self._query(mid + 1, r, rightRootIndex, mid + 1, qR)
                    )
        
            def leftChild(self, pos: int) -> int:
                return 2 * pos + 1
        
            def rightChild(self, pos: int) -> int:
                return 2 * pos + 2
        
        if __name__ == "__main__":
            arr = [1, 3, 5, 7, 9]
            # 示例，创建一棵求和线段树
            st = ArraySegmentTree(arr, lambda a, b: a + b)
        
            print(st.query(1, 3)) # 3 + 5 + 7 = 15
            st.update(2, 10)
            print(st.query(1, 3)) # 3 + 10 + 7 = 20`,
            language: "python"
        },
        {
            id: 313,
            title: "Super Ugly Number",
            description: `A super ugly number is a positive integer whose prime factors are in the array primes. Given an integer n and an array of integers primes, return the nth super ugly number. The nth super ugly number is guaranteed to fit in a 32-bit signed integer.   Example 1: Input: n = 12, primes = [2,7,13,19] Output: 32 Explanation: [1,2,4,7,8,13,14,16,19,26,28,32] is the sequence of the first 12 super ugly numbers given primes = [2,7,13,19]. Example 2: Input: n = 1, primes = [2,3,5] Output: 1 Explanation: 1 has no prime factors, therefore all of its prime factors are in the array primes = [2,3,5].   Constraints: 1 <= n <= 105 1 <= primes.length <= 100 2 <= primes[i] <= 1000 primes[i] is guaranteed to be a prime number. All the values of primes are unique and sorted in ascending order.
<a href="https://leetcode.com/problems/super-ugly-number/" target="_blank">https://leetcode.com/problems/super-ugly-number/</a>`,
            keywords: ["Math", "UglyNumber"],
            code: `        # changed definition of ugly, as long as contain a,b,c as factors
        # BS + LCM
        
        import heapq
        class Solution:
            def nthSuperUglyNumber(self, n: int, primes: List[int]) -> int:
                res = [0] * n
                res[0] = 1
                index = 1
        
                q = []
                for p in primes:
                    heapq.heappush(q, (p, p, 1)) # val, prime, index
                while index < n:
                    cur, p, i = heapq.heappop(q)
                    # avoid repeat
                    if cur != res[index-1]:
                        res[index] = cur
                        index += 1
                    heapq.heappush(q, (res[i]*p, p, i+1))
                
                return res[-1]
        
        
        
        # class Solution:
        #     # 优先队列中装三元组 int[] {product, prime, pi}
        #     # 其中 product 代表链表节点的值，prime 是计算下一个节点所需的质数因子，pi 代表链表上的指针
        #     def nthSuperUglyNumber(self, n: int, primes: List[int]) -> int:
        #         import heapq
        #         pq = []
        
        #         # 把多条链表的头结点加入优先级队列
        #         for prime in primes:
        #             heapq.heappush(pq, (1, prime, 1))
        
        #         # 可以理解为最终合并的有序链表（结果链表）
        #         ugly = [0] * (n + 1)
        #         # 可以理解为结果链表上的指针
        #         p = 1
        
        #         while p <= n:
        #             # 取三个链表的最小结点
        #             product, prime, index = heapq.heappop(pq)
        
        #             # 避免结果链表出现重复元素
        #             if product != ugly[p - 1]:
        #                 # 接到结果链表上
        #                 ugly[p] = product
        #                 p += 1
        
        #             # 生成下一个节点加入优先级队列
        #             heapq.heappush(pq, (ugly[index] * prime, prime, index + 1))
        
        #         return ugly[n]`,
            language: "python"
        },
        {
            id: 319,
            title: "Bulb Switcher",
            description: `There are n bulbs that are initially off. You first turn on all the bulbs, then you turn off every second bulb. On the third round, you toggle every third bulb (turning on if it's off or turning off if it's on). For the ith round, you toggle every i bulb. For the nth round, you only toggle the last bulb. Return the number of bulbs that are on after n rounds.   Example 1: Input: n = 3 Output: 1 Explanation: At first, the three bulbs are [off, off, off]. After the first round, the three bulbs are [on, on, on]. After the second round, the three bulbs are [on, off, on]. After the third round, the three bulbs are [on, off, off]. So you should return 1 because there is only one bulb is on. Example 2: Input: n = 0 Output: 0 Example 3: Input: n = 1 Output: 1   Constraints: 0 <= n <= 109
<a href="https://leetcode.com/problems/bulb-switcher/" target="_blank">https://leetcode.com/problems/bulb-switcher/</a>`,
            keywords: ["Math"],
            code: `        # 其中因子 4 重复出现，所以第 16 盏灯会被按 5 次，奇数次。
        # 就假设现在总共有 16 盏灯，我们求 16 的平方根，等于 4，这就说明最后会有 4 盏灯亮着，它们分别是第 1*1=1 盏、第 2*2=4 盏、第 3*3=9 盏和第 4*4=16 盏。都是奇数次
        
        class Solution:
            def bulbSwitch(self, n: int) -> int:
                return int(n**0.5)`,
            language: "python"
        },
        {
            id: 322,
            title: "Coin Change",
            description: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1. You may assume that you have an infinite number of each kind of coin.   Example 1: Input: coins = [1,2,5], amount = 11 Output: 3 Explanation: 11 = 5 + 5 + 1 Example 2: Input: coins = [2], amount = 3 Output: -1 Example 3: Input: coins = [1], amount = 0 Output: 0   Constraints: 1 <= coins.length <= 12 1 <= coins[i] <= 231 - 1 0 <= amount <= 104
<a href="https://leetcode.com/problems/coin-change/description/" target="_blank">https://leetcode.com/problems/coin-change/description/</a>`,
            keywords: ["DP"],
            code: `        class Solution:
            def coinChange(self, coins: List[int], amount: int) -> int:
                memo = [float('inf')] * (amount+1)
        
                memo[0] = 0
                for c in coins:
                    if c <= amount:
                        memo[c] = 1
                
                for i in range(1, amount+1):
                    for c in coins:
                        if i - c > 0:
                            memo[i] = min(memo[i], memo[i-c] + 1)
                
                return memo[amount] if memo[amount]!=float('inf') else -1
        
        # dp
        # class Solution:
        #     def __init__(self):
        #         self.memo = []
            
        #     def coinChange(self, coins: List[int], amount: int) -> int:
        #         self.memo = [-666] * (amount + 1)
        #         # 备忘录初始化为一个不会被取到的特殊值，代表还未被计算
        #         return self.dp(coins, amount)
            
        #     def dp(self, coins, amount):
        #         if amount == 0: return 0
        #         if amount < 0: return -1
        #         # 查备忘录，防止重复计算
        #         if self.memo[amount] != -666:
        #             return self.memo[amount]
        
        #         res = float('inf')
        #         for coin in coins:
        #             # 计算子问题的结果
        #             subProblem = self.dp(coins, amount - coin)
        #             # 子问题无解则跳过
        #             if subProblem == -1: continue
        #             # 在子问题中选择最优解，然后加一
        #             res = min(res, subProblem + 1)
        #         # 把计算结果存入备忘录
        #         self.memo[amount] = res if res != float('inf') else -1
        #         return self.memo[amount]
        
        # knapsack
        # def knapsack(W: int, wt: List[int], val: List[int]) -> int:
        #     N = len(wt)
        #     # base case 已初始化
        #     dp = [[0] * (W + 1) for _ in range(N + 1)]
        #     for i in range(1, N + 1):
        #         for w in range(1, W + 1):
        #             if w - wt[i-1] < 0:
        #                 # 这种情况下只能选择不装入背包
        #                 dp[i][w] = dp[i - 1][w]
        #             else:
        #                 # 装入或者不装入背包，择优
        #                 dp[i][w] = max(
        #                     dp[i - 1][w - wt[i-1]] + val[i-1], 
        #                     dp[i - 1][w]
        #                 )
        #     return dp[N][W]`,
            language: "python"
        },
        {
            id: 323,
            title: "无向图中连通分量的数目",
            description: `给你输入一个包含 n 个节点的图，用一个整数 n 和一个数组 edges 表示，其中 edges[i] = [ai, bi] 表示图中节点 ai 和 bi 之间有一条边。请你计算这幅图的连通分量个数。
<a href="https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/" target="_blank">https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/</a>`,
            keywords: ["Graph", "UF"],
            code: `        # 并查集（Union Find）结构是 二叉树结构的衍生，用于高效解决无向图的连通性(CAG)问题，可以在 O(1) 时间内合并两个连通分量，在 O(1) 时间内查询两个节点是否连通，在 O(1) 时间内查询连通分量的数量。
        # union(p, q), connected(p, q), count() all O(1)
        #  BFS/DFS cannot achieve
        # key: control the depth
        #   1. less connected to more: like binary tree, logN depth
        #   2. path compression, no need to be binary, O(1) depth, even the dynamic connection is not needed
        #     loop, x = self.parents[x], may have depth 2 above
        #     recursion: total flat
        # members of UF
        #  count
        #  parents
        #  sizes
        
        class Solution:
            def countComponents(self, n: int, edges: list[list[int]]) -> int:
                uf = UF(n)
                # 将每个节点进行连通
                for e in edges:
                    uf.union(e[0], e[1])
                # 返回连通分量的个数
                return uf.count()
        
        class UF:
            # 连通分量个数
            _count: int
            # 存储每个节点的父节点
            parent: List[int]
        
            # n 为图中节点的个数
            def __init__(self, n: int):
                self._count = n
                self.parent = [i for i in range(n)]
        
            # 将节点 p 和节点 q 连通
            def union(self, p: int, q: int):
                rootP = self.find(p)
                rootQ = self.find(q)
        
                if rootP == rootQ:
                    return
        
                self.parent[rootQ] = rootP
                # 两个连通分量合并成一个连通分量
                self._count -= 1
        
            # 判断节点 p 和节点 q 是否连通
            def connected(self, p: int, q: int) -> bool:
                rootP = self.find(p)
                rootQ = self.find(q)
                return rootP == rootQ
        
            def find(self, x: int) -> int:
                if self.parent[x] != x:
                    self.parent[x] = self.find(self.parent[x])
                return self.parent[x]
        
            # 返回图中的连通分量个数
            def count(self) -> int:
                return self._count`,
            language: "python"
        },
        {
            id: 331,
            title: "Verify Preorder Serialization of a Binary Tree",
            description: `One way to serialize a binary tree is to use preorder traversal. When we encounter a non-null node, we record the node's value. If it is a null node, we record using a sentinel value such as '#'. For example, the above binary tree can be serialized to the string "9,3,4,#,#,1,#,#,2,#,6,#,#", where '#' represents a null node. Given a string of comma-separated values preorder, return true if it is a correct preorder traversal serialization of a binary tree. It is guaranteed that each comma-separated value in the string must be either an integer or a character '#' representing null pointer. You may assume that the input format is always valid. For example, it could never contain two consecutive commas, such as "1,,3". Note: You are not allowed to reconstruct the tree.   Example 1: Input: preorder = \"9,3,4,#,#,1,#,#,2,#,6,#,#\" Output: true Example 2: Input: preorder = \"1,#\" Output: false Example 3: Input: preorder = \"9,#,#,1\" Output: false   Constraints: 1 <= preorder.length <= 104 preorder consist of integers in the range [0, 100] and '#' separated by commas ','.
<a href="https://leetcode.com/problems/verify-preorder-serialization-of-a-binary-tree/" target="_blank">https://leetcode.com/problems/verify-preorder-serialization-of-a-binary-tree/</a>`,
            keywords: ["BT", "Divide", "BTSerialization"],
            code: `        # self.helper() and len(self.preorder) == 0 // must empty the list
        
        from collections import deque
        class Solution:
            def isValidSerialization(self, preorder: str) -> bool:
                self.edges = 1 # root
                self.preorder = deque(preorder.split(','))
        
                return self.helper() and len(self.preorder) == 0
            
            def helper(self):
                if len(self.preorder) == 0:
                    return False # already break
                cur = self.preorder.popleft()
                if cur == '#':
                    return True # continue
                # left
                left_ok = self.helper()
                right_ok = self.helper()
        
                return left_ok and right_ok
                
                
        
        
        
        # class Solution:
        #     def isValidSerialization(self, preorder: str) -> bool:
        #         # 一条指向根节点的虚拟边
        #         edge = 1
        #         for node in preorder.split(","):
        #             # 任何时候，边数都不能小于 0
        #             if node == "#":
        #                 # 空指针消耗一条空闲边
        #                 edge -= 1
        #                 if edge < 0:
        #                     return False
        #             else:
        #                 # 非空节点消耗一条空闲边，增加两条空闲边
        #                 edge -= 1
        #                 if edge < 0:
        #                     return False
        #                 edge += 2
        #         # 最后不应该存在空闲边
        #         return edge == 0
        
        
        # class Solution2:
        #     def isValidSerialization(self, preorder: str) -> bool:
        #         # 将字符串转化成列表
        #         nodes = list(preorder.split(","))
        #         return self.deserialize(nodes) and len(nodes) == 0
        
        #     # 改造后的前序遍历反序列化函数
        #     # 详细解析：https://labuladong.online/algo/data-structure/serialize-and-deserialize-binary-tree/
        #     def deserialize(self, nodes) -> bool:
        #         if not nodes:
        #             return False
        
        #         # ***** 前序遍历位置 *****
        #         # 列表最左侧就是根节点
        #         first = nodes.pop(0)
        #         if first == "#":
        #             return True
        #         # *********************
        #         # left and right, we have pop already
        #         return self.deserialize(nodes) and self.deserialize(nodes)`,
            language: "python"
        },
        {
            id: 344,
            title: "Reverse String",
            description: `Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.   Example 1: Input: s = [\"h\",\"e\",\"l\",\"l\",\"o\"] Output: [\"o\",\"l\",\"l\",\"e\",\"h\"] Example 2: Input: s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"] Output: [\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]   Constraints: 1 <= s.length <= 105 s[i] is a printable ascii character.
<a href="https://leetcode.com/problems/reverse-string/description/" target="_blank">https://leetcode.com/problems/reverse-string/description/</a>`,
            keywords: ["Array", "2ptr"],
            code: `        class Solution:
            def reverseString(self, s: List[str]) -> None:
                """
                Do not return anything, modify s in-place instead.
                """
                left = 0
                right = len(s) - 1
                while left < right:
                    temp = s[left]
                    s[left] = s[right]
                    s[right] = temp
                    left += 1
                    right -= 1`,
            language: "python"
        },
        {
            id: 354,
            title: "Russian Doll Envelopes",
            description: `You are given a 2D array of integers envelopes where envelopes[i] = [wi, hi] represents the width and the height of an envelope. One envelope can fit into another if and only if both the width and height of one envelope are greater than the other envelope's width and height. Return the maximum number of envelopes you can Russian doll (i.e., put one inside the other). Note: You cannot rotate an envelope.   Example 1: Input: envelopes = [[5,4],[6,4],[6,7],[2,3]] Output: 3 Explanation: The maximum number of envelopes you can Russian doll is 3 ([2,3] => [5,4] => [6,7]). Example 2: Input: envelopes = [[1,1],[1,1],[1,1]] Output: 1   Constraints: 1 <= envelopes.length <= 105 envelopes[i].length == 2 1 <= wi, hi <= 105
<a href="https://leetcode.com/problems/russian-doll-envelopes/" target="_blank">https://leetcode.com/problems/russian-doll-envelopes/</a>`,
            keywords: ["DP", "LIS"],
            code: `        # 先对宽度 w 进行升序排序，如果遇到 w 相同的情况，则按照高度 h 降序排序；之后把所有的 h 作为一个数组，在这个数组上计算 LIS 的长度就是答案。
        # patience sort is needed for TLE
        
        class Solution:
            def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
                envelopes.sort(key=lambda x: (x[0], -x[1]))
                arr = [x[1] for x in envelopes]
                return self.lis(arr)
        
            def lis(self, arr):
                n = len(arr)
        
                top = [0] * n
                cnt = 0
        
                for i in range(n):
                    left = 0
                    right = cnt
                    cur = arr[i]
                    while left < right:
                        mid = left + (right-left)//2
                        if top[mid] >= cur: # for patience sort, equal should be a new sequence
                            right = mid
                        else:
                            left = mid + 1
                    top[left] = cur
                    if left == cnt:
                        cnt += 1
                return cnt
        
        # TLE
        # class Solution:
        #     def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
        #         envelopes.sort(key=lambda x: x[0])
        
        #         n = len(envelopes)
        #         memo = [1] * n
        
        #         for index in range(n):
        #             cur = envelopes[index]
        #             # dp
        #             for i in range(index):
        #                 prev = envelopes[i]
        #                 if cur[0] == prev[0]:
        #                     continue
        #                 if cur[1] > prev[1]:
        #                     memo[index] = max(memo[index], memo[i]+1)
                
        #         return max(memo)
        
        
        # 先对宽度 w 进行升序排序，如果遇到 w 相同的情况，则按照高度 h 降序排序；之后把所有的 h 作为一个数组，在这个数组上计算 LIS 的长度就是答案。
        # class Solution:
        #     def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
        #         n = len(envelopes)
        #         # 按宽度升序排列，如果宽度一样，则按高度降序排列
        #         envelopes.sort(key=lambda x: (x[0], -x[1]))
                
        #         # 对高度数组寻找 LIS
        #         height = [envelopes[i][1] for i in range(n)]
        
        #         return self.lengthOfLIS(height)
        
        #     # 返回 nums 中 LIS 的长度
        #     def lengthOfLIS(self, nums: List[int]) -> int:
        #         piles = 0
        #         n = len(nums)
        #         top = [0] * n
        #         for i in range(n):
        #             # 要处理的扑克牌
        #             poker = nums[i]
        #             left, right = 0, piles
        #             # 二分查找插入位置
        #             while left < right:
        #                 mid = (left + right) // 2
        #                 if top[mid] >= poker:
        #                     right = mid
        #                 else:
        #                     left = mid + 1
        #             if left == piles: piles += 1
        #             # 把这张牌放到牌堆顶
        #             top[left] = poker
        #         # 牌堆数就是 LIS 长度
        #         return piles`,
            language: "python"
        },
        {
            id: 365,
            title: "Water and Jug Problem",
            description: `You are given two jugs with capacities x liters and y liters. You have an infinite water supply. Return whether the total amount of water in both jugs may reach target using the following operations: Fill either jug completely with water. Completely empty either jug. Pour water from one jug into another until the receiving jug is full, or the transferring jug is empty.   Example 1: Input: x = 3, y = 5, target = 4 Output: true Explanation: Follow these steps to reach a total of 4 liters: Fill the 5-liter jug (0, 5). Pour from the 5-liter jug into the 3-liter jug, leaving 2 liters (3, 2). Empty the 3-liter jug (0, 2). Transfer the 2 liters from the 5-liter jug to the 3-liter jug (2, 0). Fill the 5-liter jug again (2, 5). Pour from the 5-liter jug into the 3-liter jug until the 3-liter jug is full. This leaves 4 liters in the 5-liter jug (3, 4). Empty the 3-liter jug. Now, you have exactly 4 liters in the 5-liter jug (0, 4). Reference: The Die Hard example. Example 2: Input: x = 2, y = 6, target = 5 Output: false Example 3: Input: x = 1, y = 2, target = 3 Output: true Explanation: Fill both jugs. The total amount of water in both jugs is equal to 3 now.   Constraints: 1 <= x, y, target <= 103
<a href="https://leetcode.com/problems/water-and-jug-problem/" target="_blank">https://leetcode.com/problems/water-and-jug-problem/</a>`,
            keywords: ["BFS"],
            code: `        # cleverly use the edge case to simplify
        
        from collections import deque
        
        class Solution:
            def canMeasureWater(self, x: int, y: int, target: int) -> bool:
                q = deque()
                visited = set()
        
                q.append((0, 0))
        
                while q:
                    for _ in range(len(q)):
                        cur = q.popleft()
                        i, j = cur
                        # cleverly use the edge case to simplify
                        if i < 0 or i > x or j < 0 or j > y:
                            continue
        
                        if (i, j) in visited:
                            continue
                        visited.add((i,j))
                        if i + j == target:
                            return True
                        for nxt in (
                            (x, j), (i, y), # case 1
                            (0, j), (i, 0), # case 2
                            (0, i+j), (i+j-y, y), # case 3a, only 1 is possible
                            (i+j, 0), (x, i+j-x), # case 3b, only 1 is possible
                            ):
                            q.append(nxt)
                return False
        
        # class Solution:
        
        #     def canMeasureWater(self, jug1Capacity: int, jug2Capacity: int, targetCapacity: int) -> bool:
        #         # BFS 算法的队列
        #         q = collections.deque()
        #         # 用来记录已经遍历过的状态，把元组转化成数字方便存储哈希集合
        #         # 转化方式是 (x, y) -> (x * (jug2Capacity + 1) + y)，和二维数组坐标转一维坐标是一样的原理
        #         # 因为水桶 2 的取值是 [0, jug2Capacity]，所以需要额外加一，请类比二维数组坐标转一维坐标
        #         # 且考虑到题目输入的数据规模较大，相乘可能导致 int 溢出，所以使用 long 类型
        #         visited = set()
        #         # 添加初始状态，两个桶都没有水
        #         q.append((0, 0))
        #         visited.add(0 * (jug2Capacity + 1) + 0)
        
        #         while q:
        #             curState = q.popleft()
        #             if (curState[0] == targetCapacity or curState[1] == targetCapacity
        #                     or curState[0] + curState[1] == targetCapacity):
        #                 # 如果任意一个桶的水量等于目标水量，就返回 true
        #                 return True
        #             # 计算出所有可能的下一个状态
        #             nextStates = []
        #             # 把 1 桶灌满
        #             nextStates.append((jug1Capacity, curState[1]))
        #             # 把 2 桶灌满
        #             nextStates.append((curState[0], jug2Capacity))
        #             # 把 1 桶倒空
        #             nextStates.append((0, curState[1]))
        #             # 把 2 桶倒空
        #             nextStates.append((curState[0], 0))
        #             # 把 1 桶的水灌进 2 桶，直到 1 桶空了或者 2 桶满了
        #             nextStates.append((
        #                 curState[0] - min(curState[0], jug2Capacity - curState[1]),
        #                 curState[1] + min(curState[0], jug2Capacity - curState[1])
        #             ))
        #             # 把 2 桶的水灌进 1 桶，直到 2 桶空了或者 1 桶满了
        #             nextStates.append((
        #                 curState[0] + min(curState[1], jug1Capacity - curState[0]),
        #                 curState[1] - min(curState[1], jug1Capacity - curState[0])
        #             ))
        
        #             # 把所有可能的下一个状态都放进队列里
        #             for nextState in nextStates:
        #                 # 把二维坐标转化为数字，方便去重
        #                 hash = nextState[0] * (jug2Capacity + 1) + nextState[1]
        #                 if hash in visited:
        #                     # 如果这个状态之前遍历过，就跳过，避免队列永远不空陷入死循环
        #                     continue
        #                 q.append(nextState)
        #                 visited.add(hash)
        #         return False`,
            language: "python"
        },
        {
            id: 370,
            title: "Range Addition",
            description: `力扣第 370 题「区间加法」直接考察了差分数组技巧，相当于给你输入一个长度为 n 的 nums 数组，其中的元素初始值都为 0，让你对其中的区间元素进行增减操作，最后返回最终的 nums 数组。
<a href="https://leetcode.com/problems/range-addition/description/" target="_blank">https://leetcode.com/problems/range-addition/description/</a>`,
            keywords: ["DiffSum", "Array"],
            code: `        class Solution:
            def getModifiedArray(self, length: int, updates: List[List[int]]) -> List[int]:
                # nums 初始化为全 0
                nums = [0] * length
                # 构造差分解法
                df = self.Difference(nums)
                for update in updates:
                    i = update[0]
                    j = update[1]
                    val = update[2]
                    df.increment(i, j, val)
                return df.result()
        
            class Difference:
                # 差分数组
                def __init__(self, nums: List[int]):
                    assert len(nums) > 0
                    self.diff = [0] * len(nums)
                    # 构造差分数组
                    self.diff[0] = nums[0]
                    for i in range(1, len(nums)):
                        self.diff[i] = nums[i] - nums[i - 1]
        
                # 给闭区间 [i, j] 增加 val（可以是负数）
                def increment(self, i: int, j: int, val: int):
                    self.diff[i] += val
                    if j + 1 < len(self.diff):
                        self.diff[j + 1] -= val
        
                def result(self) -> List[int]:
                    res = [0] * len(self.diff)
                    # 根据差分数组构造结果数组
                    res[0] = self.diff[0]
                    for i in range(1, len(self.diff)):
                        res[i] = res[i - 1] + self.diff[i]
                    return res`,
            language: "python"
        },
        {
            id: 373,
            title: "Find K Pairs with Smallest Sums",
            description: `You are given two integer arrays nums1 and nums2 sorted in non-decreasing order and an integer k. Define a pair (u, v) which consists of one element from the first array and one element from the second array. Return the k pairs (u1, v1), (u2, v2), ..., (uk, vk) with the smallest sums.   Example 1: Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3 Output: [[1,2],[1,4],[1,6]] Explanation: The first 3 pairs are returned from the sequence: [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6] Example 2: Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2 Output: [[1,1],[1,1]] Explanation: The first 2 pairs are returned from the sequence: [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]   Constraints: 1 <= nums1.length, nums2.length <= 105 -109 <= nums1[i], nums2[i] <= 109 nums1 and nums2 both are sorted in non-decreasing order. 1 <= k <= 104 k <= nums1.length * nums2.length
<a href="https://leetcode.com/problems/find-k-pairs-with-smallest-sums/" target="_blank">https://leetcode.com/problems/find-k-pairs-with-smallest-sums/</a>`,
            keywords: ["LinkedList", "2ptr"],
            code: `        # Notes:
        # naive: for each of nums1 record which one it summed already in nums2, say the recorder is n1ton2. for every step you need O(N) to test every previous and i+1 with their next sum.
        # instead this process should be in heap not O(N) scan
        # heapq: (sum, op1, idx2)
        
        import heapq
        class Solution:
            def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
                pairs = []
                
                q = []
                for i in nums1:
                    heapq.heappush(q, (i+nums2[0], i, 0))
                
                while q and k > 0:
                    val, op1, idx2 = heapq.heappop(q)
                    pairs.append((op1, nums2[idx2]))
                    if idx2 + 1 < len(nums2):
                        heapq.heappush(q, (op1+nums2[idx2+1], op1, idx2+1))
                    k -= 1
                return pairs`,
            language: "python"
        },
        {
            id: 378,
            title: "Kth Smallest Element in a Sorted Matrix",
            description: `Given an n x n matrix where each of the rows and columns is sorted in ascending order, return the kth smallest element in the matrix. Note that it is the kth smallest element in the sorted order, not the kth distinct element. You must find a solution with a memory complexity better than O(n2).   Example 1: Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8 Output: 13 Explanation: The elements in the matrix are [1,5,9,10,11,12,13,13,15], and the 8th smallest number is 13 Example 2: Input: matrix = [[-5]], k = 1 Output: -5   Constraints: n == matrix.length == matrix[i].length 1 <= n <= 300 -109 <= matrix[i][j] <= 109 All the rows and columns of matrix are guaranteed to be sorted in non-decreasing order. 1 <= k <= n2   Follow up: Could you solve the problem with a constant memory (i.e., O(1) memory complexity)? Could you solve the problem in O(n) time complexity? The solution may be too advanced for an interview but you may find reading this paper fun.
<a href="https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/description/" target="_blank">https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/description/</a>`,
            keywords: ["LinkedList", "2ptr"],
            code: `        # heapq: (val, idx, row)
        
        import heapq
        class Solution:
            def kthSmallest(self, matrix: List[List[int]], k: int) -> int:
                q = []
                for row in matrix:
                    heapq.heappush(q, (row[0], 0, row))
                val = 0
                while q and k>0:
                    val, idx, row = heapq.heappop(q)
                    k -=1
                    if idx+1 < len(row):
                        heapq.heappush(q, (row[idx+1], idx+1, row))
                
                return val`,
            language: "python"
        },
        {
            id: 382,
            title: "Linked List Random Node",
            description: `Given a singly linked list, return a random node's value from the linked list. Each node must have the same probability of being chosen. Implement the Solution class: Solution(ListNode head) Initializes the object with the head of the singly-linked list head. int getRandom() Chooses a node randomly from the list and returns its value. All the nodes of the list should be equally likely to be chosen.   Example 1: Input ["Solution", "getRandom", "getRandom", "getRandom", "getRandom", "getRandom"] [[[1, 2, 3]], [], [], [], [], []] Output [null, 1, 3, 2, 2, 3] Explanation Solution solution = new Solution([1, 2, 3]); solution.getRandom(); // return 1 solution.getRandom(); // return 3 solution.getRandom(); // return 2 solution.getRandom(); // return 2 solution.getRandom(); // return 3 // getRandom() should return either 1, 2, or 3 randomly. Each element should have equal probability of returning.   Constraints: The number of nodes in the linked list will be in the range [1, 104]. -104 <= Node.val <= 104 At most 104 calls will be made to getRandom.   Follow up: What if the linked list is extremely large and its length is unknown to you? Could you solve this efficiently without using extra space?
<a href="https://leetcode.com/problems/linked-list-random-node/description/" target="_blank">https://leetcode.com/problems/linked-list-random-node/description/</a>`,
            keywords: ["LinkedList", "Math"],
            code: `        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, val=0, next=None):
        #         self.val = val
        #         self.next = next
        import random
        class Solution:
        
            def __init__(self, head: Optional[ListNode]):
                self.rand = random.Random()
                self.head = head
        
            def getRandom(self) -> int:
                res = 0
                p = self.head
                index = 0
                while p:
                    cur = self.rand.randint(0, index)
                    if cur == 0:
                        res = p.val
                    index += 1
                    p = p.next
                return res
        
        
        # Your Solution object will be instantiated and called as such:
        # obj = Solution(head)
        # param_1 = obj.getRandom()
        
        # import random
        
        # # 返回链表中一个随机节点的值
        # def getRandom(head: ListNode) -> int:
        #     r = random.Random()
        #     i = 0
        #     res = 0
        #     p = head
        #     # while 循环遍历链表
        #     while p != None:
        #         i = i + 1
        #         # 生成一个 [0, i) 之间的整数
        #         # 这个整数等于 0 的概率就是 1/i
        #         if 0 == r.randint(0, i - 1):
        #             res = p.val
        #         p = p.next
        #     return res
        
        # EXTEND to k values
        # from typing import List
        # import random
        
        # # 返回链表中 k 个随机节点的值
        # def getRandom(head: ListNode, k: int) -> List[int]:
        #     r = random.Random()
        #     res = [0]*k
        #     p = head
        
        #     # 前 k 个元素先默认选上
        #     for i in range(k):
        #         if p is None:
        #             break
        #         res[i] = p.val
        #         p = p.next
            
        #     i = k
        #     # while 循环遍历链表
        #     while p is not None:
        #         i += 1
        #         # 生成一个 [0, i) 之间的整数
        #         j = r.randint(0, i - 1)
        #         # 这个整数小于 k 的概率就是 k/i
        #         if j < k:
        #             res[j] = p.val
        #         p = p.next
        #     return res`,
            language: "python"
        },
        {
            id: 384,
            title: "Shuffle an Array",
            description: `Given an integer array nums, design an algorithm to randomly shuffle the array. All permutations of the array should be equally likely as a result of the shuffling. Implement the Solution class: Solution(int[] nums) Initializes the object with the integer array nums. int[] reset() Resets the array to its original configuration and returns it. int[] shuffle() Returns a random shuffling of the array.   Example 1: Input ["Solution", "shuffle", "reset", "shuffle"] [[[1, 2, 3]], [], [], []] Output [null, [3, 1, 2], [1, 2, 3], [1, 3, 2]] Explanation Solution solution = new Solution([1, 2, 3]); solution.shuffle(); // Shuffle the array [1,2,3] and return its result. // Any permutation of [1,2,3] must be equally likely to be returned. // Example: return [3, 1, 2] solution.reset(); // Resets the array back to its original configuration [1,2,3]. Return [1, 2, 3] solution.shuffle(); // Returns the random shuffling of array [1,2,3]. Example: return [1, 3, 2]   Constraints: 1 <= nums.length <= 50 -106 <= nums[i] <= 106 All the elements of nums are unique. At most 104 calls in total will be made to reset and shuffle.
<a href="https://leetcode.com/problems/shuffle-an-array/" target="_blank">https://leetcode.com/problems/shuffle-an-array/</a>`,
            keywords: ["Math"],
            code: `        # 该算法可以生成 n! 种可能的结果，所以这个算法是正确的，能够保证随机性。
        
        import random
        class Solution:
        
            def __init__(self, nums: List[int]):
                self.nums = nums
                self.rand = random.Random()
                self.n = len(nums)
        
            def reset(self) -> List[int]:
                return self.nums
        
            def shuffle(self) -> List[int]:
                res = self.nums.copy()
                for i in range(self.n):
                    j = self.rand.randint(i, self.n-1)
                    res[i], res[j] = res[j], res[i]
                return res
                
        
        
        # Your Solution object will be instantiated and called as such:
        # obj = Solution(nums)
        # param_1 = obj.reset()
        # param_2 = obj.shuffle()
        
        # class Solution:
        
        #     def __init__(self, nums: List[int]):
        #         self.nums = nums
        #         self.rand = random.Random()
        
        #     def reset(self) -> List[int]:
        #         return self.nums
        
        #     # 洗牌算法
        #     def shuffle(self) -> List[int]:
        #         n = len(self.nums)
        #         copy = self.nums.copy()
        #         for i in range(n):
        #             # 生成一个 [i, n-1] 区间内的随机数
        #             r = i + self.rand.randint(0, n - i - 1)
        #             # 交换 copy[i] 和 copy[r]
        #             copy[i], copy[r] = copy[r], copy[i]
        #         return copy`,
            language: "python"
        },
        {
            id: 388,
            title: "Longest Absolute File Path",
            description: `Suppose we have a file system that stores both files and directories. An example of one system is represented in the following picture: Here, we have dir as the only directory in the root. dir contains two subdirectories, subdir1 and subdir2. subdir1 contains a file file1.ext and subdirectory subsubdir1. subdir2 contains a subdirectory subsubdir2, which contains a file file2.ext. In text form, it looks like this (with \u27f6 representing the tab character): dir \u27f6 subdir1 \u27f6 \u27f6 file1.ext \u27f6 \u27f6 subsubdir1 \u27f6 subdir2 \u27f6 \u27f6 subsubdir2 \u27f6 \u27f6 \u27f6 file2.ext If we were to write this representation in code, it will look like this: "dir\\n\\tsubdir1\\n\\t\\tfile1.ext\\n\\t\\tsubsubdir1\\n\\tsubdir2\\n\\t\\tsubsubdir2\\n\\t\\t\\tfile2.ext". Note that the '\\n' and '\\t' are the new-line and tab characters. Every file and directory has a unique absolute path in the file system, which is the order of directories that must be opened to reach the file/directory itself, all concatenated by '/'s. Using the above example, the absolute path to file2.ext is "dir/subdir2/subsubdir2/file2.ext". Each directory name consists of letters, digits, and/or spaces. Each file name is of the form name.extension, where name and extension consist of letters, digits, and/or spaces. Given a string input representing the file system in the explained format, return the length of the longest absolute path to a file in the abstracted file system. If there is no file in the system, return 0. Note that the testcases are generated such that the file system is valid and no file or directory name has length 0.   Example 1: Input: input = "dir\\n\\tsubdir1\\n\\tsubdir2\\n\\t\\tfile.ext" Output: 20 Explanation: We have only one file, and the absolute path is "dir/subdir2/file.ext" of length 20. Example 2: Input: input = "dir\\n\\tsubdir1\\n\\t\\tfile1.ext\\n\\t\\tsubsubdir1\\n\\tsubdir2\\n\\t\\tsubsubdir2\\n\\t\\t\\tfile2.ext" Output: 32 Explanation: We have two files: "dir/subdir1/file1.ext" of length 21 "dir/subdir2/subsubdir2/file2.ext" of length 32. We return 32 since it is the longest absolute path to a file. Example 3: Input: input = "a" Output: 0 Explanation: We do not have any files, just a single directory named "a".   Constraints: 1 <= input.length <= 104 input may contain lowercase or uppercase English letters, a new line character '\\n', a tab character '\\t', a dot '.', a space ' ', and digits. All file and directory names have positive length.
<a href="https://leetcode.com/problems/longest-absolute-file-path/" target="_blank">https://leetcode.com/problems/longest-absolute-file-path/</a>`,
            keywords: ["Stack"],
            code: `        # expected number of files in stack: level + 1
        # rfind
        
        class Solution:
            def lengthLongestPath(self, input: str) -> int:
                stack = []
                res = 0
                for line in input.split('\n'):
                    level = line.rfind('\t')
                    # level + 1 is expected number of files in stack
                    for i in range(len(stack)-level-1):
                        stack.pop()
                    if level < 0:
                        stack.append(line)
                    else:
                        stack.append(line[level+1:])
                    if '.' in line:
                        res = max(res, len('/'.join(stack)))
        
                return res`,
            language: "python"
        },
        {
            id: 395,
            title: "Longest Substring with At Least K Repeating Characters",
            description: `Given a string s and an integer k, return the length of the longest substring of s such that the frequency of each character in this substring is greater than or equal to k. if no such substring exists, return 0.   Example 1: Input: s = "aaabb", k = 3 Output: 3 Explanation: The longest substring is "aaa", as 'a' is repeated 3 times. Example 2: Input: s = "ababbc", k = 2 Output: 5 Explanation: The longest substring is "ababb", as 'a' is repeated 2 times and 'b' is repeated 3 times.   Constraints: 1 <= s.length <= 104 s consists of only lowercase English letters. 1 <= k <= 105
<a href="https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/" target="_blank">https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/</a>`,
            keywords: ["SlidingWindow"],
            code: `        # Note: very hard
        # it is longest, thus cannot decrease window for any condition
        # we limit the char count, and loop from 1 to 26
        
        class Solution:
            def longestSubstring(self, s: str, k: int) -> int:
                res = 0
                for i in range(1, 27):
                    left = 0
                    right = 0
                    window = {}
                    char_cnt = 0
                    char_valid = 0
                    while right < len(s):
                        c = s[right]
                        if window.get(c, 0) <= 0:
                            char_cnt += 1
                        window[c] = window.get(c, 0) + 1
                        if window[c] == k:
                            char_valid += 1
                        right += 1
                        while char_cnt > i and left < right:
                            cl = s[left]
                            if window[cl] == 1:
                                char_cnt -= 1
                            if window[cl] == k:
                                char_valid -= 1
                            window[cl] -= 1
                            left += 1
                        if char_cnt == char_valid:
                            res = max(res, right - left)
                return res`,
            language: "python"
        },
        {
            id: 398,
            title: "Random Pick Index",
            description: `Given an integer array nums with possible duplicates, randomly output the index of a given target number. You can assume that the given target number must exist in the array. Implement the Solution class: Solution(int[] nums) Initializes the object with the array nums. int pick(int target) Picks a random index i from nums where nums[i] == target. If there are multiple valid i's, then each index should have an equal probability of returning.   Example 1: Input ["Solution", "pick", "pick", "pick"] [[[1, 2, 3, 3, 3]], [3], [1], [3]] Output [null, 4, 0, 2] Explanation Solution solution = new Solution([1, 2, 3, 3, 3]); solution.pick(3); // It should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning. solution.pick(1); // It should return 0. Since in the array only nums[0] is equal to 1. solution.pick(3); // It should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.   Constraints: 1 <= nums.length <= 2 * 104 -231 <= nums[i] <= 231 - 1 target is an integer from nums. At most 104 calls will be made to pick.
<a href="https://leetcode.com/problems/random-pick-index/description/" target="_blank">https://leetcode.com/problems/random-pick-index/description/</a>`,
            keywords: ["Math"],
            code: `        # import random
        # class Solution:
        
        #     def __init__(self, nums: List[int]):
        #         self.nums = nums
        #         self.n = len(nums)
        #         self.rand = random.Random()
        
        #     def pick(self, target: int) -> int:
        #         res = 0
        #         cnt = 0
        #         for i in range(self.n):
        #             if self.nums[i] == target:
        #                 cur = self.rand.randint(0, cnt)
        #                 if cur == 0:
        #                     res = i
        #                 cnt += 1
        #         return res
                
        from random import choice
        from typing import List
        
        class Solution:
        
            def __init__(self, nums: List[int]):
                self.nums = nums
                self.indices = {}
                for index, num in enumerate(nums):
                    if num not in self.indices:
                        self.indices[num] = []
                    self.indices[num].append(index)
        
            def pick(self, target: int) -> int:
                # Randomly select an index from the list of indices for the target
                return choice(self.indices[target])
        
        # Your Solution object will be instantiated and called as such:
        # obj = Solution(nums)
        # param_1 = obj.pick(target)`,
            language: "python"
        },
        {
            id: 402,
            title: "Remove K Digits",
            description: `Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.   Example 1: Input: num = "1432219", k = 3 Output: "1219" Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest. Example 2: Input: num = "10200", k = 1 Output: "200" Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes. Example 3: Input: num = "10", k = 2 Output: "0" Explanation: Remove all the digits from the number and it is left with nothing which is 0.   Constraints: 1 <= k <= num.length <= 105 num consists of only digits. num does not have any leading zeros except for the zero itself.
<a href="https://leetcode.com/problems/remove-k-digits/description/" target="_blank">https://leetcode.com/problems/remove-k-digits/description/</a>`,
            keywords: ["MonotonicStack"],
            code: `        # not any case, but just uses MonotonicStack algo
        # careful start with ‘0’
        
        class Solution:
            def removeKdigits(self, num: str, k: int) -> str:
                mono = []
                for c in num:
                    while k and mono and  int(mono[-1]) > int(c):
                        mono.pop()
                        k -= 1
                    # do not start with 0
                    if len(mono) == 0 and c == '0':
                        continue
                    mono.append(c)
                while k and mono: # "10" k = 2 need to check mono also
                    mono.pop()
                    k -= 1
                return ''.join(mono) if mono else '0'
        
        # 如果想让结果尽可能小，那么清除数字分两步：
        
        # 1、先删除 num 中的若干数字，使得 num 从左到右每一位都单调递增。比如 14329 转化成 129，这需要使用到 单调栈技巧
        
        # 2、num 中的每一位变成单调递增的之后，如果 k 还大于 0（还可以继续删除）的话，则删除尾部的数字，比如 129 删除成 12。
        
        # class Solution:
        #     def removeKdigits(self, num: str, k: int) -> str:
        #         stk = []
        #         for c in num:
        #             # 单调栈代码模板
        #             while stk and k > 0 and c < stk[-1]:
        #                 stk.pop()
        #                 k -= 1
        #             # 防止 0 作为数字的开头
        #             if not stk and c == '0':
        #                 continue
        #             stk.append(c)
        
        #         # 此时栈中元素单调递增，若 k 还没用完的话删掉栈顶元素
        #         final_stack = stk[:-k] if k else stk
        
        #         # 将栈中字符转化成字符串
        #         # 出栈顺序和字符串顺序是反的
        #         result = ''.join(final_stack).lstrip('0')
        
        #         # 若最后没剩下数字，就是 0
        #         return result if result else '0'`,
            language: "python"
        },
        {
            id: 410,
            title: "Split Array Largest Sum",
            description: `Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of any subarray is minimized. Return the minimized largest sum of the split. A subarray is a contiguous part of the array.   Example 1: Input: nums = [7,2,5,10,8], k = 2 Output: 18 Explanation: There are four ways to split nums into two subarrays. The best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18. Example 2: Input: nums = [1,2,3,4,5], k = 2 Output: 9 Explanation: There are four ways to split nums into two subarrays. The best way is to split it into [1,2,3] and [4,5], where the largest sum among the two subarrays is only 9.   Constraints: 1 <= nums.length <= 1000 0 <= nums[i] <= 106 1 <= k <= min(50, nums.length)`,
            keywords: ["BS"],
            code: `        # same as shipping, amazing
        
        class Solution:
            def calcN(self, nums, m):
                cnt = 0
                cur_s = 0
                for n in nums:
                    cur_s += n
                    if cur_s > m:
                        cnt += 1
                        cur_s = n
                    elif cur_s == m:
                        cnt += 1
                        cur_s = 0
                if cur_s != 0:
                    cnt += 1
                return cnt
        
            def splitArray(self, nums: List[int], k: int) -> int:
                left = max(nums)
                right = sum(nums)
                while left <= right:
                    mid = left + (right - left) // 2
                    cur = self.calcN(nums, mid)
                    if cur == k:
                        right = mid - 1
                    elif cur > k:
                        left = mid + 1
                    elif cur < k:
                        right = mid - 1
                
                if left < max(nums) or left > sum(nums):
                    return max(nums)
                return left`,
            language: "python"
        },
        {
            id: 416,
            title: "Partition Equal Subset Sum",
            description: `Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.   Example 1: Input: nums = [1,5,11,5] Output: true Explanation: The array can be partitioned as [1, 5, 5] and [11]. Example 2: Input: nums = [1,2,3,5] Output: false Explanation: The array cannot be partitioned into equal sum subsets.   Constraints: 1 <= nums.length <= 200 1 <= nums[i] <= 100
<a href="https://leetcode.com/problems/partition-equal-subset-sum/" target="_blank">https://leetcode.com/problems/partition-equal-subset-sum/</a>`,
            keywords: ["DP"],
            code: `        # DP: i, target
        
        class Solution:
            def canPartition(self, nums: List[int]) -> bool:
                target = sum(nums)
                if target % 2 == 1:
                    return False
                target //= 2
        
                n = len(nums)
        
                # define: current pos and exact target, is accessible
                memo = [[False for i in range(target+1)] for j in range(n+1)]
        
                # conv:
                # i-1, t accessible -> i, t
                # i-1, t-v accessible -> i, t
        
                #init:
                # 0, 0 is True, 0, x false
                # x, 0 is False
                memo[0][0] = True
        
                for i in range(1, n+1):
                    for j in range(1, target+1):
                        cur = nums[i-1]
                        memo[i][j] |= memo[i-1][j]
                        if j >= cur:
                            memo[i][j] |= memo[i-1][j-cur]
                return memo[n][target]
        
        # class Solution:
        #     def canPartition(self, nums: List[int]) -> bool:
        #         sumn = 0
        #         for num in nums: 
        #             sumn += num
                    
        #         # 和为奇数时，不可能划分成两个和相等的集合
        #         if sumn % 2 != 0: 
        #             return False
                
        #         n = len(nums)
        #         sumn = sumn // 2
        #         dp = [False] * (sumn + 1)
                
        #         # base case
        #         dp[0] = True
        
        #         for i in range(0, n):
        #             for j in range(sumn, -1, -1):
        #                 if j - nums[i] >= 0:
        #                     dp[j] = dp[j] or dp[j - nums[i]]
                
        #         return dp[sumn]`,
            language: "python"
        },
        {
            id: 424,
            title: "Longest Repeating Character Replacement",
            description: `You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times. Return the length of the longest substring containing the same letter you can get after performing the above operations.   Example 1: Input: s = "ABAB", k = 2 Output: 4 Explanation: Replace the two 'A's with two 'B's or vice versa. Example 2: Input: s = "AABABBA", k = 1 Output: 4 Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA". The substring "BBBB" has the longest repeating letters, which is 4. There may exists other ways to achieve this answer too.   Constraints: 1 <= s.length <= 105 s consists of only uppercase English letters. 0 <= k <= s.length
<a href="https://leetcode.com/problems/longest-repeating-character-replacement/" target="_blank">https://leetcode.com/problems/longest-repeating-character-replacement/</a>`,
            keywords: ["SlidingWindow"],
            code: `        # keep track of char count.
        # maxAppear is not up to date. but as long as longest is reflected is ok
        
        class Solution:
            def characterReplacement(self, s: str, k: int) -> int:
                left = 0
                right = 0
        
                chars = {}
                # maxAppear is not up to date. but as long as longest is reflected is ok
                maxAppear = 0
                res = 0
                while right < len(s):
                    chars[s[right]] = chars.get(s[right], 0) + 1
                    maxAppear = max(maxAppear, chars[s[right]])
                    right += 1
        
                    while right - left - maxAppear > k:
                        chars[s[left]] = chars.get(s[left], 1) - 1
                        left += 1
        
                    res = max(right - left, res)
                
                return res`,
            language: "python"
        },
        {
            id: 433,
            title: "Minimum Genetic Mutation",
            description: `A gene string can be represented by an 8-character long string, with choices from 'A', 'C', 'G', and 'T'. Suppose we need to investigate a mutation from a gene string startGene to a gene string endGene where one mutation is defined as one single character changed in the gene string. For example, "AACCGGTT" --> "AACCGGTA" is one mutation. There is also a gene bank bank that records all the valid gene mutations. A gene must be in bank to make it a valid gene string. Given the two gene strings startGene and endGene and the gene bank bank, return the minimum number of mutations needed to mutate from startGene to endGene. If there is no such a mutation, return -1. Note that the starting point is assumed to be valid, so it might not be included in the bank.   Example 1: Input: startGene = "AACCGGTT", endGene = "AACCGGTA", bank = ["AACCGGTA"] Output: 1 Example 2: Input: startGene = "AACCGGTT", endGene = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"] Output: 2   Constraints: 0 <= bank.length <= 10 startGene.length == endGene.length == bank[i].length == 8 startGene, endGene, and bank[i] consist of only the characters ['A', 'C', 'G', 'T'].
<a href="https://leetcode.com/problems/minimum-genetic-mutation/" target="_blank">https://leetcode.com/problems/minimum-genetic-mutation/</a>`,
            keywords: ["BFS"],
            code: `        # target condition, dict condition
        
        from collections import deque
        
        class Solution:
            def minMutation(self, startGene: str, endGene: str, bank: List[str]) -> int:
                bank = set(bank)
                q = deque()
                q.append(startGene)
                visited = set()
                visited.add(startGene)
        
                cnt = 0
                while q:
                    sz = len(q)
                    for i in range(sz):
                        cur = q.popleft()
                        if cur == endGene:
                            return cnt
                        for ci in range(len(cur)):
                            for c in "ACGT":
                                if c == cur[ci]:
                                    continue
                                nxt = cur[:ci] + c + cur[ci+1:]
                                if nxt in visited:
                                    continue
                                if nxt not in bank:
                                    continue
                                q.append(nxt)
                                visited.add(nxt)
                    cnt += 1
                return -1`,
            language: "python"
        },
        {
            id: 435,
            title: "Non-overlapping Intervals",
            description: `Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping. Note that intervals which only touch at a point are non-overlapping. For example, [1, 2] and [2, 3] are non-overlapping.   Example 1: Input: intervals = [[1,2],[2,3],[3,4],[1,3]] Output: 1 Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping. Example 2: Input: intervals = [[1,2],[1,2],[1,2]] Output: 2 Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping. Example 3: Input: intervals = [[1,2],[2,3]] Output: 0 Explanation: You don't need to remove any of the intervals since they're already non-overlapping.   Constraints: 1 <= intervals.length <= 105 intervals[i].length == 2 -5 * 104 <= starti < endi <= 5 * 104
<a href="https://leetcode.com/problems/non-overlapping-intervals/" target="_blank">https://leetcode.com/problems/non-overlapping-intervals/</a>`,
            keywords: ["Range"],
            code: `        # case 1: one meeting room, as many non-overlapping as possible: sort end+ greedy remove
        
        class Solution:
            def eraseOverlapIntervals(self, intvs: List[List[int]]) -> int:
                n = len(intvs)
                return n - self.intervalSchedule(intvs)
        
            def intervalSchedule(self, intvs: List[List[int]]) -> int:
                if len(intvs) == 0:
                    return 0
                # 按 end 升序排序
                intvs.sort(key=lambda x: x[1])
                # 至少有一个区间不相交
                count = 1
                # 排序后，第一个区间就是 x
                x_end = intvs[0][1]
                for interval in intvs:
                    start = interval[0]
                    if start >= x_end:
                        # 找到下一个选择的区间了
                        count += 1
                        x_end = interval[1]
                return count`,
            language: "python"
        },
        {
            id: 438,
            title: "Find All Anagrams in a String",
            description: `Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.   Example 1: Input: s = "cbaebabacd", p = "abc" Output: [0,6] Explanation: The substring with start index = 0 is "cba", which is an anagram of "abc". The substring with start index = 6 is "bac", which is an anagram of "abc". Example 2: Input: s = "abab", p = "ab" Output: [0,1,2] Explanation: The substring with start index = 0 is "ab", which is an anagram of "ab". The substring with start index = 1 is "ba", which is an anagram of "ab". The substring with start index = 2 is "ab", which is an anagram of "ab".   Constraints: 1 <= s.length, p.length <= 3 * 104 s and p consist of lowercase English letters.
<a href="https://leetcode.com/problems/find-all-anagrams-in-a-string/description/" target="_blank">https://leetcode.com/problems/find-all-anagrams-in-a-string/description/</a>`,
            keywords: ["SlidingWindow"],
            code: `        # just record the index
        
        class Solution:
            def findAnagrams(self, s: str, p: str) -> List[int]:
                needs = {}
                window = {}
                # should use map instead of set, since duplicates are considered
                for c in p:
                    needs[c] = needs.get(c, 0) + 1
                left = 0
                right = 0
        
                res = []
                cnt = 0
                # increase
                while right < len(s):
                    cur_c = s[right]
                    cur_cnt = window.get(cur_c, 0)
                    cur_need = needs.get(cur_c, 0)
                    
                    if cur_need:
                        window[cur_c] = cur_cnt + 1
                        if cur_cnt < cur_need:
                            cnt += 1
                    
                    # decrease
                    while cnt == len(p):
                        # update
                        if right - left + 1 == len(p):
                            res.append(left)
        
                        cur_c = s[left]
                        cur_cnt = window.get(cur_c, 0)
                        cur_need = needs.get(cur_c, 0)
                        left += 1
                        
                        if cur_need:
                            window[cur_c] = cur_cnt - 1
                            if  cur_cnt == cur_need:
                                cnt -= 1
        
                    right += 1
                return res`,
            language: "python"
        },
        {
            id: 445,
            title: "Add Two Numbers II",
            description: `You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list. You may assume the two numbers do not contain any leading zero, except the number 0 itself.   Example 1: Input: l1 = [7,2,4,3], l2 = [5,6,4] Output: [7,8,0,7] Example 2: Input: l1 = [2,4,3], l2 = [5,6,4] Output: [8,0,7] Example 3: Input: l1 = [0], l2 = [0] Output: [0]   Constraints: The number of nodes in each linked list is in the range [1, 100]. 0 <= Node.val <= 9 It is guaranteed that the list represents a number that does not have leading zeros.   Follow up: Could you solve it without reversing the input lists?
<a href="https://leetcode.com/problems/add-two-numbers-ii/" target="_blank">https://leetcode.com/problems/add-two-numbers-ii/</a>`,
            keywords: ["LinkedList", "2ptr"],
            code: `        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, val=0, next=None):
        #         self.val = val
        #         self.next = next
        
        # Option1: reverse linked list below
        # Option2: stacks, careful of reverse insertion in linked list
        
        class Solution:
            def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
                stack1 = []
                stack2 = []
                p = l1
                while p:
                    stack1.append(p.val)
                    p = p.next
                p = l2
                while p:
                    stack2.append(p.val)
                    p = p.next
                
                dummy = ListNode(-1)
                carry = 0
                while stack1 or stack2:
                    cur = carry
                    if stack1:
                        n1 = stack1.pop()
                        cur += n1
                    if stack2:
                        n2 = stack2.pop()
                        cur += n2
                    
                    if cur >= 10:
                        cur -= 10
                        carry = 1
                    else:
                        carry = 0
                    temp = dummy.next
                    dummy.next = ListNode(cur)
                    dummy.next.next = temp
                if carry:
                    temp = dummy.next
                    dummy.next = ListNode(carry)
                    dummy.next.next = temp
                
                return dummy.next
                    `,
            language: "python"
        },
        {
            id: 450,
            title: "Delete Node in a BST",
            description: `Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST. Basically, the deletion can be divided into two stages: Search for a node to remove. If the node is found, delete the node.   Example 1: Input: root = [5,3,6,2,4,null,7], key = 3 Output: [5,4,6,2,null,null,7] Explanation: Given key to delete is 3. So we find the node with value 3 and delete it. One valid answer is [5,4,6,2,null,null,7], shown in the above BST. Please notice that another valid answer is [5,2,6,null,4,null,7] and it's also accepted. Example 2: Input: root = [5,3,6,2,4,null,7], key = 0 Output: [5,3,6,2,4,null,7] Explanation: The tree does not contain a node with value = 0. Example 3: Input: root = [], key = 0 Output: []   Constraints: The number of nodes in the tree is in the range [0, 104]. -105 <= Node.val <= 105 Each node has a unique value. root is a valid binary search tree. -105 <= key <= 105   Follow up: Could you solve it with time complexity O(height of tree)?
<a href="https://leetcode.com/problems/delete-node-in-a-bst/" target="_blank">https://leetcode.com/problems/delete-node-in-a-bst/</a>`,
            keywords: ["BST"],
            code: `        # construct
        # 3 cases, both empty, one empty, both non-empty
        # replace node, instead of replace value.
        # careful about order: 1. right shift the tree, 2. add left 3. return p
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
                if root is None:
                    return root
                if key < root.val:
                    root.left = self.deleteNode(root.left, key)
                    return root
                if root.val < key:
                    root.right = self.deleteNode(root.right, key)
                    return root
                
                # root.val == key
        
                # Can also put right tree as root, and move left tree to left most of right tree.
                if root.left is None:
                    return root.right
                if root.right is None:
                    return root.left
                
                # now both exist
                p = root.right
                while p.left:
                    p = p.left
                # First remove right-left
                # Then make it as right (like a right shift)
                p.right = self.deleteNode(root.right, p.val)
                # Then add left
                p.left = root.left
                # At last return as new root
                return p
        
        # class Solution:
        #     # 定义：在以 root 为根的 BST 中删除值为 key 的节点，返回完成删除后的根节点
        #     def deleteNode(self, root: TreeNode, key: int) -> TreeNode:
        #         if root == None:
        #             return None
        #         if root.val == key:
        #             # 这两个 if 把情况 1 和 2 都正确处理了
        #             if root.left == None:
        #                 return root.right
        #             if root.right == None:
        #                 return root.left
        #             # 处理情况 3
        #             # 获得右子树最小的节点
        #             minNode = self.getMin(root.right)
        #             # 删除右子树最小的节点
        #             root.right = self.deleteNode(root.right, minNode.val)
        #             # 用右子树最小的节点替换 root 节点
        #             minNode.left = root.left
        #             minNode.right = root.right
        #             root = minNode
        #         elif root.val > key:
        #             root.left = self.deleteNode(root.left, key)
        #         elif root.val < key:
        #             root.right = self.deleteNode(root.right, key)
        #         return root
        
        #     def getMin(self, node: TreeNode) -> TreeNode:
        #         # BST 最左边的就是最小的
        #         while node.left != None:
        #             node = node.left
        #         return node`,
            language: "python"
        },
        {
            id: 491,
            title: "Non-decreasing Subsequences",
            description: `Given an integer array nums, return all the different possible non-decreasing subsequences of the given array with at least two elements. You may return the answer in any order.   Example 1: Input: nums = [4,6,7,7] Output: [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]] Example 2: Input: nums = [4,4,3,2,1] Output: [[4,4]]   Constraints: 1 <= nums.length <= 15 -100 <= nums[i] <= 100
<a href="https://leetcode.com/problems/non-decreasing-subsequences/" target="_blank">https://leetcode.com/problems/non-decreasing-subsequences/</a>`,
            keywords: ["DFS", "Backtrack"],
            code: `        # cannot sort, cannot use nums[index] == nums[index-1]
        # use visited to check visited ones
        # check non-decrease
        
        class Solution:
            def findSubsequences(self, nums: List[int]) -> List[List[int]]:
                #nums.sort()
                self.nums = nums
                self.n = len(nums)
        
                self.res = []
                self.track = []
        
                self.backtrack(0)
        
                return self.res
            
            def backtrack(self, i):
                if len(self.track) > 1:
                    self.res.append(self.track.copy())
        
                if i == self.n:
                    return
                
                visited = set()
                for index in range(i, self.n):
                    # if index > i and self.nums[index] == self.nums[index-1]:
                    #     continue
                    # break sort and above into 2:
                    # 1. no repeat
                    # 2. must non-decrease
                    if self.nums[index] in visited:
                        continue
                    if self.track and self.nums[index] < self.track[-1]:
                        continue
        
                    visited.add(self.nums[index])
        
                    self.track.append(self.nums[index])
                    self.backtrack(index+1)
                    self.track.pop()
        
        # class Solution:
        #     def __init__(self):
        #         self.res = []
        #         # 记录回溯的路径
        #         self.track = []
        
        #     def findSubsequences(self, nums: List[int]) -> List[List[int]]:
        #         if len(nums) == 0:
        #             return self.res
        #         self.backtrack(nums, 0)
        #         return self.res
        
        #     # 回溯算法主函数
        #     def backtrack(self, nums: List[int], start: int):
        #         if len(self.track) >= 2:
        #             # 找到一个合法答案
        #             self.res.append(self.track[:])
                
        #         # 用哈希集合防止重复选择相同元素
        #         used = set()
                
        #         # 回溯算法标准框架
        #         for i in range(start, len(nums)):
        #             # 保证集合中元素都是递增顺序
        #             if self.track and self.track[-1] > nums[i]:
        #                 continue
                    
        #             # 保证不要重复使用相同的元素
        #             if nums[i] in used:
        #                 continue
        
        #             # 选择 nums[i]
        #             used.add(nums[i])
        #             self.track.append(nums[i])
                    
        #             # 递归遍历下一层回溯树
        #             self.backtrack(nums, i + 1)
                    
        #             # 撤销选择 nums[i]
        #             self.track.pop()`,
            language: "python"
        },
        {
            id: 496,
            title: "Next Greater Element I",
            description: `The next greater element of some element x in an array is the first greater element that is to the right of x in the same array. You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2. For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, then the answer for this query is -1. Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.   Example 1: Input: nums1 = [4,1,2], nums2 = [1,3,4,2] Output: [-1,3,-1] Explanation: The next greater element for each value of nums1 is as follows: - 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1. - 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3. - 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1. Example 2: Input: nums1 = [2,4], nums2 = [1,2,3,4] Output: [3,-1] Explanation: The next greater element for each value of nums1 is as follows: - 2 is underlined in nums2 = [1,2,3,4]. The next greater element is 3. - 4 is underlined in nums2 = [1,2,3,4]. There is no next greater element, so the answer is -1.   Constraints: 1 <= nums1.length <= nums2.length <= 1000 0 <= nums1[i], nums2[i] <= 104 All integers in nums1 and nums2 are unique. All the integers of nums1 also appear in nums2.   Follow up: Could you find an O(nums1.length + nums2.length) solution?
<a href="https://leetcode.com/problems/next-greater-element-i/" target="_blank">https://leetcode.com/problems/next-greater-element-i/</a>`,
            keywords: ["MonotonicStack"],
            code: `        # keep a ngStack append from back to front
        
        class Solution:
            def nextGreaterElement(self, nums1: List[int], nums2: List[int]) -> List[int]:
                # need to record exact values to recover next greater
                ngStack = []
                n = len(nums2)
                val2ng = {}
                for i in range(n-1, -1, -1):
                    # the values between two largers can be removed
                    # e.g. 3 2 1 2 5 -> 3 5
                    while ngStack and ngStack[-1] <= nums2[i]:
                        ngStack.pop()
                    if ngStack:
                        val2ng[nums2[i]] = ngStack[-1]
                    else:
                        val2ng[nums2[i]] = -1
                    ngStack.append(nums2[i])
                
                res = []
                for i in range(len(nums1)):
                    res.append(val2ng[nums1[i]])
                return res
        
        # class Solution:
        #     def nextGreaterElement(self, nums1: List[int], nums2: List[int]) -> List[int]:
        #         # 记录 nums2 中每个元素的下一个更大元素
        #         greater = self.nextGreaterElementInternal(nums2)
        #         # 转化成映射：元素 x -> x 的下一个最大元素
        #         greater_map = {}
        #         for i in range(len(nums2)):
        #             greater_map[nums2[i]] = greater[i]
        #         # nums1 是 nums2 的子集，所以根据 greaterMap 可以得到结果
        #         res = [greater_map[num] for num in nums1]
        #         return res
        
        #     # 计算 nums 中每个元素的下一个更大元素
        #     def nextGreaterElementInternal(self, nums: List[int]) -> List[int]:
        #         n = len(nums)
        #         # 存放答案的数组
        #         res = [-1] * n  # Initialize with -1 as specified in the problem statement
        #         stack = []
        #         # 倒着往栈里放
        #         for i in range(n - 1, -1, -1):
        #             # 判定个子高矮
        #             while stack and stack[-1] <= nums[i]:
        #                 # 矮个起开，反正也被挡着了。。。
        #                 stack.pop()
        #             # nums[i] 身后的下一个更大元素
        #             res[i] = stack[-1] if stack else -1
        #             stack.append(nums[i])
        #         return res
        
        
        # Ext. 1
        # 本文的模板函数返回的是目标元素的索引（而非元素值本身），因为有了索引就可以获取元素值
        # # 计算 nums 中每个元素的下一个更大元素的索引
        # def nextGreaterElementIndex(nums):
        #     n = len(nums)
        #     # 存放答案的数组
        #     res = [0] * n
        #     # 栈中存放索引
        #     stk = []
        #     # 因为是求 nums[i] 后面的元素，所以倒着往栈里放
        #     for i in range(n - 1, -1, -1):
        #         # 删掉 nums[i] 后面较小的元素
        #         while stk and nums[stk[-1]] <= nums[i]:
        #             stk.pop()
        #         # 现在栈顶就是 nums[i] 身后更大元素的索引
        #         res[i] = -1 if not stk else stk[-1]
        #         stk.append(i)
        #     return res
        
        # Ext. 2
        # # 计算 nums 中每个元素的下一个更大或相等元素的索引
        # def nextGreaterOrEqualElementIndex(nums):
        #     n = len(nums)
        #     res = [0] * n
        #     stk = []
        #     for i in range(n - 1, -1, -1):
        #         # 把这里改成 < 号
        #         while stk and nums[stk[-1]] < nums[i]: # just <= to <
        #             stk.pop()
        #         # 现在栈顶就是 nums[i] 身后大于等于 nums[i] 的元素的索引
        #         res[i] = -1 if not stk else stk[-1]
        #         stk.append(i)
        #     return res
        
        # Ext. 3
        # # 计算 nums 中每个元素的下一个更小元素的索引
        # def nextLessElementIndex(nums):
        #     n = len(nums)
        #     # 存放答案的数组
        #     res = [0] * n
        #     stk = []
        #     # 倒着往栈里放
        #     for i in range(n - 1, -1, -1):
        #         # 删掉 nums[i] 后面较大的元素
        #         while stk and nums[stk[-1]] >= nums[i]: # just <= to >=
        #             stk.pop()
        #         # 现在栈顶就是 nums[i] 身后更小元素的索引
        #         res[i] = -1 if not stk else stk[-1]
        #         stk.append(i)
        #     return res
        
        # Ext. 4
        # # 计算 nums 中每个元素的下一个更小或相等元素的索引
        # def nextLessOrEqualElementIndex(nums):
        #     n = len(nums)
        #     # 存放答案的数组
        #     res = [0] * n
        #     stk = []
        #     # 倒着往栈里放
        #     for i in range(n - 1, -1, -1):
        #         # 删掉 nums[i] 后面较大的元素
        #         while stk and nums[stk[-1]] > nums[i]: # just <= to >
        #             stk.pop()
        #         # 现在栈顶就是 nums[i] 身后更小或相等元素的索引
        #         res[i] = -1 if not stk else stk[-1]
        #         stk.append(i)
        #     return res
        
        # Ext. 5
        # # 计算 nums 中每个元素的上一个更大元素的索引
        # def prevGreaterElementIndex(nums):
        #     n = len(nums)
        #     res = [0] * n
        #     stk = []
        #     # 因为是求 nums[i] 前面的元素，所以正着往栈里放
        #     for i in range(n): # just reverse the order
        #         # 删掉 nums[i] 前面较小的元素
        #         while stk and nums[stk[-1]] <= nums[i]:
        #             stk.pop()
        #         # 现在栈顶就是 nums[i] 前面更大元素的索引
        #         res[i] = -1 if not stk else stk[-1]
        #         stk.append(i)
        #     return res
        
        # Etc.`,
            language: "python"
        },
        {
            id: 503,
            title: "Next Greater Element II",
            description: `Given a circular integer array nums (i.e., the next element of nums[nums.length - 1] is nums[0]), return the next greater number for every element in nums. The next greater number of a number x is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, return -1 for this number.   Example 1: Input: nums = [1,2,1] Output: [2,-1,2] Explanation: The first 1's next greater number is 2; The number 2 can't find next greater number. The second 1's next greater number needs to search circularly, which is also 2. Example 2: Input: nums = [1,2,3,4,3] Output: [2,3,4,-1,4]   Constraints: 1 <= nums.length <= 104 -109 <= nums[i] <= 109
<a href="https://leetcode.com/problems/next-greater-element-ii/" target="_blank">https://leetcode.com/problems/next-greater-element-ii/</a>`,
            keywords: ["MonotonicStack"],
            code: `        # circular should double the array
        
        class Solution:
            def nextGreaterElements(self, nums: List[int]) -> List[int]:
                ngStack = []
                n = len(nums)
                res = [-1 for i in range(n)]
                for i in range(2*n-1, -1, -1):
                    cur = nums[i % n]
                    while ngStack and ngStack[-1] <= cur:
                        ngStack.pop()
                    ans = ngStack[-1] if ngStack else -1
                    ngStack.append(cur)
                    if i < n:
                        res[i] = ans
                
                return res
        
        # class Solution:
        #     def nextGreaterElements(self, nums: List[int]) -> List[int]:
        #         n = len(nums)
        #         res = [0] * n
        #         # 用数组模拟栈
        #         s = []
        #         # 数组长度加倍模拟环形数组
        #         for i in range(2 * n - 1, -1, -1):
        #             # 索引 i 要求模，其他的和模板一样
        #             while s and s[-1] <= nums[i % n]:
        #                 s.pop()
        #             res[i % n] = -1 if not s else s[-1]
        #             s.append(nums[i % n])
        #         return res`,
            language: "python"
        },
        {
            id: 509,
            title: "Fibonacci Number",
            description: `The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is, F(0) = 0, F(1) = 1 F(n) = F(n - 1) + F(n - 2), for n > 1. Given n, calculate F(n).   Example 1: Input: n = 2 Output: 1 Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1. Example 2: Input: n = 3 Output: 2 Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2. Example 3: Input: n = 4 Output: 3 Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.   Constraints: 0 <= n <= 30
<a href="https://leetcode.com/problems/fibonacci-number/description/" target="_blank">https://leetcode.com/problems/fibonacci-number/description/</a>`,
            keywords: ["DP"],
            code: `        class Solution:
            def fib(self, n: int) -> int:
                dp0 = 0
                dp1 = 1
        
                if n == 0:
                    return dp0
                if n == 1:
                    return dp1
        
                for i in range(2, n+1):
                    dp = dp0+dp1
                    dp0 = dp1
                    dp1 = dp
                return dp
        
        # class Solution:
        #     def fib(self, n: int) -> int:
        #         if n == 0 or n == 1:
        #             # base case
        #             return n
        #         # 分别代表 dp[i - 1] 和 dp[i - 2]
        #         dp_i_1 = 1
        #         dp_i_2 = 0
        #         for i in range(2, n + 1):
        #             # dp[i] = dp[i - 1] + dp[i - 2];
        #             dp_i = dp_i_1 + dp_i_2
        #             dp_i_2 = dp_i_1
        #             dp_i_1 = dp_i
        #         return dp_i_1`,
            language: "python"
        },
        {
            id: 515,
            title: "Find Largest Value in Each Tree Row",
            description: `Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).   Example 1: Input: root = [1,3,2,5,3,null,9] Output: [1,3,9] Example 2: Input: root = [1,2,3] Output: [1,3]   Constraints: The number of nodes in the tree will be in the range [0, 104]. -231 <= Node.val <= 231 - 1
<a href="https://leetcode.com/problems/find-largest-value-in-each-tree-row/" target="_blank">https://leetcode.com/problems/find-largest-value-in-each-tree-row/</a>`,
            keywords: ["BT", "BFS"],
            code: `        # BFS or DFS(record depth)
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        from collections import deque
        class Solution:
            def largestValues(self, root: Optional[TreeNode]) -> List[int]:
                res = []
                q = deque()
                if root is None:
                    return res
                q.append(root)
                while q:
                    sz = len(q)
                    m = float('-inf')
                    for i in range(sz):
                        cur = q.popleft()
                        m = max(m, cur.val)
                        if cur.left:
                            q.append(cur.left)
                        if cur.right:
                            q.append(cur.right)
                    res.append(m)
                return res
        # from queue import Queue
        # from typing import List
        
        # class Solution:
        #     def largestValues(self, root: TreeNode) -> List[int]:
        #         res = []
        #         if root is None:
        #             return res
        
        #         q = Queue()
        #         q.put(root)
        #         # while 循环控制从上向下一层层遍历
        #         while not q.empty():
        #             sz = q.qsize()
        #             # 记录这一层的最大值
        #             levelMax = float('-inf')
        #             # for 循环控制每一层从左向右遍历
        #             for _ in range(sz):
        #                 cur = q.get()
        #                 levelMax = max(levelMax, cur.val)
        #                 if cur.left is not None:
        #                     q.put(cur.left)
        #                 if cur.right is not None:
        #                     q.put(cur.right)
        #             res.append(levelMax)
        #         return res
        
        # class Solution_DFS:
        #     # 一定要用 array 存储，因为要用索引随机访问
        #     res = []
        
        #     def largestValues(self, root: TreeNode) -> List[int]:
        #         if root is None:
        #             return self.res
        #         self.traverse(root, 0)
        #         return self.res
        
        #     # 遍历二叉树
        #     def traverse(self, root: TreeNode, depth: int) -> None:
        #         if root is None:
        #             return
        #         if len(self.res) <= depth:
        #             self.res.append(root.val)
        #         else:
        #             # 记录当前行的最大值
        #             self.res[depth] = max(self.res[depth], root.val)
        #         self.traverse(root.left, depth + 1)
        #         self.traverse(root.right, depth + 1)`,
            language: "python"
        },
        {
            id: 518,
            title: "Coin Change II",
            description: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0. You may assume that you have an infinite number of each kind of coin. The answer is guaranteed to fit into a signed 32-bit integer.   Example 1: Input: amount = 5, coins = [1,2,5] Output: 4 Explanation: there are four ways to make up the amount: 5=5 5=2+2+1 5=2+1+1+1 5=1+1+1+1+1 Example 2: Input: amount = 3, coins = [2] Output: 0 Explanation: the amount of 3 cannot be made up just with coins of 2. Example 3: Input: amount = 10, coins = [10] Output: 1   Constraints: 1 <= coins.length <= 300 1 <= coins[i] <= 5000 All the values of coins are unique. 0 <= amount <= 5000
<a href="https://leetcode.com/problems/coin-change-ii/" target="_blank">https://leetcode.com/problems/coin-change-ii/</a>`,
            keywords: ["DP"],
            code: `        # Constrained Space, find optim value / visit / cnt status
        #   Longest SubArray Sum: 1d, each elem length always 1
        #   2 string: 2d
        #   backpack: 2d, pos and weight
        # New flow:
        #   space -> def -> conv -> directions -> init
        
        
        # i, target
        # init: first col is 1, conv: reuse (i, p-x)
        
        class Solution:
            def change(self, amount: int, coins: List[int]) -> int:
                n = len(coins)
                # def: the amount of combinations to reach exact a, when at this pos
                memo = [[0 for i in range(amount+1)] for j in range(n+1)]
                
                # conv:
                # use the new coin
                # i-1, p -> i-1, p
                # use 1, 2, 3 ...: (i-1, p - x), (i-1, p-2x)...
                # no need loop, just use i-1, p and i, p-x
                # init:
                # 0, 0 1
                # 0 , x 1
                # i, 0 1
                memo[0][0]=1
                for i in range(1, n+1):
                    memo[i][0] = 1
                for j in range(1, amount+1):
                    memo[0][j] = 0
                for i in range(1, n+1):
                    for j in range(1, amount+1):
                        cur = coins[i-1]
                        memo[i][j] += memo[i-1][j]
                        if j >= cur:
                            memo[i][j] += memo[i][j-cur]
                return memo[n][amount]
        
        # class Solution:
        #     def change(self, amount: int, coins: List[int]) -> int:
        #         n = len(coins)
        #         dp = [[0] * (amount + 1) for _ in range(n + 1)]
        #         # base case
        #         for i in range(n + 1):
        #             dp[i][0] = 1
        
        #         for i in range(1, n + 1):
        #             for j in range(1, amount + 1):
        #                 if j - coins[i - 1] >= 0:
        #                     dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]]
        #                 else:
        #                     dp[i][j] = dp[i - 1][j]
                            
        #         return dp[n][amount]`,
            language: "python"
        },
        {
            id: 528,
            title: "Random Pick with Weight",
            description: `You are given a 0-indexed array of positive integers w where w[i] describes the weight of the ith index. You need to implement the function pickIndex(), which randomly picks an index in the range [0, w.length - 1] (inclusive) and returns it. The probability of picking an index i is w[i] / sum(w). For example, if w = [1, 3], the probability of picking index 0 is 1 / (1 + 3) = 0.25 (i.e., 25%), and the probability of picking index 1 is 3 / (1 + 3) = 0.75 (i.e., 75%).   Example 1: Input ["Solution","pickIndex"] [[[1]],[]] Output [null,0] Explanation Solution solution = new Solution([1]); solution.pickIndex(); // return 0. The only option is to return 0 since there is only one element in w. Example 2: Input ["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"] [[[1,3]],[],[],[],[],[]] Output [null,1,1,1,1,0] Explanation Solution solution = new Solution([1, 3]); solution.pickIndex(); // return 1. It is returning the second element (index = 1) that has a probability of 3/4. solution.pickIndex(); // return 1 solution.pickIndex(); // return 1 solution.pickIndex(); // return 1 solution.pickIndex(); // return 0. It is returning the first element (index = 0) that has a probability of 1/4. Since this is a randomization problem, multiple answers are allowed. All of the following outputs can be considered correct: [null,1,1,1,1,0] [null,1,1,1,1,1] [null,1,1,1,0,0] [null,1,1,1,0,1] [null,1,0,1,0,0] ...... and so on.   Constraints: 1 <= w.length <= 104 1 <= w[i] <= 105 pickIndex will be called at most 104 times.
<a href="https://leetcode.com/problems/random-pick-with-weight/" target="_blank">https://leetcode.com/problems/random-pick-with-weight/</a>`,
            keywords: ["Math", "PrefixSum", "BS"],
            code: `        # presum + BS
        
        # class Solution:
        
        #     def __init__(self, w: List[int]):
                
        
        #     def pickIndex(self) -> int:
                
        
        
        # Your Solution object will be instantiated and called as such:
        # obj = Solution(w)
        # param_1 = obj.pickIndex()
        
        class Solution:
        
            def __init__(self, w: List[int]):
                n = len(w)
                # 构建前缀和数组，偏移一位留给 preSum[0]
                self.preSum = [0] * (n + 1)
                for i in range(1, n + 1):
                    self.preSum[i] = self.preSum[i - 1] + w[i - 1]
        
            def pickIndex(self) -> int:
                n = len(self.preSum)
                # 生成在闭区间 [1, preSum[n - 1]] 中的随机整数
                target = random.randint(1, self.preSum[n - 1])
                # 获取 target 在前缀和数组 preSum 中的索引
                # 别忘了前缀和数组 preSum 和原始数组 w 有一位索引偏移
                return self.left_bound(self.preSum, target) - 1
        
            def left_bound(self, nums: List[int], target: int) -> int:
                left, right = 0, len(nums)
                while left < right:
                    mid = left + (right - left) // 2
                    if nums[mid] == target:
                        right = mid
                    elif nums[mid] < target:
                        left = mid + 1
                    elif nums[mid] > target:
                        right = mid
                # 搜索左侧边界的二分搜索
                return left`,
            language: "python"
        },
        {
            id: 538,
            title: "Convert BST to Greater Tree",
            description: `Given the root of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus the sum of all keys greater than the original key in BST. As a reminder, a binary search tree is a tree that satisfies these constraints: The left subtree of a node contains only nodes with keys less than the node's key. The right subtree of a node contains only nodes with keys greater than the node's key. Both the left and right subtrees must also be binary search trees.   Example 1: Input: root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8] Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8] Example 2: Input: root = [0,null,1] Output: [1,null,1]   Constraints: The number of nodes in the tree is in the range [0, 104]. -104 <= Node.val <= 104 All the values in the tree are unique. root is guaranteed to be a valid binary search tree.   Note: This question is the same as 1038: <a href="https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/" target="_blank">https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/</a>
<a href="https://leetcode.com/problems/convert-bst-to-greater-tree/" target="_blank">https://leetcode.com/problems/convert-bst-to-greater-tree/</a>`,
            keywords: ["BST"],
            code: `        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        
        # WRONG: right child + right parent + cur is incorrect
        # ignore right child's left child
        # just use global sum
        
        # class Solution:
        #     def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        #         self.helper(root, 0)
        #         return root
        
        #     def helper(self, node, rightParent):
        #         if node is None:
        #             return 0
        #         rightChild = self.helper(node.right, 0)
        #         node.val += (rightChild + rightParent)
        #         self.helper(node.left, node.val)
        #         return node.val
        
        class Solution:
            def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
                self.sum = 0
                self.traverse(root)
                return root
                
            def traverse(self, node):
                if node is None:
                    return
                self.traverse(node.right)
                node.val += self.sum
                self.sum = node.val
                self.traverse(node.left)
        
        # class Solution:
        #         def __init__(self):
        #             # 记录累加和
        #             self.sum = 0
                    
        #         def convertBST(self, root):
        #             self.traverse(root)
        #             return root
        
        #         def traverse(self, root):
        #             if root is None:
        #                 return
        #             self.traverse(root.right)
        #             # 维护累加和
        #             self.sum += root.val
        #             # 将 BST 转化成累加树
        #             root.val = self.sum
        #             self.traverse(root.left)`,
            language: "python"
        },
        {
            id: 543,
            title: "Diameter of Binary Tree",
            description: `Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root. The length of a path between two nodes is represented by the number of edges between them.   Example 1: Input: root = [1,2,3,4,5] Output: 3 Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3]. Example 2: Input: root = [1,2] Output: 1   Constraints: The number of nodes in the tree is in the range [1, 104]. -100 <= Node.val <= 100
<a href="https://leetcode.com/problems/diameter-of-binary-tree/description/" target="_blank">https://leetcode.com/problems/diameter-of-binary-tree/description/</a>`,
            keywords: ["BT"],
            code: `        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
                return self.helper(root)[1]
        
            def helper(self, node):
                if  node is None:
                    return 0, 0 # max child, res
                l, r1 = self.helper(node.left)
                r, r2 = self.helper(node.right)
                m = max(l, r) + 1
                res = max(l + r, r1)
                res = max(res, r2)
                return m, res
        
        # class Solution:
        #     def __init__(self):
        #         # 记录最大直径的长度
        #         self.maxDiameter = 0
        
        #     def diameterOfBinaryTree(self, root):
        #         self.maxDepth(root)
        #         return self.maxDiameter
        
        #     def maxDepth(self, root):
        #         if root is None:
        #             return 0
        #         leftMax = self.maxDepth(root.left)
        #         rightMax = self.maxDepth(root.right)
        #         # 后序位置，顺便计算最大直径
        #         myDiameter = leftMax + rightMax
        #         self.maxDiameter = max(self.maxDiameter, myDiameter)
        
        #         return 1 + max(leftMax, rightMax)`,
            language: "python"
        },
        {
            id: 567,
            title: "Permutation in String",
            description: `Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise. In other words, return true if one of s1's permutations is the substring of s2.   Example 1: Input: s1 = "ab", s2 = "eidbaooo" Output: true Explanation: s2 contains one permutation of s1 ("ba"). Example 2: Input: s1 = "ab", s2 = "eidboaoo" Output: false   Constraints: 1 <= s1.length, s2.length <= 104 s1 and s2 consist of lowercase English letters.
<a href="https://leetcode.com/problems/permutation-in-string/" target="_blank">https://leetcode.com/problems/permutation-in-string/</a>`,
            keywords: ["SlidingWindow"],
            code: `        # still need cnt
        # but no need keep result
        
        class Solution:
            def checkInclusion(self, s1: str, s2: str) -> bool:
                needs = {}
                window = {}
                # should use map instead of set, since duplicates are considered
                for c in s1:
                    needs[c] = needs.get(c, 0) + 1
                left = 0
                right = 0
        
                cnt = 0
                # increase
                while right < len(s2):
                    cur_c = s2[right]
                    cur_cnt = window.get(cur_c, 0)
                    cur_need = needs.get(cur_c, 0)
                    
                    if cur_need:
                        window[cur_c] = cur_cnt + 1
                        if cur_cnt < cur_need:
                            cnt += 1
                    
                    # decrease
                    while cnt == len(s1):
                        # update
                        if right - left + 1 == len(s1):
                            return True
        
                        cur_c = s2[left]
                        cur_cnt = window.get(cur_c, 0)
                        cur_need = needs.get(cur_c, 0)
                        left += 1
                        
                        if cur_need:
                            window[cur_c] = cur_cnt - 1
                            if  cur_cnt == cur_need:
                                cnt -= 1
        
                    right += 1
                return False`,
            language: "python"
        },
        {
            id: 581,
            title: "Shortest Unsorted Continuous Subarray",
            description: `Given an integer array nums, you need to find one continuous subarray such that if you only sort this subarray in non-decreasing order, then the whole array will be sorted in non-decreasing order. Return the shortest such subarray and output its length.   Example 1: Input: nums = [2,6,4,8,10,9,15] Output: 5 Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order. Example 2: Input: nums = [1,2,3,4] Output: 0 Example 3: Input: nums = [1] Output: 0   Constraints: 1 <= nums.length <= 104 -105 <= nums[i] <= 105   Follow up: Can you solve it in O(n) time complexity?
<a href="https://leetcode.com/problems/shortest-unsorted-continuous-subarray/" target="_blank">https://leetcode.com/problems/shortest-unsorted-continuous-subarray/</a>`,
            keywords: ["MonotonicStack"],
            code: `        # min/max during pop: all vals to the left/right is smaller/greater
        
        class Solution:
            def findUnsortedSubarray(self, nums: List[int]) -> int:
                n = len(nums)
        
                ple = []
                left = n
                # left is that all vals to the right is ge it.
                for i in range(n):
                    while ple and nums[ple[-1]] > nums[i]:
                        index = ple.pop()
                        left = min(left, index)
                    ple.append(i)
        
                nge = []
                right = 0
                # left is that all vals to the right is ge it.
                for i in range(n-1, -1, -1):
                    while nge and nums[nge[-1]] < nums[i]:
                        index = nge.pop()
                        right = max(right, index)
                    nge.append(i)
                
                return right - left + 1 if right > left else 0
        
        # # 排序解法
        # class Solution:
        #     def findUnsortedSubarray(self, nums: List[int]) -> int:
        #         temp = sorted(nums)
        #         left = float('inf')
        #         right = float('-inf')
        #         for i in range(len(nums)):
        #             if temp[i] != nums[i]:
        #                 left = i
        #                 break
        #         for i in range(len(nums) - 1, -1, -1):
        #             if temp[i] != nums[i]:
        #                 right = i
        #                 break
        #         if left == float('inf') and right == float('-inf'):
        #             # nums 本来就是有序的
        #             return 0
        #         return right - left + 1
        
        # # 单调栈解法
        # class Solution2:
        #     def findUnsortedSubarray(self, nums: List[int]) -> int:
        #         n = len(nums)
        #         left = float('inf')
        #         right = float('-inf')
        #         # 递增栈，存储元素索引
        #         incr_stk = []
        #         for i in range(n):
        #             while incr_stk and nums[incr_stk[-1]] > nums[i]:
        #                 # 弹出的元素都是乱序元素，其中最小的索引就是乱序子数组的左边界
        #                 left = min(left, incr_stk.pop())
        #             incr_stk.append(i)
        #         # 递减栈，存储元素索引
        #         decr_stk = []
        #         for i in range(n - 1, -1, -1):
        #             while decr_stk and nums[decr_stk[-1]] < nums[i]:
        #                 # 弹出的元素都是乱序元素，其中最大的索引就是乱序子数组的右边界
        #                 right = max(right, decr_stk.pop())
        #             decr_stk.append(i)
        #         if left == float('inf') and right == float('-inf'):
        #             # 说明单调栈没有弹出任何元素，即 nums 本来就是有序的
        #             return 0
        #         return right - left + 1`,
            language: "python"
        },
        {
            id: 583,
            title: "Delete Operation for Two Strings",
            description: `Given two strings word1 and word2, return the minimum number of steps required to make word1 and word2 the same. In one step, you can delete exactly one character in either string.   Example 1: Input: word1 = "sea", word2 = "eat" Output: 2 Explanation: You need one step to make "sea" to "ea" and another step to make "eat" to "ea". Example 2: Input: word1 = "leetcode", word2 = "etco" Output: 4   Constraints: 1 <= word1.length, word2.length <= 500 word1 and word2 consist of only lowercase English letters.
<a href="https://leetcode.com/problems/delete-operation-for-two-strings/description/" target="_blank">https://leetcode.com/problems/delete-operation-for-two-strings/description/</a>`,
            keywords: ["DP", "LCS"],
            code: `        class Solution:
            def minDistance(self, word1: str, word2: str) -> int:
                m = len(word1)
                n = len(word2)
                memo = [[float('inf') for j in range(n+1)] for i in range(m+1)]
                for i in range(0, m+1):
                    memo[i][0] = i
                for j in range(0, n+1):
                    memo[0][j] = j
        
                for i in range(1, m+1):
                    for j in range(1, n+1):
                        if word1[i-1] == word2[j-1]:
                            memo[i][j] = min(memo[i][j], memo[i-1][j-1])
                        memo[i][j] = min(memo[i][j], memo[i][j-1]+1)
                        memo[i][j] = min(memo[i][j], memo[i-1][j]+1)
                
                return memo[m][n]
        # class Solution:
        #     def minDistance(self, s1: str, s2: str) -> int:
        #         m, n = len(s1), len(s2)
        #         # 复用前文计算 lcs 长度的函数
        #         lcs = self.longestCommonSubsequence(s1, s2)
        #         return m - lcs + n - lcs
        
        #     # 计算最长公共子序列的长度
        #     def longestCommonSubsequence(self, s1: str, s2: str) -> int:
        #         m, n = len(s1), len(s2)
        #         # 定义：s1[0..i-1] 和 s2[0..j-1] 的 lcs 长度为 dp[i][j]
        #         dp = [[0] * (n + 1) for _ in range(m + 1)]
        
        #         for i in range(1, m + 1):
        #             for j in range(1, n + 1):
        #                 # 现在 i 和 j 从 1 开始，所以要减一
        #                 if s1[i - 1] == s2[j - 1]:
        #                     # s1[i-1] 和 s2[j-1] 必然在 lcs 中
        #                     dp[i][j] = 1 + dp[i - 1][j - 1]
        #                 else:
        #                     # s1[i-1] 和 s2[j-1] 至少有一个不在 lcs 中
        #                     dp[i][j] = max(dp[i][j - 1], dp[i - 1][j])
        #         return dp[m][n]`,
            language: "python"
        },
        {
            id: 622,
            title: "Design Circular Queue",
            description: `Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle, and the last position is connected back to the first position to make a circle. It is also called "Ring Buffer". One of the benefits of the circular queue is that we can make use of the spaces in front of the queue. In a normal queue, once the queue becomes full, we cannot insert the next element even if there is a space in front of the queue. But using the circular queue, we can use the space to store new values. Implement the MyCircularQueue class: MyCircularQueue(k) Initializes the object with the size of the queue to be k. int Front() Gets the front item from the queue. If the queue is empty, return -1. int Rear() Gets the last item from the queue. If the queue is empty, return -1. boolean enQueue(int value) Inserts an element into the circular queue. Return true if the operation is successful. boolean deQueue() Deletes an element from the circular queue. Return true if the operation is successful. boolean isEmpty() Checks whether the circular queue is empty or not. boolean isFull() Checks whether the circular queue is full or not. You must solve the problem without using the built-in queue data structure in your programming language.    Example 1: Input ["MyCircularQueue", "enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"] [[3], [1], [2], [3], [4], [], [], [], [4], []] Output [null, true, true, true, false, 3, true, true, true, 4] Explanation MyCircularQueue myCircularQueue = new MyCircularQueue(3); myCircularQueue.enQueue(1); // return True myCircularQueue.enQueue(2); // return True myCircularQueue.enQueue(3); // return True myCircularQueue.enQueue(4); // return False myCircularQueue.Rear(); // return 3 myCircularQueue.isFull(); // return True myCircularQueue.deQueue(); // return True myCircularQueue.enQueue(4); // return True myCircularQueue.Rear(); // return 4   Constraints: 1 <= k <= 1000 0 <= value <= 1000 At most 3000 calls will be made to enQueue, deQueue, Front, Rear, isEmpty, and isFull.
<a href="https://leetcode.com/problems/design-circular-queue/" target="_blank">https://leetcode.com/problems/design-circular-queue/</a>`,
            keywords: ["Queue"],
            code: `        class MyCircularQueue:
        
            def __init__(self, k: int):
                self.arr = [None] * k
                self.k = k
                self.size = 0
                self.left = 0
                self.right = 0
        
            def enQueue(self, value: int) -> bool:
                if self.size == self.k:
                    return False
                self.arr[self.right] = value
                self.right = (self.right + 1) % self.k
                self.size += 1
                return True
        
            def deQueue(self) -> bool:
                if self.size == 0:
                    return False
                self.left = (self.left + 1) % self.k
                self.size -= 1
                return True
        
            def Front(self) -> int:
                if self.size > 0:
                    return self.arr[self.left]
                return -1
        
            def Rear(self) -> int:
                if self.size > 0:
                    return self.arr[(self.right - 1) % self.k]
                return -1
                
        
            def isEmpty(self) -> bool:
                return self.size == 0
        
            def isFull(self) -> bool:
                return self.size == self.k
        
        
        # Your MyCircularQueue object will be instantiated and called as such:
        # obj = MyCircularQueue(k)
        # param_1 = obj.enQueue(value)
        # param_2 = obj.deQueue()
        # param_3 = obj.Front()
        # param_4 = obj.Rear()
        # param_5 = obj.isEmpty()
        # param_6 = obj.isFull()`,
            language: "python"
        },
        {
            id: 637,
            title: "Average of Levels in Binary Tree",
            description: `Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10-5 of the actual answer will be accepted.   Example 1: Input: root = [3,9,20,null,null,15,7] Output: [3.00000,14.50000,11.00000] Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11. Hence return [3, 14.5, 11]. Example 2: Input: root = [3,9,20,15,7] Output: [3.00000,14.50000,11.00000]   Constraints: The number of nodes in the tree is in the range [1, 104]. -231 <= Node.val <= 231 - 1
<a href="https://leetcode.com/problems/average-of-levels-in-binary-tree/" target="_blank">https://leetcode.com/problems/average-of-levels-in-binary-tree/</a>`,
            keywords: ["BT", "BFS"],
            code: `        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        
        from collections import deque
        class Solution:
            def averageOfLevels(self, root: Optional[TreeNode]) -> List[float]:
                q = deque()
                res = []
        
                if root is None:
                    return res
                q.append(root)
        
                while q:
                    sz = len(q)
                    arr = []
                    for i in range(sz):
                        cur = q.popleft()
                        arr.append(cur.val)
                        if cur.left:
                            q.append(cur.left)
                        if cur.right:
                            q.append(cur.right)
                    res.append(sum(arr)/len(arr))
                return res
        
        # from collections import deque
        # from typing import List
        
        # class Solution:
        #     def averageOfLevels(self, root: TreeNode) -> List[float]:
        #         res = []
        #         if root is None:
        #             return res
        
        #         q = deque([root])
        #         while q:
        #             size = len(q)
        #             # 记录当前层所有节点之和
        #             sum = 0
        #             for _ in range(size):
        #                 cur = q.popleft()
        #                 if cur.left is not None:
        #                     q.append(cur.left)
        #                 if cur.right is not None:
        #                     q.append(cur.right)
        #                 sum += cur.val
        #             # 记录当前行的平均值
        #             res.append(sum / size)
        
        #         return res`,
            language: "python"
        },
        {
            id: 641,
            title: "Design Circular Deque",
            description: `Design your implementation of the circular double-ended queue (deque). Implement the MyCircularDeque class: MyCircularDeque(int k) Initializes the deque with a maximum size of k. boolean insertFront() Adds an item at the front of Deque. Returns true if the operation is successful, or false otherwise. boolean insertLast() Adds an item at the rear of Deque. Returns true if the operation is successful, or false otherwise. boolean deleteFront() Deletes an item from the front of Deque. Returns true if the operation is successful, or false otherwise. boolean deleteLast() Deletes an item from the rear of Deque. Returns true if the operation is successful, or false otherwise. int getFront() Returns the front item from the Deque. Returns -1 if the deque is empty. int getRear() Returns the last item from Deque. Returns -1 if the deque is empty. boolean isEmpty() Returns true if the deque is empty, or false otherwise. boolean isFull() Returns true if the deque is full, or false otherwise.   Example 1: Input ["MyCircularDeque", "insertLast", "insertLast", "insertFront", "insertFront", "getRear", "isFull", "deleteLast", "insertFront", "getFront"] [[3], [1], [2], [3], [4], [], [], [], [4], []] Output [null, true, true, true, false, 2, true, true, true, 4] Explanation MyCircularDeque myCircularDeque = new MyCircularDeque(3); myCircularDeque.insertLast(1); // return True myCircularDeque.insertLast(2); // return True myCircularDeque.insertFront(3); // return True myCircularDeque.insertFront(4); // return False, the queue is full. myCircularDeque.getRear(); // return 2 myCircularDeque.isFull(); // return True myCircularDeque.deleteLast(); // return True myCircularDeque.insertFront(4); // return True myCircularDeque.getFront(); // return 4   Constraints: 1 <= k <= 1000 0 <= value <= 1000 At most 2000 calls will be made to insertFront, insertLast, deleteFront, deleteLast, getFront, getRear, isEmpty, isFull.
<a href="https://leetcode.com/problems/design-circular-deque/description/" target="_blank">https://leetcode.com/problems/design-circular-deque/description/</a>`,
            keywords: ["Queue"],
            code: `        class MyCircularDeque:
        
            def __init__(self, k: int):
                self.arr = [None] * k
                self.k = k
                self.size = 0
                self.left = 0
                self.right = 0
        
            def insertFront(self, value: int) -> bool:
                if self.size == self.k:
                    return False
                self.left = (self.left - 1) % self.k
                self.arr[self.left] = value
                self.size += 1
                return True
        
            def insertLast(self, value: int) -> bool:
                if self.size == self.k:
                    return False
                self.arr[self.right] = value
                self.right = (self.right + 1) % self.k
                self.size += 1
                return True
        
            def deleteFront(self) -> bool:
                if self.size == 0:
                    return False
                self.left = (self.left + 1) % self.k
                self.size -= 1
                return True
        
            def deleteLast(self) -> bool:
                if self.size == 0:
                    return False
                self.right = (self.right - 1) % self.k
                self.size -= 1
                return True
        
            def getFront(self) -> int:
                if self.size > 0:
                    return self.arr[self.left]
                return -1
        
            def getRear(self) -> int:
                if self.size > 0:
                    return self.arr[(self.right - 1) % self.k]
                return -1
        
            def isEmpty(self) -> bool:
                return self.size == 0
        
            def isFull(self) -> bool:
                return self.size == self.k
        
        
        
        # Your MyCircularDeque object will be instantiated and called as such:
        # obj = MyCircularDeque(k)
        # param_1 = obj.insertFront(value)
        # param_2 = obj.insertLast(value)
        # param_3 = obj.deleteFront()
        # param_4 = obj.deleteLast()
        # param_5 = obj.getFront()
        # param_6 = obj.getRear()
        # param_7 = obj.isEmpty()
        # param_8 = obj.isFull()`,
            language: "python"
        },
        {
            id: 654,
            title: "Maximum Binary Tree",
            description: `You are given an integer array nums with no duplicates. A maximum binary tree can be built recursively from nums using the following algorithm: Create a root node whose value is the maximum value in nums. Recursively build the left subtree on the subarray prefix to the left of the maximum value. Recursively build the right subtree on the subarray suffix to the right of the maximum value. Return the maximum binary tree built from nums.   Example 1: Input: nums = [3,2,1,6,0,5] Output: [6,3,5,null,2,0,null,null,1] Explanation: The recursive calls are as follow: - The largest value in [3,2,1,6,0,5] is 6. Left prefix is [3,2,1] and right suffix is [0,5]. - The largest value in [3,2,1] is 3. Left prefix is [] and right suffix is [2,1]. - Empty array, so no child. - The largest value in [2,1] is 2. Left prefix is [] and right suffix is [1]. - Empty array, so no child. - Only one element, so child is a node with value 1. - The largest value in [0,5] is 5. Left prefix is [0] and right suffix is []. - Only one element, so child is a node with value 0. - Empty array, so no child. Example 2: Input: nums = [3,2,1] Output: [3,null,2,null,1]   Constraints: 1 <= nums.length <= 1000 0 <= nums[i] <= 1000 All integers in nums are unique.
<a href="https://leetcode.com/problems/maximum-binary-tree/" target="_blank">https://leetcode.com/problems/maximum-binary-tree/</a>`,
            keywords: ["BT", "BTConstruct"],
            code: `        # build start, end (rootIndex)
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        
        class Solution:
            def constructMaximumBinaryTree(self, nums: List[int]) -> Optional[TreeNode]:
                self.nums = nums
                return self.build(0, len(nums))
        
            def build(self, start, end):
                if start >= end:
                    return None
        
                m = max(self.nums[start : end])
                rootIndex = self.nums[start:end].index(m)
        
                node = TreeNode(m)
                left = self.build(start, start + rootIndex)
                right = self.build(start + rootIndex + 1, end)
                node.left = left
                node.right = right
                return node
        
        # class Solution:
        #     def constructMaximumBinaryTree(self, nums: List[int]) -> Optional[TreeNode]:
        #         n = len(nums)
        
        #         if n == 0:
        #             return None
        
        #         rootIndex = 0
        #         m = float('-inf')
                
        #         for i in range(n):
        #             if nums[i] > m:
        #                 rootIndex = i
        #                 m = nums[i]
        #         leftRange = (0, rootIndex)
        #         rightRange = (rootIndex + 1, n)
        
        #         node = TreeNode(m)
        #         left = self.constructMaximumBinaryTree(nums[leftRange[0]:leftRange[1]])
        #         right = self.constructMaximumBinaryTree(nums[rightRange[0]:rightRange[1]])
        #         node.left = left
        #         node.right = right
        
        #         return node
        
        # class Solution:
        #     def constructMaximumBinaryTree(self, nums: List[int]) -> TreeNode:
        #         return self.build(nums, 0, len(nums) - 1)
        
        #     # 定义：将 nums[lo..hi] 构造成符合条件的树，返回根节点
        #     def build(self, nums: List[int], lo: int, hi: int) -> TreeNode:
        #         # base case
        #         if lo > hi:
        #             return None
        
        #         # 找到数组中的最大值和对应的索引
        #         index = -1
        #         maxVal = float('-inf')
        #         for i in range(lo, hi + 1):
        #             if maxVal < nums[i]:
        #                 index = i
        #                 maxVal = nums[i]
        
        #         # 先构造出根节点
        #         root = TreeNode(maxVal)
        #         # 递归调用构造左右子树
        #         root.left = self.build(nums, lo, index - 1)
        #         root.right = self.build(nums, index + 1, hi)
                
        #         return root`,
            language: "python"
        },
        {
            id: 662,
            title: "Maximum Width of Binary Tree",
            description: `Given the root of a binary tree, return the maximum width of the given tree. The maximum width of a tree is the maximum width among all levels. The width of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes that would be present in a complete binary tree extending down to that level are also counted into the length calculation. It is guaranteed that the answer will in the range of a 32-bit signed integer.   Example 1: Input: root = [1,3,2,5,3,null,9] Output: 4 Explanation: The maximum width exists in the third level with length 4 (5,3,null,9). Example 2: Input: root = [1,3,2,5,null,null,9,6,null,7] Output: 7 Explanation: The maximum width exists in the fourth level with length 7 (6,null,null,null,null,null,7). Example 3: Input: root = [1,3,2,5] Output: 2 Explanation: The maximum width exists in the second level with length 2 (3,2).   Constraints: The number of nodes in the tree is in the range [1, 3000]. -100 <= Node.val <= 100
<a href="https://leetcode.com/problems/maximum-width-of-binary-tree/" target="_blank">https://leetcode.com/problems/maximum-width-of-binary-tree/</a>`,
            keywords: ["BT", "BFS"],
            code: `        # ID: left 2x, right 2x+1
        # DFS: record leftMostIds with depth as index
        # BFS: just end - start + 1
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        
        from collections import deque
        class Solution:
            def widthOfBinaryTree(self, root: Optional[TreeNode]) -> int:
                q = deque()
                if root is None:
                    return root
                res = 0
                q.append((root, 1))
                while q:
                    sz = len(q)
                    for i in range(sz):
                        cur, idx = q.popleft()
                        if i == 0:
                            start = idx
                        if i == sz - 1:
                            end = idx
                            res = max(res, end-start+1)
                        if cur.left:
                            q.append((cur.left, idx * 2))
                        if cur.right:
                            q.append((cur.right, idx * 2 + 1))
                
                return res
        
        # # 层序遍历思路
        # class Solution:
        #     # 记录节点和对应编号
        #     class Pair:
        #         def __init__(self, node, id):
        #             self.node = node
        #             self.id = id
        
        #     def widthOfBinaryTree(self, root):
        #         if root is None:
        #             return 0
        #         # 记录最大的宽度
        #         maxWidth = 0
        #         # 标准 BFS 层序遍历算法
        #         q = collections.deque()
        #         q.append(self.Pair(root, 1))
        #         # 从上到下遍历整棵树
        #         while q:
        #             sz = len(q)
        #             start = 0
        #             end = 0
        #             # 从左到右遍历每一行
        #             for i in range(sz):
        #                 cur = q.popleft()
        #                 curNode = cur.node
        #                 curId = cur.id
        #                 # 记录当前行第一个和最后一个节点的编号
        #                 if i == 0:
        #                     start = curId
        #                 if i == sz - 1:
        #                     end = curId
        #                 # 左右子节点入队，同时记录对应节点的编号
        #                 if curNode.left is not None:
        #                     q.append(self.Pair(curNode.left, curId * 2))
        #                 if curNode.right is not None:
        #                     q.append(self.Pair(curNode.right, curId * 2 + 1))
        #             # 用当前行的宽度更新最大宽度
        #             maxWidth = max(maxWidth, end - start + 1)
        
        #         return maxWidth
        
        # # 递归遍历思路
        # class Solution2:
        #     def widthOfBinaryTree(self, root):
        #         if root is None:
        #             return 0
        #         self.firstId = []
        #         self.maxWidth = 1
        #         self.traverse(root, 1, 1)
        #         return self.maxWidth
        
        #     # 记录最左侧节点的编号
        #     firstId = []
        #     maxWidth = 1
        
        #     # 二叉树遍历函数
        #     def traverse(self, root, id, depth):
        #         if root is None:
        #             return
        
        #         if len(self.firstId) == depth - 1:
        #             # 因为代码是先 traverse(root.left) 后 traverse(root.right)，
        #             # 所以第一次到达这个深度一定是最左侧的节点，记录其编号
        #             self.firstId.append(id)
        #         else:
        #             # 这个深度的其他节点，负责计算更新当前深度的最大宽度
        #             self.maxWidth = max(self.maxWidth, id - self.firstId[depth - 1] + 1)
        
        #         self.traverse(root.left, id * 2, depth + 1)
        #         self.traverse(root.right, id * 2 + 1, depth + 1)        `,
            language: "python"
        },
        {
            id: 694,
            title: "不同的岛屿数量",
            description: `其中有四个岛屿，但是左下角和右上角的岛屿形状相同，所以不同的岛屿共有三个，算法返回 3。

很显然我们得想办法把二维矩阵中的「岛屿」进行转化，变成比如字符串这样的类型，然后利用 HashSet 这样的数据结构去重，最终得到不同的岛屿的个数。
<a href="https://leetcode.com/problems/number-of-distinct-islands/" target="_blank">https://leetcode.com/problems/number-of-distinct-islands/</a>`,
            keywords: ["DFS", "Backtrack", "Islands"],
            code: `        # serialize: must include the forward and backward (1, -1, 2, -2) is different from (1, 2, -1, -2)
        # use a set to record
        
        class Solution:
            def numDistinctIslands(self, grid: List[List[int]]) -> int:
                m, n = len(grid), len(grid[0])
                # 记录所有岛屿的序列化结果
                islands = set()
                for i in range(m):
                    for j in range(n):
                        if grid[i][j] == 1:
                            # 淹掉这个岛屿，同时存储岛屿的序列化结果
                            sb = []
                            # 初始的方向可以随便写，不影响正确性
                            dfs(grid, i, j, sb, 666)
                            islands.add(''.join(sb))
                # 不相同的岛屿数量
                return len(islands)
            
            def dfs(self, grid: List[List[int]], i: int, j: int, sb: StringBuilder, dir: int):
              # 获取数组行列数信息
              m, n = len(grid), len(grid[0])
              # 边界条件，如果越界或者为0，退出
              if i < 0 or j < 0 or i >= m or j >= n or grid[i][j] == 0:
                return
              # 标记当前节点已经被搜索过
              grid[i][j] = 0
              sb.append(dir).append(',')
            
              # 搜索相邻节点
              dfs(grid, i - 1, j, sb, 1)
              dfs(grid, i + 1, j, sb, 2)
              dfs(grid, i, j - 1, sb, 3)
              dfs(grid, i, j + 1, sb, 4)
            
              # 后序遍历位置：离开 (i, j)
              sb.append(-dir).append(',')`,
            language: "python"
        },
        {
            id: 695,
            title: "Max Area of Island",
            description: `You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water. The area of an island is the number of cells with a value 1 in the island. Return the maximum area of an island in grid. If there is no island, return 0.   Example 1: Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]] Output: 6 Explanation: The answer is not 11, because the island must be connected 4-directionally. Example 2: Input: grid = [[0,0,0,0,0,0,0,0]] Output: 0   Constraints: m == grid.length n == grid[i].length 1 <= m, n <= 50 grid[i][j] is either 0 or 1.
<a href="https://leetcode.com/problems/max-area-of-island/" target="_blank">https://leetcode.com/problems/max-area-of-island/</a>`,
            keywords: ["DFS", "Backtrack", "Islands"],
            code: `        # max num cells: return cnt
        
        class Solution:
            def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
                self.grid = grid
                self.m = len(grid)
                self.n = len(grid[0])
        
                res = 0
                for i in range(self.m):
                    for j in range(self.n):
                        if self.grid[i][j] == 1:
                            cur = self.dfs(i, j)
                            res = max(cur, res)
                return res
        
            def dfs(self, i, j):
                if i< 0 or i>=self.m or j<0 or j>=self.n:
                    return 0
                if self.grid[i][j] == 0:
                    return 0
                
                self.grid[i][j] = 0
                
                cnt = 1
                for di, dj in ((0, 1), (0, -1), (1, 0), (-1, 0)):
                    cnt += self.dfs(i+di, j+dj)
                return cnt
        # class Solution:
        #     def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        #         # 记录岛屿的最大面积
        #         res = 0
        #         m, n = len(grid), len(grid[0])
        #         for i in range(m):
        #             for j in range(n):
        #                 if grid[i][j] == 1:
        #                     # 淹没岛屿，并更新最大岛屿面积
        #                     res = max(res, self.dfs(grid, i, j))
        #         return res
        
        #     # 淹没与 (i, j) 相邻的陆地，并返回淹没的陆地面积
        #     def dfs(self, grid, i, j):
        #         m, n = len(grid), len(grid[0])
        #         if i < 0 or j < 0 or i >= m or j >= n:
        #             # 超出索引边界
        #             return 0
        #         if grid[i][j] == 0:
        #             # 已经是海水了
        #             return 0
        #         # 将 (i, j) 变成海水
        #         grid[i][j] = 0
        
        #         return self.dfs(grid, i + 1, j) \
        #              + self.dfs(grid, i, j + 1) \
        #              + self.dfs(grid, i - 1, j) \
        #              + self.dfs(grid, i, j - 1) + 1`,
            language: "python"
        },
        {
            id: 700,
            title: "Search in a Binary Search Tree",
            description: `You are given the root of a binary search tree (BST) and an integer val. Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.   Example 1: Input: root = [4,2,7,1,3], val = 2 Output: [2,1,3] Example 2: Input: root = [4,2,7,1,3], val = 5 Output: []   Constraints: The number of nodes in the tree is in the range [1, 5000]. 1 <= Node.val <= 107 root is a binary search tree. 1 <= val <= 107
<a href="https://leetcode.com/problems/search-in-a-binary-search-tree/" target="_blank">https://leetcode.com/problems/search-in-a-binary-search-tree/</a>`,
            keywords: ["BST"],
            code: `        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
                if root is None:
                    return root
                if root.val == val:
                    return root
                if root.val < val:
                    return self.searchBST(root.right, val)
                if root.val > val:
                    return self.searchBST(root.left, val)
        # # 定义：在以 root 为根的 BST 中插入 val 节点，返回插入后的根节点
        # class Solution:
        #     def insertIntoBST(self, root: TreeNode, val: int) -> TreeNode:
        #         if not root:
        #             # 找到空位置插入新节点
        #             return TreeNode(val)
        #         # 去右子树找插入位置
        #         if root.val < val:
        #             root.right = self.insertIntoBST(root.right, val)
        #         # 去左子树找插入位置
        #         if root.val > val:
        #             root.left = self.insertIntoBST(root.left, val)
        #         # 返回 root，上层递归会接收返回值作为子节点
        #         return root`,
            language: "python"
        },
        {
            id: 701,
            title: "Insert into a Binary Search Tree",
            description: `You are given the root node of a binary search tree (BST) and a value to insert into the tree. Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST. Notice that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return any of them.   Example 1: Input: root = [4,2,7,1,3], val = 5 Output: [4,2,7,1,3,5] Explanation: Another accepted tree is: Example 2: Input: root = [40,20,60,10,30,50,70], val = 25 Output: [40,20,60,10,30,50,70,null,null,25] Example 3: Input: root = [4,2,7,1,3,null,null,null,null,null,null], val = 5 Output: [4,2,7,1,3,5]   Constraints: The number of nodes in the tree will be in the range [0, 104]. -108 <= Node.val <= 108 All the values Node.val are unique. -108 <= val <= 108 It's guaranteed that val does not exist in the original BST.
<a href="https://leetcode.com/problems/insert-into-a-binary-search-tree/description/" target="_blank">https://leetcode.com/problems/insert-into-a-binary-search-tree/description/</a>`,
            keywords: ["BST"],
            code: `        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def insertIntoBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
                if root is None:
                    return TreeNode(val)
                
                if val < root.val:
                    root.left = self.insertIntoBST(root.left, val)
                
                if root.val < val:
                    root.right = self.insertIntoBST(root.right, val)
                return root
                
        # # 定义：在以 root 为根的 BST 中插入 val 节点，返回插入后的根节点
        # class Solution:
        #     def insertIntoBST(self, root: TreeNode, val: int) -> TreeNode:
        #         if not root:
        #             # 找到空位置插入新节点
        #             return TreeNode(val)
        #         # 去右子树找插入位置
        #         if root.val < val:
        #             root.right = self.insertIntoBST(root.right, val)
        #         # 去左子树找插入位置
        #         if root.val > val:
        #             root.left = self.insertIntoBST(root.left, val)
        #         # 返回 root，上层递归会接收返回值作为子节点
        #         return root`,
            language: "python"
        },
        {
            id: 704,
            title: "Binary Search",
            description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.   Example 1: Input: nums = [-1,0,3,5,9,12], target = 9 Output: 4 Explanation: 9 exists in nums and its index is 4 Example 2: Input: nums = [-1,0,3,5,9,12], target = 2 Output: -1 Explanation: 2 does not exist in nums so return -1   Constraints: 1 <= nums.length <= 104 -104 < nums[i], target < 104 All the integers in nums are unique. nums is sorted in ascending order.
<a href="https://leetcode.com/problems/binary-search/description/" target="_blank">https://leetcode.com/problems/binary-search/description/</a>`,
            keywords: ["Array", "2ptr", "BS"],
            code: `        # 实际运用二分搜索时的思维框架
        
        # 泛化
        # 1、确定 x自变量, f(x)单调, target 分别是什么，并写出函数 f 的代码。
        # 2、找到 x 的取值范围作为二分搜索的搜索区间，初始化 left 和 right 变量。
        # 3、根据题目的要求，确定应该使用搜索左侧还是搜索右侧的二分搜索算法，写出解法代码。
        
        class Solution:
            # recursive
            # def binarySearch(self, nums, target, left, right):
            #     if left == right:
            #         return -1
            #     if left == right - 1:
            #         if nums[left] == target:
            #             return left
            #         else:
            #             return -1
        
            #     mid = left + (right-left) // 2
            #     if nums[mid] == target:
            #         return mid
            #     if nums[mid] < target:
            #         return self.binarySearch(nums, target, mid, right)
            #     else:
            #         return self.binarySearch(nums, target, left, mid)
        
            # def search(self, nums: List[int], target: int) -> int:
            #     left = 0
            #     right = len(nums)
            #     return self.binarySearch(nums, target, left, right)
        
            def search(self, nums: List[int], target: int) -> int:
                left = 0
                right = len(nums) - 1
                while left <= right:
                    mid = left + (right - left) // 2
                    if nums[mid] == target:
                        return mid
                    elif nums[mid] < target:
                        left = mid + 1
                    elif nums[mid] > target:
                        right = mid - 1
                return -1`,
            language: "python"
        },
        {
            id: 712,
            title: "Minimum ASCII Delete Sum for Two Strings",
            description: `Given two strings s1 and s2, return the lowest ASCII sum of deleted characters to make two strings equal.   Example 1: Input: s1 = "sea", s2 = "eat" Output: 231 Explanation: Deleting "s" from "sea" adds the ASCII value of "s" (115) to the sum. Deleting "t" from "eat" adds 116 to the sum. At the end, both strings are equal, and 115 + 116 = 231 is the minimum sum possible to achieve this. Example 2: Input: s1 = "delete", s2 = "leet" Output: 403 Explanation: Deleting "dee" from "delete" to turn the string into "let", adds 100[d] + 101[e] + 101[e] to the sum. Deleting "e" from "leet" adds 101[e] to the sum. At the end, both strings are equal to "let", and the answer is 100+101+101+101 = 403. If instead we turned both strings into "lee" or "eet", we would get answers of 433 or 417, which are higher.   Constraints: 1 <= s1.length, s2.length <= 1000 s1 and s2 consist of lowercase English letters.
<a href="https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/" target="_blank">https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/</a>`,
            keywords: ["DP", "LCS"],
            code: `        # mind to sum along the string for base case
        
        class Solution:
            def minimumDeleteSum(self, s1: str, s2: str) -> int:
                m = len(s1)
                n = len(s2)
                memo = [[float('inf') for j in range(n+1)] for i in range(m+1)]
        
                memo[0][0] = 0
                s = 0 # sum along
                for i in range(1, m+1):
                    s += ord(s1[i-1])
                    memo[i][0] = s
                s = 0
                for j in range(1, n+1):
                    s += ord(s2[j-1])
                    memo[0][j] = s
        
                for i in range(1, m+1):
                    for j in range(1, n+1):
                        if s1[i-1] == s2[j-1]:
                            memo[i][j] = min(memo[i][j], memo[i-1][j-1])
                        memo[i][j] = min(memo[i][j], memo[i-1][j] + ord(s1[i-1]))
                        memo[i][j] = min(memo[i][j], memo[i][j-1] + ord(s2[j-1]))
                
                return memo[m][n]
        # class Solution:
        #     # 备忘录
        #     memo = []
        
        #     # 主函数
        #     def minimumDeleteSum(self, s1: str, s2: str) -> int:
        #         m, n = len(s1), len(s2)
        #         # 备忘录值为 -1 代表未曾计算
        #         self.memo = [[-1] * n for _ in range(m)]
        
        #         return self.dp(s1, 0, s2, 0)
        
        #     # 定义：将 s1[i..] 和 s2[j..] 删除成相同字符串，
        #     # 最小的 ASCII 码之和为 dp(s1, i, s2, j)。
        #     def dp(self, s1: str, i: int, s2: str, j: int) -> int:
        #         res = 0
        #         # base case
        #         if i == len(s1):
        #             # 如果 s1 到头了，那么 s2 剩下的都得删除
        #             for k in range(j, len(s2)):
        #                 res += ord(s2[k])
        #             return res
        #         if j == len(s2):
        #             # 如果 s2 到头了，那么 s1 剩下的都得删除
        #             for k in range(i, len(s1)):
        #                 res += ord(s1[k])
        #             return res
        
        #         if self.memo[i][j] != -1:
        #             return self.memo[i][j]
        
        #         if s1[i] == s2[j]:
        #             # s1[i] 和 s2[j] 都是在 lcs 中的，不用删除
        #             self.memo[i][j] = self.dp(s1, i + 1, s2, j + 1)
        #         else:
        #             # s1[i] 和 s2[j] 至少有一个不在 lcs 中，删一个
        #             self.memo[i][j] = min(
        #                 ord(s1[i]) + self.dp(s1, i + 1, s2, j),
        #                 ord(s2[j]) + self.dp(s1, i, s2, j + 1)
        #             )
        #         return self.memo[i][j]`,
            language: "python"
        },
        {
            id: 713,
            title: "Subarray Product Less Than K",
            description: `Given an array of integers nums and an integer k, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than k.   Example 1: Input: nums = [10,5,2,6], k = 100 Output: 8 Explanation: The 8 subarrays that have product less than 100 are: [10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6] Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k. Example 2: Input: nums = [1,2,3], k = 0 Output: 0   Constraints: 1 <= nums.length <= 3 * 104 1 <= nums[i] <= 1000 0 <= k <= 106`,
            keywords: ["SlidingWindow"],
            code: `        # This is to count all, not find longest/shortest
        # Note: every update, we add all subarr that ends with new right
        # [left…right], [left+1…right]...
        
        class Solution:
            def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
                left = 0
                right = 0
                prod = 1
        
                res = 0
                while right < len(nums):
                    prod *= nums[right]
                    right += 1
                    while prod >= k and left < right:
                        prod //= nums[left]
                        left += 1
                    if prod < k:
                        # important: we add all new subarr that end with new right
                        res += right - left
                return res`,
            language: "python"
        },
        {
            id: 721,
            title: "Accounts Merge",
            description: `Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails representing emails of the account. Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name. After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order. The accounts themselves can be returned in any order.   Example 1: Input: accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]] Output: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]] Explanation: The first and second John's are the same person as they have the common email "johnsmith@mail.com". The third John and Mary are different people as none of their email addresses are used by other accounts. We could return these lists in any order, for example the answer [['Mary', 'mary@mail.com'], ['John', 'johnnybravo@mail.com'], ['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com']] would still be accepted. Example 2: Input: accounts = [["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]] Output: [["Ethan","Ethan0@m.co","Ethan4@m.co","Ethan5@m.co"],["Gabe","Gabe0@m.co","Gabe1@m.co","Gabe3@m.co"],["Hanzo","Hanzo0@m.co","Hanzo1@m.co","Hanzo3@m.co"],["Kevin","Kevin0@m.co","Kevin3@m.co","Kevin5@m.co"],["Fern","Fern0@m.co","Fern1@m.co","Fern5@m.co"]]   Constraints: 1 <= accounts.length <= 1000 2 <= accounts[i].length <= 10 1 <= accounts[i][j].length <= 30 accounts[i][0] consists of English letters. accounts[i][j] (for j > 0) is a valid email.
<a href="https://leetcode.com/problems/accounts-merge/description/" target="_blank">https://leetcode.com/problems/accounts-merge/description/</a>`,
            keywords: ["BFS"],
            code: `        # bfs dfs all okay, not shortest path. need connect id->email->id
        
        from collections import deque
        
        class Solution:
            def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
                emails = {}
                for i in range(len(accounts)):
                    acc = accounts[i]
                    name = acc[0]
                    for j in range(1, len(acc)):
                        email = acc[j]
                        if email in emails:
                            ids = emails[email]
                        else:
                            ids = []
                            emails[email] = ids
                        ids.append(i)
                # grid: email -> users
                # accounts: user -> emails
                self.accounts = accounts
                self.emails = emails
                self.visited = set() # user ids + emails
        
                res = []
                for i in range(len(accounts)):
                    emails = self.bfs(i)
                    if emails:
                        res.append([accounts[i][0]] + emails)
                
                return res
        
        
            def bfs(self, i):
                
                q = deque()
                q.append(str(i))
        
                all_emails = []
                while q:
                    sz = len(q)
                    for _ in range(sz):
                        cur = q.popleft()
                        if cur in self.visited:
                            continue
                        self.visited.add(cur)
                        emails = self.accounts[int(cur)]
                        for email in emails[1:]:
                            if email in self.visited:
                                continue
                            self.visited.add(email)
                            all_emails.append(email)
                            ids = self.emails[email]
                            for j in ids:
                                q.append(str(j))
                all_emails.sort()
                return all_emails
        
        # class Solution:
        #     def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
        #         # key: email, value: 出现该 email 的 account 的索引列表
        #         email_to_indexes = {}
        #         for i in range(len(accounts)):
        #             account = accounts[i]
        #             for j in range(1, len(account)):
        #                 email = account[j]
        #                 indexes = email_to_indexes.get(email, [])
        #                 indexes.append(i)
        #                 email_to_indexes[email] = indexes
        
        #         # 计算合并后的账户
        #         res = []
        #         visited_emails = set()
        
        #         for email in email_to_indexes.keys():
        #             if email in visited_emails:
        #                 continue
        #             # 合并账户，用 BFS 算法穷举所有和 email 相关联的邮箱
        #             merged_email = []
        #             q = collections.deque()
        #             q.append(email)
        #             visited_emails.add(email)
        #             # BFS 算法框架
        #             while q:
        #                 cur_email = q.popleft()
        #                 merged_email.append(cur_email)
        #                 indexes = email_to_indexes[cur_email]
        #                 for index in indexes:
        #                     account = accounts[index]
        #                     for j in range(1, len(account)):
        #                         next_email = account[j]
        #                         if next_email not in visited_emails:
        #                             q.append(next_email)
        #                             visited_emails.add(next_email)
        #             user_name = accounts[email_to_indexes[email][0]][0]
        #             # mergedEmail 是 userName 的所有邮箱
        #             merged_email.sort()
        #             merged_email.insert(0, user_name)
        #             res.append(merged_email)
        
        #         return res
        `,
            language: "python"
        },
        {
            id: 729,
            title: "My Calendar I",
            description: `You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a double booking. A double booking happens when two events have some non-empty intersection (i.e., some moment is common to both events.). The event can be represented as a pair of integers startTime and endTime that represents a booking on the half-open interval [startTime, endTime), the range of real numbers x such that startTime <= x < endTime. Implement the MyCalendar class: MyCalendar() Initializes the calendar object. boolean book(int startTime, int endTime) Returns true if the event can be added to the calendar successfully without causing a double booking. Otherwise, return false and do not add the event to the calendar.   Example 1: Input ["MyCalendar", "book", "book", "book"] [[], [10, 20], [15, 25], [20, 30]] Output [null, true, false, true] Explanation MyCalendar myCalendar = new MyCalendar(); myCalendar.book(10, 20); // return True myCalendar.book(15, 25); // return False, It can not be booked because time 15 is already booked by another event. myCalendar.book(20, 30); // return True, The event can be booked, as the first event takes every time less than 20, but not including 20.   Constraints: 0 <= start < end <= 109 At most 1000 calls will be made to book.`,
            keywords: ["BS"],
            code: `        # deque: linked list of arrays (queue + stack)
        # dict: key->index Hash, (key, value)  Array (indexing)
        # OrderedDict: DoublyLinkedListHash (better for iterate)
        # SortedDict (sortedcontainers): 2-level B-tree with Array + Hash (sorted)
        
        from sortedcontainers import SortedDict
        
        class MyCalendar:
        
            def __init__(self):
                self.calendar = SortedDict()
        
            def book(self, startTime: int, endTime: int) -> bool:
                nextIndex = self.calendar.bisect_left(startTime) # prev need to - 1
                prevIndex = nextIndex - 1
                if prevIndex >= 0:
                    # key use calendar[key]
                    # index use calendar.values[index]
                    prevEnd = self.calendar.values()[prevIndex]
                    if prevEnd > startTime:
                        return False
                if nextIndex < len(self.calendar.values()):
                    nextStart = self.calendar.keys()[nextIndex]
                    if nextStart < endTime:
                        return False
                self.calendar[startTime] = endTime
                return True
                
        
        
        # Your MyCalendar object will be instantiated and called as such:
        # obj = MyCalendar()
        # param_1 = obj.book(startTime,endTime)
        
        # from sortedcontainers import SortedDict
        
        # class MyCalendar:
        #     # 记录日程，键是日程的开始时间，值是日程的结束时间
        #     def __init__(self):
        #         self.calendar = SortedDict()
        
        #     def book(self, start: int, end: int) -> bool:
        #         earlier_index = self.calendar.bisect_right(start) - 1
        #         later_index = self.calendar.bisect_left(start)
        
        #         if earlier_index >= 0 and self.calendar.values()[earlier_index] > start:
        #             # 上个日程还没结束，本次日程就开始了
        #             return False
        
        #         if later_index < len(self.calendar) and self.calendar.keys()[later_index] < end:
        #             # 本次日程还没结束，下个日程就开始了
        #             return False
        
        #         # 成功安排日程
        #         self.calendar[start] = end
        #         return True`,
            language: "python"
        },
        {
            id: 739,
            title: "Daily Temperatures",
            description: `Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.   Example 1: Input: temperatures = [73,74,75,71,69,72,76,73] Output: [1,1,4,2,1,1,0,0] Example 2: Input: temperatures = [30,40,50,60] Output: [1,1,1,0] Example 3: Input: temperatures = [30,60,90] Output: [1,1,0]   Constraints: 1 <= temperatures.length <= 105 30 <= temperatures[i] <= 100
<a href="https://leetcode.com/problems/daily-temperatures/" target="_blank">https://leetcode.com/problems/daily-temperatures/</a>`,
            keywords: ["MonotonicStack"],
            code: `        # ngStack store indices
        
        class Solution:
            def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
                ngStack = []
                n = len(temperatures)
                res = [0 for i in range(n)]
                for i in range(n-1, -1, -1):
                    t = temperatures[i]
                    while ngStack and temperatures[ngStack[-1]] <= t:
                        ngStack.pop()
                    ans = ngStack[-1] - i if ngStack else 0
                    ngStack.append(i)
                    res[i] = ans
                return res
        
        # class Solution:
        #     def dailyTemperatures(self, temperatures):
        #         n = len(temperatures)
        #         res = [0]*n
        #         # 这里放元素索引，而不是元素
        #         s = []
        #         # 单调栈模板
        #         for i in range(n-1, -1, -1):
        #             while s and temperatures[s[-1]] <= temperatures[i]:
        #                 s.pop()
        #             # 得到索引间距
        #             res[i] = 0 if not s else s[-1] - i
        #             # 将索引入栈，而不是元素
        #             s.append(i)
        #         return res`,
            language: "python"
        },
        {
            id: 743,
            title: "Network Delay Time",
            description: `You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target. We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.   Example 1: Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2 Output: 2 Example 2: Input: times = [[1,2,1]], n = 2, k = 1 Output: 1 Example 3: Input: times = [[1,2,1]], n = 2, k = 2 Output: -1   Constraints: 1 <= k <= n <= 100 1 <= times.length <= 6000 times[i].length == 3 1 <= ui, vi <= n ui != vi 0 <= wi <= 100 All the pairs (ui, vi) are unique. (i.e., no multiple edges.)
<a href="https://leetcode.com/problems/network-delay-time/" target="_blank">https://leetcode.com/problems/network-delay-time/</a>`,
            keywords: ["Graph", "Dijkstra"],
            code: `        # Dijkstra A*： BFS
        #   +weight，SSSP
        # SPFA Bellman Ford：BFS
        #   -weight，SSSP
        # Floyd：DP
        #   MSSP
        
        
        # Dijkstra:
        
        # Node:
        #   id
        #   distFromStart
        # Dijkstra:
        #   distTo
        #     the best result
        #     used to replace visited where only true/false recorded
        #     How to replace visited?
        #       same node with different distFromStart might exist, early stop them, otherwise inf loop
        #        when enque, a new better might comes, but you don’t remove worse one in the queue
        
        # Dijkstra 拓展：带限制的最短路问题
        # 1. source to dest:
        #   when you pop out and update the distTo, you are the shortest path it cur node
        # 2. edges <=k:
        #   Node: add edgesFromStart
        #   Dijkstra: distTo - (k+1) * nodes, 
        
        # When to Use: DAG, non-neg weighted, (monotonic even not sum)
        # condition1: pop, continue or not
        # condition2: push, set distTo also
        
        
        
        # node - 1
        
        import heapq
        
        class State:
            def __init__(self, i, dist):
                self.i = i
                self.dist = dist
        
            def __lt__(self, state):
                return self.dist < state.dist
        
        class Solution:
            def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
                graph = [[] for i in range(n)]
                for i in range(len(times)):
                    u, v, w = times[i]
                    graph[u-1].append((v-1, w))
                
                pq = []
                distTo = [float('inf') for i in range(n)]
        
                heapq.heappush(pq, State(k-1, 0))
                distTo[k-1] = 0 # careful, otherwise always 1 uninit
        
                while pq:
                    s = heapq.heappop(pq)
                    cur, d = s.i, s.dist
        
        
                    if distTo[cur] < d:
                        continue
                        
        
                    for v, w in graph[cur]:
                        newD = d + w
                        if newD < distTo[v]:
                            heapq.heappush(pq, State(v, newD))
                            distTo[v] = newD
        
                result = 0
                for i in distTo:
                    if i > result:
                        result = i
                    if i == float("inf"):
                        return -1
                
                return result
        
        # import heapq
        
        # class Solution:
        #     class State:
        #         # 当前节点 ID
        #         def __init__(self, node, distFromStart):
        #             self.node = node
        #             # 从起点 s 到当前 node 节点的最小路径权重和
        #             self.distFromStart = distFromStart
        
        #         def __lt__(self, other):
        #             return self.distFromStart < other.distFromStart
        
        #     # Dijkstra 算法模板 https://labuladong.online/algo/data-structure/dijkstra/
        #     def dijkstra(self, graph, src):
        #         distTo = [float('inf')] * len(graph)
        
        #         pq = []
        #         heapq.heappush(pq, self.State(src, 0))
        #         distTo[src] = 0
        
        #         while pq:
        #             state = heapq.heappop(pq)
        #             curNode = state.node
        #             curDistFromStart = state.distFromStart
        
        #             if distTo[curNode] < curDistFromStart:
        #                 continue
        
        #             for neighbor in graph[curNode]:
        #                 nextNode = neighbor[0]
        #                 nextDistFromStart = curDistFromStart + neighbor[1]
        
        #                 if distTo[nextNode] <= nextDistFromStart:
        #                     continue
        #                 heapq.heappush(pq, self.State(nextNode, nextDistFromStart))
        #                 distTo[nextNode] = nextDistFromStart
        
        #         return distTo
        
        #     def networkDelayTime(self, times, n, k):
        #         # 节点编号是从 1 开始的，所以要一个大小为 n + 1 的邻接表
        #         graph = [[] for _ in range(n + 1)]
        #         for i in range(1, n + 1):
        #             graph[i] = []
        #         # 构造图
        #         for edge in times:
        #             from_node = edge[0]
        #             to = edge[1]
        #             weight = edge[2]
        #             # from -> List<(to, weight)>
        #             # 邻接表存储图结构，同时存储权重信息
        #             graph[from_node].append([to, weight])
        
        #         distTo = self.dijkstra(graph, k)
        
        #         # 找到最长的那条最短路径
        #         res = 0
        #         for i in range(1, n + 1):
        #             if distTo[i] == float('inf'):
        #                 # 有节点不可达
        #                 return -1
        #             res = max(res, distTo[i])
        #         return res`,
            language: "python"
        },
        {
            id: 752,
            title: "Open the Lock",
            description: `You have a lock in front of you with 4 circular wheels. Each wheel has 10 slots: '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'. The wheels can rotate freely and wrap around: for example we can turn '9' to be '0', or '0' to be '9'. Each move consists of turning one wheel one slot. The lock initially starts at '0000', a string representing the state of the 4 wheels. You are given a list of deadends dead ends, meaning if the lock displays any of these codes, the wheels of the lock will stop turning and you will be unable to open it. Given a target representing the value of the wheels that will unlock the lock, return the minimum total number of turns required to open the lock, or -1 if it is impossible.   Example 1: Input: deadends = ["0201","0101","0102","1212","2002"], target = "0202" Output: 6 Explanation: A sequence of valid moves would be "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202". Note that a sequence like "0000" -> "0001" -> "0002" -> "0102" -> "0202" would be invalid, because the wheels of the lock become stuck after the display becomes the dead end "0102". Example 2: Input: deadends = ["8888"], target = "0009" Output: 1 Explanation: We can turn the last wheel in reverse to move from "0000" -> "0009". Example 3: Input: deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"], target = "8888" Output: -1 Explanation: We cannot reach the target without getting stuck.   Constraints: 1 <= deadends.length <= 500 deadends[i].length == 4 target.length == 4 target will not be in the list deadends. target and deadends[i] consist of digits only.
<a href="https://leetcode.com/problems/open-the-lock/" target="_blank">https://leetcode.com/problems/open-the-lock/</a>`,
            keywords: ["BFS"],
            code: `        
        # GraphBFS vs. level-order in tree
        #   need self.visited
        # Double direction BFS
        #   use per-level set instead of q, to quickly find overlap
        #   还有一个优化点，每次都保持 q1 是元素数量较小的集合，这样可以一定程度减少搜索次数。
        
        # visited check in loop (because root is already visited)
        # others check just under cur
        
        from collections import deque
        class Solution:
            def openLock(self, deadends: List[str], target: str) -> int:
                dd = set(deadends)
                q = deque()
                visited = set()
        
                q.append("0000")
                visited.add("0000")
        
                cnt = 0
                while q:
                    sz = len(q)
                    for i in range(sz):
                        cur = q.popleft()
                        if cur == target:
                            return cnt
                        if cur in dd:
                            continue
                        for j in range(4):
                            n1 = cur[:j] + str((int(cur[j]) + 1) % 10) + cur[j+1:]
                            n2 = cur[:j] + str((int(cur[j]) - 1) % 10) + cur[j+1:]
                            options = [n1, n2]
                            for o in options:
                                if o in visited:
                                    continue
                                q.append(o)
                                visited.add(o)
                    cnt += 1
                return -1
        
        # class Solution:
        #     def openLock(self, deadends: List[str], target: str) -> int:
        #         # 记录需要跳过的死亡密码
        #         deads = set(deadends)
        #         if "0000" in deads:
        #             return -1
        
        #         # 记录已经穷举过的密码，防止走回头路
        #         visited = set()
        #         q = collections.deque()
        #         # 从起点开始启动广度优先搜索
        #         step = 0
        #         q.append("0000")
        #         visited.add("0000")
                
        #         while q:
        #             sz = len(q)
        #             # 将当前队列中的所有节点向周围扩散
        #             for _ in range(sz):
        #                 cur = q.popleft()
                        
        #                 # 判断是否到达终点
        #                 if cur == target:
        #                     return step
                        
        #                 # 将一个节点的合法相邻节点加入队列
        #                 for neighbor in self.getNeighbors(cur):
        #                     if neighbor not in visited and neighbor not in deads:
        #                         q.append(neighbor)
        #                         visited.add(neighbor)
                    
        #             # 在这里增加步数
        #             step += 1
                
        #         # 如果穷举完都没找到目标密码，那就是找不到了
        #         return -1
        
        #     # 将 s[j] 向上拨动一次
        #     def plusOne(self, s: str, j: int) -> str:
        #         ch = list(s)
        #         if ch[j] == '9':
        #             ch[j] = '0'
        #         else:
        #             ch[j] = chr(ord(ch[j]) + 1)
        #         return ''.join(ch)
        
        #     # 将 s[i] 向下拨动一次
        #     def minusOne(self, s: str, j: int) -> str:
        #         ch = list(s)
        #         if ch[j] == '0':
        #             ch[j] = '9'
        #         else:
        #             ch[j] = chr(ord(ch[j]) - 1)
        #         return ''.join(ch)
        
        #     # 将 s 的每一位向上拨动一次或向下拨动一次，8 种相邻密码
        #     def getNeighbors(self, s: str) -> List[str]:
        #         neighbors = []
        #         for i in range(4):
        #             neighbors.append(self.plusOne(s, i))
        #             neighbors.append(self.minusOne(s, i))
        #         return neighbors`,
            language: "python"
        },
        {
            id: 773,
            title: "Sliding Puzzle",
            description: `On an 2 x 3 board, there are five tiles labeled from 1 to 5, and an empty square represented by 0. A move consists of choosing 0 and a 4-directionally adjacent number and swapping it. The state of the board is solved if and only if the board is [[1,2,3],[4,5,0]]. Given the puzzle board board, return the least number of moves required so that the state of the board is solved. If it is impossible for the state of the board to be solved, return -1.   Example 1: Input: board = [[1,2,3],[4,0,5]] Output: 1 Explanation: Swap the 0 and the 5 in one move. Example 2: Input: board = [[1,2,3],[5,4,0]] Output: -1 Explanation: No number of moves will make the board solved. Example 3: Input: board = [[4,1,2],[5,0,3]] Output: 5 Explanation: 5 is the smallest number of moves that solves the board. An example path: After move 0: [[4,1,2],[5,0,3]] After move 1: [[4,1,2],[0,5,3]] After move 2: [[0,1,2],[4,5,3]] After move 3: [[1,0,2],[4,5,3]] After move 4: [[1,2,0],[4,5,3]] After move 5: [[1,2,3],[4,5,0]]   Constraints: board.length == 2 board[i].length == 3 0 <= board[i][j] <= 5 Each value board[i][j] is unique.
<a href="https://leetcode.com/problems/sliding-puzzle/" target="_blank">https://leetcode.com/problems/sliding-puzzle/</a>


`,
            keywords: ["BFS"],
            code: `        # str as key
        # find neighbor, replace with neighbor in str
        
        from collections import deque
        class Solution:
            def slidingPuzzle(self, board: List[List[int]]) -> int:
                self.neighbors = {
                    0: [1, 3],
                    1: [0, 2, 4],
                    2: [1, 5],
                    3: [0, 4],
                    4: [1, 3, 5],
                    5: [2, 4]
                }
        
                q = deque()
                start = ''.join([(''.join([str(y) for y in x])) for x in board])
                q.append(start)
                visited = set()
                visited.add(start)
        
                cnt = 0
                while q:
                    sz = len(q)
                    for i in range(sz):
                        cur = q.popleft()
                        if cur == "123450":
                            return cnt
                        for n in self.findNeighbors(cur):
                            if n in visited:
                                continue
                            q.append(n)
                            visited.add(n)
                    cnt += 1
        
                return -1
            
            def findNeighbors(self, s):
                res = []
                for i in range(len(s)):
                    if s[i] == '0':
                        neighbors = self.neighbors[i]
                        for n in neighbors:
                            ns = s[0:i] + s[n] + s[i+1:]
                            ns = ns[0:n] + '0' + ns[n+1:]
                            res.append(ns)
                return res
        
        # from collections import deque
        
        # class Solution:
        #     def slidingPuzzle(self, board):
        #         target = "123450"
        #         # 将 2x3 的数组转化成字符串作为 BFS 的起点
        #         start = ""
        #         for i in range(len(board)):
        #             for j in range(len(board[0])):
        #                 start += str(board[i][j])
                
        #         # ****** BFS 算法框架开始 ******
        #         q = deque()
        #         visited = set()
        #         # 从起点开始 BFS 搜索
        #         q.append(start)
        #         visited.add(start)
                
        #         step = 0
        #         while q:
        #             # 当前层的节点数量
        #             sz = len(q)
        #             for _ in range(sz):
        #                 cur = q.popleft()
        #                 # 判断是否达到目标局面
        #                 if cur == target:
        #                     return step
        #                 # 将数字 0 和相邻的数字交换位置
        #                 for neighbor_board in self.getNeighbors(cur):
        #                     # 防止走回头路
        #                     if neighbor_board not in visited:
        #                         q.append(neighbor_board)
        #                         visited.add(neighbor_board)
        #             step += 1
        #         # ****** BFS 算法框架结束 ******
        #         return -1
        
        #     def getNeighbors(self, board):
        #         # 记录一维字符串的相邻索引
        #         mapping = [
        #             [1, 3],
        #             [0, 4, 2],
        #             [1, 5],
        #             [0, 4],
        #             [3, 1, 5],
        #             [4, 2]
        #         ]
        #         idx = board.index('0')
        #         neighbors = []
        #         for adj in mapping[idx]:
        #             new_board = self.swap(board, idx, adj)
        #             neighbors.append(new_board)
        #         return neighbors
        
        #     def swap(self, board, i, j):
        #         chars = list(board)
        #         chars[i], chars[j] = chars[j], chars[i]
        #         return ''.join(chars)`,
            language: "python"
        },
        {
            id: 785,
            title: "Is Graph Bipartite?",
            description: `There is an undirected graph with n nodes, where each node is numbered between 0 and n - 1. You are given a 2D array graph, where graph[u] is an array of nodes that node u is adjacent to. More formally, for each v in graph[u], there is an undirected edge between node u and node v. The graph has the following properties: There are no self-edges (graph[u] does not contain u). There are no parallel edges (graph[u] does not contain duplicate values). If v is in graph[u], then u is in graph[v] (the graph is undirected). The graph may not be connected, meaning there may be two nodes u and v such that there is no path between them. A graph is bipartite if the nodes can be partitioned into two independent sets A and B such that every edge in the graph connects a node in set A and a node in set B. Return true if and only if it is bipartite.   Example 1: Input: graph = [[1,2,3],[0,2],[0,1,3],[0,2]] Output: false Explanation: There is no way to partition the nodes into two independent sets such that every edge connects a node in one and a node in the other. Example 2: Input: graph = [[1,3],[0,2],[1,3],[0,2]] Output: true Explanation: We can partition the nodes into two sets: {0, 2} and {1, 3}.   Constraints: graph.length == n 1 <= n <= 100 0 <= graph[u].length < n 0 <= graph[u][i] <= n - 1 graph[u] does not contain u. All the values of graph[u] are unique. If graph[u] contains v, then graph[v] contains u.
<a href="https://leetcode.com/problems/is-graph-bipartite/" target="_blank">https://leetcode.com/problems/is-graph-bipartite/</a>`,
            keywords: ["Graph", "Bipartite"],
            code: `        # 每个电影节点的相邻节点就是参演该电影的所有演员，每个演员的相邻节点就是该演员参演过的所有电影，对比哈希表的存储方式更方便直观，所需的存储空间更小。
        # visited -> whether to check color or not
        # colors
        # isBi
        
        from collections import deque
        
        class Solution:
            def isBipartite(self, graph: List[List[int]]) -> bool:
                self.visited = set()
                self.graph = graph
                self.n = len(graph)
                self.colors = [0] * self.n
                self.isBi = True
        
                # for i in range(self.n):
                #     self.dfs(i)
        
                for i in range(self.n):
                    self.bfs(i)
        
                return self.isBi
            
            def dfs(self, node):
                # visited is used for bipartite check later
                if not self.isBi:
                    return
        
                self.visited.add(node)
                for i in self.graph[node]: # adjList
                    if i in self.visited:
                        if self.colors[node] == self.colors[i]:
                            self.isBi = False
                            return
                        continue
                    else:
                        self.colors[i] = 1 - self.colors[node]
                        self.dfs(i)
            
            # cannot assume all are connected
            def bfs(self, start):
                if not self.isBi:
                    return
                if start in self.visited:
                    return
        
                q = deque()
        
                q.append(start)
        
                # you can also use parent, not a global color
                color = 1-self.colors[start]
                while q:
                    sz = len(q)
                    for i in range(sz):
                        cur = q.popleft()
                        if cur in self.visited:
                            if self.colors[cur] == color:
                                self.isBi = False
                                return
                        else:
                            self.colors[cur] = 1-color
                            self.visited.add(cur)
                            for j in self.graph[cur]:
                                q.append(j)
                    color = 1-color
        
        
        
        # # DFS
        # class Solution:
        #     # 记录图是否符合二分图性质
        #     # 记录图中节点的颜色，false 和 true 代表两种不同颜色
        #     # 记录图中节点是否被访问过
        #     def __init__(self):
        #         self.ok = True
        #         self.color = None
        #         self.visited = None
        
        #     # 主函数，输入邻接表，判断是否是二分图
        #     def isBipartite(self, graph: List[List[int]]) -> bool:
        #         n = len(graph)
        #         self.color = [False] * n
        #         self.visited = [False] * n
        #         # 因为图不一定是联通的，可能存在多个子图
        #         # 所以要把每个节点都作为起点进行一次遍历
        #         # 如果发现任何一个子图不是二分图，整幅图都不算二分图
        #         for v in range(n):
        #             if not self.visited[v]:
        #                 self.traverse(graph, v)
        #         return self.ok
        
        #     # DFS 遍历框架
        #     def traverse(self, graph: List[List[int]], v: int) -> None:
        #         # 如果已经确定不是二分图了，就不用浪费时间再递归遍历了
        #         if not self.ok:
        #             return
        
        #         self.visited[v] = True
        #         for w in graph[v]:
        #             if not self.visited[w]:
        #                 # 相邻节点 w 没有被访问过
        #                 # 那么应该给节点 w 涂上和节点 v 不同的颜色
        #                 self.color[w] = not self.color[v]
        #                 # 继续遍历 w
        #                 self.traverse(graph, w)
        #             else:
        #                 # 相邻节点 w 已经被访问过
        #                 # 根据 v 和 w 的颜色判断是否是二分图
        #                 if self.color[w] == self.color[v]:
        #                     # 若相同，则此图不是二分图
        #                     self.ok = False
        
        # # BFS
        # from collections import deque
        
        # class Solution:
        #     def __init__(self):
        #         # 记录图是否符合二分图性质
        #         self.ok = True
        #         # 记录图中节点的颜色，False 和 True 代表两种不同颜色
        #         self.color = []
        #         # 记录图中节点是否被访问过
        #         self.visited = []
        
        #     def isBipartite(self, graph):
        #         n = len(graph)
        #         self.color = [False]*n
        #         self.visited = [False]*n
        
        #         for v in range(n):
        #             if not self.visited[v]:
        #                 # 改为使用 BFS 函数
        #                 self.bfs(graph, v)
        
        #         return self.ok
        
        #     # 从 start 节点开始进行 BFS 遍历
        #     def bfs(self, graph, start):
        #         q = deque([start])
        #         self.visited[start] = True
        
        #         while q and self.ok:
        #             v = q.popleft()
        #             # 从节点 v 向所有相邻节点扩散
        #             for w in graph[v]:
        #                 if not self.visited[w]:
        #                     # 相邻节点 w 没有被访问过
        #                     # 那么应该给节点 w 涂上和节点 v 不同的颜色
        #                     self.color[w] = not self.color[v]
        #                     # 标记 w 节点，并放入队列
        #                     self.visited[w] = True
        #                     q.append(w)
        #                 else:
        #                     # 相邻节点 w 已经被访问过
        #                     # 根据 v 和 w 的颜色判断是否是二分图
        #                     if self.color[w] == self.color[v]:
        #                         # 若相同，则此图不是二分图
        #                         self.ok = False
        #                         return`,
            language: "python"
        },
        {
            id: 787,
            title: "Cheapest Flights Within K Stops",
            description: `There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei. You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.   Example 1: Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1 Output: 700 Explanation: The graph is shown above. The optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700. Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops. Example 2: Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1 Output: 200 Explanation: The graph is shown above. The optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200. Example 3: Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0 Output: 500 Explanation: The graph is shown above. The optimal path with no stops from city 0 to 2 is marked in red and has cost 500.   Constraints: 2 <= n <= 100 0 <= flights.length <= (n * (n - 1) / 2) flights[i].length == 3 0 <= fromi, toi < n fromi != toi 1 <= pricei <= 104 There will not be any multiple flights between two cities. 0 <= src, dst, k < n src != dst
<a href="https://leetcode.com/problems/cheapest-flights-within-k-stops/" target="_blank">https://leetcode.com/problems/cheapest-flights-within-k-stops/</a>`,
            keywords: ["Graph", "Dijkstra"],
            code: `        # set Stops only when min cost found
        # Then start to update lower stops
        # otherwise may limit to only low stop but high costs to enque
        # That's why we must put the stop update at this deterministic lowest cost found position (pop)
        
        import heapq
        class State:
            def __init__(self, i, costTo, k):
                self.i = i
                self.costTo = costTo
                self.stopTo = k
        
            def __lt__(self, state):
                return self.costTo < state.costTo
        
        class Solution:
            def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
                pq = []
                graph = [[] for i in range(n)]
        
                for f, t, p in flights:
                    graph[f].append((t, p))
                # because this is determined to be min when use it, thus set when pop
                minCostsTo = [float('inf') for i in range(n)]
                minStopsTo = [float('inf') for i in range(n)]
        
                heapq.heappush(pq, State(src, 0, -1))
                minCostsTo[src] = 0
                minStopsTo[src] = -1
        
                while pq:
                    cur = heapq.heappop(pq)
                    i, costTo, stopTo = cur.i, cur.costTo, cur.stopTo
        
                    # case 1 both not ok
                    if costTo > minCostsTo[i] and stopTo > minStopsTo[i]:
                        continue
        
                    if i == dst:
                        return costTo
        
                    #NOTE: set Stops only when min cost found
                    # Then start to update lower stops
                    # otherwise may limit to only low stop but high costs to enque
                    # That's why we must put the stop update at this deterministic lowest cost found position (pop)
                    # case 2 min costs
                    minCostsTo[i] = min(minCostsTo[i], costTo)
                    
                    # case 3 min edges
                    minStopsTo[i] = min(minStopsTo[i], stopTo)
        
                    for t, p in graph[i]:
                        newP = costTo + p
                        newS = stopTo + 1
        
                        # case 1 both not ok
                        if newP >= minCostsTo[t] and newS >= minStopsTo[t]:
                            continue
                        # case 2 limit
                        if newS > k:
                            continue
                        heapq.heappush(pq, State(t, newP, newS))
                        
                return -1
        
        # Mine1: all update when pop           
        # class Solution:
        #     def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
        #         pq = []
        #         graph = [[] for i in range(n)]
        
        #         for f, t, p in flights:
        #             graph[f].append((t, p))
        #         # because this is determined to be min when use it, thus set when pop
        #         minCostsTo = [float('inf') for i in range(n)]
        #         stopsTo = [float('inf') for i in range(n)]
        
        #         heapq.heappush(pq, State(src, 0, -1))
        #         minCostsTo[src] = 0
        #         stopsTo[src] = -1
        
        #         while pq:
        #             cur = heapq.heappop(pq)
        #             i, costTo, stopTo = cur.i, cur.costTo, cur.stopTo
        
        #             print(f"{minCostsTo[i]}, {stopTo}, {stopsTo[i]}")
        #             # case 1 both not ok
        #             if minCostsTo[i] != float('inf') and stopTo > stopsTo[i]:
        #                 continue
        
        #             if i == dst:
        #                 return costTo
        
        #             # case 2 min costs
        #             if minCostsTo[i] == float('inf'):
        #                 minCostsTo[i] = costTo
                    
        #             # case 3 min edges
        #             stopsTo[i] = min(stopsTo[i], stopTo)
        
        #             for t, p in graph[i]:
        #                 newP = costTo + p
        #                 newS = stopTo + 1
        #                 print(f"{t}, {newP}, {newS}")
        
        #                 # case 1 both not ok
        #                 if minCostsTo[t] != float('inf') and newS >= stopsTo[t]:
        #                     continue
        #                 # case 2 limit
        #                 if newS > k:
        #                     continue
        #                 heapq.heappush(pq, State(t, newP, newS))
                        
        #         return -1
        
        # import heapq
        
        # class Solution:
        #     def findCheapestPrice(self, n: int, flights: list[list[int]], src: int, dst: int, K: int) -> int:
        #         graph = [[] for _ in range(n)]
        #         for edge in flights:
        #             from_, to, price = edge[0], edge[1], edge[2]
        #             graph[from_].append([to, price])
        
        #         # 注意 K 要加一
        #         return self.dijkstra(graph, src, dst, K + 1)
        
        #     class State:
        #         def __init__(self, node: int, distFromStart: int, edgesFromStart: int):
        #             self.node = node
        #             self.distFromStart = distFromStart
        #             self.edgesFromStart = edgesFromStart
        
        #         def __lt__(self, other):
        #             return self.distFromStart < other.distFromStart
        
        #     def dijkstra(self, graph: list[list[list[int]]], src: int, dst: int, k: int) -> int:
        #         distTo = [-1] * len(graph)
        #         edgesTo = [float('inf')] * len(graph)
        
        #         pq = []
        #         heapq.heappush(pq, self.State(src, 0, 0))
        
        #         while pq:
        #             state = heapq.heappop(pq)
        #             curNode = state.node
        #             curDistFromStart = state.distFromStart
        #             curEdgesFromStart = state.edgesFromStart
        
        #             if distTo[curNode] != -1 and curEdgesFromStart > edgesTo[curNode]:
        #                 continue
        
        #             if distTo[curNode] == -1:
        #                 distTo[curNode] = curDistFromStart
        #                 if curNode == dst:
        #                     return curDistFromStart
        #             edgesTo[curNode] = min(edgesTo[curNode], curEdgesFromStart)
        
        #             for e in graph[curNode]:
        #                 nextNode = e[0]
        #                 nextDistFromStart = curDistFromStart + e[1]
        #                 nextEdgesFromStart = curEdgesFromStart + 1
        
        #                 if distTo[nextNode] != -1 and nextEdgesFromStart > edgesTo[nextNode]:
        #                     continue
        #                 if nextEdgesFromStart > k:
        #                     continue
        
        #                 heapq.heappush(pq, self.State(nextNode, nextDistFromStart, nextEdgesFromStart))
        
        #         return -1`,
            language: "python"
        },
        {
            id: 841,
            title: "Keys and Rooms",
            description: `There are n rooms labeled from 0 to n - 1 and all the rooms are locked except for room 0. Your goal is to visit all the rooms. However, you cannot enter a locked room without having its key. When you visit a room, you may find a set of distinct keys in it. Each key has a number on it, denoting which room it unlocks, and you can take all of them with you to unlock the other rooms. Given an array rooms where rooms[i] is the set of keys that you can obtain if you visited room i, return true if you can visit all the rooms, or false otherwise.   Example 1: Input: rooms = [[1],[2],[3],[]] Output: true Explanation: We visit room 0 and pick up key 1. We then visit room 1 and pick up key 2. We then visit room 2 and pick up key 3. We then visit room 3. Since we were able to visit every room, we return true. Example 2: Input: rooms = [[1,3],[3,0,1],[2],[0]] Output: false Explanation: We can not enter room number 2 since the only key that unlocks it is in that room.   Constraints: n == rooms.length 2 <= n <= 1000 0 <= rooms[i].length <= 1000 1 <= sum(rooms[i].length) <= 3000 0 <= rooms[i][j] < n All the values of rooms[i] are unique.
<a href="https://leetcode.com/problems/keys-and-rooms/description/" target="_blank">https://leetcode.com/problems/keys-and-rooms/description/</a>`,
            keywords: ["BFS"],
            code: `        from collections import deque
        class Solution:
            def canVisitAllRooms(self, rooms: List[List[int]]) -> bool:
                q = deque()
                q.append(0)
        
                visited = set()
                visited.add(0)
                while q:
                    sz = len(q)
                    for i in range(sz):
                        cur = q.popleft()
                        options = rooms[cur]
                        for r in options:
                            if r in visited:
                                continue
                            q.append(r)
                            visited.add(r)
                return len(visited) == len(rooms)`,
            language: "python"
        },
        {
            id: 853,
            title: "Car Fleet",
            description: `There are n cars at given miles away from the starting mile 0, traveling to reach the mile target. You are given two integer arrays position and speed, both of length n, where position[i] is the starting mile of the ith car and speed[i] is the speed of the ith car in miles per hour. A car cannot pass another car, but it can catch up and then travel next to it at the speed of the slower car. A car fleet is a single car or a group of cars driving next to each other. The speed of the car fleet is the minimum speed of any car in the fleet. If a car catches up to a car fleet at the mile target, it will still be considered as part of the car fleet. Return the number of car fleets that will arrive at the destination.   Example 1: Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3] Output: 3 Explanation: The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12. The fleet forms at target. The car starting at 0 (speed 1) does not catch up to any other car, so it is a fleet by itself. The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target. Example 2: Input: target = 10, position = [3], speed = [3] Output: 1 Explanation: There is only one car, hence there is only one fleet. Example 3: Input: target = 100, position = [0,2,4], speed = [4,2,1] Output: 1 Explanation: The cars starting at 0 (speed 4) and 2 (speed 2) become a fleet, meeting each other at 4. The car starting at 4 (speed 1) travels to 5. Then, the fleet at 4 (speed 2) and the car at position 5 (speed 1) become one fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.   Constraints: n == position.length == speed.length 1 <= n <= 105 0 < target <= 106 0 <= position[i] < target All the values of position are unique. 0 < speed[i] <= 106
<a href="https://leetcode.com/problems/car-fleet/" target="_blank">https://leetcode.com/problems/car-fleet/</a>`,
            keywords: ["MonotonicStack"],
            code: `        # power of sort
        # actually no need MonoStack
        
        class Solution:
            def carFleet(self, target: int, position: List[int], speed: List[int]) -> int:
                times = [(target - p)/s for (p, s) in zip(position, speed)]
                pos_times = list(zip(position, times))
                pos_times.sort(key=lambda x: x[0])
        
                # starting from highest position
                # shorter time -> form same fleet
                # longer time -> create new fleet
                max_time = 0
                cnt = 0
                for i in range(len(position) -1, -1, -1):
                    pos, time = pos_times[i]
                    if time > max_time:
                        cnt += 1
                        max_time = time
                
                return cnt
        
        
        # class Solution:
        #     def carFleet(self, target: int, position: List[int], speed: List[int]) -> int:
        #         n = len(position)
        #         cars = []
        #         for i in range(n):
        #             cars.append([position[i], speed[i]])
        #         # 按照初始位置，从小到大排序
        #         cars.sort(key=lambda x: x[0])
        #         # 计算每辆车到达终点的时间
        #         time = []
        #         for i in range(n):
        #             car = cars[i]
        #             time.append((target - car[0]) / car[1])
                
        #         # 使用单调栈计算车队的数量
        #         # (This part is commented out in the original Java code, so it's also commented out here)
        #         # stk = []
        #         # for t in time:
        #         #     while stk and t >= stk[-1]:
        #         #         stk.pop()
        #         #     stk.append(t)
        #         # return len(stk)
        
        #         # 避免使用栈模拟，倒序遍历取递增序列就是答案
        #         res = 0
        #         max_time = 0
        #         for i in range(n - 1, -1, -1):
        #             if time[i] > max_time:
        #                 max_time = time[i]
        #                 res += 1
        #         return res`,
            language: "python"
        },
        {
            id: 862,
            title: "Shortest Subarray with Sum at Least K",
            description: `Given an integer array nums and an integer k, return the length of the shortest non-empty subarray of nums with a sum of at least k. If there is no such subarray, return -1. A subarray is a contiguous part of an array.   Example 1: Input: nums = [1], k = 1 Output: 1 Example 2: Input: nums = [1,2], k = 4 Output: -1 Example 3: Input: nums = [2,-1,2], k = 3 Output: 3   Constraints: 1 <= nums.length <= 105 -105 <= nums[i] <= 105 1 <= k <= 109
<a href="https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/" target="_blank">https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/</a>`,
            keywords: ["MonotonicQueue", "SlidingWindow", "PrefixSum"],
            code: `        # for presum, we use right + 1 in sum calculation, but right for pushing
        # Why sliding window not working: result is from right and min in window, not left/right
        
        from collections import deque
        class Solution:
            def shortestSubarray(self, nums: List[int], k: int) -> int:
                minq = deque()
                left = 0
                right = 0
                n = len(nums)
                res = 10**5 + 1
        
                preSum = [0]
                acc = 0
                for i in range(1, n+1):
                    acc += nums[i-1]
                    preSum.append(acc)
        
                while right < n:
                    x = preSum[right+1]
        
                    while minq and preSum[minq[-1]] > preSum[right]:
                        minq.pop()
                    minq.append(right) # append immediately for following peek
                    minIndex = minq[0]
                    maxSum = x - preSum[minIndex]
                    right += 1
                    while maxSum >= k:
                        res = min(res, right - minIndex)
                        if preSum[left] == preSum[minq[0]]:
                            minq.popleft()
                        left += 1
                        if minq:
                            minIndex = minq[0]
                            maxSum = x - preSum[minIndex]
                        else:
                            break
                    
                return res if res < 10**5 +1 else -1
        
        # class Solution:
        #     def shortestSubarray(self, nums: List[int], k: int) -> int:
        #         n = len(nums)
        #         # 看题目的数据范围，前缀和数组中元素可能非常大，所以用 long 类型
        #         preSum = [0] * (n + 1)
        #         preSum[0] = 0
        #         # 计算 nums 的前缀和数组
        #         for i in range(1, n + 1):
        #             preSum[i] = preSum[i - 1] + nums[i - 1]
        #         # 单调队列结构辅助滑动窗口算法
        #         window = MonotonicQueue()
        #         right = 0
        #         left = 0
        #         length = float('inf')
        #         # 开始执行滑动窗口算法框架
        #         while right < len(preSum):
        #             # 扩大窗口，元素入队
        #             window.push(preSum[right])
        #             right += 1
        #             # 若新进入窗口的元素和窗口中的最小值之差大于等于 k，
        #             # 说明得到了符合条件的子数组，缩小窗口，使子数组长度尽可能小
        #             while right < len(preSum) and not window.isEmpty() and preSum[right] - window.min() >= k:
        #                 # 更新答案
        #                 length = min(length, right - left)
        #                 # 缩小窗口
        #                 window.pop()
        #                 left += 1
        #         return -1 if length == float('inf') else length
        
        # # 下面给出的是单调队列的通用实现，运行速度可能较慢，你可以自行简化提升速度
        # # 单调队列的详细解析见
        # # https://labuladong.online/algo/problem-set/monotonic-queue/
        # class MonotonicQueue:
        #     def __init__(self):
        #         # 常规队列，存储所有元素
        #         self.q = collections.deque()
        #         # 元素降序排列的单调队列，头部是最大值
        #         self.maxq = collections.deque()
        #         # 元素升序排列的单调队列，头部是最小值
        #         self.minq = collections.deque()
        
        #     def push(self, elem):
        #         # 维护常规队列，直接在队尾插入元素
        #         self.q.append(elem)
        
        #         # 维护 maxq，将小于 elem 的元素全部删除
        #         while self.maxq and self.maxq[-1] < elem:
        #             self.maxq.pop()
        #         self.maxq.append(elem)
        
        #         # 维护 minq，将大于 elem 的元素全部删除
        #         while self.minq and self.minq[-1] > elem:
        #             self.minq.pop()
        #         self.minq.append(elem)
        
        #     def max(self):
        #         # maxq 的头部是最大元素
        #         return self.maxq[0]
        
        #     def min(self):
        #         # minq 的头部是最大元素
        #         return self.minq[0]
        
        #     def pop(self):
        #         # 从标准队列头部弹出需要删除的元素
        #         deleteVal = self.q.popleft()
        
        #         # 由于 push 的时候会删除元素，deleteVal 可能已经被删掉了
        #         if deleteVal == self.maxq[0]:
        #             self.maxq.popleft()
        #         if deleteVal == self.minq[0]:
        #             self.minq.popleft()
        #         return deleteVal
        
        #     def size(self):
        #         # 标准队列的大小即是当前队列的大小
        #         return len(self.q)
        
        #     def isEmpty(self):
        #         return not self.q`,
            language: "python"
        },
        {
            id: 867,
            title: "Transpose Matrix",
            description: `Given a 2D integer array matrix, return the transpose of matrix. The transpose of a matrix is the matrix flipped over its main diagonal, switching the matrix's row and column indices.   Example 1: Input: matrix = [[1,2,3],[4,5,6],[7,8,9]] Output: [[1,4,7],[2,5,8],[3,6,9]] Example 2: Input: matrix = [[1,2,3],[4,5,6]] Output: [[1,4],[2,5],[3,6]]   Constraints: m == matrix.length n == matrix[i].length 1 <= m, n <= 1000 1 <= m * n <= 105 -109 <= matrix[i][j] <= 109
<a href="https://leetcode.com/problems/transpose-matrix/" target="_blank">https://leetcode.com/problems/transpose-matrix/</a>`,
            keywords: ["Array", "2ptr"],
            code: `        # cannot inplace, because m!=n
        
        class Solution:
            def transpose(self, matrix: List[List[int]]) -> List[List[int]]:
                m = len(matrix)
                n = len(matrix[0])
                res = [[matrix[i][j] for i in range(m)] for j in range(n)]
                return res`,
            language: "python"
        },
        {
            id: 875,
            title: "Koko Eating Bananas",
            description: `Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours. Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour. Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return. Return the minimum integer k such that she can eat all the bananas within h hours.   Example 1: Input: piles = [3,6,7,11], h = 8 Output: 4 Example 2: Input: piles = [30,11,23,4,20], h = 5 Output: 30 Example 3: Input: piles = [30,11,23,4,20], h = 6 Output: 23   Constraints: 1 <= piles.length <= 104 piles.length <= h <= 109 1 <= piles[i] <= 109`,
            keywords: ["BS"],
            code: `        # x: banana speed, f(x): number of hours needed
        # it’s ok is not equal to target
        
        class Solution:
            def calcH(self, piles, k):
                res = 0
                for p in piles:
                    res += (p + k - 1) // k
                return res
        
            def minEatingSpeed(self, piles: List[int], h: int) -> int:
                left = 1
                right = max(piles)
        
                while left <= right:
                    mid = left + (right - left) // 2
                    if self.calcH(piles, mid) == h:
                        right = mid - 1
                    elif self.calcH(piles, mid) > h:
                        left = mid + 1
                    elif self.calcH(piles, mid) < h:
                        right = mid - 1
                
                if left < 1 or left > max(piles):
                    return 0
                if self.calcH(piles, left) != h:
                    return left
                return left`,
            language: "python"
        },
        {
            id: 876,
            title: "Middle of the Linked List",
            description: `Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.   Example 1: Input: head = [1,2,3,4,5] Output: [3,4,5] Explanation: The middle node of the list is node 3. Example 2: Input: head = [1,2,3,4,5,6] Output: [4,5,6] Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.   Constraints: The number of nodes in the list is in the range [1, 100]. 1 <= Node.val <= 100
<a href="https://leetcode.com/problems/middle-of-the-linked-list/" target="_blank">https://leetcode.com/problems/middle-of-the-linked-list/</a>`,
            keywords: ["LinkedList", "2ptr"],
            code: `        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, val=0, next=None):
        #         self.val = val
        #         self.next = next
        class Solution:
            def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
                fast = head
                slow = head
                while fast != None and fast.next != None:
                    slow = slow.next
                    fast = fast.next.next
                return slow`,
            language: "python"
        },
        {
            id: 877,
            title: "Stone Game",
            description: `Alice and Bob play a game with piles of stones. There are an even number of piles arranged in a row, and each pile has a positive integer number of stones piles[i]. The objective of the game is to end with the most stones. The total number of stones across all the piles is odd, so there are no ties. Alice and Bob take turns, with Alice starting first. Each turn, a player takes the entire pile of stones either from the beginning or from the end of the row. This continues until there are no more piles left, at which point the person with the most stones wins. Assuming Alice and Bob play optimally, return true if Alice wins the game, or false if Bob wins.   Example 1: Input: piles = [5,3,4,5] Output: true Explanation: Alice starts first, and can only take the first 5 or the last 5. Say she takes the first 5, so that the row becomes [3, 4, 5]. If Bob takes 3, then the board is [4, 5], and Alice takes 5 to win with 10 points. If Bob takes the last 5, then the board is [3, 4], and Alice takes 4 to win with 9 points. This demonstrated that taking the first 5 was a winning move for Alice, so we return true. Example 2: Input: piles = [3,7,2,3] Output: true   Constraints: 2 <= piles.length <= 500 piles.length is even. 1 <= piles[i] <= 500 sum(piles[i]) is odd.
<a href="https://leetcode.com/problems/stone-game/description/" target="_blank">https://leetcode.com/problems/stone-game/description/</a>`,
            keywords: ["Math"],
            code: `        class Solution:
            def stoneGame(self, piles: List[int]) -> bool:
                return True
        
        # 你可以在第一步就观察好，奇数堆的石头总数多，还是偶数堆的石头总数多，然后步步为营，就一切尽在掌控之中了。知道了这个漏洞，可以整一整不知情的同学了。`,
            language: "python"
        },
        {
            id: 886,
            title: "Possible Bipartition",
            description: `We want to split a group of n people (labeled from 1 to n) into two groups of any size. Each person may dislike some other people, and they should not go into the same group. Given the integer n and the array dislikes where dislikes[i] = [ai, bi] indicates that the person labeled ai does not like the person labeled bi, return true if it is possible to split everyone into two groups in this way.   Example 1: Input: n = 4, dislikes = [[1,2],[1,3],[2,4]] Output: true Explanation: The first group has [1,4], and the second group has [2,3]. Example 2: Input: n = 3, dislikes = [[1,2],[1,3],[2,3]] Output: false Explanation: We need at least 3 groups to divide them. We cannot put them in two groups.   Constraints: 1 <= n <= 2000 0 <= dislikes.length <= 104 dislikes[i].length == 2 1 <= ai < bi <= n All the pairs of dislikes are unique.
<a href="https://leetcode.com/problems/possible-bipartition/" target="_blank">https://leetcode.com/problems/possible-bipartition/</a>`,
            keywords: ["Graph", "Bipartite"],
            code: `        # dislike is mutual
        
        class Solution:
            # DFS is simpler, adjList is simpler
            def possibleBipartition(self, n: int, dislikes: List[List[int]]) -> bool:
                self.graph = [[] for i in range(n)]
                for a, b in dislikes:
                    self.graph[a-1].append(b-1)
                    self.graph[b-1].append(a-1) # migh give false negative!
                
                self.visited = set()
                self.colors = [0 for i in range(n)]
                self.isBi = True
        
                for i in range(n):
                    self.dfs(i)
                return self.isBi
        
        
            def dfs(self, node):
                if not self.isBi:
                    return
                if node in self.visited:
                    return
                
                self.visited.add(node)
                for i in self.graph[node]:
                    if i in self.visited:
                        if self.colors[i] == self.colors[node]:
                            self.isBi = False
                            return
                    else:
                        self.colors[i] = 1 - self.colors[node]
                        self.dfs(i)
        
        # class Solution:
        #     def __init__(self):
        #         self.ok = True
        #         self.color = None
        #         self.visited = None
        
        #     def possibleBipartition(self, n: int, dislikes: List[List[int]]) -> bool:
        #         # 图节点编号从 1 开始
        #         self.color = [False] * (n + 1)
        #         self.visited = [False] * (n + 1)
        #         # 转化成邻接表表示图结构
        #         graph = self.buildGraph(n, dislikes)
        
        #         for v in range(1, n + 1):
        #             if not self.visited[v]:
        #                 self.traverse(graph, v)
        #         return self.ok
        
        #     # 建图函数
        #     def buildGraph(self, n: int, dislikes: List[List[int]]) -> List[List[int]]:
        #         # 图节点编号为 1...n
        #         graph = [[] for _ in range(n + 1)]
        #         for edge in dislikes:
        #             v = edge[1]
        #             w = edge[0]
        #             # 「无向图」相当于「双向图」
        #             # v -> w
        #             graph[v].append(w)
        #             # w -> v
        #             graph[w].append(v)
        #         return graph
        
        #     # 和之前判定二分图的 traverse 函数完全相同
        #     def traverse(self, graph: List[List[int]], v: int):
        #         if not self.ok:
        #             return
        #         self.visited[v] = True
        #         for w in graph[v]:
        #             if not self.visited[w]:
        #                 self.color[w] = not self.color[v]
        #                 self.traverse(graph, w)
        #             else:
        #                 if self.color[w] == self.color[v]:
        #                     self.ok = False`,
            language: "python"
        },
        {
            id: 889,
            title: "Construct Binary Tree from Preorder and Postorder Traversal",
            description: `Given two integer arrays, preorder and postorder where preorder is the preorder traversal of a binary tree of distinct values and postorder is the postorder traversal of the same tree, reconstruct and return the binary tree. If there exist multiple answers, you can return any of them.   Example 1: Input: preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1] Output: [1,2,3,4,5,6,7] Example 2: Input: preorder = [1], postorder = [1] Output: [1]   Constraints: 1 <= preorder.length <= 30 1 <= preorder[i] <= preorder.length All the values of preorder are unique. postorder.length == preorder.length 1 <= postorder[i] <= postorder.length All the values of postorder are unique. It is guaranteed that preorder and postorder are the preorder traversal and postorder traversal of the same binary tree.
<a href="https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/description/" target="_blank">https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/description/</a>`,
            keywords: ["BT", "BTConstruct", "Divide"],
            code: `        # Notes
        # you can pre-build a val2index for inorder
        # you can alway construct a leftSize for easier understanding.
        
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def constructFromPrePost(self, preorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
                self.pre = preorder
                self.post = postorder
                return self.build(0, 0, len(preorder))
            
            def build(self, pivotIndex, start, end):
                if start >= end:
                    return None
        
                val = self.pre[pivotIndex]
                node = TreeNode(val)
                if pivotIndex == len(self.pre) - 1:
                    return node
        
                newRoot = self.pre[pivotIndex + 1] # assume the next node is always on left child
                # Important: it might stop at left child
                if not newRoot in self.post[start:end]:
                    return node
        
                rootIndex = self.post[start:end].index(newRoot)
        
                left = self.build(pivotIndex + 1, start, start + rootIndex + 1)
                right = self.build(pivotIndex + 1 + rootIndex + 1, start + rootIndex + 1, end - 1)
                node.left = left
                node.right = right
        
                return node
        
        
        # class Solution:
        #     # 存储 postorder 中值到索引的映射
        #     valToIndex = dict()
        
        #     def constructFromPrePost(self, preorder, postorder):
        #         for i in range(len(postorder)):
        #             self.valToIndex[postorder[i]] = i
        #         return self.build(preorder, 0, len(preorder) - 1,
        #                           postorder, 0, len(postorder) - 1)
        
        #     # 定义：根据 preorder[preStart..preEnd] 和 postorder[postStart..postEnd]
        #     # 构建二叉树，并返回根节点。
        #     def build(self, preorder, preStart, preEnd,
        #               postorder, postStart, postEnd):
        #         if preStart > preEnd:
        #             return None
        #         if preStart == preEnd:
        #             return TreeNode(preorder[preStart])
        
        #         # root 节点对应的值就是前序遍历数组的第一个元素
        #         rootVal = preorder[preStart]
        #         # root.left 的值是前序遍历第二个元素
        #         # 通过前序和后序遍历构造二叉树的关键在于通过左子树的根节点
        #         # 确定 preorder 和 postorder 中左右子树的元素区间
        #         leftRootVal = preorder[preStart + 1]
        #         # leftRootVal 在后序遍历数组中的索引
        #         index = self.valToIndex[leftRootVal]
        #         # 左子树的元素个数
        #         leftSize = index - postStart + 1
             
        #         # 先构造出当前根节点
        #         root = TreeNode(rootVal)
        #         # 递归构造左右子树
        #         # 根据左子树的根节点索引和元素个数推导左右子树的索引边界
        #         root.left = self.build(preorder, preStart + 1, preStart + leftSize,
        #                                postorder, postStart, index)
        #         root.right = self.build(preorder, preStart + leftSize + 1, preEnd,
        #                                 postorder, index + 1, postEnd - 1)
        
        #         return root`,
            language: "python"
        },
        {
            id: 894,
            title: "All Possible Full Binary Trees",
            description: `Given an integer n, return a list of all possible full binary trees with n nodes. Each node of each tree in the answer must have Node.val == 0. Each element of the answer is the root node of one possible tree. You may return the final list of trees in any order. A full binary tree is a binary tree where each node has exactly 0 or 2 children.   Example 1: Input: n = 7 Output: [[0,0,0,null,null,0,0,null,null,0,0],[0,0,0,null,null,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,null,null,null,null,0,0],[0,0,0,0,0,null,null,0,0]] Example 2: Input: n = 3 Output: [[0,0,0]]   Constraints: 1 <= n <= 20
<a href="https://leetcode.com/problems/all-possible-full-binary-trees/" target="_blank">https://leetcode.com/problems/all-possible-full-binary-trees/</a>`,
            keywords: ["BT", "Divide"],
            code: `        # carefully discuss odd/even
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def allPossibleFBT(self, n: int) -> List[Optional[TreeNode]]:
                return self.helper(n)
                
            def helper(self, n):
                if n % 2 == 0:
                    return []
                if n == 1:
                    return [TreeNode(0)]
                
                res = []
                for i in range(1, n-1, 2):
                    j = n - 1 - i
                    lefts = self.helper(i)
                    rights = self.helper(j)
                    for l in lefts:
                        for r in rights:
                            node = TreeNode(0) # avoid pointer reuse
                            node.left = l
                            node.right = r
                            res.append(node)
                
                return res
        
        # With DP
        # class Solution:
        #     # 备忘录，记录 n 个节点能够组合成的所有可能二叉树
        #     memo = {}
        
        #     def allPossibleFBT(self, n: int) -> List[TreeNode]:
        #         if n % 2 == 0:
        #             # 题目描述的满二叉树不可能是偶数个节点
        #             return []
        #         self.memo = {1: [TreeNode(0)]}
        #         return self.build(n)
        
        #     # 定义：输入一个 n，生成节点树为 n 的所有可能的满二叉树
        #     def build(self, n: int) -> List[TreeNode]:
        #         if n in self.memo:
        #             # 避免冗余计算
        #             return self.memo[n]
        #         res = []
        #         # base case
        #         if n == 1:
        #             return [TreeNode(0)]
        
        #         # 递归生成所有符合条件的左右子树
        #         for i in range(1, n, 2):
        #             j = n - i - 1
        #             # 利用函数定义，生成左右子树
        #             leftSubTrees = self.build(i)
        #             rightSubTrees = self.build(j)
        #             # 左右子树的不同排列也能构成不同的二叉树
        #             for left in leftSubTrees:
        #                 for right in rightSubTrees:
        #                     # 生成根节点
        #                     root = TreeNode(0)
        #                     # 组装出一种可能的二叉树形状
        #                     root.left = left
        #                     root.right = right
        #                     # 加入结果列表
        #                     res.append(root)
        #         # 存入备忘录
        #         self.memo[n] = res
        #         return res`,
            language: "python"
        },
        {
            id: 895,
            title: "Maximum Frequency Stack",
            description: `Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack. Implement the FreqStack class: FreqStack() constructs an empty frequency stack. void push(int val) pushes an integer val onto the top of the stack. int pop() removes and returns the most frequent element in the stack. If there is a tie for the most frequent element, the element closest to the stack's top is removed and returned.   Example 1: Input ["FreqStack", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"] [[], [5], [7], [5], [7], [4], [5], [], [], [], []] Output [null, null, null, null, null, null, null, 5, 7, 5, 4] Explanation FreqStack freqStack = new FreqStack(); freqStack.push(5); // The stack is [5] freqStack.push(7); // The stack is [5,7] freqStack.push(5); // The stack is [5,7,5] freqStack.push(7); // The stack is [5,7,5,7] freqStack.push(4); // The stack is [5,7,5,7,4] freqStack.push(5); // The stack is [5,7,5,7,4,5] freqStack.pop(); // return 5, as 5 is the most frequent. The stack becomes [5,7,5,7,4]. freqStack.pop(); // return 7, as 5 and 7 is the most frequent, but 7 is closest to the top. The stack becomes [5,7,5,4]. freqStack.pop(); // return 5, as 5 is the most frequent. The stack becomes [5,7,4]. freqStack.pop(); // return 4, as 4, 5 and 7 is the most frequent, but 4 is closest to the top. The stack becomes [5,7].   Constraints: 0 <= val <= 109 At most 2 * 104 calls will be made to push and pop. It is guaranteed that there will be at least one element in the stack before calling pop.
<a href="https://leetcode.com/problems/maximum-frequency-stack/" target="_blank">https://leetcode.com/problems/maximum-frequency-stack/</a>`,
            keywords: ["Stack"],
            code: `        # freq2vals is a very dedicated struct, that save same value for different freq bin.
        
        class FreqStack:
        
            def __init__(self):
                self.val2freq = {}
                self.freq2vals = {}
                self.maxFreq = 0
        
            def push(self, val: int) -> None:
                if val in self.val2freq:
                    freq = self.val2freq[val]
                    freq += 1
                else:
                    freq = 1
                self.val2freq[val] = freq
                if freq in self.freq2vals:
                    self.freq2vals[freq].append(val)
                else:
                    self.freq2vals[freq] = [val]
                self.maxFreq = max(self.maxFreq, freq)
                
        
            def pop(self) -> int:
                # each only appear once in freq2vals with fixed freq
                # val apear multiple times in different freq
                vals = self.freq2vals[self.maxFreq]
                val = vals[-1]
                vals.pop()
                self.val2freq[val] = self.maxFreq - 1
                if len(vals) == 0:
                    self.maxFreq -= 1
                return val
                
        
        
        # Your FreqStack object will be instantiated and called as such:
        # obj = FreqStack()
        # obj.push(val)
        # param_2 = obj.pop()
        
        # class FreqStack:
        #     def __init__(self):
        #         # 记录 FreqStack 中元素的最大频率
        #         self.maxFreq = 0
        #         # 记录 FreqStack 中每个 val 对应的出现频率，后文就称为 VF 表
        #         self.valToFreq = {}
        #         # 记录频率 freq 对应的 val 列表，后文就称为 FV 表
        #         self.freqToVals = {}
        
        #     def push(self, val: int) -> None:
        #         # 修改 VF 表：val 对应的 freq 加一
        #         freq = self.valToFreq.get(val, 0) + 1
        #         self.valToFreq[val] = freq
        #         # 修改 FV 表：在 freq 对应的列表加上 val
        #         if freq not in self.freqToVals:
        #             self.freqToVals[freq] = []
        #         self.freqToVals[freq].append(val)
        #         # 更新 maxFreq
        #         self.maxFreq = max(self.maxFreq, freq)
        
        #     def pop(self) -> int:
        #         # 修改 FV 表：pop 出一个 maxFreq 对应的元素 v
        #         vals = self.freqToVals[self.maxFreq]
        #         v = vals.pop()
        #         # 修改 VF 表：v 对应的 freq 减一
        #         self.valToFreq[v] -= 1
        #         # 更新 maxFreq
        #         if not vals:
        #             # 如果 maxFreq 对应的元素空了
        #             self.maxFreq -= 1
        #         return v`,
            language: "python"
        },
        {
            id: 901,
            title: "Online Stock Span",
            description: `Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day. The span of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day. For example, if the prices of the stock in the last four days is [7,2,1,2] and the price of the stock today is 2, then the span of today is 4 because starting from today, the price of the stock was less than or equal 2 for 4 consecutive days. Also, if the prices of the stock in the last four days is [7,34,1,2] and the price of the stock today is 8, then the span of today is 3 because starting from today, the price of the stock was less than or equal 8 for 3 consecutive days. Implement the StockSpanner class: StockSpanner() Initializes the object of the class. int next(int price) Returns the span of the stock's price given that today's price is price.   Example 1: Input ["StockSpanner", "next", "next", "next", "next", "next", "next", "next"] [[], [100], [80], [60], [70], [60], [75], [85]] Output [null, 1, 1, 1, 2, 1, 4, 6] Explanation StockSpanner stockSpanner = new StockSpanner(); stockSpanner.next(100); // return 1 stockSpanner.next(80); // return 1 stockSpanner.next(60); // return 1 stockSpanner.next(70); // return 2 stockSpanner.next(60); // return 1 stockSpanner.next(75); // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price. stockSpanner.next(85); // return 6   Constraints: 1 <= price <= 105 At most 104 calls will be made to next.
<a href="https://leetcode.com/problems/online-stock-span/" target="_blank">https://leetcode.com/problems/online-stock-span/</a>`,
            keywords: ["MonotonicStack"],
            code: `        # (self.day, price)
        # use relative count can avoid using class member absolute day
        
        class StockSpanner:
        
            def __init__(self):
                self.pg = [] # (day, price)
                self.day = 0 # use rel. cnt can avoid this abs. day
        
            def next(self, price: int) -> int:
                while self.pg and self.pg[-1][1] <= price:
                    self.pg.pop()
                res = self.day - self.pg[-1][0] if self.pg else self.day + 1
                
                self.pg.append((self.day, price))
                self.day += 1
                return res
        
        
        
        # Your StockSpanner object will be instantiated and called as such:
        # obj = StockSpanner()
        # param_1 = obj.next(price)
        
        
        # class StockSpanner:
        #     # int[] 记录 {价格，小于等于该价格的天数} 二元组
        #     def __init__(self):
        #         self.stk = []
        
        #     def next(self, price: int) -> int:
        #         # 算上当天
        #         count = 1
        #         # 单调栈模板
        #         while self.stk and price >= self.stk[-1][0]:
        #             # 挤掉价格低于 price 的记录
        #             prev = self.stk.pop()
        #             # 计算小于等于 price 的天数
        #             count += prev[1]
        #         self.stk.append([price, count])
        
        #         return count`,
            language: "python"
        },
        {
            id: 918,
            title: "Maximum Sum Circular Subarray",
            description: `Given a circular integer array nums of length n, return the maximum possible sum of a non-empty subarray of nums. A circular array means the end of the array connects to the beginning of the array. Formally, the next element of nums[i] is nums[(i + 1) % n] and the previous element of nums[i] is nums[(i - 1 + n) % n]. A subarray may only include each element of the fixed buffer nums at most once. Formally, for a subarray nums[i], nums[i + 1], ..., nums[j], there does not exist i <= k1, k2 <= j with k1 % n == k2 % n.   Example 1: Input: nums = [1,-2,3,-2] Output: 3 Explanation: Subarray [3] has maximum sum 3. Example 2: Input: nums = [5,-3,5] Output: 10 Explanation: Subarray [5,5] has maximum sum 5 + 5 = 10. Example 3: Input: nums = [-3,-2,-3] Output: -2 Explanation: Subarray [-2] has maximum sum -2.   Constraints: n == nums.length 1 <= n <= 3 * 104 -3 * 104 <= nums[i] <= 3 * 104
<a href="https://leetcode.com/problems/maximum-sum-circular-subarray/" target="_blank">https://leetcode.com/problems/maximum-sum-circular-subarray/</a>`,
            keywords: ["MonotonicQueue", "SlidingWindow", "PrefixSum"],
            code: `        # circular
        # Why sliding window not working: result is from right and min in window, not left/right
        
        from collections import deque
        class Solution:
            def maxSubarraySumCircular(self, nums: List[int]) -> int:
                minq = deque()
                left = 0
                right = 0
                n = len(nums)
                preSum = [0]
                acc = 0
                for i in range(2*n):
                    acc += nums[i%n]
                    preSum.append(acc)
                init = -3*10**4 - 1
                res = init
                while right < 2*n:
                    while minq and minq[-1] > preSum[right]:
                        minq.pop()
                    minq.append(preSum[right])
                    right += 1
                    
                    while right - left > n:
                        if minq[0] == preSum[left]:
                            minq.popleft()
                        left += 1
                    res = max(res, preSum[right] - minq[0])
                return res 
        # class Solution:
        #     def maxSubarraySumCircular(self, nums: List[int]) -> int:
        #         n = len(nums)
        #         # 模拟环状的 nums 数组
        #         preSum = [0] * (2 * n + 1)
        #         preSum[0] = 0
        #         # 计算环状 nums 的前缀和
        #         for i in range(1, len(preSum)):
        #             preSum[i] = preSum[i - 1] + nums[(i - 1) % n]
        #         # 记录答案
        #         maxSum = float('-inf')
        #         # 维护一个滑动窗口，以便根据窗口中的最小值计算最大子数组和
        #         window = MonotonicQueue()
        #         window.push(0)
        #         for i in range(1, len(preSum)):
        #             maxSum = max(maxSum, preSum[i] - window.min())
        #             # 维护窗口的大小为 nums 数组的大小
        #             if window.size() == n:
        #                 window.pop()
        #             window.push(preSum[i])
        #         return maxSum
        
        # # 下面给出的是单调队列的通用实现，运行速度可能较慢，你可以自行简化提升速度
        # # 单调队列的详细解析见
        # # https://labuladong.online/algo/problem-set/monotonic-queue/
        # class MonotonicQueue:
        #     # 常规队列，存储所有元素
        #     def __init__(self):
        #         self.q = collections.deque()
        #         # 元素降序排列的单调队列，头部是最大值
        #         self.maxq = collections.deque()
        #         # 元素升序排列的单调队列，头部是最小值
        #         self.minq = collections.deque()
        
        #     def push(self, elem):
        #         # 维护常规队列，直接在队尾插入元素
        #         self.q.append(elem)
        
        #         # 维护 maxq，将小于 elem 的元素全部删除
        #         while self.maxq and self.maxq[-1] < elem:
        #             self.maxq.pop()
        #         self.maxq.append(elem)
        
        #         # 维护 minq，将大于 elem 的元素全部删除
        #         while self.minq and self.minq[-1] > elem:
        #             self.minq.pop()
        #         self.minq.append(elem)
        
        #     def max(self):
        #         # maxq 的头部是最大元素
        #         return self.maxq[0]
        
        #     def min(self):
        #         # minq 的头部是最大元素
        #         return self.minq[0]
        
        #     def pop(self):
        #         # 从标准队列头部弹出需要删除的元素
        #         deleteVal = self.q.popleft()
        
        #         # 由于 push 的时候会删除元素，deleteVal 可能已经被删掉了
        #         if deleteVal == self.maxq[0]:
        #             self.maxq.popleft()
        #         if deleteVal == self.minq[0]:
        #             self.minq.popleft()
        #         return deleteVal
        
        #     def size(self):
        #         # 标准队列的大小即是当前队列的大小
        #         return len(self.q)
        
        #     def isEmpty(self):
        #         return not self.q`,
            language: "python"
        },
        {
            id: 919,
            title: "Complete Binary Tree Inserter",
            description: `A complete binary tree is a binary tree in which every level, except possibly the last, is completely filled, and all nodes are as far left as possible. Design an algorithm to insert a new node to a complete binary tree keeping it complete after the insertion. Implement the CBTInserter class: CBTInserter(TreeNode root) Initializes the data structure with the root of the complete binary tree. int insert(int v) Inserts a TreeNode into the tree with value Node.val == val so that the tree remains complete, and returns the value of the parent of the inserted TreeNode. TreeNode get_root() Returns the root node of the tree.   Example 1: Input ["CBTInserter", "insert", "insert", "get_root"] [[[1, 2]], [3], [4], []] Output [null, 1, 2, [1, 2, 3, 4]] Explanation CBTInserter cBTInserter = new CBTInserter([1, 2]); cBTInserter.insert(3); // return 1 cBTInserter.insert(4); // return 2 cBTInserter.get_root(); // return [1, 2, 3, 4]   Constraints: The number of nodes in the tree will be in the range [1, 1000]. 0 <= Node.val <= 5000 root is a complete binary tree. 0 <= val <= 5000 At most 104 calls will be made to insert and get_root.
<a href="https://leetcode.com/problems/complete-binary-tree-inserter/" target="_blank">https://leetcode.com/problems/complete-binary-tree-inserter/</a>`,
            keywords: ["BFS"],
            code: `        # first check whether all have children in this level, whether to move to next level
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        from collections import deque
        class CBTInserter:
        
            def __init__(self, root: Optional[TreeNode]):
                self.root = root
                self.last_nodes = deque()
                self.last_nodes.append(root)
                self.updateLastNodes()
        
            def updateLastNodes(self):
                while self.last_nodes:
                    sz = len(self.last_nodes)
                    toPop = True
                    for i in range(sz):
                        cur = self.last_nodes[i]
                        if cur.left is None or cur.right is None:
                            toPop = False
                    if toPop:
                        for i in range(sz):
                            cur = self.last_nodes.popleft()
                            if cur.left:
                                self.last_nodes.append(cur.left)
                            if cur.right:
                                self.last_nodes.append(cur.right)
                    else:
                        break
        
        
            def insert(self, val: int) -> int:
                # if self.root is None:
                #     self.root = TreeNode(val)
                #     self.last_nodes = [self.root]
                #     return -1
        
                for i in range(len(self.last_nodes)):
                    if self.last_nodes[i].left is None:
                        self.last_nodes[i].left = TreeNode(val)
                        return self.last_nodes[i].val
                    if self.last_nodes[i].right is None:
                        self.last_nodes[i].right = TreeNode(val)
                        return self.last_nodes[i].val
        
                self.updateLastNodes()
                self.last_nodes[0].left = TreeNode(val)
                return self.last_nodes[0].val
        
            def get_root(self) -> Optional[TreeNode]:
                return self.root
        
        
        # Your CBTInserter object will be instantiated and called as such:
        # obj = CBTInserter(root)
        # param_1 = obj.insert(val)
        # param_2 = obj.get_root()`,
            language: "python"
        },
        {
            id: 931,
            title: "Minimum Falling Path Sum",
            description: `Given an n x n array of integers matrix, return the minimum sum of any falling path through matrix. A falling path starts at any element in the first row and chooses the element in the next row that is either directly below or diagonally left/right. Specifically, the next element from position (row, col) will be (row + 1, col - 1), (row + 1, col), or (row + 1, col + 1).   Example 1: Input: matrix = [[2,1,3],[6,5,4],[7,8,9]] Output: 13 Explanation: There are two falling paths with a minimum sum as shown. Example 2: Input: matrix = [[-19,57],[-40,-5]] Output: -59 Explanation: The falling path with a minimum sum is shown.   Constraints: n == matrix.length == matrix[i].length 1 <= n <= 100 -100 <= matrix[i][j] <= 100
<a href="https://leetcode.com/problems/minimum-falling-path-sum/" target="_blank">https://leetcode.com/problems/minimum-falling-path-sum/</a>`,
            keywords: ["DP"],
            code: `        # def -> init -> state conversion
        
        class Solution:
            def minFallingPathSum(self, matrix: List[List[int]]) -> int:
                m = len(matrix)
                n = len(matrix[0])
                memo = [[float('inf') for j in range(n)] for i in range(m)]
        
                for j in range(n):
                    memo[0][j] = matrix[0][j]
                
                for i in range(1, m):
                    for j in range(n):
                        # dp
                        for dj in (-1, 0, 1):
                            if j+dj < 0 or j+dj >= n:
                                continue
                            memo[i][j] = min(memo[i][j], memo[i-1][j+dj] + matrix[i][j])
                
                return min(memo[m-1])
        
        # class Solution:
        #     def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        #         n = len(matrix)
        #         res = float('inf')
        #         # 备忘录里的值初始化为 66666
        #         self.memo = [[66666 for _ in range(n)] for _ in range(n)]
        #         # 终点可能在 matrix[n-1] 的任意一列
        #         for j in range(n):
        #             res = min(res, self.dp(matrix, n - 1, j))
        #         return res
        
        #     # 备忘录
        #     memo = []
        
        #     def dp(self, matrix: List[List[int]], i: int, j: int) -> int:
        #         # 1、索引合法性检查
        #         if i < 0 or j < 0 or i >= len(matrix) or j >= len(matrix[0]):
        #             return 99999
        #         # 2、base case
        #         if i == 0:
        #             return matrix[0][j]
        #         # 3、查找备忘录，防止重复计算
        #         if self.memo[i][j] != 66666:
        #             return self.memo[i][j]
        #         # 进行状态转移
        #         self.memo[i][j] = matrix[i][j] + min(
        #             self.dp(matrix, i - 1, j),
        #             self.dp(matrix, i - 1, j - 1),
        #             self.dp(matrix, i - 1, j + 1)
        #         )
        #         return self.memo[i][j]`,
            language: "python"
        },
        {
            id: 933,
            title: "Number of Recent Calls",
            description: `You have a RecentCounter class which counts the number of recent requests within a certain time frame. Implement the RecentCounter class: RecentCounter() Initializes the counter with zero recent requests. int ping(int t) Adds a new request at time t, where t represents some time in milliseconds, and returns the number of requests that has happened in the past 3000 milliseconds (including the new request). Specifically, return the number of requests that have happened in the inclusive range [t - 3000, t]. It is guaranteed that every call to ping uses a strictly larger value of t than the previous call.   Example 1: Input ["RecentCounter", "ping", "ping", "ping", "ping"] [[], [1], [100], [3001], [3002]] Output [null, 1, 2, 3, 3] Explanation RecentCounter recentCounter = new RecentCounter(); recentCounter.ping(1); // requests = [1], range is [-2999,1], return 1 recentCounter.ping(100); // requests = [1, 100], range is [-2900,100], return 2 recentCounter.ping(3001); // requests = [1, 100, 3001], range is [1,3001], return 3 recentCounter.ping(3002); // requests = [1, 100, 3001, 3002], range is [2,3002], return 3   Constraints: 1 <= t <= 109 Each test case will call ping with strictly increasing values of t. At most 104 calls will be made to ping.
<a href="https://leetcode.com/problems/number-of-recent-calls/description/" target="_blank">https://leetcode.com/problems/number-of-recent-calls/description/</a>`,
            keywords: ["Queue"],
            code: `        from collections import deque
        class RecentCounter:
        
            def __init__(self):
                self.q = deque()
        
            def ping(self, t: int) -> int:
                while self.q and t - self.q[0] > 3000:
                    self.q.popleft()
                self.q.append(t)
                return len(self.q)
                
        
        
        # Your RecentCounter object will be instantiated and called as such:
        # obj = RecentCounter()
        # param_1 = obj.ping(t)`,
            language: "python"
        },
        {
            id: 950,
            title: "Reveal Cards In Increasing Order",
            description: `You are given an integer array deck. There is a deck of cards where every card has a unique integer. The integer on the ith card is deck[i]. You can order the deck in any order you want. Initially, all the cards start face down (unrevealed) in one deck. You will do the following steps repeatedly until all cards are revealed: Take the top card of the deck, reveal it, and take it out of the deck. If there are still cards in the deck then put the next top card of the deck at the bottom of the deck. If there are still unrevealed cards, go back to step 1. Otherwise, stop. Return an ordering of the deck that would reveal the cards in increasing order. Note that the first entry in the answer is considered to be the top of the deck.   Example 1: Input: deck = [17,13,11,2,3,5,7] Output: [2,13,3,11,5,17,7] Explanation: We get the deck in the order [17,13,11,2,3,5,7] (this order does not matter), and reorder it. After reordering, the deck starts as [2,13,3,11,5,17,7], where 2 is the top of the deck. We reveal 2, and move 13 to the bottom. The deck is now [3,11,5,17,7,13]. We reveal 3, and move 11 to the bottom. The deck is now [5,17,7,13,11]. We reveal 5, and move 17 to the bottom. The deck is now [7,13,11,17]. We reveal 7, and move 13 to the bottom. The deck is now [11,17,13]. We reveal 11, and move 17 to the bottom. The deck is now [13,17]. We reveal 13, and move 17 to the bottom. The deck is now [17]. We reveal 17. Since all the cards revealed are in increasing order, the answer is correct. Example 2: Input: deck = [1,1000] Output: [1,1000]   Constraints: 1 <= deck.length <= 1000 1 <= deck[i] <= 106 All the values of deck are unique.
<a href="https://leetcode.com/problems/reveal-cards-in-increasing-order/description/" target="_blank">https://leetcode.com/problems/reveal-cards-in-increasing-order/description/</a>`,
            keywords: ["Design"],
            code: `        # op3-rev, op2-rev, op1-rev
        
        from collections import deque
        
        class Solution:
            def deckRevealedIncreasing(self, deck: List[int]) -> List[int]:
                n = len(deck)
                res = deque()
                deck.sort()
        
                # op3-rev: appendleft
                # op2-rev: pop -> appendleft
                # op1-rev: same as op3, but indicates must end with op3-rev
                for i in range(n-1, -1, -1):
                    # op3-rev
                    res.appendleft(deck[i])
                    # op2-rev
                    # check if current loop is op1-rev
                    if i != 0:
                        x = res.pop()
                        res.appendleft(x)
                
                return list(res)
        
        
        
        # from collections import deque
        
        # class Solution:
        #     def deckRevealedIncreasing(self, deck: List[int]) -> List[int]:
        #         n = len(deck)
        #         # 链表头部代表牌堆顶，尾部代表牌堆底
        #         res = deque()
        #         # 升序排列，然后从倒着遍历，就是点数递减
        #         deck.sort()
        #         for i in range(n - 1, -1, -1):
        #             if res:
        #                 res.appendleft(res.pop())
        #             res.appendleft(deck[i])
        
        #         # 将双链表转化成 Java 的数组
        #         return list(res)`,
            language: "python"
        },
        {
            id: 958,
            title: "Check Completeness of a Binary Tree",
            description: `Given the root of a binary tree, determine if it is a complete binary tree. In a complete binary tree, every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.   Example 1: Input: root = [1,2,3,4,5,6] Output: true Explanation: Every level before the last is full (ie. levels with node-values {1} and {2, 3}), and all nodes in the last level ({4, 5, 6}) are as far left as possible. Example 2: Input: root = [1,2,3,4,5,null,7] Output: false Explanation: The node with value 7 isn't as far left as possible.   Constraints: The number of nodes in the tree is in the range [1, 100]. 1 <= Node.val <= 1000
<a href="https://leetcode.com/problems/check-completeness-of-a-binary-tree/" target="_blank">https://leetcode.com/problems/check-completeness-of-a-binary-tree/</a>`,
            keywords: ["CBT", "BFS"],
            code: `        # Never renew the hasNone var in the loop
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        from collections import deque
        class Solution:
            def isCompleteTree(self, root: Optional[TreeNode]) -> bool:
                q = deque()
        
                if root is None:
                    return None
        
                q.append(root)
                # Put outmost
                hasNone = False
        
                while q:
                    sz = len(q)
                    for i in range(sz):
                        cur = q.popleft()
        
                        if cur:
                            if hasNone:
                                return False
                            q.append(cur.left)
                            q.append(cur.right)
                        else:
                            hasNone = True
                return True
          
        # from collections import deque
        
        # class Solution:
        #     def isCompleteTree(self, root: TreeNode) -> bool:
        #         q = deque([root])
        #         end = False
        #         while q:
        #             sz = len(q)
        #             for i in range(sz):
        #                 cur = q.popleft()
        #                 if cur is None:
        #                     end = True
        #                 else:
        #                     if end:
        #                         return False
        #                     q.append(cur.left)
        #                     q.append(cur.right)
        #         return True`,
            language: "python"
        },
        {
            id: 967,
            title: "Numbers With Same Consecutive Differences",
            description: `Given two integers n and k, return an array of all the integers of length n where the difference between every two consecutive digits is k. You may return the answer in any order. Note that the integers should not have leading zeros. Integers as 02 and 043 are not allowed.   Example 1: Input: n = 3, k = 7 Output: [181,292,707,818,929] Explanation: Note that 070 is not a valid number, because it has leading zeroes. Example 2: Input: n = 2, k = 1 Output: [10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98]   Constraints: 2 <= n <= 9 0 <= k <= 9
<a href="https://leetcode.com/problems/numbers-with-same-consecutive-differences/" target="_blank">https://leetcode.com/problems/numbers-with-same-consecutive-differences/</a>`,
            keywords: ["DFS", "Backtrack"],
            code: `        # 为什么你会看到两种写法？它们有何区别？
        # 第一种写法是标准的回溯算法框架 (do/redo in loop)，第二种写法(do outside loop)，如果非要区分的话，它其实应该归为 DFS 算法框架。
        # 它俩的本质是一样的，都是「遍历」思维下的暴力穷举算法。唯一的区别在于关注点不同，回溯算法的关注点在「树枝」，DFS 算法的关注点在「节点」。
        # backtrack/dfs/traverse 函数可以有返回值吗？
        # 所有利用「遍历」思维的递归函数都是相同的道理，建议设置函数名为 traverse/dfs/backtrack，函数不要有返回值，通过外部变量来控制递归的终止。
        # base case 和剪枝应该写在哪里？
        # 这两种写法当然都可以啦，但是我的一般习惯是，把能提到函数开头的判断逻辑都提到函数开头，因为递归部分是填写前中后序代码的位置，尽量不要和 base case 的逻辑混到一起，否则容易混乱。
        # 在我优化回溯算法的时候，会习惯把剪枝逻辑放在递归之前，类似这样：
        
        class Solution:
            def numsSameConsecDiff(self, n: int, k: int) -> List[int]:
                self.res = []
                self.track = []
                self.n = n
                self.k = k
                self.backtrack()
                return self.res
            
            def backtrack(self):
                if len(self.track) == self.n:
                    self.res.append(int(''.join([str(i) for i in self.track])))
                    return
                if len(self.track) > self.n:
                    return
                
                for i in range(10):
                    if len(self.track) == 0 and i == 0:
                        continue
                    if len(self.track) == 0:
                        self.track.append(i)
                        self.backtrack()
                        self.track.pop()
                    else:
                        if abs(i - self.track[-1]) == self.k:
                            self.track.append(i)
                            self.backtrack()
                            self.track.pop()`,
            language: "python"
        },
        {
            id: 977,
            title: "Squares of a Sorted Array",
            description: `Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.   Example 1: Input: nums = [-4,-1,0,3,10] Output: [0,1,9,16,100] Explanation: After squaring, the array becomes [16,1,0,9,100]. After sorting, it becomes [0,1,9,16,100]. Example 2: Input: nums = [-7,-3,2,3,11] Output: [4,9,9,49,121]   Constraints: 1 <= nums.length <= 104 -104 <= nums[i] <= 104 nums is sorted in non-decreasing order.   Follow up: Squaring each element and sorting the new array is very trivial, could you find an O(n) solution using a different approach?
<a href="https://leetcode.com/problems/squares-of-a-sorted-array/description/" target="_blank">https://leetcode.com/problems/squares-of-a-sorted-array/description/</a>`,
            keywords: ["Array", "2ptr"],
            code: `        # no requirement on space, can be just O(n)
        # should either 1. find where 0 is
        # or from left and right
        
        class Solution:
            def sortedSquares(self, nums: List[int]) -> List[int]:
                left = 0
                right = len(nums) - 1
                res = [0] * len(nums)
                cur = right
                while cur >= 0:
                    if nums[left] ** 2 < nums[right] ** 2:
                        res[cur] = nums[right] ** 2
                        right -= 1
                    else:
                        res[cur] = nums[left] ** 2
                        left += 1
                    cur -= 1
                
                return res`,
            language: "python"
        },
        {
            id: 980,
            title: "Unique Paths III",
            description: `You are given an m x n integer array grid where grid[i][j] could be: 1 representing the starting square. There is exactly one starting square. 2 representing the ending square. There is exactly one ending square. 0 representing empty squares we can walk over. -1 representing obstacles that we cannot walk over. Return the number of 4-directional walks from the starting square to the ending square, that walk over every non-obstacle square exactly once.   Example 1: Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,2,-1]] Output: 2 Explanation: We have the following two paths: 1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2) 2. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2) Example 2: Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,0,2]] Output: 4 Explanation: We have the following four paths: 1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2),(2,3) 2. (0,0),(0,1),(1,1),(1,0),(2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(1,3),(2,3) 3. (0,0),(1,0),(2,0),(2,1),(2,2),(1,2),(1,1),(0,1),(0,2),(0,3),(1,3),(2,3) 4. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2),(2,3) Example 3: Input: grid = [[0,1],[2,0]] Output: 0 Explanation: There is no path that walks over every empty square exactly once. Note that the starting and ending square can be anywhere in the grid.   Constraints: m == grid.length n == grid[i].length 1 <= m, n <= 20 1 <= m * n <= 20 -1 <= grid[i][j] <= 2 There is exactly one starting cell and one ending cell.
<a href="https://leetcode.com/problems/unique-paths-iii/" target="_blank">https://leetcode.com/problems/unique-paths-iii/</a>`,
            keywords: ["DFS", "Backtrack"],
            code: `        # need to count how many cells
        
        class Solution:
            def uniquePathsIII(self, grid: List[List[int]]) -> int:
                self.grid = grid
                self.m = len(self.grid)
                self.n= len(self.grid[0])
                self.visited = [[False for j in range(self.n)] for i in range(self.m)]
                self.total = self.m*self.n
                self.cnt = 1
                
                for i in range(self.m):
                    for j in range(self.n):
                        if self.grid[i][j] == -1:
                            self.total -= 1
                for i in range(self.m):
                    for j in range(self.n):
                        if self.grid[i][j] == 1:
                            self.visited[i][j] = True
                            return self.backtrack(i, j)
                
        
            
            def backtrack(self, i, j):
                if i < 0 or i >= self.m or j < 0 or j>= self.n:
                    return 0
                if self.grid[i][j] == 2:
                    if self.cnt == self.total:
                        return 1
                    return 0
                if self.grid[i][j] == -1:
                    return 0
                
                res = 0
                for di, dj in ((0, 1), (0, -1), (1, 0), (-1, 0)):
                    if i+di < 0 or i+di >= self.m or j+dj < 0 or j+dj>= self.n:
                        continue
                    if self.visited[i+di][j+dj]:
                        continue
                    self.visited[i+di][j+dj] = True
                    self.cnt += 1
                    res += self.backtrack(i+di, j+dj)
                    self.cnt -= 1
                    self.visited[i+di][j+dj] = False
                return res`,
            language: "python"
        },
        {
            id: 986,
            title: "Interval List Intersections",
            description: `You are given two lists of closed intervals, firstList and secondList, where firstList[i] = [starti, endi] and secondList[j] = [startj, endj]. Each list of intervals is pairwise disjoint and in sorted order. Return the intersection of these two interval lists. A closed interval [a, b] (with a <= b) denotes the set of real numbers x with a <= x <= b. The intersection of two closed intervals is a set of real numbers that are either empty or represented as a closed interval. For example, the intersection of [1, 3] and [2, 4] is [2, 3].   Example 1: Input: firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]] Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]] Example 2: Input: firstList = [[1,3],[5,9]], secondList = [] Output: []   Constraints: 0 <= firstList.length, secondList.length <= 1000 firstList.length + secondList.length >= 1 0 <= starti < endi <= 109 endi < starti+1 0 <= startj < endj <= 109 endj < startj+1
<a href="https://leetcode.com/problems/interval-list-intersections/" target="_blank">https://leetcode.com/problems/interval-list-intersections/</a>`,
            keywords: ["Range"],
            code: `        # case5: joint set of two lists of ranges: sort, greedy(advance: end2 < end1 end2 advance, find joint: max(start) min(end))
        
        class Solution:
            def intervalIntersection(self, A, B):
                # 双指针
                i, j = 0, 0
                res = []
                while i < len(A) and j < len(B):
                    a1, a2 = A[i][0], A[i][1]
                    b1, b2 = B[j][0], B[j][1]
                    # 两个区间存在交集
                    if b2 >= a1 and a2 >= b1:
                        # 计算出交集，加入 res
                        res.append([max(a1, b1), min(a2, b2)])
                    # 指针前进
                    if b2 < a2:
                        j += 1
                    else:
                        i += 1
                return res`,
            language: "python"
        },
        {
            id: 988,
            title: "Smallest String Starting From Leaf",
            description: `You are given the root of a binary tree where each node has a value in the range [0, 25] representing the letters 'a' to 'z'. Return the lexicographically smallest string that starts at a leaf of this tree and ends at the root. As a reminder, any shorter prefix of a string is lexicographically smaller. For example, "ab" is lexicographically smaller than "aba". A leaf of a node is a node that has no children.   Example 1: Input: root = [0,1,2,3,4,3,4] Output: "dba" Example 2: Input: root = [25,1,3,1,3,0,2] Output: "adz" Example 3: Input: root = [2,2,1,null,1,0,null,0] Output: "abc"   Constraints: The number of nodes in the tree is in the range [1, 8500]. 0 <= Node.val <= 25
<a href="https://leetcode.com/problems/smallest-string-starting-from-leaf/" target="_blank">https://leetcode.com/problems/smallest-string-starting-from-leaf/</a>`,
            keywords: ["BT", "BTTraverse"],
            code: `        # Cannot optimize further because starting from leaf
        # chr(ord('a') + node.val)
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        
        class Solution:
            def smallestFromLeaf(self, root: Optional[TreeNode]) -> str:
                self.cur = ""
                self.res = ""
                self.traverse(root)
        
                return self.res
            
            def traverse(self, node):
                if node is None:
                    return
                
                self.cur = chr(ord('a') + node.val) + self.cur
        
                if node.left is None and node.right is None:
                    if self.res == "":
                        self.res = self.cur
                    else:
                        self.res = min(self.res, self.cur)
                    self.cur = self.cur[1:]
                    return
        
                self.traverse(node.left)
                self.traverse(node.right)
        
                self.cur = self.cur[1:]
        
        
        # Because compare starting from leaf, cannot optimize
        # class Solution:
        #     def smallestFromLeaf(self, root: TreeNode) -> str:
        #         self.traverse(root)
        #         return self.res
            
        #     # 遍历过程中的路径
        #     path = ""
        #     res = None
        
        #     # 二叉树遍历函数
        #     def traverse(self, root):
        #         if root is None:
        #             return
        #         if root.left is None and root.right is None:
        #             # 找到叶子结点，比较字典序最小的路径
        #             # 结果字符串是从叶子向根，所以需要反转
        #             self.path = chr(ord('a') + root.val) + self.path
        
        #             s = self.path
        #             if self.res is None or self.res > s:
        #                 # 如果字典序更小，则更新 res
        #                 self.res = s
        
        #             # 恢复，正确维护 path 中的元素
        #             self.path = self.path[1:]
        #             return
        #         # 前序位置
        #         self.path = chr(ord('a') + root.val) + self.path
        
        #         self.traverse(root.left)
        #         self.traverse(root.right)
        
        #         # 后序位置
        #         self.path = self.path[1:]`,
            language: "python"
        },
        {
            id: 994,
            title: "Rotting Oranges",
            description: `You are given an m x n grid where each cell can have one of three values: 0 representing an empty cell, 1 representing a fresh orange, or 2 representing a rotten orange. Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.   Example 1: Input: grid = [[2,1,1],[1,1,0],[0,1,1]] Output: 4 Example 2: Input: grid = [[2,1,1],[0,1,1],[1,0,1]] Output: -1 Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally. Example 3: Input: grid = [[0,2]] Output: 0 Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.   Constraints: m == grid.length n == grid[i].length 1 <= m, n <= 10 grid[i][j] is 0, 1, or 2.
<a href="https://leetcode.com/problems/rotting-oranges/" target="_blank">https://leetcode.com/problems/rotting-oranges/</a>`,
            keywords: ["BFS"],
            code: `        # conditions: visited, border, fresh, need convert all numbers, then bfs each rotten, then collect max
        
        from collections import deque
         
        class Solution:
            def orangesRotting(self, grid: List[List[int]]) -> int:
                m = len(grid)
                n = len(grid[0])
                self.m = m
                self.n = n
                self.grid = grid
                for i in range(m):
                    for j in range(n):
                        if grid[i][j] == 0:
                            grid[i][j] = -1
                        if grid[i][j] == 1:
                            grid[i][j] = float('inf')
                        elif grid[i][j] == 2:
                            grid[i][j] = 0
                # not necessary, just enqueue all
                for i in range(m):
                    for j in range(n):
                        if grid[i][j] == 0:
                            self.bfs(i, j)
                res = 0
                for i in range(m):
                    for j in range(n):
                        res = max(res, grid[i][j])
                return res if res != float('inf') else -1
            
            def bfs(self, i, j):
                q = deque()
                visited = set()
        
                q.append((i, j))
                
                cnt = 0
                while q:
                    sz = len(q)
                    for _ in range(sz):
                        cur = q.popleft()
                        i, j = cur
                        if cur in visited:
                            continue
                        visited.add(cur)
                        if i<0 or i>=self.m or j<0 or j>=self.n:
                            continue
                        if self.grid[i][j] == -1:
                            continue
                        
                        self.grid[i][j] = min(self.grid[i][j], cnt)
                        for di, dj in ((0,1),(0,-1),(1,0),(-1,0)):
                            q.append((i+di,j+dj))
                    cnt += 1
        
        # from collections import deque
        
        # class Solution:
        #     def orangesRotting(self, grid: List[List[int]]) -> int:
        #         queue = deque()
        #         m, n = len(grid), len(grid[0])
        #         # 把所有腐烂的橘子加入队列，作为 BFS 的起点
        #         for i in range(m):
        #             for j in range(n):
        #                 if grid[i][j] == 2:
        #                     queue.append((i, j))
                
        #         # 方向数组，方便计算上下左右的坐标
        #         dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        
        #         # BFS 算法框架
        #         step = 0
        #         while queue:
        #             sz = len(queue)
        #             # 取出当前层所有节点，往四周扩散一层
        #             for _ in range(sz):
        #                 point = queue.popleft()
        #                 for dir in dirs:
        #                     x, y = point[0] + dir[0], point[1] + dir[1]
        #                     if 0 <= x < m and 0 <= y < n and grid[x][y] == 1:
        #                         grid[x][y] = 2
        #                         queue.append((x, y))
        #             # 扩散步数加一
        #             step += 1
        
        #         # 检查是否还有新鲜橘子
        #         for i in range(m):
        #             for j in range(n):
        #                 # 有新鲜橘子，返回 -1
        #                 if grid[i][j] == 1:
        #                     return -1
        
        #         # 注意，BFS 扩散的步数需要减一才是最终结果
        #         # 你可以用最简单的情况，比方说只有一个腐烂橘子的情况验证一下
        #         return step - 1 if step else 0`,
            language: "python"
        },
        {
            id: 998,
            title: "Maximum Binary Tree II",
            description: `A maximum tree is a tree where every node has a value greater than any other value in its subtree. You are given the root of a maximum binary tree and an integer val. Just as in the previous problem, the given tree was constructed from a list a (root = Construct(a)) recursively with the following Construct(a) routine: If a is empty, return null. Otherwise, let a[i] be the largest element of a. Create a root node with the value a[i]. The left child of root will be Construct([a[0], a[1], ..., a[i - 1]]). The right child of root will be Construct([a[i + 1], a[i + 2], ..., a[a.length - 1]]). Return root. Note that we were not given a directly, only a root node root = Construct(a). Suppose b is a copy of a with the value val appended to it. It is guaranteed that b has unique values. Return Construct(b).   Example 1: Input: root = [4,1,3,null,null,2], val = 5 Output: [5,4,null,1,3,null,null,2] Explanation: a = [1,4,2,3], b = [1,4,2,3,5] Example 2: Input: root = [5,2,4,null,1], val = 3 Output: [5,2,4,null,1,null,3] Explanation: a = [2,1,5,4], b = [2,1,5,4,3] Example 3: Input: root = [5,2,3,null,1], val = 4 Output: [5,2,4,null,1,3] Explanation: a = [2,1,5,3], b = [2,1,5,3,4]   Constraints: The number of nodes in the tree is in the range [1, 100]. 1 <= Node.val <= 100 All the values of the tree are unique. 1 <= val <= 100
<a href="https://leetcode.com/problems/maximum-binary-tree-ii/" target="_blank">https://leetcode.com/problems/maximum-binary-tree-ii/</a>`,
            keywords: ["BT", "Divide"],
            code: `        # only go down to right, or being the parent and put old to left.
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def insertIntoMaxTree(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
                return self.helper(root, val)
        
            def helper(self, node, val):
                if node is None:
                    return TreeNode(val)
                if val > node.val:
                    cur = TreeNode(val)
                    cur.left = node
                    return cur
                # only go down to right, or being the parent and put old to left.
                node.right = self.helper(node.right, val)
                return node
        
        # 2 cases, right, left
        # class Solution:
        #     def insertIntoMaxTree(self, root: TreeNode, val: int) -> TreeNode:
        #         if root is None:
        #             return TreeNode(val)
        #         if root.val < val:
        #             # 如果 val 是整棵树最大的，那么原来的这棵树应该是 val 节点的左子树，
        #             # 因为 val 节点是接在原始数组 a 的最后一个元素
        #             temp = root
        #             root = TreeNode(val)
        #             root.left = temp
        #         else:
        #             # 如果 val 不是最大的，那么就应该在右子树上，
        #             # 因为 val 节点是接在原始数组 a 的最后一个元素
        #             root.right = self.insertIntoMaxTree(root.right, val)
        #         return root`,
            language: "python"
        },
        {
            id: 1004,
            title: "Max Consecutive Ones III",
            description: `Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.   Example 1: Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2 Output: 6 Explanation: [1,1,1,0,0,1,1,1,1,1,1] Bolded numbers were flipped from 0 to 1. The longest subarray is underlined. Example 2: Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3 Output: 10 Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1] Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.   Constraints: 1 <= nums.length <= 105 nums[i] is either 0 or 1. 0 <= k <= nums.length
<a href="https://leetcode.com/problems/max-consecutive-ones-iii/" target="_blank">https://leetcode.com/problems/max-consecutive-ones-iii/</a>`,
            keywords: ["SlidingWindow"],
            code: `        # when to increase and decrease? used up k
        
        class Solution:
            def longestOnes(self, nums: List[int], k: int) -> int:
                left = 0
                right = 0
                used = 0
                res = 0
                while right < len(nums):
                    if nums[right] != 1:
                        used += 1
                    right += 1
                    while used > k and left < right:
                        if nums[left] == 0:
                            used -= 1
                        left += 1
                    if right - left > res:
                        res = right - left
                
                return res`,
            language: "python"
        },
        {
            id: 1011,
            title: "Capacity To Ship Packages Within D Days",
            description: `A conveyor belt has packages that must be shipped from one port to another within days days. The ith package on the conveyor belt has a weight of weights[i]. Each day, we load the ship with packages on the conveyor belt (in the order given by weights). We may not load more weight than the maximum weight capacity of the ship. Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within days days.   Example 1: Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5 Output: 15 Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this: 1st day: 1, 2, 3, 4, 5 2nd day: 6, 7 3rd day: 8 4th day: 9 5th day: 10 Note that the cargo must be shipped in the order given, so using a ship of capacity 14 and splitting the packages into parts like (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) is not allowed. Example 2: Input: weights = [3,2,2,4,1,4], days = 3 Output: 6 Explanation: A ship capacity of 6 is the minimum to ship all the packages in 3 days like this: 1st day: 3, 2 2nd day: 2, 4 3rd day: 1, 4 Example 3: Input: weights = [1,2,3,1,1], days = 4 Output: 3 Explanation: 1st day: 1 2nd day: 2 3rd day: 3 4th day: 1, 1   Constraints: 1 <= days <= weights.length <= 5 * 104 1 <= weights[i] <= 500
<a href="https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/" target="_blank">https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/</a>`,
            keywords: ["BS"],
            code: `        # similar above, f(x) different
        
        class Solution:
            def calcD(self, weights, L):
                cnt = 0
                cur_weight = 0
                for w in weights:
                    cur_weight += w
                    if cur_weight > L:
                        cnt += 1
                        cur_weight = w
                    elif cur_weight == L:
                        cnt += 1
                        cur_weight = 0
                if cur_weight > 0:
                    cnt += 1
                return cnt
        
            def shipWithinDays(self, weights: List[int], days: int) -> int:
                left = max(weights)
                right = sum(weights)
        
                while left <= right:
                    mid = left + (right - left) // 2
                    if self.calcD(weights, mid) == days:
                        right = mid - 1
                    elif self.calcD(weights, mid) < days:
                        right = mid - 1
                    elif self.calcD(weights, mid) > days:
                        left = mid + 1
                
                if left < max(weights) or left > sum(weights):
                    return 0
                return left`,
            language: "python"
        },
        {
            id: 1019,
            title: "Next Greater Node In Linked List",
            description: `You are given the head of a linked list with n nodes. For each node in the list, find the value of the next greater node. That is, for each node, find the value of the first node that is next to it and has a strictly larger value than it. Return an integer array answer where answer[i] is the value of the next greater node of the ith node (1-indexed). If the ith node does not have a next greater node, set answer[i] = 0.   Example 1: Input: head = [2,1,5] Output: [5,5,0] Example 2: Input: head = [2,7,4,3,5] Output: [7,0,5,5,0]   Constraints: The number of nodes in the list is n. 1 <= n <= 104 1 <= Node.val <= 109
<a href="https://leetcode.com/problems/next-greater-node-in-linked-list/" target="_blank">https://leetcode.com/problems/next-greater-node-in-linked-list/</a>`,
            keywords: ["MonotonicStack"],
            code: `        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, val=0, next=None):
        #         self.val = val
        #         self.next = next
        
        # just put Node vals in to list
        
        class Solution:
            def nextLargerNodes(self, head: Optional[ListNode]) -> List[int]:
                ngStack = []
                p = head
                nums = []
                while p:
                    nums.append(p.val)
                    p = p.next
        
                res = [0 for i in range(len(nums))]
                for i in range(len(nums)-1, -1, -1):
                    while ngStack and ngStack[-1] <= nums[i]:
                        ngStack.pop()
                    res[i] = ngStack[-1] if ngStack else 0
                    ngStack.append(nums[i])
                return res`,
            language: "python"
        },
        {
            id: 1020,
            title: "Number of Enclaves",
            description: `You are given an m x n binary matrix grid, where 0 represents a sea cell and 1 represents a land cell. A move consists of walking from one land cell to another adjacent (4-directionally) land cell or walking off the boundary of the grid. Return the number of land cells in grid for which we cannot walk off the boundary of the grid in any number of moves.   Example 1: Input: grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]] Output: 3 Explanation: There are three 1s that are enclosed by 0s, and one 1 that is not enclosed because its on the boundary. Example 2: Input: grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]] Output: 0 Explanation: All 1s are either on the boundary or can reach the boundary.   Constraints: m == grid.length n == grid[i].length 1 <= m, n <= 500 grid[i][j] is either 0 or 1.
<a href="https://leetcode.com/problems/number-of-enclaves/description/" target="_blank">https://leetcode.com/problems/number-of-enclaves/description/</a>`,
            keywords: ["DFS", "Backtrack", "Islands"],
            code: `        # total cells: self.cnt
        
        class Solution:
            def numEnclaves(self, grid: List[List[int]]) -> int:
                self.grid = grid
                self.m = len(grid)
                self.n = len(grid[0])
        
                self.cnt = 0
                self.start = False
        
                for i in range(self.m):
                    self.dfs(i, 0)
                    self.dfs(i, self.n-1)
                for j in range(self.n):
                    self.dfs(0, j)
                    self.dfs(self.m-1, j)
        
                self.start = True
                for i in range(self.m):
                    for j in range(self.n):
                        if grid[i][j] == 1:
                            self.dfs(i, j)
                return self.cnt
        
            
            def dfs(self, i, j):
                if i < 0 or i >= self.m or j < 0 or j >= self.n:
                    return
                if self.grid[i][j] == 0:
                    return
        
                if self.start:
                    self.cnt += 1
        
                self.grid[i][j] = 0
        
                for di, dj in [(0, -1), (0, 1), (-1, 0), (1, 0)]:
                    self.dfs(i + di, j + dj)
        `,
            language: "python"
        },
        {
            id: 1022,
            title: "Sum of Root To Leaf Binary Numbers",
            description: `You are given the root of a binary tree where each node has a value 0 or 1. Each root-to-leaf path represents a binary number starting with the most significant bit. For example, if the path is 0 -> 1 -> 1 -> 0 -> 1, then this could represent 01101 in binary, which is 13. For all leaves in the tree, consider the numbers represented by the path from the root to that leaf. Return the sum of these numbers. The test cases are generated so that the answer fits in a 32-bits integer.   Example 1: Input: root = [1,0,1,0,1,0,1] Output: 22 Explanation: (100) + (101) + (110) + (111) = 4 + 5 + 6 + 7 = 22 Example 2: Input: root = [0] Output: 0   Constraints: The number of nodes in the tree is in the range [1, 1000]. Node.val is 0 or 1.
<a href="https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers/" target="_blank">https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers/</a>`,
            keywords: ["BT", "BTTraverse"],
            code: `        # bit op is lower than arith op
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def sumRootToLeaf(self, root: Optional[TreeNode]) -> int:
                self.num = 0
                self.sum = 0
                self.traverse(root)
                return self.sum
            
            def traverse(self, node):
                if node is None:
                    return
                
                # bit op is lower than arith op
                #self.num = (self.num << 1) + node.val
                self.num = self.num << 1 | node.val
                if  node.left is None and node.right is None:
                    self.sum += self.num
                    self.num >>= 1
                    return
        
                self.traverse(node.left)
                self.traverse(node.right)
        
                self.num >>= 1
        
        # class Solution:
        #     def sumRootToLeaf(self, root: TreeNode) -> int:
        #         self.path = 0
        #         self.res = 0
        #         self.traverse(root)
        #         return self.res
        
        #     def traverse(self, root: TreeNode):
        #         if root is None:
        #             return
        #         if root.left is None and root.right is None:
        #             # 叶子节点
        #             self.res += self.path << 1 | root.val
        #             return
        #         # 前序位置
        #         self.path = self.path << 1 | root.val
        #         self.traverse(root.left)
        #         self.traverse(root.right)
        #         # 后序位置
        #         self.path = self.path >> 1`,
            language: "python"
        },
        {
            id: 1024,
            title: "Video Stitching",
            description: `You are given a series of video clips from a sporting event that lasted time seconds. These video clips can be overlapping with each other and have varying lengths. Each video clip is described by an array clips where clips[i] = [starti, endi] indicates that the ith clip started at starti and ended at endi. We can cut these clips into segments freely. For example, a clip [0, 7] can be cut into segments [0, 1] + [1, 3] + [3, 7]. Return the minimum number of clips needed so that we can cut the clips into segments that cover the entire sporting event [0, time]. If the task is impossible, return -1.   Example 1: Input: clips = [[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], time = 10 Output: 3 Explanation: We take the clips [0,2], [8,10], [1,9]; a total of 3 clips. Then, we can reconstruct the sporting event as follows: We cut [1,9] into segments [1,2] + [2,8] + [8,9]. Now we have segments [0,2] + [2,8] + [8,10] which cover the sporting event [0, 10]. Example 2: Input: clips = [[0,1],[1,2]], time = 5 Output: -1 Explanation: We cannot cover [0,5] with only [0,1] and [1,2]. Example 3: Input: clips = [[0,1],[6,8],[0,2],[5,6],[0,4],[0,3],[6,7],[1,3],[4,7],[1,4],[2,5],[2,6],[3,4],[4,5],[5,7],[6,9]], time = 9 Output: 3 Explanation: We can take clips [0,4], [4,7], and [6,9].   Constraints: 1 <= clips.length <= 100 0 <= starti <= endi <= 100 1 <= time <= 100
<a href="https://leetcode.com/problems/video-stitching/" target="_blank">https://leetcode.com/problems/video-stitching/</a>`,
            keywords: ["Range"],
            code: `        # case 2: one video length, cover whole: sort (start, -end) find next start smaller then prev end, but end is larger than prev end
        
        class Solution:
            def videoStitching(self, clips: List[List[int]], T: int) -> int:
                if T == 0:
                    return 0
                # 按起点升序排列，起点相同的降序排列
                # PS：其实起点相同的不用降序排列也可以，不过我觉得这样更清晰
                clips.sort(key=lambda x: (x[0], -x[1]))
                # 记录选择的短视频个数
                res = 0
                
                curEnd = 0
                nextEnd = 0
                i = 0
                n = len(clips)
                while i < n and clips[i][0] <= curEnd:
                    # 在第 res 个视频的区间内贪心选择下一个视频
                    while i < n and clips[i][0] <= curEnd:
                        nextEnd = max(nextEnd, clips[i][1])
                        i += 1
                    # 找到下一个视频，更新 curEnd
                    res += 1
                    curEnd = nextEnd
                    if curEnd >= T:
                        # 已经可以拼出区间 [0, T]
                        return res
                # 无法连续拼出区间 [0, T]
                return -1`,
            language: "python"
        },
        {
            id: 1038,
            title: "Binary Search Tree to Greater Sum Tree",
            description: `Given the root of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus the sum of all keys greater than the original key in BST. As a reminder, a binary search tree is a tree that satisfies these constraints: The left subtree of a node contains only nodes with keys less than the node's key. The right subtree of a node contains only nodes with keys greater than the node's key. Both the left and right subtrees must also be binary search trees.   Example 1: Input: root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8] Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8] Example 2: Input: root = [0,null,1] Output: [1,null,1]   Constraints: The number of nodes in the tree is in the range [1, 100]. 0 <= Node.val <= 100 All the values in the tree are unique.   Note: This question is the same as 538: <a href="https://leetcode.com/problems/convert-bst-to-greater-tree/" target="_blank">https://leetcode.com/problems/convert-bst-to-greater-tree/</a>
<a href="https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/description/" target="_blank">https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/description/</a>`,
            keywords: ["BST"],
            code: `        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def bstToGst(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
                self.sum = 0
                self.traverse(root)
                return root
                
            def traverse(self, node):
                if node is None:
                    return
                self.traverse(node.right)
                node.val += self.sum
                self.sum = node.val
                self.traverse(node.left)
                
        # DUPLICATE with https://leetcode.com/problems/convert-bst-to-greater-tree/
        
        # class Solution:
        #         def __init__(self):
        #             # 记录累加和
        #             self.sum = 0
                    
        #         def convertBST(self, root):
        #             self.traverse(root)
        #             return root
        
        #         def traverse(self, root):
        #             if root is None:
        #                 return
        #             self.traverse(root.right)
        #             # 维护累加和
        #             self.sum += root.val
        #             # 将 BST 转化成累加树
        #             root.val = self.sum
        #             self.traverse(root.left)`,
            language: "python"
        },
        {
            id: 1091,
            title: "Shortest Path in Binary Matrix",
            description: `Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1. A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that: All the visited cells of the path are 0. All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner). The length of a clear path is the number of visited cells of this path.   Example 1: Input: grid = [[0,1],[1,0]] Output: 2 Example 2: Input: grid = [[0,0,0],[1,1,0],[1,1,0]] Output: 4 Example 3: Input: grid = [[1,0,0],[1,1,0],[1,1,0]] Output: -1   Constraints: n == grid.length n == grid[i].length 1 <= n <= 100 grid[i][j] is 0 or 1
<a href="https://leetcode.com/problems/shortest-path-in-binary-matrix/" target="_blank">https://leetcode.com/problems/shortest-path-in-binary-matrix/</a>`,
            keywords: ["BFS"],
            code: `        #conditions: 1, border, visited
        
        from collections import deque
        class Solution:
            def shortestPathBinaryMatrix(self, grid: List[List[int]]) -> int:
                q = deque()
        
                visited = set()
                m = len(grid)
                n = len(grid[0])
        
                q.append((0, 0))
                #visited.add((0, 0))
                directions = [(i, j) for i in [-1, 0, 1] for j in [-1, 0, 1] if not (i==0 and j == 0)]
        
                cnt = 1
                while q:
                    sz = len(q)
                    for _ in range(sz):
                        cur = q.popleft()
                        i, j = cur
                        if cur in visited:
                            continue
                        visited.add(cur)
                        if i < 0 or i >= m or j < 0 or j >= n:
                            continue
                        if grid[i][j] == 1:
                            continue
                        if i == m-1 and j == n-1:
                            return cnt
                        for di, dj in directions:
                            q.append((i+di, j+dj))
                    cnt += 1
                return -1
        
        # from collections import deque
        
        # class Solution:
        #     def shortestPathBinaryMatrix(self, grid: List[List[int]]) -> int:
        #         m, n = len(grid), len(grid[0])
        #         if grid[0][0] == 1 or grid[m - 1][n - 1] == 1:
        #             return -1
        
        #         q = deque()
        #         # 需要记录走过的路径，避免死循环
        #         visited = [[False] * n for _ in range(m)]
        
        #         # 初始化队列，从 (0, 0) 出发
        #         q.append((0, 0))
        #         visited[0][0] = True
        #         pathLen = 1
        
        #         # 执行 BFS 算法框架，从值为 0 的坐标开始向八个方向扩散
        #         dirs = [
        #             (0, 1), (0, -1), (1, 0), (-1, 0),
        #             (1, 1), (1, -1), (-1, 1), (-1, -1)
        #         ]
        #         while q:
        #             sz = len(q)
        #             for _ in range(sz):
        #                 x, y = q.popleft()
        #                 if x == m - 1 and y == n - 1:
        #                     return pathLen
        #                 # 向八个方向扩散
        #                 for dx, dy in dirs:
        #                     nextX, nextY = x + dx, y + dy
        #                     # 确保相邻的这个坐标没有越界且值为 0 且之前没有走过
        #                     if 0 <= nextX < m and 0 <= nextY < n and grid[nextX][nextY] == 0 and not visited[nextX][nextY]:
        #                         q.append((nextX, nextY))
        #                         visited[nextX][nextY] = True
        #             pathLen += 1
        #         return -1`,
            language: "python"
        },
        {
            id: 1094,
            title: "Car Pooling",
            description: `There is a car with capacity empty seats. The vehicle only drives east (i.e., it cannot turn around and drive west). You are given the integer capacity and an array trips where trips[i] = [numPassengersi, fromi, toi] indicates that the ith trip has numPassengersi passengers and the locations to pick them up and drop them off are fromi and toi respectively. The locations are given as the number of kilometers due east from the car's initial location. Return true if it is possible to pick up and drop off all passengers for all the given trips, or false otherwise.   Example 1: Input: trips = [[2,1,5],[3,3,7]], capacity = 4 Output: false Example 2: Input: trips = [[2,1,5],[3,3,7]], capacity = 5 Output: true   Constraints: 1 <= trips.length <= 1000 trips[i].length == 3 1 <= numPassengersi <= 100 0 <= fromi < toi <= 1000 1 <= capacity <= 105
<a href="https://leetcode.com/problems/car-pooling/" target="_blank">https://leetcode.com/problems/car-pooling/</a>`,
            keywords: ["DiffSum", "Array"],
            code: `        # no need res array, just accumulate
        
        class Solution:
            def carPooling(self, trips: List[List[int]], capacity: int) -> bool:
                n = 1001
                diff = [0 for i in range(n)]
                for num, f, t in trips:
                    diff[f] += num
                    if t < n:
                        diff[t] -= num
                cnt = diff[0]
                if cnt > capacity:
                    return False
                for i in range(1, n):
                    cnt += diff[i]
                    if cnt > capacity:
                        return False
                return True`,
            language: "python"
        },
        {
            id: 1109,
            title: "Corporate Flight Bookings",
            description: `There are n flights that are labeled from 1 to n. You are given an array of flight bookings bookings, where bookings[i] = [firsti, lasti, seatsi] represents a booking for flights firsti through lasti (inclusive) with seatsi seats reserved for each flight in the range. Return an array answer of length n, where answer[i] is the total number of seats reserved for flight i.   Example 1: Input: bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5 Output: [10,55,45,25,25] Explanation: Flight labels: 1 2 3 4 5 Booking 1 reserved: 10 10 Booking 2 reserved: 20 20 Booking 3 reserved: 25 25 25 25 Total seats: 10 55 45 25 25 Hence, answer = [10,55,45,25,25] Example 2: Input: bookings = [[1,2,10],[2,2,15]], n = 2 Output: [10,25] Explanation: Flight labels: 1 2 Booking 1 reserved: 10 10 Booking 2 reserved: 15 Total seats: 10 25 Hence, answer = [10,25]   Constraints: 1 <= n <= 2 * 104 1 <= bookings.length <= 2 * 104 bookings[i].length == 3 1 <= firsti <= lasti <= n 1 <= seatsi <= 104
<a href="https://leetcode.com/problems/corporate-flight-bookings/description/" target="_blank">https://leetcode.com/problems/corporate-flight-bookings/description/</a>`,
            keywords: ["DiffSum", "Array"],
            code: `        class Solution:
            def corpFlightBookings(self, bookings: List[List[int]], n: int) -> List[int]:
                diff = [0 for i in range(n)]
                for first, last, seats in bookings:
                    diff[first-1] += seats
                    if last != n:
                        diff[last] -= seats
                res = [0 for i in range(n)]
                res[0] = diff[0]
                for i in range(1, n):
                    res[i] = res[i-1] + diff[i]
                return res
        `,
            language: "python"
        },
        {
            id: 1110,
            title: "Delete Nodes And Return Forest",
            description: `Given the root of a binary tree, each node in the tree has a distinct value. After deleting all nodes with a value in to_delete, we are left with a forest (a disjoint union of trees). Return the roots of the trees in the remaining forest. You may return the result in any order.   Example 1: Input: root = [1,2,3,4,5,6,7], to_delete = [3,5] Output: [[1,2,null,4],[6],[7]] Example 2: Input: root = [1,2,4,null,3], to_delete = [3] Output: [[1,2,4]]   Constraints: The number of nodes in the given tree is at most 1000. Each node has a distinct value between 1 and 1000. to_delete.length <= 1000 to_delete contains distinct values between 1 and 1000.
<a href="https://leetcode.com/problems/delete-nodes-and-return-forest/" target="_blank">https://leetcode.com/problems/delete-nodes-and-return-forest/</a>`,
            keywords: ["BT", "Divide"],
            code: `        # add to result only if dangling, must pass this to function
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def delNodes(self, root: Optional[TreeNode], to_delete: List[int]) -> List[TreeNode]:
                self.to_delete = set(to_delete)
                self.res = []
                self.helper(root, True)
                return self.res
        
            def helper(self, node, dangling):
                if node is None:
                    return node
        
                deleted = False
                if node.val in self.to_delete:
                    deleted = True
                elif dangling:
                    self.res.append(node)
        
                node.left = self.helper(node.left, deleted)
                node.right = self.helper(node.right, deleted)
                
                if deleted:
                    return None
        
                return node
        
        
        
        # 2 cases: deleted/not deleted, parent deleted/parent not deleted
        # class Solution:
        #     def __init__(self):
        #         self.delSet = set()
        #         # 记录森林的根节点
        #         self.res = []
        
        #     def delNodes(self, root, to_delete):
        #         if root is None:
        #             return []
        #         for d in to_delete:
        #             self.delSet.add(d)
        #         self.doDelete(root, False)
        #         return self.res
        
        #     # 定义：输入一棵二叉树，删除 delSet 中的节点，返回删除完成后的根节点
        #     def doDelete(self, root, hasParent):
        #         if root is None:
        #             return None
        #         # 判断是否需要被删除
        #         deleted = root.val in self.delSet
        #         if not deleted and not hasParent:
        #             # 没有父节点且不需要被删除，就是一个新的根节点
        #             self.res.append(root)
        #         # 去左右子树进行删除
        #         root.left = self.doDelete(root.left, not deleted)
        #         root.right = self.doDelete(root.right, not deleted)
        #         # 如果需要被删除，返回 null 给父节点
        #         return None if deleted else root`,
            language: "python"
        },
        {
            id: 1135,
            title: "最低成本联通所有城市",
            description: `给你输入数组 conections，其中 connections[i] = [xi, yi, costi] 表示将城市 xi 和城市 yi 连接所要的costi（连接是双向的），请你计算连接所有城市的最小成本。
<a href="https://leetcode.com/problems/connecting-cities-with-minimum-cost/" target="_blank">https://leetcode.com/problems/connecting-cities-with-minimum-cost/</a>`,
            keywords: ["Graph", "MST"],
            code: `        # careful when nodes are from 1 to n, not from 0
        
        class Solution:
            def minimumCost(self, n: int, connections: List[List[int]]) -> int:
                # 城市编号为 1...n，所以初始化大小为 n + 1
                uf = UF(n + 1)
                # 对所有边按照权重从小到大排序
                connections.sort(key=lambda x: x[2])
                # 记录最小生成树的权重之和
                mst = 0
                for edge in connections:
                    u, v, weight = edge
                    # 若这条边会产生环，则不能加入 mst
                    if uf.connected(u, v):
                        continue
                    # 若这条边不会产生环，则属于最小生成树
                    mst += weight
                    uf.union(u, v)
                # 保证所有节点都被连通
                # 按理说 uf.count() == 1 说明所有节点被连通
                # 但因为节点 0 没有被使用，所以 0 会额外占用一个连通分量
                return mst if uf.get_count() == 2 else -1
        
        class UF:
            # 连通分量个数
            def __init__(self, n: int):
                self.count = n
                # 存储一棵树
                self.parent = list(range(n))
                # 记录树的「重量」
                self.size = [1] * n
        
            # 将节点 p 和节点 q 连通
            def union(self, p: int, q: int) -> None:
                rootP = self.find(p)
                rootQ = self.find(q)
                if rootP == rootQ:
                    return
        
                # 小树接到大树下面，较平衡
                if self.size[rootP] > self.size[rootQ]:
                    self.parent[rootQ] = rootP
                    self.size[rootP] += self.size[rootQ]
                else:
                    self.parent[rootP] = rootQ
                    self.size[rootQ] += self.size[rootP]
                # 两个连通分量合并成一个连通分量
                self.count -= 1
        
            # 判断节点 p 和节点 q 是否连通
            def connected(self, p: int, q: int) -> bool:
                return self.find(p) == self.find(q)
        
            # 返回节点 x 的连通分量根节点
            def find(self, x: int) -> int:
                while self.parent[x] != x:
                    # 进行路径压缩
                    self.parent[x] = self.parent[self.parent[x]]
                    x = self.parent[x]
                return x
        
            # 返回图中的连通分量个数
            def get_count(self) -> int:
                return self.count`,
            language: "python"
        },
        {
            id: 1143,
            title: "Longest Common Subsequence",
            description: `Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0. A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters. For example, "ace" is a subsequence of "abcde". A common subsequence of two strings is a subsequence that is common to both strings.   Example 1: Input: text1 = "abcde", text2 = "ace" Output: 3 Explanation: The longest common subsequence is "ace" and its length is 3. Example 2: Input: text1 = "abc", text2 = "abc" Output: 3 Explanation: The longest common subsequence is "abc" and its length is 3. Example 3: Input: text1 = "abc", text2 = "def" Output: 0 Explanation: There is no such common subsequence, so the result is 0.   Constraints: 1 <= text1.length, text2.length <= 1000 text1 and text2 consist of only lowercase English characters.
<a href="https://leetcode.com/problems/longest-common-subsequence/description/" target="_blank">https://leetcode.com/problems/longest-common-subsequence/description/</a>`,
            keywords: ["DP", "LCS"],
            code: `        # LCS (Not continuous, change def of memo)
        
        class Solution:
            def longestCommonSubsequence(self, text1: str, text2: str) -> int:
                m = len(text1)
                n = len(text2)
        
                # def: lcs of str1[:i+1] and str2[:j+1]
                memo = [[0 for j in range(n+1)] for i in range(m+1)]
        
                # conv: 
                # 1. str1[:i] str2[:j+1]
                # 2. str1[:i+1] str2[:j]
                # 3. str1[:i] str2[:j] + 1 if same
                # directions
        
                # init:
                # row: 0
                # col: 0
        
                for i in range(1, m+1):
                    for j in range(1, n+1):
                        if text1[i-1] == text2[j-1]:
                            memo[i][j] = max(memo[i][j], memo[i-1][j-1] + 1)
                        else:
                            memo[i][j] = max(memo[i][j], memo[i][j-1])
                            memo[i][j] = max(memo[i][j], memo[i-1][j])
                return memo[m][n]
        
        # class Solution:
        #     # 主函数
        #     def longestCommonSubsequence(self, s1: str, s2: str) -> int:
        #         m, n = len(s1), len(s2)
        #         # 备忘录，消除重叠子问题
        #         # 备忘录值为 -1 代表未曾计算
        #         self.memo = [[-1] * n for _ in range(m)]
        #         # 计算 s1[0..] 和 s2[0..] 的 lcs 长度
        #         return self.dp(s1, 0, s2, 0)
        
        #     # 定义：计算 s1[i..] 和 s2[j..] 的最长公共子序列长度
        #     def dp(self, s1: str, i: int, s2: str, j: int) -> int:
        #         # base case
        #         if i == len(s1) or j == len(s2):
        #             return 0
        #         # 如果之前计算过，则直接返回备忘录中的答案
        #         if self.memo[i][j] != -1:
        #             return self.memo[i][j]
        #         # 根据 s1[i] 和 s2[j] 的情况做选择
        #         if s1[i] == s2[j]:
        #             # s1[i] 和 s2[j] 必然在 lcs 中
        #             self.memo[i][j] = 1 + self.dp(s1, i + 1, s2, j + 1)
        #         else:
        #             # s1[i] 和 s2[j] 至少有一个不在 lcs 中
        #             self.memo[i][j] = max(
        #                 self.dp(s1, i + 1, s2, j),
        #                 self.dp(s1, i, s2, j + 1)
        #             )
        #         return self.memo[i][j]
        
        # class Solution:
        #     def longestCommonSubsequence(self, s1: str, s2: str) -> int:
        #         m, n = len(s1), len(s2)
        #         # 定义：s1[0..i-1] 和 s2[0..j-1] 的 lcs 长度为 dp[i][j]
        #         dp = [[0] * (n + 1) for _ in range(m + 1)]
        #         # 目标：s1[0..m-1] 和 s2[0..n-1] 的 lcs 长度，即 dp[m][n]
        #         # base case: dp[0][..] = dp[..][0] = 0
        
        #         for i in range(1, m + 1):
        #             for j in range(1, n + 1):
        #                 # 现在 i 和 j 从 1 开始，所以要减一
        #                 if s1[i - 1] == s2[j - 1]:
        #                     # s1[i-1] 和 s2[j-1] 必然在 lcs 中
        #                     dp[i][j] = 1 + dp[i - 1][j - 1]
        #                 else:
        #                     # s1[i-1] 和 s2[j-1] 至少有一个不在 lcs 中
        #                     dp[i][j] = max(dp[i][j - 1], dp[i - 1][j])
        
        #         return dp[m][n]`,
            language: "python"
        },
        {
            id: 1161,
            title: "Maximum Level Sum of a Binary Tree",
            description: `Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on. Return the smallest level x such that the sum of all the values of nodes at level x is maximal.   Example 1: Input: root = [1,7,0,7,-8,null,null] Output: 2 Explanation: Level 1 sum = 1. Level 2 sum = 7 + 0 = 7. Level 3 sum = 7 + -8 = -1. So we return the level with the maximum sum which is level 2. Example 2: Input: root = [989,null,10250,98693,-89388,null,null,null,-32127] Output: 2   Constraints: The number of nodes in the tree is in the range [1, 104]. -105 <= Node.val <= 105
<a href="https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/description/" target="_blank">https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/description/</a>`,
            keywords: ["BT", "BFS"],
            code: `        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        from collections import deque
        class Solution:
            def maxLevelSum(self, root: Optional[TreeNode]) -> int:
                m = float('-inf')
                res = 0
                depth = 0
        
                q = deque()
                if root is None:
                    return res
                q.append(root)
        
                while q:
                    sz = len(q)
                    depth += 1
                    s = 0
                    for i in range(sz):
                        cur = q.popleft()
                        s += cur.val
                        if cur.left:
                            q.append(cur.left)
                        if cur.right:
                            q.append(cur.right)
                    if s > m:
                        m = s
                        res = depth
                
                return res
        
        
        
        # class Solution:
        #     def maxLevelSum(self, root: TreeNode) -> int:
        #         if root is None:
        #             return 0
        #         q = deque([root])
        #         # 记录 BFS 走到的层数
        #         depth = 1
        #         # 记录元素和最大的那一行和最大元素和
        #         res = 0
        #         maxSum = float('-inf')
        
        #         while q:
        #             sz = len(q)
        #             levelSum = 0
        #             # 遍历这一层
        #             for _ in range(sz):
        #                 cur = q.popleft()
        #                 levelSum += cur.val
        
        #                 if cur.left is not None:
        #                     q.append(cur.left)
        #                 if cur.right is not None:
        #                     q.append(cur.right)
        #             if levelSum > maxSum:
        #                 # 更新最大元素和
        #                 res = depth
        #                 maxSum = levelSum
        #             depth += 1
        #         return res`,
            language: "python"
        },
        {
            id: 1235,
            title: "Maximum Profit in Job Scheduling",
            description: `We have n jobs, where every job is scheduled to be done from startTime[i] to endTime[i], obtaining a profit of profit[i]. You're given the startTime, endTime and profit arrays, return the maximum profit you can take such that there are no two jobs in the subset with overlapping time range. If you choose a job that ends at time X you will be able to start another job that starts at time X.   Example 1: Input: startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70] Output: 120 Explanation: The subset chosen is the first and fourth job. Time range [1-3]+[3-6] , we get profit of 120 = 50 + 70. Example 2: Input: startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60] Output: 150 Explanation: The subset chosen is the first, fourth and fifth job. Profit obtained 150 = 20 + 70 + 60. Example 3: Input: startTime = [1,1,1], endTime = [2,3,4], profit = [5,6,4] Output: 6   Constraints: 1 <= startTime.length == endTime.length == profit.length <= 5 * 104 1 <= startTime[i] < endTime[i] <= 109 1 <= profit[i] <= 104
<a href="https://leetcode.com/problems/maximum-profit-in-job-scheduling/" target="_blank">https://leetcode.com/problems/maximum-profit-in-job-scheduling/</a>`,
            keywords: ["Range"],
            code: `        # case6: 1 meeting room, max meeting time: DP + TreeMap(SortedDict) to optimize begin -> closest end time.
        
        from typing import List
        from sortedcontainers import SortedDict
        
        class Solution:
            def jobScheduling(self, startTime: List[int], endTime: List[int], profit: List[int]) -> int:
                n = len(profit)
                jobs = [[startTime[i], endTime[i], profit[i]] for i in range(n)]
                # 按结束时间排序
                jobs.sort(key=lambda x: x[1])
        
                # 下面的这个状态转移请参考背包问题讲解：
                # https://labuladong.online/algo/dynamic-programming/knapsack1/
                # 定义：在 0 到 i 这个时间区间内，最多能够获得的利润是 dp[i]
                dp = SortedDict()
                # base case，没有工作的时候利润为 0
                dp[0] = 0
                # 基于 dp 的定义，进行状态转移
                for job in jobs:
                    begin, end, value = job
                    # 穷举所有可能的选择，求最大值
                    prev_profit = dp.peekitem(dp.bisect_right(begin) - 1)[1]
                    dp[end] = max(
                        # 选择这个 job，获得的利润是当前的利润加上在开始时间之前能获得的最大利润
                        prev_profit + value,
                        # 不选择，保持现有的最大利润
                        dp.peekitem(-1)[1]
                    )
                
                return dp.peekitem(-1)[1]
        
        # minium number of meeting rooms
        # locked: https://leetcode.com/problems/meeting-rooms-ii/
        # class Solution:
        #     def minMeetingRooms(self, meetings: List[List[int]]) -> int:
        #         n = len(meetings)
        #         begin = [0] * n
        #         end = [0] * n
        #         for i in range(n):
        #             begin[i] = meetings[i][0]
        #             end[i] = meetings[i][1]
        #         begin.sort()
        #         end.sort()
        
        #         # 扫描过程中的计数器
        #         count = 0
        #         # 双指针技巧
        #         res, i, j = 0, 0, 0
        #         while i < n and j < n:
        #             if begin[i] < end[j]:
        #                 # 扫描到一个红点
        #                 count += 1
        #                 i += 1
        #             else:
        #                 # 扫描到一个绿点
        #                 count -= 1
        #                 j += 1
        #             # 记录扫描过程中的最大值
        #             res = max(res, count)
                
        #         return res`,
            language: "python"
        },
        {
            id: 1254,
            title: "Number of Closed Islands",
            description: `Given a 2D grid consists of 0s (land) and 1s (water).  An island is a maximal 4-directionally connected group of 0s and a closed island is an island totally (all left, top, right, bottom) surrounded by 1s. Return the number of closed islands.   Example 1: Input: grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]] Output: 2 Explanation: Islands in gray are closed because they are completely surrounded by water (group of 1s). Example 2: Input: grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]] Output: 1 Example 3: Input: grid = [[1,1,1,1,1,1,1],   [1,0,0,0,0,0,1],   [1,0,1,1,1,0,1],   [1,0,1,0,1,0,1],   [1,0,1,1,1,0,1],   [1,0,0,0,0,0,1], [1,1,1,1,1,1,1]] Output: 2   Constraints: 1 <= grid.length, grid[0].length <= 100 0 <= grid[i][j] <=1
<a href="https://leetcode.com/problems/number-of-closed-islands/description/" target="_blank">https://leetcode.com/problems/number-of-closed-islands/description/</a>`,
            keywords: ["DFS", "Backtrack", "Islands"],
            code: `        class Solution:
            def closedIsland(self, grid: List[List[int]]) -> int:
                self.grid = grid
                self.m = len(grid)
                self.n = len(grid[0])
                cnt = 0
        
                for i in range(self.m):
                    self.dfs(i, 0)
                    self.dfs(i, self.n-1)
                for j in range(self.n):
                    self.dfs(0, j)
                    self.dfs(self.m-1, j)
                
                for i in range(self.m):
                    for j in range(self.n):
                        if grid[i][j] == 0:
                            cnt += 1
                            self.dfs(i, j)
                return cnt
        
            def dfs(self, i, j):
                if i < 0 or i >= self.m or j < 0 or j >= self.n:
                    return
                if self.grid[i][j] == 1:
                    return
                self.grid[i][j] = 1
                for di, dj in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    self.dfs(i + di, j + dj)
        
        # class Solution:
        #     # 主函数：计算封闭岛屿的数量
        #     def closedIsland(self, grid):
        #         m, n = len(grid), len(grid[0])
        #         for j in range(n):
        #             # 把靠上边的岛屿淹掉
        #             self.dfs(grid, 0, j)
        #             # 把靠下边的岛屿淹掉
        #             self.dfs(grid, m - 1, j)
        #         for i in range(m):
        #             # 把靠左边的岛屿淹掉
        #             self.dfs(grid, i, 0)
        #             # 把靠右边的岛屿淹掉
        #             self.dfs(grid, i, n - 1)
        #         # 遍历 grid，剩下的岛屿都是封闭岛屿
        #         res = 0
        #         for i in range(m):
        #             for j in range(n):
        #                 if grid[i][j] == 0:
        #                     res += 1
        #                     self.dfs(grid, i, j)
        #         return res
        
        #     # 从 (i, j) 开始，将与之相邻的陆地都变成海水
        #     def dfs(self, grid, i, j):
        #         m, n = len(grid), len(grid[0])
        #         if i < 0 or j < 0 or i >= m or j >= n:
        #             return
        #         if grid[i][j] == 1:
        #             # 已经是海水了
        #             return
        #         # 将 (i, j) 变成海水
        #         grid[i][j] = 1
        #         # 淹没上下左右的陆地
        #         self.dfs(grid, i + 1, j)
        #         self.dfs(grid, i, j + 1)
        #         self.dfs(grid, i - 1, j)
        #         self.dfs(grid, i, j - 1)`,
            language: "python"
        },
        {
            id: 1260,
            title: "Shift 2D Grid",
            description: `Given a 2D grid of size m x n and an integer k. You need to shift the grid k times. In one shift operation: Element at grid[i][j] moves to grid[i][j + 1]. Element at grid[i][n - 1] moves to grid[i + 1][0]. Element at grid[m - 1][n - 1] moves to grid[0][0]. Return the 2D grid after applying shift operation k times.   Example 1: Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1 Output: [[9,1,2],[3,4,5],[6,7,8]] Example 2: Input: grid = [[3,8,1,9],[19,7,2,5],[4,6,11,10],[12,0,21,13]], k = 4 Output: [[12,0,21,13],[3,8,1,9],[19,7,2,5],[4,6,11,10]] Example 3: Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 9 Output: [[1,2,3],[4,5,6],[7,8,9]]   Constraints: m == grid.length n == grid[i].length 1 <= m <= 50 1 <= n <= 50 -1000 <= grid[i][j] <= 1000 0 <= k <= 100
<a href="https://leetcode.com/problems/shift-2d-grid/" target="_blank">https://leetcode.com/problems/shift-2d-grid/</a>`,
            keywords: ["Array", "2ptr"],
            code: `        # shift equal to 3 reverse
        # convert 2d to 1d shift, abstract set and get operations that uses 1d index
        
        class Solution:
            def shiftGrid(self, grid: List[List[int]], k: int) -> List[List[int]]:
                m = len(grid)
                n = len(grid[0])
                mn = m * n
                k = k % mn
                if k == 0:
                    return grid
                self.reverse(grid, 0, mn - 1)
                self.reverse(grid, 0, k - 1)
                self.reverse(grid, k, mn - 1)
                return grid
            
            def to2d(self, grid, index):
                n = len(grid[0])
                i = index // n
                j = index % n
                return i, j
            
            def get(self, grid, index):
                i, j = self.to2d(grid, index)
                return grid[i][j]
            
            def set(self, grid, index, value):
                i, j = self.to2d(grid, index)
                grid[i][j] = value
            
            def reverse(self, grid, start, end):
                while start < end:
                    tmp = self.get(grid, start)
                    self.set(grid, start, self.get(grid, end))
                    self.set(grid, end, tmp)
                    start += 1
                    end -= 1`,
            language: "python"
        },
        {
            id: 1288,
            title: "Remove Covered Intervals",
            description: `Given an array intervals where intervals[i] = [li, ri] represent the interval [li, ri), remove all intervals that are covered by another interval in the list. The interval [a, b) is covered by the interval [c, d) if and only if c <= a and b <= d. Return the number of remaining intervals.   Example 1: Input: intervals = [[1,4],[3,6],[2,8]] Output: 2 Explanation: Interval [3,6] is covered by [2,8], therefore it is removed. Example 2: Input: intervals = [[1,4],[2,3]] Output: 1   Constraints: 1 <= intervals.length <= 1000 intervals[i].length == 2 0 <= li < ri <= 105 All the given intervals are unique.
<a href="https://leetcode.com/problems/remove-covered-intervals/" target="_blank">https://leetcode.com/problems/remove-covered-intervals/</a>`,
            keywords: ["Range"],
            code: `        # case 3: remove fully covered: sort (start, -end) + delete full cover + merge parial cover + update disjoint
        
        class Solution:
            def removeCoveredIntervals(self, intervals: List[List[int]]) -> int:
                # 按照起点升序排列，起点相同时降序排列
                intervals.sort(key=lambda x: (x[0], -x[1]))
        
                # 记录合并区间的起点和终点
                left = intervals[0][0]
                right = intervals[0][1]
        
                res = 0
                for i in range(1, len(intervals)):
                    intv = intervals[i]
                    # 情况一，找到覆盖区间
                    if left <= intv[0] and right >= intv[1]:
                        res += 1
                    # 情况二，找到相交区间，合并
                    if right >= intv[0] and right <= intv[1]:
                        right = intv[1]
                    # 情况三，完全不相交，更新起点和终点
                    if right < intv[0]:
                        left = intv[0]
                        right = intv[1]
        
                return len(intervals) - res`,
            language: "python"
        },
        {
            id: 1302,
            title: "Deepest Leaves Sum",
            description: `Given the root of a binary tree, return the sum of values of its deepest leaves.   Example 1: Input: root = [1,2,3,4,5,null,6,7,null,null,null,null,8] Output: 15 Example 2: Input: root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5] Output: 19   Constraints: The number of nodes in the tree is in the range [1, 104]. 1 <= Node.val <= 100
<a href="https://leetcode.com/problems/deepest-leaves-sum/" target="_blank">https://leetcode.com/problems/deepest-leaves-sum/</a>`,
            keywords: ["BT", "BFS"],
            code: `        # BFS DFS (record depth)
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        from collections import deque
        class Solution:
            def deepestLeavesSum(self, root: Optional[TreeNode]) -> int:
                res = 0
                q = deque()
                if root is None:
                    return res
                q.append(root)
                while q:
                    sz = len(q)
                    res = 0
                    for i in range(sz):
                        cur = q.popleft()
                        res += cur.val
                        if cur.left:
                            q.append(cur.left)
                        if cur.right:
                            q.append(cur.right)
                
                return res
        
                
        # class Solution:
        #     def deepestLeavesSum(self, root: TreeNode) -> int:
        #         if root is None:
        #             return 0
        #         from collections import deque
        #         q = deque([root])
        
        #         sum = 0
        #         while q:
        #             sum = 0
        #             sz = len(q)
        #             for _ in range(sz):
        #                 cur = q.popleft()
        #                 # 累加一层的节点之和
        #                 sum += cur.val
        #                 if cur.left:
        #                     q.append(cur.left)
        #                 if cur.right:
        #                     q.append(cur.right)
        #         # 现在就是最后一层的节点值和
        #         return sum`,
            language: "python"
        },
        {
            id: 1329,
            title: "Sort the Matrix Diagonally",
            description: `A matrix diagonal is a diagonal line of cells starting from some cell in either the topmost row or leftmost column and going in the bottom-right direction until reaching the matrix's end. For example, the matrix diagonal starting from mat[2][0], where mat is a 6 x 3 matrix, includes cells mat[2][0], mat[3][1], and mat[4][2]. Given an m x n matrix mat of integers, sort each matrix diagonal in ascending order and return the resulting matrix.   Example 1: Input: mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]] Output: [[1,1,1,1],[1,2,2,2],[1,2,3,3]] Example 2: Input: mat = [[11,25,66,1,69,7],[23,55,17,45,15,52],[75,31,36,44,58,8],[22,27,33,25,68,4],[84,28,14,11,5,50]] Output: [[5,17,4,1,52,7],[11,11,25,45,8,69],[14,23,25,44,58,15],[22,27,31,36,50,66],[84,28,75,33,55,68]]   Constraints: m == mat.length n == mat[i].length 1 <= m, n <= 100 1 <= mat[i][j] <= 100
<a href="https://leetcode.com/problems/sort-the-matrix-diagonally/" target="_blank">https://leetcode.com/problems/sort-the-matrix-diagonally/</a>`,
            keywords: ["Array", "2ptr"],
            code: `        # option 1: use a hashmap to store i-j=const
        # option 2: 2 cases i in range (m+n-1), case1 - i<m; case2 - i>=m
        
        class Solution:
            def diagonalSort(self, mat: List[List[int]]) -> List[List[int]]:
                m = len(mat)
                n = len(mat[0])
                res = [[0 for i in range(n)] for j in range(m)]
                for i in range(m+n-1):
                    if i < m:
                        r = i
                        c = 0
                    else:
                        c = i - m + 1
                        r = 0
                    diag = []
                    r1 = r
                    c1 = c
                    while r1 < m and c1 < n:
                        diag.append(mat[r1][c1])
                        r1 += 1
                        c1 += 1
                    diag.sort()
                    r1 = r
                    c1 = c
                    cnt = 0
                    while r1 < m and c1 < n:
                        res[r1][c1] = diag[cnt]
                        r1 += 1
                        c1 += 1
                        cnt += 1
                return res`,
            language: "python"
        },
        {
            id: 1368,
            title: "Minimum Cost to Make at Least One Valid Path in a Grid",
            description: `Given an m x n grid. Each cell of the grid has a sign pointing to the next cell you should visit if you are currently in this cell. The sign of grid[i][j] can be: 1 which means go to the cell to the right. (i.e go from grid[i][j] to grid[i][j + 1]) 2 which means go to the cell to the left. (i.e go from grid[i][j] to grid[i][j - 1]) 3 which means go to the lower cell. (i.e go from grid[i][j] to grid[i + 1][j]) 4 which means go to the upper cell. (i.e go from grid[i][j] to grid[i - 1][j]) Notice that there could be some signs on the cells of the grid that point outside the grid. You will initially start at the upper left cell (0, 0). A valid path in the grid is a path that starts from the upper left cell (0, 0) and ends at the bottom-right cell (m - 1, n - 1) following the signs on the grid. The valid path does not have to be the shortest. You can modify the sign on a cell with cost = 1. You can modify the sign on a cell one time only. Return the minimum cost to make the grid have at least one valid path.   Example 1: Input: grid = [[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]] Output: 3 Explanation: You will start at point (0, 0). The path to (3, 3) is as follows. (0, 0) --> (0, 1) --> (0, 2) --> (0, 3) change the arrow to down with cost = 1 --> (1, 3) --> (1, 2) --> (1, 1) --> (1, 0) change the arrow to down with cost = 1 --> (2, 0) --> (2, 1) --> (2, 2) --> (2, 3) change the arrow to down with cost = 1 --> (3, 3) The total cost = 3. Example 2: Input: grid = [[1,1,3],[3,2,2],[1,1,4]] Output: 0 Explanation: You can follow the path from (0, 0) to (2, 2). Example 3: Input: grid = [[1,2],[4,3]] Output: 1   Constraints: m == grid.length n == grid[i].length 1 <= m, n <= 100 1 <= grid[i][j] <= 4
<a href="https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/description/" target="_blank">https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/description/</a>`,
            keywords: ["Graph", "Dijkstra"],
            code: `        import heapq
        class State:
            def __init__(self, i, j, cost):
                self.i = i
                self.j = j
                self.costTo = cost
            
            def __lt__(self, state):
                return self.costTo < state.costTo
        
        class Solution:
            def minCost(self, grid: List[List[int]]) -> int:
                m = len(grid)
                n = len(grid[0])
                pq = []
                costsTo = [[float('inf') for i in range(n)] for j in range(m)]
        
                heapq.heappush(pq, State(0, 0, 0))
                costsTo[0][0] = 0
        
                while pq:
                    cur = heapq.heappop(pq)
                    i, j, costTo = cur.i, cur.j, cur.costTo
        
                    if costTo > costsTo[i][j]:
                        continue
                    
                    if i == m - 1 and j == n - 1:
                        return costTo
                    
                    for index, (di, dj) in enumerate([[0, 1], [0, -1], [1, 0], [-1, 0]]):
                        newI = i + di
                        newJ = j + dj
                        if newI < 0 or newI >= m or newJ < 0 or newJ >= n:
                            continue
                        newCostTo = costTo + 1 if grid[i][j] - 1 != index else costTo
                        if newCostTo < costsTo[newI][newJ]:
                            costsTo[newI][newJ] = newCostTo
                            heapq.heappush(pq, State(newI, newJ, newCostTo))
                
                return -1
        
        # class Solution:
        #     class State:
        #         def __init__(self, x, y, costFromStart):
        #             self.x = x
        #             self.y = y
        #             self.costFromStart = costFromStart
        
        #         def __lt__(self, other):
        #             return self.costFromStart < other.costFromStart
        
        #     def getDelta(self, directionId):
        #         # 1 -> right, 2 -> left, 3 -> down, 4 -> up
        #         if directionId == 1:
        #             return [0, 1]
        #         if directionId == 2:
        #             return [0, -1]
        #         if directionId == 3:
        #             return [1, 0]
        #         return [-1, 0]
        
        #     def dijkstra(self, graph):
        #         import heapq
        
        #         m = len(graph)
        #         n = len(graph[0])
        #         distTo = [[float('inf')] * n for _ in range(m)]
        
        #         pq = []
        #         heapq.heappush(pq, self.State(0, 0, 0))
        #         distTo[0][0] = 0
        
        #         while pq:
        #             state = heapq.heappop(pq)
        #             curX = state.x
        #             curY = state.y
        #             curCostFromStart = state.costFromStart
        
        #             # 已经存在更优路径，则跳过
        #             if distTo[curX][curY] < curCostFromStart:
        #                 continue
        
        #             # 判断是否已经到达目标点
        #             if curX == m - 1 and curY == n - 1:
        #                 return distTo[curX][curY]
        
        #             for directionId in range(1, 5):
        #                 delta = self.getDelta(directionId)
        #                 nextX = curX + delta[0]
        #                 nextY = curY + delta[1]
        #                 if nextX < 0 or nextX >= m or nextY < 0 or nextY >= n:
        #                     continue
        #                 # 如果当前方向和目标方向不一致，则需要花费 1 的代价
        #                 nextCostFromStart = curCostFromStart
        #                 if graph[curX][curY] != directionId:
        #                     nextCostFromStart += 1
        
        #                 # 已经存在更优路径，则跳过
        #                 if distTo[nextX][nextY] <= nextCostFromStart:
        #                     continue
        #                 heapq.heappush(pq, self.State(nextX, nextY, nextCostFromStart))
        #                 distTo[nextX][nextY] = nextCostFromStart
        
        #         return -1
        
        #     def minCost(self, grid):
        #         return self.dijkstra(grid)`,
            language: "python"
        },
        {
            id: 1425,
            title: "Constrained Subsequence Sum",
            description: `Given an integer array nums and an integer k, return the maximum sum of a non-empty subsequence of that array such that for every two consecutive integers in the subsequence, nums[i] and nums[j], where i < j, the condition j - i <= k is satisfied. A subsequence of an array is obtained by deleting some number of elements (can be zero) from the array, leaving the remaining elements in their original order.   Example 1: Input: nums = [10,2,-10,5,20], k = 2 Output: 37 Explanation: The subsequence is [10, 2, 5, 20]. Example 2: Input: nums = [-1,-2,-3], k = 1 Output: -1 Explanation: The subsequence must be non-empty, so we choose the largest number. Example 3: Input: nums = [10,-2,-10,-5,20], k = 2 Output: 23 Explanation: The subsequence is [10, -2, -5, 20].   Constraints: 1 <= k <= nums.length <= 105 -104 <= nums[i] <= 104
<a href="https://leetcode.com/problems/constrained-subsequence-sum/" target="_blank">https://leetcode.com/problems/constrained-subsequence-sum/</a>`,
            keywords: ["MonotonicQueue", "DP"],
            code: `        # non-empty: must compare all prev + cur as well as cur only, should not compare with 0
        
        from collections import deque
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
                return max(dp)
        
        # # 经过单调队列优化的动态规划解法
        # class Solution:
        #     def constrainedSubsetSum(self, nums: List[int], k: int) -> int:
        #         n = len(nums)
        #         # 定义：dp[i] 表示以 nums[i] 结尾的子序列的最大和
        #         dp = [0] * n
        #         dp[0] = nums[0]
        #         # 单调队列辅助计算 dp[i-k..i-1] 的最大值
        #         window = MonotonicQueue()
        #         window.push(dp[0])
        
        #         for i in range(1, n):
        #             # 状态转移方程
        #             dp[i] = max(nums[i], window.max() + nums[i])
        #             # 维护滑动窗口的大小为 k
        #             if window.size() == k:
        #                 window.pop()
        #             window.push(dp[i])
                
        #         # dp 数组中的最大值就是结果
        #         res = float('-inf')
        #         for i in range(n):
        #             res = max(res, dp[i])
        #         return res
        
        # # 下面给出的是单调队列的通用实现，运行速度可能较慢，你可以自行简化提升速度
        # # 单调队列的详细解析见
        # # https://labuladong.online/algo/problem-set/monotonic-queue/
        # class MonotonicQueue:
        #     # 常规队列，存储所有元素
        #     def __init__(self):
        #         self.q = collections.deque()
        #         # 元素降序排列的单调队列，头部是最大值
        #         self.maxq = collections.deque()
        #         # 元素升序排列的单调队列，头部是最小值
        #         self.minq = collections.deque()
        
        #     def push(self, elem):
        #         # 维护常规队列，直接在队尾插入元素
        #         self.q.append(elem)
        
        #         # 维护 maxq，将小于 elem 的元素全部删除
        #         while self.maxq and self.maxq[-1] < elem:
        #             self.maxq.pop()
        #         self.maxq.append(elem)
        
        #         # 维护 minq，将大于 elem 的元素全部删除
        #         while self.minq and self.minq[-1] > elem:
        #             self.minq.pop()
        #         self.minq.append(elem)
        
        #     def max(self):
        #         # maxq 的头部是最大元素
        #         return self.maxq[0]
        
        #     def min(self):
        #         # minq 的头部是最大元素
        #         return self.minq[0]
        
        #     def pop(self):
        #         # 从标准队列头部弹出需要删除的元素
        #         deleteVal = self.q.popleft()
        
        #         # 由于 push 的时候会删除元素，deleteVal 可能已经被删掉了
        #         if deleteVal == self.maxq[0]:
        #             self.maxq.popleft()
        #         if deleteVal == self.minq[0]:
        #             self.minq.popleft()
        #         return deleteVal
        
        #     def size(self):
        #         # 标准队列的大小即是当前队列的大小
        #         return len(self.q)
        
        #     def isEmpty(self):
        #         return not self.q
        
        # # 未经优化的动态规划解法，超时
        # class Solution2:
        #     def constrainedSubsetSum(self, nums: List[int], k: int) -> int:
        #         n = len(nums)
        #         # 定义：dp[i] 表示以 nums[i] 结尾的子序列的最大和
        #         dp = [0] * n
        #         # base case，以 nums[0] 结尾的子序列只有它本身
        #         dp[0] = nums[0]
        
        #         # 状态转移方程
        #         for i in range(1, n):
        #             maxVal = 0
        #             for j in range(1, k+1):
        #                 if i - j < 0:
        #                     continue
        #                 maxVal = max(maxVal, dp[i - j])
        #             # dp[i] 的值可以根据 dp[i-k..i-1] 的最大值推导出来
        #             dp[i] = maxVal + nums[i]
        
        #         # dp 数组中的最大值就是结果
        #         res = float('-inf')
        #         for i in range(n):
        #             res = max(res, dp[i])
        #         return res`,
            language: "python"
        },
        {
            id: 1438,
            title: "Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit",
            description: `Given an array of integers nums and an integer limit, return the size of the longest non-empty subarray such that the absolute difference between any two elements of this subarray is less than or equal to limit.   Example 1: Input: nums = [8,2,4,7], limit = 4 Output: 2 Explanation: All subarrays are: [8] with maximum absolute diff |8-8| = 0 <= 4. [8,2] with maximum absolute diff |8-2| = 6 > 4. [8,2,4] with maximum absolute diff |8-2| = 6 > 4. [8,2,4,7] with maximum absolute diff |8-2| = 6 > 4. [2] with maximum absolute diff |2-2| = 0 <= 4. [2,4] with maximum absolute diff |2-4| = 2 <= 4. [2,4,7] with maximum absolute diff |2-7| = 5 > 4. [4] with maximum absolute diff |4-4| = 0 <= 4. [4,7] with maximum absolute diff |4-7| = 3 <= 4. [7] with maximum absolute diff |7-7| = 0 <= 4. Therefore, the size of the longest subarray is 2. Example 2: Input: nums = [10,1,2,4,7,2], limit = 5 Output: 4 Explanation: The subarray [2,4,7,2] is the longest since the maximum absolute diff is |2-7| = 5 <= 5. Example 3: Input: nums = [4,2,2,2,4,4,2,2], limit = 0 Output: 3   Constraints: 1 <= nums.length <= 105 1 <= nums[i] <= 109 0 <= limit <= 109
<a href="https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/" target="_blank">https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/</a>`,
            keywords: ["MonotonicQueue", "SlidingWindow"],
            code: `        # monoQueue + sliding window (since left is increase-only)
        # Why sliding window not working: result is from min/max in window, not left/right
        
        from collections import deque
        class Solution:
            def longestSubarray(self, nums: List[int], limit: int) -> int:
                maxq = deque()
                minq = deque()
        
                left = 0
                right = 0
        
                res = 0
                while right < len(nums):
                    x = nums[right]
                    while maxq and maxq[-1] < x:
                        maxq.pop()
                    maxq.append(x)
                    while minq and minq[-1] > x:
                        minq.pop()
                    minq.append(x)
                    diff = maxq[0] - minq[0]
                    right += 1
                    while diff > limit:
                        x = nums[left]
                        if maxq[0] == x:
                            maxq.popleft()
                        if minq[0] == x:
                            minq.popleft()
                        diff = maxq[0] - minq[0]
                        left += 1
                    res = max(res, right - left)
                
                return res
        
        # class Solution:
        #     def longestSubarray(self, nums: List[int], limit: int) -> int:
        #         left = 0
        #         right = 0
        #         windowSize = 0
        #         res = 0
        #         window = MonotonicQueue()
        #         # 滑动窗口模板
        #         while right < len(nums):
        #             # 扩大窗口，更新窗口最值
        #             window.push(nums[right])
        #             right += 1
        #             windowSize += 1
        #             while window.max() - window.min() > limit:
        #                 # 缩小窗口，更新窗口最值
        #                 window.pop()
        #                 left += 1
        #                 windowSize -= 1
        #             # 在窗口收缩判断完之后才更新答案
        #             res = max(res, windowSize)
        #         return res
        
        # # 下面给出的是单调队列的通用实现，运行速度可能较慢，你可以自行简化提升速度
        # # 单调队列的详细解析见
        # # https://labuladong.online/algo/problem-set/monotonic-queue/
        # class MonotonicQueue:
        #     def __init__(self):
        #         # 常规队列，存储所有元素
        #         self.q = collections.deque()
        #         # 元素降序排列的单调队列，头部是最大值
        #         self.maxq = collections.deque()
        #         # 元素升序排列的单调队列，头部是最小值
        #         self.minq = collections.deque()
        
        #     def push(self, elem: int):
        #         # 维护常规队列，直接在队尾插入元素
        #         self.q.append(elem)
        
        #         # 维护 maxq，将小于 elem 的元素全部删除
        #         while self.maxq and self.maxq[-1] < elem:
        #             self.maxq.pop()
        #         self.maxq.append(elem)
        
        #         # 维护 minq，将大于 elem 的元素全部删除
        #         while self.minq and self.minq[-1] > elem:
        #             self.minq.pop()
        #         self.minq.append(elem)
        
        #     def max(self) -> int:
        #         # maxq 的头部是最大元素
        #         return self.maxq[0]
        
        #     def min(self) -> int:
        #         # minq 的头部是最大元素
        #         return self.minq[0]
        
        #     def pop(self) -> int:
        #         # 从标准队列头部弹出需要删除的元素
        #         deleteVal = self.q.popleft()
        
        #         # 由于 push 的时候会删除元素，deleteVal 可能已经被删掉了
        #         if deleteVal == self.maxq[0]:
        #             self.maxq.popleft()
        #         if deleteVal == self.minq[0]:
        #             self.minq.popleft()
        #         return deleteVal
        
        #     def size(self) -> int:
        #         # 标准队列的大小即是当前队列的大小
        #         return len(self.q)
        
        #     def isEmpty(self) -> bool:
        #         return not self.q`,
            language: "python"
        },
        {
            id: 1457,
            title: "Pseudo-Palindromic Paths in a Binary Tree",
            description: `Given a binary tree where node values are digits from 1 to 9. A path in the binary tree is said to be pseudo-palindromic if at least one permutation of the node values in the path is a palindrome. Return the number of pseudo-palindromic paths going from the root node to leaf nodes.   Example 1: Input: root = [2,3,1,3,1,null,1] Output: 2 Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the red path [2,3,3], the green path [2,1,1], and the path [2,3,1]. Among these paths only red path and green path are pseudo-palindromic paths since the red path [2,3,3] can be rearranged in [3,2,3] (palindrome) and the green path [2,1,1] can be rearranged in [1,2,1] (palindrome). Example 2: Input: root = [2,1,1,1,3,null,null,null,null,null,1] Output: 1 Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the green path [2,1,1], the path [2,1,3,1], and the path [2,1]. Among these paths only the green path is pseudo-palindromic since [2,1,1] can be rearranged in [1,2,1] (palindrome). Example 3: Input: root = [9] Output: 1   Constraints: The number of nodes in the tree is in the range [1, 105]. 1 <= Node.val <= 9
<a href="https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree/" target="_blank">https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree/</a>`,
            keywords: ["BT", "BTTraverse"],
            code: `        # contain only 1 1s: (self.cnt & (self.cnt - 1)) == 0
        # whether even: self.cnt ^= 1 << node.val
        
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        class Solution:
            def pseudoPalindromicPaths (self, root: Optional[TreeNode]) -> int:
                self.cnt = 0
                self.res = 0
                self.traverse(root)
                return self.res
                
            def traverse(self, node):
                if node is None:
                    return
                
                self.cnt ^= 1 << node.val
        
                if node.left is None and node.right is None:
                    pseudo = (self.cnt & (self.cnt - 1)) == 0
                    if pseudo:
                        self.res += 1
                    self.cnt ^= 1 << node.val
                    return
        
                self.traverse(node.left)
                self.traverse(node.right)
        
                self.cnt ^= 1 << node.val
                
        # class Solution:
        #     def __init__(self):
        #         self.count = [0] * 10
        #         self.res = 0
        
        #     def pseudoPalindromicPaths(self, root: TreeNode) -> int:
        #         self.traverse(root)
        #         return self.res
        
        #     # 二叉树遍历函数
        #     def traverse(self, root: TreeNode):
        #         if root is None:
        #             return
        #         if root.left is None and root.right is None:
        #             # 遇到叶子节点，判断路径是否是伪回文串
        #             self.count[root.val] += 1
        #             # 如果路径上出现奇数次的数字个数大于 1，
        #             # 则不可能组成回文串，反之则可以组成回文串
        #             odd = 0
        #             for n in self.count:
        #                 if n % 2 == 1:
        #                     odd += 1
        #             if odd <= 1:
        #                 self.res += 1
        #             self.count[root.val] -= 1
        #             return
        
        #         self.count[root.val] += 1
        #         # 二叉树遍历框架
        #         self.traverse(root.left)
        #         self.traverse(root.right)
        
        #         self.count[root.val] -= 1
        
        # # 用位运算代替数组计数，进一步提升效率
        # class Solution2:
        #     def __init__(self):
        #         self.count = 0
        #         self.res = 0
        
        #     def pseudoPalindromicPaths(self, root: TreeNode) -> int:
        #         self.traverse(root)
        #         return self.res
        
        #     # 二叉树遍历函数
        #     def traverse(self, root: TreeNode):
        #         if root is None:
        #             return
        #         if root.left is None and root.right is None:
        #             # 遇到叶子节点，判断路径是否是伪回文串
        #             self.count ^= (1 << root.val)
        #             # 判断二进制中只有一位 1，原理见 https://labuladong.online/algo/frequency-interview/bitwise-operation/
        #             if (self.count & (self.count - 1)) == 0:
        #                 self.res += 1
        #             self.count ^= (1 << root.val)
        #             return
        #         self.count ^= (1 << root.val)
        #         # 二叉树遍历框架
        #         self.traverse(root.left)
        #         self.traverse(root.right)
        
        #         self.count ^= (1 << root.val)`,
            language: "python"
        },
        {
            id: 1475,
            title: "Final Prices With a Special Discount in a Shop",
            description: `You are given an integer array prices where prices[i] is the price of the ith item in a shop. There is a special discount for items in the shop. If you buy the ith item, then you will receive a discount equivalent to prices[j] where j is the minimum index such that j > i and prices[j] <= prices[i]. Otherwise, you will not receive any discount at all. Return an integer array answer where answer[i] is the final price you will pay for the ith item of the shop, considering the special discount.   Example 1: Input: prices = [8,4,6,2,3] Output: [4,2,4,2,3] Explanation: For item 0 with price[0]=8 you will receive a discount equivalent to prices[1]=4, therefore, the final price you will pay is 8 - 4 = 4. For item 1 with price[1]=4 you will receive a discount equivalent to prices[3]=2, therefore, the final price you will pay is 4 - 2 = 2. For item 2 with price[2]=6 you will receive a discount equivalent to prices[3]=2, therefore, the final price you will pay is 6 - 2 = 4. For items 3 and 4 you will not receive any discount at all. Example 2: Input: prices = [1,2,3,4,5] Output: [1,2,3,4,5] Explanation: In this case, for all items, you will not receive any discount at all. Example 3: Input: prices = [10,1,1,6] Output: [9,0,1,6]   Constraints: 1 <= prices.length <= 500 1 <= prices[i] <= 1000
<a href="https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/" target="_blank">https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/</a>`,
            keywords: ["MonotonicStack"],
            code: `        # nle
        class Solution:
            def finalPrices(self, prices: List[int]) -> List[int]:
                res = [p for p in prices]
                n = len(prices)
                nle = []
                for i in range(n-1, -1, -1):
                    while nle and nle[-1] > prices[i]:
                        nle.pop()
                    res[i] -= nle[-1] if nle else 0
                    nle.append(prices[i])
                return res`,
            language: "python"
        },
        {
            id: 1514,
            title: "Path with Maximum Probability",
            description: `You are given an undirected weighted graph of n nodes (0-indexed), represented by an edge list where edges[i] = [a, b] is an undirected edge connecting the nodes a and b with a probability of success of traversing that edge succProb[i]. Given two nodes start and end, find the path with the maximum probability of success to go from start to end and return its success probability. If there is no path from start to end, return 0. Your answer will be accepted if it differs from the correct answer by at most 1e-5.   Example 1: Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2 Output: 0.25000 Explanation: There are two paths from start to end, one having a probability of success = 0.2 and the other has 0.5 * 0.5 = 0.25. Example 2: Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2 Output: 0.30000 Example 3: Input: n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2 Output: 0.00000 Explanation: There is no path between 0 and 2.   Constraints: 2 <= n <= 10^4 0 <= start, end < n start != end 0 <= a, b < n a != b 0 <= succProb.length == edges.length <= 2*10^4 0 <= succProb[i] <= 1 There is at most one edge between every two nodes.
<a href="https://leetcode.com/problems/path-with-maximum-probability/" target="_blank">https://leetcode.com/problems/path-with-maximum-probability/</a>`,
            keywords: ["Graph", "Dijkstra"],
            code: `        # larger: reverse __lt__
        # monotonic
        
        import heapq
        
        class State:
            def __init__(self, i, prob):
                self.i = i
                self.probTo = prob
            def __lt__(self, state):
                return self.probTo > state.probTo # reverse the order, the larger the first
        
        class Solution:
            def maxProbability(self, n: int, edges: List[List[int]], succProb: List[float], start_node: int, end_node: int) -> float:
                pq = []
                probsTo = [0 for i in range(n)]
                graph = [[] for i in range(n)]
                for (a, b), prob in zip(edges, succProb):
                    graph[a].append((b, prob))
                    graph[b].append((a, prob))
                
                heapq.heappush(pq, State(start_node, 1))
                probsTo[start_node] = 1
        
                while pq:
                    cur = heapq.heappop(pq)
                    i, probTo = cur.i, cur.probTo
        
                    if probTo < probsTo[i]:
                        continue
                    
                    if i == end_node:
                        return probTo
                    
                    for j, prob in graph[i]:
                        probToJ = probTo * prob
                        if probToJ > probsTo[j]:
                            probsTo[j] = probToJ
                            heapq.heappush(pq, State(j, probToJ))
                
                return 0
        
        # import heapq
        
        # class Solution:
        #     def maxProbability(self, n: int, edges: list[list[int]], succProb: list[float], start: int, end: int) -> float:
        #         graph = [[] for _ in range(n)]
        #         # 构造无向图
        #         for i in range(len(edges)):
        #             from_node = edges[i][0]
        #             to_node = edges[i][1]
        #             weight = succProb[i]
        #             # 无向图其实就是双向图
        #             graph[from_node].append([to_node, weight])
        #             graph[to_node].append([from_node, weight])
        
        #         res = self.dijkstra(graph, start, end)
        #         # 如果 res 为 -1，说明没有从 start 到 end 的路径
        #         return 0 if res == -1 else res
        
        #     class State:
        #         def __init__(self, node: int, probFromStart: float):
        #             self.node = node
        #             self.probFromStart = probFromStart
        
        #         def __lt__(self, other):
        #             # 求最大概率路径，所以需要把概率大的放在前面
        #             # heapq in python is a min-heap, so reverse for max-heap
        #             return self.probFromStart > other.probFromStart
        
        #     # Dijkstra 算法模板 https://labuladong.online/algo/data-structure/dijkstra/
        #     def dijkstra(self, graph: list[list[list[float]]], src: int, dst: int) -> float:
        #         probTo = [0.0] * len(graph)
        
        #         pq = []
        #         heapq.heappush(pq, self.State(src, 1.0))
        #         probTo[src] = 1.0
        
        #         while pq:
        #             state = heapq.heappop(pq)
        #             curNode = state.node
        #             curProbFromStart = state.probFromStart
        
        #             # 已经存在更优路径，则跳过
        #             if probTo[curNode] > curProbFromStart:
        #                 continue
        #             # 判断是否已经到达目标点
        #             if curNode == dst:
        #                 return probTo[curNode]
        
        #             for e in graph[curNode]:
        #                 nextNode = int(e[0])
        #                 nextProbFromStart = curProbFromStart * e[1]
        
        #                 # 已经存在更优路径，则跳过
        #                 if probTo[nextNode] >= nextProbFromStart:
        #                     continue
        #                 heapq.heappush(pq, self.State(nextNode, nextProbFromStart))
        #                 probTo[nextNode] = nextProbFromStart
        
        #         return -1`,
            language: "python"
        },
        {
            id: 1584,
            title: "Min Cost to Connect All Points",
            description: `You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi]. The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val. Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.   Example 1: Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]] Output: 20 Explanation: We can connect the points as shown above to get the minimum cost of 20. Notice that there is a unique path between every pair of points. Example 2: Input: points = [[3,12],[-2,5],[-4,1]] Output: 18   Constraints: 1 <= points.length <= 1000 -106 <= xi, yi <= 106 All pairs (xi, yi) are distinct.`,
            keywords: ["Graph", "MST"],
            code: `        # Minimum Spanning Tree
        #   Kruskal
        #     sort by edge weight
        #     UF
        #   Prim
        #     PQ
        #     Dijkstra
        
        # Kruskal
        # 假设一幅图的节点个数为 V，边的条数为 E，首先需要 O(E) 的空间装所有边，而且 Union-Find 算法也需要 O(V) 的空间，所以 Kruskal 算法总的空间复杂度就是 O(V+E)。时间复杂度主要耗费在排序，需要 O(ElogE) 的时间，Union-Find 算法所有操作的复杂度都是 O(1)，套一个 for 循环也不过是 O(E)，所以总的时间复杂度为 O(ElogE)。
        
        class UF:
            def __init__(self, n):
                self.count = n
                self.parents = [i for i in range(n)]
                self.sizes = [1 for i in range(n)]
            
            def find(self, p):
                if self.parents[p] != p:
                    root = self.find(self.parents[p])
                    self.parents[p] = root
                return self.parents[p]
        
            def union(self, p, q):
                r1 = self.find(p)
                r2 = self.find(q)
                # don't proceed!
                if r1 == r2:
                    return
                if self.sizes[r1] < self.sizes[r2]:
                    self.parents[r1] = r2
                    self.sizes[r2] += self.sizes[r1]
                else:
                    self.parents[r2] = r1
                    self.sizes[r1] += self.sizes[r2]
                # reduce component
                self.count -= 1
        
            def connected(self, p, q):
                r1 = self.find(p)
                r2 = self.find(q)
                return r1 == r2
        
        class Solution:
            def minCostConnectPoints(self, points: List[List[int]]) -> int:
                edges = []
                n = len(points)
                for i in range(n):
                    xi, yi = points[i]
                    for j in range(i + 1, n):
                        xj, yj = points[j]
                        d = abs(xi-xj) + abs(yi-yj)
                        edges.append((i, j, d))
                
                edges.sort(key=lambda x:x[2])
                uf = UF(n)
                minCost = 0
                for i, j, d in edges:
                    if uf.connected(i, j):
                        continue
                    uf.union(i, j)
                    minCost += d
                
                return minCost if uf.count == 1 else -1
        
        
        # # M261
        # from typing import List
        
        # class Solution:
        #     # 初始化 0...n-1 共 n 个节点
        #     def validTree(self, n: int, edges: List[List[int]]) -> bool:
        #         uf = self.UF(n)
        #         # 遍历所有边，将组成边的两个节点进行连接
        #         for edge in edges:
        #             u = edge[0]
        #             v = edge[1]
        #             # 若两个节点已经在同一连通分量中，会产生环
        #             if uf.connected(u, v):
        #                 return False
        #             # 这条边不会产生环，可以是树的一部分
        #             uf.union(u, v)
        #         # 要保证最后只形成了一棵树，即只有一个连通分量
        #         return uf.get_count() == 1
        
        #     class UF:
        #         # 连通分量个数
        #         def __init__(self, n: int):
        #             self.count = n
        #             # 存储一棵树
        #             self.parent = [i for i in range(n)]
        #             # 记录树的「重量」
        #             self.size = [1] * n
        #             # n 为图中节点的个数
        
        #         # 将节点 p 和节点 q 连通
        #         def union(self, p: int, q: int):
        #             rootP = self.find(p)
        #             rootQ = self.find(q)
        #             if rootP == rootQ:
        #                 return
        
        #             # 小树接到大树下面，较平衡
        #             if self.size[rootP] > self.size[rootQ]:
        #                 self.parent[rootQ] = rootP
        #                 self.size[rootP] += self.size[rootQ]
        #             else:
        #                 self.parent[rootP] = rootQ
        #                 self.size[rootQ] += self.size[rootP]
        #             # 两个连通分量合并成一个连通分量
        #             self.count -= 1
        
        #         # 判断节点 p 和节点 q 是否连通
        #         def connected(self, p: int, q: int) -> bool:
        #             return self.find(p) == self.find(q)
        
        #         # 返回节点 x 的连通分量根节点
        #         def find(self, x: int) -> int:
        #             while self.parent[x] != x:
        #                 # 进行路径压缩
        #                 self.parent[x] = self.parent[self.parent[x]]
        #                 x = self.parent[x]
        #             return x
        
        #         # 返回图中的连通分量个数
        #         def get_count(self) -> int:
        #             return self.count
        
        # # M1135
        # class Solution:
        #     def minimumCost(self, n: int, connections: List[List[int]]) -> int:
        #         # 城市编号为 1...n，所以初始化大小为 n + 1
        #         uf = UF(n + 1)
        #         # 对所有边按照权重从小到大排序
        #         connections.sort(key=lambda x: x[2])
        #         # 记录最小生成树的权重之和
        #         mst = 0
        #         for edge in connections:
        #             u, v, weight = edge
        #             # 若这条边会产生环，则不能加入 mst
        #             if uf.connected(u, v):
        #                 continue
        #             # 若这条边不会产生环，则属于最小生成树
        #             mst += weight
        #             uf.union(u, v)
        #         # 保证所有节点都被连通
        #         # 按理说 uf.count() == 1 说明所有节点被连通
        #         # 但因为节点 0 没有被使用，所以 0 会额外占用一个连通分量
        #         return mst if uf.get_count() == 2 else -1
        
        # # M1584 This question
        # from typing import List
        
        # class Solution:
        #     def minCostConnectPoints(self, points: List[List[int]]) -> int:
        #         n = len(points)
        #         # 生成所有边及权重
        #         edges = []
        #         for i in range(n):
        #             for j in range(i + 1, n):
        #                 xi, yi = points[i]
        #                 xj, yj = points[j]
        #                 # 用坐标点在 points 中的索引表示坐标点
        #                 edges.append((i, j, abs(xi - xj) + abs(yi - yj)))
                
        #         # 将边按照权重从小到大排序
        #         edges.sort(key=lambda x: x[2])
                
        #         # 执行 Kruskal 算法
        #         mst = 0
        #         uf = Solution.UF(n)  # Fixed: Use Solution.UF to access the inner class
        #         for edge in edges:
        #             u, v, weight = edge
        #             # 若这条边会产生环，则不能加入 mst
        #             if uf.connected(u, v):
        #                 continue
        #             # 若这条边不会产生环，则属于最小生成树
        #             mst += weight
        #             uf.union(u, v)
        #         return mst`,
            language: "python"
        },
        {
            id: 1609,
            title: "Even Odd Tree",
            description: `A binary tree is named Even-Odd if it meets the following conditions: The root of the binary tree is at level index 0, its children are at level index 1, their children are at level index 2, etc. For every even-indexed level, all nodes at the level have odd integer values in strictly increasing order (from left to right). For every odd-indexed level, all nodes at the level have even integer values in strictly decreasing order (from left to right). Given the root of a binary tree, return true if the binary tree is Even-Odd, otherwise return false.   Example 1: Input: root = [1,10,4,3,null,7,9,12,8,6,null,null,2] Output: true Explanation: The node values on each level are: Level 0: [1] Level 1: [10,4] Level 2: [3,7,9] Level 3: [12,8,6,2] Since levels 0 and 2 are all odd and increasing and levels 1 and 3 are all even and decreasing, the tree is Even-Odd. Example 2: Input: root = [5,4,2,3,3,7] Output: false Explanation: The node values on each level are: Level 0: [5] Level 1: [4,2] Level 2: [3,3,7] Node values in level 2 must be in strictly increasing order, so the tree is not Even-Odd. Example 3: Input: root = [5,9,1,3,5,7] Output: false Explanation: Node values in the level 1 should be even integers.   Constraints: The number of nodes in the tree is in the range [1, 105]. 1 <= Node.val <= 106
<a href="https://leetcode.com/problems/even-odd-tree/description/" target="_blank">https://leetcode.com/problems/even-odd-tree/description/</a>`,
            keywords: ["BT", "BFS"],
            code: `        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right
        from collections import deque
        class Solution:
            def isEvenOddTree(self, root: Optional[TreeNode]) -> bool:
                q = deque()
                if root is None:
                    return False
                q.append(root)
                flag = False
                while q:
                    sz = len(q)
                    if not flag:
                        prev = 0
                    else:
                        prev = 10**6 + 1
        
                    for i in range(sz):
                        cur = q.popleft()
                        if not flag:
                            if cur.val % 2 == 0 or cur.val <= prev:
                                return False
                        else:
                            if cur.val % 2 == 1 or cur.val >= prev:
                                return False
                        
                        if cur.left:
                            q.append(cur.left)
                        if cur.right:
                            q.append(cur.right)
                        
                        prev = cur.val
                    
                    flag = not flag
                    
                return True
                            
        
        
        # import sys
        
        # class Solution:
        #     def isEvenOddTree(self, root: TreeNode) -> bool:
        #         if root is None:
        #             return True
        
        #         q = deque()
        #         q.append(root)
        #         # 记录奇偶层数
        #         even = True
        #         # while 循环控制从上向下一层层遍历
        #         while q:
        #             sz = len(q)
        #             # 记录前一个节点，便于判断是否递增/递减
        #             prev = -sys.maxsize if even else sys.maxsize
        #             # for 循环控制每一层从左向右遍历
        #             for i in range(sz):
        #                 cur = q.popleft()
        #                 if even:
        #                     # 偶数层
        #                     if prev >= cur.val or cur.val % 2 == 0:
        #                         return False
        #                 else:
        #                     # 奇数层
        #                     if prev <= cur.val or cur.val % 2 == 1:
        #                         return False
        #                 prev = cur.val
        
        #                 if cur.left is not None:
        #                     q.append(cur.left)
        #                 if cur.right is not None:
        #                     q.append(cur.right)
        #             # 奇偶层数切换
        #             even = not even
        #         return True`,
            language: "python"
        },
        {
            id: 1631,
            title: "Path With Minimum Effort",
            description: `You are a hiker preparing for an upcoming hike. You are given heights, a 2D array of size rows x columns, where heights[row][col] represents the height of cell (row, col). You are situated in the top-left cell, (0, 0), and you hope to travel to the bottom-right cell, (rows-1, columns-1) (i.e., 0-indexed). You can move up, down, left, or right, and you wish to find a route that requires the minimum effort. A route's effort is the maximum absolute difference in heights between two consecutive cells of the route. Return the minimum effort required to travel from the top-left cell to the bottom-right cell.   Example 1: Input: heights = [[1,2,2],[3,8,2],[5,3,5]] Output: 2 Explanation: The route of [1,3,5,3,5] has a maximum absolute difference of 2 in consecutive cells. This is better than the route of [1,2,2,2,5], where the maximum absolute difference is 3. Example 2: Input: heights = [[1,2,3],[3,8,4],[5,3,5]] Output: 1 Explanation: The route of [1,2,3,4,5] has a maximum absolute difference of 1 in consecutive cells, which is better than route [1,3,5,3,5]. Example 3: Input: heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]] Output: 0 Explanation: This route does not require any effort.   Constraints: rows == heights.length columns == heights[i].length 1 <= rows, columns <= 100 1 <= heights[i][j] <= 106
<a href="https://leetcode.com/problems/path-with-minimum-effort/" target="_blank">https://leetcode.com/problems/path-with-minimum-effort/</a>`,
            keywords: ["Graph", "Dijkstra"],
            code: `        # monotonic
        
        import heapq
        class State:
            def __init__(self, i, j, effort):
                self.i = i
                self.j = j
                self.effort = effort
            
            def __lt__(self, state):
                return self.effort < state.effort
        
        class Solution:
            def minimumEffortPath(self, heights: List[List[int]]) -> int:
                pq = []
                
                m = len(heights)
                n = len(heights[0])
                effortTo = [[float('inf') for i in range(n)] for j in range(m)]
        
                heapq.heappush(pq, State(0, 0, 0))
        
                while pq:
                    cur = heapq.heappop(pq)
                    i, j, e = cur.i, cur.j, cur.effort
                    if e > effortTo[i][j]:
                        continue
                    #effortTo[i][j] = e, no need this is the one
                    if i == m-1 and j == n-1:
                        return e
                    
                    for di, dj in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                        newI = i + di
                        newJ = j + dj
                        if newI < 0 or newI >= m or newJ < 0 or newJ >= n:
                            continue
        
                        newEffort = abs(heights[i][j] - heights[newI][newJ])
                        newEffort = max(e, newEffort)
                        if newEffort < effortTo[newI][newJ]:
                            effortTo[newI][newJ] = newEffort
                            heapq.heappush(pq, State(newI, newJ, newEffort))
                    
                return -1
        
        
                
        
        # import heapq
        
        # class Solution:
        #     def minimumEffortPath(self, heights: list[list[int]]) -> int:
        #         # Dijkstra 算法，计算 (0, 0) 到 (m - 1, n - 1) 的最小体力消耗
        #         return self.dijkstra(heights)
        
        #     # 记录当前位置和从起点到当前位置的最小体力消耗
        #     class State:
        #         def __init__(self, row: int, col: int, effortFromStart: int):
        #             self.row = row
        #             self.col = col
        #             self.effortFromStart = effortFromStart
                
        #         def __lt__(self, other):
        #             return self.effortFromStart < other.effortFromStart
        
        #     # Dijkstra 算法模板 https://labuladong.online/algo/data-structure/dijkstra/
        #     def dijkstra(self, matrix: list[list[int]]) -> int:
        #         m, n = len(matrix), len(matrix[0])
        #         # 记录从起点 (0, 0) 到每个节点的最小体力消耗
        #         distTo = [[float('inf')] * n for _ in range(m)]
        
        #         pq = []
        #         # 从起点 (0, 0) 开始进行 dijkstra 算法
        #         heapq.heappush(pq, self.State(0, 0, 0))
        #         distTo[0][0] = 0
        
        #         while pq:
        #             state = heapq.heappop(pq)
        #             curRow = state.row
        #             curCol = state.col
        #             curEffortFromStart = state.effortFromStart
        
        #             # 已经存在更优路径，则跳过
        #             if distTo[curRow][curCol] < curEffortFromStart:
        #                 continue
        
        #             # 判断是否已经到达目标点
        #             if curRow == m - 1 and curCol == n - 1:
        #                 return distTo[curRow][curCol]
        
        #             for neighbor in self.adj(matrix, curRow, curCol):
        #                 nextRow = neighbor[0]
        #                 nextCol = neighbor[1]
        #                 nextEffortFromStart = max(curEffortFromStart, abs(matrix[nextRow][nextCol] - matrix[curRow][curCol]))
        
        #                 # 已经存在更优路径，则跳过
        #                 if distTo[nextRow][nextCol] <= nextEffortFromStart:
        #                     continue
        #                 heapq.heappush(pq, self.State(nextRow, nextCol, nextEffortFromStart))
        #                 distTo[nextRow][nextCol] = nextEffortFromStart
        #         return -1
        
        #     # 返回坐标 (x, y) 的上下左右相邻坐标
        #     def adj(self, matrix: list[list[int]], x: int, y: int) -> list[list[int]]:
        #         # 方向数组，上下左右的坐标偏移量
        #         dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]
        #         m, n = len(matrix), len(matrix[0])
        #         # 存储相邻节点
        #         neighbors = []
        #         for dir in dirs:
        #             nx = x + dir[0]
        #             ny = y + dir[1]
        #             if nx >= m or nx < 0 or ny >= n or ny < 0:
        #                 # 索引越界
        #                 continue
        #             neighbors.append([nx, ny])
        #         return neighbors
        `,
            language: "python"
        },
        {
            id: 1644,
            title: "二叉树的最近公共祖先 II",
            description: `给你输入一棵不含重复值的二叉树的，以及两个节点 p 和 q，如果 p 或 q 不存在于树中，则返回空指针，否则的话返回 p 和 q 的最近公共祖先节点。
<a href="https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-ii" target="_blank">https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-ii</a>`,
            keywords: ["BT", "LCA"],
            code: `        # not know whether p q exists
        # should put cur val check post-order
        
        class Solution:
            def __init__(self):
                # 用于记录 p 和 q 是否存在于二叉树中
                self.foundP = False
                self.foundQ = False
        
            def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
                res = self.find(root, p.val, q.val)
                if not self.foundP or not self.foundQ:
                    return None
                # p 和 q 都存在二叉树中，才有公共祖先
                return res
                
            # 在二叉树中寻找 val1 和 val2 的最近公共祖先节点
            def find(self, root, val1, val2):
                if not root:
                    return None
                left = self.find(root.left, val1, val2)
                right = self.find(root.right, val1, val2)
                
                # 后序位置，判断当前节点是不是 LCA 节点
                if left and right:
                    return root
                
                # 后序位置，判断当前节点是不是目标值
                if root.val == val1 or root.val == val2:
                    # 找到了，记录一下
                    if root.val == val1:
                        self.foundP = True
                    if root.val == val2:
                        self.foundQ = True
                    return root
        
                return left if left else right`,
            language: "python"
        },
        {
            id: 1650,
            title: "二叉树的最近公共祖先 III",
            description: `这次输入的二叉树节点比较特殊，包含指向父节点的指针。题目会给你输入一棵存在于二叉树中的两个节点 p 和 q，请你返回它们的最近公共祖先
<a href="https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii" target="_blank">https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii</a>`,
            keywords: ["BT", "LCA"],
            code: `        # given parent for each node, but problem don’t give you root
        # 这道题其实不是公共祖先的问题，而是单链表相交的问题
        
        class Solution:
            # 施展链表双指针技巧
            def lowestCommonAncestor(self, p: 'Node', q: 'Node') -> 'Node':
                a, b = p, q
                while a != b:
                    # a 走一步，如果走到根节点，转到 q 节点
                    if a is None:
                        a = q
                    else:
                        a = a.parent
                    # b 走一步，如果走到根节点，转到 p 节点
                    if b is None:
                        b = p
                    else:
                        b = b.parent
                return a`,
            language: "python"
        },
        {
            id: 1658,
            title: "Minimum Operations to Reduce X to Zero",
            description: `You are given an integer array nums and an integer x. In one operation, you can either remove the leftmost or the rightmost element from the array nums and subtract its value from x. Note that this modifies the array for future operations. Return the minimum number of operations to reduce x to exactly 0 if it is possible, otherwise, return -1.   Example 1: Input: nums = [1,1,4,2,3], x = 5 Output: 2 Explanation: The optimal solution is to remove the last two elements to reduce x to zero. Example 2: Input: nums = [5,6,7,8,9], x = 4 Output: -1 Example 3: Input: nums = [3,2,20,1,1,3], x = 10 Output: 5 Explanation: The optimal solution is to remove the last three elements and the first two elements (5 operations in total) to reduce x to zero.   Constraints: 1 <= nums.length <= 105 1 <= nums[i] <= 104 1 <= x <= 109
<a href="https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/" target="_blank">https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/</a>`,
            keywords: ["SlidingWindow"],
            code: `        # mind the case where window size is 0, in this case [) right open is easier
        # sometimes the result need to be verified outside (after left out of range)
        
        class Solution:
            def minOperations(self, nums: List[int], x: int) -> int:
                total = sum(nums)
                target = total - x
        
                left = 0
                right = 0
                cnt = 0
                res = -1
                while right < len(nums):
                    
                    cnt += nums[right]
                    right += 1 # right open
        
                    while left <= len(nums) and cnt >= target:
                        
                        if cnt == target and (right - left) > res:
                            res = (right - left)
        
                        if left == len(nums): # or just put \`update\` outside
                            break
                        cnt -= nums[left]
                        left += 1
                
                return len(nums) - res if res != -1 else -1`,
            language: "python"
        },
        {
            id: 1670,
            title: "Design Front Middle Back Queue",
            description: `Design a queue that supports push and pop operations in the front, middle, and back. Implement the FrontMiddleBack class: FrontMiddleBack() Initializes the queue. void pushFront(int val) Adds val to the front of the queue. void pushMiddle(int val) Adds val to the middle of the queue. void pushBack(int val) Adds val to the back of the queue. int popFront() Removes the front element of the queue and returns it. If the queue is empty, return -1. int popMiddle() Removes the middle element of the queue and returns it. If the queue is empty, return -1. int popBack() Removes the back element of the queue and returns it. If the queue is empty, return -1. Notice that when there are two middle position choices, the operation is performed on the frontmost middle position choice. For example: Pushing 6 into the middle of [1, 2, 3, 4, 5] results in [1, 2, 6, 3, 4, 5]. Popping the middle from [1, 2, 3, 4, 5, 6] returns 3 and results in [1, 2, 4, 5, 6].   Example 1: Input: ["FrontMiddleBackQueue", "pushFront", "pushBack", "pushMiddle", "pushMiddle", "popFront", "popMiddle", "popMiddle", "popBack", "popFront"] [[], [1], [2], [3], [4], [], [], [], [], []] Output: [null, null, null, null, null, 1, 3, 4, 2, -1] Explanation: FrontMiddleBackQueue q = new FrontMiddleBackQueue(); q.pushFront(1); // [1] q.pushBack(2); // [1, 2] q.pushMiddle(3); // [1, 3, 2] q.pushMiddle(4); // [1, 4, 3, 2] q.popFront(); // return 1 -> [4, 3, 2] q.popMiddle(); // return 3 -> [4, 2] q.popMiddle(); // return 4 -> [2] q.popBack(); // return 2 -> [] q.popFront(); // return -1 -> [] (The queue is empty)   Constraints: 1 <= val <= 109 At most 1000 calls will be made to pushFront, pushMiddle, pushBack, popFront, popMiddle, and popBack.
<a href="https://leetcode.com/problems/design-front-middle-back-queue/" target="_blank">https://leetcode.com/problems/design-front-middle-back-queue/</a>`,
            keywords: ["Queue"],
            code: `        # use deque
        # make len(q1) <= len(q2)
        # when popMiddle, analyze case len(q1) == len(q2) and len(q1) < len(q2)
        
        from collections import deque
        class FrontMiddleBackQueue:
            # 4 3 2
            def __init__(self):
                # q2 >= q1
                self.q1 = deque()
                self.q2 = deque()
        
            def balance(self):
                while len(self.q1) < len(self.q2):
                    self.q1.append(self.q2.popleft())
                while len(self.q2) < len(self.q1):
                    self.q2.appendleft(self.q1.pop())
                
            def pushFront(self, val: int) -> None:
                self.q1.appendleft(val)
                self.balance()
        
            def pushMiddle(self, val: int) -> None:
                self.q1.append(val)
                self.balance()
        
            def pushBack(self, val: int) -> None:
                self.q2.append(val)
                self.balance()
        
            def popFront(self) -> int:
                if self.q1:
                    val = self.q1.popleft()
                elif self.q2:
                    val = self.q2.popleft()
                else:
                    return -1
                self.balance()
                return val
        
            def popMiddle(self) -> int:
                if len(self.q1) == len(self.q2) and self.q1:
                    val = self.q1.pop()
                elif len(self.q1) < len(self.q2) and self.q2:
                    val = self.q2.popleft()
                else:
                    return -1
                self.balance()
                return val
        
            def popBack(self) -> int:
                if self.q2:
                    val = self.q2.pop()
                elif self.q1:
                    val = self.q1.pop()
                else:
                    return -1
                self.balance()
                return val
        
        
        # Your FrontMiddleBackQueue object will be instantiated and called as such:
        # obj = FrontMiddleBackQueue()
        # obj.pushFront(val)
        # obj.pushMiddle(val)
        # obj.pushBack(val)
        # param_4 = obj.popFront()
        # param_5 = obj.popMiddle()
        # param_6 = obj.popBack()
        
        # from collections import deque
        
        # class FrontMiddleBackQueue:
        #     # 用两个列表表示队列的左右两部分，以便从中间操作元素
        #     def __init__(self):
        #         self.left = deque()
        #         self.right = deque()
            
        #     # 维护左边少右边多的状态，每次增删元素之后都要执行一次
        #     def balance(self):
        #         # 右边最多比左边多一个元素
        #         if len(self.right) > len(self.left) + 1:
        #             # 右边多，匀一个给左边
        #             self.left.append(self.right.popleft())
        #         if len(self.left) > len(self.right):
        #             # 左边多，匀一个给右边
        #             self.right.appendleft(self.left.pop())
            
        #     def pushFront(self, val: int) -> None:
        #         self.left.appendleft(val)
        #         self.balance()
            
        #     def pushMiddle(self, val: int) -> None:
        #         if self.size() % 2 == 0:
        #             # 如果有偶数个元素时，pushMiddle 优先向右边添加
        #             self.right.appendleft(val)
        #         else:
        #             self.left.append(val)
        #         self.balance()
            
        #     def pushBack(self, val: int) -> None:
        #         self.right.append(val)
        #         self.balance()
            
        #     def popFront(self) -> int:
        #         if self.size() == 0:
        #             return -1
        #         if self.size() == 1:
        #             # 如果只有 1 个元素，popFront 的时候，要去右边删除
        #             return self.right.popleft()
        #         e = self.left.popleft()
        #         self.balance()
        #         return e
            
        #     def popMiddle(self) -> int:
        #         if self.size() == 0:
        #             return -1
        #         if self.size() % 2 == 0:
        #             e = self.left.pop()
        #         else:
        #             # 如果有奇数个元素时，popMiddle 优先从右边删除
        #             e = self.right.popleft()
        #         self.balance()
        #         return e
            
        #     def popBack(self) -> int:
        #         if self.size() == 0:
        #             return -1
        #         e = self.right.pop()
        #         self.balance()
        #         return e
            
        #     def size(self) -> int:
        #         return len(self.left) + len(self.right)`,
            language: "python"
        },
        {
            id: 1676,
            title: "二叉树的最近公共祖先 IV",
            description: `依然给你输入一棵不含重复值的二叉树，但这次不是给你输入 p 和 q 两个节点了，而是给你输入一个包含若干节点的列表 nodes（这些节点都存在于二叉树中），让你算这些节点的最近公共祖先。
<a href="https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iv/" target="_blank">https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iv/</a>`,
            keywords: ["BT", "LCA"],
            code: `        # just more checking nodes
        # 需要注意的是，这两道题的题目都明确告诉我们这些节点必定存在于二叉树中，如果没有这个前提条件，就需要修改代码了。
        
        class Solution:
            def lowestCommonAncestor(self, root: 'TreeNode', nodes: 'List[TreeNode]') -> 'TreeNode':
                # 将列表转化成哈希集合，便于判断元素是否存在
                values = set()
                for node in nodes:
                    values.add(node.val)
                
                return self.find(root, values)
            
            def find(self, root: 'TreeNode', values: 'set') -> 'TreeNode':
                if root is None:
                    return None
                # 前序位置
                if root.val in values:
                    return root
        
                left = self.find(root.left, values)
                right = self.find(root.right, values)
                # 后序位置，已经知道左右子树是否存在目标值
                if left is not None and right is not None:
                    # 当前节点是 LCA 节点
                    return root
                
                return left if left is not None else right`,
            language: "python"
        },
        {
            id: 1696,
            title: "Jump Game VI",
            description: `You are given a 0-indexed integer array nums and an integer k. You are initially standing at index 0. In one move, you can jump at most k steps forward without going outside the boundaries of the array. That is, you can jump from index i to any index in the range [i + 1, min(n - 1, i + k)] inclusive. You want to reach the last index of the array (index n - 1). Your score is the sum of all nums[j] for each index j you visited in the array. Return the maximum score you can get.   Example 1: Input: nums = [1,-1,-2,4,-7,3], k = 2 Output: 7 Explanation: You can choose your jumps forming the subsequence [1,-1,4,3] (underlined above). The sum is 7. Example 2: Input: nums = [10,-5,-2,4,0,3], k = 3 Output: 17 Explanation: You can choose your jumps forming the subsequence [10,4,3] (underlined above). The sum is 17. Example 3: Input: nums = [1,-5,-20,4,-1,3,-6,-3], k = 2 Output: 0   Constraints: 1 <= nums.length, k <= 105 -104 <= nums[i] <= 104
<a href="https://leetcode.com/problems/jump-game-vi/" target="_blank">https://leetcode.com/problems/jump-game-vi/</a>`,
            keywords: ["MonotonicQueue", "SlidingWindow", "DP"],
            code: `        # put in monoQ(dp, dpQ), instead of another array struct
        # first and last must include: every comparison should be prev + cur, cur-only is not allowed
        
        from collections import deque
        class Solution:
            def maxResult(self, nums: List[int], k: int) -> int:
                dp = [float('-inf') for i in nums]
                dpQ = deque()
                n = len(nums)
        
                left = 0
                right = 0
        
                while right < n:
                    # get max
                    m = dpQ[0] if dpQ else 0
                    # first and last must include: every comparison should be prev + cur, cur-only is not allowed
                    cur = m + nums[right]
                    # push to dpQ
                    while dpQ and dpQ[-1] < cur:
                        dpQ.pop()
                    dpQ.append(cur)
                    dp[right] = cur
                    right += 1
                    # check k and pop
                    while right - left > k:
                        if dpQ and dpQ[0] == dp[left]:
                            dpQ.popleft()
                        left += 1
                return dp[-1]
        
        
        # # 第一步，暴力递归解法（超时）
        # class Solution1:
        #     def maxResult(self, nums: List[int], k: int) -> int:
        #         n = len(nums)
        #         return self.dp(nums, n - 1, k)
        
        #     # 定义：到达 nums[p] 所能获得的最大分数是 dp(nums, p)
        #     # 能跳到 nums[p]，必然是从 nums[p-k..p-1] 中的某个位置跳来的
        #     # 故状态转移方程为：dp[p] = max(nums[p-k..p-1]) + nums[p]
        #     def dp(self, nums: List[int], p: int, k: int) -> int:
        #         if p == 0:
        #             return nums[0]
        #         if p < 0:
        #             return float('-inf')
        #         # 实现状态转移方程
        #         res = float('-inf')
        #         for i in range(1, k + 1):
        #             res = max(res, self.dp(nums, p - i, k))
        #         res += nums[p]
        #         return res
        
        # # 第二步，带备忘录的递归解法（超时）
        # class Solution2:
        #     # 备忘录
        #     def __init__(self):
        #         self.memo = []
        
        #     def maxResult(self, nums: List[int], k: int) -> int:
        #         n = len(nums)
        #         self.memo = [float('-inf')] * n
        #         # 备忘录初始化为最小值
        #         return self.dp(nums, n - 1, k)
        
        #     # 定义：到达 nums[p] 所能获得的最大分数是 dp(nums, p)
        #     def dp(self, nums: List[int], p: int, k: int) -> int:
        #         if p == 0:
        #             return nums[0]
        #         if p < 0:
        #             return float('-inf')
        #         # 查备忘录，避免冗余计算
        #         if self.memo[p] != float('-inf'):
        #             return self.memo[p]
        #         # 实现状态转移方程，结果存入备忘录
        #         for i in range(1, k + 1):
        #             self.memo[p] = max(self.memo[p], self.dp(nums, p - i, k))
        #         self.memo[p] += nums[p]
        #         return self.memo[p]
        
        # # 第三步，自顶向下的递归改为自底向上的迭代解法（超时）
        # class Solution3:
        #     def maxResult(self, nums: List[int], k: int) -> int:
        #         n = len(nums)
        #         # 定义：到达 nums[p] 的最大分数为 dp[p]
        #         dp = [float('-inf')] * n
        #         # dp 数组初始化为最小值
        #         dp[0] = nums[0]
        #         # 状态转移
        #         for p in range(1, n):
        #             for i in range(1, k + 1):
        #                 if p - i < 0:
        #                     continue
        #                 dp[p] = max(dp[p], dp[p - i])
        #             dp[p] += nums[p]
        #         return dp[n - 1]
        
        # # 第四步，利用单调队列结构消除内层循环（通过）
        # class Solution:
        #     def maxResult(self, nums: List[int], k: int) -> int:
        #         n = len(nums)
        #         window = MonotonicQueue()
        #         # 定义：到达 nums[p] 的最大分数为 dp[p]
        #         dp = [float('-inf')] * n
        #         # dp 数组初始化为最小值
        #         dp[0] = nums[0]
        #         window.push(dp[0])
        #         # 状态转移
        #         for p in range(1, n):
        #             dp[p] = window.max() + nums[p]
        #             # 维护窗口装着 dp[p-1..p-k]
        #             if window.size() == k:
        #                 window.pop()
        #             window.push(dp[p])
        #         return dp[n - 1]
        
        # # 下面给出的是单调队列的通用实现，运行速度可能较慢，你可以自行简化提升速度
        # # 单调队列的详细解析见
        # # https://labuladong.online/algo/problem-set/monotonic-queue/
        # class MonotonicQueue:
        #     # 常规队列，存储所有元素
        #     def __init__(self):
        #         self.q = collections.deque()
        #         # 元素降序排列的单调队列，头部是最大值
        #         self.maxq = collections.deque()
        #         # 元素升序排列的单调队列，头部是最小值
        #         self.minq = collections.deque()
        
        #     def push(self, elem: int):
        #         # 维护常规队列，直接在队尾插入元素
        #         self.q.append(elem)
        
        #         # 维护 maxq，将小于 elem 的元素全部删除
        #         while self.maxq and self.maxq[-1] < elem:
        #             self.maxq.pop()
        #         self.maxq.append(elem)
        
        #         # 维护 minq，将大于 elem 的元素全部删除
        #         while self.minq and self.minq[-1] > elem:
        #             self.minq.pop()
        #         self.minq.append(elem)
        
        #     def max(self) -> int:
        #         # maxq 的头部是最大元素
        #         return self.maxq[0]
        
        #     def min(self) -> int:
        #         # minq 的头部是最大元素
        #         return self.minq[0]
        
        #     def pop(self):
        #         # 从标准队列头部弹出需要删除的元素
        #         deleteVal = self.q.popleft()
        
        #         # 由于 push 的时候会删除元素，deleteVal 可能已经被删掉了
        #         if deleteVal == self.maxq[0]:
        #             self.maxq.popleft()
        #         if deleteVal == self.minq[0]:
        #             self.minq.popleft()
        
        #     def size(self) -> int:
        #         # 标准队列的大小即是当前队列的大小
        #         return len(self.q)
        
        #     def isEmpty(self) -> bool:
        #         return not self.q`,
            language: "python"
        },
        {
            id: 1700,
            title: "Number of Students Unable to Eat Lunch",
            description: `The school cafeteria offers circular and square sandwiches at lunch break, referred to by numbers 0 and 1 respectively. All students stand in a queue. Each student either prefers square or circular sandwiches. The number of sandwiches in the cafeteria is equal to the number of students. The sandwiches are placed in a stack. At each step: If the student at the front of the queue prefers the sandwich on the top of the stack, they will take it and leave the queue. Otherwise, they will leave it and go to the queue's end. This continues until none of the queue students want to take the top sandwich and are thus unable to eat. You are given two integer arrays students and sandwiches where sandwiches[i] is the type of the i\u200b\u200b\u200b\u200b\u200b\u200bth sandwich in the stack (i = 0 is the top of the stack) and students[j] is the preference of the j\u200b\u200b\u200b\u200b\u200b\u200bth student in the initial queue (j = 0 is the front of the queue). Return the number of students that are unable to eat.   Example 1: Input: students = [1,1,0,0], sandwiches = [0,1,0,1] Output: 0 Explanation: - Front student leaves the top sandwich and returns to the end of the line making students = [1,0,0,1]. - Front student leaves the top sandwich and returns to the end of the line making students = [0,0,1,1]. - Front student takes the top sandwich and leaves the line making students = [0,1,1] and sandwiches = [1,0,1]. - Front student leaves the top sandwich and returns to the end of the line making students = [1,1,0]. - Front student takes the top sandwich and leaves the line making students = [1,0] and sandwiches = [0,1]. - Front student leaves the top sandwich and returns to the end of the line making students = [0,1]. - Front student takes the top sandwich and leaves the line making students = [1] and sandwiches = [1]. - Front student takes the top sandwich and leaves the line making students = [] and sandwiches = []. Hence all students are able to eat. Example 2: Input: students = [1,1,1,0,0,1], sandwiches = [1,0,0,0,1,1] Output: 3   Constraints: 1 <= students.length, sandwiches.length <= 100 students.length == sandwiches.length sandwiches[i] is 0 or 1. students[i] is 0 or 1.
<a href="https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/" target="_blank">https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/</a>`,
            keywords: ["Design"],
            code: `        # stop condition: no one eat this sandwich anymore
        
        class Solution:
            def countStudents(self, students: List[int], sandwiches: List[int]) -> int:
                types = [
                    sum(1 for i in students if i == 0),
                    sum(1 for i in students if i == 1)
                ]
                n = len(sandwiches)
                for i in range(n):
                    cur = sandwiches[i]
                    if types[cur] == 0: # no one eat this sandwich any more
                        return n - i
                    types[cur] -= 1
        
                return 0
        # class Solution:
        #     def countStudents(self, students: List[int], sandwiches: List[int]) -> int:
        #         # studentCount[0 or 1] 分别代表吃 0 和吃 1的学生数量
        #         studentCount = [0, 0]
        #         for type in students:
        #             studentCount[type] += 1
        #         # 遍历三明治栈，若栈顶的三明治无法被取走，则剩下的人都吃不上了
        #         for type in sandwiches:
        #             if studentCount[type] == 0:
        #                 # 两种喜好加起来就是剩下的学生数量
        #                 return studentCount[0] + studentCount[1]
        #             studentCount[type] -= 1
        #         return 0`,
            language: "python"
        },
        {
            id: 1905,
            title: "Count Sub Islands",
            description: `You are given two m x n binary matrices grid1 and grid2 containing only 0's (representing water) and 1's (representing land). An island is a group of 1's connected 4-directionally (horizontal or vertical). Any cells outside of the grid are considered water cells. An island in grid2 is considered a sub-island if there is an island in grid1 that contains all the cells that make up this island in grid2. Return the number of islands in grid2 that are considered sub-islands.   Example 1: Input: grid1 = [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]], grid2 = [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]] Output: 3 Explanation: In the picture above, the grid on the left is grid1 and the grid on the right is grid2. The 1s colored red in grid2 are those considered to be part of a sub-island. There are three sub-islands. Example 2: Input: grid1 = [[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[1,0,1,0,1]], grid2 = [[0,0,0,0,0],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0],[1,0,0,0,1]] Output: 2 Explanation: In the picture above, the grid on the left is grid1 and the grid on the right is grid2. The 1s colored red in grid2 are those considered to be part of a sub-island. There are two sub-islands.   Constraints: m == grid1.length == grid2.length n == grid1[i].length == grid2[i].length 1 <= m, n <= 500 grid1[i][j] and grid2[i][j] are either 0 or 1.
<a href="https://leetcode.com/problems/count-sub-islands/" target="_blank">https://leetcode.com/problems/count-sub-islands/</a>`,
            keywords: ["DFS", "Backtrack", "Islands"],
            code: `        # similar as closed islands, but refines what to flood, flood all non-covered first
        # UF is also okay, check if connected in both or connected just in second
        
        class Solution:
            def countSubIslands(self, grid1: List[List[int]], grid2: List[List[int]]) -> int:
                self.grid = grid2
                self.m = len(grid2)
                self.n = len(grid2[0])
        
                for i in range(self.m):
                    for j in range(self.n):
                        if grid1[i][j] == 0 and grid2[i][j] == 1: # not covered
                            self.dfs(i, j)
                cnt = 0
                for i in range(self.m):
                    for j in range(self.n):
                        if self.grid[i][j] == 1:
                            self.dfs(i, j)
                            cnt += 1
                return cnt     
        
            def dfs(self, i, j):
                if i < 0 or i >= self.m or j < 0 or j >= self.n:
                    return
                if self.grid[i][j] == 0:
                    return
                self.grid[i][j] = 0
        
                for di, dj in ((0, 1), (0, -1), (1, 0), (-1, 0)):
                    self.dfs(i+di, j+dj)
        # class Solution:
        #     def countSubIslands(self, grid1: List[List[int]], grid2: List[List[int]]) -> int:
        #         m, n = len(grid1), len(grid1[0])
        #         for i in range(m):
        #             for j in range(n):
        #                 if grid1[i][j] == 0 and grid2[i][j] == 1:
        #                     # 这个岛屿肯定不是子岛，淹掉
        #                     self.dfs(grid2, i, j)
        #         # 现在 grid2 中剩下的岛屿都是子岛，计算岛屿数量
        #         res = 0
        #         for i in range(m):
        #             for j in range(n):
        #                 if grid2[i][j] == 1:
        #                     res += 1
        #                     self.dfs(grid2, i, j)
        #         return res
        
        #     # 从 (i, j) 开始，将与之相邻的陆地都变成海水
        #     def dfs(self, grid: List[List[int]], i: int, j: int) -> None:
        #         m, n = len(grid), len(grid[0])
        #         if i < 0 or j < 0 or i >= m or j >= n:
        #             return
        #         if grid[i][j] == 0:
        #             return
        
        #         grid[i][j] = 0
        #         self.dfs(grid, i + 1, j)
        #         self.dfs(grid, i, j + 1)
        #         self.dfs(grid, i - 1, j)
        #         self.dfs(grid, i, j - 1)
        
        # M694, same shape (direction matters)
        
        # class Solution:
        #     def numDistinctIslands(self, grid: List[List[int]]) -> int:
        #         m, n = len(grid), len(grid[0])
        #         # 记录所有岛屿的序列化结果
        #         islands = set()
        #         for i in range(m):
        #             for j in range(n):
        #                 if grid[i][j] == 1:
        #                     # 淹掉这个岛屿，同时存储岛屿的序列化结果
        #                     sb = []
        #                     # 初始的方向可以随便写，不影响正确性
        #                     dfs(grid, i, j, sb, 666)
        #                     islands.add(''.join(sb))
        #         # 不相同的岛屿数量
        #         return len(islands)
            
        #     def dfs(grid: List[List[int]], i: int, j: int, sb: StringBuilder, dir: int):
        #         # 获取数组行列数信息
        #         m, n = len(grid), len(grid[0])
        #         # 边界条件，如果越界或者为0，退出
        #         if i < 0 or j < 0 or i >= m or j >= n or grid[i][j] == 0:
        #             return
        #         # 标记当前节点已经被搜索过
        #         grid[i][j] = 0
        #         sb.append(dir).append(',')
                
        #         # 搜索相邻节点
        #         dfs(grid, i - 1, j, sb, 1)
        #         dfs(grid, i + 1, j, sb, 2)
        #         dfs(grid, i, j - 1, sb, 3)
        #         dfs(grid, i, j + 1, sb, 4)
                
        #         # 后序遍历位置：离开 (i, j)
        #         sb.append(-dir).append(',')`,
            language: "python"
        },
        {
            id: 1926,
            title: "Nearest Exit from Entrance in Maze",
            description: `You are given an m x n matrix maze (0-indexed) with empty cells (represented as '.') and walls (represented as '+'). You are also given the entrance of the maze, where entrance = [entrancerow, entrancecol] denotes the row and column of the cell you are initially standing at. In one step, you can move one cell up, down, left, or right. You cannot step into a cell with a wall, and you cannot step outside the maze. Your goal is to find the nearest exit from the entrance. An exit is defined as an empty cell that is at the border of the maze. The entrance does not count as an exit. Return the number of steps in the shortest path from the entrance to the nearest exit, or -1 if no such path exists.   Example 1: Input: maze = [["+","+",".","+"],[".",".",".","+"],["+","+","+","."]], entrance = [1,2] Output: 1 Explanation: There are 3 exits in this maze at [1,0], [0,2], and [2,3]. Initially, you are at the entrance cell [1,2]. - You can reach [1,0] by moving 2 steps left. - You can reach [0,2] by moving 1 step up. It is impossible to reach [2,3] from the entrance. Thus, the nearest exit is [0,2], which is 1 step away. Example 2: Input: maze = [["+","+","+"],[".",".","."],["+","+","+"]], entrance = [1,0] Output: 2 Explanation: There is 1 exit in this maze at [1,2]. [1,0] does not count as an exit since it is the entrance cell. Initially, you are at the entrance cell [1,0]. - You can reach [1,2] by moving 2 steps right. Thus, the nearest exit is [1,2], which is 2 steps away. Example 3: Input: maze = [[".","+"]], entrance = [0,0] Output: -1 Explanation: There are no exits in this maze.   Constraints: maze.length == m maze[i].length == n 1 <= m, n <= 100 maze[i][j] is either '.' or '+'. entrance.length == 2 0 <= entrancerow < m 0 <= entrancecol < n entrance will always be an empty cell.`,
            keywords: ["BFS"],
            code: `        # conditions: wall, border, visited
        
        from collections import deque
        class Solution:
            def nearestExit(self, maze: List[List[str]], entrance: List[int]) -> int:
                q = deque()
                m = len(maze)
                n = len(maze[0])
        
                visited = set()
                entrance = (entrance[0], entrance[1])
        
                q.append(entrance)
                visited.add(entrance)
        
                cnt = 0
                while q:
                    sz = len(q)
                    for _ in range(sz):
                        cur = q.popleft()
                        i, j = cur
                        
                        if i < 0 or i >= m or j < 0 or j>=n:
                            continue
                        if maze[i][j] == '+':
                            continue
                        if cur != entrance:
                            if i == 0 or i == m-1 or j == 0 or j == n-1:
                                print((i, j))
                                return cnt
                        for di, dj in ((0,1), (0,-1), (1,0), (-1,0)):
                            newI = i+di
                            newJ = j+dj
                            if (newI, newJ) in visited:
                                continue
                            visited.add((newI, newJ))
                            q.append((newI, newJ))
                            
                    cnt += 1
                return -1
        
        # from collections import deque
        
        # class Solution:
        #     def nearestExit(self, maze: List[List[str]], entrance: List[int]) -> int:
        #         m = len(maze)
        #         n = len(maze[0])
        #         dirs = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        
        #         # BFS 算法的队列和 visited 数组
        #         queue = deque()
        #         visited = [[False for _ in range(n)] for _ in range(m)]
        #         queue.append(entrance)
        #         visited[entrance[0]][entrance[1]] = True
        #         # 启动 BFS 算法从 entrance 开始像四周扩散
        #         step = 0
        #         while queue:
        #             sz = len(queue)
        #             step += 1
        #             # 扩散当前队列中的所有节点
        #             for i in range(sz):
        #                 cur = queue.popleft()
        #                 # 每个节点都会尝试向上下左右四个方向扩展一步
        #                 for dir in dirs:
        #                     x = cur[0] + dir[0]
        #                     y = cur[1] + dir[1]
        #                     if x < 0 or x >= m or y < 0 or y >= n or visited[x][y] or maze[x][y] == '+':
        #                         continue
        #                     if x == 0 or x == m - 1 or y == 0 or y == n - 1:
        #                         # 走到边界（出口）
        #                         return step
        #                     visited[x][y] = True
        #                     queue.append([x, y])
        #         return -1`,
            language: "python"
        },
        {
            id: 1944,
            title: "Number of Visible People in a Queue",
            description: `There are n people standing in a queue, and they numbered from 0 to n - 1 in left to right order. You are given an array heights of distinct integers where heights[i] represents the height of the ith person. A person can see another person to their right in the queue if everybody in between is shorter than both of them. More formally, the ith person can see the jth person if i < j and min(heights[i], heights[j]) > max(heights[i+1], heights[i+2], ..., heights[j-1]). Return an array answer of length n where answer[i] is the number of people the ith person can see to their right in the queue.   Example 1: Input: heights = [10,6,8,5,11,9] Output: [3,1,2,1,1,0] Explanation: Person 0 can see person 1, 2, and 4. Person 1 can see person 2. Person 2 can see person 3 and 4. Person 3 can see person 4. Person 4 can see person 5. Person 5 can see no one since nobody is to the right of them. Example 2: Input: heights = [5,1,2,3,10] Output: [4,1,1,1,0]   Constraints: n == heights.length 1 <= n <= 105 1 <= heights[i] <= 105 All the values of heights are unique.
<a href="https://leetcode.com/problems/number-of-visible-people-in-a-queue/" target="_blank">https://leetcode.com/problems/number-of-visible-people-in-a-queue/</a>`,
            keywords: ["MonotonicStack"],
            code: `        # Note: not counting index but nums in nge
        
        class Solution:
            # next ge
            def canSeePersonsCount(self, heights: List[int]) -> List[int]:
                nge = []
                n = len(heights)
                res = [0 for i in range(n)]
                for i in range(n-1, -1, -1):
                    cnt = 0
                    while nge and heights[nge[-1]] < heights[i]:
                        cnt += 1
                        nge.pop()
                    # Note: not counting index but nums in nge
                    #num = nge[-1] - i if nge else n -1 - i
                    num = cnt + 1 if nge else cnt
                    res[i] = num
                    nge.append(i)
                return res
        # class Solution:
        #     def canSeePersonsCount(self, heights):
        #         n = len(heights)
        #         res = [0] * n
        #         # int[] 记录 {身高，小于等于该身高的人数} 二元组
        #         stk = []
        #         for i in range(n - 1, -1, -1):
        #             # 记录右侧比自己矮的人
        #             count = 0
        #             # 单调栈模板，计算下一个更大或相等元素（身高）
        #             while stk and heights[i] > stk[-1]:
        #                 stk.pop()
        #                 count += 1
        #             # 不仅可以看到比自己矮的人，如果后面存在更高的的人，也可以看到这个高人
        #             res[i] = count if not stk else count + 1
        #             stk.append(heights[i])
        #         return res`,
            language: "python"
        },
        {
            id: 2073,
            title: "Time Needed to Buy Tickets",
            description: `There are n people in a line queuing to buy tickets, where the 0th person is at the front of the line and the (n - 1)th person is at the back of the line. You are given a 0-indexed integer array tickets of length n where the number of tickets that the ith person would like to buy is tickets[i]. Each person takes exactly 1 second to buy a ticket. A person can only buy 1 ticket at a time and has to go back to the end of the line (which happens instantaneously) in order to buy more tickets. If a person does not have any tickets left to buy, the person will leave the line. Return the time taken for the person initially at position k (0-indexed) to finish buying tickets.   Example 1: Input: tickets = [2,3,2], k = 2 Output: 6 Explanation: The queue starts as [2,3,2], where the kth person is underlined. After the person at the front has bought a ticket, the queue becomes [3,2,1] at 1 second. Continuing this process, the queue becomes [2,1,2] at 2 seconds. Continuing this process, the queue becomes [1,2,1] at 3 seconds. Continuing this process, the queue becomes [2,1] at 4 seconds. Note: the person at the front left the queue. Continuing this process, the queue becomes [1,1] at 5 seconds. Continuing this process, the queue becomes [1] at 6 seconds. The kth person has bought all their tickets, so return 6. Example 2: Input: tickets = [5,1,1,1], k = 0 Output: 8 Explanation: The queue starts as [5,1,1,1], where the kth person is underlined. After the person at the front has bought a ticket, the queue becomes [1,1,1,4] at 1 second. Continuing this process for 3 seconds, the queue becomes [4] at 4 seconds. Continuing this process for 4 seconds, the queue becomes [] at 8 seconds. The kth person has bought all their tickets, so return 8.   Constraints: n == tickets.length 1 <= n <= 100 1 <= tickets[i] <= 100 0 <= k < n
<a href="https://leetcode.com/problems/time-needed-to-buy-tickets/" target="_blank">https://leetcode.com/problems/time-needed-to-buy-tickets/</a>`,
            keywords: ["Queue"],
            code: `        # actually is how many tickets are sold after k finished
        # should consider before k and after k two cases
        
        class Solution:
            def timeRequiredToBuy(self, tickets: List[int], k: int) -> int:
                res = 0
                for i in range(len(tickets)):
                    if i <= k:
                        res += min(tickets[i], tickets[k])
                    else:
                        res += min(tickets[i], tickets[k] - 1)
                return res
        # class Solution:
        #     def timeRequiredToBuy(self, tickets: List[int], k: int) -> int:
        #         res = 0
        #         for i in range(len(tickets)):
        #             if i <= k:
        #                 # 前面的人最多买了 tickets[k] 张票
        #                 res += min(tickets[k], tickets[i])
        #             else:
        #                 # 后面的人最多买了 tickets[k] - 1 张票
        #                 res += min(tickets[k] - 1, tickets[i])
        #         return res`,
            language: "python"
        },
        {
            id: 17200,
            title: "统计目标成绩出现的次数",
            description: `某班级考试成绩按非严格递增顺序记录于整数数组 scores，请返回目标成绩 target 的出现次数。
<a href="https://leetcode.cn/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/description/" target="_blank">https://leetcode.cn/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/description/</a>`,
            keywords: ["BS"],
            code: `        class Solution:
            def countTarget(self, scores: List[int], target: int) -> int:
                left = 0
                right = 0
                while left <= right:
                    mid = left + (right - left) // 2
                    if nums[mid] == target:
                        right = mid - 1
                    elif nums[mid] < target:
                        left = mid + 1
                    elif nums[mid] > target:
                        right = mid - 1
                
                if left < 0 or left > len(nums):
                    return 0
                if nums[left] != target:
                    return 0
                lower = left
        
                left = 0
                right = 0
                while left <= right:
                    mid = left + (right - left) // 2
                    if nums[mid] == target:
                        left = mid + 1
                    elif nums[mid] < target:
                        left = mid + 1
                    elif nums[mid] > target:
                        right = mid - 1
                
                if right < 0 or right > len(nums):
                    return 0
                if nums[right] != target:
                    return 0
                return right - lower + 1
                    `,
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

// Privacy key for loading data (change this to your desired key)
const PRIVACY_KEY = '0701';

// Initialize: Check URL for privacy key
(function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');
    
    if (q === PRIVACY_KEY) {
        // Privacy key matches - use hardcoded data
        algoData.problems = algoData.problems; // Already has hardcoded data
    } else {
        // No valid key - clear problems to protect privacy
        algoData.problems = [];
    }
})();
