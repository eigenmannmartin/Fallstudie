Ext.define('SyncLists.controller.ListItemsVC', {
	extend: 'Ext.app.Controller',
	xtype: 'ListItemsVC',
	config: {
		refs: {
			navView: "navView",
			listView: "ListItemsView list"
		},
		control: {
			listView: {
				itemtap: 'showListItems'
			},
			'button[action=syncThisList]':{tap: 'sync'},
			'button[action=addItem]':{tap: 'add'}
		}
	},

	offlineStore: Ext.getStore('ListItem-offline'),
	currentList: null,

	launch: function(app) {
		
	},
	sync: function() {
		console.log('sync!', this.currentList);
	},
	add: function() {
		var vc = this;
		Ext.Msg.prompt('New Item', 'Please enter the items name:', 
			function(buttonId, value) {
				if (buttonId == 'ok') {
					var item = Ext.create('SyncLists.model.ListItem',
							{name: value});
					//item.setSyncedList(vc.currentList.id); // doesnt work, however its in the docs exactly like this
					item.set('syncedlist_id',vc.currentList.id);
					item.save();
					vc.offlineStore.load();
				}
		});
	},
	showListItems: function(list, index, element, record){
		console.log('tap!', arguments);
		element.down('input[type=checkbox]').dom.checked = !record.data.checked;
		record.set('checked',!record.data.checked);
		record.save();

	}
});