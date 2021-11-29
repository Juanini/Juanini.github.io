// import * as THREE from '/build/three.module.js';
import * as THREE from 'https://cdn.skypack.dev/three@0.135.0';

// import { DragControls } from '/jsm/controls/DragControls.js';
import threeDragcontrols from 'https://cdn.skypack.dev/three-dragcontrols';

// import { TWEEN } from '/jsm/libs/tween.module.min.js';
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';

import confetti from 'https://cdn.skypack.dev/canvas-confetti';

// import { TextGeometry } from '/jsm/geometries/TextGeometry.js';

    // AUDIO
    var audioListener;
    var audioLoader;

    var soundSuccess;
    var soundError;
    var soundClick;
    var soundPauseMenu;

    var listener = null;

    let canasta_Composta_Sprite;
    let canasta_Reciclable_Sprite;
    let canasta_Basura_Sprite;
    let error_sprite;
    let success_sprite;

    let plus_10_sprite;

    let canastaScale = 3.5;
    let canastaScaleTween = 4;

    var width = 0;
    var height = 0;

    let  textureLoader = null;
    let containerChido;

    let camera, scene, renderer;
    let cameraOrtho, sceneOrtho;

    let controls;

    let spriteTL, spriteTR, spriteBL, spriteBR, spriteC;

    let mapC;

    let group;
    let groupRayCastB;

    const  groupBasura = [];

    let sprite;

    const initPosArray = [-4.5,-3, -1.5, 0, 1.5, 3, 4.5];
    
    const mouse = new THREE.Vector2(), raycaster = new THREE.Raycaster();
    
	const pointer = new THREE.Vector2();
    
    const objects = [];
    
    // CANASTAS
    const S_CANASTA_COMPOSTA    = "textures/01Compostable.png";
    const S_CANASTA_RES         = "textures/02Reciclable.png";
    const S_CANASTA_BASURA      = "textures/03Basura.png";
    
    // BASURA COMPOSTA
    const S_BASURA_MANZANA      = "textures/Manzana.png";
    const S_BASURA_PLATANO      = "textures/Platano.png";
    const S_BASURA_PATA         = "textures/PataPollo.png";
    const S_BASURA_AGUACATE     = "textures/Aguacate.png";
    // const S_BASURA_SOBRAS       = "textures/Limon.png";
    const S_BASURA_HAMBUR       = "textures/Hamburguesa.png";
    // const S_BASURA_MANZANA_1    = "textures/Manzana1.png";

    // BASURA RECICLABLE
    const S_BASURA_BOTELLA_AGUA = "textures/Agua.png";
    const S_BASURA_SODA_CRISTAL = "textures/RefrescoCristal.png";
    const S_BASURA_SODA_PLASTICO= "textures/RefrescoPlastico.png";
    const S_BASURA_BOLSA        = "textures/BolsaPlatico.png";
    const S_BASURA_Cubiertos    = "textures/CucharaPlastico.png";
    const S_BASURA_Frasco       = "textures/FrascoCristal.png";
    const S_BASURA_CAJA         = "textures/CajaCarton.png";
    const S_BASURA_POPOTE       = "textures/Popote1.png";

    // BASURA BASURA
    const S_BASURA_BUBBLE       = "textures/Burbuja.png";
    const S_BASURA_Manguera     = "textures/Manguera.png";
    const S_BASURA_AEROSOL      = "textures/Aerosol.png";
    const S_BASURA_BATERIA      = "textures/Bateria.png";
    const S_BASURA_PANAL        = "textures/Panal.png";
    const S_BASURA_PAPAS        = "textures/BolsaPapitas.png";
    const S_BASURA_Zapato       = "textures/Zapato.png";
    const S_BASURA_MADERA       = "textures/Madera.png";
    const S_BASURA_FOCO         = "textures/Foco.png";

    // EDIFICIOS
    const EDIFICIO_A       = "textures/Build1.png";
    const EDIFICIO_B       = "textures/Build2.png";
    const EDIFICIO_C       = "textures/Build3.png";

    // UX
    const S_ERROR       = "textures/Error.png";
    const S_SUCCESS       = "textures/Correct.png";
    const S_PLUS_10       = "textures/Plus10.png";

    const basuraTextureArray_Composta = [
        S_BASURA_MANZANA, 
        S_BASURA_PLATANO,
        S_BASURA_PATA,
        S_BASURA_AGUACATE, 
        // S_BASURA_SOBRAS, 
        S_BASURA_HAMBUR ]
        // S_BASURA_MANZANA_1 ]

    const basuraTextureArray_Reciclable = [
        S_BASURA_BOTELLA_AGUA ,
        S_BASURA_SODA_CRISTAL ,
        S_BASURA_SODA_PLASTICO,
        S_BASURA_BOLSA        ,
        S_BASURA_Cubiertos    ,
        S_BASURA_Frasco       ,
        S_BASURA_CAJA         ,
        S_BASURA_POPOTE       ]

    const basuraTextureArray_basura = [
        S_BASURA_BUBBLE,
        S_BASURA_Manguera,
        S_BASURA_AEROSOL,
        S_BASURA_BATERIA,
        S_BASURA_PANAL,
        S_BASURA_PAPAS,
        S_BASURA_Zapato,
        S_BASURA_MADERA,
        S_BASURA_FOCO]

    let selected_Canasta = null;
    let selected_Basura = null;

    let BASURA_COLLECTED = 0;

    let SCORE = 0;
    let LIFES = 5;

    let CANASTA_A_COMPOSTA  = "Canasta_A";
    let CANASTA_B_RECICLABLE = "Canasta_B";
    let CANASTA_C_BASURA    = "Canasta_C";

    const BASURA_TYPE_COMPOSTA  = 1;
    const BASURA_TYPE_RECICLABE = 2;
    const BASURA_TYPE_BASURA    = 3;

    // Referencias a HTML
    const puntosLabel = "puntosLabel";
    const vidasLabel  = "vidasLabel";

    let velocidadCaida = 0.02;
    const velocidadCaida_2 = 0.04;
    const velocidadCaida_3 = 0.05;
    const velocidadCaida_4 = 0.03;

    var spawnVariable;
    let spawnTime = 3000;

    let spawnTime_Level2 = 500;
    let spawnTime_Level3 = 0;
    let spawnTime_Level4 = 0;

    var currentLevel = 1;


    function IncrementarVelocidad() 
    {
        if(BASURA_COLLECTED >= 4)
        {
            velocidadCaida = velocidadCaida_4;

            clearInterval(spawnVariable);
            spawnTime = spawnTime_Level2;
            spawnVariable =  setInterval(function(){ SpawnBasura(); }, spawnTime);
        }

    }

    function CheckDrop()
    {
        console.log("Check Drop");

        if (selected_Canasta == null) { return; } 
        if (selected_Basura == null) { return; }

        console.log("Check Drop - INFO Basura: " + selected_Basura.basuraType + " Canasta: " + selected_Canasta.name);
        
        if (selected_Canasta.name == CANASTA_A_COMPOSTA && selected_Basura.basuraType == BASURA_TYPE_COMPOSTA) 
        {
            Drop_Success(1);
            
        }
        else if (selected_Canasta.name == CANASTA_B_RECICLABLE && selected_Basura.basuraType == BASURA_TYPE_RECICLABE) 
        {
            Drop_Success(2);
        }
        else if (selected_Canasta.name == CANASTA_C_BASURA && selected_Basura.basuraType == BASURA_TYPE_BASURA) 
        {
            Drop_Success(3);
        }
        else if(selected_Canasta.name == CANASTA_A_COMPOSTA)
        {
            Drop_Error(1);
        }
        else if(selected_Canasta.name == CANASTA_B_RECICLABLE)
        {
            Drop_Error(2);
        }
        else if(selected_Canasta.name == CANASTA_C_BASURA)
        {
            Drop_Error(3);
        }
    }

    function Drop_Success(_pos)
    {
        console.log("=============--------- DROP SUCCESS!!!!!!! -----=======------============");
    
        SCORE += 125;
        BASURA_COLLECTED++;
        updatePuntos();
        IncrementarVelocidad();

        var canastaTemp;

        PlaySound_Success();

        if (_pos == 1) 
        {
            ShowErrorSuccess(canasta_Composta_Sprite, success_sprite);
            canastaTemp = canasta_Composta_Sprite;
        } 
        else if (_pos == 2) 
        {
            ShowErrorSuccess(canasta_Reciclable_Sprite, success_sprite);
            canastaTemp = canasta_Reciclable_Sprite;
        }
        else if (_pos == 3) 
        {
            ShowErrorSuccess(canasta_Basura_Sprite, success_sprite);
            canastaTemp = canasta_Basura_Sprite;
        }

        new TWEEN.Tween(canastaTemp.scale)
                    .to({
                        x: canastaScaleTween,
                        y: canastaScaleTween,
                        z: canastaScaleTween
                    }, 200)
                    .onComplete(() => {
                        new TWEEN.Tween(canastaTemp.scale)
                        .to({
                            x: canastaScale,
                            y: canastaScale,
                            z: canastaScale
                        }, 150)
                        .easing(TWEEN.Easing.Back.InOut)
                        .start();
                    })
                    .easing(TWEEN.Easing.Back.InOut)
                    .start();
        
                    // confetti({
                    //     particleCount: 200,
                    //     spread: 70,
                    //     origin: { 
                    //         x: 0.5,
                    //         y:  0.95}
                    //   });

                    //   console.log(( canastaTemp.position.x + 1) * window.innerWidth / 2);

                    var end = Date.now() + (0.5 * 1000);

                    // var colors = ['#bb0000', '#ffffff'];

                    (function frame() {
                    confetti({
                        particleCount: 4,
                        angle: 60,
                        spread: 80,
                        origin: { x: 0.1, y: 1 }
                        // colors: colors
                    });
                    confetti({
                        particleCount: 4,
                        angle: 120,
                        spread: 80,
                        origin: { x: 0.9, y: 1 }
                        // colors: colors
                    });

                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                    }());
        
        ShowPointUX();
    }

    function ShowPointUX() 
    {
        // plus_10_sprite.position.set(canasta_Composta_Sprite.position.x, 
        //                             canasta_Composta_Sprite.position.y,     
        //                             canasta_Composta_Sprite.position.z);

        // plus_10_sprite.visible = true;


    }

    function Drop_Error(_pos)
    {
        console.log("xxxxxxxxxxxxxxxxXxxxxx     DROP ERROR     xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        
        LIFES--;

        if (LIFES <= 0) 
        {
            ShowGameOverMenu();    
        }
        else
        {
            updateVidas();

        }

        PlaySound_Error();

        if (_pos == 1) 
        {
            ShowErrorSuccess(canasta_Composta_Sprite, error_sprite);
        } 
        else if (_pos == 2) 
        {
            ShowErrorSuccess(canasta_Reciclable_Sprite, error_sprite);
        }
        else if (_pos == 3) 
        {
            ShowErrorSuccess(canasta_Basura_Sprite, error_sprite);
        }
    }

    function ShowErrorSuccess(canastaPos, spriteParam)
    {
        spriteParam.position.set(  canastaPos.position.x, 
                                    canastaPos.position.y, 
                                    canastaPos.position.z );

        spriteParam.visible = true;

        new TWEEN.Tween(spriteParam.scale)
        .to({
            x: 2.5,
            y: 2.5,
            z: 2.5
        }, 100)
        .onComplete(() => {
            new TWEEN.Tween(spriteParam.scale)
            .to({
                x: 1.5,
                y: 1.5,
                z: 1
            }, 100)
            .easing(TWEEN.Easing.Cubic.Out)
            .start();
        })
        .easing(TWEEN.Easing.Cubic.In)
        .start();

        setTimeout(function() { HideSprite(spriteParam); }, 600);
    }

    function HideSprite(spriteNaneParam)
    {
        spriteNaneParam.visible = false;    
    }
    
    // * =====================================================================================================================================
    // * BASURA
    
    class Basura 
    {
        constructor(_basuraId, _basuraType)
        {   
            this.basuraType = _basuraType;
            this.basuraId = _basuraId;
            this.isActive = false;

            this.mapA = null;

            this.isBeingDragged = false;    
            this.spriteChido = null;

            console.log("Create Basura: Name: " + this.basuraId + " Type: " + this.basuraType);

            this.setBasuraSprite();
            
            scene.add( this.spriteChido );
            objects.push(this.spriteChido);

            this.setPositionSpawn();
        }

        setBasuraSprite()
        {
            if (this.basuraType == BASURA_TYPE_COMPOSTA) 
            {
                this.mapA = textureLoader.load( basuraTextureArray_Composta[Math.floor(Math.random() * basuraTextureArray_Composta.length)]);    
            }
            else if (this.basuraType == BASURA_TYPE_RECICLABE) 
            {
                this.mapA = textureLoader.load( basuraTextureArray_Reciclable[Math.floor(Math.random() * basuraTextureArray_Reciclable.length)]);    
            }
            else if (this.basuraType == BASURA_TYPE_BASURA) 
            {
                this.mapA = textureLoader.load( basuraTextureArray_basura[Math.floor(Math.random() * basuraTextureArray_basura.length)]);    
            }

            this.material = new THREE.SpriteMaterial( { map: this.mapA, fog: false } );

            this.isBeingDragged = false;    
            this.spriteChido = new THREE.Sprite( this.material );
            this.spriteChido.renderOrder = 10;
            this.spriteChido.name = this.basuraId;
        }

        getSpriteName()
        {
            return this.spriteChido.name;
        }

        hideS()
        {
            this.spriteChido.visible = false;
        }

        onAgarrado()
        {
            console.log("AGARRADO!!!!");
        }

        setSelected()
        {
            this.spriteChido.scale.set(1.2, 1.2, 1.2);
        }

        setNotSelected()
        {
            this.spriteChido.scale.set(1, 1, 1);
        }

        setPositionSpawn()
        {
            this.spriteChido.position.x = initPosArray[Math.floor(Math.random() * initPosArray.length)];
            this.spriteChido.position.y = 6;
            this.spriteChido.position.z = 1;
        }

        activateBasura()
        {
            if(this.isActive) { return; }

            this.spriteChido.visible = true;
            this.isActive = true;
            this.setPositionSpawn();
        }
        
        update()
        {
            if(!this.isActive) { return; }

            if(!this.isBeingDragged)
            {
                this.spriteChido.position.y -= velocidadCaida;
                this.spriteChido.material.rotation += 0.02;

                if(this.spriteChido.position.y < -7)
                {
                    this.isActive = false;
                }
            }
        }
    }
    
    init();
    animate();

    function onClick( event ) 
    {
        event.preventDefault();
        console.log("OnClick");

        const draggableObjects = controls.getObjects();
        draggableObjects.length = 0;

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera( mouse, camera );

        const intersections = raycaster.intersectObjects( objects, true );

        if ( intersections.length > 0 ) {

            const object = intersections[ 0 ].object;

            controls.transformGroup = true;
            draggableObjects.push( group );

        }

        if ( group.children.length === 0 ) {

            controls.transformGroup = false;
            draggableObjects.push( ...objects );

        }

        render();
    }

    function SetBuildings() 
    {
        return;

        const mapAB = textureLoader.load( EDIFICIO_C );
        const material = new THREE.SpriteMaterial( { map: mapAB, color: 0xffffff, fog: true } );

        let canastaAB = new THREE.Sprite( material );
        canastaAB.position.set(2, 0.0, 1);
        canastaAB.scale.set(4,4,4);
        // scene.background = canastaAB;

        scene.setba
        // canastaA.position.normalize();

        scene.add(canastaAB);

        return;

        // instantiate a loader
const loader = new SVGLoader();

// load a SVG resource
loader.load(
	// resource URL
	'textures/Recurso29.svg',
	// called when the resource is loaded
	function ( data ) {

		const paths = data.paths;
		const group = new THREE.Group();

		for ( let i = 0; i < paths.length; i ++ ) {

			const path = paths[ i ];

			const material = new THREE.MeshBasicMaterial( {
				color: path.color,
				side: THREE.DoubleSide,
				depthWrite: false
			} );

			const shapes = SVGLoader.createShapes( path );

			for ( let j = 0; j < shapes.length; j ++ ) {

				const shape = shapes[ j ];
				const geometry = new THREE.ShapeGeometry( shape );
				const mesh = new THREE.Mesh( geometry, material );
				group.add( mesh );

			}

		}

		scene.add( group );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);
    }

    function SetCanastas()
    {
        let yPos = -2.5;

        const mapA = textureLoader.load( S_CANASTA_COMPOSTA );
        const material = new THREE.SpriteMaterial( { map: mapA } );

        canasta_Composta_Sprite = new THREE.Sprite( material );
        canasta_Composta_Sprite.position.set(3, yPos, 1);
        canasta_Composta_Sprite.scale.set(canastaScale, canastaScale, canastaScale);
        canasta_Composta_Sprite.renderOrder = 5;
        // canastaA.position.normalize();

        scene.add(canasta_Composta_Sprite);
        canasta_Composta_Sprite.name = CANASTA_A_COMPOSTA;
        groupRayCastB.add(canasta_Composta_Sprite);

        //

        const mapB = textureLoader.load( S_CANASTA_RES );
        const materialB = new THREE.SpriteMaterial( { map: mapB, color: 0xffffff, fog: true } );

        canasta_Reciclable_Sprite = new THREE.Sprite( materialB );
        canasta_Reciclable_Sprite.position.set(0, yPos, 1);
        canasta_Reciclable_Sprite.scale.set(canastaScale, canastaScale, canastaScale);
        canasta_Reciclable_Sprite.renderOrder = 5;

        scene.add(canasta_Reciclable_Sprite);
        canasta_Reciclable_Sprite.name = CANASTA_B_RECICLABLE;
        groupRayCastB.add(canasta_Reciclable_Sprite);

        const mapC = textureLoader.load( S_CANASTA_BASURA );
        const materialC = new THREE.SpriteMaterial( { map: mapC, color: 0xffffff, fog: true } );

        canasta_Basura_Sprite = new THREE.Sprite( materialC );
        canasta_Basura_Sprite.position.set(-3, yPos, 1);
        canasta_Basura_Sprite.scale.set(canastaScale, canastaScale, canastaScale);
        canasta_Basura_Sprite.renderOrder = 5;

        scene.add(canasta_Basura_Sprite);
        canasta_Basura_Sprite.name = CANASTA_C_BASURA;
        groupRayCastB.add(canasta_Basura_Sprite);

        const map_Error = textureLoader.load( S_ERROR );
        const material_Error = new THREE.SpriteMaterial( { map: map_Error, color: 0xffffff, fog: true } );

        error_sprite = new THREE.Sprite( material_Error );
        error_sprite.scale.set(1.5,1.5,1);
        error_sprite.renderOrder = 100;
        error_sprite.visible = false;
        scene.add(error_sprite);

        const map_Success = textureLoader.load( S_SUCCESS );
        const material_Success = new THREE.SpriteMaterial( { map: map_Success, color: 0xffffff, fog: true } );

        success_sprite = new THREE.Sprite( material_Success );
        success_sprite.scale.set(3, 3, 3);
        success_sprite.renderOrder = 100;
        success_sprite.visible = false;

        scene.add(success_sprite);
    }

    function AddSpriteToScene(spriteName, refTo, showSprite) 
    {
        const map = textureLoader.load( spriteName );
        const mat = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );

        let sprite = new THREE.Sprite( mat );
        sprite.scale.set(1.5,1.5,1);
        sprite.renderOrder = 100;
        sprite.visible = showSprite;

        scene.add(sprite);

        refTo = sprite;
    }

    function init() 
    {
        containerChido = document.createElement( 'div' );
		document.body.appendChild( containerChido );

        width = window.innerWidth;
        height = window.innerHeight;

        camera = new THREE.PerspectiveCamera( 60, width / height, 1, 2100 );
        camera.position.z = 10;

        cameraOrtho = new THREE.OrthographicCamera( - width / 2, width / 2, height / 2, - height / 2, 1, 10 );
        cameraOrtho.position.z = 10;

        scene = new THREE.Scene();

        // var bgTexture = new THREE.TextureLoader().load("textures/Background.png");
        // bgTexture.minFilter = THREE.LinearFilter;
        // scene.background = bgTexture;

        // scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );

        

        // scene.fog = new THREE.Fog( 0x000000, 1500, 2100 );
        // scene.fog = new THREE.Fog( scene.background, 1, 5000 );


        // SetBackground();

        // AUDIO
        audioListener = new THREE.AudioListener();
        camera.add( audioListener );

        // load a sound and set it as the Audio object's buffer
        audioLoader = new THREE.AudioLoader();

        sceneOrtho = new THREE.Scene();
        textureLoader = new THREE.TextureLoader();

        const mapA = textureLoader.load( S_BASURA_SODA_CRISTAL );
        const material = new THREE.SpriteMaterial( { map: mapA, color: 0xffffff, fog: true } );

        sprite = new THREE.Sprite( material );
        sprite.position.set(width / 2, height / 2, 1);
        sprite.position.normalize();

        // scene.add( sprite );

        group = new THREE.Group();
		scene.add( group );

        groupRayCastB = new THREE.Group();
        scene.add( groupRayCastB );

        SetCanastas();
        SetBuildings();

        for (let i = 0; i < 15; i++) 
        {
            groupBasura.push(new Basura("basuraId_C_" + i, BASURA_TYPE_COMPOSTA));
        }

        for (let j = 0; j < 15; j++) 
        {
            groupBasura.push(new Basura("basuraId_R_" + j, BASURA_TYPE_RECICLABE));
        }

        for (let i = 0; i < 15; i++) 
        {
            groupBasura.push(new Basura("basuraId_B_" + i, BASURA_TYPE_BASURA));
        }

        // groupBasura.push(new Basura());
        
        // testBas = new Basura();
        // let testBasB = new Basura();

        // renderer

        renderer = new  THREE.WebGLRenderer({ alpha: true });
        
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.autoClear = false; // To allow render overlay on top of sprited sphere

        renderer.setClearColor( 0x000000, 0 );
        // scene.background = new THREE.Color( 0xff0000 );

        container.appendChild( renderer.domElement );
        // renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.shadowMap.enabled = true;

        document.body.appendChild( renderer.domElement );
        document.addEventListener( 'pointermove', onPointerMove );

        //

        window.addEventListener( 'resize', onWindowResize );

        controls = new threeDragcontrols( [ ... objects ], camera, renderer.domElement );
        
        controls.addEventListener( 'drag', render );

        controls.addEventListener( 'dragstart', function ( event ) {

	        // event.object
            console.log(event.object);

            for (let i = 0; i < groupBasura.length; i++) {
                
                if(groupBasura[i].basuraId === event.object.name)
                {
                    selected_Basura = groupBasura[i];
                    groupBasura[i].isBeingDragged = true;
                    // groupBasura[i].setSelected();;
                    return;
                }

            }

        } );

        controls.addEventListener( 'dragend', function ( event ) 
        {
            for (let i = 0; i < groupBasura.length; i++) 
            {    
                if(groupBasura[i].basuraId === event.object.name)
                {
                    groupBasura[i].isBeingDragged = false;
                    // groupBasura[i].setNotSelected();

                    if(selected_Canasta != null)
                        groupBasura[i].hideS();
                }
            }

            // CHECK DROP
            CheckDrop();

            selected_Basura = null;

        } );

        controls.addEventListener( 'hoveron', function ( event ) 
        {
            for (let i = 0; i < groupBasura.length; i++) 
            {    
                if(groupBasura[i].basuraId === event.object.name)
                {
                    groupBasura[i].setSelected();
                }
            }
        } );

        controls.addEventListener( 'hoveroff', function ( event ) 
        {
            for (let i = 0; i < groupBasura.length; i++) 
            {    
                if(groupBasura[i].basuraId === event.object.name)
                {
                    groupBasura[i].setNotSelected();
                }
            }
        } );

        controls.addEventListener( 'drag', function ( event ) 
        {
            // console.log("----------- DRAG");

            if (true) 
            {

            }
            else if(true)
            {

            }
        } );

        document.addEventListener( 'click', onClick );
        // document.getElementById("RetryButton").onclick = ResetGame();

        spawnVariable =  setInterval(function(){ SpawnBasura(); }, spawnTime);

        createText();

        listener = new THREE.AudioListener();
		camera.add( listener );

        PlaySong();

        AddSpriteToScene(S_PLUS_10, plus_10_sprite, false);

        updatePuntos();
        updateVidas();
    }

    let shuffleDone = false;

    function SpawnBasura()
    {
        console.log("Spawn Basura");

        let randomPos = Math.floor(Math.random() * groupBasura.length);
        
        if (!shuffleDone) 
        {
            shuffleDone = true;
            groupBasura.sort(function() { return 0.5 - Math.random() });
        }

        for (let i = 0; i < groupBasura.length; i++) 
        {
            if (!groupBasura[i].isActive) 
            {
                groupBasura[i].activateBasura();
                break;    
            }
        }
    }

    // * =====================================================================================================================================
    // * DRAG

    function onDStart()
    {
        console.log("On Drag Start");
        // event.object.material.emissive.set( 0xaaaaaa );
    }

    function onDEnd()
    {
        console.log("On Drag End");
    }

    // * =====================================================================================================================================
    // * 

    function onWindowResize() 
    {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        cameraOrtho.left = - width / 2;
        cameraOrtho.right = width / 2;
        cameraOrtho.top = height / 2;
        cameraOrtho.bottom = - height / 2;
        cameraOrtho.updateProjectionMatrix();

        // updateHUDSprites();

        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function animate() 
    {
        

        // testBas.update();
        for (let i = 0; i < groupBasura.length; i++) 
        {
            groupBasura[i].update();
        }

        requestAnimationFrame( animate );
        

        render();
        TWEEN.update();
    }

    function render() 
    {
        const time = Date.now() / 1000;

        renderer.clear();
        renderer.render( scene, camera );
        renderer.clearDepth();
        renderer.render( sceneOrtho, cameraOrtho );
    }

    // * =====================================================================================================================================
    // * 

    function onPointerMove( event ) 
    {
        if ( selected_Canasta ) {

            selected_Canasta.material.color.set( '#fff' );
            // selected_Canasta.scale.set(2, 2, 2);
            selected_Canasta = null;
        }

        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera( pointer, camera );

        const intersects = raycaster.intersectObject( groupRayCastB, true );

        if ( intersects.length > 0 ) {

            const res = intersects.filter( function ( res ) {

                return res && res.object;

            } )[ 0 ];

            if ( res && res.object ) {
                
                selected_Canasta = res.object;
                console.log("Pointer Move: " + selected_Canasta.name);
                selected_Canasta.material.color.set( '#08f' );
                // selected_Canasta.scale.set(2.3, 2.3 , 2.3);

            }

        }

    }

    // * =====================================================================================================================================
    // * 

    function createText()
    {
        // let textGeo = new TextGeometry( "ACHIS", {

        //     font: undefined,

        //     size: 70,
        //     height: 20,
        //     curveSegments: 4,

        //     bevelThickness: 2,
        //     bevelSize: 1.5,
        //     bevelEnabled: true

        // } );

        // textGeo.computeBoundingBox();

        // const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

        // let textMesh1 = new THREE.Mesh( textGeo);

        // textMesh1.position.x = 0;
        // textMesh1.position.y = 0;
        // textMesh1.position.z = 0;

        // textMesh1.rotation.x = 0;
        // textMesh1.rotation.y = Math.PI * 2;

        // scene.add( textMesh1 );
    }

    // * =====================================================================================================================================
    // * GAME OVER

    function ShowGameOverMenu() 
    {
        document.getElementById("overlay").style.display = "block";
    }
      
    function HideGameOverMenu() 
    {
        document.getElementById("overlay").style.display = "none";
    }

    function updatePuntos()
    {
        document.getElementById(puntosLabel).innerHTML = "PUNTOS: " + SCORE;
    }

    function updateVidas()
    {
        document.getElementById(vidasLabel).innerHTML = "VIDAS: " + LIFES;
    }

    function ResetGame() 
    {
        // location.reload();    
        console.log("Achis");
    }

    // * =====================================================================================================================================
    // * BACKGROUND

    function SetBackground() 
    {
        // return;
        // LIGHTS

				const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
				hemiLight.color.setHSL( 0.6, 1, 0.6 );
				hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
				hemiLight.position.set( 0, 50, 0 );
				scene.add( hemiLight );

				const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
				scene.add( hemiLightHelper );

				//

				const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
				dirLight.color.setHSL( 0.1, 1, 0.95 );
				dirLight.position.set( - 1, 1.75, 1 );
				dirLight.position.multiplyScalar( 30 );
				scene.add( dirLight );

				dirLight.castShadow = true;

				dirLight.shadow.mapSize.width = 2048;
				dirLight.shadow.mapSize.height = 2048;

				const d = 50;

				dirLight.shadow.camera.left = - d;
				dirLight.shadow.camera.right = d;
				dirLight.shadow.camera.top = d;
				dirLight.shadow.camera.bottom = - d;

				dirLight.shadow.camera.far = 3500;
				dirLight.shadow.bias = - 0.0001;

				const dirLightHelper = new THREE.DirectionalLightHelper( dirLight, 10 );
				// scene.add( dirLightHelper );

				// GROUND

				const groundGeo = new THREE.PlaneGeometry( 10000, 10000 );
				const groundMat = new THREE.MeshLambertMaterial( { color: 0xffffff } );
				groundMat.color.setHSL( 0.095, 1, 0.75 );

				const ground = new THREE.Mesh( groundGeo, groundMat );
				ground.position.y = - 33;
				ground.rotation.x = - Math.PI / 2;
				ground.receiveShadow = true;
				scene.add( ground );

				// SKYDOME

				const vertexShader = document.getElementById( 'vertexShader' ).textContent;
				const fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
				const uniforms = {
					"topColor": { value: new THREE.Color( 0x0077ff ) },
					"bottomColor": { value: new THREE.Color( 0xffffff ) },
					"offset": { value: 33 },
					"exponent": { value: 0.6 }
				};
				uniforms[ "topColor" ].value.copy( hemiLight.color );

				scene.fog.color.copy( uniforms[ "bottomColor" ].value );

				const skyGeo = new THREE.SphereGeometry( 1000, 32, 15 );
				const skyMat = new THREE.ShaderMaterial( {
					uniforms: uniforms,
					vertexShader: vertexShader,
					fragmentShader: fragmentShader,
					side: THREE.BackSide
				} );

				const sky = new THREE.Mesh( skyGeo, skyMat );
				scene.add( sky );    
    }

    // * =====================================================================================================================================
    // * AUDIO

    function PlaySong() 
    {
        // return;

        // create a global audio source
        const sound = new THREE.Audio( audioListener );

        audioLoader.load( 'sounds/TrashCanSong.mp3', function( buffer ) {
            sound.setBuffer( buffer );
            sound.setLoop( true );
            sound.setVolume( 0.3 );
            sound.play();
        });

        // const sound1 = new THREE.PositionalAudio( listener );
        // const songElement = document.getElementById( 'song' );
        // sound1.setLoop( true );
        // sound1.setMediaElementSource( songElement );
        // sound1.setRefDistance( 20 );
        // sound1.setVolume( 0.3 );
        // songElement.play();
    }

    function PlaySound_Error() 
    {
        const sound = new THREE.Audio( audioListener );

        audioLoader.load( 'sounds/Wrong.mp3', function( buffer ) {
            sound.setBuffer( buffer );
            sound.setLoop( false );
            sound.setVolume( 0.2 );
            sound.play();
        });
    }

    function PlaySound_Success() 
    {
        const sound = new THREE.Audio( audioListener );

        audioLoader.load( 'sounds/Correct.mp3', function( buffer ) {
            sound.setBuffer( buffer );
            sound.setLoop( false );
            sound.setVolume( 0.3 );
            sound.play();
        });
    }
