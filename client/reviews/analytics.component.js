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
    vm.watsonSummary;


    vm.$onInit = function() {
      vm.reviewsService = reviewsService;

      reviewsService.getWatsonData(projectId)
        .then((data) => {
          vm.watsonData = data;

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
      const donutWidth = 75;
      const legendRectSize = 18;
      const legendSpacing = 4;

      const svg = d3.select('#chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

      const arc = d3.arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius);

      const pie = d3.pie()
      .value(function(d) { return d.score; })
      .sort(null);

      const path = svg.selectAll('path')
      .data(pie(vm.watsonSummary))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d) {
        return color(d.data.tone);
      });

      path.on('mouseover', function(d) {
        let total = d3.sum(vm.watsonSummary.map(function(d) {
          return d.score;
        }));
        const percent = Math.round(1000 * d.data.score / total) / 10;
        tooltip.select('.label').html(d.data.tone);
        // tooltip.select('.count').html(d.data.score);
        tooltip.select('.percent').html(percent + '%');
        tooltip.style('display', 'block');
      });

      path.on('mouseout', function() {
        tooltip.style('display', 'none');
      });

      const legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
          var height = legendRectSize + legendSpacing;
          var offset =  height * color.domain().length / 2;
          var horz = -2 * legendRectSize;
          var vert = i * height - offset;
          return 'translate(' + horz + ',' + vert + ')';
        });

      legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color);

      legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) {
          return d;
        });

      const tooltip = d3.select('#chart')
       .append('div')
       .attr('class', 'tooltip');

     tooltip.append('div')
       .attr('class', 'label');
     tooltip.append('div')
       .attr('class', 'count');
     tooltip.append('div')
       .attr('class', 'percent');

    }
  }


})();
