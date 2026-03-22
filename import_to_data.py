#!/usr/bin/env python3
import json
import re
import html
import sys


def decode_html(text):
    text = html.unescape(text)
    return text


def make_links_clickable(text):
    url_pattern = r'(https?://[^\s<>\[\]"\'\)]+)'
    urls = re.findall(url_pattern, text)
    for url in urls:
        if "<a " not in text or url not in text.split("<a ")[0]:
            text = text.replace(url, f'<a href="{url}" target="_blank">{url}</a>')
    return text


def format_code(code):
    if code:
        code = code.replace("`", "\\`")
        lines = code.split("\n")
        formatted = []
        for line in lines:
            formatted.append(f"        {line}")
        return "\n".join(formatted)
    return ""


def format_description(desc):
    desc = decode_html(desc)
    desc = make_links_clickable(desc)
    escaped = desc.replace("`", "\\`")
    return escaped


def format_problem(problem):
    title = decode_html(problem.get("title", ""))
    description = format_description(problem.get("description", ""))
    keywords = problem.get("keywords", [])
    if isinstance(keywords, str):
        keywords = [k.strip() for k in keywords.split(",")]
    code = problem.get("code", "")
    language = problem.get("language", "python")

    return f"""        {{
            id: {problem["id"]},
            title: "{title.replace('"', '\\"')}",
            description: `{description}`,
            keywords: {json.dumps(keywords)},
            code: `{format_code(code)}`,
            language: "{language}"
        }}"""


def main():
    input_file = "algoreview-data.json"
    output_file = "js/data.js"

    with open(input_file, "r", encoding="utf-8") as f:
        problems = json.load(f)

    formatted_problems = []
    for p in problems:
        formatted_problems.append(format_problem(p))

    problems_str = ",\n".join(formatted_problems)

    template = f"""// AlgoReview Data Structure
// This file contains the algorithm problems and their mappings

const algoData = {{
    // Array of problem objects
    problems: [
{problems_str}
    ],
    
    // Get all unique keywords from problems
    getAllKeywords: function() {{
        const keywordSet = new Set();
        this.problems.forEach(problem => {{
            problem.keywords.forEach(keyword => {{
                keywordSet.add(keyword.trim());
            }});
        }});
        return Array.from(keywordSet).sort();
    }},
    
    // Get problems by keyword
    getProblemsByKeyword: function(keyword) {{
        return this.problems.filter(problem => 
            problem.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
        );
    }},
    
    // Get problem by ID
    getProblemById: function(id) {{
        return this.problems.find(problem => problem.id === id);
    }},
    
    // Add a new problem
    addProblem: function(problem) {{
        // Ensure ID is unique
        if (this.getProblemById(problem.id)) {{
            console.warn(`Problem with ID ${{problem.id}} already exists. Updating instead.`);
            this.updateProblem(problem.id, problem);
            return;
        }}
        
        this.problems.push({{
            id: problem.id,
            title: problem.title,
            description: problem.description,
            keywords: problem.keywords.split(',').map(k => k.trim()).filter(k => k),
            code: problem.code,
            language: problem.language || 'python'
        }});
        
        // Sort problems by ID
        this.problems.sort((a, b) => a.id - b.id);
        this.saveToLocalStorage();
    }},
    
    // Update existing problem
    updateProblem: function(id, updatedProblem) {{
        const index = this.problems.findIndex(p => p.id === id);
        if (index !== -1) {{
            this.problems[index] = {{
                ...this.problems[index],
                ...updatedProblem,
                keywords: updatedProblem.keywords.split(',').map(k => k.trim()).filter(k => k),
                id: id // Ensure ID doesn't change
            }};
            this.saveToLocalStorage();
        }}
    }},
    
    // Delete problem
    deleteProblem: function(id) {{
        const index = this.problems.findIndex(p => p.id === id);
        if (index !== -1) {{
            this.problems.splice(index, 1);
            this.saveToLocalStorage();
            return true;
        }}
        return false;
    }},
    
    // Save to localStorage
    saveToLocalStorage: function() {{
        try {{
            localStorage.setItem('algoReviewData', JSON.stringify(this.problems));
        }} catch (e) {{
            console.error('Failed to save to localStorage:', e);
        }}
    }},
    
    // Load from localStorage
    loadFromLocalStorage: function() {{
        try {{
            const saved = localStorage.getItem('algoReviewData');
            if (saved) {{
                this.problems = JSON.parse(saved);
            }}
        }} catch (e) {{
            console.error('Failed to load from localStorage:', e);
        }}
    }}
}};

// Initialize: Load from localStorage on startup
algoData.loadFromLocalStorage();
"""

    with open(output_file, "w", encoding="utf-8") as f:
        f.write(template)

    print(f"Updated {output_file} with {len(problems)} problems")


if __name__ == "__main__":
    main()
