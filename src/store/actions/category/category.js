import axiosClient from '../../../axios';

export function getCategories({commit}) {
    return axiosClient.get('/category')
        .then(({data}) => commit('setCategory', data.data));
}

export function storeCategory({commit, state}, category) {
    return axiosClient.post('/category', category)
        .then(({data}) => {
            state.category.data.push(data.category);

            commit('showToast', {
                message: data.message,
                type: 'success'
            });
        });
}