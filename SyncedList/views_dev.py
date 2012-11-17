# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.contrib.auth import authenticate, login, logout



def dev_login(request):

	user = authenticate(username='admin', password='admin')
	if user is not None:
	    if user.is_active:
	    	login(request, user)
	        out="You provided a correct username and password!"
	    else:
	        out="Your account has been disabled!"
	else:
	    out="Your username and password were incorrect."


	return HttpResponse(out)

def dev_user(request):
	if request.user.is_authenticated():
		out = request.user.username
	else:
		out = "sorry, you are not logged in"
	return HttpResponse(out)

def dev_logout(request):
	logout(request)
	return HttpResponse("Successfully logged out")