---
title: Linting—What it is, why and how to use it
visibility: public
---

# Introduction

Linting rocks. There are countless benefits of implementing linting rules in your codebase, but it's actually more important than people realize. In fact, you use more linting than you even know, and it makes you a better engineer. However, the best place to start is: What is linting?

> Linting is the automated checking of your source code for programmatic and stylistic errors. This is done by using a lint tool (otherwise known as linter). A lint tool is a basic static code analyzer.
> [owasp.org](https://owasp.org/www-project-devsecops-guideline/latest/01b-Linting-Code#:~:text=What%20Is%20Linting?,overall%20quality%20of%20the%20code.)

In other words, it keeps your code pretty, catches your errors before they're committed, and upholds whatever standards and rule your organization has for writing code. However, people underestimate the importance of some of the basic linting rules, and its impact on platform reliability, bundle size, and more.

# The Set Up

If you just want a solid, opinionated baseline, copy these three files into the root of your repo:

`.prettierrc`

```json
{
  "extends": [
    "next/core-web-vitals",
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "plugins": ["react", "react-hooks", "unused-imports"],
  "rules": {
    "react/no-unescaped-entities": "off",
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/rules-of-hooks": "error",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ]
  }
}
```

`.eslintrc`

```json
{
  "plugins": [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss"
  ],
  "tailwindFunctions": ["clsx", "tw"],
  "singleQuote": true,
  "importOrder": [
    "^react$|^react/(.*)$",
    "^@radix-ui/react-icons|^lucide-react",
    "^@?\\w",
    "^(.*)/(ui|components)/(.*)$",
    "^(.*)/hooks/(.*)$",
    "^@/(.*)$",
    "^[./]"
  ],
  "importOrderSortSpecifiers": true,
  "importOrderSeparation": true,
  "importOrderGroupNamespaceSpecifiers": true
}
```

`.prettierignore`

```txt
node_modules
dist
build
.next
coverage
drizzle
.prettierrc
pnpm-lock.yaml
./next*
*.md*
```

Please make sure you install the following packages:

1. [prettier](https://www.npmjs.com/package/prettier)
2. [eslint](https://www.npmjs.com/package/eslint)
3. [@trivago/prettier-plugin-sort-imports](https://www.npmjs.com/package/@trivago/prettier-plugin-sort-imports/v/2.0.0)
4. [prettier-plugin-tailwindcss](https://www.npmjs.com/package/prettier-plugin-tailwindcss/v/0.0.0-insiders.d539a72)
5. [unused-imports](https://www.npmjs.com/package/eslint-plugin-unused-imports)
6. [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
7. [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)

# Why It Rocks

Code should be predictable. It should be so predictable that someone should read one file and open a similar file and know exactly how to navigate it. Tools like linting can make this automatic. Not only that, but it can have real performance benefits at scale.

**react-hooks/exhaustive-deps**

- Prevents stale closures and prod bugs (see **Gumloop** story)
- For rare one-offs, leave a comment explaining why for `useEffects`. Almost never break for `useCallback` and `useMemo`

**unused-imports/no-unused-imports**

- Enables tree-shaking; nothing unused sneaks into the bundle
- Never break this rule—delete or refactor instead

**unused-imports/no-unused-vars**

- Keeps files readable with zero dead code
- Prefix deliberate throwaways with `_` so the rule stays happy

My rule of thumb: if skipping a rule requires a written justification, it should be an error. Everything else can stay warn until the team is ready to tighten the belt.

# True Story

Not long ago at [Gumloop](https://gumloop.com/) we noticed in our staging build that updating a node’s value simply didn’t update it's internal data. After a painful search we found the culprit: a missing variable in a useCallback dependency array. Had we flipped on react-hooks/exhaustive-deps: "warn" or "error" earlier, the linter would’ve screamed at the empty dependency list and the bug would have been squashed in seconds.

# Tailwind & Import Sorting—Predictable Styling, Predictable Imports

- **`prettier-plugin-tailwindcss`** reorders Tailwind classes so the _final_ CSS is always correct and predictable.
- **`@trivago/prettier-plugin-sort-imports`** alphabetizes and groups imports for easy scanning.

> **Gotcha:** If your codebase hides a circular-dependency, auto-sorting can expose it (or break the build). Fix the cycle or temporarily disable the plugin on that file—but please fix the cycle.

## Wrap-Up

Linting isn’t glamorous, but it’s one of the highest-leverage tools you can add to a codebase. **Turn on “Format on Save”** in your editor (VS Code/Cursor → _Settings_ → _Editor: Format On Save_) to apply it automatically.

- **Reliability** – catch dependency-array bugs before users do.
- **Performance** – ship only the code you need.
- **Consistency** – every file feels familiar, every PR gets reviewed for substance.
