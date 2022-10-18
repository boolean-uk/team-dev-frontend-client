# Team Dev Frontend Client Changed

This is the client repository for the frontend team development project.

This is a simulation of professional development teamwork. Here, you work on parts of an application in teams. The application already has a backend server live with ‘users’. Your job is to develop parts of the frontend.

## Learning Objectives

- Understand the software development lifecycle and take a requirement through to release
  - Gather requirements
  - Model the problem domain
  - Iterative implementation
  - Verify implementation against requirements
- Use [agile project management](https://www.atlassian.com/agile/project-management) in a team to build and maintain software
  - Use [ceremonies](https://www.atlassian.com/agile/scrum/ceremonies) like [standups](https://www.atlassian.com/agile/scrum/standups), [planning sessions](https://www.atlassian.com/agile/scrum/sprint-planning), [retrospectives](https://www.atlassian.com/agile/scrum/retrospectives) and [sprint reviews](https://www.atlassian.com/agile/scrum/sprint-reviews) to get stakeholder feedback
  - Estimate and prioritise work
  - Document work
  - [Pair](https://www.agile-academy.com/en/agile-dictionary/pair-programming/), [mob](https://www.agilealliance.org/glossary/mob-programming), and work individually
  - Establish contracts between teams when working on areas of the codebase that overlap
- Use a version control tool to send [Pull Requests](https://www.atlassian.com/git/tutorials/making-a-pull-request) for integrating code to a codebase
- Explain and use a Continuous Integration/Continuous Delivery ([CI/CD](https://www.redhat.com/en/topics/devops/what-is-ci-cd)) process to integrate and deploy features
- Maintain and monitor a live application

## Project Board

Below is the beginning of your [Team Dev Frontend Client Project Board](https://github.com/orgs/boolean-uk/projects/6). It uses [Kanban](https://www.atlassian.com/agile/kanban). Part of the issues on the backlog there were developed from the following [epic](https://www.atlassian.com/agile/project-management/epics):

**Teachers and students can have conversations**

_When signed in, a user of id 123 can navigate to `/messages`. They will see a list of users on the left hand side from whom they have had conversations. Clicking on a conversation in the list will show the conversation in the main area. Show the most recent conversation by default. The conversation can continue - in the main area a user will see the conversation messages ordered by date, and an input field and a submit button at the bottom to create a message. For now, other recipients will see these new messages when they refresh their browser page._

_A user can create a conversation with any other user(s). At the top of the page, they see a “start new conversation” area. It has a search input field that updates on input to find users. Selecting a user adds it to the conversation about to be created. The signed in user can see which other users they are adding to a new conversation, they can remove a user from the list before creating the conversation. There’s a required input field for the conversation name. When a user is done adding users to the conversation, they create the conversation by clicking a submit button. This should show immediately for the signed in user in the left hand menu of conversations and show be default in the main area._

_Messages are shown by user with consistent background colours. Signed in users always see their messages with a background colour of blue. Other conversation members have random (but consistent colours)._

## Team Dev Frontend Server

There is more info' about the deployed server at [https://github.com/boolean-uk/team-dev-frontend-server](https://github.com/boolean-uk/team-dev-frontend-server). There, you'll find information about the database design and the API.

## Setup

Clone this repository

```sh
git clone git@github.com:boolean-uk/team-dev-client.git && cd team-dev-client
npm ci
npm start
```

## Run Tests

Cypress setup: https://docs.cypress.io/guides/getting-started/installing-cypress

```sh
npx cypress open
```

## Deployment

The client is automatically deployed to AWS Amplify, at [https://main.d3auuogvq1hhel.amplifyapp.com/](https://main.d3auuogvq1hhel.amplifyapp.com/).