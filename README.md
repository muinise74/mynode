# mynode
  ### - env
    front : create-react-app
    back : express
    db : aws > mysql
    db 연동 : mybatis
    
  ### - commit history
    1st : project 생성, mybatis, mySql connect
    2nd : 전체 조회 추가, 조회 안됨(select)
    3rd : client에 node_module 추가
    4th : 전체 조회 완성 
      >> axios 이후 setState가 잘 안됬음 >> setState가 잘안되는 이유는 모르겠음, setState를 진행하지 않고 response를 활용하는 것으로 해결
    5th : 상세 조회 추가(select + where)
      >> react-router-dom v6에서는 v5의 match를 사용할 수 없었음, useParams를 통해 해결
    6th : 삽입 기능 추가(insert)
    7th : 수정 기능 추가(update)
    8th : 삭제 기능 추가(delete)
    9th : multer 적용, 파일 업로드 기능 추가
      >> fs 관련 directory 생성, 삭제
    10th : 수정 시 파일도 수정할 수 있도록 기능 적용
      >> 파일을 수정 시 dir 내의 변경 전 파일을 삭제 필요
    11th : User 테이블 생성, 회원가입 기능 적용(유효성 검사 적용 X)
      >> react-router-dom v6 history 대신에 useNavigate 사용
      >> hook은 class형 Component 내에서 사용할 수 없음
      >> 함수형 Component 내에서 사용해야 함
      >> location.href 와 useNavigate의 차이는??
    12th : 회원가입 유효성 검사 적용
    13th : 로그인 (쿠키 유지 X)
    14th : 로그인 정보 쿠키 로 유지
    15th : 로그인 후 쿠키 정보 사용하기
    16th : 쿠키 유효시간 연장, 로그 아웃, 로그인 시에만 헤더 나타내기
    17th : 아래 경고 사항 해결
      >> Warning: A future version of React will block javascript
      >> a 태그의 href 속성에 어떤 페이지에도 연결시키지 위해서 'javascript:'를 사용하지 않고 '#'을 활용
      >> 경고 이미지 1번
    18th : 비밀번호 재설정 메일 발송
      >> google 대신 naver 로 진행

  ### - 주의
    1. react에서 Component를 만들 때, Component 명을 Pascal Case로 작성하기
    2. export 잊지 말기
