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

이 튜토리얼에서는 Pixi의 강력한 이미지 렌더링 기능과 장면 그래프를 결합하여 게임 제작을 시작하는 방법을 알아봅니다. 그러나 Pixi는 게임만을 위한 것이 아닙니다. 이러한 동일한 기술을 사용하여 대화형 미디어 응용 프로그램을 만들 수 있습니다. 이는 휴대폰 용 앱을 의미합니다!


<a id='settingup'></a>
설정
------------

<a id='installingpixi'></a>
### Pixi 설치

여기서 사용 된 버전은 v4.5.5입니다. Pixi의 릴리즈 페이지에서 pixi.min.js 파일을 찾을 수 있습니다. 또는 [Pixi의 메인 릴리즈 페이지](https://github.com/pixijs/pixi.js/releases)에서 최신 버전을 받을 수 있습니다. 

이 하나의 파일만 있으면 Pixi를 사용할 수 있습니다. 

그런 다음 기본 HTML 페이지를 만들고 `<script>` 태그를 사용하여 방금 다운로드 한 `pixi.min.js` 파일을 연결합니다. `<script>` 태그의 src는 웹 서버가 실행되는 루트 디렉토리에 상대적이어야 합니다. `<script>` 태그는 다음과 같습니다. 

```html
<script src="pixi.min.js"></script>
```

다음은 Pixi를 연결하고 작동하는지 테스트하는데 사용할 수 있는 기본 HTML 페이지 입니다. (이것은 `pixi.min.js`가 pixi라는 하위 폴더에 있다고 가정합니다)

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Hello World</title>
</head>
  <script src="pixi/pixi.min.js"></script>
<body>
  <script type="text/javascript">
    let type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()){
      type = "canvas"
    }

    PIXI.utils.sayHello(type)
  </script>
</body>
</html>
```

Pixi가 올바르게 연결되면
다음과 같은 내용이 기본적으로 웹 브라우저의 콘솔에 표시됩니다. 

```
      PixiJS 4.4.5 - * canvas * http://www.pixijs.com/  ♥♥♥ 
