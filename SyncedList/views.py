#
# since:		version 0.1
# creator:		Martin Eigenmann
# 
# details:		undefined views - remarked to delete 
#


from django.http import HttpResponse

def index(request):
	return HttpResponse("Hi")