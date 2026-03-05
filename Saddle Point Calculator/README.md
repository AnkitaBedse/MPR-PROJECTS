Zero-Sum Matrix Game Solver

A Java Swing desktop application that allows users to create, analyze, and solve M × N zero-sum matrix games.
The program enables users to input a payoff matrix, automatically generate its negative counterpart, and compute important game theory results such as Maximin, Minimax, and Saddle Point detection.

This project is designed as an educational tool to help students understand fundamental Game Theory concepts through an interactive graphical interface.

Features

 Graphical User Interface (GUI) built with Java Swing
 Supports matrix sizes up to 6 × 6
 Allows manual input of Matrix A (payoff matrix)
 Automatically generates Matrix B = –A
 Computes key game theory results:

Maximin value (row strategy)

Minimax value (column strategy)

Saddle Point detection

 Clean interface with buttons for matrix generation and calculation
 Built using Java Swing with absolute layout

Concepts Implemented

This project demonstrates several Game Theory principles, including:

Zero-Sum Games

Maximin Strategy

Minimax Strategy

Saddle Point Identification

Payoff Matrix Analysis

 Application Workflow

Enter the number of rows (M) and columns (N).

Click Generate Matrix Fields to create the input grid.

Fill in all entries for Matrix A.

Click Calculate to compute the results.

The program will display:

Matrix A

Matrix B (negative of A)

Maximin value

Minimax value

Saddle Point result (if it exists)

Requirements

Java JDK 8 or higher

Any Java IDE such as:

IntelliJ IDEA

Eclipse

NetBeans

Or a terminal capable of compiling and running Java Swing programs
Notes

Only integer values are supported for matrix inputs.

The application includes basic input validation to handle invalid or incomplete entries.

Intended mainly for academic learning and demonstrations of Game Theory concepts.

 Built With

Java

Java Swing (GUI Framework)

 Educational Use

This tool is particularly useful for students studying:

Operations Research

Game Theory

Decision Theory

Strategic Optimization
