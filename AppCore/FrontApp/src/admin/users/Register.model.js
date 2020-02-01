var ItemAppModel = {
  getKey: function(){
    return 'Register-Model'
  },
  model: function () {
    let modelFields = {
      fullName: {
        label: 'Full name',
        value: null,
        validators: []
      },
      phone: {
        label: 'Phone',
        value: null,
        validators: []
      },
      email: {
        label: 'Email',
        value: null,
        validators: []
      },
      password: {
        label: 'Password',
        value: null,
        validators: []
      },
      rePassword: {
        label: 'Re Password',
        value: null,
        validators: []
      }

    }
    return modelFields
  },
  validations: function(){
    
  }
}

module.exports = ItemAppModel
