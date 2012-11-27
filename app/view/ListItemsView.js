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