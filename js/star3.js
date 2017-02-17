// анонімна ф-ція що сторює нову область видимості, для того щоб при
// підключенні інших скриптів не було конфлікту імен (змінні і ф-ції з одинаковими іменами)
;(function(){
	window.addEventListener('load', eventWindowLoaded, false);
	function eventWindowLoaded() {
		// ф-ція що регулює розмір канваса і запускає решту ф-цій, що з
		// ним повязані
    startUp();  
   	// запускає різні анімації, такі як повідомлення про баги і т.д.	
    winowAnimation();
    
  	}

  // ==================================
  //	Дані про спробу юзера
  // ==================================

  var userData = [];
  function usrData(time, error) {
  	this.time = time;
  	this.error = error;

  }
/*
 .----------------.  .----------------.  .----------------. 
| .--------------. || .--------------. || .--------------. |
| | ____   ____  | || |      __      | || |  _______     | |
| ||_  _| |_  _| | || |     /  \     | || | |_   __ \    | |
| |  \ \   / /   | || |    / /\ \    | || |   | |__) |   | |
| |   \ \ / /    | || |   / ____ \   | || |   |  __ /    | |
| |    \ ' /     | || | _/ /    \ \_ | || |  _| |  \ \_  | |
| |     \_/      | || ||____|  |____|| || | |____| |___| | |
| |              | || |              | || |              | |
| '--------------' || '--------------' || '--------------' |
 '----------------'  '----------------'  '----------------' 
 */
  // вікно повідомлень
  // var bug = document.querySelectorAll('.bug')[0];                                            
  // var closeBtn = document.getElementById('close');

  // номер поточної спроби
  var proba = 0;
  var elapsed;

/*	         _                 _   _             
            (_)               | | (_)            
  __ _ _ __  _ _ __ ___   __ _| |_ _  ___  _ __  
 / _` | '_ \| | '_ ` _ \ / _` | __| |/ _ \| '_ \ 
| (_| | | | | | | | | | | (_| | |_| | (_) | | | |
 \__,_|_| |_|_|_| |_| |_|\__,_|\__|_|\___/|_| |_|
                                                 
		------ ф-ції для анімації ------
*/

	function winowAnimation() {
	
	// =======================================
  //	Анімація вікна повідомлення про баги
  // =======================================

	var bug = document.querySelectorAll('.bug')[0];                                            
	var closeBtn = document.getElementById('close');

	// показуємо вікно про баги
	fade(bug);

	closeBtn.addEventListener('click', hideBug, false);
	bug.addEventListener('click', hideBug, false);

	// при кліці на хрестик, або на саме вікно будемо його ховати
	function hideBug() {
		fadeOut(bug);
		}

	// зникнення, або відображення результатів по кліку на відповідному чекбоксу
	var hideBox = document.getElementById('hide');
	var result = document.querySelectorAll('.result')[0];

  hideBox.addEventListener("change", function (e) { if(e.target.checked){fadeOut(result)} else fadeIn(result)}, false);

	}

// плавне зникнення
function fadeOut(elt, time) {
    if (typeof elt === 'string') document.getElementById(elt);
    if (!time) time = 500;
  
    var ease = Math.sqrt;
    var start = (new Date()).getTime();
    
    animate();
    
    function animate() {
        var elapsed = (new Date).getTime() - start;
        var progress = elapsed/time;
        
        if (progress < 1) {
            var opacity = ease(1 - progress);
            elt.style.opacity = String(opacity);
            
            setTimeout(animate, Math.min(25, time - elapsed))
        } 
        else {
            elt.style.opacity = '0';
            elt.style.display = 'none';    
        	}
    	}
	}

 
	// плавна поява
	function fadeIn(elt, time) {
    	if (typeof elt === 'string') document.getElementById(elt);
    	if (!time) time = 500;
    
    	var ease = Math.sqrt;
    	var start = (new Date()).getTime();
    	elt.style.display = 'block';
    
    	animate();
    
    	function animate() {
        	var elapsed = (new Date).getTime() - start;
        	var progress = elapsed/time;
        
        	if (progress < 1) {
            	var opacity = ease(progress);
            	elt.style.opacity = String(opacity);
            
            	setTimeout(animate, 15)
        	} 
        	else {
            	elt.style.opacity = '1';    
        		}
    		}
		}

	// ф-ція для появи зі зміщенням dis 
	function fade(elt, dis, startY, time) {
    	if (typeof elt === 'string') document.getElementById(elt);
    	if (!time) time = 500;
    	if (!dis) dis = 3;
    	if (!startY) startY = 0;
      
    	var ease = Math.sqrt;
    	var start = (new Date()).getTime();
    	elt.style.display = 'block';  
    	animate();
    
    	function animate() {
        	var elapsed = (new Date).getTime() - start;
        	var progress = elapsed/time;
        
        	if (progress < 1) {
            	var opacity = ease(progress);
            	var distance =  startY + dis * Math.sin(progress)
 
            	elt.style.opacity = String(opacity);
            	elt.style.top = String(distance) + '%';

            
            	setTimeout(animate, 10)
        	} 
        	else {
            	elt.style.opacity = '1';    
        		}
    		}
		}

/*                      
  ___ __ _ _ ____   ____ _ ___ 
 / __/ _` | '_ \ \ / / _` / __|
| (_| (_| | | | \ V / (_| \__ \
 \___\__,_|_| |_|\_/ \__,_|___/
------ ф-ції що поязані з канвасом 
*/                               
  	function canvasSupport () {
     return !!document.createElement('canvas').getContext;
	}

	// робимо canvas адаптивним
  // in opera bug  через це
	// window.onresize = startUp;

	function startUp() {


      var canvas = document.getElementById("canvas");
      var wrapCanvas = canvas.parentElement;

      box = wrapCanvas.getBoundingClientRect();
      canvas.width = box.right - box.left;
      canvas.height = box.bottom - box.top;
      
      // основна ф-ція в якій все відбувається
      canvasApp();


	}

	function canvasApp() {
		if (!canvasSupport()) {
          return;
     	} else{
     
      	var canvas = document.getElementById("canvas");
      	var ctx = canvas.getContext("2d");
      	// canvas.style.cursor = 'none';

      	// для управління курсором
      	canvas.requestPointerLock = canvas.requestPointerLock ||
                            	      canvas.mozRequestPointerLock ||
                            	      canvas.webkitRequestPointerLock;
      	
      	document.exitPointerLock = document.exitPointerLock ||
                           		     document.mozExitPointerLock ||
                           		     document.webkitExitPointerLock;
  	 	}

//        // для анімації контрольних точок
// function fadeArc(x, y, r, time) {
//     if (!time) time = 400;
    
//       var ease = Math.sqrt;
//       var start = (new Date()).getTime();
//       var alpha = 0; 

      
//       animate();
    
//       function animate() {
//           var elapsed = (new Date).getTime() - start;
//           var progress = elapsed/time;


//           ctx.save();
//           ctx.beginPath();
//           ctx.arc(x, y, r, 0, 2 * Math.PI);
        
//           if (progress < 1) {
//               alpha += .01;
//               ctx.globalAlpha = alpha;
//             ctx.lineWidth = 10;
//             ctx.strokeStyle = 'rgba(18, 132, 109, 0.4)';
//             ctx.stroke();
//             ctx.closePath();
//             ctx.restore();
//               // ctx.clearRect(0,0,canvas.width, canvas.height)

//               setTimeout(animate, 15);
//           } 
//           else {
//               alpha = 1;  
//             }
//         }
//   }

  	 	var mouseSpeed = 0.3; 

  		var finalArray = [];

  		var fullTime = 0;		// ?
  		var error = 0;		// count errors	
  		var errorEl = document.getElementById('error');

  		var timer = document.getElementById('timer');
      var timerId;


  		var probaEll = document.getElementById('proba');
  		var inStroke = true;	// detect if cursor in stroke

  		// var for star srawing
  		var radius = 300;
  		var r = radius;
  		// var innerRadius = 150;
  		// var innerR = innerRadius;

  		// center of the star(x, y)		
  		var starX = canvas.width / 2;
  		var forStarX = starX;
  		var starY = canvas.height / 2 + 20;
  		var forStarX = starY;
  
  		// count of points 
  		var point = 5;

  		// параметр що відповідає за сплюснутість зірки
  		var m = 0.54;

  		// товщина границі
  		var lineBold = 17;

  		// цей обєкт будумо використовувати для визначення координат курсора
  		var coord = {x: 0, y: 0};

  		// Одновимірний масив контрольних точок. Для кожної точки в масиві 
  		// відведено відпоідно по 2 координати (х, у)
  		// використоується для малювання контрольних точок
  		var controlPoints = [];

  		// canvas color
  		var bgColor = '#ffffff';
  		var lineCap = 'round';
  		var lineJoin = 'round';
  		var starColor = '#1abc9c';

  		// для реверсу
  		var checkbox = document.getElementById('checkbox');
  		var checked = true;

      // для малю
        // console.log('arrr ' + Arrcount);
        var checkMe ;
  		checkbox.addEventListener("change", function (e) {checked = e.target.checked;}, false);

  		// заливаємо канвас кольором
  		ctx.fillStyle = bgColor;
  		ctx.fillRect(0, 0, canvas.width, canvas.height);

  		// ==================================
  		// 	Ф-ція для малюання зірки
  		// ==================================

  		// алгоритм для малювання зірки
  function star(cx,cy,spikes,outerRadius,innerRadius){
  	  controlPoints = [];
      var rot = Math.PI/2*3;
      var x = cx;
      var y = cy;
      var step = Math.PI/spikes;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx,cy - outerRadius);
      
      // controlPoints.push(cx);
      // controlPoints.push(cy - outerRadius);

      // console.log('cx' + cx);
      // console.log('cy' + (cy - outerRadius));

      for(i = 0; i < spikes; i++){
        x = Math.round(cx + Math.cos(rot) * outerRadius);
        y = Math.round(cy + Math.sin(rot) * outerRadius);

        controlPoints.push(x);
        controlPoints.push(y);

        ctx.lineTo(x,y)
        rot += step

        x = Math.round(cx + Math.cos(rot) * innerRadius);
        y = Math.round(cy + Math.sin(rot) * innerRadius);

        controlPoints.push(x);
        controlPoints.push(y);

        ctx.lineTo(x,y)
        rot += step
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.restore();
      ctx.closePath(); 
  
    }


    // приймає масив точок і малює по них контрольні точки
    function drawCircle(arrOfPoint) {
      		// ctx.translate(-starX, -starY);
          ctx.beginPath();
          ctx.arc(arrOfPoint[0],arrOfPoint[1],(lineBold/3 + 5),0,2*Math.PI);
          ctx.stroke();
      	  for (var i = 2; i <= arrOfPoint.length; i += 2) {
      	  	ctx.save();
      	  	ctx.beginPath();
          	ctx.arc(arrOfPoint[i],arrOfPoint[i+1],lineBold/3,0,2*Math.PI);
          	ctx.stroke();
          	ctx.closePath();
      	}
      star(starX, starY, point, r, r * m);
    }

    // курсор
    var cursor = document.getElementById('cursor');

    // ф-ція що задає стилі зірки і викликає алгоритм
    drawStar();
	function drawStar() {
		    ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.strokeStyle = '#1abc9c';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = lineBold;
        star(starX, starY, point, r, r * m);
        drawCircle(controlPoints);
        ctx.stroke(); 

      // координати позиції старту
      coord.x =  canvas.offsetLeft + controlPoints[0] - 10 ;
      coord.y =  canvas.offsetTop + controlPoints[1]- 10 ;

      cursor.style.left = String(coord.x) + 'px';
      cursor.style.top = String(coord.y) + 'px';

      checkMe =  new Array(controlPoints.length/2 - 1);  
    	}
      // console.log(controlPoints);
/*
   _____            _             _ 
  / ____|          | |           | |
 | |     ___  _ __ | |_ _ __ ___ | |
 | |    / _ \| '_ \| __| '__/ _ \| |
 | |___| (_) | | | | |_| | | (_) | |
  \_____\___/|_| |_|\__|_|  \___/|_|
  	------- ф-ції для елементів управління на сторінці                                  
*/

// розмір
  var formElement = document.getElementById('resize');
  formElement.addEventListener('input', inResize, false);

  function  inResize(e) {
    var target = e.target;
    r = target.value * radius;
    // console.log(radius);
    drawStar();
  }

  // позиція по х
  var formElement = document.getElementById('x');
  formElement.addEventListener('input', changeX, false);

  function  changeX(e) {
    var target = e.target;
    starX = forStarX * parseFloat(target.value);
    drawStar();
  }

  // позиція по у
  var formElement = document.getElementById('y');
  formElement.addEventListener('input', changeY, false);

  function  changeY(e) {
    var target = e.target;
    starY = forStarX * target.value;
    drawStar();
  }

  // кількість точок
  var formElement = document.getElementById('points');
  formElement.addEventListener('input', setPoint, false);

  function  setPoint(e) {
    var target = e.target;
    point = target.value;
    drawStar();
  }

  // сплюснутість 
  var formElement = document.getElementById('width');
  formElement.addEventListener('input', setWidth, false);

  function  setWidth(e) {
    var target = e.target;
    m = target.value;
    drawStar();
  }

  // товщина границі
  var formElement = document.getElementById('bold');
  formElement.addEventListener('input', setBold, false);

  function  setBold(e) {
    var target = e.target;
    lineBold = target.value;
    drawStar();
  	}

 	// швидкість курсора під-час проходження тесту
  var formElement = document.getElementById('speed');
  formElement.addEventListener('input', setSpeed, false);

  function  setSpeed(e) {
    var target = e.target;
    mouseSpeed = target.value;
    drawStar();
  	}

  	// canvas.addEventListener('mousemove', move, false);
   //  function move (e) {
   //   var mouseX = e.clientX - canvas.offsetLeft;
   //   var  mouseY = e.clientY - canvas.offsetTop;
   //   console.log(mouseX);
   //   console.log(mouseY);
   //  	console.log(ctx.isPointInStroke(mouseX, mouseY));
   //  } 

/*   
  __  __       _       
 |  \/  |     (_)      
 | \  / | __ _ _ _ __  
 | |\/| |/ _` | | '_ \ 
 | |  | | (_| | | | | |
 |_|  |_|\__,_|_|_| |_|

*/                      
                       
   // кнопка застосувати
	var applyBtn = document.getElementById('apply');	
	applyBtn.addEventListener('click', applyClicked, false);

  // console.log(controlPoints);
  var allPoint = false;
  
  // ctx.arc(100,100,20, 0, 2*Math.PI);
  // ctx.stroke();

  // ==========================================================
  //  для виводу помилки, якщо не пройдені всі контрольні точки
  // ==========================================================
  var errorPoint = false;
  var errorInterval = 0;
  var windowError = document.querySelectorAll('.points')[0]; 
      windowError.onclick = function() {
    	fadeOut(windowError);
    }                                           
  var windowClose = document.getElementById('Pclose');

  var dataBtn = document.getElementById('data');
  dataBtn.onclick = function(){
  	   	sendToServer('../pages/ajax.php');
       	sendToServer('../pages/send_mail.php');
  }

function applyClicked() {
	// drawStar();
	 
  proba++;
  // ==========================================================
  //  для виводу помилки, якщо не пройдені всі контрольні точки
  // ==========================================================
  // if (proba === 1) {
  // 	fadeIn(dataBtn);
  // }
  // наступні спроби треба виконуати лівою рукою
  if (proba === 2) {
    var windowError = document.querySelectorAll('.points')[0]; 
    windowError.firstElementChild.src = 'img/hand.svg';
    var errText = document.getElementsByTagName('p')[1];
    errText.innerHTML = 'Наступні 10 спроб виконуйте правою рукою';
    // console.log(bug.firstElementChild); 

    // var close = document.getElementById('Pclose');
    fade(windowError);

    setTimeout(function(){
    	fadeOut(windowError);
    }
    , 2000);
  }
// if (proba == 1) {
//       errorInterval = setInterval(function(){
//       if(errorPoint){
//         fadeOut(windowError);
//       }
//     }, 1000);

//     setTimeout(function(){
//     fade(windowError);
//   }, 5000);

//   }

if (proba === 12) {
    var windowError = document.querySelectorAll('.points')[0];
    windowError.firstElementChild.src = 'img/hand.svg';
    var errText = document.getElementsByTagName('p')[1];
    errText.innerHTML ='Останній раз! Вітаю! Знову лівою';
    // console.log(bug.firstElementChild); 

    // var close = document.getElementById('Pclose');
    fade(windowError);
  }



  canvas.requestPointerLock();
	
	probaEll.innerHTML = proba;

	applyBtn.value = 'Ще раз'; 

	
	if (proba > 1) {
		finalArray = [];
		drawStar();
		error = 0;
		errorEl.innerHTML = error;
		timer.innerHTML = 0;

	}

    if (document.pointerLockElement === canvas ||
            document.mozPointerLockElement === canvas ||
            document.webkitPointerLockElement === canvas) {

        // we've got a pointerlock for our element, add a mouselistener
        document.addEventListener("mousemove", moveCallback, false);
    } else {

        // pointer lock is no longer active, remove the callback
        document.removeEventListener("mousemove", moveCallback, false);
        // cursor.stsyle.display = 'none';
    }
	}


 

	function moveCallback(e) {
    errorPoint = false;
    //get a reference to the canvas
    var movementX = e.movementX ||
            e.mozMovementX ||
            e.webkitMovementX ||
            0;

    var movementY = e.movementY ||
            e.mozMovementY ||
            e.webkitMovementY ||
            0;

    cursor.style.top = String(coord.y) + 'px';
    cursor.style.left = String(coord.x) + 'px';

        
    var exectX = coord.x - canvas.offsetLeft + 10;
    var exectY = coord.y - canvas.offsetTop + 10;

    finalArray.push(exectX);
    finalArray.push(exectY);

    // console.log('pushed x =' + exectX);
    // console.log('pushed y =' + exectY);

    // обмежимо контрольними точками
    if (checked) {
    	coord.x += -movementX * mouseSpeed;
    	coord.y += -movementY * mouseSpeed;
    } else {
    	 coord.x += movementX * mouseSpeed;
   		 coord.y += movementY * mouseSpeed;	
    }


    if (coord.x > (canvas.width + canvas.offsetLeft ))
      coord.x = canvas.width + canvas.offsetLeft - 20;
    if (coord.x < (canvas.offsetLeft))
      coord.x = canvas.offsetLeft + 20;
    if (coord.y > (canvas.height + canvas.offsetTop - 20))
      coord.y = canvas.height + canvas.offsetTop - 20;
    if (coord.y < (canvas.offsetTop))
      coord.y = canvas.offsetTop + 20;


  	// if (((coord.x - canvas.offsetLeft) > pointsArr[0]) &&
  	// 	(coord.y - canvas.offsetTop) < pointsArr[5]) {
  	// 	coord.x = (pointsArr[0] + canvas.offsetLeft);
  	// }
  	// console.log('controlPoints-->' + controlPoints );

    function ChekMe(bool1, bool2) {
      this.exist = bool1;
      this.drawn = bool2;
    }
    // Будемо перевіряти чи пройшов юзер всі контрольні точки
    // Якщо пройшов - то записуємо в масив  checkMe[номер точки - 1] = true
    for (var j = 2, i = 0; i < checkMe.length; i++) {
        if ( (exectX > controlPoints[j] - lineBold/2) &&
             (exectX < controlPoints[j] + lineBold/2) &&
             (exectY > controlPoints[j + 1] - lineBold/2) &&
             (exectY < controlPoints[j + 1] + lineBold/2) 
             // !checkMe[i]
            ) {
                if (checkMe[i] == undefined) 
                  checkMe[i] = new ChekMe(true, false);
                // alert(i);
              }
        j += 2;
    }

    // малюємо навколо кружочки
    for (var i = 0; i < checkMe.length; i++) {
      if (checkMe[i] !== undefined) {
      if (checkMe[i].exist && !checkMe[i].drawn)  {


        checkMe[i].drawn = true;
        // ctx.fillStyle = 'rgba(0,0,0,.24)';

        if (i == 0) {
          // fadeArc(cntrolPoints[2], controlPoints[3], 45);
          // setTimeout(fadeArc(cntrolPoints[2], controlPoints[3], 15), 0);  
          ctx.save();
          ctx.beginPath();
          ctx.lineWidth = 10;
          // ctx.strokeStyle = 'rgba(18, 132, 109, 0.4)';
          
          ctx.arc(controlPoints[2], controlPoints[3], lineBold, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
          star(starX, starY, point, r, r * m);
          }
        else {
          ctx.save();
          ctx.beginPath();
          // ctx.strokeStyle = 'rgba(18, 132, 109, 0.4)';
          ctx.lineWidth = 10;
          ctx.arc(controlPoints[2 + 2 * i], controlPoints[3 + 2 * i ], lineBold, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
          star(starX, starY, point, r, r * m);
          }
        }
          
      }
      // else {}
    }

    
    allPoint = true;
    // console.log(checkMe);
    // якщо дойшов до фінішу
    if ( (exectX > controlPoints[0] - lineBold/2) &&
         (exectX < controlPoints[0] + lineBold/2) &&
         (exectY < controlPoints[1] + lineBold/2) &&
         (exectY > controlPoints[1] - lineBold/2)
         )
      // ((coord.y - canvas.offsetTop) < pointsArr[1] -15) &&
      // (coord.y - canvas.offsetTop) > pointsArr[1]
      {
      // console.log(coord.x - canvas.offsetLeft);

      for( var i = 0; i < checkMe.length; i++) {
        if (checkMe[i] == null){
          allPoint = false;
          errorPoint = true;
          break;
        }
          
        } 
      // }
      
      if (allPoint) {
      // ховаємо вікно з помилкою
      errorPoint = true;
      fadeOut(windowError);
      document.exitPointerLock();

      if (userData.length <= 12) {
      	var usr = new usrData(String(elapsed), String(error));
      	userData.push(usr);
      	// console.log(userData);
      }
      }
    }
     
  	// if (((coord.y - canvas.offsetTop) > pointsArr[5] - 10)){
   //  	coord.y = canvas.offsetTop + pointsArr[5] - 10;
  	// }



    // console.log('apply ' + exectX + ' ' + exectY);
    var isStroke = ctx.isPointInStroke(exectX, exectY);
    // console.log(isStroke);
    if (!isStroke) {
      error++;
      errorEl.innerHTML = error;
    }

  }

  // register the callback when a pointerlock event occurs
    document.addEventListener('pointerlockchange', changeCallback, false);
    document.addEventListener('mozpointerlockchange', changeCallback, false);
    document.addEventListener('webkitpointerlockchange', changeCallback, false); 
    
    function changeCallback(e) {

      if (document.pointerLockElement === canvas ||
            document.mozPointerLockElement === canvas ||
            document.webkitPointerLockElement === canvas) {
            cursor.style.display = 'block';
           
            // cursor.style.top = String(coord.y) + 'px';
            // cursor.style.left = String(coord.x) + 'px';

        // we've got a pointerlock for our element, add a mouselistener
        document.addEventListener("mousemove", moveCallback, false);

        // start timer

		timerId = getTime();
		// console.log('timer id' + timerId);

    } else {
    	// console.log('changeCallback');
        // pointer lock is no longer active, remove the callback
        userData[proba - 1] = new usrData(timer.innerHTML, error);

        document.removeEventListener("mousemove", moveCallback, false);
        cursor.style.display = 'none';

        finnalDraw(finalArray);

        // stop timer
        // console.log('timer id' + timerId);
      	clearInterval(timerId);
        clearInterval(errorInterval);
        if (proba === 12){
  			fadeIn(dataBtn);
  			fadeOut(applyBtn);
        }
        // clearInterval(id);
    }
    }

        function getTime(){
		var start = new Date().getTime();
    	elapsed = '0.0';

		var id = window.setInterval(function()
		{
    		var time = new Date().getTime() - start;

    		elapsed = Math.floor(time / 100) / 10;
  		    if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }

    		timer.innerHTML = elapsed;

		}, 100);
		return id;
			// if (el.innerHTML) window.clearInterval(id);
		}

		    function finnalDraw(arr) {
          // ctx.clearRect(0,0,canvas.width, canvas.height);
          // star(starX, starY, point, r, r * m);
          // ctx.stroke(); 
    	ctx.beginPath();
    	ctx.strokeStyle = 'rgba(18, 132, 109, 0.7)';
    	ctx.lineWidth = 10;
    	ctx.moveTo(arr[0], arr[1]);
    	for (var i = 2; i < arr.length - 2 ; i += 2) {
    		ctx.lineTo(arr[i], arr[i + 1]);
    		
    	}
    	ctx.stroke();
    	ctx.closePath();
    }

// ===================================================================================
// ================================ = =  = = = =======================================
// ================================ =  Ajax  = =======================================
// ================================ =  = = = = =======================================

function getXmlHttp(){
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}

function sendToServer(url) {
		var req = getXmlHttp();
		req.open('POST', url, true);
		req.onreadystatechange = function() {
			// активізується при отримані відповіді від сервера
			if (req.readyState == 4) {
				// якщо запит закінчив виконуватися
				// error.innerHTML = req.statusText;
				if (req.status == 200) {
					// status 200 (ok)
					// console.log(req.responseText);
					// resultOfRequest = JSON.parse(req.responseText);
					// console.log(resultOfRequest);

					// var type = req.getResponseHeader('Content-Type');
					// console.log(type);
					// resultOfRequest = JSON.parse(req.responseText);
					resultOfRequest = (req.responseText);

					console.log(resultOfRequest);

				}
			}
		}
		req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		//req.setRequestHeader('Content-length', param.length);
		//req.setRequestHeader('Connection', 'close');
		// req.setRequestHeader('AJAX',1)
		req.send('usrData='+ JSON.stringify(userData));	
}
  } // canvasApp
}());