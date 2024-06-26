import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8090/additions'
});

let accessToken = localStorage.getItem("accessToken");
if(accessToken != "undefined") {
    accessToken = JSON.parse(localStorage.getItem("accessToken"));
}

export const AdditionsAPI = {
    getAll: function(token) {
        return axiosInstance.request({
            method: "GET",
            url: ``,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    getById: function(additionId, token) {
        return axiosInstance.request({
            method: "GET",
            url: `/${additionId}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    getByGame: function(additionId) {
        return axiosInstance.request({
            method: "GET",
            url: `/getByGame/${additionId}`,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        });
    },
    create: function(addition, token) {
        return axiosInstance.request({
            method: "POST",
            url: ``,
            data: addition,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    update: function(addition, token) {
        return axiosInstance.request({
            method: "PUT",
            url: ``,
            data: addition,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    delete: function(additionId, token) {
        return axiosInstance.request({
            method: "DELETE",
            url: `/${additionId}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    validate: function(name, token) {
        return axiosInstance.request({
            method: "GET",
            url: `/validate/${name}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
}