/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      meetings: [],
      nameFilter: ''
    },
    mounted: function() {
      $.get('/api/v1/meetings.json', function(result) {
        this.meetings = result;
      }.bind(this));
    },
    methods: {

    },
    computed: {
      filteredMeetings: function() {
        return this.meetings.filter(function(meeting) {
          //if nameFilter is in meeting.name
          return meeting.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) !== -1;
        }.bind(this));
      }
    }
  });
});