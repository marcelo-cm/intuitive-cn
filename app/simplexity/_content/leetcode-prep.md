---
title: LeetCode Interviews — How to Prepare
description: A guide on how I approached my data structure & algorithm practice
date: Oct 2024
visibility: public
---

# Context

I am a self-taught developer, so this guide would be geared towards people starting from the ground up, and by no means is any part mandatory (unless denoted as _strongly suggested_). I will describe how much each part of my approached helped me, and tell you my personal do-s and do-not-s. My biggest advice that I'll give up front: This is simply a game of repetition and consistency.

Why am I qualified to give you advice? I'm not. Though, I have been able to get myself through live technical interviews at a few big tech companies, and dozens of startups.

Please email me if you have any questions: [marcechaman@gmail.com](mailto:marcechaman@gmail.com)

---

# What to expect during the interview itself

To approach your prep effectively, know what the interview will actually look like, so you know what to simulate when practicing:

First, you will exchange introductions. Nail yours. It can help set the tone for the interview. It should be up to 60 seconds long, covering a bit about yourself personally and focusing on why you like software and what you've been up to in regards to getting better at software. For me, I note where I worked last summer & what I worked on there, as well as what I'm building now and why — I also touch on being a self-taught engineer, and my early days in the creative industry.

---

The following is what I've found works for me through experimentation and talking to others, but it is very similar to the [UMPIRE](https://guides.codepath.com/compsci/UMPIRE-Interview-Strategy) method (If you're a frameworks person, please read the linked blog).

---

When the interviewer presents you with a question, **avoid jumping into coding right away.** Instead, take notes as they explain.

(**UNDERSTAND**) Your first step should be to restate the question in your own words and confirm your understanding. This is also your opportunity to ask clarifying questions if any part is unclear. Here are key areas to inquire about:

1. **Inputs:** For example, if an input is an `int`, will it always be positive? If it's an array, should it be modified in-place (if applicable)?
2. **Expected return value:** For example, should the program return `True` in certain cases and `False` in others? Should the output be a `tuple`, `int`, or `str`?

If the question involves Object-Oriented Programming (OOP), it may help to ask which method will be called most frequently. This can guide you toward optimizing the right method and finding the most efficient solution.

Document these questions and answers as comments in your IDE.

(**DESCRIBE**) Once you clearly understand the question, pause to outline your approach and explain it to the interviewer: _"My initial thought is to iterate through the string using a `Two Pointers` technique, where I would [insert algorithm logic here]."_ Next, sketch the algorithm in pseudocode—writing out the logic in comments can be helpful. Take additional time, if needed, to find the best solution. It's totally okay for your first instinct to be a brute force approach, but try to optimize so the interviewer can see your thought process — if you can't come up with anything, it's not the end of the world.

This part is arguably the most important portion of your entire interview — the key question you want to demonstrate is: "Do I know how to problem solve, and make others understand my decisions?"

(**IMPLEMENT**) When you have a clear plan, begin coding, narrating each step — talk though your thinking but don't talk just to talk. Be sure to think about potential edge cases. Be prepared to answer any questions the interviewer may have throughout the programming process.

(**TEST & OPTIMIZE**) After coding, test your solution with a variety of cases, including edge and invalid cases. Walk through a very simply test case using comments to follow your logic — this shows the interviewer you actually understand your solution well, and may help you find bugs! You can debug using print statements if debuggers are not allowed. If you see optimizations that are possible, describe them to the interview; if you have enough time, then go for it!

(**ANSWER**) Finally, prepare to discuss the time and space complexity of your approach. Note what tradeoffs you made (ie. You sped up the time complexity by using extra space), and what you'd do if you had more time.

(**ASK**) Hopefully you'll have enough time after your technical implementation to ask questions; good questions can leave good impressions. For startups, I like to ask about their engineering organizational structure, their tech stack, and engineering culture ('Move Fast Break Things.' vs 'To move fast you must first move slow.'). It's a chance to also know if you'd enjoy working there.

# Learning DSA's from scratch, including Big O complexity

I personally took Intro to CS, and Discrete Math classes at my school, and also read old school books that dive deep into the fundamental algorithms (ie. sorts, tree traversals, etc.). You can quite literally ChatGPT "Good books for learning about Data Structure and Algorithms", **DO NOT** hunt online for the pirated PDFs (wink).

For Big O notation, you must also read articles or watch youtube videos to understand the theory. You get better at this as you continue to prepare. Every NeetCode solution tells you the space and time complexity of the problem. It's often helpful to simply know the time complexities of common techniques used during solutions (ie. sorts are `O(n*logn)`, BFS/DFS is `O(n+m)` where `n = # nodes` and `m = # edges`)

# Practicing LeetCode effectively, with help

This part is very straight forward. Do 3 questions a day, following either the [Neetcode](https://neetcode.io/) 150, or the Leetcode 150 study plan.

Run into a problem? YouTube the question by name, prefer Neetcode videos.

For every single question you do, copy and paste the solution, and describe your logical approach to the question — you should NEVER memorize the code to a solution, but instead you should become very comfortable with the approach (especially with explaining the approach). The idea is that you will solve the question, optimize it, then iron out the train of thought that helped you arrive at this solution. You should rate every question in difficult from 1-10 — after 1-2 weeks, revisit all the questions marked 6 or higher. I used Notion to help me track this.

If you have an upcoming interview, it's a good idea to do questions on LeetCode that are tagged with that specific Company. You may need to ask a friend with LeetCode premium, or get it yourself.

The goal is to be extremely good at pattern recognition. Some questions are incredibly difficult to solve without first seeing a question similar to it.

It's very common for interview questions to be on one of these [14 patterns](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed), which is what most prepping material focuses on. However, at higher levels (and depending on the company), you will get things that are much different.

# Next steps (STRONGLY SUGGESTED)

As mentioned in the beginning, this is simply a game of repetition. How many repetitions? It depends on who you are. I know people who did 30 problems and ace interviews like it's nothing; personally, I have done over a hundreds problems in the three months leading up to my interviews — clearly, I didn't have a natural intuition. I would recommend starting your prep 3 months before you expect to do technical interviews.

![Notion table for tracking LeetCode questions](/blog-assets/leetcode-prep/tracking-table.png 'Table on Notion I use')

![Documentation template for LeetCode solutions](/blog-assets/leetcode-prep/documentation-template.png 'Documentation Template')

The best way to prepare for the real thing is to do mock interviews — I hate them too, but they really did help. If you don't know where to turn for mock interviews, consider joining communities like [ColorStack](https://www.colorstack.org/), [HeadStart Fellowship](https://www.headstartfellowship.com/), or something on campus. Some people find that the best way to learn is with others!

Some resources that may be helpful to you can be found on [Adam Gluck's website](https://adamgluck.com/posts/leetcode) — who helped me write this guide.

---

Special thank you to friends at [Neo](https://neo.com/), and [ColorStack](https://www.colorstack.org/) for helping me edit this.

Credit to [Adam Gluck](https://www.linkedin.com/in/adam-gluck/) For some awesome resources and sharing some tips of his own!

If you have any edits, suggestions, or tips to share, please message me and share.
