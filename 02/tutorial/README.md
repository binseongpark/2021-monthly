Learning Pixi
=============

Pixi 렌더링 엔진을 사용하여 게임 및 대화형 미디어를 만드는 방법을 단계별로 소개합니다. 

### Table of contents
1. [소개](#introduction)
2. [설정](#settingup)
  1. [Pixi 설치](#installingpixi)
3. [스테이지 및 렌더러 만들기](#application)
4. [Pixi 스프라이트](#sprites)
5. [텍스처 캐시에 이미지로드](#loading)
6. [스프라이트 표시](#displaying)
  1. [별칭 사용](#usingaliases)
  2. [loading에 대해 조금 더](#alittlemoreaboutloadingthings)
    1. [일반 자바크르비트 이미지 개체 또는 캔버스에서 스프라이트 만들기](#makeaspritefromanordinaryjavascriptimageobject)
    2. [로드 된 파일에 이름 할당](#assigninganametoaloadingfile)
    3. [로드 진행 상황 모니터링](#monitoringloadprogress)
    4. [Pixi의 로더에 대한 추가 정보](#moreaboutpixisloader)
7. [스프라이트 포지셔닝](#positioning)
8. [크기 및 배율](#sizenscale)
9. [회전](#rotation)
10. [타일셋 하위 이미지에서 스프라이트 만들기](#tileset)

<a id='introduction'></a>
소개
------------

Pixi 는 매우 빠른 2D 스프라이트 렌더링 엔진입니다. JavaScript 및 기타 HTML5 기술을 사용하여 게임과 응용 프로그램을 쉽게 만들 수 있도록 대화형 그래픽을 표시, 애니메이션 및 관리하는데 도움을 주는 엔진입니다. 합리적이고 깔끔한 API를 가지고 있으며 텍스처 아틀라스를 지원하고 스프라이트(대화형 이미지) 애니메이션을 위한 간소화 된 시스템을 제공하는 것과 같은 많은 유용한 기능을 포함합니다. 또환 완전한 장면 그래프를 제공하여 중첩된 스프라이트(스프라이트 내부 스프라이트)의 계층을 생성 할 수있을 뿐만 아니라 마우스 및 터치 이벤트를 스프라이트에 직접 연결할 수 있습니다. 그리고 가장 중요한 것은 Pixi가 원하는만큼 사용하고, 개인 코딩 스타일에 맞게 조정하고, 다른 유용한 프레임워크와 원활하게 통합 할 수 있도록 방해가 되지 않는다는 것입니다. 

Pixi의 API는 실제로 Macromedia/Adobe Flash에서 검증된 API를 개선한 것입니다. Old-skool Flash 개발자는 집처럼 느껴질 것입니다. 다른 현재 스프라이트 렌더링 프레임워크는 비슷한 API를 사용합니다.: CreateJS, Starling, Sparrow 및 Apple의 SpriteKit. Pixi API의 감정은 범용이라는 것입니다. 게임 엔진이 아닙니다. 원하는 것을 만들 수있는 완전한 표현의 자유를 제공하고 사용자 정의 게임 엔진을 그 주위에 감쌀 수 있기 때문에 좋습니다. 