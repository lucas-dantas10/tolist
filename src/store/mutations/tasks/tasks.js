export function setTasks(state, [loading, data = null]) {
    if (data) {
        state.tasks = {
            ...state.tasks,
            data: data.data,
            links: data.meta?.links,
            page: data.meta.current_page,
            limit: data.meta.per_page,
            from: data.meta.from,
            to: data.meta.to,
            total: data.meta.total,
        };
    }

    state.tasks.loading = loading;
}