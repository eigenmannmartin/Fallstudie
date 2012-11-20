#API
from tastypie.resources import ModelResource
from tastypie import fields, api
from tastypie.cache import SimpleCache
from tastypie.throttle import CacheDBThrottle
# Auth
from tastypie.authentication import Authentication
from tastypie.authorization import DjangoAuthorization
from django.contrib.auth.models import User
#Var
from SyncedList.models import *



class EimAuthentication(Authentication):
    def is_authenticated(self, request, **kwargs):
        if request.user.is_authenticated():
          return True

        return False

    # Optional but recommended
    def get_identifier(self, request):
        return request.user.username



# not used anymore
class UserResource(ModelResource):
	class Meta:
		queryset = User.objects.all()
		resource_name = 'user'
		fields = ['username', 'first_name', 'last_name']
		allowed_methods = ['get']


	
class EntryResource(ModelResource):
	def determine_format(self, request):
		return "application/json" 

	def apply_authorization_limits(self, request, object_list):
		return object_list.filter(entry_list__list_read=request.user) | object_list.filter(entry_list__list_write=request.user) |object_list.filter(entry_list__list_owner=request.user) 

	class Meta:
		queryset = ListEntry.objects.all().distinct()
		authentication = EimAuthentication()
		#authorization = DjangoAuthorization()
		cache = SimpleCache()
		resource_name = 'Entry'




		
class ListResource(ModelResource):
	def determine_format(self, request):
		return "application/json" 
	
	def apply_authorization_limits(self, request, object_list):
		return object_list.filter(list_read=request.user) | object_list.filter(list_write=request.user) | object_list.filter(list_owner=request.user)

	def is_autenticated(self,request):
		return request.is_autenticated()

	list_entry = fields.ToManyField(EntryResource, 'list_entry')
	def prepend_urls(self):
		return [
			url(r"^(?P<resource_name>%s)/(?P<pk>\w[\w/-]*)/entry%s$" % (self._meta.resource_name, trailing_slash()), self.wrap_view('get_entry'), name="api_get_entry"),
 		]

 	def get_entry(self, request, **kwargs):
		try:
			obj = self.cached_obj_get(request=request, **self.remove_api_resource_names(kwargs))
		except ObjectDoesNotExist:
			return HttpGone()
		except MultipleObjectsReturned:
			return HttpMultipleChoices("More than one resource is found at this URI.")

		child_resource = ChildResource()
		return child_resource.get_detail(request, parent_id=obj.pk)

	class Meta:
		queryset = List.objects.all().distinct()
		authentication = EimAuthentication()
		#authorization = DjangoAuthorization()
		cache = SimpleCache()
		resource_name = 'List'
		limit = 2000
				


