<!-- @format -->

제작중인 네트리파이 주소: https://photoalbumproject.netlify.app/

웹은 각잡고한다. = 정리, 노트, 정보찾기, 분류 등

영화, 사진?

사진을 업로드해서 분류하는거? 업로드와 삭제기능이 있어야 하겠다. firebase로 이
미  
지를 저장할까? // 이미지를 저장할때 어떤게 필요할까? 이미지 저장시 (현재날짜와
시  
간 , 분류의 이름, ) 날짜별로 정렬? (현재 날짜가 있어야겠다. )

분류는 router로 작성

실행시 DB에서 날짜, 앨범이름을 가져와야함. (전역으로 관리해보자)

app(이름적기)-> 분류 -> 이미지들(드래그 가능한 박스) ->(바텀에 추가하기 박스)

이미지-> [{이미지이름:{이미지:이름,날짜:date}}]

앨범삭제시 한번더 물어보는기능 만들기(앨범이 너무쉽게 삭제되면 안될듯 하다.)

업데이트 시점 : 앨범삭제시 , 앨범등록시, 이미지 추가시,  
업데이트를 전역에서 종속성값이 변화할떄 마다 저장되게 하자.

앨범 이름을 적어주세요

분류1 x 분류2 x 분류3 x 분류4 x  
이미지 이미지 이미지 이미지

이미지 이미지 이미지 이미지

이미지추가하기.
