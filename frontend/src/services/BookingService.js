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
            return res && res.status === 200 && res.data ? res.data : null;
        })
        .catch(function (e) {
            return null;
        });
    },
    create: async function(body) {
        return await FrameworkService.post('/booking', body).then((res) => {
            return (res && res.status === 200 && res.data.data ? res.data.data : null);
        })
        .catch(function (e) {
            return null;
        });
    },
    edit: async function(booking_id, body) {
        return await FrameworkService.put('/booking/' + booking_id, body).then((res) => {
            return (res && res.status === 200 && res.data ? res.data : null);
        })
        .catch(function (e) {
            return null;
        });
    }
};

export default BookingService;
