Ext.define("SyncLists.view.ListsView", {
	extend: 'Ext.Container',
	xtype: 'ListsView',
	requires: ['Ext.dataview.List'],

	config: {
		title:'Lists DEV',
		layout:'fit',
		items: [
			{
				xtype:'list',
				scrollable: true,
				itemTpl: '{list_name}',
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
		},
		leftButton: {
			xtype:'button',
			iconMask: true,
			iconCls: 'info',
			ui:'plain',
			align:'left',
			action:'showInfo'
		}

		

		
	},
	infoText: "test"
});