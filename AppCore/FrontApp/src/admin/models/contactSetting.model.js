var ItemAppModel = {
  model: function () {
    let modelFields = {
      companyName: {
        label: 'Company name',
        value: '',
        validators: []
      },
      companyAddress: {
        label: 'Company address',
        value: '',
        validators: []
      },
      companyHotline: {
        label: 'Company hotline',
        value: '',
        validators: []
      },
      companyPhone: {
        label: 'Company phone',
        value: '',
        validators: []
      },
      companyEmail: {
        label: 'Company email',
        value: '',
        validators: []
      },
      zaloMessage: {
        label: 'Zalo number',
        value: '',
        validators: []
      },
      phoneMessage: {
        label: 'Phone number message',
        value: '',
        validators: []
      },
      facebookMessage: {
        label: 'Faceboo me',
        value: '',
        validators: []
      }
    }
    return modelFields
  }
}

module.exports = ItemAppModel
