/* ===============================
   3D KFUPM OCTAGON COIN
   Builds the floating 3D KFUPM octagon coin using Three.js.

   Main responsibilities:
   - Creates the Three.js scene, camera, and renderer.
   - Loads the KFUPM logo texture from Django through window.KFUPM_LOGO_URL.
   - Builds an octagonal coin using CylinderGeometry.
   - Applies separate materials for the side, front, and back faces.
   - Adds lighting, shadow, floating motion, and controlled rotation.
   - Resizes the renderer when the browser size changes.
================================ */

/* Target container where the Three.js canvas will be injected */
    const coinContainer = document.getElementById("kfupm-coin");

    if(coinContainer && typeof THREE !== "undefined"){

    /* Scene, camera, and transparent renderer setup */
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            32,
            coinContainer.clientWidth / coinContainer.clientHeight,
            0.1,
            100
        );

        camera.position.z = 5.5;

        const renderer = new THREE.WebGLRenderer({
            antialias:true,
            alpha:true
        });

        renderer.setSize(coinContainer.clientWidth, coinContainer.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        coinContainer.appendChild(renderer.domElement);

    /* Group that holds the coin and allows the whole model to animate together */
        const coinGroup = new THREE.Group();
        scene.add(coinGroup);

    /* Logo texture loading and alignment adjustments */
        const textureLoader = new THREE.TextureLoader();

        const logoTexture = textureLoader.load(window.KFUPM_LOGO_URL, () => {
        logoTexture.center.set(0.5, 0.5);

    /* rotate logo texture */
        logoTexture.rotation = THREE.MathUtils.degToRad(67.5);

    /* zoom texture to remove black borders */
        logoTexture.repeat.set(0.92, 1);
        
        
        });

        logoTexture.colorSpace = THREE.SRGBColorSpace;
        logoTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    /* Octagonal coin geometry. radialSegments = 8 creates the octagon shape. */
        const coinGeometry = new THREE.CylinderGeometry(
            1.55,
            1.55,
            0.20,
            8,
            1,
            false
        );

    /* Materials are applied as: side face, front face, back face */
        const sideMaterial = new THREE.MeshStandardMaterial({
            color:0x244b33,
            roughness:0.45,
            metalness:0.45
        });

        const frontMaterial = new THREE.MeshStandardMaterial({
            map:logoTexture,
            roughness:0.58,
            metalness:0.08
        });

        const backMaterial = new THREE.MeshStandardMaterial({
            color:0xf5f5f7,
            roughness:0.65,
            metalness:0.05
        });

        const coin = new THREE.Mesh(coinGeometry, [
        sideMaterial,
        frontMaterial,
        backMaterial
        ]);

    /* Initial model orientation so the logo faces the viewer correctly */
        coin.rotation.x = Math.PI / 2;

    /* Rotate octagon so the top becomes flat "_" instead of pointed "/\" */
        coin.rotation.y = THREE.MathUtils.degToRad(22.5);

    /* Enable shadow from the coin */
        coin.castShadow = true;
        coin.receiveShadow = true;

        coinGroup.add(coin);

    /* Soft shadow plane behind the coin for extra visual depth */
        const shadowPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(4, 4),
            new THREE.ShadowMaterial({
                opacity:0.22
            })
        );

        shadowPlane.position.z = -0.45;
        shadowPlane.receiveShadow = true;
        scene.add(shadowPlane);


    /* Lighting setup: white key light, orange accent light, and ambient fill */
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.7);
        mainLight.position.set(3, 3, 5);
        mainLight.castShadow = true;
        scene.add(mainLight);

        const orangeLight = new THREE.PointLight(0xff6a2b, 2.2, 8);
        orangeLight.position.set(-3, 1.5, 3);
        scene.add(orangeLight);

        const softLight = new THREE.AmbientLight(0xffffff, 0.45);
        scene.add(softLight);

    /* 
    Animation loop
    Adds subtle floating, side-to-side rotation, and slight tilt while
    keeping the logo readable instead of flipping randomly.
    */
        let time = 0;

        function animateCoin(){
            requestAnimationFrame(animateCoin);

            time += 0.01;

        /* floating motion */
            coinGroup.position.y = Math.sin(time * 1.4) * 0.065;

        /* controlled side rotation */
            coinGroup.rotation.y = Math.sin(time * 0.85) * 0.48;

        /* tiny premium tilt */
            coinGroup.rotation.x = Math.sin(time * 0.6) * 0.26;

            renderer.render(scene, camera);
        }

        animateCoin();

    /* Keeps the 3D coin correctly sized when the browser window changes */
        window.addEventListener("resize", () => {
            camera.aspect = coinContainer.clientWidth / coinContainer.clientHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(coinContainer.clientWidth, coinContainer.clientHeight);
        });
    }
