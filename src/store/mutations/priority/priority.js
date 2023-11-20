export function setPriority(state, priorities) {
    state.priority.data = priorities;
    state.priority.data.forEach(priority => priority.isCheck = false);
}