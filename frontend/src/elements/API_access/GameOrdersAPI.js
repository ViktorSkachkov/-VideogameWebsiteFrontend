import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8090/gameOrders'
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
            url: `/${gameOrderId}`,
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
    getRanking: function(id, token) {
        return axiosInstance.request({
            method: "GET",
            url: `/ranked/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    getGameCartItems: function(id, token) {
        return axiosInstance.request({
            method: "GET",
            url: `/cart/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    confirmGameOrders: function(id, token) {
        return axiosInstance.request({
            method: "PUT",
            url: `/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    increaseGameOrderUnits: function(id, token) {
        return axiosInstance.request({
            method: "PUT",
            url: `/increase/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    decreaseGameOrderUnits: function(id, token) {
        return axiosInstance.request({
            method: "PUT",
            url: `/decrease/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    delete: function(id, token) {
        return axiosInstance.request({
            method: "DELETE",
            url: `/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    }
}