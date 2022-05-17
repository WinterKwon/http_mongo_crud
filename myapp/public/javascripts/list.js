// 개별 블로그 읽기의 버튼 클릭시의 동작
const listBtn = document.getElementById('list');
const updateBtn = document.getElementById('update');
const delBtn = document.getElementById('delete');

listBtn.addEventListener('click', ()=>{
    location.href = '/blog';
})

//삭제하기
//1. 글 no 찾아 그 정보 삭제하고  -> blog.js
// 글 목록에 다시 반영할 것
//삭제 완료 메세지 -> 클라이언트에 전달
//클라이언트가 특정 동작하도록 -> 경로
delBtn.addEventListener('click', ()=>{
    fetch(`http://localhost:3000/blog/delete/${delBtn.dataset.doc}`, {
        method : 'DELETE'
    })  //id값 가져오기 위해 blogcontent.ejs에서 data-doc="<%=content.no%>" 추가
    .then(res=> res.json())
    .then(data => window.location.href = data.redirect)
    .catch(err=>console.log(err));
});

//글 수정하기
//기존 글 가져와 post 전송 후 수정하는 함수 코드 활용 및 수정
//put 활용하지 않을 것. http 프로토콜에서 잘못만들어진 것이란 얘기 있음. 보안이슈도 있고
updateBtn.addEventListener('click', ()=>{
    location.href = `/blog/updateRead/${updateBtn.dataset.doc}`;

})