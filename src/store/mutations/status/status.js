export function setStatus(state, allStatus) {
    state.status.data = allStatus;

    const statusCounts = {
        'Fazer': 0,
        'Em progresso': 0,
        'Feito': 0,
        'Cancelado': 0,
    };

    state.tasks.data.forEach(task => {
        const statusType = task.status.type;
        if (statusType in statusCounts) {
            statusCounts[statusType] += 1;
        } else {
            console.warn(`Unknown task status: ${statusType}`);
        }
    });

    state.status.data.forEach(status => {
        status.amountToDo = statusCounts["Fazer"];
        status.amountInProgress = statusCounts["Em progresso"];
        status.amountDone = statusCounts["Feito"];
        status.amountCanceled = statusCounts["Cancelado"];
        status.isCheck = false;
    });  
}