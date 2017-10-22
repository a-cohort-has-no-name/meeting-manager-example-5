/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      meetings: []
    },
    mounted: function() {
      $.get('/api/v1/meetings.json', function(result) {
        this.meetings = result;
      }.bind(this));
    },
    methods: {

    },
    computed: {

    }
  });
});