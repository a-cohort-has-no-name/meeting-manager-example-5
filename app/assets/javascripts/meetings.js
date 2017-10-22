/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      meetings: [],
      tags: [],
      nameFilter: '',
      orderAttribute: 'startTime',
      orderAscending: true,
      tagFilterId: null
    },
    mounted: function() {
      $.get('/api/v1/meetings.json', function(result) {
        this.meetings = result;
      }.bind(this));
      $.get('/api/v1/tags.json', function(result) {
        this.tags = result;
      }.bind(this));
    },
    methods: {
      changeOrderAttribute: function(attribute) {
        if (attribute !== this.orderAttribute) {
          this.orderAscending = true;
        } else {
          this.orderAscending = !this.orderAscending;
        }
        this.orderAttribute = attribute;
      },
      filterByTag: function(tag) {
        this.tagFilterId = tag.id;
      },
      resetTagFilter: function() {
        this.tagFilterId = null;
      }
    },
    computed: {
      filteredMeetings: function() {
        var filtered = this.meetings.filter(function(meeting) {
          //if nameFilter is in meeting.name
          var validName = meeting.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) !== -1;

          if (this.tagFilterId) {
            var validTag = false;
            for (var i = 0; i < meeting.tags.length; i++) {
              if(meeting.tags[i].id === this.tagFilterId) {
                validTag = true;
              }
            } 
          } else {
            var validTag = true;
          }
          return validName && validTag;

        }.bind(this));
        return filtered.sort(function(meeting1, meeting2) {
          if (this.orderAscending) {
            return meeting1[this.orderAttribute] > meeting2[this.orderAttribute];
          } else {
            return meeting1[this.orderAttribute] < meeting2[this.orderAttribute];
          }
        }.bind(this));
      }
    }
  });
});

















