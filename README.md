# Bridge game

How to play?

Link to the game: https://milansosef.github.io/Programeren_game/

Press start to begin playing

Get across the bridge as many times as you can

Walk with the "WASD" keys

The game is made with typescript and uses the folowing OOP principles:

-Classes en instances
In deze game maak ik gebruik van meerdere classes en instances om code te structureren en scheiden. Voordelen hiervan zijn: Structuur, code samen laten werken, herbruikbaarheid van code, de complexiteit van een stuk code wordt lager. 

-Encapsulation
Variabele kun je private, public of protected maken. Hiermee kun je een eigenschap van een class/object afschermen voor andere classes waarvan het niet de bedoeling is dat ze deze eigenschappen kunnen aanpassen. In mijn game zijn er properties en methods private, protected of public, afhankelijk of een andere class bij de properties/methods van een class moeten kunnen.

-Composition
Composition is het gebruik maken van een object, door een verwijzing van een class naar een andere class te leggen.
Voorbeeld uit mijn game: Class Game heeft een Level, level heeft een bridge en bridge heeft parts.

-Inheritance
Een class kan de properties en methods van een andere class overerven. In mijn game gebruik ik overerving doordat de classes bridge, character en wind de properties en methods van class GameObject overerven.

Zie ook mijn klassendiagram

![klassendiagram-1](https://user-images.githubusercontent.com/22589141/27352418-f492b6e6-5600-11e7-9dbb-b68baed79fc7.png)

