# TSD - Your Custom Survey

## Description

Our project is a web application. With this web application, the users could create & manage surveys, vote to others surveys, and consult the resuls of their surveys.

## Technologies

Frontend : Vue.js  
Backend : Flask

## Setup

Get the code by cloning this repository using git

```
git clone https://github.com/Antoine-62/TSD-Your-Custom-Survey.git
```
### Backend

Once downloaded, rename the folder project by "TSD-Your-Custom-Survey", then open the terminal in the project and execute the following commands
```
venv\Scripts\activate
pip install flask
set FLASK_APP=app.py
pip install Flask-Cors
pip install Flask-SQLAlchemy
```
You set all the backend of the project.  
To run the script for seeding data :

```
pip install Flask-Seeder
flask seed run
```
Now you have some data in your database tables. You can check it by watching the terminal which displays all inserted data in tables.  
Then, we can run the tests :
```
pip install pytest
py.test --ignore=frontend
```
**Warning :** We didn't have the time to finish the unit tests for the 1st sprint, so it will only test the function which retrieve data from Survey table.   
Finally, we can run the server for the backend.
```
cd ..
flask run
```

### Frontend
To set the backend, please execute the following commands
```
npm install -g @vue/cli
cd frontend
npm install
npm install axios
npm install vue bootstrap-vue bootstrap
npm install sweetalert2
```

Then you can run the npm server for frontend :
```
npm run serve
```
Now you can handle the application with the following url : http://localhost:8080/

## Students
The project is realized by :
* Antoine Landrieu
* Thomas Gurtler
