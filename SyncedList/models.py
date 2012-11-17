# general
from django.db import models
from django.contrib.auth.models import User
# Var
from datetime import datetime
#from django.db.models import Q


class ListEntry(models.Model):
	entry_description = models.CharField(max_length=200)
	entry_content = models.CharField(max_length=2000)
	entry_state = models.BooleanField()
	entry_erased = models.BooleanField()
	entry_title = models.CharField(max_length=80)
	entry_expiration = models.DateTimeField()
	# creator - just for fun
	create_date = models.DateTimeField(default=datetime.now())
	create_user = models.ForeignKey(User, related_name="create_user") 

	def __unicode__(self):
		return self.entry_title



class List(models.Model):
	list_name = models.CharField(max_length=40)
	# allowed to edit the list
	list_write = models.ManyToManyField(User, related_name="list_write")
	list_owner = models.ManyToManyField(User, related_name="list_owner") 
	# allowed to view the list
	list_read = models.ManyToManyField(User, related_name="list_read")
	# creator - just for fun
	create_date = models.DateTimeField(default=datetime.now())
	create_user = models.ForeignKey(User) 

	list_entry = models.ManyToManyField('ListEntry', related_name="entry_list")

	def __unicode__(self):
		return self.list_name
	

class ListEntrySync(models.Model):
	sync_listentry = models.ForeignKey('ListEntry')
	sync_date = models.DateTimeField(default=datetime.now())
	sync_user = models.ForeignKey(User, related_name="sync_user")



    