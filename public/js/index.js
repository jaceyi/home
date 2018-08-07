var vm = new Vue({
  el: '#app',
  data: {
    indexState: true,
    indexShowState: true,
    homeShowState: false
  },

  methods: {
    handleClickAvatar() {
      this.indexState = false;

      var self = this;
      setTimeout(function() {
        self.indexShowState = false;
        self.homeShowState = true;
      }, 500)
    }
  }
});
