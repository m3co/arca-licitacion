'use strict';
(() => {
  const defaultRow = {};
  const validations = {
    'preAPU_cost': { required: true },
    'preAPU_duration': { required: true }
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
    }, 'preAPU_cost', 'preAPU_duration', {
      key: 'calculated',
      call: selection => {
        selection.text(d => {
          return d.preAPU_cost * d.preAPU_qop;
        });
      }
    }
  ];
  const header = ['', 'Descripcion', 'Cant', '_Cant', 'Unidad', 'Costo', 'Duracion', 'Parcial'];
  const actions = [];

  window.viewpreapu = setupTable({
    module: 'viewpreAPU',
    header: header, actions: actions,
    fields: fields, idkey: 'id', validations: validations,
    defaultRow: defaultRow, filter: { key: 'table', value: 'viewpreAPU' },
    preventNewEntry: true
  });
})();
