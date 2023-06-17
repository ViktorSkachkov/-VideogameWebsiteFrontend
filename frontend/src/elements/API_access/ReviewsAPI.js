import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8090/reviews'
});

let accessToken = localStorage.getItem("accessToken");
if(accessToken != "undefined") {
    accessToken = JSON.parse(localStorage.getItem("accessToken"));
}

export const ReviewsAPI = {
    create: function(review, token) {
        return axiosInstance.request({
            method: "POST",
            url: ``,
            data: review,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    update: function(review, token) {
        return axiosInstance.request({
            method: "PUT",
            url: ``,
            data: review,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    delete: function(reviewId, token) {
        return axiosInstance.request({
            method: "DELETE",
            url: `/${reviewId}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    getById: function(itemId, type, token) {
        return axiosInstance.request({
            method: "GET",
            url: `/${itemId}/${type}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
}