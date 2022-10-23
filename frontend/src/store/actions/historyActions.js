import history from "../../history";

export const historyPush = payload => {
    console.log('history push')
    return () => {
        history.push(payload);
    }
};

export const historyReplace = payload => {
    return () => {
        history.replace(payload);
    }
};