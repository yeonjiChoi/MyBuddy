import styled from "styled-components";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 100%;
  padding: 1vh 0 2vh 0;
  width: 100%;
`

const FooterText = styled.div`
  margin: 0.3vh;
  font-size: 1.1vw;
`

const Logo = styled.img`
  width: 6.4vw;
  height: auto;
  border-radius: 50%;
  margin: 0 1vw 0 0;
`

const LinkUrl = styled.a`
  :hover { 
    text-decoration: underline;  
  }
`


function Footer () {
  return (
    <Box>
      <Logo src="img/logo/rabbit_pink.jpg" alt="" />
      <div>
        <FooterText>
          <LinkUrl style={{textDecoration: 'none', color: "black"}} href="https://jira.ssafy.com/secure/RapidBoard.jspa?rapidView=12725&projectKey=S07P12D208&selectedIssue=S07P12D208-92&quickFilter=26527">JIRA</LinkUrl>
          <span> | </span>
          <a style={{textDecoration: 'none', color: "black"}} href="https://lab.ssafy.com/s07-webmobile3-sub2/S07P12D208">Gitlab</a>
          <span> | </span>
          <a style={{textDecoration: 'none', color: "black"}} href="https://www.notion.so/D208-3217826f3fdc4f6dae09c79a2ed483d7">Notion</a>
          </FooterText>
        <FooterText style={{fontSize: '1.2vw'}}>제작: 허건녕, 김민정, 박신혜, 오도석, 최연지</FooterText>
        <FooterText>Copyright 2022. D208. All Rights Reserved.</FooterText>
      </div>
    </Box>
  )
}

export default Footer;