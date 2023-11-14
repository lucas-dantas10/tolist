import axiosClient from '../../../axios';

export function getCurrentUser({commit}) {
    return axiosClient.get('/current-user')
        .then(({data}) => commit('setUser', data));
}