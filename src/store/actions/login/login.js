import axiosClient from '../../../axios';
import store from '../../../store';

export function login({commit, state}, user) {
    state.spinner.loading = true;
    return axiosClient.post('/login', user)
        .then(({data}) => {
            commit('setUser', data.user);
            commit('setToken', data.token);
            return data;
        })
        .catch(({response}) => {
            store.commit('showToast', {
                message: response.data.message,
                type: 'error'
            });
        })
        .finally(() => state.spinner.loading = false);
}

export function logout({commit, state}) {
    state.spinner.loading = true;
    return axiosClient.post('/logout')
        .then(response => {
            commit('setUser', {});
            commit('setToken', null);
            return response;
        })
        .finally(() => state.spinner.loading = false);
}

