// AlgoReview Data Structure
// This file contains the algorithm problems and their mappings

const algoData = {
    // Array of problem objects
    problems: [],
    
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