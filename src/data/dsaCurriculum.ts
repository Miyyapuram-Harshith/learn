import { Track, Unit, Topic, Lesson } from '@/types';

export const DSA_TRACK: Track = {
  id: 'dsa-python',
  slug: 'dsa-python',
  title: 'Python DSA Mastery',
  icon: '🐍',
  sort_order: 1,
  status: 'published',
  description: 'Duolingo-style step-by-step micro-learning loop for LeetCode algorithmic mastery with automated GitHub commits.'
};

export const DSA_UNITS: Unit[] = [
  {
    id: 'unit_arrays_hashing',
    track_id: 'dsa-python',
    slug: 'arrays-and-hashing',
    title: '1. Arrays & Hashing',
    theme_color: '#22c55e',
    leetcode_tag_url: 'https://leetcode.com/tag/array/',
    sort_order: 1,
    description: 'Master O(1) hash table lookups, frequency maps, prefix sums, and space-time tradeoffs.',
    total_problems: 9
  },
  {
    id: 'unit_two_pointers',
    track_id: 'dsa-python',
    slug: 'two-pointers',
    title: '2. Two Pointers',
    theme_color: '#38bdf8',
    leetcode_tag_url: 'https://leetcode.com/tag/two-pointers/',
    sort_order: 2,
    description: 'Opposite-end convergence, fast & slow pointers, and partitioned scans in sorted collections.',
    total_problems: 8
  },
  {
    id: 'unit_sliding_window',
    track_id: 'dsa-python',
    slug: 'sliding-window',
    title: '3. Sliding Window',
    theme_color: '#a855f7',
    leetcode_tag_url: 'https://leetcode.com/tag/sliding-window/',
    sort_order: 3,
    description: 'Fixed and dynamic window mechanics for contiguous subarray and substring optimization.',
    total_problems: 7
  },
  {
    id: 'unit_stack',
    track_id: 'dsa-python',
    slug: 'stack-and-monotonic',
    title: '4. Stack & Monotonic Stack',
    theme_color: '#f59e0b',
    leetcode_tag_url: 'https://leetcode.com/tag/stack/',
    sort_order: 4,
    description: 'LIFO execution, matching delimiters, and monotonic stacks for Next Greater Element in O(N).',
    total_problems: 8
  },
  {
    id: 'unit_binary_search',
    track_id: 'dsa-python',
    slug: 'binary-search',
    title: '5. Binary Search',
    theme_color: '#ec4899',
    leetcode_tag_url: 'https://leetcode.com/tag/binary-search/',
    sort_order: 5,
    description: 'Search space pruning in O(log N), monotonic predicate functions, and rotated array pivot mechanics.',
    total_problems: 7
  },
  {
    id: 'unit_linked_list',
    track_id: 'dsa-python',
    slug: 'linked-lists',
    title: '6. Linked Lists',
    theme_color: '#06b6d4',
    leetcode_tag_url: 'https://leetcode.com/tag/linked-list/',
    sort_order: 6,
    description: "Pointer rewiring, dummy heads, Floyd's cycle detection, and list reversals in O(1) space.",
    total_problems: 6
  },
  {
    id: 'unit_trees',
    track_id: 'dsa-python',
    slug: 'trees-and-bst',
    title: '7. Trees & BST',
    theme_color: '#10b981',
    leetcode_tag_url: 'https://leetcode.com/tag/tree/',
    sort_order: 7,
    description: 'Recursive DFS traversals, level-order BFS, BST invariant properties, and path sum evaluations.',
    total_problems: 10
  },
  {
    id: 'unit_heaps',
    track_id: 'dsa-python',
    slug: 'heaps-priority-queues',
    title: '8. Heaps & Priority Queues',
    theme_color: '#f97316',
    leetcode_tag_url: 'https://leetcode.com/tag/heap-priority-queue/',
    sort_order: 8,
    description: 'Min-heaps, max-heaps, Top-K frequent elements, and streaming two-heap median finders.',
    total_problems: 6
  },
  {
    id: 'unit_graphs',
    track_id: 'dsa-python',
    slug: 'backtracking-and-graphs',
    title: '9. Backtracking & Graphs',
    theme_color: '#6366f1',
    leetcode_tag_url: 'https://leetcode.com/tag/graph/',
    sort_order: 9,
    description: 'State-space exploration, pruning branches, connected components, BFS shortest path, and topological sort.',
    total_problems: 9
  },
  {
    id: 'unit_dp',
    track_id: 'dsa-python',
    slug: 'dynamic-programming',
    title: '10. Dynamic Programming',
    theme_color: '#e11d48',
    leetcode_tag_url: 'https://leetcode.com/tag/dynamic-programming/',
    sort_order: 10,
    description: 'Overlapping subproblems, state recurrence relations, memoization vs bottom-up tabulation.',
    total_problems: 11
  },
  {
    id: 'unit_bit_math',
    track_id: 'dsa-python',
    slug: 'bit-manipulation-math',
    title: '11. Bit Manipulation & Math',
    theme_color: '#14b8a6',
    leetcode_tag_url: 'https://leetcode.com/tag/bit-manipulation/',
    sort_order: 11,
    description: 'Bitwise XOR tricks, bit masks, power of two validation, and Euclidean GCD algorithms.',
    total_problems: 5
  }
];

