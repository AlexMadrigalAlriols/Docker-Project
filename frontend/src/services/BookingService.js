import FrameworkService from "./FrameworkService.js";

const BookingService = {
    list: async function() {
        await FrameworkService.post('/booking/list', []).then((res) => {
            return res && res.status === 200 && res.data ? res.data : [];
        })
        .catch(function (e) {
            return [];
        });
    }
};

export default BookingService;
