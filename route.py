import os

from flask_cors import CORS

import sys
from datetime import datetime
from flask import Flask, jsonify
from flask import json
from flask import render_template
from flask import request
from flask import redirect
from models import User
from models import Question
from models import Survey
from models import Vote
from models import db

from flask_seeder import FlaskSeeder

from sqlalchemy import event
from sqlalchemy import func
from sqlalchemy.engine import Engine
from sqlite3 import Connection as SQLite3Connection

# TO OVERWRITE DEFAULT SQLITE BEHAVIOUR WHEN INSERTING FOREIGN KEY
# BASICALLY IF THE FOREIGN KEY INSERTED IS WRONG IT WILL GIVE YOU AN ERROR
# BY DEFAULt IT DOESN'T SAY ANYTHING(SURPRINSINGLY)


@event.listens_for(Engine, "connect")
def _set_sqlite_pragma(dbapi_connection, connection_record):
    if isinstance(dbapi_connection, SQLite3Connection):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON;")
        cursor.close()

# --------------------------------------------------------------------------
# this part sets up the project path and initializez the app and the db in the context of the app
# the db is stored locally, it's the YCS.db file


project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir, "YCS.db"))
app = Flask(__name__)
def configure_routes(app):
CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config.from_object(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = database_file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
seeder = FlaskSeeder()
seeder.init_app(app, db)

# ---------------------------------------------------------------------------

# CRUD functions for the User table, they contain no integrity check(data format and stuff)
# the only think to be careful for is the DATE format when you input it, it should be dd-mm-yyyy(eg 13-02-1999) otherwise it crashes
# i will either add it later to the backed or we can check it on the frontend before sending the data


@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response
  
@app.route('/add_user', methods=["GET", "POST"]) # routing is a pretty common concept, a form sends data by post to the function, the function does stuff
def add_user(): # and then redirects to another route
    if request.form:
        date = datetime.strptime(request.form.get("birthdate"), '%d-%m-%Y') # formating the string into a date, that's why the string need that specific format
        newUser = User(
                       firstName=request.form.get('firstName'),
                       lastName=request.form.get('lastName'),
                       birthdate=date,
                       gender=request.form.get('gender'),
                       phone=request.form.get('phone'),
                       email=request.form.get('email'),
                       password=request.form.get('password'),
                       right=1)
        db.session.add(newUser)
        db.session.commit()
    return redirect("/")


@app.route("/delete_user", methods=["POST"]) # deletes the user by idU, keep in mind that all tables have Cascade Delete, basically all children(lower FKs) are deleted
def delete_user(): # meaning that, for example,  if you delete a survey that has 2 questions and each question has 3 votes each, everything will be deleted
    idU = request.form.get("idU") # i found it logical like that but if we need to modify anything it's just a line of code so no worries
    user = User.query.filter_by(idU=idU).first()
    db.session.delete(user)
    db.session.commit()
    return redirect("/")


@app.route("/update_user", methods=["POST"]) # User is the only one that ahs Update so far(because of laziness reasons to be honest)
def update_user(): # basically it updates the fields with the new values inputed there while the old values are there as placeholders
    newdate = datetime.strptime(request.form.get("newbDate"), '%Y-%m-%d') # such that if you don't want to modify, let's say, the date, then the old date will
    id = request.form.get('idU') # still be there unchanged(there is lots of room for improvement but i needed to see that i works)
    user = User.query.filter_by(idU = id).first() # also still no data integrity and format check so be careful when trying it out
    user.firstName = request.form.get('newfName')
    user.lastName = request.form.get('newlName')
    user.birthdate = newdate
    user.gender = request.form.get('newGender')
    user.phone = request.form.get('newPhone')
    user.email = request.form.get('newEmail')
    user.password = request.form.get('newPassword')
    user.right = request.form.get('newRight')


    db.session.commit()
    #print(oldUser.birthdate, file=sys.stderr)
    return redirect("/")


def getUsersAsJson(): # basically it queries the whole User table, creates an array of serilize user objects(see serialize property in "models.User")
    users = User.query.all() # and then creates a json array out of it with json.dumps
    asJson = []
    for usr in users:
        asJson.append(usr.serialize)
    json.dumps(asJson)
    return asJson


# Survey CRD methods, they work the same way as the other ones with the exception of the data that flows through them

@app.route('/add_survey', methods=["GET", "POST"])
def add_survey():
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json()
        newSurvey = Survey(
                       title=post_data.get('title'),
                       category=post_data.get('category'),
                       nbOfQuestions=int(post_data.get('nbOfQuestions')),
                       idU=int(post_data.get('idU')))
        db.session.add(newSurvey)
        db.session.commit()
        Surv = db.session.query(func.max(Survey.idS).label("idS")).first()
        idS2 = Surv.idS
    response_object['message'] = 'Survey added!'
    response_object['idS'] = idS2
    return jsonify(response_object)


@app.route("/delete_survey", methods=["POST"])
def delete_survey():
    post_data = request.get_json()
    idS = post_data.get("idS")
    survey = Survey.query.filter_by(idS=idS).first()
    db.session.delete(survey)
    db.session.commit()
    return redirect("/")


def getSurveysAsJson():
    surveys = Survey.query.all()
    asJson = []
    for sur in surveys:
        asJson.append(sur.serialize)
    json.dumps(asJson)
    return asJson


# Question CRD methods, they work the same way as the other ones with the exception of the data that flows through them

@app.route('/add_question', methods=["GET", "POST"])
def add_question():
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json()
        newQuestion = Question(
                       statement=post_data.get('statement'),
                       number=post_data.get('number'),
                       answer1=post_data.get('answer1'),
                       answer2=post_data.get('answer2'),
                       answer3=post_data.get('answer3'),
                       answer4=post_data.get('answer4'),
                       answer5=post_data.get('answer5'),
                       idS=post_data.get('idS'))
        db.session.add(newQuestion)
        db.session.commit()
    return jsonify(response_object)


@app.route("/delete_question", methods=["POST"])
def delete_question():
    idQ = request.form.get("idQ")
    question = Question.query.filter_by(idQ=idQ).first()
    db.session.delete(question)
    db.session.commit()
    return redirect("/")

@app.route("/get_question", methods=["GET", "POST"])
def getQuestionsAsJson():
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json()
        id = post_data.get("idS")
        questions = Question.query.filter_by(idS = id).order_by(Question.number.asc())
        asJson = []
        for qus in questions:
            asJson.append(qus.serialize)
        json.dumps(asJson)
        response_object['questions'] = asJson
    else:
        questions = Question.query.all()
        asJson = []
        for qus in questions:
            asJson.append(qus.serialize)
        json.dumps(asJson)
        response_object['questions'] = asJson
    return jsonify(response_object)#to send the json data - without this function, we cannot send json

# Vote CRD methods, they work the same way as the other ones with the exception of the data that flows through them


@app.route('/add_vote', methods=["GET", "POST"])
def add_vote():
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json()
        newVote = Vote(
                       answer=post_data.get('answer'),
                       idU=post_data.get('idU'),
                       idQ=post_data.get('idQ'))
        db.session.add(newVote)
        db.session.commit()
    return jsonify(response_object)

@app.route("/delete_vote", methods=["POST"])
def delete_vote():
    idV = request.form.get("idV")
    vote = Vote.query.filter_by(idV=idV).first()
    db.session.delete(vote)
    db.session.commit()
    return redirect("/")

@app.route("/vote", methods=["GET","POST"])
def getVotesAsJson():
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json()
        id = post_data.get("idS")
        questions = Question.query.filter_by(idS = id)
        asJson = []
        for qus in questions:
            votes = Vote.query.filter_by(idQ = qus.idQ)
            for v in votes:
                asJson.append(v.serialize)
        json.dumps(asJson)
        response_object['votes'] = asJson
    return jsonify(response_object)


# the main route aka index of the app, it prints the home.html template tha ti used for debugging, it contains forms for all 4 tables
# and button for add, delete and update(just for user), they are ugly but pretty straightforward

@app.route('/', methods=["GET", "POST"])
def getSurveysAsJson2():
    response_object = {'status': 'success'}
    asJson=getSurveysAsJson()
    response_object['surveys'] = asJson
    return jsonify(response_object)#to send the json data - without this function, we cannot send json

