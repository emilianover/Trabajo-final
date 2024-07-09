import Cookies from 'universal-cookie';

function createCookies (id, adress, tel, userName, name, lastName, rol) {
    const cookies = new Cookies();
const oneHour = 60*60;
cookies.set('id', id, [{path: "/"},{ maxAge: oneHour}]);
cookies.set('adress', adress, [{path: "/"},{ maxAge: oneHour}]);
cookies.set('tel', tel, [{path: "/"},{ maxAge: oneHour}]);
cookies.set('userName', userName , [{path: "/"},{ maxAge: oneHour}]);
cookies.set('name', name, [{path: "/"},{ maxAge: oneHour}]);
cookies.set('lastName', lastName, [{path: "/"},{ maxAge: oneHour}]);
cookies.set('rol', rol, [{path: "/"},{ maxAge: oneHour}]);


}

function getUser() {
    const cookies = new Cookies();
    const userCookies = {
        id: cookies.get('id'),
        adress: cookies.get('adress'),
        tel: cookies.get('tel'),
        userName: cookies.get('userName'),
        name: cookies.get('name'),
        lastName: cookies.get('lastName'),
        rol: cookies.get('rol')
    }

    return userCookies
}

function deleteCookies () {
    const cookies = new Cookies ();
    const cookieNames = ['id', 'adress', 'tel', 'userName', 'name', 'lastName', 'rol']

    cookieNames.forEach(cookieName => {
        cookies.remove(cookieName, {path: '/'});
    })

}

export { getUser, createCookies, deleteCookies}

