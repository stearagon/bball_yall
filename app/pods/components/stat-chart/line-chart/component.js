import Ember from 'ember';
import d3 from 'd3';
import moment from 'moment';

export default Ember.Component.extend({
    statsRetreiver: Ember.inject.service(),
	height: 200,
	width: 500,
	topMargin: 10,
	rightMargin: 20,
	bottomMargin: 30,
	leftMargin: 40,

    data: Ember.computed('chart.dataInputs', 'game', function() {
        const dataInputs = this.get('chart.dataInputs');
        const game = this.get('game');

        if (dataInputs === undefined || game === undefined) {
            return null;
        } else {
            return this.get('statsRetreiver').getData(game, dataInputs);
        }
    }),

    gameOberserver: Ember.observer('game', 'data', function() {
        this.get('data').then((unfilteredData) => {
            const data = unfilteredData.content;
            let oldElements  = d3.select(`.chart-container.${this.elementId}`);
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

            let vis = d3.select(`.chart-container.${this.elementId}`),
                xRange = d3.scaleTime().range([this.leftMargin, this.width - this.rightMargin]).domain([d3.min(data, function(d) {
                    return new Date(d._data.date);
                }), d3.max(data, function(d) {
                    return new Date(d._data.date);
                })]),
                yRange = d3.scaleLinear().range([this.topMargin, this.height - this.bottomMargin]).domain([d3.max(data, function(d) {
                    return d._data.value;
                }), d3.min(data, function(d) {
                    return d._data.value;
                })]),
                xAxis = d3.axisBottom()
                .scale(xRange)
                .ticks(data.length / 2)
                .tickFormat(d3.timeFormat('%m/%d/%y')),
                yAxis = d3.axisLeft()
                .scale(yRange);

            vis.append('svg:g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${this.height - this.bottomMargin})`)
            .call(xAxis)
            .selectAll('text')
            .attr('transform', 'rotate(45)');

            vis.append('svg:g')
            .attr('class', 'y axis')
            .attr('transform', `translate(${this.leftMargin},0)`)
            .call(yAxis);

            vis.append("text")
                .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
                .attr("transform", "translate("+ (this.leftMargin / 4) +","+ ((this.height - this.bottomMargin) / 2) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
                .text("Value");

            vis.append("text")
                .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
                .attr("transform", "translate("+ (this.width / 2) +","+(this.height-(this.rightMargin / 4))+")")  // centre below axis
                .text("Game #");

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
        });
    }),
});
