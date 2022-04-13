const store = {
    setLocalStorage(menu){
        localStorage.setItem("menu", JSON.stringify(menu));
        //localSorage에는 문자열로만 저장할 수 있기 때문에 menu 같은 객체를 JSON.stringify 매소드를 통해 문자열로 변경하여 저장.
    },
    getLocalStorage(){
        return JSON.parse(localStorage.getItem("menu"));
    },
};

export default store;