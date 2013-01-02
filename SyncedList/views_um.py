#
# since:		version 0.1
# creator:		Martin Eigenmann
# 
# details:		Login handling 
#
#
# since:		version 0.1
# creator:		Martin Eigenmann
# 
# details:		api - userlogin
#

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.contrib.auth import authenticate, login, logout
from django.utils import simplejson




def um_login(request):
	# return codes:   0:succes
	#				<>0:fail - look at message
	#
	response_data = {
		"message" : "",
		"result" : "",
		"id" : "",
	}
	if request.method == 'GET':
		username = request.GET.get('username', None)
		password = request.GET.get('password', None)
	elif request.method == 'POST':
		username = request.POST.get('username', None)
		password = request.POST.get('password', None)
	
	if username is not None and password is not None:
		user = authenticate(username=username, password=password)
	else:
		user = None
	if user is not None:
		if user.is_active:
			login(request, user)
			response_data['message'] = "You provided a correct username and password!"
			response_data['result'] = 'success'
			response_data['id'] = "0"
		else:
			response_data['message'] = "Your account has been disabled!"
			response_data['result'] = 'failed'
			response_data['id'] = "-1"
	else:
		response_data['message'] = "Your username or password were incorrect."
		response_data['result'] = 'failed'
		response_data['id'] = "-2"


	return HttpResponse(simplejson.dumps(response_data), mimetype="application/json")

def um_user(request):
	response_data = {
		"message" : "",
		"result" : "",
		"id" : "",
	}
	if request.user.is_authenticated():
		response_data['message'] = request.user.username
		response_data['result'] = 'success'
		response_data['id'] = "0"
	else:
		response_data['message'] = "sorry, you are not logged in"
		response_data['result'] = 'failed'
		response_data['id'] = "-1"

	return HttpResponse(simplejson.dumps(response_data), mimetype="application/json")

def um_logout(request):
	response_data = {
		"message" : "Successfully logged out!",
		"result" : "success",
		"id" : "0",
	}
	logout(request)
	return HttpResponse(simplejson.dumps(response_data), mimetype="application/json")