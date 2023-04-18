import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/gameOrders'
});

let accessToken = localStorage.getItem("accessToken");
if(accessToken != "undefined") {
    accessToken = JSON.parse(localStorage.getItem("accessToken"));
}

export const GameOrdersAPI = {
    create: function(gameOrder, token) {
        return axiosInstance.request({
            method: "POST",
            url: ``,
            data: gameOrder,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    getById: function(gameOrderId, token) {
        return axiosInstance.request({
            method: "GET",
            url: `/getByUser/${gameOrderId}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    getByUser: function(userId, token) {
        return axiosInstance.request({
            method: "GET",
            url: `/getByUser/${userId}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
}