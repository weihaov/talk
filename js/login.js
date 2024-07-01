const loginValidator = new FieldValidator('txtLoginId', async function (val) {
    if (!val) {
        return '账号不能为空';
    }
})

const pwdValidator = new FieldValidator('txtLoginPwd', function (val) {
    if (!val) {
        return '密码不能为空';
    }
})

const form = $('.user-form');
form.onsubmit = async function (e) {
    e.preventDefault();
    const result = await FieldValidator.validate(loginValidator, pwdValidator);
    if (!result) {
        return;
    }
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const resp = await API.login(data);
    if (resp.code) {
        alert(resp.msg);
    } else {
        alert('登陆成功');
        location.href = './index.html'
    }
}

