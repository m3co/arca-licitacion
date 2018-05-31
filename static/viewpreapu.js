'use strict';
(() => {
  const defaultRow = {};
  const validations = {
    ContractorId: { required: true },
    preAPU_cost: { required: true },
    preAPU_duration: { required: true }
  };
  const fields = [
    {
      key: 'id',
      readonly: true
    }, {
      key: 'description',
      readonly: true
    }, {
      key: 'qop',
      readonly: true
    }, {
      key: 'preAPU_qop',
      readonly: true
    }, {
      key: 'unit',
      readonly: true
    }, {
      name: 'preAPU_cost',
      type: 'number'
    }, {
      name: 'preAPU_duration',
      type: 'number'
    }, {
      key: 'calculated',
      call: selection => {
        selection.text(d => {
          return d.preAPU_cost * d.preAPU_qop;
        });
      }
    }
  ];
  const header = ['', 'Descripcion', 'Cant', '_Cant', 'Unidad', 'Costo', 'Duracion', 'Parcial', '-'];
  const actions = [{
    select: 'button.delete',
    setup: (selection => selection
      .text('-')
      .classed('delete', true)
      .on('click', d => {
        client.emit('data', {
          query: 'delete',
          module: 'fnpreAPU',
          id: d.id,
          idkey: 'id'
        });
      })
  )}];

  window.viewpreapu = setupTable({
    module: 'fnpreAPU',
    header: header, actions: actions,
    fields: fields, idkey: 'id', validations: validations,
    defaultRow: defaultRow, filter: { key: 'table', value: 'fnpreAPU' },
    preventNewEntry: true, insertInsteadOfUpdate: true
  });
})();
