const { Client } = require('pg');
const config = require('./config.json');
const DBandNAMES = [{db:'regulatory_authority', name:'BASA'},
                    {db:'airport', name:'Sofia Air'},
                    {db:'city', name:'Sofia'},
                    {db:'country', name:'Bulgaria'}];

function cleanDB(arr, config){
    if(arr.length === 0) return;
    let client = new Client(config);
    client.connect()
          .catch(e => console.error('connection error', e.stack));
    client.query(`DELETE FROM refdata.${arr[0].db}
                  WHERE name='${arr[0].name}'`)
            .catch(err=> console.log(err))
            .then(() => {client.end();
                         return cleanDB(arr.slice(1), config)
                });
};
cleanDB(DBandNAMES, config);
