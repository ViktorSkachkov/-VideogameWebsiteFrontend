import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/check'
});

export const CheckAPI = {
    check: function(token) {
        return axiosInstance.request({
            method: "GET",
            url: ``,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
}