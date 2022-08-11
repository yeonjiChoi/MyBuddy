import { Wrapper } from "./styles";
import styled from "styled-components";

import MainCarousel from "../../components/Main/MainCarousel";
import AnswerModal from "../../components/Childern/AnswerModal";

import axios from "axios";
import drf from "../../api/drf";

import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { MemberID, CurrentSlide, ChildrenList, AnswerList } from "../../atom";


const ScrollBtn = styled.div`
  :hover {
    cursor: pointer;
  }
`
const FlexRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const FlexReflex = styled.div`
  display: flex;
  @media ${props => props.theme.mobile} {
    flex-direction: column;
  }
`
const ChildBtn = styled.button`
  margin: 5px;
  padding: 5px 16px;
  background-color: ${props => props.theme.whiteColor};
  box-shadow: 3px 3px 3px gray;
  border: none;
  border-radius: 5px;
  :hover {
    cursor: pointer;
  }
`
const ConversBtn = styled.button`
  font-size: min(5vw, 16px);
  :hover {
    cursor: pointer;
  }
  @media ${props => props.theme.mobile} {
    font-size: min(2vw, 16px);
  }
`
const ConversText = styled.div`
  @media ${props => props.theme.mobile} {
    font-size: min(3vw, 16px);
  }
`

function Main() {
  const pageTop = {
    position: 'fixed',
    bottom: '60px',
    right: '15px',
    width: '4vw',
    height: '40px',
    borderRadius: '50%',
    color: '#cbc8c8',
    zIndex: '1',
  }

  const pageBottom = {
    position: 'fixed',
    bottom: '40px',
    right: '15px',
    width: '4vw',
    height: '20px',
    borderRadius: '50%',
    color: '#cbc8c8',
    zIndex: '1',
  }

  function moveToTop () {
    document.body.scrollIntoView({behavior: 'smooth'});
  } 

  function moveToBottom () {
    document.body.scrollIntoView({behavior: 'smooth', block: 'end'})
  }


  const currentSlide = useRecoilValue(CurrentSlide);
  const setMemberID = useSetRecoilState(MemberID);
  const [childrens, setChildrens] = useRecoilState(ChildrenList);
  const [answerList, setAnswerList] = useRecoilState(AnswerList);


  // 페이지 렌더링 시 멤버에 대한 정보를 가져온다.
  // 이 페이지에서 많은 컴포넌트들을 열기 때문에 회원ID를 저장한다
  // 아이들 리스트와 현재 아이의 답변 리스트를 저장한다
  useEffect(() => {
    axios({
      url: drf.member.member(),
      method: "get",
      headers: {Authorization: 'Bearer ' + localStorage.getItem("token"),},
    }).then((res) => {
      setMemberID(res.data.memberID)
      setAnswerList(res.data.childrens[currentSlide]?.answers)
      setChildrens([...res.data.childrens, {childrenID: 0, name: "아이"}])
    })
  }, [])
  
  const childrenID = childrens[currentSlide]?.childrenID;

// 아이 삭제하기
  function deleteChildren(childrenID) {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const newChildrenList = []
      childrens.map((child) => {
        if (child.childrenID !== childrenID) {
          newChildrenList.push(child)
        }
      })
      updateChildrens(newChildrenList)
      updateAnswerList(newChildrenList)
    }
  }

  // 아이 삭제 후 childrenList 업데이트
  function updateChildrens(newChildrenList) {
    axios({
      url: drf.children.children(childrenID),
        method: "delete",
        headers: {Authorization: 'Bearer ' + localStorage.getItem("token")},
    }).then((res) => {
      setChildrens(newChildrenList)
    }).catch((err) => {
      console.log(err)
    })
  }


  // 아이 삭제 후 answerList 업데이트
  // main page에서 새로고침 없이 "아이에게 하고싶은 말"을 바꾸기 위함
  function updateAnswerList(newChildrenList) {
    const newAnswerList = [];
    newChildrenList.forEach((child) => {
      if (child.childrenID === newChildrenList[currentSlide].childrenID && newChildrenList[currentSlide].childrenID !== 0) {
        const answers = child.answers ? child.answers : null
        newAnswerList.push(...answers)
      }
    })
    setAnswerList(newAnswerList)
  }


