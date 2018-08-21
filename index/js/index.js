var socket = io();

var vm = new Vue({
  el: '#app',
  data: {
    indexState: true,
    indexShowState: true,
    homeShowState: false,
    chatValue: '',
    chatMessageList: [],
    userNumber: 0,
    userName: '',
    inputShowState: false,
    storage: {}
  },

  methods: {
    handleClickAvatar: function() {
      this.indexState = false;

      var self = this;
      setTimeout(function() {
        self.indexShowState = false;
        self.homeShowState = true;
      }, 500)
    },

    submitChatInfo: function() {
      var chatValue = this.chatValue;
      var userName = this.userName;

      if (chatValue.length) {
        socket.emit('chat message', {
          message: chatValue,
          userName: userName
        });
        this.chatValue = '';
      }
    },

    saveChatInfo: function() {
      var userName = this.userName;
      if (userName) {
        this.inputShowState = true;
        this.storage.setItem('userName', this.userName);
      }
    },

    handleClickUserName: function () {
      this.inputShowState = false;
    }
  },

  mounted() {
    var self = this;
    this.storage = window.localStorage;
    var userName = this.storage.getItem('userName');
    if (userName) {
      this.userName = userName;
      this.inputShowState = true;
    }

    socket.on('chat message', function(info){
      self.chatMessageList.push(info);
      self.$nextTick(function () {
        self.$refs.chatContainer.scrollTop = self.$refs.chatContext.offsetHeight;
      })
    });

    socket.on('updateUserNumber', function(info){
      self.userNumber = info.userNumber
    });
  }
});
