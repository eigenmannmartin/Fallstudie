Ext.define('SyncLists.model.ListItem', {
    extend: 'Ext.data.Model',

    config: {
			fields: [
					{name: 'name', type: 'string'},
					{name: 'syncedlist_id', type: 'string'},
					{name: 'checked', type: 'boolean', defaultValue:false}
				],
			associations: [{ type: 'belongsTo', model: 'SyncedList' }],
			identifier : 'uuid',

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
