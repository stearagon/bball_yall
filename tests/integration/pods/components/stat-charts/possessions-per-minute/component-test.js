import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('stat-charts/possessions-per-minute', 'Integration | Component | stat charts/possessions per minute', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{stat-charts/possessions-per-minute}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#stat-charts/possessions-per-minute}}
      template block text
    {{/stat-charts/possessions-per-minute}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