export const DSA_TOPICS: Topic[] = [
  {
    id: 'topic_hash_map',
    unit_id: 'unit_arrays_hashing',
    slug: 'hash-map-patterns',
    title: 'Hash Map Lookup & Complement Storage',
    sort_order: 1,
    leetcode_pattern_links: [
      {
        step_order: 1,
        title: 'Two Sum',
        difficulty: 'Easy',
        target_complexity: 'O(N) Time · O(N) Space',
        leetcode_url: 'https://leetcode.com/problems/two-sum/',
        problem_slug: 'two-sum'
      },
      {
        step_order: 2,
        title: 'Contains Duplicate',
        difficulty: 'Easy',
        target_complexity: 'O(N) Time · O(N) Space',
        leetcode_url: 'https://leetcode.com/problems/contains-duplicate/',
        problem_slug: 'contains-duplicate'
      },
      {
        step_order: 3,
        title: 'Valid Anagram',
        difficulty: 'Easy',
        target_complexity: 'O(N) Time · O(1) Space',
        leetcode_url: 'https://leetcode.com/problems/valid-anagram/',
        problem_slug: 'valid-anagram'
      },
      {
        step_order: 4,
        title: 'Group Anagrams',
        difficulty: 'Medium',
        target_complexity: 'O(N * K) Time · O(N * K) Space',
        leetcode_url: 'https://leetcode.com/problems/group-anagrams/',
        problem_slug: 'group-anagrams'
      }
    ]
  },
  {
    id: 'topic_two_pointers',
    unit_id: 'unit_two_pointers',
    slug: 'opposite-direction-pointers',
    title: 'Opposite-Direction Pointers',
    sort_order: 1,
    leetcode_pattern_links: [
      {
        step_order: 1,
        title: 'Valid Palindrome',
        difficulty: 'Easy',
        target_complexity: 'O(N) Time · O(1) Space',
        leetcode_url: 'https://leetcode.com/problems/valid-palindrome/',
        problem_slug: 'valid-palindrome'
      },
      {
        step_order: 2,
        title: 'Two Sum II - Input Array Is Sorted',
        difficulty: 'Medium',
        target_complexity: 'O(N) Time · O(1) Space',
        leetcode_url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
        problem_slug: 'two-sum-ii'
      },
      {
        step_order: 3,
        title: '3Sum',
        difficulty: 'Medium',
        target_complexity: 'O(N²) Time · O(1) Space',
        leetcode_url: 'https://leetcode.com/problems/3sum/',
        problem_slug: '3sum'
      },
      {
        step_order: 4,
        title: 'Container With Most Water',
        difficulty: 'Medium',
        target_complexity: 'O(N) Time · O(1) Space',
        leetcode_url: 'https://leetcode.com/problems/container-with-most-water/',
        problem_slug: 'container-with-most-water'
      }
    ]
  },
  {
    id: 'topic_sliding_window',
    unit_id: 'unit_sliding_window',
    slug: 'dynamic-sliding-window',
    title: 'Dynamic-Size Sliding Window',
    sort_order: 1,
    leetcode_pattern_links: [
      {
        step_order: 1,
        title: 'Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        target_complexity: 'O(N) Time · O(1) Space',
        leetcode_url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
        problem_slug: 'best-time-to-buy-and-sell-stock'
      },
      {
        step_order: 2,
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        target_complexity: 'O(N) Time · O(min(M, N)) Space',
        leetcode_url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
        problem_slug: 'longest-substring-without-repeating-characters'
      }
    ]
  }
];

