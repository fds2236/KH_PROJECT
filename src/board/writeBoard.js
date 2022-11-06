import { Link } from "react-router-dom";
import styled from "styled-components";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState } from "react";
import MiniApi from "../api/MiniApi";


/**
 * --------------------------- 스타일드 컴포넌트 ------------------------
 */

// ---- [글쓰기 틀 관련] ----

// 전체를 감싸는 컨테이너 스타일드 컴포넌트
const Container = styled.div`
    width: 600px;
    margin: 50px auto;
`;

// 글쓰기 목록을 감싸는 스타일드 컴포넌트
const Contents = styled.div`
    width: 600px;
    margin: 30px auto;
    background-color: #EEEEEE;
    display: flex;
    flex-direction: column;
`;

// 텍스트 에리어의 마진을 주기 위한 스타일드 컴포넌트
const MarginContent = styled.div`
    margin: 4px 16px;
`;





// ---- [버튼관련] ----


// 상단의 버튼들을 감싸는 스타일드 컴포넌트
const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 400px;
    margin: 0 auto;
`;



// 버튼 스타일드 컴포넌트
const StyledButton = styled.button`
    background-color: rgb(0,173,181);
    border-style: none;
    border-radius: 10px;
    width: 100px;
    height: 30px;
    color: #EEEEEE;
`;

// 레드버튼 스타일드 컴포넌트
const OrangeRedStyledButton = styled.button`
    background-color: orangered;
    border-style: none;
    border-radius: 10px;
    width: 100px;
    height: 30px;
    color: #EEEEEE;
`;

// 리턴 버튼 스타일드 컴포넌트
const ReturnStyledButton = styled.button`
    background-color: #EEEEEE;
    border-style: none;
    border-radius: 10px;
    width: 130px;
    height: 30px;
    color: gray;
    cursor: pointer;
    
`;





// ---- [텍스트 에리어 관련] ----


// 스타일드 텍스트 에리어
const StyledTextArea = styled.textarea`
    width: 550px;
    height: 500px;
    margin: 22px auto;
    border-style: none;
    font-size: 20px;

    
`;

// 타이틀 에어리어 스타일 컴포넌트
const StyledTitleArea = styled.textarea`
    width: 550px;
    height: 50px;
    margin: 0 auto;
    margin-top: 20px;
    border-style: none;
    font-size: 20px;
