// 碰撞检测
function isCrash(obj1, obj2) {
  if (obj1 && obj2) {
    var leftSide = obj2.offsetLeft - obj1.offsetWidth / 2;
    var rightSide = obj2.offsetLeft + obj2.offsetWidth + obj1.offsetWidth / 2;
    var upSide = obj2.offsetTop - obj1.offsetHeight / 2;
    var downSide = obj2.offsetTop + obj2.offsetHeight + obj1.offsetHeight / 2;
    var x = obj1.offsetLeft + obj1.offsetWidth / 2;
    var y = obj1.offsetTop + obj1.offsetHeight / 2;
    if (x > leftSide && x < rightSide && y > upSide && y < downSide) {
      return true;
    }
  }
  return false;
}

//初始化函数
function init() {
  var verify = document.getElementsByClassName('verify')[0],
    grade = document.getElementsByClassName("grade")[0],
    loading = document.getElementsByClassName("loading")[0],
    loadingImg = document.getElementsByClassName("loading-img")[0],
    btn = document.getElementsByClassName('btn'),
    loadingImgArr = ["images/loading1.png", "images/loading2.png", "images/loading3.png"];
  verify.style.display = 'block';
  for (var i = 0; i < btn.length; i++) { //根据选择的难道传递对应的数据
    (function (index) {
      btn[index].onclick = function () {
        verify.style.display = 'none';
        loading.style.display = 'block';
        var num = 0;
        var time = setInterval(function () {
          if (num == 5) {
            loading.style.display = 'none';
            grade.style.display = 'block';
            clearInterval(time);
            Engine.init(index);
          }
          loadingImg.style.backgroundImage = "url(" + loadingImgArr[++num % 3] + ")"; //执行背景动画
        }, 400)
      }
    })(i)
  }
}

init();

//背景开始移动
function bgMove() {
  var y = 0;
  var bg = document.getElementsByClassName('bg')[0];
  setInterval(function () {
    y += 1;
    bg.style.backgroundPositionY = y + "px";
  }, 30)
}

bgMove();

//显示成绩区域
function gradeShow() {
  var grade = document.getElementsByClassName("grade")[0];
  grade.innerText = Engine.grade + "分";
}

//游戏失败
function gameOver() {
  var over = document.getElementsByClassName('gameOver')[0],
    anew = document.getElementsByClassName('anew')[0],
    grade = document.getElementsByClassName("grade")[0],
    tit = document.getElementsByClassName("tit")[0];
  tit.innerText = "游戏失败 您的得分是" + Engine.grade + "分"; //显示成绩
  over.style.display = 'block';
  grade.style.display = 'none';
  anew.onclick = function () {
    over.style.display = 'none';
    init(); //点击重新开始  执行初始化函数
  }
}

//游戏引擎
var Engine = {
  bulletlist: {}, //子弹列表
  enemylist: {}, //敌人列表
  myPlane: null, //我方飞机
  create: null, //验证我方飞机是否被摧毁
  rank: null, //子弹生产速度
  grade: 0, //成绩
  rankArr: [400, 600, 800], //速度难度列表
  difficulty: null, //难度等级
  init: function (index) {
    Engine.rank = Engine.rankArr[index]; //根据难度赋值
    Engine.difficulty = index + 1;
    Engine.grade = 0; //初始化成绩
    Engine.create = true; //初始化飞机
    gradeShow(Engine.grade); //显示成绩
    Engine.gameStart(); //游戏开始
  },
  gameStart: function () {
    for (var i in Engine.enemylist) { //清除页面还存在的敌人对象
      Engine.enemylist[i].destroy();
      delete Engine.enemylist[i];
    }
    new myPlane().init(); //创建己方飞机
    createEnemy.init(); //创建敌方飞机
    Engine.crashListening(); //碰撞检测
  },
  gameOver: function () {
    createEnemy.createTime(); //结束创建子弹
    for (var i in Engine.bulletlist) {
      Engine.bulletlist[i].destroy();
      delete Engine.bulletlist[i];
    }
    gameOver();
  },
  crashListening: function () {
    setInterval(function () {
      for (var i in Engine.bulletlist) {
        for (var k in Engine.enemylist) {
          if (Engine.bulletlist[i] == undefined) continue;
          if (isCrash(Engine.bulletlist[i].ele, Engine.enemylist[k].ele)) { //当子弹与飞与地方飞机相撞
            Engine.bulletlist[i].explode(); //从页面删除子弹
            delete Engine.bulletlist[i]; //删除子弹对象
            Engine.enemylist[k].hurt(); //验证对饮飞机的血量计分等
          }
          if (Engine.create && Engine.myPlane.ele && (isCrash(Engine.myPlane.ele, Engine.enemylist[k].ele))) { //当敌方飞机与己方飞机碰撞
            Engine.myPlane.explode(); //己方飞机销毁
            Engine.create = false;
          }
        }
      }
    }, 30);
  }
}

