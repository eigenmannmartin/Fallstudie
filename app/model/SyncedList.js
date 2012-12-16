Ext.define('SyncLists.model.SyncedList', {
    extend: 'Ext.data.Model',

    config: {
			fields: [
					{name: 'list_name', type: 'string'},
					//{name: 'id', type: 'string'}
				],
			//identifier : 'uuid',
			identifier: 'sequential',
			proxy: {
				type: 'rest',
				url : 'http://localhost:8000/api/SL/List',
				//headers: {'Cookie': 'sessionid=bbaa69fc7a93377e2f06095467d3be27'},
				reader: {
					type: 'json',
					rootProperty: 'objects'
				}
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
