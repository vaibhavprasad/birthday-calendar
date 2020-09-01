# birthday-calendar

The Birthday calendar app is written in Vanilla JS and ES6 template strings are used for constructing the DOM.  
The App takes a JSON object array containing the list of names and birthdays and the year. The input event handler notices the change and updates the calendar with the data. If the JSON input is incorrect, the background color of the text-area is changed to show the error.  
     
The index.html file contains the static HTML.  
All the functionality is present in the index.js file.  
The styles are covered in styles/main.css file.

Sample JSON input.  
```
[
  {
    "name": "vaibhav prasad",
    "birthday": "12/02/1978"
  },
  {
    "name": "Jason Mamoa",
    "birthday": "12/02/1998"
  },
  {
    "name": "Kailash Kher",
    "birthday": "12/02/1988"
  },
  {
    "name": "Pranav Sen",
    "birthday": "11/03/1975"
  },
  {
    "name": "Rajiv Saini",
    "birthday": "11/02/1991"
  },
  {
    "name": "lipika suresh",
    "birthday": "20/04/1970"
  },
  {
    "name": "nilesh Singh",
    "birthday": "31/01/1992"
  },
  {
    "name": "sonam gupta",
    "birthday": "12/01/1992"
  },
  {
    "name": "simran MP",
    "birthday": "11/09/1996"
  },
  {
    "name": "Jitu Gandhi",
    "birthday": "11/03/2000"
  },
  {
    "name": "Shrishty chandra",
    "birthday": "11/03/1994"
  },
  {
    "name": "anantha chetan",
    "birthday": "11/03/1999"
  },
  {
    "name": "Chris Guy",
    "birthday": "29/03/2000"
  }
]

```
  
  
  
