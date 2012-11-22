from django.test import TestCase
from django.test import Client
from django.contrib.auth.models import User


class SimpleTest(TestCase):
    def setUp(self):
    	u = User.objects.create_user('user', 'lennon@thebeatles.com', 'userpw')
    	u.save()
    	self.c = Client()

    def test_login_rightpw(self):
     	response = self.c.get('/api/login/', {'username': 'user', 'password': 'userpw'})
     	expected = '{"message": "You provided a correct username and password!", "result": "success", "id": "0"}'
     	self.assertEqual(response.content, expected)

    def test_login_loggedinUser(self):
    	self.c.get('/api/login/', {'username': 'user', 'password': 'userpw'})
     	response = self.c.get('/api/login/user/')
     	expected = '{"message": "user", "result": "success", "id": "0"}'
     	self.assertEqual(response.content, expected)

    def test_logout(self):
     	response = self.c.get('/api/logout/')
     	expected = '{"message": "Successfully logged out!", "result": "success", "id": "0"}'
     	self.assertEqual(response.content, expected)

    def test_login_wrongpw(self):
    	response = self.c.get('/api/login/', {'username': 'user', 'password': 'wrongpw'})
     	expected = '{"message": "Your username or password were incorrect.", "result": "failed", "id": "-2"}'
     	self.assertEqual(response.content, expected)

    def test_logout_loggedinUser(self):
    	response = self.c.get('/api/logout/')
     	response = self.c.get('/api/login/user/')
     	expected = '{"message": "sorry, you are not logged in", "result": "failed", "id": "-1"}'
     	self.assertEqual(response.content, expected)