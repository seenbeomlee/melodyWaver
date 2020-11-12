/* code from : https://ahnheejong.name/articles/my-first-octahedron/ */

const {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  PointLight,
  MeshLambertMaterial,
  Mesh,
  OctahedronGeometry } =
THREE;

function render() {
  const WIDTH = 400;
  const HEIGHT = WIDTH;
  const RADIUS = WIDTH / 6;

  const VIEW_ANGLE = 20;
  const ASPECT = WIDTH / HEIGHT;
  const NEAR = 0.1;
  const FAR = 10000;

  const container =
  document.querySelector('#three');

  /* webGL renderer displays your beautifully crated scenes using WebGL */
  const renderer = new WebGLRenderer({
    alpha: true, // 투명
    antialias: true // 안티얼라이어싱 적용
  });

  /* 사람의 눈 또는 카메라 렌즈와 비슷하게 원근법(투시 투영)을 사용하는 카메라 사용 */
  const camera = new PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR); 
  /* FIELD_OF_VIEW: 카메라의 시야각(degree)
  ASPECT: 시야의 가로/세로 비
  NEAR: 렌더링 할 물체의 하한값 (너무 가까이 있는 물체는 그리지 않는다 0 ~ FAR)
  FAR: 렌더링 할 물체의 상한값 (너무 멀리 있는 물체는 그리지 않는다) */


  const scene = new Scene(); // Scenes allow you to set up what and where is to be rendered by three.js. This is where you place objects, lights and cameras.

  scene.add(camera);
  renderer.setSize(WIDTH, HEIGHT); // 렌더러의 가로 세로 값 설정

  container.appendChild(renderer.domElement); // 캔버스에 렌더러 설정

  /* Light(color, intensity) 
  AmbientLight: 공간 전체를 밝히는
  DirectionalRight: 특정 방향으로 뻗어나가는
  PointLight: 한 점에서 시작해 모든 방향으로 뻗어나가는 (전구) */
  const pointLight = new PointLight(0xFFFFFF, 0.5); // (빛, 세기)
  pointLight.position.x = 100;
  pointLight.position.y = 100;
  pointLight.position.z = 30;
  scene.add(pointLight);

  /* MeshBasicMaterial: 빛과 상호작용 하지 않은, 가장 기본적인 표면
  MeshLambertMaterial: 람베르트 반사율을 갖는 물체의 표면 */
  const material = new MeshLambertMaterial({
    color: 0xff3030 });


  /* 3D 모델링의 기본 단위는 삼각형이다. 즉, 모든 면은 삼각형의 합으로 표현된다.
  >> 꼭지점(Vertex)들을 정의한다.
  >> 어떤 세 꼭지점이 이어져서 한 면(Face)을 이루는지 정의한다.
  하지만, 이러한 방식으로 모든 모델링을 해야 한다면, 복잡한 물체를 그렸을 때 코드의 양이 급격히 늘어나고, 의도를 파악하기 어렵다.
  
  three.js 에서는, 미리 정의된 다양한 형태의 Geometry를 제공하고 있다. 정팔면체 === OctahedronGeometry
  REFERENCE: https://threejs.org/docs/#api/en/geometries/OctahedronGeometry */
  const octahedron = new Mesh(new OctahedronGeometry(RADIUS), material); // mesh Constructor는 Geometry와 Material의 두 인자를 받는다.

  const faces = octahedron.geometry.faces;
  faces.map((face, i) => {
    face.color.setHex(0xFF3030);
  });

  octahedron.position.z = -RADIUS * 10; // default location에서, z축에서 뒤쪽(화면을 뚫고 들어가는 방향)으로 약간 밀어준다

  /* 준비된 공간에 mesh를 배치한다 (default location = (0, 0, 0)) */
  scene.add(octahedron);

  /* to spin the Mesh */
  function update() {
    const speed = Math.random() / 20;
    octahedron.rotation.x += speed;
    octahedron.rotation.y += speed;
    octahedron.rotation.z += speed;

    renderer.render(scene, camera); // 씬과 카메라를 이용해 렌더러가 화면을 실제로 그리는 작업
    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

render();