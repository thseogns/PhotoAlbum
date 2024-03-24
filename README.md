사진을 저장할 수있는 웹사이트를 제작하고 싶었습니다. 

앨범을 추가하고 삭제할 수 있게 만들었습니다. 
분류를 확실하게 하기위해 router로 path를 설정했습니다. 
![image](https://github.com/thseogns/PhotoAlbum/assets/99688960/132ee495-20f9-4ff8-81f4-38ac5f2ff6b1)  

앨범 추가시 앨범의 이름이 db에 등록되고 사진 추가시 firebaseStorage에 해당 앨범의 하위폴더에 이미지를 저장할 수 있게 하였습니다.  
![image](https://github.com/thseogns/PhotoAlbum/assets/99688960/693b57e3-3908-42d1-9737-2eb1c2a2f34c)  

저장된 이미지의 url을 받아와 db에 저장합니다.   
  
![image](https://github.com/thseogns/PhotoAlbum/assets/99688960/fb7cdafe-4165-48f7-b33e-c653b42fe003)  

앨범추가시 db에 있는 이름과 비교하여 같은이름이 있을때 경고가 표시되도록 하였습니다.  ![image](https://github.com/thseogns/PhotoAlbum/assets/99688960/543b5e00-1a13-4196-9aa0-e65bae40e4cf)   
  
특수문자 입력시 경고가 표시됩니다.   
![image](https://github.com/thseogns/PhotoAlbum/assets/99688960/35d3e11c-1635-49d8-a119-807f0ee2151f)   
  
실수로 삭제하는 일이 없도록 경고 메시지를 띄우게 하였습니다.   
![image](https://github.com/thseogns/PhotoAlbum/assets/99688960/a629936b-ad84-4837-b309-8e961b922abe)   

이미지를 db에서 가져올 때 로딩표시를 하여 사용자에게 현재상태를 알립니다.  ![image](https://github.com/thseogns/PhotoAlbum/assets/99688960/0c08ab98-bae2-4e70-9770-32eddd0d8419)  

앨범추가, 사진추가시 새로 업데이트 될 수 있게 effect로 종속성을 부여하여 업데이트시 새로운 데이터를 db에서 가져옵니다. 

제작중인 네트리파이 주소: https://photoalbumproject.netlify.app/






