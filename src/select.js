/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');

var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var Select = React.createClass({

    mixins: [Formsy.Mixin, ComponentMixin],

    changeValue: function(event) {
        var target = event.target;
        var value;
        if (this.props.multiple) {
            value = [];
            for (var i = 0; i < target.length; i++){
                var option = target.options[i];
                if (option.selected) {
                    value.push(option.value);
                }
            }
        } else {
            value = target.value;
        }
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    render: function() {

        if (this.props.elementOnly) {
            return (
                <div className="input-standalone">
                    {this.renderElement()}
                    {this.renderErrorMessage()}
                </div>
            );
        }

        return (
            <Row
                {...this.getRowProperties()}
                htmlFor={this.getId()}
            >
                {this.renderElement()}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    },

    renderElement: function() {
        var optionNodes = this.props.options.map(function(item, index) {
            return (
                <option key={index} {...item} label={null}>{item.label}</option>
            );
        });

        return (
            <span className={this.getClassNames('select')}>
                <select
                    {...this.props}
                    id={this.getId()}
                    value={this.getValue() || ''}
                    onChange={this.changeValue}
                    aria-label={this.props.elementOnly ? this.props.label : undefined}
                    title={this.props.title || this.props.label}
                    disabled={this.isFormDisabled() || this.props.disabled}
                >
                  {optionNodes}
                </select>
              </span>
        );
    }
});

module.exports = Select;
