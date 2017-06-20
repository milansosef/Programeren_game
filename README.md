# Bridge game

How to play?

Link to the game: https://milansosef.github.io/Programeren_game/

- Press start to begin playing

- Get across the bridge as many times as you can

- Walk with the "WASD" keys

The game is made with typescript and uses the folowing OOP principles:

-Classes and instances

In this game I use multiple classes en instances to structure and separate code. This has multiple benefits to your code: structured code, code working together, reusability, code will be less complex.

-Encapsulation

Variables can be private, public or protected. This way you can prevent classes from making changes to properties and methods from other classes when they're not supposed to. In my game properties and methods are private, protected or public. This depends on if other classes should be able to get to the properties and methods of a class.

-Composition

Composition is making use of an object, while making a connection from one class to another. Example from my game: Class Game has a level, level has a bridge and bridge has parts.

-Inheritance

A class can inherit the properties and methods from another class. In my game I use inheritance since the classes bridge, character and wind all inherit the properties and methods of the class GameObject. 


Also, check out my class diagram (UML).

![klassendiagram-1](https://user-images.githubusercontent.com/22589141/27352418-f492b6e6-5600-11e7-9dbb-b68baed79fc7.png)

