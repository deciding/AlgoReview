#!/usr/bin/env python3
import sys
import requests
import re
import json


def get_title_slug(problem_id):
    query = """
    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
        problemsetQuestionList: questionList(
            categorySlug: $categorySlug
            limit: $limit
            skip: $skip
            filters: $filters
        ) {
            questions: data {
                titleSlug
            }
        }
    }
    """
    variables = {
        "categorySlug": "",
        "skip": 0,
        "limit": 1,
        "filters": {"searchKeywords": str(problem_id)},
    }
    response = requests.post(
        "https://leetcode.com/graphql",
        json={"query": query, "variables": variables},
        headers={"Content-Type": "application/json"},
    )
    data = response.json()
    questions = (
        data.get("data", {}).get("problemsetQuestionList", {}).get("questions", [])
    )
    if questions:
        return questions[0]["titleSlug"]
    return None


def get_problem(title_slug):
    query = """
    query questionData($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
            questionId
            title
            difficulty
            content
            topicTags { name }
        }
    }
    """
    variables = {"titleSlug": title_slug}
    response = requests.post(
        "https://leetcode.com/graphql",
        json={"query": query, "variables": variables},
        headers={"Content-Type": "application/json"},
    )
    return response.json()


def strip_html(html):
    if not html:
        return ""
    desc = re.sub(r"<[^>]+>", "", html)
    return " ".join(desc.split())


def main():
    if len(sys.argv) < 2:
        print("Usage: python fetch_leetcode.py <problem_id>")
        sys.exit(1)

    problem_id = sys.argv[1]

    print(f"Fetching problem #{problem_id}...")

    title_slug = get_title_slug(problem_id)
    if not title_slug:
        print(f"Could not find problem #{problem_id}")
        sys.exit(1)

    data = get_problem(title_slug)
    q = data["data"]["question"]

    result = {
        "id": int(q["questionId"]),
        "title": q["title"],
        "difficulty": q["difficulty"],
        "keywords": [t["name"] for t in q["topicTags"]],
        "description": strip_html(q["content"]),
    }

    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
