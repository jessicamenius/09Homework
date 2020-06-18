var inquirer = require("inquirer");
var axios = require("axios");
var fs = require("fs");

inquirer
  .prompt({
    message: "Enter your GitHub username",
    name: "username",
  })
  .then(function ({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;
    // console.log(queryUrl);

    axios.get(queryUrl).then((res) => {
      const githubLink = res.data.tml_url;
      const email = res.data.email;
      const avatarURL = res.data.avatar_url;

      // console.log(githubLink);
      // console.log(email);
      // console.log(avatarURL);

      // array of questions for user

      inquirer
        .prompt([
          {
            type: "input",
            message: "Enter title of your project",
            name: "title",
          },
          {
            type: "input",
            message: "Provide a description of your project",
            name: "desc",
          },
          {
            type: "input",
            message: "Provide installation method",
            name: "install",
          },
          {
            type: "input",
            message: "How will this project be utilized?",
            name: "usage",
          },
          {
            type: "list",
            message: "Which licenses does this project use?",
            name: "license",
            choices: [
              "GNU AGPLv3",
              "GNU GPLv3",
              "GNU LGPLv3",
              "Mozilla Public License 2.0",
              "Apache License 2.0",
              "MIT License",
              "Boost Software License 1.0",
              "The Unlicense",
              "None",
            ],
          },
          {
            type: "confirm",
            message: "Were there additional contributors on this project?",
            name: "contributors",
          },
          {
            type: "input",
            message:
              "If there are any additional contributors on this project, provide their names. If none, enter N/A",
            name: "contributorNames",
            when: (answers) => answers.contributors === true,
          },
          {
            type: "input",
            message: "Description of tests performed on this project",
            name: "test",
          },
          {
            type: "input",
            message: "For further inquiries, provide an email address",
            name: "contact",
          },
        ])
        .then(function (res) {
          // console.log(
          //   res.title,
          //   res.desc,
          //   res.install,
          //   res.usage,
          //   res.contributors,
          //   res.license,
          //   res.test,
          //   res.contact
          // );
          if (res.contributors === false) {
            res.contributorNames = "None";
          }
          fs.writeFile(
            "README.md",
            `
            # ${res.title}

            ## Table of Contents:
              - Description
              - Installation
              - Usage
              - License
              - Contributions
              - Tests
              - Questions
          <br>
          ## Project Description
              ${res.desc}
          <br>
          ## Installation
          <br>
            Before running the program, in command line or terminal run the below commands
            ${res.install}
          <br>
          ## Usage
          To run the program, in command line, run node index.js and complete the questions as prompted.`,
            function (err) {
              if (err) {
                console.log(err);
              }
              console.log("File created");
            }
          );
        });
    });
  });