```

<a id='application'></a>
Pixi 어플리케이션 및 `stage` 만들기
------------

이제 Pixi 를 사용할 수 있습니다!

하지만 어떻게?

첫 번째 단계는 이미지 표시를 시작할 수 있는 직사각형 표시 영역을 만드는 것입니다. Pixi에는 이를 생성하는 Application 개체가 있습니다. HTML `<canvas>` 요소를 자동으로 생성하고 캔버스에 이미지를 표시하는 방법을 파악합니다. 그런 다음 스테이지라는 특수 Pixi 컨테이너 개체를 만들어야 합니다. 앞서 보시겠지만 스테이지 객체는 Pixi가 표시 할 모든 항목을 포함하는 루트 컨테이너로 사용됩니다. 

다음은 앱 Pixi 어플리케이션 및 단계를 만들기 위해 작성해야하는 코드입니다. HTML 문서의 `<script>` 태그 사이에 다음 코드를 추가합니다. 
```js
//Create a Pixi Application
let app = new PIXI.Application({width: 256, height: 256});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
```
Pixi 사용을 시작하기 위해 작성해야하는 가장 기본적인 코드입니다. 256픽셀 x 256픽셀의 검은색 캔버스 요소를 생성하여 HTML문서에 추가합니다. 다음은 이 코드를 실행할 때 브라우저에서 나타나는 모습입니다.

![Basic display](./examples/images/screenshots/01.png)

네, [검은색 사각형](http://rampantgames.com/blog/?p=7745)입니다!

`Pixi.Application`은 사용중인 웹 브라우저에서 사용 가능한 그래픽에 따라 Canvas Drawing API 또는 WebGL을 사용하여 그래픽을 렌더링할지 여부를 결정합니다. 인수는 옵션 개체라고하는 단일 개체입니다. 이 예제에서 너비 및 높이 속성은 캔버스의 너비와 높이를 픽셀 단위로 결정하도록 설정됩니다. 이 옵션 개체 내에 더 많은 선택적 속성을 설정할 수 있습니다. 앤티 앨리어싱, 투명도 및 해상도를 설정하는 데 사용할 수 있는 방법은 다음과 같습니다. 
```js
let app = new PIXI.Application({ 
    width: 256,         // default: 800
    height: 256,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1       // default: 1
  }
);
```
Pixi의 기본 설정에 만족한다면 이러한 옵션을 설정할 필요가 없습니다. 그러나 필요한 경우 `PIXI.Application`에 대한 Pixi의 문서를 참조하십시오.

이러한 옵션은 무엇을 하나요? `antialias`는 글꼴 및 그래픽 기본 요소의 가장자리를 매끄럽게 합니다. (WebGL 앤티 앨리어싱은 일부 플랫폼에서 사용할 수 없으므로 게임의 대상 플랫폼에서 테스트해야 합니다.) `transparent`는 캔버스 배경을 투명하게 만듭니다. `resolution`를 사용하면 다양한 해상도와 픽셀 밀도의 디스플레이로 작업하기가 더 쉽습니다. 해상도 설정은 이 튜토리얼의 범위를 약간 벗어나지만 [Mat Grove's
explanation](https://web.archive.org/web/20171203090730/http://www.goodboydigital.com/pixi-js-v2-fastest-2d-webgl-renderer/)을 확인해 보십시오. 그러나 일반적으로 `resolution`를 1로 유지하면 괜찮습니다.

Pixi의 `renderer`개체는 WebGL로 기본 설정됩니다. 이는 WebGL이 믿을 수 없을만큼 빠르며 앞으로 배울 멋진 시각 효과를 사용할 수 있기 때문입니다. 그러나 WebGL을 통해 Canvas Drawing API 렌더링을 강제해야하는 경우 다음과 같이 `forceCanvas` 옵션을 `true`로 설정할 수 있습니다. 

```js
forceCanvas: true,
```
캔버스를 만든 후 캔버스의 배경색을 변경해야하는 경우 `app.renderer` 객체의 `backgroundColor` 속성을 16진수 색상 값으로 설정합니다. 
```js
app.renderer.backgroundColor = 0x061639;
```
`renderer`의 너비나 높이를 찾으려면 `app.renderer.view.width` 및 `app.renderer.view.height` 를 사용하세요. 

캔버스의 크기를 변경하려면 `renderer`의 `resize` 메서드를 사용하고 새로운 `width` 및 `height`값을 제공합니다. 그러나 캔버스의 크기가 해상도에 맞게 조정되도록 하려면 `autoResize`를 `true`로 설정하십시오.
```js
app.renderer.autoResize = true;
app.renderer.resize(512, 512);
```
캔버스를 전체 창에 채우려면 CSS 스타일을 적용하고 렌더러의 크기를 브라우저 창의 크기에 맞게 조정할 수 있습니다. 
```
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
```
그러나 그렇게 할 경우 다음 CSS 코드를 사용하여 모든 HTML 요소에서 기본 패딩 및 여백도 0으로 설정해야 합니다. 
```html
<style>* {padding: 0; margin: 0}</style>
```
(위 코드에서 별표 *는 CSS "universal selector"로 "HTML 문서의 모든 태그"를 의미합니다.)

캔버스가 브라우저창 크기에 비례하여 크기가 조정되도록하려면 [`scaleToWindow`함수](https://github.com/kittykatattack/scaleToWindow)를 사용할 수 있습니다. 

<a id='sprites'></a>
Pixi 스프라이트
------------

이제 렌더러가 있으므로 이미지 추가를 시작할 수 있습니다. 렌더러에서 보이게하려는 모든 것은 `stage`라는 특별한 Pixi 객체에 추가되어야 합니다. 다음과 같이 이 특별한 `stage` 객체에 액세스 할 수 있습니다.
```js
app.stage
```
`stage`는 Pixi`Container` 객체입니다. 컨테이너를 그룹화하여 그 안에 넣은 모든 것을 저장할 수있는 일종의 빈 상자로 생각할 수 있습니다. `stage`오브젝트는 scene에서 보이는 모든 사물의 루트 컨테이너입니다. '스테이지'에 넣은 모든 것이 캔버스에 렌더링됩니다. 지금은 `stage`가 비어 있지만 곧 그 안에 물건을 넣을 것입니다. (Pixi의`Container` 객체에 대한 자세한 내용은 여기 (http://pixijs.download/release/docs/PIXI.Container.html)에서 읽을 수 있습니다.)

(중요 :`stage`는 Pixi`Container`이기 때문에 다른`Container` 객체와 동일한 속성 및 메서드를 갖습니다. 그러나`stage`에는`width` 및`height` 속성이 있지만 *렌더창의 크기를 의미하지 않습니다*. 스테이지의 `width`및 `height`속성은 그 안에 넣은 물건이 차지하는 영역을 알려줍니다.

그래서 당신은 무대에 무엇을 두나요? **sprites** 라는 특수 이미지 개체. 스프라이트는 기본적으로 코드로 제어 할 수있는 이미지 일뿐입니다. 상호 작용 및 애니메이션 그래픽을 만드는 데 유용한 위치, 크기 및 기타 속성을 제어 할 수 있습니다. 스프라이트를 만들고 제어하는 방법을 배우는 것은 Pixi 사용법을 배우는 데있어 가장 중요한 것입니다. 스프라이트를 만들고 스테이지에 추가하는 방법을 알고 있다면 게임을 만들기 시작하는 단계에서 조금만 더 가면됩니다.

Pixi에는 게임 스프라이트를 만드는 다양한 방법 인`Sprite` 클래스가 있습니다. 이를 생성하는 세 가지 주요 방법이 있습니다.

- 단일 이미지 파일에서
- **타일셋**의 하위 이미지에서. 타일셋은 게임에 필요한 모든 이미지를 포함하는 하나의 큰 이미지입니다.
- **텍스처 아틀라스**에서 (타일셋에서 이미지의 크기와 위치를 정의하는 JSON 파일)

세 가지 방법을 모두 배우게 되겠지만, 시작하기 전에 Pixi로 이미지를 표시하기 전에 이미지에 대해 알아야 할 사항을 알아 보겠습니다.

<a id='loading'></a>
텍스처 캐시에 이미지로드
------------

Pixi는 WebGL을 사용하여 GPU에서 이미지를 렌더링하므로 이미지는 GPU가 처리 할 수있는 형식이어야합니다. WebGL 지원 이미지를 **텍스처**라고합니다. 스프라이트에 이미지를 표시하기 전에 일반 이미지 파일을 WebGL 텍스처로 변환해야합니다. 모든 것이 빠르고 효율적으로 작동하도록하기 위해 Pixi는 **텍스처 캐시**를 사용하여 스프라이트에 필요한 모든 텍스처를 저장하고 참조합니다. 텍스처의 이름은 참조하는 이미지의 파일 위치와 일치하는 문자열입니다. 즉,` "images/cat.png"`에서로드 된 텍스처가있는 경우 다음과 같이 텍스처 캐시에서 찾을 수 있습니다.
```js
PIXI.utils.TextureCache["images/cat.png"];
```
텍스처는 Pixi의 렌더러에서 작업하기에 효율적인 WebGL 호환 형식으로 저장됩니다. 그런 다음 Pixi의`Sprite` 클래스를 사용하여 텍스처를 사용하여 새 스프라이트를 만들 수 있습니다.
```js
let texture = PIXI.utils.TextureCache["images/anySpriteImage.png"];
let sprite = new PIXI.Sprite(texture);
```
하지만 이미지 파일을로드하고 텍스처로 변환하는 방법은 무엇입니까? Pixi의 내장 `loader`개체를 사용합니다.

Pixi의 강력한 `loader`개체 만 있으면 모든 종류의 이미지를로드 할 수 있습니다. 이를 사용하여 이미지를로드하고 이미지로드가 완료되면 `setup`이라는 함수를 호출하는 방법은 다음과 같습니다.
```js
PIXI.loader
  .add("images/anyImage.png")
  .load(setup);

