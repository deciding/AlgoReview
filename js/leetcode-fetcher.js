// LeetCode Data Fetcher for AlgoReview
// This module fetches problem data from LeetCode GraphQL API

const LeetCodeFetcher = {
    // Cache for already fetched problems (prevents duplicate requests)
    cache: new Map(),
    
    // CORS proxy endpoints (can be extended)
    proxies: [
        'https://cors-anywhere.herokuapp.com/',
        'https://api.allorigins.win/raw?url=',
        '' // No proxy (direct)
    ],
    
    // GraphQL endpoint
    graphqlEndpoint: 'https://leetcode.com/graphql',
    
    // Get titleSlug by problem ID (requires mapping)
    async getTitleSlugById(problemId) {
        // First check cache
        if (this.cache.has(`slug-${problemId}`)) {
            return this.cache.get(`slug-${problemId}`);
        }
        
        // Try to fetch from GraphQL API
        const query = `
            query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
                problemsetQuestionList: questionList(
                    categorySlug: $categorySlug
                    limit: $limit
                    skip: $skip
                    filters: $filters
                ) {
                    total: totalNum
                    questions: data {
                        questionId
                        title
                        titleSlug
                    }
                }
            }
        `;
        
        const variables = {
            categorySlug: "",
            skip: 0,
            limit: 1,
            filters: {
                difficulty: "",
                status: "",
                searchKeywords: problemId.toString()
            }
        };
        
        try {
            const response = await this.makeGraphQLRequest(query, variables);
            if (response.data && response.data.problemsetQuestionList && 
                response.data.problemsetQuestionList.questions.length > 0) {
                
                const question = response.data.problemsetQuestionList.questions[0];
                this.cache.set(`slug-${problemId}`, question.titleSlug);
                return question.titleSlug;
            }
        } catch (error) {
            console.warn('Failed to fetch title slug by ID:', error);
        }
        
        // Fallback: try to guess from known patterns or use local mapping
        return this.guessTitleSlug(problemId);
    },
    
    // Get problem data by title slug
    async getProblemBySlug(titleSlug) {
        // Check cache first
        if (this.cache.has(titleSlug)) {
            return this.cache.get(titleSlug);
        }
        
        const query = `
            query questionData($titleSlug: String!) {
                question(titleSlug: $titleSlug) {
                    questionId
                    title
                    difficulty
                    content
                    topicTags {
                        name
                        slug
                    }
                }
            }
        `;
        
        const variables = { titleSlug };
        
        try {
            const response = await this.makeGraphQLRequest(query, variables);
            if (response.data && response.data.question) {
                const question = response.data.question;
                
                // Process content to remove HTML tags for plain text display
                const plainContent = this.stripHtmlTags(question.content);
                
                const result = {
                    id: parseInt(question.questionId),
                    title: question.title,
                    difficulty: question.difficulty,
                    description: plainContent,
                    fullDescription: question.content, // Keep HTML for potential future use
                    tags: question.topicTags.map(tag => tag.name),
                    url: `https://leetcode.com/problems/${titleSlug}/`
                };
                
                // Cache the result
                this.cache.set(titleSlug, result);
                this.cache.set(`slug-${result.id}`, titleSlug);
                
                return result;
            }
        } catch (error) {
            console.error('Failed to fetch problem data:', error);
            throw error;
        }
        
        return null;
    },
    
    // Get problem data by ID
    async getProblemById(problemId) {
        try {
            const titleSlug = await this.getTitleSlugById(problemId);
            if (titleSlug) {
                return await this.getProblemBySlug(titleSlug);
            }
        } catch (error) {
            console.error('Failed to fetch problem by ID:', error);
        }
        
        return null;
    },
    
    // Helper method to make GraphQL request with retry and proxy fallback
    async makeGraphQLRequest(query, variables, proxyIndex = 0) {
        if (proxyIndex >= this.proxies.length) {
            throw new Error('All proxy attempts failed');
        }
        
        const proxy = this.proxies[proxyIndex];
        const url = proxy + this.graphqlEndpoint;
        
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        
        // Add CORS headers if using proxy
        if (proxy) {
            headers['x-requested-with'] = 'XMLHttpRequest';
        }
        
        const body = JSON.stringify({ query, variables });
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body,
                mode: 'cors'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Check for GraphQL errors
            if (data.errors && data.errors.length > 0) {
                console.warn('GraphQL errors:', data.errors);
            }
            
            return data;
            
        } catch (error) {
            console.warn(`Proxy ${proxyIndex} failed:`, error.message);
            
            // Try next proxy
            return await this.makeGraphQLRequest(query, variables, proxyIndex + 1);
        }
    },
    
    // Strip HTML tags to get plain text
    stripHtmlTags(html) {
        if (!html) return '';
        
        // Create a temporary DOM element
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // Get text content
        let text = tempDiv.textContent || tempDiv.innerText || '';
        
        // Clean up extra whitespace
        text = text.replace(/\s+/g, ' ').trim();
        
        // Remove code block markers and other artifacts
        text = text.replace(/Example \d+:/g, '\nExample:');
        text = text.replace(/Constraints:/g, '\nConstraints:');
        
        return text;
    },
    
    // Guess title slug from problem ID (fallback)
    guessTitleSlug(problemId) {
        // A small mapping of known problems
        const knownProblems = {
            1: 'two-sum',
            2: 'add-two-numbers', 
            3: 'longest-substring-without-repeating-characters',
            4: 'median-of-two-sorted-arrays',
            5: 'longest-palindromic-substring',
            20: 'valid-parentheses',
            21: 'merge-two-sorted-lists',
            53: 'maximum-subarray',
            70: 'climbing-stairs',
            121: 'best-time-to-buy-and-sell-stock',
            206: 'reverse-linked-list',
            215: 'kth-largest-element-in-an-array',
            322: 'coin-change',
            416: 'partition-equal-subset-sum',
            560: 'subarray-sum-equals-k',
            572: 'subtree-of-another-tree',
            739: 'daily-temperatures',
            763: 'partition-labels',
            973: 'k-closest-points-to-origin',
            1425: 'constrained-subsequence-sum',
            1499: 'max-value-of-equation',
            862: 'shortest-subarray-with-sum-at-least-k'
        };
        
        return knownProblems[problemId] || `problem-${problemId}`;
    },
    
    // Pre-populate cache with some known problems
    preloadCache() {
        const preloaded = [
            {
                id: 1,
                title: 'Two Sum',
                difficulty: 'Easy',
                description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
                url: 'https://leetcode.com/problems/two-sum/'
            },
            {
                id: 1425,
                title: 'Constrained Subsequence Sum',
                difficulty: 'Hard',
                description: 'Given an integer array nums and an integer k, return the maximum sum of a non-empty subsequence of that array such that for every two consecutive integers in the subsequence, nums[i] and nums[j], where i < j, the condition j - i <= k is satisfied.',
                url: 'https://leetcode.com/problems/constrained-subsequence-sum/'
            },
            {
                id: 862,
                title: 'Shortest Subarray with Sum at Least K',
                difficulty: 'Hard',
                description: 'Given an integer array nums and an integer k, return the length of the shortest non-empty subarray of nums with a sum of at least k. If there is no such subarray, return -1.',
                url: 'https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/'
            }
        ];
        
        preloaded.forEach(problem => {
            this.cache.set(`slug-${problem.id}`, this.guessTitleSlug(problem.id));
            this.cache.set(this.guessTitleSlug(problem.id), problem);
        });
    },
    
    // Initialize
    init() {
        this.preloadCache();
        console.log('LeetCode Fetcher initialized');
    }
};

// Initialize on load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        LeetCodeFetcher.init();
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LeetCodeFetcher;
} else {
    window.LeetCodeFetcher = LeetCodeFetcher;
}