# Introduction

Thanks for taking the time to interview with RDMD and agreeing to complete our at-home technical assessment. We hope you can spend about 2 hours total working on this assignment, which contains two prompts. If you can finish faster — great! If not, no worries. Just add a note in your project submission detailing what else you would add to the project if time were available.

Please treat this assignment as you would any work assignment. If you would normally add tests or change configurations to make your project complete, please do so for this assignment. Additionally, if you find any ways to improve the existing code (for example, by fixing bugs, etc), feel free to fix them! Real coding environments are not pristine.

# Setup

The project is designed to be run with a single line in your terminal from repo's root directory. It starts by installing `npm` packages in both `client` and `server`, and then runs both servers:

    npm install && npm start

View the React app at [http://localhost:3002/](http://localhost:3002/).

# Instructions

The Patient Manager app allows RDMD to enter and manage information about patients on our platform.

**Problem description #1:** We currently collect records from health care facilities for patients who sign up on our platform. For some patients, the name on their account may not match the name on past health care records (for example, the patient may have changed their last name after becoming married). We need to collect information about other names patients have used when visiting various facilities in the past so the records can be released to our company.

**Tasks:**
- [ ] Add input(s) to the patient platform to collect additional name information
- [ ] Store the additional name information in the database
- [ ] Add the ability to edit patients so we can add additional names to patients that already exist

**Problem description #2:** Our team needs to see information about our patients broken down by different demographics so we know how to focus our resources. Help them out by creating a place where people on the RDMD team can see stats about patients.

- [ ] Create a new page in the app that will allow us to consume basic metrics for patients by diagnosis

# How to submit the assignment

Once you have completed the assignment to the best of your ability, please upload your commits to Github and open a pull request in our shared repository. Again, if you would normally include a pull request summary detailing your work in a real work environment, we encourage you to do so here as well. Add your own comments to the PR for problems/questions you ran into and made a best attempt to resolve on your own.

# Questions?

We're here to help! Let us know if any part of the project is unclear, or if you need help getting up and running. You can contact maya@rdmd.com for help with technical questions or clarifications on this assignments.
