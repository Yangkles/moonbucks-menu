//공부해 보아야 할 점.
// 1. 이벤트 위임에 대해서 공부해볼 것
// 2. 요구사항을 어떻게 전략적으로 접근해야하는지, 단계별로 세세하게 나누는게 중요하다는 걸 알게 됨
// 3. DOM요소를 가져올 때는 $표시를 써서 변수처럼 사용할 수 있다.
// 4. 새롭게 알게 된 메서드 innerText, innerHTML, insertAdjacentHtml, closet, e.target 

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
- [x] 총 메뉴 갯수를 count하여 상단에 보여준다.

step2 요구사항 - 상태 관리로 메뉴 관리하기

TODO localStorage Read $ Write
- [x] localStorage에 데이터를 저장한다. 
    - [x] 메뉴를 추가할 때
    - [x] 메뉴를 수정할 때
    - [x] 메뉴를 삭제할 때
- [x] localStorage에 있는 데이터를 읽어온다.

상태가 왜 중요한 이유?
사용자의 인터렉션을 잘 반영한 앱을 만들기위해
산태값이 잘 저장이 되고 잘 불러와져야 동적인 웹페이지를 만들 수 있음.


TODO 카테고리 별 메뉴판 관리
- [ ] 에스프레소 메뉴판 관리
- [ ] 프라푸치노 메뉴판 관리 
- [ ] 블렌디드 메뉴판 관리 
- [ ] 티바나 메뉴판 관리 
- [ ] 디저트 메뉴판 관리

TODO 페이지 접근시 최초 데이터 Read & Rendering
- [ ] 페이지에 최초로 로딩될때 localStorage에 에스프레소 메뉴를 읽어온다.
- [ ] 에스프레소 메뉴를 페이지에 그려준다.

TODO 품절 상태 관리
- [ ] 품절 상태인 경우를 보여줄 수 있게 sold-out class를 추가하여 상태를 변경한다.
- [ ] 품질 버튼을 추가한다.
- [ ] 품절 버튼을 클릭하면 localStorage에 상태 값이 저장된다.
- [ ] 클릭이벤에서 가장 가까운 li 태그의 class 속성 값에 sold-out을 추가한다.*/

const $ = (selector) => document.querySelector(selector);

//localStorage에 저장 및 읽어오기
const store = {
    setLocalStorage(menu){
        localStorage.setItem("menu", JSON.stringify(menu));
        //localSorage에는 문자열로만 저장할 수 있기 때문에 menu 같은 객체를 JSON.stringify 매소드를 통해 문자열로 변경하여 저장.
    },
    getLocalStorage(){
        return JSON.parse(localStorage.getItem("menu"));
    },
}

function App() {
    //상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가? - 메뉴명
    this.menu = {
        espresso: [],
        frappuccino: [],
        blended: [],
        tevana: [],
        desert: [],
    };//this 메소드로 상태값을 선언
    //지금이 무슨 카테고리인지 알 수 있어야하기 때문에 새로운 상태를 선언
    this.currentCategory = "espresso";
    this.init = () => {
        if(store.getLocalStorage()){
            this.menu = store.getLocalStorage();
        }
        render();
    }

    const render = () => {
        const template = this.menu[this.currentCategory].map((menuItem, index) => {
            //메뉴를 수정하는 것에 있어서 메뉴를 식별하기 위해서 메뉴에 아이디를 부여함. <data-menu-id>
            return`
            <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
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
        })
        .join("");
        //메뉴별로 화면 마크업을 만들기 위해서 map 메소드로 순회하게 만듬.
        //map 메소드는 <li><li>, <li><li>, <li><li> 형태
        
        // 입력한 값을 남기는 용도
        // innerHTML 메소드를 사용하면 계속 덧씌워 사용하기 때문에 나열하는 모양새가 아니게 됨.
        // insertAdjacentHTML 메소드를 사용하면 나열할 수 있음
        $("#menu-list").innerHTML = template;
        
        //총 갯수를 카운트해주는 용도
        updateMenuCount();
    };

    // 총 갯수를 카운트 해주는 용도
    const updateMenuCount = () => {
        const menuCount = $("#menu-list").querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${menuCount}개`;
    }

    const addMenuName = () => {
        //빈 칸 일때 입력하지 않게 하는 용도
        if($("#menu-name").value === ""){
            alert("값을 입력해 주세요.");
            return;
        }
        //입력하는 용도
        const menuName = $("#menu-name").value;
        
        this.menu[this.currentCategory].push({ name: menuName});
        //메뉴를 입력할때 menu로 저장
        store.setLocalStorage(this.menu);
        //동시에 localStorage에 메뉴 저장
        
        render();
        //입력 후 초기화 해주는 용도
        
        $("#menu-name").value = "";
    };

    const editMenuName = (e) => {
        const menuId = e.target.closest("li").dataset.menuId
        // 수정하기 위한 prompt 창 만들기
        // 위임 기능에 대해서 공부해보기.
        const $menuName = e.target.closest("li").querySelector(".menu-name")
            //closest는 가장 가까운 태그를 찾는 것임
        const updateMenuName = prompt("메뉴명을 수정하세요.", $menuName.innerText);
        this.menu[this.currentCategory][menuId].name = updateMenuName;
        store.setLocalStorage(this.menu);
        $menuName.innerText = updateMenuName;
    }

    const removeMenuName = (e) => {
        //confirm 태그는 예를 누르면 true 아니오를 누르면 false가 나오므로 if문에 넣어서 사용할 수 있음.
        if(confirm("정말 삭제하시겠습니까?")){
            const menuId = e.target.closest("li").dataset.menuId
            this.menu[this.currentCategory].splice(menuId, 1);
            store.setLocalStorage(this.menu);
            e.target.closest("li").remove();
            updateMenuCount();
        }
    }
    
    $("#menu-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-edit-button")) {
            editMenuName(e);
        }
        
        if(e.target.classList.contains("menu-remove-button")) {
            removeMenuName(e);
        }
    })
    // form 태그가 자동으로 전송되는 걸 막아준다.
    $("#menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    $("#menu-submit-button").addEventListener("click", addMenuName)
    
    // 메뉴의 이름을 입력 받는 건
    $("#menu-name").addEventListener("keypress", (e) => {
        //아무 버튼이나 눌러도 alert가 뜨는 걸 막아줌
        if(e.key !== "Enter"){
            return;
        }
        addMenuName();
    });

    $("nav").addEventListener("click", (e) => {
        //카테고리를 클릭했을 때만 작동하도록 예외처리.
        const isCategoryButton = e.target.classList.contains("cafe-category-name");
        if(isCategoryButton){
            const categoryName = e.target.dataset.categoryName
            this.currentCategory = categoryName;
            $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
            render(); 
        }
    })
}

const app = new App();
app.init();

