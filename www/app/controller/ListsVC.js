Ext.define('SyncLists.controller.ListsVC', {
	extend: 'Ext.app.Controller',
	//requires: 'ChicApp.view.CouponDetailView',
	config: {
		refs: {
			navView: "navView",
			listView: "ListsView list"
		},
		control: {
			listView: {
				itemtap: 'showListItems'
			},
			'button[action=sync]':{tap: 'sync'},
			'button[action=addList]':{tap: 'add'}
		}
	},

	offlineStore: Ext.getStore('SyncedList-offline'),
	itemsVC: null,

	launch: function(app) {
		//this.offlineStore.load();

		this.itemsVC = this.getApplication().getController('ListItemsVC');
	},
	sync: function() {
		console.log('sync!');
	},
	add: function() {
		var vc = this;
		Ext.Msg.prompt('New List', 'Please enter the lists name:', 
			function(buttonId, value) {
				if (buttonId == 'ok') {
					var list = Ext.create('SyncLists.model.SyncedList',{name: value});
					list.save();
					vc.offlineStore.load();
				}
		});
	},
	showListItems: function(list, index, element, record){
		//console.log('tap!');
		var listItemsView = Ext.create('SyncLists.view.ListItemsView',{record: record, title: record.get('name')});
		this.itemsVC.currentList = record;
		var offlineStore = Ext.getStore('ListItem-offline');
		offlineStore.setFilters([
			new Ext.util.Filter({
				property: 'syncedlist_id',
				value   : record.id
			})
		]);
		listItemsView.down('list').setStore(offlineStore );
		//this.getApplication().getController('ListItemsVC').currentList = record;
		this.getNavView().push(listItemsView);
	}
});