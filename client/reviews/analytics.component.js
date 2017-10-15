(function() {
'use strict';

angular.module('app')
  .component('analytics', {
    controller,
    templateUrl: '/reviews/analytics.template.html'
  })

  controller.$inject = ['$stateParams','reviewsService']

  function controller($stateParams, reviewsService) {
    const vm = this
    const projectId = $stateParams.id;
    vm.watsonData = [];
    vm.noReviews = true;
    vm.watsonSummary;


    vm.$onInit = function() {
      reviewsService.getWatsonData(projectId)
        .then((data) => {
          vm.watsonData = data;
          vm.noReviews = vm.watsonData.length === 0;
          vm.watsonSummary();
        })
    }

    vm.watsonSummary = function() {
      const watsonMap = {total: 0};
      const watsonStats = [];

      for (let i = 0; i < vm.watsonData.length; i++){
        for (let j = 0; j < vm.watsonData[i].tones.length; j++) {
          if (vm.watsonData[i].tones[j].tone_id in watsonMap) {
            watsonMap[vm.watsonData[i].tones[j].tone_id] += vm.watsonData[i].tones[j].score
          } else {
            watsonMap[vm.watsonData[i].tones[j].tone_id] = vm.watsonData[i].tones[j].score
          }
          watsonMap.total += vm.watsonData[i].tones[j].score
        }
      }

      for (const key in watsonMap) {
        if (key !== 'total') {
          const newTone = {
            tone: key,
            score: watsonMap[key] / watsonMap.total
          };
          watsonStats.push(newTone)
        }
      }
      vm.watsonSummary = watsonStats;
      vm.d3();
    }

    vm.d3 = function() {
      const width = 360;
      const height = 360;
      const radius = Math.min(width, height) / 2;
      const color = d3.scaleOrdinal(d3.schemeCategory20c);

      const svg = d3.select('#chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

      const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

      const pie = d3.pie()
      .value(function(d) { return d.score; })
      .sort(null);

      const path = svg.selectAll('path')
      .data(pie(vm.watsonSummary))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d, i) {
        return color(d.data.label);
      });

    }
  }


})();
