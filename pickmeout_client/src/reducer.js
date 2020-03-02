const reducer = (state, action) => {
    // 상태가 비어있을 때 초기화
    if(state === undefined){
        return ({
            page_status : "not_logined",
        });
    }

    switch(action.type){
        case "not_logined":
            return { page_status: "not_logined" };

        case "logined":
            return { page_status: "logined" };

        case "user_info":
            return { page_status: "user_info" };
            
        default:
            return state;
    }
}

export default reducer;