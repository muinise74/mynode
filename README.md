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

  ### - 주의
    1. react에서 Component를 만들 때, Component 명을 Pascal Case로 작성하기
    2. export 잊지 말기 
