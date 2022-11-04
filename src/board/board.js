import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
import MiniApi from "../api/MiniApi";

/**
 * ------------------------------스타일드 컴포넌트 ---------------------------
 */


// 전체를 감싸는 컨테이너 스타일드 컴포넌트
const Container = styled.div`
    width: 600px;
    margin: 50px auto;
    background-color: #EEEEEE;
    border: 1px solid #EEEEEE;
`;

// 글 목록을 감싸는 스타일드 컴포넌트
const Contents = styled.div`
    width: 550px;
    height: fit-content;
    margin: 30px auto;
    background-color: white;

`;

// 제목 버튼 틀 스타일드 컴포넌트
const TitleAndBtn = styled.div`
    margin: 50px auto;
    width: 600px;
    display: flex;
    height: 90px;
    justify-content: space-between;


`;

// 리턴 버튼 스타일드 컴포넌트
const ReturnStyledButton = styled.button`
    background-color: #EEEEEE;
    border-style: none;
    border-radius: 10px;
    color: gray;
    cursor: pointer;
    border: 1px solid black;
    height: 30px;
`;

// 버튼 스타일드 컴포넌트
const Button = styled.button`
    background-color: rgb(0,173,181);
    border-style: none;
    border-radius: 10px;
    width: 130px;
    height: 30px;
`;

// 타이틀 스타일드 컴포넌트
const StyledTitle = styled.h1`
    width: fit-content;
    display: block;

`;


/**
 * --------------------------------- 컴포넌트 -----------------------------------
 */


// 리턴 버튼 컴포넌트
const ReturnButton = (props) => {


    return (
        <>
            <ReturnStyledButton onClick={OnClickToList} >{props.text}</ReturnStyledButton>
        </>
    );
}

// 목록으로 돌아가는 onClick 컴포넌트
const OnClickToList = () => {   
    window.location.replace('/Boards');
}

// 타이틀 컴포넌트
const Title = ({text}) => {
    return(
        <StyledTitle>
            {text}
        </StyledTitle>
    );
}



const Board = () => {

    let nowBoardNum = window.localStorage.getItem('boardNum');

    const [boardInfo, setBoardInfo] = useState('');
    const [loading, setLoading] = useState(false);

    // const isLogin = window.localStorage.getItem("isLogin");
    // if(isLogin === "FALSE") window.location.replace("/");
    // 로그인 페이지로 접속하게 하기

    useEffect(() => {
        const BoardData = async () => {
            setLoading(true);
            try {
                const response = await MiniApi.boardInfo();
                setBoardInfo(response.data);
                console.log(response.data);
            } catch (e) {  
                console.log(e + "실패 입니다");
            }
            setLoading(false);
        };
        BoardData(); // 첫 페이지 로딩시 글 목록을 다 끌어옴

    }, []);


    return(
        <>
        <TitleAndBtn>
            <Title text={"글 제목 입니다"}></Title>
            <ReturnButton text={"목록으로 돌아가기"}></ReturnButton>
        </TitleAndBtn>
        <Container>   
            <Contents>
                &nbsp;
                    <h1>
                        {nowBoardNum} 입니다
                    </h1>
                &nbsp;
            </Contents>
        </Container>
        </>
    );
}

export default Board;