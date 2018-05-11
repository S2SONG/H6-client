export const validation = {};

validation.checkNickNameLength = (userNickName) => {
    if (0 < userNickName.length && userNickName.length < 2)
        return false;
    else
        return true;
};

validation.checkIdLength = (userId) => {
    if (0 < userId.length && userId.length < 6)
        return false;
    else
        return true;
};

validation.checkEmail = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email))
        return true;
    else
        return false;
};

validation.checkPassLength = (pass) => {
    let reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (reg.test(pass))
        return true;
    else
        return false;
};

validation.checkPassCompare = (pass, passRe) => {
    if (pass === passRe)
        return true;
    else
        return false;
};