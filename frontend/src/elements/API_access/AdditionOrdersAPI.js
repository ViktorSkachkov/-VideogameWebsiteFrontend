import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/additionOrders'
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
}