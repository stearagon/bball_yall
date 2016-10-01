import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dashboard/dashboard-grid', 'Integration | Component | dashboard/dashboard grid', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dashboard/dashboard-grid}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dashboard/dashboard-grid}}
      template block text
    {{/dashboard/dashboard-grid}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
