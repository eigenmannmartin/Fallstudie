#
# since:		version 0.1
# creator:		Martin Eigenmann
# 
# details:		development views - just for testing
#

from django.core.context_processors import csrf
from django.shortcuts import render_to_response

def index(request):
	c = {}
	c.update(csrf(request))
	return render_to_response("login.html", c)