var socket = io();

var vm = new Vue({
  el: '#app',
  data: {
    indexState: true,
    indexShowState: true,
    homeShowState: false,
    chatValue: '',
    chatMessageList: [],
    userCount: 0,
    userName: '',
    inputShowState: false,
    storage: {},
    userId: '',
    imgBoxShowState: false
  },

  methods: {
    handleClickAvatar: function () {
      this.indexState = false;

      var self = this;
      setTimeout(function () {
        self.indexShowState = false;
        self.homeShowState = true;
      }, 500)
    },

    submitChatInfo: function () {
      var chatValue = this.chatValue;

      if (chatValue.length) {
        socket.emit('chat message', {
          message: chatValue,
          userName: this.userName,
          userId: this.userId
        });
        this.chatValue = '';
      }
    },

    saveUserInfo: function () {
      var userName = this.userName;
      if (userName) {
        this.inputShowState = true;
        this.storage.setItem('userName', this.userName);
        var userId = this.storage.getItem('userId');
        if (!userId) {
          var _userId = String(Math.floor(Math.random() * 8999990 + 1000000));
          this.userId = userId;
          this.storage.setItem('userId', _userId);
        }
      }
    },

    handleClickUserName: function () {
      this.inputShowState = false;
    },

    handleClickMessageBtn: function (e) {
      e.stopPropagation();
      this.imgBoxShowState = true;
    },

    handleClickMainBox: function () {
      this.imgBoxShowState = false;
    }
  },

  mounted() {
    var self = this;
    this.storage = window.localStorage;
    var userName = this.storage.getItem('userName');
    var userId = this.storage.getItem('userId');
    if (userName && userId) {
      this.userName = userName;
      this.userId = userId;
      this.inputShowState = true;
    }

    socket.on('chat message', function (info) {
      if (info.userId === self.userId) {
        info.active = true;
      }
      self.chatMessageList.push(info);
      self.$nextTick(function () {
        self.$refs.chatContainer.scrollTop = self.$refs.chatContext.offsetHeight;
      })
    });

    socket.on('updateUserCount', function (info) {
      self.userCount = info.userCount
    });
  }
});
