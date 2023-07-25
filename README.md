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
- You are reading it right now :)
- [X] Did you start with a feature test first?
- I started by building the skeleton of the user interface, but the logic itself I have written TDD way so I would say yes.
- [X] Do all your tests pass? (How do you know?)
- They pass because I have ran the unit tests ;)
- [X] Does your program have sufficient test coverage? (How do you know?) 
- Yes and no. The backend service is fully covered (banking.ts and transaction.ts) but the UI elements are not tested due to time constraints.
- [X] Have you linted your code? (How do you know?)
- The code is linted thanks to the auto-linter installed in my IDE, every file save automatically lints the code. Linting module is not included in this project as I have felt no reason to install it for a project I'll be working on alone (of course that is a subject to change if I had to work with someone other than me)
- [X] Do you have 3 or more classes?
- Thats a yes
- [X] Are your methods no longer than 5 lines?
- At most 6 ;)
- [X] Is the complexity of your methods low? (How do you know?)
- Because I do not overuse loops and (most of) my methods are straightforward. The code is as light as I could make it in one day time. If I had to guess, most of the methods have the complexity of O(1) or O(n) but that's a **complete** guess.
- [X] Are all parts of the statement format in presentation-specific classes? (Statement, lineItem etc)
- I guess so? (I am actually not sure, please check the Dashboard element if it fits the criteria)
- [X] Have you encapsulated transaction data in a class? 
- Yes and no, the transaction logic is handled in a class of its own, but due to unforeseen limitations (or my lack of skill) I had to make some adjustements noted in generator.ts
- [ ] Have you encapsulated adding to the transactions array in a class?
- Not sure
- [ ] Are all your class dependencies (even Date? (!)) injected rather than hard-coded?
- Not sure
- [X] Are all your unit tests isolated?
