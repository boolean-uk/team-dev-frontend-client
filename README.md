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

_When signed in, a student user of id 123 can navigate to `/home`. They will see a list of users from their same cohort in a sidebar. They will see a feed of posts from other students and teachers in the main area. Each conversation in a post can continue with users and teachers adding comments or liking posts/comments. Post messages are ordered by date, and an input field and a submit button at the bottom to create a new post. For now, other users will see these new posts when they refresh their browser page._

_A user can create a new post and this should appear on the feed. Any teacher can edit or delete an existing post or comment, unless the post or comment are made by another teacher. A student may edit or delete only the posts and comments that they have made. Any user can add a comment to an existing post. Any user can like or unlike a comment or a post. Liking is only possible if the user has not already liked that post or comment. Unliking is only possible if the user has already liked or unliked that post or comment._

## Team Dev Frontend Server

There is more info' about the deployed server at [https://github.com/boolean-uk/team-dev-frontend-server](https://github.com/boolean-uk/team-dev-frontend-server). There, you'll find information about the database design and the API.

## Setup

Clone this repository (do not fork!)

```sh
git clone git@github.com:boolean-uk/team-dev-client.git && cd team-dev-client
npm ci
npm start
```

By default, the project will run with the `.env.development` environment on your local machine.

Please ensure that `REACT_APP_API_URL` matches the server's url and port (when developing, you'll be running the server locally, not using the production server).

## Run Tests

Cypress setup: https://docs.cypress.io/guides/getting-started/installing-cypress

```sh
npx cypress open
```

## Deployment

The client is automatically deployed to AWS Amplify, at [https://main.d3auuogvq1hhel.amplifyapp.com/](https://main.d3auuogvq1hhel.amplifyapp.com/).
