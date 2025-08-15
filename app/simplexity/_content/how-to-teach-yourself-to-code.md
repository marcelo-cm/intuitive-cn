---
title: How to teach yourself how to code
description: A roadmap to learn programming to become a full-stack developer
date: Nov 2024
visibility: public
---

# Context

Did I mention I'm self-taught? It seems to be all I talk about. Fortunately, it seems to be all I get asked about too. I wanted to put together a roadmap (constantly updated) to help others understand where to start with their journey. Let me preface it with a few things:

1. It is hard, but not because you're not smart. It's hard because it takes time, and people are no longer patient.
2. It requires consistency and dedication. You cannot learn this on the side after all your other commitments.
3. My roadmap is almost certainly not the optimal way to learn. This is what worked for me, and how I'd advise others to learn.

In this guide are a lot of terms you may not know, so I've linked basic descriptions of it for you to dive into.

Below are the basic steps of the journey — This is an **EXTREMELY** condensed timeline, so I wouldn't recommend skipping steps because we're already skipping a ton. I've kept it very concise on purpose; I am happy to answer questions, provide clarity, or give advice if you're ever stuck. Email me at [marcechaman@gmail.com](mailto:marcechaman@gmail.com).

# STEP 1 — Learn Syntax

You must understand how code works. You must understand the different 'grammatical structures' or 'syntax' of code before you can rely on tools to do it for you. Thus, using resources like [Codecademy](https://www.codecademy.com/), you will learn the basics of programming. Learn the following:

- **HTML/CSS** — The building blocks of anything on the web.
- **Typescript (or Javascript)** — The language of the internet. Most front-end/full-stack frameworks are based on JS.
- **Python** — Easiest syntax to learn, and most popular language. This is a basic that you must learn.
- **Git** — Helpful when it comes to using GitHub to store your code
- **Bash/Terminal/CLI** — Whatever your computer's terminal language is. This will help you navigate your computer and give you a basic understanding of directories.

If you dedicate your time to this, you can learn the basics of all of these within 4.

# STEP 2 — Get the tools for the job

To start your project, you need a few tools in your toolbox.

- **VSCode (or Cursor, AI-powered)** — Your [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment) for full-stack development.
  - VSCode extensions can make your life a LOT easier. [Here](https://marcelochaman.ca/simplexity/devx-practices) are my favourites.
- **Git** — As mentioned before, Git is important to know. You only have to know basic operations such as: _checkout_, _pull_, _push_, _commit_, _branch_, _merge_.
- **Python** — You can find your version [here](https://www.python.org/downloads/).
- **Homebrew** — Package manager for your Mac, [here](https://brew.sh/). Sometimes you need stuff that isn't natively installed on your computer.
- **Node** — You can find your version [here](https://nodejs.org/en/download/package-manager).

Poke around VSCode, create some files, etc. Get familiar with it, because you're going to spend a lot of time in it.

# STEP 3 — Build stuff & learn stuff, simultaneously

At this stage, you should know how to program at a basic level and have the tools to build something. However, this is the steepest part of your learning curve — you are going to learn a TON. Therefore, you should be learning the right things with your limited time.

## 3.1 — Build a full-stack platform with a modern tech stack

Below is my suggested tech stack for your first project:

- [Next.js](https://nextjs.org/) — Fullstack framework that is highly optimized and intuitive. At the time of writing this, this is the most popular framework.
- [Tailwind CSS](https://tailwindcss.com/docs/installation) — CSS Framework that makes styling really easy. I always suggest knowing CSS well before you start taking shortcuts!
- [Shadcn](https://ui.shadcn.com/) — Library of reusable components (Typescript) for built with Tailwind CSS. Really helpful for getting components quickly. Please take the time to understand how they work before completely relying on them.
- [Supabase (PostgreSQL)](https://supabase.com/) — Relational database that is really easy to set up, has great documentation, built-in authentication workflow, etc.
- [Node.js](https://nodejs.org/docs/latest/api/) — The best way to build a backend with Javascript. There are frameworks for Node as well, but I don't know them very well.
- [GoDaddy](https://www.godaddy.com/) — If you want a domain, this is a good place. Anywhere works though.
- [Figma](https://www.figma.com/) — Design software that I'm obsessed with.

Your [DevOps](https://aws.amazon.com/devops/what-is-devops/#:~:text=DevOps%20is%20the%20combination%20of,development%20and%20infrastructure%20management%20processes.) toolstack should be:

- Vercel (frontend hosting) – Awesome, free, web hosting that is really intuitive.
- Heroku (backend hosting) – I'm very unfamiliar with backend hosting services, so this selection is uneducated. It works though.

I'd follow this process:

1. Write a document on what you want your app to be like. What features are you looking to implement? What are your design inspirations?
2. Design some (rough) wireframes on Figma. Design isn't for everyone, but I think this is very important.
3. Start coding.
4. Run into walls. Text your friends, read documentation (!!!), and use all your resources.
5. Break through walls.
6. Deploy your app.

Here are some things you want to do within your app:

- Build a CRUD API with your Node.js backend
- Make third-party API calls using [axios](https://axios-http.com/docs/intro) or fetch.
- Build an authentication workflow with a third-party provider
- Use relationship databases with foreign keys.
- Create interfaces/types in Typescript (`.ts`)

I strongly suggest reading documentation obsessively and looking at popular open-source code bases to see how experienced engineers write code.

### GOALS:

1. Learn how to think about your app's flows **before** building (in Figma, during the design phase).
   - Prevents you from having to re-write code, or re-architect your project. Fixing code is **harder** than fixing designs.
   - Makes you think about your features and how they work in depth, giving you clarity on what needs to be built when you code.
2. Learn how to ask for help and use documentation/resources effectively.
3. Learn how to get code to do what you want it to do.
   - A sub-goal here is to learn how to be clean. You should care about things down to your [directory structure](<https://en.wikipedia.org/wiki/Directory_(computing)>). [Here](https://github.com/marcelo-cm/workman) is an example of what I think is a good directory structure.
4. Learn to translate design to code.
5. Get frustrated because you want your code to be better.

### WARNINGS:

1. This project will not be good. In fact, it will probably suck. Your goal is to try to achieve something cool with code, not to build the next big startup. If you don't have this patience, don't start programming.
2. You will run into a lot of walls. You must let go of your ego and ask for help consistently.
3. This is hard as hell.

## 3.2 — Learn basic Data Structures & Algorithm

[Data Structures & Algorithms (DSAs)](https://www.w3schools.com/dsa/dsa_intro.php) are normally used during the software engineering interview process. Your goal is not to be incredible at LeetCode, but instead, you want to learn fundamental computer science skills. I would strongly suggest doing 1 [LeetCode](https://leetcode.com/problemset/) problem a day (or more if you like it) from [Neetcode's roadmap](https://neetcode.io/). This will help you work through logic when you're developing your full-stack app. Many problems you run into regard DSAs.

### GOALS:

1. Learn how to write efficient & effective code.
   - Focus on understanding and calculating time and space complexity for solutions.
2. Learn fundamental CS skills.
3. Learn to write organized and easy-to-follow code.

If you want to get REALLY into LeetCode, I have written about how to get good at it [here](https://www.marcelochaman.ca/simplexity/leetcode-prep).

## 3.3 — Read about what it means to write clean code

Read `Clean Code — A handbook of agile software craftsmanship (Robert C. Martin Series, 2008)`.

### GOALS:

- Learn what it means to write clean code and its importance.
- Learn how to make your code legible.
- Learn basic do-s and don't-s of writing code.

When in doubt about **anything**, literally just ChatGPT it, or email me.

## STEP 4 — Read about how to do things better, and do things better

Build more stuff, and build it better. Below are some things to learn about on your next project if you want to level up your programming skills.

- Database design (normalization, SQL vs NoSQL vs GraphQL)
- Begin exploring high-level design topics like scalability, load balancing, and horizontal scaling.
- Continue to learn DSAs down to things like Hash Maps, Linked Lists, Binary Trees, and Graphs.
- React Context & Stores (Redux, Zustand)
- Integrate tools like ESLint and Prettier to maintain consistent code quality. [Here](https://marcelochaman.ca/simplexity/devx-practices) are my rules.
- Build a feature for uploading images or files, utilizing a service like AWS S3 or Supabase.
- Understand lazy loading, code splitting, and optimizing database queries.
- Learn how Git works better
- Learn how deployments work in your hosting services
- Implement web analytics
- Use a Content Management Service (CMS)
- Contribute to open-source projects
- Learn how to do testing with Jest or Vitest
- Re-rendering optimization w/ million.js
- Create centralized error handling for your frontend and backend.
- Use tools like Redis or Vercel Middleware for caching and protecting APIs.
- Add WebSocket to enable features like live notifications or chat.
- Set up continuous integration and deployment workflows using GitHub Actions.
- Nerd about terminal aliases, scripts for your dev workflow, etc.

The world is now open for you to build anything you want.

# Notes

Thank you to [Jamyson Gouveros](https://www.linkedin.com/in/jamysongouveros/) for his curiosity, to [Leonardo Montes-Quiliche](https://www.linkedin.com/in/leo-mont/) for shamelessly asking me questions, and to the 150+ engineers I've forced into meetings while I was going through this process.

If you have any advice or suggestions for this guide, or any questions, please contact me at [marcechaman@gmail.com](mailto:marcechaman@gmail.com).
