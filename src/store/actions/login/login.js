import axiosClient from '../../../axios';

export function login({commit, state}, user) {
    state.spinner.loading = true;
    return axiosClient.post('/login', user)
        .then(({data}) => {
            commit('setUser', data.user);
            commit('setToken', data.token);
            return data;
        })
        .catch(({response}) => response)
        .finally(() => state.spinner.loading = false);
}

export function logout({commit}) {
    return axiosClient.post('/logout')
        .then(response => {
            commit('setUser', {});
            commit('setToken', null);
            return response;
        });
}

