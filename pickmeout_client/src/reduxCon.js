// 리덕스 상태를 컴포넌트 속성에 매핑
const mapStateToProps = (state) => {
    return {
        pageValue: state.page_status,
    };
}

// 리덕스 액션을 컴포넌트 속성에 매핑
const mapDispatchToProps = (dispatch) => {
    return {
        notLogined: () => { return dispatch({ type: "not_logined" }); },
        logined:    () => { return dispatch({ type: "logined" }); },
        userinfo:   () => { return dispatch({ type: "user_info" }); },
    };
}

export { mapStateToProps, mapDispatchToProps };