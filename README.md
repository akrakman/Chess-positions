# Description

Chess Positions is a Flask and React web application that allows a chess player to compare two positions. The application uses data from my past personal games and serves as an exercise in 
choosing the preferred position. This data is then exported to an Excel file, containing links to those positions a user prefers.


The application uses [chess.com](https://www.chess.com/)'s API to import the games information, [react-chessboard](https://react-chessboard.com/) to embed the chess board, and [chess.js](https://github.com/jhlywa/chess.js) to handle the moves and functionality.

The application is not deployed online right now but it may be in future!

## Reflection

The web app serves as an experience in Flask, React, and REST principles. The Excel is supposed to mimic a database so as to allow for focusing on areas other than databases (Excel is not a database).

# How to use it

## Front page

On the front page, wait a few moments for the web app to receive the data from the chess-web-api. Press the button on the bottom of the screen labeled "Reset Both Games" to load 2 new games on the boards (may need to try again). Think hard about the two positions; press the button underneath the position you prefer. The position will be saved in an Excel spreadsheet. Repeat steps!

## Excel spreadsheet

View data I compiled from your visit such as FEN (Forsyth–Edwards Notation) and link to your Lichess analysis according to your FEN.

# Credits

chess.com API: <br>
    [www.chess.com/news/view/published-data-api](https://www.chess.com/news/view/published-data-api)

react-chessboard:
    Copyright 2022 Ryan Gregory <br>
    [react-chessboard.com](https://react-chessboard.com/) <br>
    [github.com/Clariity/react-chessboard](https://github.com/Clariity/react-chessboard)

chess.js:
    Copyright (c) 2020, Jeff Hlywa <br>
    [github.com/jhlywa/chess.js](https://github.com/jhlywa/chess.js)
