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