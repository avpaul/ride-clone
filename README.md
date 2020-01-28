# Ride My Way
<i>Stalk cars on your way in real-time</i>
This application serves as a ride assistant to help users get track of shared transportation.

## Installation
- Clone and run ```yarn``
- Install XCode or Android Studio
- Run ```yarn start``` and ```yarn ios``` to start the emulator.

## Configuration
Create a file named `env.js` and copy the environemt variables from `env.example.js`.
Make sure ESlint is installed as a plugin in your workspace.

## Rules
#### Naming conventions
- Folders should be in lowercase
- Folders with a direct `index` that exports a default `class` or `component` should be in uppercase
or composite lowercase if made of composite words. ex: `firebase-service`.

#### Pattern
- We use the atomic design for our components
- We use react hooks for our components
- Components should only do one thing, or be broken down into multiple components otherwise
- Atoms and molecules should not manipulate the global state
- Templates can be tought of as containers

`Conditional components should lazy loaded`

#### Styling
- Components should be responsive
- The mockup should be design at pixel precision
- The use of animation for different component is prefered

