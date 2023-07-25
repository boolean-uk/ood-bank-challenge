# OOP - Polymorphism with TypeScript

### Learning Objectives
- Use polymorphism to refactor source code
- Use Typescript to build robust, testable code

### Set up

- Run `npm i` to install dependencies
- Run `npm test` to run the tests (`src/index.spec.ts`)

### Core Criteria

The `src/index.ts` file contains a `Player` class with a single method inside. That method has a lengthy if-else-if chain; your task is to clean it up using polymorphism.

- Use interfaces to define common attributes / logic for attacks
- Try to reduce the `takeHit` method to as few lines of code as possible
- You will need to create new classes and define at least one interface
- You may need to update the tests in the `src/index.spec.ts` file, or even create more of them

### Extension Criteria

This exercise is the early stages of your own RPG! Take it further by adding:
- Enemies
- Equipment
- Specific combat encounters
- Spells
- A command-line or user interface to transform it into an interactive text adventure
- A character builder
- Character classes (the RPG kind, not the programming kind)
- Character races