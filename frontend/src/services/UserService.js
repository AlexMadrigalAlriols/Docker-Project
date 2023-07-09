import FrameworkService from "./FrameworkService.js";

const UserService = {
    login: async function(body) {
        return await FrameworkService.post('/login', body, false).then((res) => {
            return (res && res.status === 200 && res.data.data ? res.data.data : null);
        })
        .catch(function (e) {
            return null;
        });
    }
};

export default UserService;
