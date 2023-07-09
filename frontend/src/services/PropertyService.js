import FrameworkService from "./FrameworkService.js";

const PropertyService = {
    list: async function() {
        return await FrameworkService.post('/properties/list', []).then((res) => {
            return (res && res.status === 200 && res.data ? res.data : []);
        })
        .catch(function (e) {
            return [];
        });
    }
};

export default PropertyService;
