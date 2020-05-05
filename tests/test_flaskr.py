from myproject import app
from flask import jsonify
import json
    
def test_get_Route():
    client = app.test_client()
    url = '/'
    response_object = {'idS': 1}
    response = client.get(url)
    assert response.get_data() == b'{"status":"success","surveys":[{"category":"History","idS":1,"nbOfQuestions":2,"title":"Napoleon"},{"category":"Cultural(movies, books ...)","idS":2,"nbOfQuestions":3,"title":"Movies"}]}'
    assert response.status_code == 200
	
