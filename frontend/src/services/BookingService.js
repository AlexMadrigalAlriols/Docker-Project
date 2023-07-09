import FrameworkService from "./FrameworkService.js";

const BookingService = {
    list: async function() {
        return await FrameworkService.post('/booking/list', {user_id: localStorage.getItem("user_id")}).then((res) => {
            return res && res.status === 200 && res.data ? res.data : [];
        })
        .catch(function (e) {
            return [];
        });
    },
    deleteOne: async function(booking_id) {
        return await FrameworkService.delete('/booking/' + booking_id).then((res) => {
            return res && res.status === 200 ? true : false;
        })
        .catch(function (e) {
            return false;
        });
    }
};

export default BookingService;
