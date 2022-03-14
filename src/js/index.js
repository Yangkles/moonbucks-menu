/* step1 요구사항 - 돔 조작과 이벤트 핸들링으로 메뉴 관리하기
세부적인 요구 사항에 대해서 명확하게 체크해 놓는 것이 중요함.
TODO 메뉴 추가
- [x] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
- [x] 메뉴의 이름을 입력 받고 확인 버튼을 클릭하면 메뉴를 추가한다.
- [x] 추가되는 메뉴의 아래 마크업은 <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
- [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
- [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
- [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.

TODO 메뉴 수정
- [x] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 이름을 수정하는 모달창(prompt)이 뜬다.
- [x] 모달창에서 신규 메뉴명을 입력 받고, 확인버튼을 누르면 메뉴가 수정된다. 

TODO 메뉴 삭제
- [x] 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌 모달창이 뜬다.
- [x] 확인 버튼을 클릭하면 메뉴가 삭제된다.
- [x] 총 메뉴 갯수를 count하여 상단에 보여준다.*/


const $ = (selector) => document.querySelector(selector)

function App() {
    
    // 총 갯수를 카운트 해주는 용도
    const updateMenuCount = () => {
        const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${menuCount}개`;
    }

    const addMenuName = () => {
        //빈 칸 일때 입력하지 않게 하는 용도
        if($("#espresso-menu-name").value === ""){
            alert("값을 입력해 주세요.");
            return;
        }
        //입력하는 용도
        const espressoMenuName = $("#espresso-menu-name").value;
        const menuItemTemplate = (espressoMenuName) => {
            return `
                <li class="menu-list-item d-flex items-center py-2">
                    <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
                    <button
                        type="button"
                        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                    >
                        수정
                    </button>
                    <button
                        type="button"
                        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                    >
                        삭제
                    </button>
                </li>`;
        }       
        // 입력한 값을 남기는 용도
        // innerHTML 메소드를 사용하면 계속 덧씌워 사용하기 때문에 나열하는 모양새가 아니게 됨.
        // insertAdjacentHTML 메소드를 사용하면 나열할 수 있음
        $("#espresso-menu-list").insertAdjacentHTML("beforeend", menuItemTemplate(espressoMenuName));
        
        //총 갯수를 카운트해주는 용도
        
        updateMenuCount();
        
        //입력 후 초기화 해주는 용도
        
        $("#espresso-menu-name").value = "";
    }

    const editMenuName = (e) => {
        // 수정하기 위한 prompt 창 만들기
        // 위임 기능에 대해서 공부해보기.
        const $menuName = e.target.closest("li").querySelector(".menu-name")
            //closest는 가장 가까운 태그를 찾는 것임
        const updateMenuName = prompt("메뉴명을 수정하세요.", $menuName.innerText);
        $menuName.innerText = updateMenuName
    }

    const removeMenuName = (e) => {
        //confirm 태그는 예를 누르면 true 아니오를 누르면 false가 나오므로 if문에 넣어서 사용할 수 있음.
        if(confirm("정말 삭제하시겠습니까?")){
            e.target.closest("li").remove();
            updateMenuCount();
        }
    }
    
    $("#espresso-menu-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-edit-button")) {
            editMenuName(e);
        }
        
        if(e.target.classList.contains("menu-remove-button")) {
            removeMenuName(e);
        }
    })
    // form 태그가 자동으로 전송되는 걸 막아준다.
    $("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    $("#espresso-menu-submit-button").addEventListener("click", addMenuName)
    
    // 메뉴의 이름을 입력 받는 건
    $("#espresso-menu-name").addEventListener("keypress", (e) => {
        //아무 버튼이나 눌러도 alert가 뜨는 걸 막아줌
        if(e.key !== "Enter"){
            return;
        }
        addMenuName();
    });
}

App();


