import axios from 'axios';


const host = 'http://127.0.0.1:8000/api/v1';
const config = {
    headers:{
        'Accept': 'Application/json'
    }
};

const FrameworkService = {
    get: async function(url, auth = true) {
        if(auth) {
            config.headers['Authorization'] = 'Bearer 1|kSCT8ehctbSEn9yY8mH6M2P4eAxR1uFT8KlxUpad'
        }

        return await axios.get(host + url, config)
        .then(function (response) {
            return response;
        })
        .catch(function (e) {
            return e;
        });
    },

    post: async function(url, body = [], auth = true) {
        if(auth) {
            config.headers['Authorization'] = 'Bearer 1|kSCT8ehctbSEn9yY8mH6M2P4eAxR1uFT8KlxUpad'
        }

        return  await axios.post(host + url, body, config)
        .then(function (response) {
            return response;
        })
        .catch(function (e) {
            return e;
        });
    }
};

export default FrameworkService;
