'use strict';
((io) => {
  var client = io();
  function setupOptionCombobox(selection) {
    selection.attr('value', d => d.id)
      .attr('label', d => d.description)
      .each(function(d) {
        this._row = d;
      });
  }

  client.on('connect', () => {
    console.log('connection');
    var ContractorId = location.search.match(/\d+$/);
    client.emit('data', {
      query: 'select',
      module: 'fnpreAPUAAU',
      ProjectId: 2,
      ContractorId: ContractorId ? ContractorId.toString() : 1
    });

    client.emit('data', {
      query: 'select',
      module: 'Contractors'
    });

    client.emit('data', {
      query: 'subscribe',
      module: 'fnpreAPUAAU'
    });

    client.emit('data', {
      query: 'subscribe',
      module: 'fnpreAPU'
    });
  });

  client.on('response', (data) => {
    var query = data.query;
    var row = data.row;
    var action;
    if (row) {
      if (data.module == 'fnpreAPUAAU') {
        if (query == 'select' || query == 'insert') {
          tree.doselect(data.row);
        } else if (query == 'update') {
          tree.doselect(data.row);
        } else if (query == 'delete') {
          data.row.description = null;
          data.row.id = null;
          data.row.parent = null;
          tree.doselect(data.row);
        } else {
          console.log('sin procesar fnpreAPUAAU', data);
        }
      } else if (data.module == 'Contractors') {
        contractor.doselect(row);
      } else if (data.module == 'fnpreAPU') {
        action = viewpreapu[`do${query}`];
        if (action) { action(row); }
        else {
          console.log('sin procesar fnpreAPU', data);
        }
      } else {
        console.log('sin procesar row', data);
      }
    } else {
      console.log('sin procesar', data);
    }
  });

  window.client = client;
})(io);
