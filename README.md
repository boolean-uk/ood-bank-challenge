# Bank

## Short note from author
This project has been written in Vue with the use of (mainly) **TailwindCSS**, **DaisyUI** and **Pinia**.
- **Vue** due to personal preference
- **TailwindCSS** and **DaisyUI** for unstyled components
- **Pinia** for state management
## Instructions
- Clone the project
- Install dependencies (`npm install`)
- Run the project on local network (`npm dev`)
## Review

- [X] Have you written a README explaining your approach, perhaps a domain model, instructions to install, run app, run tests, and examples of interactions?
- [X] Did you start with a feature test first?
- [X] Do all your tests pass? (How do you know?)<br>They pass because I have ran the unit tests ;)
- [ ] Does your program have sufficient test coverage? (How do you know?) <br> Yes and no. The backend service is fully covered (banking.ts) but the UI elements are not tested due to time constraints.
- [X] Have you linted your code? (How do you know?)<br>The code is linted thanks to the auto-linter installed in my IDE, every file save automatically lints the code.
- [X] Do you have 3 or more classes?
- [X] Are your methods no longer than 5 lines?<br>At most 6 ;)
- [X] Is the complexity of your methods low? (How do you know?)<br>Because I do not overuse loops and my methods are straightforward. The code is as light as I could make it in one day time.
- [X] Are all parts of the statement format in presentation-specific classes? (Statement, lineItem etc)<br>I guess so? (I am actually not sure, please check the Dashboard element)
- [ ] Have you encapsulated transaction data in a class?
- [ ] Have you encapsulated adding to the transactions array in a class?
- [ ] Are all your class dependencies (even Date? (!)) injected rather than hard-coded?
- [X] Are all your unit tests isolated?
