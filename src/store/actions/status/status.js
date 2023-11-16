import axiosClient from "../../../axios";

export function getStatus({commit}) {
    return axiosClient.get('/status')
        .then(({data}) => commit('setStatus', data));
}