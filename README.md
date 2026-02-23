# AlgoReview

A mobile-friendly web application for mapping algorithm problems to keywords and solutions, inspired by vocabulary flashcards.

## Features

- **Keyword → Problems Mapping**: Browse problems by algorithm concepts and techniques
- **Problem Details View**: See problem descriptions, keywords, and solution code
- **Mobile-Optimized**: Responsive design that works well on phones and tablets
- **Local Storage**: Data persists in your browser's localStorage
- **Easy Editing**: Add, edit, and delete problems directly in the interface
- **Code Highlighting**: Syntax highlighting for Python code (extensible to other languages)

## Usage

### Viewing Problems by Keyword
1. The left panel shows all keywords extracted from your problems
2. Click a keyword to see all problems tagged with that concept
3. Click a problem to view its details in the right panel

### Problem Details
Each problem displays:
- Problem ID and title
- Full description
- Associated keywords (clickable to filter)
- Solution code with syntax highlighting

### Adding New Problems
Use the "Add New Entry" form at the bottom:
1. Enter problem ID (e.g., 1425)
2. Provide title and description
3. Add comma-separated keywords (e.g., "DP, Monotonic Queue")
4. Paste your solution code
5. Click "Save Entry"

### Editing/Deleting Problems
1. View a problem's details
2. Click the "Edit" button in the top-right
3. Make changes in the modal or click "Delete" to remove

## Data Structure

Problems are stored as an array of objects with this structure:

```javascript
{
  id: 1425,
  title: "Constrained Subsequence Sum",
  description: "Problem description...",
  keywords: ["Monotonic Queue", "DP"],
  code: "from collections import deque...",
  language: "python"
}
```

Data is automatically saved to `localStorage` and persists between sessions.

## Local Development

### Quick Start
1. Clone the repository:
   ```bash
   git clone https://github.com/deciding/AlgoReview.git
   cd AlgoReview
   ```

2. Open `index.html` in your browser (no build step required)

### File Structure
```
AlgoReview/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Custom styles
├── js/
│   ├── data.js        # Data model and storage
│   └── app.js         # Application logic
└── README.md          # This file
```

## Customization

### Adding Support for More Languages
Edit `js/data.js` to include a `language` field for each problem, then update the code highlighting in `index.html` to include additional language definitions from Highlight.js.

### Changing the Theme
1. Modify colors in `css/style.css` (`:root` variables)
2. Replace Bootstrap CDN with a different theme
3. Adjust card styles and spacing for your preference

### Exporting/Importing Data
The application uses `localStorage`. To export your data:
1. Open browser Developer Tools (F12)
2. Go to Application > Storage > Local Storage
3. Copy the value for key `algoReviewData`

To import data, replace the default data in `js/data.js` or use the browser console to set `localStorage.setItem('algoReviewData', yourJSONString)`.

## Example Problem Entry

Here's the example for LeetCode 1425 that inspired this tool:

**Problem ID**: 1425  
**Title**: Constrained Subsequence Sum  
**Keywords**: Monotonic Queue, DP  
**Description**: Given an integer array nums and an integer k, return the maximum sum of a non-empty subsequence of that array such that for every two consecutive integers in the subsequence, nums[i] and nums[j], where i < j, the condition j - i <= k is satisfied.  
**Code**: See the full solution in `js/data.js`

## Roadmap Ideas

- [ ] Import/export to JSON file
- [ ] Search across all problem fields
- [ ] Tag cloud visualization
- [ ] Difficulty ratings
- [ ] Multiple solution approaches per problem
- [ ] Dark/light mode toggle
- [ ] PWA support for offline use
- [ ] GitHub sync integration

## License

MIT License - feel free to use and modify for your own algorithm review needs.

---

Built with ❤️ for algorithm enthusiasts who think in mappings, not just memorization.