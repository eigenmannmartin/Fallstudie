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
