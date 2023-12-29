# MERN 스택 프로젝트  
## 프로젝트명: 자동 이미지 위치출력 SNS    
  
> ### 프로젝트 소개  
  기존에 있는 인스타그램을 참고하여 sns을 만드는 도중, 사진을 업로드하면 자동으로 위치까지 가져오면 좋을 것 같은 아이디어가 떠올라 카카오맵api를 활용해 개발해보았습니다.  
  기본적인 로그인과 회원가입, 게시물 CURD, 댓글기능까지 구현했습니다.  
  이미지는 업로드할때 이미지내에 EXIF 정보가 있어야 위치가 노출이 됩니다.  
  서버와 클라이언트는 Amazon EC2에 배포를 했으나 비용으로 인해 서버는 닫았습니다.  

> ### 사용된 기술  
- React  
- Express  
- MongoDB  
- NodeJS  
- KAKAO_MAP API  
- EXIF  

> ### 웹 이미지  
![Image_1](https://github.com/Oldentomato/WebBoard_NodeJs/blob/main/README_imgs/image_1.png)  
[참고](#메인화면css디자인)  
![Image_2](https://github.com/Oldentomato/WebBoard_NodeJs/blob/main/README_imgs/image_2.png )  
게시물 목록 올린사람과 조회수까지 확인이 가능  
![Image_3](https://github.com/Oldentomato/WebBoard_NodeJs/blob/main/README_imgs/image_3.png)  
해당 사용자 프로필. 어떤 게시물을 올렸는지 확인이 가능  
![Image_4](https://github.com/Oldentomato/WebBoard_NodeJs/blob/main/README_imgs/image_4.png )  
게시물 세부내용 보기화면_1 추천버튼기능 있음 지도를 닫을때는 해당 이미지 주소를 보여줌  
![Image_7](https://github.com/Oldentomato/WebBoard_NodeJs/blob/main/README_imgs/image_7.png )  
게시물 세부내용 보기화면_2 지도를 열었을때의 화면  
![Image_6](https://github.com/Oldentomato/WebBoard_NodeJs/blob/main/README_imgs/image_6.png )  
게시물 세부내용 보기화면_3 댓글과 리플기능이 구현됨  
![Image_5](https://github.com/Oldentomato/WebBoard_NodeJs/blob/main/README_imgs/image_5.png )  
사진업로드 화면  

> ### 참고한 자료들  

- **#메인화면css디자인** https://www.youtube.com/watch?v=1wfeqDyMUx4  
- **MERN 개발도움** https://www.youtube.com/watch?v=XVXzfvnXcw0&list=PL9a7QRYt5fqnxmxDMglzfv9v47IygFkDe  
- **kakaomap api 참고** https://sw-ryu.tistory.com/59  
- **exif 참고** https://velog.io/@lesacat94/%EC%82%AC%EC%A7%84%ED%8C%8C%EC%9D%BC-%EB%A9%94%ED%83%80%EB%8D%B0%EC%9D%B4%ED%84%B0Metadata-%EA%B0%92-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0

