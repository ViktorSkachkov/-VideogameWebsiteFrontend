import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8090/additionOrders'
});

let accessToken = localStorage.getItem("accessToken");
if(accessToken != "undefined") {
    accessToken = JSON.parse(localStorage.getItem("accessToken"));
}

export const AdditionOrdersAPI = {
    create: function(additionOrder, token) {
        return axiosInstance.request({
            method: "POST",
            url: ``,
            data: additionOrder,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    getById: function(additionOrderId, token) {
        return axiosInstance.request({
            method: "GET",
            url: `/${additionOrderId}`,
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
    getAdditionCartItems: function(id, token) {
        return axiosInstance.request({
            method: "GET",
            url: `/cart/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    increaseAdditionOrderUnits: function(id, token) {
        return axiosInstance.request({
            method: "PUT",
            url: `/increase/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    decreaseAdditionOrderUnits: function(id, token) {
        return axiosInstance.request({
            method: "PUT",
            url: `/decrease/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    confirmAdditionOrders: function(id, token) {
        return axiosInstance.request({
            method: "PUT",
            url: `/${id}`,
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
    },
}