// 답변 삭제하기
  function deleteAnswer(answerID) {
    const newAnswerList = [];
    answerList.map((answer) => {
      if (answer.answerID !== answerID) {
        newAnswerList.push(answer)
      }
    })
    axios({
      url: drf.answer.updateAnswer(answerID),
      method: "delete",
      headers: {Authorization: 'Bearer ' + localStorage.getItem("token"),},
    }).then((res) => {
      setAnswerList(newAnswerList)
    })
    .catch((err) => {console.log(err)})
  }


// modal(for answer updating) code
  const [close, setClose] = useState(false) // 모달창 닫는 변수
  const [num, setNum] = useState();

  function updateAnswer(idx) {
    setNum(idx)
    setClose(!close)
  }

  return (
    <>
      <Wrapper>
        <div className="head">
          <MainCarousel />
          <FlexRow>
            { childrenID ? <Link to={`/UpdateChildren/${childrenID}`}><ChildBtn>수정</ChildBtn></Link> : null }
            { childrenID
              ? <ChildBtn onClick={() => deleteChildren(childrenID)}>삭제</ChildBtn>
              : null
            }
          </FlexRow>
        </div>
        <div className="body">
          <div className="body_grid">
            <FlexRow style={{justifyContent: "space-between"}}>
              <p>{childrens[currentSlide] ? childrens?.[currentSlide].name : "아이"}에게 해주고싶은 말</p>
              { childrenID ? <button className="plusBtn"><Link to={`/CreateAnswer/${childrenID}`} style={{textDecoration: "none", color: "black"}}>추가하기</Link></button> : null }
            </FlexRow>
            <div className="body_conversation">
              { answerList ? answerList.map((answer, idx) => {
                return (
                  <div key={answer.answerID}>
                    <FlexReflex style={{justifyContent: "space-between", marginBottom: "5px"}}>
                      <ConversText>{answer.content}</ConversText>
                      <FlexRow style={{justifyContent: "space-between", alignItems: "center"}}>
                        <ConversText style={{marginBottom: "1vw"}}>{answer.createdAt}</ConversText>
                        <FlexRow>
                          <ConversBtn style={{marginLeft: "1rem", marginBottom: "1vw"}} onClick={() => updateAnswer(idx)}>수정</ConversBtn>
                          <ConversBtn style={{marginLeft: "0.5rem", marginBottom: "1vw"}} onClick={() => deleteAnswer(answer.answerID, answer.questionID)}>삭제</ConversBtn>
                          { close && num===idx && (<AnswerModal answer={answer} setClose={setClose} closeModal={() => setClose(!close)} />)}
                        </FlexRow>
                      </FlexRow>
                    </FlexReflex>
                  </div>
                )
              }) : null}
            </div>
          </div>
          <div className="body_grid">
            <FlexRow style={{justifyContent: "space-between"}}>
              <p>{childrens[currentSlide] ? childrens?.[currentSlide].name : "아이"}와 함께한 사진</p>
              { childrenID ? <button className="plusBtn"><Link to={`/CreateAnswer/${childrenID}`} style={{textDecoration: "none", color: "black"}}>더보기</Link></button> : null }
            </FlexRow>
            <div className="body_picture">
              {/* firebase 활용 예정 */}
            </div>
          </div>
        </div>
        <FlexRow style={{margin: "1rem", justifyContent: "flex-end"}}>
          <Link style={{fontSize: "min(2vw, 16px)", color: "gray", margin: '0 1rem 0 0'}} to="/updateMember">회원정보 수정</Link>
          <Link style={{fontSize: "min(2vw, 16px)", color: "gray"}} to="/signout">회원 탈퇴</Link>
        </FlexRow>
      </Wrapper>
      <div>
        <ScrollBtn>
          <i onClick={moveToTop} className="fa-solid fa-circle-chevron-up fa-2xl" style={ pageTop }></i>
        </ScrollBtn>
        <ScrollBtn>
          <i onClick={moveToBottom} className="fa-solid fa-circle-chevron-down fa-2xl" style={ pageBottom }></i>
        </ScrollBtn>
      </div>
    </>
  );
}

export default Main;
