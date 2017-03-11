import Ember from 'ember';
import d3 from 'd3';
import moment from 'moment';

export default Ember.Component.extend({
    game: null,
    statsRetreiver: Ember.inject.service(),

    height: Ember.computed.oneWay('settings.height'),
    width: Ember.computed.oneWay('settings.width'),
    topMargin: Ember.computed.oneWay('settings.topMargin'),
    rightMargin: Ember.computed.oneWay('settings.rightMargin'),
    bottomMargin: Ember.computed.oneWay('settings.bottomMargin'),
    leftMargin: Ember.computed.oneWay('settings.leftMargin'),

    data: Ember.computed('chart.dataInputs', 'game', function() {
        const dataInputs = this.get('chart.dataInputs');
        const game = this.get('game');

        if (dataInputs === undefined || game === undefined) {
            return null;
        } else {
            return this.get('statsRetreiver').getData(game, dataInputs);
        }
    }),

    didRender() {
        this.get('data').then((unfilteredData) => {
            this.generateChart(unfilteredData);
        });
    },

    generateChart(unfilteredData) {
        const data = unfilteredData.content;
        let oldElements  = d3.select(`.line-chart.${this.elementId}`);
        oldElements.selectAll('*').remove();

        const homeData = data.filter((datum) => {
            return datum._data.teamId === parseInt(this.get('game.homeTeam.id'));
        }).sort(function(a, b) {
            return moment(a._data.date).diff(moment(b._data.date));
        });

        const awayData = data.filter((datum) => {
            return datum._data.teamId === parseInt(this.get('game.awayTeam.id'));
        }).sort(function(a, b) {
            return moment(a._data.date).diff(moment(b._data.date));
        });

        let vis = d3.select(`.line-chart.${this.elementId}`);

        let xRange = d3.scaleTime()
          .range([
            this.get('leftMargin'),
            this.get('width') - this.get('rightMargin')
          ])
          .domain([
            d3.min(data, function(d) {
              return new Date(d._data.date);
            }),
            d3.max(data, function(d) {
              return new Date(d._data.date);
            })
          ]);

        let yRange = d3.scaleLinear()
          .range([
            this.get('topMargin'),
            this.get('height') - this.get('bottomMargin')
          ])
          .domain([
            d3.max(data, function(d) {
              return d._data.value;
            }),
            d3.min(data, function(d) {
              return d._data.value;
            })
          ]);

        let xAxis = d3.axisBottom()
          .scale(xRange)
          .ticks(data.length / 2)
          .tickFormat(d3.timeFormat('%m/%d/%y'));

        let yAxis = d3.axisLeft()
          .scale(yRange);

        vis.append('svg:g')
          .attr('class', 'x axis')
          .attr('transform', `translate(0,${this.get('height') - this.get('bottomMargin')})`)
          .call(xAxis)
          .selectAll('text')
          .attr('stroke', 'white')
          .attr("transform", "translate(25, 10)rotate(45)");

        vis.append('svg:g')
          .attr('class', 'y axis')
          .attr('transform', `translate(${this.get('leftMargin')},0)`)
          .attr('stroke', 'white')
          .call(yAxis);

        vis.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr(
              "transform",
              "translate("+ (this.get('leftMargin') / 4) +","+ ((this.get('height') - this.get('bottomMargin')) / 2) + ")rotate(-90)"
          )  // text is drawn off the screen top left, move down and out and rotate
          .attr('stroke', 'white')
          .text(this.get('chart.dataInputs')['y-label']);

        vis.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr(
              "transform",
              "translate("+ (this.get('width') / 2) +","+(this.get('height')-(this.get('rightMargin') / 4))+")"
            )  // centre below axis
            .attr('stroke', 'white')
            .text(this.get('chart.dataInputs')['x-label']);

        let line = d3.line()
            .x((d) => xRange(new Date(d._data.date)))
            .y((d) => yRange(d._data.value));

        vis.append('svg:path')
            .attr('d', line(homeData))
            .attr('stroke', 'blue')
            .attr('stroke-width', 2)
            .attr('fill', 'none');

        vis.append('svg:path')
            .attr('d', line(awayData))
            .attr('stroke', 'red')
            .attr('stroke-width', 2)
            .attr('fill', 'none');
    },
});
