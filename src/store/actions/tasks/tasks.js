import axiosClient from '../../../axios';

export function getTasks({commit}) {
    return axiosClient.get('/task')
        .then(({data}) => {
            commit('setTasks', data.tasks);
        })

}