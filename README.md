# Three.js documents
melodyWaver with three.js & melodyne

## Contents
0. 먼저 알아야 할 것들 | https://threejsfundamentals.org/threejs/lessons/kr/threejs-prerequisites.html
1. three.js란? | https://threejsfundamentals.org/threejs/lessons/kr/threejs-fundamentals.html
2. 


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
