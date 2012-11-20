# general
from django.db import models
from django.contrib.auth.models import User
# Var
from datetime import datetime


class ListEntry(models.Model):
	entry_title = models.CharField(max_length=80)
	entry_description = models.CharField(max_length=200)
	entry_content = models.CharField(max_length=2000)
	# state = in progress or done
	entry_state = models.BooleanField()
	# we do not delete, just mark them as deleted
	entry_erased = models.BooleanField()
	# to do until
	entry_expiration = models.DateTimeField()
	# creator - just for fun
	create_date = models.DateTimeField(default=datetime.now())
	create_user = models.ForeignKey(User, related_name="create_user") 

	entry_version = models.IntegerField()

	def __unicode__(self):
		return self.entry_title



class List(models.Model):
	list_name = models.CharField(max_length=40)
	# allowed to edit the list
	list_write = models.ManyToManyField(User, related_name="list_write", null=True, blank=True)
	list_owner = models.ManyToManyField(User, related_name="list_owner", null=True, blank=True) 
	# allowed to view the list
	list_read = models.ManyToManyField(User, related_name="list_read", null=True, blank=True)
	# creator - just for fun
	create_date = models.DateTimeField(default=datetime.now())
	create_user = models.ForeignKey(User) 

	list_entry = models.ManyToManyField('ListEntry', related_name="entry_list", null=True, blank=True)

	list_version = models.IntegerField()

	def __unicode__(self):
		return self.list_name
	


    