//创建己方灰机
function myPlane() {
  this.ele = document.createElement('div');
  this.dieimgs = ["images/me_die1.png", "images/me_die2.png", "images/me_die3.png", "images/me_die4.png"];
  this._body = document.body;
  this.init = function () {
    Engine.myPlane = this; //初始化将己方飞机绑定引擎对象
    this.ele.className = "my-warplane";
    this._body.appendChild(this.ele);
    var _left = this._body.offsetWidth / 2 - (this.ele.offsetWidth / 2);
    this.ele.style.left = _left + "px";
    var _top = this._body.offsetHeight - this.ele.offsetHeight - 20;
    this.ele.style.top = _top + "px";
    var self = this;
    this.ele.addEventListener("touchstart", function (event) {
      var initDot = { //初始化位置
        x: event.targetTouches[0].pageX - self.ele.offsetLeft,
        y: event.targetTouches[0].pageY - self.ele.offsetTop
      }
      document.addEventListener("touchmove", addTouchmove, false);

      function addTouchmove(event) {
        var o = self.pagePo(event, initDot);
        self.ele.style.left = o.x + "px";
        self.ele.style.top = o.y + "px";
      }

      document.addEventListener("touchend", function () {
        document.removeEventListener("touchmove", addTouchmove)
      });
    }, false);
    this.createBullet(); //开始创建子弹
  }
  this.pagePo = function (event, initDot) {
    var x = event.targetTouches[0].pageX - initDot.x;
    var y = event.targetTouches[0].pageY - initDot.y;
    if (x < 0) {
      x = 0;
    } else if (x >= this._body.offsetWidth - this.ele.offsetWidth) {
      x = this._body.offsetWidth - this.ele.offsetWidth;
    }
    if (y < 0) {
      y = 0;
    } else if (y >= this._body.offsetHeight - this.ele.offsetHeight) {
      y = this._body.offsetHeight - this.ele.offsetHeight;
    }
    return {
      x: x,
      y: y
    };
  }
  this.createBullet = function () {
      var self = this;
      this.createBulletTime = setInterval(function () {
        new createBullet({
          x: self.ele.offsetLeft + parseInt(self.ele.offsetWidth / 2) - 1,
          y: self.ele.offsetTop - 20
        }).init();
      }, Engine.rank) //根据难度来决定创建子弹的间隔时间
    },
    this.explode = function () { //己方飞机销毁
      var index = 0;
      var self = this;
      var timer = setInterval(function () {
        if (index == self.dieimgs.length) {
          clearInterval(timer);
          self.destroy();
        }
        self.ele.style.background = "url(" + self.dieimgs[index++] + ")"; //爆炸动画
      }, 200);
    }
  this.destroy = function () {
    document.body.removeChild(this.ele);
    clearInterval(this.createBulletTime);
    Engine.gameOver(); //游戏失败
  }
}

