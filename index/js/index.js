var socket = io();

var vm = new Vue({
  el: '#app',
  data: {
    indexState: true,
    indexShowState: true,
    homeShowState: false,
    chatValue: '',
    chatMessageList: []
  },

  methods: {
    handleClickAvatar() {
      this.indexState = false;

      var self = this;
      setTimeout(function() {
        self.indexShowState = false;
        self.homeShowState = true;
      }, 500)
    },

    submitChatInfo() {
      var chatValue = this.chatValue;
      if (chatValue.length) {
        socket.emit('chat message', {
          message: chatValue,
          userName: 'Jace'
        });
        this.chatValue = '';
      }
    }
  },

  mounted() {
    var self = this;

    socket.on('chat message', function(info){
      self.chatMessageList.push(info)
    });
  }
});
