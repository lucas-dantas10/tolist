import store from '../..';
import axiosClient from '../../../axios';

export function getTasks({commit, state}, { url = null, search = '', per_page = 10, sort_field = 'title', sort_direction = 'asc', status, priority } = {}) {
    commit('setTasks', [true]);
    state.spinner.loading = true;
    url = url || '/task';
    per_page = Number(per_page);
    return axiosClient.get(url, {
        params: {
            search, sort_field, sort_direction, per_page, status, priority,
        }
    })
        .then(({data}) => {
            commit('setTasks', [false, data]);
            state.spinner.loading = false;
        });

}

export function storeTask({commit}, task) {
    return axiosClient.post('/task', task)
        .then(({data}) => {
            // console.log(data);
            // commit('setTasks', data.tasks);
            commit('showToast', {
                message: data.message,
                type: 'success'
            });
        })
}

export function updateTask({commit}, task) {
    commit('setTasks', [true]);
    return axiosClient.put(`/task/${task.id}`, task)
        .finally(() => commit('setTasks', [false]));
}

export function deleteTask({commit}, idTask) {
    return axiosClient.delete(`/task/${idTask}`)
        .then(({data}) => {
            store.commit('showToast', {
                message: data.message,
                type: 'success'
            });
        });
}