//创建子弹
function createBullet(o) {
  this.id = Math.round(Math.random() * 100000); //随机生成id
  this.dieimgs = ["images/die1.png", "images/die2.png"];
  this.ele = document.createElement('div');
  this.init = function () {
      this.ele.className = "bullet";
      Engine.bulletlist[this.id] = this; //将子弹添加到引擎的子弹队列
      this.setPosition();
      return this;
    },
    this.setPosition = function () { //初始化子弹位置
      this.ele.style.left = o.x + "px";
      this.ele.style.top = o.y + "px";
      document.body.appendChild(this.ele);
      this.move();
      return this;
    },
    this.move = function () { //子弹进行移动
      var self = this;
      this.movetimer = setInterval(function () {
        self.ele.style.top = (self.ele.offsetTop - 20) + "px";
        if (self.ele.offsetTop < -20) {
          clearTimeout(self.movetimer);
          self.destroy();
        }
      }, 100)
      return this;
    },
    this.explode = function () {
      this.ele.className = "bullet_die";
      clearInterval(this.movetimer);
      var self = this;
      var index = 0;
      var timer = setInterval(function () {
        if (index == 2) {
          clearInterval(timer);
          self.destroy();
        }
        self.ele.style.background = "url(" + self.dieimgs[index++] + ")";
      }, 80);
    },
    this.destroy = function () {
      document.body.removeChild(this.ele); //移除子弹
      delete Engine.bulletlist[this.id];
    }
}

//随机创建敌方飞机
var createEnemy = {
  init: function () {
    this.time1 = setInterval(function () {
      var flag = Math.random() >= 0.5 ? true : false;
      if (flag) {
        new Enemy(1).init().move();
      }
    }, 600);
    this.time2 = setInterval(function () {
      var flag = Math.random() >= 0.6 ? true : false;
      if (flag) {
        new Enemy(2).init().move();
      }
    }, 1500);
    this.time3 = setInterval(function () {
      var flag = Math.random() >= 0.7 ? true : false;
      if (flag) {
        new Enemy(3).init().move();
      }
    }, 3000);
  },
  createTime: function () {
    clearInterval(this.time1)
    clearInterval(this.time2)
    clearInterval(this.time3)
  }
}

function Enemy(num) {
  this.num = num;
  this.id = Math.round(Math.random() * 100000);
  this.ele = document.createElement("div");
  this.dieimgs = null;
  this.init = function () {
      document.body.appendChild(this.ele);
      Engine.enemylist[this.id] = this; //绑定id
      switch (this.num) { //创建飞机
        case 1:
          this.ele.className = "enemy-small";
          this.speed = 5; //速度
          this.blood = 1; //血
          this.grade = 1; //等级倍数
          this.dieimgs = ["images/plane1_die1.png", "images/plane1_die2.png", "images/plane1_die3.png"];
          break;
        case 2:
          this.ele.className = "enemy-middle";
          this.speed = 3;
          this.blood = 3;
          this.grade = 3;
          this.dieimgs = ["images/plane2_die1.png", "images/plane2_die2.png", "images/plane2_die3.png", "images/plane2_die4.png"];
          break;
        case 3:
          this.ele.className = "enemy-large";
          this.speed = 1;
          this.blood = 5;
          this.grade = 5;
          this.dieimgs = ["images/plane3_die1.png", "images/plane3_die2.png", "images/plane3_die3.png", "images/plane3_die4.png", "images/plane3_die5.png", "images/plane3_die6.png"];
          break;
      }
      var _left = parseInt(Math.random() * (document.body.offsetWidth - this.ele.offsetWidth));
      this.ele.style.left = _left + "px"; //初始化位置
      this.ele.style.top = -this.ele.offsetHeight + "px";
      return this;
    },
    this.move = function () { //飞机位移
      var self = this;
      this.moveTime = setInterval(function () {
        self.ele.style.top = self.ele.offsetTop + self.speed + "px";
        if (self.ele.offsetTop > document.documentElement.offsetHeight - 20) {
          self.destroy(); //飞机移动到边缘时销毁
          clearInterval(self.moveTime);
        }
      }, 30);
    },
    this.hurt = function () {
      --this.blood == 0 ? this.explode() : ""; //飞机被击中 血量减少 为0时执行销毁飞机方法
    },
    this.explode = function () {
      clearInterval(this.moveTime); //停止自身位移
      var index = 0;
      var self = this;
      var timer = setInterval(function () {
        if (index == self.dieimgs.length) {
          clearInterval(timer);
          self.destroys();
        }
        self.ele.style.background = "url(" + self.dieimgs[index++] + ")";
      }, 80);
    }
  this.destroy = function () {
      document.body.removeChild(this.ele);
      delete Engine.enemylist[this.id];
    },
    this.destroys = function () { //绑定成绩
      Engine.grade += this.grade * Engine.difficulty;
      gradeShow();
      document.body.removeChild(this.ele);
      delete Engine.enemylist[this.id];
    }
}
