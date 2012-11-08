from django.db import models
from django.contrib.auth.models import User


class ListEntry(models.Model):
	description = models.CharField(max_lenght=200)
	content = models.CharField(max_lenght=2000)
	state = models.BooleanField()

	user_action = models.ForeignKey('UserAction')
	create_date = models.DateTimeField('date created')
	create_tuser = models.OneToOneField(User)


class List(models.Model):
	list_entries = models.ForeignKey(ListEntry)

	user_action = models.ForeignKey('UserAction')
	create_date = models.DateTimeField('date created')
	create_tuser = models.OneToOneField(User)
	


class UserAction(models.Model):
	change_date = models.DateTimeField('date when changed')
	change_user = models.OneToOneField(User)