export const MASTER_LESSONS: Lesson[] = [
  {
    id: 'lesson_two_sum',
    topic_id: 'topic_hash_map',
    unit_slug: 'arrays-and-hashing',
    slug: 'two-sum',
    title: 'Two Sum',
    kind: 'dsa_problem',
    difficulty: 'Easy',
    leetcode_problem_number: 1,
    leetcode_url: 'https://leetcode.com/problems/two-sum/',
    time_complexity: 'O(N)',
    space_complexity: 'O(N)',
    description: 'Find two indices in an integer array that sum to a target value using a one-pass hash map complement technique.',
    steps: [
      {
        id: 'step_two_sum_1',
        lesson_id: 'lesson_two_sum',
        step_order: 1,
        step_type: 'INTUITION',
        title: 'Step 1 — Intuition & The Complement Principle',
        content_md: `To find two numbers $x$ and $y$ that add up to $target$, we can reframe the equation:
$$y = target - x$$
Here, $y$ is called the **complement**. Instead of searching for all pairs with nested loops (which costs $O(N^2)$ time), we can remember each number we've seen in a hash map: \`seen = {value: index}\`.

When we inspect $x$ at index $i$, we ask: **"Is $(target - x)$ already in our hash map?"**
- If **YES**: We immediately return \`[seen[target - x], i]\`!
- If **NO**: We store \`seen[x] = i\` and advance to the next element.`,
        payload: {
          question: 'If target = 9 and the current number is nums[i] = 2, what exact key must we search in the hash map?',
          options: [
            'nums[i] (which is 2)',
            'target - nums[i] (which is 7)',
            'target + nums[i] (which is 11)',
            'len(nums) (which is 4)'
          ],
          correctIndex: 1,
          explanation: 'Target is 9. For current number 2, its required complement is 9 - 2 = 7.'
        },
        hints: [
          'Rearrange the equation: num1 + num2 = target implies num2 = target - num1.',
          'The complement for 2 to reach 9 is 7.'
        ],
        xp_reward: 10
      },
      {
        id: 'step_two_sum_2',
        lesson_id: 'lesson_two_sum',
        step_order: 2,
        step_type: 'DRY_RUN',
        title: 'Step 2 — Step-by-Step Dry Run',
        content_md: `Let's trace: \`nums = [2, 7, 11, 15]\`, \`target = 9\`.
- **Iteration 0**: \`i = 0, num = 2\`.
  - \`complement = 9 - 2 = 7\`.
  - Is \`7\` in \`seen\`? Seen is empty \`{}\`.
  - Action: \`seen[2] = 0\`.
- **Iteration 1**: \`i = 1, num = 7\`.
  - \`complement = 9 - 7 = 2\`.
  - Is \`2\` in \`seen\`? YES! \`seen[2]\` is \`0\`.
  - Found match! Return \`[seen[2], 1]\` $\\rightarrow$ \`[0, 1]\`.`,
        payload: {
          question: 'In the above dry run, how many total iterations were executed before returning the answer?',
          options: [
            '1 iteration',
            '2 iterations',
            '4 iterations',
            '16 iterations'
          ],
          correctIndex: 1,
          explanation: 'It only took 2 iterations (i=0 and i=1) to find the complement and return [0, 1]!'
        },
        hints: [
          'Look at iteration 1 when num is 7.',
          'Complement 2 was already stored in iteration 0.'
        ],
        xp_reward: 10
      },
      {
        id: 'step_two_sum_3',
        lesson_id: 'lesson_two_sum',
        step_order: 3,
        step_type: 'SPOT_BUG',
        title: 'Step 3 — Spot the Bug',
        content_md: `A junior engineer wrote this solution for Two Sum. Can you spot the bug?

\`\`\`python
def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        seen[num] = i  # Storing before checking!
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
\`\`\`

What happens when \`nums = [3, 2, 4]\` and \`target = 6\`?`,
        payload: {
          question: 'Why will this buggy code fail on nums = [3, 2, 4], target = 6?',
          options: [
            'It throws a KeyError because seen is not a dictionary.',
            'It will match number 3 with itself and erroneously return [0, 0] because 6 - 3 = 3!',
            'It will enter an infinite loop because the index never updates.',
            'It returns None because 4 + 2 is never checked.'
          ],
          correctIndex: 1,
          explanation: 'Because seen[num] = i happened BEFORE checking complement in seen, when num = 3, complement is 3, which matches itself at seen[3] = 0!'
        },
        hints: [
          'If you store the current element first, what does complement = target - num equal if num * 2 == target?',
          'You cannot use the same element twice!'
        ],
        xp_reward: 15
      },
      {
        id: 'step_two_sum_4',
        lesson_id: 'lesson_two_sum',
        step_order: 4,
        step_type: 'FILL_BLANK',
        title: 'Step 4 — Complete the One-Liner',
        content_md: `Fill in the missing lookup check to make the function optimal:

\`\`\`python
def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if __________:
            return [seen[complement], i]
        seen[num] = i
\`\`\``,
        payload: {
          codePrefix: 'def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if ',
          codeSuffix: ':\n            return [seen[complement], i]\n        seen[num] = i',
          expected: 'complement in seen',
          placeholder: 'complement in seen'
        },
        hints: [
          'We want to check if the complement exists as a key in the hash map seen.',
          'In Python: `item in dict` is O(1) average lookup.'
        ],
        xp_reward: 15
      },
      {
        id: 'step_two_sum_5',
        lesson_id: 'lesson_two_sum',
        step_order: 5,
        step_type: 'FULL_CODE',
        title: 'Step 5 — Full Code Implementation & Live Verification',
        content_md: `Implement the full solution. Your code will be executed against test cases in the live Python runner!`,
        starter_code: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test cases
print("Test 1:", twoSum([2, 7, 11, 15], 9)) # Expected: [0, 1]
print("Test 2:", twoSum([3, 2, 4], 6))       # Expected: [1, 2]
print("Test 3:", twoSum([3, 3], 6))          # Expected: [0, 1]
`,
        solution_code: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
`,
        payload: {
          testCases: [
            { input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
            { input: 'nums = [3, 2, 4], target = 6', expected: '[1, 2]' },
            { input: 'nums = [3, 3], target = 6', expected: '[0, 1]' }
          ]
        },
        hints: [
          'Iterate through nums using enumerate to get index and value.',
          'Calculate complement = target - num.',
          'Check if complement is in seen.'
        ],
        xp_reward: 25
      }
    ]
  },
  {
    id: 'lesson_valid_palindrome',
    topic_id: 'topic_two_pointers',
    unit_slug: 'two-pointers',
    slug: 'valid-palindrome',
    title: 'Valid Palindrome',
    kind: 'dsa_problem',
    difficulty: 'Easy',
    leetcode_problem_number: 125,
    leetcode_url: 'https://leetcode.com/problems/valid-palindrome/',
    time_complexity: 'O(N)',
    space_complexity: 'O(1)',
    description: 'Determine if a string is a palindrome after converting all uppercase letters to lowercase and removing all non-alphanumeric characters.',
    steps: [
      {
        id: 'step_valid_palindrome_1',
        lesson_id: 'lesson_valid_palindrome',
        step_order: 1,
        step_type: 'INTUITION',
        title: 'Step 1 — Two-Pointer Convergence',
        content_md: `A palindrome reads the same forwards and backwards. With two pointers \`left = 0\` and \`right = len(s) - 1\`:
1. Skip non-alphanumeric characters with \`left += 1\` or \`right -= 1\` using \`.isalnum()\`.
2. Compare \`s[left].lower()\` with \`s[right].lower()\`.
3. If they don't match, return \`False\`.
4. If pointers cross without mismatch, return \`True\`!

**Space Complexity**: $O(1)$ extra space because we don't build a new filtered string!`,
        payload: {
          question: 'What is the optimal auxiliary space complexity of checking a palindrome with in-place two pointers?',
          options: [
            'O(N) space',
            'O(1) space',
            'O(log N) space',
            'O(N²) space'
          ],
          correctIndex: 1,
          explanation: 'Two integer pointers left and right only consume O(1) auxiliary space without allocating a copy of the string.'
        },
        hints: ['Pointers only take a couple of integer variables.'],
        xp_reward: 10
      },
      {
        id: 'step_valid_palindrome_2',
        lesson_id: 'lesson_valid_palindrome',
        step_order: 2,
        step_type: 'FULL_CODE',
        title: 'Step 2 — Full Code Implementation',
        content_md: 'Implement `isPalindrome` in $O(N)$ time and $O(1)$ space using two pointers.',
        starter_code: `def isPalindrome(s: str) -> bool:
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum():
            l += 1
        while l < r and not s[r].isalnum():
            r -= 1
        if s[l].lower() != s[r].lower():
            return False
        l += 1
        r -= 1
    return True

# Test cases
print("Test 1:", isPalindrome("A man, a plan, a canal: Panama")) # Expected: True
print("Test 2:", isPalindrome("race a car"))                     # Expected: False
print("Test 3:", isPalindrome(" "))                              # Expected: True
`,
        solution_code: `def isPalindrome(s: str) -> bool:
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum():
            l += 1
        while l < r and not s[r].isalnum():
            r -= 1
        if s[l].lower() != s[r].lower():
            return False
        l += 1
        r -= 1
    return True
`,
        payload: {
          testCases: [
            { input: '"A man, a plan, a canal: Panama"', expected: 'True' },
            { input: '"race a car"', expected: 'False' },
            { input: '" "', expected: 'True' }
          ]
        },
        hints: [
          'Use .isalnum() to skip punctuation and spaces.',
          'Always check l < r inside the inner while loops to prevent index out of bounds.'
        ],
        xp_reward: 25
      }
    ]
  }
];
