/*
Copyright(c) 2012 Company Name
*/
Ext.define('SyncLists.model.SyncedList', {
    extend: 'Ext.data.Model',

    config: {
			fields: [
					{name: 'name', type: 'string'},
					//{name: 'id', type: 'string'}
				],
			//identifier : 'uuid',
			identifier: 'sequential',
			proxy: {
				type: 'localstorage',
				id: 'SyncedLists'
			}
    }
});

SyncLists.model.SyncedList.offlineStore = Ext.create('Ext.data.Store', {
    model: 'SyncLists.model.SyncedList',
	storeId: 'SyncedList-offline',
	autoLoad: true,
	//autoSync: true,
	// sorters: [{
	// 	property: 'expiry_date',
	// 	direction: 'DESC'
	// }],
});

Ext.define('SyncLists.model.ListItem', {
    extend: 'Ext.data.Model',

    config: {
			fields: [
					{name: 'name', type: 'string'},
					{name: 'syncedlist_id', type: 'string'},
					{name: 'checked', type: 'boolean', defaultValue:false}
				],
			associations: [{ type: 'belongsTo', model: 'SyncedList' }],
			//identifier : 'uuid',
			identifier: 'sequential',

			proxy: {
				type: 'localstorage',
				id: 'ListItems'
			}
    }
});

SyncLists.model.SyncedList.offlineStore = Ext.create('Ext.data.Store', {
    model: 'SyncLists.model.ListItem',
	storeId: 'ListItem-offline',
	autoLoad: true,
	sorters: [
		{
			property: 'checked',
			direction: 'ASC'
		},
		{
			property: 'name',
			direction: 'ASC'
		}
	]
});

Ext.define('SyncLists.view.NavigationView', {
	extend: 'Ext.navigation.View',
	xtype:'NavigationView',
	config:{
		navigationBar:{
			//androidAnimation:true,
			docked:'top'
		}
	},
	rightButton: {
		xtype:'button',
		iconMask: true,
		iconCls: 'refresh',
		align:'right',
		action:'refresh'
	},
	leftButton: {
		xtype:'button',
		iconMask: true,
		iconCls: 'info',
		ui:'plain',
		align:'left',
		action:'showInfo'
	},
	initialize: function () {
		this.callParent(arguments);
		this.addBeforeListener('activeitemchange', this.updateViewButtons );
		this.updateViewButtons(this,this.getActiveItem());
	},
	updateViewButtons: function(navView, newView, oldView, opt){
		//console.log(navView,'new',newView,'old',oldView,opt,newView.hasParent());
		var navigationBar = this.getNavigationBar();

		if (!newView) return;
		
		if (navigationBar) {
			navigationBar.rightBox.removeAll();
			//navigationBar.leftBox.removeAll();
			for (var i = 0; i < navigationBar.leftBox.items.items.length; i++) {
				var btn = navigationBar.leftBox.items.items[i];
				if (btn._ui != 'back') {
					//console.log('notback',btn);
					navigationBar.leftBox.remove(btn,true);
				}
			}

			var rbtn = newView.config.rightButton;
			if ( rbtn ) navigationBar.add(rbtn);
			var lbtn = newView.config.leftButton;
			if (lbtn) navigationBar.add(lbtn);


		}
	}
});
Ext.define("SyncLists.view.Main", {
    extend: 'SyncLists.view.NavigationView',
    xtype:'navView',
    requires: [
        'Ext.TitleBar'
    ],
    config: {
        items: [
            {
                xtype: 'ListsView'
            }
        ]
    }
});

Ext.define("SyncLists.view.ListsView", {
	extend: 'Ext.Container',
	xtype: 'ListsView',
	requires: ['Ext.dataview.List'],

	config: {
		title:'Lists',
		layout:'fit',
		items: [
			{
				xtype:'list',
				scrollable: true,
				itemTpl: '{name}',
				store: Ext.getStore('SyncedList-offline'),
				listeners: {
				itemtap: function(dv, ix, item, e) {
					// Delay the selection clear
					setTimeout(function(){dv.deselect(ix);},200);
					}
				}
			},
			{
				xtype:'toolbar',
				docked:'bottom',
				layout:{
					pack: 'center'
				},
				items: [
					{
						xtype:'button',
						text:'sync',
						disabled: true,
						action: 'sync'
					}
				]
			}

		],

		rightButton: {
			xtype:'button',
			iconMask: true,
			iconCls: 'add',
			align:'right',
			action:'addList'
		}
		

		
	}
});
Ext.define("SyncLists.view.ListItemsView", {
	extend: 'Ext.Container',
	xtype: 'ListItemsView',
	requires: ['Ext.dataview.List'],

	config: {
		title:'List',
		layout:'fit',
		items: [
			{
				xtype:'list',
				scrollable: true,
				itemTpl: new Ext.XTemplate('<input type="checkbox" <tpl if="checked">checked</tpl> disabled/>{name}'),
				//store: Ext.getStore('ListItem-offline'),
				listeners: {
				itemtap: function(dv, ix, item, e) {
					// Delay the selection clear
					setTimeout(function(){dv.deselect(ix);},100);
					}
				}
			},
			{
				xtype:'toolbar',
				docked:'bottom',
				// layout:{
				// 	pack: 'center'
				// },
				items: [
					{
						xtype:'button',
						disabled: true,
						text:'sort',
						action: 'sort'
					},
					{
						xtype:'button',
						disabled: true,
						text:'sync',
						action: 'syncThisList'
					},
					{
						xtype:'button',
						disabled: true,
						text:'share',
						action: 'share',
						align: 'right'
					}
				]
			}

		],

		rightButton: {
			xtype:'button',
			iconMask: true,
			iconCls: 'add',
			align:'right',
			action:'addItem'
		}
		

		
	}
});
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