function setup() {
  //This code will run when the loader has finished loading the image
}
```
[Pixi 개발팀 권장] (http://www.html5gamedevs.com/topic/16019-preload-all-textures/p=90907) 로더를 사용하는 경우 다음과 같이`loader`의`resources` 객체에서 텍스처를 참조하여 스프라이트를 만들어야합니다.
```js
let sprite = new PIXI.Sprite(
  PIXI.loader.resources["images/anyImage.png"].texture
);
```
다음은 이미지를 로드하고`setup` 함수를 호출하고 로드된 이미지에서 스프라이트를 만들기 위해 작성할 수있는 완전한 코드의 예입니다.
```js
PIXI.loader
  .add("images/anyImage.png")
  .load(setup);

function setup() {
  let sprite = new PIXI.Sprite(
    PIXI.loader.resources["images/anyImage.png"].texture
  );
}
```
이 튜토리얼에서 이미지를로드하고 스프라이트를 만드는 데 사용할 일반적인 형식입니다.

다음과 같이 연결 가능한`add` 메소드로 이미지를 나열하여 여러 이미지를 동시에로드 할 수 있습니다.
```js
PIXI.loader
  .add("images/imageOne.png")
  .add("images/imageTwo.png")
  .add("images/imageThree.png")
  .load(setup);
```
더 좋은 방법은 다음과 같이 단일`add` 메서드 내의 배열에로드하려는 모든 파일을 나열하는 것입니다.
```js
PIXI.loader
  .add([
    "images/imageOne.png",
    "images/imageTwo.png",
    "images/imageThree.png"
  ])
  .load(setup);
```
`로더`를 사용하면 JSON 파일을 로드 할 수도 있습니다.

<a id='displaying'></a>
스프라이트 표시
------------------

번역 포기😵 예제 위주로 하자