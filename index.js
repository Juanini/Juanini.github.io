import * as THREE from '/build/three.module.js';
import * as CONST from '/Const.js';
import { DragControls } from '/jsm/controls/DragControls.js';

    var testBas;

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
    
    // BASURA
    const S_BASURA_SODA         = "textures/CristalSoda.png";
    const S_BASURA_PAPAS        = "textures/Bolsapapitas.png";
    const S_BASURA_CEL          = "textures/Celular.png";
    const S_BASURA_Cubiertos    = "textures/Cubiertos.png";
    const S_BASURA_Frasco       = "textures/FrascoCristal.png";
    const S_BASURA_Manguera     = "textures/Manguera.png";
    const S_BASURA_Manzana      = "textures/Manzana.png";
    const S_BASURA_Zapato       = "textures/Zapato.png";

    // const basuraTextureArray_Reciclable = [S_BASURA_CEL, S_BASURA_Cubiertos, S_BASURA_Frasco, S_BASURA_Manguera, 
    //     S_BASURA_Manzana, S_BASURA_PAPAS, S_BASURA_SODA, S_BASURA_Zapato];

    const basuraTextureArray_Composta = [S_BASURA_Manzana];

    const basuraTextureArray_Reciclable = [S_BASURA_SODA];

    const basuraTextureArray_basura = [S_BASURA_Zapato];

    let selected_Canasta = null;
    let selected_Basura = null;

    let SCORE = 0;
    let LIFES = 3;

    let CANASTA_A_COMPOSTA  = "Canasta_A";
    let CANASTA_B_RECICLABLE = "Canasta_B";
    let CANASTA_C_BASURA    = "Canasta_C";

    const BASURA_TYPE_COMPOSTA  = 1;
    const BASURA_TYPE_RECICLABE = 2;
    const BASURA_TYPE_BASURA    = 3;

    // Referencias a HTML
    const puntosLabel = "puntosLabel";
    const vidasLabel  = "vidasLabel";

    function CheckDrop()
    {
        console.log("Check Drop");

        if (selected_Canasta == null) { return; } 
        if (selected_Basura == null) { return; }

        console.log("Check Drop - INFO Basura: " + selected_Basura.basuraType + " Canasta: " + selected_Canasta.name);
        
        if (selected_Canasta.name == CANASTA_A_COMPOSTA && selected_Basura.basuraType == BASURA_TYPE_COMPOSTA) 
        {
            Drop_Success();
        }
        else if (selected_Canasta.name == CANASTA_B_RECICLABLE && selected_Basura.basuraType == BASURA_TYPE_RECICLABE) 
        {
            Drop_Success();
        }
        else if (selected_Canasta.name == CANASTA_C_BASURA && selected_Basura.basuraType == BASURA_TYPE_BASURA) 
        {
            Drop_Success();
        }
        else
        {
            Drop_Error();
        }
    }

    function Drop_Success()
    {
        console.log("=============--------- DROP SUCCESS!!!!!!! -----=======------============");
        document.getElementById("StatusInfo").innerHTML = "CORRECTO!!";
        SCORE += 125;
        updatePuntos();
    }

    function Drop_Error()
    {
        console.log("xxxxxxxxxxxxxxxxXxxxxx     DROP ERROR     xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        document.getElementById("StatusInfo").innerHTML = "ERROR :(";
        LIFES--;

        if (LIFES <= 0) 
        {
            ShowGameOverMenu();    
        }
        else
        {
            updateVidas();

        }
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

            console.log("Create Basura: Name: " + this.basuraId + " Type: " + this.basuraType);

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

            this.material = new THREE.SpriteMaterial( { map: this.mapA, color: 0xffffff, fog: true } );

            this.isBeingDragged = false;    
            this.spriteChido = new THREE.Sprite( this.material );
            this.spriteChido.name = _basuraId;
            
            scene.add( this.spriteChido );
            objects.push(this.spriteChido);

            this.setPositionSpawn();
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
                this.spriteChido.position.y -= 0.03;
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

    function SetCanastas()
    {
        const mapA = textureLoader.load( S_CANASTA_COMPOSTA );
        const material = new THREE.SpriteMaterial( { map: mapA, color: 0xffffff, fog: true } );

        let canastaA = new THREE.Sprite( material );
        canastaA.position.set(2, -2.0, 1);
        canastaA.scale.set(1.5,1.5,1);
        // canastaA.position.normalize();

        scene.add(canastaA);
        canastaA.name = CANASTA_A_COMPOSTA;
        groupRayCastB.add(canastaA);

        //

        const mapB = textureLoader.load( S_CANASTA_RES );
        const materialB = new THREE.SpriteMaterial( { map: mapB, color: 0xffffff, fog: true } );

        let canastaB = new THREE.Sprite( materialB );
        canastaB.position.set(0, -2.0, 1);
        canastaB.scale.set(1.5,1.5,1);

        // canastaB.position.normalize();

        //

        scene.add(canastaB);
        canastaB.name = CANASTA_B_RECICLABLE;
        groupRayCastB.add(canastaB);

        const mapC = textureLoader.load( S_CANASTA_BASURA );
        const materialC = new THREE.SpriteMaterial( { map: mapC, color: 0xffffff, fog: true } );

        let canastaC = new THREE.Sprite( materialC );
        canastaC.position.set(-2, -2.0, 1);
        canastaC.scale.set(1.5,1.5,1);

        // canastaC.position.normalize();

        scene.add(canastaC);
        canastaC.name = CANASTA_C_BASURA;
        groupRayCastB.add(canastaC);
    }

    function init() {

        // console.log("Init Test");

        containerChido = document.createElement( 'div' );
		document.body.appendChild( containerChido );

        width = window.innerWidth;
        height = window.innerHeight;

        camera = new THREE.PerspectiveCamera( 60, width / height, 1, 2100 );
        camera.position.z = 10;

        cameraOrtho = new THREE.OrthographicCamera( - width / 2, width / 2, height / 2, - height / 2, 1, 10 );
        cameraOrtho.position.z = 10;

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog( 0x000000, 1500, 2100 );

        sceneOrtho = new THREE.Scene();
        textureLoader = new THREE.TextureLoader();

        const mapA = textureLoader.load( S_BASURA_SODA );
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

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.autoClear = false; // To allow render overlay on top of sprited sphere

        document.body.appendChild( renderer.domElement );
        document.addEventListener( 'pointermove', onPointerMove );

        //

        window.addEventListener( 'resize', onWindowResize );

        console.log("Init Test 2");

        // objects.push(sprite);
        // objects.push(testBas);

        controls = new DragControls( [ ... objects ], camera, renderer.domElement );
        
        controls.addEventListener( 'drag', render );

        controls.addEventListener( 'dragstart', function ( event ) {

	        // event.object
            console.log(event.object);

            for (let i = 0; i < groupBasura.length; i++) {
                
                if(groupBasura[i].basuraId === event.object.name)
                {
                    selected_Basura = groupBasura[i];
                    groupBasura[i].isBeingDragged = true;
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
            // console.log("----------- HOVER");
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

        setInterval(function(){ SpawnBasura(); }, 1500);

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

            }

        }

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