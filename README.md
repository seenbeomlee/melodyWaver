# Three.js documents
melodyWaver with three.js & melodyne

## Contents
0. 먼저 알아야 할 것들 | https://threejsfundamentals.org/threejs/lessons/kr/threejs-prerequisites.html
1. three.js란? | https://threejsfundamentals.org/threejs/lessons/kr/threejs-fundamentals.html
2. 반응형 디자인 | https://threejsfundamentals.org/threejs/lessons/kr/threejs-responsive.html
3. three.js의 원시 모델 | https://threejsfundamentals.org/threejs/lessons/kr/threejs-primitives.html


## reference
1. https://threejsfundamentals.org/threejs/lessons/kr/threejs-fundamentals.html
  
------------

# 1. three.js란?
   
1-0. three.js 구조

* Renderer : Scene과 Camera 객체를 넘겨 받아 카메라의 frustum 안 3D scene의 일부를 2D 이미지로 렌더링한다.
* Scene graph : Scnen + Camera + Mesh(Geometry + Material) + Texture + Light

> 공간 - Scene
> 
> 피사체: 부피, 질감 - Mesh = Geometry + Material
> 
> 카메라 - Camera
> 
> 빛 - Light

------------

1-1. Geometry와 Material

 반지름이 같은 쇠 구슬과 유리 구슬이 있다. Scene에 두 구슬을 그리고자 할 때, 쇠 구슬과 유리 구슬을 각각 아무것도 없는 상태로부터

 표면의 점을 하나씩 찍어가며 그려낼 수 있을 것이다. 하지만, 구슬의 '구형 기하학적 형태'를 별도로 뺄 수 있다면 어떨까?

 같은 기하학적 형태를 갖고, 표면만 다른 쇠 구슬과 유리 구슬처럼 여러 물체를 그릴 때 매번 기하학적 형태를 정의할 필요가 없어질 것이다.

 또한, 이렇게 뼈대와 표면이 분리되면 기존에 정의한 물체의 표면을 업데이트 하기도 쉬워진다.

Geometry
> 기하학적 형태, 뼈대를 담당하는 부분 (반지름이 r인 구형 물체)라는 정보

Material
> 특정한 질감, 색, 반사율 등을 갖는 물체의 표면 (은색이고 매끈하며 반사율이 높은 쇠 표면, 투명하며 빛을 대부분 투과시키는 유리 표면) 따위의 정보

Mesh(물체) = Geometry + Material
> 정확한 학문적인 의미를 갖고 있다기보다는, 어느정도 관용적으로 사용되는 용어인 듯 하다.

------------

1-2. Camera

``` Javascript
  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
```
fov
> field of view(시야각), radian이 아닌 degree를 단위로 사용한다

aspect
> canvas의 가로/세로 비율

near, far
> 카메라 앞에 렌더링되는 공간 범위

기본적으로 카메라는 -Z 축 +Y 축을 바라본다.

---

1-3. requestAnimationFrame

브라우저에 애니메이션 프레임을 요청하는 함수이다. 인자로 실행할 함수를 전달한다.

1-4. Light

``` Javascript
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
```

position.set
> DirectionalLight에는 위치(position)와 목표(target) 속성이 default(0, 0, 0)로 있다.

# 2. 반응형 디자인

2-0. 반응형이란?

 웹에서 반응형이란, 웹 페이지를 PC, 타블렛, 스마트폰 등 다양한 환경에서 이용하기 용이하도록 사이즈에 맞춰 콘텐츠를 최적화하는 것을 의미한다.

``` javascript
  <canvas id="c"></canvas>
```
  canvas 요소는 기본적으로 300x150 pixel을 갖는다.

``` javascript
  <style>
  html, body {
    margin: 0;
    height: 100%;
  }
  #c {
    width: 100%;
    height: 100%;
    display: block; // canvas 요소의 default display 속성은 inline이다. (글자처럼 취급) => display: block 으로 변경
  }
  </style>
```
  body 요소는 default로 5 pixel의 margin이 지정되어 있으니, margin: 0
  html과 body 요소의 height를 지정하지 않으면, contents의 높이만큼만 커지니, height: 100%로 창 전체를 채운다.

---

2-1. 해상도 errorFix

창 크기에 따라, cube가 직육면체로 변한다.

``` javascript
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
```

 camera의 aspect(비율) 속성을 canvas의 화면 크기에 맞게 맞춘다.

 canvas의 원본 크기, 해상도는 drawingbuffer라고 불린다.

 Three.js에서는 'renderer.setSize' method를 호출하여 canvas의 드로잉버퍼 크기를 지정할 수 있다.

 이 때, 크기는 "canvas의 디스플레이 크기"를 고른다.

``` javascript
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height; // canvas 스펙상, resizing은 화면을 다시 렌더링해야 하므로, 같은 사이즈 일 때는 리사이징을 하지 않음으로써 불필요한 자원 낭비를 막을 필요가 있다.
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
```

 canvas의 크기가 다르다면, 'renderer.setSize' method를 호출해 새로운 width와 height를 넘겨준다.

 'renderer.setSize' method는 기본적으로 CSS의 크기를 설정하므로, 마지막 인자로 false를 넘겨준다.

 (canvas가 다른 요소와 어울리려면, three.js에서 CSS를 제어하는 것 보다, 다른 요소와 같이 CSS로 제어하는 것이 일관성 있는 프로그래밍)

 따라서, 해상도 문제와 resizing을 해결할 수 있는 총 코드는 다음과 같이 된다.

 ``` javascript
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
 ```

2-2. HD-DPI 디스플레이 다루기

 Three.js로 HD-DPI를 다루는 3가지 방법

 아무것도 하지 않기
 > 3D 렌더링은 많은 GPU 자원을 소모한다. 2018년 기준, HD-DPI는 약 3배의 해상도를 지녔다. 즉, HD-DPI가 아닌 기기와 비교했을 때, 한 픽셀 당 픽셀 수가 1:9
 > 즉, 9배 많은 픽셀을 처리해야 한다.

 renderer.setPixelRatio method를 이용해 해상도 배율을 알려주기
 > 브라우저로부터 CSS pixel과 실제 기기 pixel의 배율을 맏아 three.js에게 넘겨준다.

 ```javascript
  renderer.setPixelRatio(window.devicePixelRatio);
 ```

> 성능 이슈가 있는 것으로 보인다 (추천X)

canvas를 리사이징 할 때 직접 계산하기

``` javascript
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRtio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
```

# 3. three.js의 원시 모델

3-0. 



