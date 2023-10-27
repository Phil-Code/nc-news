# nc-news

nc-news is the front end of a larger nc-news project. The app is built with React and provides a user interface for a back-end news api. The app is hosted on Netlify.

# url to a working example of the app

https://phil-code-nc-news.netlify.app

# GitHub links to both parts of the project

front-end (this app): https://github.com/Phil-Code/nc-news

back-end (the api): https://github.com/Phil-Code/be-nc-news

# features of nc-news

* users can login if they provide a username that exists in the api's database

* articles can be filtered by topic
* articles can be sorted by category 
* sort order can be toggled
* articles are paginated
* all of the above actions utlise functionality of the back-end api

* guests can vote on articles and comments
* values updated by voting are rendered optimistically. User feedback is provided if a patch request to the server fails.

* logged in users can add comments to articles
* the app will validate that a comment is at least five words long before posting
* logged in users will see a button next to their own comments allowing them to delete a comment they have posted

# installation

to install nc-news:

clone the code from this GitHub repository - https://github.com/Phil-Code/nc-news 

Then, in the terminal, cd into the top level of the cloned directory and run the following to install the required dependencies:

npm install 
npm run dev

You will then be able to view a working version of the site locally on your machine.

# required versions

Node.js v20.3.1
