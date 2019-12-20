var ItemAppModel = {
  model: function () {
    let modelFields = {
      name: {
        label: 'Menu name',
        value: '',
        validators: [
            { compare: 'required', message: 'Require message' }
        ]
      },
      subName: {
        label: 'Sub name',
        value: '',
        validators: []
      },
      slug: {
        label: 'Menu slug',
        value: '',
        validators: []
      },
      parentId: {
        value: '',
        validators: []
      },
      iconClass: {
        label: 'Icon class',
        value: '',
        validators: []
      },
      iconPath: {
        label: 'Icon path',
        value: '',
        validators: []
      },
      target: {
        label: 'Target',
        value: '',
        validators: []
      },
      standarUrl: {
        label: 'Standar url',
        value: '',
        validators: []
      },
      customUrl: {
        label: 'Custom url',
        value: '',
        validators: []
      },
      objectType: {
        label: 'Object type',
        value: '',
        validators: []
      },
      groupMenu: {
        label: 'Group menu',
        value: '',
        validators: []
      }
    }
    return modelFields
  },
  validations: function(){
    
  }
}

module.exports = ItemAppModel
