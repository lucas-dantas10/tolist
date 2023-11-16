import axiosClient from "../../../axios";

export function getPriority({commit}) {
    return axiosClient.get('/priority')
        .then(({data}) => {
            commit('setPriority', data);
        })
}