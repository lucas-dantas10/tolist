export function setStatus(state, allStatus) {
    state.status.data = allStatus;

    const statusCounts = {
        'Fazer': 0,
        'progresso': 0,
        'Feito': 0,
        'Cancelado': 0,
    };

    setTimeout(() => {
        state.tasks.data.forEach(task => {
            let statusType = task.status.type;
            statusType == 'Em progresso' ? statusType = 'progresso' : '';
            if (statusType in statusCounts) {
                statusCounts[statusType] += 1;
                
            } else {
                console.warn(`Unknown task status: ${statusType}`);
            }
        });
    
        state.status.data.forEach(status => {
            status.amountToDo = statusCounts["Fazer"];
            status.amountInProgress = statusCounts["progresso"];
            status.amountDone = statusCounts["Feito"];
            status.amountCanceled = statusCounts["Cancelado"];
            status.isCheck = false;
        });  
    }, 0);
}