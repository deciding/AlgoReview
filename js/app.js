// AlgoReview Main Application

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Highlight.js
    hljs.highlightAll();
    
    // DOM Elements
    const keywordList = document.getElementById('keywordList');
    const keywordSearch = document.getElementById('keywordSearch');
    const random10Btn = document.getElementById('random10Btn');
    const problemDetail = document.getElementById('problemDetail');
    const problemDetailPlaceholder = document.getElementById('problemDetailPlaceholder');
    const problemTitle = document.getElementById('problemTitle');
    const problemId = document.getElementById('problemId');
    const problemDescription = document.getElementById('problemDescription');
    const problemKeywords = document.getElementById('problemKeywords');
    const problemCode = document.getElementById('problemCode');
    const editProblemBtn = document.getElementById('editProblemBtn');
    const addForm = document.getElementById('addForm');
    const clearFormBtn = document.getElementById('clearFormBtn');
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    const editForm = document.getElementById('editForm');
    const saveEditBtn = document.getElementById('saveEditBtn');
    const deleteProblemBtn = document.getElementById('deleteProblemBtn');
    
    // State
    let currentProblemId = null;
    let allProblems = [];
    let isRandomMode = false;
    
    // Initialize
    init();
    
    function init() {
        loadProblems();
        setupEventListeners();
    }
    
    function loadProblems() {
        allProblems = algoData.problems;
        renderProblemList(allProblems);
    }
    
    function renderProblemList(problems, title = 'All Problems') {
        keywordList.innerHTML = '';
        
        if (isRandomMode) {
            keywordList.innerHTML = `
                <div class="d-flex align-items-center mb-3">
                    <button class="btn btn-outline-secondary btn-sm me-2" id="backToAllBtn">
                        <i class="bi bi-arrow-left"></i> Back
                    </button>
                    <h5 class="mb-0">Random 10 Questions</h5>
                </div>
            `;
            const backBtn = document.getElementById('backToAllBtn');
            backBtn.addEventListener('click', function(e) {
                e.preventDefault();
                isRandomMode = false;
                renderProblemList(allProblems);
            });
        } else if (problems !== allProblems) {
            keywordList.innerHTML = `
                <div class="d-flex align-items-center mb-3">
                    <button class="btn btn-outline-secondary btn-sm me-2" id="backToAllBtn">
                        <i class="bi bi-arrow-left"></i> Back
                    </button>
                    <h5 class="mb-0">Search Results: <span class="badge bg-primary">${escapeHtml(keywordSearch.value)}</span></h5>
                </div>
            `;
            const backBtn = document.getElementById('backToAllBtn');
            backBtn.addEventListener('click', function(e) {
                e.preventDefault();
                keywordSearch.value = '';
                renderProblemList(allProblems);
            });
        }
        
        if (problems.length === 0) {
            keywordList.innerHTML += `
                <div class="text-center py-4 text-muted">
                    <i class="bi bi-search display-6"></i>
                    <p class="mt-2">No problems found</p>
                </div>
            `;
            return;
        }
        
        problems.forEach(problem => {
            const item = document.createElement('a');
            item.href = '#';
            item.className = 'list-group-item list-group-item-action';
            item.innerHTML = `
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h6 class="mb-1">${problem.id}. ${escapeHtml(problem.title)}</h6>
                        <p class="mb-1 text-muted small">${escapeHtml(problem.description.substring(0, 100))}...</p>
                    </div>
                    <i class="bi bi-chevron-right text-muted"></i>
                </div>
            `;
            
            item.addEventListener('click', function(e) {
                e.preventDefault();
                showProblemDetail(problem.id);
            });
            
            keywordList.appendChild(item);
        });
    }
    
    function showProblemDetail(problemId) {
        const problem = algoData.getProblemById(problemId);
        if (!problem) return;
        
        currentProblemId = problemId;
        
        // Update UI
        problemTitle.textContent = `${problem.id}. ${problem.title}`;
        problemId.textContent = `LeetCode #${problem.id}`;
        problemDescription.innerHTML = problem.description;
        
        // Render keywords
        problemKeywords.innerHTML = '';
        problem.keywords.forEach(keyword => {
            const tag = document.createElement('span');
            tag.className = 'keyword-tag';
            tag.textContent = keyword;
            tag.addEventListener('click', function() {
                keywordSearch.value = keyword;
                searchProblems();
            });
            problemKeywords.appendChild(tag);
        });
        
        // Render code
        problemCode.textContent = problem.code;
        
        // Show detail, hide placeholder
        problemDetail.classList.remove('d-none');
        problemDetailPlaceholder.classList.add('d-none');
        
        // Update code highlighting
        hljs.highlightElement(problemCode);
        
        // Scroll to detail if on mobile
        if (window.innerWidth < 768) {
            problemDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    function showProblemDetailPlaceholder() {
        problemDetail.classList.add('d-none');
        problemDetailPlaceholder.classList.remove('d-none');
        currentProblemId = null;
    }
    
    function searchProblems() {
        const searchTerm = keywordSearch.value.toLowerCase().trim();
        if (!searchTerm) {
            isRandomMode = false;
            renderProblemList(allProblems);
            return;
        }
        
        isRandomMode = false;
        const filtered = allProblems.filter(problem => 
            problem.title.toLowerCase().includes(searchTerm) ||
            problem.description.toLowerCase().includes(searchTerm)
        );
        renderProblemList(filtered);
    }
    
    function showRandom10() {
        isRandomMode = true;
        const shuffled = [...allProblems].sort(() => Math.random() - 0.5);
        const random10 = shuffled.slice(0, Math.min(10, allProblems.length));
        renderProblemList(random10);
    }
    
    // Fetch problem data from LeetCode
    async function fetchProblemFromLeetCode(problemId) {
        if (!problemId || problemId < 1) {
            showToast('Please enter a valid problem ID', 'warning');
            return;
        }
        
        const fetchBtn = document.getElementById('fetchFromLeetCodeBtn');
        const originalText = fetchBtn.innerHTML;
        
        try {
            fetchBtn.disabled = true;
            fetchBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Fetching...';
            
            const problemData = await LeetCodeFetcher.getProblemById(problemId);
            
            if (!problemData) {
                showToast(`Could not find problem #${problemId} on LeetCode. Please enter details manually.`, 'warning');
                return;
            }
            
            document.getElementById('problemTitleInput').value = problemData.title;
            document.getElementById('problemDescriptionInput').value = problemData.description;
            
            if (problemData.tags && problemData.tags.length > 0) {
                const keywords = problemData.tags.join(', ');
                document.getElementById('keywordsInput').value = keywords;
            }
            
            if (!document.getElementById('codeInput').value.trim()) {
                document.getElementById('codeInput').value = `# Solution for LeetCode ${problemId}: ${problemData.title}\n# Add your solution code here\n\nclass Solution:\n    def solve(self):\n        pass`;
            }
            
            showToast(`Fetched "${problemData.title}" from LeetCode!`, 'success');
            document.getElementById('problemDescriptionInput').focus();
            
        } catch (error) {
            console.error('Failed to fetch from LeetCode:', error);
            showToast(`Failed to fetch problem #${problemId}. Please enter details manually.`, 'danger');
        } finally {
            fetchBtn.disabled = false;
            fetchBtn.innerHTML = originalText;
        }
    }
    
    function setupEventListeners() {
        // Fetch from LeetCode button
        document.getElementById('fetchFromLeetCodeBtn').addEventListener('click', function() {
            const problemId = parseInt(document.getElementById('problemIdInput').value);
            fetchProblemFromLeetCode(problemId);
        });
        
        // Search input
        keywordSearch.addEventListener('input', searchProblems);
        
        // Random 10 button
        random10Btn.addEventListener('click', showRandom10);
        
        // Edit problem button
        editProblemBtn.addEventListener('click', function() {
            if (!currentProblemId) return;
            
            const problem = algoData.getProblemById(currentProblemId);
            if (!problem) return;
            
            document.getElementById('editProblemId').value = problem.id;
            document.getElementById('editTitle').value = problem.title;
            document.getElementById('editDescription').value = problem.description;
            document.getElementById('editKeywords').value = problem.keywords.join(', ');
            document.getElementById('editCode').value = problem.code;
            
            editModal.show();
        });
        
        // Save edit
        saveEditBtn.addEventListener('click', function() {
            const id = parseInt(document.getElementById('editProblemId').value);
            const updatedProblem = {
                title: document.getElementById('editTitle').value,
                description: document.getElementById('editDescription').value,
                keywords: document.getElementById('editKeywords').value,
                code: document.getElementById('editCode').value
            };
            
            algoData.updateProblem(id, updatedProblem);
            editModal.hide();
            loadProblems();
            showProblemDetail(id);
            showToast('Problem updated successfully!', 'success');
        });
        
        // Delete problem
        deleteProblemBtn.addEventListener('click', function() {
            if (!confirm('Are you sure you want to delete this problem?')) return;
            
            const id = parseInt(document.getElementById('editProblemId').value);
            const deleted = algoData.deleteProblem(id);
            
            if (deleted) {
                editModal.hide();
                loadProblems();
                showProblemDetailPlaceholder();
                showToast('Problem deleted successfully!', 'success');
            }
        });
        
        // Add form submission
        addForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const problem = {
                id: parseInt(document.getElementById('problemIdInput').value),
                title: document.getElementById('problemTitleInput').value,
                description: document.getElementById('problemDescriptionInput').value,
                keywords: document.getElementById('keywordsInput').value,
                code: document.getElementById('codeInput').value
            };
            
            algoData.addProblem(problem);
            loadProblems();
            
            addForm.reset();
            
            showToast('Problem added successfully!', 'success');
            
            setTimeout(() => {
                showProblemDetail(problem.id);
            }, 500);
        });
        
        // Clear form
        clearFormBtn.addEventListener('click', function() {
            addForm.reset();
        });
    }
    
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : 'info'} border-0`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi bi-check-circle me-2"></i> ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        
        const container = document.createElement('div');
        container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        container.appendChild(toast);
        document.body.appendChild(container);
        
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        toast.addEventListener('hidden.bs.toast', function() {
            container.remove();
        });
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Initial highlight
    hljs.highlightAll();
});
