from django.db import models
from django.contrib.auth.models import User
from tastypie.resources import ModelResource
from tastypie import fields




from django.contrib.auth.models import User
from tastypie.authentication import BasicAuthentication
from tastypie.authorization import DjangoAuthorization
from tastypie.cache import SimpleCache
from tastypie.resources import ModelResource
from tastypie.throttle import CacheDBThrottle


class ListEntry(models.Model):
	""" doc string """
	entry_description = models.CharField(max_length=200)
	entry_content = models.CharField(max_length=2000)
	entry_state = models.BooleanField()
	entry_erased = models.BooleanField()
	entry_title = models.CharField(max_length=80)
	entry_expiration = models.DateTimeField()
	entry_list = models.ForeignKey('List')

	create_date = models.DateTimeField('date created')
	create_user = models.ForeignKey(User) 

	def __unicode__(self):
		return self.entry_title



class List(models.Model):
	list_name = models.CharField(max_length=40)
	#list_owner = models.ForeignKey(User) 
	#list_read = models.ForeignKey(User)
	#list_write = models.ForeignKey(User)
	create_date = models.DateTimeField('date created')
	create_user = models.ForeignKey(User) 
	
class ListEntrySync(models.Model):
	sync_listentry = models.ForeignKey('ListEntry')
	sync_date = models.DateTimeField()
	sync_user = models.ForeignKey(User)


class UserResource(ModelResource):
	class Meta:
		queryset = User.objects.all()
		resource_name = 'user'
		fields = ['username', 'first_name', 'last_name']
        allowed_methods = ['get']


	
class EntryResource(ModelResource):
		

	class Meta:
		queryset = ListEntry.objects.all()
		#authentication = BasicAuthentication()
		#authorization = DjangoAuthorization()
		#cache = SimpleCache()
		resource_name = 'ListEntry'
		
		
    