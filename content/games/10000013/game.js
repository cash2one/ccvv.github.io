<!--
function isArrayContains(e, t) {
    return -1 < e.indexOf(t)
}
function addToArray(e, t) {
    isArrayContains(e, t) || e.push(t)
}
function removeFromArray(e, t) {
    isArrayContains(e, t) && e.splice(e.indexOf(t, 0), 1)
}
function setCacheFromOther(e, t) {
    e.cacheCanvas = t.cacheCanvas;
    e.cacheID = t.cacheID;
    e._cacheWidth = t._cacheWidth;
    e._cacheHeight = t._cacheHeight;
    e._cacheOffsetX = t._cacheOffsetX;
    e._cacheOffsetY = t._cacheOffsetY;
    e._cacheScale = t._cacheScale
}
function deleteCache(e) {
    e.cacheCanvas = null ;
    e.cacheID = 0
}
function trace(e) {
    isLevelEditor && console.log(e)
}
function onHoverScale(e) {
    e.scaleX = e.scaleY = 1.2 * spriteScale * (e.defaultScale ? e.defaultScale : 1)
}
function onOutScale(e) {
    e.scaleX = e.scaleY = spriteScale * (e.defaultScale ? e.defaultScale : 1)
}
function removeFromParent(e) {
    e.parent && e.parent.removeChild(e)
}
function addToParent(e, t) {
    removeFromParent(e);
    t && t.addChild(e)
}
function setSpriteScale(e, t) {
    e.scaleX = e.scaleY = t
}
function setTextAndCenter(e, t, n, r) {
    r.text != n && (r.text = n,
    n = r.getBounds(),
    r.x = e - (n.width >> 1) * r.scaleX,
    t && (r.y = t - (n.height >> 1) * r.scaleY))
}
function setAnimationSpeed(e, t) {
    e._animation.speed = t
}
function setNextAnimation(e, t) {
    e._animation.next = t
}
function randomizeAnimFrame(e) {
    e.currentAnimationFrame = Math.floor(30 * Math.random())
}
function createSponsorLogo() {
    spilLogo = createButton(160, 322, .8, sponsorLogoFrame, sponsorClick, null , null )
}
function showSponsorLogo(e, t, n, r, i, s, o, u) {
    spilLogo || createSponsorLogo();
    isSponsorLogoError || (addToParent(spilLogo, r),
    logoDefaultY = t,
    logoDefaultX = e,
    currentLogoHorizPos = s,
    currentLogoVertPos = o,
    spilLogo.scaleX = spilLogo.scaleY = n,
    spilLogo.alpha = i ? i : 1,
    logoPosDivisor = u,
    updateLogoPos(),
    (e = zoeSS.getAnimation(sponsorLogoFrame)) && e.frames && 0 < e.frames.length && (e = zoeSS.getFrameBounds(e.frames[0]),
    spilLogo.setBoundingBox(e.x * n, e.y * n, e.width * n, e.height * n)))
}
function updateLogoPos() {
    spilLogo && !isSponsorLogoError && (spilLogo.x = logoDefaultX,
    spilLogo.y = logoDefaultY,
    currentLogoHorizPos === LOGO_LEFT_POS ? spilLogo.x += deltaForHLeft() : currentLogoHorizPos === LOGO_RIGHT_POS && (spilLogo.x -= deltaForHLeft()),
    currentLogoVertPos === LOGO_TOP_POS ? spilLogo.y += deltaForVTop() / logoPosDivisor : currentLogoVertPos === LOGO_BOTTOM_POS && (spilLogo.y -= deltaForVTop() / logoPosDivisor))
}
function startSponsorAds() {
    sponsorApi && (isAdPauseSoundMuted = isMute,
    sponsorApi.GameBreak.request(onAdBeginPause, onAdEndUnpause))
}
function onAdBeginPause() {
    trace("ad pause, , sound is muted: " + isMute);
    isAdPauseSoundMuted = isMute;
    isMute = !0;
    stopBgMusic();
    stopWindSound()
}
function onAdEndUnpause() {
    trace("ad unpause, sound was muted: " + isAdPauseSoundMuted);
    (isMute = isAdPauseSoundMuted) || playBgMusic()
}
function showTopLogo(e) {
    showSponsorLogo(160, 26, .7 * e, container, 1, LOGO_HORIZ_ANY_POS, LOGO_TOP_POS, 2)
}
function initSpilApi() {
    try {
        trace(GameAPI),
        GameAPI.loadAPI(function(e) {
            sponsorApi = e;
            logoConfig = sponsorApi.Branding.getLogo();
            showPreloaderLogo();
            isLogoReady = !0;
            trace(GameAPI.Branding.getLinks("more_games"));
            trace("list");
            trace(sponsorApi.Branding.getLogo())
        })
    } catch (e) {
        trace("init api fail!"),
        isSponsorLogoError = !0,
        isAllFilesLoaded && startGame()
    }
}
function handleFileLoadError(e) {
    trace("Logo loading error!");
    isSponsorLogoError = !0
}
function handleSponsorLogoComplete(e) {
    if (!isSponsorLogoError)
        try {
            spilLogo || createSponsorLogo();
            trace("logo loaded!");
            var t = files.sponsorLogoImg
              , n = sponsorLogoDefWidth = t.width
              , r = sponsorLogoDefHeight = t.height
              , i = sponsorLogoBitmap = (new createjs.Bitmap(t)).set({
                scaleX: 1,
                scaleY: 1,
                regX: 0,
                regY: 0,
                cursor: "pointer",
                x: 0,
                y: 0
            });
            i.isOnlyBoundsCheck = !0;
            i.setBoundingBox(0, 0, 1 * n, 1 * r);
            i.addEventListener("mousedown", sponsorClick);
            spilLogo.addChild(i);
            loaderBar && showSponsorLogo(160, 80, 1, loaderBar, 1, LOGO_HORIZ_ANY_POS, LOGO_VERTICAL_ANY_POS, 2);
            isLogoReady = !0
        } catch (s) {
            isSponsorLogoError = !0,
            trace("logo error!")
        }
    isAllFilesLoaded && startGame()
}
function initParticleManager() {
    container.addChild(particleContainer)
}
function createPartExplode(e, t, n, r, i, s) {
    for (var o, u = 0; u < n; u++) {
        o = u * (2 * Math.PI / n);
        partSin = Math.cos(o);
        partCos = Math.sin(o);
        o = createPart(r, e, t, 1, i ? i : particleContainer);
        if (!o)
            break;
        setParticleParamsByIndex(o, s ? s : 0)
    }
}
function setParticleParamsByIndex(e, t) {
    var n = 1.3;
    e.gravity = 0;
    e.speedA = 20 * Math.random();
    0 === t ? (e.maxScale = .7,
    e.beforeHideTimer = .2 * FPS,
    partScale = .2 + .2 * Math.random()) : 1 === t ? (n = 4,
    e.maxScale = 1.3,
    e.beforeHideTimer = .3 * FPS,
    e.gravity = 0,
    e.speedAlpha = .05,
    e.speedA = 20 * Math.random(),
    partScale = .4 + .6 * Math.random()) : 2 === t ? (n = 2,
    e.maxScale = 1.3,
    e.vis.alpha = 1,
    e.beforeHideTimer = .3 * FPS,
    e.speedA = 20 * Math.random(),
    partScale = .4 + .6 * Math.random()) : 3 === t && (n = 1.3,
    e.gravity = 0,
    e.speedA = 20 * Math.random(),
    e.maxScale = .7,
    e.beforeHideTimer = .1 * FPS,
    e.gravity = 0,
    e.speedAlpha = .05,
    partScale = .6,
    e.vis.alpha = 1);
    e.vis.scaleX = e.vis.scaleY = partScale;
    e.speedX = (n + Math.random() * n) * partCos;
    e.speedY = (n + Math.random() * n) * partSin
}
function createDiePart(e, t) {
    var n = createPart(PART_NUM_TYPE, e, t, 1, particleContainer);
    n && (n.setNum(11),
    n.setFrame("deathanimv", !0),
    n.speedAlpha = .05,
    n.beforeHideTimer = 1.5 * FPS,
    n.speedX = 0,
    n.speedY = -1,
    n.speedA = 0)
}
function createGoodPlayExplode(e, t) {
    for (var n, r = 0 == t ? 90 : -120, i = 0; 8 > i; i++) {
        var s = i * (Math.PI / 2 / 8) - Math.PI / 4;
        0 < t && (s += Math.PI);
        var o = Math.cos(s)
          , s = Math.sin(s);
        n = .2 + .2 * Math.random();
        n = createPart(PART_STAR_TYPE, r, 0, n, monsterCont);
        if (!n)
            break;
        n.setFrame("particle1v");
        n.speedAlpha = .1;
        n.speedScale = .02;
        n.vis.visible = !1;
        n.beforeHideTimer = .5 * FPS;
        n.maxScale = .6;
        n.speedX = (1.5 + 1.5 * Math.random()) * o;
        n.speedY = (1.5 + 1.5 * Math.random()) * s;
        n.speedA = 20 * Math.random()
    }
}
function createNumPart(e, t, n) {
    if (e = createPart(PART_NUM_TYPE, e, t, .8, particleContainer))
        e.setNum(n),
        e.beforeHideTimer = .2 * FPS,
        e.speedX = 0,
        e.speedY = -.8,
        e.speedA = 0
}
function createPrerenderedPart(e, t, n, r, i, s, o) {
    if (e = createPart(PART_NUM_TYPE, e, t, n, particleContainer))
        e.setFrame(r, !0),
        setNextAnimation(e.vis, ""),
        o && setAnimationSpeed(e.vis, o),
        e.isPrerendered = !0,
        s && (e.moveTarget = s),
        e.beforeHideTimer = i * GAME_FPS,
        e.speedX = 0,
        e.speedY = 0,
        e.speedA = 0,
        e.gravity = 0,
        e.vis.rotation = 0
}
function createGlassRectExplode(e, t, n, r) {
    for (var i, s = 0; 5 > s; s++) {
        var o = r * Math.PI / 180;
        i = Math.cos(o);
        var o = Math.sin(o)
          , u = (24.4 * s - 60) * n;
        i = createPart(PART_GLASS_TYPE, e + u * i, t + u * o, 1, particleContainer);
        if (!i)
            break;
        i.gravity = 0;
        i.speedA = 20 * Math.random();
        i.maxScale = .7;
        i.beforeHideTimer = .1 * FPS;
        i.gravity = 0;
        i.speedAlpha = .05;
        partScale = .6;
        i.vis.scaleX = i.vis.scaleY = partScale;
        i.speedX = 1.3 - 2.6 * Math.random();
        i.speedY = 1.3 - 2.6 * Math.random()
    }
}
function createAwesomePart() {
    var e = createPart(PART_NUM_TYPE, 160, topVisionLine + viewportH / 2, 1, particleContainer);
    e && (e.setNum(11),
    e.speedAlpha = 1,
    e.beforeHideTimer = 1.5 * FPS,
    e.speedX = 0,
    e.speedY = 0,
    e.speedA = 0,
    e.vis.rotation = -360,
    e.vis.scaleX = e.vis.scaleY = .1,
    createjs.Tween.get(e.vis, {
        override: !0
    }).to({
        rotation: 0,
        scaleX: 1,
        scaleY: 1
    }, 600).wait(600).to({
        alpha: 0
    }, 200))
}
function createAchievPart(e) {
    for (var t = 210, n = 10, r = 0, i, s = 0; s < allParts.length; s++)
        i = allParts[s],
        i.type === PART_ACHIEV_TYPE && (t = i.vis.y - 50,
        n += 200,
        r++);
    if (i = createPart(PART_ACHIEV_TYPE, -130, t, .8, container))
        i.setFrame("achievdesc" + e),
        i.speedAlpha = 1,
        i.beforeHideTimer = 3.2 * FPS + .2 * r,
        i.speedX = 0,
        i.speedY = 0,
        i.speedA = 0,
        i.vis.rotation = 0,
        i.vis.scaleX = i.vis.scaleY = .7,
        i.vis.alpha = 1,
        createjs.Tween.get(i.vis, {
            override: !0
        }).wait(n).to({
            x: 5
        }, 600, menuEase).wait(2e3).to({
            x: -130
        }, 400, createjs.Ease.sineIn)
}
function createPart(e, t, n, r, i) {
    var s;
    allPartsLenght = allParts.length;
    if (allPartsLenght > MAX_PARTICLES_ON_SCREEN) {
        for (var o = 0; o < allPartsLenght; o++)
            if (allParts[o].type === PART_STAR_TYPE) {
                s = allParts[o];
                break
            }
        s || (s = allParts[0]);
        s.reset(e, i, r)
    } else
        s = gePartFromPool(e, i, r);
    s.setPos(t, n);
    isArrayContains(allParts, s) || allParts.push(s);
    return s
}
function addToDisposedParts(e) {
    isArrayContains(disposedParts, e) || disposedParts.push(e)
}
function gePartFromPool(e, t, n) {
    if (0 < disposedParts.length) {
        var r = disposedParts.pop();
        r.reset(e, t, n);
        return r
    }
    return new ParticleBase(e,t,n)
}
function updatePartManager() {
    partLength = allParts.length;
    for (var e = 0; e < partLength; e++)
        currPart = allParts[e],
        currPart.tick(),
        currPart.isNeedDispose && disposeNeededParts.push(currPart);
    for (; 0 < disposeNeededParts.length; )
        disposeNeededParts.pop().dispose()
}
function initPhysics(e) {
    isLevelEditor && isEditorDebug && (isPhysicsDebugDraw = !0);
    isPhysicsDebugDraw && !e && (debugCanvas = document.createElement("canvas"),
    debugCanvas.id = "debugCanvas",
    debugCanvas.width = 320,
    debugCanvas.height = 356,
    debugCanvas.style.position = "absolute",
    debugCanvas.style.left = "50%",
    debugCanvas.style.top = "10%",
    debugCanvas.style.zIndex = "1",
    debugCanvas.style.pointerEvents = "none",
    document.body.appendChild(debugCanvas),
    ChipMunkDebugDrawer.prototype.canvas = debugCanvas,
    ChipMunkDebugDrawer.prototype.ctx = debugCanvas.getContext("2d"),
    onWindowResize(null ));
    debugDraw = new ChipMunkDebugDrawer;
    space = debugDraw.space;
    space.iterations = 10;
    space.gravity = v(0, 500);
    space.sleepTimeThreshold = 1;
    space.collisionSlop = 1;
    space.addCollisionHandler(1, 0, null , onSensorContactPreSolve, null , null );
    space.addCollisionHandler(2, 0, onGlassContactBegin, null , null , null );
    space.addCollisionHandler(2, 2, onGlassContactBegin, null , null , null );
    trace("reinit")
}
function onGlassContactBegin(e, t) {
    objA = e.body_a.userdata;
    objB = e.body_b.userdata;
    collidedGlass = collidedAim = null ;
    if (objA && objB && (objA.isGlass ? (collidedGlass = objA,
    collidedAim = objB) : objB.isGlass && (collidedGlass = objB,
    collidedAim = objA),
    collidedGlass)) {
        (collidedBody = collidedAim.physBody) && collidedAim.physBody.isStatic() && (collidedBody = collidedGlass.physBody);
        if (!collidedBody)
            return !0;
        var n = collidedBody.vx
          , r = collidedBody.vy;
        Math.sqrt(n * n + r * r) > GLASS_BREAK_VELOCITY && (addToArray(clickedChars, collidedGlass),
        collidedAim.isGlass && addToArray(clickedChars, collidedAim))
    }
    return !0
}
function onSensorContactPreSolve(e, t, n) {
    objA = e.body_a.userdata;
    objB = e.body_b.userdata;
    collidedSensor = collidedAim = null ;
    objA && objB && (e.a.sensor ? (collidedSensor = objA,
    collidedAim = objB) : e.b.sensor && (collidedSensor = objB,
    collidedAim = objA),
    collidedSensor && collidedSensor.isActivated && collidedAim.physBody && (dx = collidedAim.vis.x - collidedSensor.vis.x,
    dy = collidedAim.vis.y - collidedSensor.vis.y,
    dist = Math.sqrt(dx * dx + dy * dy),
    force = Math.max(0, 1 - dist / collidedSensor.activDistance),
    force = force * collidedSensor.activForce * collidedAim.physBody.m,
    angle = collidedSensor.vis.rotation * DEGREES_TO_RAD,
    collidedSensor.isReversed && (angle += Math.PI),
    collidedAim.physBody.applyImpulse(v(force * Math.cos(angle), force * Math.sin(angle)), cp.vzero)));
    return !0
}
function createCircleShape(e, t, n, r, i, s) {
    var o = !1
      , u = .5
      , a = .3;
    r === HERO_TYPE || r === HERO_DOC_TYPE ? a = .8 : r === FAN_TYPE && (o = !0,
    u = .8,
    a = 0);
    o ? (o = new cp.Body(Infinity,Infinity),
    o.nodeIdleTime = Infinity) : o = space.addBody(new cp.Body(1,cp.momentForCircle(1, 0, n, v(0, 0))));
    o.setPos(v(e, t));
    o.setAngle(i);
    e = space.addShape(new cp.CircleShape(o,n,v(0, 0)));
    e.setElasticity(a);
    e.setFriction(u);
    r === FAN_TYPE && (r = s.isReversed ? space.addShape(new cp.BoxShape2(o,new cp.BB(-s.activDistance,-15,0,15))) : space.addShape(new cp.BoxShape2(o,new cp.BB(0,-15,s.activDistance,15))),
    r.setSensor(!0),
    r.setCollisionType(1));
    return o
}
function createRectPhysics(e, t, n, r, i, s) {
    var o = DEFAULT_RECT_SIZE
      , u = DEFAULT_RECT_SIZE
      , a = !1
      , f = .6
      , l = 0
      , c = .001;
    i === PHYSICS_RECT_TYPE ? a = !0 : i === DYNAMIC_BOX_TYPE ? (u = o = DEFAULT_BOX_SIZE,
    f = .8) : i === HARD_BOX_TYPE ? (o = 30 / PHYS_SCALE,
    u = 30 / PHYS_SCALE,
    f = .8) : i === STATIC_BOX_TYPE ? (o = 30 / PHYS_SCALE,
    u = 30 / PHYS_SCALE,
    f = .8,
    a = !0) : i === DANGER_TYPE ? (o = 100 / PHYS_SCALE,
    u = 18 / PHYS_SCALE) : i === PHYSICS_MAN_BLOCK_TYPE ? (o = 194 / PHYS_SCALE,
    u = 23 / PHYS_SCALE) : i === GLASS_BLOCK_TYPE ? (o = 103 / PHYS_SCALE,
    u = 20 / PHYS_SCALE,
    l = 2) : i === GLASS_BOX_TYPE ? (o = 30 / PHYS_SCALE,
    u = 30 / PHYS_SCALE,
    l = 2) : i === DOOR_TYPE ? (o = 122 / PHYS_SCALE,
    u = 18 / PHYS_SCALE) : i === DYNAMIC_RECT_TYPE ? (o = 109 / PHYS_SCALE,
    u = 20 / PHYS_SCALE,
    f = .8) : i === HARD_RECT_TYPE ? (o = 109 / PHYS_SCALE,
    u = 20 / PHYS_SCALE,
    f = .8,
    c = 1 / 1500) : i === STATIC_BALK_1_TYPE && (o = 109 / PHYS_SCALE,
    u = 20 / PHYS_SCALE,
    f = .8,
    a = !0);
    n *= o;
    r *= u;
    a ? (a = new cp.Body(Infinity,Infinity),
    a.nodeIdleTime = Infinity) : (a = n * r * c,
    a = space.addBody(new cp.Body(a,cp.momentForBox(a, n, r))));
    a.setPos(v(e, t));
    a.setAngle(s);
    e = space.addShape(new cp.BoxShape(a,n,r));
    e.setCollisionType(l);
    e.setFriction(f);
    e.setElasticity(0);
    return a
}
function createKinematicPhysics(e, t, n, r, i, s, o) {
    n = .8;
    var u = 0, a = 0, f;
    f = new cp.Body(Infinity,Infinity);
    f.setPos(v(e, t));
    f.setAngle(s);
    i === TELEGA_TYPE ? (u = 105 / PHYS_SCALE * r,
    a = 20 / PHYS_SCALE * r,
    o = 0,
    e = space.addShape(new cp.BoxShape2(f,new cp.BB(-u / 2,o * r,u / 2,a + o))),
    e.setFriction(n),
    e.setElasticity(0),
    o = 20,
    e = space.addShape(new cp.BoxShape2(f,new cp.BB(-u / 2,-20 * r,-u / 2 + o,a))),
    e.setFriction(1),
    e.setElasticity(0),
    e = space.addShape(new cp.BoxShape2(f,new cp.BB(u / 2 - o,-20 * r,u / 2,a))),
    e.setFriction(0),
    e.setElasticity(0)) : i === AIM_TYPE ? (u = 50 / PHYS_SCALE * r,
    a = 40 / PHYS_SCALE * r,
    n = .2,
    e = (t = o.isReversed) ? space.addShape(new cp.SegmentShape(f,v(u / 2, a / 2),v(u / 2 - 3 * r, -16 * r),3)) : space.addShape(new cp.SegmentShape(f,v(-u / 2, a / 2),v(-u / 2 + 3 * r, -16 * r),3)),
    e.setFriction(n),
    e.setElasticity(0),
    e = t ? space.addShape(new cp.SegmentShape(f,v(u / 2 - 8 * r, -19 * r),v(-10 * r, -40 * r),3)) : space.addShape(new cp.SegmentShape(f,v(-u / 2 + 8 * r, -19 * r),v(10 * r, -40 * r),3)),
    e.setFriction(n),
    e.setElasticity(0),
    e = t ? space.addShape(new cp.SegmentShape(f,v(-10 * r, -40 * r),v(-35 * r, -40 * r),3)) : space.addShape(new cp.SegmentShape(f,v(10 * r, -40 * r),v(35 * r, -40 * r),3)),
    e.setFriction(n),
    e.setElasticity(.7),
    o.isMovable && (e = t ? space.addShape(new cp.SegmentShape(f,v(-97 * r, 37 * r),v(25 * r, 37 * r),4)) : space.addShape(new cp.SegmentShape(f,v(-25 * r, 37 * r),v(97 * r, 37 * r),4)),
    e.setFriction(n),
    e.setElasticity(0))) : i === MOVABLE_BALK_TYPE && (u = 105 / PHYS_SCALE * r,
    a = 20 / PHYS_SCALE * r,
    e = space.addShape(new cp.BoxShape2(f,new cp.BB(-u / 2,-a / 2,u / 2,a / 2))),
    e.setFriction(n),
    e.setElasticity(0));
    return f
}
function createSegmentPhysics(e, t, n, r, i, s, o) {
    o = new cp.Body(Infinity,Infinity);
    o.nodeIdleTime = Infinity;
    o.setPos(v(e, t));
    o.setAngle(s);
    i === LAND_TYPE && (e = space.addShape(new cp.SegmentShape(o,v(-60 * n, -22 * r),v(60 * n, -22 * r),5)),
    e.setFriction(.8),
    e.setElasticity(0));
    return o
}
function createTrianglePhysics(e, t, n, r, i, s) {
    var o = 0;
    n *= 51;
    var u = 45 * r;
    r = [-n / 2, -u / 2, 0, u / 2, n / 2, -u / 2];
    n = .001 * n * u;
    n = space.addBody(new cp.Body(n,cp.momentForPoly(n, r, cp.vzero)));
    r = space.addShape(new cp.PolyShape(n,r,cp.vzero));
    r.setFriction(.6);
    r.setElasticity(0);
    i === GLASS_TRIANGLE_TYPE && (o = 2);
    r.setCollisionType(o);
    n.setPos(v(e, t));
    n.setAngle(s);
    return n
}
function getBodyAtMouse(e, t) {
    querySelectedBody = null ;
    queryV.x = e;
    queryV.y = t;
    var n = this.space.nearestPointQueryNearest(queryV, 100, cp.ALL_LAYERS, cp.NO_GROUP);
    n && 0 > n.d && n.shape && n.shape.body && (querySelectedBody = n.shape.body);
    return querySelectedBody
}
function destroyBody(e) {
    var t;
    if (e.isStatic())
        for (; 0 < e.shapeList.length; )
            t = e.shapeList[0],
            space.removeStaticShape(t);
    else {
        for (; 0 < e.shapeList.length; )
            t = e.shapeList[0],
            t.space && space.removeShape(t);
        e.space && space.removeBody(e)
    }
}
function awakeAllBodies() {
    for (var e, t = allChars.length - 1; 0 <= t; --t)
        e = allChars[t],
        e.physBody && e.physBody.activate()
}
function initLevelManager() {
    container.addChild(blockContainer);
    initPhysics();
    stage.addEventListener("stagemousedown", onCharContainerMouseDown);
    stage.addEventListener("stagemouseup", onCharContainerMouseUp)
}
function createChar(e, t, n, r, i, s, o) {
    e = geCharFromPool(e, blockContainer, r, i, o);
    e.setPosition(t, n, s);
    e.initPhysics();
    isArrayContains(allChars, e) || allChars.push(e);
    return e
}
function loadLevel(e) {
    currentLevel != e && (levelRestartsCounter = 0,
    MORE_EASY_MULT = 1);
    currentLevel = e;
    currentLevel >= LEVELS_NUM && (currentLevel %= LEVELS_NUM);
    showBgByLevelNum(currentLevel);
    setCurrentLevelLabel(currentLevel);
    loadLevelByCode(allLevels[currentLevel]);
    isLevelRestarted = isGamePaused = !1;
    isNeedCacheSizeUpdate = !0;
    playSound("levelStart")
}
function loadLevelByCode(e) {
    isGamePaused = !0;
    disposeLevel();
    addInstructions();
    if (e) {
        totalEnemies = 0;
        resetSoundOnNewLevel();
        for (var t = 0; t < e.length; t++) {
            var n = e[t];
            isBonus(n[0]) ? createBonus(n[0], n[1], n[2], n[3], n[4], n[5], n[6]) : createChar(n[0], n[1], n[2], n[3], n[4], n[5], n[6])
        }
    }
}
function isBonus(e) {
    return -1 < e.indexOf("BONUS")
}
function restartLevel() {
    isLevelRestarted = !0;
    levelRestartsCounter += 1;
    levelsWithoutRestartsCounter = 0;
    loadLevel(currentLevel)
}
function loadNextLevel() {
    loadLevel(currentLevel + 1)
}
function disposeLevel() {
    disposeInstructions();
    isLevelFailed = isLevelCompleted = isInflateReason = !1;
    levelStartTimer = 0;
    currentChar = null ;
    currentRemovablesNum = collectedBonuses = totalBonuses = currentLevelScore = scoreToAdd = 0;
    var e = allChars.length, t;
    for (t = 0; t < e; t++)
        allChars.pop().dispose();
    toDisposeChars = [];
    clickedChars = [];
    disposeBonuses();
    allBombs = [];
    allMonsters = [];
    allActivators = [];
    allTeleports = [];
    for (allFans = []; 0 < toDisposePhysicsBodies.length; )
        e = toDisposePhysicsBodies.pop(),
        destroyBody(e);
    space.step(.01);
    window.gc && window.gc()
}
function disposeLevelPhysics() {
    var e = allChars.length, t;
    for (t = 0; t < e; t++)
        allChars[t].disposePhysBody();
    for (; 0 < toDisposePhysicsBodies.length; )
        e = toDisposePhysicsBodies.pop(),
        destroyBody(e)
}
function addScore(e) {
    currentLevelScore += e
}
function addToDisposed(e) {
    isArrayContains(disposedChars, e) || disposedChars.push(e)
}
function geCharFromPool(e, t, n, r, i) {
    if (0 < disposedChars.length) {
        var s = disposedChars.pop();
        s.reset(e, t, n, r, i);
        return s
    }
    return new CharBase(e,t,n,r,i)
}
function onCharContainerMouseDown(e) {
    splashContainer && splashContainer.parent && sponsorClick(e);
    if (!(isGamePaused || isLevelCompleted || isLevelFailed)) {
        var t = (e.stageX - container.x) / scaleFactor;
        e = (e.stageY - container.y) / scaleFactor;
        for (var n, r = 0, i = r = 0, s = 0, s = 0; s < allBombs.length; s++)
            if (n = allBombs[s],
            !n.isExploded && (r = n.vis.x - t,
            i = n.vis.y - e,
            r = r * r + i * i,
            484 > r)) {
                addToArray(clickedChars, n);
                return
            }
        for (s = allFans.length - 1; 0 <= s; --s)
            if (n = allFans[s],
            r = n.vis.x - t,
            i = n.vis.y - e,
            r = r * r + i * i,
            784 > r) {
                addToArray(clickedChars, n);
                return
            }
        (t = getBodyAtMouse(t / PHYS_SCALE, e / PHYS_SCALE)) && (e = t.userdata) && e.isRemovable && addToArray(clickedChars, t.userdata)
    }
}
function onCharContainerMouseUp(e) {}
function loadSaves() {
    lastopenedlvl = 0;
    if (isStorageSupported = isSupportshtml5storage())
        if (localStorage[STORAGE_PREFIX + "lastopenedlvl"]) {
            lastopenedlvl = parseInt(localStorage[STORAGE_PREFIX + "lastopenedlvl"]);
            for (t = 0; t < LEVELS_NUM; t++)
                levelstates.push(parseInt(localStorage[STORAGE_PREFIX + "levelstate" + t]));
            for (t = 0; t < ACHIEVS_NUM; t++) {
                var e = localStorage[STORAGE_PREFIX + "achiev" + t];
                e ? allachievs.push(parseInt(e)) : allachievs.push(NOT_ACHIEVED)
            }
            isMute = "1" == localStorage[STORAGE_PREFIX + "ismute"];
            totalFriends = localStorage[STORAGE_PREFIX + "totalfriends"] ? parseInt(localStorage[STORAGE_PREFIX + "totalFriends"]) : 0;
            totalScore = localStorage[STORAGE_PREFIX + "totalScore"] ? parseInt(localStorage[STORAGE_PREFIX + "totalScore"]) : 0;
            diamondsCounter = localStorage[STORAGE_PREFIX + "diamondsCounter"] ? parseInt(localStorage[STORAGE_PREFIX + "diamondsCounter"]) : 0
        } else {
            trace("saves not found!");
            for (t = 0; t < LEVELS_NUM; t++)
                levelstates.push(ZERO_STAR);
            for (t = 0; t < ACHIEVS_NUM; t++)
                allachievs.push(NOT_ACHIEVED);
            updateSaves()
        }
    else {
        trace("storage not supported");
        for (var t = 0; t < LEVELS_NUM; t++)
            levelstates.push(ZERO_STAR);
        for (t = 0; t < ACHIEVS_NUM; t++)
            allachievs.push(NOT_ACHIEVED)
    }
}
function getStarsForLevel(e) {
    return levelstates[e]
}
function saveGame(e) {
    lastopenedlvl <= currentLevel && (lastopenedlvl = currentLevel + 1);
    levelstates[currentLevel] < e && (levelstates[currentLevel] = e);
    updateSaves()
}
function updateSaves() {
    if (isStorageSupported) {
        localStorage[STORAGE_PREFIX + "lastopenedlvl"] = lastopenedlvl;
        for (var e = 0; e < LEVELS_NUM; e++)
            localStorage[STORAGE_PREFIX + "levelstate" + e] = levelstates[e];
        for (e = 0; e < ACHIEVS_NUM; e++)
            localStorage[STORAGE_PREFIX + "achiev" + e] = allachievs[e];
        saveMuteState();
        localStorage[STORAGE_PREFIX + "totalfriends"] = "" + totalFriends;
        localStorage[STORAGE_PREFIX + "totalScore"] = "" + totalScore;
        localStorage[STORAGE_PREFIX + "diamondsCounter"] = "" + diamondsCounter
    }
}
function saveMuteState() {
    isStorageSupported && (localStorage[STORAGE_PREFIX + "ismute"] = isMute ? "1" : "0")
}
function isSupportshtml5storage() {
    try {
        var e = "localStorage"in window && null !== window.localStorage;
        e && (localStorage.setItem("storage", ""),
        localStorage.removeItem("storage"));
        return e
    } catch (t) {
        return !1
    }
}
function createInstruction(e, t, n, r) {
    e = createPart(PART_INSTRUCTION_TYPE, e, t, 1, r ? blockContainer : allBgContainer);
    e.setFrame(n);
    allInstructions.push(e);
    return e
}
function addInstructions() {
    isLevelRestarted || updateBgCache()
}
function disposeInstructions() {
    for (; 0 < allInstructions.length; )
        allInstructions.pop().dispose()
}
function getCollectedStarsNum() {
    for (var e = 0, t = 0; t < LEVELS_NUM; t++)
        e += levelstates[t];
    return e
}
function createExplosion(e) {
    for (var t, n = allChars.length - 1; 0 <= n; --n)
        t = allChars[n],
        t !== e && t.physBody && (t.physBody.isStatic() || t.isPhysStatic && t.type !== GLASS_BLOCK_TYPE || -1 < t.teleportationStatus || t.isDied || t.isMovable || t.isAim || t.isLand || CreateExplode(e, t))
}
function CreateExplode(e, t) {
    var n = t.physBody
      , r = t.vis.x - e.vis.x
      , i = t.vis.y - e.vis.y
      , s = Math.sqrt(r * r + i * i);
    s > e.activDistance || (t.type === GLASS_BLOCK_TYPE ? s < .6 * e.activDistance && t.breakGlass() : (r /= s,
    i /= s,
    s = Math.max(0, 1 - s / e.activDistance),
    s = s * e.activForce * n.m,
    s = v(r * s, i * s),
    n.applyImpulse(s, v(10 * Math.random() - 5, 0)),
    t.isByPhysPosUpdate = !0))
}
function initBonusManager() {}
function createBonus(e, t, n, r, i, s, o) {
    e = getBonusFromPool(e, blockContainer, r, i, o);
    e.setPos(t, n, s);
    addToArray(allBonuses, e)
}
function disposeBonuses() {
    var e = allBonuses.length, t;
    for (t = 0; t < e; t++)
        allBonuses.pop().dispose()
}
function addToDisposedBonuses(e) {
    isArrayContains(disposedBonuses, e) || disposedBonuses.push(e)
}
function getBonusFromPool(e, t, n, r, i) {
    if (0 < disposedBonuses.length) {
        var s = disposedBonuses.pop();
        s.reset(e, t, n, r, i);
        return s
    }
    return new BonusBase(e,t,n,r,i)
}
function updateBonusManager() {
    for (var e = 0; e < allBonuses.length; e++)
        allBonuses[e].tick(),
        allBonuses[e].isCollected && addToArray(toDisposeBonuses, allBonuses[e]);
    for (; 0 < toDisposeBonuses.length; )
        toDisposeBonuses.pop().dispose()
}
function initSoundManager() {
    isDesktop() || createjs.Sound.registerPlugins([createjs.WebAudioPlugin]);
    (isAudioSupported = isSamsungDefaultBrowser() ? !1 : createjs.Sound.initializeDefaultPlugins()) && manifest.push({
        src: "click.ogg|click.mp3",
        id: "clickSound",
        data: 1
    }, {
        src: "win.ogg|win.mp3",
        id: "winSound",
        data: 1
    }, {
        src: "sm_main_music.ogg|sm_main_music.mp3",
        id: "bgMusic",
        data: 1
    }, {
        src: "fail.ogg|fail.mp3",
        id: "restartSound",
        data: 1
    }, {
        src: "explosion.ogg|explosion.mp3",
        id: "explodeSound",
        data: 1
    }, {
        src: "elk_achievement_voice2.ogg|elk_achievement_voice2.mp3",
        id: "achievSound0",
        data: 1
    }, {
        src: "elk_achievement_voice1.ogg|elk_achievement_voice1.mp3",
        id: "achievSound1",
        data: 1
    }, {
        src: "star1.ogg|star1.mp3",
        id: "star1",
        data: 1
    }, {
        src: "star2.ogg|star2.mp3",
        id: "star2",
        data: 1
    }, {
        src: "star3.ogg|star3.mp3",
        id: "star3",
        data: 1
    }, {
        src: "whistles_got1.ogg|whistles_got1.mp3",
        id: "bonus0",
        data: 1
    }, {
        src: "whistles_got2.ogg|whistles_got2.mp3",
        id: "bonus1",
        data: 1
    }, {
        src: "whistles_got3.ogg|whistles_got3.mp3",
        id: "bonus2",
        data: 1
    }, {
        src: "start_game.ogg|start_game.mp3",
        id: "levelStart",
        data: 1
    }, {
        src: "remove_object1.ogg|remove_object1.mp3",
        id: "remove_object0",
        data: 1
    }, {
        src: "remove_object2.ogg|remove_object2.mp3",
        id: "remove_object1",
        data: 1
    }, {
        src: "remove_object3.ogg|remove_object3.mp3",
        id: "remove_object2",
        data: 1
    }, {
        src: "teleport.ogg|teleport.mp3",
        id: "portalAppearSound",
        data: 2
    }, {
        src: "glass.ogg|glass.mp3",
        id: "glassBrakeSound",
        data: 1
    }, {
        src: "wind_release.ogg|wind_release.mp3",
        id: "windRelease",
        data: 1
    })
}
function isSamsungDefaultBrowser() {
    var e = navigator.userAgent;
    return -1 < e.toLowerCase().indexOf("samsung") && -1 < e.indexOf("Android ")
}
function playSound(e, t) {
    if (!isMute && isAudioSupported)
        return createjs.Sound.play(e, {
            interrupt: createjs.Sound.INTERRUPT_EARLY,
            loop: t ? -1 : 0
        })
}
function toggleMute() {
    (isMute = !isMute) ? (stopBgMusic(),
    stopWindSound()) : playBgMusic();
    saveMuteState()
}
function playScoresSound() {
    !isMute && isAudioSupported && (scoresSound ? scoresSound.play() : scoresSound = playSound("countScoreSound", !1))
}
function stopScoresSound() {
    isAudioSupported && scoresSound && (scoresSound.stop(),
    scoresSound = null )
}
function playWindSound() {
    !isMute && isAudioSupported && (windSound = playSound("windRelease", !1))
}
function stopWindSound() {
    isAudioSupported && windSound && (windSound.stop(),
    windSound = null )
}
function playRemoveObjectSound() {
    playSound("remove_object" + Math.floor(3 * Math.random()))
}
function resetSoundOnNewLevel() {
    isAudioSupported && (bonusSoundNum = 0)
}
function playBonusPickSound() {
    playSound("bonus" + bonusSoundNum);
    bonusSoundNum++;
    2 < bonusSoundNum && (bonusSoundNum = 0)
}
function playAchievSound() {
    playSound("achievSound" + achievSoundNum);
    achievSoundNum++;
    1 < achievSoundNum && (achievSoundNum = 0)
}
function startBgMusic() {
    bgMusic || playBgMusic()
}
function playBgMusic() {
    !isMute && isAudioSupported && (bgMusic ? bgMusic.resume() : bgMusic = playSound("bgMusic", !0))
}
function stopBgMusic() {
    isAudioSupported && bgMusic && bgMusic.pause()
}
function initInterface() {
    pauseBtnV = createButton(18, 18, .8, "pausebtn", onPausePress, null , onPauseUp);
    interfaceRestartBtn = createButton(18, 18, .6, "restartbtn", onPressStandartHandler, null , onInterfaceRestartUp);
    levelLabel = new createjs.BitmapText("0",zoeSS);
    levelLabel.scaleX = levelLabel.scaleY = .25;
    levelLabel.mouseEnabled = !1;
    levelLabel.y = 253;
    levelLabel.score = 0;
    levelLabel.spaceWidth = 10;
    levelLabel.postfix = "ll";
    menuEase = createjs.Ease.getElasticOut(1, .35);
    createMainMenu();
    createLevelSelectMenu();
    createLevelCompleteWin();
    createPauseWin();
    createAchievWin();
    createAchievGalleryMenu();
    createCreditsWin();
    creategameCompleteWin();
    createBlinkWin();
    isGamePaused = !0;
    isSkipMenus ? showGameInterface() : isLevelSelectShow ? showLevelsMenu() : showMainMenu(!1)
}
function createBlinkWin() {
    blinkWin = createButton(-40, -60, 6.5, "tint2");
    blinkWin.scaleX = 4.5
}
function startBlink(e, t) {
    addToParent(blinkWin, container);
    blinkWin.alpha = 1;
    blinkWin.gotoAndStop(t);
    createjs.Tween.get(blinkWin, {
        override: !0
    }).to({
        alpha: 0
    }, e).call(removeChildOnTweenComplete)
}
function showFPSMeter() {
    isNeedFpsMeter && addToParent(fpsText, container);
    isNeedHelperLabel && addToParent(helperLabel, container)
}
function showGameInterface() {
    addToParent(pauseBtnV, container);
    addToParent(interfaceRestartBtn, container);
    addToParent(levelLabel, container);
    showFPSMeter()
}
function hideGameInterface() {
    pauseBtnV.parent && container.removeChild(pauseBtnV);
    removeFromParent(interfaceRestartBtn);
    removeFromParent(levelLabel)
}
function setCurrentLevelLabel(e) {
    levelLabel.text = "l " + (e + 1)
}
function onPausePress(e) {
    isGamePaused || isLevelFailed || isLevelCompleted || onHoverScale(e.target)
}
function onPauseUp(e) {
    onOutScale(e.target);
    isGamePaused || isLevelFailed || isLevelCompleted || levelPauseContainer.parent || isCursorOutMoved(e) || (playSound("clickSound"),
    showPauseWin())
}
function createMainMenu() {
    menuContainer = new createjs.Container;
    playMenuBtn = createButton(ow / 2, 220, .7, "playbtnup", onPlayPress, menuContainer, onPlayUp);
    creditsBtn = createButton(300, 200, .8, "btnbaseup", onCreditsPress, menuContainer, onCreditsUp);
    logoImg = createButton(ow / 2 + 5, 175, 1, "logov", null , menuContainer);
    mainMenuAchievBtn = createButton(37, 170, .8, "achievbtn", onAchievGalleryPress, menuContainer, onAchievGalleryUp);
    mainMenuMuteBtn = createButton(382, 17, .65, "musiconbtn", onMainMenuMutePress, menuContainer, onMainMenuMuteUp);
    mainMenuMoreGames = createButton(100, 190, .7, "moregames2v", sponsorClick, menuContainer, null );
    isAudioSupported || (mainMenuMuteBtn.visible = !1);
    createMainMenuTweens()
}
function onMainMenuMutePress(e) {
    onHoverScale(e.target)
}
function onMainMenuMuteUp(e) {
    onOutScale(e.target);
    isCursorOutMoved(e) || (toggleMute(),
    updateMusicIconFrame(e.target),
    playSound("clickSound"))
}
function updateMusicIconFrame(e) {
    e.gotoAndStop(isMute ? MUTED_FRAME : UNMUTED_FRAME)
}
function showMainMenu(e) {
    container.addChild(menuContainer);
    updateMusicIconFrame(mainMenuMuteBtn);
    showBgByLevelNum(0, 2);
    showFPSMeter();
    showTopLogo(.8);
    e && (startBlink(700, "tint2"),
    isNeedCacheSizeUpdate = !0)
}
function showMainMenuTweenComplete(e) {}
function hideMainMenu() {
    removeFromParent(menuContainer)
}
function hideMainMenuTweenComplete(e) {
    e = e.target;
    e.alpha = 1;
    e.parent && container.removeChild(e)
}
function createBigWinBg(e, t, n, r) {
    e = createButton(e, t, isLowQuality ? 2 : 1, isLowQuality ? "smallwinv" : "bgwinv", null , r);
    e.rotation = -90;
    e.scaleX = isLowQuality ? 2 * n : n
}
function createMainMenuTweens() {
    var e = createjs.Ease.bounceOut;
    createjs.Tween.removeTweens(playMenuBtn);
    playMenuBtn.scaleX = playMenuBtn.scaleY = .75;
    createjs.Tween.get(playMenuBtn, {
        override: !0,
        loop: !0
    }).to({
        scaleX: .95,
        scaleY: .95
    }, 3e3, e).wait(1e3).to({
        scaleX: .75,
        scaleY: .75
    }, 3e3, e)
}
function disposeMainMenuTweens() {
    createjs.Tween.removeTweens(playMenuBtn)
}
function onPlayPress(e) {
    onHoverScale(e.target)
}
function onPlayUp(e) {
    onOutScale(e.target);
    isCursorOutMoved(e) || (playSound("clickSound"),
    hideMainMenu(),
    showLevelsMenu(),
    startBgMusic())
}
function onAchievGalleryPress(e) {
    onHoverScale(e.target)
}
function onAchievGalleryUp(e) {
    onOutScale(e.target);
    isCursorOutMoved(e) || (playSound("clickSound"),
    hideMainMenu(),
    showAchievGallery())
}
function onCreditsPress(e) {
    e.target.scaleX = e.target.scaleY = .9;
    trace("play credits!")
}
function onCreditsUp(e) {
    e.target.scaleX = e.target.scaleY = .8;
    isCursorOutMoved(e) || (playSound("clickSound"),
    hideMainMenu(),
    showCreditsWin())
}
function createButton(e, t, n, r, i, s, o) {
    var u = new createjs.Sprite(interfaceSS);
    u.snapToPixel = !0;
    u.x = e;
    u.y = t;
    u.scaleX = u.scaleY = n;
    u.gotoAndStop(r);
    u.defaultScale = n;
    o && u.addEventListener("pressup", o, !1);
    i ? (u.addEventListener("mousedown", i, !1),
    u.cursor = "pointer") : u.mouseEnabled = !1;
    (i || o) && (e = interfaceSS.getAnimation(r)) && e.frames && 0 < e.frames.length && (e = interfaceSS.getFrameBounds(e.frames[0]),
    u.setBoundingBox(e.x * n, e.y * n, e.width * n, e.height * n));
    s && s.addChild(u);
    return u
}
function createLevelSelectMenu() {
    var e = levelSelectContainer = new createjs.Container;
    levelSelectContainer.name = "levelselcont";
    createBigWinBg(5, 438, .95, e);
    levelsScreen1 = new createjs.Container;
    levelsScreen1.name = "levelsScreen1";
    levelsScreen2 = new createjs.Container;
    createButton(156, 73, 1, "levelselecttitle", null , levelSelectContainer);
    selectMenuBackBtn = createButton(28, 411, .8, "backbtn", onBackToMenuPress, levelsScreen1, onBackToMenuUp);
    createLevelsButtons();
    levelSelectContainer.addChild(levelsScreen1)
}
function cacheWin(e) {
    e.cache(-10, -10, ow + 20, oh + 20)
}
function uncacheWin(e) {
    e.uncache()
}
function createLevelsButtons() {
    for (var e = 0; 20 > e; e++) {
        var t = createButton(62 + 65 * (e % 4), 129 + 60 * Math.floor(e / 4), .72, "lvlLabelStar0", onLevelBtnPress, levelsScreen1, onLevelBtnUp);
        t.levelNum = e;
        allLevelBtns.push(t);
        var n = createButton(t.x - 24, t.y - 26, .7, "lvlnum" + (e + 1), null , levelsScreen1);
        t.txtNum = n
    }
}
function updateLevelsButtons() {
    for (var e = 0; 20 > e; e++) {
        var t = e <= lastopenedlvl;
        isOpenAllLevels && (t = e < openedLevels);
        var n;
        n = t ? "lvlLabelStar" + getStarsForLevel(e) : "levelbuttonlocked";
        var r = allLevelBtns[e];
        r.gotoAndStop(n);
        (r.isOpened = t) ? r.txtNum.parent || r.parent.addChild(r.txtNum) : r.txtNum.parent && r.parent.removeChild(r.txtNum)
    }
}
function onLevelBtnPress(e) {
    e = e.target;
    onHoverScale(e);
    trace("level " + e.levelNum + " load");
    updateCacheByBtnNum(e.levelNum)
}
function onLevelBtnUp(e) {
    var t = e.target;
    onOutScale(t);
    isCursorOutMoved(e) ? updateCacheByBtnNum(t.levelNum) : t.isOpened ? (levelsWithoutRestartsCounter = levelRestartsCounter = 0,
    showGameInterface(),
    loadLevel(t.levelNum),
    startBlink(400, "tint2"),
    showGameField(),
    hideLevelsMenu()) : (updateCacheByBtnNum(t.levelNum),
    playSound("clickSound"))
}
function updateCacheByBtnNum(e) {}
function onBackToMenuPress(e) {
    onHoverScale(e.target)
}
function onBackToMenuUp(e) {
    onOutScale(e.target);
    isCursorOutMoved(e) || (hideLevelsMenu(),
    showMainMenu(!0),
    playSound("clickSound"))
}
function showLevelsMenu() {
    container.addChild(levelSelectContainer);
    updateLevelsButtons();
    levelsScreen2.parent && levelSelectContainer.removeChild(levelsScreen2);
    levelsScreen1.parent || levelSelectContainer.addChild(levelsScreen1);
    levelsScreen1.x = 0;
    levelsScreen1.alpha = 1;
    showBgByLevelNum(0, 1, 1.2);
    startBlink(700, "tint2");
    isNeedCacheSizeUpdate = !0;
    showTopLogo(.8)
}
function hideLevelsMenu() {
    createjs.Tween.removeTweens(levelSelectContainer);
    removeFromParent(levelSelectContainer)
}
function showGameField() {
    createjs.Tween.removeTweens(blockContainer);
    blockContainer.parent || container.addChild(blockContainer);
    blockContainer.alpha = 0;
    blockContainer.visible = !0;
    createjs.Tween.get(blockContainer, {
        override: !0
    }).to({
        alpha: 1
    }, 400)
}
function hideGameField(e, t) {
    isGamePaused = !0;
    createjs.Tween.removeTweens(blockContainer);
    var n = createjs.Tween.get(blockContainer).to({
        alpha: 0,
        visible: !1
    }, t ? t : 200).call(removeFromParent);
    e && n.call(disposeLevelPhysics)
}
function showRestartWin() {
    isLevelFailed && (levelPauseContainer.parent || showPauseWin(!0))
}
function createLevelCompleteWin() {
    var e = levelCompleteContainer = new createjs.Container;
    createBigWinBg(5, 400, .83, e);
    var t = createButton(ow / 2, 220, .9, "lvlcompletebgnew", null , e);
    completeWinNextBtn = createButton(270, 390, .85, "nextlevelwin", onPressStandartHandler, e, onNextLevelUp);
    createButton(70, 330, 1, "completeelk", null , e, null );
    createButton(50, 390, .9, "restartbtn", onPressStandartHandler, e, onCompleteRestartUp);
    createButton(210, 310, .8, "levelreadylabel", null , e);
    star1 = createButton(t.x - 82, t.y - 20, 1, "completestar", null , null , null );
    star1.rotation = -15;
    star2 = createButton(t.x + 1, t.y - 27, 1, "completestar", null , null , null );
    star3 = createButton(t.x + 86, t.y - 16, 1, "completestar", null , null , null );
    star3.rotation = 12;
    completeLevelLabel = new createjs.BitmapText("0",zoeSS);
    completeLevelLabel.scaleX = completeLevelLabel.scaleY = .65;
    completeLevelLabel.mouseEnabled = !1;
    completeLevelLabel.y = 297;
    completeLevelLabel.x = 240;
    completeLevelLabel.score = 0;
    addToParent(completeLevelLabel, e);
    createButton(160, 390, .85, "moregames2v", sponsorClick, e, null )
}
function onCompleteQuitUp(e) {
    onOutScale(e.target);
    isCursorOutMoved(e) || (hideGameField(!1),
    disposeLevel(),
    hideLevelCompleteWin(),
    showMainMenu(!0),
    playSound("clickSound"),
    stopScoresSound())
}
function onCompleteRestartUp(e) {
    onOutScale(e.target);
    isCursorOutMoved(e) || (playSound("clickSound"),
    restartLevel(),
    showGameField(),
    hideLevelCompleteWin(),
    stopScoresSound())
}
function onPressStandartHandler(e) {
    onHoverScale(e.target)
}
function onNextLevelUp(e) {
    onOutScale(e.target);
    isCursorOutMoved(e) || (playSound("clickSound"),
    hideLevelCompleteWin(),
    handleNextLevelClick(),
    stopScoresSound())
}
function handleNextLevelClick() {
    var e = getNewAchievedId();
    -1 < e ? showAchievWin(e) : currentLevel >= LEVELS_NUM - 1 ? (hideGameInterface(),
    disposeLevel(),
    showMainMenu(!0)) : (showGameInterface(),
    loadNextLevel(),
    showGameField())
}
function showLevelCompleteWin() {
    isLevelCompleted || isLevelFailed || (isLevelCompleted = !0,
    hideGameInterface(),
    createjs.Tween.removeTweens(levelCompleteContainer),
    removeFromParent(star1),
    removeFromParent(star2),
    removeFromParent(star3),
    container.addChild(levelCompleteContainer),
    addToParent(particleContainer, container),
    levelCompleteContainer.x = 400,
    levelCompleteContainer.alpha = 0,
    createjs.Tween.get(blockContainer).wait(800).call(hideGameField),
    createjs.Tween.get(levelCompleteContainer, {
        override: !0
    }).wait(900).to({
        alpha: 1,
        x: 0
    }, 1300, menuEase).call(showStars),
    currentLevelStarsNum = ZERO_STAR,
    totalBonuses <= collectedBonuses ? currentLevelStarsNum = THREE_STAR : collectedBonuses >= totalBonuses / 2 ? currentLevelStarsNum = TWO_STAR : 0 < collectedBonuses && (currentLevelStarsNum = ONE_STAR),
    totalScore += currentLevelScore + scoreToAdd,
    scoreToAdd = 0,
    totalFriends += totalEnemies,
    saveGame(currentLevelStarsNum),
    completeLevelLabel.text = "" + (currentLevel + 1),
    checkCompleteAchievs(),
    stopWindSound(),
    playSound("winSound"))
}
function checkCompleteAchievs() {
    9 <= getStarsForLevel(0) + getStarsForLevel(1) + getStarsForLevel(2) && addAchiev(SUPER_COLLECTOR_ACHIEV);
    currentLevel >= LEVELS_NUM - 1 && addAchiev(SOCCER_MASTER_ACHIEV);
    60 <= getCollectedStarsNum() && addAchiev(MEGA_STAR_ACHIEV);
    levelsWithoutRestartsCounter++;
    5 <= levelsWithoutRestartsCounter && addAchiev(AMAZING_GAME_ACHIEV);
    0 >= currentRemovablesNum && addAchiev(DESTROYER_ACHIEV)
}
function showStars(e) {
    startSponsorAds();
    animateStar(star1, 20 + scoreTweenLength, 1, "star1");
    currentLevelStarsNum >= TWO_STAR && animateStar(star2, 800 + scoreTweenLength, 1, "star2");
    currentLevelStarsNum >= THREE_STAR && animateStar(star3, 1600 + scoreTweenLength, 1, "star3")
}
function animateStar(e, t, n, r) {
    levelCompleteContainer.addChild(e);
    e.alpha = 0;
    e.scaleX = e.scaleY = 2;
    createjs.Tween.get(e, {
        override: !0
    }).wait(t).to({
        alpha: 1,
        scaleX: n,
        scaleY: n
    }, 700, createjs.Ease.bounceOut).call(function() {});
    createjs.Tween.get({
        x: 100
    }).wait(t + 200).call(function() {
        isLevelCompleted && (playSound(r),
        createPrerenderedPart(e.x, e.y, 1.2, "parteffectv2", .85, e, .8))
    })
}
function removeFromParent(e) {
    e.parent && e.parent.removeChild(e)
}
function hideLevelCompleteWin() {
    createjs.Tween.removeTweens(star1);
    createjs.Tween.removeTweens(star2);
    createjs.Tween.removeTweens(star3);
    createjs.Tween.removeTweens(levelCompleteContainer);
    createjs.Tween.get(levelCompleteContainer).to({
        alpha: 0,
        x: -400
    }, 200).call(removeChildOnTweenComplete);
    showGameInterface()
}
function createPauseWin() {
    var e = levelPauseContainer = new createjs.Container;
    createBigWinBg(5, 420, .83, e);
    pauseTitle = createButton(ow / 2 - 2, oh / 2 - 70, .92, "pausetitle", null , levelPauseContainer);
    createButton(ow / 2 - 90, 345, .9, "quitbtn", onPauseQuitPress, levelPauseContainer, onPauseQuitUp);
    createButton(ow / 2 + 90, 345, .9, "restartbtn", onPauseRestartPress, levelPauseContainer, onPauseRestartUp);
    pauseMuteBtn = createButton(ow / 2, 345, .9, "musiconbtn", onPauseMutePress, levelPauseContainer, onPauseMuteUp);
    isAudioSupported || (pauseMuteBtn.visible = !1);
    pauseContinueBtn = createButton(160, 250, .8, "playbtnup", onPauseContinuePress, levelPauseContainer, onPauseContinueUp);
    createButton(160, 410, .9, "moregames2v", sponsorClick, levelPauseContainer, null )
}
function onPauseMutePress(e) {
    onHoverScale(e.target)
}
function onPauseMuteUp(e) {
    onOutScale(e.target);
    isCursorOutMoved(e) || (toggleMute(),
    updateMusicIconFrame(e.target),
    isMute || playSound("clickSound"))
}
function onPauseRestartPress(e) {
    onHoverScale(e.target)
}
function onPauseRestartUp(e) {
    onOutScale(e.target);
    isCursorOutMoved(e) || (playSound("clickSound"),
    hidePauseWin(!1, !1),
    showGameField(),
    restartLevel())
}
function onInterfaceRestartUp(e) {
    onOutScale(e.target);
    isCursorOutMoved(e) || (playSound("clickSound"),
    showGameField(),
    restartLevel())
}
function onPauseQuitPress(e) {
    onHoverScale(e.target)
}
function onPauseQuitUp(e) {
    onOutScale(e.target);
    isCursorOutMoved(e) || (playSound("clickSound"),
    isGamePaused = !0,
    disposeLevel(),
    hidePauseWin(!1, !0),
    updateBgCache(),
    hideGameField(!1, 100),
    showMainMenu(!0))
}
function onPauseContinuePress(e) {
    onHoverScale(e.target)
}
function onPauseContinueUp(e) {
    onOutScale(e.target);
    isCursorOutMoved(e) || (playSound("clickSound"),
    hidePauseWin(!1, !1))
}
function showPauseWin(e) {
    isGamePaused = !0;
    hideGameInterface();
    updateMusicIconFrame(pauseMuteBtn);
    container.addChild(levelPauseContainer);
    pauseContinueBtn.visible = !e;
    e ? (pauseTitle.gotoAndStop("tryagaintitle"),
    setSpriteScale(pauseTitle, 1),
    hideGameField(!0, 400),
    stopWindSound()) : (pauseTitle.gotoAndStop("pausetitle"),
    setSpriteScale(pauseTitle, .92));
    levelPauseContainer.x = -400;
    levelPauseContainer.y = -20;
    levelPauseContainer.alpha = 0;
    createjs.Tween.get(levelPauseContainer).to({
        alpha: 1,
        x: 0
    }, 1300, menuEase)
}
function hidePauseWin(e, t) {
    isGamePaused = !1;
    createjs.Tween.removeTweens(levelPauseContainer);
    createjs.Tween.get(levelPauseContainer).to({
        alpha: 0,
        x: 400
    }, 300).call(removeChildOnTweenComplete);
    t || showGameInterface()
}
function createAchievWin() {
    achievContainer = new createjs.Container;
    createButton(160, 84, 1, "newachievtitle", null , achievContainer);
    raduga = createButton(160, 222, 1.1, "radugav", null , achievContainer);
    createButton(160, 262, 1.1, "newachievbgv", null , achievContainer);
    achievDesc = createButton(160, 343, .9, "achievdesc1", null , achievContainer);
    createButton(160, 399, 1, "nextlevelwin", onAchievContinuePress, achievContainer)
}
function onAchievContinuePress(e) {
    hideAchievWin();
    handleNextLevelClick()
}
function showAchievWin(e) {
    achievContainer.parent || container.addChild(achievContainer);
    disposeLevel();
    updateBgCache();
    hideGameInterface();
    achievDesc.gotoAndStop("achievdesc" + Math.round(e));
    allachievs[e] = ACHIEVED;
    updateSaves();
    createjs.Tween.removeTweens(achievContainer);
    achievContainer.alpha = 0;
    createjs.Tween.get(achievContainer, {
        override: !0
    }).to({
        alpha: 1
    }, 300).call(function() {
        playAchievSound()
    })
}
function hideAchievWin() {
    removeFromParent(achievContainer)
}
function getNewAchievedId() {
    return 0 < achievsReadyToShow.length ? achievsReadyToShow.pop() : -1
}
function addAchiev(e) {
    isAlreadyAchieved(e) || addToArray(achievsReadyToShow, e)
}
function isAlreadyAchieved(e) {
    return allachievs[e] == ACHIEVED
}
function createAchievGalleryMenu() {
    var e = achGalleryContainer = new createjs.Container;
    createBigWinBg(5, 438, .95, e);
    createButton(ow / 2, 76, .9, "achievmenutitle", null , e);
    createAchievLabels();
    achGalleryMenuBackBtn = createButton(32, 410, .8, "backbtn", onPressStandartHandler, e, onAchievGalleryBackUp);
    createButton(250, 390, .9, "achievelk", null , e)
}
function createAchievLabels() {
    for (var e = 0; e < ACHIEVS_NUM; e++) {
        var t = e
          , n = createButton(160, 130 + 45 * t, .9, "achievback", null , achGalleryContainer, null )
          , t = createButton(160, 130 + 45 * t, .8 * .8, "achievclosed", null , achGalleryContainer, null );
        allAchievsLabels.push(t);
        t.bg = n
    }
}
function updateAchievLabels() {
    for (var e = 0; e < ACHIEVS_NUM; e++)
        allAchievsLabels[e].gotoAndStop(allachievs[e] == ACHIEVED ? "achievdesc" + e.toString() : "achievclosed")
}
function onAchievGalleryBackUp(e) {
    onOutScale(e.target);
    isCursorOutMoved(e) || (playSound("clickSound"),
    hideAchievGallery(),
    showMainMenu(!0))
}
function showAchievGallery() {
    container.addChild(achGalleryContainer);
    updateAchievLabels();
    achGalleryContainer.x = 0;
    achGalleryContainer.alpha = 1;
    showBgByLevelNum(0, 4, 1.2);
    startBlink(700, "tint2");
    showTopLogo(.8)
}
function hideAchievGallery() {
    createjs.Tween.removeTweens(achGalleryContainer);
    createjs.Tween.get(achGalleryContainer, {
        override: !0
    }).to({
        alpha: 0,
        x: 400
    }, 200).call(uncacheAndRemove)
}
function createCreditsWin() {
    var e = creditsContainer = new createjs.Container;
    createBigWinBg(5, 400, .8, e);
    createButton(33, 370, .9, "backbtn", onCreditsQuitPress, e, onCreditsQuitUp);
    createButton(160, 210, .85, "biglimetxt", null , e);
    createButton(155, 120, .9, "creditstitle", null , e);
    createButton(230, 337, 1, "creditselk", null , e)
}
function onSiteLinkPress(e) {
    window.open("http://porubov.com", "_blank")
}
function onCreditsLinkPress(e) {
    window.location = "mailto:seddas@gmail.com?subject=BattleFish"
}
function onCreditsQuitPress(e) {
    onHoverScale(e.target)
}
function onCreditsQuitUp(e) {
    onOutScale(e.target);
    isCursorOutMoved(e) || (playSound("clickSound"),
    hideCreditsWin(),
    showMainMenu(!0))
}
function showCreditsWin() {
    container.addChild(creditsContainer);
    creditsContainer.x = 0;
    creditsContainer.alpha = 1;
    showBgByLevelNum(0, 4, 1.2);
    startBlink(700, "tint2")
}
function hideCreditsWin() {
    removeFromParent(creditsContainer)
}
function creategameCompleteWin() {
    gameCompleteContainer = new createjs.Container;
    createButton(ow / 2, 310, 1, "nextlevelwin", ongameCompleteQuitPress, gameCompleteContainer, ongameCompleteQuitUp);
    createButton(ow / 2, 237, 1, "levelinstruction8", null , gameCompleteContainer);
    createButton(ow / 2, 105, 1, "allcollectedstars", null , gameCompleteContainer);
    createButton(ow / 2, 30, 1, "gamecompletedTitle", null , gameCompleteContainer);
    collectedStarsTxt = new createjs.BitmapText(getCollectedStarsNum().toString(),interfaceSS);
    collectedStarsTxt.letterSpacing = -7;
    collectedStarsTxt.x = 80;
    collectedStarsTxt.y = 121;
    collectedStarsTxt.mouseEnabled = !1;
    gameCompleteContainer.addChild(collectedStarsTxt);
    createButton(260, 335, .7, "moregamesbtn", sponsorClick, gameCompleteContainer, null )
}
function ongameCompleteQuitPress(e) {
    e = e.target;
    e.scaleX = e.scaleY = 1.2
}
function ongameCompleteQuitUp(e) {
    onOutScale(e.target);
    isCursorOutMoved(e) || (playSound("clickSound"),
    hidegameCompleteWin(),
    showMainMenu(!0))
}
function showGameCompleteWin() {
    isGameCompleteScreenShow = !0;
    container.addChild(gameCompleteContainer);
    collectedStarsTxt.text = getCollectedStarsNum().toString();
    gameCompleteContainer.x = 400;
    gameCompleteContainer.alpha = 0;
    createjs.Tween.get(gameCompleteContainer, {
        override: !0
    }).to({
        alpha: 1,
        x: 0
    }, 1300, createjs.Ease.elasticOut)
}
function hidegameCompleteWin() {
    isGameCompleteScreenShow = !1;
    updateMobileBrowserParams();
    createjs.Tween.removeTweens(gameCompleteContainer);
    createjs.Tween.get(gameCompleteContainer, {
        override: !0
    }).to({
        alpha: 0,
        x: 400
    }, 200).call(removeChildOnTweenComplete)
}
function uncacheAndRemove(e) {
    e = e.target;
    e.parent && e.parent.removeChild(e)
}
function removeChildOnTweenComplete(e) {
    e = e.target;
    e.parent && e.parent.removeChild(e)
}
function isTweened(e) {
    return createjs.Tween.hasActiveTweens(e)
}
function isCursorOutMoved(e) {
    if (!isDesktop())
        return !1;
    hitPoint = e.target.globalToLocal(e.stageX, e.stageY);
    return !e.target.hitTest(hitPoint.x, hitPoint.y)
}
function updateScoreLabel(e) {}
function interfaceTick() {
    for (var e = 0; e < rotatedDecors.length; e++)
        rotatedDecors[e].rotation += 3 * dtScale;
    raduga && (raduga.rotation += dtScale,
    raduga.rotation %= 360)
}
function updateInterfacePositions() {
    pauseBtnV.x = 24 + deltaForHLeft();
    pauseBtnV.y = 416 - deltaForVTop() / 2;
    interfaceRestartBtn.x = 70 + deltaForHLeft();
    interfaceRestartBtn.y = 416 - deltaForVTop() / 2;
    creditsBtn.x = 290 - deltaForHLeft();
    creditsBtn.y = 410 - deltaForVTop() / 2;
    mainMenuMuteBtn.x = 292 - deltaForHLeft();
    mainMenuMuteBtn.y = 360 - deltaForVTop() / 2;
    mainMenuMoreGames.x = 160;
    mainMenuMoreGames.y = 420 - deltaForVTop() / 2;
    playMenuBtn.y = 330 - .2 * deltaForVTop();
    mainMenuAchievBtn.x = 40 + deltaForHLeft();
    mainMenuAchievBtn.y = 400 - deltaForVTop() / 2;
    isNeedFpsMeter && (fpsText.x = ow - 32 - deltaForHLeft(),
    fpsText.y = deltaForVTop() / 2);
    updateLogoPos()
}
function initResizeManager() {
    window.addEventListener("resize", onWindowResize);
    document.addEventListener("touchstart", PreventScrollTouch);
    window.onorientationchange = orientChange;
    onGameResize();
    setTimeout(hideAdressBar, 100);
    hideAddressbar(document.getElementById("gamediv"))
}
function onGameResize() {
    hideAdressBar();
    var e = window.innerWidth
      , t = window.innerHeight;
    zoomFactor = 1;
    if (isLowQuality) {
        var n = Math.min(e / minW, t / minH);
        zoomFactor = Math.max(1, Math.min(2, n * n));
        e /= zoomFactor;
        t /= zoomFactor
    }
    n = "scale(" + zoomFactor + "," + zoomFactor + ")";
    canvas.style.transform = n;
    canvas.style.msTransform = n;
    canvas.style.MozTransform = n;
    canvas.style.WebkitTransform = n;
    canvas.style.OTransform = n;
    scaleFactor = Math.min(e / minW, t / minH);
    stage.scaleX = 1;
    stage.scaleY = 1;
    stage.canvas.width = Math.min(e, maxW * scaleFactor);
    stage.canvas.height = Math.min(t, maxH * scaleFactor);
    if (isDesktop() && !isMobileOnlyResize) {
        var n = 10
          , r = getURLParameter("scale");
        r && (n = parseFloat(r));
        scaleFactor = Math.min(e / desctopMaxW, t / desctopMaxH);
        scaleFactor = Math.min(scaleFactor, n / zoomFactor);
        stage.canvas.width = Math.min(e, desctopMaxW * scaleFactor);
        stage.canvas.height = Math.min(t, desctopMaxH * scaleFactor)
    }
    stage.canvas.style.marginTop = "0px";
    stage.canvas.style.marginLeft = "0px";
    stage.canvas.style.left = Math.floor((e * zoomFactor - stage.canvas.width) / 2) + "px";
    stage.canvas.style.top = Math.floor((t * zoomFactor - stage.canvas.height) / 2) + "px";
    viewportH = stage.canvas.height / scaleFactor;
    viewportW = stage.canvas.width / scaleFactor;
    topVisionLine = -(viewportH - oh);
    stage.autoClear = !1;
    container.scaleX = scaleFactor;
    container.scaleY = scaleFactor;
    container.x = Math.round((stage.canvas.width - ow * scaleFactor) / 2);
    container.y = Math.round((stage.canvas.height - oh * scaleFactor) / 2);
    splashContainer && (splashContainer.scaleX = container.scaleX,
    splashContainer.scaleY = container.scaleY,
    splashContainer.x = container.x,
    splashContainer.y = container.y);
    winWidth = e;
    winHeight = t;
    timer = null ;
    loaderBar && (loaderBar.y = (oh - barHeight) / 2 + deltaForVCenter());
    isAllFilesLoaded && isGameInited && updateInterfacePositions();
    isNeedCacheSizeUpdate = !0;
    isPhysicsDebugDraw && debugDraw && (debugCanvas.width = stage.canvas.width,
    debugCanvas.height = stage.canvas.height,
    debugCanvas.style.left = stage.canvas.style.left,
    debugCanvas.style.top = stage.canvas.style.top,
    debugCanvas.style.marginLeft = container.x + "px",
    debugCanvas.style.marginTop = container.y + "px");
    stage.update()
}
function isNeedCanvasZoom(e, t) {
    if (isDesktop())
        return !1;
    var n = Math.min(e / minW, t / minH);
    return isDefaultAndroid() && 2 <= n
}
function sizeHandler() {}
function deltaForVCenter() {
    return -(viewportH - oh) / 2
}
function deltaForVTop() {
    return -(viewportH - oh)
}
function deltaForHLeft() {
    return -(viewportW - ow) / 2
}
function getMaxLeft() {
    return -(maxW - ow) / 2
}
function getMaxRight() {
    return maxW + getMaxLeft()
}
function getMaxTop() {
    return -(maxH - oh)
}
function orientChange(e) {
    setTimeout(hideAdressBar, 50);
    onWindowResize(null )
}
function hideAdressBar() {
    window.scrollTo(0, 1)
}
function PreventScrollTouch(e) {
    window.scrollTo(0, 1);
    window.innerHeight != winHeight && onWindowResize(null );
    e.preventDefault();
    e.stopPropagation();
    e.cancelBubble = !0;
    return e.returnValue = !1
}
function onWindowResize(e) {
    setTimeout(hideAdressBar, 1);
    clearTimeout(timer);
    setTimeout(onGameResize, 1)
}
function setPixelRatio() {
    if (isHiDPI()) {
        var e = document.createElement("meta");
        e.name = "viewport";
        e.content = "target-densitydpi=device-dpi, user-scalable=0, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5";
        document.getElementsByTagName("head")[0].appendChild(e)
    }
}
function isHiDPI() {
    return !window.hasOwnProperty("devicePixelRatio") || -1 == navigator.userAgent.indexOf("iPhone") && -1 == navigator.userAgent.indexOf("iPad") || 2 != window.devicePixelRatio ? !1 : !0
}
function getURLParameter(e) {
    return decodeURIComponent((RegExp("[?|&]" + e + "=([^&;]+?)(&|#|;|$)").exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || null
}
function isMobileDetected(e) {
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|android|ipad|playbook|silk|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))
}
function isDesktop() {
    return isDesktopBrowser
}
function updateMobileBrowserParams() {
    MAX_PARTICLES_ON_SCREEN = isDesktopBrowser ? 30 : 12
}
function detectBrowser() {
    isDesktopBrowser = !isMobileDetected(navigator.userAgent || navigator.vendor || window.opera);
    var e = getURLParameter("mobile");
    e && 1 == parseInt(e) && (isDesktopBrowser = !1);
    updateMobileBrowserParams()
}
function initLoaders() {
    var e = createjs.Graphics.getRGB(247, 247, 247);
    loaderBar = new createjs.Container;
    bar = new createjs.Shape;
    bar.graphics.beginFill(e).drawRect(0, 0, 1, barHeight).endFill();
    loaderWidth = 300;
    var t = new createjs.Shape;
    t.graphics.setStrokeStyle(2).beginStroke(e).drawRect(-5, -5, loaderWidth + 10, barHeight + 10);
    loaderBar.x = container.width - loaderWidth >> 1;
    loaderBar.y = container.height - barHeight >> 1;
    loaderBar.addChild(bar, t);
    container.addChild(loaderBar);
    initSoundManager();
    preload = new createjs.LoadQueue(!0,"assets/");
    preload.installPlugin(createjs.Sound);
    preload.addEventListener("progress", handleOverallProgress);
    preload.addEventListener("complete", handleComplete);
    preload.addEventListener("fileload", handleFileLoad);
    isLoadAnimFromJSON && manifest.push({
        src: "soccerassets.json",
        id: "anim_json"
    });
    preload.loadManifest(manifest);
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    isDefaultAndroid() && (createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT);
    createjs.Ticker.setFPS(FPS)
}
function isDefaultAndroid() {
    var e = navigator.userAgent;
    return -1 < e.indexOf("Mozilla/5.0") && -1 < e.indexOf("Android ") && -1 < e.indexOf("AppleWebKit") && !(-1 < e.indexOf("Chrome"))
}
function handleOverallProgress(e) {
    0 != e.total && (bar.scaleX = e.loaded / e.total * loaderWidth,
    stage.update())
}
function handleFileLoad(e) {
    "image" == e.item.type && (images[e.item.id] = e.result);
    files[e.item.id] = e.result;
    isLogoReady && "preloaderlogo" == e.item.id && showPreloaderLogo()
}
function showPreloaderLogo() {
    if (files.preloaderlogo && !isPreloaderLogoReady) {
        isPreloaderLogoReady = !0;
        var e = files.preloaderlogo
          , t = e.width
          , n = e.height
          , e = (new createjs.Bitmap(e)).set({
            scaleX: .75,
            scaleY: .75,
            regX: t / 2,
            regY: n / 2,
            cursor: "pointer",
            x: ow / 2,
            y: 20 + .75 * n
        });
        e.setBoundingBox(-t / 2, -n / 2, t, n);
        e.addEventListener("mousedown", sponsorClick);
        loaderBar.addChild(e)
    }
}
function sponsorClick(e) {
    window.open(SPONSOR_URL, "_blank")
}
function createRotationScreen() {
    var e = new createjs.Sprite(bgSS);
    e.gotoAndStop("rotateScreen");
    e.x = 30;
    rotationContainer.addChild(e)
}
function handleComplete(e) {
    isAllFilesLoaded || (isLogoReady = isAllFilesLoaded = !0) && startGame()
}
function startGame() {
    try {
        isGameInited || (removeFromParent(loaderBar),
        loaderBar = null ,
        configureSpritesheets(),
        isDefaultAndroid() && (isLowQuality = !0),
        createSplashScreen(),
        createRotationScreen(),
        createBG(),
        loadSaves(),
        initLevelManager(),
        initBonusManager(),
        initParticleManager(),
        isNeedFpsMeter && (fpsText = new createjs.BitmapText("1",interfaceSS),
        fpsText.scaleX = fpsText.scaleY = .6,
        fpsText.letterSpacing = -7,
        fpsText.x = ow - 27,
        container.addChild(fpsText)),
        initInterface(),
        isGameInited = !0,
        onGameResize(),
        startSplash(),
        isSkipMenus && (isLastLevelLoad ? loadLevel(allLevels.length - 1) : loadLevel(isDesignerSettingsPreferred ? editorLevelToLoad : autoLevelToLoad)),
        stage.update(),
        createjs.Ticker.addEventListener("tick", tick),
        initEditorHandlers(),
        isGetAllProperties && getAllProperties())
    } catch (e) {
        trace(e.name + ":" + e.message)
    }
}
function startSplash() {
    isSkipSplash || isSponsorLogoError || !splashContainer || splashContainer.parent || rotationContainer.parent || (removeFromParent(container),
    stage.addChild(splashContainer),
    createjs.Tween.get(splashContainer).wait(3e3).call(addContainer).to({
        alpha: 0
    }, 200).call(disposeSplash),
    trace("splash"),
    stage.autoClear = !0)
}
function addContainer(e) {
    stage.addChildAt(container, 0)
}
function disposeSplash(e) {
    removeFromParent(splashContainer);
    splashContainer = null ;
    stage.autoClear = winWidth > maxW * scaleFactor || winHeight > maxH * scaleFactor
}
function createSplashScreen() {
    var e = new createjs.Sprite(zoeSS);
    e.gotoAndStop("splashlogo");
    e.x = ow / 2;
    e.y = oh / 2;
    e.scaleX = e.scaleY = .8;
    e.mouseEnabled = !0;
    splashContainer.addChild(e)
}
function initEditorHandlers() {
    isLevelEditor && stage.addEventListener("stagemousedown", handlePress)
}
function updateBgCache() {}
function createBG() {
    allBgContainer = new createjs.Container;
    container.addChild(allBgContainer);
    mainBg = (new createjs.Sprite(bgSS)).set({
        x: -18,
        y: 495,
        rotation: -90
    });
    mainBg.gotoAndStop("bigbg");
    allBgContainer.addChild(mainBg);
    isLowQuality && (mainBg.gotoAndStop("smallbg"),
    setSpriteScale(mainBg, 2));
    fansBg = (new createjs.Sprite(bgSS,"fansv")).set({
        x: -30,
        y: 312,
        scaleX: 1.15,
        scaleY: 1.15,
        rotation: 0
    });
    setAnimationSpeed(fansBg, .8);
    addToParent(fansBg, allBgContainer);
    allBgContainer.mouseEnabled = !1
}
function handlePress(e) {
    isLevelEditor && (KeyboardJS.isPressed("n") && loadNextLevel(),
    KeyboardJS.isPressed("l") && showLevelCompleteWin(),
    KeyboardJS.isPressed("a") && showAchievWin(SUPER_COLLECTOR_ACHIEV),
    KeyboardJS.isPressed("u") && updateBgCache(),
    KeyboardJS.isPressed("g") && showGameCompleteWin())
}
function configureSpritesheets() {
    isLoadAnimFromJSON && (zoeCFG = eval(files.anim_json));
    validateSpritesheetCFG(zoeCFG, "zoespritesheet", !0, 2);
    bgSS = interfaceSS = zoeSS = new createjs.SpriteSheet(zoeCFG)
}
function validateSpritesheetCFG(e, t, n, r) {
    var i = images[t].width;
    t = images[t].height;
    e = e.frames;
    for (var s = e.length, o, u = 0; u < s; u++)
        o = e[u],
        n && (o[2] -= 2 * r,
        o[3] -= 2 * r),
        o[0] + o[2] > i && (o[2] = i - o[0]),
        o[1] + o[3] > t && (o[3] = t - o[1]),
        0 > o[0] && (o[0] = 0),
        0 > o[1] && (o[1] = 0)
}
function tick(e) {
    if (isDesktop() || !isPageLeaved) {
        dtScale = e.delta / defaultDelta;
        if (!dtScale || 0 >= dtScale)
            dtScale = 1;
        2 < dtScale && (dtScale = 2);
        lastDelta = e.delta;
        counter++;
        animTicker++;
        for (levelStartTimer++; 0 < toDisposePhysicsBodies.length; )
            e = toDisposePhysicsBodies.pop(),
            destroyBody(e);
        for (; 0 < toDisposeChars.length; )
            currentChar = toDisposeChars.pop(),
            currentChar.dispose();
        for (; 0 < clickedChars.length; )
            currentChar = clickedChars.pop(),
            currentChar.type === BOMB_TYPE ? currentChar.bombClick() : currentChar.type === FAN_TYPE ? currentChar.toggleFan() : currentChar.isGlass ? currentChar.breakGlass() : currentChar.physBody && (awakeAllBodies(),
            currentChar.removeFromField());
        isGamePaused || (step = DEFAULT_WORLD_STEP * (1.2 < dtScale ? 1.2 : dtScale),
        space.step(step / 2),
        space.step(step / 2));
        isPhysicsDebugDraw && debugDraw.draw();
        allHeroesLen = allHeroes.length;
        for (e = allChars.length - 1; 0 <= e; --e)
            allChars[e].tick();
        interfaceTick();
        updateBonusManager();
        updatePartManager();
        interfaceTick();
        isGameCompleteScreenShow && (MAX_PARTICLES_ON_SCREEN = 30,
        0 == animTicker % Math.floor(FPS / 6) && createPartExplode(Math.random() * ow, Math.random() * oh, 6, PART_STAR_TYPE, gameCompleteContainer));
        isNeedFpsMeter && 0 == counter % FPS && (fpsText.text = Math.floor(createjs.Ticker.getMeasuredFPS()).toString());
        30 < counter && isNeedCacheSizeUpdate && (isNeedCacheSizeUpdate = !1,
        isWithCache && allBgContainer.cache(0, 0, ow + 1, oh + 1, 2));
        e = 0;
        0 < scoreToAdd && (e = Math.round(scoreToAdd / 7),
        currentLevelScore += e,
        scoreToAdd -= e,
        updateScoreLabel(currentLevelScore));
        onGameResize();
        stage.update()
    }
}
function trace(e) {
    isLevelEditor && console.log(e)
}
function showBgByLevelNum(e, t, n) {
    mainBg.currentAnimationFrame = t ? t : allBgIndexes[e]
}
var isNeedFpsMeter = !1
  , isLevelEditor = !1
  , isSkipMenus = !1
  , isSkipReadyWin = !0
  , autoLevelToLoad = 1
  , isLastLevelLoad = !1
  , isDisableWin = !1
  , isOpenAllLevels = !1
  , openedLevels = 20
  , isPhysicsDebugDraw = !1
  , isGetAllProperties = !1
  , isLoadAnimFromJSON = !1
  , isSkipSplash = !0
  , isShowLogo = !0
  , isLevelSelectShow = !1
  , spriteScale = 1
  , isWithCache = !1
  , isTimerUpdateMode = !1
  , isPageLeaved = !1
  , isNeedHelperLabel = !1
  , isDesktopBrowser = !1
  , isLowQuality = !1
  , isDesignerSettingsPreferred = !0
  , STORAGE_PREFIX = "Soccer23"
  , isMobileOnlyResize = !1
  , SPONSOR_URL = "http://www.cynono.com/home.html"
  , PRELOADER_LOGO = "logo_spele.png"
  , HERO_TYPE = 0
  , HERO_DOC_TYPE = 1
  , HERO_WOMAN_TYPE = 2
  , MONSTER_TYPE = 3
  , DECOR_BALK_1_TYPE = 21
  , DECOR_BALK_2_TYPE = 22
  , DECOR_BALK_3_TYPE = 23
  , DECOR_BALK_4_TYPE = 24
  , DECOR_BALK_5_TYPE = 25
  , DECOR_LAND_TYPE = 26
  , DECOR_HOUSE_TYPE = 27
  , DECOR_KUST_TYPE = 28
  , DECOR_ZABOR_TYPE = 29
  , DECOR_MELNICA_TYPE = 30
  , DECOR_MELNICA_ROT_TYPE = 31
  , DECOR_ARROW_TYPE = 32
  , DECOR_HOUSE_2_TYPE = 33
  , DECOR_COW_TYPE = 34
  , DECOR_CIRCUS_TYPE = 35
  , DECOR_HOUSE_3_TYPE = 36
  , DECOR_HOUSE_4_TYPE = 37
  , DECOR_BALK_6_TYPE = 38
  , DECOR_WINDOW_TYPE = 39
  , DECOR_CAT_1_TYPE = 40
  , DECOR_CAT_2_TYPE = 41
  , DECOR_GRAM_TYPE = 42
  , DECOR_PICT_1_TYPE = 43
  , DECOR_FLOWER_1_TYPE = 44
  , DECOR_VENT_TYPE = 45
  , DECOR_ELECTR_TYPE = 46
  , DECOR_DOOR_TYPE = 47
  , DECOR_PICT_2_TYPE = 48
  , DECOR_SVECHA_TYPE = 49
  , DECOR_TABLE_TYPE = 50
  , DECOR_STUL_TYPE = 51
  , DECOR_PICT_3_TYPE = 52
  , DECOR_VESHALKA_TYPE = 53
  , DECOR_VELO_TYPE = 54
  , DECOR_COVER_TYPE = 55
  , DECOR_BALK_7_TYPE = 56
  , DECOR_HELP_1_TYPE = 57
  , PHYSICS_RECT_TYPE = 100
  , DYNAMIC_BOX_TYPE = 101
  , TELEPORT_TYPE = 102
  , BOMB_TYPE = 103
  , DANGER_TYPE = 104
  , PHYSICS_MAN_BLOCK_TYPE = 105
  , PHYSICS_WOMAN_BLOCK_TYPE = 106
  , GLASS_BLOCK_TYPE = 107
  , ACTIVATOR_TYPE = 108
  , DOOR_TYPE = 109
  , DYNAMIC_CIRCLE_TYPE = 110
  , DYNAMIC_RECT_TYPE = 111
  , TELEGA_TYPE = 112
  , DYNAMIC_TRIANGLE_TYPE = 113
  , MOVABLE_BALK_TYPE = 114
  , FAN_TYPE = 115
  , GLASS_BOX_TYPE = 116
  , GLASS_TRIANGLE_TYPE = 117
  , HARD_BOX_TYPE = 118
  , HARD_RECT_TYPE = 119
  , HARD_TRIANGLE_TYPE = 120
  , STATIC_BALK_1_TYPE = 121
  , LAND_TYPE = 122
  , STATIC_BOX_TYPE = 123
  , BONUS_DIAMOND_TYPE = 201
  , BONUS_MONEY_TYPE = 202
  , BONUS_STAR_TYPE = 203
  , BONUS_GHOST_TYPE = 204
  , AIM_TYPE = 301
  , STATIC_CATEGORY = 1
  , WOMAN_CATEGORY = 2
  , MAN_CATEGORY = 4
  , WOMAN_BLOCK_CATEGORY = 8
  , MAN_BLOCK_CATEGORY = 16
  , FAN_ACTIV_DISTANCE = 130
  , FAN_MAX_FORCE = 40
  , GLASS_BREAK_VELOCITY = 70;
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t, n) {
        this.initialize(e, t, n)
    }
      , t = e.prototype;
    t.type = null ;
    t.target = null ;
    t.currentTarget = null ;
    t.eventPhase = 0;
    t.bubbles = !1;
    t.cancelable = !1;
    t.timeStamp = 0;
    t.defaultPrevented = !1;
    t.propagationStopped = !1;
    t.immediatePropagationStopped = !1;
    t.removed = !1;
    t.initialize = function(e, t, n) {
        this.type = e;
        this.bubbles = t;
        this.cancelable = n;
        this.timeStamp = (new Date).getTime()
    }
    ;
    t.preventDefault = function() {
        this.defaultPrevented = !0
    }
    ;
    t.stopPropagation = function() {
        this.propagationStopped = !0
    }
    ;
    t.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = this.propagationStopped = !0
    }
    ;
    t.remove = function() {
        this.removed = !0
    }
    ;
    t.clone = function() {
        return new e(this.type,this.bubbles,this.cancelable)
    }
    ;
    t.toString = function() {
        return "[Event (type=" + this.type + ")]"
    }
    ;
    createjs.Event = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function() {}
      , t = e.prototype;
    e.initialize = function(e) {
        e.addEventListener = t.addEventListener;
        e.on = t.on;
        e.removeEventListener = e.off = t.removeEventListener;
        e.removeAllEventListeners = t.removeAllEventListeners;
        e.hasEventListener = t.hasEventListener;
        e.dispatchEvent = t.dispatchEvent;
        e._dispatchEvent = t._dispatchEvent
    }
    ;
    t._listeners = null ;
    t._captureListeners = null ;
    t.initialize = function() {}
    ;
    t.addEventListener = function(e, t, n) {
        var r;
        r = n ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
        var i = r[e];
        i && this.removeEventListener(e, t, n);
        (i = r[e]) ? i.push(t) : r[e] = [t];
        return t
    }
    ;
    t.on = function(e, t, n, r, i, s) {
        t.handleEvent && (n = n || t,
        t = t.handleEvent);
        n = n || this;
        return this.addEventListener(e, function(e) {
            t.call(n, e, i);
            r && e.remove()
        }, s)
    }
    ;
    t.removeEventListener = function(e, t, n) {
        if (n = n ? this._captureListeners : this._listeners) {
            var r = n[e];
            if (r)
                for (var i = 0, s = r.length; i < s; i++)
                    if (r[i] == t) {
                        1 == s ? delete n[e] : r.splice(i, 1);
                        break
                    }
        }
    }
    ;
    t.off = t.removeEventListener;
    t.removeAllEventListeners = function(e) {
        e ? (this._listeners && delete this._listeners[e],
        this._captureListeners && delete this._captureListeners[e]) : this._listeners = this._captureListeners = null
    }
    ;
    t.dispatchEvent = function(e, t) {
        if ("string" == typeof e) {
            var n = this._listeners;
            if (!n || !n[e])
                return !1;
            e = new createjs.Event(e)
        }
        e.target = t || this;
        if (e.bubbles && this.parent) {
            for (var r = this, n = [r]; r.parent; )
                n.push(r = r.parent);
            for (var i = n.length, r = i - 1; 0 <= r && !e.propagationStopped; r--)
                n[r]._dispatchEvent(e, 1 + (0 == r));
            for (r = 1; r < i && !e.propagationStopped; r++)
                n[r]._dispatchEvent(e, 3)
        } else
            this._dispatchEvent(e, 2);
        return e.defaultPrevented
    }
    ;
    t.hasEventListener = function(e) {
        var t = this._listeners
          , n = this._captureListeners;
        return !!(t && t[e] || n && n[e])
    }
    ;
    t.toString = function() {
        return "[EventDispatcher]"
    }
    ;
    t._dispatchEvent = function(e, t) {
        var n, r = 1 == t ? this._captureListeners : this._listeners;
        if (e && r && (r = r[e.type]) && (n = r.length)) {
            e.currentTarget = this;
            e.eventPhase = t;
            e.removed = !1;
            for (var r = r.slice(), i = 0; i < n && !e.immediatePropagationStopped; i++) {
                var s = r[i];
                s.handleEvent ? s.handleEvent(e) : s(e);
                e.removed && (this.off(e.type, s, 1 == t),
                e.removed = !1)
            }
        }
    }
    ;
    createjs.EventDispatcher = e
})();
this.createjs = this.createjs || {};
(function() {
    createjs.indexOf = function(e, t) {
        for (var n = 0, r = e.length; n < r; n++)
            if (t === e[n])
                return n;
        return -1
    }
})();
this.createjs = this.createjs || {};
(function() {
    var e = function() {
        throw "UID cannot be instantiated"
    }
    ;
    e._nextID = 0;
    e.get = function() {
        return e._nextID++
    }
    ;
    createjs.UID = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function() {
        throw "Ticker cannot be instantiated."
    }
    ;
    e.RAF_SYNCHED = "synched";
    e.RAF = "raf";
    e.TIMEOUT = "timeout";
    e.useRAF = !1;
    e.timingMode = null ;
    e.maxDelta = 60;
    e.removeEventListener = null ;
    e.removeAllEventListeners = null ;
    e.dispatchEvent = null ;
    e.hasEventListener = null ;
    e._listeners = null ;
    createjs.EventDispatcher.initialize(e);
    e._addEventListener = e.addEventListener;
    e.addEventListener = function() {
        !e._inited && e.init();
        return e._addEventListener.apply(e, arguments)
    }
    ;
    e._paused = !1;
    e._inited = !1;
    e._startTime = 0;
    e._pausedTime = 0;
    e._ticks = 0;
    e._pausedTicks = 0;
    e._interval = 50;
    e._lastTime = 0;
    e._times = [];
    e._tickTimes = [];
    e._timerId = null ;
    e._raf = !0;
    e._isFirstInit = !0;
    e.init = function() {
        e._inited || (e._timerId = null ,
        e._inited = !0,
        e._isFirstInit = !1,
        e._times = [],
        e._tickTimes = [],
        e._startTime = e._getTime(),
        e._times.push(e._lastTime = 0),
        e.setInterval(e._interval))
    }
    ;
    e.reset = function() {
        e._inited = !1;
        if (e._raf) {
            var t = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
            t && t(e._timerId)
        } else
            clearTimeout(e._timerId)
    }
    ;
    e.setInterval = function(t) {
        e._interval = t;
        e._inited && e._setupTick()
    }
    ;
    e.getInterval = function() {
        return e._interval
    }
    ;
    e.setFPS = function(t) {
        e.setInterval(1e3 / t)
    }
    ;
    e.getFPS = function() {
        return 1e3 / e._interval
    }
    ;
    e.getMeasuredTickTime = function(t) {
        var n = 0
          , r = e._tickTimes;
        if (1 > r.length)
            return -1;
        t = Math.min(r.length, t || e.getFPS() | 0);
        for (var i = 0; i < t; i++)
            n += r[i];
        return n / t
    }
    ;
    e.getMeasuredFPS = function(t) {
        var n = e._times;
        if (2 > n.length)
            return -1;
        t = Math.min(n.length - 1, t || e.getFPS() | 0);
        return 1e3 / ((n[0] - n[t]) / t)
    }
    ;
    e.setPaused = function(t) {
        e._paused = t
    }
    ;
    e.getPaused = function() {
        return e._paused
    }
    ;
    e.getTime = function(t) {
        return e._getTime() - e._startTime - (t ? e._pausedTime : 0)
    }
    ;
    e.getEventTime = function(t) {
        return (e._lastTime || e._startTime) - (t ? e._pausedTime : 0)
    }
    ;
    e.getTicks = function(t) {
        return e._ticks - (t ? e._pausedTicks : 0)
    }
    ;
    e._handleSynch = function() {
        var t = e._getTime() - e._startTime;
        e._timerId = null ;
        e._setupTick();
        t - e._lastTime >= .97 * (e._interval - 1) && e._tick()
    }
    ;
    e._handleRAF = function() {
        e._timerId = null ;
        e._setupTick();
        e._tick()
    }
    ;
    e._handleTimeout = function() {
        e._timerId = null ;
        e._setupTick();
        e._tick()
    }
    ;
    e._setupTick = function() {
        if (null != e._timerId)
            trace("duplicate");
        else {
            var t = e.timingMode || e.useRAF && e.RAF_SYNCHED;
            if (t == e.RAF_SYNCHED || t == e.RAF) {
                var n = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
                if (n) {
                    e._timerId = n(t == e.RAF ? e._handleRAF : e._handleSynch);
                    e._raf = !0;
                    return
                }
            }
            e._raf = !1;
            e._timerId = setTimeout(e._handleTimeout, e._interval)
        }
    }
    ;
    e._tick = function() {
        var t = e._getTime() - e._startTime
          , n = t - e._lastTime
          , r = e._paused;
        e._ticks++;
        r && (e._pausedTicks++,
        e._pausedTime += n);
        e._lastTime = t;
        if (e.hasEventListener("tick")) {
            var i = new createjs.Event("tick")
              , s = e.maxDelta;
            i.delta = s && n > s ? s : n;
            i.paused = r;
            i.time = t;
            i.runTime = t - e._pausedTime;
            e.dispatchEvent(i)
        }
        for (e._tickTimes.unshift(e._getTime() - t); 100 < e._tickTimes.length; )
            e._tickTimes.pop();
        for (e._times.unshift(t); 100 < e._times.length; )
            e._times.pop()
    }
    ;
    var t = window.performance && (performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow);
    e._getTime = function() {
        return t && t.call(performance) || (new Date).getTime()
    }
    ;
    createjs.Ticker = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t, n, r, i, s, o, u, a, f) {
        this.initialize(e, t, n, r, i, s, o, u, a, f)
    }
      , t = e.prototype = new createjs.Event;
    t.stageX = 0;
    t.stageY = 0;
    t.rawX = 0;
    t.rawY = 0;
    t.nativeEvent = null ;
    t.pointerID = 0;
    t.primary = !1;
    t.addEventListener = null ;
    t.removeEventListener = null ;
    t.removeAllEventListeners = null ;
    t.dispatchEvent = null ;
    t.hasEventListener = null ;
    t._listeners = null ;
    createjs.EventDispatcher.initialize(t);
    t.Event_initialize = t.initialize;
    t.initialize = function(e, t, n, r, i, s, o, u, a, f) {
        this.Event_initialize(e, t, n);
        this.stageX = r;
        this.stageY = i;
        this.nativeEvent = s;
        this.pointerID = o;
        this.primary = u;
        this.rawX = null == a ? r : a;
        this.rawY = null == f ? i : f
    }
    ;
    t.clone = function() {
        return new e(this.type,this.bubbles,this.cancelable,this.stageX,this.stageY,this.target,this.nativeEvent,this.pointerID,this.primary,this.rawX,this.rawY)
    }
    ;
    t.toString = function() {
        return "[MouseEvent (type=" + this.type + " stageX=" + this.stageX + " stageY=" + this.stageY + ")]"
    }
    ;
    createjs.MouseEvent = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t, n, r, i, s) {
        this.initialize(e, t, n, r, i, s)
    }
      , t = e.prototype;
    e.identity = null ;
    e.DEG_TO_RAD = Math.PI / 180;
    t.a = 1;
    t.b = 0;
    t.c = 0;
    t.d = 1;
    t.tx = 0;
    t.ty = 0;
    t.alpha = 1;
    t.shadow = null ;
    t.compositeOperation = null ;
    t.initialize = function(e, t, n, r, i, s) {
        this.a = null == e ? 1 : e;
        this.b = t || 0;
        this.c = n || 0;
        this.d = null == r ? 1 : r;
        this.tx = i || 0;
        this.ty = s || 0;
        return this
    }
    ;
    t.prepend = function(e, t, n, r, i, s) {
        var o = this.tx;
        if (1 != e || 0 != t || 0 != n || 1 != r) {
            var u = this.a
              , a = this.c;
            this.a = u * e + this.b * n;
            this.b = u * t + this.b * r;
            this.c = a * e + this.d * n;
            this.d = a * t + this.d * r
        }
        this.tx = o * e + this.ty * n + i;
        this.ty = o * t + this.ty * r + s;
        return this
    }
    ;
    t.append = function(e, t, n, r, i, s) {
        var o = this.a
          , u = this.b
          , a = this.c
          , f = this.d;
        this.a = e * o + t * a;
        this.b = e * u + t * f;
        this.c = n * o + r * a;
        this.d = n * u + r * f;
        this.tx = i * o + s * a + this.tx;
        this.ty = i * u + s * f + this.ty;
        return this
    }
    ;
    t.prependMatrix = function(e) {
        this.prepend(e.a, e.b, e.c, e.d, e.tx, e.ty);
        this.prependProperties(e.alpha, e.shadow, e.compositeOperation);
        return this
    }
    ;
    t.appendMatrix = function(e) {
        this.append(e.a, e.b, e.c, e.d, e.tx, e.ty);
        this.appendProperties(e.alpha, e.shadow, e.compositeOperation);
        return this
    }
    ;
    t.prependTransform = function(t, n, r, i, s, o, u, a, f) {
        if (s % 360) {
            var l = s * e.DEG_TO_RAD;
            s = Math.cos(l);
            l = Math.sin(l)
        } else
            s = 1,
            l = 0;
        if (a || f)
            this.tx -= a,
            this.ty -= f;
        o || u ? (o *= e.DEG_TO_RAD,
        u *= e.DEG_TO_RAD,
        this.prepend(s * r, l * r, -l * i, s * i, 0, 0),
        this.prepend(Math.cos(u), Math.sin(u), -Math.sin(o), Math.cos(o), t, n)) : this.prepend(s * r, l * r, -l * i, s * i, t, n);
        return this
    }
    ;
    t.appendTransform = function(t, n, r, i, s, o, u, a, f) {
        if (s % 360) {
            var l = s * e.DEG_TO_RAD;
            s = Math.cos(l);
            l = Math.sin(l)
        } else
            s = 1,
            l = 0;
        o || u ? (o *= e.DEG_TO_RAD,
        u *= e.DEG_TO_RAD,
        this.append(Math.cos(u), Math.sin(u), -Math.sin(o), Math.cos(o), t, n),
        this.append(s * r, l * r, -l * i, s * i, 0, 0)) : this.append(s * r, l * r, -l * i, s * i, t, n);
        if (a || f)
            this.tx -= a * this.a + f * this.c,
            this.ty -= a * this.b + f * this.d;
        return this
    }
    ;
    t.rotate = function(e) {
        var t = Math.cos(e);
        e = Math.sin(e);
        var n = this.a
          , r = this.c
          , i = this.tx;
        this.a = n * t - this.b * e;
        this.b = n * e + this.b * t;
        this.c = r * t - this.d * e;
        this.d = r * e + this.d * t;
        this.tx = i * t - this.ty * e;
        this.ty = i * e + this.ty * t;
        return this
    }
    ;
    t.skew = function(t, n) {
        t *= e.DEG_TO_RAD;
        n *= e.DEG_TO_RAD;
        this.append(Math.cos(n), Math.sin(n), -Math.sin(t), Math.cos(t), 0, 0);
        return this
    }
    ;
    t.scale = function(e, t) {
        this.a *= e;
        this.d *= t;
        this.c *= e;
        this.b *= t;
        this.tx *= e;
        this.ty *= t;
        return this
    }
    ;
    t.translate = function(e, t) {
        this.tx += e;
        this.ty += t;
        return this
    }
    ;
    t.identity = function() {
        this.alpha = this.a = this.d = 1;
        this.b = this.c = this.tx = this.ty = 0;
        this.shadow = this.compositeOperation = null ;
        return this
    }
    ;
    t.invert = function() {
        var e = this.a
          , t = this.b
          , n = this.c
          , r = this.d
          , i = this.tx
          , s = e * r - t * n;
        this.a = r / s;
        this.b = -t / s;
        this.c = -n / s;
        this.d = e / s;
        this.tx = (n * this.ty - r * i) / s;
        this.ty = -(e * this.ty - t * i) / s;
        return this
    }
    ;
    t.isIdentity = function() {
        return 0 == this.tx && 0 == this.ty && 1 == this.a && 0 == this.b && 0 == this.c && 1 == this.d
    }
    ;
    t.transformPoint = function(e, t, n) {
        n = n || {};
        n.x = e * this.a + t * this.c + this.tx;
        n.y = e * this.b + t * this.d + this.ty;
        return n
    }
    ;
    t.decompose = function(t) {
        null == t && (t = {});
        t.x = this.tx;
        t.y = this.ty;
        t.scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
        t.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
        var n = Math.atan2(-this.c, this.d)
          , r = Math.atan2(this.b, this.a);
        n == r ? (t.rotation = r / e.DEG_TO_RAD,
        0 > this.a && 0 <= this.d && (t.rotation += 0 >= t.rotation ? 180 : -180),
        t.skewX = t.skewY = 0) : (t.skewX = n / e.DEG_TO_RAD,
        t.skewY = r / e.DEG_TO_RAD);
        return t
    }
    ;
    t.reinitialize = function(e, t, n, r, i, s, o, u, a) {
        this.initialize(e, t, n, r, i, s);
        this.alpha = null == o ? 1 : o;
        this.shadow = u;
        this.compositeOperation = a;
        return this
    }
    ;
    t.copy = function(e) {
        return this.reinitialize(e.a, e.b, e.c, e.d, e.tx, e.ty, e.alpha, e.shadow, e.compositeOperation)
    }
    ;
    t.appendProperties = function(e, t, n) {
        this.alpha *= e;
        this.shadow = t || this.shadow;
        this.compositeOperation = n || this.compositeOperation;
        return this
    }
    ;
    t.prependProperties = function(e, t, n) {
        this.alpha *= e;
        this.shadow = this.shadow || t;
        this.compositeOperation = this.compositeOperation || n;
        return this
    }
    ;
    t.clone = function() {
        return (new e).copy(this)
    }
    ;
    t.toString = function() {
        return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]"
    }
    ;
    e.identity = new e;
    createjs.Matrix2D = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t) {
        this.initialize(e, t)
    }
      , t = e.prototype;
    t.x = 0;
    t.y = 0;
    t.initialize = function(e, t) {
        this.x = null == e ? 0 : e;
        this.y = null == t ? 0 : t;
        return this
    }
    ;
    t.copy = function(e) {
        return this.initialize(e.x, e.y)
    }
    ;
    t.clone = function() {
        return new e(this.x,this.y)
    }
    ;
    t.toString = function() {
        return "[Point (x=" + this.x + " y=" + this.y + ")]"
    }
    ;
    createjs.Point = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t, n, r) {
        this.initialize(e, t, n, r)
    }
      , t = e.prototype;
    t.x = 0;
    t.y = 0;
    t.width = 0;
    t.height = 0;
    t.initialize = function(e, t, n, r) {
        this.x = e || 0;
        this.y = t || 0;
        this.width = n || 0;
        this.height = r || 0;
        return this
    }
    ;
    t.copy = function(e) {
        return this.initialize(e.x, e.y, e.width, e.height)
    }
    ;
    t.clone = function() {
        return new e(this.x,this.y,this.width,this.height)
    }
    ;
    t.toString = function() {
        return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]"
    }
    ;
    createjs.Rectangle = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t, n, r, i, s, o) {
        this.initialize(e, t, n, r, i, s, o)
    }
      , t = e.prototype;
    t.target = null ;
    t.overLabel = null ;
    t.outLabel = null ;
    t.downLabel = null ;
    t.play = !1;
    t._isPressed = !1;
    t._isOver = !1;
    t.initialize = function(e, t, n, r, i, s, o) {
        e.addEventListener && (this.target = e,
        e.cursor = "pointer",
        this.overLabel = null == n ? "over" : n,
        this.outLabel = null == t ? "out" : t,
        this.downLabel = null == r ? "down" : r,
        this.play = i,
        this.setEnabled(!0),
        this.handleEvent({}),
        s && (o && (s.actionsEnabled = !1,
        s.gotoAndStop && s.gotoAndStop(o)),
        e.hitArea = s))
    }
    ;
    t.setEnabled = function(e) {
        var t = this.target;
        e ? (t.addEventListener("rollover", this),
        t.addEventListener("rollout", this),
        t.addEventListener("mousedown", this),
        t.addEventListener("pressup", this)) : (t.removeEventListener("rollover", this),
        t.removeEventListener("rollout", this),
        t.removeEventListener("mousedown", this),
        t.removeEventListener("pressup", this))
    }
    ;
    t.toString = function() {
        return "[ButtonHelper]"
    }
    ;
    t.handleEvent = function(e) {
        var t = this.target;
        e = e.type;
        "mousedown" == e ? (this._isPressed = !0,
        e = this.downLabel) : "pressup" == e ? (this._isPressed = !1,
        e = this._isOver ? this.overLabel : this.outLabel) : "rollover" == e ? (this._isOver = !0,
        e = this._isPressed ? this.downLabel : this.overLabel) : (this._isOver = !1,
        e = this._isPressed ? this.overLabel : this.outLabel);
        this.play ? t.gotoAndPlay && t.gotoAndPlay(e) : t.gotoAndStop && t.gotoAndStop(e)
    }
    ;
    createjs.ButtonHelper = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t, n, r) {
        this.initialize(e, t, n, r)
    }
      , t = e.prototype;
    e.identity = null ;
    t.color = null ;
    t.offsetX = 0;
    t.offsetY = 0;
    t.blur = 0;
    t.initialize = function(e, t, n, r) {
        this.color = e;
        this.offsetX = t;
        this.offsetY = n;
        this.blur = r
    }
    ;
    t.toString = function() {
        return "[Shadow]"
    }
    ;
    t.clone = function() {
        return new e(this.color,this.offsetX,this.offsetY,this.blur)
    }
    ;
    e.identity = new e("transparent",0,0,0);
    createjs.Shadow = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e) {
        this.initialize(e)
    }
      , t = e.prototype = new createjs.EventDispatcher;
    t.complete = !0;
    t.framerate = 0;
    t._animations = null ;
    t._frames = null ;
    t._images = null ;
    t._data = null ;
    t._loadCount = 0;
    t._frameHeight = 0;
    t._frameWidth = 0;
    t._numFrames = 0;
    t._regX = 0;
    t._regY = 0;
    t.initialize = function(e) {
        var t, n, r;
        if (null != e) {
            this.framerate = e.framerate || 0;
            if (e.images && 0 < (n = e.images.length))
                for (r = this._images = [],
                t = 0; t < n; t++) {
                    var i = e.images[t];
                    if ("string" == typeof i) {
                        var s = i
                          , i = document.createElement("img");
                        i.src = s
                    }
                    r.push(i);
                    i.getContext || i.complete || (this._loadCount++,
                    this.complete = !1,
                    function(e) {
                        i.onload = function() {
                            e._handleImageLoad()
                        }
                    }(this))
                }
            if (null != e.frames)
                if (e.frames instanceof Array)
                    for (this._frames = [],
                    r = e.frames,
                    t = 0,
                    n = r.length; t < n; t++)
                        s = r[t],
                        this._frames.push({
                            image: this._images[s[4] ? s[4] : 0],
                            rect: new createjs.Rectangle(s[0],s[1],s[2],s[3]),
                            regX: s[5] || 0,
                            regY: s[6] || 0
                        });
                else
                    n = e.frames,
                    this._frameWidth = n.width,
                    this._frameHeight = n.height,
                    this._regX = n.regX || 0,
                    this._regY = n.regY || 0,
                    this._numFrames = n.count,
                    0 == this._loadCount && this._calculateFrames();
            this._animations = [];
            if (null != (n = e.animations)) {
                this._data = {};
                for (var o in n) {
                    e = {
                        name: o
                    };
                    s = n[o];
                    if ("number" == typeof s)
                        r = e.frames = [s];
                    else if (s instanceof Array)
                        if (1 == s.length)
                            e.frames = [s[0]];
                        else
                            for (e.speed = s[3],
                            e.next = s[2],
                            r = e.frames = [],
                            t = s[0]; t <= s[1]; t++)
                                r.push(t);
                    else
                        e.speed = s.speed,
                        e.next = s.next,
                        t = s.frames,
                        r = e.frames = "number" == typeof t ? [t] : t.slice(0);
                    if (!0 === e.next || void 0 === e.next)
                        e.next = o;
                    if (!1 === e.next || 2 > r.length && e.next == o)
                        e.next = null ;
                    e.speed || (e.speed = 1);
                    this._animations.push(o);
                    this._data[o] = e
                }
            }
        }
    }
    ;
    t.getNumFrames = function(e) {
        if (null == e)
            return this._frames ? this._frames.length : this._numFrames;
        e = this._data[e];
        return null == e ? 0 : e.frames.length
    }
    ;
    t.getAnimations = function() {
        return this._animations.slice(0)
    }
    ;
    t.getAnimation = function(e) {
        return this._data[e]
    }
    ;
    t.getFrame = function(e) {
        var t;
        return this._frames && (t = this._frames[e]) ? t : null
    }
    ;
    t.getFrameBounds = function(e, t) {
        var n = this.getFrame(e);
        return n ? (t || new createjs.Rectangle).initialize(-n.regX, -n.regY, n.rect.width, n.rect.height) : null
    }
    ;
    t.toString = function() {
        return "[SpriteSheet]"
    }
    ;
    t.clone = function() {
        var t = new e;
        t.complete = this.complete;
        t._animations = this._animations;
        t._frames = this._frames;
        t._images = this._images;
        t._data = this._data;
        t._frameHeight = this._frameHeight;
        t._frameWidth = this._frameWidth;
        t._numFrames = this._numFrames;
        t._loadCount = this._loadCount;
        return t
    }
    ;
    t._handleImageLoad = function() {
        0 == --this._loadCount && (this._calculateFrames(),
        this.complete = !0,
        this.dispatchEvent("complete"))
    }
    ;
    t._calculateFrames = function() {
        if (!this._frames && 0 != this._frameWidth) {
            this._frames = [];
            for (var e = 0, t = this._frameWidth, n = this._frameHeight, r = 0, i = this._images; r < i.length; r++) {
                for (var s = i[r], o = (s.width + 1) / t | 0, u = (s.height + 1) / n | 0, u = 0 < this._numFrames ? Math.min(this._numFrames - e, o * u) : o * u, a = 0; a < u; a++)
                    this._frames.push({
                        image: s,
                        rect: new createjs.Rectangle(a % o * t,(a / o | 0) * n,t,n),
                        regX: this._regX,
                        regY: this._regY
                    });
                e += u
            }
            this._numFrames = e
        }
    }
    ;
    createjs.SpriteSheet = e
})();
this.createjs = this.createjs || {};
(function() {
    function e(e, t, n) {
        this.f = e;
        this.params = t;
        this.path = null == n ? !0 : n
    }
    e.prototype.exec = function(e) {
        this.f.apply(e, this.params)
    }
    ;
    var t = function() {
        this.initialize()
    }
      , n = t.prototype;
    t.getRGB = function(e, t, n, r) {
        null != e && null == n && (r = t,
        n = e & 255,
        t = e >> 8 & 255,
        e = e >> 16 & 255);
        return null == r ? "rgb(" + e + "," + t + "," + n + ")" : "rgba(" + e + "," + t + "," + n + "," + r + ")"
    }
    ;
    t.getHSL = function(e, t, n, r) {
        return null == r ? "hsl(" + e % 360 + "," + t + "%," + n + "%)" : "hsla(" + e % 360 + "," + t + "%," + n + "%," + r + ")"
    }
    ;
    t.Command = e;
    t.BASE_64 = {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        E: 4,
        F: 5,
        G: 6,
        H: 7,
        I: 8,
        J: 9,
        K: 10,
        L: 11,
        M: 12,
        N: 13,
        O: 14,
        P: 15,
        Q: 16,
        R: 17,
        S: 18,
        T: 19,
        U: 20,
        V: 21,
        W: 22,
        X: 23,
        Y: 24,
        Z: 25,
        a: 26,
        b: 27,
        c: 28,
        d: 29,
        e: 30,
        f: 31,
        g: 32,
        h: 33,
        i: 34,
        j: 35,
        k: 36,
        l: 37,
        m: 38,
        n: 39,
        o: 40,
        p: 41,
        q: 42,
        r: 43,
        s: 44,
        t: 45,
        u: 46,
        v: 47,
        w: 48,
        x: 49,
        y: 50,
        z: 51,
        0: 52,
        1: 53,
        2: 54,
        3: 55,
        4: 56,
        5: 57,
        6: 58,
        7: 59,
        8: 60,
        9: 61,
        "+": 62,
        "/": 63
    };
    t.STROKE_CAPS_MAP = ["butt", "round", "square"];
    t.STROKE_JOINTS_MAP = ["miter", "round", "bevel"];
    var r = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    if (r.getContext) {
        var i = t._ctx = r.getContext("2d");
        t.beginCmd = new e(i.beginPath,[],!1);
        t.fillCmd = new e(i.fill,[],!1);
        t.strokeCmd = new e(i.stroke,[],!1);
        r.width = r.height = 1
    }
    n._strokeInstructions = null ;
    n._strokeStyleInstructions = null ;
    n._strokeIgnoreScale = !1;
    n._fillInstructions = null ;
    n._fillMatrix = null ;
    n._instructions = null ;
    n._oldInstructions = null ;
    n._activeInstructions = null ;
    n._active = !1;
    n._dirty = !1;
    n.initialize = function() {
        this.clear();
        this._ctx = t._ctx
    }
    ;
    n.isEmpty = function() {
        return !(this._instructions.length || this._oldInstructions.length || this._activeInstructions.length)
    }
    ;
    n.draw = function(e) {
        this._dirty && this._updateInstructions();
        for (var t = this._instructions, n = 0, r = t.length; n < r; n++)
            t[n].exec(e)
    }
    ;
    n.drawAsPath = function(e) {
        this._dirty && this._updateInstructions();
        for (var t, n = this._instructions, r = 0, i = n.length; r < i; r++)
            ((t = n[r]).path || 0 == r) && t.exec(e)
    }
    ;
    n.moveTo = function(t, n) {
        this._activeInstructions.push(new e(this._ctx.moveTo,[t, n]));
        return this
    }
    ;
    n.lineTo = function(t, n) {
        this._dirty = this._active = !0;
        this._activeInstructions.push(new e(this._ctx.lineTo,[t, n]));
        return this
    }
    ;
    n.arcTo = function(t, n, r, i, s) {
        this._dirty = this._active = !0;
        this._activeInstructions.push(new e(this._ctx.arcTo,[t, n, r, i, s]));
        return this
    }
    ;
    n.arc = function(t, n, r, i, s, o) {
        this._dirty = this._active = !0;
        null == o && (o = !1);
        this._activeInstructions.push(new e(this._ctx.arc,[t, n, r, i, s, o]));
        return this
    }
    ;
    n.quadraticCurveTo = function(t, n, r, i) {
        this._dirty = this._active = !0;
        this._activeInstructions.push(new e(this._ctx.quadraticCurveTo,[t, n, r, i]));
        return this
    }
    ;
    n.bezierCurveTo = function(t, n, r, i, s, o) {
        this._dirty = this._active = !0;
        this._activeInstructions.push(new e(this._ctx.bezierCurveTo,[t, n, r, i, s, o]));
        return this
    }
    ;
    n.rect = function(t, n, r, i) {
        this._dirty = this._active = !0;
        this._activeInstructions.push(new e(this._ctx.rect,[t, n, r, i]));
        return this
    }
    ;
    n.closePath = function() {
        this._active && (this._dirty = !0,
        this._activeInstructions.push(new e(this._ctx.closePath,[])));
        return this
    }
    ;
    n.clear = function() {
        this._instructions = [];
        this._oldInstructions = [];
        this._activeInstructions = [];
        this._strokeStyleInstructions = this._strokeInstructions = this._fillInstructions = this._fillMatrix = null ;
        this._active = this._dirty = this._strokeIgnoreScale = !1;
        return this
    }
    ;
    n.beginFill = function(t) {
        this._active && this._newPath();
        this._fillInstructions = t ? [new e(this._setProp,["fillStyle", t],!1)] : null ;
        this._fillMatrix = null ;
        return this
    }
    ;
    n.beginLinearGradientFill = function(t, n, r, i, s, o) {
        this._active && this._newPath();
        r = this._ctx.createLinearGradient(r, i, s, o);
        i = 0;
        for (s = t.length; i < s; i++)
            r.addColorStop(n[i], t[i]);
        this._fillInstructions = [new e(this._setProp,["fillStyle", r],!1)];
        this._fillMatrix = null ;
        return this
    }
    ;
    n.beginRadialGradientFill = function(t, n, r, i, s, o, u, a) {
        this._active && this._newPath();
        r = this._ctx.createRadialGradient(r, i, s, o, u, a);
        i = 0;
        for (s = t.length; i < s; i++)
            r.addColorStop(n[i], t[i]);
        this._fillInstructions = [new e(this._setProp,["fillStyle", r],!1)];
        this._fillMatrix = null ;
        return this
    }
    ;
    n.beginBitmapFill = function(t, n, r) {
        this._active && this._newPath();
        t = this._ctx.createPattern(t, n || "");
        this._fillInstructions = [new e(this._setProp,["fillStyle", t],!1)];
        this._fillMatrix = r ? [r.a, r.b, r.c, r.d, r.tx, r.ty] : null ;
        return this
    }
    ;
    n.endFill = function() {
        return this.beginFill()
    }
    ;
    n.setStrokeStyle = function(n, r, i, s, o) {
        this._active && this._newPath();
        this._strokeStyleInstructions = [new e(this._setProp,["lineWidth", null == n ? "1" : n],!1), new e(this._setProp,["lineCap", null == r ? "butt" : isNaN(r) ? r : t.STROKE_CAPS_MAP[r]],!1), new e(this._setProp,["lineJoin", null == i ? "miter" : isNaN(i) ? i : t.STROKE_JOINTS_MAP[i]],!1), new e(this._setProp,["miterLimit", null == s ? "10" : s],!1)];
        this._strokeIgnoreScale = o;
        return this
    }
    ;
    n.beginStroke = function(t) {
        this._active && this._newPath();
        this._strokeInstructions = t ? [new e(this._setProp,["strokeStyle", t],!1)] : null ;
        return this
    }
    ;
    n.beginLinearGradientStroke = function(t, n, r, i, s, o) {
        this._active && this._newPath();
        r = this._ctx.createLinearGradient(r, i, s, o);
        i = 0;
        for (s = t.length; i < s; i++)
            r.addColorStop(n[i], t[i]);
        this._strokeInstructions = [new e(this._setProp,["strokeStyle", r],!1)];
        return this
    }
    ;
    n.beginRadialGradientStroke = function(t, n, r, i, s, o, u, a) {
        this._active && this._newPath();
        r = this._ctx.createRadialGradient(r, i, s, o, u, a);
        i = 0;
        for (s = t.length; i < s; i++)
            r.addColorStop(n[i], t[i]);
        this._strokeInstructions = [new e(this._setProp,["strokeStyle", r],!1)];
        return this
    }
    ;
    n.beginBitmapStroke = function(t, n) {
        this._active && this._newPath();
        var r = this._ctx.createPattern(t, n || "");
        this._strokeInstructions = [new e(this._setProp,["strokeStyle", r],!1)];
        return this
    }
    ;
    n.endStroke = function() {
        this.beginStroke();
        return this
    }
    ;
    n.curveTo = n.quadraticCurveTo;
    n.drawRect = n.rect;
    n.drawRoundRect = function(e, t, n, r, i) {
        this.drawRoundRectComplex(e, t, n, r, i, i, i, i);
        return this
    }
    ;
    n.drawRoundRectComplex = function(t, n, r, i, s, o, u, a) {
        var f = (r < i ? r : i) / 2
          , l = 0
          , h = 0
          , p = 0
          , d = 0;
        0 > s && (s *= l = -1);
        s > f && (s = f);
        0 > o && (o *= h = -1);
        o > f && (o = f);
        0 > u && (u *= p = -1);
        u > f && (u = f);
        0 > a && (a *= d = -1);
        a > f && (a = f);
        this._dirty = this._active = !0;
        var f = this._ctx.arcTo
          , v = this._ctx.lineTo;
        this._activeInstructions.push(new e(this._ctx.moveTo,[t + r - o, n]), new e(f,[t + r + o * h, n - o * h, t + r, n + o, o]), new e(v,[t + r, n + i - u]), new e(f,[t + r + u * p, n + i + u * p, t + r - u, n + i, u]), new e(v,[t + a, n + i]), new e(f,[t - a * d, n + i + a * d, t, n + i - a, a]), new e(v,[t, n + s]), new e(f,[t - s * l, n - s * l, t + s, n, s]), new e(this._ctx.closePath));
        return this
    }
    ;
    n.drawCircle = function(e, t, n) {
        this.arc(e, t, n, 0, 2 * Math.PI);
        return this
    }
    ;
    n.drawEllipse = function(t, n, r, i) {
        this._dirty = this._active = !0;
        var s = .5522848 * (r / 2)
          , o = .5522848 * (i / 2)
          , u = t + r
          , a = n + i;
        r = t + r / 2;
        i = n + i / 2;
        this._activeInstructions.push(new e(this._ctx.moveTo,[t, i]), new e(this._ctx.bezierCurveTo,[t, i - o, r - s, n, r, n]), new e(this._ctx.bezierCurveTo,[r + s, n, u, i - o, u, i]), new e(this._ctx.bezierCurveTo,[u, i + o, r + s, a, r, a]), new e(this._ctx.bezierCurveTo,[r - s, a, t, i + o, t, i]));
        return this
    }
    ;
    n.inject = function(t, n) {
        this._dirty = this._active = !0;
        this._activeInstructions.push(new e(t,[n]));
        return this
    }
    ;
    n.drawPolyStar = function(t, n, r, i, s, o) {
        this._dirty = this._active = !0;
        null == s && (s = 0);
        s = 1 - s;
        o = null == o ? 0 : o / (180 / Math.PI);
        var u = Math.PI / i;
        this._activeInstructions.push(new e(this._ctx.moveTo,[t + Math.cos(o) * r, n + Math.sin(o) * r]));
        for (var a = 0; a < i; a++)
            o += u,
            1 != s && this._activeInstructions.push(new e(this._ctx.lineTo,[t + Math.cos(o) * r * s, n + Math.sin(o) * r * s])),
            o += u,
            this._activeInstructions.push(new e(this._ctx.lineTo,[t + Math.cos(o) * r, n + Math.sin(o) * r]));
        return this
    }
    ;
    n.decodePath = function(e) {
        for (var n = [this.moveTo, this.lineTo, this.quadraticCurveTo, this.bezierCurveTo, this.closePath], r = [2, 2, 4, 6, 0], i = 0, s = e.length, o = [], u = 0, f = 0, l = t.BASE_64; i < s; ) {
            var c = e.charAt(i)
              , h = l[c]
              , p = h >> 3
              , d = n[p];
            if (!d || h & 3)
                throw "bad path data (@" + i + "): " + c;
            c = r[p];
            p || (u = f = 0);
            o.length = 0;
            i++;
            h = (h >> 2 & 1) + 2;
            for (p = 0; p < c; p++) {
                var v = l[e.charAt(i)]
                  , m = v >> 5 ? -1 : 1
                  , v = (v & 31) << 6 | l[e.charAt(i + 1)];
                3 == h && (v = v << 6 | l[e.charAt(i + 2)]);
                v = m * v / 10;
                p % 2 ? u = v += u : f = v += f;
                o[p] = v;
                i += h
            }
            d.apply(this, o)
        }
        return this
    }
    ;
    n.clone = function() {
        var e = new t;
        e._instructions = this._instructions.slice();
        e._activeInstructions = this._activeInstructions.slice();
        e._oldInstructions = this._oldInstructions.slice();
        this._fillInstructions && (e._fillInstructions = this._fillInstructions.slice());
        this._strokeInstructions && (e._strokeInstructions = this._strokeInstructions.slice());
        this._strokeStyleInstructions && (e._strokeStyleInstructions = this._strokeStyleInstructions.slice());
        e._active = this._active;
        e._dirty = this._dirty;
        e._fillMatrix = this._fillMatrix;
        e._strokeIgnoreScale = this._strokeIgnoreScale;
        return e
    }
    ;
    n.toString = function() {
        return "[Graphics]"
    }
    ;
    n.mt = n.moveTo;
    n.lt = n.lineTo;
    n.at = n.arcTo;
    n.bt = n.bezierCurveTo;
    n.qt = n.quadraticCurveTo;
    n.a = n.arc;
    n.r = n.rect;
    n.cp = n.closePath;
    n.c = n.clear;
    n.f = n.beginFill;
    n.lf = n.beginLinearGradientFill;
    n.rf = n.beginRadialGradientFill;
    n.bf = n.beginBitmapFill;
    n.ef = n.endFill;
    n.ss = n.setStrokeStyle;
    n.s = n.beginStroke;
    n.ls = n.beginLinearGradientStroke;
    n.rs = n.beginRadialGradientStroke;
    n.bs = n.beginBitmapStroke;
    n.es = n.endStroke;
    n.dr = n.drawRect;
    n.rr = n.drawRoundRect;
    n.rc = n.drawRoundRectComplex;
    n.dc = n.drawCircle;
    n.de = n.drawEllipse;
    n.dp = n.drawPolyStar;
    n.p = n.decodePath;
    n._updateInstructions = function() {
        this._instructions = this._oldInstructions.slice();
        this._instructions.push(t.beginCmd);
        this._appendInstructions(this._fillInstructions);
        this._appendInstructions(this._strokeInstructions);
        this._appendInstructions(this._strokeInstructions && this._strokeStyleInstructions);
        this._appendInstructions(this._activeInstructions);
        this._fillInstructions && this._appendDraw(t.fillCmd, this._fillMatrix);
        this._strokeInstructions && this._appendDraw(t.strokeCmd, this._strokeIgnoreScale && [1, 0, 0, 1, 0, 0])
    }
    ;
    n._appendInstructions = function(e) {
        e && this._instructions.push.apply(this._instructions, e)
    }
    ;
    n._appendDraw = function(t, n) {
        n ? this._instructions.push(new e(this._ctx.save,[],!1), new e(this._ctx.transform,n,!1), t, new e(this._ctx.restore,[],!1)) : this._instructions.push(t)
    }
    ;
    n._newPath = function() {
        this._dirty && this._updateInstructions();
        this._oldInstructions = this._instructions;
        this._activeInstructions = [];
        this._active = this._dirty = !1
    }
    ;
    n._setProp = function(e, t) {
        this[e] = t
    }
    ;
    createjs.Graphics = t
})();
this.createjs = this.createjs || {};
(function() {
    var e = function() {
        this.initialize()
    }
      , t = e.prototype = new createjs.EventDispatcher;
    e.suppressCrossDomainErrors = !1;
    var n = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    n.getContext && (e._hitTestCanvas = n,
    e._hitTestContext = n.getContext("2d"),
    n.width = n.height = 1);
    e._nextCacheID = 1;
    t.alpha = 1;
    t.cacheCanvas = null ;
    t.id = -1;
    t.mouseEnabled = !0;
    t.name = null ;
    t.parent = null ;
    t.regX = 0;
    t.regY = 0;
    t.rotation = 0;
    t.scaleX = 1;
    t.scaleY = 1;
    t.skewX = 0;
    t.skewY = 0;
    t.shadow = null ;
    t.visible = !0;
    t.x = 0;
    t.y = 0;
    t.compositeOperation = null ;
    t.snapToPixel = !1;
    t.filters = null ;
    t.cacheID = 0;
    t.mask = null ;
    t.hitArea = null ;
    t.cursor = null ;
    t._cacheOffsetX = 0;
    t._cacheOffsetY = 0;
    t._cacheScale = 1;
    t._cacheDataURLID = 0;
    t._cacheDataURL = null ;
    t._matrix = null ;
    t._rectangle = null ;
    t._bounds = null ;
    t.initialize = function() {
        this.id = createjs.UID.get();
        this._matrix = new createjs.Matrix2D;
        this._rectangle = new createjs.Rectangle
    }
    ;
    t.isVisible = function() {
        return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY)
    }
    ;
    t.draw = function(e, t) {
        var n = this.cacheCanvas;
        if (t || !n)
            return !1;
        var r = this._cacheScale, i = this._cacheOffsetX, s = this._cacheOffsetY, o;
        if (o = this._applyFilterBounds(i, s, 0, 0))
            i = o.x,
            s = o.y;
        e.drawImage(n, i, s, n.width / r, n.height / r);
        return !0
    }
    ;
    t.updateContext = function(e) {
        var t, n = this.mask;
        n && n.graphics && !n.graphics.isEmpty() && (t = n.getMatrix(n._matrix),
        e.transform(t.a, t.b, t.c, t.d, t.tx, t.ty),
        n.graphics.drawAsPath(e),
        e.clip(),
        t.invert(),
        e.transform(t.a, t.b, t.c, t.d, t.tx, t.ty));
        t = this._matrix.identity().appendTransform(this.x, this.y, this.scaleX, this.scaleY, this.rotation, this.skewX, this.skewY, this.regX, this.regY);
        createjs.Stage._snapToPixelEnabled && this.snapToPixel ? e.transform(t.a, t.b, t.c, t.d, t.tx + .5 | 0, t.ty + .5 | 0) : e.transform(t.a, t.b, t.c, t.d, t.tx, t.ty);
        e.globalAlpha *= this.alpha;
        this.compositeOperation && (e.globalCompositeOperation = this.compositeOperation);
        this.shadow && this._applyShadow(e, this.shadow)
    }
    ;
    t.cache = function(e, t, n, r, i) {
        i = i || 1;
        this.cacheCanvas || (this.cacheCanvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"));
        this._cacheWidth = n;
        this._cacheHeight = r;
        this._cacheOffsetX = e;
        this._cacheOffsetY = t;
        this._cacheScale = i;
        this.updateCache()
    }
    ;
    t.updateCache = function(t) {
        var n = this.cacheCanvas, r = this._cacheScale, i = this._cacheOffsetX * r, s = this._cacheOffsetY * r, o = this._cacheWidth, u = this._cacheHeight, a;
        if (!n)
            throw "cache() must be called before updateCache()";
        var f = n.getContext("2d");
        if (a = this._applyFilterBounds(i, s, o, u))
            i = a.x,
            s = a.y,
            o = a.width,
            u = a.height;
        o = Math.ceil(o * r);
        u = Math.ceil(u * r);
        o != n.width || u != n.height ? (n.width = o,
        n.height = u) : t || f.clearRect(0, 0, o + 1, u + 1);
        f.save();
        f.globalCompositeOperation = t;
        f.setTransform(r, 0, 0, r, -i, -s);
        this.draw(f, !0);
        this._applyFilters();
        f.restore();
        this.cacheID = e._nextCacheID++
    }
    ;
    t.uncache = function() {
        this._cacheDataURL = this.cacheCanvas = null ;
        this.cacheID = this._cacheOffsetX = this._cacheOffsetY = 0;
        this._cacheScale = 1
    }
    ;
    t.getCacheDataURL = function() {
        if (!this.cacheCanvas)
            return null ;
        this.cacheID != this._cacheDataURLID && (this._cacheDataURL = this.cacheCanvas.toDataURL());
        return this._cacheDataURL
    }
    ;
    t.getStage = function() {
        for (var e = this; e.parent; )
            e = e.parent;
        return e instanceof createjs.Stage ? e : null
    }
    ;
    t.localToGlobal = function(e, t) {
        var n = this.getConcatenatedMatrix(this._matrix);
        if (null == n)
            return null ;
        n.append(1, 0, 0, 1, e, t);
        return new createjs.Point(n.tx,n.ty)
    }
    ;
    t.globalToLocal = function(e, t) {
        var n = this.getConcatenatedMatrix(this._matrix);
        if (null == n)
            return null ;
        n.invert();
        n.append(1, 0, 0, 1, e, t);
        return new createjs.Point(n.tx,n.ty)
    }
    ;
    t.localToLocal = function(e, t, n) {
        e = this.localToGlobal(e, t);
        return n.globalToLocal(e.x, e.y)
    }
    ;
    t.setTransform = function(e, t, n, r, i, s, o, u, a) {
        this.x = e || 0;
        this.y = t || 0;
        this.scaleX = null == n ? 1 : n;
        this.scaleY = null == r ? 1 : r;
        this.rotation = i || 0;
        this.skewX = s || 0;
        this.skewY = o || 0;
        this.regX = u || 0;
        this.regY = a || 0;
        return this
    }
    ;
    t.getMatrix = function(e) {
        return (e ? e.identity() : new createjs.Matrix2D).appendTransform(this.x, this.y, this.scaleX, this.scaleY, this.rotation, this.skewX, this.skewY, this.regX, this.regY).appendProperties(this.alpha, this.shadow, this.compositeOperation)
    }
    ;
    t.getConcatenatedMatrix = function(e) {
        e ? e.identity() : e = new createjs.Matrix2D;
        for (var t = this; null != t; )
            e.prependTransform(t.x, t.y, t.scaleX, t.scaleY, t.rotation, t.skewX, t.skewY, t.regX, t.regY).prependProperties(t.alpha, t.shadow, t.compositeOperation),
            t = t.parent;
        return e
    }
    ;
    t.hitTest = function(t, n) {
        var r = e._hitTestContext;
        r.setTransform(1, 0, 0, 1, -t, -n);
        this.draw(r);
        var i = this._testHit(r);
        r.setTransform(1, 0, 0, 1, 0, 0);
        r.clearRect(0, 0, 2, 2);
        return i
    }
    ;
    t.set = function(e) {
        for (var t in e)
            this[t] = e[t];
        return this
    }
    ;
    t.getBounds = function() {
        if (this._bounds)
            return this._rectangle.copy(this._bounds);
        var e = this.cacheCanvas;
        if (e) {
            var t = this._cacheScale;
            return this._rectangle.initialize(this._cacheOffsetX, this._cacheOffsetY, e.width / t, e.height / t)
        }
        return null
    }
    ;
    t.getTransformedBounds = function() {
        return this._getBounds()
    }
    ;
    t.setBounds = function(e, t, n, r) {
        null == e && (this._bounds = e);
        this._bounds = (this._bounds || new createjs.Rectangle).initialize(e, t, n, r)
    }
    ;
    t.clone = function() {
        var t = new e;
        this.cloneProps(t);
        return t
    }
    ;
    t.toString = function() {
        return "[DisplayObject (name=" + this.name + ")]"
    }
    ;
    t.cloneProps = function(e) {
        e.alpha = this.alpha;
        e.name = this.name;
        e.regX = this.regX;
        e.regY = this.regY;
        e.rotation = this.rotation;
        e.scaleX = this.scaleX;
        e.scaleY = this.scaleY;
        e.shadow = this.shadow;
        e.skewX = this.skewX;
        e.skewY = this.skewY;
        e.visible = this.visible;
        e.x = this.x;
        e.y = this.y;
        e._bounds = this._bounds;
        e.mouseEnabled = this.mouseEnabled;
        e.compositeOperation = this.compositeOperation
    }
    ;
    t._applyShadow = function(e, t) {
        t = t || Shadow.identity;
        e.shadowColor = t.color;
        e.shadowOffsetX = t.offsetX;
        e.shadowOffsetY = t.offsetY;
        e.shadowBlur = t.blur
    }
    ;
    t._tick = function(e) {
        var t = this._listeners;
        t && t.tick && (t = new createjs.Event("tick"),
        t.params = e,
        this._dispatchEvent(t, this, 2))
    }
    ;
    t._testHit = function(t) {
        try {
            var n = 1 < t.getImageData(0, 0, 1, 1).data[3]
        } catch (r) {
            if (!e.suppressCrossDomainErrors)
                throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images."
        }
        return n
    }
    ;
    t._applyFilters = function() {
        if (this.filters && 0 != this.filters.length && this.cacheCanvas)
            for (var e = this.filters.length, t = this.cacheCanvas.getContext("2d"), n = this.cacheCanvas.width, r = this.cacheCanvas.height, i = 0; i < e; i++)
                this.filters[i].applyFilter(t, 0, 0, n, r)
    }
    ;
    t._applyFilterBounds = function(e, t, n, r) {
        var i, s, o = this.filters;
        if (o && (s = o.length)) {
            for (o = 0; o < s; o++) {
                var u = this.filters[o];
                if (u = u.getBounds && u.getBounds())
                    i || (i = this._rectangle.initialize(e, t, n, r)),
                    i.x += u.x,
                    i.y += u.y,
                    i.width += u.width,
                    i.height += u.height
            }
            return i
        }
    }
    ;
    t._getBounds = function(e, t) {
        return this._transformBounds(this.getBounds(), e, t)
    }
    ;
    t._transformBounds = function(e, t, n) {
        if (!e)
            return e;
        var r = e.x
          , i = e.y
          , s = e.width
          , o = e.height
          , u = n ? this._matrix.identity() : this.getMatrix(this._matrix);
        (r || i) && u.appendTransform(0, 0, 1, 1, 0, 0, 0, -r, -i);
        t && u.prependMatrix(t);
        t = s * u.a;
        s *= u.b;
        n = o * u.c;
        var o = o * u.d
          , a = u.tx
          , u = u.ty
          , f = a
          , l = a
          , c = u
          , h = u;
        (r = t + a) < f ? f = r : r > l && (l = r);
        (r = t + n + a) < f ? f = r : r > l && (l = r);
        (r = n + a) < f ? f = r : r > l && (l = r);
        (i = s + u) < c ? c = i : i > h && (h = i);
        (i = s + o + u) < c ? c = i : i > h && (h = i);
        (i = o + u) < c ? c = i : i > h && (h = i);
        return e.initialize(f, c, l - f, h - c)
    }
    ;
    t.isRoot = !1;
    t.bounding_box = null ;
    t.isCheckMouseWithDraw = !1;
    t.isOnlyBoundsCheck = !1;
    t.setBoundingBox = function(e, t, n, r) {
        return this.bounding_box = new createjs.Rectangle(e,t,n,r)
    }
    ;
    createjs.DisplayObject = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function() {
        this.initialize()
    }
      , t = e.prototype = new createjs.DisplayObject;
    t.children = null ;
    t.mouseChildren = !0;
    t.DisplayObject_initialize = t.initialize;
    t.initialize = function() {
        this.DisplayObject_initialize();
        this.children = []
    }
    ;
    t.isVisible = function() {
        var e = this.cacheCanvas || this.children.length;
        return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && e)
    }
    ;
    t.DisplayObject_draw = t.draw;
    t.draw = function(e, t) {
        if (this.DisplayObject_draw(e, t))
            return !0;
        for (var n = this.children.slice(0), r = 0, i = n.length; r < i; r++) {
            var s = n[r];
            s.isVisible() && (e.save(),
            s.updateContext(e),
            s.draw(e),
            e.restore())
        }
        return !0
    }
    ;
    t.addChild = function(e) {
        if (null == e)
            return e;
        var t = arguments.length;
        if (1 < t) {
            for (var n = 0; n < t; n++)
                this.addChild(arguments[n]);
            return arguments[t - 1]
        }
        e.parent && e.parent.removeChild(e);
        e.parent = this;
        this.children.push(e);
        return e
    }
    ;
    t.addChildAt = function(e, t) {
        var n = arguments.length
          , r = arguments[n - 1];
        if (0 > r || r > this.children.length)
            return arguments[n - 2];
        if (2 < n) {
            for (var i = 0; i < n - 1; i++)
                this.addChildAt(arguments[i], r + i);
            return arguments[n - 2]
        }
        e.parent && e.parent.removeChild(e);
        e.parent = this;
        this.children.splice(t, 0, e);
        return e
    }
    ;
    t.removeChild = function(e) {
        var t = arguments.length;
        if (1 < t) {
            for (var n = !0, r = 0; r < t; r++)
                n = n && this.removeChild(arguments[r]);
            return n
        }
        return this.removeChildAt(createjs.indexOf(this.children, e))
    }
    ;
    t.removeChildAt = function(e) {
        var t = arguments.length;
        if (1 < t) {
            for (var n = [], r = 0; r < t; r++)
                n[r] = arguments[r];
            n.sort(function(e, t) {
                return t - e
            });
            for (var i = !0, r = 0; r < t; r++)
                i = i && this.removeChildAt(n[r]);
            return i
        }
        if (0 > e || e > this.children.length - 1)
            return !1;
        if (t = this.children[e])
            t.parent = null ;
        this.children.splice(e, 1);
        return !0
    }
    ;
    t.removeAllChildren = function() {
        for (var e = this.children; e.length; )
            e.pop().parent = null
    }
    ;
    t.getChildAt = function(e) {
        return this.children[e]
    }
    ;
    t.getChildByName = function(e) {
        for (var t = this.children, n = 0, r = t.length; n < r; n++)
            if (t[n].name == e)
                return t[n];
        return null
    }
    ;
    t.sortChildren = function(e) {
        this.children.sort(e)
    }
    ;
    t.getChildIndex = function(e) {
        return createjs.indexOf(this.children, e)
    }
    ;
    t.getNumChildren = function() {
        return this.children.length
    }
    ;
    t.swapChildrenAt = function(e, t) {
        var n = this.children
          , r = n[e]
          , i = n[t];
        r && i && (n[e] = i,
        n[t] = r)
    }
    ;
    t.swapChildren = function(e, t) {
        for (var n = this.children, r, i, s = 0, o = n.length; s < o && (n[s] == e && (r = s),
        n[s] == t && (i = s),
        null == r || null == i); s++)
            ;
        s != o && (n[r] = t,
        n[i] = e)
    }
    ;
    t.setChildIndex = function(e, t) {
        var n = this.children
          , r = n.length;
        if (!(e.parent != this || 0 > t || t >= r)) {
            for (var i = 0; i < r && n[i] != e; i++)
                ;
            i != r && i != t && (n.splice(i, 1),
            n.splice(t, 0, e))
        }
    }
    ;
    t.contains = function(e) {
        for (; e; ) {
            if (e == this)
                return !0;
            e = e.parent
        }
        return !1
    }
    ;
    t.hitTest = function(e, t) {
        return null != this.getObjectUnderPoint(e, t)
    }
    ;
    t.getObjectsUnderPoint = function(e, t) {
        var n = []
          , r = this.localToGlobal(e, t);
        this._getObjectsUnderPoint(r.x, r.y, n);
        return n
    }
    ;
    t.getObjectUnderPoint = function(e, t) {
        var n = this.localToGlobal(e, t);
        return this._getObjectsUnderPoint(n.x, n.y)
    }
    ;
    t.DisplayObject_getBounds = t.getBounds;
    t.getBounds = function() {
        return this._getBounds(null , !0)
    }
    ;
    t.getTransformedBounds = function() {
        return this._getBounds()
    }
    ;
    t.clone = function(t) {
        var n = new e;
        this.cloneProps(n);
        if (t)
            for (var r = n.children = [], i = 0, s = this.children.length; i < s; i++) {
                var o = this.children[i].clone(t);
                o.parent = n;
                r.push(o)
            }
        return n
    }
    ;
    t.toString = function() {
        return "[Container (name=" + this.name + ")]"
    }
    ;
    t.DisplayObject__tick = t._tick;
    t._tick = function(e) {
        for (var t = this.children.length - 1; 0 <= t; t--) {
            var n = this.children[t];
            n._tick && n._tick(e)
        }
        this.DisplayObject__tick(e)
    }
    ;
    t._getObjectsUnderPoint = function(t, n, r, i) {
        var s, o;
        s = this.children.length;
        if (!isDesktopBrowser) {
            var u, a;
            for (s -= 1; 0 <= s; s--)
                if (o = this.children[s],
                o.visible && o.mouseEnabled && !(0 >= o.alpha)) {
                    if (u = o.bounding_box) {
                        if (a = o.isRoot ? o.x + u.x <= t && t < o.x + u.x + u.width && o.y + u.y <= n && n < o.y + u.y + u.height : (o.x + u.x) * scaleFactor <= t && t < scaleFactor * (o.x + u.x + u.width) && (o.y + u.y) * scaleFactor <= n && n < scaleFactor * (o.y + u.y + u.height))
                            if (r) {
                                r.push(o);
                                continue
                            } else
                                return o
                    } else if (o.isCheckMouseWithDraw) {
                        a = createjs.DisplayObject._hitTestContext;
                        var f = this._matrix;
                        u = i && o.hitArea;
                        o.getConcatenatedMatrix(f);
                        u && (f.appendTransform(u.x, u.y, u.scaleX, u.scaleY, u.rotation, u.skewX, u.skewY, u.regX, u.regY),
                        f.alpha = u.alpha);
                        a.globalAlpha = f.alpha;
                        a.setTransform(f.a, f.b, f.c, f.d, f.tx - t, f.ty - n);
                        (u || o).draw(a);
                        if (!this._testHit(a))
                            continue;a.setTransform(1, 0, 0, 1, 0, 0);
                        a.clearRect(0, 0, 2, 2);
                        if (r)
                            r.push(o);
                        else
                            return i && !this.mouseChildren ? this : o
                    }
                    if (o instanceof e && (o = o.isRoot ? o._getObjectsUnderPoint(t - (o.x + o.regX), n - (o.y + o.regY), r, i) : o._getObjectsUnderPoint(t - (o.x + o.regX) * scaleFactor, n - (o.y + o.regY) * scaleFactor, r, i)))
                        if (r)
                            r.push(o);
                        else
                            return o
                }
            return null
        }
        a = createjs.DisplayObject._hitTestContext;
        f = this._matrix;
        for (s -= 1; 0 <= s; s--)
            if (o = this.children[s],
            u = i && o.hitArea,
            o.visible && (u || o.isVisible()) && (!i || o.mouseEnabled))
                if (!u && o instanceof e) {
                    if (o = o._getObjectsUnderPoint(t, n, r, i),
                    !r && o)
                        return i && !this.mouseChildren ? this : o
                } else {
                    o.getConcatenatedMatrix(f);
                    u && (f.appendTransform(u.x, u.y, u.scaleX, u.scaleY, u.rotation, u.skewX, u.skewY, u.regX, u.regY),
                    f.alpha = u.alpha);
                    if (o.isOnlyBoundsCheck) {
                        if ((u = o.bounding_box) && !((t - f.tx) / scaleFactor >= u.x && (t - f.tx) / scaleFactor <= u.x + u.width && (n - f.ty) / scaleFactor >= u.y && (n - f.ty) / scaleFactor <= u.y + u.height))
                            continue
                    } else {
                        a.globalAlpha = f.alpha;
                        a.setTransform(f.a, f.b, f.c, f.d, f.tx - t, f.ty - n);
                        (u || o).draw(a);
                        if (!this._testHit(a))
                            continue;a.setTransform(1, 0, 0, 1, 0, 0);
                        a.clearRect(0, 0, 2, 2)
                    }
                    if (r)
                        r.push(o);
                    else
                        return i && !this.mouseChildren ? this : o
                }
        return null
    }
    ;
    t._getBounds = function(e, t) {
        var n = this.DisplayObject_getBounds();
        if (n)
            return this._transformBounds(n, e, t);
        var r, i, s, o, u = t ? this._matrix.identity() : this.getMatrix(this._matrix);
        e && u.prependMatrix(e);
        for (var a = this.children.length, f = 0; f < a; f++) {
            var l = this.children[f];
            if (l.visible && (n = l._getBounds(u))) {
                var l = n.x
                  , c = n.y
                  , h = l + n.width
                  , p = c + n.height;
                if (l < r || null == r)
                    r = l;
                if (h > i || null == i)
                    i = h;
                if (c < s || null == s)
                    s = c;
                if (p > o || null == o)
                    o = p
            }
        }
        return null == i ? null : this._rectangle.initialize(r, s, i - r, o - s)
    }
    ;
    createjs.Container = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e) {
        this.initialize(e)
    }
      , t = e.prototype = new createjs.Container;
    e._snapToPixelEnabled = !1;
    t.autoClear = !0;
    t.canvas = null ;
    t.mouseX = 0;
    t.mouseY = 0;
    t.snapToPixelEnabled = !1;
    t.mouseInBounds = !1;
    t.tickOnUpdate = !0;
    t.mouseMoveOutside = !1;
    t.nextStage = null ;
    t._pointerData = null ;
    t._pointerCount = 0;
    t._primaryPointerID = null ;
    t._mouseOverIntervalID = null ;
    t.Container_initialize = t.initialize;
    t.initialize = function(e) {
        this.Container_initialize();
        this.canvas = "string" == typeof e ? document.getElementById(e) : e;
        this._pointerData = {};
        this.enableDOMEvents(!0)
    }
    ;
    t.update = function(t) {
        if (this.canvas) {
            this.tickOnUpdate && (this.dispatchEvent("tickstart"),
            this._tick(arguments.length ? arguments : null ),
            this.dispatchEvent("tickend"));
            this.dispatchEvent("drawstart");
            e._snapToPixelEnabled = this.snapToPixelEnabled;
            this.autoClear && this.clear();
            var n = this.canvas.getContext("2d");
            n.save();
            this.updateContext(n);
            this.draw(n, !1);
            n.restore();
            this.dispatchEvent("drawend")
        }
    }
    ;
    t.handleEvent = function(e) {
        "tick" == e.type && this.update(e)
    }
    ;
    t.clear = function() {
        if (this.canvas) {
            var e = this.canvas.getContext("2d");
            e.setTransform(1, 0, 0, 1, 0, 0);
            e.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1)
        }
    }
    ;
    t.toDataURL = function(e, t) {
        t || (t = "image/png");
        var n = this.canvas.getContext("2d"), r = this.canvas.width, i = this.canvas.height, s;
        if (e) {
            s = n.getImageData(0, 0, r, i);
            var o = n.globalCompositeOperation;
            n.globalCompositeOperation = "destination-over";
            n.fillStyle = e;
            n.fillRect(0, 0, r, i)
        }
        var u = this.canvas.toDataURL(t);
        e && (n.clearRect(0, 0, r + 1, i + 1),
        n.putImageData(s, 0, 0),
        n.globalCompositeOperation = o);
        return u
    }
    ;
    t.enableMouseOver = function(e) {
        this._mouseOverIntervalID && (clearInterval(this._mouseOverIntervalID),
        this._mouseOverIntervalID = null ,
        0 == e && this._testMouseOver(!0));
        if (null == e)
            e = 20;
        else if (0 >= e)
            return;
        var t = this;
        this._mouseOverIntervalID = setInterval(function() {
            t._testMouseOver()
        }, 1e3 / Math.min(50, e))
    }
    ;
    t.enableDOMEvents = function(e) {
        null == e && (e = !0);
        var t, n = this._eventListeners;
        if (!e && n) {
            for (t in n)
                e = n[t],
                e.t.removeEventListener(t, e.f, !1);
            this._eventListeners = null
        } else if (e && !n && this.canvas) {
            e = window.addEventListener ? window : document;
            var r = this
              , n = this._eventListeners = {};
            n.mouseup = {
                t: e,
                f: function(e) {
                    r._handleMouseUp(e)
                }
            };
            n.mousemove = {
                t: e,
                f: function(e) {
                    r._handleMouseMove(e)
                }
            };
            n.dblclick = {
                t: e,
                f: function(e) {
                    r._handleDoubleClick(e)
                }
            };
            n.mousedown = {
                t: this.canvas,
                f: function(e) {
                    r._handleMouseDown(e)
                }
            };
            for (t in n)
                e = n[t],
                e.t.addEventListener(t, e.f, !1)
        }
    }
    ;
    t.clone = function() {
        var t = new e(null );
        this.cloneProps(t);
        return t
    }
    ;
    t.toString = function() {
        return "[Stage (name=" + this.name + ")]"
    }
    ;
    t._getElementRect = function(e) {
        var t;
        try {
            t = e.getBoundingClientRect()
        } catch (n) {
            t = {
                top: e.offsetTop,
                left: e.offsetLeft,
                width: e.offsetWidth,
                height: e.offsetHeight
            }
        }
        var r = (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || document.body.clientLeft || 0)
          , i = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || document.body.clientTop || 0)
          , s = window.getComputedStyle ? getComputedStyle(e) : e.currentStyle;
        e = parseInt(s.paddingLeft) + parseInt(s.borderLeftWidth);
        var o = parseInt(s.paddingTop) + parseInt(s.borderTopWidth)
          , u = parseInt(s.paddingRight) + parseInt(s.borderRightWidth)
          , s = parseInt(s.paddingBottom) + parseInt(s.borderBottomWidth);
        return {
            left: t.left + r + e,
            right: t.right + r - u,
            top: t.top + i + o,
            bottom: t.bottom + i - s
        }
    }
    ;
    t._getPointerData = function(e) {
        var t = this._pointerData[e];
        t || (t = this._pointerData[e] = {
            x: 0,
            y: 0
        },
        null != this._primaryPointerID && -1 != this._primaryPointerID) || (this._primaryPointerID = e);
        return t
    }
    ;
    t._handleMouseMove = function(e) {
        e || (e = window.event);
        this._handlePointerMove(-1, e, e.pageX, e.pageY)
    }
    ;
    t._handlePointerMove = function(e, t, n, r) {
        if (this.canvas) {
            var i = this._getPointerData(e)
              , s = i.inBounds;
            this._updatePointerPosition(e, t, n, r);
            if (s || i.inBounds || this.mouseMoveOutside)
                -1 == e && i.inBounds == !s && this._dispatchMouseEvent(this, s ? "mouseleave" : "mouseenter", !1, e, i, t),
                this._dispatchMouseEvent(this, "stagemousemove", !1, e, i, t),
                this._dispatchMouseEvent(i.target, "pressmove", !0, e, i, t),
                (s = i.event) && s.hasEventListener("mousemove") && s.dispatchEvent(new createjs.MouseEvent("mousemove",!1,!1,i.x,i.y,t,e,e == this._primaryPointerID,i.rawX,i.rawY), oTarget),
                this.nextStage && this.nextStage._handlePointerMove(e, t, n, r)
        }
    }
    ;
    t._updatePointerPosition = function(e, t, n, r) {
        var i = this._getElementRect(this.canvas);
        n -= i.left;
        r -= i.top;
        var s = this.canvas.width
          , o = this.canvas.height;
        n /= (i.right - i.left) / s;
        r /= (i.bottom - i.top) / o;
        i = this._getPointerData(e);
        (i.inBounds = 0 <= n && 0 <= r && n <= s - 1 && r <= o - 1) ? (i.x = n,
        i.y = r) : this.mouseMoveOutside && (i.x = 0 > n ? 0 : n > s - 1 ? s - 1 : n,
        i.y = 0 > r ? 0 : r > o - 1 ? o - 1 : r);
        i.posEvtObj = t;
        i.rawX = n;
        i.rawY = r;
        e == this._primaryPointerID && (this.mouseX = i.x,
        this.mouseY = i.y,
        this.mouseInBounds = i.inBounds)
    }
    ;
    t._handleMouseUp = function(e) {
        this._handlePointerUp(-1, e, !1)
    }
    ;
    t._handlePointerUp = function(e, t, n) {
        var r = this._getPointerData(e)
          , i = r.target;
        i && (i.hasEventListener("pressup") || i.hasEventListener("click")) ? (i.hasEventListener("click") && this._getObjectsUnderPoint(r.x, r.y, null , !0) == i && this._dispatchMouseEvent(i, "click", !0, e, r, t),
        this._dispatchMouseEvent(i, "pressup", !0, e, r, t)) : this._dispatchMouseEvent(this, "stagemouseup", !1, e, r, t);
        n ? (e == this._primaryPointerID && (this._primaryPointerID = null ),
        delete this._pointerData[e]) : r.event = r.target = null ;
        this.nextStage && this.nextStage._handlePointerUp(e, t, n)
    }
    ;
    t._handleMouseDown = function(e) {
        this._handlePointerDown(-1, e, e.pageX, e.pageY)
    }
    ;
    t._handlePointerDown = function(e, t, n, r) {
        null != r && this._updatePointerPosition(e, t, n, r);
        var i = this._getPointerData(e);
        i.target = this._getObjectsUnderPoint(i.x, i.y, null , !0);
        this._dispatchMouseEvent(i.target, "mousedown", !0, e, i, t);
        i.target && i.target.hasEventListener("mousedown") || this._dispatchMouseEvent(this, "stagemousedown", !1, e, i, t);
        this.nextStage && this.nextStage._handlePointerDown(e, t, n, r)
    }
    ;
    t._testMouseOver = function(e) {
        if (-1 == this._primaryPointerID && (e || this.mouseX != this._mouseOverX || this.mouseY != this._mouseOverY || !this.mouseInBounds)) {
            var t = this._getPointerData(-1), n = t.posEvtObj, r, i = -1, s = "", o;
            if (e || this.mouseInBounds && n && n.target == this.canvas)
                r = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null , !0),
                this._mouseOverX = this.mouseX,
                this._mouseOverY = this.mouseY;
            e = this._mouseOverTarget || [];
            var u = e[e.length - 1]
              , a = this._mouseOverTarget = [];
            for (o = r; o; )
                a.unshift(o),
                null != o.cursor && (s = o.cursor),
                o = o.parent;
            this.canvas.style.cursor = s;
            s = 0;
            for (o = a.length; s < o && a[s] == e[s]; s++)
                i = s;
            u != r && this._dispatchMouseEvent(u, "mouseout", !0, -1, t, n);
            for (s = e.length - 1; s > i; s--)
                this._dispatchMouseEvent(e[s], "rollout", !1, -1, t, n);
            for (s = a.length - 1; s > i; s--)
                this._dispatchMouseEvent(a[s], "rollover", !1, -1, t, n);
            u != r && this._dispatchMouseEvent(r, "mouseover", !0, -1, t, n)
        }
    }
    ;
    t._handleDoubleClick = function(e) {
        var t = this._getPointerData(-1)
          , n = this._getObjectsUnderPoint(t.x, t.y, null , !0);
        this._dispatchMouseEvent(n, "dblclick", !0, -1, t, e);
        this.nextStage && this.nextStage._handleDoubleClick(e)
    }
    ;
    t._dispatchMouseEvent = function(e, t, n, r, i, s) {
        e && (n || e.hasEventListener(t)) && (t = new createjs.MouseEvent(t,n,!1,i.x,i.y,s,r,r == this._primaryPointerID,i.rawX,i.rawY),
        e.dispatchEvent(t))
    }
    ;
    createjs.Stage = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e) {
        this.initialize(e)
    }
      , t = e.prototype = new createjs.DisplayObject;
    t.image = null ;
    t.snapToPixel = !0;
    t.sourceRect = null ;
    t.DisplayObject_initialize = t.initialize;
    t.initialize = function(e) {
        this.DisplayObject_initialize();
        "string" == typeof e ? (this.image = document.createElement("img"),
        this.image.src = e) : this.image = e
    }
    ;
    t.isVisible = function() {
        var e = this.cacheCanvas || this.image && (this.image.complete || this.image.getContext || 2 <= this.image.readyState);
        return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && e)
    }
    ;
    t.DisplayObject_draw = t.draw;
    t.draw = function(e, t) {
        if (this.DisplayObject_draw(e, t))
            return !0;
        var n = this.sourceRect;
        n ? e.drawImage(this.image, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height) : e.drawImage(this.image, 0, 0);
        return !0
    }
    ;
    t.DisplayObject_getBounds = t.getBounds;
    t.getBounds = function() {
        var e = this.DisplayObject_getBounds();
        if (e)
            return e;
        e = this.sourceRect || this.image;
        return this.image && (this.image.complete || this.image.getContext || 2 <= this.image.readyState) ? this._rectangle.initialize(0, 0, e.width, e.height) : null
    }
    ;
    t.clone = function() {
        var t = new e(this.image);
        this.sourceRect && (t.sourceRect = this.sourceRect.clone());
        this.cloneProps(t);
        return t
    }
    ;
    t.toString = function() {
        return "[Bitmap (name=" + this.name + ")]"
    }
    ;
    createjs.Bitmap = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t) {
        this.initialize(e, t)
    }
      , t = e.prototype = new createjs.DisplayObject;
    t.currentFrame = 0;
    t.currentAnimation = null ;
    t.paused = !0;
    t.spriteSheet = null ;
    t.snapToPixel = !0;
    t.isLoop = !0;
    t.offset = 0;
    t.currentAnimationFrame = 0;
    t.framerate = 0;
    t._advanceCount = 0;
    t._animation = null ;
    t._currentFrame = null ;
    t.rectMask = null ;
    t.DisplayObject_initialize = t.initialize;
    t.initialize = function(e, t) {
        this.DisplayObject_initialize();
        this.spriteSheet = e;
        t && this.gotoAndPlay(t)
    }
    ;
    t.isVisible = function() {
        var e = this.cacheCanvas || this.spriteSheet.complete;
        return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && e)
    }
    ;
    t.DisplayObject_draw = t.draw;
    t.draw = function(e, t) {
        if (this.DisplayObject_draw(e, t))
            return !0;
        this._normalizeFrame();
        var n = this.spriteSheet.getFrame(this._currentFrame | 0);
        if (!n)
            return !1;
        var r = n.rect;
        this.rectMask ? e.drawImage(n.image, r.x + this.rectMask.x, r.y + this.rectMask.y, r.width + this.rectMask.width, r.height + this.rectMask.height, -n.regX + this.rectMask.x, -n.regY + this.rectMask.y, r.width + this.rectMask.width, r.height + this.rectMask.height) : 1 <= r.width && 1 <= r.height && e.drawImage(n.image, r.x, r.y, r.width, r.height, -n.regX, -n.regY, r.width, r.height);
        return !0
    }
    ;
    t.play = function() {
        this.paused = !1
    }
    ;
    t.stop = function() {
        this.paused = !0
    }
    ;
    t.gotoAndPlay = function(e) {
        this.paused = !1;
        this._goto(e)
    }
    ;
    t.gotoAndStop = function(e) {
        this.paused = !0;
        this._goto(e)
    }
    ;
    t.advance = function(e) {
        var t = this._animation && this._animation.speed || 1
          , n = this.framerate || this.spriteSheet.framerate;
        e = n && null != e ? e / (1e3 / n) : 1;
        this._animation ? this.currentAnimationFrame += e * t : this._currentFrame += e * t;
        this._normalizeFrame()
    }
    ;
    t.DisplayObject_getBounds = t.getBounds;
    t.getBounds = function() {
        return this.DisplayObject_getBounds() || this.spriteSheet.getFrameBounds(this.currentFrame, this._rectangle)
    }
    ;
    t.clone = function() {
        var t = new e(this.spriteSheet);
        this.cloneProps(t);
        return t
    }
    ;
    t.toString = function() {
        return "[Sprite (name=" + this.name + ")]"
    }
    ;
    t.DisplayObject__tick = t._tick;
    t._tick = function(e) {
        this.paused || this.advance(e && e[0] && e[0].delta);
        this.DisplayObject__tick(e)
    }
    ;
    t._normalizeFrame = function() {
        var e = this._animation, t = this.paused, n = this._currentFrame, r = this.currentAnimationFrame, i;
        if (e)
            if (i = e.frames.length,
            (r | 0) >= i) {
                var s = e.next;
                if (!this._dispatchAnimationEnd(e, n, t, s, i - 1)) {
                    if (s && this.isLoop)
                        return this._goto(s, r - i);
                    this.paused = !0;
                    r = this.currentAnimationFrame = e.frames.length - 1;
                    this._currentFrame = e.frames[r]
                }
            } else
                this._currentFrame = e.frames[r | 0];
        else if (i = this.spriteSheet.getNumFrames(),
        n >= i && !this._dispatchAnimationEnd(e, n, t, i - 1) && (this._currentFrame -= i) >= i)
            return this._normalizeFrame();
        this.currentFrame = this._currentFrame | 0
    }
    ;
    t._dispatchAnimationEnd = function(e, t, n, r, i) {
        var s = e ? e.name : null ;
        if (this.hasEventListener("animationend")) {
            var o = new createjs.Event("animationend");
            o.name = s;
            o.next = r;
            this.dispatchEvent(o)
        }
        e = this._animation != e || this._currentFrame != t;
        e || n || !this.paused || (this.currentAnimationFrame = i,
        e = !0);
        return e
    }
    ;
    t.DisplayObject_cloneProps = t.cloneProps;
    t.cloneProps = function(e) {
        this.DisplayObject_cloneProps(e);
        e.currentFrame = this.currentFrame;
        e._currentFrame = this._currentFrame;
        e.currentAnimation = this.currentAnimation;
        e.paused = this.paused;
        e._animation = this._animation;
        e.currentAnimationFrame = this.currentAnimationFrame;
        e.framerate = this.framerate
    }
    ;
    t._goto = function(e, t) {
        if (isNaN(e)) {
            var n = this.spriteSheet.getAnimation(e);
            n && (this.currentAnimationFrame = t || 0,
            this._animation = n,
            this.currentAnimation = e,
            this._normalizeFrame())
        } else
            this.currentAnimationFrame = 0,
            this.currentAnimation = this._animation = null ,
            this._currentFrame = e,
            this._normalizeFrame()
    }
    ;
    createjs.Sprite = e
})();
this.createjs = this.createjs || {};
(function() {
    if (!createjs.Sprite)
        throw "BitmapAnimation is deprecated in favour of Sprite. See VERSIONS file for info on changes.";
    (createjs.BitmapAnimation = function(e) {
        console.log("BitmapAnimation is deprecated in favour of Sprite. See VERSIONS file for info on changes.");
        this.initialize(e)
    }
    ).prototype = new createjs.Sprite
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e) {
        this.initialize(e)
    }
      , t = e.prototype = new createjs.DisplayObject;
    t.graphics = null ;
    t.DisplayObject_initialize = t.initialize;
    t.initialize = function(e) {
        this.DisplayObject_initialize();
        this.graphics = e ? e : new createjs.Graphics
    }
    ;
    t.isVisible = function() {
        var e = this.cacheCanvas || this.graphics && !this.graphics.isEmpty();
        return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && e)
    }
    ;
    t.DisplayObject_draw = t.draw;
    t.draw = function(e, t) {
        if (this.DisplayObject_draw(e, t))
            return !0;
        this.graphics.draw(e);
        return !0
    }
    ;
    t.clone = function(t) {
        t = new e(t && this.graphics ? this.graphics.clone() : this.graphics);
        this.cloneProps(t);
        return t
    }
    ;
    t.toString = function() {
        return "[Shape (name=" + this.name + ")]"
    }
    ;
    createjs.Shape = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t, n) {
        this.initialize(e, t, n)
    }
      , t = e.prototype = new createjs.DisplayObject
      , n = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    n.getContext && (e._workingContext = n.getContext("2d"),
    n.width = n.height = 1);
    e.H_OFFSETS = {
        start: 0,
        left: 0,
        center: -.5,
        end: -1,
        right: -1
    };
    e.V_OFFSETS = {
        top: 0,
        hanging: -.01,
        middle: -.4,
        alphabetic: -.8,
        ideographic: -.85,
        bottom: -1
    };
    t.text = "";
    t.font = null ;
    t.color = null ;
    t.textAlign = "left";
    t.textBaseline = "top";
    t.maxWidth = null ;
    t.outline = 0;
    t.lineHeight = 0;
    t.lineWidth = null ;
    t.DisplayObject_initialize = t.initialize;
    t.initialize = function(e, t, n) {
        this.DisplayObject_initialize();
        this.text = e;
        this.font = t;
        this.color = n
    }
    ;
    t.isVisible = function() {
        var e = this.cacheCanvas || null != this.text && "" !== this.text;
        return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && e)
    }
    ;
    t.DisplayObject_draw = t.draw;
    t.draw = function(e, t) {
        if (this.DisplayObject_draw(e, t))
            return !0;
        var n = this.color || "#000";
        this.outline ? (e.strokeStyle = n,
        e.lineWidth = 1 * this.outline) : e.fillStyle = n;
        this._drawText(this._prepContext(e));
        return !0
    }
    ;
    t.getMeasuredWidth = function() {
        return this._prepContext(e._workingContext).measureText(this.text).width
    }
    ;
    t.getMeasuredLineHeight = function() {
        return 1.2 * this._prepContext(e._workingContext).measureText("M").width
    }
    ;
    t.getMeasuredHeight = function() {
        return this._drawText(null , {}).height
    }
    ;
    t.DisplayObject_getBounds = t.getBounds;
    t.getBounds = function() {
        var t = this.DisplayObject_getBounds();
        if (t)
            return t;
        if (null == this.text || "" == this.text)
            return null ;
        var t = this._drawText(null , {})
          , n = this.maxWidth && this.maxWidth < t.width ? this.maxWidth : t.width
          , r = n * e.H_OFFSETS[this.textAlign || "left"]
          , i = (this.lineHeight || this.getMeasuredLineHeight()) * e.V_OFFSETS[this.textBaseline || "top"];
        return this._rectangle.initialize(r, i, n, t.height)
    }
    ;
    t.clone = function() {
        var t = new e(this.text,this.font,this.color);
        this.cloneProps(t);
        return t
    }
    ;
    t.toString = function() {
        return "[Text (text=" + (20 < this.text.length ? this.text.substr(0, 17) + "..." : this.text) + ")]"
    }
    ;
    t.DisplayObject_cloneProps = t.cloneProps;
    t.cloneProps = function(e) {
        this.DisplayObject_cloneProps(e);
        e.textAlign = this.textAlign;
        e.textBaseline = this.textBaseline;
        e.maxWidth = this.maxWidth;
        e.outline = this.outline;
        e.lineHeight = this.lineHeight;
        e.lineWidth = this.lineWidth
    }
    ;
    t._prepContext = function(e) {
        e.font = this.font;
        e.textAlign = this.textAlign || "left";
        e.textBaseline = this.textBaseline || "top";
        return e
    }
    ;
    t._drawText = function(t, n) {
        var r = !!t;
        r || (t = this._prepContext(e._workingContext));
        for (var i = this.lineHeight || this.getMeasuredLineHeight(), s = 0, o = 0, u = String(this.text).split(/(?:\r\n|\r|\n)/), a = 0, f = u.length; a < f; a++) {
            var l = u[a]
              , h = null ;
            if (null != this.lineWidth && (h = t.measureText(l).width) > this.lineWidth)
                for (var p = l.split(/(\s)/), l = p[0], h = t.measureText(l).width, d = 1, v = p.length; d < v; d += 2) {
                    var m = t.measureText(p[d] + p[d + 1]).width;
                    h + m > this.lineWidth ? (r && this._drawTextLine(t, l, o * i),
                    h > s && (s = h),
                    l = p[d + 1],
                    h = t.measureText(l).width,
                    o++) : (l += p[d] + p[d + 1],
                    h += m)
                }
            r && this._drawTextLine(t, l, o * i);
            n && null == h && (h = t.measureText(l).width);
            h > s && (s = h);
            o++
        }
        n && (n.count = o,
        n.width = s,
        n.height = o * i);
        return n
    }
    ;
    t._drawTextLine = function(e, t, n) {
        this.outline ? e.strokeText(t, 0, n, this.maxWidth || 65535) : e.fillText(t, 0, n, this.maxWidth || 65535)
    }
    ;
    createjs.Text = e
})();
this.createjs = this.createjs || {};
(function() {
    function e(e, t) {
        this.initialize(e, t)
    }
    var t = e.prototype = new createjs.DisplayObject;
    t.text = "";
    t.spriteSheet = null ;
    t.lineHeight = 0;
    t.letterSpacing = 0;
    t.isNeedCenter = !1;
    t.centerX = 0;
    t.centerY = 0;
    t.textBounds;
    t.spaceWidth = 0;
    t.postfix = "";
    t.DisplayObject_initialize = t.initialize;
    t.initialize = function(e, n) {
        this.DisplayObject_initialize();
        this.text = e;
        this.spriteSheet = n;
        t.textBounds = new createjs.Rectangle
    }
    ;
    t.DisplayObject_draw = t.draw;
    t.draw = function(e, t) {
        if (this.DisplayObject_draw(e, t))
            return !0;
        this._drawText(e)
    }
    ;
    t.isVisible = function() {
        var e = this.cacheCanvas || this.spriteSheet && this.spriteSheet.complete && this.text;
        return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && e)
    }
    ;
    t.getBounds = function() {
        var e = this._rectangle;
        this._drawText(null , e);
        return e.width ? e : null
    }
    ;
    t._getFrame = function(e, t) {
        var n, r = t.getAnimation(e + this.postfix);
        r || (e != (n = e.toUpperCase()) || e != (n = e.toLowerCase()) || (n = null ),
        n && (r = t.getAnimation(n + this.postfix)));
        return r && t.getFrame(r.frames[0])
    }
    ;
    t._getLineHeight = function(e) {
        return (e = this._getFrame("1", e) || this._getFrame("T", e) || this._getFrame("L", e) || e.getFrame(0)) ? e.rect.height : 1
    }
    ;
    t._getSpaceWidth = function(e) {
        return (e = this._getFrame("1", e) || this._getFrame("l", e) || this._getFrame("e", e) || this._getFrame("a", e) || e.getFrame(0)) ? e.rect.width : 1
    }
    ;
    t._drawText = function(e, t) {
        var n, r, i, s = 0, o = 0, u = this.spaceWidth, a = this.lineHeight, f = this.spriteSheet;
        0 == u && (u = this._getSpaceWidth(f));
        0 == a && (a = this._getLineHeight(f));
        for (var l = 0, c = 0, h = this.text.length; c < h; c++)
            if (n = this.text.charAt(c),
            " " == n)
                s += u;
            else if ("\n" == n || "\r" == n)
                "\r" == n && "\n" == this.text.charAt(c + 1) && c++,
                s - i > l && (l = s - i),
                s = 0,
                o += a;
            else {
                var p = this._getFrame(n, f);
                if (p) {
                    var d = p.rect;
                    i = p.regX;
                    n = d.width;
                    e && e.drawImage(p.image, d.x, d.y, n, r = d.height, s - i, o - p.regY, n, r);
                    s += n + this.letterSpacing
                }
            }
        s - i > l && (l = s - i);
        t && (t.width = l - this.letterSpacing,
        t.height = o + a);
        this.textBounds.width = l - this.letterSpacing;
        this.textBounds.height = o + a
    }
    ;
    createjs.BitmapText = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function() {
        throw "SpriteSheetUtils cannot be instantiated"
    }
      , t = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    t.getContext && (e._workingCanvas = t,
    e._workingContext = t.getContext("2d"),
    t.width = t.height = 1);
    e.addFlippedFrames = function(t, n, r, i) {
        if (n || r || i) {
            var s = 0;
            n && e._flip(t, ++s, !0, !1);
            r && e._flip(t, ++s, !1, !0);
            i && e._flip(t, ++s, !0, !0)
        }
    }
    ;
    e.extractFrame = function(t, n) {
        isNaN(n) && (n = t.getAnimation(n).frames[0]);
        var r = t.getFrame(n);
        if (!r)
            return null ;
        var i = r.rect
          , s = e._workingCanvas;
        s.width = i.width;
        s.height = i.height;
        e._workingContext.drawImage(r.image, i.x, i.y, i.width, i.height, 0, 0, i.width, i.height);
        r = document.createElement("img");
        r.src = s.toDataURL("image/png");
        return r
    }
    ;
    e.mergeAlpha = function(e, t, n) {
        n || (n = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"));
        n.width = Math.max(t.width, e.width);
        n.height = Math.max(t.height, e.height);
        var r = n.getContext("2d");
        r.save();
        r.drawImage(e, 0, 0);
        r.globalCompositeOperation = "destination-in";
        r.drawImage(t, 0, 0);
        r.restore();
        return n
    }
    ;
    e._flip = function(t, n, r, i) {
        for (var s = t._images, o = e._workingCanvas, u = e._workingContext, a = s.length / n, f = 0; f < a; f++) {
            var l = s[f];
            l.__tmp = f;
            u.setTransform(1, 0, 0, 1, 0, 0);
            u.clearRect(0, 0, o.width + 1, o.height + 1);
            o.width = l.width;
            o.height = l.height;
            u.setTransform(r ? -1 : 1, 0, 0, i ? -1 : 1, r ? l.width : 0, i ? l.height : 0);
            u.drawImage(l, 0, 0);
            var h = document.createElement("img");
            h.src = o.toDataURL("image/png");
            h.width = l.width;
            h.height = l.height;
            s.push(h)
        }
        u = t._frames;
        o = u.length / n;
        for (f = 0; f < o; f++) {
            var l = u[f]
              , p = l.rect.clone()
              , h = s[l.image.__tmp + a * n]
              , d = {
                image: h,
                rect: p,
                regX: l.regX,
                regY: l.regY
            };
            r && (p.x = h.width - p.x - p.width,
            d.regX = p.width - l.regX);
            i && (p.y = h.height - p.y - p.height,
            d.regY = p.height - l.regY);
            u.push(d)
        }
        r = "_" + (r ? "h" : "") + (i ? "v" : "");
        i = t._animations;
        t = t._data;
        s = i.length / n;
        for (f = 0; f < s; f++) {
            u = i[f];
            l = t[u];
            a = {
                name: u + r,
                frequency: l.frequency,
                next: l.next,
                frames: []
            };
            l.next && (a.next += r);
            u = l.frames;
            l = 0;
            for (h = u.length; l < h; l++)
                a.frames.push(u[l] + o * n);
            t[a.name] = a;
            i.push(a.name)
        }
    }
    ;
    createjs.SpriteSheetUtils = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function() {
        this.initialize()
    }
      , t = e.prototype = new createjs.EventDispatcher;
    e.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions";
    e.ERR_RUNNING = "a build is already running";
    t.maxWidth = 2048;
    t.maxHeight = 2048;
    t.spriteSheet = null ;
    t.scale = 1;
    t.padding = 1;
    t.timeSlice = .3;
    t.progress = -1;
    t._frames = null ;
    t._animations = null ;
    t._data = null ;
    t._nextFrameIndex = 0;
    t._index = 0;
    t._timerID = null ;
    t._scale = 1;
    t.initialize = function() {
        this._frames = [];
        this._animations = {}
    }
    ;
    t.addFrame = function(t, n, r, i, s, o) {
        if (this._data)
            throw e.ERR_RUNNING;
        n = n || t.bounds || t.nominalBounds;
        !n && t.getBounds && (n = t.getBounds());
        if (!n)
            return null ;
        r = r || 1;
        return this._frames.push({
            source: t,
            sourceRect: n,
            scale: r,
            funct: i,
            params: s,
            scope: o,
            index: this._frames.length,
            height: n.height * r
        }) - 1
    }
    ;
    t.addAnimation = function(t, n, r, i) {
        if (this._data)
            throw e.ERR_RUNNING;
        this._animations[t] = {
            frames: n,
            next: r,
            frequency: i
        }
    }
    ;
    t.addMovieClip = function(t, n, r) {
        if (this._data)
            throw e.ERR_RUNNING;
        var i = t.frameBounds
          , s = n || t.bounds || t.nominalBounds;
        !s && t.getBounds && (s = t.getBounds());
        if (!s && !i)
            return null ;
        n = this._frames.length;
        for (var o = t.timeline.duration, u = 0; u < o; u++)
            this.addFrame(t, i && i[u] ? i[u] : s, r, function(e) {
                var t = this.actionsEnabled;
                this.actionsEnabled = !1;
                this.gotoAndStop(e);
                this.actionsEnabled = t
            }, [u], t);
        u = t.timeline._labels;
        t = [];
        for (var a in u)
            t.push({
                index: u[a],
                label: a
            });
        if (t.length)
            for (t.sort(function(e, t) {
                return e.index - t.index
            }),
            u = 0,
            a = t.length; u < a; u++) {
                r = t[u].label;
                for (var i = n + (u == a - 1 ? o : t[u + 1].index), s = [], f = n + t[u].index; f < i; f++)
                    s.push(f);
                this.addAnimation(r, s, !0)
            }
    }
    ;
    t.build = function() {
        if (this._data)
            throw e.ERR_RUNNING;
        for (this._startBuild(); this._drawNext(); )
            ;
        this._endBuild();
        return this.spriteSheet
    }
    ;
    t.buildAsync = function(t) {
        if (this._data)
            throw e.ERR_RUNNING;
        this.timeSlice = t;
        this._startBuild();
        var n = this;
        this._timerID = setTimeout(function() {
            n._run()
        }, 50 - 50 * Math.max(.01, Math.min(.99, this.timeSlice || .3)))
    }
    ;
    t.stopAsync = function() {
        clearTimeout(this._timerID);
        this._data = null
    }
    ;
    t.clone = function() {
        throw "SpriteSheetBuilder cannot be cloned."
    }
    ;
    t.toString = function() {
        return "[SpriteSheetBuilder]"
    }
    ;
    t._startBuild = function() {
        var t = this.padding || 0;
        this.progress = 0;
        this.spriteSheet = null ;
        this._index = 0;
        this._scale = this.scale;
        var n = [];
        this._data = {
            images: [],
            frames: n,
            animations: this._animations
        };
        var r = this._frames.slice();
        r.sort(function(e, t) {
            return e.height <= t.height ? -1 : 1
        });
        if (r[r.length - 1].height + 2 * t > this.maxHeight)
            throw e.ERR_DIMENSIONS;
        for (var i = 0, s = 0, o = 0; r.length; ) {
            var u = this._fillRow(r, i, o, n, t);
            u.w > s && (s = u.w);
            i += u.h;
            if (!u.h || !r.length) {
                var a = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
                a.width = this._getSize(s, this.maxWidth);
                a.height = this._getSize(i, this.maxHeight);
                this._data.images[o] = a;
                u.h || (s = i = 0,
                o++)
            }
        }
    }
    ;
    t._getSize = function(e, t) {
        for (var n = 4; Math.pow(2, ++n) < e; )
            ;
        return Math.min(t, Math.pow(2, n))
    }
    ;
    t._fillRow = function(t, n, r, i, s) {
        var o = this.maxWidth
          , u = this.maxHeight;
        n += s;
        for (var u = u - n, a = s, f = 0, l = t.length - 1; 0 <= l; l--) {
            var h = t[l]
              , p = this._scale * h.scale
              , d = h.sourceRect
              , v = h.source
              , m = Math.floor(p * d.x - s)
              , g = Math.floor(p * d.y - s)
              , y = Math.ceil(p * d.height + 2 * s)
              , d = Math.ceil(p * d.width + 2 * s);
            if (d > o)
                throw e.ERR_DIMENSIONS;
            y > u || a + d > o || (h.img = r,
            h.rect = new createjs.Rectangle(a,n,d,y),
            f = f || y,
            t.splice(l, 1),
            i[h.index] = [a, n, d, y, r, Math.round(-m + p * v.regX - s), Math.round(-g + p * v.regY - s)],
            a += d)
        }
        return {
            w: a,
            h: f
        }
    }
    ;
    t._endBuild = function() {
        this.spriteSheet = new createjs.SpriteSheet(this._data);
        this._data = null ;
        this.progress = 1;
        this.dispatchEvent("complete")
    }
    ;
    t._run = function() {
        for (var e = 50 * Math.max(.01, Math.min(.99, this.timeSlice || .3)), t = (new Date).getTime() + e, n = !1; t > (new Date).getTime(); )
            if (!this._drawNext()) {
                n = !0;
                break
            }
        if (n)
            this._endBuild();
        else {
            var r = this;
            this._timerID = setTimeout(function() {
                r._run()
            }, 50 - e)
        }
        e = this.progress = this._index / this._frames.length;
        this.hasEventListener("progress") && (t = new createjs.Event("progress"),
        t.progress = e,
        this.dispatchEvent(t))
    }
    ;
    t._drawNext = function() {
        var e = this._frames[this._index]
          , t = e.scale * this._scale
          , n = e.rect
          , r = e.sourceRect
          , i = this._data.images[e.img].getContext("2d");
        e.funct && e.funct.apply(e.scope, e.params);
        i.save();
        i.beginPath();
        i.rect(n.x, n.y, n.width, n.height);
        i.clip();
        i.translate(Math.ceil(n.x - r.x * t), Math.ceil(n.y - r.y * t));
        i.scale(t, t);
        e.source.draw(i);
        i.restore();
        return ++this._index < this._frames.length
    }
    ;
    createjs.SpriteSheetBuilder = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e) {
        this.initialize(e)
    }
      , t = e.prototype = new createjs.DisplayObject;
    t.htmlElement = null ;
    t._oldMtx = null ;
    t._visible = !1;
    t.DisplayObject_initialize = t.initialize;
    t.initialize = function(e) {
        "string" == typeof e && (e = document.getElementById(e));
        this.DisplayObject_initialize();
        this.mouseEnabled = !1;
        this.htmlElement = e;
        e = e.style;
        e.position = "absolute";
        e.transformOrigin = e.WebkitTransformOrigin = e.msTransformOrigin = e.MozTransformOrigin = e.OTransformOrigin = "0% 0%"
    }
    ;
    t.isVisible = function() {
        return null != this.htmlElement
    }
    ;
    t.draw = function(e, t) {
        this.visible && (this._visible = !0);
        return !0
    }
    ;
    t.cache = function() {}
    ;
    t.uncache = function() {}
    ;
    t.updateCache = function() {}
    ;
    t.hitTest = function() {}
    ;
    t.localToGlobal = function() {}
    ;
    t.globalToLocal = function() {}
    ;
    t.localToLocal = function() {}
    ;
    t.clone = function() {
        throw "DOMElement cannot be cloned."
    }
    ;
    t.toString = function() {
        return "[DOMElement (name=" + this.name + ")]"
    }
    ;
    t.DisplayObject__tick = t._tick;
    t._tick = function(e) {
        var t = this.getStage();
        this._visible = !1;
        t && t.on("drawend", this._handleDrawEnd, this, !0);
        this.DisplayObject__tick(e)
    }
    ;
    t._handleDrawEnd = function(e) {
        if (e = this.htmlElement) {
            e = e.style;
            var t = this._visible ? "visible" : "hidden";
            t != e.visibility && (e.visibility = t);
            if (this._visible) {
                var t = this.getConcatenatedMatrix(this._matrix)
                  , n = this._oldMtx;
                n && n.alpha == t.alpha || (e.opacity = "" + (1e4 * t.alpha | 0) / 1e4,
                n && (n.alpha = t.alpha));
                if (!n || n.tx != t.tx || n.ty != t.ty || n.a != t.a || n.b != t.b || n.c != t.c || n.d != t.d) {
                    var r = "matrix(" + (1e4 * t.a | 0) / 1e4 + "," + (1e4 * t.b | 0) / 1e4 + "," + (1e4 * t.c | 0) / 1e4 + "," + (1e4 * t.d | 0) / 1e4 + "," + (t.tx + .5 | 0);
                    e.transform = e.WebkitTransform = e.OTransform = e.msTransform = r + "," + (t.ty + .5 | 0) + ")";
                    e.MozTransform = r + "px," + (t.ty + .5 | 0) + "px)";
                    this._oldMtx = n ? n.copy(t) : t.clone()
                }
            }
        }
    }
    ;
    createjs.DOMElement = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function() {
        this.initialize()
    }
      , t = e.prototype;
    t.initialize = function() {}
    ;
    t.getBounds = function() {
        return null
    }
    ;
    t.applyFilter = function(e, t, n, r, i, s, o, u) {}
    ;
    t.toString = function() {
        return "[Filter]"
    }
    ;
    t.clone = function() {
        return new e
    }
    ;
    createjs.Filter = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t, n) {
        this.initialize(e, t, n)
    }
      , t = e.prototype = new createjs.Filter;
    t.initialize = function(e, t, n) {
        if (isNaN(e) || 0 > e)
            e = 0;
        this.blurX = e | 0;
        if (isNaN(t) || 0 > t)
            t = 0;
        this.blurY = t | 0;
        if (isNaN(n) || 1 > n)
            n = 1;
        this.quality = n | 0
    }
    ;
    t.blurX = 0;
    t.blurY = 0;
    t.quality = 1;
    t.mul_table = [1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265, 497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269, 261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369, 361, 353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281, 69, 271, 267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446, 55, 435, 429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363, 359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77, 305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68, 135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61, 121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221, 439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409, 203, 202, 401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47, 187, 93, 185, 23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87, 173, 345, 343, 341, 339, 337, 21, 167, 83, 331, 329, 327, 163, 81, 323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153, 305, 303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143, 285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135, 269, 267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1];
    t.shg_table = [0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14, 14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15, 15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15, 12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14, 16, 13, 16, 16, 16, 15, 16, 13, 16, 15, 16, 14, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16, 14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16, 15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16, 17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16, 17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15, 16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17, 17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17, 16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14, 17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16, 17, 16, 17, 9];
    t.getBounds = function() {
        var e = .5 * Math.pow(this.quality, .6);
        return new createjs.Rectangle(-this.blurX * e,-this.blurY * e,2 * this.blurX * e,2 * this.blurY * e)
    }
    ;
    t.applyFilter = function(e, t, n, r, i, s, o, u) {
        s = s || e;
        null == o && (o = t);
        null == u && (u = n);
        try {
            var a = e.getImageData(t, n, r, i)
        } catch (f) {
            return !1
        }
        e = this.blurX / 2;
        if (isNaN(e) || 0 > e)
            return !1;
        e |= 0;
        var l = this.blurY / 2;
        if (isNaN(l) || 0 > l)
            return !1;
        l |= 0;
        if (0 == e && 0 == l)
            return !1;
        var c = this.quality;
        if (isNaN(c) || 1 > c)
            c = 1;
        c |= 0;
        3 < c && (c = 3);
        1 > c && (c = 1);
        var h = a.data, p, d, v, m, g, y, b, w, E, S, x, T, N = e + e + 1;
        m = l + l + 1;
        var C = r - 1
          , k = i - 1
          , L = e + 1
          , A = l + 1
          , O = {
            r: 0,
            b: 0,
            g: 0,
            a: 0,
            next: null
        };
        t = O;
        for (p = 1; p < N; p++)
            t = t.next = {
                r: 0,
                b: 0,
                g: 0,
                a: 0,
                next: null
            };
        t.next = O;
        n = N = {
            r: 0,
            b: 0,
            g: 0,
            a: 0,
            next: null
        };
        for (p = 1; p < m; p++)
            n = n.next = {
                r: 0,
                b: 0,
                g: 0,
                a: 0,
                next: null
            };
        n.next = N;
        for (p = null ; 0 < c--; ) {
            g = m = 0;
            var M = this.mul_table[e]
              , _ = this.shg_table[e];
            for (n = i; -1 < --n; ) {
                y = L * (S = h[m]);
                b = L * (x = h[m + 1]);
                w = L * (T = h[m + 2]);
                E = L * (v = h[m + 3]);
                t = O;
                for (p = L; -1 < --p; )
                    t.r = S,
                    t.g = x,
                    t.b = T,
                    t.a = v,
                    t = t.next;
                for (p = 1; p < L; p++)
                    d = m + ((C < p ? C : p) << 2),
                    y += t.r = h[d],
                    b += t.g = h[d + 1],
                    w += t.b = h[d + 2],
                    E += t.a = h[d + 3],
                    t = t.next;
                p = O;
                for (t = 0; t < r; t++)
                    h[m++] = y * M >>> _,
                    h[m++] = b * M >>> _,
                    h[m++] = w * M >>> _,
                    h[m++] = E * M >>> _,
                    d = g + ((d = t + e + 1) < C ? d : C) << 2,
                    y -= p.r - (p.r = h[d]),
                    b -= p.g - (p.g = h[d + 1]),
                    w -= p.b - (p.b = h[d + 2]),
                    E -= p.a - (p.a = h[d + 3]),
                    p = p.next;
                g += r
            }
            M = this.mul_table[l];
            _ = this.shg_table[l];
            for (t = 0; t < r; t++) {
                m = t << 2;
                y = A * (S = h[m]);
                b = A * (x = h[m + 1]);
                w = A * (T = h[m + 2]);
                E = A * (v = h[m + 3]);
                n = N;
                for (p = 0; p < A; p++)
                    n.r = S,
                    n.g = x,
                    n.b = T,
                    n.a = v,
                    n = n.next;
                v = r;
                for (p = 1; p <= l; p++)
                    m = v + t << 2,
                    y += n.r = h[m],
                    b += n.g = h[m + 1],
                    w += n.b = h[m + 2],
                    E += n.a = h[m + 3],
                    n = n.next,
                    p < k && (v += r);
                m = t;
                p = N;
                if (0 < c)
                    for (n = 0; n < i; n++)
                        d = m << 2,
                        h[d + 3] = v = E * M >>> _,
                        0 < v ? (h[d] = y * M >>> _,
                        h[d + 1] = b * M >>> _,
                        h[d + 2] = w * M >>> _) : h[d] = h[d + 1] = h[d + 2] = 0,
                        d = t + ((d = n + A) < k ? d : k) * r << 2,
                        y -= p.r - (p.r = h[d]),
                        b -= p.g - (p.g = h[d + 1]),
                        w -= p.b - (p.b = h[d + 2]),
                        E -= p.a - (p.a = h[d + 3]),
                        p = p.next,
                        m += r;
                else
                    for (n = 0; n < i; n++)
                        d = m << 2,
                        h[d + 3] = v = E * M >>> _,
                        0 < v ? (v = 255 / v,
                        h[d] = (y * M >>> _) * v,
                        h[d + 1] = (b * M >>> _) * v,
                        h[d + 2] = (w * M >>> _) * v) : h[d] = h[d + 1] = h[d + 2] = 0,
                        d = t + ((d = n + A) < k ? d : k) * r << 2,
                        y -= p.r - (p.r = h[d]),
                        b -= p.g - (p.g = h[d + 1]),
                        w -= p.b - (p.b = h[d + 2]),
                        E -= p.a - (p.a = h[d + 3]),
                        p = p.next,
                        m += r
            }
        }
        s.putImageData(a, o, u);
        return !0
    }
    ;
    t.clone = function() {
        return new e(this.blurX,this.blurY,this.quality)
    }
    ;
    t.toString = function() {
        return "[BlurFilter]"
    }
    ;
    createjs.BlurFilter = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e) {
        this.initialize(e)
    }
      , t = e.prototype = new createjs.Filter;
    t.initialize = function(e) {
        this.alphaMap = e
    }
    ;
    t.alphaMap = null ;
    t._alphaMap = null ;
    t._mapData = null ;
    t.applyFilter = function(e, t, n, r, i, s, o, u) {
        if (!this.alphaMap)
            return !0;
        if (!this._prepAlphaMap())
            return !1;
        s = s || e;
        null == o && (o = t);
        null == u && (u = n);
        try {
            var a = e.getImageData(t, n, r, i)
        } catch (f) {
            return !1
        }
        e = a.data;
        t = this._mapData;
        n = e.length;
        for (r = 0; r < n; r += 4)
            e[r + 3] = t[r] || 0;
        a.data = e;
        s.putImageData(a, o, u);
        return !0
    }
    ;
    t.clone = function() {
        return new e(this.alphaMap)
    }
    ;
    t.toString = function() {
        return "[AlphaMapFilter]"
    }
    ;
    t._prepAlphaMap = function() {
        if (!this.alphaMap)
            return !1;
        if (this.alphaMap == this._alphaMap && this._mapData)
            return !0;
        this._mapData = null ;
        var e = this._alphaMap = this.alphaMap
          , t = e;
        e instanceof HTMLCanvasElement ? t = t.getContext("2d") : (t = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"),
        t.width = e.width,
        t.height = e.height,
        t = t.getContext("2d"),
        t.drawImage(e, 0, 0));
        try {
            var n = t.getImageData(0, 0, e.width, e.height)
        } catch (r) {
            return !1
        }
        this._mapData = n.data;
        return !0
    }
    ;
    createjs.AlphaMapFilter = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e) {
        this.initialize(e)
    }
      , t = e.prototype = new createjs.Filter;
    t.initialize = function(e) {
        this.mask = e
    }
    ;
    t.mask = null ;
    t.applyFilter = function(e, t, n, r, i, s, o, u) {
        if (!this.mask)
            return !0;
        s = s || e;
        null == o && (o = t);
        null == u && (u = n);
        s.save();
        s.globalCompositeOperation = "destination-in";
        s.drawImage(this.mask, o, u);
        s.restore();
        return !0
    }
    ;
    t.clone = function() {
        return new e(this.mask)
    }
    ;
    t.toString = function() {
        return "[AlphaMaskFilter]"
    }
    ;
    createjs.AlphaMaskFilter = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t, n, r, i, s, o, u) {
        this.initialize(e, t, n, r, i, s, o, u)
    }
      , t = e.prototype = new createjs.Filter;
    t.redMultiplier = 1;
    t.greenMultiplier = 1;
    t.blueMultiplier = 1;
    t.alphaMultiplier = 1;
    t.redOffset = 0;
    t.greenOffset = 0;
    t.blueOffset = 0;
    t.alphaOffset = 0;
    t.initialize = function(e, t, n, r, i, s, o, u) {
        this.redMultiplier = null != e ? e : 1;
        this.greenMultiplier = null != t ? t : 1;
        this.blueMultiplier = null != n ? n : 1;
        this.alphaMultiplier = null != r ? r : 1;
        this.redOffset = i || 0;
        this.greenOffset = s || 0;
        this.blueOffset = o || 0;
        this.alphaOffset = u || 0
    }
    ;
    t.applyFilter = function(e, t, n, r, i, s, o, u) {
        s = s || e;
        null == o && (o = t);
        null == u && (u = n);
        try {
            var a = e.getImageData(t, n, r, i)
        } catch (f) {
            return !1
        }
        e = a.data;
        t = e.length;
        for (n = 0; n < t; n += 4)
            e[n] = e[n] * this.redMultiplier + this.redOffset,
            e[n + 1] = e[n + 1] * this.greenMultiplier + this.greenOffset,
            e[n + 2] = e[n + 2] * this.blueMultiplier + this.blueOffset,
            e[n + 3] = e[n + 3] * this.alphaMultiplier + this.alphaOffset;
        s.putImageData(a, o, u);
        return !0
    }
    ;
    t.toString = function() {
        return "[ColorFilter]"
    }
    ;
    t.clone = function() {
        return new e(this.redMultiplier,this.greenMultiplier,this.blueMultiplier,this.alphaMultiplier,this.redOffset,this.greenOffset,this.blueOffset,this.alphaOffset)
    }
    ;
    createjs.ColorFilter = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t, n, r) {
        this.initialize(e, t, n, r)
    }
      , t = e.prototype = [];
    e.DELTA_INDEX = [0, .01, .02, .04, .05, .06, .07, .08, .1, .11, .12, .14, .15, .16, .17, .18, .2, .21, .22, .24, .25, .27, .28, .3, .32, .34, .36, .38, .4, .42, .44, .46, .48, .5, .53, .56, .59, .62, .65, .68, .71, .74, .77, .8, .83, .86, .89, .92, .95, .98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5, 7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10];
    e.IDENTITY_MATRIX = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
    e.LENGTH = e.IDENTITY_MATRIX.length;
    t.initialize = function(e, t, n, r) {
        this.reset();
        this.adjustColor(e, t, n, r);
        return this
    }
    ;
    t.reset = function() {
        return this.copyMatrix(e.IDENTITY_MATRIX)
    }
    ;
    t.adjustColor = function(e, t, n, r) {
        this.adjustHue(r);
        this.adjustContrast(t);
        this.adjustBrightness(e);
        return this.adjustSaturation(n)
    }
    ;
    t.adjustBrightness = function(e) {
        if (0 == e || isNaN(e))
            return this;
        e = this._cleanValue(e, 255);
        this._multiplyMatrix([1, 0, 0, 0, e, 0, 1, 0, 0, e, 0, 0, 1, 0, e, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        return this
    }
    ;
    t.adjustContrast = function(t) {
        if (0 == t || isNaN(t))
            return this;
        t = this._cleanValue(t, 100);
        var n;
        0 > t ? n = 127 + 127 * (t / 100) : (n = t % 1,
        n = 0 == n ? e.DELTA_INDEX[t] : e.DELTA_INDEX[t << 0] * (1 - n) + e.DELTA_INDEX[(t << 0) + 1] * n,
        n = 127 * n + 127);
        this._multiplyMatrix([n / 127, 0, 0, 0, .5 * (127 - n), 0, n / 127, 0, 0, .5 * (127 - n), 0, 0, n / 127, 0, .5 * (127 - n), 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        return this
    }
    ;
    t.adjustSaturation = function(e) {
        if (0 == e || isNaN(e))
            return this;
        e = this._cleanValue(e, 100);
        e = 1 + (0 < e ? 3 * e / 100 : e / 100);
        this._multiplyMatrix([.3086 * (1 - e) + e, .6094 * (1 - e), .082 * (1 - e), 0, 0, .3086 * (1 - e), .6094 * (1 - e) + e, .082 * (1 - e), 0, 0, .3086 * (1 - e), .6094 * (1 - e), .082 * (1 - e) + e, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        return this
    }
    ;
    t.adjustHue = function(e) {
        if (0 == e || isNaN(e))
            return this;
        e = this._cleanValue(e, 180) / 180 * Math.PI;
        var t = Math.cos(e);
        e = Math.sin(e);
        this._multiplyMatrix([.213 + .787 * t + -.213 * e, .715 + -.715 * t + -.715 * e, .072 + -.072 * t + .928 * e, 0, 0, .213 + -.213 * t + .143 * e, .715 + t * (1 - .715) + .14 * e, .072 + -.072 * t + -.283 * e, 0, 0, .213 + -.213 * t + -.787 * e, .715 + -.715 * t + .715 * e, .072 + .928 * t + .072 * e, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        return this
    }
    ;
    t.concat = function(t) {
        t = this._fixMatrix(t);
        if (t.length != e.LENGTH)
            return this;
        this._multiplyMatrix(t);
        return this
    }
    ;
    t.clone = function() {
        return new e(this)
    }
    ;
    t.toArray = function() {
        return this.slice(0, e.LENGTH)
    }
    ;
    t.copyMatrix = function(t) {
        for (var n = e.LENGTH, r = 0; r < n; r++)
            this[r] = t[r];
        return this
    }
    ;
    t._multiplyMatrix = function(e) {
        for (var t = [], n = 0; 5 > n; n++) {
            for (var r = 0; 5 > r; r++)
                t[r] = this[r + 5 * n];
            for (r = 0; 5 > r; r++) {
                for (var i = 0, s = 0; 5 > s; s++)
                    i += e[r + 5 * s] * t[s];
                this[r + 5 * n] = i
            }
        }
    }
    ;
    t._cleanValue = function(e, t) {
        return Math.min(t, Math.max(-t, e))
    }
    ;
    t._fixMatrix = function(t) {
        t instanceof e && (t = t.slice(0));
        t.length < e.LENGTH ? t = t.slice(0, t.length).concat(e.IDENTITY_MATRIX.slice(t.length, e.LENGTH)) : t.length > e.LENGTH && (t = t.slice(0, e.LENGTH));
        return t
    }
    ;
    createjs.ColorMatrix = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e) {
        this.initialize(e)
    }
      , t = e.prototype = new createjs.Filter;
    t.matrix = null ;
    t.initialize = function(e) {
        this.matrix = e
    }
    ;
    t.applyFilter = function(e, t, n, r, i, s, o, u) {
        s = s || e;
        null == o && (o = t);
        null == u && (u = n);
        try {
            var a = e.getImageData(t, n, r, i)
        } catch (f) {
            return !1
        }
        e = a.data;
        t = e.length;
        var l, c, h, p;
        l = this.matrix;
        n = l[0];
        r = l[1];
        i = l[2];
        for (var d = l[3], v = l[4], m = l[5], g = l[6], y = l[7], b = l[8], w = l[9], E = l[10], S = l[11], x = l[12], T = l[13], N = l[14], C = l[15], k = l[16], L = l[17], A = l[18], O = l[19], M = 0; M < t; M += 4)
            l = e[M],
            c = e[M + 1],
            h = e[M + 2],
            p = e[M + 3],
            e[M] = l * n + c * r + h * i + p * d + v,
            e[M + 1] = l * m + c * g + h * y + p * b + w,
            e[M + 2] = l * E + c * S + h * x + p * T + N,
            e[M + 3] = l * C + c * k + h * L + p * A + O;
        s.putImageData(a, o, u);
        return !0
    }
    ;
    t.toString = function() {
        return "[ColorMatrixFilter]"
    }
    ;
    t.clone = function() {
        return new e(this.matrix)
    }
    ;
    createjs.ColorMatrixFilter = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function() {
        throw "Touch cannot be instantiated"
    }
    ;
    e.isSupported = function() {
        return "ontouchstart"in window || window.navigator.msPointerEnabled && 0 < window.navigator.msMaxTouchPoints
    }
    ;
    e.enable = function(t, n, r) {
        if (!t || !t.canvas || !e.isSupported())
            return !1;
        t.__touch = {
            pointers: {},
            multitouch: !n,
            preventDefault: !r,
            count: 0
        };
        "ontouchstart"in window ? e._IOS_enable(t) : window.navigator.msPointerEnabled && e._IE_enable(t);
        return !0
    }
    ;
    e.disable = function(t) {
        t && ("ontouchstart"in window ? e._IOS_disable(t) : window.navigator.msPointerEnabled && e._IE_disable(t))
    }
    ;
    e._IOS_enable = function(t) {
        var n = t.canvas
          , r = t.__touch.f = function(n) {
            e._IOS_handleEvent(t, n)
        }
        ;
        n.addEventListener("touchstart", r, !1);
        n.addEventListener("touchmove", r, !1);
        n.addEventListener("touchend", r, !1);
        n.addEventListener("touchcancel", r, !1)
    }
    ;
    e._IOS_disable = function(e) {
        var t = e.canvas;
        t && (e = e.__touch.f,
        t.removeEventListener("touchstart", e, !1),
        t.removeEventListener("touchmove", e, !1),
        t.removeEventListener("touchend", e, !1),
        t.removeEventListener("touchcancel", e, !1))
    }
    ;
    e._IOS_handleEvent = function(e, t) {
        if (e) {
            e.__touch.preventDefault && t.preventDefault && t.preventDefault();
            for (var n = t.changedTouches, r = t.type, i = 0, s = n.length; i < s; i++) {
                var o = n[i]
                  , u = o.identifier;
                o.target == e.canvas && ("touchstart" == r ? this._handleStart(e, u, t, o.pageX, o.pageY) : "touchmove" == r ? this._handleMove(e, u, t, o.pageX, o.pageY) : "touchend" != r && "touchcancel" != r || this._handleEnd(e, u, t))
            }
        }
    }
    ;
    e._IE_enable = function(t) {
        var n = t.canvas
          , r = t.__touch.f = function(n) {
            e._IE_handleEvent(t, n)
        }
        ;
        n.addEventListener("MSPointerDown", r, !1);
        window.addEventListener("MSPointerMove", r, !1);
        window.addEventListener("MSPointerUp", r, !1);
        window.addEventListener("MSPointerCancel", r, !1);
        t.__touch.preventDefault && (n.style.msTouchAction = "none");
        t.__touch.activeIDs = {}
    }
    ;
    e._IE_disable = function(e) {
        var t = e.__touch.f;
        window.removeEventListener("MSPointerMove", t, !1);
        window.removeEventListener("MSPointerUp", t, !1);
        window.removeEventListener("MSPointerCancel", t, !1);
        e.canvas && e.canvas.removeEventListener("MSPointerDown", t, !1)
    }
    ;
    e._IE_handleEvent = function(e, t) {
        if (e) {
            e.__touch.preventDefault && t.preventDefault && t.preventDefault();
            var n = t.type
              , r = t.pointerId
              , i = e.__touch.activeIDs;
            if ("MSPointerDown" == n)
                t.srcElement == e.canvas && (i[r] = !0,
                this._handleStart(e, r, t, t.pageX, t.pageY));
            else if (i[r])
                if ("MSPointerMove" == n)
                    this._handleMove(e, r, t, t.pageX, t.pageY);
                else if ("MSPointerUp" == n || "MSPointerCancel" == n)
                    delete i[r],
                    this._handleEnd(e, r, t)
        }
    }
    ;
    e._handleStart = function(e, t, n, r, i) {
        var s = e.__touch;
        if (s.multitouch || !s.count) {
            var o = s.pointers;
            o[t] || (o[t] = !0,
            s.count++,
            e._handlePointerDown(t, n, r, i))
        }
    }
    ;
    e._handleMove = function(e, t, n, r, i) {
        e.__touch.pointers[t] && e._handlePointerMove(t, n, r, i)
    }
    ;
    e._handleEnd = function(e, t, n) {
        var r = e.__touch
          , i = r.pointers;
        i[t] && (r.count--,
        e._handlePointerUp(t, n, !0),
        delete i[t])
    }
    ;
    createjs.Touch = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = createjs.EaselJS = createjs.EaselJS || {};
    e.version = "NEXT";
    e.buildDate = "Sun, 06 Oct 2013 10:56:52 GMT"
})();
(function() {
    var e = createjs.Stage.prototype._handlePointerDown
      , t = createjs.Stage.prototype._handlePointerUp
      , n = !1;
    -1 < navigator.userAgent.indexOf("Android") && (createjs.Stage.prototype._handlePointerDown = function(t, r, i, s) {
        r.touches && (n = !0,
        this.enableDOMEvents(!1));
        n ? r.touches && "undefined" != typeof r.touches[0].pageX && (r.screenX = r.touches[0].pageX,
        r.screenY = r.touches[0].pageY,
        e.call(this, t, r, i, s)) : (r.screenX = r.x,
        r.screenY = r.y,
        e.call(this, t, r, i, s))
    }
    ,
    createjs.Stage.prototype._handlePointerUp = function(e, r, i) {
        r.changedTouches && (n = !0);
        n ? r.changedTouches && "undefined" != typeof r.changedTouches[0].pageX && (r.screenX = r.changedTouches[0].pageX,
        r.screenY = r.changedTouches[0].pageY,
        t.call(this, e, r, i)) : (r.screenX = r.x,
        r.screenY = r.y,
        t.call(this, e, r, i))
    }
    )
})();
this.createjs = this.createjs || {};
(function() {
    var e = createjs.PreloadJS = createjs.PreloadJS || {};
    e.version = "0.4.0";
    e.buildDate = "Wed, 25 Sep 2013 17:09:35 GMT"
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t, n) {
        this.initialize(e, t, n)
    }
      , t = e.prototype;
    t.type = null ;
    t.target = null ;
    t.currentTarget = null ;
    t.eventPhase = 0;
    t.bubbles = !1;
    t.cancelable = !1;
    t.timeStamp = 0;
    t.defaultPrevented = !1;
    t.propagationStopped = !1;
    t.immediatePropagationStopped = !1;
    t.removed = !1;
    t.initialize = function(e, t, n) {
        this.type = e;
        this.bubbles = t;
        this.cancelable = n;
        this.timeStamp = (new Date).getTime()
    }
    ;
    t.preventDefault = function() {
        this.defaultPrevented = !0
    }
    ;
    t.stopPropagation = function() {
        this.propagationStopped = !0
    }
    ;
    t.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = this.propagationStopped = !0
    }
    ;
    t.remove = function() {
        this.removed = !0
    }
    ;
    t.clone = function() {
        return new e(this.type,this.bubbles,this.cancelable)
    }
    ;
    t.toString = function() {
        return "[Event (type=" + this.type + ")]"
    }
    ;
    createjs.Event = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function() {}
      , t = e.prototype;
    e.initialize = function(e) {
        e.addEventListener = t.addEventListener;
        e.on = t.on;
        e.removeEventListener = e.off = t.removeEventListener;
        e.removeAllEventListeners = t.removeAllEventListeners;
        e.hasEventListener = t.hasEventListener;
        e.dispatchEvent = t.dispatchEvent;
        e._dispatchEvent = t._dispatchEvent
    }
    ;
    t._listeners = null ;
    t._captureListeners = null ;
    t.initialize = function() {}
    ;
    t.addEventListener = function(e, t, n) {
        var r;
        r = n ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
        var i = r[e];
        return i && this.removeEventListener(e, t, n),
        i = r[e],
        i ? i.push(t) : r[e] = [t],
        t
    }
    ;
    t.on = function(e, t, n, r, i, s) {
        return t.handleEvent && (n = n || t,
        t = t.handleEvent),
        n = n || this,
        this.addEventListener(e, function(e) {
            t.call(n, e, i);
            r && e.remove()
        }, s)
    }
    ;
    t.removeEventListener = function(e, t, n) {
        if (n = n ? this._captureListeners : this._listeners) {
            var r = n[e];
            if (r)
                for (var i = 0, s = r.length; s > i; i++)
                    if (r[i] == t) {
                        1 == s ? delete n[e] : r.splice(i, 1);
                        break
                    }
        }
    }
    ;
    t.off = t.removeEventListener;
    t.removeAllEventListeners = function(e) {
        e ? (this._listeners && delete this._listeners[e],
        this._captureListeners && delete this._captureListeners[e]) : this._listeners = this._captureListeners = null
    }
    ;
    t.dispatchEvent = function(e, t) {
        if ("string" == typeof e) {
            var n = this._listeners;
            if (!n || !n[e])
                return !1;
            e = new createjs.Event(e)
        }
        if (e.target = t || this,
        e.bubbles && this.parent) {
            for (var r = this, n = [r]; r.parent; )
                n.push(r = r.parent);
            for (var i = n.length, r = i - 1; 0 <= r && !e.propagationStopped; r--)
                n[r]._dispatchEvent(e, 1 + (0 == r));
            for (r = 1; i > r && !e.propagationStopped; r++)
                n[r]._dispatchEvent(e, 3)
        } else
            this._dispatchEvent(e, 2);
        return e.defaultPrevented
    }
    ;
    t.hasEventListener = function(e) {
        var t = this._listeners
          , n = this._captureListeners;
        return !!(t && t[e] || n && n[e])
    }
    ;
    t.toString = function() {
        return "[EventDispatcher]"
    }
    ;
    t._dispatchEvent = function(e, t) {
        var n, r = 1 == t ? this._captureListeners : this._listeners;
        if (e && r && (r = r[e.type]) && (n = r.length)) {
            e.currentTarget = this;
            e.eventPhase = t;
            e.removed = !1;
            for (var r = r.slice(), i = 0; n > i && !e.immediatePropagationStopped; i++) {
                var s = r[i];
                s.handleEvent ? s.handleEvent(e) : s(e);
                e.removed && (this.off(e.type, s, 1 == t),
                e.removed = !1)
            }
        }
    }
    ;
    createjs.EventDispatcher = e
})();
this.createjs = this.createjs || {};
(function() {
    createjs.indexOf = function(e, t) {
        for (var n = 0, r = e.length; r > n; n++)
            if (t === e[n])
                return n;
        return -1
    }
})();
this.createjs = this.createjs || {};
(function() {
    createjs.proxy = function(e, t) {
        var n = Array.prototype.slice.call(arguments, 2);
        return function() {
            return e.apply(t, Array.prototype.slice.call(arguments, 0).concat(n))
        }
    }
})();
this.createjs = this.createjs || {};
(function() {
    var e = function() {
        this.init()
    }
    ;
    e.prototype = {};
    var t = e.prototype;
    e.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/;
    t.loaded = !1;
    t.canceled = !1;
    t.progress = 0;
    t._item = null ;
    t._basePath = null ;
    t.addEventListener = null ;
    t.removeEventListener = null ;
    t.removeAllEventListeners = null ;
    t.dispatchEvent = null ;
    t.hasEventListener = null ;
    t._listeners = null ;
    createjs.EventDispatcher.initialize(t);
    t.getItem = function() {
        return this._item
    }
    ;
    t.init = function() {}
    ;
    t.load = function() {}
    ;
    t.close = function() {}
    ;
    t._sendLoadStart = function() {
        this._isCanceled() || this.dispatchEvent("loadstart")
    }
    ;
    t._sendProgress = function(e) {
        if (!this._isCanceled()) {
            var t = null ;
            "number" == typeof e ? (this.progress = e,
            t = new createjs.Event("progress"),
            t.loaded = this.progress,
            t.total = 1) : (t = e,
            this.progress = e.loaded / e.total,
            (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0));
            t.progress = this.progress;
            this.hasEventListener("progress") && this.dispatchEvent(t)
        }
    }
    ;
    t._sendComplete = function() {
        this._isCanceled() || this.dispatchEvent("complete")
    }
    ;
    t._sendError = function(e) {
        !this._isCanceled() && this.hasEventListener("error") && (null == e && (e = new createjs.Event("error")),
        this.dispatchEvent(e))
    }
    ;
    t._isCanceled = function() {
        return null == window.createjs || this.canceled ? !0 : !1
    }
    ;
    t._parseURI = function(t) {
        return t ? t.match(e.FILE_PATTERN) : null
    }
    ;
    t._formatQueryString = function(e, t) {
        if (null == e)
            throw Error("You must specify data.");
        var n = [], r;
        for (r in e)
            n.push(r + "=" + escape(e[r]));
        return t && (n = n.concat(t)),
        n.join("&")
    }
    ;
    t.buildPath = function(e, t, n) {
        if (null != t) {
            var r = this._parseURI(e);
            null != r && null != r[1] && "" != r[1] || (e = t + e)
        }
        if (null == n)
            return e;
        t = [];
        r = e.indexOf("?");
        if (-1 != r) {
            var i = e.slice(r + 1);
            t = t.concat(i.split("&"))
        }
        return -1 != r ? e.slice(0, r) + "?" + this._formatQueryString(n, t) : e + "?" + this._formatQueryString(n, t)
    }
    ;
    t.toString = function() {
        return "[PreloadJS AbstractLoader]"
    }
    ;
    createjs.AbstractLoader = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t) {
        this.init(e, t)
    }
      , t = e.prototype = new createjs.AbstractLoader;
    e.LOAD_TIMEOUT = 8e3;
    e.BINARY = "binary";
    e.CSS = "css";
    e.IMAGE = "image";
    e.JAVASCRIPT = "javascript";
    e.JSON = "json";
    e.JSONP = "jsonp";
    e.SOUND = "sound";
    e.SVG = "svg";
    e.TEXT = "text";
    e.XML = "xml";
    e.POST = "POST";
    e.GET = "GET";
    t.useXHR = !0;
    t.stopOnError = !1;
    t.maintainScriptOrder = !0;
    t.next = null ;
    t._typeCallbacks = null ;
    t._extensionCallbacks = null ;
    t._loadStartWasDispatched = !1;
    t._maxConnections = 1;
    t._currentlyLoadingScript = null ;
    t._currentLoads = null ;
    t._loadQueue = null ;
    t._loadQueueBackup = null ;
    t._loadItemsById = null ;
    t._loadItemsBySrc = null ;
    t._loadedResults = null ;
    t._loadedRawResults = null ;
    t._numItems = 0;
    t._numItemsLoaded = 0;
    t._scriptOrder = null ;
    t._loadedScripts = null ;
    t.init = function(e, t) {
        this._numItems = this._numItemsLoaded = 0;
        this._loadStartWasDispatched = this._paused = !1;
        this._currentLoads = [];
        this._loadQueue = [];
        this._loadQueueBackup = [];
        this._scriptOrder = [];
        this._loadedScripts = [];
        this._loadItemsById = {};
        this._loadItemsBySrc = {};
        this._loadedResults = {};
        this._loadedRawResults = {};
        this._typeCallbacks = {};
        this._extensionCallbacks = {};
        this._basePath = t;
        this.setUseXHR(e)
    }
    ;
    t.setUseXHR = function(e) {
        return this.useXHR = 0 != e && null != window.XMLHttpRequest,
        this.useXHR
    }
    ;
    t.removeAll = function() {
        this.remove()
    }
    ;
    t.remove = function(e) {
        var t = null ;
        if (!e || e instanceof Array)
            if (e)
                t = e;
            else {
                if (0 < arguments.length)
                    return
            }
        else
            t = [e];
        var n = !1;
        if (t) {
            for (; t.length; ) {
                for (var r = t.pop(), i = this.getResult(r), s = this._loadQueue.length - 1; 0 <= s; s--)
                    if (o = this._loadQueue[s].getItem(),
                    o.id == r || o.src == r) {
                        this._loadQueue.splice(s, 1)[0].cancel();
                        break
                    }
                for (s = this._loadQueueBackup.length - 1; 0 <= s; s--)
                    if (o = this._loadQueueBackup[s].getItem(),
                    o.id == r || o.src == r) {
                        this._loadQueueBackup.splice(s, 1)[0].cancel();
                        break
                    }
                if (i)
                    delete this._loadItemsById[i.id],
                    delete this._loadItemsBySrc[i.src],
                    this._disposeItem(i);
                else
                    for (var s = this._currentLoads.length - 1; 0 <= s; s--) {
                        var o = this._currentLoads[s].getItem();
                        if (o.id == r || o.src == r) {
                            this._currentLoads.splice(s, 1)[0].cancel();
                            n = !0;
                            break
                        }
                    }
            }
            n && this._loadNext()
        } else {
            this.close();
            for (r in this._loadItemsById)
                this._disposeItem(this._loadItemsById[r]);
            this.init(this.useXHR)
        }
    }
    ;
    t.reset = function() {
        this.close();
        for (var e in this._loadItemsById)
            this._disposeItem(this._loadItemsById[e]);
        e = [];
        i = 0;
        for (l = this._loadQueueBackup.length; l > i; i++)
            e.push(this._loadQueueBackup[i].getItem());
        this.loadManifest(e, !1)
    }
    ;
    e.isBinary = function(e) {
        switch (e) {
        case createjs.LoadQueue.IMAGE:
        case createjs.LoadQueue.BINARY:
            return !0;
        default:
            return !1
        }
    }
    ;
    t.installPlugin = function(e) {
        if (null != e && null != e.getPreloadHandlers) {
            e = e.getPreloadHandlers();
            if (null != e.types)
                for (var t = 0, n = e.types.length; n > t; t++)
                    this._typeCallbacks[e.types[t]] = e.callback;
            if (null != e.extensions)
                for (t = 0,
                n = e.extensions.length; n > t; t++)
                    this._extensionCallbacks[e.extensions[t]] = e.callback
        }
    }
    ;
    t.setMaxConnections = function(e) {
        this._maxConnections = e;
        !this._paused && 0 < this._loadQueue.length && this._loadNext()
    }
    ;
    t.loadFile = function(e, t, n) {
        if (null == e)
            return e = new createjs.Event("error"),
            e.text = "PRELOAD_NO_FILE",
            this._sendError(e),
            void 0;
        this._addItem(e, n);
        !1 !== t ? this.setPaused(!1) : this.setPaused(!0)
    }
    ;
    t.loadManifest = function(e, t, n) {
        var r = null ;
        if (e instanceof Array) {
            if (0 == e.length)
                return t = new createjs.Event("error"),
                t.text = "PRELOAD_MANIFEST_EMPTY",
                this._sendError(t),
                void 0;
            r = e
        } else {
            if (null == e)
                return t = new createjs.Event("error"),
                t.text = "PRELOAD_MANIFEST_NULL",
                this._sendError(t),
                void 0;
            r = [e]
        }
        e = 0;
        for (var i = r.length; i > e; e++)
            this._addItem(r[e], n);
        !1 !== t ? this.setPaused(!1) : this.setPaused(!0)
    }
    ;
    t.load = function() {
        this.setPaused(!1)
    }
    ;
    t.getItem = function(e) {
        return this._loadItemsById[e] || this._loadItemsBySrc[e]
    }
    ;
    t.getResult = function(e, t) {
        var n = this._loadItemsById[e] || this._loadItemsBySrc[e];
        if (null == n)
            return null ;
        n = n.id;
        return t && this._loadedRawResults[n] ? this._loadedRawResults[n] : this._loadedResults[n]
    }
    ;
    t.setPaused = function(e) {
        (this._paused = e) || this._loadNext()
    }
    ;
    t.close = function() {
        for (; this._currentLoads.length; )
            this._currentLoads.pop().cancel();
        this._scriptOrder.length = 0;
        this._loadedScripts.length = 0;
        this.loadStartWasDispatched = !1
    }
    ;
    t._addItem = function(e, t) {
        var n = this._createLoadItem(e);
        if (null != n) {
            var r = this._createLoader(n, t);
            null != r && (this._loadQueue.push(r),
            this._loadQueueBackup.push(r),
            this._numItems++,
            this._updateProgress(),
            this.maintainScriptOrder && n.type == createjs.LoadQueue.JAVASCRIPT && r instanceof createjs.XHRLoader && (this._scriptOrder.push(n),
            this._loadedScripts.push(null )))
        }
    }
    ;
    t._createLoadItem = function(e) {
        var t = null ;
        switch (typeof e) {
        case "string":
            t = {
                src: e
            };
            break;
        case "object":
            t = window.HTMLAudioElement && e instanceof HTMLAudioElement ? {
                tag: e,
                src: t.tag.src,
                type: createjs.LoadQueue.SOUND
            } : e;
            break;
        default:
            return null
        }
        e = this._parseURI(t.src);
        if (null != e && (t.ext = e[5]),
        null == t.type && (t.type = this._getTypeByExtension(t.ext)),
        t.type == createjs.LoadQueue.JSON && null != t.callback && (t.type = createjs.LoadQueue.JSONP),
        t.type == createjs.LoadQueue.JSONP && null == t.callback)
            throw Error("callback is required for loading JSONP requests.");
        null == t.tag && (t.tag = this._createTag(t.type));
        null != t.id && "" != t.id || (t.id = t.src);
        if (e = this._typeCallbacks[t.type] || this._extensionCallbacks[t.ext]) {
            e = e(t.src, t.type, t.id, t.data);
            if (!1 === e)
                return null ;
            !0 === e || (null != e.src && (t.src = e.src),
            null != e.id && (t.id = e.id),
            null != e.tag && e.tag.load instanceof Function && (t.tag = e.tag),
            null != e.completeHandler && (t.completeHandler = e.completeHandler));
            e.type && (t.type = e.type);
            e = this._parseURI(t.src);
            null != e && null != e[5] && (t.ext = e[5].toLowerCase())
        }
        return this._loadItemsById[t.id] = t,
        this._loadItemsBySrc[t.src] = t,
        t
    }
    ;
    t._createLoader = function(e, t) {
        var n = this.useXHR;
        switch (e.type) {
        case createjs.LoadQueue.JSON:
        case createjs.LoadQueue.XML:
        case createjs.LoadQueue.TEXT:
            n = !0;
            break;
        case createjs.LoadQueue.SOUND:
        case createjs.LoadQueue.JSONP:
            n = !1;
            break;
        case null :
            return null
        }
        return null == t && (t = this._basePath),
        n ? new createjs.XHRLoader(e,t) : new createjs.TagLoader(e,t)
    }
    ;
    t._loadNext = function() {
        if (!this._paused) {
            this._loadStartWasDispatched || (this._sendLoadStart(),
            this._loadStartWasDispatched = !0);
            this._numItems == this._numItemsLoaded ? (this.loaded = !0,
            this._sendComplete(),
            this.next && this.next.load && this.next.load()) : this.loaded = !1;
            for (var e = 0; e < this._loadQueue.length && !(this._currentLoads.length >= this._maxConnections); e++) {
                var t = this._loadQueue[e];
                if (this.maintainScriptOrder && t instanceof createjs.TagLoader && t.getItem().type == createjs.LoadQueue.JAVASCRIPT) {
                    if (this._currentlyLoadingScript)
                        continue;this._currentlyLoadingScript = !0
                }
                this._loadQueue.splice(e, 1);
                e--;
                this._loadItem(t)
            }
        }
    }
    ;
    t._loadItem = function(e) {
        e.addEventListener("progress", createjs.proxy(this._handleProgress, this));
        e.addEventListener("complete", createjs.proxy(this._handleFileComplete, this));
        e.addEventListener("error", createjs.proxy(this._handleFileError, this));
        this._currentLoads.push(e);
        this._sendFileStart(e.getItem());
        e.load()
    }
    ;
    t._handleFileError = function(e) {
        var t = e.target;
        this._numItemsLoaded++;
        this._updateProgress();
        e = new createjs.Event("error");
        e.text = "FILE_LOAD_ERROR";
        e.item = t.getItem();
        this._sendError(e);
        this.stopOnError || (this._removeLoadItem(t),
        this._loadNext())
    }
    ;
    t._handleFileComplete = function(e) {
        e = e.target;
        var t = e.getItem();
        if (this._loadedResults[t.id] = e.getResult(),
        e instanceof createjs.XHRLoader && (this._loadedRawResults[t.id] = e.getResult(!0)),
        this._removeLoadItem(e),
        this.maintainScriptOrder && t.type == createjs.LoadQueue.JAVASCRIPT) {
            if (!(e instanceof createjs.TagLoader))
                return this._loadedScripts[createjs.indexOf(this._scriptOrder, t)] = t,
                this._checkScriptLoadOrder(e),
                void 0;
            this._currentlyLoadingScript = !1
        }
        this._processFinishedLoad(t, e)
    }
    ;
    t._processFinishedLoad = function(e, t) {
        this._numItemsLoaded++;
        this._updateProgress();
        this._sendFileComplete(e, t);
        this._loadNext()
    }
    ;
    t._checkScriptLoadOrder = function() {
        for (var e = this._loadedScripts.length, t = 0; e > t; t++) {
            var n = this._loadedScripts[t];
            if (null === n)
                break;
            !0 !== n && (this._processFinishedLoad(n),
            this._loadedScripts[t] = !0,
            t--,
            e--)
        }
    }
    ;
    t._removeLoadItem = function(e) {
        for (var t = this._currentLoads.length, n = 0; t > n; n++)
            if (this._currentLoads[n] == e) {
                this._currentLoads.splice(n, 1);
                break
            }
    }
    ;
    t._handleProgress = function(e) {
        e = e.target;
        this._sendFileProgress(e.getItem(), e.progress);
        this._updateProgress()
    }
    ;
    t._updateProgress = function() {
        var e = this._numItemsLoaded / this._numItems
          , t = this._numItems - this._numItemsLoaded;
        if (0 < t) {
            for (var n = 0, r = 0, i = this._currentLoads.length; i > r; r++)
                n += this._currentLoads[r].progress;
            e += n / t * (t / this._numItems)
        }
        this._sendProgress(e)
    }
    ;
    t._disposeItem = function(e) {
        delete this._loadedResults[e.id];
        delete this._loadedRawResults[e.id];
        delete this._loadItemsById[e.id];
        delete this._loadItemsBySrc[e.src]
    }
    ;
    t._createTag = function(e) {
        var t = null ;
        switch (e) {
        case createjs.LoadQueue.IMAGE:
            return document.createElement("img");
        case createjs.LoadQueue.SOUND:
            return t = document.createElement("audio"),
            t.autoplay = !1,
            t;
        case createjs.LoadQueue.JSONP:
        case createjs.LoadQueue.JAVASCRIPT:
            return t = document.createElement("script"),
            t.type = "text/javascript",
            t;
        case createjs.LoadQueue.CSS:
            return t = this.useXHR ? document.createElement("style") : document.createElement("link"),
            t.rel = "stylesheet",
            t.type = "text/css",
            t;
        case createjs.LoadQueue.SVG:
            return this.useXHR ? t = document.createElement("svg") : (t = document.createElement("object"),
            t.type = "image/svg+xml"),
            t
        }
        return null
    }
    ;
    t._getTypeByExtension = function(e) {
        if (null == e)
            return createjs.LoadQueue.TEXT;
        switch (e.toLowerCase()) {
        case "jpeg":
        case "jpg":
        case "gif":
        case "png":
        case "webp":
        case "bmp":
            return createjs.LoadQueue.IMAGE;
        case "ogg":
        case "mp3":
        case "wav":
            return createjs.LoadQueue.SOUND;
        case "json":
            return createjs.LoadQueue.JSON;
        case "xml":
            return createjs.LoadQueue.XML;
        case "css":
            return createjs.LoadQueue.CSS;
        case "js":
            return createjs.LoadQueue.JAVASCRIPT;
        case "svg":
            return createjs.LoadQueue.SVG;
        default:
            return createjs.LoadQueue.TEXT
        }
    }
    ;
    t._sendFileProgress = function(e, t) {
        if (this._isCanceled())
            return this._cleanUp(),
            void 0;
        if (this.hasEventListener("fileprogress")) {
            var n = new createjs.Event("fileprogress");
            n.progress = t;
            n.loaded = t;
            n.total = 1;
            n.item = e;
            this.dispatchEvent(n)
        }
    }
    ;
    t._sendFileComplete = function(e, t) {
        if (!this._isCanceled()) {
            var n = new createjs.Event("fileload");
            n.loader = t;
            n.item = e;
            n.result = this._loadedResults[e.id];
            n.rawResult = this._loadedRawResults[e.id];
            e.completeHandler && e.completeHandler(n);
            this.hasEventListener("fileload") && this.dispatchEvent(n)
        }
    }
    ;
    t._sendFileStart = function(e) {
        var t = new createjs.Event("filestart");
        t.item = e;
        this.hasEventListener("filestart") && this.dispatchEvent(t)
    }
    ;
    t.toString = function() {
        return "[PreloadJS LoadQueue]"
    }
    ;
    createjs.LoadQueue = e;
    var n = function() {}
    ;
    n.init = function() {
        var e = navigator.userAgent;
        n.isFirefox = -1 < e.indexOf("Firefox");
        n.isOpera = null != window.opera;
        n.isChrome = -1 < e.indexOf("Chrome");
        n.isIOS = -1 < e.indexOf("iPod") || -1 < e.indexOf("iPhone") || -1 < e.indexOf("iPad")
    }
    ;
    n.init();
    createjs.LoadQueue.BrowserDetect = n
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t) {
        this.init(e, t)
    }
      , t = e.prototype = new createjs.AbstractLoader;
    t._loadTimeout = null ;
    t._tagCompleteProxy = null ;
    t._isAudio = !1;
    t._tag = null ;
    t._jsonResult = null ;
    t.init = function(e, t) {
        this._item = e;
        this._basePath = t;
        this._tag = e.tag;
        this._isAudio = window.HTMLAudioElement && e.tag instanceof HTMLAudioElement;
        this._tagCompleteProxy = createjs.proxy(this._handleLoad, this)
    }
    ;
    t.getResult = function() {
        return this._item.type == createjs.LoadQueue.JSONP ? this._jsonResult : this._tag
    }
    ;
    t.cancel = function() {
        this.canceled = !0;
        this._clean();
        this.getItem()
    }
    ;
    t.load = function() {
        var e = this._item
          , t = this._tag;
        clearTimeout(this._loadTimeout);
        this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), createjs.LoadQueue.LOAD_TIMEOUT);
        this._isAudio && (t.src = null ,
        t.preload = "auto");
        t.onerror = createjs.proxy(this._handleError, this);
        this._isAudio ? (t.onstalled = createjs.proxy(this._handleStalled, this),
        t.addEventListener("canplaythrough", this._tagCompleteProxy, !1)) : (t.onload = createjs.proxy(this._handleLoad, this),
        t.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this));
        var n = this.buildPath(e.src, this._basePath, e.values);
        switch (e.type) {
        case createjs.LoadQueue.CSS:
            t.href = n;
            break;
        case createjs.LoadQueue.SVG:
            t.data = n;
            break;
        default:
            t.src = n
        }
        if (e.type == createjs.LoadQueue.JSONP) {
            if (null == e.callback)
                throw Error("callback is required for loading JSONP requests.");
            if (null != window[e.callback])
                throw Error('JSONP callback "' + e.callback + '" already exists on window. You need to specify a different callback. Or re-name the current one.');
            window[e.callback] = createjs.proxy(this._handleJSONPLoad, this)
        }
        e.type != createjs.LoadQueue.SVG && e.type != createjs.LoadQueue.JSONP && e.type != createjs.LoadQueue.JSON && e.type != createjs.LoadQueue.JAVASCRIPT && e.type != createjs.LoadQueue.CSS || (this._startTagVisibility = t.style.visibility,
        t.style.visibility = "hidden",
        (document.body || document.getElementsByTagName("body")[0]).appendChild(t));
        null != t.load && t.load()
    }
    ;
    t._handleJSONPLoad = function(e) {
        this._jsonResult = e
    }
    ;
    t._handleTimeout = function() {
        this._clean();
        var e = new createjs.Event("error");
        e.text = "PRELOAD_TIMEOUT";
        this._sendError(e)
    }
    ;
    t._handleStalled = function() {}
    ;
    t._handleError = function() {
        this._clean();
        var e = new createjs.Event("error");
        this._sendError(e)
    }
    ;
    t._handleReadyStateChange = function() {
        clearTimeout(this._loadTimeout);
        var e = this.getItem().tag;
        "loaded" != e.readyState && "complete" != e.readyState || this._handleLoad()
    }
    ;
    t._handleLoad = function() {
        if (!this._isCanceled()) {
            var e = this.getItem()
              , t = e.tag;
            if (!(this.loaded || this.isAudio && 4 !== t.readyState)) {
                switch (this.loaded = !0,
                e.type) {
                case createjs.LoadQueue.SVG:
                case createjs.LoadQueue.JSONP:
                    t.style.visibility = this._startTagVisibility,
                    (document.body || document.getElementsByTagName("body")[0]).removeChild(t)
                }
                this._clean();
                this._sendComplete()
            }
        }
    }
    ;
    t._clean = function() {
        clearTimeout(this._loadTimeout);
        var e = this.getItem().tag;
        e.onload = null ;
        e.removeEventListener && e.removeEventListener("canplaythrough", this._tagCompleteProxy, !1);
        e.onstalled = null ;
        e.onprogress = null ;
        e.onerror = null ;
        e.parentNode && e.parentNode.removeChild(e);
        e = this.getItem();
        e.type == createjs.LoadQueue.JSONP && (window[e.callback] = null )
    }
    ;
    t.toString = function() {
        return "[PreloadJS TagLoader]"
    }
    ;
    createjs.TagLoader = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t) {
        this.init(e, t)
    }
      , t = e.prototype = new createjs.AbstractLoader;
    t._request = null ;
    t._loadTimeout = null ;
    t._xhrLevel = 1;
    t._response = null ;
    t._rawResponse = null ;
    t.init = function(e, t) {
        this._item = e;
        this._basePath = t;
        !this._createXHR(e)
    }
    ;
    t.getResult = function(e) {
        return e && this._rawResponse ? this._rawResponse : this._response
    }
    ;
    t.cancel = function() {
        this.canceled = !0;
        this._clean();
        this._request.abort()
    }
    ;
    t.load = function() {
        if (null == this._request)
            return this._handleError(),
            void 0;
        this._request.onloadstart = createjs.proxy(this._handleLoadStart, this);
        this._request.onprogress = createjs.proxy(this._handleProgress, this);
        this._request.onabort = createjs.proxy(this._handleAbort, this);
        this._request.onerror = createjs.proxy(this._handleError, this);
        this._request.ontimeout = createjs.proxy(this._handleTimeout, this);
        1 == this._xhrLevel && (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), createjs.LoadQueue.LOAD_TIMEOUT));
        this._request.onload = createjs.proxy(this._handleLoad, this);
        this._request.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this);
        try {
            this._item.values && this._item.method != createjs.LoadQueue.GET ? this._item.method == createjs.LoadQueue.POST && this._request.send(this._formatQueryString(this._item.values)) : this._request.send()
        } catch (e) {
            var t = new createjs.Event("error");
            t.error = e;
            this._sendError(t)
        }
    }
    ;
    t.getAllResponseHeaders = function() {
        return this._request.getAllResponseHeaders instanceof Function ? this._request.getAllResponseHeaders() : null
    }
    ;
    t.getResponseHeader = function(e) {
        return this._request.getResponseHeader instanceof Function ? this._request.getResponseHeader(e) : null
    }
    ;
    t._handleProgress = function(e) {
        if (e && !(0 < e.loaded && 0 == e.total)) {
            var t = new createjs.Event("progress");
            t.loaded = e.loaded;
            t.total = e.total;
            this._sendProgress(t)
        }
    }
    ;
    t._handleLoadStart = function() {
        clearTimeout(this._loadTimeout);
        this._sendLoadStart()
    }
    ;
    t._handleAbort = function(e) {
        this._clean();
        e = new createjs.Event("error");
        e.text = "XHR_ABORTED";
        this._sendError(e)
    }
    ;
    t._handleError = function() {
        this._clean();
        var e = new createjs.Event("error");
        this._sendError(e)
    }
    ;
    t._handleReadyStateChange = function() {
        4 == this._request.readyState && this._handleLoad()
    }
    ;
    t._handleLoad = function() {
        if (!this.loaded) {
            if (this.loaded = !0,
            !this._checkError())
                return this._handleError(),
                void 0;
            this._response = this._getResponse();
            this._clean();
            this._generateTag() && this._sendComplete()
        }
    }
    ;
    t._handleTimeout = function(e) {
        this._clean();
        (new createjs.Event("error")).text = "PRELOAD_TIMEOUT";
        this._sendError(e)
    }
    ;
    t._checkError = function() {
        switch (parseInt(this._request.status)) {
        case 404:
        case 0:
            return !1
        }
        return !0
    }
    ;
    t._getResponse = function() {
        if (null != this._response)
            return this._response;
        if (null != this._request.response)
            return this._request.response;
        try {
            if (null != this._request.responseText)
                return this._request.responseText
        } catch (e) {}
        try {
            if (null != this._request.responseXML)
                return this._request.responseXML
        } catch (t) {}
        return null
    }
    ;
    t._createXHR = function(e) {
        var t = document.createElement("a");
        t.href = this.buildPath(e.src, this._basePath);
        var n = document.createElement("a");
        n.href = location.href;
        t = "" != t.hostname && (t.port != n.port || t.protocol != n.protocol || t.hostname != n.hostname);
        n = null ;
        if (t && window.XDomainRequest)
            n = new XDomainRequest;
        else if (window.XMLHttpRequest)
            n = new XMLHttpRequest;
        else
            try {
                n = new ActiveXObject("Msxml2.XMLHTTP.6.0")
            } catch (r) {
                try {
                    n = new ActiveXObject("Msxml2.XMLHTTP.3.0")
                } catch (i) {
                    try {
                        n = new ActiveXObject("Msxml2.XMLHTTP")
                    } catch (s) {
                        return !1
                    }
                }
            }
        e.type == createjs.LoadQueue.TEXT && n.overrideMimeType && n.overrideMimeType("text/plain; charset=x-user-defined");
        this._xhrLevel = "string" == typeof n.responseType ? 2 : 1;
        var o = null ;
        return o = e.method == createjs.LoadQueue.GET ? this.buildPath(e.src, this._basePath, e.values) : this.buildPath(e.src, this._basePath),
        n.open(e.method || createjs.LoadQueue.GET, o, !0),
        t && n instanceof XMLHttpRequest && 1 == this._xhrLevel && n.setRequestHeader("Origin", location.origin),
        e.values && e.method == createjs.LoadQueue.POST && n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
        createjs.LoadQueue.isBinary(e.type) && (n.responseType = "arraybuffer"),
        this._request = n,
        !0
    }
    ;
    t._clean = function() {
        clearTimeout(this._loadTimeout);
        var e = this._request;
        e.onloadstart = null ;
        e.onprogress = null ;
        e.onabort = null ;
        e.onerror = null ;
        e.onload = null ;
        e.ontimeout = null ;
        e.onloadend = null ;
        e.onreadystatechange = null
    }
    ;
    t._generateTag = function() {
        var e = this._item.tag;
        switch (this._item.type) {
        case createjs.LoadQueue.IMAGE:
            return e.onload = createjs.proxy(this._handleTagReady, this),
            e.src = this.buildPath(this._item.src, this._basePath, this._item.values),
            this._rawResponse = this._response,
            this._response = e,
            !1;
        case createjs.LoadQueue.JAVASCRIPT:
            return e = document.createElement("script"),
            e.text = this._response,
            this._rawResponse = this._response,
            this._response = e,
            !0;
        case createjs.LoadQueue.CSS:
            if (document.getElementsByTagName("head")[0].appendChild(e),
            e.styleSheet)
                e.styleSheet.cssText = this._response;
            else {
                var t = document.createTextNode(this._response);
                e.appendChild(t)
            }
            return this._rawResponse = this._response,
            this._response = e,
            !0;
        case createjs.LoadQueue.XML:
            return t = this._parseXML(this._response, "text/xml"),
            this._response = t,
            !0;
        case createjs.LoadQueue.SVG:
            return t = this._parseXML(this._response, "image/svg+xml"),
            this._rawResponse = this._response,
            null != t.documentElement ? (e.appendChild(t.documentElement),
            this._response = e) : this._response = t,
            !0;
        case createjs.LoadQueue.JSON:
            e = {};
            try {
                e = JSON.parse(this._response)
            } catch (n) {
                e = n
            }
            return this._rawResponse = this._response,
            this._response = e,
            !0
        }
        return !0
    }
    ;
    t._parseXML = function(e, t) {
        var n = null ;
        window.DOMParser ? n = (new DOMParser).parseFromString(e, t) : (n = new ActiveXObject("Microsoft.XMLDOM"),
        n.async = !1,
        n.loadXML(e));
        return n
    }
    ;
    t._handleTagReady = function() {
        this._sendComplete()
    }
    ;
    t.toString = function() {
        return "[PreloadJS XHRLoader]"
    }
    ;
    createjs.XHRLoader = e
})();
"object" != typeof JSON && (JSON = {});
(function() {
    function c(e) {
        return 10 > e ? "0" + e : e
    }
    function a(e) {
        return f.lastIndex = 0,
        f.test(e) ? '"' + e.replace(f, function(e) {
            var t = h[e];
            return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + e + '"'
    }
    function b(t, n) {
        var r, i, s, o, u, f = d, l = n[t];
        switch (l && "object" == typeof l && "function" == typeof l.toJSON && (l = l.toJSON(t)),
        "function" == typeof k && (l = k.call(n, t, l)),
        typeof l) {
        case "string":
            return a(l);
        case "number":
            return isFinite(l) ? String(l) : "null";
        case "boolean":
        case "null":
            return String(l);
        case "object":
            if (!l)
                return "null";
            if (d += e,
            u = [],
            "[object Array]" === Object.prototype.toString.apply(l)) {
                o = l.length;
                for (r = 0; o > r; r += 1)
                    u[r] = b(r, l) || "null";
                return s = 0 === u.length ? "[]" : d ? "[\n" + d + u.join(",\n" + d) + "\n" + f + "]" : "[" + u.join(",") + "]",
                d = f,
                s
            }
            if (k && "object" == typeof k)
                for (o = k.length,
                r = 0; o > r; r += 1)
                    "string" == typeof k[r] && (i = k[r],
                    s = b(i, l),
                    s && u.push(a(i) + (d ? ": " : ":") + s));
            else
                for (i in l)
                    Object.prototype.hasOwnProperty.call(l, i) && (s = b(i, l),
                    s && u.push(a(i) + (d ? ": " : ":") + s));
            return s = 0 === u.length ? "{}" : d ? "{\n" + d + u.join(",\n" + d) + "\n" + f + "}" : "{" + u.join(",") + "}",
            d = f,
            s
        }
    }
    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + c(this.getUTCMonth() + 1) + "-" + c(this.getUTCDate()) + "T" + c(this.getUTCHours()) + ":" + c(this.getUTCMinutes()) + ":" + c(this.getUTCSeconds()) + "Z" : null
    }
    ,
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf()
    }
    );
    var g = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, f = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, d, e, h = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, k;
    "function" != typeof JSON.stringify && (JSON.stringify = function(t, n, r) {
        var i;
        if (d = "",
        e = "",
        "number" == typeof r)
            for (i = 0; r > i; i += 1)
                e += " ";
        else
            "string" == typeof r && (e = r);
        if (k = n,
        n && "function" != typeof n && ("object" != typeof n || "number" != typeof n.length))
            throw Error("JSON.stringify");
        return b("", {
            "": t
        })
    }
    );
    "function" != typeof JSON.parse && (JSON.parse = function(b, a) {
        function c(e, t) {
            var n, r, i = e[t];
            if (i && "object" == typeof i)
                for (n in i)
                    Object.prototype.hasOwnProperty.call(i, n) && (r = c(i, n),
                    void 0 !== r ? i[n] = r : delete i[n]);
            return a.call(e, t, i)
        }
        var f;
        if (b = String(b),
        g.lastIndex = 0,
        g.test(b) && (b = b.replace(g, function(e) {
            return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        })),
        /^[\],:{}\s]*$/.test(b.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
            return f = eval("(" + b + ")"),
            "function" == typeof a ? c({
                "": f
            }, "") : f;
        throw new SyntaxError("JSON.parse")
    }
    )
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t, n) {
        this.initialize(e, t, n)
    }
      , t = e.prototype;
    t.type = null ;
    t.target = null ;
    t.currentTarget = null ;
    t.eventPhase = 0;
    t.bubbles = !1;
    t.cancelable = !1;
    t.timeStamp = 0;
    t.defaultPrevented = !1;
    t.propagationStopped = !1;
    t.immediatePropagationStopped = !1;
    t.removed = !1;
    t.initialize = function(e, t, n) {
        this.type = e;
        this.bubbles = t;
        this.cancelable = n;
        this.timeStamp = (new Date).getTime()
    }
    ;
    t.preventDefault = function() {
        this.defaultPrevented = !0
    }
    ;
    t.stopPropagation = function() {
        this.propagationStopped = !0
    }
    ;
    t.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = this.propagationStopped = !0
    }
    ;
    t.remove = function() {
        this.removed = !0
    }
    ;
    t.clone = function() {
        return new e(this.type,this.bubbles,this.cancelable)
    }
    ;
    t.toString = function() {
        return "[Event (type=" + this.type + ")]"
    }
    ;
    createjs.Event = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function() {
        this.initialize()
    }
      , t = e.prototype;
    e.initialize = function(e) {
        e.addEventListener = t.addEventListener;
        e.on = t.on;
        e.removeEventListener = e.off = t.removeEventListener;
        e.removeAllEventListeners = t.removeAllEventListeners;
        e.hasEventListener = t.hasEventListener;
        e.dispatchEvent = t.dispatchEvent;
        e._dispatchEvent = t._dispatchEvent
    }
    ;
    t._listeners = null ;
    t._captureListeners = null ;
    t.initialize = function() {}
    ;
    t.addEventListener = function(e, t, n) {
        var r;
        r = n ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
        var i = r[e];
        return i && this.removeEventListener(e, t, n),
        i = r[e],
        i ? i.push(t) : r[e] = [t],
        t
    }
    ;
    t.on = function(e, t, n, r, i, s) {
        return t.handleEvent && (n = n || t,
        t = t.handleEvent),
        n = n || this,
        this.addEventListener(e, function(e) {
            t.call(n, e, i);
            r && e.remove()
        }, s)
    }
    ;
    t.removeEventListener = function(e, t, n) {
        if (n = n ? this._captureListeners : this._listeners) {
            var r = n[e];
            if (r)
                for (var i = 0, s = r.length; s > i; i++)
                    if (r[i] == t) {
                        1 == s ? delete n[e] : r.splice(i, 1);
                        break
                    }
        }
    }
    ;
    t.off = t.removeEventListener;
    t.removeAllEventListeners = function(e) {
        e ? (this._listeners && delete this._listeners[e],
        this._captureListeners && delete this._captureListeners[e]) : this._listeners = this._captureListeners = null
    }
    ;
    t.dispatchEvent = function(e, t) {
        if ("string" == typeof e) {
            var n = this._listeners;
            if (!n || !n[e])
                return !1;
            e = new createjs.Event(e)
        }
        if (e.target = t || this,
        e.bubbles && this.parent) {
            for (var r = this, n = [r]; r.parent; )
                n.push(r = r.parent);
            for (var i = n.length, r = i - 1; 0 <= r && !e.propagationStopped; r--)
                n[r]._dispatchEvent(e, 1 + (0 == r));
            for (r = 1; i > r && !e.propagationStopped; r++)
                n[r]._dispatchEvent(e, 3)
        } else
            this._dispatchEvent(e, 2);
        return e.defaultPrevented
    }
    ;
    t.hasEventListener = function(e) {
        var t = this._listeners
          , n = this._captureListeners;
        return !!(t && t[e] || n && n[e])
    }
    ;
    t.toString = function() {
        return "[EventDispatcher]"
    }
    ;
    t._dispatchEvent = function(e, t) {
        var n, r = 1 == t ? this._captureListeners : this._listeners;
        if (e && r && (r = r[e.type]) && (n = r.length)) {
            e.currentTarget = this;
            e.eventPhase = t;
            e.removed = !1;
            for (var r = r.slice(), i = 0; n > i && !e.immediatePropagationStopped; i++) {
                var s = r[i];
                s.handleEvent ? s.handleEvent(e) : s(e);
                e.removed && (this.off(e.type, s, 1 == t),
                e.removed = !1)
            }
        }
    }
    ;
    createjs.EventDispatcher = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t, n) {
        this.initialize(e, t, n)
    }
      , t = e.prototype = new createjs.EventDispatcher;
    e.NONE = 0;
    e.LOOP = 1;
    e.REVERSE = 2;
    e.IGNORE = {};
    e._tweens = [];
    e._plugins = {};
    e.get = function(t, n, r, i) {
        return i && e.removeTweens(t),
        new e(t,n,r)
    }
    ;
    e.tick = function(t, n) {
        for (var r = e._tweens.slice(), i = r.length - 1; 0 <= i; i--) {
            var s = r[i];
            n && !s.ignoreGlobalPause || s._paused || s.tick(s._useTicks ? 1 : t)
        }
    }
    ;
    e.handleEvent = function(e) {
        "tick" == e.type && this.tick(e.delta, e.paused)
    }
    ;
    e.removeTweens = function(t) {
        if (t.tweenjs_count) {
            for (var n = e._tweens, r = n.length - 1; 0 <= r; r--)
                n[r]._target == t && (n[r]._paused = !0,
                n.splice(r, 1));
            t.tweenjs_count = 0
        }
    }
    ;
    e.removeAllTweens = function() {
        for (var t = e._tweens, n = 0, r = t.length; r > n; n++) {
            var i = t[n];
            i.paused = !0;
            i.target.tweenjs_count = 0
        }
        t.length = 0
    }
    ;
    e.hasActiveTweens = function(t) {
        return t ? t.tweenjs_count : e._tweens && !!e._tweens.length
    }
    ;
    e.installPlugin = function(t, n) {
        var r = t.priority;
        null == r && (t.priority = r = 0);
        for (var i = 0, s = n.length, o = e._plugins; s > i; i++) {
            var u = n[i];
            if (o[u]) {
                for (var a = o[u], f = 0, l = a.length; l > f && !(r < a[f].priority); f++)
                    ;
                o[u].splice(f, 0, t)
            } else
                o[u] = [t]
        }
    }
    ;
    e._register = function(t, n) {
        var r = t._target
          , i = e._tweens;
        if (n)
            r && (r.tweenjs_count = r.tweenjs_count ? r.tweenjs_count + 1 : 1),
            i.push(t),
            !e._inited && createjs.Ticker && (createjs.Ticker.addEventListener("tick", e),
            e._inited = !0);
        else
            for (r && r.tweenjs_count--,
            r = i.length; r--; )
                if (i[r] == t)
                    return i.splice(r, 1),
                    void 0
    }
    ;
    t.ignoreGlobalPause = !1;
    t.loop = !1;
    t.duration = 0;
    t.pluginData = null ;
    t.target = null ;
    t.position = null ;
    t.passive = !1;
    t._paused = !1;
    t._curQueueProps = null ;
    t._initQueueProps = null ;
    t._steps = null ;
    t._actions = null ;
    t._prevPosition = 0;
    t._stepPosition = 0;
    t._prevPos = -1;
    t._target = null ;
    t._useTicks = !1;
    t._inited = !1;
    t.initialize = function(t, n, r) {
        this.target = this._target = t;
        n && (this._useTicks = n.useTicks,
        this.ignoreGlobalPause = n.ignoreGlobalPause,
        this.loop = n.loop,
        n.onChange && this.addEventListener("change", n.onChange),
        n.override && e.removeTweens(t));
        this.pluginData = r || {};
        this._curQueueProps = {};
        this._initQueueProps = {};
        this._steps = [];
        this._actions = [];
        n && n.paused ? this._paused = !0 : e._register(this, !0);
        n && null != n.position && this.setPosition(n.position, e.NONE)
    }
    ;
    t.wait = function(e, t) {
        if (null == e || 0 >= e)
            return this;
        var n = this._cloneProps(this._curQueueProps);
        return this._addStep({
            d: e,
            p0: n,
            e: this._linearEase,
            p1: n,
            v: t
        })
    }
    ;
    t.to = function(e, t, n) {
        return (isNaN(t) || 0 > t) && (t = 0),
        this._addStep({
            d: t || 0,
            p0: this._cloneProps(this._curQueueProps),
            e: n,
            p1: this._cloneProps(this._appendQueueProps(e))
        })
    }
    ;
    t.call = function(e, t, n) {
        return this._addAction({
            f: e,
            p: t ? t : [this],
            o: n ? n : this._target
        })
    }
    ;
    t.set = function(e, t) {
        return this._addAction({
            f: this._set,
            o: this,
            p: [e, t ? t : this._target]
        })
    }
    ;
    t.play = function(e) {
        return e || (e = this),
        this.call(e.setPaused, [!1], e)
    }
    ;
    t.pause = function(e) {
        return e || (e = this),
        this.call(e.setPaused, [!0], e)
    }
    ;
    t.setPosition = function(e, t) {
        0 > e && (e = 0);
        null == t && (t = 1);
        var n = e
          , r = !1;
        if (n >= this.duration && (this.loop ? n %= this.duration : (n = this.duration,
        r = !0)),
        n == this._prevPos)
            return r;
        var i = this._prevPos;
        if (this.position = this._prevPos = n,
        this._prevPosition = e,
        this._target)
            if (r)
                this._updateTargetProps(null , 1);
            else if (0 < this._steps.length) {
                for (var s = 0, o = this._steps.length; o > s && !(this._steps[s].t > n); s++)
                    ;
                s = this._steps[s - 1];
                this._updateTargetProps(s, (this._stepPosition = n - s.t) / s.d)
            }
        return 0 != t && 0 < this._actions.length && (this._useTicks ? this._runActions(n, n) : 1 == t && i > n ? (i != this.duration && this._runActions(i, this.duration),
        this._runActions(0, n, !0)) : this._runActions(i, n)),
        r && this.setPaused(!0),
        this.dispatchEvent("change"),
        r
    }
    ;
    t.tick = function(e) {
        this._paused || this.setPosition(this._prevPosition + e)
    }
    ;
    t.setPaused = function(t) {
        return this._paused = !!t,
        e._register(this, !t),
        this
    }
    ;
    t.w = t.wait;
    t.t = t.to;
    t.c = t.call;
    t.s = t.set;
    t.toString = function() {
        return "[Tween]"
    }
    ;
    t.clone = function() {
        throw "Tween can not be cloned."
    }
    ;
    t._updateTargetProps = function(t, n) {
        var r, i, s, o;
        if (t || 1 != n) {
            if (this.passive = !!t.v,
            this.passive)
                return;
            t.e && (n = t.e(n, 0, 1, 1));
            r = t.p0;
            i = t.p1
        } else
            this.passive = !1,
            r = i = this._curQueueProps;
        for (var u in this._initQueueProps) {
            null == (s = r[u]) && (r[u] = s = this._initQueueProps[u]);
            null == (o = i[u]) && (i[u] = o = s);
            s = s == o || 0 == n || 1 == n || "number" != typeof s ? 1 == n ? o : s : s + (o - s) * n;
            var a = !1;
            if (o = e._plugins[u])
                for (var f = 0, l = o.length; l > f; f++) {
                    var h = o[f].tween(this, u, s, r, i, n, !!t && r == i, !t);
                    h == e.IGNORE ? a = !0 : s = h
                }
            a || (this._target[u] = s)
        }
    }
    ;
    t._runActions = function(e, t, n) {
        var r = e
          , i = t
          , s = -1
          , o = this._actions.length
          , u = 1;
        for (e > t && (r = t,
        i = e,
        s = o,
        o = u = -1); (s += u) != o; ) {
            t = this._actions[s];
            var a = t.t;
            (a == i || a > r && i > a || n && a == e) && t.f.apply(t.o, t.p)
        }
    }
    ;
    t._appendQueueProps = function(t) {
        var n, r, i, s, o, u;
        for (u in t)
            if (void 0 === this._initQueueProps[u]) {
                if (r = this._target[u],
                n = e._plugins[u])
                    for (i = 0,
                    s = n.length; s > i; i++)
                        r = n[i].init(this, u, r);
                this._initQueueProps[u] = this._curQueueProps[u] = void 0 === r ? null : r
            }
        for (u in t) {
            if (r = this._curQueueProps[u],
            n = e._plugins[u])
                for (o = o || {},
                i = 0,
                s = n.length; s > i; i++)
                    n[i].step && n[i].step(this, u, r, t[u], o);
            this._curQueueProps[u] = t[u]
        }
        return o && this._appendQueueProps(o),
        this._curQueueProps
    }
    ;
    t._cloneProps = function(e) {
        var t = {}, n;
        for (n in e)
            t[n] = e[n];
        return t
    }
    ;
    t._addStep = function(e) {
        return 0 < e.d && (this._steps.push(e),
        e.t = this.duration,
        this.duration += e.d),
        this
    }
    ;
    t._addAction = function(e) {
        return e.t = this.duration,
        this._actions.push(e),
        this
    }
    ;
    t._set = function(e, t) {
        for (var n in e)
            t[n] = e[n]
    }
    ;
    createjs.Tween = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t, n) {
        this.initialize(e, t, n)
    }
      , t = e.prototype = new createjs.EventDispatcher;
    t.ignoreGlobalPause = !1;
    t.duration = 0;
    t.loop = !1;
    t.position = null ;
    t._paused = !1;
    t._tweens = null ;
    t._labels = null ;
    t._labelList = null ;
    t._prevPosition = 0;
    t._prevPos = -1;
    t._useTicks = !1;
    t.initialize = function(e, t, n) {
        this._tweens = [];
        n && (this._useTicks = n.useTicks,
        this.loop = n.loop,
        this.ignoreGlobalPause = n.ignoreGlobalPause,
        n.onChange && this.addEventListener("change", n.onChange));
        e && this.addTween.apply(this, e);
        this.setLabels(t);
        n && n.paused ? this._paused = !0 : createjs.Tween._register(this, !0);
        n && null != n.position && this.setPosition(n.position, createjs.Tween.NONE)
    }
    ;
    t.addTween = function(e) {
        var t = arguments.length;
        if (1 < t) {
            for (var n = 0; t > n; n++)
                this.addTween(arguments[n]);
            return arguments[0]
        }
        return 0 == t ? null : (this.removeTween(e),
        this._tweens.push(e),
        e.setPaused(!0),
        e._paused = !1,
        e._useTicks = this._useTicks,
        e.duration > this.duration && (this.duration = e.duration),
        0 <= this._prevPos && e.setPosition(this._prevPos, createjs.Tween.NONE),
        e)
    }
    ;
    t.removeTween = function(e) {
        var t = arguments.length;
        if (1 < t) {
            for (var n = !0, r = 0; t > r; r++)
                n = n && this.removeTween(arguments[r]);
            return n
        }
        if (0 == t)
            return !1;
        t = this._tweens;
        for (r = t.length; r--; )
            if (t[r] == e)
                return t.splice(r, 1),
                e.duration >= this.duration && this.updateDuration(),
                !0;
        return !1
    }
    ;
    t.addLabel = function(e, t) {
        this._labels[e] = t;
        var n = this._labelList;
        if (n) {
            for (var r = 0, i = n.length; i > r && !(t < n[r].position); r++)
                ;
            n.splice(r, 0, {
                label: e,
                position: t
            })
        }
    }
    ;
    t.setLabels = function(e) {
        this._labels = e ? e : {}
    }
    ;
    t.getLabels = function() {
        var e = this._labelList;
        if (!e) {
            var e = this._labelList = [], t = this._labels, n;
            for (n in t)
                e.push({
                    label: n,
                    position: t[n]
                });
            e.sort(function(e, t) {
                return e.position - t.position
            })
        }
        return e
    }
    ;
    t.getCurrentLabel = function() {
        var e = this.getLabels()
          , t = this.position
          , n = e.length;
        if (n) {
            for (var r = 0; n > r && !(t < e[r].position); r++)
                ;
            return 0 == r ? null : e[r - 1].label
        }
        return null
    }
    ;
    t.gotoAndPlay = function(e) {
        this.setPaused(!1);
        this._goto(e)
    }
    ;
    t.gotoAndStop = function(e) {
        this.setPaused(!0);
        this._goto(e)
    }
    ;
    t.setPosition = function(e, t) {
        0 > e && (e = 0);
        var n = this.loop ? e % this.duration : e
          , r = !this.loop && e >= this.duration;
        if (n == this._prevPos)
            return r;
        this._prevPosition = e;
        this.position = this._prevPos = n;
        for (var i = 0, s = this._tweens.length; s > i; i++)
            if (this._tweens[i].setPosition(n, t),
            n != this._prevPos)
                return !1;
        return r && this.setPaused(!0),
        this.dispatchEvent("change"),
        r
    }
    ;
    t.setPaused = function(e) {
        this._paused = !!e;
        createjs.Tween._register(this, !e)
    }
    ;
    t.updateDuration = function() {
        for (var e = this.duration = 0, t = this._tweens.length; t > e; e++) {
            var n = this._tweens[e];
            n.duration > this.duration && (this.duration = n.duration)
        }
    }
    ;
    t.tick = function(e) {
        this.setPosition(this._prevPosition + e)
    }
    ;
    t.resolve = function(e) {
        var t = parseFloat(e);
        return isNaN(t) && (t = this._labels[e]),
        t
    }
    ;
    t.toString = function() {
        return "[Timeline]"
    }
    ;
    t.clone = function() {
        throw "Timeline can not be cloned."
    }
    ;
    t._goto = function(e) {
        e = this.resolve(e);
        null != e && this.setPosition(e)
    }
    ;
    createjs.Timeline = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function() {
        throw "Ease cannot be instantiated."
    }
    ;
    e.linear = function(e) {
        return e
    }
    ;
    e.none = e.linear;
    e.get = function(e) {
        return -1 > e && (e = -1),
        1 < e && (e = 1),
        function(t) {
            return 0 == e ? t : 0 > e ? t * (t * -e + 1 + e) : t * ((2 - t) * e + (1 - e))
        }
    }
    ;
    e.getPowIn = function(e) {
        return function(t) {
            return Math.pow(t, e)
        }
    }
    ;
    e.getPowOut = function(e) {
        return function(t) {
            return 1 - Math.pow(1 - t, e)
        }
    }
    ;
    e.getPowInOut = function(e) {
        return function(t) {
            return 1 > (t *= 2) ? .5 * Math.pow(t, e) : 1 - .5 * Math.abs(Math.pow(2 - t, e))
        }
    }
    ;
    e.quadIn = e.getPowIn(2);
    e.quadOut = e.getPowOut(2);
    e.quadInOut = e.getPowInOut(2);
    e.cubicIn = e.getPowIn(3);
    e.cubicOut = e.getPowOut(3);
    e.cubicInOut = e.getPowInOut(3);
    e.quartIn = e.getPowIn(4);
    e.quartOut = e.getPowOut(4);
    e.quartInOut = e.getPowInOut(4);
    e.quintIn = e.getPowIn(5);
    e.quintOut = e.getPowOut(5);
    e.quintInOut = e.getPowInOut(5);
    e.sineIn = function(e) {
        return 1 - Math.cos(e * Math.PI / 2)
    }
    ;
    e.sineOut = function(e) {
        return Math.sin(e * Math.PI / 2)
    }
    ;
    e.sineInOut = function(e) {
        return -.5 * (Math.cos(Math.PI * e) - 1)
    }
    ;
    e.getBackIn = function(e) {
        return function(t) {
            return t * t * ((e + 1) * t - e)
        }
    }
    ;
    e.backIn = e.getBackIn(1.7);
    e.getBackOut = function(e) {
        return function(t) {
            return --t * t * ((e + 1) * t + e) + 1
        }
    }
    ;
    e.backOut = e.getBackOut(1.7);
    e.getBackInOut = function(e) {
        return e *= 1.525,
        function(t) {
            return 1 > (t *= 2) ? .5 * t * t * ((e + 1) * t - e) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
        }
    }
    ;
    e.backInOut = e.getBackInOut(1.7);
    e.circIn = function(e) {
        return -(Math.sqrt(1 - e * e) - 1)
    }
    ;
    e.circOut = function(e) {
        return Math.sqrt(1 - --e * e)
    }
    ;
    e.circInOut = function(e) {
        return 1 > (e *= 2) ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
    }
    ;
    e.bounceIn = function(t) {
        return 1 - e.bounceOut(1 - t)
    }
    ;
    e.bounceOut = function(e) {
        return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
    }
    ;
    e.bounceInOut = function(t) {
        return .5 > t ? .5 * e.bounceIn(2 * t) : .5 * e.bounceOut(2 * t - 1) + .5
    }
    ;
    e.getElasticIn = function(e, t) {
        var n = 2 * Math.PI;
        return function(r) {
            if (0 == r || 1 == r)
                return r;
            var i = t / n * Math.asin(1 / e);
            return -(e * Math.pow(2, 10 * (r -= 1)) * Math.sin((r - i) * n / t))
        }
    }
    ;
    e.elasticIn = e.getElasticIn(1, .3);
    e.getElasticOut = function(e, t) {
        var n = 2 * Math.PI;
        return function(r) {
            if (0 == r || 1 == r)
                return r;
            var i = t / n * Math.asin(1 / e);
            return e * Math.pow(2, -10 * r) * Math.sin((r - i) * n / t) + 1
        }
    }
    ;
    e.elasticOut = e.getElasticOut(1, .3);
    e.getElasticInOut = function(e, t) {
        var n = 2 * Math.PI;
        return function(r) {
            var i = t / n * Math.asin(1 / e);
            return 1 > (r *= 2) ? -.5 * e * Math.pow(2, 10 * (r -= 1)) * Math.sin((r - i) * n / t) : .5 * e * Math.pow(2, -10 * (r -= 1)) * Math.sin((r - i) * n / t) + 1
        }
    }
    ;
    e.elasticInOut = e.getElasticInOut(1, .3 * 1.5);
    createjs.Ease = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function() {
        throw "MotionGuidePlugin cannot be instantiated."
    }
    ;
    e.priority = 0;
    e._rotOffS;
    e._rotOffE;
    e._rotNormS;
    e._rotNormE;
    e.install = function() {
        return createjs.Tween.installPlugin(e, ["guide", "x", "y", "rotation"]),
        createjs.Tween.IGNORE
    }
    ;
    e.init = function(e, t, n) {
        var r = e.target;
        return r.hasOwnProperty("x") || (r.x = 0),
        r.hasOwnProperty("y") || (r.y = 0),
        r.hasOwnProperty("rotation") || (r.rotation = 0),
        "rotation" == t && (e.__needsRot = !0),
        "guide" == t ? null : n
    }
    ;
    e.step = function(t, n, r, i, s) {
        if ("rotation" == n && (t.__rotGlobalS = r,
        t.__rotGlobalE = i,
        e.testRotData(t, s)),
        "guide" != n)
            return i;
        var o;
        i.hasOwnProperty("path") || (i.path = []);
        n = i.path;
        if (i.hasOwnProperty("end") || (i.end = 1),
        i.hasOwnProperty("start") || (i.start = r && r.hasOwnProperty("end") && r.path === n ? r.end : 0),
        i.hasOwnProperty("_segments") && i._length)
            return i;
        r = n.length;
        if (!(6 <= r && 0 == (r - 2) % 4))
            throw "invalid 'path' data, please see documentation for valid paths";
        i._segments = [];
        i._length = 0;
        for (var u = 2; r > u; u += 4) {
            for (var a, f, l = n[u - 2], h = n[u - 1], p = n[u + 0], d = n[u + 1], v = n[u + 2], m = n[u + 3], g = l, y = h, b = 0, w = [], E = 1; 10 >= E; E++) {
                f = E / 10;
                var S = 1 - f;
                a = S * S * l + 2 * S * f * p + f * f * v;
                f = S * S * h + 2 * S * f * d + f * f * m;
                b += w[w.push(Math.sqrt((o = a - g) * o + (o = f - y) * o)) - 1];
                g = a;
                y = f
            }
            i._segments.push(b);
            i._segments.push(w);
            i._length += b
        }
        o = i.orient;
        i.orient = !0;
        n = {};
        return e.calc(i, i.start, n),
        t.__rotPathS = Number(n.rotation.toFixed(5)),
        e.calc(i, i.end, n),
        t.__rotPathE = Number(n.rotation.toFixed(5)),
        i.orient = !1,
        e.calc(i, i.end, s),
        i.orient = o,
        i.orient ? (t.__guideData = i,
        e.testRotData(t, s),
        i) : i
    }
    ;
    e.testRotData = function(e, t) {
        if (void 0 === e.__rotGlobalS || void 0 === e.__rotGlobalE) {
            if (e.__needsRot)
                return;
            e.__rotGlobalS = e.__rotGlobalE = void 0 !== e._curQueueProps.rotation ? e._curQueueProps.rotation : t.rotation = e.target.rotation || 0
        }
        if (void 0 !== e.__guideData) {
            var n = e.__guideData
              , r = e.__rotGlobalE - e.__rotGlobalS
              , i = e.__rotPathE - e.__rotPathS
              , s = r - i;
            if ("auto" == n.orient)
                180 < s ? s -= 360 : -180 > s && (s += 360);
            else if ("cw" == n.orient) {
                for (; 0 > s; )
                    s += 360;
                0 == s && 0 < r && 180 != r && (s += 360)
            } else if ("ccw" == n.orient) {
                for (s = r - (180 < i ? 360 - i : i); 0 < s; )
                    s -= 360;
                0 == s && 0 > r && -180 != r && (s -= 360)
            }
            n.rotDelta = s;
            n.rotOffS = e.__rotGlobalS - e.__rotPathS;
            e.__rotGlobalS = e.__rotGlobalE = e.__guideData = e.__needsRot = void 0
        }
    }
    ;
    e.tween = function(t, n, r, i, s, o, u) {
        s = s.guide;
        if (void 0 == s || s === i.guide)
            return r;
        if (s.lastRatio != o) {
            switch (e.calc(s, (s.end - s.start) * (u ? s.end : o) + s.start, t.target),
            s.orient) {
            case "cw":
            case "ccw":
            case "auto":
                t.target.rotation += s.rotOffS + s.rotDelta * o;
                break;
            default:
                t.target.rotation += s.rotOffS
            }
            s.lastRatio = o
        }
        return "rotation" != n || s.orient && "false" != s.orient ? t.target[n] : r
    }
    ;
    e.calc = function(t, n, r) {
        void 0 == t._segments && e.validate(t);
        void 0 == r && (r = {
            x: 0,
            y: 0,
            rotation: 0
        });
        var i = t._segments
          , s = t.path
          , o = t._length * n
          , u = i.length - 2;
        for (n = 0; o > i[n] && u > n; )
            o -= i[n],
            n += 2;
        for (var i = i[n + 1], a = 0, u = i.length - 1; o > i[a] && u > a; )
            o -= i[a],
            a++;
        o = a / ++u + o / (u * i[a]);
        n = 2 * n + 2;
        u = 1 - o;
        return r.x = u * u * s[n - 2] + 2 * u * o * s[n + 0] + o * o * s[n + 2],
        r.y = u * u * s[n - 1] + 2 * u * o * s[n + 1] + o * o * s[n + 3],
        t.orient && (r.rotation = 57.2957795 * Math.atan2((s[n + 1] - s[n - 1]) * u + (s[n + 3] - s[n + 1]) * o, (s[n + 0] - s[n - 2]) * u + (s[n + 2] - s[n + 0]) * o)),
        r
    }
    ;
    createjs.MotionGuidePlugin = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = createjs.TweenJS = createjs.TweenJS || {};
    e.version = "0.5.0";
    e.buildDate = "Wed, 25 Sep 2013 17:09:35 GMT"
})();
this.createjs = this.createjs || {};
(function() {
    var e = createjs.SoundJS = createjs.SoundJS || {};
    e.version = "0.5.0";
    e.buildDate = "Wed, 25 Sep 2013 17:09:35 GMT"
})();
this.createjs = this.createjs || {};
(function() {
    var e = function() {}
      , t = e.prototype;
    e.initialize = function(e) {
        e.addEventListener = t.addEventListener;
        e.on = t.on;
        e.removeEventListener = e.off = t.removeEventListener;
        e.removeAllEventListeners = t.removeAllEventListeners;
        e.hasEventListener = t.hasEventListener;
        e.dispatchEvent = t.dispatchEvent;
        e._dispatchEvent = t._dispatchEvent
    }
    ;
    t._listeners = null ;
    t._captureListeners = null ;
    t.initialize = function() {}
    ;
    t.addEventListener = function(e, t, n) {
        var r;
        r = n ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
        var i = r[e];
        return i && this.removeEventListener(e, t, n),
        i = r[e],
        i ? i.push(t) : r[e] = [t],
        t
    }
    ;
    t.on = function(e, t, n, r, i, s) {
        return t.handleEvent && (n = n || t,
        t = t.handleEvent),
        n = n || this,
        this.addEventListener(e, function(e) {
            t.call(n, e, i);
            r && e.remove()
        }, s)
    }
    ;
    t.removeEventListener = function(e, t, n) {
        if (n = n ? this._captureListeners : this._listeners) {
            var r = n[e];
            if (r)
                for (var i = 0, s = r.length; s > i; i++)
                    if (r[i] == t) {
                        1 == s ? delete n[e] : r.splice(i, 1);
                        break
                    }
        }
    }
    ;
    t.off = t.removeEventListener;
    t.removeAllEventListeners = function(e) {
        e ? (this._listeners && delete this._listeners[e],
        this._captureListeners && delete this._captureListeners[e]) : this._listeners = this._captureListeners = null
    }
    ;
    t.dispatchEvent = function(e, t) {
        if ("string" == typeof e) {
            var n = this._listeners;
            if (!n || !n[e])
                return !1;
            e = new createjs.Event(e)
        }
        if (e.target = t || this,
        e.bubbles && this.parent) {
            for (var r = this, n = [r]; r.parent; )
                n.push(r = r.parent);
            for (var i = n.length, r = i - 1; 0 <= r && !e.propagationStopped; r--)
                n[r]._dispatchEvent(e, 1 + (0 == r));
            for (r = 1; i > r && !e.propagationStopped; r++)
                n[r]._dispatchEvent(e, 3)
        } else
            this._dispatchEvent(e, 2);
        return e.defaultPrevented
    }
    ;
    t.hasEventListener = function(e) {
        var t = this._listeners
          , n = this._captureListeners;
        return !!(t && t[e] || n && n[e])
    }
    ;
    t.toString = function() {
        return "[EventDispatcher]"
    }
    ;
    t._dispatchEvent = function(e, t) {
        var n, r = 1 == t ? this._captureListeners : this._listeners;
        if (e && r && (r = r[e.type]) && (n = r.length)) {
            e.currentTarget = this;
            e.eventPhase = t;
            e.removed = !1;
            for (var r = r.slice(), i = 0; n > i && !e.immediatePropagationStopped; i++) {
                var s = r[i];
                s.handleEvent ? s.handleEvent(e) : s(e);
                e.removed && (this.off(e.type, s, 1 == t),
                e.removed = !1)
            }
        }
    }
    ;
    createjs.EventDispatcher = e
})();
this.createjs = this.createjs || {};
(function() {
    var e = function(e, t, n) {
        this.initialize(e, t, n)
    }
      , t = e.prototype;
    t.type = null ;
    t.target = null ;
    t.currentTarget = null ;
    t.eventPhase = 0;
    t.bubbles = !1;
    t.cancelable = !1;
    t.timeStamp = 0;
    t.defaultPrevented = !1;
    t.propagationStopped = !1;
    t.immediatePropagationStopped = !1;
    t.removed = !1;
    t.initialize = function(e, t, n) {
        this.type = e;
        this.bubbles = t;
        this.cancelable = n;
        this.timeStamp = (new Date).getTime()
    }
    ;
    t.preventDefault = function() {
        this.defaultPrevented = !0
    }
    ;
    t.stopPropagation = function() {
        this.propagationStopped = !0
    }
    ;
    t.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = this.propagationStopped = !0
    }
    ;
    t.remove = function() {
        this.removed = !0
    }
    ;
    t.clone = function() {
        return new e(this.type,this.bubbles,this.cancelable)
    }
    ;
    t.toString = function() {
        return "[Event (type=" + this.type + ")]"
    }
    ;
    createjs.Event = e
})();
this.createjs = this.createjs || {};
(function() {
    createjs.indexOf = function(e, t) {
        for (var n = 0, r = e.length; r > n; n++)
            if (t === e[n])
                return n;
        return -1
    }
})();
this.createjs = this.createjs || {};
(function() {
    createjs.proxy = function(e, t) {
        var n = Array.prototype.slice.call(arguments, 2);
        return function() {
            return e.apply(t, Array.prototype.slice.call(arguments, 0).concat(n))
        }
    }
})();
this.createjs = this.createjs || {};
(function() {
    function e() {
        throw "Sound cannot be instantiated"
    }
    function t(e, t) {
        this.init(e, t)
    }
    function n() {}
    e.DELIMITER = "|";
    e.AUDIO_TIMEOUT = 8e3;
    e.INTERRUPT_ANY = "any";
    e.INTERRUPT_EARLY = "early";
    e.INTERRUPT_LATE = "late";
    e.INTERRUPT_NONE = "none";
    e.PLAY_INITED = "playInited";
    e.PLAY_SUCCEEDED = "playSucceeded";
    e.PLAY_INTERRUPTED = "playInterrupted";
    e.PLAY_FINISHED = "playFinished";
    e.PLAY_FAILED = "playFailed";
    e.SUPPORTED_EXTENSIONS = "mp3 ogg mpeg wav m4a mp4 aiff wma mid".split(" ");
    e.EXTENSION_MAP = {
        m4a: "mp4"
    };
    e.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/;
    e.defaultInterruptBehavior = e.INTERRUPT_NONE;
    e.lastId = 0;
    e.activePlugin = null ;
    e.pluginsRegistered = !1;
    e.masterVolume = 1;
    e.masterMute = !1;
    e.instances = [];
    e.idHash = {};
    e.preloadHash = {};
    e.defaultSoundInstance = null ;
    e.addEventListener = null ;
    e.removeEventListener = null ;
    e.removeAllEventListeners = null ;
    e.dispatchEvent = null ;
    e.hasEventListener = null ;
    e._listeners = null ;
    createjs.EventDispatcher.initialize(e);
    e.sendFileLoadEvent = function(t) {
        if (e.preloadHash[t])
            for (var n = 0, r = e.preloadHash[t].length; r > n; n++) {
                var i = e.preloadHash[t][n];
                if (e.preloadHash[t][n] = !0,
                e.hasEventListener("fileload")) {
                    var s = new createjs.Event("fileload");
                    s.src = i.src;
                    s.id = i.id;
                    s.data = i.data;
                    e.dispatchEvent(s)
                }
            }
    }
    ;
    e.getPreloadHandlers = function() {
        return {
            callback: createjs.proxy(e.initLoad, e),
            types: ["sound"],
            extensions: e.SUPPORTED_EXTENSIONS
        }
    }
    ;
    e.registerPlugin = function(t) {
        return e.pluginsRegistered = !0,
        null == t ? !1 : t.isSupported() ? (e.activePlugin = new t,
        !0) : !1
    }
    ;
    e.registerPlugins = function(t) {
        for (var n = 0, r = t.length; r > n; n++)
            if (e.registerPlugin(t[n]))
                return !0;
        return !1
    }
    ;
    e.initializeDefaultPlugins = function() {
        return null != e.activePlugin ? !0 : e.pluginsRegistered ? !1 : e.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]) ? !0 : !1
    }
    ;
    e.isReady = function() {
        return null != e.activePlugin
    }
    ;
    e.getCapabilities = function() {
        return null == e.activePlugin ? null : e.activePlugin.capabilities
    }
    ;
    e.getCapability = function(t) {
        return null == e.activePlugin ? null : e.activePlugin.capabilities[t]
    }
    ;
    e.initLoad = function(t, n, r, i, s) {
        t = e.registerSound(t, r, i, !1, s);
        return null == t ? !1 : t
    }
    ;
    e.registerSound = function(n, r, i, s, o) {
        if (!e.initializeDefaultPlugins())
            return !1;
        n instanceof Object && (o = r,
        r = n.id,
        i = n.data,
        n = n.src);
        var u = e.parsePath(n, "sound", r, i);
        if (null == u)
            return !1;
        null != r && (e.idHash[r] = u.src);
        var f = null ;
        null != i && (isNaN(i.channels) ? isNaN(i) || (f = parseInt(i)) : f = parseInt(i.channels));
        var l = e.activePlugin.register(u.src, f);
        if (null != l && (null != l.numChannels && (f = l.numChannels),
        t.create(u.src, f),
        null != i && isNaN(i) ? i.channels = u.data.channels = f || t.maxPerChannel() : i = u.data = f || t.maxPerChannel(),
        null != l.tag ? u.tag = l.tag : l.src && (u.src = l.src),
        null != l.completeHandler && (u.completeHandler = l.completeHandler),
        l.type && (u.type = l.type)),
        0 != s)
            if (e.preloadHash[u.src] || (e.preloadHash[u.src] = []),
            e.preloadHash[u.src].push({
                src: n,
                id: r,
                data: i
            }),
            1 == e.preloadHash[u.src].length)
                null == o && (o = ""),
                e.activePlugin.preload(u.src, l, o);
            else if (1 == e.preloadHash[u.src][0])
                return !0;
        return u
    }
    ;
    e.registerManifest = function(e, t) {
        for (var n = [], r = 0, i = e.length; i > r; r++)
            n[r] = createjs.Sound.registerSound(e[r].src, e[r].id, e[r].data, e[r].preload, t);
        return n
    }
    ;
    e.removeSound = function(n) {
        if (null == e.activePlugin)
            return !1;
        n instanceof Object && (n = n.src);
        n = e.getSrcById(n);
        n = e.parsePath(n);
        if (null == n)
            return !1;
        n = n.src;
        for (var r in e.idHash)
            e.idHash[r] == n && delete e.idHash[r];
        return t.removeSrc(n),
        delete e.preloadHash[n],
        e.activePlugin.removeSound(n),
        !0
    }
    ;
    e.removeManifest = function(e) {
        for (var t = [], n = 0, r = e.length; r > n; n++)
            t[n] = createjs.Sound.removeSound(e[n].src);
        return t
    }
    ;
    e.removeAllSounds = function() {
        e.idHash = {};
        e.preloadHash = {};
        t.removeAll();
        e.activePlugin.removeAllSounds()
    }
    ;
    e.loadComplete = function(t) {
        var n = e.parsePath(t, "sound");
        return t = n ? e.getSrcById(n.src) : e.getSrcById(t),
        1 == e.preloadHash[t][0]
    }
    ;
    e.parsePath = function(t, n, r, i) {
        "string" != typeof t && (t = t.toString());
        t = t.split(e.DELIMITER);
        n = {
            type: n || "sound",
            id: r,
            data: i
        };
        r = e.getCapabilities();
        i = 0;
        for (var s = t.length; s > i; i++) {
            var o = t[i]
              , u = o.match(e.FILE_PATTERN);
            if (null == u)
                return !1;
            var a = u[4]
              , u = u[5];
            if (r[u] && -1 < createjs.indexOf(e.SUPPORTED_EXTENSIONS, u))
                return n.name = a,
                n.src = o,
                n.extension = u,
                n
        }
        return null
    }
    ;
    e.play = function(t, n, r, i, s, o, u) {
        t = e.createInstance(t);
        return e.playInstance(t, n, r, i, s, o, u) || t.playFailed(),
        t
    }
    ;
    e.createInstance = function(n) {
        if (!e.initializeDefaultPlugins())
            return e.defaultSoundInstance;
        n = e.getSrcById(n);
        n = e.parsePath(n, "sound");
        var r = null ;
        return null != n && null != n.src ? (t.create(n.src),
        r = e.activePlugin.create(n.src)) : r = e.defaultSoundInstance,
        r.uniqueId = e.lastId++,
        r
    }
    ;
    e.setVolume = function(t) {
        if (null == Number(t))
            return !1;
        if (t = Math.max(0, Math.min(1, t)),
        e.masterVolume = t,
        !this.activePlugin || !this.activePlugin.setVolume || !this.activePlugin.setVolume(t))
            for (var n = this.instances, r = 0, i = n.length; i > r; r++)
                n[r].setMasterVolume(t)
    }
    ;
    e.getVolume = function() {
        return e.masterVolume
    }
    ;
    e.setMute = function(e) {
        if (null == e || void 0 == e)
            return !1;
        if (this.masterMute = e,
        !this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(e))
            for (var t = this.instances, n = 0, r = t.length; r > n; n++)
                t[n].setMasterMute(e);
        return !0
    }
    ;
    e.getMute = function() {
        return this.masterMute
    }
    ;
    e.stop = function() {
        for (var e = this.instances, t = e.length; t--; )
            e[t].stop()
    }
    ;
    e.playInstance = function(t, n, r, i, s, o, u) {
        if (n instanceof Object && (r = n.delay,
        i = n.offset,
        s = n.loop,
        o = n.volume,
        u = n.pan),
        n = n || e.defaultInterruptBehavior,
        null == r && (r = 0),
        null == i && (i = t.getPosition()),
        null == s && (s = 0),
        null == o && (o = t.volume),
        null == u && (u = t.pan),
        0 == r) {
            if (!e.beginPlaying(t, n, i, s, o, u))
                return !1
        } else
            r = setTimeout(function() {
                e.beginPlaying(t, n, i, s, o, u)
            }, r),
            t.delayTimeoutId = r;
        return this.instances.push(t),
        !0
    }
    ;
    e.beginPlaying = function(e, n, r, i, s, o) {
        return t.add(e, n) ? e.beginPlaying(r, i, s, o) ? !0 : (e = createjs.indexOf(this.instances, e),
        -1 < e && this.instances.splice(e, 1),
        !1) : !1
    }
    ;
    e.getSrcById = function(t) {
        return null == e.idHash || null == e.idHash[t] ? t : e.idHash[t]
    }
    ;
    e.playFinished = function(e) {
        t.remove(e);
        e = createjs.indexOf(this.instances, e);
        -1 < e && this.instances.splice(e, 1)
    }
    ;
    createjs.Sound = e;
    t.channels = {};
    t.create = function(e, n) {
        return null == t.get(e) ? (t.channels[e] = new t(e,n),
        !0) : !1
    }
    ;
    t.removeSrc = function(e) {
        var n = t.get(e);
        return null == n ? !1 : (n.removeAll(),
        delete t.channels[e],
        !0)
    }
    ;
    t.removeAll = function() {
        for (var e in t.channels)
            t.channels[e].removeAll();
        t.channels = {}
    }
    ;
    t.add = function(e, n) {
        var r = t.get(e.src);
        return null == r ? !1 : r.add(e, n)
    }
    ;
    t.remove = function(e) {
        var n = t.get(e.src);
        return null == n ? !1 : (n.remove(e),
        !0)
    }
    ;
    t.maxPerChannel = function() {
        return r.maxDefault
    }
    ;
    t.get = function(e) {
        return t.channels[e]
    }
    ;
    var r = t.prototype;
    r.src = null ;
    r.max = null ;
    r.maxDefault = 100;
    r.length = 0;
    r.init = function(e, t) {
        this.src = e;
        this.max = t || this.maxDefault;
        -1 == this.max && this.max == this.maxDefault;
        this.instances = []
    }
    ;
    r.get = function(e) {
        return this.instances[e]
    }
    ;
    r.add = function(e, t) {
        return this.getSlot(t, e) ? (this.instances.push(e),
        this.length++,
        !0) : !1
    }
    ;
    r.remove = function(e) {
        e = createjs.indexOf(this.instances, e);
        return -1 == e ? !1 : (this.instances.splice(e, 1),
        this.length--,
        !0)
    }
    ;
    r.removeAll = function() {
        for (var e = this.length - 1; 0 <= e; e--)
            this.instances[e].stop()
    }
    ;
    r.getSlot = function(t) {
        for (var n, r, i = 0, s = this.max; s > i; i++) {
            if (n = this.get(i),
            null == n)
                return !0;
            (t != e.INTERRUPT_NONE || n.playState == e.PLAY_FINISHED) && (0 != i ? n.playState == e.PLAY_FINISHED || n.playState == e.PLAY_INTERRUPTED || n.playState == e.PLAY_FAILED ? r = n : (t == e.INTERRUPT_EARLY && n.getPosition() < r.getPosition() || t == e.INTERRUPT_LATE && n.getPosition() > r.getPosition()) && (r = n) : r = n)
        }
        return null != r ? (r.interrupt(),
        this.remove(r),
        !0) : !1
    }
    ;
    r.toString = function() {
        return "[Sound SoundChannel]"
    }
    ;
    e.defaultSoundInstance = new function() {
        this.isDefault = !0;
        this.addEventListener = this.removeEventListener = this.removeAllEventListener = this.dispatchEvent = this.hasEventListener = this._listeners = this.interrupt = this.playFailed = this.pause = this.resume = this.play = this.beginPlaying = this.cleanUp = this.stop = this.setMasterVolume = this.setVolume = this.mute = this.setMute = this.getMute = this.setPan = this.getPosition = this.setPosition = function() {
            return !1
        }
        ;
        this.getVolume = this.getPan = this.getDuration = function() {
            return 0
        }
        ;
        this.playState = e.PLAY_FAILED;
        this.toString = function() {
            return "[Sound Default Sound Instance]"
        }
    }
    ;
    null == createjs.proxy && (createjs.proxy = function() {
        throw "Proxy has been moved to an external file, and must be included separately."
    }
    );
    n.init = function() {
        var e = window.navigator.userAgent;
        n.isFirefox = -1 < e.indexOf("Firefox");
        n.isOpera = null != window.opera;
        n.isChrome = -1 < e.indexOf("Chrome");
        n.isIOS = -1 < e.indexOf("iPod") || -1 < e.indexOf("iPhone") || -1 < e.indexOf("iPad");
        n.isAndroid = -1 < e.indexOf("Android");
        n.isBlackberry = -1 < e.indexOf("Blackberry")
    }
    ;
    n.init();
    createjs.Sound.BrowserDetect = n
})();
this.createjs = this.createjs || {};
(function() {
    function e() {
        this.init()
    }
    e.capabilities = null ;
    e.isSupported = function() {
        var t = createjs.Sound.BrowserDetect.isIOS || createjs.Sound.BrowserDetect.isAndroid || createjs.Sound.BrowserDetect.isBlackberry;
        return "file:" != location.protocol || t || this.isFileXHRSupported() ? (e.generateCapabilities(),
        null == e.context ? !1 : !0) : !1
    }
    ;
    e.isFileXHRSupported = function() {
        var e = !0
          , t = new XMLHttpRequest;
        try {
            t.open("GET", "fail.fail", !1)
        } catch (n) {
            return e = !1
        }
        t.onerror = function() {
            e = !1
        }
        ;
        t.onload = function() {
            e = 404 == this.status || 200 == this.status || 0 == this.status && "" != this.response
        }
        ;
        try {
            t.send()
        } catch (r) {
            e = !1
        }
        return e
    }
    ;
    e.generateCapabilities = function() {
        if (null == e.capabilities) {
            var t = document.createElement("audio");
            if (null == t.canPlayType)
                return null ;
            if (window.webkitAudioContext)
                e.context = new webkitAudioContext;
            else {
                if (!window.AudioContext)
                    return null ;
                e.context = new AudioContext
            }
            e.compatibilitySetUp();
            e.playEmptySound();
            e.capabilities = {
                panning: !0,
                volume: !0,
                tracks: -1
            };
            for (var n = createjs.Sound.SUPPORTED_EXTENSIONS, r = createjs.Sound.EXTENSION_MAP, i = 0, s = n.length; s > i; i++) {
                var o = n[i]
                  , u = r[o] || o;
                e.capabilities[o] = "no" != t.canPlayType("audio/" + o) && "" != t.canPlayType("audio/" + o) || "no" != t.canPlayType("audio/" + u) && "" != t.canPlayType("audio/" + u)
            }
            2 > e.context.destination.numberOfChannels && (e.capabilities.panning = !1);
            e.dynamicsCompressorNode = e.context.createDynamicsCompressor();
            e.dynamicsCompressorNode.connect(e.context.destination);
            e.gainNode = e.context.createGain();
            e.gainNode.connect(e.dynamicsCompressorNode)
        }
    }
    ;
    e.compatibilitySetUp = function() {
        if (!e.context.createGain) {
            e.context.createGain = e.context.createGainNode;
            var t = e.context.createBufferSource();
            t.__proto__.start = t.__proto__.noteGrainOn;
            t.__proto__.stop = t.__proto__.noteOff;
            this.panningModel = 0
        }
    }
    ;
    e.playEmptySound = function() {
        var e = this.context.createBuffer(1, 1, 22050)
          , t = this.context.createBufferSource();
        t.buffer = e;
        t.connect(this.context.destination);
        t.start(0, 0, 0)
    }
    ;
    var t = e.prototype;
    t.capabilities = null ;
    t.volume = 1;
    t.context = null ;
    t.panningModel = "equalpower";
    t.dynamicsCompressorNode = null ;
    t.gainNode = null ;
    t.arrayBuffers = null ;
    t.init = function() {
        this.capabilities = e.capabilities;
        this.arrayBuffers = {};
        this.context = e.context;
        this.gainNode = e.gainNode;
        this.dynamicsCompressorNode = e.dynamicsCompressorNode
    }
    ;
    t.register = function(e) {
        this.arrayBuffers[e] = !0;
        return {
            tag: new createjs.WebAudioPlugin.Loader(e,this)
        }
    }
    ;
    t.isPreloadStarted = function(e) {
        return null != this.arrayBuffers[e]
    }
    ;
    t.isPreloadComplete = function(e) {
        return !(null == this.arrayBuffers[e] || 1 == this.arrayBuffers[e])
    }
    ;
    t.removeFromPreload = function(e) {
        delete this.arrayBuffers[e]
    }
    ;
    t.removeSound = function(e) {
        delete this.arrayBuffers[e]
    }
    ;
    t.removeAllSounds = function() {
        this.arrayBuffers = {}
    }
    ;
    t.addPreloadResults = function(e, t) {
        this.arrayBuffers[e] = t
    }
    ;
    t.handlePreloadComplete = function() {
        createjs.Sound.sendFileLoadEvent(this.src)
    }
    ;
    t.preload = function(e, t, n) {
        this.arrayBuffers[e] = !0;
        e = new createjs.WebAudioPlugin.Loader(e,this);
        e.onload = this.handlePreloadComplete;
        null != n && (e.src = n + e.src);
        e.load()
    }
    ;
    t.create = function(e) {
        return this.isPreloadStarted(e) || this.preload(e),
        new createjs.WebAudioPlugin.SoundInstance(e,this)
    }
    ;
    t.setVolume = function(e) {
        return this.volume = e,
        this.updateVolume(),
        !0
    }
    ;
    t.updateVolume = function() {
        var e = createjs.Sound.masterMute ? 0 : this.volume;
        e != this.gainNode.gain.value && (this.gainNode.gain.value = e)
    }
    ;
    t.getVolume = function() {
        return this.volume
    }
    ;
    t.setMute = function() {
        return this.updateVolume(),
        !0
    }
    ;
    t.toString = function() {
        return "[WebAudioPlugin]"
    }
    ;
    createjs.WebAudioPlugin = e
})();
(function() {
    function e(e, t) {
        this.init(e, t)
    }
    var t = e.prototype;
    t.src = null ;
    t.uniqueId = -1;
    t.playState = null ;
    t.owner = null ;
    t.offset = 0;
    t.delay = 0;
    t._volume = 1;
    Object.defineProperty(t, "volume", {
        get: function() {
            return this._volume
        },
        set: function(e) {
            return null == Number(e) ? !1 : (e = Math.max(0, Math.min(1, e)),
            this._volume = e,
            this.updateVolume(),
            void 0)
        }
    });
    t._pan = 0;
    Object.defineProperty(t, "pan", {
        get: function() {
            return this._pan
        },
        set: function(e) {
            return this.owner.capabilities.panning && null != Number(e) ? (e = Math.max(-1, Math.min(1, e)),
            this._pan = e,
            this.panNode.setPosition(e, 0, -.5),
            void 0) : !1
        }
    });
    t.duration = 0;
    t.remainingLoops = 0;
    t.delayTimeoutId = null ;
    t.soundCompleteTimeout = null ;
    t.panNode = null ;
    t.gainNode = null ;
    t.sourceNode = null ;
    t.sourceNodeNext = null ;
    t.muted = !1;
    t.paused = !1;
    t.startTime = 0;
    t.addEventListener = null ;
    t.removeEventListener = null ;
    t.removeAllEventListeners = null ;
    t.dispatchEvent = null ;
    t.hasEventListener = null ;
    t._listeners = null ;
    t.endedHandler = null ;
    t.readyHandler = null ;
    t.stalledHandler = null ;
    t.sendEvent = function(e) {
        e = new createjs.Event(e);
        this.dispatchEvent(e)
    }
    ;
    t.init = function(e, t) {
        this.owner = t;
        this.src = e;
        this.panNode = this.owner.context.createPanner();
        this.panNode.panningModel = this.owner.panningModel;
        this.gainNode = this.owner.context.createGain();
        this.gainNode.connect(this.panNode);
        this.owner.isPreloadComplete(this.src) && (this.duration = 1e3 * this.owner.arrayBuffers[this.src].duration);
        this.endedHandler = createjs.proxy(this.handleSoundComplete, this);
        this.readyHandler = createjs.proxy(this.handleSoundReady, this);
        this.stalledHandler = createjs.proxy(this.handleSoundStalled, this)
    }
    ;
    t.cleanUp = function() {
        this.sourceNode && this.sourceNode.playbackState != this.sourceNode.UNSCHEDULED_STATE && (this.sourceNode = this.cleanUpAudioNode(this.sourceNode),
        this.sourceNodeNext = this.cleanUpAudioNode(this.sourceNodeNext));
        0 != this.panNode.numberOfOutputs && this.panNode.disconnect(0);
        clearTimeout(this.delayTimeoutId);
        clearTimeout(this.soundCompleteTimeout);
        this.startTime = 0;
        null != window.createjs && createjs.Sound.playFinished(this)
    }
    ;
    t.cleanUpAudioNode = function(e) {
        return e && (e.stop(0),
        e.disconnect(this.gainNode),
        e = null ),
        e
    }
    ;
    t.interrupt = function() {
        this.playState = createjs.Sound.PLAY_INTERRUPTED;
        this.cleanUp();
        this.paused = !1;
        this.sendEvent("interrupted")
    }
    ;
    t.handleSoundStalled = function() {
        this.sendEvent("failed")
    }
    ;
    t.handleSoundReady = function() {
        if (null != window.createjs) {
            if (1e3 * this.offset > this.getDuration())
                return this.playFailed(),
                void 0;
            0 > this.offset && (this.offset = 0);
            this.playState = createjs.Sound.PLAY_SUCCEEDED;
            this.paused = !1;
            this.panNode.connect(this.owner.gainNode);
            var e = this.owner.arrayBuffers[this.src].duration;
            this.sourceNode = this.createAndPlayAudioNode(this.owner.context.currentTime - e, this.offset);
            this.duration = 1e3 * e;
            this.startTime = this.sourceNode.startTime - this.offset;
            this.soundCompleteTimeout = setTimeout(this.endedHandler, 1e3 * (e - this.offset));
            0 != this.remainingLoops && (this.sourceNodeNext = this.createAndPlayAudioNode(this.startTime, 0))
        }
    }
    ;
    t.createAndPlayAudioNode = function(e, t) {
        var n = this.owner.context.createBufferSource();
        return n.buffer = this.owner.arrayBuffers[this.src],
        n.connect(this.gainNode),
        this.owner.context.currentTime,
        n.startTime = e + n.buffer.duration,
        n.start(n.startTime, t, n.buffer.duration - t),
        n
    }
    ;
    t.play = function(e, t, n, r, i, s) {
        this.cleanUp();
        createjs.Sound.playInstance(this, e, t, n, r, i, s)
    }
    ;
    t.beginPlaying = function(e, t, n, r) {
        return null != window.createjs && this.src ? (this.offset = e / 1e3,
        this.remainingLoops = t,
        this.volume = n,
        this.pan = r,
        this.owner.isPreloadComplete(this.src) ? (this.handleSoundReady(null ),
        this.sendEvent("succeeded"),
        1) : (this.playFailed(),
        void 0)) : void 0
    }
    ;
    t.pause = function() {
        return this.paused || this.playState != createjs.Sound.PLAY_SUCCEEDED ? !1 : (this.paused = !0,
        this.offset = this.owner.context.currentTime - this.startTime,
        this.cleanUpAudioNode(this.sourceNode),
        this.cleanUpAudioNode(this.sourceNodeNext),
        0 != this.panNode.numberOfOutputs && this.panNode.disconnect(),
        clearTimeout(this.delayTimeoutId),
        clearTimeout(this.soundCompleteTimeout),
        !0)
    }
    ;
    t.resume = function() {
        return this.paused ? (this.handleSoundReady(null ),
        !0) : !1
    }
    ;
    t.stop = function() {
        return this.playState = createjs.Sound.PLAY_FINISHED,
        this.cleanUp(),
        this.offset = 0,
        !0
    }
    ;
    t.setVolume = function(e) {
        return this.volume = e,
        !0
    }
    ;
    t.updateVolume = function() {
        var e = this.muted ? 0 : this._volume;
        return e != this.gainNode.gain.value ? (this.gainNode.gain.value = e,
        !0) : !1
    }
    ;
    t.getVolume = function() {
        return this.volume
    }
    ;
    t.setMute = function(e) {
        return null == e || void 0 == e ? !1 : (this.muted = e,
        this.updateVolume(),
        !0)
    }
    ;
    t.getMute = function() {
        return this.muted
    }
    ;
    t.setPan = function(e) {
        return this.pan = e,
        this.pan != e ? !1 : void 0
    }
    ;
    t.getPan = function() {
        return this.pan
    }
    ;
    t.getPosition = function() {
        return 1e3 * (this.paused || null == this.sourceNode ? this.offset : this.owner.context.currentTime - this.startTime)
    }
    ;
    t.setPosition = function(e) {
        return this.offset = e / 1e3,
        this.sourceNode && this.sourceNode.playbackState != this.sourceNode.UNSCHEDULED_STATE && (this.cleanUpAudioNode(this.sourceNode),
        this.cleanUpAudioNode(this.sourceNodeNext),
        clearTimeout(this.soundCompleteTimeout)),
        this.paused || this.playState != createjs.Sound.PLAY_SUCCEEDED || this.handleSoundReady(null ),
        !0
    }
    ;
    t.getDuration = function() {
        return this.duration
    }
    ;
    t.handleSoundComplete = function() {
        return this.offset = 0,
        0 != this.remainingLoops ? (this.remainingLoops--,
        this.sourceNodeNext ? (this.cleanUpAudioNode(this.sourceNode),
        this.sourceNode = this.sourceNodeNext,
        this.startTime = this.sourceNode.startTime,
        this.sourceNodeNext = this.createAndPlayAudioNode(this.startTime, 0),
        this.soundCompleteTimeout = setTimeout(this.endedHandler, this.duration)) : this.handleSoundReady(null ),
        this.sendEvent("loop"),
        void 0) : (null != window.createjs && (this.playState = createjs.Sound.PLAY_FINISHED,
        this.cleanUp(),
        this.sendEvent("complete")),
        void 0)
    }
    ;
    t.playFailed = function() {
        null != window.createjs && (this.playState = createjs.Sound.PLAY_FAILED,
        this.cleanUp(),
        this.sendEvent("failed"))
    }
    ;
    t.toString = function() {
        return "[WebAudioPlugin SoundInstance]"
    }
    ;
    createjs.EventDispatcher.initialize(e.prototype);
    createjs.WebAudioPlugin.SoundInstance = e
})();
(function() {
    function e(e, t) {
        this.init(e, t)
    }
    var t = e.prototype;
    t.request = null ;
    t.owner = null ;
    t.progress = -1;
    t.src = null ;
    t.originalSrc = null ;
    t.result = null ;
    t.onload = null ;
    t.onprogress = null ;
    t.onError = null ;
    t.init = function(e, t) {
        this.originalSrc = this.src = e;
        this.owner = t
    }
    ;
    t.load = function(e) {
        null != e && (this.src = e);
        this.request = new XMLHttpRequest;
        this.request.open("GET", this.src, !0);
        this.request.responseType = "arraybuffer";
        this.request.onload = createjs.proxy(this.handleLoad, this);
        this.request.onError = createjs.proxy(this.handleError, this);
        this.request.onprogress = createjs.proxy(this.handleProgress, this);
        this.request.send()
    }
    ;
    t.handleProgress = function(e, t) {
        this.progress = e / t;
        null != this.onprogress && this.onprogress({
            loaded: e,
            total: t,
            progress: this.progress
        })
    }
    ;
    t.handleLoad = function() {
        this.owner.context.decodeAudioData(this.request.response, createjs.proxy(this.handleAudioDecoded, this), createjs.proxy(this.handleError, this))
    }
    ;
    t.handleAudioDecoded = function(e) {
        this.progress = 1;
        this.result = e;
        this.src = this.originalSrc;
        this.owner.addPreloadResults(this.src, this.result);
        this.onload && this.onload()
    }
    ;
    t.handleError = function(e) {
        this.owner.removeSound(this.src);
        this.onerror && this.onerror(e)
    }
    ;
    t.toString = function() {
        return "[WebAudioPlugin Loader]"
    }
    ;
    createjs.WebAudioPlugin.Loader = e
})();
this.createjs = this.createjs || {};
(function() {
    function e() {
        this.init()
    }
    e.MAX_INSTANCES = 30;
    e.capabilities = null ;
    e.AUDIO_READY = "canplaythrough";
    e.AUDIO_ENDED = "ended";
    e.AUDIO_SEEKED = "seeked";
    e.AUDIO_ERROR = "error";
    e.AUDIO_STALLED = "stalled";
    e.enableIOS = !1;
    e.isSupported = function() {
        if (createjs.Sound.BrowserDetect.isIOS && !e.enableIOS)
            return !1;
        e.generateCapabilities();
        return null == e.tag || null == e.capabilities ? !1 : !0
    }
    ;
    e.generateCapabilities = function() {
        if (null == e.capabilities) {
            var t = e.tag = document.createElement("audio");
            if (null == t.canPlayType)
                return null ;
            e.capabilities = {
                panning: !0,
                volume: !0,
                tracks: -1
            };
            for (var n = createjs.Sound.SUPPORTED_EXTENSIONS, r = createjs.Sound.EXTENSION_MAP, i = 0, s = n.length; s > i; i++) {
                var o = n[i]
                  , u = r[o] || o;
                e.capabilities[o] = "no" != t.canPlayType("audio/" + o) && "" != t.canPlayType("audio/" + o) || "no" != t.canPlayType("audio/" + u) && "" != t.canPlayType("audio/" + u)
            }
        }
    }
    ;
    var t = e.prototype;
    t.capabilities = null ;
    t.audioSources = null ;
    t.defaultNumChannels = 2;
    t.loadedHandler = null ;
    t.init = function() {
        this.capabilities = e.capabilities;
        this.audioSources = {}
    }
    ;
    t.register = function(e, t) {
        this.audioSources[e] = !0;
        for (var n = createjs.HTMLAudioPlugin.TagPool.get(e), r = null , i = t || this.defaultNumChannels, s = 0; i > s; s++)
            r = this.createTag(e),
            n.add(r);
        if (r.id = e,
        this.loadedHandler = createjs.proxy(this.handleTagLoad, this),
        r.addEventListener && r.addEventListener("canplaythrough", this.loadedHandler),
        null == r.onreadystatechange)
            r.onreadystatechange = this.loadedHandler;
        else {
            var o = r.onreadystatechange;
            r.onreadystatechange = function() {
                o();
                this.loadedHandler()
            }
        }
        return {
            tag: r,
            numChannels: i
        }
    }
    ;
    t.handleTagLoad = function(e) {
        e.target.removeEventListener && e.target.removeEventListener("canplaythrough", this.loadedHandler);
        e.target.onreadystatechange = null ;
        e.target.src != e.target.id && createjs.HTMLAudioPlugin.TagPool.checkSrc(e.target.id)
    }
    ;
    t.createTag = function(e) {
        var t = document.createElement("audio");
        return t.autoplay = !1,
        t.preload = "none",
        t.src = e,
        t
    }
    ;
    t.removeSound = function(e) {
        delete this.audioSources[e];
        createjs.HTMLAudioPlugin.TagPool.remove(e)
    }
    ;
    t.removeAllSounds = function() {
        this.audioSources = {};
        createjs.HTMLAudioPlugin.TagPool.removeAll()
    }
    ;
    t.create = function(e) {
        if (!this.isPreloadStarted(e)) {
            var t = createjs.HTMLAudioPlugin.TagPool.get(e)
              , n = this.createTag(e);
            n.id = e;
            t.add(n);
            this.preload(e, {
                tag: n
            })
        }
        return new createjs.HTMLAudioPlugin.SoundInstance(e,this)
    }
    ;
    t.isPreloadStarted = function(e) {
        return null != this.audioSources[e]
    }
    ;
    t.preload = function(e, t, n) {
        this.audioSources[e] = !0;
        null != n && (t.tag.src = n + e);
        new createjs.HTMLAudioPlugin.Loader(e,t.tag)
    }
    ;
    t.toString = function() {
        return "[HTMLAudioPlugin]"
    }
    ;
    createjs.HTMLAudioPlugin = e
})();
(function() {
    function e(e, t) {
        this.init(e, t)
    }
    var t = e.prototype;
    t.src = null ;
    t.uniqueId = -1;
    t.playState = null ;
    t.owner = null ;
    t.loaded = !1;
    t.offset = 0;
    t.delay = 0;
    t._volume = 1;
    Object.defineProperty(t, "volume", {
        get: function() {
            return this._volume
        },
        set: function(e) {
            null != Number(e) && (e = Math.max(0, Math.min(1, e)),
            this._volume = e,
            this.updateVolume())
        }
    });
    t.pan = 0;
    t.duration = 0;
    t.remainingLoops = 0;
    t.delayTimeoutId = null ;
    t.tag = null ;
    t.muted = !1;
    t.paused = !1;
    t.addEventListener = null ;
    t.removeEventListener = null ;
    t.removeAllEventListeners = null ;
    t.dispatchEvent = null ;
    t.hasEventListener = null ;
    t._listeners = null ;
    t.endedHandler = null ;
    t.readyHandler = null ;
    t.stalledHandler = null ;
    t.loopHandler = null ;
    t.init = function(e, t) {
        this.src = e;
        this.owner = t;
        this.endedHandler = createjs.proxy(this.handleSoundComplete, this);
        this.readyHandler = createjs.proxy(this.handleSoundReady, this);
        this.stalledHandler = createjs.proxy(this.handleSoundStalled, this);
        this.loopHandler = createjs.proxy(this.handleSoundLoop, this)
    }
    ;
    t.sendEvent = function(e) {
        e = new createjs.Event(e);
        this.dispatchEvent(e)
    }
    ;
    t.cleanUp = function() {
        var e = this.tag;
        if (null != e) {
            e.pause();
            e.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_ENDED, this.endedHandler, !1);
            e.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_READY, this.readyHandler, !1);
            e.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1);
            try {
                e.currentTime = 0
            } catch (t) {}
            createjs.HTMLAudioPlugin.TagPool.setInstance(this.src, e);
            this.tag = null
        }
        clearTimeout(this.delayTimeoutId);
        null != window.createjs && createjs.Sound.playFinished(this)
    }
    ;
    t.interrupt = function() {
        null != this.tag && (this.playState = createjs.Sound.PLAY_INTERRUPTED,
        this.cleanUp(),
        this.paused = !1,
        this.sendEvent("interrupted"))
    }
    ;
    t.play = function(e, t, n, r, i, s) {
        this.cleanUp();
        createjs.Sound.playInstance(this, e, t, n, r, i, s)
    }
    ;
    t.beginPlaying = function(e, t, n, r) {
        if (null == window.createjs)
            return -1;
        var i = this.tag = createjs.HTMLAudioPlugin.TagPool.getInstance(this.src);
        return null == i ? (this.playFailed(),
        -1) : (i.addEventListener(createjs.HTMLAudioPlugin.AUDIO_ENDED, this.endedHandler, !1),
        this.offset = e,
        this.volume = n,
        this.pan = r,
        this.updateVolume(),
        this.remainingLoops = t,
        4 !== i.readyState ? (i.addEventListener(createjs.HTMLAudioPlugin.AUDIO_READY, this.readyHandler, !1),
        i.addEventListener(createjs.HTMLAudioPlugin.AUDIO_STALLED, this.stalledHandler, !1),
        i.preload = "auto",
        i.load()) : this.handleSoundReady(null ),
        this.sendEvent("succeeded"),
        1)
    }
    ;
    t.handleSoundStalled = function() {
        this.cleanUp();
        this.sendEvent("failed")
    }
    ;
    t.handleSoundReady = function() {
        if (null != window.createjs) {
            if (this.duration = 1e3 * this.tag.duration,
            this.playState = createjs.Sound.PLAY_SUCCEEDED,
            this.paused = !1,
            this.tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_READY, this.readyHandler, !1),
            this.offset >= this.getDuration())
                return this.playFailed(),
                void 0;
            0 < this.offset && (this.tag.currentTime = .001 * this.offset);
            -1 == this.remainingLoops && (this.tag.loop = !0);
            0 != this.remainingLoops && (this.tag.addEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1),
            this.tag.loop = !0);
            this.tag.play()
        }
    }
    ;
    t.pause = function() {
        return this.paused || this.playState != createjs.Sound.PLAY_SUCCEEDED || null == this.tag ? !1 : (this.paused = !0,
        this.tag.pause(),
        clearTimeout(this.delayTimeoutId),
        !0)
    }
    ;
    t.resume = function() {
        return this.paused && null != this.tag ? (this.paused = !1,
        this.tag.play(),
        !0) : !1
    }
    ;
    t.stop = function() {
        return this.offset = 0,
        this.pause(),
        this.playState = createjs.Sound.PLAY_FINISHED,
        this.cleanUp(),
        !0
    }
    ;
    t.setMasterVolume = function() {
        return this.updateVolume(),
        !0
    }
    ;
    t.setVolume = function(e) {
        return this.volume = e,
        !0
    }
    ;
    t.updateVolume = function() {
        if (null != this.tag) {
            var e = this.muted || createjs.Sound.masterMute ? 0 : this._volume * createjs.Sound.masterVolume;
            return e != this.tag.volume && (this.tag.volume = e),
            !0
        }
        return !1
    }
    ;
    t.getVolume = function() {
        return this.volume
    }
    ;
    t.setMasterMute = function() {
        return this.updateVolume(),
        !0
    }
    ;
    t.setMute = function(e) {
        return null == e || void 0 == e ? !1 : (this.muted = e,
        this.updateVolume(),
        !0)
    }
    ;
    t.getMute = function() {
        return this.muted
    }
    ;
    t.setPan = function() {
        return !1
    }
    ;
    t.getPan = function() {
        return 0
    }
    ;
    t.getPosition = function() {
        return null == this.tag ? this.offset : 1e3 * this.tag.currentTime
    }
    ;
    t.setPosition = function(e) {
        if (null == this.tag)
            this.offset = e;
        else {
            this.tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1);
            try {
                this.tag.currentTime = .001 * e
            } catch (t) {
                return !1
            }
            this.tag.addEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1)
        }
        return !0
    }
    ;
    t.getDuration = function() {
        return this.duration
    }
    ;
    t.handleSoundComplete = function() {
        this.offset = 0;
        null != window.createjs && (this.playState = createjs.Sound.PLAY_FINISHED,
        this.cleanUp(),
        this.sendEvent("complete"))
    }
    ;
    t.handleSoundLoop = function() {
        this.offset = 0;
        this.remainingLoops--;
        0 == this.remainingLoops && (this.tag.loop = !1,
        this.tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1));
        this.sendEvent("loop")
    }
    ;
    t.playFailed = function() {
        null != window.createjs && (this.playState = createjs.Sound.PLAY_FAILED,
        this.cleanUp(),
        this.sendEvent("failed"))
    }
    ;
    t.toString = function() {
        return "[HTMLAudioPlugin SoundInstance]"
    }
    ;
    createjs.EventDispatcher.initialize(e.prototype);
    createjs.HTMLAudioPlugin.SoundInstance = e
})();
(function() {
    function e(e, t) {
        this.init(e, t)
    }
    var t = e.prototype;
    t.src = null ;
    t.tag = null ;
    t.preloadTimer = null ;
    t.loadedHandler = null ;
    t.init = function(e, t) {
        if (this.src = e,
        this.tag = t,
        this.preloadTimer = setInterval(createjs.proxy(this.preloadTick, this), 200),
        this.loadedHandler = createjs.proxy(this.sendLoadedEvent, this),
        this.tag.addEventListener && this.tag.addEventListener("canplaythrough", this.loadedHandler),
        null == this.tag.onreadystatechange)
            this.tag.onreadystatechange = createjs.proxy(this.sendLoadedEvent, this);
        else {
            var n = this.tag.onreadystatechange;
            this.tag.onreadystatechange = function() {
                n();
                this.tag.onreadystatechange = createjs.proxy(this.sendLoadedEvent, this)
            }
        }
        this.tag.preload = "auto";
        this.tag.load()
    }
    ;
    t.preloadTick = function() {
        var e = this.tag.buffered
          , t = this.tag.duration;
        0 < e.length && e.end(0) >= t - 1 && this.handleTagLoaded()
    }
    ;
    t.handleTagLoaded = function() {
        clearInterval(this.preloadTimer)
    }
    ;
    t.sendLoadedEvent = function() {
        this.tag.removeEventListener && this.tag.removeEventListener("canplaythrough", this.loadedHandler);
        this.tag.onreadystatechange = null ;
        createjs.Sound.sendFileLoadEvent(this.src)
    }
    ;
    t.toString = function() {
        return "[HTMLAudioPlugin Loader]"
    }
    ;
    createjs.HTMLAudioPlugin.Loader = e
})();
(function() {
    function e(e) {
        this.init(e)
    }
    e.tags = {};
    e.get = function(t) {
        var n = e.tags[t];
        return null == n && (n = e.tags[t] = new e(t)),
        n
    }
    ;
    e.remove = function(t) {
        var n = e.tags[t];
        return null == n ? !1 : (n.removeAll(),
        delete e.tags[t],
        !0)
    }
    ;
    e.removeAll = function() {
        for (var t in e.tags)
            e.tags[t].removeAll();
        e.tags = {}
    }
    ;
    e.getInstance = function(t) {
        t = e.tags[t];
        return null == t ? null : t.get()
    }
    ;
    e.setInstance = function(t, n) {
        var r = e.tags[t];
        return null == r ? null : r.set(n)
    }
    ;
    e.checkSrc = function(t) {
        t = e.tags[t];
        return null == t ? null : (t.checkSrcChange(),
        void 0)
    }
    ;
    var t = e.prototype;
    t.src = null ;
    t.length = 0;
    t.available = 0;
    t.tags = null ;
    t.init = function(e) {
        this.src = e;
        this.tags = []
    }
    ;
    t.add = function(e) {
        this.tags.push(e);
        this.length++;
        this.available++
    }
    ;
    t.removeAll = function() {
        for (; this.length--; )
            delete this.tags[this.length];
        this.src = null ;
        this.tags.length = 0
    }
    ;
    t.get = function() {
        if (0 == this.tags.length)
            return null ;
        this.available = this.tags.length;
        var e = this.tags.pop();
        return null == e.parentNode && document.body.appendChild(e),
        e
    }
    ;
    t.set = function(e) {
        -1 == createjs.indexOf(this.tags, e) && this.tags.push(e);
        this.available = this.tags.length
    }
    ;
    t.checkSrcChange = function() {
        for (var e = this.tags.length - 1, t = this.tags[e].src; e--; )
            this.tags[e].src = t
    }
    ;
    t.toString = function() {
        return "[HTMLAudioPlugin TagPool]"
    }
    ;
    createjs.HTMLAudioPlugin.TagPool = e
})();
(function(e) {
    e.hideAddressbar = function(t) {
        t = "string" === typeof t ? document.querySelector(t) : t;
        var n = navigator.userAgent
          , r = ~n.indexOf("iPhone") || ~n.indexOf("iPod")
          , i = ~n.indexOf("iPad")
          , s = r || i
          , o = ~n.indexOf("Android")
          , u = e.navigator.standalone
          , a = 0;
        (s || o) && t && (o && e.addEventListener("scroll", function() {
            t.style.height = e.innerHeight + "px"
        }, !1),
        function f() {
            var n = t.offsetWidth;
            a !== n && (a = n,
            n = 0,
            s ? (n = document.documentElement.clientHeight,
            r && !u && (n += 60)) : o && (n = e.innerHeight + 56),
            t.style.height = n + "px",
            setTimeout(scrollTo, 0, 0, 1),
            e.addEventListener("resize", f, !1),
            console.log("resizefunt"))
        }())
    }
})(this);
var spilLogo, logoDefaultY = 0, logoDefaultX = 0, currentLogoHorizPos = 0, currentLogoVertPos = 0, LOGO_TOP_POS = 0, LOGO_BOTTOM_POS = 1, LOGO_VERTICAL_ANY_POS = 2, LOGO_LEFT_POS = 3, LOGO_RIGHT_POS = 4, LOGO_HORIZ_ANY_POS = 5, logoPosDivisor = 1, sponsorLogoFrame = "splashlogo";
var isAdPauseSoundMuted = !1;
var isSponsorLogoError = !1;
var logoConfig, sponsorLogoBitmap, sponsorPreload, sponsorLogoDefWidth = 1, sponsorLogoDefHeight = 1, sponsorApi, isLogoReady = !1, isGameInited = !1;
(function(e, t) {
    function n() {
        function e() {
            var n;
            n = t("amd");
            n.fork = e;
            return n
        }
        return e()
    }
    function r() {
        function n() {
            var r, i = [], s = {};
            r = t("global");
            r.fork = n;
            r.noConflict = function() {
                var t, n;
                n = Array.prototype.slice.apply(arguments);
                for (t = 0; t < i.length; t += 1)
                    "undefined" === typeof s[i[t]] ? delete e[i[t]] : e[i[t]] = s[i[t]];
                s = {};
                for (t = 0; t < n.length; t += 1) {
                    if ("string" !== typeof n[t])
                        throw Error("Cannot replace namespaces. All new namespaces must be strings.");
                    s[n[t]] = e[n[t]];
                    e[n[t]] = r
                }
                return i = n
            }
            ;
            return r
        }
        n().noConflict("KeyboardJS", "k")
    }
    [].indexOf || (Array.prototype.indexOf = function(e, t, n) {
        n = this.length;
        for (t = (n + ~~t) % n; t < n && (!(t in this) || this[t] !== e); t++)
            ;
        return t ^ n ? t : -1
    }
    );
    "function" === typeof define && define.amd ? define(n) : r()
})(this, function(e) {
    function t() {
        window.addEventListener ? (document.addEventListener("keydown", r, !1),
        document.addEventListener("keyup", i, !1),
        window.addEventListener("blur", n, !1),
        window.addEventListener("webkitfullscreenchange", n, !1),
        window.addEventListener("mozfullscreenchange", n, !1)) : window.attachEvent && (document.attachEvent("onkeydown", r),
        document.attachEvent("onkeyup", i),
        window.attachEvent("onblur", n))
    }
    function n(e) {
        x = [];
        u();
        a(e)
    }
    function r(e) {
        var t, n;
        t = s(e.keyCode);
        if (!(1 > t.length)) {
            for (n = 0; n < t.length; n += 1)
                v(t[n]);
            for (t = 0; t < S.length; t += 1)
                if (n = h(S[t][0]),
                -1 === C.indexOf(S[t]) && l(n))
                    for (C.push(S[t]),
                    n = 0; n < S[t][1].length; n += 1)
                        v(S[t][1][n]);
            var r, i, o, u, a, f, p = [];
            n = [].concat(x);
            for (t = 0; t < T.length; t += 1)
                r = c(T[t].keyCombo).length,
                p[r] || (p[r] = []),
                p[r].push(T[t]);
            for (r = p.length - 1; 0 <= r; r -= 1)
                if (p[r])
                    for (t = 0; t < p[r].length; t += 1) {
                        i = p[r][t];
                        o = c(i.keyCombo);
                        f = !0;
                        for (a = 0; a < o.length; a += 1)
                            if (-1 === n.indexOf(o[a])) {
                                f = !1;
                                break
                            }
                        if (f && l(i.keyCombo)) {
                            N.push(i);
                            for (a = 0; a < o.length; a += 1)
                                f = n.indexOf(o[a]),
                                -1 < f && (n.splice(f, 1),
                                a -= 1);
                            for (o = 0; o < i.keyDownCallback.length; o += 1)
                                !1 === i.keyDownCallback[o](e, d(), i.keyCombo) && (u = !0);
                            !0 === u && (e.preventDefault(),
                            e.stopPropagation())
                        }
                    }
        }
    }
    function i(e) {
        var t, n;
        t = s(e.keyCode);
        if (!(1 > t.length)) {
            for (n = 0; n < t.length; n += 1)
                m(t[n]);
            u();
            a(e)
        }
    }
    function s(e) {
        return E[e] || []
    }
    function o(e) {
        for (var t in E)
            if (E.hasOwnProperty(t) && -1 < E[t].indexOf(e))
                return t;
        return !1
    }
    function u() {
        var e, t;
        for (e = 0; e < C.length; e += 1)
            if (t = h(C[e][0]),
            !1 === l(t)) {
                for (t = 0; t < C[e][1].length; t += 1)
                    m(C[e][1][t]);
                C.splice(e, 1);
                e -= 1
            }
    }
    function a(e) {
        var t, n, r, i;
        for (t = 0; t < N.length; t += 1)
            if (r = N[t],
            !1 === l(r.keyCombo)) {
                for (n = 0; n < r.keyUpCallback.length; n += 1)
                    !1 === r.keyUpCallback[n](e, d(), r.keyCombo) && (i = !0);
                !0 === i && (e.preventDefault(),
                e.stopPropagation());
                N.splice(t, 1);
                t -= 1
            }
    }
    function f(e, t) {
        var n, r, i;
        e = h(e);
        t = h(t);
        if (e.length !== t.length)
            return !1;
        for (n = 0; n < e.length; n += 1) {
            if (e[n].length !== t[n].length)
                return !1;
            for (r = 0; r < e[n].length; r += 1) {
                if (e[n][r].length !== t[n][r].length)
                    return !1;
                for (i = 0; i < e[n][r].length; i += 1)
                    if (-1 === t[n][r].indexOf(e[n][r][i]))
                        return !1
            }
        }
        return !0
    }
    function l(e) {
        var t, n, r, i, s = 0, o, u;
        e = h(e);
        for (t = 0; t < e.length; t += 1) {
            u = !0;
            for (n = s = 0; n < e[t].length; n += 1) {
                r = [].concat(e[t][n]);
                for (i = s; i < x.length; i += 1)
                    o = r.indexOf(x[i]),
                    -1 < o && (r.splice(o, 1),
                    s = i);
                if (0 !== r.length) {
                    u = !1;
                    break
                }
            }
            if (u)
                return !0
        }
        return !1
    }
    function c(e) {
        var t, n, r = [];
        e = h(e);
        for (t = 0; t < e.length; t += 1)
            for (n = 0; n < e[t].length; n += 1)
                r = r.concat(e[t][n]);
        return r
    }
    function h(e) {
        var t = 0
          , n = 0
          , r = !1
          , i = !1
          , s = []
          , o = []
          , u = []
          , a = "";
        if ("object" === typeof e && "function" === typeof e.push)
            return e;
        if ("string" !== typeof e)
            throw Error('Cannot parse "keyCombo" because its type is "' + typeof e + '". It must be a "string".');
        for (; " " === e.charAt(t); )
            t += 1;
        for (; ; ) {
            if (" " === e.charAt(t)) {
                for (; " " === e.charAt(t); )
                    t += 1;
                r = !0
            } else if ("," === e.charAt(t)) {
                if (n || i)
                    throw Error("Failed to parse key combo. Unexpected , at character index " + t + ".");
                i = !0;
                t += 1
            } else if ("+" === e.charAt(t)) {
                a.length && (u.push(a),
                a = "");
                if (n || i)
                    throw Error("Failed to parse key combo. Unexpected + at character index " + t + ".");
                n = !0;
                t += 1
            } else if (">" === e.charAt(t)) {
                a.length && (u.push(a),
                a = "");
                u.length && (o.push(u),
                u = []);
                if (n || i)
                    throw Error("Failed to parse key combo. Unexpected > at character index " + t + ".");
                n = !0;
                t += 1
            } else if (t < e.length - 1 && "!" === e.charAt(t) && (">" === e.charAt(t + 1) || "," === e.charAt(t + 1) || "+" === e.charAt(t + 1)))
                a += e.charAt(t + 1),
                i = r = n = !1,
                t += 2;
            else if (t < e.length && "+" !== e.charAt(t) && ">" !== e.charAt(t) && "," !== e.charAt(t) && " " !== e.charAt(t)) {
                if (!1 === n && !0 === r || !0 === i)
                    a.length && (u.push(a),
                    a = ""),
                    u.length && (o.push(u),
                    u = []),
                    o.length && (s.push(o),
                    o = []);
                for (i = r = n = !1; t < e.length && "+" !== e.charAt(t) && ">" !== e.charAt(t) && "," !== e.charAt(t) && " " !== e.charAt(t); )
                    a += e.charAt(t),
                    t += 1
            } else {
                t += 1;
                continue
            }
            if (t >= e.length) {
                a.length && u.push(a);
                u.length && o.push(u);
                o.length && s.push(o);
                break
            }
        }
        return s
    }
    function p(e) {
        var t, n, r = [];
        if ("string" === typeof e)
            return e;
        if ("object" !== typeof e || "function" !== typeof e.push)
            throw Error("Cannot stringify key combo.");
        for (t = 0; t < e.length; t += 1) {
            r[t] = [];
            for (n = 0; n < e[t].length; n += 1)
                r[t][n] = e[t][n].join(" + ");
            r[t] = r[t].join(" > ")
        }
        return r.join(" ")
    }
    function d(e) {
        return [].concat(x)
    }
    function v(e) {
        if (e.match(/\s/))
            throw Error("Cannot add key name " + e + " to active keys because it contains whitespace.");
        -1 < x.indexOf(e) || x.push(e)
    }
    function m(e) {
        var t = o(e);
        "91" === t || "92" === t ? x = [] : x.splice(x.indexOf(e), 1)
    }
    function g(e, t) {
        if ("string" !== typeof e)
            throw Error("Cannot register new locale. The locale name must be a string.");
        if ("object" !== typeof t)
            throw Error("Cannot register " + e + " locale. The locale map must be an object.");
        if ("object" !== typeof t.map)
            throw Error("Cannot register " + e + " locale. The locale map is invalid.");
        t.macros || (t.macros = []);
        b[e] = t
    }
    function y(e) {
        if (e) {
            if ("string" !== typeof e)
                throw Error("Cannot set locale. The locale name must be a string.");
            if (!b[e])
                throw Error("Cannot set locale to " + e + " because it does not exist. If you would like to submit a " + e + " locale map for KeyboardJS please submit it at https://github.com/RobertWHurst/KeyboardJS/issues.");
            E = b[e].map;
            S = b[e].macros;
            w = e
        }
        return w
    }
    e = {};
    var b = {}, w, E, S, x = [], T = [], N = [], C = [], k, L;
    L = {
        map: {
            3: ["cancel"],
            8: ["backspace"],
            9: ["tab"],
            12: ["clear"],
            13: ["enter"],
            16: ["shift"],
            17: ["ctrl"],
            18: ["alt", "menu"],
            19: ["pause", "break"],
            20: ["capslock"],
            27: ["escape", "esc"],
            32: ["space", "spacebar"],
            33: ["pageup"],
            34: ["pagedown"],
            35: ["end"],
            36: ["home"],
            37: ["left"],
            38: ["up"],
            39: ["right"],
            40: ["down"],
            41: ["select"],
            42: ["printscreen"],
            43: ["execute"],
            44: ["snapshot"],
            45: ["insert", "ins"],
            46: ["delete", "del"],
            47: ["help"],
            91: "command windows win super leftcommand leftwindows leftwin leftsuper".split(" "),
            92: "command windows win super rightcommand rightwindows rightwin rightsuper".split(" "),
            145: ["scrolllock", "scroll"],
            186: ["semicolon", ";"],
            187: ["equal", "equalsign", "="],
            188: ["comma", ","],
            189: ["dash", "-"],
            190: ["period", "."],
            191: ["slash", "forwardslash", "/"],
            192: ["graveaccent", "`"],
            219: ["openbracket", "["],
            220: ["backslash", "\\"],
            221: ["closebracket", "]"],
            222: ["apostrophe", "'"],
            48: ["zero", "0"],
            49: ["one", "1"],
            50: ["two", "2"],
            51: ["three", "3"],
            52: ["four", "4"],
            53: ["five", "5"],
            54: ["six", "6"],
            55: ["seven", "7"],
            56: ["eight", "8"],
            57: ["nine", "9"],
            96: ["numzero", "num0"],
            97: ["numone", "num1"],
            98: ["numtwo", "num2"],
            99: ["numthree", "num3"],
            100: ["numfour", "num4"],
            101: ["numfive", "num5"],
            102: ["numsix", "num6"],
            103: ["numseven", "num7"],
            104: ["numeight", "num8"],
            105: ["numnine", "num9"],
            106: ["nummultiply", "num*"],
            107: ["numadd", "num+"],
            108: ["numenter"],
            109: ["numsubtract", "num-"],
            110: ["numdecimal", "num."],
            111: ["numdevide", "num/"],
            144: ["numlock", "num"],
            112: ["f1"],
            113: ["f2"],
            114: ["f3"],
            115: ["f4"],
            116: ["f5"],
            117: ["f6"],
            118: ["f7"],
            119: ["f8"],
            120: ["f9"],
            121: ["f10"],
            122: ["f11"],
            123: ["f12"]
        },
        macros: [["shift + `", ["tilde", "~"]], ["shift + 1", ["exclamation", "exclamationpoint", "!"]], ["shift + 2", ["at", "@"]], ["shift + 3", ["number", "#"]], ["shift + 4", ["dollar", "dollars", "dollarsign", "$"]], ["shift + 5", ["percent", "%"]], ["shift + 6", ["caret", "^"]], ["shift + 7", ["ampersand", "and", "&"]], ["shift + 8", ["asterisk", "*"]], ["shift + 9", ["openparen", "("]], ["shift + 0", ["closeparen", ")"]], ["shift + -", ["underscore", "_"]], ["shift + =", ["plus", "+"]], ["shift + (", ["opencurlybrace", "opencurlybracket", "{"]], ["shift + )", ["closecurlybrace", "closecurlybracket", "}"]], ["shift + \\", ["verticalbar", "|"]], ["shift + ;", ["colon", ":"]], ["shift + '", ["quotationmark", '"']], ["shift + !,", ["openanglebracket", "<"]], ["shift + .", ["closeanglebracket", ">"]], ["shift + /", ["questionmark", "?"]]]
    };
    for (k = 65; 90 >= k; k += 1)
        L.map[k] = String.fromCharCode(k + 32),
        L.macros.push(["shift + " + String.fromCharCode(k + 32) + ", capslock + " + String.fromCharCode(k + 32), [String.fromCharCode(k)]]);
    g("us", L);
    y("us");
    t();
    e.enable = t;
    e.disable = function() {
        n();
        window.removeEventListener ? (document.removeEventListener("keydown", r, !1),
        document.removeEventListener("keyup", i, !1),
        window.removeEventListener("blur", n, !1),
        window.removeEventListener("webkitfullscreenchange", n, !1),
        window.removeEventListener("mozfullscreenchange", n, !1)) : window.detachEvent && (document.detachEvent("onkeydown", r),
        document.detachEvent("onkeyup", i),
        window.detachEvent("onblur", n))
    }
    ;
    e.activeKeys = d;
    e.isPressed = function(e) {
        return -1 < x.indexOf(e)
    }
    ;
    e.on = function(e, t, n) {
        var r = {}, i, s = [], o, u;
        "string" === typeof e && (e = h(e));
        for (o = 0; o < e.length; o += 1) {
            i = {};
            u = p([e[o]]);
            if ("string" !== typeof u)
                throw Error("Failed to bind key combo. The key combo must be string.");
            i.keyCombo = u;
            i.keyDownCallback = [];
            i.keyUpCallback = [];
            t && i.keyDownCallback.push(t);
            n && i.keyUpCallback.push(n);
            T.push(i);
            s.push(i)
        }
        r.clear = function() {
            var e;
            for (e = 0; e < s.length; e += 1)
                T.splice(T.indexOf(s[e]), 1)
        }
        ;
        r.on = function(e) {
            var t = {}, n, r, i;
            if ("string" !== typeof e)
                throw Error("Cannot bind callback. The event name must be a string.");
            if ("keyup" !== e && "keydown" !== e)
                throw Error('Cannot bind callback. The event name must be a "keyup" or "keydown".');
            n = Array.prototype.slice.apply(arguments, [1]);
            for (r = 0; r < n.length; r += 1)
                if ("function" === typeof n[r])
                    if ("keyup" === e)
                        for (i = 0; i < s.length; i += 1)
                            s[i].keyUpCallback.push(n[r]);
                    else if ("keydown" === e)
                        for (i = 0; i < s.length; i += 1)
                            s[i].keyDownCallback.push(n[r]);
            t.clear = function() {
                var t, r;
                for (t = 0; t < n.length; t += 1)
                    if ("function" === typeof n[t])
                        if ("keyup" === e)
                            for (r = 0; r < s.length; r += 1)
                                s[r].keyUpCallback.splice(s[r].keyUpCallback.indexOf(n[t]), 1);
                        else
                            for (r = 0; r < s.length; r += 1)
                                s[r].keyDownCallback.splice(s[r].keyDownCallback.indexOf(n[t]), 1)
            }
            ;
            return t
        }
        ;
        return r
    }
    ;
    e.clear = function(e) {
        var t, n;
        for (t = 0; t < T.length; t += 1)
            n = T[t],
            f(e, n.keyCombo) && (T.splice(t, 1),
            t -= 1)
    }
    ;
    e.clear.key = function(e) {
        var t, n, r;
        if (e)
            for (t = 0; t < T.length; t += 1)
                for (r = T[t],
                n = 0; n < r.keyCombo.length; n += 1) {
                    if (-1 < r.keyCombo[n].indexOf(e)) {
                        T.splice(t, 1);
                        t -= 1;
                        break
                    }
                }
        else
            T = []
    }
    ;
    e.locale = y;
    e.locale.register = g;
    e.macro = function(e, t) {
        if ("string" !== typeof e && ("object" !== typeof e || "function" !== typeof e.push))
            throw Error("Cannot create macro. The combo must be a string or array.");
        if ("object" !== typeof t || "function" !== typeof t.push)
            throw Error("Cannot create macro. The injectedKeys must be an array.");
        S.push([e, t])
    }
    ;
    e.macro.remove = function(e) {
        var t;
        if ("string" !== typeof e && ("object" !== typeof e || "function" !== typeof e.push))
            throw Error("Cannot remove macro. The combo must be a string or array.");
        for (mI = 0; mI < S.length; mI += 1)
            if (t = S[mI],
            f(e, t[0])) {
                m(t[1]);
                S.splice(mI, 1);
                break
            }
    }
    ;
    e.key = {};
    e.key.name = s;
    e.key.code = o;
    e.combo = {};
    e.combo.active = l;
    e.combo.parse = h;
    e.combo.stringify = p;
    return e
});
var allLevels = [[["DECOR_HELP_1_TYPE", 182, 216.25, .6, .6, 0, [""]], ["LAND_TYPE", 94.5, 270.95, .84, .84, 8, [""]], ["LAND_TYPE", 229.5, 314.25, .84, .84, 0, ["4"]], ["HERO_TYPE", 92.35, 224.75, .68, .68, 0, [""]], ["DYNAMIC_BOX_TYPE", 123.6, 240, .423, .423, 7, [""]], ["AIM_TYPE", 257.9, 265.4, .74, .74, 0, ["REV"]]], [["LAND_TYPE", 63.7, 249, .84, .84, 0, ["2"]], ["LAND_TYPE", 227.05, 277.7, .84, .84, 0, [""]], ["HERO_TYPE", 226.8, 126.4, .68, .68, 0, [""]], ["DYNAMIC_BOX_TYPE", 200.3, 244.75, .423, .423, 0, [""]], ["DYNAMIC_BOX_TYPE", 251.15, 244.75, .423, .423, 0, [""]], ["DYNAMIC_RECT_TYPE", 225.85, 188.05, .7, .7, 0, [""]], ["DYNAMIC_RECT_TYPE", 225.75, 225.45, .7, .7, 0, ["2"]], ["DYNAMIC_BOX_TYPE", 251.25, 207, .42, .42, 0, ["2"]], ["DYNAMIC_BOX_TYPE", 199.55, 207, .42, .42, 0, ["3"]], ["DYNAMIC_TRIANGLE_TYPE", 243.55, 165, .7, .7, 180, [""]], ["DYNAMIC_TRIANGLE_TYPE", 225.3, 163, .68, .68, 0, [""]], ["DYNAMIC_TRIANGLE_TYPE", 207.85, 165, .69, .69, 180, [""]], ["STATIC_BALK_1_TYPE", 149.7, 207.5, .6, .6, -25, [""]], ["AIM_TYPE", 42.05, 199.7, .74, .74, 0, ["DEF"]]], [["LAND_TYPE", 116.95, 287.15, .84, .84, 0, ["2"]], ["LAND_TYPE", 40.05, 192.4, .84, .84, 0, [""]], ["HERO_TYPE", 47.8, 107, .68, .68, 0, [""]], ["DYNAMIC_BOX_TYPE", 21.3, 157, .43, .43, 0, [""]], ["DYNAMIC_RECT_TYPE", 46.75, 136.15, .7, .7, 0, ["2"]], ["DYNAMIC_RECT_TYPE", 127.2, 146.75, .7, .7, 90, [""]], ["DYNAMIC_RECT_TYPE", 127.2, 223.8, .7, .7, 90, [""]], ["DYNAMIC_BOX_TYPE", 73.55, 157, .43, .43, 0, [""]], ["BONUS_STAR_TYPE", 185.3, 210.2, .798, .798, 0, [""]], ["AIM_TYPE", 272.2, 287.95, .74, .74, 0, ["REV_MOVED_R_0_4"]]], [["LAND_TYPE", 274, 233.45, .84, .84, -8, ["5"]], ["LAND_TYPE", 158.75, 240.9, .84, .84, 0, ["2"]], ["LAND_TYPE", 46.15, 240.9, .84, .84, 0, ["2"]], ["STATIC_BOX_TYPE", 327.7, 166.45, .5, 1.06, -23, ["INVIS"]], ["DECOR_HELP_2_TYPE", 91.45, 114.4, .7, .7, 0, [""]], ["BOMB_TYPE", 45.55, 195.25, .9, .9, 0, ["180_700"]], ["HERO_TYPE", 128.2, 192.1, .68, .68, 0, [""]], ["DYNAMIC_BOX_TYPE", 11.8, 204.8, .43, .43, 0, [""]], ["BONUS_STAR_TYPE", 211.2, 192.05, .798, .798, 0, [""]], ["AIM_TYPE", 298.65, 182.25, .74, .74, -8, ["REV"]]], [["LAND_TYPE", 161.7, 361.4, .84, .84, 0, ["5"]], ["LAND_TYPE", 263.85, 237.95, .84, .84, 0, [""]], ["DYNAMIC_BOX_TYPE", 237.1, 205, .423, .423, 0, [""]], ["DYNAMIC_BOX_TYPE", 287.95, 205, .423, .423, 0, [""]], ["DYNAMIC_RECT_TYPE", 262.65, 148.3, .7, .7, 0, [""]], ["DYNAMIC_RECT_TYPE", 262.55, 185.7, .7, .7, 0, ["2"]], ["DYNAMIC_BOX_TYPE", 288.05, 167.25, .42, .42, 0, ["2"]], ["DYNAMIC_BOX_TYPE", 236.35, 167.25, .42, .42, 0, ["3"]], ["STATIC_BALK_1_TYPE", 157.5, 139.5, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 164.5, 221.05, .7, .7, 0, [""]], ["MOVABLE_BALK_TYPE", 64, 281.45, 1.03, .699, 35, ["R_1030_5"]], ["HERO_TYPE", 261.65, 115.4, .68, .68, 0, [""]], ["BONUS_STAR_TYPE", 163.6, 184, .798, .798, 0, [""]], ["BONUS_STAR_TYPE", 89.95, 253.4, .798, .798, 0, [""]], ["AIM_TYPE", 193.1, 314, .74, .74, 0, ["REV"]]], [["TELEPORT_TYPE", 241.7, 69.45, 1, 1, 0, ["A"]], ["TELEPORT_TYPE", 121.55, 367.3, 1, 1, 0, ["A"]], ["LAND_TYPE", 219.85, 392.45, .84, .84, -6, ["2"]], ["LAND_TYPE", 68.25, 150.95, .84, .84, 0, ["3"]], ["LAND_TYPE", 62.05, 295.65, .84, .84, 0, [""]], ["HERO_TYPE", 61.8, 218.15, .68, .68, 0, [""]], ["DYNAMIC_TRIANGLE_TYPE", 78.55, 256.75, .7, .7, 180, [""]], ["DYNAMIC_TRIANGLE_TYPE", 60.3, 254.75, .68, .68, 0, [""]], ["DYNAMIC_TRIANGLE_TYPE", 42.85, 256.75, .69, .69, 180, [""]], ["STATIC_BALK_1_TYPE", 157.05, 290.2, .7, .7, 12, [""]], ["STATIC_BALK_1_TYPE", 294.05, 261.85, .7, .7, 68, [""]], ["STATIC_BALK_1_TYPE", 290.7, 333.7, .7, .7, 118, [""]], ["BONUS_STAR_TYPE", 158.25, 250.7, .798, .798, 0, [""]], ["BONUS_STAR_TYPE", 238.25, 337.7, .798, .798, 0, [""]], ["BONUS_STAR_TYPE", 158.25, 91.2, .798, .798, 0, [""]], ["STATIC_BALK_1_TYPE", 164.1, 125.8, .7, .7, 171, [""]], ["STATIC_BALK_1_TYPE", 244.15, 112.65, .7, .7, 171, [""]], ["AIM_TYPE", 43.45, 103.6, .73, .73, 0, ["DEF"]]], [["LAND_TYPE", 71, 387.8, .84, .84, 0, [""]], ["DECOR_HELP_3_TYPE", 163.85, 193.45, .67, .67, 0, [""]], ["STATIC_BALK_1_TYPE", 61.35, 153.35, .791, .814, 0, [""]], ["DYNAMIC_RECT_TYPE", 161.15, 130.25, 1.31, 1.278, 0, [""]], ["HARD_RECT_TYPE", 162.35, 107.6, .92, 1, 0, [""]], ["STATIC_BALK_1_TYPE", 262.85, 153.35, .791, .814, 0, [""]], ["STATIC_BALK_1_TYPE", 236.85, 369.7, .791, .814, 0, [""]], ["STATIC_BALK_1_TYPE", 272.5, 262.7, .791, .814, -11, [""]], ["DYNAMIC_TRIANGLE_TYPE", 243.3, 243.65, .68, .68, 170, [""]], ["BONUS_STAR_TYPE", 130.05, 325.55, .68, .68, 0, [""]], ["BONUS_STAR_TYPE", 188.65, 273, .68, .68, 0, [""]], ["HERO_TYPE", 271.95, 230.1, .68, .68, 0, [""]], ["AIM_TYPE", 46.2, 339.5, .73, .73, 0, ["DEF"]]], [["TELEPORT_TYPE", 211.9, 186.85, 1, 1, 0, ["A"]], ["TELEPORT_TYPE", 53.9, 377.5, 1, 1, 0, ["A"]], ["LAND_TYPE", 185, 266.4, .989, .84, 0, ["5"]], ["HARD_RECT_TYPE", 76.45, 230.35, 1, 1, 0, [""]], ["STATIC_BOX_TYPE", 33.85, 252.85, .75, .75, 0, [""]], ["STATIC_BOX_TYPE", 72.85, 298.95, .75, .75, 0, [""]], ["BOMB_TYPE", 73.9, 270.2, .8, .8, 0, ["140_600"]], ["STATIC_BOX_TYPE", 46.85, 119.3, .75, .75, 0, [""]], ["STATIC_BOX_TYPE", 133.35, 119.8, .75, .75, 0, [""]], ["HARD_RECT_TYPE", 89.85, 97.3, 1, 1, 0, [""]], ["HARD_RECT_TYPE", 72.5, 163.25, 1, 1, 90, [""]], ["STATIC_BALK_1_TYPE", 182.95, 128.9, .7, .7, 15, [""]], ["STATIC_BALK_1_TYPE", 128.45, 405.8, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 204.45, 405.8, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 277.45, 386.8, .7, .7, -30, [""]], ["DYNAMIC_TRIANGLE_TYPE", 235.45, 233.1, .68, .68, -60, [""]], ["STATIC_BALK_1_TYPE", 312.3, 151.15, .7, .7, -90, [""]], ["HERO_TYPE", 118.95, 64.4, .68, .68, 0, [""]], ["BONUS_STAR_TYPE", 267.85, 119, .68, .68, 0, [""]], ["BONUS_STAR_TYPE", 203.85, 358.05, .68, .68, 0, [""]], ["AIM_TYPE", 156.15, 217.55, .73, .73, 0, ["DEF"]]], [["LAND_TYPE", 238.5, 404.05, .84, .84, 0, ["2"]], ["LAND_TYPE", 131.15, 140.05, .84, .84, 0, ["4"]], ["LAND_TYPE", 46.5, 249.6, .84, .84, 8, [""]], ["HERO_TYPE", 44.35, 203.4, .68, .68, 0, [""]], ["DYNAMIC_BOX_TYPE", 75.6, 218.65, .423, .423, 7, [""]], ["TELEGA_TYPE", 199.05, 302.45, 1.68, .85, 0, ["1_R_50_8"]], ["BOMB_TYPE", 240.2, 358.8, .9, .9, 0, ["180_1400"]], ["BONUS_STAR_TYPE", 248.2, 195.3, .798, .798, 0, [""]], ["BONUS_STAR_TYPE", 240.3, 117.65, .798, .798, 0, [""]], ["STATIC_BALK_1_TYPE", 276.2, 127.65, .7, .7, 68, [""]], ["STATIC_BALK_1_TYPE", 229.65, 67.3, .7, .7, 36, [""]], ["STATIC_BALK_1_TYPE", 168, 52.1, .48, .48, -15, [""]], ["BONUS_STAR_TYPE", 150.4, 240, .798, .798, 0, [""]], ["AIM_TYPE", 107.8, 90, .73, .73, 0, ["DEF"]]], [["LAND_TYPE", 259.95, 376.75, .84, .84, 0, [""]], ["LAND_TYPE", 76, 144.8, .84, .84, 0, [""]], ["DECOR_HELP_4_TYPE", 168.25, 78.95, .59, .59, 0, [""]], ["STATIC_BALK_1_TYPE", 168.25, 138.6, .7, .7, 15, [""]], ["STATIC_BALK_1_TYPE", 93.4, 327.3, .7, .7, 15, [""]], ["STATIC_BALK_1_TYPE", 167.35, 348.3, .7, .7, 15, [""]], ["HERO_TYPE", 95, 95.3, .68, .68, 0, [""]], ["FAN_TYPE", 44, 93.85, .8, .8, 0, ["DEF_60_40"]], ["BONUS_STAR_TYPE", 263.4, 188.55, .68, .68, 0, [""]], ["BONUS_STAR_TYPE", 98.9, 277.7, .68, .68, 0, [""]], ["STATIC_BALK_1_TYPE", 270.95, 228.2, .7, .7, -15, [""]], ["STATIC_BALK_1_TYPE", 197.95, 247.6, .7, .7, -15, [""]], ["STATIC_BALK_1_TYPE", 20.4, 306.3, .7, .7, 15, [""]], ["STATIC_BALK_1_TYPE", 342.95, 208.2, .7, .7, -15, [""]], ["BONUS_STAR_TYPE", 175.4, 218.95, .68, .68, 0, [""]], ["BONUS_STAR_TYPE", 176.4, 307.15, .68, .68, 0, [""]], ["BONUS_STAR_TYPE", 234.35, 124.45, .68, .68, 0, [""]], ["AIM_TYPE", 278.35, 327.55, .74, .74, 0, ["REV"]]], [["LAND_TYPE", 52, 194.5, .84, .84, 0, ["2"]], ["LAND_TYPE", 51.9, 367.85, .84, .84, 0, ["5"]], ["DYNAMIC_RECT_TYPE", 149.9, 350.05, .751, .819, 0, [""]], ["DYNAMIC_TRIANGLE_TYPE", 214.2, 132, .822, .76, 180, [""]], ["DYNAMIC_TRIANGLE_TYPE", 192.5, 130.1, .81, .749, 0, [""]], ["DYNAMIC_TRIANGLE_TYPE", 171.7, 131.75, .822, .76, 180, [""]], ["STATIC_BALK_1_TYPE", 232, 333.65, .749, .767, -22, [""]], ["BONUS_STAR_TYPE", 105.4, 119.65, .68, .68, 0, [""]], ["STATIC_BALK_1_TYPE", 193.85, 156.85, .875, .825, 0, [""]], ["FAN_TYPE", 27.4, 147.1, .8, .8, 0, ["DEF_130_40"]], ["STATIC_BALK_1_TYPE", 297, 287.2, .749, .767, -52, [""]], ["STATIC_BALK_1_TYPE", 302, 119.1, .921, .877, -105, [""]], ["BONUS_STAR_TYPE", 282, 215.35, .68, .68, 0, [""]], ["STATIC_BOX_TYPE", 194.8, 368.1, .616, .615, 0, [""]], ["STATIC_BALK_1_TYPE", 129.8, 394.3, .743, .787, 53, [""]], ["STATIC_BOX_TYPE", 174.05, 440, .75, .75, 0, [""]], ["FAN_TYPE", 189.95, 416.55, .8, .8, 45, ["REV_630_10"]], ["BONUS_STAR_TYPE", 158.35, 383.05, .68, .68, 0, [""]], ["STATIC_BOX_TYPE", 120.2, 168, .616, .615, -22, [""]], ["STATIC_BOX_TYPE", 136.85, 161.1, .616, .615, -22, [""]], ["STATIC_BOX_TYPE", -1.3, 308.05, .5, 1.06, 14, ["INVIS"]], ["HERO_TYPE", 192.65, 91.05, .68, .68, 0, [""]], ["AIM_TYPE", 29.2, 319.75, .73, .73, 0, ["DEF"]]], [["LAND_TYPE", 289.4, 407.6, .84, .84, 6, ["3"]], ["LAND_TYPE", 249.5, 144.1, .84, .84, 0, ["3"]], ["LAND_TYPE", 180.4, 395.45, .84, .84, 6, ["3"]], ["HERO_TYPE", 248.5, 60.05, .68, .68, 0, [""]], ["BONUS_STAR_TYPE", 294.85, 201.95, .65, .65, 0, [""]], ["BONUS_STAR_TYPE", 53.65, 173.65, .65, .65, 0, [""]], ["BONUS_STAR_TYPE", 180.55, 345.15, .65, .65, 0, [""]], ["DYNAMIC_RECT_TYPE", 248.2, 91.15, .7, .7, 0, [""]], ["DYNAMIC_BOX_TYPE", 273.6, 110.1, .42, .42, 0, ["2"]], ["DYNAMIC_BOX_TYPE", 221.9, 110.1, .42, .42, 0, ["3"]], ["TELEGA_TYPE", 158.65, 242.3, 2.2, .85, 0, ["2_R_0_10"]], ["AIM_TYPE", 303.1, 360.05, .74, .74, 6, ["REV"]]], [["LAND_TYPE", 236, 242.95, .99, .84, 0, ["4"]], ["LAND_TYPE", 59.9, 405.7, .84, .84, 0, ["5"]], ["TELEPORT_TYPE", 199.85, 141.9, 1, 1, 0, ["A"]], ["TELEPORT_TYPE", 274.3, 384.95, 1, 1, 0, ["A"]], ["STATIC_BOX_TYPE", 233.9, 205.65, .75, .75, 0, [""]], ["STATIC_BALK_1_TYPE", 41.95, 99.95, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 116.9, 99.95, .7, .7, 0, [""]], ["DYNAMIC_BOX_TYPE", 22.95, 368.7, .42, .42, 0, [""]], ["DYNAMIC_BOX_TYPE", 93.95, 368.7, .42, .42, 0, [""]], ["DYNAMIC_BOX_TYPE", 93.95, 346.7, .42, .42, 0, [""]], ["DYNAMIC_BOX_TYPE", 22.95, 347.7, .42, .42, 0, [""]], ["DYNAMIC_RECT_TYPE", 58.9, 326, .924, .79, 0, [""]], ["STATIC_BALK_1_TYPE", 220.95, 430.95, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 295.9, 430.95, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 149.55, 412.95, .7, .7, 30, [""]], ["STATIC_BALK_1_TYPE", 292.85, 101.15, .7, .7, -90, [""]], ["STATIC_BALK_1_TYPE", 292.85, 177.15, .7, .7, -90, [""]], ["STATIC_BALK_1_TYPE", 190.85, 99.95, .7, .7, 0, [""]], ["BOMB_TYPE", 60.4, 73.15, .8, .8, 0, ["140_700"]], ["BOMB_TYPE", 178.35, 73.15, .8, .8, 0, ["140_700"]], ["HERO_TYPE", 57.2, 293.45, .68, .68, 0, [""]], ["BONUS_STAR_TYPE", 173.95, 380.55, .68, .68, 0, [""]], ["BONUS_STAR_TYPE", 161.85, 188.35, .68, .68, 0, [""]], ["AIM_TYPE", 48.25, 189.95, .832, .888, 0, ["DEF_MOVED_R_0_10"]]], [["LAND_TYPE", 69.8, 135.2, .84, .84, 0, ["5"]], ["STATIC_BALK_1_TYPE", 164.85, 128.85, .7, .7, 15, [""]], ["STATIC_BALK_1_TYPE", 206.8, 238.9, .7, .7, -15, [""]], ["STATIC_BALK_1_TYPE", 279.25, 219.45, .7, .7, -15, [""]], ["STATIC_BALK_1_TYPE", 133.8, 257.9, .7, .7, -15, [""]], ["STATIC_BALK_1_TYPE", 38.8, 345.85, .7, .7, 15, [""]], ["STATIC_BALK_1_TYPE", 110.8, 365.8, .7, .7, 15, [""]], ["BONUS_STAR_TYPE", 53.75, 291.15, .68, .68, 0, [""]], ["STATIC_BALK_1_TYPE", 310.35, 162.35, .7, .7, -90, [""]], ["BONUS_STAR_TYPE", 262.8, 167.15, .68, .68, 0, [""]], ["STATIC_BALK_1_TYPE", 10.4, 289.05, .7, .7, -90, [""]], ["FAN_TYPE", 37.75, 85.6, .8, .8, 0, ["DEF_100_40"]], ["HERO_TYPE", 115, 87.9, .68, .68, 0, [""]], ["AIM_TYPE", 266.25, 362, 1.185, .74, 0, ["REV_MOVED_R_0_10"]]], [["LAND_TYPE", 53, 391.05, .84, .84, 0, [""]], ["STATIC_BOX_TYPE", 280.4, 58.75, .592, .516, 20, [""]], ["STATIC_BALK_1_TYPE", 310.6, 143.15, .7, .7, -90, [""]], ["FAN_TYPE", 302.45, 86.1, .8, .8, -15, ["REV_530_10"]], ["STATIC_BOX_TYPE", 264.9, 52.75, .592, .516, 20, [""]], ["STATIC_BALK_1_TYPE", 141.75, 374.65, .599, .631, 0, [""]], ["STATIC_BALK_1_TYPE", 206.95, 383.65, .603, .627, 16, [""]], ["STATIC_BALK_1_TYPE", 270, 402.65, .603, .627, 16, [""]], ["STATIC_BALK_1_TYPE", 56.65, 49.75, .734, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 136.5, 49.75, .734, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 216.4, 49.75, .734, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 9.2, 82.75, .742, .7, -90, [""]], ["STATIC_BALK_1_TYPE", 9.2, 163.35, .742, .7, -90, [""]], ["STATIC_BALK_1_TYPE", 310.6, 219.15, .7, .7, -90, [""]], ["STATIC_BALK_1_TYPE", 310.6, 294.15, .7, .7, -90, [""]], ["STATIC_BALK_1_TYPE", 310.6, 370.15, .7, .7, -90, [""]], ["STATIC_BALK_1_TYPE", 9.2, 242.75, .742, .7, -90, [""]], ["STATIC_BALK_1_TYPE", 9.2, 323.25, .742, .7, -90, [""]], ["BOMB_TYPE", 284.7, 380.25, .8, .8, 0, ["140_300"]], ["STATIC_BALK_1_TYPE", 247.15, 199.7, .725, .7, -90, [""]], ["STATIC_BALK_1_TYPE", 220.65, 170.15, .599, .631, -15, [""]], ["STATIC_BOX_TYPE", 185.25, 180.45, .75, .75, -10, [""]], ["STATIC_BOX_TYPE", 169.35, 92.4, .75, .75, -10, [""]], ["DYNAMIC_RECT_TYPE", 196.55, 125.55, .79, .79, -100, [""]], ["STATIC_BALK_1_TYPE", 247.15, 278.7, .725, .7, -90, [""]], ["STATIC_BALK_1_TYPE", 270.5, 324.95, .599, .631, 0, [""]], ["BOMB_TYPE", 279.25, 297.65, .8, .8, 0, ["140_1300"]], ["STATIC_BALK_1_TYPE", 48.9, 282.55, .603, .627, 8, [""]], ["STATIC_BALK_1_TYPE", 114.1, 291.8, .603, .627, 8, [""]], ["BONUS_STAR_TYPE", 257.25, 115.5, .68, .68, 0, [""]], ["BONUS_STAR_TYPE", 66.3, 249.75, .68, .68, 0, [""]], ["STATIC_BOX_TYPE", 26.8, 212.95, .682, .662, 5, [""]], ["STATIC_BOX_TYPE", 110.15, 219.3, .682, .662, 5, [""]], ["DYNAMIC_RECT_TYPE", 70.6, 198.25, .936, .79, 5, [""]], ["BONUS_STAR_TYPE", 116.35, 343.65, .68, .68, 0, [""]], ["HERO_TYPE", 279.55, 251.3, .68, .68, 0, [""]], ["AIM_TYPE", 43.2, 342.5, .73, .73, 0, ["DEF"]]], [["LAND_TYPE", 208, 292.45, .84, .84, 0, ["4"]], ["LAND_TYPE", 74.5, 166.4, .84, .84, 0, ["5"]], ["HARD_BOX_TYPE", 169.75, 253, 1, 1, 0, ["5"]], ["STATIC_BALK_1_TYPE", 113.75, 276.75, .7, .7, 0, [""]], ["DYNAMIC_RECT_TYPE", 72.5, 86.85, .79, .79, 0, [""]], ["DYNAMIC_BOX_TYPE", 43.65, 130, .42, .42, 0, [""]], ["DYNAMIC_BOX_TYPE", 103.65, 130, .42, .42, 0, [""]], ["DYNAMIC_BOX_TYPE", 43.65, 107, .42, .42, 0, [""]], ["DYNAMIC_BOX_TYPE", 103.65, 107, .42, .42, 0, [""]], ["STATIC_BALK_1_TYPE", 253.25, 227.65, .7, .7, -90, [""]], ["STATIC_BOX_TYPE", 252.6, 180.5, .75, .75, 0, [""]], ["BOMB_TYPE", 77.75, 61.25, .8, .8, 0, ["140_600"]], ["STATIC_BALK_1_TYPE", 38.1, 329.75, .7, .7, 30, [""]], ["BONUS_STAR_TYPE", 47.8, 296.2, .68, .68, 0, [""]], ["HERO_TYPE", 94.6, 246.6, .68, .68, 0, [""]], ["BONUS_STAR_TYPE", 109.6, 344.6, .68, .68, 0, [""]], ["STATIC_BALK_1_TYPE", 39.75, 380.5, .7, .7, -35, [""]], ["AIM_TYPE", 220.6, 378.45, 1.42, .74, 0, ["REV_MOVED_R_0_10"]]], [["LAND_TYPE", 56, 423.95, .84, .84, 0, [""]], ["STATIC_BALK_1_TYPE", 1, 99.85, .7, .7, 0, [""]], ["FAN_TYPE", 23, 68.6, .8, .8, 0, ["DEF_100_40"]], ["STATIC_BALK_1_TYPE", 76, 99.85, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 151, 99.85, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 151, 195.85, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 226, 195.85, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 301, 195.85, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 17, 294.85, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 92, 294.85, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 167, 294.85, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 311.95, 99.85, .7, .7, 0, [""]], ["FAN_TYPE", 299.75, 163.85, .8, .8, 0, ["REV_130_10"]], ["FAN_TYPE", 23, 262.6, .8, .8, 0, ["DEF_200_10"]], ["STATIC_BALK_1_TYPE", 151, 404.8, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 226, 404.8, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 301, 404.8, .7, .7, 0, [""]], ["FAN_TYPE", 299.75, 372.8, .8, .8, 0, ["REV_150_10"]], ["HERO_TYPE", 76.95, 67.95, .68, .68, 0, [""]], ["BONUS_STAR_TYPE", 83.85, 159.3, .68, .68, 0, [""]], ["BONUS_STAR_TYPE", 270.8, 299.1, .68, .68, 0, [""]], ["BONUS_STAR_TYPE", 239.8, 62.85, .68, .68, 0, [""]], ["AIM_TYPE", 32.2, 378, .73, .73, 0, ["DEF"]]], [["LAND_TYPE", 175.85, 424.35, .746, .643, 0, [""]], ["TELEPORT_TYPE", 263.7, 350.9, 1, 1, 0, ["A"]], ["TELEPORT_TYPE", 31.85, 181.85, 1, 1, 0, ["A"]], ["TELEGA_TYPE", 160, 102.3, 2.171, .85, 0, ["2_L_0_10"]], ["STATIC_BALK_1_TYPE", 94, 391.4, .7, .7, 30, [""]], ["STATIC_BALK_1_TYPE", 29, 353.25, .7, .7, 30, [""]], ["HERO_TYPE", 161.2, 72.2, .68, .68, 0, [""]], ["STATIC_BALK_1_TYPE", 37.8, 130.85, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 112.8, 130.85, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 187.8, 130.85, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 341.75, 130.1, .7, .7, 0, [""]], ["STATIC_BOX_TYPE", 225.85, 297.45, .75, .75, 0, [""]], ["STATIC_BOX_TYPE", 301.85, 297.45, .75, .75, 0, [""]], ["DYNAMIC_RECT_TYPE", 102, 207.1, .79, .79, 0, [""]], ["LAND_TYPE", 101.6, 266.6, .746, .643, 0, [""]], ["DYNAMIC_TRIANGLE_TYPE", 80.9, 237.55, .68, .68, -60, [""]], ["DYNAMIC_TRIANGLE_TYPE", 130.9, 237.55, .68, .68, -60, [""]], ["STATIC_BALK_1_TYPE", 203.55, 314.25, .61, .61, 0, [""]], ["STATIC_BOX_TYPE", 159.95, 309.7, .75, .75, 0, [""]], ["BONUS_STAR_TYPE", 266.85, 205.7, .68, .68, 0, [""]], ["BONUS_STAR_TYPE", 76.1, 338, .68, .68, 0, [""]], ["BONUS_STAR_TYPE", 30.9, 61.1, .68, .68, 0, [""]], ["HARD_RECT_TYPE", 263.7, 276.25, .856, .857, 0, [""]], ["BOMB_TYPE", 101.7, 181.4, .8, .8, 0, ["90_1000"]], ["AIM_TYPE", 185.35, 381.1, .74, .74, 0, ["REV"]]], [["STATIC_BOX_TYPE", 286.55, 344.25, .5, 1.06, -12, ["INVIS"]], ["LAND_TYPE", 246.85, 399.45, .84, .84, 0, ["5"]], ["LAND_TYPE", 265.5, 247.55, .765, .807, 0, [""]], ["STATIC_BALK_1_TYPE", 47, 55.45, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 123.2, 55.45, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 199.4, 55.45, .7, .7, 0, [""]], ["STATIC_BALK_1_TYPE", 267.35, 82.8, .7, .7, 45, [""]], ["BOMB_TYPE", 265.7, 205.4, .8, .8, 0, ["140_1000"]], ["TELEGA_TYPE", 173, 165.55, 2.037, .85, 0, ["1_L_0_10"]], ["STATIC_BALK_1_TYPE", 17.4, 101.25, .7, .7, -90, [""]], ["STATIC_BALK_1_TYPE", 17.4, 175.25, .7, .7, -90, [""]], ["STATIC_BOX_TYPE", 21.1, 258.8, .75, .75, 0, [""]], ["STATIC_BOX_TYPE", 112.2, 258.8, .75, .75, 0, [""]], ["DYNAMIC_RECT_TYPE", 68, 221.75, .954, .79, 0, [""]], ["STATIC_BALK_1_TYPE", 130.4, 236, .64, .64, -90, [""]], ["STATIC_BALK_1_TYPE", 48.2, 395.85, .7, .7, -7, [""]], ["STATIC_BALK_1_TYPE", 123.9, 387.1, .7, .7, -7, [""]], ["FAN_TYPE", 28.05, 364.9, .8, .8, -8, ["DEF_130_40"]], ["GLASS_BLOCK_TYPE", 68.35, 238.75, .973, .79, 0, [""]], ["HERO_TYPE", 175.85, 135.2, .68, .68, 0, [""]], ["BONUS_STAR_TYPE", 62.85, 114.25, .65, .65, 0, [""]], ["BONUS_STAR_TYPE", 67.3, 287.7, .65, .65, 0, [""]], ["BONUS_STAR_TYPE", 169.4, 340.2, .65, .65, 0, [""]], ["AIM_TYPE", 258.35, 351.15, .74, .74, 0, ["REV"]]], [["STATIC_BOX_TYPE", 84.05, 70.2, .5, 1.06, 15, ["INVIS"]], ["STATIC_BOX_TYPE", 258.4, 331.3, .75, .75, 0, [""]], ["BONUS_STAR_TYPE", 187.85, 321.9, .65, .65, 0, [""]], ["BONUS_STAR_TYPE", 61.55, 219.75, .65, .65, 0, [""]], ["BONUS_STAR_TYPE", 221.45, 110.25, .65, .65, 0, [""]], ["DYNAMIC_RECT_TYPE", 52.2, 161.75, .918, .989, 0, [""]], ["DYNAMIC_BOX_TYPE", 25.1, 142.95, .42, .42, 0, [""]], ["DYNAMIC_BOX_TYPE", 76.05, 142.95, .42, .42, 0, [""]], ["LAND_TYPE", 128.15, 124.6, .702, .643, -9, [""]], ["DYNAMIC_BOX_TYPE", 19.4, 322.25, .42, .42, 0, ["3"]], ["DYNAMIC_BOX_TYPE", 95.7, 321.75, .42, .42, 0, ["3"]], ["DYNAMIC_BOX_TYPE", 95.85, 300.6, .42, .42, 0, [""]], ["DYNAMIC_BOX_TYPE", 19.85, 300.1, .42, .42, 0, [""]], ["DYNAMIC_RECT_TYPE", 58.15, 279.25, .918, .989, 0, [""]], ["HARD_BOX_TYPE", 12.85, 183.9, .877, .852, 0, ["5"]], ["HARD_BOX_TYPE", 89, 183.9, .877, .852, 0, ["5"]], ["STATIC_BALK_1_TYPE", 59.35, 342.15, .903, .886, 0, [""]], ["STATIC_BALK_1_TYPE", 183.5, 424.75, .801, .817, -53, [""]], ["STATIC_BALK_1_TYPE", 233.4, 356.8, .747, .919, -55, [""]], ["STATIC_BALK_1_TYPE", 218.6, 211.85, .64, .92, -113, [""]], ["STATIC_BOX_TYPE", 13.5, 208.2, .75, .75, 0, [""]], ["STATIC_BALK_1_TYPE", 313.85, 266.15, .779, .919, -110, [""]], ["STATIC_BOX_TYPE", 89, 208.2, .75, .75, 0, [""]], ["FAN_TYPE", 286.65, 320.25, .8, .8, 75, ["REV_780_15"]], ["FAN_TYPE", 154.25, 405.65, .8, .8, -52, ["DEF_230_40"]], ["HERO_TYPE", 50.35, 113.35, .68, .68, 0, [""]], ["STATIC_BALK_1_TYPE", 186.9, 147.1, .64, .92, -120, [""]], ["AIM_TYPE", 114.35, 81.25, .73, .73, -9, ["DEF"]]]]
  , allBgIndexes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  , isEditorDebug = !1
  , editorLevelToLoad = 3
  , manifest = [{
    src: PRELOADER_LOGO,
    id: "preloaderlogo"
}, {
    src: "soccerassets.png",
    id: "zoespritesheet"
}]
  , zoeCFG = {
    framerate: 24,
    images: ["assets/soccerassets.png"],
    frames: [[946, 1742, 37, 33, 0, 17, 15], [1051, 1742, 37, 33, 0, 17, 15], [909, 1742, 37, 33, 0, 17, 15], [1252, 2, 312, 244, 0, 159, 148], [131, 692, 128, 127, 0, 63, 59], [846, 1694, 230, 45, 0, 104, 17], [448, 1555, 74, 73, 0, 35, 31], [355, 936, 87, 86, 0, 41, 41], [529, 936, 87, 86, 0, 41, 41], [473, 1628, 168, 62, 0, 81, 30], [1242, 1105, 77, 76, 0, 37, 34], [700, 1028, 77, 77, 0, 37, 34], [855, 1028, 77, 77, 0, 37, 34], [546, 1105, 78, 77, 0, 37, 35], [442, 936, 87, 86, 0, 41, 39], [1920, 1555, 67, 66, 0, 31, 29], [1987, 1555, 62, 61, 0, 29, 27], [276, 1742, 36, 40, 0, 0, 0], [281, 362, 201, 182, 0, 95, 30], [1751, 820, 87, 93, 0, 41, 48], [1664, 820, 87, 93, 0, 41, 48], [1838, 820, 87, 93, 0, 41, 48], [482, 362, 298, 166, 0, 146, 141], [1578, 936, 80, 79, 0, 39, 36], [853, 936, 93, 82, 0, 46, 43], [1409, 1628, 161, 50, 0, 80, 23], [2, 1694, 261, 48, 0, 125, 17], [1076, 1694, 141, 45, 0, 71, 21], [2, 1785, 174, 30, 0, 84, 12], [1274, 1742, 228, 32, 0, 113, 14], [1649, 1742, 149, 31, 0, 73, 14], [1088, 1742, 186, 32, 0, 93, 14], [1798, 1742, 206, 30, 0, 102, 12], [176, 1785, 150, 30, 0, 74, 12], [2, 820, 168, 116, 0, 86, 57], [1019, 1628, 276, 52, 0, 136, 24], [2, 544, 160, 148, 0, 73, 68], [540, 1694, 306, 47, 0, 150, 20], [981, 2, 271, 275, 0, 128, 148], [270, 544, 139, 147, 0, 71, 81], [1564, 2, 221, 221, 0, 109, 108], [2044, 2, 4, 4, 0, 200, 200], [1741, 1628, 159, 49, 0, 78, 18], [170, 820, 314, 113, 0, 154, 34], [1900, 1628, 138, 49, 0, 96, 23], [843, 1785, 157, 26, 0, 75, 11], [1740, 936, 233, 78, 0, 99, 44], [2, 1628, 204, 66, 0, 100, 32], [2017, 820, 28, 45, 0, -4, 0], [1374, 1694, 35, 44, 0, 0, 0], [1462, 1694, 33, 44, 0, -1, 0], [1495, 1694, 35, 44, 0, 0, 0], [1614, 1694, 33, 44, 0, -1, 0], [1682, 1694, 35, 44, 0, 0, 0], [1647, 1694, 35, 44, 0, 0, 0], [1581, 1694, 33, 44, 0, -1, 0], [1340, 1694, 34, 44, 0, -1, 0], [2013, 1105, 35, 45, 0, 0, 1], [1113, 1785, 114, 26, 0, 55, 11], [1388, 820, 94, 94, 0, 0, 0], [271, 1628, 138, 66, 0, 67, 32], [817, 1555, 138, 72, 0, 67, 33], [1438, 1555, 138, 68, 0, 67, 32], [1576, 1555, 138, 68, 0, 67, 32], [1714, 1555, 138, 67, 0, 67, 32], [598, 820, 114, 113, 0, 55, 54], [1508, 692, 120, 119, 0, 57, 58], [382, 692, 124, 123, 0, 60, 59], [1031, 692, 120, 121, 0, 58, 59], [1e3, 1785, 113, 26, 0, 54, 10], [499, 1785, 113, 26, 0, 54, 10], [1627, 1628, 57, 50, 0, 27, 24], [874, 1742, 35, 34, 0, 15, 15], [612, 1785, 116, 26, 0, 55, 10], [517, 1742, 35, 36, 0, 15, 16], [481, 1742, 36, 36, 0, 15, 16], [717, 1742, 35, 35, 0, 15, 16], [587, 1742, 35, 35, 0, 15, 16], [752, 1742, 35, 35, 0, 15, 15], [552, 1742, 35, 36, 0, 15, 16], [1684, 1628, 57, 50, 0, 27, 24], [522, 1555, 73, 73, 0, 35, 34], [701, 1628, 58, 58, 0, 27, 27], [759, 1628, 59, 58, 0, 27, 27], [818, 1628, 58, 56, 0, 27, 26], [1570, 1628, 57, 50, 0, 27, 24], [641, 1628, 60, 60, 0, 28, 29], [263, 1694, 50, 48, 0, 24, 22], [202, 936, 72, 88, 0, 35, 44], [274, 936, 81, 87, 0, 30, 44], [1693, 544, 150, 132, 0, 40, 44], [1284, 1694, 56, 44, 0, 27, 22], [1502, 1742, 68, 32, 0, 34, 14], [787, 1742, 87, 35, 0, 46, 14], [1570, 1742, 79, 32, 0, 45, 14], [622, 1742, 95, 35, 0, 55, 15], [1993, 1258, 56, 65, 0, 26, 36], [409, 1628, 64, 65, 0, 28, 38], [1295, 1628, 55, 51, 0, 25, 27], [206, 1628, 65, 66, 0, 29, 33], [1436, 936, 82, 79, 0, 37, 43], [1022, 936, 89, 81, 0, 39, 44], [107, 936, 95, 88, 0, 43, 46], [1180, 820, 102, 95, 0, 44, 49], [2, 936, 105, 92, 0, 45, 47], [1282, 820, 106, 94, 0, 47, 48], [1559, 820, 105, 93, 0, 44, 49], [350, 1742, 131, 37, 0, 64, 17], [876, 1628, 90, 55, 0, 45, 26], [1981, 1182, 68, 69, 0, 32, 33], [1852, 1555, 68, 67, 0, 31, 33], [385, 1785, 114, 27, 0, 55, 11], [326, 1785, 30, 30, 0, 14, 15], [2004, 1742, 33, 30, 0, 15, 14], [356, 1785, 29, 28, 0, 13, 12], [983, 1742, 35, 33, 0, 16, 16], [1227, 1785, 35, 25, 0, 16, 8], [1262, 1785, 127, 23, 0, 65, 10], [1516, 1785, 127, 23, 0, 65, 10], [1389, 1785, 127, 23, 0, 65, 10], [1350, 1628, 59, 50, 0, 27, 22], [728, 1785, 115, 26, 0, 54, 10], [312, 1742, 38, 38, 0, 17, 17], [427, 1694, 113, 48, 0, 54, 22], [313, 1694, 114, 48, 0, 55, 22], [1104, 1555, 334, 72, 0, 1, -2], [1418, 1482, 334, 73, 0, 1, -1], [232, 1408, 334, 74, 0, 1, 0], [566, 1408, 334, 74, 0, 1, 0], [1414, 1182, 334, 75, 0, 1, 1], [1080, 1182, 334, 75, 0, 1, 1], [1198, 1408, 334, 74, 0, 1, 0], [1680, 1408, 334, 74, 0, 1, 0], [634, 1482, 334, 73, 0, 1, -1], [300, 1482, 334, 73, 0, 1, -1], [2, 2, 554, 360, 0, 0, 0], [556, 2, 425, 314, 0, 0, 0], [2022, 692, 25, 46, 0, -23, -13], [1251, 1694, 33, 44, 0, -20, -14], [2017, 1028, 32, 45, 0, -21, -15], [2014, 1408, 34, 45, 0, -18, -14], [1217, 1694, 34, 45, 0, -21, -15], [1907, 1694, 34, 43, 0, -20, -16], [245, 1742, 31, 42, 0, -22, -17], [215, 1742, 30, 43, 0, -22, -17], [1875, 1694, 32, 43, 0, -21, -16], [108, 1742, 53, 43, 0, -11, -16], [1994, 1694, 45, 43, 0, -14, -17], [1941, 1694, 53, 43, 0, -10, -16], [1409, 1694, 53, 44, 0, -10, -15], [161, 1742, 54, 43, 0, -11, -15], [2, 1742, 52, 43, 0, -11, -16], [54, 1742, 54, 43, 0, -11, -16], [1824, 1694, 51, 43, 0, -11, -16], [1530, 1694, 51, 44, 0, -11, -16], [1717, 1694, 51, 43, 0, -11, -16], [1768, 1694, 56, 43, 0, -10, -16], [310, 1182, 76, 76, 0, 36, 36], [1165, 1028, 76, 77, 0, 36, 37], [540, 1258, 76, 75, 0, 36, 36], [1004, 1258, 75, 75, 0, 36, 36], [1290, 1333, 74, 74, 0, 35, 36], [2, 1482, 74, 73, 0, 35, 36], [1142, 1333, 74, 74, 0, 35, 37], [1068, 1333, 74, 74, 0, 35, 38], [995, 1333, 73, 74, 0, 35, 38], [1762, 1258, 75, 75, 0, 36, 39], [1154, 1258, 75, 75, 0, 36, 39], [1533, 1258, 75, 75, 0, 36, 39], [386, 1182, 76, 76, 0, 36, 40], [78, 1182, 76, 76, 0, 36, 40], [1241, 1028, 76, 77, 0, 36, 40], [1317, 1028, 78, 77, 0, 37, 40], [1395, 1028, 78, 77, 0, 37, 40], [1706, 1028, 78, 77, 0, 37, 40], [1549, 1028, 79, 77, 0, 37, 40], [1628, 1028, 78, 77, 0, 36, 40], [154, 1182, 78, 76, 0, 36, 39], [616, 1182, 78, 76, 0, 36, 39], [462, 1182, 78, 76, 0, 36, 39], [2, 1258, 78, 75, 0, 36, 38], [306, 1258, 78, 75, 0, 36, 38], [1686, 1258, 76, 75, 0, 35, 38], [232, 1333, 76, 74, 0, 35, 38], [539, 1333, 76, 74, 0, 35, 38], [1343, 1482, 75, 73, 0, 35, 37], [373, 1555, 75, 73, 0, 35, 37], [1030, 1555, 74, 72, 0, 35, 36], [955, 1555, 75, 72, 0, 36, 36], [308, 1333, 76, 74, 0, 36, 37], [768, 1333, 76, 74, 0, 36, 37], [844, 1333, 77, 74, 0, 37, 37], [926, 1258, 78, 75, 0, 37, 37], [848, 1258, 78, 75, 0, 37, 37], [770, 1258, 78, 75, 0, 37, 37], [232, 1182, 78, 76, 0, 37, 38], [624, 1105, 78, 77, 0, 37, 38], [702, 1105, 78, 77, 0, 37, 38], [780, 1105, 77, 77, 0, 37, 38], [1863, 1028, 77, 77, 0, 37, 38], [1940, 1028, 77, 77, 0, 37, 38], [314, 1105, 76, 77, 0, 37, 38], [155, 1258, 76, 75, 0, 37, 37], [80, 1258, 75, 75, 0, 37, 37], [1512, 1333, 75, 74, 0, 37, 36], [1664, 1333, 74, 74, 0, 37, 36], [2, 1555, 74, 73, 0, 37, 35], [158, 1333, 74, 74, 0, 37, 35], [1738, 1333, 74, 74, 0, 37, 34], [1364, 1333, 74, 74, 0, 37, 34], [1004, 1182, 76, 75, 0, 38, 35], [1089, 1105, 76, 77, 0, 38, 36], [540, 1182, 76, 76, 0, 38, 36], [857, 1105, 78, 77, 0, 39, 37], [158, 1105, 78, 77, 0, 39, 37], [236, 1105, 78, 77, 0, 39, 37], [544, 1028, 78, 77, 0, 39, 37], [694, 1182, 78, 75, 0, 39, 36], [850, 1182, 78, 75, 0, 39, 36], [1587, 1333, 77, 74, 0, 38, 36], [1119, 1482, 75, 73, 0, 37, 35], [1194, 1482, 74, 73, 0, 36, 35], [223, 1555, 75, 73, 0, 36, 35], [298, 1555, 75, 73, 0, 35, 36], [692, 1333, 76, 74, 0, 35, 36], [615, 1333, 77, 74, 0, 36, 36], [1748, 1182, 78, 75, 0, 37, 36], [772, 1182, 78, 75, 0, 37, 36], [935, 1105, 78, 77, 0, 37, 37], [390, 1105, 78, 77, 0, 37, 37], [468, 1105, 78, 77, 0, 37, 37], [1165, 1105, 77, 77, 0, 36, 37], [1319, 1105, 76, 76, 0, 36, 36], [1472, 1105, 76, 76, 0, 36, 36], [1013, 1105, 76, 77, 0, 36, 37], [928, 1182, 76, 75, 0, 36, 36], [231, 1258, 75, 75, 0, 36, 36], [1438, 1333, 74, 74, 0, 35, 36], [149, 1555, 74, 73, 0, 35, 36], [1216, 1333, 74, 74, 0, 35, 37], [921, 1333, 74, 74, 0, 35, 38], [76, 1555, 73, 73, 0, 35, 38], [1812, 1333, 75, 74, 0, 36, 39], [1307, 1258, 75, 75, 0, 36, 39], [1382, 1258, 75, 75, 0, 36, 39], [2, 1182, 76, 76, 0, 36, 40], [1702, 1105, 76, 76, 0, 36, 40], [1548, 1105, 76, 76, 0, 36, 40], [80, 1105, 78, 77, 0, 37, 40], [2, 1105, 78, 77, 0, 37, 40], [1856, 1105, 78, 76, 0, 37, 40], [1934, 1105, 79, 76, 0, 37, 40], [1784, 1028, 79, 77, 0, 37, 40], [1778, 1105, 78, 76, 0, 36, 39], [80, 1333, 78, 75, 0, 36, 39], [1915, 1258, 78, 75, 0, 36, 39], [1837, 1258, 78, 75, 0, 36, 39], [384, 1333, 78, 74, 0, 36, 38], [462, 1333, 77, 74, 0, 35, 38], [1887, 1333, 76, 74, 0, 35, 38], [968, 1482, 76, 73, 0, 35, 37], [1268, 1482, 75, 73, 0, 34, 37], [1044, 1482, 75, 73, 0, 35, 37], [225, 1482, 75, 73, 0, 35, 37], [595, 1555, 75, 72, 0, 36, 36], [150, 1482, 75, 73, 0, 36, 36], [1963, 1333, 76, 74, 0, 36, 37], [2, 1408, 76, 74, 0, 36, 37], [78, 1408, 77, 74, 0, 37, 37], [1903, 1182, 78, 75, 0, 37, 37], [1229, 1258, 78, 75, 0, 37, 37], [462, 1258, 78, 75, 0, 37, 37], [1624, 1105, 78, 76, 0, 37, 38], [155, 1028, 78, 77, 0, 37, 38], [1087, 1028, 78, 77, 0, 37, 38], [1010, 1028, 77, 77, 0, 37, 38], [1973, 936, 77, 77, 0, 37, 38], [78, 1028, 77, 77, 0, 37, 38], [2, 1028, 76, 77, 0, 37, 38], [694, 1258, 76, 75, 0, 37, 37], [1079, 1258, 75, 75, 0, 37, 37], [1049, 1408, 75, 74, 0, 37, 36], [1124, 1408, 74, 74, 0, 37, 36], [76, 1482, 74, 73, 0, 37, 35], [1532, 1408, 74, 74, 0, 37, 35], [1606, 1408, 74, 74, 0, 37, 34], [975, 1408, 74, 74, 0, 37, 34], [1457, 1258, 76, 75, 0, 38, 35], [1473, 1028, 76, 77, 0, 38, 36], [1395, 1105, 77, 76, 0, 38, 36], [233, 1028, 78, 77, 0, 39, 37], [777, 1028, 78, 77, 0, 39, 37], [622, 1028, 78, 77, 0, 39, 37], [616, 1258, 78, 75, 0, 39, 36], [384, 1258, 78, 75, 0, 39, 36], [1826, 1182, 77, 75, 0, 38, 36], [1752, 1482, 77, 73, 0, 38, 35], [1829, 1482, 75, 73, 0, 37, 35], [1904, 1482, 75, 73, 0, 36, 35], [670, 1555, 75, 72, 0, 35, 35], [900, 1408, 75, 74, 0, 35, 36], [155, 1408, 77, 74, 0, 36, 36], [2, 1333, 78, 75, 0, 37, 36], [1608, 1258, 78, 75, 0, 37, 36], [311, 1028, 78, 77, 0, 37, 37], [932, 1028, 78, 77, 0, 37, 37], [389, 1028, 78, 77, 0, 37, 37], [467, 1028, 77, 77, 0, 36, 37], [1306, 936, 65, 80, 0, 30, 38], [1371, 936, 65, 80, 0, 30, 38], [1241, 936, 65, 80, 0, 30, 38], [1176, 936, 65, 80, 0, 30, 38], [1111, 936, 65, 80, 0, 30, 38], [2, 362, 279, 182, 0, 0, 0], [1785, 2, 215, 160, 0, 0, 1], [2e3, 2, 44, 93, 0, 19, 73], [1973, 544, 57, 107, 0, 27, 77], [830, 692, 80, 122, 0, 39, 81], [1948, 362, 101, 135, 0, 50, 84], [1050, 544, 103, 139, 0, 51, 87], [662, 544, 104, 144, 0, 51, 91], [556, 544, 106, 145, 0, 52, 91], [162, 544, 108, 147, 0, 53, 92], [1689, 362, 110, 150, 0, 54, 93], [750, 692, 80, 122, 0, 40, 93], [1862, 692, 80, 116, 0, 40, 94], [1942, 692, 80, 112, 0, 40, 95], [712, 820, 79, 110, 0, 39, 97], [900, 820, 78, 106, 0, 39, 98], [1482, 820, 77, 93, 0, 38, 100], [700, 936, 77, 83, 0, 38, 92], [777, 936, 76, 82, 0, 37, 93], [946, 936, 76, 81, 0, 37, 94], [1518, 936, 60, 79, 0, 22, 94], [1658, 936, 42, 78, 0, 21, 95], [1700, 936, 40, 78, 0, 20, 96], [2030, 544, 13, 13, 0, 0, 83], [1979, 1482, 68, 67, 0, 32, 32], [616, 936, 84, 83, 0, 40, 40], [791, 820, 109, 109, 0, 53, 53], [1843, 544, 130, 129, 0, 63, 63], [1291, 544, 135, 135, 0, 66, 66], [909, 544, 141, 141, 0, 69, 69], [933, 362, 152, 152, 0, 75, 74], [780, 362, 153, 152, 0, 75, 74], [1085, 362, 152, 151, 0, 75, 74], [1388, 362, 151, 151, 0, 74, 74], [1237, 362, 151, 151, 0, 74, 74], [1539, 362, 150, 150, 0, 74, 73], [1799, 362, 149, 148, 0, 73, 72], [409, 544, 147, 146, 0, 72, 71], [766, 544, 143, 143, 0, 70, 70], [1153, 544, 138, 137, 0, 68, 67], [1426, 544, 135, 134, 0, 66, 65], [1561, 544, 132, 132, 0, 65, 64], [2, 692, 129, 128, 0, 63, 62], [1018, 1742, 33, 33, 0, 15, 15], [966, 1628, 53, 52, 0, 25, 25], [745, 1555, 72, 72, 0, 35, 35], [1925, 820, 92, 92, 0, 45, 45], [1084, 820, 96, 95, 0, 46, 46], [978, 820, 106, 106, 0, 51, 51], [484, 820, 114, 113, 0, 55, 55], [1746, 692, 116, 117, 0, 56, 57], [1151, 692, 118, 119, 0, 57, 58], [1628, 692, 118, 118, 0, 57, 57], [1269, 692, 119, 119, 0, 58, 58], [1388, 692, 120, 119, 0, 58, 58], [910, 692, 121, 121, 0, 59, 59], [628, 692, 122, 122, 0, 59, 59], [506, 692, 122, 123, 0, 59, 60], [259, 692, 123, 123, 0, 60, 60]],
    animations: {
        0: {
            frames: [56],
            speed: 1
        },
        1: {
            frames: [48],
            speed: 1
        },
        2: {
            frames: [49],
            speed: 1
        },
        3: {
            frames: [50],
            speed: 1
        },
        4: {
            frames: [51],
            speed: 1
        },
        5: {
            frames: [52, 52],
            speed: 1
        },
        6: {
            frames: [57],
            speed: 1
        },
        7: {
            frames: [53],
            speed: 1
        },
        8: {
            frames: [54],
            speed: 1
        },
        9: {
            frames: [55],
            speed: 1
        },
        lvlnum4: {
            frames: [140],
            speed: 1
        },
        BONUS_STAR_TYPE: {
            frames: [91],
            speed: 1
        },
        lvlnum20: {
            frames: [156],
            speed: 1
        },
        particle3v: {
            frames: [2],
            speed: 1
        },
        AIM_TYPE: {
            frames: [88],
            speed: 1
        },
        logov: {
            frames: [3],
            speed: 1
        },
        lvlnum6: {
            frames: [142],
            speed: 1
        },
        biglimetxt: {
            frames: [43],
            speed: 1
        },
        parteffectv3: {
            frames: [356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 41, 41, 41],
            speed: 1
        },
        particleglass2: {
            frames: [113],
            speed: 1
        },
        lvlnum9: {
            frames: [145],
            speed: 1
        },
        lvlnum5: {
            frames: [141],
            speed: 1
        },
        musiconbtn: {
            frames: [11],
            speed: 1
        },
        TELEPORT_TYPE: {
            frames: [157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307],
            speed: 1
        },
        HARD_RECT_TYPE_2: {
            frames: [70],
            speed: 1
        },
        particleglass1: {
            frames: [112],
            speed: 1
        },
        GLASS_BLOCK_TYPE: {
            frames: [111],
            speed: 1
        },
        achievdesc2: {
            frames: [30],
            speed: 1
        },
        achievdesc1: {
            frames: [29],
            speed: 1
        },
        lvlnum3: {
            frames: [139],
            speed: 1
        },
        tint2: {
            frames: [59],
            speed: 1
        },
        DECOR_HELP_3_TYPE: {
            frames: [67],
            speed: 1
        },
        backbtn: {
            frames: [6],
            speed: 1
        },
        creditstitle: {
            frames: [42],
            speed: 1
        },
        achievdesc4: {
            frames: [32],
            speed: 1
        },
        lvlnum19: {
            frames: [155],
            speed: 1
        },
        lvlnum16: {
            frames: [152],
            speed: 1
        },
        creditselk: {
            frames: [34],
            speed: 1
        },
        lvlnum2: {
            frames: [138],
            speed: 1
        },
        radugav: {
            frames: [40, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41],
            speed: 1
        },
        STATIC_BALK_1_TYPE_2: {
            frames: [73, 73],
            speed: 1
        },
        bgwinv: {
            frames: [136],
            speed: 1
        },
        MONSTER_TYPE: {
            frames: [109, 110, 109],
            speed: 1
        },
        tintbg: {
            frames: [17],
            speed: 1
        },
        DECOR_HELP_2_TYPE: {
            frames: [66],
            speed: 1
        },
        achievback: {
            frames: [35],
            speed: 1
        },
        STATIC_BOX_TYPE: {
            frames: [72, 72, 72, 72, 72, 72, 72, 72, 72, 72, 72, 72, 72, 72],
            speed: 1
        },
        lvlnum17: {
            frames: [153],
            speed: 1
        },
        lvlnum18: {
            frames: [154],
            speed: 1
        },
        HARD_RECT_TYPE: {
            frames: [69],
            speed: 1
        },
        nextlevelwin: {
            frames: [23],
            speed: 1
        },
        lvlnum1: {
            frames: [137],
            speed: 1
        },
        deathanimv: {
            frames: [108],
            speed: 1
        },
        TELEGA_TYPE: {
            frames: [123],
            speed: 1
        },
        fansv: {
            frames: [125, 126, 127, 128, 129, 130, 131, 132, 133, 134],
            speed: 1
        },
        playbtnup: {
            frames: [4],
            speed: 1
        },
        PART_50: {
            frames: [92],
            speed: 1
        },
        lvlnum15: {
            frames: [151],
            speed: 1
        },
        achievdesc0: {
            frames: [28],
            speed: 1
        },
        BOMB_TYPE: {
            frames: [96],
            speed: 1
        },
        achievdesc5: {
            frames: [33],
            speed: 1
        },
        DANGER_TYPE: {
            frames: [107],
            speed: 1
        },
        achievdesc3: {
            frames: [31],
            speed: 1
        },
        DYNAMIC_CIRCLE_TYPE: {
            frames: [122],
            speed: 1
        },
        TELEGA_TYPE_2: {
            frames: [124, 124],
            speed: 1
        },
        STATIC_BALK_1_TYPE: {
            frames: [58],
            speed: 1
        },
        LAND_TYPE_2: {
            frames: [61],
            speed: 1
        },
        bombexplosionv: {
            frames: [97, 98, 99, 100, 101, 101, 102, 102, 103, 103, 104, 104, 105, 105, 106, 106],
            speed: 1
        },
        restartbtn: {
            frames: [13],
            speed: 1
        },
        DECOR_HELP_1_TYPE: {
            frames: [65],
            speed: 1
        },
        AIM_TYPE_MOVABLE: {
            frames: [90],
            speed: 1
        },
        DYNAMIC_RECT_TYPE_2: {
            frames: [121],
            speed: 1
        },
        spelelogo: {
            frames: [47],
            speed: 1
        },
        tryagaintitle: {
            frames: [18],
            speed: 1
        },
        splashlogo: {
            frames: [46],
            speed: 1
        },
        particleglass3: {
            frames: [114],
            speed: 1
        },
        lvlnum14: {
            frames: [150],
            speed: 1
        },
        BONUS_GHOST_TYPE: {
            frames: [120],
            speed: 1
        },
        LAND_TYPE: {
            frames: [60],
            speed: 1
        },
        totalscoreslabel: {
            frames: [45],
            speed: 1
        },
        levelreadylabel: {
            frames: [44],
            speed: 1
        },
        DECOR_HELP_4_TYPE: {
            frames: [68, 68, 68, 68],
            speed: 1
        },
        LAND_TYPE_5: {
            frames: [64],
            speed: 1
        },
        particle2v: {
            frames: [1],
            speed: 1
        },
        moregames2v: {
            frames: [25],
            speed: 1
        },
        lvlnum12: {
            frames: [148],
            speed: 1
        },
        ACTIVATOR_TYPE: {
            frames: [115, 116, 116],
            speed: 1
        },
        levelselecttitle: {
            frames: [5],
            speed: 1
        },
        LAND_TYPE_3: {
            frames: [62],
            speed: 1
        },
        DOOR_TYPE: {
            frames: [117, 118, 119],
            speed: 1
        },
        particle1v: {
            frames: [0],
            speed: 1
        },
        lvlnum13: {
            frames: [149],
            speed: 1
        },
        pausetitle: {
            frames: [9],
            speed: 1
        },
        parteffectv2: {
            frames: [337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 41],
            speed: 1
        },
        BONUS_DIAMOND_TYPE: {
            frames: [86],
            speed: 1
        },
        btnbaseup: {
            frames: [15],
            speed: 1
        },
        DYNAMIC_BOX_TYPE_3: {
            frames: [84],
            speed: 1
        },
        lvlLabelStar0: {
            frames: [7],
            speed: 1
        },
        DYNAMIC_BOX_TYPE_2: {
            frames: [83],
            speed: 1
        },
        lvlLabelStar3: {
            frames: [21],
            speed: 1
        },
        lvlLabelStar2: {
            frames: [20],
            speed: 1
        },
        newachievtitle: {
            frames: [37],
            speed: 1
        },
        lvlLabelStar1: {
            frames: [19],
            speed: 1
        },
        lvlcompletebgnew: {
            frames: [22],
            speed: 1
        },
        PART_200: {
            frames: [95, 95],
            speed: 1
        },
        HARD_BOX_TYPE_5: {
            frames: [78],
            speed: 1
        },
        GLASS_BOX_TYPE: {
            frames: [79],
            speed: 1
        },
        DYNAMIC_RECT_TYPE: {
            frames: [73],
            speed: 1
        },
        DYNAMIC_TRIANGLE_TYPE: {
            frames: [85, 85, 85, 85, 85],
            speed: 1
        },
        PART_150: {
            frames: [94],
            speed: 1
        },
        HERO_TYPE: {
            frames: [81],
            speed: 1
        },
        HARD_BOX_TYPE_4: {
            frames: [77],
            speed: 1
        },
        achievmenutitle: {
            frames: [26],
            speed: 1
        },
        bigbg: {
            frames: [135],
            speed: 1
        },
        parteffectv1: {
            frames: [315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336],
            speed: 1
        },
        quitbtn: {
            frames: [10],
            speed: 1
        },
        achievclosed: {
            frames: [27],
            speed: 1
        },
        musicoffbtn: {
            frames: [12],
            speed: 1
        },
        achievbtn: {
            frames: [14],
            speed: 1
        },
        smallwinv: {
            frames: [314],
            speed: 1
        },
        completeelk: {
            frames: [39],
            speed: 1
        },
        lvlnum10: {
            frames: [146],
            speed: 1
        },
        levelbuttonlocked: {
            frames: [8],
            speed: 1
        },
        lvlnum11: {
            frames: [147],
            speed: 1
        },
        pausebtn: {
            frames: [16],
            speed: 1
        },
        HARD_BOX_TYPE_3: {
            frames: [76],
            speed: 1
        },
        HARD_BOX_TYPE_2: {
            frames: [75],
            speed: 1
        },
        PART_100: {
            frames: [93],
            speed: 1
        },
        HARD_BOX_TYPE: {
            frames: [74],
            speed: 1
        },
        FAN_TYPE_ON: {
            frames: [309, 310, 311, 312, 309, 310, 311, 312, 309, 309],
            speed: 1
        },
        AIM_BACK: {
            frames: [89],
            speed: 1
        },
        newachievbgv: {
            frames: [38],
            speed: 1
        },
        achievelk: {
            frames: [36],
            speed: 1
        },
        DYNAMIC_BOX_TYPE: {
            frames: [82],
            speed: 1
        },
        HARD_TRIANGLE_TYPE: {
            frames: [71],
            speed: 1
        },
        smallbg: {
            frames: [313],
            speed: 1
        },
        LAND_TYPE_4: {
            frames: [63],
            speed: 1
        },
        lvlnum7: {
            frames: [143],
            speed: 1
        },
        FAN_TYPE: {
            frames: [308],
            speed: 1
        },
        GLASS_TRIANGLE_TYPE: {
            frames: [80],
            speed: 1
        },
        BONUS_MONEY_TYPE: {
            frames: [87],
            speed: 1
        },
        completestar: {
            frames: [24, 24],
            speed: 1
        },
        lvlnum8: {
            frames: [144],
            speed: 1
        }
    }
}
  , interfaceCFG = {}
  , bgCFG = {
    framerate: 24,
    images: ["assets/cheapbg.jpg"],
    frames: [[0, 270, 401, 270, 0, 0, 0], [401, 270, 401, 270, 0, 0, 0], [0, 540, 401, 270, 0, 0, 0], [401, 0, 401, 270, 0, 0, 0], [0, 0, 401, 270, 0, 0, 0]],
    animations: {
        bigbg: {
            speed: 1,
            frames: [0, 1, 2, 3, 4]
        }
    }
}
  , PART_STAR_TYPE = 1
  , PART_CLOUD_TYPE = 2
  , PART_NUM_TYPE = 3
  , PART_INSTRUCTION_TYPE = 4
  , PART_GLASS_TYPE = 5
  , PART_ACHIEV_TYPE = 6
  , MAX_PARTICLES_ON_SCREEN = 12;
(function(e) {
    function t(e, t, n) {
        this.initialize(e, t, n)
    }
    var n = t.prototype;
    n.initialize = function(e, t, n) {
        var r = new createjs.Sprite(zoeSS);
        r.snapToPixel = !0;
        r.baseBlock = this;
        this.vis = r;
        this.reset(e, t, n)
    }
    ;
    n.reset = function(e, t, n) {
        this.type = e;
        this.vis.parent != t && removeFromParent(this.vis);
        createjs.Tween.removeTweens(this.vis);
        this.parent = t;
        this.vis.alpha = 1;
        this.vis.mouseEnabled = !1;
        this.speedY = this.speedX = 0;
        this.moveTarget = null ;
        this.speedA = 0;
        this.speedScale = .05;
        this.maxScale = 1.2;
        this.isPrerendered = !1;
        this.speedAlpha = .08;
        this.gravity = .6;
        this.isNum = !1;
        this.beforeHideTimer = .1;
        this.isNeedDispose = this.isInstruction = !1;
        this.vis.spriteSheet = zoeSS;
        deleteCache(this.vis);
        var r = "numb0";
        e == PART_STAR_TYPE ? r = .7 < Math.random() ? "particle1v" : .5 < Math.random() ? "particle3v" : "particle2v" : e == PART_NUM_TYPE || e == PART_ACHIEV_TYPE ? this.isNum = !0 : e == PART_CLOUD_TYPE ? (this.gravity = 0,
        r = .5 < Math.random() ? "cloud1v" : "cloud2v") : e == PART_INSTRUCTION_TYPE ? this.isInstruction = !0 : e === PART_GLASS_TYPE && (r = .7 < Math.random() ? "particleglass1" : .5 < Math.random() ? "particleglass2" : "particleglass3");
        this.vis.gotoAndStop(r);
        this.scale = n;
        this.updateVisionScale();
        t.addChild(this.vis)
    }
    ;
    n.setPos = function(e, t) {
        this.vis.x = e;
        this.vis.y = t
    }
    ;
    n.setNum = function(e) {
        this.beforeHideTimer = 10;
        this.speedAlpha = .03;
        this.gravity = 0;
        this.vis.rotation = 0;
        this.vis.gotoAndStop("PART_" + e)
    }
    ;
    n.setFrame = function(e, t) {
        this.gravity = 0;
        this.vis.rotation = 0;
        t ? this.vis.gotoAndPlay(e) : this.vis.gotoAndStop(e)
    }
    ;
    n.tick = function() {
        if (!(this.isNeedDispose || (this.moveTarget ? (this.vis.x = this.moveTarget.x,
        this.vis.y = this.moveTarget.y) : (this.vis.x += this.speedX * dtScale,
        this.vis.y += this.speedY * dtScale,
        this.speedY += this.gravity * dtScale,
        this.vis.rotation += this.speedA * dtScale),
        this.beforeHideTimer -= dtScale,
        0 < this.beforeHideTimer)))
            if (this.isPrerendered)
                this.isNeedDispose = !0;
            else {
                if (this.isNum)
                    this.vis.alpha -= this.speedAlpha * dtScale;
                else {
                    if (this.isInstruction)
                        return;
                    this.vis.visible = !0;
                    this.vis.scaleX += this.speedScale * dtScale;
                    this.vis.scaleX > this.maxScale && (this.vis.alpha -= this.speedAlpha * dtScale);
                    this.vis.scaleY = this.vis.scaleX
                }
                .01 > this.vis.alpha && (this.isNeedDispose = !0)
            }
    }
    ;
    n.updateVisionScale = function() {
        this.vis.scaleX = this.vis.scaleY = this.scale
    }
    ;
    n.dispose = function() {
        isArrayContains(allParts, this) && allParts.splice(allParts.indexOf(this, 0), 1);
        addToDisposedParts(this);
        this.vis.removeAllEventListeners();
        this.vis.stop();
        removeFromParent(this.vis)
    }
    ;
    e.ParticleBase = t
})(window);
var allParts = []
  , disposedParts = [];
var partSin, partCos, partScale;
var allPartsLenght = 0;
var partLength = 0
  , currPart = null
  , disposeNeededParts = [];
(function() {
    Object.create = Object.create || function(e) {
        function t() {}
        return t.prototype = e,
        new t
    }
    ;
    var e;
    "undefined" == typeof exports ? (e = {},
    "object" == typeof window && (window.cp = e)) : e = exports;
    var t, n, r = function(e, t) {
        if (!e)
            throw Error("Assertion failed: " + t)
    }
    , i = function(e, t) {
        !e && console && console.warn && (console.warn("ASSERTION FAILED: " + t),
        console.trace && console.trace())
    }
    , s = function(e, t) {
        return t > e ? e : t
    }
    , o = function(e, t) {
        return e > t ? e : t
    }
    ;
    "object" == typeof window && -1 < window.navigator.userAgent.indexOf("Firefox") ? (t = Math.min,
    n = Math.max) : (t = s,
    n = o);
    var u = function(e, t) {
        return t > e ? e + " " + t : t + " " + e
    }
      , a = function(e, t) {
        for (var n = 0; e.length > n; n++)
            if (e[n] === t)
                return e[n] = e[e.length - 1],
                e.length--,
                void 0
    }
    ;
    e.momentForCircle = function(e, t, n, r) {
        return e * (.5 * (t * t + n * n) + A(r))
    }
    ;
    e.areaForCircle = function(e, t) {
        return Math.PI * Math.abs(e * e - t * t)
    }
    ;
    e.momentForSegment = function(e, t, n) {
        var r = x(w(t, n), .5);
        return e * (B(n, t) / 12 + A(r))
    }
    ;
    e.areaForSegment = function(e, t, n) {
        return n * (Math.PI * n + 2 * H(e, t))
    }
    ;
    e.momentForPoly = function(e, t, n) {
        for (var r = 0, i = 0, s = t.length, o = 0; s > o; o += 2)
            var u = t[o] + n.x
              , a = t[o + 1] + n.y
              , f = t[(o + 2) % s] + n.x
              , l = t[(o + 3) % s] + n.y
              , c = f * a - l * u
              , r = r + c * (u * u + a * a + (u * f + a * l) + (f * f + l * l))
              , i = i + c;
        return e * r / (6 * i)
    }
    ;
    e.areaForPoly = function(e) {
        for (var t = 0, n = 0, r = e.length; r > n; n += 2)
            t += T(new v(e[n],e[n + 1]), new v(e[(n + 2) % r],e[(n + 3) % r]));
        return -t / 2
    }
    ;
    e.centroidForPoly = function(e) {
        for (var t = 0, n = new v(0,0), r = 0, i = e.length; i > r; r += 2)
            var s = new v(e[r],e[r + 1])
              , o = new v(e[(r + 2) % i],e[(r + 3) % i])
              , u = T(s, o)
              , t = t + u
              , n = w(n, x(w(s, o), u));
        return x(n, 1 / (3 * t))
    }
    ;
    e.recenterPoly = function(t) {
        for (var n = e.centroidForPoly(t), r = 0; t.length > r; r += 2)
            t[r] -= n.x,
            t[r + 1] -= n.y
    }
    ;
    e.momentForBox = function(e, t, n) {
        return e * (t * t + n * n) / 12
    }
    ;
    e.momentForBox2 = function(t, n) {
        var r = n.r - n.l
          , i = n.t - n.b
          , s = x([n.l + n.r, n.b + n.t], .5);
        return e.momentForBox(t, r, i) + t * A(s)
    }
    ;
    var f = e.loopIndexes = function(e) {
        var t, n, r, i, s = 0, o = 0;
        t = r = e[0];
        n = i = e[1];
        for (var u = e.length >> 1, a = 1; u > a; a++) {
            var f = e[2 * a]
              , l = e[2 * a + 1];
            t > f || f == t && n > l ? (t = f,
            n = l,
            s = a) : (f > r || f == r && l > i) && (r = f,
            i = l,
            o = a)
        }
        return [s, o]
    }
      , l = function(e, t, n) {
        var r = e[2 * t];
        e[2 * t] = e[2 * n];
        e[2 * n] = r;
        r = e[2 * t + 1];
        e[2 * t + 1] = e[2 * n + 1];
        e[2 * n + 1] = r
    }
      , c = function(e, t, n, r, i, s) {
        if (0 === n)
            return 0;
        var o = 0
          , u = t;
        i = E(i, r);
        s *= y(i);
        var a = t;
        for (n = t + n - 1; n >= a; ) {
            var f = new v(e[2 * a],e[2 * a + 1])
              , f = T(i, E(f, r));
            f > s ? (f > o && (o = f,
            u = a),
            a++) : (l(e, a, n),
            n--)
        }
        return u != t && l(e, t, u),
        a - t
    }
      , h = function(e, t, n, r, i, s, o, u) {
        if (0 > r)
            return 0;
        if (0 == r)
            return t[2 * u] = s.x,
            t[2 * u + 1] = s.y,
            1;
        var a = c(t, n, r, i, s, e)
          , f = new v(t[2 * n],t[2 * n + 1]);
        i = h(e, t, n + 1, a - 1, i, f, s, u);
        f = u + i++;
        t[2 * f] = s.x;
        t[2 * f + 1] = s.y;
        r = c(t, n + a, r - a, s, o, e);
        f = new v(t[2 * (n + a)],t[2 * (n + a) + 1]);
        return i + h(e, t, n + a + 1, r - 1, s, f, o, u + i)
    }
    ;
    e.convexHull = function(e, t, n) {
        if (t)
            for (var r = 0; e.length > r; r++)
                t[r] = e[r];
        else
            t = e;
        var s = f(e)
          , r = s[0]
          , s = s[1];
        if (r == s)
            return t.length = 2,
            t;
        l(t, 0, r);
        l(t, 1, 0 == s ? r : s);
        r = new v(t[0],t[1]);
        s = new v(t[2],t[3]);
        e = h(n, t, 2, (e.length >> 1) - 2, r, s, r, 1) + 1;
        return t.length = 2 * e,
        i(J(t), "Internal error: cpConvexHull() and cpPolyValidate() did not agree.Please report this error with as much info as you can."),
        t
    }
    ;
    var p = function(e, r, i) {
        return t(n(e, r), i)
    }
      , d = function(e) {
        return n(0, t(e, 1))
    }
      , v = e.Vect = function(e, t) {
        this.x = e;
        this.y = t
    }
    ;
    e.v = function(e, t) {
        return new v(e,t)
    }
    ;
    var m = e.vzero = new v(0,0)
      , g = e.v.dot = function(e, t) {
        return e.x * t.x + e.y * t.y
    }
      , y = e.v.len = function(e) {
        return Math.sqrt(g(e, e))
    }
      , b = e.v.len2 = function(e, t) {
        return Math.sqrt(e * e + t * t)
    }
    ;
    e.v.eql = function(e, t) {
        return e.x === t.x && e.y === t.y
    }
    ;
    var w = e.v.add = function(e, t) {
        return new v(e.x + t.x,e.y + t.y)
    }
    ;
    v.prototype.add = function(e) {
        return this.x += e.x,
        this.y += e.y,
        this
    }
    ;
    var E = e.v.sub = function(e, t) {
        return new v(e.x - t.x,e.y - t.y)
    }
    ;
    v.prototype.sub = function(e) {
        return this.x -= e.x,
        this.y -= e.y,
        this
    }
    ;
    var S = e.v.neg = function(e) {
        return new v(-e.x,-e.y)
    }
    ;
    v.prototype.neg = function() {
        return this.x = -this.x,
        this.y = -this.y,
        this
    }
    ;
    var x = e.v.mult = function(e, t) {
        return new v(e.x * t,e.y * t)
    }
    ;
    v.prototype.mult = function(e) {
        return this.x *= e,
        this.y *= e,
        this
    }
    ;
    var T = e.v.cross = function(e, t) {
        return e.x * t.y - e.y * t.x
    }
      , N = e.v.perp = function(e) {
        return new v(-e.y,e.x)
    }
    ;
    e.v.pvrperp = function(e) {
        return new v(e.y,-e.x)
    }
    ;
    var C = e.v.project = function(e, t) {
        return x(t, g(e, t) / A(t))
    }
    ;
    v.prototype.project = function(e) {
        return this.mult(g(this, e) / A(e)),
        this
    }
    ;
    var k = e.v.rotate = function(e, t) {
        return new v(e.x * t.x - e.y * t.y,e.x * t.y + e.y * t.x)
    }
    ;
    v.prototype.rotate = function(e) {
        return this.x = this.x * e.x - this.y * e.y,
        this.y = this.x * e.y + this.y * e.x,
        this
    }
    ;
    var L = e.v.unrotate = function(e, t) {
        return new v(e.x * t.x + e.y * t.y,e.y * t.x - e.x * t.y)
    }
      , A = e.v.lengthsq = function(e) {
        return g(e, e)
    }
      , O = e.v.lengthsq2 = function(e, t) {
        return e * e + t * t
    }
      , M = e.v.lerp = function(e, t, n) {
        return w(x(e, 1 - n), x(t, n))
    }
      , _ = e.v.normalize = function(e) {
        return x(e, 1 / y(e))
    }
      , D = e.v.normalize_safe = function(e) {
        return 0 === e.x && 0 === e.y ? m : _(e)
    }
      , P = e.v.clamp = function(e, t) {
        return g(e, e) > t * t ? x(_(e), t) : e
    }
    ;
    e.v.lerpconst = function(e, t, n) {
        return w(e, P(E(t, e), n))
    }
    ;
    var H = e.v.dist = function(e, t) {
        return y(E(e, t))
    }
      , B = e.v.distsq = function(e, t) {
        return A(E(e, t))
    }
    ;
    e.v.near = function(e, t, n) {
        return n * n > B(e, t)
    }
    ;
    var j = e.v.slerp = function(e, t, n) {
        var r = Math.acos(g(e, t));
        if (r) {
            var i = 1 / Math.sin(r);
            return w(x(e, Math.sin((1 - n) * r) * i), x(t, Math.sin(n * r) * i))
        }
        return e
    }
    ;
    e.v.slerpconst = function(e, n, r) {
        var i = Math.acos(g(e, n));
        return j(e, n, t(r, i) / i)
    }
    ;
    e.v.forangle = function(e) {
        return new v(Math.cos(e),Math.sin(e))
    }
    ;
    e.v.toangle = function(e) {
        return Math.atan2(e.y, e.x)
    }
    ;
    e.v.str = function(e) {
        return "(" + e.x.toFixed(3) + ", " + e.y.toFixed(3) + ")"
    }
    ;
    var F = 0
      , I = e.BB = function(e, t, n, r) {
        this.l = e;
        this.b = t;
        this.r = n;
        this.t = r;
        F++
    }
    ;
    e.bb = function(e, t, n, r) {
        return new I(e,t,n,r)
    }
    ;
    var q = 0;
    e.NO_GROUP = 0;
    var R = e.ALL_LAYERS = -1;
    e.resetShapeIdCounter = function() {
        q = 0
    }
    ;
    var U = e.Shape = function(e) {
        this.body = e;
        this.bb_l = this.bb_b = this.bb_r = this.bb_t = 0;
        this.hashid = q++;
        this.sensor = !1;
        this.u = this.e = 0;
        this.surface_v = m;
        this.group = this.collision_type = 0;
        this.layers = R;
        this.space = null ;
        this.collisionCode = this.collisionCode
    }
    ;
    U.prototype.setElasticity = function(e) {
        this.e = e
    }
    ;
    U.prototype.setFriction = function(e) {
        this.body.activate();
        this.u = e
    }
    ;
    U.prototype.setLayers = function(e) {
        this.body.activate();
        this.layers = e
    }
    ;
    U.prototype.setSensor = function(e) {
        this.body.activate();
        this.sensor = e
    }
    ;
    U.prototype.setCollisionType = function(e) {
        this.body.activate();
        this.collision_type = e
    }
    ;
    U.prototype.getBody = function() {
        return this.body
    }
    ;
    U.prototype.active = function() {
        return this.body && -1 !== this.body.shapeList.indexOf(this)
    }
    ;
    U.prototype.setBody = function(e) {
        r(!this.active(), "You cannot change the body on an active shape. You must remove the shape from the space before changing the body.");
        this.body = e
    }
    ;
    U.prototype.cacheBB = function() {
        return this.update(this.body.p, this.body.rot)
    }
    ;
    U.prototype.update = function(e, t) {
        r(!isNaN(t.x), "Rotation is NaN");
        r(!isNaN(e.x), "Position is NaN");
        this.cacheData(e, t)
    }
    ;
    U.prototype.pointQuery = function(e) {
        e = this.nearestPointQuery(e);
        return 0 > e.d ? e : void 0
    }
    ;
    U.prototype.getBB = function() {
        return new I(this.bb_l,this.bb_b,this.bb_r,this.bb_t)
    }
    ;
    var z = function(e, t, n) {
        this.shape = e;
        this.p = t;
        this.d = n
    }
      , W = function(e, t, n) {
        this.shape = e;
        this.t = t;
        this.n = n
    }
    ;
    W.prototype.hitPoint = function(e, t) {
        return M(e, t, this.t)
    }
    ;
    W.prototype.hitDist = function(e, t) {
        return H(e, t) * this.t
    }
    ;
    var X = e.CircleShape = function(e, t, n) {
        this.c = this.tc = n;
        this.r = t;
        this.type = "circle";
        U.call(this, e)
    }
    ;
    X.prototype = Object.create(U.prototype);
    X.prototype.cacheData = function(e, t) {
        var n = this.tc = k(this.c, t).add(e)
          , r = this.r;
        this.bb_l = n.x - r;
        this.bb_b = n.y - r;
        this.bb_r = n.x + r;
        this.bb_t = n.y + r
    }
    ;
    X.prototype.nearestPointQuery = function(e) {
        var t = e.x - this.tc.x
          , n = e.y - this.tc.y;
        e = b(t, n);
        var r = this.r
          , t = new v(this.tc.x + t * r / e,this.tc.y + n * r / e);
        return new z(this,t,e - r)
    }
    ;
    var V = function(e, t, n, r, i) {
        r = E(r, t);
        i = E(i, t);
        t = g(r, r) - 2 * g(r, i) + g(i, i);
        var s = -2 * g(r, r) + 2 * g(r, i);
        n = g(r, r) - n * n;
        n = s * s - 4 * t * n;
        if (0 <= n && (t = (-s - Math.sqrt(n)) / (2 * t),
        0 <= t && 1 >= t))
            return new W(e,t,_(M(r, i, t)))
    }
    ;
    X.prototype.segmentQuery = function(e, t) {
        return V(this, this.tc, this.r, e, t)
    }
    ;
    var $ = e.SegmentShape = function(e, t, n, r) {
        this.a = t;
        this.b = n;
        this.n = N(_(E(n, t)));
        this.ta = this.tb = this.tn = null ;
        this.r = r;
        this.b_tangent = this.a_tangent = m;
        this.type = "segment";
        U.call(this, e)
    }
    ;
    $.prototype = Object.create(U.prototype);
    $.prototype.cacheData = function(e, t) {
        this.ta = w(e, k(this.a, t));
        this.tb = w(e, k(this.b, t));
        this.tn = k(this.n, t);
        var n, r, i, s;
        this.ta.x < this.tb.x ? (n = this.ta.x,
        r = this.tb.x) : (n = this.tb.x,
        r = this.ta.x);
        this.ta.y < this.tb.y ? (i = this.ta.y,
        s = this.tb.y) : (i = this.tb.y,
        s = this.ta.y);
        var o = this.r;
        this.bb_l = n - o;
        this.bb_b = i - o;
        this.bb_r = r + o;
        this.bb_t = s + o
    }
    ;
    $.prototype.nearestPointQuery = function(e) {
        var t;
        t = this.tb;
        var n = E(this.ta, t)
          , r = d(g(n, E(e, t)) / A(n));
        t = w(t, x(n, r));
        var n = e.x - t.x
          , i = e.y - t.y;
        e = b(n, i);
        r = this.r;
        t = e ? w(t, x(new v(n,i), r / e)) : t;
        return new z(this,t,e - r)
    }
    ;
    $.prototype.segmentQuery = function(e, t) {
        var n = this.tn
          , r = g(E(this.ta, e), n)
          , i = this.r
          , s = 0 < r ? S(n) : n
          , o = E(x(s, i), e)
          , u = w(this.ta, o)
          , a = w(this.tb, o)
          , o = E(t, e);
        if (0 >= T(o, u) * T(o, a)) {
            if (i = r + (0 < r ? -i : i),
            r = -i,
            n = g(o, n) - i,
            0 > r * n)
                return new W(this,r / (r - n),s)
        } else if (0 !== i)
            return s = V(this, this.ta, this.r, e, t),
            n = V(this, this.tb, this.r, e, t),
            s ? n && n.t < s.t ? n : s : n
    }
    ;
    $.prototype.setNeighbors = function(e, t) {
        this.a_tangent = E(e, this.a);
        this.b_tangent = E(t, this.b)
    }
    ;
    $.prototype.setEndpoints = function(e, t) {
        this.a = e;
        this.b = t;
        this.n = N(_(E(t, e)))
    }
    ;
    var J = function(e) {
        for (var t = e.length, n = 0; t > n; n += 2) {
            var r = e[(n + 2) % t]
              , i = e[(n + 3) % t];
            if (0 < (r - e[n]) * (e[(n + 5) % t] - i) - (i - e[n + 1]) * (e[(n + 4) % t] - r))
                return !1
        }
        return !0
    }
      , K = e.PolyShape = function(e, t, n) {
        this.setVerts(t, n);
        this.type = "poly";
        U.call(this, e)
    }
    ;
    K.prototype = Object.create(U.prototype);
    var Q = function(e, t) {
        this.n = e;
        this.d = t
    }
    ;
    Q.prototype.compare = function(e) {
        return g(this.n, e) - this.d
    }
    ;
    K.prototype.setVerts = function(e, t) {
        r(4 <= e.length, "Polygons require some verts");
        r("number" == typeof e[0], "Polygon verticies should be specified in a flattened list (eg [x1,y1,x2,y2,x3,y3,...])");
        r(J(e), "Polygon is concave or has a reversed winding. Consider using cpConvexHull()");
        var n = e.length
          , i = n >> 1;
        this.verts = Array(n);
        this.tVerts = Array(n);
        this.planes = Array(i);
        this.tPlanes = Array(i);
        for (i = 0; n > i; i += 2) {
            var s = e[i] + t.x
              , o = e[i + 1] + t.y
              , u = _(N(new v(e[(i + 2) % n] + t.x - s,e[(i + 3) % n] + t.y - o)));
            this.verts[i] = s;
            this.verts[i + 1] = o;
            this.planes[i >> 1] = new Q(u,u.x * s + u.y * o);
            this.tPlanes[i >> 1] = new Q(new v(0,0),0)
        }
    }
    ;
    e.BoxShape = function(e, t, n) {
        t /= 2;
        n /= 2;
        return G(e, new I(-t,-n,t,n))
    }
    ;
    var G = e.BoxShape2 = function(e, t) {
        return new K(e,[t.l, t.b, t.l, t.t, t.r, t.t, t.r, t.b],m)
    }
    ;
    K.prototype.transformVerts = function(e, r) {
        for (var i = this.verts, s = this.tVerts, o = 1 / 0, u = -1 / 0, a = 1 / 0, f = -1 / 0, l = 0; i.length > l; l += 2) {
            var c = i[l]
              , h = i[l + 1]
              , p = e.x + c * r.x - h * r.y
              , c = e.y + c * r.y + h * r.x;
            s[l] = p;
            s[l + 1] = c;
            o = t(o, p);
            u = n(u, p);
            a = t(a, c);
            f = n(f, c)
        }
        this.bb_l = o;
        this.bb_b = a;
        this.bb_r = u;
        this.bb_t = f
    }
    ;
    K.prototype.transformAxes = function(e, t) {
        for (var n = this.planes, r = this.tPlanes, i = 0; n.length > i; i++) {
            var s = k(n[i].n, t);
            r[i].n = s;
            r[i].d = g(e, s) + n[i].d
        }
    }
    ;
    K.prototype.cacheData = function(e, t) {
        this.transformAxes(e, t);
        this.transformVerts(e, t)
    }
    ;
    K.prototype.nearestPointQuery = function(e) {
        for (var t = this.tPlanes, n = this.tVerts, r = n[n.length - 2], i = n[n.length - 1], s = 1 / 0, o = m, u = !1, a = 0; t.length > a; a++) {
            0 < t[a].compare(e) && (u = !0);
            var f = n[2 * a], l = n[2 * a + 1], c;
            c = f;
            var h = l
              , r = r - c
              , i = i - h
              , p = d((r * (e.x - c) + i * (e.y - h)) / O(r, i));
            c = new v(c + r * p,h + i * p);
            h = H(e, c);
            s > h && (s = h,
            o = c);
            r = f;
            i = l
        }
        return new z(this,o,u ? s : -s)
    }
    ;
    K.prototype.segmentQuery = function(e, t) {
        for (var n = this.tPlanes, r = this.tVerts, i = n.length, s = 2 * i, o = 0; i > o; o++) {
            var u = n[o].n
              , a = g(e, u);
            if (!(n[o].d > a)) {
                var f = g(t, u)
                  , a = (n[o].d - a) / (f - a);
                if (!(0 > a || 1 < a)) {
                    var f = M(e, t, a)
                      , f = -T(u, f)
                      , l = -(u.x * r[(2 * o + 3) % s] - u.y * r[(2 * o + 2) % s]);
                    if (f >= -(u.x * r[2 * o + 1] - u.y * r[2 * o]) && l >= f)
                        return new W(this,a,u)
                }
            }
        }
    }
    ;
    K.prototype.valueOnAxis = function(e, n) {
        for (var r = this.tVerts, i = e.x * r[0] + e.y * r[1], s = 2; r.length > s; s += 2)
            i = t(i, e.x * r[s] + e.y * r[s + 1]);
        return i - n
    }
    ;
    K.prototype.containsVert = function(e, t) {
        for (var n = this.tPlanes, r = 0; n.length > r; r++) {
            var i = n[r].n;
            if (0 < i.x * e + i.y * t - n[r].d)
                return !1
        }
        return !0
    }
    ;
    K.prototype.containsVertPartial = function(e, t, n) {
        for (var r = this.tPlanes, i = 0; r.length > i; i++) {
            var s = r[i].n;
            if (!(0 > g(s, n)) && 0 < s.x * e + s.y * t - r[i].d)
                return !1
        }
        return !0
    }
    ;
    K.prototype.getNumVerts = function() {
        return this.verts.length / 2
    }
    ;
    K.prototype.getVert = function(e) {
        return new v(this.verts[2 * e],this.verts[2 * e + 1])
    }
    ;
    var Y = e.Body = function(e, t) {
        this.p = new v(0,0);
        this.vx = this.vy = 0;
        this.f = new v(0,0);
        this.t = this.w = 0;
        this.v_limit = 1 / 0;
        this.w_limit = 1 / 0;
        this.w_bias = this.v_biasx = this.v_biasy = 0;
        this.space = null ;
        this.shapeList = [];
        this.nodeNext = this.nodeRoot = this.constraintList = this.arbiterList = null ;
        this.nodeIdleTime = 0;
        this.setMass(e);
        this.setMoment(t);
        this.rot = new v(0,0);
        this.setAngle(0)
    }
    ;
    if ("undefined" != typeof DEBUG && DEBUG) {
        var Z = function(e, t) {
            r(e.x == e.x && e.y == e.y, t)
        }
          , et = function(e, t) {
            r(1 / 0 !== Math.abs(e.x) && 1 / 0 !== Math.abs(e.y), t)
        }
        ;
        Y.prototype.sanityCheck = function() {
            r(this.m === this.m && this.m_inv === this.m_inv, "Body's mass is invalid.");
            r(this.i === this.i && this.i_inv === this.i_inv, "Body's moment is invalid.");
            var e = this.p;
            Z(e, "Body's position is invalid.");
            et(e, "Body's position is invalid.");
            e = this.f;
            Z(e, "Body's force is invalid.");
            et(e, "Body's force is invalid.");
            r(this.vx === this.vx && 1 / 0 !== Math.abs(this.vx), "Body's velocity is invalid.");
            r(this.vy === this.vy && 1 / 0 !== Math.abs(this.vy), "Body's velocity is invalid.");
            r(this.a === this.a && 1 / 0 !== Math.abs(this.a), "Body's angle is invalid.");
            r(this.w === this.w && 1 / 0 !== Math.abs(this.w), "Body's angular velocity is invalid.");
            r(this.t === this.t && 1 / 0 !== Math.abs(this.t), "Body's torque is invalid.");
            e = this.rot;
            Z(e, "Body's rotation vector is invalid.");
            et(e, "Body's rotation vector is invalid.");
            r(this.v_limit === this.v_limit, "Body's velocity limit is invalid.");
            r(this.w_limit === this.w_limit, "Body's angular velocity limit is invalid.")
        }
    } else
        Y.prototype.sanityCheck = function() {}
        ;
    Y.prototype.getPos = function() {
        return this.p
    }
    ;
    Y.prototype.getVel = function() {
        return new v(this.vx,this.vy)
    }
    ;
    Y.prototype.getAngVel = function() {
        return this.w
    }
    ;
    Y.prototype.isSleeping = function() {
        return null !== this.nodeRoot
    }
    ;
    Y.prototype.isStatic = function() {
        return 1 / 0 === this.nodeIdleTime
    }
    ;
    Y.prototype.isRogue = function() {
        return null === this.space
    }
    ;
    Y.prototype.setMass = function(e) {
        r(0 < e, "Mass must be positive and non-zero.");
        this.activate();
        this.m = e;
        this.m_inv = 1 / e
    }
    ;
    Y.prototype.setMoment = function(e) {
        r(0 < e, "Moment of Inertia must be positive and non-zero.");
        this.activate();
        this.i = e;
        this.i_inv = 1 / e
    }
    ;
    Y.prototype.addShape = function(e) {
        this.shapeList.push(e)
    }
    ;
    Y.prototype.removeShape = function(e) {
        a(this.shapeList, e)
    }
    ;
    var tt = function(e, t, n) {
        return e === n ? e.next(t) : (e.a === t ? e.next_a = tt(e.next_a, t, n) : e.next_b = tt(e.next_b, t, n),
        e)
    }
    ;
    Y.prototype.removeConstraint = function(e) {
        this.constraintList = tt(this.constraintList, this, e)
    }
    ;
    Y.prototype.setPos = function(t) {
        this.activate();
        this.sanityCheck();
        t === m && (t = e.v(0, 0));
        this.p = t
    }
    ;
    Y.prototype.setVel = function(e) {
        this.activate();
        this.vx = e.x;
        this.vy = e.y
    }
    ;
    Y.prototype.setAngVel = function(e) {
        this.activate();
        this.w = e
    }
    ;
    Y.prototype.setAngleInternal = function(e) {
        r(!isNaN(e), "Internal Error: Attempting to set body's angle to NaN");
        this.a = e;
        this.rot.x = Math.cos(e);
        this.rot.y = Math.sin(e)
    }
    ;
    Y.prototype.setAngle = function(e) {
        this.activate();
        this.sanityCheck();
        this.setAngleInternal(e)
    }
    ;
    Y.prototype.velocity_func = function(e, t, n) {
        var r = this.vx * t + (e.x + this.f.x * this.m_inv) * n;
        e = this.vy * t + (e.y + this.f.y * this.m_inv) * n;
        var i = this.v_limit
          , s = r * r + e * e
          , i = s > i * i ? i / Math.sqrt(s) : 1;
        this.vx = r * i;
        this.vy = e * i;
        r = this.w_limit;
        this.w = p(this.w * t + this.t * this.i_inv * n, -r, r);
        this.sanityCheck()
    }
    ;
    Y.prototype.position_func = function(e) {
        this.p.x += (this.vx + this.v_biasx) * e;
        this.p.y += (this.vy + this.v_biasy) * e;
        this.setAngleInternal(this.a + (this.w + this.w_bias) * e);
        this.w_bias = this.v_biasx = this.v_biasy = 0;
        this.sanityCheck()
    }
    ;
    Y.prototype.resetForces = function() {
        this.activate();
        this.f = new v(0,0);
        this.t = 0
    }
    ;
    Y.prototype.applyForce = function(e, t) {
        this.activate();
        this.f = w(this.f, e);
        this.t += T(t, e)
    }
    ;
    Y.prototype.applyImpulse = function(e, t) {
        this.activate();
        Vt(this, e.x, e.y, t)
    }
    ;
    Y.prototype.getVelAtPoint = function(e) {
        return w(new v(this.vx,this.vy), x(N(e), this.w))
    }
    ;
    Y.prototype.getVelAtWorldPoint = function(e) {
        return this.getVelAtPoint(E(e, this.p))
    }
    ;
    Y.prototype.getVelAtLocalPoint = function(e) {
        return this.getVelAtPoint(k(e, this.rot))
    }
    ;
    Y.prototype.eachShape = function(e) {
        for (var t = 0, n = this.shapeList.length; n > t; t++)
            e(this.shapeList[t])
    }
    ;
    Y.prototype.eachConstraint = function(e) {
        for (var t = this.constraintList; t; ) {
            var n = t.next(this);
            e(t);
            t = n
        }
    }
    ;
    Y.prototype.eachArbiter = function(e) {
        for (var t = this.arbiterList; t; ) {
            var n = t.next(this);
            t.swappedColl = this === t.body_b;
            e(t);
            t = n
        }
    }
    ;
    Y.prototype.local2World = function(e) {
        return w(this.p, k(e, this.rot))
    }
    ;
    Y.prototype.world2Local = function(e) {
        return L(E(e, this.p), this.rot)
    }
    ;
    Y.prototype.kineticEnergy = function() {
        var e = this.vx * this.vx + this.vy * this.vy
          , t = this.w * this.w;
        return (e ? e * this.m : 0) + (t ? t * this.i : 0)
    }
    ;
    var nt = e.SpatialIndex = function(e) {
        if (this.staticIndex = e,
        e) {
            if (e.dynamicIndex)
                throw Error("This static index is already associated with a dynamic index.");
            e.dynamicIndex = this
        }
    }
    ;
    nt.prototype.collideStatic = function(e, t) {
        if (0 < e.count) {
            var n = e.query;
            this.each(function(e) {
                n(e, new I(e.bb_l,e.bb_b,e.bb_r,e.bb_t), t)
            })
        }
    }
    ;
    var rt = e.BBTree = function(e) {
        nt.call(this, e);
        this.velocityFunc = null ;
        this.leaves = {};
        this.count = 0;
        this.pooledPairs = this.pooledNodes = this.root = null ;
        this.stamp = 0
    }
    ;
    rt.prototype = Object.create(nt.prototype);
    var it = 0
      , st = function(e, r, i) {
        this.obj = null ;
        this.bb_l = t(r.bb_l, i.bb_l);
        this.bb_b = t(r.bb_b, i.bb_b);
        this.bb_r = n(r.bb_r, i.bb_r);
        this.bb_t = n(r.bb_t, i.bb_t);
        this.parent = null ;
        this.setA(r);
        this.setB(i)
    }
    ;
    rt.prototype.makeNode = function(e, t) {
        var n = this.pooledNodes;
        return n ? (this.pooledNodes = n.parent,
        n.constructor(this, e, t),
        n) : (it++,
        new st(this,e,t))
    }
    ;
    var ot = 0
      , ut = function(e, t) {
        this.obj = t;
        e.getBB(t, this);
        this.parent = null ;
        this.stamp = 1;
        this.pairs = null ;
        ot++
    }
    ;
    rt.prototype.getBB = function(e, r) {
        var i = this.velocityFunc;
        if (i) {
            var s = .1 * (e.bb_r - e.bb_l)
              , o = .1 * (e.bb_t - e.bb_b)
              , i = x(i(e), .1);
            r.bb_l = e.bb_l + t(-s, i.x);
            r.bb_b = e.bb_b + t(-o, i.y);
            r.bb_r = e.bb_r + n(s, i.x);
            r.bb_t = e.bb_t + n(o, i.y)
        } else
            r.bb_l = e.bb_l,
            r.bb_b = e.bb_b,
            r.bb_r = e.bb_r,
            r.bb_t = e.bb_t
    }
    ;
    rt.prototype.getStamp = function() {
        var e = this.dynamicIndex;
        return e && e.stamp ? e.stamp : this.stamp
    }
    ;
    rt.prototype.incrementStamp = function() {
        this.dynamicIndex && this.dynamicIndex.stamp ? this.dynamicIndex.stamp++ : this.stamp++
    }
    ;
    var at = 0
      , ft = function(e, t, n, r) {
        this.prevA = null ;
        this.leafA = e;
        this.nextA = t;
        this.prevB = null ;
        this.leafB = n;
        this.nextB = r
    }
    ;
    rt.prototype.makePair = function(e, t, n, r) {
        var i = this.pooledPairs;
        return i ? (this.pooledPairs = i.prevA,
        i.prevA = null ,
        i.leafA = e,
        i.nextA = t,
        i.prevB = null ,
        i.leafB = n,
        i.nextB = r,
        i) : (at++,
        new ft(e,t,n,r))
    }
    ;
    ft.prototype.recycle = function(e) {
        this.prevA = e.pooledPairs;
        e.pooledPairs = this
    }
    ;
    var lt = function(e, t, n) {
        n && (n.leafA === t ? n.prevA = e : n.prevB = e);
        e ? e.leafA === t ? e.nextA = n : e.nextB = n : t.pairs = n
    }
    ;
    ut.prototype.clearPairs = function(e) {
        var t, n = this.pairs;
        for (this.pairs = null ; n; )
            n.leafA === this ? (t = n.nextA,
            lt(n.prevB, n.leafB, n.nextB)) : (t = n.nextB,
            lt(n.prevA, n.leafA, n.nextA)),
            n.recycle(e),
            n = t
    }
    ;
    var ct = function(e, t, n) {
        var r = e.pairs
          , i = t.pairs;
        n = n.makePair(e, r, t, i);
        e.pairs = t.pairs = n;
        r && (r.leafA === e ? r.prevA = n : r.prevB = n);
        i && (i.leafA === t ? i.prevA = n : i.prevB = n)
    }
    ;
    st.prototype.recycle = function(e) {
        this.parent = e.pooledNodes;
        e.pooledNodes = this
    }
    ;
    ut.prototype.recycle = function() {}
    ;
    st.prototype.setA = function(e) {
        this.A = e;
        e.parent = this
    }
    ;
    st.prototype.setB = function(e) {
        this.B = e;
        e.parent = this
    }
    ;
    ut.prototype.isLeaf = !0;
    st.prototype.isLeaf = !1;
    st.prototype.otherChild = function(e) {
        return this.A == e ? this.B : this.A
    }
    ;
    st.prototype.replaceChild = function(e, r, s) {
        i(e == this.A || e == this.B, "Node is not a child of parent.");
        this.A == e ? (this.A.recycle(s),
        this.setA(r)) : (this.B.recycle(s),
        this.setB(r));
        for (e = this; e; e = e.parent)
            r = e.A,
            s = e.B,
            e.bb_l = t(r.bb_l, s.bb_l),
            e.bb_b = t(r.bb_b, s.bb_b),
            e.bb_r = n(r.bb_r, s.bb_r),
            e.bb_t = n(r.bb_t, s.bb_t)
    }
    ;
    st.prototype.bbArea = ut.prototype.bbArea = function() {
        return (this.bb_r - this.bb_l) * (this.bb_t - this.bb_b)
    }
    ;
    var ht = function(e, r) {
        return (n(e.bb_r, r.bb_r) - t(e.bb_l, r.bb_l)) * (n(e.bb_t, r.bb_t) - t(e.bb_b, r.bb_b))
    }
      , pt = function(e, t) {
        return Math.abs(e.bb_l + e.bb_r - t.bb_l - t.bb_r) + Math.abs(e.bb_b + e.bb_t - t.bb_b - t.bb_t)
    }
      , dt = function(e, r, i) {
        if (null == e)
            return r;
        if (e.isLeaf)
            return i.makeNode(r, e);
        var s = e.B.bbArea() + ht(e.A, r)
          , o = e.A.bbArea() + ht(e.B, r);
        return s === o && (s = pt(e.A, r),
        o = pt(e.B, r)),
        s > o ? e.setB(dt(e.B, r, i)) : e.setA(dt(e.A, r, i)),
        e.bb_l = t(e.bb_l, r.bb_l),
        e.bb_b = t(e.bb_b, r.bb_b),
        e.bb_r = n(e.bb_r, r.bb_r),
        e.bb_t = n(e.bb_t, r.bb_t),
        e
    }
    ;
    st.prototype.intersectsBB = ut.prototype.intersectsBB = function(e) {
        return this.bb_l <= e.r && e.l <= this.bb_r && this.bb_b <= e.t && e.b <= this.bb_t
    }
    ;
    var vt = function(e, t, n) {
        e.intersectsBB(t) && (e.isLeaf ? n(e.obj) : (vt(e.A, t, n),
        vt(e.B, t, n)))
    }
      , mt = function(e, r, i) {
        var s = 1 / (i.x - r.x)
          , o = e.bb_l == r.x ? -1 / 0 : (e.bb_l - r.x) * s
          , u = e.bb_r == r.x ? 1 / 0 : (e.bb_r - r.x) * s
          , s = t(o, u)
          , o = n(o, u)
          , u = 1 / (i.y - r.y);
        i = e.bb_b == r.y ? -1 / 0 : (e.bb_b - r.y) * u;
        r = e.bb_t == r.y ? 1 / 0 : (e.bb_t - r.y) * u;
        e = t(i, r);
        r = n(i, r);
        return o >= e && r >= s && (s = n(s, e),
        0 <= t(o, r) && 1 >= s) ? n(s, 0) : 1 / 0
    }
      , gt = function(e, n, r, i, s) {
        if (e.isLeaf)
            return s(e.obj);
        var o = mt(e.A, n, r)
          , u = mt(e.B, n, r);
        return u > o ? (i > o && (i = t(i, gt(e.A, n, r, i, s))),
        i > u && (i = t(i, gt(e.B, n, r, i, s)))) : (i > u && (i = t(i, gt(e.B, n, r, i, s))),
        i > o && (i = t(i, gt(e.A, n, r, i, s)))),
        i
    }
    ;
    rt.prototype.subtreeRecycle = function(e) {
        e.isLeaf && (this.subtreeRecycle(e.A),
        this.subtreeRecycle(e.B),
        e.recycle(this))
    }
    ;
    var yt = function(e, t, n) {
        if (t == e)
            return null ;
        var r = t.parent;
        return r == e ? (t = e.otherChild(t),
        t.parent = e.parent,
        e.recycle(n),
        t) : (r.parent.replaceChild(r, r.otherChild(t), n),
        e)
    }
      , bt = function(e, t) {
        return e.bb_l <= t.bb_r && t.bb_l <= e.bb_r && e.bb_b <= t.bb_t && t.bb_b <= e.bb_t
    }
    ;
    ut.prototype.markLeafQuery = function(e, t, n, r) {
        bt(e, this) && (t ? ct(e, this, n) : (this.stamp < e.stamp && ct(this, e, n),
        r && r(e.obj, this.obj)))
    }
    ;
    st.prototype.markLeafQuery = function(e, t, n, r) {
        bt(e, this) && (this.A.markLeafQuery(e, t, n, r),
        this.B.markLeafQuery(e, t, n, r))
    }
    ;
    ut.prototype.markSubtree = function(e, t, n) {
        if (this.stamp == e.getStamp())
            for (t && t.markLeafQuery(this, !1, e, n),
            t = this; t.parent; t = t.parent)
                t == t.parent.A ? t.parent.B.markLeafQuery(this, !0, e, n) : t.parent.A.markLeafQuery(this, !1, e, n);
        else
            for (e = this.pairs; e; )
                this === e.leafB ? (n && n(e.leafA.obj, this.obj),
                e = e.nextB) : e = e.nextA
    }
    ;
    st.prototype.markSubtree = function(e, t, n) {
        this.A.markSubtree(e, t, n);
        this.B.markSubtree(e, t, n)
    }
    ;
    ut.prototype.containsObj = function(e) {
        return this.bb_l <= e.bb_l && this.bb_r >= e.bb_r && this.bb_b <= e.bb_b && this.bb_t >= e.bb_t
    }
    ;
    ut.prototype.update = function(e) {
        var t = e.root;
        return this.containsObj(this.obj) ? !1 : (e.getBB(this.obj, this),
        t = yt(t, this, e),
        e.root = dt(t, this, e),
        this.clearPairs(e),
        this.stamp = e.getStamp(),
        !0)
    }
    ;
    ut.prototype.addPairs = function(e) {
        var t = e.dynamicIndex;
        t ? (e = t.root) && e.markLeafQuery(this, !0, t, null ) : this.markSubtree(e, e.staticIndex.root, null )
    }
    ;
    rt.prototype.insert = function(e, t) {
        var n = new ut(this,e);
        this.leaves[t] = n;
        this.root = dt(this.root, n, this);
        this.count++;
        n.stamp = this.getStamp();
        n.addPairs(this);
        this.incrementStamp()
    }
    ;
    rt.prototype.remove = function(e, t) {
        var n = this.leaves[t];
        delete this.leaves[t];
        this.root = yt(this.root, n, this);
        this.count--;
        n.clearPairs(this);
        n.recycle(this)
    }
    ;
    rt.prototype.contains = function(e, t) {
        return null != this.leaves[t]
    }
    ;
    var wt = function() {}
    ;
    rt.prototype.reindexQuery = function(e) {
        if (this.root) {
            var t, n = this.leaves;
            for (t in n)
                n[t].update(this);
            n = (t = this.staticIndex) && t.root;
            this.root.markSubtree(this, n, e);
            t && !n && this.collideStatic(this, t, e);
            this.incrementStamp()
        }
    }
    ;
    rt.prototype.reindex = function() {
        this.reindexQuery(wt)
    }
    ;
    rt.prototype.reindexObject = function(e, t) {
        var n = this.leaves[t];
        n && (n.update(this) && n.addPairs(this),
        this.incrementStamp())
    }
    ;
    rt.prototype.pointQuery = function(e, t) {
        this.query(new I(e.x,e.y,e.x,e.y), t)
    }
    ;
    rt.prototype.segmentQuery = function(e, t, n, r) {
        this.root && gt(this.root, e, t, n, r)
    }
    ;
    rt.prototype.query = function(e, t) {
        this.root && vt(this.root, e, t)
    }
    ;
    rt.prototype.count = function() {
        return this.count
    }
    ;
    rt.prototype.each = function(e) {
        for (var t in this.leaves)
            e(this.leaves[t].obj)
    }
    ;
    var Et = function(e, r, i, s) {
        if (1 == s)
            return r[i];
        if (2 == s)
            return e.makeNode(r[i], r[i + 1]);
        for (var o = r[i], u = o.bb_l, a = o.bb_b, f = o.bb_r, l = o.bb_t, c = i + s, h = i + 1; c > h; h++)
            o = r[h],
            u = t(u, o.bb_l),
            a = t(a, o.bb_b),
            f = n(f, o.bb_r),
            l = n(l, o.bb_t);
        var o = f - u > l - a
          , p = Array(2 * s);
        if (o)
            for (h = i; c > h; h++)
                p[2 * h + 0] = r[h].bb_l,
                p[2 * h + 1] = r[h].bb_r;
        else
            for (h = i; c > h; h++)
                p[2 * h + 0] = r[h].bb_b,
                p[2 * h + 1] = r[h].bb_t;
        p.sort(function(e, t) {
            return e - t
        });
        var d = .5 * (p[s - 1] + p[s])
          , h = u
          , p = a
          , v = f
          , m = l;
        o ? v = u = d : m = a = d;
        for (var d = c, g = i; d > g; )
            o = r[g],
            (n(o.bb_r, f) - t(o.bb_l, u)) * (n(o.bb_t, l) - t(o.bb_b, a)) < (n(o.bb_r, v) - t(o.bb_l, h)) * (n(o.bb_t, m) - t(o.bb_b, p)) ? (d--,
            r[g] = r[d],
            r[d] = o) : g++;
        if (d == s) {
            o = null ;
            for (h = i; c > h; h++)
                o = dt(o, r[h], e);
            return o
        }
        return NodeNew(e, Et(e, r, i, d - i), Et(e, r, d, c - d))
    }
    ;
    rt.prototype.optimize = function() {
        var e = Array(this.count), t = 0, n;
        for (n in this.leaves)
            e[t++] = this.nodes[n];
        tree.subtreeRecycle(root);
        this.root = Et(tree, e, e.length)
    }
    ;
    var St = function(e, t) {
        !e.isLeaf && 10 >= t && (St(e.A, t + 1),
        St(e.B, t + 1));
        for (var n = "", r = 0; t > r; r++)
            n += " ";
        console.log(n + e.bb_b + " " + e.bb_t)
    }
    ;
    rt.prototype.log = function() {
        this.root && St(this.root, 0)
    }
    ;
    var xt = e.CollisionHandler = function() {
        this.a = this.b = 0
    }
    ;
    xt.prototype.begin = function() {
        return !0
    }
    ;
    xt.prototype.preSolve = function() {
        return !0
    }
    ;
    xt.prototype.postSolve = function() {}
    ;
    xt.prototype.separate = function() {}
    ;
    var Tt = function(e, t) {
        this.u = this.e = 0;
        this.surface_vr = m;
        this.a = e;
        this.body_a = e.body;
        this.b = t;
        this.body_b = t.body;
        this.contacts = this.thread_b_next = this.thread_b_prev = this.thread_a_next = this.thread_a_prev = null ;
        this.stamp = 0;
        this.handler = null ;
        this.swappedColl = !1;
        this.state = "first coll"
    }
    ;
    Tt.prototype.getShapes = function() {
        return this.swappedColl ? [this.b, this.a] : [this.a, this.b]
    }
    ;
    Tt.prototype.totalImpulse = function() {
        for (var e = this.contacts, t = new v(0,0), n = 0, r = e.length; r > n; n++) {
            var i = e[n];
            t.add(x(i.n, i.jnAcc))
        }
        return this.swappedColl ? t : t.neg()
    }
    ;
    Tt.prototype.totalImpulseWithFriction = function() {
        for (var e = this.contacts, t = new v(0,0), n = 0, r = e.length; r > n; n++) {
            var i = e[n];
            t.add((new v(i.jnAcc,i.jtAcc)).rotate(i.n))
        }
        return this.swappedColl ? t : t.neg()
    }
    ;
    Tt.prototype.totalKE = function() {
        for (var e = (1 - this.e) / (1 + this.e), t = 0, n = this.contacts, r = 0, i = n.length; i > r; r++)
            var s = n[r]
              , o = s.jnAcc
              , u = s.jtAcc
              , t = t + (e * o * o / s.nMass + u * u / s.tMass);
        return t
    }
    ;
    Tt.prototype.ignore = function() {
        this.state = "ignore"
    }
    ;
    Tt.prototype.getA = function() {
        return this.swappedColl ? this.b : this.a
    }
    ;
    Tt.prototype.getB = function() {
        return this.swappedColl ? this.a : this.b
    }
    ;
    Tt.prototype.isFirstContact = function() {
        return "first coll" === this.state
    }
    ;
    var Nt = function(e, t, n) {
        this.point = e;
        this.normal = t;
        this.dist = n
    }
    ;
    Tt.prototype.getContactPointSet = function() {
        var e, t = Array(this.contacts.length);
        for (e = 0; t.length > e; e++)
            t[e] = new Nt(this.contacts[e].p,this.contacts[e].n,this.contacts[e].dist);
        return t
    }
    ;
    Tt.prototype.getNormal = function(e) {
        e = this.contacts[e].n;
        return this.swappedColl ? S(e) : e
    }
    ;
    Tt.prototype.getPoint = function(e) {
        return this.contacts[e].p
    }
    ;
    Tt.prototype.getDepth = function(e) {
        return this.contacts[e].dist
    }
    ;
    var Ct = function(e, t, n, r) {
        n ? n.body_a === t ? n.thread_a_next = r : n.thread_b_next = r : t.arbiterList = r;
        r && (r.body_a === t ? r.thread_a_prev = n : r.thread_b_prev = n)
    }
    ;
    Tt.prototype.unthread = function() {
        Ct(this, this.body_a, this.thread_a_prev, this.thread_a_next);
        Ct(this, this.body_b, this.thread_b_prev, this.thread_b_next);
        this.thread_b_prev = this.thread_b_next = this.thread_a_prev = this.thread_a_next = null
    }
    ;
    Tt.prototype.update = function(e, t, n, r) {
        if (this.contacts)
            for (var i = 0; this.contacts.length > i; i++)
                for (var s = this.contacts[i], o = 0; e.length > o; o++) {
                    var u = e[o];
                    u.hash === s.hash && (u.jnAcc = s.jnAcc,
                    u.jtAcc = s.jtAcc)
                }
        this.contacts = e;
        this.handler = t;
        this.swappedColl = n.collision_type !== t.a;
        this.e = n.e * r.e;
        this.u = n.u * r.u;
        this.surface_vr = E(n.surface_v, r.surface_v);
        this.a = n;
        this.body_a = n.body;
        this.b = r;
        this.body_b = r.body;
        "cached" == this.state && (this.state = "first coll")
    }
    ;
    Tt.prototype.preStep = function(e, n, r) {
        for (var i = this.body_a, s = this.body_b, o = 0; this.contacts.length > o; o++) {
            var u = this.contacts[o];
            u.r1 = E(u.p, i.p);
            u.r2 = E(u.p, s.p);
            u.nMass = 1 / Qt(i, s, u.r1, u.r2, u.n);
            u.tMass = 1 / Qt(i, s, u.r1, u.r2, N(u.n));
            u.bias = -r * t(0, u.dist + n) / e;
            u.jBias = 0;
            u.bounce = Xt(i, s, u.r1, u.r2, u.n) * this.e
        }
    }
    ;
    Tt.prototype.applyCachedImpulse = function(e) {
        if (!this.isFirstContact())
            for (var t = this.body_a, n = this.body_b, r = 0; this.contacts.length > r; r++) {
                var i = this.contacts[r]
                  , s = i.n.x
                  , o = i.n.y;
                $t(t, n, i.r1, i.r2, (s * i.jnAcc - o * i.jtAcc) * e, (s * i.jtAcc + o * i.jnAcc) * e)
            }
    }
    ;
    var kt = 0
      , Lt = 0;
    Tt.prototype.applyImpulse = function() {
        kt++;
        for (var e = this.body_a, t = this.body_b, r = this.surface_vr, i = this.u, s = 0; this.contacts.length > s; s++) {
            Lt++;
            var o = this.contacts[s]
              , u = o.nMass
              , a = o.n
              , f = o.r1
              , l = o.r2
              , c = t.vx - l.y * t.w - (e.vx - f.y * e.w)
              , h = t.vy + l.x * t.w - (e.vy + f.x * e.w)
              , d = c * a.x + h * a.y
              , v = (c + r.x) * -a.y + (h + r.y) * a.x
              , h = o.jBias;
            o.jBias = n(h + (o.bias - (a.x * (t.v_biasx - l.y * t.w_bias - e.v_biasx + f.y * e.w_bias) + a.y * (l.x * t.w_bias + t.v_biasy - f.x * e.w_bias - e.v_biasy))) * u, 0);
            c = o.jnAcc;
            o.jnAcc = n(c + -(o.bounce + d) * u, 0);
            d = i * o.jnAcc;
            u = o.jtAcc;
            o.jtAcc = p(u + -v * o.tMass, -d, d);
            d = a.x * (o.jBias - h);
            h = a.y * (o.jBias - h);
            Jt(e, -d, -h, f);
            Jt(t, d, h, l);
            c = o.jnAcc - c;
            o = o.jtAcc - u;
            $t(e, t, f, l, a.x * c - a.y * o, a.x * o + a.y * c)
        }
    }
    ;
    Tt.prototype.callSeparate = function(e) {
        e.lookupHandler(this.a.collision_type, this.b.collision_type).separate(this, e)
    }
    ;
    Tt.prototype.next = function(e) {
        return this.body_a == e ? this.thread_a_next : this.thread_b_next
    }
    ;
    var At = 0
      , Ot = function(e, t, n, r) {
        this.p = e;
        this.n = t;
        this.dist = n;
        this.r1 = this.r2 = m;
        this.jnAcc = this.jtAcc = this.jBias = this.nMass = this.tMass = this.bounce = this.bias = 0;
        this.hash = r;
        At++
    }
      , Mt = []
      , _t = function(e, t, n, r) {
        r = n + r;
        t = E(t, e);
        var i = A(t);
        if (!(i >= r * r))
            return i = Math.sqrt(i),
            new Ot(w(e, x(t, .5 + (n - .5 * r) / (i ? i : 1 / 0))),i ? x(t, 1 / i) : new v(1,0),i - r,0)
    }
      , Dt = 0
      , Pt = function(e, t) {
        var n = 0
          , r = e.valueOnAxis(t[0].n, t[0].d);
        if (0 < r)
            return -1;
        for (var i = 1; t.length > i; i++) {
            var s = e.valueOnAxis(t[i].n, t[i].d);
            if (0 < s)
                return -1;
            s > r && (r = s,
            n = i)
        }
        return Dt = r,
        n
    }
      , Ht = function(e, t, n, r) {
        for (var i = [], s = e.tVerts, o = 0; s.length > o; o += 2) {
            var a = s[o]
              , f = s[o + 1];
            t.containsVert(a, f) && i.push(new Ot(new v(a,f),n,r,u(e.hashid, o >> 1)))
        }
        s = t.tVerts;
        for (o = 0; s.length > o; o += 2)
            a = s[o],
            f = s[o + 1],
            e.containsVert(a, f) && i.push(new Ot(new v(a,f),n,r,u(t.hashid, o >> 1)));
        if (!i.length) {
            i = [];
            s = e.tVerts;
            for (o = 0; s.length > o; o += 2)
                a = s[o],
                f = s[o + 1],
                t.containsVertPartial(a, f, S(n)) && i.push(new Ot(new v(a,f),n,r,u(e.hashid, o)));
            s = t.tVerts;
            for (o = 0; s.length > o; o += 2)
                a = s[o],
                f = s[o + 1],
                e.containsVertPartial(a, f, n) && i.push(new Ot(new v(a,f),n,r,u(t.hashid, o)))
        }
        return e = i
    }
      , Bt = function(e, n, r) {
        var i = g(n, e.ta) - e.r;
        e = g(n, e.tb) - e.r;
        return t(i, e) - r
    }
      , jt = function(e, t, n, r, i) {
        for (var s = T(t.tn, t.ta), o = T(t.tn, t.tb), a = x(t.tn, i), f = n.tVerts, l = 0; f.length > l; l += 2) {
            var c = f[l]
              , h = f[l + 1];
            if (c * a.x + h * a.y < g(t.tn, t.ta) * i + t.r) {
                var p = t.tn.x * h - t.tn.y * c;
                s >= p && p >= o && e.push(new Ot(new v(c,h),a,r,u(n.hashid, l)))
            }
        }
    }
    ;
    X.prototype.collisionCode = 0;
    $.prototype.collisionCode = 1;
    K.prototype.collisionCode = 2;
    X.prototype.collisionTable = [function(e, t) {
        var n = _t(e.tc, t.tc, e.r, t.r);
        return n ? [n] : Mt
    }
    , function(e, t) {
        var n = t.ta
          , r = e.tc
          , i = E(t.tb, n)
          , s = d(g(i, E(r, n)) / A(i))
          , n = w(n, x(i, s));
        return (r = _t(r, n, e.r, t.r)) ? (n = r.n,
        0 === s && 0 > g(n, t.a_tangent) || 1 === s && 0 > g(n, t.b_tangent) ? Mt : [r]) : Mt
    }
    , function(e, t) {
        for (var n = t.tPlanes, r = 0, i = g(n[0].n, e.tc) - n[0].d - e.r, s = 0; n.length > s; s++) {
            var o = g(n[s].n, e.tc) - n[s].d - e.r;
            if (0 < o)
                return Mt;
            o > i && (i = o,
            r = s)
        }
        var n = n[r].n
          , u = t.tVerts
          , a = u.length
          , f = r << 1
          , r = u[f]
          , s = u[f + 1]
          , o = u[(f + 2) % a]
          , u = u[(f + 3) % a]
          , a = n.x * s - n.y * r
          , f = n.x * u - n.y * o
          , l = T(n, e.tc);
        if (f > l) {
            var c = _t(e.tc, new v(o,u), e.r, 0, c);
            return c ? [c] : Mt
        }
        return a > l ? [new Ot(E(e.tc, x(n, e.r + i / 2)),S(n),i,0)] : (c = _t(e.tc, new v(r,s), e.r, 0, c)) ? [c] : Mt
    }
    ];
    $.prototype.collisionTable = [null , function() {
        return Mt
    }
    , function(e, t) {
        var n = []
          , r = t.tPlanes
          , i = r.length
          , s = g(e.tn, e.ta)
          , o = t.valueOnAxis(e.tn, s) - e.r
          , s = t.valueOnAxis(S(e.tn), -s) - e.r;
        if (0 < s || 0 < o)
            return Mt;
        var a = 0
          , f = Bt(e, r[0].n, r[0].d);
        if (0 < f)
            return Mt;
        for (var l = 0; i > l; l++) {
            var c = Bt(e, r[l].n, r[l].d);
            if (0 < c)
                return Mt;
            c > f && (f = c,
            a = l)
        }
        r = S(r[a].n);
        l = w(e.ta, x(r, e.r));
        c = w(e.tb, x(r, e.r));
        if (t.containsVert(l.x, l.y) && n.push(new Ot(l,r,f,u(e.hashid, 0))),
        t.containsVert(c.x, c.y) && n.push(new Ot(c,r,f,u(e.hashid, 1))),
        (o >= f || s >= f) && (o > s ? jt(n, e, t, o, 1) : jt(n, e, t, s, -1)),
        0 === n.length) {
            s = 2 * a;
            a = t.tVerts;
            f = new v(a[s],a[s + 1]);
            if ((o = _t(e.ta, f, e.r, 0, n)) || (o = _t(e.tb, f, e.r, 0, n)))
                return [o];
            i *= 2;
            i = new v(a[(s + 2) % i],a[(s + 3) % i]);
            if ((o = _t(e.ta, i, e.r, 0, n)) || (o = _t(e.tb, i, e.r, 0, n)))
                return [o]
        }
        return n
    }
    ];
    K.prototype.collisionTable = [null , null , function(e, t) {
        var n = Pt(t, e.tPlanes);
        if (-1 == n)
            return Mt;
        var r = Dt
          , i = Pt(e, t.tPlanes);
        if (-1 == i)
            return Mt;
        var s = Dt;
        return r > s ? Ht(e, t, e.tPlanes[n].n, r) : Ht(e, t, S(t.tPlanes[i].n), s)
    }
    ];
    var Ft = e.collideShapes = function(e, t) {
        return r(e.collisionCode <= t.collisionCode, "Collided shapes must be sorted by type"),
        e.collisionTable[t.collisionCode](e, t)
    }
      , It = new xt
      , qt = e.Space = function() {
        this.curr_dt = this.stamp = 0;
        this.bodies = [];
        this.rousedBodies = [];
        this.sleepingComponents = [];
        this.staticShapes = new rt(null );
        this.activeShapes = new rt(this.staticShapes);
        this.arbiters = [];
        this.contactBuffersHead = null ;
        this.cachedArbiters = {};
        this.constraints = [];
        this.locked = 0;
        this.collisionHandlers = {};
        this.defaultHandler = It;
        this.postStepCallbacks = [];
        this.iterations = 10;
        this.gravity = m;
        this.damping = 1;
        this.idleSpeedThreshold = 0;
        this.sleepTimeThreshold = 1 / 0;
        this.collisionSlop = .1;
        this.collisionBias = Math.pow(.9, 60);
        this.collisionPersistence = 3;
        this.enableContactGraph = !1;
        this.staticBody = new Y(1 / 0,1 / 0);
        this.staticBody.nodeIdleTime = 1 / 0;
        this.collideShapes = this.makeCollideShapes()
    }
    ;
    qt.prototype.getCurrentTimeStep = function() {
        return this.curr_dt
    }
    ;
    qt.prototype.setIterations = function(e) {
        this.iterations = e
    }
    ;
    qt.prototype.isLocked = function() {
        return this.locked
    }
    ;
    var Rt = function(e) {
        r(!e.locked, "This addition/removal cannot be done safely during a call to cpSpaceStep()  or during a query. Put these calls into a post-step callback.")
    }
    ;
    qt.prototype.addCollisionHandler = function(e, t, n, r, i, s) {
        Rt(this);
        this.removeCollisionHandler(e, t);
        var o = new xt;
        o.a = e;
        o.b = t;
        n && (o.begin = n);
        r && (o.preSolve = r);
        i && (o.postSolve = i);
        s && (o.separate = s);
        this.collisionHandlers[u(e, t)] = o
    }
    ;
    qt.prototype.removeCollisionHandler = function(e, t) {
        Rt(this);
        delete this.collisionHandlers[u(e, t)]
    }
    ;
    qt.prototype.setDefaultCollisionHandler = function(e, t, n, r) {
        Rt(this);
        var i = new xt;
        e && (i.begin = e);
        t && (i.preSolve = t);
        n && (i.postSolve = n);
        r && (i.separate = r);
        this.defaultHandler = i
    }
    ;
    qt.prototype.lookupHandler = function(e, t) {
        return this.collisionHandlers[u(e, t)] || this.defaultHandler
    }
    ;
    qt.prototype.addShape = function(e) {
        var t = e.body;
        return t.isStatic() ? this.addStaticShape(e) : (r(!e.space, "This shape is already added to a space and cannot be added to another."),
        Rt(this),
        t.activate(),
        t.addShape(e),
        e.update(t.p, t.rot),
        this.activeShapes.insert(e, e.hashid),
        e.space = this,
        e)
    }
    ;
    qt.prototype.addStaticShape = function(e) {
        r(!e.space, "This shape is already added to a space and cannot be added to another.");
        Rt(this);
        var t = e.body;
        return t.addShape(e),
        e.update(t.p, t.rot),
        this.staticShapes.insert(e, e.hashid),
        e.space = this,
        e
    }
    ;
    qt.prototype.addBody = function(e) {
        return r(!e.isStatic(), "Static bodies cannot be added to a space as they are not meant to be simulated."),
        r(!e.space, "This body is already added to a space and cannot be added to another."),
        Rt(this),
        this.bodies.push(e),
        e.space = this,
        e
    }
    ;
    qt.prototype.addConstraint = function(e) {
        r(!e.space, "This shape is already added to a space and cannot be added to another.");
        Rt(this);
        var t = e.a
          , n = e.b;
        return t.activate(),
        n.activate(),
        this.constraints.push(e),
        e.next_a = t.constraintList,
        t.constraintList = e,
        e.next_b = n.constraintList,
        n.constraintList = e,
        e.space = this,
        e
    }
    ;
    qt.prototype.filterArbiters = function(e, t) {
        for (var n in this.cachedArbiters) {
            var r = this.cachedArbiters[n];
            (e !== r.body_a || t !== r.a && null !== t) && (e !== r.body_b || t !== r.b && null !== t) || (t && "cached" !== r.state && r.callSeparate(this),
            r.unthread(),
            a(this.arbiters, r),
            delete this.cachedArbiters[n])
        }
    }
    ;
    qt.prototype.removeShape = function(e) {
        var t = e.body;
        t.isStatic() ? this.removeStaticShape(e) : (r(this.containsShape(e), "Cannot remove a shape that was not added to the space. (Removed twice maybe?)"),
        Rt(this),
        t.activate(),
        t.removeShape(e),
        this.filterArbiters(t, e),
        this.activeShapes.remove(e, e.hashid),
        e.space = null )
    }
    ;
    qt.prototype.removeStaticShape = function(e) {
        r(this.containsShape(e), "Cannot remove a static or sleeping shape that was not added to the space. (Removed twice maybe?)");
        Rt(this);
        var t = e.body;
        t.isStatic() && t.activateStatic(e);
        t.removeShape(e);
        this.filterArbiters(t, e);
        this.staticShapes.remove(e, e.hashid);
        e.space = null
    }
    ;
    qt.prototype.removeBody = function(e) {
        r(this.containsBody(e), "Cannot remove a body that was not added to the space. (Removed twice maybe?)");
        Rt(this);
        e.activate();
        a(this.bodies, e);
        e.space = null
    }
    ;
    qt.prototype.removeConstraint = function(e) {
        r(this.containsConstraint(e), "Cannot remove a constraint that was not added to the space. (Removed twice maybe?)");
        Rt(this);
        e.a.activate();
        e.b.activate();
        a(this.constraints, e);
        e.a.removeConstraint(e);
        e.b.removeConstraint(e);
        e.space = null
    }
    ;
    qt.prototype.containsShape = function(e) {
        return e.space === this
    }
    ;
    qt.prototype.containsBody = function(e) {
        return e.space == this
    }
    ;
    qt.prototype.containsConstraint = function(e) {
        return e.space == this
    }
    ;
    qt.prototype.uncacheArbiter = function(e) {
        delete this.cachedArbiters[u(e.a.hashid, e.b.hashid)];
        a(this.arbiters, e)
    }
    ;
    qt.prototype.eachBody = function(e) {
        this.lock();
        for (var t = this.bodies, n = 0; t.length > n; n++)
            e(t[n]);
        t = this.sleepingComponents;
        for (n = 0; t.length > n; n++)
            for (var r = t[n]; r; ) {
                var i = r.nodeNext;
                e(r);
                r = i
            }
        this.unlock(!0)
    }
    ;
    qt.prototype.eachShape = function(e) {
        this.lock();
        this.activeShapes.each(e);
        this.staticShapes.each(e);
        this.unlock(!0)
    }
    ;
    qt.prototype.eachConstraint = function(e) {
        this.lock();
        for (var t = this.constraints, n = 0; t.length > n; n++)
            e(t[n]);
        this.unlock(!0)
    }
    ;
    qt.prototype.reindexStatic = function() {
        r(!this.locked, "You cannot manually reindex objects while the space is locked. Wait until the current query or step is complete.");
        this.staticShapes.each(function(e) {
            var t = e.body;
            e.update(t.p, t.rot)
        });
        this.staticShapes.reindex()
    }
    ;
    qt.prototype.reindexShape = function(e) {
        r(!this.locked, "You cannot manually reindex objects while the space is locked. Wait until the current query or step is complete.");
        var t = e.body;
        e.update(t.p, t.rot);
        this.activeShapes.reindexObject(e, e.hashid);
        this.staticShapes.reindexObject(e, e.hashid)
    }
    ;
    qt.prototype.reindexShapesForBody = function(e) {
        for (e = e.shapeList; e; e = e.next)
            this.reindexShape(e)
    }
    ;
    qt.prototype.useSpatialHash = function(e, t) {
        throw Error("Spatial Hash not implemented.")
    }
    ;
    qt.prototype.activateBody = function(e) {
        if (r(!e.isRogue(), "Internal error: Attempting to activate a rogue body."),
        this.locked)
            -1 === this.rousedBodies.indexOf(e) && this.rousedBodies.push(e);
        else {
            this.bodies.push(e);
            for (var t = 0; e.shapeList.length > t; t++) {
                var n = e.shapeList[t];
                this.staticShapes.remove(n, n.hashid);
                this.activeShapes.insert(n, n.hashid)
            }
            for (t = e.arbiterList; t; t = t.next(e))
                if (n = t.body_a,
                e === n || n.isStatic()) {
                    var n = t.a
                      , i = t.b;
                    this.cachedArbiters[u(n.hashid, i.hashid)] = t;
                    t.stamp = this.stamp;
                    t.handler = this.lookupHandler(n.collision_type, i.collision_type);
                    this.arbiters.push(t)
                }
            for (t = e.constraintList; t; t = t.nodeNext)
                n = t.a,
                (e === n || n.isStatic()) && this.constraints.push(t)
        }
    }
    ;
    qt.prototype.deactivateBody = function(e) {
        r(!e.isRogue(), "Internal error: Attempting to deactivate a rogue body.");
        a(this.bodies, e);
        for (var t = 0; e.shapeList.length > t; t++) {
            var n = e.shapeList[t];
            this.activeShapes.remove(n, n.hashid);
            this.staticShapes.insert(n, n.hashid)
        }
        for (n = e.arbiterList; n; n = n.next(e))
            t = n.body_a,
            (e === t || t.isStatic()) && this.uncacheArbiter(n);
        for (n = e.constraintList; n; n = n.nodeNext)
            t = n.a,
            (e === t || t.isStatic()) && a(this.constraints, n)
    }
    ;
    Y.prototype.activate = function() {
        if (!this.isRogue()) {
            this.nodeIdleTime = 0;
            var e = this ? this.nodeRoot : null ;
            if (e && e.isSleeping(e)) {
                r(!e.isRogue(), "Internal Error: componentActivate() called on a rogue body.");
                for (var t = e.space, n = e; n; ) {
                    var i = n.nodeNext;
                    n.nodeIdleTime = 0;
                    n.nodeRoot = null ;
                    n.nodeNext = null ;
                    t.activateBody(n);
                    n = i
                }
                a(t.sleepingComponents, e)
            }
        }
    }
    ;
    Y.prototype.activateStatic = function(e) {
        r(this.isStatic(), "Body.activateStatic() called on a non-static body.");
        for (var t = this.arbiterList; t; t = t.next(this))
            e && e != t.a && e != t.b || (t.body_a == this ? t.body_b : t.body_a).activate()
    }
    ;
    Y.prototype.pushArbiter = function(e) {
        i(null === (e.body_a === this ? e.thread_a_next : e.thread_b_next), "Internal Error: Dangling contact graph pointers detected. (A)");
        i(null === (e.body_a === this ? e.thread_a_prev : e.thread_b_prev), "Internal Error: Dangling contact graph pointers detected. (B)");
        var t = this.arbiterList;
        i(null === t || null === (t.body_a === this ? t.thread_a_prev : t.thread_b_prev), "Internal Error: Dangling contact graph pointers detected. (C)");
        e.body_a === this ? e.thread_a_next = t : e.thread_b_next = t;
        t && (t.body_a === this ? t.thread_a_prev = e : t.thread_b_prev = e);
        this.arbiterList = e
    }
    ;
    var Ut = function(e, t) {
        if (!t.isRogue()) {
            var n = t ? t.nodeRoot : null ;
            if (null == n) {
                t.nodeRoot = e;
                t !== e && (t.nodeNext = e.nodeNext,
                e.nodeNext = t);
                for (n = t.arbiterList; n; n = n.next(t))
                    Ut(e, t == n.body_a ? n.body_b : n.body_a);
                for (n = t.constraintList; n; n = n.next(t))
                    Ut(e, t == n.a ? n.b : n.a)
            } else
                i(n === e, "Internal Error: Inconsistency detected in the contact graph.")
        }
    }
    ;
    qt.prototype.processComponents = function(e) {
        for (var t = 1 / 0 !== this.sleepTimeThreshold, n = this.bodies, r = 0; n.length > r; r++) {
            var s = n[r];
            i(null === s.nodeNext, "Internal Error: Dangling next pointer detected in contact graph.");
            i(null === s.nodeRoot, "Internal Error: Dangling root pointer detected in contact graph.")
        }
        if (t)
            for (var o = (r = this.idleSpeedThreshold) ? r * r : A(this.gravity) * e * e, r = 0; n.length > r; r++) {
                var s = n[r]
                  , u = o ? s.m * o : 0;
                s.nodeIdleTime = s.kineticEnergy() > u ? 0 : s.nodeIdleTime + e
            }
        o = this.arbiters;
        r = 0;
        for (u = o.length; u > r; r++) {
            var a = o[r]
              , s = a.body_a;
            e = a.body_b;
            t && ((e.isRogue() && !e.isStatic() || s.isSleeping()) && s.activate(),
            (s.isRogue() && !s.isStatic() || e.isSleeping()) && e.activate());
            s.pushArbiter(a);
            e.pushArbiter(a)
        }
        if (t) {
            t = this.constraints;
            for (r = 0; t.length > r; r++)
                e = t[r],
                s = e.a,
                e = e.b,
                e.isRogue() && !e.isStatic() && s.activate(),
                s.isRogue() && !s.isStatic() && e.activate();
            for (r = 0; n.length > r; ) {
                s = n[r];
                if (!(t = null !== (s ? s.nodeRoot : null )))
                    e: {
                        for (Ut(s, s),
                        t = s; t; t = t.nodeNext)
                            if (this.sleepTimeThreshold > t.nodeIdleTime) {
                                t = !0;
                                break e
                            }
                        t = !1
                    }
                if (t)
                    r++,
                    s.nodeRoot = null ,
                    s.nodeNext = null ;
                else
                    for (this.sleepingComponents.push(s),
                    t = s; t; t = t.nodeNext)
                        this.deactivateBody(t)
            }
        }
    }
    ;
    Y.prototype.sleep = function() {
        this.sleepWithGroup(null )
    }
    ;
    Y.prototype.sleepWithGroup = function(e) {
        r(!this.isStatic() && !this.isRogue(), "Rogue and static bodies cannot be put to sleep.");
        var t = this.space;
        if (r(t, "Cannot put a rogue body to sleep."),
        r(!t.locked, "Bodies cannot be put to sleep during a query or a call to cpSpaceStep(). Put these calls into a post-step callback."),
        r(null === e || e.isSleeping(), "Cannot use a non-sleeping body as a group identifier."),
        this.isSleeping())
            return r((this ? this.nodeRoot : null ) === (e ? e.nodeRoot : null ), "The body is already sleeping and it's group cannot be reassigned."),
            void 0;
        for (var n = 0; this.shapeList.length > n; n++)
            this.shapeList[n].update(this.p, this.rot);
        (t.deactivateBody(this),
        e) ? (this.nodeRoot = e = e ? e.nodeRoot : null ,
        this.nodeNext = e.nodeNext,
        this.nodeIdleTime = 0,
        e.nodeNext = this) : (this.nodeRoot = this,
        this.nodeNext = null ,
        this.nodeIdleTime = 0,
        t.sleepingComponents.push(this));
        a(t.bodies, this)
    }
    ;
    qt.prototype.activateShapesTouchingShape = function(e) {
        1 / 0 !== this.sleepTimeThreshold && this.shapeQuery(e, function(e) {
            e.body.activate()
        })
    }
    ;
    qt.prototype.pointQuery = function(e, t, n, r) {
        var i = function(i) {
            (!i.group || n !== i.group) && t & i.layers && i.pointQuery(e) && r(i)
        }
          , s = new I(e.x,e.y,e.x,e.y);
        this.lock();
        this.activeShapes.query(s, i);
        this.staticShapes.query(s, i);
        this.unlock(!0)
    }
    ;
    qt.prototype.pointQueryFirst = function(e, t, n) {
        var r = null ;
        return this.pointQuery(e, t, n, function(e) {
            e.sensor || (r = e)
        }),
        r
    }
    ;
    qt.prototype.nearestPointQuery = function(e, t, n, r, i) {
        var s = function(s) {
            if ((!s.group || r !== s.group) && n & s.layers) {
                var o = s.nearestPointQuery(e);
                t > o.d && i(s, o.d, o.p)
            }
        }
          , o = new I(e.x - t,e.y - t,e.x + t,e.y + t);
        this.lock();
        this.activeShapes.query(o, s);
        this.staticShapes.query(o, s);
        this.unlock(!0)
    }
    ;
    qt.prototype.nearestPointQueryNearest = function(e, t, n, r) {
        var i, s = function(s) {
            s.group && r === s.group || !(n & s.layers) || s.sensor || (s = s.nearestPointQuery(e),
            t > s.d && (!i || s.d < i.d) && (i = s))
        }
        , o = new I(e.x - t,e.y - t,e.x + t,e.y + t);
        return this.activeShapes.query(o, s),
        this.staticShapes.query(o, s),
        i
    }
    ;
    qt.prototype.segmentQuery = function(e, t, n, r, i) {
        var s = function(s) {
            var o;
            return (!s.group || r !== s.group) && n & s.layers && (o = s.segmentQuery(e, t)) && i(s, o.t, o.n),
            1
        }
        ;
        this.lock();
        this.staticShapes.segmentQuery(e, t, 1, s);
        this.activeShapes.segmentQuery(e, t, 1, s);
        this.unlock(!0)
    }
    ;
    qt.prototype.segmentQueryFirst = function(e, t, n, r) {
        var i = null
          , s = function(s) {
            var o;
            return (!s.group || r !== s.group) && n & s.layers && !s.sensor && (o = s.segmentQuery(e, t)) && (null === i || o.t < i.t) && (i = o),
            i ? i.t : 1
        }
        ;
        return this.staticShapes.segmentQuery(e, t, 1, s),
        this.activeShapes.segmentQuery(e, t, i ? i.t : 1, s),
        i
    }
    ;
    qt.prototype.bbQuery = function(e, t, n, r) {
        var i = function(i) {
            (!i.group || n !== i.group) && t & i.layers && i.bb_r >= e.l && e.r >= i.bb_l && i.bb_t >= e.b && e.t >= i.bb_b && r(i)
        }
        ;
        this.lock();
        this.activeShapes.query(e, i);
        this.staticShapes.query(e, i);
        this.unlock(!0)
    }
    ;
    qt.prototype.shapeQuery = function(e, t) {
        var n = e.body;
        n && e.update(n.p, n.rot);
        var n = new I(e.bb_l,e.bb_b,e.bb_r,e.bb_t)
          , r = !1
          , i = function(n) {
            if ((!e.group || e.group !== n.group) && e.layers & n.layers && e !== n) {
                var i;
                if (e.collisionCode <= n.collisionCode)
                    i = Ft(e, n);
                else {
                    i = Ft(n, e);
                    for (var s = 0; i.length > s; s++)
                        i[s].n = S(i[s].n)
                }
                if (i.length && (r = !(e.sensor || n.sensor),
                t)) {
                    for (var o = Array(i.length), s = 0; i.length > s; s++)
                        o[s] = new Nt(i[s].p,i[s].n,i[s].dist);
                    t(n, o)
                }
            }
        }
        ;
        return this.lock(),
        this.activeShapes.query(n, i),
        this.staticShapes.query(n, i),
        this.unlock(!0),
        r
    }
    ;
    qt.prototype.addPostStepCallback = function(e) {
        i(this.locked, "Adding a post-step callback when the space is not locked is unnecessary. Post-step callbacks will not called until the end of the next call to cpSpaceStep() or the next query.");
        this.postStepCallbacks.push(e)
    }
    ;
    qt.prototype.runPostStepCallbacks = function() {
        for (var e = 0; this.postStepCallbacks.length > e; e++)
            this.postStepCallbacks[e]();
        this.postStepCallbacks = []
    }
    ;
    qt.prototype.lock = function() {
        this.locked++
    }
    ;
    qt.prototype.unlock = function(e) {
        if (this.locked--,
        r(0 <= this.locked, "Internal Error: Space lock underflow."),
        0 === this.locked && e) {
            e = this.rousedBodies;
            for (var t = 0; e.length > t; t++)
                this.activateBody(e[t]);
            e.length = 0;
            this.runPostStepCallbacks()
        }
    }
    ;
    qt.prototype.makeCollideShapes = function() {
        var e = this;
        return function(t, n) {
            if (t.bb_l <= n.bb_r && n.bb_l <= t.bb_r && t.bb_b <= n.bb_t && n.bb_b <= t.bb_t && t.body !== n.body && (!t.group || t.group !== n.group) && t.layers & n.layers) {
                var r = e.lookupHandler(t.collision_type, n.collision_type)
                  , i = t.sensor || n.sensor;
                if (!i || r !== It) {
                    if (t.collisionCode > n.collisionCode) {
                        var s = t;
                        t = n;
                        n = s
                    }
                    s = Ft(t, n);
                    if (0 !== s.length) {
                        var o = u(t.hashid, n.hashid)
                          , a = e.cachedArbiters[o];
                        a || (a = e.cachedArbiters[o] = new Tt(t,n));
                        a.update(s, r, t, n);
                        "first coll" != a.state || r.begin(a, e) || a.ignore();
                        "ignore" !== a.state && r.preSolve(a, e) && !i ? e.arbiters.push(a) : (a.contacts = null ,
                        "ignore" !== a.state && (a.state = "normal"));
                        a.stamp = e.stamp
                    }
                }
            }
        }
    }
    ;
    qt.prototype.arbiterSetFilter = function(e) {
        var t = this.stamp - e.stamp
          , n = e.body_a
          , r = e.body_b;
        return (n.isStatic() || n.isSleeping()) && (r.isStatic() || r.isSleeping()) ? !0 : (1 <= t && "cached" != e.state && (e.callSeparate(this),
        e.state = "cached"),
        t >= this.collisionPersistence ? (e.contacts = null ,
        !1) : !0)
    }
    ;
    var zt = function(e) {
        var t = e.body;
        e.update(t.p, t.rot)
    }
    ;
    qt.prototype.step = function(e) {
        if (0 !== e) {
            r(0 === m.x && 0 === m.y, "vzero is invalid");
            this.stamp++;
            var t = this.curr_dt;
            this.curr_dt = e;
            var n, i, s = this.bodies, o = this.constraints, u = this.arbiters;
            for (n = 0; u.length > n; n++) {
                var a = u[n];
                a.state = "normal";
                a.body_a.isSleeping() || a.body_b.isSleeping() || a.unthread()
            }
            u.length = 0;
            this.lock();
            for (n = 0; s.length > n; n++)
                s[n].position_func(e);
            this.activeShapes.each(zt);
            this.activeShapes.reindexQuery(this.collideShapes);
            this.unlock(!1);
            this.processComponents(e);
            this.lock();
            for (i in this.cachedArbiters)
                this.arbiterSetFilter(this.cachedArbiters[i]) || delete this.cachedArbiters[i];
            i = this.collisionSlop;
            a = 1 - Math.pow(this.collisionBias, e);
            for (n = 0; u.length > n; n++)
                u[n].preStep(e, i, a);
            for (n = 0; o.length > n; n++)
                i = o[n],
                i.preSolve(this),
                i.preStep(e);
            i = Math.pow(this.damping, e);
            a = this.gravity;
            for (n = 0; s.length > n; n++)
                s[n].velocity_func(a, i, e);
            e = 0 === t ? 0 : e / t;
            for (n = 0; u.length > n; n++)
                u[n].applyCachedImpulse(e);
            for (n = 0; o.length > n; n++)
                o[n].applyCachedImpulse(e);
            for (n = 0; this.iterations > n; n++) {
                for (e = 0; u.length > e; e++)
                    u[e].applyImpulse();
                for (e = 0; o.length > e; e++)
                    o[e].applyImpulse()
            }
            for (n = 0; o.length > n; n++)
                o[n].postSolve(this);
            for (n = 0; u.length > n; n++)
                u[n].handler.postSolve(u[n], this);
            this.unlock(!0)
        }
    }
    ;
    var Wt = function(e, t, n, r) {
        return new v(t.vx + -r.y * t.w - (e.vx + -n.y * e.w),t.vy + r.x * t.w - (e.vy + n.x * e.w))
    }
      , Xt = function(e, t, n, r, i) {
        return (t.vx + -r.y * t.w - (e.vx + -n.y * e.w)) * i.x + (t.vy + r.x * t.w - (e.vy + n.x * e.w)) * i.y
    }
      , Vt = function(e, t, n, r) {
        e.vx += t * e.m_inv;
        e.vy += n * e.m_inv;
        e.w += e.i_inv * (r.x * n - r.y * t)
    }
      , $t = function(e, t, n, r, i, s) {
        Vt(e, -i, -s, n);
        Vt(t, i, s, r)
    }
      , Jt = function(e, t, n, r) {
        e.v_biasx += t * e.m_inv;
        e.v_biasy += n * e.m_inv;
        e.w_bias += e.i_inv * (r.x * n - r.y * t)
    }
      , Kt = function(e, t, n) {
        t = T(t, n);
        return e.m_inv + e.i_inv * t * t
    }
      , Qt = function(e, t, n, r, s) {
        e = Kt(e, n, s) + Kt(t, r, s);
        return i(0 !== e, "Unsolvable collision or constraint."),
        e
    }
      , Gt = function(e, t, n, r, s, o) {
        var u;
        u = e.m_inv + t.m_inv;
        var a = e.i_inv
          , f = n.x * n.x * a;
        e = -n.x * n.y * a;
        n = u + n.y * n.y * a;
        u += f;
        a = t.i_inv;
        t = r.x * r.x * a;
        f = -r.x * r.y * a;
        n += r.y * r.y * a;
        r = 0 + e + f;
        e = 0 + e + f;
        u += t;
        t = n * u - r * e;
        i(0 !== t, "Unsolvable constraint.");
        t = 1 / t;
        s.x = u * t;
        s.y = -r * t;
        o.x = -e * t;
        o.y = n * t
    }
      , Yt = e.Constraint = function(e, t) {
        this.a = e;
        this.b = t;
        this.next_b = this.next_a = this.space = null ;
        this.maxForce = 1 / 0;
        this.errorBias = Math.pow(.9, 60);
        this.maxBias = 1 / 0
    }
    ;
    Yt.prototype.activateBodies = function() {
        this.a && this.a.activate();
        this.b && this.b.activate()
    }
    ;
    Yt.prototype.preStep = function() {}
    ;
    Yt.prototype.applyCachedImpulse = function() {}
    ;
    Yt.prototype.applyImpulse = function() {}
    ;
    Yt.prototype.getImpulse = function() {
        return 0
    }
    ;
    Yt.prototype.preSolve = function() {}
    ;
    Yt.prototype.postSolve = function() {}
    ;
    Yt.prototype.next = function(e) {
        return this.a === e ? this.next_a : this.next_b
    }
    ;
    var Zt = e.PinJoint = function(e, t, n, r) {
        Yt.call(this, e, t);
        this.anchr1 = n;
        this.anchr2 = r;
        e = e ? w(e.p, k(n, e.rot)) : n;
        t = t ? w(t.p, k(r, t.rot)) : r;
        this.dist = y(E(t, e));
        i(0 < this.dist, "You created a 0 length pin joint. A pivot joint will be much more stable.");
        this.n = this.r1 = this.r2 = null ;
        this.bias = this.jnAcc = this.jnMax = this.nMass = 0
    }
    ;
    Zt.prototype = Object.create(Yt.prototype);
    Zt.prototype.preStep = function(e) {
        var t = this.a
          , n = this.b;
        this.r1 = k(this.anchr1, t.rot);
        this.r2 = k(this.anchr2, n.rot);
        var r = E(w(n.p, this.r2), w(t.p, this.r1))
          , i = y(r);
        this.n = x(r, 1 / (i ? i : 1 / 0));
        this.nMass = 1 / Qt(t, n, this.r1, this.r2, this.n);
        t = this.maxBias;
        this.bias = p(-(1 - Math.pow(this.errorBias, e)) * (i - this.dist) / e, -t, t);
        this.jnMax = this.maxForce * e
    }
    ;
    Zt.prototype.applyCachedImpulse = function(e) {
        e = x(this.n, this.jnAcc * e);
        $t(this.a, this.b, this.r1, this.r2, e.x, e.y)
    }
    ;
    Zt.prototype.applyImpulse = function() {
        var e = this.a
          , t = this.b
          , n = this.n
          , r = Xt(e, t, this.r1, this.r2, n)
          , r = (this.bias - r) * this.nMass
          , i = this.jnAcc;
        this.jnAcc = p(i + r, -this.jnMax, this.jnMax);
        r = this.jnAcc - i;
        $t(e, t, this.r1, this.r2, n.x * r, n.y * r)
    }
    ;
    Zt.prototype.getImpulse = function() {
        return Math.abs(this.jnAcc)
    }
    ;
    var en = e.SlideJoint = function(e, t, n, r, i, s) {
        Yt.call(this, e, t);
        this.anchr1 = n;
        this.anchr2 = r;
        this.min = i;
        this.max = s;
        this.r1 = this.r2 = this.n = null ;
        this.bias = this.jnAcc = this.jnMax = this.nMass = 0
    }
    ;
    en.prototype = Object.create(Yt.prototype);
    en.prototype.preStep = function(e) {
        var t = this.a
          , n = this.b;
        this.r1 = k(this.anchr1, t.rot);
        this.r2 = k(this.anchr2, n.rot);
        var r = E(w(n.p, this.r2), w(t.p, this.r1))
          , i = y(r)
          , s = 0;
        i > this.max ? (s = i - this.max,
        this.n = D(r)) : this.min > i ? (s = this.min - i,
        this.n = S(D(r))) : (this.n = m,
        this.jnAcc = 0);
        this.nMass = 1 / Qt(t, n, this.r1, this.r2, this.n);
        t = this.maxBias;
        this.bias = p(-(1 - Math.pow(this.errorBias, e)) * s / e, -t, t);
        this.jnMax = this.maxForce * e
    }
    ;
    en.prototype.applyCachedImpulse = function(e) {
        e *= this.jnAcc;
        $t(this.a, this.b, this.r1, this.r2, this.n.x * e, this.n.y * e)
    }
    ;
    en.prototype.applyImpulse = function() {
        if (0 !== this.n.x || 0 !== this.n.y) {
            var e = this.a
              , t = this.b
              , n = this.n
              , r = Wt(e, t, this.r1, this.r2)
              , r = g(r, n)
              , r = (this.bias - r) * this.nMass
              , i = this.jnAcc;
            this.jnAcc = p(i + r, -this.jnMax, 0);
            r = this.jnAcc - i;
            $t(e, t, this.r1, this.r2, n.x * r, n.y * r)
        }
    }
    ;
    en.prototype.getImpulse = function() {
        return Math.abs(this.jnAcc)
    }
    ;
    var tn = e.PivotJoint = function(e, t, n, r) {
        if (Yt.call(this, e, t),
        void 0 === r)
            r = n,
            n = e ? e.world2Local(r) : r,
            r = t ? t.world2Local(r) : r;
        this.anchr1 = n;
        this.anchr2 = r;
        this.r1 = this.r2 = m;
        this.k1 = new v(0,0);
        this.k2 = new v(0,0);
        this.jAcc = m;
        this.jMaxLen = 0;
        this.bias = m
    }
    ;
    tn.prototype = Object.create(Yt.prototype);
    tn.prototype.preStep = function(e) {
        var t = this.a
          , n = this.b;
        this.r1 = k(this.anchr1, t.rot);
        this.r2 = k(this.anchr2, n.rot);
        Gt(t, n, this.r1, this.r2, this.k1, this.k2);
        this.jMaxLen = this.maxForce * e;
        t = E(w(n.p, this.r2), w(t.p, this.r1));
        this.bias = P(x(t, -(1 - Math.pow(this.errorBias, e)) / e), this.maxBias)
    }
    ;
    tn.prototype.applyCachedImpulse = function(e) {
        $t(this.a, this.b, this.r1, this.r2, this.jAcc.x * e, this.jAcc.y * e)
    }
    ;
    tn.prototype.applyImpulse = function() {
        var e = this.a
          , t = this.b
          , n = Wt(e, t, this.r1, this.r2)
          , n = E(this.bias, n)
          , r = this.k2
          , n = new v(g(n, this.k1),g(n, r))
          , r = this.jAcc;
        this.jAcc = P(w(this.jAcc, n), this.jMaxLen);
        $t(e, t, this.r1, this.r2, this.jAcc.x - r.x, this.jAcc.y - r.y)
    }
    ;
    tn.prototype.getImpulse = function() {
        return y(this.jAcc)
    }
    ;
    var nn = e.GrooveJoint = function(e, t, n, r, i) {
        Yt.call(this, e, t);
        this.grv_a = n;
        this.grv_b = r;
        this.grv_n = N(_(E(r, n)));
        this.anchr2 = i;
        this.grv_tn = null ;
        this.clamp = 0;
        this.r1 = this.r2 = null ;
        this.k1 = new v(0,0);
        this.k2 = new v(0,0);
        this.jAcc = m;
        this.jMaxLen = 0;
        this.bias = null
    }
    ;
    nn.prototype = Object.create(Yt.prototype);
    nn.prototype.preStep = function(e) {
        var t = this.a
          , n = this.b
          , r = t.local2World(this.grv_a)
          , i = t.local2World(this.grv_b)
          , s = k(this.grv_n, t.rot)
          , o = g(r, s);
        this.grv_tn = s;
        this.r2 = k(this.anchr2, n.rot);
        var u = T(w(n.p, this.r2), s);
        T(r, s) >= u ? (this.clamp = 1,
        this.r1 = E(r, t.p)) : u >= T(i, s) ? (this.clamp = -1,
        this.r1 = E(i, t.p)) : (this.clamp = 0,
        this.r1 = E(w(x(N(s), -u), x(s, o)), t.p));
        Gt(t, n, this.r1, this.r2, this.k1, this.k2);
        this.jMaxLen = this.maxForce * e;
        t = E(w(n.p, this.r2), w(t.p, this.r1));
        this.bias = P(x(t, -(1 - Math.pow(this.errorBias, e)) / e), this.maxBias)
    }
    ;
    nn.prototype.applyCachedImpulse = function(e) {
        $t(this.a, this.b, this.r1, this.r2, this.jAcc.x * e, this.jAcc.y * e)
    }
    ;
    nn.prototype.grooveConstrain = function(e) {
        var t = this.grv_tn;
        e = 0 < this.clamp * T(e, t) ? e : C(e, t);
        return P(e, this.jMaxLen)
    }
    ;
    nn.prototype.applyImpulse = function() {
        var e = this.a
          , t = this.b
          , n = Wt(e, t, this.r1, this.r2)
          , n = E(this.bias, n)
          , r = this.k2
          , n = new v(g(n, this.k1),g(n, r))
          , r = this.jAcc;
        this.jAcc = this.grooveConstrain(w(r, n));
        $t(e, t, this.r1, this.r2, this.jAcc.x - r.x, this.jAcc.y - r.y)
    }
    ;
    nn.prototype.getImpulse = function() {
        return y(this.jAcc)
    }
    ;
    nn.prototype.setGrooveA = function(e) {
        this.grv_a = e;
        this.grv_n = N(_(E(this.grv_b, e)));
        this.activateBodies()
    }
    ;
    nn.prototype.setGrooveB = function(e) {
        this.grv_b = e;
        this.grv_n = N(_(E(e, this.grv_a)));
        this.activateBodies()
    }
    ;
    var rn = function(e, t) {
        return (e.restLength - t) * e.stiffness
    }
      , sn = e.DampedSpring = function(e, t, n, r, i, s, o) {
        Yt.call(this, e, t);
        this.anchr1 = n;
        this.anchr2 = r;
        this.restLength = i;
        this.stiffness = s;
        this.damping = o;
        this.springForceFunc = rn;
        this.target_vrn = this.v_coef = 0;
        this.r1 = this.r2 = null ;
        this.nMass = 0;
        this.n = null
    }
    ;
    sn.prototype = Object.create(Yt.prototype);
    sn.prototype.preStep = function(e) {
        var t = this.a
          , n = this.b;
        this.r1 = k(this.anchr1, t.rot);
        this.r2 = k(this.anchr2, n.rot);
        var r = E(w(n.p, this.r2), w(t.p, this.r1))
          , s = y(r);
        this.n = x(r, 1 / (s ? s : 1 / 0));
        r = Qt(t, n, this.r1, this.r2, this.n);
        i(0 !== r, "Unsolvable this.");
        this.nMass = 1 / r;
        this.target_vrn = 0;
        this.v_coef = 1 - Math.exp(-this.damping * e * r);
        s = this.springForceFunc(this, s);
        $t(t, n, this.r1, this.r2, this.n.x * s * e, this.n.y * s * e)
    }
    ;
    sn.prototype.applyCachedImpulse = function() {}
    ;
    sn.prototype.applyImpulse = function() {
        var e = this.a
          , t = this.b
          , n = Xt(e, t, this.r1, this.r2, this.n)
          , r = (this.target_vrn - n) * this.v_coef;
        this.target_vrn = n + r;
        r *= this.nMass;
        $t(e, t, this.r1, this.r2, this.n.x * r, this.n.y * r)
    }
    ;
    sn.prototype.getImpulse = function() {
        return 0
    }
    ;
    var on = function(e, t) {
        return (t - e.restAngle) * e.stiffness
    }
      , un = e.DampedRotarySpring = function(e, t, n, r, i) {
        Yt.call(this, e, t);
        this.restAngle = n;
        this.stiffness = r;
        this.damping = i;
        this.springTorqueFunc = on;
        this.iSum = this.w_coef = this.target_wrn = 0
    }
    ;
    un.prototype = Object.create(Yt.prototype);
    un.prototype.preStep = function(e) {
        var t = this.a
          , n = this.b
          , r = t.i_inv + n.i_inv;
        i(0 !== r, "Unsolvable spring.");
        this.iSum = 1 / r;
        this.w_coef = 1 - Math.exp(-this.damping * e * r);
        this.target_wrn = 0;
        e *= this.springTorqueFunc(this, t.a - n.a);
        t.w -= e * t.i_inv;
        n.w += e * n.i_inv
    }
    ;
    un.prototype.applyImpulse = function() {
        var e = this.a
          , t = this.b
          , n = e.w - t.w
          , r = (this.target_wrn - n) * this.w_coef;
        this.target_wrn = n + r;
        n = r * this.iSum;
        e.w += n * e.i_inv;
        t.w -= n * t.i_inv
    }
    ;
    var an = e.RotaryLimitJoint = function(e, t, n, r) {
        Yt.call(this, e, t);
        this.min = n;
        this.max = r;
        this.iSum = this.bias = this.jMax = this.jAcc = 0
    }
    ;
    an.prototype = Object.create(Yt.prototype);
    an.prototype.preStep = function(e) {
        var t = this.a
          , n = this.b
          , r = n.a - t.a
          , i = 0;
        r > this.max ? i = this.max - r : this.min > r && (i = this.min - r);
        this.iSum = 1 / (1 / t.i + 1 / n.i);
        t = this.maxBias;
        this.bias = p(-(1 - Math.pow(this.errorBias, e)) * i / e, -t, t);
        this.jMax = this.maxForce * e;
        this.bias || (this.jAcc = 0)
    }
    ;
    an.prototype.applyCachedImpulse = function(e) {
        var t = this.a
          , n = this.b;
        e *= this.jAcc;
        t.w -= e * t.i_inv;
        n.w += e * n.i_inv
    }
    ;
    an.prototype.applyImpulse = function() {
        if (this.bias) {
            var e = this.a
              , t = this.b
              , n = -(this.bias + (t.w - e.w)) * this.iSum
              , r = this.jAcc;
            this.jAcc = 0 > this.bias ? p(r + n, 0, this.jMax) : p(r + n, -this.jMax, 0);
            n = this.jAcc - r;
            e.w -= n * e.i_inv;
            t.w += n * t.i_inv
        }
    }
    ;
    an.prototype.getImpulse = function() {
        return Math.abs(joint.jAcc)
    }
    ;
    var fn = e.RatchetJoint = function(e, t, n, r) {
        Yt.call(this, e, t);
        this.angle = 0;
        this.phase = n;
        this.ratchet = r;
        this.angle = (t ? t.a : 0) - (e ? e.a : 0);
        this.iSum = this.bias = this.jAcc = this.jMax = 0
    }
    ;
    fn.prototype = Object.create(Yt.prototype);
    fn.prototype.preStep = function(e) {
        var t = this.a
          , n = this.b
          , r = this.phase
          , i = this.ratchet
          , s = n.a - t.a
          , o = this.angle - s
          , u = 0;
        0 < o * i ? u = o : this.angle = Math.floor((s - r) / i) * i + r;
        this.iSum = 1 / (t.i_inv + n.i_inv);
        t = this.maxBias;
        this.bias = p(-(1 - Math.pow(this.errorBias, e)) * u / e, -t, t);
        this.jMax = this.maxForce * e;
        this.bias || (this.jAcc = 0)
    }
    ;
    fn.prototype.applyCachedImpulse = function(e) {
        var t = this.a
          , n = this.b;
        e *= this.jAcc;
        t.w -= e * t.i_inv;
        n.w += e * n.i_inv
    }
    ;
    fn.prototype.applyImpulse = function() {
        if (this.bias) {
            var e = this.a
              , t = this.b
              , n = this.ratchet
              , r = -(this.bias + (t.w - e.w)) * this.iSum
              , i = this.jAcc;
            this.jAcc = p((i + r) * n, 0, this.jMax * Math.abs(n)) / n;
            r = this.jAcc - i;
            e.w -= r * e.i_inv;
            t.w += r * t.i_inv
        }
    }
    ;
    fn.prototype.getImpulse = function(e) {
        return Math.abs(e.jAcc)
    }
    ;
    var ln = e.GearJoint = function(e, t, n, r) {
        Yt.call(this, e, t);
        this.phase = n;
        this.ratio = r;
        this.ratio_inv = 1 / r;
        this.iSum = this.bias = this.jMax = this.jAcc = 0
    }
    ;
    ln.prototype = Object.create(Yt.prototype);
    ln.prototype.preStep = function(e) {
        var t = this.a
          , n = this.b;
        this.iSum = 1 / (t.i_inv * this.ratio_inv + this.ratio * n.i_inv);
        var r = this.maxBias;
        this.bias = p(-(1 - Math.pow(this.errorBias, e)) * (n.a * this.ratio - t.a - this.phase) / e, -r, r);
        this.jMax = this.maxForce * e
    }
    ;
    ln.prototype.applyCachedImpulse = function(e) {
        var t = this.a
          , n = this.b;
        e *= this.jAcc;
        t.w -= e * t.i_inv * this.ratio_inv;
        n.w += e * n.i_inv
    }
    ;
    ln.prototype.applyImpulse = function() {
        var e = this.a
          , t = this.b
          , n = (this.bias - (t.w * this.ratio - e.w)) * this.iSum
          , r = this.jAcc;
        this.jAcc = p(r + n, -this.jMax, this.jMax);
        n = this.jAcc - r;
        e.w -= n * e.i_inv * this.ratio_inv;
        t.w += n * t.i_inv
    }
    ;
    ln.prototype.getImpulse = function() {
        return Math.abs(this.jAcc)
    }
    ;
    ln.prototype.setRatio = function(e) {
        this.ratio = e;
        this.ratio_inv = 1 / e;
        this.activateBodies()
    }
    ;
    var cn = e.SimpleMotor = function(e, t, n) {
        Yt.call(this, e, t);
        this.rate = n;
        this.iSum = this.jMax = this.jAcc = 0
    }
    ;
    cn.prototype = Object.create(Yt.prototype);
    cn.prototype.preStep = function(e) {
        this.iSum = 1 / (this.a.i_inv + this.b.i_inv);
        this.jMax = this.maxForce * e
    }
    ;
    cn.prototype.applyCachedImpulse = function(e) {
        var t = this.a
          , n = this.b;
        e *= this.jAcc;
        t.w -= e * t.i_inv;
        n.w += e * n.i_inv
    }
    ;
    cn.prototype.applyImpulse = function() {
        var e = this.a
          , t = this.b
          , n = -(t.w - e.w + this.rate) * this.iSum
          , r = this.jAcc;
        this.jAcc = p(r + n, -this.jMax, this.jMax);
        n = this.jAcc - r;
        e.w -= n * e.i_inv;
        t.w += n * t.i_inv
    }
    ;
    cn.prototype.getImpulse = function() {
        return Math.abs(this.jAcc)
    }
})();
var world, PHYS_SCALE = 1, RAD_TO_DEGREES = 180 / Math.PI, DEGREES_TO_RAD = Math.PI / 180, objA, objB, debugCanvas, debugDraw, space, v = cp.v, GRABABLE_MASK_BIT = -2147483648, NOT_GRABABLE_MASK = ~GRABABLE_MASK_BIT;
var worldManifold, isCollideParticlesNeed = !0, collidedChar, collidedAim, collidedSensor, collidedBody, collidedGlass, force, angle, fixDef, bodyDef;
var DEFAULT_RECT_SIZE = 90 / PHYS_SCALE
  , DEFAULT_BOX_SIZE = 52 / PHYS_SCALE;
var querySelectedBody, queryV = new v(0,0);
var ChipMunkDebugDrawer = function() {
    this.space = new cp.Space;
    this.fps = this.remainder = 0;
    this.mouse = v(0, 0);
    this.drawTime = this.simulationTime = 0;
    this.scale = 1;
    this.width = minW;
    this.height = minH;
    var e = this;
    this.canvas2point = function(t, n) {
        return v(t / e.scale, 480 - n / e.scale)
    }
    ;
    this.point2canvas = function(t) {
        return v(t.x * e.scale, t.y * e.scale)
    }
}
;
ChipMunkDebugDrawer.prototype.drawInfo = function() {
    var e = this.space
      , t = this.width - 20;
    this.ctx.textAlign = "start";
    this.ctx.textBaseline = "alphabetic";
    this.ctx.fillStyle = "black";
    var n = Math.floor(10 * this.fps) / 10;
    0 === e.activeShapes.count && (n = "--");
    this.ctx.fillText("FPS: " + n, 10, 50, t);
    this.ctx.fillText("Step: " + e.stamp, 10, 80, t);
    n = e.arbiters.length;
    this.maxArbiters = this.maxArbiters ? Math.max(this.maxArbiters, n) : n;
    this.ctx.fillText("Arbiters: " + n + " (Max: " + this.maxArbiters + ")", 10, 110, t);
    for (var r = 0, i = 0; i < n; i++)
        r += e.arbiters[i].contacts.length;
    this.maxContacts = this.maxContacts ? Math.max(this.maxContacts, r) : r;
    this.ctx.fillText("Contact points: " + r + " (Max: " + this.maxContacts + ")", 10, 140, t);
    this.ctx.fillText("Simulation time: " + this.simulationTime + " ms", 10, 170, t);
    this.ctx.fillText("Draw time: " + this.drawTime + " ms", 10, 200, t);
    this.message && this.ctx.fillText(this.message, 10, this.height - 50, t)
}
;
ChipMunkDebugDrawer.prototype.draw = function() {
    var e = this.ctx
      , t = this;
    t.scale = scaleFactor;
    e.strokeStyle = "black";
    e.clearRect(0, 0, debugCanvas.width, debugCanvas.height);
    this.ctx.font = "16px sans-serif";
    this.ctx.lineCap = "round";
    this.space.eachShape(function(n) {
        e.fillStyle = n.style();
        n.draw(e, t.scale, t.point2canvas)
    });
    this.space.eachConstraint(function(n) {
        n.draw && n.draw(e, t.scale, t.point2canvas)
    })
}
;
var drawSegment = function(e, t, n) {
    var r = this.ctx;
    r.beginPath();
    e = this.point2canvas(e);
    t = this.point2canvas(t);
    r.moveTo(e.x, e.y);
    r.lineTo(t.x, t.y);
    r.lineWidth = 1;
    r.strokeStyle = n;
    r.stroke()
}
  , drawBB = function(e, t, n) {
    var r = this.ctx
      , i = this.point2canvas(v(e.l, e.t))
      , s = this.scale * (e.r - e.l);
    e = this.scale * (e.t - e.b);
    t && (r.fillStyle = t,
    r.fillRect(i.x, i.y, s, e));
    n && (r.strokeStyle = n,
    r.strokeRect(i.x, i.y, s, e))
}
  , drawCircle = function(e, t, n, r, i) {
    r = n(r);
    e.beginPath();
    e.arc(r.x, r.y, t * i, 0, 2 * Math.PI, !1);
    e.fill();
    e.stroke()
}
  , drawLine = function(e, t, n, r) {
    n = t(n);
    r = t(r);
    e.beginPath();
    e.moveTo(n.x, n.y);
    e.lineTo(r.x, r.y);
    e.stroke()
}
  , drawRect = function(e, t, n, r) {
    var i = t(n);
    t = cp.v.sub(t(cp.v.add(n, r)), i);
    e.fillRect(i.x, i.y, t.x, t.y)
}
  , springPoints = [v(0, 0), v(.2, 0), v(.25, 3), v(.3, -6), v(.35, 6), v(.4, -6), v(.45, 6), v(.5, -6), v(.55, 6), v(.6, -6), v(.65, 6), v(.7, -3), v(.75, 6), v(.8, 0), v(1, 0)]
  , drawSpring = function(e, t, n, r, i) {
    r = n(r);
    i = n(i);
    e.beginPath();
    e.moveTo(r.x, r.y);
    i = v.sub(i, r);
    n = v.len(i);
    i = v.mult(i, 1 / n);
    for (var s = 1; s < springPoints.length; s++) {
        var o = v.add(r, v.rotate(v(springPoints[s].x * n, springPoints[s].y * t), i));
        e.lineTo(o.x, o.y)
    }
    e.stroke()
}
;
cp.PolyShape.prototype.draw = function(e, t, n) {
    e.beginPath();
    t = this.tVerts;
    var r = t.length
      , i = n(new cp.Vect(t[r - 2],t[r - 1]));
    e.moveTo(i.x, i.y);
    for (i = 0; i < r; i += 2) {
        var s = n(new cp.Vect(t[i],t[i + 1]));
        e.lineTo(s.x, s.y)
    }
    e.fill();
    e.stroke()
}
;
cp.SegmentShape.prototype.draw = function(e, t, n) {
    var r = e.lineWidth;
    e.lineWidth = Math.max(1, 2 * this.r * t);
    drawLine(e, n, this.ta, this.tb);
    e.lineWidth = r
}
;
cp.CircleShape.prototype.draw = function(e, t, n) {
    drawCircle(e, t, n, this.tc, this.r);
    drawLine(e, n, this.tc, cp.v.mult(this.body.rot, this.r).add(this.tc))
}
;
cp.PinJoint.prototype.draw = function(e, t, n) {
    t = this.a.local2World(this.anchr1);
    var r = this.b.local2World(this.anchr2);
    e.lineWidth = 2;
    e.strokeStyle = "grey";
    drawLine(e, n, t, r)
}
;
cp.SlideJoint.prototype.draw = function(e, t, n) {
    t = this.a.local2World(this.anchr1);
    var r = this.b.local2World(this.anchr2)
      , i = v.add(t, v.clamp(v.sub(r, t), this.min));
    e.lineWidth = 2;
    e.strokeStyle = "grey";
    drawLine(e, n, t, r);
    e.strokeStyle = "red";
    drawLine(e, n, t, i)
}
;
cp.PivotJoint.prototype.draw = function(e, t, n) {
    var r = this.a.local2World(this.anchr1)
      , i = this.b.local2World(this.anchr2);
    e.strokeStyle = "grey";
    e.fillStyle = "grey";
    drawCircle(e, t, n, r, 2);
    drawCircle(e, t, n, i, 2)
}
;
cp.GrooveJoint.prototype.draw = function(e, t, n) {
    var r = this.a.local2World(this.grv_a)
      , i = this.a.local2World(this.grv_b)
      , s = this.b.local2World(this.anchr2);
    e.strokeStyle = "grey";
    drawLine(e, n, r, i);
    drawCircle(e, t, n, s, 3)
}
;
cp.DampedSpring.prototype.draw = function(e, t, n) {
    var r = this.a.local2World(this.anchr1)
      , i = this.b.local2World(this.anchr2);
    e.strokeStyle = "grey";
    drawSpring(e, t, n, r, i)
}
;
for (var randColor = function() {
    return Math.floor(256 * Math.random())
}
, debugAlpha = .7, styles = [], i = 0; 100 > i; i++)
    styles.push("rgba(" + randColor() + ", " + randColor() + ", " + randColor() + "," + debugAlpha + ")");
cp.Shape.prototype.style = function() {
    var e;
    if (this.sensor)
        return "rgba(255,255,255,0)";
    e = this.body;
    return e.isSleeping() ? "rgba(50,50,50," + debugAlpha + ")" : e.nodeIdleTime > this.space.sleepTimeThreshold ? "rgba(170,170,170," + debugAlpha + ")" : styles[this.hashid % styles.length]
}
;
var MINIMUM_SPEED = 3, MAX_SPEED = 6, IS_NITRO = !1, DEFAULT_STATE = 0, COLLIDED_STATE = 1, ACTIVATOR_RADIUS = 25, MORE_EASY_MULT = 1, dx, dy, dist, isNeedActivate = !1;
(function(e) {
    function t(e, t, n, r, i) {
        var s = new createjs.Sprite(zoeSS);
        s.baseBlock = this;
        this.vis = s;
        s = new createjs.Sprite(zoeSS);
        s.baseBlock = this;
        this.additVision = s;
        this.reset(e, t, n, r, i)
    }
    var n = t.prototype;
    n.reset = function(t, n, r, i, s) {
        this.typeId = t;
        this.type = e[t];
        createjs.Tween.removeTweens(this.vis);
        removeFromParent(this.additVision);
        this.parent = n;
        this.vis.isOnTop = !1;
        this.vis.isOnBottom = !0;
        this.isMovable = this.isFly = !1;
        this.teleportPartner = null ;
        this.isReversed = !1;
        this.dir = 1;
        this.activForce = FAN_MAX_FORCE;
        this.activDistance = FAN_ACTIV_DISTANCE;
        this.distanceStartX = this.distanceEndX = 0;
        this.isRemovable = this.isClicked = !1;
        this.doorDistanceEnd = 0;
        this.isMechanic = this.isActivated = this.isGlass = !1;
        this.labelId = "";
        this.isMonster = !1;
        this.isRectMonster = !0;
        this.isNeedDispose = !1;
        this.teleportationStatus = -1;
        this.vis.alpha = 1;
        this.vis.mouseEnabled = !1;
        this.physBody = null ;
        this.scale = r;
        this.scaleY = i;
        this.isEnemy = !1;
        this.additParams = s;
        this.aimTeleport = this.startTeleport = null ;
        this.isFirstCollided = this.isTeleport = this.isDanger = this.isAim = !1;
        this.shape = null ;
        this.defaultRotation = 0;
        this.animMargin = 30 * Math.random();
        this.isNeutralEnemy = !1;
        this.startMarginX = this.startMoveX = this.visionWidth = this.currSpeed = 0;
        this.state = DEFAULT_STATE;
        this.collideTimer = this.charRadius = 0;
        this.isExploded = !1;
        this.lastColliderType = -1;
        this.raduis = this.vis.rotation = 0;
        this.isDied = !1;
        this.forceToFly = this.vel = null ;
        this.isByPhysPosUpdate = !0;
        this.vis.cursor = null ;
        this.isLand = this.isHero = !1;
        this.lastAngularVelocity = this.lastVelocity = 0;
        this.isHelp = -1 < t.indexOf("HELP");
        this.isDynamicDecor = (this.isDecor = -1 < t.indexOf("DECOR")) ? this.isDynDecor() : !0;
        this.isPhysStatic = -1 < t.indexOf("PHYSICS");
        this.vis.visible = !this.isPhysStatic;
        this.type === LAND_TYPE && (this.isLand = !0);
        this.setVisionByType();
        this.updateVisionScale();
        !this.isDynamicDecor && isWithCache && (this.parent = allBgContainer);
        this.parent.addChild(this.vis)
    }
    ;
    n.isDynDecor = function() {
        return this.isHelp || this.type === DECOR_ARROW_TYPE
    }
    ;
    n.setupMouseEventListeners = function() {
        this.vis.cursor = "pointer"
    }
    ;
    n.setVisionByType = function() {
        this.vis.gotoAndStop(this.typeId);
        var e = !1;
        if (this.type === DYNAMIC_BOX_TYPE || this.type === DYNAMIC_RECT_TYPE || this.type === DYNAMIC_TRIANGLE_TYPE)
            e = this.isRemovable = !0;
        if (this.type === HARD_BOX_TYPE || this.type === HARD_RECT_TYPE || this.type === LAND_TYPE || this.type === STATIC_BALK_1_TYPE)
            e = !0;
        this.type === STATIC_BOX_TYPE && "INVIS" == this.getAdditParams(0) && (this.vis.visible = !1);
        this.type === HERO_TYPE ? (this.isHero = !0,
        this.vis.play(),
        this.isByPhysPosUpdate = !0,
        addToArray(allHeroes, this)) : this.type === BOMB_TYPE ? (this.vis.cursor = "pointer",
        this.vis.mouseEnabled = !0,
        this.activDistance = parseInt(this.getAdditParams(0)),
        this.activForce = parseInt(this.getAdditParams(1)),
        addToArray(allBombs, this)) : this.type === GLASS_BLOCK_TYPE || this.type === GLASS_BOX_TYPE || this.type === GLASS_TRIANGLE_TYPE ? this.isGlass = !0 : this.type === TELEGA_TYPE ? (this.readMovableConfig(1),
        this.isMovable = !0,
        this.visionWidth = 106,
        "1" !== this.getAdditParams(0) && (this.isRemovable = e = !0)) : this.type === MOVABLE_BALK_TYPE ? (this.readMovableConfig(0),
        this.isMovable = !0,
        this.visionWidth = 106,
        this.vis.gotoAndStop("STATIC_BALK_1_TYPE")) : this.type === STATIC_BALK_1_TYPE ? 0 < this.getAdditParams(0).length && (this.isRemovable = !0) : this.type === FAN_TYPE && (this.vis.cursor = "pointer",
        this.vis.mouseEnabled = !0,
        addToArray(allFans, this),
        this.isByPhysPosUpdate = !1);
        this.isRemovable && (this.vis.cursor = "pointer",
        this.vis.mouseEnabled = !0,
        currentRemovablesNum++);
        this.type === AIM_TYPE && (this.isAim = !0,
        this.visionWidth = 65,
        this.additVision.gotoAndStop("AIM_BACK"),
        this.parent.addChildAt(this.additVision, 0),
        "REV" == this.getAdditParams(0) && (this.isReversed = !0),
        this.getAdditParams(1) && (this.readMovableConfig(2),
        this.isMovable = !0,
        this.vis.gotoAndStop("AIM_TYPE_MOVABLE")));
        this.type === DANGER_TYPE && (this.isDanger = !0,
        this.isDynamicDecor = !1);
        if (this.type === TELEPORT_TYPE) {
            this.vis.play();
            this.isByPhysPosUpdate = !1;
            this.isTeleport = !0;
            this.labelId = this.getAdditParams(0);
            addToArray(allTeleports, this);
            for (var t = allTeleports.length - 1; 0 <= t; --t) {
                var n = allTeleports[t];
                n.labelId === this.labelId && (n.teleportPartner = this,
                this.teleportPartner = n)
            }
        }
        this.type === FAN_TYPE && ("REV" == this.getAdditParams(0) && (this.isReversed = !0,
        this.dir = -1),
        this.getAdditParams(1) && (this.activDistance = parseInt(this.getAdditParams(1))),
        this.getAdditParams(2) && (this.activForce = parseInt(this.getAdditParams(2))));
        e && 0 < this.getAdditParams(0).length && this.vis.gotoAndStop(this.typeId + "_" + this.getAdditParams(0));
        this.vis.paused || (this.vis.currentAnimationFrame = Math.floor(20 * Math.random()))
    }
    ;
    n.readMovableConfig = function(e) {
        this.dir = "R" === this.getAdditParams(0) ? 1 : -1;
        var t = parseInt(this.getAdditParams(1 + e));
        this.startMarginX = 1e3 <= t ? 1e3 - t : t;
        this.currSpeed = parseInt(this.getAdditParams(2 + e)) / 10
    }
    ;
    n.getAdditParams = function(e) {
        return this.additParams[0].split("_").length > e ? this.additParams[0].split("_")[e] : null
    }
    ;
    n.setupActivLabel = function() {
        this.labelId = this.getAdditParams(0)
    }
    ;
    n.bombClick = function(e) {
        isLevelCompleted || isLevelFailed || isGamePaused || this.isExploded || (createExplosion(this),
        this.vis.removeAllEventListeners(),
        this.vis.mouseEnabled = !1,
        this.vis.scaleX = this.vis.scaleY = this.scale = 2,
        this.vis.gotoAndPlay("bombexplosionv"),
        addToParent(this.vis, this.parent),
        this.isByPhysPosUpdate = !1,
        this.disposePhysBody(),
        this.isExploded = !0,
        playSound("explodeSound"))
    }
    ;
    n.calculateBoundingBox = function() {
        var e = 1;
        this.isEnemy && (e = .7);
        var t = this.vis._animation;
        t && t.frames && 0 < t.frames.length && (this.bounds = charSS.getFrameBounds(t.frames[0]),
        this.bounds.width = this.bounds.width * this.scale * e,
        this.bounds.height = this.bounds.height * this.scale * e,
        this.bounds.x = this.bounds.x * this.scale * e,
        this.bounds.y = this.bounds.y * this.scale * e,
        this.charRadius = this.bounds.width / 2)
    }
    ;
    n.setPosition = function(e, t, n) {
        var r = e;
        this.isMovable && (this.distanceEndX = 140 * this.scale - this.scaleY * this.visionWidth,
        this.distanceStartX = e - this.distanceEndX / 2,
        this.distanceEndX = e + this.distanceEndX / 2,
        r = Math.min(this.distanceEndX, Math.max(this.distanceStartX, e + this.startMarginX)));
        this.vis.x = this.additVision.x = r;
        this.vis.y = this.additVision.y = t;
        this.defaultRotation = this.vis.rotation = this.additVision.rotation = n
    }
    ;
    n.initPhysics = function() {
        if (!this.isDecor && this.type !== ACTIVATOR_TYPE && this.type !== TELEPORT_TYPE) {
            var e;
            e = this.vis.x / PHYS_SCALE;
            var t = this.vis.y / PHYS_SCALE
              , n = this.vis.rotation * DEGREES_TO_RAD;
            if (e = this.isPhysStatic || this.type === DYNAMIC_BOX_TYPE || this.type === DANGER_TYPE || this.type === MONSTER_TYPE && this.isRectMonster || this.type === GLASS_BLOCK_TYPE || this.type === GLASS_BOX_TYPE || this.type === DOOR_TYPE || this.type === DYNAMIC_RECT_TYPE || this.type === HARD_RECT_TYPE || this.type === HARD_BOX_TYPE || this.type === STATIC_BALK_1_TYPE || this.type === STATIC_BOX_TYPE ? createRectPhysics(e, t, this.scale, this.scaleY, this.type, n) : this.type === DYNAMIC_TRIANGLE_TYPE || this.type === GLASS_TRIANGLE_TYPE || this.type === HARD_TRIANGLE_TYPE ? createTrianglePhysics(e, t, this.scale, this.scaleY, this.type, n) : this.type === TELEGA_TYPE || this.type === AIM_TYPE || this.type === MOVABLE_BALK_TYPE ? createKinematicPhysics(e, t, this.scale, this.scaleY, this.type, n, this) : this.type === LAND_TYPE ? createSegmentPhysics(e, t, this.scale, this.scaleY, this.type, n, this) : createCircleShape(e, t, this.scale * this.getRadiusByType() / PHYS_SCALE, this.type, n, this))
                e.userdata = this,
                this.physBody = e
        }
    }
    ;
    n.getRadiusByType = function() {
        switch (this.type) {
        case HERO_TYPE:
            return 32;
        case AIM_TYPE:
            return 19;
        case HERO_DOC_TYPE:
            return 31;
        case HERO_WOMAN_TYPE:
            return 31;
        case TELEPORT_TYPE:
            return 25;
        case BOMB_TYPE:
            return 20;
        case MONSTER_TYPE:
            return 31;
        case DYNAMIC_CIRCLE_TYPE:
            return 16;
        case FAN_TYPE:
            return 25
        }
        return 0
    }
    ;
    n.setFrame = function(e, t) {
        t ? this.vis.gotoAndPlay(e) : this.vis.gotoAndStop(e)
    }
    ;
    n.setVisionState = function(e) {}
    ;
    n.onInflateEnd = function() {
        this.isFly = !1
    }
    ;
    n.tick = function() {
        if (this.isNeedDispose)
            addToArray(toDisposeChars, this);
        else if (!isGamePaused && (!this.isDecor || this.isDynamicDecor))
            if (this.physBody && !this.isPhysStatic && this.isByPhysPosUpdate && (this.isMovable && (this.vis.x > this.distanceEndX ? this.dir = -1 : this.vis.x < this.distanceStartX && (this.dir = 1),
            this.physBody.setVel(v(15 * this.currSpeed * this.dir * dtScale, 0)),
            this.physBody.p.x += this.currSpeed * this.dir * dtScale),
            this.vis.x = this.additVision.x = this.physBody.p.x,
            this.vis.y = this.additVision.y = this.physBody.p.y,
            this.vis.rotation = this.additVision.rotation = Math.atan2(this.physBody.rot.y, this.physBody.rot.x) * RAD_TO_DEGREES),
            this.type === BOMB_TYPE ? (this.vis.scaleX = this.scale + Math.cos((counter + this.animMargin) / 5) / 60,
            this.vis.scaleY = this.scale - Math.cos((counter + this.animMargin) / 5) / 60,
            this.isExploded && 13 <= this.vis.currentAnimationFrame && (this.isNeedDispose = !0)) : this.isHelp && (this.vis.scaleX = this.vis.scaleY = this.scale + Math.cos((counter + this.animMargin) / 12) / 20),
            this.isHero && (this.updateTeleportation(),
            (-50 > this.vis.x || 410 < this.vis.x || this.vis.y > viewportH + 40 || -140 > this.vis.y) && this.dieByWorldOut()),
            this.type === AIM_TYPE)
                for (var e = 0; e < allHeroesLen; e++) {
                    var t = allHeroes[e];
                    if (25 > Math.abs(t.vis.x - this.vis.x) && 10 > Math.abs(t.vis.y - this.vis.y)) {
                        if (isLevelCompleted && !isLevelFailed)
                            break;
                        trace("level complete!");
                        this.aimCollected();
                        updateShare(currentLevel + 1);
                        showLevelCompleteWin()
                    }
                }
            else if (this.type === TELEPORT_TYPE)
                for (e = 0; e < allHeroesLen; e++)
                    t = allHeroes[e],
                    40 > Math.abs(t.vis.x - this.vis.x) && 40 > Math.abs(t.vis.y - this.vis.y) ? t.teleportTo(this) : 0 > t.teleportationStatus && t.teleportContactEnd(this)
    }
    ;
    n.updateTeleportation = function() {
        if (this.physBody)
            if (0 === this.teleportationStatus) {
                this.isByPhysPosUpdate = !1;
                this.teleportationStatus = 1;
                this.physBody.p.x = -1e3;
                this.physBody.p.y = 0;
                var e = this;
                playSound("portalAppearSound");
                createjs.Tween.get(this.vis, {
                    override: !0
                }).to({
                    rotation: 900,
                    scaleX: .05,
                    scaleY: .05,
                    x: this.startTeleport.vis.x,
                    y: this.startTeleport.vis.y
                }, 700).to({
                    x: this.aimTeleport.vis.x,
                    y: this.aimTeleport.vis.y
                }, 0).call(function() {}).to({
                    rotation: 0,
                    scaleX: this.scale,
                    scaleY: this.scale
                }, 700).call(function() {
                    e.teleportationStatus = 2
                })
            } else
                2 == this.teleportationStatus && (this.physBody.p.x = this.aimTeleport.vis.x / PHYS_SCALE,
                this.physBody.p.y = this.aimTeleport.vis.y / PHYS_SCALE,
                this.physBody.w = 0,
                this.physBody.setAngle(0),
                this.physBody.setVel(v(0, 0)),
                this.teleportationStatus = -1,
                this.isByPhysPosUpdate = !0)
    }
    ;
    n.updateVisionScale = function() {
        this.vis.scaleX = this.scale;
        this.vis.scaleY = this.scaleY;
        this.isMovable && (this.vis.scaleX = this.vis.scaleY = this.scaleY);
        this.isReversed && (this.vis.scaleX *= -1);
        this.additVision.scaleX = this.vis.scaleX;
        this.additVision.scaleY = this.vis.scaleY
    }
    ;
    n.dispose = function() {
        removeFromArray(allChars, this);
        this.isHero && removeFromArray(allHeroes, this);
        this.lastColliderType = -1;
        addToDisposed(this);
        this.vis.removeAllEventListeners();
        this.disposePhysBody();
        this.shape = null ;
        this.vis.stop();
        removeFromParent(this.vis);
        removeFromParent(this.additVision)
    }
    ;
    n.collideWithOtherDynamic = function() {
        -1 < this.teleportationStatus || (this.isByPhysPosUpdate = !0)
    }
    ;
    n.toggleFly = function() {}
    ;
    n.heroRejoicing = function() {
        this.vis.gotoAndPlay(this.typeId)
    }
    ;
    n.aimCollected = function() {
        createPrerenderedPart(this.vis.x, this.vis.y, 1.4, "parteffectv3", .71, this.vis, .8);
        addAchiev(GREAT_START_ACHIEV)
    }
    ;
    n.teleportTo = function(e) {
        this.aimTeleport || (this.startTeleport = e,
        this.aimTeleport = e.teleportPartner,
        this.teleportationStatus = 0)
    }
    ;
    n.teleportContactEnd = function(e) {
        this.aimTeleport === e && (this.aimTeleport = this.startTeleport = null )
    }
    ;
    n.die = function() {
        isLevelCompleted || isLevelFailed || (this.isDied = isLevelFailed = !0,
        this.isByPhysPosUpdate = this.isFly = !1,
        hideGameInterface(),
        createjs.Tween.get(this.vis, {
            override: !0
        }).to({
            alpha: 0,
            scaleX: 0,
            scaleY: 0,
            rotation: 900
        }, 1200).wait(400).call(showRestartWin),
        createDiePart(this.vis.x, this.vis.y),
        this.physBody && (this.physBody.p.x = -1e3),
        playSound("restartSound"))
    }
    ;
    n.dieByWorldOut = function() {
        isLevelCompleted || isLevelFailed || (1 >= allHeroes.length ? (this.isDied = isLevelFailed = !0,
        this.isByPhysPosUpdate = this.isFly = !1,
        hideGameInterface(),
        createjs.Tween.get(this.vis).wait(400).call(showRestartWin),
        this.physBody && (this.physBody.p.x = -1e3),
        playSound("restartSound")) : this.isNeedDispose = !0)
    }
    ;
    n.collideWithDyn = function(e) {
        this.isFirstCollided || (this.isByPhysPosUpdate = this.isFirstCollided = !0)
    }
    ;
    n.breakGlass = function() {
        !this.vis.visible || 15 > levelStartTimer || !this.physBody || (this.disposePhysBody(),
        this.vis.visible = !1,
        this.type === GLASS_BLOCK_TYPE ? createGlassRectExplode(this.vis.x, this.vis.y, this.scale, this.vis.rotation) : createPartExplode(this.vis.x, this.vis.y, 3, PART_GLASS_TYPE, null , 3),
        playSound("glassBrakeSound"))
    }
    ;
    n.activateBtn = function() {
        if (!this.isActivated) {
            this.isActivated = !0;
            this.vis.currentAnimationFrame = 1;
            for (var e, t = 0; t < allChars.length; t++)
                e = allChars[t],
                e.isMechanic && !e.isActivated && e.labelId === this.labelId && e.activateMechanic();
            playSound("clickSound")
        }
    }
    ;
    n.deActivateBtn = function() {
        if (this.isActivated) {
            this.isActivated = !1;
            this.vis.currentAnimationFrame = 0;
            for (var e, t = 0; t < allChars.length; t++)
                e = allChars[t],
                e.isMechanic && e.isActivated && e.labelId === this.labelId && e.deActivateMechanic();
            playSound("clickSound")
        }
    }
    ;
    n.activateMechanic = function() {
        this.isActivated = !0
    }
    ;
    n.deActivateMechanic = function() {
        this.isActivated = !1
    }
    ;
    n.toggleFan = function() {
        if (this.isActivated = !this.isActivated)
            this.vis.gotoAndPlay("FAN_TYPE_ON"),
            awakeAllBodies(),
            playWindSound();
        else {
            this.vis.gotoAndStop("FAN_TYPE");
            for (var e = 0, t = allFans.length - 1; 0 <= t; --t)
                allFans[t].isActivated && e++;
            1 > e && stopWindSound()
        }
    }
    ;
    n.removeFromField = function() {
        this.disposePhysBody();
        this.isByPhysPosUpdate = !1;
        currentRemovablesNum--;
        var e = this;
        createjs.Tween.get(this.vis).to({
            alpha: 0,
            scaleX: 0,
            scaleY: 0
        }, 250).call(function() {
            e.isNeedDispose = !0
        });
        playRemoveObjectSound()
    }
    ;
    n.disposePhysBody = function() {
        this.physBody && toDisposePhysicsBodies.push(this.physBody);
        this.physBody = null
    }
    ;
    e.CharBase = t
})(window);
var allChars = [], allHeroes = [], disposedChars = [], allBombs = [], allMonsters = [], allActivators = [], allTeleports = [], allFans = [], blockContainer, currentLevel = 0, isLevelCompleted = !1, isLevelFailed = !1, isInflateReason = !1, currentChar, totalFriends = 0, totalBonuses = 0, collectedBonuses = 0, totalScore = 0, currentLevelScore = 0, scoreToAdd = 0;
var levelRestartsCounter = 0
  , levelsWithoutRestartsCounter = 0
  , diamondsCounter = 0;
var totalEnemies = 0;
var isLevelRestarted = !1;
var levelStartTimer = 0;
var BIG_DISTANCE = 1e8;
var lastopenedlvl = 0
  , levelstates = []
  , LEVELS_NUM = 20
  , ZERO_STAR = 0
  , ONE_STAR = 1
  , TWO_STAR = 2
  , THREE_STAR = 3
  , ACHIEVS_NUM = 6
  , NOT_ACHIEVED = 0
  , ACHIEVED = 1
  , allachievs = []
  , GREAT_START_ACHIEV = 0
  , SUPER_COLLECTOR_ACHIEV = 1
  , DESTROYER_ACHIEV = 2
  , AMAZING_GAME_ACHIEV = 3
  , SOCCER_MASTER_ACHIEV = 4
  , MEGA_STAR_ACHIEV = 5
  , isStorageSupported = !1;
var allInstructions = [];
var allBonuses = [], disposedBonuses = [], currentBon;
var toDisposeBonuses = [];
(function(e) {
    function t(e, t, n, r, i) {
        var s = new createjs.Sprite(zoeSS);
        s.mouseEnabled = !1;
        s.baseBlock = this;
        this.vis = s;
        this.reset(e, t, n, r, i)
    }
    var n = t.prototype;
    n.reset = function(t, n, r, i, s) {
        this.typeId = t;
        this.type = e[t];
        createjs.Tween.removeTweens(this.vis);
        this.tweenMaxSteps = 0;
        this.isNeedCollect = !1;
        this.additParams = s;
        this.parent = n;
        this.vis.isOnTop = !1;
        this.vis.isOnBottom = !0;
        this.vis.alpha = 1;
        this.isCollected = this.isGhost = !1;
        this.animMargin = 30 * Math.random();
        this.scaleX = r;
        this.scaleY = i;
        this.moveTarget = null ;
        this.distanceSq = this.speed = this.dy = this.dx = 0;
        this.hero = null ;
        this.dir = 1;
        this.distanceStartX = this.distanceEndX = 0;
        this.sensorRadiusSq = 3600;
        this.collectRadiusSq = 100;
        this.setVisionByType();
        this.updateVisionScale();
        n.addChild(this.vis);
        this.isGhost || totalBonuses++
    }
    ;
    n.setPos = function(e, t, n) {
        this.vis.x = e;
        this.vis.y = t;
        this.isGhost && 0 === this.distanceStartX && (this.distanceEndX = 140 * this.scaleX - 52 * this.scaleY,
        this.distanceStartX = e - this.distanceEndX / 2,
        this.distanceEndX = e + this.distanceEndX / 2);
        n && (this.vis.rotation = n)
    }
    ;
    n.updateVisionScale = function() {
        this.vis.scaleX = this.scaleX;
        this.vis.scaleY = this.scaleY;
        this.isGhost && (this.vis.scaleX = this.scaleY)
    }
    ;
    n.getAdditParams = function(e) {
        return this.additParams[0].split("_")[e]
    }
    ;
    n.setVisionByType = function() {
        this.vis.gotoAndStop(this.typeId);
        this.type === BONUS_DIAMOND_TYPE && (this.vis.play(),
        this.vis._animation.speed = 1.5);
        this.vis.paused || (this.vis.currentAnimationFrame = Math.floor(20 * Math.random()));
        this.type === BONUS_GHOST_TYPE && (this.isGhost = !0,
        this.vis.play(),
        this.speed = parseInt(this.getAdditParams(0)) / 10,
        this.vis._animation.speed = .7,
        this.sensorRadiusSq = 625)
    }
    ;
    n.tick = function() {
        if (!this.isCollected && !isGamePaused)
            if (this.isGhost)
                this.updateGhost();
            else if (this.vis.scaleX = this.scaleX + Math.cos((counter + this.animMargin) / 10) / 12,
            this.vis.scaleY = this.vis.scaleX,
            this.moveTarget)
                this.speed += .2,
                this.dx = this.moveTarget.vis.x - this.vis.x,
                this.dy = this.moveTarget.vis.y - this.vis.y,
                this.distanceSq = this.dx * this.dx + this.dy * this.dy,
                this.vis.x += this.dx / 3 * this.speed,
                this.vis.y += this.dy / 3 * this.speed,
                this.distanceSq < this.collectRadiusSq && (this.isCollected = !0,
                createPrerenderedPart(this.moveTarget.vis.x, this.moveTarget.vis.y, 1, "parteffectv1", .9, this.moveTarget.vis),
                addScore(this.getScoreByType()),
                this.checkBonusAchievByType(),
                this.moveTarget = null ,
                collectedBonuses++,
                playBonusPickSound());
            else
                for (var e = 0; e < allHeroesLen; e++)
                    this.hero = allHeroes[e],
                    this.dx = this.hero.vis.x - this.vis.x,
                    this.dy = this.hero.vis.y - this.vis.y,
                    this.distanceSq = this.dx * this.dx + this.dy * this.dy,
                    this.distanceSq < this.sensorRadiusSq && (this.moveTarget = this.hero)
    }
    ;
    n.updateGhost = function() {
        this.vis.x += this.speed * this.dir * dtScale;
        this.vis.x > this.distanceEndX && (this.dir = -1);
        this.vis.x < this.distanceStartX && (this.dir = 1);
        for (var e = 0; e < allHeroesLen; e++)
            this.hero = allHeroes[e],
            this.dx = this.hero.vis.x - this.vis.x,
            this.dy = this.hero.vis.y - this.vis.y,
            this.distanceSq = this.dx * this.dx + this.dy * this.dy,
            this.distanceSq < this.sensorRadiusSq && this.hero.die()
    }
    ;
    n.checkBonusAchievByType = function() {
        for (var e = 0; e < allBonuses.length; e++)
            ;
    }
    ;
    n.getScoreByType = function() {
        switch (this.type) {
        case BONUS_STAR_TYPE:
            return 50;
        case BONUS_DIAMOND_TYPE:
            return 150;
        case BONUS_MONEY_TYPE:
            return 100;
        default:
            return 50
        }
    }
    ;
    n.dispose = function() {
        removeFromArray(allBonuses, this);
        addToDisposedBonuses(this);
        this.vis.removeAllEventListeners();
        this.vis.stop();
        this.parent.removeChild(this.vis)
    }
    ;
    n.startCollectAnim = function(e) {}
    ;
    e.BonusBase = t
})(window);
var isAudioSupported = !1
  , isMute = !1;
var scoresSound;
var windSound;
var bonusSoundNum = 0;
var achievSoundNum = 0;
var bgMusic;
var pauseBtnV, playMenuBtn, creditsBtn, logoImg, levelSelectContainer, interfaceRestartBtn, isGamePaused, levelLabel, menuEase;
var blinkWin;
var menuContainer, mainMenuMuteBtn, mainMenuMoreGames, mainMenuAchievBtn;
var MUTED_FRAME = "musicoffbtn"
  , UNMUTED_FRAME = "musiconbtn";
var selectMenuBackBtn, selectMenuNextBtn, selectMenuPreviousBtn, allLevelBtns = [], levelsScreen1, levelsScreen2;
var levelCompleteContainer, completeWinNextBtn, star1, star2, star3, completeLevelLabel, completeTotalScore;
var currentLevelStarsNum = 0;
var scoreTweenLength = 0;
var levelPauseContainer, pauseContinueBtn, pauseMuteBtn, pauseTitle;
var achievContainer, raduga, achievDesc;
var achievsReadyToShow = [];
var achGalleryMenuBackBtn, achGalleryContainer, achievGalleryTotalScore, allAchievsLabels = [];
var creditsContainer;
var gameCompleteContainer, collectedStarsTxt;
var isGameCompleteScreenShow = !1;
var hitPoint;
var rotatedDecors = [];
var stage, exportRoot, canvas, rect, container, preload, rotationContainer, particleContainer, winWidth, winHeight, scaleFactor = 1, minW = 320, minH = 440, ow = minW, oh = minH, maxW = 356, maxH = 550, desctopMaxW = maxW, desctopMaxH = maxH, viewportW = minW, viewportH = minH, pixelDensity = 1;
var isWasPaused = null , topVisionLine, zoomFactor;
var timer;
var MyGame = {}, images, files;
MyGame.init = function() {
    try {
        canvas = document.getElementById("canvas");
        images = images || {};
        files = files || {};
        stage = new createjs.Stage("canvas");
        container = new createjs.Container;
        container.isRoot = !0;
        container.width = ow;
        container.height = oh;
        stage.addChild(container);
        detectBrowser();
        blockContainer = new createjs.Container;
        splashContainer = new createjs.Container;
        splashContainer.width = ow;
        splashContainer.height = oh;
        particleContainer = new createjs.Container;
        rotationContainer = new createjs.Container;
        rotationContainer.width = ow;
        rotationContainer.height = oh;
        initResizeManager();
        createjs.Touch.enable(stage, !0);
        isDesktop() && stage.enableMouseOver(20);
        stage.mouseMoveOutside = !0;
        initLoaders();
        stage.update();
        var e = document.getElementById("loader");
        e && e.parentNode && e.parentNode.removeChild(e);
        onGameResize();
        initSpilApi()
    } catch (t) {
        trace(t.name + ":" + t.message)
    }
}
;
var loaderBar, bar, loaderWidth, barHeight = 20;
var fpsText, helperLabel, zoeSS, interfaceSS, bgSS, isPreloaderLogoReady = !1;
var isAllFilesLoaded = !1;
var splashContainer;
var mainBg, fansBg, allBgContainer, smallBg, isNeedCacheSizeUpdate = !1;
var nameCounter = 0;
var counter = 0, animTicker = 0, toDisposePhysicsBodies = [], toDisposeChars = [], clickedChars = [], dtScale = 1, lastDelta = 0, FPS = 30, GAME_FPS = 30, defaultDelta = 1e3 / GAME_FPS, DEFAULT_WORLD_STEP = 1 / GAME_FPS, allHeroesLen = 0, lastTime = 0, data, step = 0;
var currentBgIndex = 0;
