const loginValidator = new FieldValidator('txtLoginId', async function (val) {
    if (!val) {
        return '账号不能为空';
    }
    const resp = await API.exists(val);
    if (resp.data) {
        return '账号已存在';
    }
})

const nickValidator = new FieldValidator('txtNickname', function (val) {
    if (!val) {
        return '昵称不能为空';
    }
})

const pwdValidator = new FieldValidator('txtLoginPwd', function (val) {
    if (!val) {
        return '密码不能为空';
    }
})

const pwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm', function (val) {
    if (!val) {
        return '确认密码不能为空';
    }
    if (val !== pwdValidator.input.value) {
        return '确认密码不一致'
    }
})

const form = $('.user-form');
form.onsubmit = async function (e) {
    e.preventDefault();
    const result = await FieldValidator.validate(loginValidator, nickValidator, pwdValidator, pwdConfirmValidator);
    if (!result) {
        return;
    }
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const resp = await API.reg(data);
    if (!resp.code) {
        alert('注册成功');
        location.href = './login.html'
    }
}

