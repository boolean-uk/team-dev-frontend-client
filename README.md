# Team Dev Frontend Client

This is the client repository for the frontend team development project.

This is a simulation of professional development teamwork. Here, you work on parts of an application in teams. The application already has a backend server live with ‘users’. Your job is to develop parts of the frontend.

## Learning Objectives

- Use an agile product development process in a team to build and maintain software
  - Use a 3rd party app to manage work
  - Use ceremonies like standups, planning sessions, retrospectives, demos to get stakeholder feedback
  - Estimate and prioritise work
  - Document work
  - Pair, mob, and work individually
- Establish contracts between teams when working on areas of the codebase that overlap
- Understand the software development lifecycle and take a requirement through to release
- Use a version control tool to send Pull Requests for integrating code to a codebase
- Explain and use a Continuous Integration/Continuous Delivery (CI/CD) process to integrate and deploy features
- Maintain and monitor a live application

## Project Board

[Team Dev Frontend Client Project Board](https://github.com/orgs/boolean-uk/projects/6).

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
