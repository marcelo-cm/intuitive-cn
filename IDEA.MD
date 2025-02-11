# **Swing** - the ideas doc

## Manifesto

Everyone has their own way of creating a network. Some have everything live in their texts, others swear by their hacked-together excel sheet, and psychopaths may even just have people in their head. But, for people and small teams that live and breathe meetings, its not enough to have that sixth sense for who to reach out to. At any moment, the next big thing may have just walked through your door, and you forgot to follow up. There goes your chance of getting in early before anyone even knows their name.

And so you realized its time for a change. Time for some structure to finally organize it all. So you did! You tried alternatives. Maybe the company you've worked for tried Affinity but you just couldn't drag yourself to input it into the system. Or, god forbid, you've actually used Salesforce or HubSpot. All these solutions are.... _fine_, but the problem is that you _have to actually use them_.

We're changing that.

Swing builds a network of people you've actually met, which means _a lot_. This isn't LinkedIn or Twitter. Would you _seriously_ hang out with people who follow you on X? Every single one? I doubt it. Swing is the opposite. Every single person Swing knows is a person you've met. Your attention is your most valuable resource, and you just gave them attention with a meeting. Everyone there has _your_ stamp of approval. So, you've now got a network you trust that's automatically updated.

Ok. So you've got a physical network you trust. Now what?

- Are you a community builder? Swing intros to like-minded people in your network.
- Someone looking for a cofounder? Swing them a connection to someone you trust.
- You're a VC? Track your talent portfolio long-term to never miss the next founder with Swing.

## Core Product Vision

One-liner: "Proactive meeting management software that auto-builds your network from any meeting you have, and ensures that you never miss an action item to complete based on your meeting notes."

Product:

- Desktop and web app that listens to all your meetings.
- Can perform actions "as far as the agent can go" until it requires human intervention. I.e. will set up an email for you to send, but will need you to actually send it.
- **Proactive** on intros, action items, reminding you to reach out to people.

## MVP Features

1. User inputs unstructued data (text) from Granola or any other large text source, and we store data in some [structured format](#data-representation). Literally paste into textarea, and/or drag/drop file.
2. Creates small dashboard of your network that you can visualize and search.
3. barebones actions:
   - based on meeting notes, perform all email actions (send emails, schedule meetings, etc.)
   - create new intros
   - reminders to reach out to people/action items discussed in meeting.

## Competitive Analysis

- [Affinity](https://affinity.co/):
  - for large orgs. not our target market.
- [Dex](https://getdex.com/):
  - personal management of your network.
- [Rolodexcrm](https://rolodexcrm.com/):
  - does it but across organizations.
  - sync linkedin, calendars, email across members in an org.
  - seems super new and we could build basically the same thing in a week but quicker access to customers.
- [Happenstance](https://happenstance.ai/):
  - connect gmail linkedin twitter to look who you're finding for in natural language. meh.
    - as much as you wanna believe it, your linkedin/x isn't your fucking network. do you really wanna hang out with people who follow you on X?
- [Granola](https://granola.ai/):
  - really, REALLY good meeting notes. like absolutely cracked.
  - nothing else though.
- [Intros.Ai](https://intros.ai/):
  - similar donut-bot-like feature with a flow to intro other people in your network.
  - "AI search" across your people.
- [Boardy.ai](https://boardy.ai/):
  - Linkedin bot that you can talk to and then intros you to other people.

## Data Representation