`;






/**
 * ------------------------------- 컴포넌트 --------------------------------
 */

// 버튼 컴포넌트
const Button = (props) => {
    return (
        <>
            <StyledButton>{props.text}</StyledButton>
        </>
    );
}

// 레드버튼 컴포넌트
const OrangeRedButton = (props) => {
    return (
        <>
            <OrangeRedStyledButton>{props.text}</OrangeRedStyledButton>
        </>
    );
}

// 리턴 버튼 컴포넌트
const ReturnButton = (props) => {

    return (
        <>
            <ReturnStyledButton onClick={OnClickToList} >{props.text}</ReturnStyledButton>
        </>
    );
}

// 제목쓰기 컴포넌트
// const TitleArea = () => {

//     const [TitleValue, setTitleValue] = useState("");
//     const onChange= (event) => {
// 		const v = event.target.value
		
// 	}

//     return (
//         <>
//             <StyledTitleArea 
//                 placeholder="제목을 입력 하세요 ....."
//                 value={TitleValue}
//                 onChange={onChange}
//             ></StyledTitleArea>
//         </>
//     );
// } 



// 글쓰기 컴포넌트
// const TextArea = () => {

//     const [textValue, setTextValue] = useState("");
//     const onChange= (event) => {
// 		const v = event.target.value
// 		setTextValue(v)
// 	}

//     return (
//         <>
//             <StyledTextArea 
//                 placeholder="본문 내용을 입력 하세요 ....."
//                 value={textValue}
//                 onChange={onChange}
//             ></StyledTextArea>
//         </>
//     );
// }

// 목록으로 돌아가는 onClick
const OnClickToList = () => {   
    window.location.replace('/Boards');
}












const boardObj = {
    id: "",
    boardNum: "",
    category: "",
    title: "",
    boardContent: ""
};

const WriteBoard = () => {
    const [id, setId] = useState('');
    const [boardNum, setBoardNum] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [boardContent, setBoardContent] = useState('');
    const [submit, setSubmit] = useState(false); // 서버로 전송할 수 있는 조건 체크
    const [resData, setResData] = useState(''); // 서버에서 받는 결과 데이터

    // 이벤트 체크 함수 만들기
    const onChangeId = (e) => setId(e.target.value); // 현재 이벤트가 발생한 입력창의 값을 useState에 세팅
    const onChangeBoardNum = (e) => setBoardNum(e.target.value);
    const onChangeCategory = (e) => setCategory(e.target.value);
    const onChangeTitle = (e) => {
        console.log("title : " + e.target.value);
        setTitle(e.target.value);
    }
    const onChangeBoardContent = (e) => setBoardContent(e.target.value);
    
    
    // const onChangeMail = (e) => {
    //     setMail(e.target.value);
    //     //isSubmit();
    // }

    // 서버에게 회원 가입 정보를 전송할지에 대한 여부 판단
    // const isSubmit = () => {
    //     if(id && pwd && name && mail) setSubmit(true);
    // }

    // 전송 버튼이 눌려지면 동작하는 함수, 함수가 비동기 통신을 해야 하므로 async 키워드 추가
    const onSubmit = async () => {

        try {
            // 서버에 대한 요청을 비동기로 처리 함
            const res =  await MiniApi.regBoard(boardNum, category, title, boardContent,id);
            //const res = KhApi.userLogin(111, 11);
            setResData(res.data);

        } catch (e) {
            console.log(e);
        }
    }

    const handleCategorySelect = (e) => {
        console.log(e.target.value); // 카테고리 값이 잘 바뀌었는지 확인
        setCategory(e.target.value);
      };

    return (
        <Container>  
            <ButtonContainer>
                <ReturnButton text={"목록으로 돌아가기"}></ReturnButton>

                {/* 카테고리 선택 화면 */}
                <div>
                <input
                    type="radio"
                    value="0"
                    checked = {category === "0"}
                    onChange = {handleCategorySelect}
                />
                <label>
                    자유게시판
                </label>
                </div>
                <div>
                <input
                    type="radio"
                    value="1"
                    checked = {category === "1"}
                    onChange = {handleCategorySelect}
                />
                <label>
                    후기게시판
                </label>
                </div>
                
               
            </ButtonContainer>

            
            <Contents>
                    {/* 제목 입력 칸 */}
                    <StyledTitleArea 
                        placeholder="제목을 입력 하세요 ....."
                        value={title}
                        onChange={onChangeTitle}
                    >
                    </StyledTitleArea>
                    {/* 본문 입력 칸 */}
                    <StyledTextArea 
                        placeholder="본문 내용을 입력 하세요 ....."
                        value={boardContent}
                        onChange={onChangeBoardContent}
                    ></StyledTextArea>
           
            </Contents> 

            <OrangeRedButton text={"글쓰기"}></OrangeRedButton>
                
        </Container>





        // <div>
        //     <h1>회원 정보 설정</h1>
        //     <br/>
        //     <input type="text" placeholder='아이디 입력' value={id} onChange={onChangeId} />
        //     <br />
        //     <input type="password" placeholder='패스워드 입력' value={pwd} onChange={onChangePwd} />
        //     <br />
        //     <input type="text" placeholder='이름 입력' value={name} onChange={onChangeName} />
        //     <br />
        //     <input type="email" placeholder='메일 입력' value={mail} onChange={onChangeMail} />
        //     <br />
        //     {submit && <button onClick={onSubmit}>전송</button>} 
        // </div>
    );
};


  
// const WriteBoard = () => {
//     return(
//         <Container>  
//             <ButtonContainer>
//                 <ReturnButton text={"목록으로 돌아가기"}></ReturnButton>
//                 <Button text={"자유게시판"}></Button>
//                 <Button text={"후기게시판"}></Button>
//             </ButtonContainer>

//             {/* &nbsp;를 사용하여 의도적으로 공백을 넣음. 글이 아무것도 없을때 대비 */}
//             <Contents>
//                 &nbsp;
//                     <TitleArea></TitleArea>
//                     <TextArea></TextArea>
//                 &nbsp;  
//             </Contents> 

//             <OrangeRedButton text={"글쓰기"}></OrangeRedButton>
                
//         </Container>
//     );
// }

export default WriteBoard;